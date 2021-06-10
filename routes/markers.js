const rutas = (app)=> {

    const Marker = require ('../models/markers')

    //FIND (GET)
    const findAllMarkers = (req, res) => {
        Marker.find((err, markers)=>{
            if(!err){
                console.log('GET /markers')
                res.send(markers)
            }
        })
    }

    //ADD (POST)
    const addMarker = (req, res) => {
        const marker = new Marker({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            lat: req.body.lat,
            lng: req.body.lng,
            type: req.body.type
        })

        marker.save((err)=>{
            if(!err){
                console.log('Creado!')
            }else{
                console.log('Hubo un error', err)
            }
        })
        res.send(marker)
    }

    //EDIT (PUT)
    const editMarker = (req, res) => {
        Marker.findById(req.params.id,(err, marker)=>{
            marker.nombre = req.body.nombre;
            marker.descripcion = req.body.descripcion;
            marker.lat = req.body.lat;
            marker.lng = req.body.lng;
            marker.type = req.body.type;
            marker.save((err)=>{
                if(!err){
                    console.log('Actualizado')
                }else{
                    console.log('Hubo un error al actualizar', err)
                }
                res.send(marker)
            })
        })
    }

    //REMOVE (DELETE)
    const deleteMarker = (req, res) => {
        Marker.findById(req.params.id,(err, marker)=>{
            marker.remove((err)=>{
                if(!err){
                    console.log('Eliminado')
                }else{
                    console.log('Hubo un error al actualizar', err)
                }
                res.send(marker)
            })
        })
    }

    app.get('/markers', findAllMarkers);
    app.post('/markers', addMarker);
    app.put('/markers/:id', editMarker);
    app.delete('/markers/:id', deleteMarker);

    //Falta Delete

}

module.exports = rutas