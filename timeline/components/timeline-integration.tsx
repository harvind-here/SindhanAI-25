"use client"

import { useState } from "react"
import EventTimeline from "./event-timeline"

export default function TimelineIntegration() {
  const [showTimeline, setShowTimeline] = useState(false)

  return (
    <div className="w-full">
      <button
        onClick={() => setShowTimeline(!showTimeline)}
        className="mx-auto block register-button text-white font-medium py-3 px-8 rounded-full shadow-lg"
      >
        {showTimeline ? "Hide Timeline" : "View Event Timeline"}
      </button>

      {showTimeline && (
        <div className="mt-8">
          <EventTimeline />
        </div>
      )}
    </div>
  )
}

