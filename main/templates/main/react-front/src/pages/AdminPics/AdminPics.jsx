import React, { useState, useEffect } from 'react';
import * as AddPicsService from '../../services/AddPics';
import * as PicService from '../../services/PicService'
import './AdminPics.css';
import $ from 'jquery';

export default function AdminPics() {
    const [addPics, setAddPics] = useState([])
    const [addPicsNames, setAddPicsNames] = useState([])
    const [addPicsUrls, setAddPicsUrls] = useState([])
    const [picsForm, setPicsForm] = useState()
    const [picsDBInfo, setPicsDBInfo] = useState({ descriptions: {}, tagslists: {} })
    const [oldPics, setOldPics] = useState([])

    useEffect(() => {
        PicService.getPicSet()
        .then(pics => setOldPics(pics))
    }, [])

    useEffect(async() => {
        let arrayAddPics = [...addPics]
        let addPicsNames = arrayAddPics.map(pic => pic.name)
        let picsDBInfoClone = { ...picsDBInfo }
        let descriptionsPicNames = Object.keys(picsDBInfoClone.descriptions)
        if (descriptionsPicNames.length > 0) {
            for (let picName of descriptionsPicNames) {
                if (addPicsNames.indexOf(picName) < 0) {
                    delete picsDBInfoClone.descriptions[picName]
                    delete picsDBInfoClone.tagslists[picName]
                }
            }
        }
        setPicsDBInfo(picsDBInfoClone)
        setAddPicsNames(addPicsNames)
        let picsData = new FormData()
        for (var i = 0; i < addPics.length; i++) picsData.append('file', addPics[i])
        setPicsForm(picsData)
        let pics = await picsData.getAll('file')
        let picUrls = pics.map(pic => URL.createObjectURL(pic))
        setAddPicsUrls(picUrls)
    }, [addPics])

    useEffect(() => {
        let { tagslists } = {...picsDBInfo}
        for (let picName of addPicsNames) {
            if (!tagslists[picName]) tagslists[picName] = [['', '']];
        }
    })

    const handlePicsInputChange = (e) => {
        const newDataTransfer = new DataTransfer();
        for (let file of e.target.files) newDataTransfer.items.add(file);
        setAddPics(newDataTransfer.files)
    }

    const handleSubmit = async (e) => {
        let picsDBInfoClone = {...picsDBInfo}
        let jsonDB = JSON.stringify(picsDBInfoClone)
        let blob = new Blob([jsonDB], { type: 'application/json' })
        picsForm.append('dbInfo', blob)
        AddPicsService.addPicsDBandFB(picsForm)
    }

    const handleRemovePic = (e) => {
        let idx = e.target.dataset.idx;
        let addPicsCopy = [...addPics]
        addPicsCopy.splice(idx, 1)
        let newFileList = new DataTransfer()
        for (let pic of addPicsCopy) newFileList.items.add(pic)
        setAddPics(newFileList.files)
    }
    const handleDescriptionChange = (e) => {
        let { descriptions } = { ...picsDBInfo }
        descriptions[addPicsNames[e.target.dataset.idx]] = e.target.value
        setPicsDBInfo({ ...picsDBInfo, descriptions })
    }
    // const handleTagsChange = (e) => {
    //     let { tagslists } = { ...picsDBInfo }
    //     tagslists[addPicsNames[e.target.dataset.idx]] = e.target.value
    //     setPicsDBInfo({ ...picsDBInfo, tagslists })
    // }

    const handleRemovePicClick = (e) => {
        let picName = e.target.id
        AddPicsService.removePicDBandFB(picName)
        .then(res => console.log(res))
    }

    const handleTagChange = (e) => {
        let { tagslists } = {...picsDBInfo}
        let idxsArr = e.target.dataset.idxs.split(',')
        let idxsArrInt = idxsArr.map(idx => parseInt(idx))
        let picName = addPicsNames[idxsArrInt[0]]
        let tagIndex = idxsArrInt[1]
        tagslists[picName][tagIndex][0] = e.target.value
        setPicsDBInfo({ ...picsDBInfo, tagslists })
    }

    const handleTagIntensityChange = (e) => {
        let { tagslists } = {...picsDBInfo}
        let idxsArr = e.target.dataset.idxs.split(',')
        let idxsArrInt = idxsArr.map(idx => parseInt(idx))
        let picName = addPicsNames[idxsArrInt[0]]
        let tagIndex = idxsArrInt[1]
        tagslists[picName][tagIndex][1] = e.target.value
        setPicsDBInfo({ ...picsDBInfo, tagslists })
    }

    const handleRemoveTagClick = (e) => {
        let { tagslists } = {...picsDBInfo}
        let idxsArr = e.target.dataset.idxs.split(',')
        let idxsArrInt = idxsArr.map(idx => parseInt(idx))
        let picName = addPicsNames[idxsArrInt[0]]
        let tagIndex = idxsArrInt[1]
        tagslists[picName].splice(tagIndex, 1)
        setPicsDBInfo({...picsDBInfo, tagslists})
    }

    const handleAddTagClick = (e) => {
        let { tagslists } = {...picsDBInfo}
        let picName = addPicsNames[e.target.dataset.idx]
        tagslists[picName].push(['', ''])
        setPicsDBInfo({...picsDBInfo, tagslists})
    }

    return (
        <>
        <h3>hi</h3>
        <input id="picsInp" type="file" name="picsInput" files={addPics} onChange={handlePicsInputChange} multiple />
        <button onClick={handleSubmit} type="submit">ADD</button>
        {addPicsUrls.map((picUrl, idx) => (
            <>
            <button data-idx={idx} onClick={handleRemovePic}>Remove</button>
            <img src={picUrl} alt="" />
            <label>Description</label>
            <input data-idx={idx} type="text" name="description" value={picsDBInfo.descriptions[addPicsNames[idx]]} onChange={handleDescriptionChange} />
            <label>Tags</label>
            {picsDBInfo['tagslists'][addPicsNames[idx]].map((tag, tIdx) => (
                <>
                <input type="text" data-idxs={[idx, tIdx]} value={picsDBInfo['tagslists'][addPicsNames[idx]][tIdx][0]} onChange={handleTagChange} />
                <input type="number" data-idxs={[idx, tIdx]} value={picsDBInfo['tagslists'][addPicsNames[idx]][tIdx][1]} onChange={handleTagIntensityChange} />
                <button data-idxs={[idx, tIdx]} onClick={handleRemoveTagClick} >-</button>
                </>
            ))}
            <button data-idx={idx} onClick={handleAddTagClick} >+</button>
            </>
        ))}
        {oldPics.map(picData => (
            <>
            <img src={picData[1]} id={picData[0]} alt="old-pic" />
            <button id={picData[0]} className="remove-pic-btn" onClick={handleRemovePicClick}>X</button>
            </>
        ))}
        </>
    );
}