import axios from 'axios'
import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'


const Container = styled.div`

display: flex;
justify-content: center;
align-items: center;
margin:3vh  ;text-align: justify


@media (max-width: 375px) {
    flex-direction: column;
  }

top: 150px;
`
const DogCard = styled.div`


width: 30em;
min-width: 200px;
background-color: #ffffffb9;
border: 1px solid black;
border-radius:10px;
overflow-y: auto;
transition: transform .2s;
font-family:cursive;


}
`
const AddDogs=()=> {
    
    var temper2=useSelector((state)=>state.allTemps.temps)
    function validate(input){
        let errors = {};
         if (!/^[A-Z]+$/i.test(input.name)) {
             errors.name = 'Nombre invalido';
            }
        if (!/^([0-9])*$/.test(input.life_span_min)) {
             errors.life_span_min = 'Esperanza minima invalida';
            }
        if (!/^([0-9])*$/.test(input.life_span_max)) {
            errors.life_span_max = 'Esperanza maxima invalida';
        }
        if((input.life_span_min && input.life_span_max)?parseInt(input.life_span_min)>parseInt(input.life_span_max):false){
            errors.life_span_max = 'Min no puede ser mayor que Max';
        }
        if (!/^([0-9])*$/.test(input.height_min)) {
            errors.height_min = 'Altura minima invalido';
        }
        if (!/^([0-9])*$/.test(input.height_max)) {
            errors.height_max = 'Altura maxima invalido';
        }
        if((input.height_min && input.height_max)?parseInt(input.height_min)>parseInt(input.height_max):false){
            errors.height_max = 'Min no puede ser mayor que Max';
        }
        if (!/^([0-9])*$/.test(input.weight_min)) {
            errors.weight_min = 'Peso minimo invalido';
        }
        if (!/^([0-9])*$/.test(input.weight_max)) {
            errors.weight_max = 'Peso maximo invalido';
        }
        if((input.weight_min && input.weight_max)?parseInt(input.weight_min)>parseInt(input.weight_max):false){
            errors.weight_max = 'Min no puede ser mayor que Max';
        }

            return errors
         }
         
    const [errors, setErrors] = useState({});
    const [tempo, setTempo] = useState("h");
    const tempo4=()=>{
        var manito=[...tempo]
        setTempo("0")}
    const [data,setData]=useState({
        name: "",
        life_span_min:"",
        life_span_max:"",
        id:"",
        height_min:"",
        height_max:"",
        weight_min:"",
        weight_max:"",
        temperaments:"",
        img:""
    })
    function submit(e){
        e.preventDefault()
        axios.post("http://localhost:3001/dog/",{
            name: data.name,
            life_span:data.life_span_min + "-"+data.life_span_max,
            temperament:data.temperaments,
            height:data.height_min+" - "+ data.height_max,
            weight:data.weight_min + " - "+data.weight_max,
            image:data.img
        })
        .then(res=>{console.log(res.data)})
    }
    function handle(e){
        const newdata={...data}
        
        setErrors(validate({
            ...newdata,
            [e.target.id]: e.target.value
          }));
        
        newdata[e.target.id]=e.target.value
        setData(newdata)
        
    }
    console.log(tempo)
    return (
        <div data-testid="formulario">
            <form onSubmit={(e)=> submit(e)} >
                <Container>
               <DogCard>
                Nombre:<input onChange={(e)=>handle(e)} id="name" name="name" value={data.name} className={errors.name && 'danger'} placeholder="Nombre..." type="text"></input>
                {errors.name && (<p className="danger">{errors.name}</p>)}
                <br />
                Esperanza de vida minima:<input onChange={(e)=>handle(e)} id="life_span_min" name="life_span_min" value={data.life_span_min} className={errors.life_span_min && 'danger'}   placeholder="Esperanza de vida minima..." type="text"></input>
                {errors.life_span_min && (<p className="danger">{errors.life_span_min}</p>)}
                <br />
                Esperanza de vida maxima:<input onChange={(e)=>handle(e)} id="life_span_max" name="life_span_max" value={data.life_span_max} className={errors.life_span_max && 'danger'} placeholder="Esperanza de vida maxima..." type="text"></input>
                {errors.life_span_max && (<p className="danger">{errors.life_span_max}</p>)}
                <br />
                Altura minima:<input onChange={(e)=>handle(e)} id="height_min" name="height_min" value={data.height_min} className={errors.height_min && 'danger'} placeholder="Altura minima..." type="text"></input>
                {errors.height_min && (<p className="danger">{errors.height_min}</p>)}
                <br />
                Altura maxima:<input onChange={(e)=>handle(e)} id="height_max" name="height_max" value={data.height_max} className={errors.height_max && 'danger'} placeholder="Altura maxima..." type="text"></input>
                {errors.height_max && (<p className="danger">{errors.height_max}</p>)}
                <br />
                Peso minimo:<input onChange={(e)=>handle(e)} id="weight_min" name="weight_min" value={data.weight_min} placeholder="Peso minimo..." type="text"></input>
                {errors.weight_min && (<p className="danger">{errors.weight_min}</p>)}
                <br />
                Peso maximo:<input onChange={(e)=>handle(e)} id="weight_max" name="weight_max" value={data.weight_max} placeholder="Peso maximo..." type="text"></input>
                {errors.weight_max && (<p className="danger">{errors.weight_max}</p>)}
                <br />
                Temperamento:<input onChange={(e)=>handle(e)} id="temperaments" name="temperaments" value={data.temperaments} placeholder="Temperamentos..." type="text"></input>
                <br />
                Imagen:<input onChange={(e)=>handle(e)} id="img" name="img" value={data.img} placeholder="Link de la imagen..." type="text"></input>
                <br />
                
                
                
                {Object.keys(errors).length===0?<button>Submit</button>:null}
                </DogCard>
                </Container>
            </form>
            
        </div>
    )
}

export default AddDogs
