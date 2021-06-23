import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import './cssNames.css'
import styled from 'styled-components'

export default function Home(){
    return (
        <div className="home">
           <Link to="/dogs" style={{textDecoration: 'none'}}><button className="button1" >Ir a la Home</button></Link>
        </div>
    )
}