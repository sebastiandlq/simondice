const GREEN = document.getElementById('green');
const RED = document.getElementById('red');
const YELLOW = document.getElementById('yellow');
const BLUE = document.getElementById('blue');

const startButton = document.getElementById('start-button')

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
        }else{
            startButton.classList.add('hidden')
        }
    }
    constructor(){
        this.colors = {
            green: GREEN,
            red: RED,
            yellow: YELLOW,
            blue: BLUE
        }
        this.finalLevel = 10
        this.secuencia = [Math.floor(Math.random() * 4)]
        this.inicializar()
        setTimeout(() => this.siguienteNivel(), 500)
    }
    inicializar(){
        this.nivel = 1
        startButton.classList.add('hidden')
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
    }
    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
    }
    aumentarDificultad(){
        this.secuencia.push(Math.floor(Math.random() * 4))
    }
    iluminarSecuencia(){
        for(let i = 0; i < this.secuencia.length; i++){
            const color = this.traducirNumerosAColores(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
            if(i >= this.secuencia.length - 1){
                this.activarButtonsInput()
            }
        }
    }
    iluminarColor(color){
        this.colors[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 500)
    }
    apagarColor(color){
        this.colors[color].classList.remove('light')
    }
    activarButtonsInput(){
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
                    this.debugButton()
                }else{
                    this.nivel++
                    this.aumentarDificultad()
                    this.desactivarButtonsInput()
                    setTimeout(() => this.siguienteNivel(), 2000)
                }
            }else{
                this.subnivel++
            }
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
    }
    PerdioElJuego(){
        Swal.fire({
            title: 'Perdiste!',
            text: 'Lo siento perdiste el Juego :{',
            icon: 'error'
        })
        .then (
            this.debugButton()
        )
    }
}

function startNewGame(){
    window.game = new GameMatch();
}