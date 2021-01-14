import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import * as PicService from '../../services/PicService';
import './pics.css';
import "react-image-gallery/styles/css/image-gallery.css"
import $ from 'jquery';

export default function Pics() {
    const [pics, setPics] = useState([])
    const [picsIntToggle, setPicsIntToggle] = useState(false)
    useEffect(() => {
        PicService.getPicSet()
        .then(({ picsData }) => setPics(picsData))
        let picsInterval = setInterval(() => {
            setPicsIntToggle(!picsIntToggle)
        }, 30000)
        return () => {
            clearInterval(picsInterval)
        }
    }, [picsIntToggle])    
    
    const setPicClass = (e) => {
        let picsInScroll = e.target.childNodes
        let windowWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        for (let pic of picsInScroll) {
            let fromLeft = pic.getBoundingClientRect().left
            let picWidth = pic.getBoundingClientRect().width
            if (fromLeft > 0 && fromLeft + picWidth < windowWidth + 50) { pic.className = "scroll-pic active" }
            else if (fromLeft < -100 | fromLeft + picWidth > windowWidth + 200) { pic.className = "scroll-pic inactive" }
        }
    }
    return (
        <>
        <div class="wrapper">
            <div class="scrolls" onScroll={setPicClass}>
                { pics.map((picData) => (<img src={picData[1]} id={picData[0]} className="scroll-pic inactive" alt="pic" />)) }
            </div>
        </div>
        {/* <ImageGallery 
        ref={i => this._imageGallery = i}
        slideInterval="2500"
        showBullets="true" 
        additionalClass="gallery-wrap"
        onMouseOver={() => this._imageGallery.pause()} 
        onMouseLeave={() => this._imageGallery.play()}
        items={pics.length > 0 ? pics.map((picData) => { let imgObj = {
            original: picData[1], 
            thumbnail: picData[1], 
            originalClass: 'gallery-pic', 
            thumbnailClass: 'thumb-pic', 
            bulletClass: 'bullet' }; 
            return imgObj }):[]} 
            /> */}
        </>
    );
}