"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type Profile = {
  id: string;
  public_id: string;
  first_name: string | null;
  last_name: string | null;
  blood_type: string | null;
  allergies: string | null;
  emergency1_fullname: string | null;
  emergency1_phone: string | null;
};

const BASE_PRICE = 399;
const DISCOUNT_AMOUNT = 30;
const AFFILIATE_PRICE = 369;

function PayPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const urlRef = (searchParams.get("ref") || "").trim().toUpperCase();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState("");
  const [affiliateCode, setAffiliateCode] = useState("");
  const [affiliateMessage, setAffiliateMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadUserAndProfile() {
      try {
        setPageLoading(true);
        setError("");

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          window.location.href = "/login?redirect=/subscribe/pay";
          return;
        }

        const user = session.user;

        if (!mounted) return;

        setUserEmail(user.email ?? "");

        const { data: profileData, error: profileError } = await supabase
  .from("profiles")
  .select(`
    id,
    public_id,
    first_name,
    last_name,
    blood_type,
    allergies,
    emergency1_fullname,
    emergency1_phone
  `)
  .eq("user_id", user.id)
  .single();

        if (profileError || !profileData) {
          setError("Could not load your profile.");
          return;
        }

        if (!profileData.public_id) {
          setError("Your profile is not fully set up yet.");
          return;
        }

        setProfile(profileData);

        let storedRef = "";

        try {
          storedRef = sessionStorage.getItem("rroi_ref") || "";
        } catch {}

        const finalRef = urlRef || storedRef;

        if (finalRef) {
          setAffiliateCode(finalRef.toUpperCase());
          setAffiliateMessage("Affiliate code detected. Your R30 discount will be applied if the code is valid.");
        }
      } catch {
        setError("Something went wrong loading your payment page.");
      } finally {
        if (mounted) setPageLoading(false);
      }
    }

    loadUserAndProfile();

    return () => {
      mounted = false;
    };
  }, [supabase, urlRef]);

  async function handlePayNow() {
    if (!profile) return;

    const cleanCode = affiliateCode.trim().toUpperCase();
    const hasAffiliateCode = cleanCode.length > 0;
    const priceToday = hasAffiliateCode ? BASE_PRICE - DISCOUNT_AMOUNT : BASE_PRICE;

    const confirmUpgrade = window.confirm(
      hasAffiliateCode
        ? `Upgrade to Premium. Base price R${BASE_PRICE}, affiliate discount R${DISCOUNT_AMOUNT}, price today R${AFFILIATE_PRICE}. Continue?`
        : `Upgrade to Premium. Price today R${priceToday}. Continue?`
    );

    if (!confirmUpgrade) return;

    try {
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
          affiliateCode: cleanCode || "",
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
    } catch {
      alert("Something went wrong starting payment.");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <main className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">RROI Premium</h1>
        <p>Loading...</p>
      </main>
    );
  }

  const hasAffiliateCode = affiliateCode.trim().length > 0;
  const priceToday = hasAffiliateCode ? AFFILIATE_PRICE : BASE_PRICE;

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Confirm Premium Upgrade</h1>

      <p className="mb-6 text-sm text-gray-600">
        You are upgrading your account. Your Premium Kit includes your first year subscription, 2 physical QR code products, and delivery.
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
              <strong>Name:</strong>{" "}
              {[profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || "-"}
            </p>
            <p>
              <strong>Plan:</strong> RROI Premium Kit
            </p>
            <p>
              <strong>Base Price:</strong> R{BASE_PRICE}
            </p>
          </div>

          <div className="mb-6 rounded border border-gray-200 p-4">
            <label className="block text-sm font-medium mb-2">
              Affiliate Code
            </label>
            <input
              type="text"
              value={affiliateCode}
              onChange={(e) => {
                setAffiliateCode(e.target.value.toUpperCase());
                setAffiliateMessage("");
              }}
              placeholder="Enter affiliate code"
              className="w-full rounded border px-3 py-2"
              disabled={loading}
            />
            <p className="mt-2 text-sm text-gray-600">
              Enter a valid affiliate code to get <strong>R30 off</strong>.
            </p>
            {affiliateMessage ? (
              <p className="mt-2 text-sm text-green-700">{affiliateMessage}</p>
            ) : null}
          </div>

          <div className="mb-6 rounded border border-gray-200 p-4 text-sm space-y-2">
            <p>
              <strong>Base Price:</strong> R{BASE_PRICE}
            </p>

            {hasAffiliateCode ? (
              <>
                <p>
                  <strong>Affiliate Discount:</strong> -R{DISCOUNT_AMOUNT}
                </p>
                <p>
                  <strong>Price Today:</strong> R{priceToday}
                </p>
              </>
            ) : (
              <p>
                <strong>Price Today:</strong> R{priceToday}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handlePayNow}
            disabled={loading || !profile}
            className="w-full rounded bg-black px-4 py-3 text-white disabled:opacity-60"
          >
            {loading ? "Redirecting..." : `Proceed to Payment - R${priceToday}`}
          </button>

          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="w-full mt-3 rounded border px-4 py-3"
          >
            Back to Profile
          </button>
        </div>
      )}
    </main>
  );
}

export default function PayPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-semibold mb-4">RROI Premium</h1>
          <p>Loading...</p>
        </main>
      }
    >
      <PayPageInner />
    </Suspense>
  );
}