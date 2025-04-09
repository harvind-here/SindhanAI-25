"use client"

import { useState, useEffect, useRef } from "react"
import "./SindhanTimeline.css"

const SindhanTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const timelineRef = useRef(null)

  const timelineEvents = [
    {
      id: 1,
      date: "April 7-27, 2025",
      title: "Abstract Submission & Pitch Deck",
      description:
        "Submit your innovative ideas and finalize your pitch deck for SindhanAI'25. Our team will review all submissions.",
    },
    {
      id: 2,
      date: "April 27, 2025",
      title: "Selection Notification",
      description:
        "Selected teams will receive an official email confirmation. Only shortlisted teams will proceed to the registration phase.",
    },
    {
      id: 3,
      date: "April 28-May 1, 2025",
      title: "Registration & Payment",
      description:
        "Selected teams must complete registration and pay ₹550 per participant to confirm their spot in the hackathon.",
    },
    {
      id: 4,
      date: "May 2-3, 2025",
      title: "SindhanAI'25 Hackathon",
      description: "24-hour coding challenge across 3 tracks: AI, DATA, and IoT. Compete for prizes worth ₹60K.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % timelineEvents.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [timelineEvents.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const timelineItems = document.querySelectorAll(".timeline-item")
    timelineItems.forEach((item) => observer.observe(item))

    return () => {
      timelineItems.forEach((item) => observer.unobserve(item))
    }
  }, [])

  return (
    <div className="sindhan-timeline" ref={timelineRef}>
      <div className="timeline-header">
        <h2>Event Timeline</h2>
        <p>Mark your calendars for SindhanAI'25</p>
      </div>

      {/* Desktop Timeline */}
      <div className="timeline-container desktop">
        <div className="timeline-line"></div>

        {timelineEvents.map((event, index) => (
          <div key={event.id} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
            <div className="timeline-content">
              <div className="timeline-date">{event.date}</div>
              <h3 className="timeline-title">{event.title}</h3>
              <p className="timeline-description">{event.description}</p>
            </div>

            <div className="timeline-dot"></div>
          </div>
        ))}
      </div>

      {/* Mobile Timeline */}
      <div className="timeline-container mobile">
        <div className="timeline-line"></div>

        {timelineEvents.map((event) => (
          <div key={event.id} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-date">{event.date}</div>
              <h3 className="timeline-title">{event.title}</h3>
              <p className="timeline-description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline Navigation */}
      <div className="timeline-navigation">
        {timelineEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`nav-dot ${activeIndex === index ? "active" : ""}`}
            aria-label={`View timeline event ${index + 1}`}
          />
        ))}
      </div>

      {/* Registration Process Summary */}
      <div className="registration-summary">
        <div className="process-card">
          <div className="process-icon submit-icon"></div>
          <h4>Submit & Get Selected</h4>
          <p>Submit by April 27th. Selected teams will receive an email.</p>
        </div>

        <div className="process-card">
          <div className="process-icon payment-icon"></div>
          <h4>Pay & Register</h4>
          <p>₹550 per participant. Registration closes on May 1st.</p>
        </div>

        <div className="process-card">
          <div className="process-icon compete-icon"></div>
          <h4>Compete & Win</h4>
          <p>Join us on May 2-3 for a 24-hour hackathon.</p>
        </div>
      </div>
    </div>
  )
}

export default SindhanTimeline

