import React, { useState, useEffect } from 'react'
import * as AddPicsService from '../../services/AddPics'
import $ from 'jquery';

export default function AdminPics() {
    const [addPics, setAddPics] = useState([])
    const [addPicsUrls, setAddPicsUrls] = useState([])
    const [picsForm, setPicsForm] = useState()
    
    useEffect(async() => {
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
            <input type="text" name="description" />
            <label>Tag</label>
            <input type="text" name="tag" />
            <button>+</button>
            </>
        ))}
        </>
    );
}