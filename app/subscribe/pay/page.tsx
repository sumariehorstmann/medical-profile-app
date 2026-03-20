"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type Profile = {
  id: string;
  public_id: string;
  first_name: string | null;
  last_name: string | null;
};

export default function PayPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadUserAndProfile() {
      try {
        setPageLoading(true);
        setError("");

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.user) {
          window.location.href = "/login?redirect=/subscribe/pay";
          return;
        }

        const user = session.user;

        if (!mounted) return;

        setUserEmail(user.email ?? "");

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, public_id, first_name, last_name")
          .eq("user_id", user.id)
          .single();

        if (profileError || !profileData) {
          setError("Could not load your profile.");
          return;
        }

        if (!profileData.public_id) {
          setError("Your profile does not have a public_id yet.");
          return;
        }

        setProfile(profileData);
      } catch (err) {
        console.error(err);
        setError("Something went wrong loading your payment page.");
      } finally {
        if (mounted) {
          setPageLoading(false);
        }
      }
    }

    loadUserAndProfile();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  async function handlePayNow() {
    try {
      if (!profile) {
        alert("Profile not loaded.");
        return;
      }

      setLoading(true);

      const res = await fetch("/api/payfast/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicId: profile.public_id,
          buyerEmail: userEmail,
          firstName: profile.first_name || "",
          lastName: profile.last_name || "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to start payment.");
        return;
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.processUrl;

      Object.entries(data.fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error(err);
      alert("Something went wrong starting payment.");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <main className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">RROI Premium</h1>
        <p>Loading payment page...</p>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Upgrade to RROI Premium</h1>
      <p className="mb-6 text-sm text-gray-600">
        Complete your payment securely with PayFast.
      </p>

      {error ? (
        <div className="rounded border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      ) : (
        <div className="rounded border p-6 shadow-sm">
          <div className="space-y-2 mb-6 text-sm">
            <p>
              <strong>Email:</strong> {userEmail || "-"}
            </p>
            <p>
              <strong>Public ID:</strong> {profile?.public_id || "-"}
            </p>
            <p>
              <strong>Name:</strong>{" "}
              {[profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || "-"}
            </p>
            <p>
              <strong>Plan:</strong> RROI Premium Subscription
            </p>
            <p>
              <strong>Price:</strong> R299.00
            </p>
          </div>

          <button
            type="button"
            onClick={handlePayNow}
            disabled={loading || !profile}
            className="w-full rounded bg-black px-4 py-3 text-white disabled:opacity-60"
          >
            {loading ? "Redirecting..." : "Pay Now"}
          </button>
        </div>
      )}
    </main>
  );
}