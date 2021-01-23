const BASE_URL = '/main/api'

export function getListUsers() {
    console.log('in here')
    return fetch(`${BASE_URL}/get-users`, {method: 'GET'})
    .then(res => res.json())
    .then(({ allUsers }) => {
    console.log(allUsers)
    let allUsersMap = allUsers.map(userArr => {
            if (userArr[1]) return [userArr[0], JSON.parse(userArr[1])]
            else return userArr
    })
    console.log(allUsersMap)
    return allUsersMap
    })
}