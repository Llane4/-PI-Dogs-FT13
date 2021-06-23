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
import DogsFinded from './DogsFinded';

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





const DogsFind=()=>{
    
    const [searchInput, setSearchInput]=useState()
  
    const dispatch=useDispatch()
    
    const fetchDogs=async()=>{
        const response=await axios.
            get(`http://localhost:3001/dogs?name=akita`)
            .catch((err)=>{console.log("Err", err)});
            dispatch(setDogs(response.data))
         
            
    }
    useEffect(()=>{
        fetchDogs()
    }, []);
    return (
        <div>
        <Search placeholder="Raza de perro..." handleChange={(e)=>{setSearchInput(e.target.value)}}/>
        <Link to={`find/${searchInput}`}><button >Find </button></Link>
        
        <Container>
            
            {DogsFinded()}
            
        </Container>
        


           
        </div>
    )
}
export default DogsFind