const  axios = require('axios');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get(	'/dogs',(req, res)=>{
    if (req.query.hasOwnProperty("name")) {
        var quer=req.query.name
        quer=quer[0].toUpperCase() + quer.slice(1)
        axios.get(`https://api.thedogapi.com/v1/breeds?api_key=1b79416c-09f0-4b91-a101-485544e8064c`)
        .then(response => {
            var dat=response.data
            for(var i=0;i<dat.length;i++){
                if(quer===dat[i].name){
                    return res.send(dat[i])
                }
            }
            
            })
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


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
