import React, { useState, useEffect } from 'react'
import './pics.css';


export default function Pics() {
    const [pics, setPics] = useState(["https://firebasestorage.googleapis.com/v0/b/ld-dsite-gen.appspot.com/o/pics%2F32-323738_sexy-girl-vector-png-image-sexy-girl-vector.png?alt=media&token=e979c3ff-d2e2-44aa-8dec-9f283c97648f", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQylIUvFRNeTRkgs60PPvbzP1NiJbsaszJQ&usqp=CAU"])
    return (
        <div class="wrapper">
            <div class="scrolls">
                { pics.map((picUrl, idx) => (<img src={picUrl} id={`pic-${idx}`} className="scroll-pic" alt="pic" />)) }
            </div>
        </div>
    );
}