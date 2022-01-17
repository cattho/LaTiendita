const productos= document.getElementById('products');
const llamarM= document.querySelector(".modalC");
const cerrar= document.querySelector(".close");
const modalDcontainer= document.querySelector('.modal-shop-container');
const cartItem=document.querySelector('.cart-items-container');
const header= document.querySelector('header');
const ubicacionPin= document.querySelector('.ubicacion');
const cartPadre=document.querySelector('.cart-padre');
const cerrarCarrito= document.querySelector('.cerrarCarrito')
const backgroundCarrito=document.querySelector('.cartBackground')

let geolocalizacion ='';




let btnrestar= "";
let btnsumar="" ;
let medidaproducto="" ;


document.addEventListener('DOMContentLoaded', () =>{
    getData('http://localhost:4000/Productos/')        
    abrir()
    cerrando()              
})


// modal ubicacion hecho con SweetAlert
ubicacionPin.addEventListener('click',async () =>{
    const { value: ciudad } = await Swal.fire({
        title: 'Selecciona la ciudad de destino',
        input: 'select',
        inputOptions: {
          'Tolima': {
            Ibague: 'Ibague',
            Espinal: 'Espinal',
            Rovira: 'Rovira',                        
          },
          'Cundinamarca': {
            Bogota: 'Bogotá',
            Soacha: 'Soacha',
            Tocancipa: 'Tocancipa'
          },
          'Antioquia': {
              Medellin: 'Medellin'
          }
        },      
        inputPlaceholder: 'Ciudad Destino',
        confirmButtonText:'Aceptar',
        confirmButtonColor: '#0ac763'      
        }
      )      
      if (ciudad) {
        Swal.fire(`Haz seleccionado: ${ciudad}`)
        geolocalizacion= ciudad
      }
} )


// data capture//
const getData = async (url) => {
    try{
        const res = await fetch(url)        
        const data= await res.json()
            showContent(data)                       

         console.log(data)         
    }catch(error){
        console.log(error);
    }    
}  

//show content

function showContent(showProducts){
    productos.innerHTML=''    

    showProducts.forEach((card) => {
        const {producto,precio,image, id}=card               

        const bodyElement= document.createElement('div')
        bodyElement.classList.add('product')
        bodyElement.innerHTML=`
            <div class="descuento">32% dto.</div>
                <img src="${image}" alt="">
                <div class="precio"> $ ${precio} <span>39.9/kg</span></div>
                    <h3>${producto}</h3>
                    <button id="${id}" class="btn open-mod" type="submit">Agregar</button>
                    `    
     productos.appendChild(bodyElement)
    });
}

// creacion modal descripcion

async function showModalDescription (id) {    
    llamarM.innerHTML=''    
        const resp = await fetch("http://localhost:4000/Productos/"+id)
        data = await resp.json();        
        
        let unidadMedida=''
        let cantidad= ''
        const {producto,precio,image,categoria}=data
        
        if(categoria === 'Alimentos'){
            unidadMedida= 'gr'
            cantidad='250'
        }else{
            unidadMedida= 'U'
            cantidad= '1'
        }
        const contenedorModal= document.createElement('div')
        contenedorModal.classList.add('modal-shop-container')
              

        
        contenedorModal.innerHTML=`                 
            <div class="descripcion">

            <div class ="contenedorVenta">
                <label class="close fas fa-times" for="cart-btn"></label>
                        
                <div class="modal-shop-image">
                    <img src= ${image} alt="">
                </div>
            </div>
                    
            <div class="modal-shop-text">
                <h1>${producto}</h1>
                <h3>$ ${precio}/kg</h3>
                <p class="textIVA">Precios con IVA incluido</p>
                <P>Peso aproximado por pieza, puede variar de acuerdo al peso real.</P>
                <label class="madurez" for="madurez">Selecciona la madurez que deseas</label>
                    <select name="madurez" id="">
                        <option value="" selected disabled>Por elegir</option>
                        <option value="maduro">Maduro (Para hoy)</option>
                        <option value="normal">Normal (3-5 días)</option>
                        <option value="verde">Verde (7 días)</option>
                        <a href="#" class="btn">Agregar</a>
                    </select>
                    <div class="btnSumResta">
                        <button class="btnresta" id="btnRestar">- </button>
                        <span min="200" max="400" type="number" name="" id="medidaProducto" class= "medidaProducto"> ${cantidad} ${unidadMedida} </span> 
                        <button class="btnsuma" id="btnSumar"> +</button>

                    </div>

                    <input value="Agregar" type="submit" class="btn btn-agregar-modal" id=${id}>            
            </div>           
            </div>       
        `
        
        ramdonProducts(contenedorModal)
        llamarM.appendChild(contenedorModal)
        sumarRestar() 
    }
   

