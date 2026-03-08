import { loadEvents } from "../controllers/EventControllers.js";
import { filterEvents, tagsWanted } from "../models/EventModel.js";

const events = await loadEvents();


export function renderFilterTag(tags) {
  const selectTag = document.getElementById("tag-filter");
  tags.forEach(tag => {
    selectTag.innerHTML += `<option value="${tag.toLowerCase()}">${tag}</option>`;
  })
};
renderFilterTag(tagsWanted);

export function renderEvents(events) {
  const container = document.getElementById("events");

  if (!events.length) {
    container.innerHTML = `
      <div class="text-center py-5 text-muted">
        <p class="fs-5">Aucun événement trouvé.</p>
      </div>`;
    return;
  }

  container.innerHTML = events.map(event => {
    const tags = event.fields.qfap_tags
      ? event.fields.qfap_tags.split(';').map(tag =>
        `<span class="badge border border-danger text-danger me-1">${tag.trim()}</span>`
      ).join('')
      : '';

    const dateBadge = event.fields.date_start && event.fields.date_end ? `Du ${new Date(event.fields.date_start).toLocaleDateString('fr-FR')} au ${new Date(event.fields.date_end).toLocaleDateString('fr-FR')}` : '';

    const address = [
      event.fields.address_street,
      event.fields.address_city,
      event.fields.address_zipcode
    ].filter(Boolean).join(', ');

    const price = event.fields.price_type == "payant"
      ? `<small class="text-muted">${event.fields.price_detail ?? ''}</small>`
      : `<small class="text-success fw-semibold">Gratuit</small>`;

    const link = event.fields.access_link ?? event.fields.url ?? '#';
    const linkText = event.fields.access_link_text ?? 'En savoir plus';

    return `
      <div class="card mb-3 border-1 shadow-sm rounded-1 overflow-hidden">
        <div class="d-flex flex-column flex-sm-row">
          <img
            src="${event.fields.cover_url ?? ''}"
            alt="${event.fields.title}"
            class="event-img object-fit-cover bg-secondary"
            onerror="this.src=''"
          />
          <div class="card-body d-flex flex-column p-3">

            <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
              <div>${tags}</div>
              <span class="badge bg-light text-secondary border">${dateBadge}</span>
            </div>
            <h3 class="font-playfair fs-5 fw-bold mb-1">${event.fields.title}</h3>

            ${address ? `<p class="small text-muted mb-1"> ${address}</p>` : ''}
            <p class="small text-secondary mb-2" ">
              ${event.fields.lead_text ?? ''}
            </p>

            <!-- Footer -->
            <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
              ${price}
              <a href="${link}" class="btn btn-dark btn-sm rounded-1 btn-dark-custom text-uppercase" style="font-size:0.7rem;letter-spacing:1.5px" target="_blank">
                ${linkText} →
              </a>
            </div>

          </div>
        </div>
      </div>
    `;
  }).join('');
}



renderEvents(events);


// Détecter les différents filtres 

document.getElementById("tag-filter").addEventListener("change", (e) => {
  HandleChange();
});

document.getElementById("search-bar").addEventListener("input", (e) => {
  HandleChange();
});

document.getElementById("free-checkbox").addEventListener("change", (e) => {
  HandleChange();
});

document.getElementById("date-filter").addEventListener("change", (e) => {
  HandleChange();
});

const HandleChange = () => {
  const isFreeChecked = document.getElementById("free-checkbox").checked;
  const search = document.getElementById("search-bar").value.toLowerCase() ?? null;
  const tagSelected = document.getElementById("tag-filter").value ?? null
  const dateSelected = document.getElementById("date-filter").value ? new Date(document.getElementById("date-filter").value) : null;
  const filteredEvents = filterEvents(events, search, tagSelected, dateSelected, isFreeChecked);
  renderEvents(filteredEvents);
}

document.getElementById("reset-button").addEventListener("click", () => {
  document.getElementById("search-bar").value = "";
  document.getElementById("tag-filter").value = "";
  document.getElementById("date-filter").value = "";
  document.getElementById("free-checkbox").checked = false;
  renderEvents(events);
});
