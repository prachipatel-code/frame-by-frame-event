import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-charcoal section-padding text-ivory">
          <div className="container-narrow text-center">
            <h1 className="font-playfair text-4xl font-bold sm:text-5xl">Contact</h1>
            <p className="mt-4 text-ivory/70">Reach out to the organizing team</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-narrow max-w-lg">
            <div className="rounded-2xl border border-charcoal/10 bg-white p-8 shadow-sm text-center">
              <h2 className="font-playfair text-xl font-semibold text-charcoal">Prachi Patel</h2>
              <p className="mt-1 text-sm text-charcoal/60">Festival Organizer</p>
              <div className="mt-6 space-y-3 text-sm">
                <p>
                  <a href="mailto:prachiiip06@gmail.com" className="text-gold hover:underline">
                    prachiiip06@gmail.com
                  </a>
                </p>
                <p>
                  <a href="tel:+919113693553" className="text-charcoal hover:text-gold">
                    +91 91136 93553
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