// funcion para sacar productos del json de manera aleatoria
 async function ramdonProducts(elementosRamdon){
     const respuesta = await fetch('http://localhost:4000/Productos/')
     data = await respuesta.json()


     const productoRamdon= data[Math.floor(Math.random()*data.length)+1]
     const productoRamdonDos= data[Math.floor(Math.random()*data.length)+1]
     const ramproductDiv= document.createElement('div')
     ramproductDiv.classList.add('container-ramdon-products')
     
// dibujando cajita de productos en el modal
     console.log(productoRamdon, productoRamdonDos, "prueba");

     ramproductDiv.innerHTML+=`             
            <div class="modal-shop-products">                
            <h1>Productos Relacionados</h1>
               
            <div class="flexRamdon">
                    <div class= "producto1">
                                            
                    <div class="ramdonImageUno">
                        <img src= ${productoRamdon.image} alt="">
                    </div>
                    
                    <div class="ramdonDescriptionUno">
                        <h1>${productoRamdon.producto}</h1>
                        <h3>$ ${productoRamdon.precio}/kg</h3>
                        <p class="textIVA">Precios con IVA incluido</p>
                    </div>

                    <input value="Agregar" type="submit" class="btn btn-agregar-modal" id=${productoRamdon.id}>
                </div>

                <div class= "producto2">
                                
                    <div class="ramdonImageDos">
                        <img src= ${productoRamdonDos.image} alt="">
                    </div>
                    
                    <div class="ramdonDescriptionDos">
                        <h1>${productoRamdonDos.producto}</h1>
                        <h3>$ ${productoRamdonDos.precio}/kg</h3>
                        <p class="textIVA">Precios con IVA incluido</p>
                    </div>
                    <input value="Agregar" type="submit" class="btn btn-agregar-modal" id=${productoRamdonDos.id}>
                </div>               
            </div>
                
            </div>
        
        `
        elementosRamdon.appendChild(ramproductDiv)
}

function sumarRestar(){
        // botones de agregar y quitar para modal
        btnrestar= document.querySelector('.btnresta');
        btnsumar= document.querySelector('.btnsuma');        
        medidaproducto = document.querySelector('.medidaProducto');

        btnrestar.addEventListener('click', ()=>{                   
            if(parseInt(medidaproducto.innerHTML)>1){
                medidaproducto.innerHTML=parseInt(medidaproducto.innerHTML)-1+" g"
            }
        })
        
        btnsumar.addEventListener('click', ()=>{    
            medidaproducto.innerHTML=parseInt(medidaproducto.innerHTML)+1+" g"
        })
}

    // abrir modal
const abrir= ()=>{

    document.addEventListener("click",(e)=>{               
        if(e.target.classList.contains("open-mod")){
            const papitoidmodal= e.target.id
            
            showModalDescription(papitoidmodal)
            llamarM.style.opacity = "1";
            llamarM.style.visibility = "visible";
        }             
    })      
}

// cerrar modal y carrito con boton
const cerrando= ()=>{
document.addEventListener("click", (c)=>{
    if(c.target.classList.contains("close")){
        const toCloseModal=c.target.id
        showModalDescription(toCloseModal)
        llamarM.style.opacity = "0";
        llamarM.style.visibility = "hidden";
        cartItem.classList.remove('active')
        cartPadre.classList.remove('active')    
    }  
    })
}

// cerrar modal oprimiendo Esc
window.addEventListener('keydown', (llavesita)=>{
    if(llamarM&&llavesita.key==="Escape"){
        llamarM.style.opacity = "0";
        llamarM.style.visibility = "hidden";
    }    
})


// aca defino un arreglo del localStorage 
const arregloProductos= []    
localStorage.setItem("productos", JSON.stringify(arregloProductos))

