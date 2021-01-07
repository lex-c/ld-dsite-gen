const BASE_URL = '/main/api'

export function getPicSet() {
    return fetch(`${BASE_URL}/get-pics`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(picData => picData)
}