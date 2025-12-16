"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type ProfileRow = {
  id: string;
  user_id: string;
  public_id: string | null;

  full_name: string | null;
  date_of_birth: string | null; // stored as YYYY-MM-DD
  blood_type: string | null;
  allergies: string | null;
  conditions: string | null;
  medications: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  notes: string | null;
  updated_at?: string | null;
};

function toDateInputValue(v: string | null) {
  // Expecting v like "1991-08-15" already. If it's null, return "".
  if (!v) return "";
  // If your DB ever stores ISO timestamps, this keeps only the date part.
  return v.slice(0, 10);
}

export default function ProfilePage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);

  const [message, setMessage] = useState<string | null>(null);

  // form state
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");
  const [medications, setMedications] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [notes, setNotes] = useState("");

  // base URL for QR/link (LAN-friendly on mobile if you set NEXT_PUBLIC_BASE_URL)
  const baseUrl =
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || "";

  const emergencyLink = profile?.public_id
    ? `${baseUrl}/e/${profile.public_id}`
    : null;

  // Load user + profile
  useEffect(() => {
    let mounted = true;

    async function run() {
      setLoading(true);
      setMessage(null);

      // 1) must be logged in
      const { data: authData } = await supabase.auth.getUser();
      const uid = authData?.user?.id ?? null;

      if (!uid) {
        router.replace("/login");
        return;
      }

      if (!mounted) return;
      setUserId(uid);

      // 2) fetch profile row
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id,user_id,public_id,full_name,date_of_birth,blood_type,allergies,conditions,medications,emergency_contact_name,emergency_contact_phone,notes,updated_at"
        )
        .eq("user_id", uid)
        .single();

      if (!mounted) return;

      if (error) {
        setMessage(`❌ Could not load profile: ${error.message}`);
        setProfile(null);
        setLoading(false);
        return;
      }

      setProfile(data as ProfileRow);

      // hydrate form fields
      setFullName(data?.full_name ?? "");
      setDateOfBirth(toDateInputValue(data?.date_of_birth ?? null));
      setBloodType(data?.blood_type ?? "");
      setAllergies(data?.allergies ?? "");
      setConditions(data?.conditions ?? "");
      setMedications(data?.medications ?? "");
      setEmergencyContactName(data?.emergency_contact_name ?? "");
      setEmergencyContactPhone(data?.emergency_contact_phone ?? "");
      setNotes(data?.notes ?? "");

      setLoading(false);
    }

    run();
    return () => {
      mounted = false;
    };
  }, [router, supabase]);

  async function handleLogout() {
    setMessage(null);
    await supabase.auth.signOut();
    router.replace("/login");
  }

  async function saveProfile() {
    if (!userId || !profile) return;

    setSaving(true);
    setMessage(null);

    const payload: Partial<ProfileRow> = {
      full_name: fullName.trim() || null,
      date_of_birth: dateOfBirth ? dateOfBirth : null,
      blood_type: bloodType.trim() || null,
      allergies: allergies.trim() || null,
      conditions: conditions.trim() || null,
      medications: medications.trim() || null,
      emergency_contact_name: emergencyContactName.trim() || null,
      emergency_contact_phone: emergencyContactPhone.trim() || null,
      notes: notes.trim() || null,
    };

    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("id", profile.id)
      .select(
        "id,user_id,public_id,full_name,date_of_birth,blood_type,allergies,conditions,medications,emergency_contact_name,emergency_contact_phone,notes,updated_at"
      )
      .single();

    setSaving(false);

    if (error) {
      setMessage(`❌ Save failed: ${error.message}`);
      return;
    }

    setProfile(data as ProfileRow);
    setMessage("✅ Saved.");
  }

  async function copyLink() {
    if (!emergencyLink) return;
    try {
      await navigator.clipboard.writeText(emergencyLink);
      setMessage("✅ Link copied.");
    } catch {
      setMessage("❌ Could not copy (browser blocked).");
    }
  }

  function printCard() {
    window.print();
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.h1}>My Medical Profile</h1>
          <p style={styles.muted}>Loading…</p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>
          <div style={styles.topRow}>
            <h1 style={styles.h1}>My Medical Profile</h1>
            <button onClick={handleLogout} style={styles.btnLight} type="button">
              Logout
            </button>
          </div>
          <p style={styles.error}>
            {message ?? "Profile not found. Check your database trigger / row."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      {/* Print CSS */}
      <style>{printCss}</style>

      <div style={styles.container}>
        {/* header */}
        <div style={styles.topRow} className="no-print">
          <div>
            <h1 style={styles.h1}>My Medical Profile</h1>
            <p style={styles.muted}>Private. Only you can edit this.</p>
          </div>

          <button onClick={handleLogout} style={styles.btnLight} type="button">
            Logout
          </button>
        </div>

        {/* message */}
        {message ? (
          <p
            className="no-print"
            style={{
              ...styles.message,
              ...(message.startsWith("❌") ? styles.messageError : styles.messageOk),
            }}
          >
            {message}
          </p>
        ) : null}

        {/* QR + link section */}
        <section style={styles.card} className="no-print">
          <h2 style={styles.h2}>Emergency QR</h2>
          <p style={styles.muted}>
            This QR opens your public emergency page (read-only).
          </p>

          {!profile.public_id ? (
            <p style={styles.error}>
              ❌ Your profile has no <code>public_id</code>. Run your “assign
              public_id” SQL or trigger.
            </p>
          ) : (
            <div style={styles.qrRow}>
              <div style={styles.qrBox}>
                <QRCodeSVG value={emergencyLink ?? ""} size={180} />
              </div>

              <div style={{ display: "grid", gap: 10, minWidth: 260 }}>
                <div style={{ fontSize: 13, wordBreak: "break-all" }}>
                  <strong>Link:</strong> {emergencyLink}
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button type="button" style={styles.btnDark} onClick={copyLink}>
                    Copy link
                  </button>
                  <button type="button" style={styles.btnLight} onClick={printCard}>
                    Print wallet card
                  </button>
                  <button
                    type="button"
                    style={styles.btnLight}
                    onClick={() => router.push(`/e/${profile.public_id}`)}
                  >
                    Preview public page
                  </button>
                </div>

                <div style={styles.muted}>
                  Tip: If you want this to work on your phone while developing,
                  set <code>NEXT_PUBLIC_BASE_URL</code> to your Network IP (not
                  localhost).
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Edit form */}
        <section style={styles.card} className="no-print">
          <h2 style={styles.h2}>Edit medical info</h2>

          <div style={styles.grid}>
            <Input
              label="Full name"
              value={fullName}
              onChange={setFullName}
              placeholder="e.g. Su-Marié Hörstmann"
            />

            <label style={styles.label}>
              <div style={styles.labelText}>Date of birth</div>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                style={styles.input}
              />
            </label>

            <Input
              label="Blood type"
              value={bloodType}
              onChange={setBloodType}
              placeholder="e.g. O+"
            />

            <Textarea
              label="Allergies"
              value={allergies}
              onChange={setAllergies}
              placeholder="e.g. Penicillin, peanuts… (or “None”)"
            />

            <Textarea
              label="Conditions"
              value={conditions}
              onChange={setConditions}
              placeholder="e.g. Asthma, diabetes…"
            />

            <Textarea
              label="Medications"
              value={medications}
              onChange={setMedications}
              placeholder="e.g. Name + dosage + when taken…"
            />

            <Input
              label="Emergency contact name"
              value={emergencyContactName}
              onChange={setEmergencyContactName}
              placeholder="e.g. Luke Keeton"
            />

            <Input
              label="Emergency contact phone"
              value={emergencyContactPhone}
              onChange={setEmergencyContactPhone}
              placeholder="e.g. +27 82 123 4567"
            />

            <Textarea
              label="Notes"
              value={notes}
              onChange={setNotes}
              placeholder="Extra info (implants, special instructions, etc.)"
            />
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              style={styles.btnDark}
              onClick={saveProfile}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save"}
            </button>

            <button type="button" style={styles.btnLight} onClick={printCard}>
              Print wallet card
            </button>
          </div>
        </section>

        {/* Printable wallet card (prints only) */}
        <section className="print-only" style={{ marginTop: 0 }}>
          <div style={styles.printWrap}>
            <div style={styles.walletCard}>
              <div style={styles.cardTop}>
                <div>
                  <div style={styles.cardTitle}>EMERGENCY MEDICAL</div>
                  <div style={styles.cardName}>
                    {fullName?.trim() ? fullName.trim() : "—"}
                  </div>
                </div>
                <div style={styles.cardQr}>
                  {emergencyLink ? (
                    <QRCodeSVG value={emergencyLink} size={92} />
                  ) : null}
                </div>
              </div>

              <div style={styles.cardGrid}>
                <CardField label="DOB" value={dateOfBirth || "—"} />
                <CardField label="Blood" value={bloodType?.trim() || "—"} />
                <CardField label="Allergies" value={allergies?.trim() || "—"} />
                <CardField label="Conditions" value={conditions?.trim() || "—"} />
                <CardField
                  label="Meds"
                  value={medications?.trim() || "—"}
                />
                <CardField
                  label="Emergency contact"
                  value={
                    emergencyContactName?.trim()
                      ? `${emergencyContactName.trim()}${
                          emergencyContactPhone?.trim()
                            ? ` • ${emergencyContactPhone.trim()}`
                            : ""
                        }`
                      : emergencyContactPhone?.trim()
                      ? emergencyContactPhone.trim()
                      : "—"
                  }
                />
              </div>

              <div style={styles.cardFooter}>
                <div style={{ wordBreak: "break-all" }}>
                  {profile.public_id ? `Ref: ${profile.public_id}` : ""}
                </div>
                <div style={{ fontWeight: 700 }}>Scan QR</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile-first emergency preview (screen-only helper) */}
        <section style={{ ...styles.card, marginBottom: 40 }} className="no-print">
          <h2 style={styles.h2}>Mobile emergency layout preview</h2>
          <p style={styles.muted}>
            This is roughly what someone sees on /e/&lt;public_id&gt; (your public
            page).
          </p>

          <div style={styles.mobilePreview}>
            <div style={styles.mobileHeader}>Emergency Medical Profile</div>
            <div style={styles.mobileRow}>
              <div style={styles.mobileLabel}>Full name</div>
              <div style={styles.mobileValue}>
                {fullName?.trim() || "—"}
              </div>
            </div>
            <div style={styles.mobileRow}>
              <div style={styles.mobileLabel}>DOB</div>
              <div style={styles.mobileValue}>{dateOfBirth || "—"}</div>
            </div>
            <div style={styles.mobileRow}>
              <div style={styles.mobileLabel}>Blood</div>
              <div style={styles.mobileValue}>{bloodType?.trim() || "—"}</div>
            </div>
            <div style={styles.mobileRow}>
              <div style={styles.mobileLabel}>Allergies</div>
              <div style={styles.mobileValue}>{allergies?.trim() || "—"}</div>
            </div>
            <div style={styles.mobileRow}>
              <div style={styles.mobileLabel}>Conditions</div>
              <div style={styles.mobileValue}>{conditions?.trim() || "—"}</div>
            </div>
            <div style={styles.mobileRow}>
              <div style={styles.mobileLabel}>Medications</div>
              <div style={styles.mobileValue}>
                {medications?.trim() || "—"}
              </div>
            </div>
            <div style={styles.mobileRow}>
              <div style={styles.mobileLabel}>Emergency contact</div>
              <div style={styles.mobileValue}>
                {emergencyContactName?.trim()
                  ? `${emergencyContactName.trim()}${
                      emergencyContactPhone?.trim()
                        ? ` • ${emergencyContactPhone.trim()}`
                        : ""
                    }`
                  : emergencyContactPhone?.trim()
                  ? emergencyContactPhone.trim()
                  : "—"}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label style={styles.label}>
      <div style={styles.labelText}>{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={styles.input}
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label style={styles.label}>
      <div style={styles.labelText}>{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        style={styles.textarea}
      />
    </label>
  );
}

function CardField({ label, value }: { label: string; value: string }) {
  return (
    <div style={styles.cardField}>
      <div style={styles.cardFieldLabel}>{label}</div>
      <div style={styles.cardFieldValue}>{value}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: 16,
    background: "#fafafa",
    minHeight: "100vh",
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
    display: "grid",
    gap: 14,
  },
  topRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
  h1: { fontSize: 28, fontWeight: 800, margin: 0 },
  h2: { fontSize: 18, fontWeight: 800, margin: 0 },
  muted: { color: "#444", fontSize: 13, marginTop: 6, lineHeight: 1.4 },
  error: { color: "#b00020", marginTop: 10 },
  message: {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 14,
    margin: 0,
  },
  messageOk: { background: "#f2fff3" },
  messageError: { background: "#fff2f2" },

  card: {
    background: "white",
    border: "1px solid #e6e6e6",
    borderRadius: 14,
    padding: 14,
  },

  grid: {
    display: "grid",
    gap: 12,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    marginTop: 12,
    marginBottom: 12,
  },

  label: { display: "grid", gap: 6 },
  labelText: { fontWeight: 700, fontSize: 13 },
  input: {
    width: "100%",
    padding: 10,
    border: "1px solid #ddd",
    borderRadius: 10,
    fontSize: 14,
    background: "white",
  },
  textarea: {
    width: "100%",
    padding: 10,
    border: "1px solid #ddd",
    borderRadius: 10,
    fontSize: 14,
    background: "white",
    resize: "vertical",
  },

  btnDark: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #111",
    background: "#111",
    color: "white",
    cursor: "pointer",
    fontWeight: 800,
  },
  btnLight: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "#f7f7f7",
    cursor: "pointer",
    fontWeight: 800,
  },

  qrRow: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 12,
  },
  qrBox: {
    padding: 12,
    border: "1px solid #eee",
    borderRadius: 12,
    background: "white",
    width: "fit-content",
  },

  // printable card
  printWrap: {
    display: "flex",
    justifyContent: "center",
    padding: 0,
  },
  walletCard: {
    width: "85.6mm", // CR80 width
    height: "54mm", // CR80 height
    border: "1px solid #000",
    borderRadius: "3mm",
    padding: "3.5mm",
    boxSizing: "border-box",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    gap: "2mm",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "2mm",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 9,
    fontWeight: 900,
    letterSpacing: 0.6,
  },
  cardName: {
    marginTop: "1mm",
    fontSize: 12,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: "60mm",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  cardQr: {
    width: "24mm",
    height: "24mm",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.2mm 2mm",
    alignContent: "start",
    fontSize: 8.5,
    lineHeight: 1.1,
  },
  cardField: {
    borderTop: "0.2mm solid #ddd",
    paddingTop: "0.8mm",
    minHeight: "8mm",
  },
  cardFieldLabel: { fontWeight: 900, fontSize: 7.5, opacity: 0.8 },
  cardFieldValue: {
    fontSize: 8.6,
    whiteSpace: "pre-wrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 7.5,
    borderTop: "0.2mm solid #ddd",
    paddingTop: "1mm",
  },

  // mobile preview
  mobilePreview: {
    border: "1px solid #eee",
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 10,
  },
  mobileHeader: {
    padding: 12,
    fontWeight: 900,
    background: "#111",
    color: "white",
  },
  mobileRow: {
    padding: 12,
    borderTop: "1px solid #eee",
    display: "grid",
    gap: 6,
  },
  mobileLabel: { fontSize: 12, fontWeight: 800, color: "#333" },
  mobileValue: { fontSize: 16, fontWeight: 700 },
};

const printCss = `
/* Print only the wallet card */
@media print {
  body { background: white !important; }
  .no-print { display: none !important; }
  .print-only { display: block !important; }
  @page { margin: 12mm; }
}

/* Screen: hide print card section until printing */
.print-only { display: none; }
`;

