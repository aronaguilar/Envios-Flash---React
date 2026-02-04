const { Router } = require("express");


const router = Router();

ids = 3;

idProducto = 9;

const usuarios = [

        {id: 1, nombre: "aron", apellido:"aguilar", gmail:"aronpablo12@gmail.com",contraseña:"lolo", carrito:[{id:1, cantidad:2},{id:2, cantidad:1},{id:3, cantidad:1},{id:4, cantidad:1}], publicaciones:[1,2,3]},
        {id: 2, nombre: "alexis", apellido:"aguilar", gmail:"alexisaguilar171522@gmail.com",contraseña:"lolo", carrito:[{id:6, cantidad:4}], publicaciones:[]},
        {id: 3, nombre: "brenda", apellido:"aguilar", gmail:"brendaguilar999@gmail.com",contraseña:"lolo", carrito:[{id:5, cantidad:4}, {id:9, cantidad:4}], publicaciones:[]}
]

let productos = [
    
    { id: 1, nombre: "Zapatillas Nike", precio: 50000, caracteristicas:{tipo: "zapatilla" , color:"negro", marca:"nike"} ,imagen: "https://nikearprod.vtexassets.com/arquivos/ids/773886-1200-1200?width=1200&height=1200&aspect=true"},
    { id: 2, nombre: "Remera Adidas", precio: 25000, caracteristicas:{tipo: "remera" , color:"blanco", marca:"adidas"} , imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_757054-MLA99895310180_122025-F.webp" },
    { id: 3, nombre: "Gorra Puma", precio: 18000, caracteristicas:{tipo: "gorra" , color:"negro", marca:"puma"} , imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_623089-MLA101433442341_122025-F.webp" },
    { id: 4, nombre: "Zapatillas Nike", precio: 50000, caracteristicas:{tipo: "zapatilla" , color:"gris", marca:"nike"} , imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_708941-MLA86676305843_062025-F.webp" },
    { id: 5, nombre: "Remera Adidas", precio: 25000, caracteristicas:{tipo: "remera" , color:"negro", marca:"adidas"} , imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_787283-MLA101182144389_122025-F.webp" },
    { id: 6, nombre: "Gorra Nike", precio: 18000, caracteristicas:{tipo: "gorra" , color:"negro", marca:"nike"} , imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_947849-MLA101184657589_122025-F.webp" },
    { id: 7, nombre: "Zapatillas Nike", precio: 50000, caracteristicas:{tipo: "zapatilla" , color:"beige", marca:"nike"} , imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_992467-MLA83151062331_032025-F.webp" },
    { id: 8, nombre: "Remera Nike", precio: 25000, caracteristicas:{tipo: "remera" , color:"verde", marca:"nike"} , imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_826486-MLA86043997888_062025-F.webp" },
    { id: 9, nombre: "Gorra Puma", precio: 18000, caracteristicas:{tipo: "gorra" , color:"negro", marca:"puma"} , imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_947849-MLA101184657589_122025-F.webp" },
    
]



///////// METODOS GET ///////////////

router.get('/', (req,res) =>{
    res.json({
        respuesta: "gillll"
    })
});

router.get('/productos', (req,res) =>{
    res.json(productos);
});

router.get("/productos/:id", (req,res) =>{
    const {id} = req.params;

    const producto = productos.find(a => a.id == id);

    if(!producto){

        return res.status(404).json({ mensaje: "Producto no encontrado" });

    }
    
    res.json(producto)
})


router.get('/usuarios', (req, res) => {
    res.json([
        {id: 1, nombre: "aron", apellido:"aguilar", mail:"aronpablo12@gmail.com",contraseña:"shushalahueva"},
        {id: 2, nombre: "alexis", apellido:"aguilar", mail:"alexisaguilar171522@gmail.com",contraseña:"lacacatua"},
        {id: 3, nombre: "brenda", apellido:"aguilar", mail:"brendaguilar999@gmail.com",contraseña:"guaracha"}
    ]);
});





/////////////// verificar que ya este en el carrito /////////////

router.post("/carrito/verificar", (req,res)=>{

    const {idUsuario, idProducto} = req.body;
    const usuario = usuarios.find(u => u.id == idUsuario);

    if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const verificarProducto = usuario.carrito.some(p => p.id == idProducto);

    res.json({verificar: verificarProducto});

});




////////////// BUSCADOR DE PRODUCTOS CARRITO /////////////////

router.get("/carrito/:id", (req, res) =>{

    const {id} = req.params;

    const respuesta = [];
    
    const usuario = usuarios.find( u => u.id == id);

    if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const productosCarrito = usuario.carrito;

    for(let i = 0; i < productosCarrito.length; i++){

        const producto = productos.find(p => p.id == productosCarrito[i].id);

        if (producto){

            respuesta.push({
                producto:producto,
                cantidad: productosCarrito[i].cantidad
            });
        }
        
    };

    res.json(respuesta);
});



//////////////////AUMENTAR UNIDADES CARRITO////////////////////

router.post("/carrito/aumentar", (req, res)=>{


    try {
    const { idUsuario, idProducto } = req.body;

    const usuario = usuarios.find(u => u.id == idUsuario);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const producto = usuario.carrito.find(p => p.id == idProducto);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no está en el carrito" });
    }

    producto.cantidad++;

    console.log(producto.cantidad)

    res.json({
      mensaje: "Cantidad aumentada",
      carrito: usuario.carrito
    });

  } catch (err) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }


})


//////////////////DISMINUIR UNIDADES CARRITO////////////////////

router.post("/carrito/disminuir", (req, res)=>{


    try {
    const { idUsuario, idProducto } = req.body;

    const usuario = usuarios.find(u => u.id == idUsuario);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const producto = usuario.carrito.find(p => p.id == idProducto);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no está en el carrito" });
    }

    if(producto.cantidad != 0){
        producto.cantidad--;
    }

    console.log(producto.cantidad)

    res.json({
      mensaje: "Cantidad aumentada",
      carrito: usuario.carrito
    });

  } catch (err) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }


})



//////////////BORRAR PRODUCTO DE CARRITO ////////////////

router.post("/carrito/borrar", (req, res)=>{

    try{
        const {idUsuario, idProducto} = req.body;

        const usuario = usuarios.find(usuario => usuario.id == idUsuario);

        usuario.carrito = usuario.carrito.filter(p => p.id !== idProducto)
    
        res.json({
            mensaje: "eliminado correctamente del carrito",
        });
    }
    catch(err){

        res.status(404).json({

            mensaje: "error en el servidor"
            
        })
    }

});



/////////////// AGREGAR PRODUCTO AL CARRITO //////////////////

router.post("/carrito/agregar", (req,res)=>{

    const {idUsuario, idProducto} = req.body;

    const usuario = usuarios.find(u => u.id == idUsuario);

    if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const verificarProducto = productos.some(p => p.id == idProducto);

    if (verificarProducto){
        usuario.carrito.push({id: idProducto, cantidad:1})
    }

    res.json({mensaje: "producto agregado al carrito"})



});





/////////// INICIO DE SECION EN CUENTA ///////////////////

router.post("/usuarios", (req,res) => {
    
    const { gmail, contraseña} = req.body;  //guardamos los datos del front

    const usuario = usuarios.find( a => a.gmail === gmail); //buscamos el usuario en la base

    if(!usuario){
        return res.status(401).json({mensaje: "Gmail incorrecto"});  
    }

    if(usuario.contraseña !== contraseña){

        return res.status(401).json({mensaje: "Contraseña incorrecta"});
    }
    
    res.json({
        mensaje: "Iniciaste secion de manera correcta",
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        gmail: usuario.gmail
    });

});



/////////// REGISTRAR UNA NUEVA CUENTA  ///////////////////

router.post("/registrar", (req,res) =>{

    const {nombre, apellido, gmail, contraseña} = req.body;

    gmailUsado = usuarios.some( usuario => usuario.gmail === gmail )

    if(!gmail.endsWith("@gmail.com")){
        return res.status(401).json({mensaje: "INGRESE UN GMAIL VALIDO"})
    }

    if(gmailUsado){
        return res.status(401).json({mensaje: "ESTE GMAIL YA ESTA REGISTRADO"})
    }


    ids++

    usuarios.push({
        id: ids,
        nombre: nombre,
        apellido: apellido,
        gmail: gmail,
        contraseña: contraseña,
        carrito: [],
        publicaciones: []
    })

    res.json({
        id: ids,
        nombre: nombre,
        apellido: apellido,
        gmail: gmail,
        contraseña: contraseña,
        mensaje: "registrado correctamente"
        
    }
        
    );
});



/////////// SUBIR UN NUEVO PRODUCTO  ///////////////////

router.post("/subir", (req, res) =>{
    const {producto, precio, descripcion, tipo, color, marca, idUsuario} = req.body

    idProducto++

    nuevoProducto = {
        id: idProducto,
        nombre: producto,
        precio: precio,
        caracteristicas:{tipo: tipo, color: color, marca: marca},
        imagen: "https://cdn-icons-png.flaticon.com/512/3706/3706042.png"
    }

    productos.push(nuevoProducto);

    const usuario = usuarios.find( u => u.id == idUsuario);

    usuario.publicaciones.push(idProducto);

    res.json({mensaje: "subido"})


})



////////////////////// BUSCADOR DE PRODUCTOS //////////////////////

router.post("/buscador", (req, res) => {
    const { parametros } = req.body;

    // Función para quitar plurales básicos (s, es)
    const normalizarPalabra = (palabra) => {
        return palabra.toLowerCase().trim()
            .replace(/es$/, 'e') // "remeras" -> "remera", "zapatillas" -> "zapatilla"
            .replace(/s$/, '');  // "nikes" -> "nike"
    };

    const paramsLimpios = parametros.map(p => normalizarPalabra(p));

    const resultado = productos.reduce(
        (acc, producto) => {
            // Normalizamos también la base de datos del producto
            const baseDeBusqueda = [
                producto.nombre,
                ...Object.values(producto.caracteristicas)
            ]
            .join(" ")
            .split(" ") // Dividimos en palabras
            .map(palabra => normalizarPalabra(palabra)) // Normalizamos cada una
            .join(" ");

            const coincidencias = paramsLimpios.filter(p => 
                baseDeBusqueda.includes(p)
            ).length;

            if (coincidencias === paramsLimpios.length) {
                acc.completos.push(producto);
            } else if (coincidencias > 0) {
                acc.parciales.push(producto);
            }

            return acc;
        },
        { completos: [], parciales: [] }
    );

    const productosOrdenados = [...resultado.completos, ...resultado.parciales];
    res.json({ productosOrdenados });
});

////////////////////////// PUBLICACIONES DEL USUARIO //////////////////////////////

router.get("/publicaciones/:id", (req,res) =>{

    const {id} = req.params;

    const respuesta = [];

    const usuario = usuarios.find(a => a.id == id);

    if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const publicaciones = usuario.publicaciones;

    for(let i = 0; i < publicaciones.length; i++){

        const producto = productos.find(p => p.id == publicaciones[i]);

        if (producto){
            respuesta.push(producto);
        }
        
    };

    res.json(respuesta);
} );

//////////////// ELIMINAR PUBLICACIONES ///////////////////////////

router.delete('/publicaciones/borrar/:idUsuario/:idProducto', (req,res)=>{
    const {idUsuario, idProducto} = req.params;

    const usuario = usuarios.find(a => a.id == idUsuario);

    if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    productos = productos.filter(p => p.id != idProducto);

    usuario.publicaciones = usuario.publicaciones.filter(p => p != idProducto);

    res.json({mensaje: "borrado"});
})
 


module.exports = router;