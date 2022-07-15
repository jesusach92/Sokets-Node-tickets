
export const error500 = (req, res, error)=>{
    console.log(error);
    res.status(500).send("Error de Servidor Contactar con soporte")
}

export const error400 = (req, res)=>{
    res.status(400).send("Error al procesar tu información")
}

export const error404 = (req, res)=>{
    res.status(404).send("No encontramos lo que buscabas")
}

export const status202 = (req, res)=>{
    res.status(202).send("Informacion agregada correctamente")
}

export const stateDelete = (req, res)=>{
    res.status(202).send("Borrado con exito")
}