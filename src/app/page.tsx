import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";

async function getEvent() {
  try {
    return await prisma.event.findFirst({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      include: { speakers: { where: { isFeatured: true, isActive: true }, take: 4 } },
    });
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const event = await getEvent();

  const name = event?.name || "Frame By Frame : Short Film and Documentary Festival";
  const tagline = event?.tagline || "Every Frame Tells a Story. Every Story Creates an Impact.";
  const venue = event?.venueName || "Suchitra Cinema and Cultural Academy";
  const start = event?.startDate
    ? new Date(event.startDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      })
    : "23 January 2027";

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-charcoal text-ivory">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
          <div className="container-wide relative section-padding flex flex-col items-center text-center">
            <p className="font-montserrat text-xs uppercase tracking-[0.3em] text-gold">
              23–24 January 2027 · Bengaluru
            </p>
            <h1 className="mt-6 max-w-4xl font-playfair text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Frame <span className="text-gold">By</span> Frame
            </h1>
            <p className="mt-2 font-playfair text-xl text-ivory/90 sm:text-2xl">
              Short Film & Documentary Festival
            </p>
            <p className="mt-6 max-w-2xl font-poppins text-base text-ivory/70 italic sm:text-lg">
              {tagline}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/register" className="btn-primary">
                Register Now
              </Link>
              <Link href="/about" className="btn-secondary border-ivory/40 text-ivory hover:bg-ivory/10">
                Learn More
              </Link>
            </div>
            <p className="mt-8 text-sm text-ivory/50">
              {venue} · {start}
            </p>
          </div>
        </section>

        <section className="section-padding bg-ivory">
          <div className="container-wide">
            <h2 className="text-center font-playfair text-3xl font-bold text-charcoal sm:text-4xl">
              Festival Highlights
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Short Film Screenings", desc: "Student and independent short films that push creative boundaries." },
                { title: "Documentary Showcase", desc: "Thought-provoking documentaries exploring real stories and impact." },
                { title: "Filmmaker Sessions", desc: "Interactive discussions with directors, writers and cinematographers." },
                { title: "Expert Panels", desc: "Industry conversations on independent cinema and emerging talent." },
                { title: "Workshops", desc: "Hands-on scriptwriting and cinematography workshops." },
                { title: "Awards", desc: "Audience Choice and Best Film awards celebrating outstanding work." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm transition hover:border-gold/40 hover:shadow-md">
                  <h3 className="font-playfair text-xl font-semibold text-charcoal">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-charcoal section-padding text-center text-ivory">
          <div className="container-narrow">
            <h2 className="font-playfair text-3xl font-bold sm:text-4xl">Be part of the story</h2>
            <p className="mt-4 text-ivory/70">
              Whether you are a filmmaker, student, or cinema lover — join us for two days of powerful storytelling in Bengaluru.
            </p>
            <Link href="/register" className="mt-8 inline-block btn-primary">Get Your Pass</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
