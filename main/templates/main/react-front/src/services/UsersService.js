const BASE_URL = '/main/api'

export function getAllUsers() {
    return fetch(`${BASE_URL}/get-all-users`, {method: 'GET'})
    .then(res => res.json())
    .then(({ allUsers }) => allUsers)
}

export function getAllUsersInfo() {
    return fetch(`${BASE_URL}/get-user-info`, {method: 'GET'})
    .then(res => res.json())
    .then(({ allUsers }) => {
    let allUsersMap = allUsers.map(userArr => {
            if (userArr[1]) return [userArr[0], JSON.parse(userArr[1])]
            else return userArr
    })
    return allUsersMap
    })
}

export function getUserInterestPrediction(userId, tags) {
    let queryString = ''
    for (let tagInfo of tags) {
        queryString += 'dfg67dfg'
        tagInfo.forEach((entry, index) => {
            queryString += entry
            if (index === 0) queryString += 'rt45rt'
        })
    }
    return fetch(`${BASE_URL}/get-user-interest-prediction/${userId}/${queryString}`, {method: 'GET'})
    .then(res => res.json())
    .then(({ predictedInterest }) => predictedInterest)
}