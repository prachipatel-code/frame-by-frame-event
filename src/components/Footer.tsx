import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-wide section-padding">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="font-playfair text-2xl font-bold">
              Short <span className="text-gold">Film</span>
            </h3>
            <p className="mt-3 text-sm text-ivory/70 italic">
              Every Frame Tells a Story. Every Story Creates an Impact.
            </p>
            <p className="mt-4 text-sm text-ivory/60">
              23–24 January 2027<br />
              Suchitra Cinema and Cultural Academy<br />
              Bengaluru
            </p>
          </div>

          <div>
            <h4 className="font-montserrat text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-ivory/80">
              <li><Link href="/about" className="hover:text-gold transition-colors">About</Link></li>
              <li><Link href="/agenda" className="hover:text-gold transition-colors">Agenda</Link></li>
              <li><Link href="/speakers" className="hover:text-gold transition-colors">Speakers</Link></li>
              <li><Link href="/register" className="hover:text-gold transition-colors">Register</Link></li>
              <li><Link href="/venue" className="hover:text-gold transition-colors">Venue</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-ivory/80">
              <li>Prachi Patel</li>
              <li>
                <a href="mailto:prachiiip06@gmail.com" className="hover:text-gold transition-colors">
                  prachiiip06@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919113693553" className="hover:text-gold transition-colors">
                  +91 91136 93553
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ivory/10 pt-8 text-center text-xs text-ivory/50">
          <p>© 2027 Short Film Festival. All rights reserved.</p>
          <p className="mt-1">
            <Link href="/privacy" className="hover:text-gold">Privacy Policy</Link>
            {" · "}
            <Link href="/terms" className="hover:text-gold">Terms & Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
