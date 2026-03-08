
export const tagsWanted = ["Concert", "Expo", "Théâtre", "Sciences", "Balade urbaine", "Sport"];

export async function fetchEvents() {

    const url = "https://parisdata.opendatasoft.com/api/records/1.0/search/?dataset=que-faire-a-paris-&rows=200";
    const response = await fetch(url);
    const json = await response.json();

    console.log(json.records);
    return json.records;
};



export function filterEvents(events, search, tagSelected, dateSelected, freeOnly) {

    return events.filter(event => {

        const fields = event.fields

        const matchesTag = tagSelected ? fields.qfap_tags && fields.qfap_tags.split(";").some(tag => tag.toLowerCase() == tagSelected.toLowerCase())
            : tagsWanted.some(wanted => fields.qfap_tags && fields.qfap_tags.split(";").some(tag => tag.toLowerCase().includes(wanted.toLowerCase())))

        const matchesSearch = search ? (
            (fields.title && fields.title.toLowerCase().includes(search.toLowerCase())) ||
            (fields.lead_text && fields.lead_text.toLowerCase().includes(search.toLowerCase()))
        ) : true;

        const matchesDate = dateSelected ? (
            fields.date_start &&
            fields.date_end &&
            fields.date_start.slice(0, 10) <= dateSelected.toISOString().slice(0, 10) &&
            fields.date_end.slice(0, 10) >= dateSelected.toISOString().slice(0, 10)
        ) : true;

        if (fields.date_start && fields.date_end && dateSelected) {
            console.log("Comparing dates for event:", fields.title);
            console.log("Event start date:", fields.date_start.slice(0, 10));
            console.log("Event end date:", fields.date_end.slice(0, 10));
            console.log("Selected date:", dateSelected.toISOString().slice(0, 10));
            console.log(matchesDate);
        }



        const matchesFree = freeOnly ? (
            fields.price_type && fields.price_type.toLowerCase().includes("gratuit")
        ) : true;

        return matchesTag && matchesSearch && matchesDate && matchesFree

    })

}