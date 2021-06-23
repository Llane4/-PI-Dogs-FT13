import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectDogs } from '../redux/actions/actions';
import styled from 'styled-components'
import './cssNames.css'

const DogCard = styled.div`
width: 30em;
min-width: 200px;
background-color: #ffffffb9;
border: 1px solid black;
border-radius:30px;
margin: 20px;
transition: transform .2s;
:hover{
    transform: scale(1.2); 
}
}
`

const Dog=(id)=>{

    const dispatch=useDispatch()
    const fetchDogs=async()=>{
        const response=await axios.
            get(`http://localhost:3001/dogs/${id.children[0]}`)
            .catch((err)=>{console.log("Err", err)});
          
            dispatch(selectDogs(response.data))
            
            
            
            
            
    }
    useEffect(()=>{
        fetchDogs()
    }, []);
    const dogs=useSelector((state)=> state.selectDog.dog)
    if(dogs){
        const {name, image, temperament,height,life_span,weight}=dogs
        if(height && weight){
            var altura=height.metric
            var peso=weight.metric
        }
        var img=image+".jpg"
        return (
            <article className="articl">
            
        <DogCard>
            
            <img class="dogoimg" src={img} alt={name}/>
            <div>{name}</div>
            <div className="texto">Temperamentos:{temperament}</div>
            <div className="texto">Altura: {altura} centimetros</div>
            <div className="texto">Peso: {peso} kg</div>
            <div className="texto">Esperanza de vida: {life_span}</div>
            
        </DogCard>
               
        </article>
        )
    }
    
    return null
    }
    

export default Dog
