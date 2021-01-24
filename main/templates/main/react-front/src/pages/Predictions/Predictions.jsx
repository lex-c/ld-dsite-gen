import React, { useState, useEffect } from 'react';
import * as UsersService from '../../services/UsersService'

export default function Predictions() {
    const [allUsers, setAllUsers] = useState([])
    const [allUsersInfo, setAllUsersInfo] = useState([])
    const [predictPicsTags, setPredictPicsTags] = useState({  })
    const [predictedInterest, setPredictedInterest] = useState({  })

    useEffect(() => {
        UsersService.getAllUsers()
        .then(userIds => {
            setAllUsers(userIds)
            let predictPicsInit = {  }
            let predictedInterestInit = {  }
            userIds.map(userId => {
                predictPicsInit[`user*${userId}`] = [['', '']]
                predictedInterestInit[`user*${userId}`] = ''
            })
            setPredictPicsTags(predictPicsInit)
            setPredictedInterest(predictedInterestInit)
        })
    }, [])

    useEffect(() => {
        UsersService.getAllUsersInfo()
        .then(allUsersInfo => setAllUsersInfo(allUsersInfo))
    }, [])

    const handleTagChange = (e) => {
        let predictPicsTagsClone = {...predictPicsTags}
        let userId = e.target.dataset.userid
        let tagIdx = e.target.dataset.tagidx
        predictPicsTagsClone[`user*${userId}`][tagIdx][0] = e.target.value
        setPredictPicsTags(predictPicsTagsClone)
    }

    const handleIntensityChange = (e) => {
        let predictPicsTagsClone = {...predictPicsTags}
        let userId = e.target.dataset.userid
        let tagIdx = e.target.dataset.tagidx
        predictPicsTagsClone[`user*${userId}`][tagIdx][1] = e.target.value
        setPredictPicsTags(predictPicsTagsClone)
    }

    const handleRemoveTagClick = (e) => {
        let predictPicsTagsClone = {...predictPicsTags}
        let userId = e.target.dataset.userid
        let tagIdx = e.target.dataset.tagidx
        predictPicsTagsClone[`user*${userId}`].splice(tagIdx, 1)
        setPredictPicsTags(predictPicsTagsClone)
    } 

    const handleAddTagClick = (e) => {
        let predictPicsTagsClone = {...predictPicsTags}
        let userId = e.target.dataset.userid
        predictPicsTagsClone[`user*${userId}`].push(['', ''])
        setPredictPicsTags(predictPicsTagsClone)
    }

    const handleSubmitPredict = (e) => {
        let predictedInterestClone = {...predictedInterest}
        let userId = e.target.dataset.userid
        let userPTags = predictPicsTags[`user*${userId}`]
        UsersService.getUserInterestPrediction(userId, userPTags)
        .then(interest => {
            predictedInterestClone[`user*${userId}`] = interest
            setPredictedInterest(predictedInterestClone)
        })
    }

    return (
        <>
        <h3>All Users</h3>
        {allUsers.map(userId => (<h3>{userId}</h3>))}
        <h3>All Users Info</h3>
        {allUsersInfo.map(userInfo => (
            <>
            <h3>User ID: {userInfo[0]}</h3>
            {userInfo[1] ?
            <>
            {Object.keys(userInfo[1]).map(picName => (
                <h3>{picName}: {userInfo[1][picName]}</h3>
            ))}
            <label>Predict Pic Tags</label>
            {predictPicsTags[`user*${userInfo[0]}`].map((userPTagInfo, tIdx) => (
                <>
                <input type="text" data-userid={userInfo[0]} data-tagidx={tIdx} value={predictPicsTags[`user*${userInfo[0]}`][tIdx][0]} onChange={handleTagChange} />
                <input type="number" data-userid={userInfo[0]} data-tagidx={tIdx} value={predictPicsTags[`user*${userInfo[0]}`][tIdx][1]} onChange={handleIntensityChange} />
                <button data-userid={userInfo[0]} data-tagidx={tIdx} onClick={handleRemoveTagClick} >-</button>
                </>
            ))}
            <button data-userid={userInfo[0]} onClick={handleAddTagClick} >+</button>
            <button data-userid={userInfo[0]} onClick={handleSubmitPredict} >Submit</button>
            <h3>prediction</h3>
            <h3>{predictedInterest[`user*${userInfo[0]}`]}</h3>
            </>
            :
            <>
            <h3>No interest data yet</h3>
            </>}
            </>
        ))}
        </>
    )
}