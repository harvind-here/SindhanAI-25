"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import EventTimeline from "./event-timeline"

export default function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  return (
    <section ref={ref} id="timeline" className="relative">
      <EventTimeline />
    </section>
  )
}

