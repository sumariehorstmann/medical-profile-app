// app/api/profile-photo/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-");
}

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServer();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Please upload a JPG, PNG, or WEBP image." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Image must be smaller than 5MB." },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const baseName = sanitizeFileName(file.name.replace(/\.[^/.]+$/, ""));
    const filePath = `${Date.now()}-${baseName}.${ext}`;

    const bytes = new Uint8Array(await file.arrayBuffer());

    const admin = createSupabaseAdmin();

    const { error: uploadError } = await admin.storage
      .from("profile-photos")
      .upload(filePath, bytes, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message || "Upload failed." },
        { status: 400 }
      );
    }

    const { data: publicData } = admin.storage
      .from("profile-photos")
      .getPublicUrl(filePath);

    const publicUrl = publicData.publicUrl;

    const { error: updateError } = await admin
      .from("profiles")
      .update({ profile_photo_url: publicUrl })
      .eq("user_id", user.id);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message || "Failed to save photo URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Something went wrong." },
      { status: 500 }
    );
  }
}