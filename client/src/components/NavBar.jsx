import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import './cssNames.css'

const NavBar = styled.nav`
background-color:  #4A403E ;
width: 100vw;
top: 0px;
padding: 10px;
display:flex;
margin-left:5rem;
textDecoration: 'none'


`

const Bhome=styled.button`
    display:flex;
    justify-content:center;
    align-content: center;
    text-decoration: none;
    padding: 10px;
    font-weight: 600;
    font-size: 20px;
    color: #ffffff;
    background-color: #1883ba;
    border-radius: 6px;
    border: 2px solid #0016b0;
    text-Decoration: 'none'
}
`
export default function navBar2(){
    return (
        <NavBar>
            <img className="imagen" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyDkFiL926-I6rUt9RSX781cd5Qv6uW4C-Fw&usqp=CAU"></img>
           <NavLink to="/dogs" style={{textDecoration: 'none'}}><Bhome >
        Lista de perros
    </Bhome> 


    </NavLink>
<NavLink to="/dogs/add" style={{textDecoration: 'none'}}><Bhome>Agregar una raza</Bhome></NavLink>
    
        </NavBar>
    )
}