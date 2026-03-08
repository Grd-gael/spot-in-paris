
export const tagsWanted = ["Concert", "Expo", "Théâtre", "Sciences", "Balade urbaine", "Sport"];

export async function fetchEvents() {

    const url = "https://parisdata.opendatasoft.com/api/records/1.0/search/?dataset=que-faire-a-paris-&rows=200";
    const response = await fetch(url);
    const json = await response.json();

    console.log(json.records);
    return json.records;
};



export function filterEvents(events, search, tagSelected, dateSelected) {

    if (!tagSelected && !search) {
        return events.filter(event =>
            event.fields.qfap_tags && event.fields.qfap_tags.split(";").some(tag =>
                tagsWanted.some(tagWanted =>
                    tag.toLowerCase().includes(tagWanted.toLowerCase())
                )
            )
        )
    }

    else if (search && !tagSelected) {

        return events.filter(event =>
            (event.fields.title && event.fields.title.toLowerCase().includes(search)) ||
            (event.fields.lead_text && event.fields.lead_text.toLowerCase().includes(search))
        );
    }

    else if (!search && tagSelected) {
        return events.filter(event =>
            event.fields.qfap_tags && event.fields.qfap_tags.split(";").some(tag =>
                tag.toLowerCase() === tagSelected.toLowerCase()
            )
        );
    }

    else {

        return events.filter(event => {
            const matchesSearch = event.fields.title.toLowerCase().includes(search.toLowerCase()) ||
                (event.fields.lead_text && event.fields.lead_text.toLowerCase().includes(search.toLowerCase()));

            const matchesTag = !tagSelected || event.fields.qfap_tags?.split(';').some(tag =>
                tag.toLowerCase().includes(tagSelected.toLowerCase())
            );

            return matchesSearch && matchesTag;
        });

    }


};