export async function fetchEvents() {
    const url = "https://parisdata.opendatasoft.com/api/records/1.0/search/?dataset=que-faire-a-paris-&rows=100"
    const response = await fetch(url)
    const json = await response.json()

    console.log(json.records);
    return json.records
}
