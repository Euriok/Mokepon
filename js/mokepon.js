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

const sectionverMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opciondemokepones
let inputCapipepo
let inputRatigueya
let inputHipodoge
let vidasJugador = 3
let vidasEnemigo = 3
let mascotaplayer
let ataquesmokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []

let mascotajugadorobjeto

let indexAtaqueJugador
let indexATAqueEnemigo
let VictoriasJugador = 0
let VictoriasEnemigos = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"

let alturaBuscada
let anchodelMapa = window.innerWidth - 20
const anchomaximodelmapa = 350

if (anchodelMapa > anchomaximodelmapa) {
    anchodelMapa = anchomaximodelmapa - 20
}

alturaBuscada = anchodelMapa * 600 / 800

mapa.width = anchodelMapa
mapa.height = alturaBuscada


class Mokepon {
    constructor(nombre, foto, vida,  fotomapa, id = null) {
        this.id = id
        this.nombre = nombre 
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width -this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotomapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )    
    }
}

let Hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png")

let Capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png")

let Ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png")



const HIPODOGE_ATAQUES = [
    { nombre: "♒", id: "boton-agua"}, 
    { nombre: "♒", id: "boton-agua"},
    { nombre: "♒", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🌏", id: "boton-tierra"},
]

Hipodoge.ataques.push(...HIPODOGE_ATAQUES)


const CAPIPEPO_ATAQUES = [
    { nombre: "🌏", id: "boton-tierra"}, 
    { nombre: "🌏", id: "boton-tierra"},
    { nombre: "🌏", id: "boton-tierra"},    
    { nombre: "♒", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"},
]

Capipepo.ataques.push(...CAPIPEPO_ATAQUES)


const RATIGUEYA_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego"}, 
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "♒", id: "boton-agua"},
    { nombre: "🌏", id: "boton-tierra"},
]

Ratigueya.ataques.push(...RATIGUEYA_ATAQUES)


mokepones.push(Hipodoge,Capipepo,Ratigueya)





function iniciarjuego() {
    
    sectionSeleccionarAtaque.style.display = "none"
    sectionverMapa.style.display = "none"

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

    unirseAljuego()
}

function unirseAljuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function selecionarMascotaJugador(){
    
    sectionSeleccionarMascota.style.display = "none"
    
   
        


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

    seleccionarMokepon(mascotaplayer)

    extraerataques(mascotaplayer)
    sectionverMapa.style.display = "flex"
    iniciarmapa()
    
} 

function seleccionarMokepon(mascotaplayer) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaplayer
        })
    })
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
        <button id=${ataque.id} class="boton-de-ataque BATaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesmokepon
    }); 

    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BATaque")
    

}

function secuenciaAtaques() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "♒") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
            
        }) 
    })
}

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}
    


function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaques()
}


function ataquealeatorioEnemigo() {
    let ataquealeatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if (ataquealeatorio == 0 || ataquealeatorio ==1) {
        ataqueEnemigo.push("FUEGO")
    } else if (ataquealeatorio == 3 || ataquealeatorio ==4) {
        ataqueEnemigo.push("AGUA")
    } else {
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarpelea()
    
}

function iniciarpelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexambosoponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexATAqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexambosoponentes(index, index)
            crearMensaje("EMPATE")            
        } else if (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA") {
            indexambosoponentes(index, index)
            crearMensaje("GANASTE")
            VictoriasJugador++
            spanVidasJugador.innerHTML = VictoriasJugador
        } else if (ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO") {
            indexambosoponentes(index, index)
            crearMensaje("GANASTE")
            VictoriasJugador++
            spanVidasJugador.innerHTML = VictoriasJugador
        } else if (ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA") {
            indexambosoponentes(index, index)
            crearMensaje("GANASTE")
            VictoriasJugador++
            spanVidasJugador.innerHTML = VictoriasJugador
        } else {
            indexambosoponentes(index, index)
            crearMensaje("PERDISTE")
            VictoriasEnemigos++
            spanVidasEnemigo.innerHTML = VictoriasEnemigos
        }
        
    }

    revisarvidas()
    
}

function revisarvidas() {
    if (VictoriasJugador === VictoriasEnemigos) {
        crearMensajefinal ("Tablas")
    } else if (VictoriasJugador > VictoriasEnemigos) {
        crearMensajefinal ("Ganaste! :)") 
    } else {
        crearMensajefinal ("Perdiste Noob")
    }

}


function crearMensaje(resultado) {
    

    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexATAqueEnemigo
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajefinal(resultadofinal) {
    
    sectionreiniciar.style.display = "block"


    sectionMensajes.innerHTML = resultadofinal

    

    
   
}



function reiniciarjuego() {
    location.reload()
}
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)+ min)
}

function pintarCanvas() {

    mascotajugadorobjeto.x = mascotajugadorobjeto.x + mascotajugadorobjeto.velocidadX
    mascotajugadorobjeto.y = mascotajugadorobjeto.y + mascotajugadorobjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height )
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotajugadorobjeto.pintarMokepon()

    enviarPosicion(mascotajugadorobjeto.x, mascotajugadorobjeto.y)
    
    mokeponesEnemigos.forEach(function (mokepon) {
        if(mokepon != undefined) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
        }
    })
    
} 

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        if (enemigo.mokepon != undefined) {
                            const mokeponNombre = enemigo.mokepon.nombre 
                            switch (mokeponNombre)
                            {
                            case "Hipodoge":
                                mokeponEnmigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id)
                                    break
                                case "Capipepo":
                                    mokeponEnmigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id)
                                    break
                                case "Ratigueya":
                                    mokeponEnmigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id)
                                    break
                                default:
                                    break
                            }
    
                            mokeponEnmigo.x = enemigo.x
                            mokeponEnmigo.y = enemigo.y
                        }
                            return mokeponEnmigo
                    })
                    
                    
                    
                    
                })
        }
    })
}


function moverDerecha() {
    mascotajugadorobjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotajugadorobjeto.velocidadX = - 5
    
}
function moverArriba() {
    mascotajugadorobjeto.velocidadY = - 5
    
}
function moverAbajo() {
    mascotajugadorobjeto.velocidadY = + 5
}

function detenerMovimiento() {
    
    mascotajugadorobjeto.velocidadX = 0
    mascotajugadorobjeto.velocidadY = 0

}

function sepresionounatecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo()
            break;
        case "ArrowLeft":
            moverIzquierda()
            break;
        case "ArrowRight":
            moverDerecha()
            break;
            
        default:
            break;
    }
}

function iniciarmapa() {
    
    mascotajugadorobjeto = obtenerobjetomascota(mascotaplayer)
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener("keydown", sepresionounatecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerobjetomascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaplayer === mokepones[i].nombre) {
            return mokepones[i]
         }       
    }
}

function revisarColision(enemigo) {
    console.log()
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x 

    const arribaMascota = mascotajugadorobjeto.y
    const abajoMascota = mascotajugadorobjeto.y + mascotajugadorobjeto.alto
    const derechaMascota = mascotajugadorobjeto.x + mascotajugadorobjeto.ancho
    const izquierdaMascota = mascotajugadorobjeto.x 
    
    
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("Se detecto una colision");

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = "flex"
    sectionverMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
    
}
window.addEventListener("load", iniciarjuego)