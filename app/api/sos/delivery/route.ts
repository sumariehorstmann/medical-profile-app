import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

type CallbackData = Record<string, unknown>;

function getString(
  data: CallbackData,
  possibleKeys: string[]
): string | null {
  for (const key of possibleKeys) {
    const value = data[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }

    if (typeof value === "number") {
      return String(value);
    }
  }

  return null;
}

function normaliseStatus(rawStatus: string): {
  smsStatus: "Sent" | "Delivered" | "Failed" | "Cancelled";
  deliveredAt: string | null;
} {
  const status = rawStatus.trim().toLowerCase();

  if (
    status.includes("delivered") ||
    status.includes("received by recipient") ||
    status.includes("received")
  ) {
    return {
      smsStatus: "Delivered",
      deliveredAt: new Date().toISOString(),
    };
  }

  if (
    status.includes("failed") ||
    status.includes("error") ||
    status.includes("rejected") ||
    status.includes("expired") ||
    status.includes("undeliverable")
  ) {
    return {
      smsStatus: "Failed",
      deliveredAt: null,
    };
  }

  if (
    status.includes("cancelled") ||
    status.includes("canceled")
  ) {
    return {
      smsStatus: "Cancelled",
      deliveredAt: null,
    };
  }

  return {
    smsStatus: "Sent",
    deliveredAt: null,
  };
}

async function readCallbackData(
  req: NextRequest
): Promise<CallbackData> {
  const queryData = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  );

  if (req.method === "GET") {
    return queryData;
  }

  const contentType =
    req.headers.get("content-type")?.toLowerCase() ?? "";

  try {
    if (contentType.includes("application/json")) {
      const json = await req.json();

      return {
        ...queryData,
        ...(json && typeof json === "object" ? json : {}),
      };
    }

    if (
      contentType.includes(
        "application/x-www-form-urlencoded"
      ) ||
      contentType.includes("multipart/form-data")
    ) {
      const formData = await req.formData();

      return {
        ...queryData,
        ...Object.fromEntries(formData.entries()),
      };
    }

    const text = await req.text();

    if (text) {
      const params = new URLSearchParams(text);

      return {
        ...queryData,
        ...Object.fromEntries(params.entries()),
      };
    }
  } catch (error) {
    console.error("Could not parse Clickatell callback:", error);
  }

  return queryData;
}

async function handleDeliveryCallback(req: NextRequest) {
  const expectedSecret =
    process.env.CLICKATELL_WEBHOOK_SECRET;

  const suppliedSecret =
    req.nextUrl.searchParams.get("secret");

  if (
    !expectedSecret ||
    !suppliedSecret ||
    suppliedSecret !== expectedSecret
  ) {
    return NextResponse.json(
      { success: false, error: "Unauthorized callback." },
      { status: 401 }
    );
  }

  const body = await readCallbackData(req);

  const messageId = getString(body, [
    "apiMsgId",
    "apiMessageId",
    "messageId",
    "message_id",
    "id",
  ]);

  const rawStatus = getString(body, [
    "status",
    "messageStatus",
    "message_status",
    "statusCode",
    "status_code",
  ]);

  if (!messageId || !rawStatus) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing message ID or delivery status.",
      },
      { status: 400 }
    );
  }

  const { smsStatus, deliveredAt } =
    normaliseStatus(rawStatus);

  const { data: updatedAlert, error } =
    await supabaseAdmin
      .from("sos_alerts")
      .update({
        sms_status: smsStatus,
        delivered_at: deliveredAt,
      })
      .eq("provider_message_id", messageId)
      .select("id")
      .maybeSingle();

  if (error) {
    console.error(
      "Could not update SOS delivery status:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Could not update delivery status.",
      },
      { status: 500 }
    );
  }

  if (!updatedAlert) {
    console.warn(
      "Delivery callback did not match an SOS alert:",
      messageId
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unknown provider message ID.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    status: smsStatus,
  });
}

export async function POST(req: NextRequest) {
  return handleDeliveryCallback(req);
}

export async function GET(req: NextRequest) {
  return handleDeliveryCallback(req);
}