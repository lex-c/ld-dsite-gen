import React, { useState, useEffect } from 'react';
import * as PicService from '../../services/PicService';
import './pics.css';


export default function Pics() {
    const [pics, setPics] = useState([["generic", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU"]])
    useEffect(() => {
        console.log('in the use effect')
        PicService.getPicSet()
        .then(({ picsData }) => {
            setPics(picsData)
        })
    }, [])
    return (
        <div class="wrapper">
            <div class="scrolls">
                { pics.map((picData) => (<img src={picData[1]} id={picData[0]} className="scroll-pic" alt="pic" />)) }
            </div>
        </div>
    );
}