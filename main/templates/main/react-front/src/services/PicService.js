const BASE_URL = '/main/api'

export function getPicSet() {
    console.log('in the serice get')
    return fetch(`${BASE_URL}/get-pics`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(picData => {
        console.log('picData:     ', picData)
        return picData
    })
}