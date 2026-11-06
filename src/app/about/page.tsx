import Header from "@/components/Header";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";

export default async function AboutPage() {
  let event = null;
  try {
    event = await prisma.event.findFirst({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {}

  const description = event?.description || `Get ready to experience the magic of storytelling at FRAME BY FRAME 2027, a two-day Short Film and Documentary Festival celebrating creativity, cinema and emerging filmmaking talent.

The festival brings together student filmmakers, independent creators, film enthusiasts and industry professionals on one platform to showcase powerful stories through the art of cinema.`;

  return (
    <>
      <Header />
      <main>
        <section className="bg-charcoal section-padding text-ivory">
          <div className="container-narrow text-center">
            <h1 className="font-playfair text-4xl font-bold sm:text-5xl">About the Festival</h1>
            <p className="mt-4 text-gold italic">{event?.tagline || "Every Frame Tells a Story. Every Story Creates an Impact."}</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-narrow">
            {description.split("\n\n").map((para, i) => (
              <p key={i} className="mb-4 text-charcoal/80 leading-relaxed whitespace-pre-line">{para}</p>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
