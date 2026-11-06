"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/agenda", label: "Agenda" },
  { href: "/speakers", label: "Speakers" },
  { href: "/venue", label: "Venue" },
  { href: "/register", label: "Register" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-ivory/95 backdrop-blur-md">
      <div className="container-wide flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-playfair text-xl font-bold tracking-tight text-charcoal">
            Frame <span className="text-gold">By</span> Frame
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link font-montserrat">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/register" className="btn-primary text-xs uppercase tracking-wider">
            Get Tickets
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-charcoal"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-charcoal/10 bg-ivory md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 font-montserrat text-sm font-medium text-charcoal hover:bg-gold/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="mt-2 btn-primary text-center text-xs uppercase tracking-wider"
              onClick={() => setOpen(false)}
            >
              Get Tickets
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
