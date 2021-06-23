const axios = require('axios');
const {Router} = require('express');
var Sequelize = require("sequelize")
const { v4:uuidv4} =require('uuid')
const {Temperament, Dog} = require("../db")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
var PrimIns = true;
router.get('/dogs', (req, res) => {
    
    if (req.query.hasOwnProperty("name") && req.query.name!=="") {
        var quer = req.query.name
        var split = quer.split(" ")
        for (var i = 0; i < split.length; i++) {
            split[i] = split[i][0].toUpperCase() + split[i].slice(1)
        }
        quer = split.join(" ")
        axios.get(`https://api.thedogapi.com/v1/breeds?api_key=1b79416c-09f0-4b91-a101-485544e8064c`)
            .then(response => {
                var dat = response.data
                var tempo = []
                for (var i = 0; i < dat.length; i++) {
                    if (dat[i].name.includes(quer) && tempo.length < 100) {
                        tempo.push(dat[i])
                    }
                }
                if (tempo.length > 0) return res.send(tempo);

                return res.send("No se encontro alguna raza de perro con ese nombre")
            }).catch(error => res.status(500).json({
                error: "ups"
            }))
    } else
        axios.get('https://api.thedogapi.com/v1/breeds?api_key=1b79416c-09f0-4b91-a101-485544e8064c')
        .then(response => {
            var dat = response.data.slice(0, 8)
            var tempo = []
            for (var i = 0; i < dat.length; i++) {
                var obj = {
                    name: dat[i].name,
                    image: dat[i].image.url,
                    temperament: dat[i].temperament,
                    id: dat[i].id
                }
                tempo.push(obj)
            }
            res.send(tempo)
        })
        .catch(error => res.status(500).json({
            error: "ups"
        }))
})

router.get('/alldogs', async (req, res) => {
    const dogsss=await  Dog.findAll({attributes:{exclude:["createdAt","updatedAt"]}})
  
    
    
    await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=1b79416c-09f0-4b91-a101-485544e8064c`)
        .then(response => {
            var dat = response.data
            var arr= dat.concat(dogsss)
          
            return res.send(arr)}
        )
        .catch(error => res.status(500).json({
            error: "ups"
        }))
})



router.get('/dogs/:idRaza', async (req, res) => {
    var idR = req.params.idRaza
    if(idR.length>10){
     const dogsss= await Dog.findOne({
        where: {id: idR} ,
        attributes:{exclude:["createdAt","updatedAt"]
      }})
       
        if(dogsss){
            var temp={
                name:dogsss.dataValues.name,
                weight:{metric:dogsss.dataValues.weight},
                height:{metric:dogsss.dataValues.height},
                life_span:dogsss.dataValues.life_span,
                image:dogsss.dataValues.image,
                temperament:dogsss.dataValues.temperament
                
            }
            return res.json(temp)}
      }
    await axios.get(`https://api.thedogapi.com/v1/breeds/${idR}?api_key=1b79416c-09f0-4b91-a101-485544e8064c`)
        .then(response => {
            console.log("hola",response.data)
            if(response.data.name){
            var dat = response.data
            console.log(dat.name)
            var obj2 = {
                name: dat.name,
                image: "https://cdn2.thedogapi.com/images/" + dat.reference_image_id,
                temperament: dat.temperament,
                life_span: dat.life_span,
                weight: dat.weight,
                height: dat.height
            }
            
            return res.send(obj2)}
            else{
                return res.send("No existe una raza de perro con ese ID")
            }
        })
        .catch((error )=> {
                return res.statusCode(404)
        })
})

router.get('/temperament/', (req, res) => {
    
    var tempe = []
    if (PrimIns===true) {
        PrimIns = false
        axios.get('https://api.thedogapi.com/v1/breeds?api_key=1b79416c-09f0-4b91-a101-485544e8064c')
            .then(response => {
                var dato = response.data
                var tempTempe = []
                
                for (i = 0; i < dato.length; i++) {
                    if (dato[i].temperament)
                        tempTempe.push(dato[i].temperament)
                }
                for (i = 0; i < tempTempe.length; i++) {
                    if (tempTempe[i] !== "null") {
                        var spliteado = tempTempe[i].split(", ")
                        for (h = 0; h < spliteado.length; h++) {
                            if (!tempe.includes(spliteado[h])) tempe.push(spliteado[h])
                        }
                    }
                }
                var j = 0
                for(i=0;i<tempe.length;i++){
                    Temperament.findOrCreate({where: { name: tempe[i],id: j++}})
                }
                
                
                return res.send(tempe)
            })

    }else{
    const temperamentos= Temperament.findAll({attributes:['name']}).then((e)=>{
        
        res.send(e)
    })
    return temperamentos
}
    
})

router.post('/dog/', (req,res)=>{
    if(!req.body.name || !req.body.life_span || !req.body.height || !req.body.weight){
    return res.send("No se agrego el perro")}
    
    Dog.findOrCreate({where: { 
        name: req.body.name,
        life_span:req.body.life_span,
        id: uuidv4(),
        height:req.body.height,
        temperament:req.body.temperament,
        image:req.body.image,
        weight:req.body.weight}})
    return res.send("Se agrego el perro")
})


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;