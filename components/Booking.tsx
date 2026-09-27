import { CAL_LINK } from "@/lib/site"
import CalEmbed from "@/components/CalEmbed"
import { FiArrowUpRight } from "react-icons/fi"

export default function Booking() {
  return (
    <section id="book" className="glass rounded-[28px] px-6 py-10 md:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Book a call</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">Grab a Slot on My Calendar</h2>
          <p className="mt-2 text-sm text-fg/55">Pick a time that works — you&apos;ll get an invite straight away.</p>
        </div>
        <a
          href={`https://cal.com/${CAL_LINK}`}
          target="_blank"
          rel="noreferrer"
          className="card shrink-0 rounded-full px-4 py-2 text-xs font-medium hover:bg-white transition"
        >
          Open in Cal.com <FiArrowUpRight aria-hidden className="inline -mt-0.5" />
        </a>
      </div>
      <div className="card mt-8 rounded-2xl overflow-hidden">
        <CalEmbed calLink={CAL_LINK} />
      </div>
    </section>
  )
}
