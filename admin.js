const base=[
 {id:1,nombre:"Parlante Bluetooth",categoria:"Audio",precio:35000,mayorista:"Consultar mayorista",descripcion:"Sonido potente, conexión Bluetooth y batería recargable.",imagen:"img/parlante.svg"},
 {id:2,nombre:"Accesorio Gamer",categoria:"Gamer",precio:22000,mayorista:"Consultar mayorista",descripcion:"Ideal para completar y mejorar tu setup gamer.",imagen:"img/gamer.svg"},
 {id:3,nombre:"Smartwatch Serie 10",categoria:"Tecnología",precio:28000,mayorista:"Consultar mayorista",descripcion:"Reloj inteligente con múltiples funciones.",imagen:"img/reloj.svg"},
 {id:4,nombre:"Auricular Bluetooth",categoria:"Audio",precio:19000,mayorista:"Consultar mayorista",descripcion:"Auriculares inalámbricos compactos para todos los días.",imagen:"img/auricular.svg"}
];
let productos=JSON.parse(localStorage.getItem("rs7_productos"))||base;
const form=document.getElementById("form");
function money(n){return new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(n)}
function guardar(){localStorage.setItem("rs7_productos",JSON.stringify(productos))}
function render(){
 document.getElementById("lista").innerHTML=productos.map(p=>`<div class="item"><div><strong>${p.nombre}</strong><small>${p.categoria} · ${money(p.precio)}</small></div><button class="borrar" onclick="borrar(${p.id})">ELIMINAR</button></div>`).join("");
}
form.addEventListener("submit",e=>{
 e.preventDefault();
 const p={id:Date.now(),nombre:nombre.value.trim(),categoria:categoria.value.trim(),precio:Number(precio.value),mayorista:mayorista.value.trim()||"Consultar mayorista",descripcion:descripcion.value.trim(),imagen:imagen.value.trim()||"img/producto.svg"};
 productos.push(p);guardar();form.reset();render();alert("Producto agregado correctamente.");
});
function borrar(id){if(confirm("¿Eliminar este producto?")){productos=productos.filter(p=>p.id!==id);guardar();render()}}
render();