// funcion boton agregar modal
llamarM.addEventListener('click', async e =>{    
    const btnAdd= e.target.classList.contains('btn-agregar-modal')
    const id= e.target.id    
    

// consiguiendo el arreglo guardaddo en localStorage
    const listaProducts= JSON.parse(localStorage.getItem('productos'))    
       
    if(btnAdd){        
        const lista = await fetch('http://localhost:4000/Productos/'+id)
        const datares = await lista.json()
        

// voy a guardar en el local storage, le pongo otra llave con el valor que tiene el modal
 datares["cantidad"]=parseInt(document.querySelector('.medidaProducto').textContent)
        
               
// aca recorro el arreglo comparando elemento por elemento para no agregar productos iguales al localStorage      
          
    const exisProduct= listaProducts.find(p => p.id === Number(id)) 

         if(!exisProduct){
            listaProducts.push(datares)            
            localStorage.setItem("productos", JSON.stringify(listaProducts))
         }else{             
         }
    }  
})

// agregando productos

function renderCarrito() {   
    const carrito = document.querySelector('.cart-items-products')
    const itemsCarrito = JSON.parse(localStorage.getItem('productos'))
    const textoCiudad=document.querySelector('.cart-location-city')   
    

    

// Agrego la ubicacion que el usuario introdujo
carrito.innerHTML=''
if( geolocalizacion ===''){
    textoCiudad.textContent=' Escoge tu ciudad'
}else{
    textoCiudad.textContent=`${geolocalizacion}`
}


itemsCarrito.forEach(productoCart =>{

        
const {producto,precio,image, id, categoria,cantidad} = productoCart;
const contenedorProducto = document.createElement('div')     

contenedorProducto.innerHTML=''

let unidadMedida=''

    if(categoria === 'Alimentos'){
        unidadMedida= 'gr'
        
    }else{
        unidadMedida= 'U'         
    }

    contenedorProducto.innerHTML += `

        <div class="cart-item">                    
                <img src="${image}" alt="">
                <div class="content">
                    <h3 id="${id}">${producto}</h3>
                    <div class="price"> $ ${precio}</div>
                </div>
                
        </div>
        `

const btnSumaResta = document.createElement('div')
btnSumaResta.classList.add('btnSumResta')
const btnMenos= document.createElement('button')
btnMenos.classList.add('btnresta')
btnMenos.textContent='-'
const btnCantidad= document.createElement('p')
btnCantidad.classList.add('medidaProducto')
btnCantidad.innerHTML=`${cantidad} ${unidadMedida}`
const btnMas= document.createElement('button')
btnMas.classList.add('btnsuma')
btnMas.textContent='+'

        

// ademas de sumar y restar, estoy actualizando el localStorage para que actualice el numero de productos que escoge el usuario
btnMenos.addEventListener('click',()=>{
    if(parseInt(btnCantidad.innerHTML)>1){
        btnCantidad.innerHTML=parseInt(btnCantidad.innerHTML)-1+ ' '+unidadMedida            }
    productoCart.cantidad=parseInt(btnCantidad.innerHTML)
    console.log(productoCart);
})

btnMas.addEventListener('click',()=>{
        
        btnCantidad.innerHTML=parseInt(btnCantidad.innerHTML)+1+ ' '+ unidadMedida
        productoCart.cantidad=parseInt(btnCantidad.innerHTML)
})


btnSumaResta.appendChild(btnMenos)
btnSumaResta.appendChild(btnCantidad)
btnSumaResta.appendChild(btnMas)

contenedorProducto.appendChild(btnSumaResta)
carrito.appendChild(contenedorProducto)    
sumarRestar()        
})

}

//  boton carrito de compras
document.querySelector('#cart-btn').onclick=()=>{        
    cartItem.classList.toggle('active');
    header.classList.remove('active');    
    cartPadre.classList.add('active');        
    renderCarrito()
    
}


// cerrar carrito esc
window.addEventListener('keydown', (cartEsc)=>{
    if(cartItem&&cartEsc.key==="Escape"){
       cartItem.classList.remove('active')
       cartPadre.classList.remove('active')
    }    
})

window.onscroll=()=>{
    header.classList.remove('active');    
    cartItem.classList.remove('active');
}

