const LOGO = document.getElementById('logo')
LOGO.addEventListener('animationend', (event)=>rainbow())

function rainbow(){
    let spans = document.getElementsByTagName('span')
    for(let i = 0; i < spans.length; i++){
        spans[i].animate([
            {
                color: '#F00'
            },{
                color: '#DBFF00'
            },{
                color: '#0F0'
            },{
                color: '#00E0FF'
            },{
                color: '#00F'
            },{
                color: '#F00'
            }
    ],{
        duration: 3000,
        direction:"alternate",
        iterations: Infinity,
        delay: i*100
    })
    }
}