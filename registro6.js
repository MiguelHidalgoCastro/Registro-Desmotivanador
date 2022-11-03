'use strict'

window.onload = iniciar

function iniciar(){
	//busco la imagen y le pongo el evento
	let imagen = document.getElementsByTagName("img")[0]
	imagen.addEventListener('click', pulsarImagen)
		
	//boton cancelar
	let btnCancelar = document.getElementById("btnCancelar")
	btnCancelar.addEventListener('click',pulsarBtnCancelar)
		
	//boton aceptar
	let btnAceptar = document.getElementById("btnAceptar")
	btnAceptar.addEventListener('click',pulsarBtnAceptar)
		
	//lleno el combo de comunidad
	llenarSelectComunidad()
	
	//añado un evento al cambiar un dato del select comunidad
	let selectComunidad = document.getElementById("comunidad")
	selectComunidad.addEventListener('change',changeComunidad)
	
	//fecha maxima hay que colocarla aqui. Será la de hoy
	// max y value
	let fechaHoy = new Date()
	let inputFecha = document.getElementById("fecha")
	if(fechaHoy.getMonth() < 9){
		inputFecha.value = fechaHoy.getFullYear() + "-0" + (fechaHoy.getMonth() + 1) + "-" + fechaHoy.getDate()
		inputFecha.max = fechaHoy.getFullYear() + "-0" + (fechaHoy.getMonth() + 1) + "-" + fechaHoy.getDate()
	}
	else{
		inputFecha.value = fechaHoy.getFullYear() + "-" + (fechaHoy.getMonth() + 1) + "-" + fechaHoy.getDate()
		inputFecha.max = fechaHoy.getFullYear() + "-" + (fechaHoy.getMonth() + 1) + "-" + fechaHoy.getDate()
	}
	inputFecha.addEventListener('change',leerFecha)
	
	//pasar raton por encima de perry
	let pasarRaton = document.getElementById("menor")
	pasarRaton.addEventListener('mouseenter',cambiarFotoPerry)
	
	
	//DRAG AND DROP
	let columnaUno = document.getElementById("columnaUno")
	let columnaDos = document.getElementById("columnaDos")

	
}
/*----------------- EVENTOS -----------------*/
function pulsarImagen(){
	let formulario = document.getElementById("section")
	// console.log(formulario.style.display)
	if(formulario.style.display == "" || formulario.style.display == 'none')
		formulario.style.display = "block"
	else
		formulario.style.display = "none"
	if(document.getElementById("mensaje-confirmacion").textContent != '')
		document.getElementById("mensaje-confirmacion").textContent = ''
	
	reiniciarTodo()
}
	
function pulsarBtnCancelar(){
	reiniciarTodo()
}

function pulsarBtnAceptar(){
	// console.log("estoy pulsando aceptar")
	let div = document.getElementById("section")
	div.style.display = "none"
	document.getElementById("mensaje-confirmacion").textContent = "El usuario se ha registrado"
	
	// reiniciarTodo()
}


function leerFecha(){
	// console.log(document.getElementById("fecha").value)
	let edad = calcularEdad(document.getElementById("fecha").value)
	
	if(edad <= 10 )
		document.getElementById("menor").style.display = "block"
	
}

function cambiarFotoPerry(){
	if(document.getElementById("doctor").src == "imagen.jfif")
		document.getElementById("doctor").src = "losdos.jpg"
	else
		document.getElementById("doctor").src = "imagen.jfif"
}


//drag and drop events
columnaUno.addEventListener('dragstart', e=>{
	e.dataTransfer.setData('id',e.target.id)
})

columnaUno.addEventListener('dragover',e =>{
	e.preventDefault()
	console.log(e.dataTransfer)
})

columnaUno.addEventListener('drop',e =>{
	let id = e.dataTransfer.getData('id')
	e.target.appendChild(document.getElementById(id))
})


columnaDos.addEventListener('dragstart', e=>{
	e.dataTransfer.setData('id',e.target.id)
})

columnaDos.addEventListener('dragover',e =>{
	e.preventDefault()
})

