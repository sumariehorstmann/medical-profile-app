"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type AffiliateRow = {
  affiliate_code: string | null;
  total_earned: number | null;
  total_paid: number | null;
  status: string | null;
} | null;

const BRAND_GREEN = "#157A55";
const BORDER = "#E5E7EB";
const TEXT = "#0F172A";
const MUTED = "#475569";
const BG = "#FFFFFF";

export default function AffiliateApplyPage() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [existingAffiliate, setExistingAffiliate] = useState<AffiliateRow>(null);
  const [userEmail, setUserEmail] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("South Africa");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");

  const [promotionMethod, setPromotionMethod] = useState("");
  const [otherPromotionMethod, setOtherPromotionMethod] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [facebookProfile, setFacebookProfile] = useState("");
  const [tiktokHandle, setTiktokHandle] = useState("");
  const [experience, setExperience] = useState("");
  const [experienceDetails, setExperienceDetails] = useState("");

  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("Savings");
  const [branchCode, setBranchCode] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [agreeTax, setAgreeTax] = useState(false);
useEffect(() => {
  const saved = localStorage.getItem("affiliate_apply_draft");
  if (!saved) return;

  try {
    const draft = JSON.parse(saved);

    setFullName(draft.fullName ?? "");
    setPhone(draft.phone ?? "");
    setCountry(draft.country ?? "South Africa");
    setProvince(draft.province ?? "");
    setCity(draft.city ?? "");

    setPromotionMethod(draft.promotionMethod ?? "");
    setOtherPromotionMethod(draft.otherPromotionMethod ?? "");
    setTargetAudience(draft.targetAudience ?? "");
    setInstagramHandle(draft.instagramHandle ?? "");
    setFacebookProfile(draft.facebookProfile ?? "");
    setTiktokHandle(draft.tiktokHandle ?? "");
    setExperience(draft.experience ?? "");
    setExperienceDetails(draft.experienceDetails ?? "");

    setBankName(draft.bankName ?? "");
    setAccountHolder(draft.accountHolder ?? "");
    setAccountNumber(draft.accountNumber ?? "");
    setAccountType(draft.accountType ?? "Savings");
    setBranchCode(draft.branchCode ?? "");

    setAgreeTerms(draft.agreeTerms ?? false);
    setAgreeMarketing(draft.agreeMarketing ?? false);
    setAgreeTax(draft.agreeTax ?? false);
  } catch {
    localStorage.removeItem("affiliate_apply_draft");
  }
}, []);
useEffect(() => {
  localStorage.setItem(
    "affiliate_apply_draft",
    JSON.stringify({
      fullName,
      phone,
      country,
      province,
      city,
      promotionMethod,
      otherPromotionMethod,
      targetAudience,
      instagramHandle,
      facebookProfile,
      tiktokHandle,
      experience,
      experienceDetails,
      bankName,
      accountHolder,
      accountNumber,
      accountType,
      branchCode,
      agreeTerms,
      agreeMarketing,
      agreeTax,
    })
  );
}, [
  fullName,
  phone,
  country,
  province,
  city,
  promotionMethod,
  otherPromotionMethod,
  targetAudience,
  instagramHandle,
  facebookProfile,
  tiktokHandle,
  experience,
  experienceDetails,
  bankName,
  accountHolder,
  accountNumber,
  accountType,
  branchCode,
  agreeTerms,
  agreeMarketing,
  agreeTax,
]);
  useEffect(() => {
    let cancelled = false;

    async function loadPage() {
      setChecking(true);
      setMessage(null);

      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;

        const user = authData.user;
        if (!user) {
          router.replace("/login");
          return;
        }

        setUserEmail(user.email || "");

        const { data: subscription, error: subscriptionError } = await supabase
          .from("subscriptions")
          .select("status, current_period_end")
          .eq("user_id", user.id)
          .maybeSingle();

        if (subscriptionError) throw subscriptionError;

        const isPremium =
          !!subscription &&
          subscription.status === "active" &&
          (!subscription.current_period_end ||
            new Date(subscription.current_period_end) > new Date());

        if (!isPremium) {
          router.replace("/subscribe");
          return;
        }

        const { data: affiliate, error: affiliateError } = await supabase
          .from("affiliates")
          .select("affiliate_code, total_earned, total_paid, status")
          .eq("user_id", user.id)
          .maybeSingle();

        if (affiliateError) throw affiliateError;

        if (!cancelled && affiliate) {
          setExistingAffiliate(affiliate);
        }
      } catch (err: any) {
        if (!cancelled) {
          setMessage(err?.message || "Failed to load affiliate application page.");
        }
      } finally {
        if (!cancelled) {
          setChecking(false);
        }
      }
    }

    loadPage();

    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  function validateForm() {
    if (!fullName.trim()) return "Please enter your full name.";
    if (!phone.trim()) return "Please enter your phone number.";
    if (!country.trim()) return "Please enter your country.";
    if (!province.trim()) return "Please enter your province.";
    if (!city.trim()) return "Please enter your city or town.";
    if (!promotionMethod.trim()) return "Please select how you plan to promote RROI.";
    if (promotionMethod === "Other" && !otherPromotionMethod.trim()) {
      return "Please specify your promotion method.";
    }
    if (!targetAudience.trim()) return "Please describe your target audience.";
    if (!experience.trim()) return "Please select whether you have promotion experience.";
    if (experience === "Yes" && !experienceDetails.trim()) {
      return "Please briefly describe your experience.";
    }
    if (!bankName.trim()) return "Please enter your bank name.";
    if (!accountHolder.trim()) return "Please enter the account holder name.";
    if (!accountNumber.trim()) return "Please enter the account number.";
    if (!branchCode.trim()) return "Please enter the branch code.";
    if (!agreeTerms) return "You must agree to the affiliate terms and conditions.";
    if (!agreeMarketing) {
      return "You must confirm that you will only use official RROI marketing material.";
    }
    if (!agreeTax) {
      return "You must confirm that you are responsible for your own tax declarations.";
    }

    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/affiliate/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: userEmail.trim(),
          phone: phone.trim(),
          country: country.trim(),
          province: province.trim(),
          city: city.trim(),
          promotionMethod:
            promotionMethod === "Other"
              ? otherPromotionMethod.trim()
              : promotionMethod.trim(),
          targetAudience: targetAudience.trim(),
          instagramHandle: instagramHandle.trim(),
          facebookProfile: facebookProfile.trim(),
          tiktokHandle: tiktokHandle.trim(),
          experience: experience.trim(),
          experienceDetails: experienceDetails.trim(),
          bankName: bankName.trim(),
          accountHolder: accountHolder.trim(),
          accountNumber: accountNumber.trim(),
          accountType: accountType.trim(),
          branchCode: branchCode.trim(),
          agreeTerms,
          agreeMarketing,
          agreeTax,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json?.error || "Failed to submit affiliate application.");
      }

      setExistingAffiliate({
        affiliate_code: null,
        total_earned: 0,
        total_paid: 0,
        status: "pending",
      });

      setMessage("Your affiliate application has been submitted successfully.");
    } catch (err: any) {
      setMessage(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const affiliateStatus = (existingAffiliate?.status || "").toLowerCase();
  const isPending = affiliateStatus === "pending";
  const isApproved = affiliateStatus === "approved" || affiliateStatus === "active";
  const isRejected = affiliateStatus === "rejected";

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <Image
            src="/logo.png"
            alt="RROI logo"
            width={96}
            height={96}
            priority
          />
          <h1 style={styles.h1}>Apply to Become an RROI Affiliate</h1>
          <p style={styles.tagline}>Rapid Response Online Information</p>
        </div>

        <div style={styles.notice}>
          <strong>Premium subscribers only</strong>
          <p style={styles.noticeText}>
            Only active RROI Premium subscribers may apply for the affiliate
            program.
          </p>
          <p style={styles.noticeText}>
            Applications are manually reviewed. Approval or decline takes place
            within <strong>7 working days</strong>.
          </p>
          <p style={styles.noticeText}>
            Approved affiliates receive access to the affiliate dashboard after
            manual approval. Affiliate codes are issued after approval.
          </p>
        </div>

        {checking ? (
          <div style={styles.loadingBox}>Checking your account...</div>
        ) : isPending ? (
          <section style={styles.statusBox}>
            <h2 style={styles.h2}>Application Pending Review</h2>
            <p style={styles.p}>
              Your affiliate application has been received and is currently under
              review.
            </p>
            <p style={styles.p}>
              RROI will approve or decline your application within
              <strong> 7 working days</strong>.
            </p>
            <p style={styles.p}>
              Your affiliate dashboard and code will only become active once your
              application has been approved.
            </p>

            {message ? <p style={styles.successText}>{message}</p> : null}

            <div style={styles.links}>
              <Link href="/profile" style={styles.primaryLinkBtn}>
                Go to Profile
              </Link>
              <Link href="/affiliate/terms" style={styles.link}>
                View Terms
              </Link>
              <Link href="/" style={styles.linkMuted}>
                Home
              </Link>
            </div>
          </section>
        ) : isApproved ? (
          <section style={styles.statusBox}>
            <h2 style={styles.h2}>Affiliate Application Approved</h2>
            <p style={styles.p}>
              Your affiliate profile is active.
            </p>
            <p style={styles.p}>
              You may now access your affiliate dashboard and track your earnings.
            </p>

            <div style={styles.summaryGrid}>
              <div style={styles.summaryCard}>
                <div style={styles.summaryTitle}>Status</div>
                <div style={styles.summaryValue}>
                  {existingAffiliate?.status || "approved"}
                </div>
              </div>

              <div style={styles.summaryCard}>
                <div style={styles.summaryTitle}>Affiliate Code</div>
                <div style={styles.summaryValue}>
                  {existingAffiliate?.affiliate_code || "Will be emailed"}
                </div>
              </div>

              <div style={styles.summaryCard}>
                <div style={styles.summaryTitle}>Total Earned</div>
                <div style={styles.summaryValue}>
                  R{Number(existingAffiliate?.total_earned ?? 0).toFixed(2)}
                </div>
              </div>

              <div style={styles.summaryCard}>
                <div style={styles.summaryTitle}>Total Paid</div>
                <div style={styles.summaryValue}>
                  R{Number(existingAffiliate?.total_paid ?? 0).toFixed(2)}
                </div>
              </div>
            </div>

            {message ? <p style={styles.successText}>{message}</p> : null}

            <div style={styles.links}>
              <Link href="/affiliate/dashboard" style={styles.primaryLinkBtn}>
                Open Affiliate Dashboard
              </Link>
              <Link href="/profile" style={styles.link}>
                Profile
              </Link>
              <Link href="/affiliate/terms" style={styles.linkMuted}>
                Terms
              </Link>
            </div>
          </section>
        ) : isRejected ? (
          <section style={styles.statusBox}>
            <h2 style={styles.h2}>Application Declined</h2>
            <p style={styles.p}>
              Your affiliate application was not approved.
            </p>
            <p style={styles.p}>
              Please contact RROI if you believe this was an error or if you want
              to ask whether re-application is possible.
            </p>

            {message ? <p style={styles.errorText}>{message}</p> : null}

            <div style={styles.links}>
              <Link href="/profile" style={styles.primaryLinkBtn}>
                Go to Profile
              </Link>
              <Link href="/contact" style={styles.link}>
                Contact Support
              </Link>
              <Link href="/affiliate/terms" style={styles.linkMuted}>
                Terms
              </Link>
            </div>
          </section>
        ) : (
          <form onSubmit={handleSubmit}>
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Personal Details</h2>

              <label style={styles.label}>Full name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={styles.input}
                placeholder="Full name and surname"
                required
                disabled={loading}
              />

              <label style={styles.label}>Email address</label>
              <input
                value={userEmail}
                style={styles.inputDisabled}
                placeholder="Your account email"
                disabled
              />

              <label style={styles.label}>Phone number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.input}
                placeholder="e.g. 0821234567"
                required
                disabled={loading}
              />

              <label style={styles.label}>Country</label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={styles.input}
                placeholder="Country"
                required
                disabled={loading}
              />

              <label style={styles.label}>Province</label>
              <input
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                style={styles.input}
                placeholder="e.g. Western Cape"
                required
                disabled={loading}
              />

              <label style={styles.label}>City / Town</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={styles.input}
                placeholder="e.g. Cape Town"
                required
                disabled={loading}
              />
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>How You Plan to Promote RROI</h2>

              <label style={styles.label}>Primary promotion method</label>
              <select
                value={promotionMethod}
                onChange={(e) => setPromotionMethod(e.target.value)}
                style={styles.input}
                disabled={loading}
                required
              >
                <option value="">Select an option</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="Facebook">Facebook</option>
                <option value="In-person">In-person</option>
                <option value="Business / Workplace">Business / Workplace</option>
                <option value="Other">Other</option>
              </select>

              {promotionMethod === "Other" ? (
                <>
                  <label style={styles.label}>Specify promotion method</label>
                  <input
                    value={otherPromotionMethod}
                    onChange={(e) => setOtherPromotionMethod(e.target.value)}
                    style={styles.input}
                    placeholder="Describe your promotion method"
                    disabled={loading}
                    required
                  />
                </>
              ) : null}

              <label style={styles.label}>Target audience</label>
              <textarea
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                style={styles.textarea}
                placeholder="Who do you plan to promote RROI to?"
                disabled={loading}
                required
              />

              <label style={styles.label}>Instagram handle (optional)</label>
              <input
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
                style={styles.input}
                placeholder="@yourhandle"
                disabled={loading}
              />

              <label style={styles.label}>Facebook page / profile (optional)</label>
              <input
                value={facebookProfile}
                onChange={(e) => setFacebookProfile(e.target.value)}
                style={styles.input}
                placeholder="Facebook page or profile"
                disabled={loading}
              />

              <label style={styles.label}>TikTok handle (optional)</label>
              <input
                value={tiktokHandle}
                onChange={(e) => setTiktokHandle(e.target.value)}
                style={styles.input}
                placeholder="@yourhandle"
                disabled={loading}
              />

              <label style={styles.label}>
                Do you have experience promoting products or services?
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={styles.input}
                disabled={loading}
                required
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              {experience === "Yes" ? (
                <>
                  <label style={styles.label}>Briefly describe your experience</label>
                  <textarea
                    value={experienceDetails}
                    onChange={(e) => setExperienceDetails(e.target.value)}
                    style={styles.textarea}
                    placeholder="Short description of your promotion or sales experience"
                    disabled={loading}
                    required
                  />
                </>
              ) : null}
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Payout Banking Details</h2>

              <div style={styles.infoBox}>
                <p style={styles.infoText}>
                  Affiliate payouts are processed <strong>quarterly</strong>.
                </p>
                <p style={styles.infoText}>
                  Minimum payout threshold: <strong>R500</strong>.
                </p>
                <p style={styles.infoText}>
                  Cut-off dates: <strong>15 March, 15 June, 15 September, 15 December</strong>.
                </p>
                <p style={styles.infoText}>
                  Payout dates: <strong>31 March, 30 June, 30 September, 31 December</strong>.
                </p>
              </div>

              <label style={styles.label}>Bank name</label>
              <input
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                style={styles.input}
                placeholder="e.g. Capitec"
                required
                disabled={loading}
              />

              <label style={styles.label}>Account holder</label>
              <input
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                style={styles.input}
                placeholder="Name on the bank account"
                required
                disabled={loading}
              />

              <label style={styles.label}>Account number</label>
              <input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                style={styles.input}
                placeholder="Bank account number"
                required
                disabled={loading}
                inputMode="numeric"
              />

              <label style={styles.label}>Account type</label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                style={styles.input}
                disabled={loading}
              >
                <option value="Savings">Savings</option>
                <option value="Cheque">Cheque</option>
                <option value="Business">Business</option>
                <option value="Transmission">Transmission</option>
              </select>

              <label style={styles.label}>Branch code</label>
              <input
                value={branchCode}
                onChange={(e) => setBranchCode(e.target.value)}
                style={styles.input}
                placeholder="Branch code"
                required
                disabled={loading}
                inputMode="numeric"
              />
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Agreement</h2>

              <label style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={loading}
                />
                <span style={styles.checkboxText}>
                  I agree to the{" "}
                  <Link href="/affiliate/terms" style={styles.inlineLink}>
                    RROI Affiliate Terms &amp; Conditions
                  </Link>
                  .
                </span>
              </label>

              <label style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={agreeMarketing}
                  onChange={(e) => setAgreeMarketing(e.target.checked)}
                  disabled={loading}
                />
                <span style={styles.checkboxText}>
                  I understand that I may only use official RROI-approved
                  marketing material and may not create or change RROI marketing
                  content without written approval.
                </span>
              </label>

              <label style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={agreeTax}
                  onChange={(e) => setAgreeTax(e.target.checked)}
                  disabled={loading}
                />
                <span style={styles.checkboxText}>
                  I understand that I am responsible for declaring any affiliate
                  income to SARS and for meeting my own tax obligations.
                </span>
              </label>
            </section>

            <button
              type="submit"
              style={styles.primaryBtn}
              disabled={loading || !agreeTerms || !agreeMarketing || !agreeTax}
            >
              {loading ? "Submitting application..." : "Submit affiliate application"}
            </button>

            {message ? <p style={styles.errorText}>{message}</p> : null}

            <p style={styles.small}>
              Your application will be reviewed manually. If approved, your
              affiliate dashboard will become active and your affiliate code will
              be issued after approval.
            </p>

            <div style={styles.links}>
              <Link href="/profile" style={styles.linkMuted}>
                ← Back to Profile
              </Link>
              <Link href="/affiliate/terms" style={styles.link}>
                Terms
              </Link>
              <Link href="/privacy" style={styles.link}>
                Privacy
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: 16,
    background: BG,
    color: TEXT,
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 860,
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 24,
    background: BG,
  },
  brand: {
    textAlign: "center",
    marginBottom: 20,
  },
  h1: {
    fontSize: 28,
    fontWeight: 900,
    margin: "10px 0 4px",
    color: TEXT,
  },
  tagline: {
    fontSize: 14,
    fontWeight: 700,
    color: MUTED,
    margin: 0,
  },
  notice: {
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    padding: 14,
    background: "#F8FAFC",
    marginBottom: 20,
  },
  noticeText: {
    margin: "8px 0 0",
    lineHeight: 1.55,
    color: TEXT,
  },
  loadingBox: {
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    padding: 16,
    background: "#FFFFFF",
    fontWeight: 800,
  },
  statusBox: {
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    padding: 18,
    background: "#FFFFFF",
  },
  h2: {
    fontSize: 22,
    fontWeight: 900,
    margin: "0 0 10px",
    color: TEXT,
  },
  p: {
    margin: "0 0 10px",
    lineHeight: 1.6,
    color: TEXT,
  },
  section: {
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    background: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 900,
    margin: "0 0 14px",
    color: TEXT,
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontSize: 13,
    fontWeight: 800,
    color: TEXT,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    border: "1px solid #CBD5E1",
    borderRadius: 12,
    outline: "none",
    background: "#FFFFFF",
    color: TEXT,
    fontSize: 14,
  },
  inputDisabled: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    border: "1px solid #CBD5E1",
    borderRadius: 12,
    outline: "none",
    background: "#F8FAFC",
    color: MUTED,
    fontSize: 14,
  },
  textarea: {
    width: "100%",
    minHeight: 96,
    padding: 12,
    marginBottom: 12,
    border: "1px solid #CBD5E1",
    borderRadius: 12,
    outline: "none",
    background: "#FFFFFF",
    color: TEXT,
    fontSize: 14,
    resize: "vertical",
    fontFamily: "inherit",
  },
  infoBox: {
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    padding: 12,
    background: "#F8FAFC",
    marginBottom: 12,
  },
  infoText: {
    margin: "0 0 8px",
    lineHeight: 1.5,
    color: TEXT,
  },
  checkboxRow: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    margin: "10px 0",
  },
  checkboxText: {
    fontSize: 13,
    lineHeight: 1.5,
    color: TEXT,
    fontWeight: 700,
  },
  inlineLink: {
    color: BRAND_GREEN,
    fontWeight: 900,
    textDecoration: "underline",
  },
  primaryBtn: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    border: "none",
    background: BRAND_GREEN,
    color: "#FFFFFF",
    fontWeight: 900,
    fontSize: 15,
    cursor: "pointer",
  },
  primaryLinkBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "11px 14px",
    borderRadius: 12,
    border: "none",
    background: BRAND_GREEN,
    color: "#FFFFFF",
    fontWeight: 900,
    textDecoration: "none",
  },
  small: {
    marginTop: 12,
    fontSize: 13,
    color: MUTED,
    lineHeight: 1.6,
  },
  errorText: {
    marginTop: 12,
    color: "#B91C1C",
    fontWeight: 700,
    lineHeight: 1.5,
  },
  successText: {
    marginTop: 12,
    color: BRAND_GREEN,
    fontWeight: 800,
    lineHeight: 1.5,
  },
  links: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
    marginTop: 18,
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: BRAND_GREEN,
    fontWeight: 800,
  },
  linkMuted: {
    textDecoration: "none",
    color: TEXT,
    opacity: 0.85,
    fontWeight: 800,
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
    marginTop: 12,
  },
  summaryCard: {
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    padding: 12,
    background: "#FFFFFF",
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: 800,
    color: MUTED,
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 900,
    color: TEXT,
    wordBreak: "break-word",
  },
};