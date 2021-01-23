import React, { useState, useEffect } from 'react';
import * as UsersService from '../../services/UsersService'

export default function Predictions() {
    const [appUsers, setAppUsers] = useState([])
    useEffect(() => {
        UsersService.getListUsers()
        .then(allUsers => setAppUsers(allUsers))
    }, [])
    return (
        <>
        <h3>the predictions page</h3>
        <h3></h3>
        <h3>list users and pick to get pics sorted by their interest</h3>
        <h3>All Users IDs</h3>
        {appUsers.map(userInfo => (<h3>{userInfo[0]}</h3>))}
        </>
    )
}