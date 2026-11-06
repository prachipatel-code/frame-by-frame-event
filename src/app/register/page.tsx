"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type TicketType = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  capacity: number | null;
  soldCount: number;
};

export default function RegisterPage() {
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{
    registrationId: string;
    ticketNumber: string;
    verificationToken: string;
  } | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    city: "",
    ticketTypeId: "",
  });

  useEffect(() => {
    fetch("/api/ticket-types")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTicketTypes(data);
          if (data.length > 0) setForm((f) => ({ ...f, ticketTypeId: data[0].id }));
        }
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess({
        registrationId: data.registrationId,
        ticketNumber: data.ticketNumber,
        verificationToken: data.verificationToken,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <>
        <Header />
        <main className="section-padding">
          <div className="container-narrow max-w-lg text-center">
            <div className="rounded-2xl border border-gold/30 bg-white p-8 shadow-sm">
              <h1 className="font-playfair text-3xl font-bold text-charcoal">You&apos;re registered!</h1>
              <p className="mt-4 text-charcoal/70">
                A confirmation email has been sent with your ticket and QR code.
              </p>
              <div className="mt-6 rounded-xl bg-ivory p-4 text-left text-sm">
                <p><strong>Registration ID:</strong> {success.registrationId}</p>
                <p className="mt-1"><strong>Ticket Number:</strong> {success.ticketNumber}</p>
              </div>
              <a href={`/ticket/${success.verificationToken}`} className="mt-6 inline-block btn-primary">
                View Your Ticket
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="section-padding">
        <div className="container-narrow max-w-xl">
          <h1 className="text-center font-playfair text-3xl font-bold text-charcoal sm:text-4xl">
            Register for Frame By Frame 2027
          </h1>
          <p className="mt-3 text-center text-charcoal/70">
            23–24 January 2027 · Suchitra Cinema and Cultural Academy, Bengaluru
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5 rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm sm:p-8">
            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-charcoal">Full Name *</label>
              <input required type="text" value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="mt-1 w-full rounded-lg border border-charcoal/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal">Email *</label>
              <input required type="email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-lg border border-charcoal/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal">Mobile Number *</label>
              <input required type="tel" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 w-full rounded-lg border border-charcoal/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal">College / Organization</label>
              <input type="text" value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                className="mt-1 w-full rounded-lg border border-charcoal/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal">City</label>
              <input type="text" value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="mt-1 w-full rounded-lg border border-charcoal/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal">Ticket Type *</label>
              <select required value={form.ticketTypeId}
                onChange={(e) => setForm({ ...form, ticketTypeId: e.target.value })}
                className="mt-1 w-full rounded-lg border border-charcoal/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold">
                {ticketTypes.length === 0 && <option value="">Loading...</option>}
                {ticketTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}{t.capacity && t.soldCount >= t.capacity ? " (Sold out)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? "Registering..." : "Complete Registration"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
