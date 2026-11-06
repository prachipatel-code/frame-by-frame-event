import Header from "@/components/Header";
import Footer from "@/components/Footer";

const day1 = [
  { time: "09:00 – 10:00", title: "Registration & Welcome Coffee" },
  { time: "10:00 – 10:30", title: "Opening Ceremony" },
  { time: "10:30 – 13:00", title: "Short Film Screenings – Block A" },
  { time: "13:00 – 14:00", title: "Lunch Break" },
  { time: "14:00 – 16:00", title: "Documentary Showcase" },
  { time: "16:00 – 17:30", title: "Filmmaker Interaction Session" },
  { time: "17:30 – 18:00", title: "Day 1 Closing" },
];

const day2 = [
  { time: "09:30 – 10:00", title: "Morning Networking" },
  { time: "10:00 – 12:30", title: "Short Film Screenings – Block B" },
  { time: "12:30 – 13:30", title: "Lunch" },
  { time: "13:30 – 15:00", title: "Panel: Independent Cinema Today" },
  { time: "15:00 – 16:30", title: "Scriptwriting / Cinematography Workshop" },
  { time: "16:30 – 17:30", title: "Awards & Audience Choice" },
  { time: "17:30 – 18:00", title: "Closing Ceremony" },
];

export default function AgendaPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-charcoal section-padding text-ivory">
          <div className="container-narrow text-center">
            <h1 className="font-playfair text-4xl font-bold sm:text-5xl">Event Agenda</h1>
            <p className="mt-4 text-ivory/70">23–24 January 2027 · Subject to minor changes</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-narrow space-y-12">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-charcoal">Day 1 · 23 January 2027</h2>
              <ul className="mt-6 space-y-4">
                {day1.map((item) => (
                  <li key={item.time} className="flex flex-col gap-1 rounded-xl border border-charcoal/10 bg-white p-4 sm:flex-row sm:items-center sm:gap-6">
                    <span className="w-36 shrink-0 font-montserrat text-sm font-medium text-gold">{item.time}</span>
                    <span className="text-charcoal">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-playfair text-2xl font-bold text-charcoal">Day 2 · 24 January 2027</h2>
              <ul className="mt-6 space-y-4">
                {day2.map((item) => (
                  <li key={item.time} className="flex flex-col gap-1 rounded-xl border border-charcoal/10 bg-white p-4 sm:flex-row sm:items-center sm:gap-6">
                    <span className="w-36 shrink-0 font-montserrat text-sm font-medium text-gold">{item.time}</span>
                    <span className="text-charcoal">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
