import ReactDOM from "react-dom"
import SindhanTimeline from "./SindhanTimeline"

// Example of how to use the component
const App = () => {
  return (
    <div>
      <SindhanTimeline />
    </div>
  )
}

// For direct integration into an existing page
const renderTimeline = (containerId) => {
  const container = document.getElementById(containerId)
  if (container) {
    ReactDOM.render(<SindhanTimeline />, container)
  }
}

// Export for npm usage
export { SindhanTimeline, renderTimeline }

// If using as a standalone script
if (typeof window !== "undefined") {
  window.renderSindhanTimeline = renderTimeline
}

