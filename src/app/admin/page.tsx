import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  let stats = { total: 0, confirmed: 0, checkedIn: 0 };

  try {
    const [total, confirmed, checkedIn] = await Promise.all([
      prisma.registration.count(),
      prisma.registration.count({ where: { status: "CONFIRMED" } }),
      prisma.checkIn.count(),
    ]);
    stats = { total, confirmed, checkedIn };
  } catch {}

  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-charcoal/10 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <h1 className="font-playfair text-lg font-bold text-charcoal">Frame By Frame · Admin</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-charcoal/60">{session.user.email}</span>
            <Link href="/" className="text-gold hover:underline">View site</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-playfair text-2xl font-bold text-charcoal">Dashboard</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <p className="text-sm text-charcoal/60">Total Registrations</p>
            <p className="mt-2 font-playfair text-3xl font-bold text-charcoal">{stats.total}</p>
          </div>
          <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <p className="text-sm text-charcoal/60">Confirmed</p>
            <p className="mt-2 font-playfair text-3xl font-bold text-charcoal">{stats.confirmed}</p>
          </div>
          <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <p className="text-sm text-charcoal/60">Checked In</p>
            <p className="mt-2 font-playfair text-3xl font-bold text-charcoal">{stats.checkedIn}</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-montserrat text-sm font-semibold uppercase tracking-wider text-charcoal/60">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/register" className="text-gold hover:underline">Public registration form →</Link></li>
          </ul>
        </div>

        <p className="mt-12 text-xs text-charcoal/40">
          Phase 1 of the Event Management Platform. More modules coming in later updates.
        </p>
      </main>
    </div>
  );
}
