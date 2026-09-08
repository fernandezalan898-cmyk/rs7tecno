const WHATSAPP="5492215374022";
const productosBase=[
 {id:1,nombre:"Parlante Bluetooth",categoria:"Audio",precio:35000,mayorista:"Consultar mayorista",descripcion:"Sonido potente, conexión Bluetooth y batería recargable.",imagen:"img/parlante.svg"},
 {id:2,nombre:"Accesorio Gamer",categoria:"Gamer",precio:22000,mayorista:"Consultar mayorista",descripcion:"Ideal para completar y mejorar tu setup gamer.",imagen:"img/gamer.svg"},
 {id:3,nombre:"Smartwatch Serie 10",categoria:"Tecnología",precio:28000,mayorista:"Consultar mayorista",descripcion:"Reloj inteligente con múltiples funciones.",imagen:"img/reloj.svg"},
 {id:4,nombre:"Auricular Bluetooth",categoria:"Audio",precio:19000,mayorista:"Consultar mayorista",descripcion:"Auriculares inalámbricos compactos para todos los días.",imagen:"img/auricular.svg"}
];

let productos=JSON.parse(localStorage.getItem("rs7_productos"))||productosBase;
let categoriaActual="Todos";

function money(n){return new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(n)}
function comprar(nombre){
 const msg=`Hola RS7TECNO! Estoy interesado en el producto: ${nombre}. ¿Me pasás disponibilidad y precio?`;
 window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,"_blank");
}
function renderCategorias(){
 const cats=["Todos",...new Set(productos.map(p=>p.categoria))];
 document.getElementById("categorias").innerHTML=cats.map(c=>`<button class="${c===categoriaActual?"active":""}" onclick="seleccionarCategoria('${c.replaceAll("'","\\'")}')">${c}</button>`).join("");
}
function seleccionarCategoria(c){categoriaActual=c;renderCategorias();renderProductos()}
function renderProductos(){
 const q=(document.getElementById("buscador")?.value||"").toLowerCase();
 const lista=productos.filter(p=>(categoriaActual==="Todos"||p.categoria===categoriaActual)&&`${p.nombre} ${p.descripcion} ${p.categoria}`.toLowerCase().includes(q));
 const cont=document.getElementById("productos");
 if(!lista.length){cont.innerHTML='<div class="vacio">No encontramos productos con esa búsqueda.</div>';return}
 cont.innerHTML=lista.map(p=>`
 <article class="producto">
   <img src="${p.imagen}" alt="${p.nombre}">
   <div class="producto-body">
     <div class="categoria">${p.categoria}</div>
     <h3>${p.nombre}</h3>
     <p class="descripcion">${p.descripcion}</p>
     <div class="precio">${money(p.precio)}</div>
     <div class="mayorista">📦 ${p.mayorista||"Consultar mayorista"}</div>
     <button class="consultar" onclick="comprar(${JSON.stringify(p.nombre)})">CONSULTAR POR WHATSAPP</button>
   </div>
 </article>`).join("");
}
document.getElementById("buscador").addEventListener("input",renderProductos);
renderCategorias();renderProductos();
