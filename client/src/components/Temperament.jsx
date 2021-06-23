import axios from "axios";
import { useEffect } from "react";
import { resetTemps, setTemps } from "../redux/actions/actions";
import { useDispatch } from "react-redux";
import './cssNames.css'
import { addLeadingSlash } from "history/PathUtils";
import { useSelector } from "react-redux";
import { selectTemps } from "../redux/actions/actions";

const TempsListening=()=>{
    const dispatch=useDispatch()
    const fetchTemps=async()=>{
    const response=await axios.
        get(`http://localhost:3001/temperament`)
        .catch((err)=>{console.log("Err", err)});
        dispatch(setTemps(response.data))
        
}
useEffect(()=>{
    fetchTemps()
}, []);
const tempo=  (name)=>{
    dispatch(selectTemps(name))
}
const temps=useSelector((state)=> state.allTemps.temps)
const handleclick=(e)=>{
    if(e){dispatch(selectTemps(e))}
    else dispatch(resetTemps())

}
var lurl=false;
if(window.location.href!=="http://localhost:3000/dogs"){
    lurl=true
}
else{}
const renderList=temps.map((temps)=>{
    const {name}=temps
        return (
            <li ><button onClick={(e)=>handleclick(name)} >X</button>{name}</li>
        )}
    
)
if(lurl===false)
{return (<nav className="sidebar">
    
    <ui className="sidebar-text">Filtros<button onClick={(e)=>handleclick()} >Resetear filtros</button>{renderList} </ui>
</nav>)}
else return null
}

export default TempsListening
