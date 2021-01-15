import React, { useState, useEffect } from 'react'
import * as AddPicsService from '../../services/AddPics'
import './AdminPics.css'
import $ from 'jquery';

export default function AdminPics() {
    const [addPics, setAddPics] = useState([])
    const [addPicsNames, setAddPicsNames] = useState([])
    const [addPicsUrls, setAddPicsUrls] = useState([])
    const [picsForm, setPicsForm] = useState()
    const [picsDBInfo, setPicsDBInfo] = useState({ descriptions: {}, tagslists: {} })
    
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

    const handlePicsInputChange = (e) => {
        const newDataTransfer = new DataTransfer(); 
        for (let file of e.target.files) newDataTransfer.items.add(file); 
        setAddPics(newDataTransfer.files)
    }

    const handleSubmit = async (e) => {
        let picsDBInfoCorr = {...picsDBInfo}
        let { tagslists } = picsDBInfoCorr
        addPicsNames.forEach(picName => {
            if (tagslists[picName]) tagslists[picName] = tagslists[picName].split(", ")
        })
        let jsonDB = JSON.stringify(picsDBInfoCorr)
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
    const handleTagsChange = (e) => {
        let { tagslists } = { ...picsDBInfo }
        tagslists[addPicsNames[e.target.dataset.idx]] = e.target.value
        setPicsDBInfo({ ...picsDBInfo, tagslists })
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
            <label>Tag</label>
            <input data-idx={idx} type="text" name="tags" value={picsDBInfo.tagslists[addPicsNames[idx]]} onChange={handleTagsChange} />
            <button>+</button>
            </>
        ))}
        </>
    );
}