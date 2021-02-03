const GREEN = document.getElementById('green');
const RED = document.getElementById('red');
const YELLOW = document.getElementById('yellow');
const BLUE = document.getElementById('blue');

const startButton = document.getElementById('start-button')
const DIFFICULTIE_BUTTONS = document.getElementById('difficulties')

const PUNTUACION = document.getElementById('score')
const PUNTUACION_MAXIMA = document.getElementById('high-score')

const MESSAGE = document.getElementById('message')

var puntuacion_maxima = 0
var dificultad = 10

class GameMatch{
    traducirNumerosAColores(n){
        switch(n){
            case 0:
                return 'green'
            case 1:
                return 'red'
            case 2:
                return 'yellow'
            case 3:
                return 'blue'
        }
    }
    traducirColoresANumeros(color){
        switch(color){
            case 'green':
                return 0
            case 'red':
                return 1
            case 'yellow':
                return 2
            case 'blue':
                return 3
        }
    }
    debugButton(){
        if(startButton.classList.contains('hidden')){
            startButton.classList.remove('hidden')
            DIFFICULTIE_BUTTONS.classList.remove('hidden')
        }else{
            startButton.classList.add('hidden')
            DIFFICULTIE_BUTTONS.classList.add('hidden')
        }
    }
    constructor(finalLevel){
        this.puntuacion = 0

        this.colors = {
            green: GREEN,
            red: RED,
            yellow: YELLOW,
            blue: BLUE
        }
        this.finalLevel = finalLevel
        this.secuencia = [Math.floor(Math.random() * 4)]
        this.inicializar()
        setTimeout(() => this.siguienteNivel(), 500)
    }


    inicializar(){
        this.nivel = 1
        this.debugButton()
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)

        MESSAGE.innerText = `Bienvenido al nivel ${this.nivel}`
    }


    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
    }
    aumentarDificultad(){
        this.secuencia.push(Math.floor(Math.random() * 4))
    }


    iluminarSecuencia(){
        this.desactivarButtonsInput()
        MESSAGE.innerHTML = "Espera"
        for(let i = 0; i < this.secuencia.length; i++){
            const color = this.traducirNumerosAColores(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
        setTimeout(() => this.activarButtonsInput(), 1000 * this.nivel + 1)
    }


    iluminarColor(color){
        this.colors[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 500)
    }
    apagarColor(color){
        this.colors[color].classList.remove('light')
    }


    activarButtonsInput(){
        MESSAGE.innerHTML = "Pon la secuencia"
        this.colors['green'].addEventListener('click', this.elegirColor)
        this.colors['red'].addEventListener('click', this.elegirColor)
        this.colors['yellow'].addEventListener('click', this.elegirColor)
        this.colors['blue'].addEventListener('click', this.elegirColor)
    }
    desactivarButtonsInput(){
        this.colors['green'].removeEventListener('click', this.elegirColor)
        this.colors['red'].removeEventListener('click', this.elegirColor)
        this.colors['yellow'].removeEventListener('click', this.elegirColor)
        this.colors['blue'].removeEventListener('click', this.elegirColor)
    }


    elegirColor(ev){
        const color = ev.target.dataset.color
        this.iluminarColor(color)
        const num = this.traducirColoresANumeros(color)
        if(num == this.secuencia[this.subnivel]){
            if(this.nivel - 1 == this.subnivel){
                if(this.nivel == this.finalLevel){
                    this.desactivarButtonsInput()
                    this.GanoElJuego()
                }else{
                    this.nivel++
                    this.aumentarDificultad()
                    this.desactivarButtonsInput()

                    MESSAGE.innerText = `Bienvenido al nivel ${this.nivel}`
                    setTimeout(() => this.siguienteNivel(), 2000)
                }
            }else{
                this.subnivel++

                MESSAGE.innerText = `Bien hecho solo quedan 
                    ${this.nivel - this.subnivel}`
            }
            this.aumentarPuntuacion()
        }else{
            this.desactivarButtonsInput()
            this.PerdioElJuego()
        }
    }


    GanoElJuego(){
        Swal.fire({
            title: 'Felicidades!!!!!',
            text: 'Ganaste el Juego',
            icon: 'success'
        })
        .then (
            this.debugButton()
        )
    }


    PerdioElJuego(){
        MESSAGE.innerHTML = "Lo siento perdiste el juego";
        Swal.fire({
            title: 'Perdiste!',
            text: 'Lo siento perdiste el Juego :{',
            icon: 'error'
        })
        .then (
            this.debugButton()
        )
    }

    aumentarPuntuacion(){
        this.puntuacion++
        PUNTUACION.innerHTML = `Tu puntaci&oacute;n es: ${this.puntuacion}`

        if(this.puntuacion > puntuacion_maxima){
            puntuacion_maxima = this.puntuacion
            PUNTUACION_MAXIMA.innerHTML = `Tu puntaci&oacute;n m&aacute;xima es: ${this.puntuacion}` 
        }
    }

}

function startNewGame(){
    window.game = new GameMatch(dificultad);
}

function changeDiffucult(max_levels, message){
    dificultad = max_levels
    MESSAGE.innerHTML = `Modo: ${message}`;
}