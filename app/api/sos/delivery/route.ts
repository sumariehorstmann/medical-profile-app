import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Clickatell Delivery Callback:", body);

    const messageId =
      body.messageId ??
      body.apiMessageId ??
      body.id;

    const status =
      body.status ??
      body.messageStatus ??
      null;

    if (messageId && status) {
      await supabaseAdmin
        .from("sos_alerts")
        .update({
          sms_status: status,
          delivered_at:
            status === "Delivered"
              ? new Date().toISOString()
              : null,
        })
        .eq("provider_message_id", messageId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}