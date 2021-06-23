import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useParams} from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import { Link } from 'react-router-dom';
import { setDogs } from '../redux/actions/actions';
import DogsComponent from './DogsComponent';
import './cssNames.css'
import styled from 'styled-components'
import { Pagination } from './Pagination';
import Search from './Search';

const Container = styled.div`

display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;

@media (max-width: 375px) {
    flex-direction: column;
  }

top: 150px;
`





const DogsListening=()=>{
    const [currentPage, setCurrentPage]=useState(1);
    const [alfab, setAlfab]=useState(0);
    const [pesos, setPesos]=useState(2);
    const [dogsPerPage, setDogsPerPage]=useState(10)
    const [cantDogs, setCantDogs]=useState(0)
    const [searchInput, setSearchInput]=useState("")
    const nexto=()=>setCurrentPage(1)
    const filtroA=()=>setAlfab(1)
    const filtroZ=()=>setAlfab(0)
    const pesosA=()=>setPesos(1)
    const pesosZ=()=>setPesos(0)
    const backto=(e)=>setCurrentPage(e)
    const restablecer=()=>{
        setPesos(2)
        setAlfab(0)
    }
    const indexOfLastDogs= currentPage*dogsPerPage;
    const indexOfFirstDogs=indexOfLastDogs-dogsPerPage;
    const dispatch=useDispatch()
    const fetchDogs=async()=>{
        const response=await axios.
            get(`http://localhost:3001/alldogs`)
            .catch((err)=>{console.log("Err", err)});
            const pag=response.data.length
            
            dispatch(setDogs(response.data))
            setCantDogs(pag)
            
            
            
            
    }
    useEffect(()=>{
        fetchDogs()
    }, []);
    function pagina(){
        var cantPags=Math.ceil(cantDogs/dogsPerPage)
        var arr=[]
        for(var i=0;i<cantPags;i++){
            arr.push(i+1)
        }

        return arr
    }
    
    return (
        <div>
            {
                pesos!==2?null:(alfab===0? <button onClick={()=>filtroA()}>Ordenar al revez</button>:
                <button onClick={()=>filtroZ()}>Ordenar al derevez</button>)
            }
            {
                pesos===0 || pesos===2 ? <button onClick={()=>pesosA()}>Ordenar por peso ascendente</button>:
                <button onClick={()=>pesosZ()}>Ordenar por peso descendente</button>
            }
            {
                (pesos!==2)?<button onClick={()=>restablecer()}>Restablecer</button>:null
            }
            
        <Search placeholder="Raza de perro..." handleChange={(e)=>{setSearchInput(e.target.value)}}/>
        <button onClick={useEffect(()=>{
        fetchDogs()
    }, [])}>Find </button>
        
        <Container>
            {DogsComponent(indexOfFirstDogs, indexOfLastDogs, searchInput, alfab, pesos)}
            
        </Container>
        
            { pagina().map((e)=>{
                return <button onClick={()=>backto(e)} className="button2">{e} </button>
            })}
            

           
        </div>
    )
}
export default DogsListening