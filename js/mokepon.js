const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionreiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonreiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")

const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opciondemokepones
let inputCapipepo
let inputRatigueya
let inputHipodoge
let vidasJugador = 3
let vidasEnemigo = 3
let mascotaplayer
let ataquesmokepon
let botonFuego
let botonAgua
let botonTierra


class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre 
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let Hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5)

let Capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5)

let Ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5)

Hipodoge.ataques.push(
    { nombre: "♒", id: "boton-agua"}, 
    { nombre: "♒", id: "boton-agua"},
    { nombre: "♒", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🌏", id: "boton-tierra"},    
)

Capipepo.ataques.push(
    { nombre: "🌏", id: "boton-tierra"}, 
    { nombre: "🌏", id: "boton-tierra"},
    { nombre: "🌏", id: "boton-tierra"},    
    { nombre: "♒", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"},
)

Ratigueya.ataques.push(
    { nombre: "🔥", id: "boton-fuego"}, 
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "♒", id: "boton-agua"},
    { nombre: "🌏", id: "boton-tierra"},    
)

mokepones.push(Hipodoge,Capipepo,Ratigueya)





function iniciarjuego() {
    
    sectionSeleccionarAtaque.style.display = "none"

    mokepones.forEach((mokepon) => {
        opciondemokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
             <p>${mokepon.nombre}</p>
             <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opciondemokepones

    inputCapipepo = document.getElementById("Capipepo")
    inputRatigueya = document.getElementById("Ratigueya")
    inputHipodoge = document.getElementById("Hipodoge")

    })

    sectionreiniciar.style.display = "none"
    botonMascotaJugador.addEventListener("click", selecionarMascotaJugador)
    botonreiniciar.addEventListener("click", reiniciarjuego)
}

function selecionarMascotaJugador(){
    
    sectionSeleccionarMascota.style.display = "none"
    sectionSeleccionarAtaque.style.display = "flex"
    


    


    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaplayer = inputHipodoge.id
    }
    else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaplayer = inputCapipepo.id
    }
    else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaplayer = inputRatigueya.id
    } 
    else {
        alert("Selecionar mascota") 
    }

    extraerataques(mascotaplayer)
    selecionarMascotaEnemigo()

} 

function extraerataques(mascotaplayer) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaplayer === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
         }       
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesmokepon = `
        <button id=${ataque.id} class="boton-de-ataque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesmokepon
    }); 

    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)

}

function selecionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(0, mokepones.length -1)
    
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
}

function ataqueFuego() {
    ataqueJugador = "FUEGO"
    ataquealeatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = "AGUA"
    ataquealeatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = "TIERRA"
    ataquealeatorioEnemigo()
}
function ataquealeatorioEnemigo() {
    let ataquealeatorio = aleatorio(1,3)

    if (ataquealeatorio == 1) {
        ataqueEnemigo = "FUEGO"
    } else if (ataquealeatorio == 2) {
        ataqueEnemigo = "AGUA"
    } else {
        ataqueEnemigo = "TIERRA"
    }

    combate()
    
    
}

function combate() {
    
    if(ataqueEnemigo == ataqueJugador) {
      crearMensaje("EMPATE")
    } else if(ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador --
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarvidas()
    
}

function revisarvidas() {
    if (vidasEnemigo == 0) {
        crearMensajefinal ("Bien Ganaste")
    } else if (vidasJugador == 0) {
        crearMensajefinal ("Perdiste mamon")
    } 

}


function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById("resultado")
    let ataquesDelJugador = document.getElementById("ataques-del-jugador")
    let ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")

    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajefinal(resultadofinal) {
    
    sectionreiniciar.style.display = "block"


    

    let parrafo = document.createElement("p")
    sectionMensajes.innerHTML = resultadofinal

    

    
    botonFuego.disabled = true
    
    botonAgua.disabled = true
    
    botonTierra.disabled = true
}



function reiniciarjuego() {
    location.reload()
}
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)+ min)
}

 

window.addEventListener("load", iniciarjuego)