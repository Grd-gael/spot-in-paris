
export const tagsWanted = ["Concert", "Expo", "Théâtre", "Sciences", "Balade urbaine", "Sport"];

export async function fetchEvents() {

    const url = "https://parisdata.opendatasoft.com/api/records/1.0/search/?dataset=que-faire-a-paris-&rows=200";
    const response = await fetch(url);
    const json = await response.json();

    return json.records;
};



export function filterEvents(events, search, tagSelected, dateSelected, freeOnly) {

    return events.filter(event => {

        const fields = event.fields

        // Filtrer les évènements par les types
        const matchesTag = tagSelected ? fields.qfap_tags && fields.qfap_tags.split(";").some(tag => tag.toLowerCase() == tagSelected.toLowerCase())
            : tagsWanted.some(wanted => fields.qfap_tags && fields.qfap_tags.split(";").some(tag => tag.toLowerCase().includes(wanted.toLowerCase())))

        // Filtrer les évènements par la barre de recherche
        const matchesSearch = search ? (
            (fields.title && fields.title.toLowerCase().includes(search.toLowerCase())) ||
            (fields.lead_text && fields.lead_text.toLowerCase().includes(search.toLowerCase()))
        ) : true;

        // Filtrer les évènements par la date
        const matchesDate = dateSelected ? (
            fields.date_start &&
            fields.date_end &&
            fields.date_start.slice(0, 10) <= dateSelected.toISOString().slice(0, 10) &&
            fields.date_end.slice(0, 10) >= dateSelected.toISOString().slice(0, 10)
        ) : true;


        // Filtrer les évènements gratuits
        const matchesFree = freeOnly ? (
            fields.price_type && fields.price_type.toLowerCase().includes("gratuit")
        ) : true;

        return matchesTag && matchesSearch && matchesDate && matchesFree

    })

}