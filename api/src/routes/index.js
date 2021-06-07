const  axios = require('axios');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get(	'/dogs',(req, res)=>{
    if (req.query.hasOwnProperty("name")) {
        var quer=req.query.name
        var split=quer.split(" ")
        for(var i=0;i<split.length;i++){
            split[i]=split[i][0].toUpperCase() + split[i].slice(1) 
        }
        quer=split.join(" ")
        axios.get(`https://api.thedogapi.com/v1/breeds?api_key=1b79416c-09f0-4b91-a101-485544e8064c`)
        .then(response => {
            var dat=response.data
            for(var i=0;i<dat.length;i++){
                if(quer===dat[i].name){
                    return res.send(dat[i])
                }
            }
            return res.send("No se encontro alguna raza de perro con ese nombre")
            }).catch(error=>res.status(500).json({error: "ups"}))
    } 
    else
    axios.get('https://api.thedogapi.com/v1/breeds?api_key=1b79416c-09f0-4b91-a101-485544e8064c')
    .then(response => {
        var dat=response.data.slice(0, 7)
        var tempo=[]
        for(var i=0;i<dat.length;i++){
            var obj={
                name:dat[i].name,
                image:dat[i].image.url,
                temperament:dat[i].temperament
            }
            tempo.push(obj)
        }
        res.send(tempo)
        })
    .catch(error=>res.status(500).json({error: "ups"}))
  })

  router.get('/dogs/:idRaza',(req,res)=>{
    var idR=req.params.idRaza
    axios.get(`https://api.thedogapi.com/v1/breeds/${idR}?api_key=1b79416c-09f0-4b91-a101-485544e8064c`)
    .then(response => {
        var dat=response.data
        console.log(dat.name)
        var obj2={
                name:dat.name,
                image: "https://cdn2.thedogapi.com/images/" +dat.reference_image_id,
                temperament:dat.temperament,
                life_span:dat.life_span,
                weight:dat.weight,
                height:dat.height
                }
                console.log(obj2)
        return res.send(obj2)
        })
    .catch(error=>res.status(500).json({error: "ups"}))
  })


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
