import { Star } from "lucide-react";

const testimonials = [
  { name: "Rajesh Sharma",  company: "Pizza Land",      quote: "Milan and Raj delivered a website that made our pizza brand look world-class. Customers love it!" },
  { name: "Anita Verma",    company: "Shardha Packaging", quote: "Professional, fast, and on-point. The site brought us new B2B inquiries within a week." },
  { name: "Vikram Patel",   company: "Bhavya Steel",    quote: "They understood our industry perfectly. Our corporate site now reflects the quality of our products." },
  { name: "Dr. Priya Mehta", company: "MindMate Pro",  quote: "Beautifully designed. Clean, calming, and exactly what our users needed." },
  { name: "Sanjay Gupta",   company: "Client",          quote: "These two college students built better than any agency we tried. Highly recommend!" },
  { name: "Kavita Singh",   company: "Startup Founder", quote: "Quick turnaround, stunning result. MIRAJ LABS is our go-to for all web projects." },
];

const row1 = [...testimonials.slice(0, 3), ...testimonials.slice(0, 3), ...testimonials.slice(0, 3)];
const row2 = [...testimonials.slice(3, 6), ...testimonials.slice(3, 6), ...testimonials.slice(3, 6)];

function TestimonialCard({ item }: { item: typeof testimonials[0] }) {
  return (
    <div className="w-[300px] sm:w-[380px] md:w-[420px] shrink-0 p-5 sm:p-7 mx-3"
      style={{ background: "var(--c-bg)", borderRadius: "20px", border: "1px solid var(--c-accent-12)" }}>
      <div className="flex gap-1 mb-4" style={{ color: "var(--c-accent)" }}>
        {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
      </div>
      <p className="text-sm leading-relaxed mb-5"
        style={{ color: "var(--c-dark)", fontFamily: "'Inter', sans-serif", lineHeight: 1.65 }}>
        "{item.quote}"
      </p>
      <div>
        <div className="text-sm font-semibold" style={{ color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }}>{item.name}</div>
        <div className="text-xs mt-0.5 uppercase tracking-widest" style={{ color: "var(--c-accent)", fontFamily: "'Inter', sans-serif" }}>{item.company}</div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 md:py-24 overflow-hidden" style={{ background: "var(--c-bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-10 md:mb-14">
        <p className="text-xs font-medium uppercase tracking-widest mb-3"
          style={{ color: "var(--c-accent)", fontFamily: "'Inter', sans-serif" }}>What clients say</p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 7vw, 90px)", lineHeight: 0.9, color: "var(--c-dark)" }}>
          Client Feedback
        </h2>
      </div>

      <div className="relative flex flex-col gap-4 sm:gap-5 w-full">
        <div className="flex w-[max-content] animate-marquee">
          {row1.map((item, i) => <TestimonialCard key={`r1-${i}`} item={item} />)}
        </div>
        <div className="flex w-[max-content] animate-marquee-reverse -ml-[100px] sm:-ml-[180px]">
          {row2.map((item, i) => <TestimonialCard key={`r2-${i}`} item={item} />)}
        </div>
        <div className="absolute inset-y-0 left-0 w-12 sm:w-24 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, var(--c-bg), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-24 pointer-events-none z-10"
          style={{ background: "linear-gradient(to left, var(--c-bg), transparent)" }} />
      </div>
    </section>
  );
}
