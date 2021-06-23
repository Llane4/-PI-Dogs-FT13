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
border: 1px solid black;
border-radius:30px;
margin: 20px;
transition: transform .2s;
font-family:cursive;

:hover{
    transform: scale(1.1); 
}
}
`

const DogsComponent=(index1, index2, nombre, alfa, pesos)=>{ 
    
    const temper=useSelector((state)=>state.allSelects.temps)
    const dogs=useSelector((state)=> state.allDogs.dogs)
    const dogs2=useSelector((state)=> state.allDogs.dogs)
    if(pesos===2){
        if(alfa===1){
        dogs.sort(function (o1,o2) {
            if (o1.name < o2.name) { //comparación lexicogŕafica
              return 1;
            } else if (o1.name > o2.name) {
              return -1;
            } 
            return 0;
          });
    }
    else{
        
            dogs.sort(function (o1,o2) {
                if (o1.name > o2.name) { //comparación lexicogŕafica
                  return 1;
                } else if (o1.name < o2.name) {
                  return -1;
                } 
                return 0;
              });
        
    }}
    if(pesos!==2){

        if(pesos===0){
            dogs.sort(function (o1,o2) {
              
              var pes1=(o1.weight.metric ? o1.weight.metric.split(" - ")  : o1.weight.split(" - "))
              var pes2=(o2.weight.metric ? o2.weight.metric.split(" - ")  : o2.weight.split(" - "))
                
                
                if(pes1[0]==="NaN"){
                    pes1=pes1[1]
                    
                }
                else{
                
                    pes1=(parseInt(pes1[0])+(parseInt(pes1[1])?parseInt(pes1[1]):parseInt(pes1[0])))/2
                    
                }
                if(pes2[0]==="NaN"){
                    pes2=pes2[1]
                   
                }
                else{
                
                    pes2=(parseInt(pes2[0])+(parseInt(pes2[1])?parseInt(pes2[1]):parseInt(pes2[0])))/2
                 
                }


                if (pes1 < pes2) { //comparación lexicogŕafica
                  return 1;
                } else if (pes1 > pes2) {
                  return -1;
                } 
                return 0;
              });
        }
        else{
            
                dogs.sort(function (o1,o2) {
                  
                  var pes1=(o1.weight.metric ? o1.weight.metric.split(" - ")  : o1.weight.split(" - "))
                  var pes2=(o2.weight.metric ? o2.weight.metric.split(" - ")  : o2.weight.split(" - "))
                
                if(pes1[0]==="NaN"){
                    pes1=pes1[1]
                    
                }
                else{
                
                    pes1=(parseInt(pes1[0])+(parseInt(pes1[1])?parseInt(pes1[1]):parseInt(pes1[0])))/2
                    
                }
                if(pes2[0]==="NaN"){
                    pes2=pes2[1]
                    
                }
                else{
                    pes2=(parseInt(pes2[0])+(parseInt(pes2[1])?parseInt(pes2[1]):parseInt(pes2[0])))/2
                 
                }
                    if (pes1 > pes2) { //comparación lexicogŕafica
                      return 1;
                    } else if (pes1 < pes2) {
                      return -1;
                    } 
                    return 0;
                  });
            
        }
    }
    if(nombre){
        var split = nombre.split(" ")
        for (var i = 0; i < split.length; i++) {
            split[i] = split[i][0].toUpperCase() + split[i].slice(1)  
        }
        nombre = split.join(" ")}
        var currentDogs=dogs
      
    if(temper.length<=0 && nombre===""){  
    currentDogs=dogs.slice(index1,index2)}
    else
    {  
        currentDogs=dogs2   
    }
    
    function paginado(){
        var pag=Math.ceil(dogs2.length/10)
      
        return <div>{pag}</div>
    }
    if(dogs){const renderList=currentDogs.map((dogs)=>{
        const {name, image, temperament,id}=dogs
        
            if(name.includes(nombre))
            {
                if(temperament)
                {
                    var cont=0
                    var tempp=temperament.split(", ")
                    for(var i=0;i<tempp.length;i++){
                        for(var j=0;j<temper.length;j++){
                            
                          if(tempp[i]===temper[j]){
                            cont++
                          }
                        }
                      }
                    if(cont===temper.length)
                    {return (
                        <article>
                    <DogCard>
                            <Link to={`d/${id}`}  style={{textDecoration: 'none'}}>
                        <img class="dogoimg" src={image.url || image + ".jpg"} alt={name}/>
                        <div>{name}</div>
                            </Link>
                        <div className="texto">{temperament}</div>
                    </DogCard>
                    </article>
                    )}
                }
            }
        
    })
    return <>{renderList}</>}
    return null
}
export default DogsComponent;
