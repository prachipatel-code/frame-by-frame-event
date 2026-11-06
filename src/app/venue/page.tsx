import Header from "@/components/Header";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";

export default async function VenuePage() {
  let event = null;
  try {
    event = await prisma.event.findFirst({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {}

  const venueName = event?.venueName || "Suchitra Cinema and Cultural Academy";
  const address = event?.venueAddress || "#36, 9th Main, B. V. Karanth Road, near Post Office, Banashankari 2nd Stage, Bengaluru, Karnataka 560070, India";
  const mapUrl = event?.venueMapUrl || "https://www.google.com/maps/search/?api=1&query=Suchitra+Cinema+and+Cultural+Academy+Bengaluru";

  return (
    <>
      <Header />
      <main>
        <section className="bg-charcoal section-padding text-ivory">
          <div className="container-narrow text-center">
            <h1 className="font-playfair text-4xl font-bold sm:text-5xl">Venue & Location</h1>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-narrow">
            <div className="rounded-2xl border border-charcoal/10 bg-white p-8 shadow-sm">
              <h2 className="font-playfair text-2xl font-bold text-charcoal">{venueName}</h2>
              <p className="mt-2 text-sm text-charcoal/60">(Proposed venue — booking confirmation pending)</p>
              <p className="mt-4 text-charcoal/80 leading-relaxed">{address}</p>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block btn-primary">
                Open in Google Maps
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
