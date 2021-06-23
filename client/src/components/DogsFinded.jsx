import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom"
import {useSelector} from 'react-redux'
import './cssNames.css'
import axios from "axios"
import styled from 'styled-components'
import { Pagination } from './Pagination';


 
const DogCard = styled.div`
width: 30em;
min-width: 200px;
background-color: #ffffffb9;

margin: 20px;

}
`

const DogsFinded=(index1, index2)=>{
    
    const dogs=useSelector((state)=> state.allDogs.dogs)
  
    
    const currentDogs=dogs.slice(index1,index2)
 
    if(dogs){const renderList=dogs.map((dogs)=>{
        const {name, image, temperament}=dogs

        return (
            <article>
            <DogCard>
                
                <img class="dogoimg" src={image.url} alt={name}/>
                <div>{name}</div>
                <div className="texto">{temperament}</div>
              
            </DogCard>
                

            </article>
            )
    })
    return <>{renderList}</>}
    return null
}
export default DogsFinded