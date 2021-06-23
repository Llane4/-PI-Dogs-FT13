import './App.css';
import React, { useState } from 'react';

import { Route, Switch, NavLink, HashRouter as Router , Link} from 'react-router-dom';
import Home from './components/Home';
import DogsListening from './components/Container';
import NavBar2 from './components/NavBar'

import Search from './components/Search';
import DogsFind from './components/Finded';
import TempsListening from './components/Temperament';
import AddDogs from './components/AddDogs';
import Dog from './components/Dog';
function App() {
  
  return (
    <div className="App">
      <Route path='/' exact component={Home} > 
      
      
      </Route>
            <Route path="/"  component={TempsListening}/>
    
            <Route path='/home' component={NavBar2}>  </Route>
            <Route path="/dogs"  exact component={NavBar2}/>
            <Route path="/dogs" exact component={DogsListening}/>
            <Route path="/dogs/add"  exact component={NavBar2}/>
            <Route path="/dogs/add"  exact component={AddDogs}/>
            
            <Route path='/d/:itemId' exact render={({ match }) => {
           return <Dog >{match.params.itemId} </Dog>     
     }}/>
    </div>
  );
}

export default App;
