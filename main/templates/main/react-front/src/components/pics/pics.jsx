import React, { useState, useEffect } from 'react'
import './pics.css';


const resetPics = (setPics) => {
    setPics(["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU"])
}
const handleScroll = (setPics) => {
    console.log('scroll')
    setPics([])
    resetPics(setPics)
} 

export default function Pics() {
    const [pics, setPics] = useState(["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU"])
    return (
        <div class="wrapper">
            <div class="scrolls" onScroll={() => handleScroll(setPics)}>
                { pics.map((picUrl, idx) => (<img src={picUrl} id={`pic-${idx}`} className="scroll-pic" alt="pic" />)) }
            </div>
        </div>
    );
}