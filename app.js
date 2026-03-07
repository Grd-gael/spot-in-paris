import { loadEvents } from "./controllers/EventControllers.js"

console.log("Loading events...");
const events = await loadEvents()

export function renderEvents(events) {

  const container = document.getElementById("events")

  container.innerHTML = events.map(event => `
    <div class="card mb-3">
      <div class="card-body">
        <h3>${event.fields.title}</h3>
        ${event.fields.qfap_tags ? `${(event.fields.qfap_tags.split(';').map(tag => `<span class="badge bg-primary">${tag}</span>`)).join(' ')}` : ""}
        <p>${event.fields.description}</p>
      </div>
    </div>
  `).join("")
}

renderEvents(events)
