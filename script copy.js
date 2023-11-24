const painel = document.getElementById("painel")

function tabuleiro(colunas, linhas){

    painel.innerHTML = ''

    // const   colunas = 5
    // const   linhas = 5
    let arr = []
    let ordem = []
    let ordem2 = []
    let gameStart = false
    let canOrganize = false
    
    const img = new Image()
    img.src = "imgs/foto.jpg"
    
    img.onload = function(){
    
        const quadrado_largura = parseInt(this.width / linhas)
        const quadrado_altura = parseInt(this.height / colunas)
        let s = 0
        let n = 0
        
        painel.style.width = 1+colunas+this.width+'px'
        painel.style.height = 1+linhas+this.height+'px'
    
        for(let i=0;i<colunas;i++){
            for(let j=0;j<linhas;j++){
                
                // ordem.push(s)
                // ordem2.push(s)
    
                const canvas = document.createElement("canvas");
                canvas.width = quadrado_largura
                canvas.height = quadrado_altura
                canvas.n = s++
                canvas.style.left = j*quadrado_largura+'px'
                canvas.style.top = i*quadrado_altura+'px'
                
                canvas.onclick=function(){
    
                    arr.push(this)
    
                    if(arr.length == 1){
                        this.style.scale = 0.95
                        this.style.zIndex = 5
                    }
    
                    if(arr.length > 1){
                        this.style.zIndex = 20
                        swap(arr[0], arr[1])
                        swapArray(arr[0].n, arr[1].n)
                        arr[0].ontransitionend=function(){ this.style.zIndex = '' }
                        arr[1].ontransitionend=function(){ this.style.zIndex = ''; verificaFim() }
                        arr = []
                    }
                }
    
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, -j*quadrado_largura, -i*quadrado_altura);
                ctx.strokeStyle = "#00000055";
                ctx.rect(0, 0, quadrado_largura, quadrado_altura);
                ctx.stroke();
                painel.appendChild(canvas)

            }
        }

        
    }

    function swap(a, b){
    
        a.style.scale = 1
        b.style.scale = 1
    
        let x = a.style.left
        let y = a.style.top
    
        a.style.boxShadow = ''
        b.style.boxShadow = ''

        a.style.left = b.style.left
        a.style.top = b.style.top
    
        b.style.left = x
        b.style.top = y
        
    }
    
    function swapArray(a, b){
        let aux = ordem[b]
        ordem[b] = ordem[a]
        ordem[a] = aux
    }
    
    
    
    function embaralhar(){
        const quantidade_quadrados = painel.children.length
        let r1 = parseInt(Math.random() * quantidade_quadrados)
        let r2 = parseInt(Math.random() * quantidade_quadrados)
        let p1 = painel.children[r1]
        let p2 = painel.children[r2]
        // swap(p1, p2)
        p1.click()
        p2.click()
    }
    
    function embaralharTudo(){
        const quantidade_quadrados = painel.children.length
        for(let i = 0;i<quantidade_quadrados;i++){
            embaralhar()
        }
    }
    
    function ordenar(a){
        // let a = 0
        let b = ordem.indexOf(a)
    
        let p1 = painel.children[a]
        let p2 = painel.children[b]
    
        p1.click()
        p2.click()
    }
    
    
    let valor = 0
    function ordenarTudo(){
        setTimeout(()=>{
            ordenar(valor++)
            if(valor < colunas * linhas)
                ordenarTudo()
        },100)
        // for(let i=0;i<colunas*linhas;i++){
            // ordenar(i)
        // }
    }
    
    function verificaFim(){
        if( gameStart && ordem.join('') == ordem2.sort((a,b) => a-b).join('')){
            setTimeout(()=>{
                alert('fim')
            },800)
            gameStart = false
        }
    }
    
    function start(){
        gameStart = true
    }

    window.addEventListener('keyup' ,function(e){
        if(e.key == '1') embaralharTudo();
        if(e.key == '2') {
            valor = 0
            ordenarTudo();
        }
    })

    window.addEventListener('keyup' ,function(e){
        console.log(e.key)
        if(e.key == 'a') { tabuleiro(4,4) ; console.log('a')}
        if(e.key == 's') { tabuleiro(10,10) ; console.log('a')}
        if(e.key == 'd') { tabuleiro(13,20) ; console.log('s')}
        // if(e.key == 'd') { tabuleiro(7,7) ; console.log('d')}
        // if(e.key == 'f') { tabuleiro(20,20) ; console.log('d')}
    })
    
}

// tabuleiro(3,3)

class Game{
    constructor(){

    }

    tabuleiro(colunas, linhas){
        
    }
}

const game = new Game()
game.tabuleiro(5,5)


