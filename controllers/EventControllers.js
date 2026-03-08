import { fetchEvents, filterEvents } from "../models/EventModel.js";

export async function loadEvents() {
    let events = await fetchEvents();
    events = filterEvents(events, null, null, null, false);
    return events;
}