columnaDos.addEventListener('drop',e =>{
	let id = e.dataTransfer.getData('id')
	e.target.appendChild(document.getElementById(id))
})


/*----------------- FUNCIONES -----------------*/

function llenarSelectComunidad(){
	let combo = document.getElementById("comunidad")
	// console.log(combo)
	let comunidades = ["Andalucía", "Aragón", "Canarias", "Cantabria", "Castilla y León", "Castilla-La Mancha", "Cataluña", "Ceuta", "Comunidad Valenciana", "Comunidad de Madrid", "Extremadura", "Galicia", "Islas Baleares", "La Rioja", "Melilla", "Navarra", "País Vasco", "Principado de Asturias", "Región de Murcia"]
	
	for(let i = 0; i < comunidades.length; i++){
		let opcion = document.createElement('option')
		opcion.textContent = comunidades[i]
		opcion.value = i + 1
		combo.appendChild(opcion)
	}
}

function changeComunidad(){
	let selectComunidad = document.getElementById("comunidad").value
	let selectProvincias = document.getElementById("provincia")
	// le borro todo antes de empezar
	selectProvincias.innerHTML = ''
	//le meto el value por defecto
	let opcion = document.createElement('option')
	opcion.value = 0
	opcion.textContent = "Escoja una de estas opciones"
	selectProvincias.appendChild(opcion)
	var provincias = [];
	provincias[0] = ["Almeria","Cadiz","Cordoba","Granada","Huelva","Jaen","Malaga","Sevilla"];
	provincias[1] = ["Huesca","Teruel","Zaragoza"];
	provincias[2] = ["Las Palmas","Santa Cruz de Tenerife"];
	provincias[3] = ["Cantabria"];
	provincias[4] = ["Avila","Burgos","Leon","Palencia","Salamanca","Segovia","Soria","Valladolid","Zamora"];
	provincias[5] = ["Albacete","Ciudad Real","Cuenca","Guadalajara","Toledo"];
	provincias[6] = ["Barcelona","Girona","Lleida","Tarragona"];
	provincias[7] = ["Ceuta"];
	provincias[8] = ["Alicante","Castellon","Valencia"];
	provincias[9] = ["Madrid"];
	provincias[10] = ["Badajoz","Caceres"];
	provincias[11] = ["A Coruña","Lugo","Ourense","Pontevedra"];
	provincias[12] = ["Baleares"];
	provincias[13] = ["La Rioja"];
	provincias[14] = ["Melilla"];
	provincias[15] = ["Navarra"];
	provincias[16] = ["Alava","Guipuzcoa","Vizcaya"];
	provincias[17] = ["Asturias"];
	provincias[18] = ["Murcia"];
	
	// console.log(selectComunidad)
	for(let i = 0; i < provincias[selectComunidad - 1].length; i++){
		opcion = document.createElement('option')
		opcion.textContent = provincias[selectComunidad - 1][i]
		opcion.value = i + 1
		selectProvincias.appendChild(opcion)
	}
}


function calcularEdad(fecha_nacimiento) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha_nacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}


function reiniciarTodo(){
	//borramos los inputs
	document.getElementById("correo").value = ""
	document.getElementById("pass").value = ""
	
	//aqui pondré los select al option 0
	document.getElementById("comunidad").value = 0
	document.getElementById("provincia").innerHTML = 0
	let opcion = document.createElement('option')
	opcion.value = 0
	opcion.textContent = "Escoja una de estas opciones"
	document.getElementById("provincia").appendChild(opcion)
	
	//reiniciar date a dia de hoy
	let fechaHoy = new Date()
	if(fechaHoy.getMonth() < 9)
		document.getElementById("fecha").value = fechaHoy.getFullYear() + "-0" + (fechaHoy.getMonth() + 1) + "-" + fechaHoy.getDate()
	else
		document.getElementById("fecha").value = fechaHoy.getFullYear() + "-" + (fechaHoy.getMonth() + 1) + "-" + fechaHoy.getDate()
	//oculto a perry
	document.getElementById("menor").style.display = "none"
	
	//devuelvo al doctor a la foto
	document.getElementById("doctor").src = "imagen.jfif"
}