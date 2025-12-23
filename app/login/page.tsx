"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { getSupabaseBrowser } from "@/lib/supabase/client";

type Profile = {
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  blood_type: string | null;
  allergies: string | null;
  medical_history: string | null;
  medications: string | null;
  nok_name: string | null;
  nok_phone: string | null;
  notes: string | null;
  public_id: string | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const supabase = getSupabaseBrowser();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    blood_type: "",
    allergies: "",
    medical_history: "",
    medications: "",
    nok_name: "",
    nok_phone: "",
    notes: "",
    public_id: "",
  });

  /* -------------------------------
     LOAD PROFILE
  -------------------------------- */
  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Profile load error:", error);
      }

      if (data) {
        setProfile(data);
      }

      setLoading(false);
    }

    loadProfile();
  }, [router, supabase]);

  /* -------------------------------
     SAVE PROFILE
  -------------------------------- */
  async function saveProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
        date_of_birth: profile.date_of_birth,
        blood_type: profile.blood_type,
        allergies: profile.allergies,
        medical_history: profile.medical_history,
        medications: profile.medications,
        nok_name: profile.nok_name,
        nok_phone: profile.nok_phone,
        notes: profile.notes,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (error) {
      alert("Error saving profile");
      console.error(error);
    } else {
      alert("Profile saved");
    }
  }

  /* -------------------------------
     LOGOUT
  -------------------------------- */
  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return <p>Loading profile…</p>;
  }

  const publicUrl = profile.public_id
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/e/${profile.public_id}`
    : null;

  return (
    <main style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>My Medical Profile</h1>

      <button onClick={logout}>Logout</button>

      {publicUrl && (
        <>
          <QRCodeSVG value={publicUrl} size={160} />
          <p>{publicUrl}</p>
        </>
      )}

      <input
        placeholder="First name"
        value={profile.first_name ?? ""}
        onChange={(e) =>
          setProfile({ ...profile, first_name: e.target.value })
        }
      />

      <input
        placeholder="Last name"
        value={profile.last_name ?? ""}
        onChange={(e) =>
          setProfile({ ...profile, last_name: e.target.value })
        }
      />

      <input
        type="date"
        value={profile.date_of_birth ?? ""}
        onChange={(e) =>
          setProfile({ ...profile, date_of_birth: e.target.value })
        }
      />

      <input
        placeholder="Blood type"
        value={profile.blood_type ?? ""}
        onChange={(e) =>
          setProfile({ ...profile, blood_type: e.target.value })
        }
      />

      <textarea
        placeholder="Allergies"
        value={profile.allergies ?? ""}
        onChange={(e) =>
          setProfile({ ...profile, allergies: e.target.value })
        }
      />

      <textarea
        placeholder="Medical history"
        value={profile.medical_history ?? ""}
        onChange={(e) =>
          setProfile({ ...profile, medical_history: e.target.value })
        }
      />

      <textarea
        placeholder="Medications"
        value={profile.medications ?? ""}
        onChange={(e) =>
          setProfile({ ...profile, medications: e.target.value })
        }
      />

      <input
        placeholder="Emergency contact name"
        value={profile.nok_name ?? ""}
        onChange={(e) =>
          setProfile({ ...profile, nok_name: e.target.value })
        }
      />

      <input
        placeholder="Emergency contact phone"
        value={profile.nok_phone ?? ""}
        onChange={(e) =>
          setProfile({ ...profile, nok_phone: e.target.value })
        }
      />

      <textarea
        placeholder="Notes"
        value={profile.notes ?? ""}
        onChange={(e) =>
          setProfile({ ...profile, notes: e.target.value })
        }
      />

      <button onClick={saveProfile}>Save</button>
    </main>
  );
}
