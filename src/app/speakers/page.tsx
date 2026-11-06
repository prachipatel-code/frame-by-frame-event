import Header from "@/components/Header";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";

export default async function SpeakersPage() {
  let speakers: any[] = [];
  try {
    const event = await prisma.event.findFirst({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    if (event) {
      speakers = await prisma.speaker.findMany({
        where: { eventId: event.id, isActive: true },
        orderBy: { sortOrder: "asc" },
      });
    }
  } catch {}

  return (
    <>
      <Header />
      <main>
        <section className="bg-charcoal section-padding text-ivory">
          <div className="container-narrow text-center">
            <h1 className="font-playfair text-4xl font-bold sm:text-5xl">Speakers & Filmmakers</h1>
            <p className="mt-4 text-ivory/70">Meet the voices behind the stories</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            {speakers.length === 0 ? (
              <p className="text-center text-charcoal/60">Speaker line-up will be announced soon.</p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {speakers.map((s) => (
                  <div key={s.id} className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/20 font-playfair text-2xl font-bold text-charcoal">
                      {s.name.charAt(0)}
                    </div>
                    <h3 className="mt-4 font-playfair text-xl font-semibold text-charcoal">{s.name}</h3>
                    {s.title && <p className="mt-1 text-sm text-gold">{s.title}</p>}
                    {s.organization && <p className="text-sm text-charcoal/60">{s.organization}</p>}
                    {s.bio && <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{s.bio}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
