const BASE_URL = '/main/api'

export function promptAnalysis() {
    return fetch(`${BASE_URL}/get-analysis`, {method: 'GET'})
    .then(res => res.json())
    .then(dat => console.log(dat))
}