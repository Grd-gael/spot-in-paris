import { fetchEvents } from "../models/EventModel.js"

export async function loadEvents() {
    const events = await fetchEvents()
    return events;
}
