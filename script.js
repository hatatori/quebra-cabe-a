function random(arr){
    arr.sort( () => .5 - Math.random() );
}


class Game{
    constructor(){
        this.painel = document.getElementById("painel")
        this.gameStart = false
    }

    setImage(str){
        this.image = str
    }

    tabuleiro(colunas, linhas){

        this.colunas = colunas
        this.linhas = linhas

        this.painel.innerHTML = ''

        this.arr = []
        this.ordem = []
        this.ordem2 = []
        let gameStart = false
        let canOrganize = false

        const img = new Image()
        img.src = this.image

        img.onload = () => {
                
            const quadrado_largura = parseInt(img.width / linhas)
            const quadrado_altura = parseInt(img.height / colunas)

            this.quadrado_largura = quadrado_largura
            this.quadrado_altura = quadrado_altura


            let s = 0
            let n = 0
            
            painel.style.width = 1+colunas+img.width+'px'
            painel.style.height = 1+linhas+img.height+'px'
        
            for(let i=0;i<colunas;i++){
                for(let j=0;j<linhas;j++){

                    this.ordem.push(s)
                    this.ordem2.push(s)

                    const canvas = document.createElement("canvas");
                    canvas.width = quadrado_largura
                    canvas.height = quadrado_altura
                    canvas.n = s++
                    // canvas.style.left = j*quadrado_largura+j+'px'
                    // canvas.style.top = i*quadrado_altura+i+'px'
                    canvas.style.left = j*quadrado_largura+'px'
                    canvas.style.top = i*quadrado_altura+'px'
                    
                    canvas.onclick=()=>{
        
                        this.arr.push(canvas)
        
                        if(this.arr.length == 1){
                            canvas.style.scale = 0.95
                            canvas.style.zIndex = 5
                            this.gameStart = true
                        }
        
                        if(this.arr.length > 1){
                            canvas.style.zIndex = 20
                            this.swap(this.arr[0], this.arr[1])
                            this.swapArray(this.arr[0].n, this.arr[1].n)
                            this.arr[0].ontransitionend=function(){ this.style.zIndex = '' }
                            this.arr[1].ontransitionend=function(){ this.style.zIndex = '';  }
                            this.arr = []
                        }

                        this.verificaFim()
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
    }

    verificaFim(){
        console.log('this.ordem')
        console.log(this.ordem)
        console.log('this.ordem2')
        console.log(this.ordem2.reverse())
        // if( this.gameStart && this.ordem.join('') == this.ordem2.sort((a,b) => a-b).join('')){
        //     setTimeout(()=>{
        //         alert('fim')
        //     },800)
        //     this.gameStart = false
        // }
    }

    swap(a, b){
    
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
    
    swapArray(a, b){
        let aux = this.ordem[b]
        this.ordem[b] = this.ordem[a]
        this.ordem[a] = aux
    }

    embaralhar(){
        const quantidade_quadrados = this.painel.children.length
        let r1 = parseInt(Math.random() * quantidade_quadrados)
        let r2 = parseInt(Math.random() * quantidade_quadrados)
        let p1 = this.painel.children[r1]
        let p2 = this.painel.children[r2]
        this.swap(p1, p2)
    }

    embaralharTudo(){
        const quantidade_quadrados = painel.children.length
        for(let i = 0;i<quantidade_quadrados;i++){
            this.embaralhar()
        }
    }

    organizarPorOrdem(arr){
        arr.map((e,i)=>{
            this.painel.children[e].style.left = (i*this.quadrado_largura)%(this.quadrado_largura*this.linhas)+'px'
            this.painel.children[e].style.top = parseInt(i/this.linhas)*this.quadrado_altura+'px'
        })
    }
}

const game = new Game()
game.setImage("imgs/foto.jpg")
// game.embaralharTudo()

// game.embaralharTudo()

function fase1(){
    game.tabuleiro(2,2)
    setTimeout(()=>{
        game.organizarPorOrdem([3,2,1,0])
    },1000)
}

function fase2(){
    game.tabuleiro(3,3)
    setTimeout(()=>{
        game.organizarPorOrdem([8,7,6,5,3,4,2,1,0])
    },1000)
}

function fase3(){
    game.tabuleiro(4,6)
    let num = []
    for(let i=0;i<24;i++){
        num.push(i)
    }
    num = num.sort(()=> 0.5 - Math.random() )
    
    setTimeout(()=>{
        game.organizarPorOrdem(num)
    },1000)
}

function fase3(){
    game.tabuleiro(4,6)
    let num = []
    for(let i=0;i<24;i++){
        num.push(i)
    }
    num = num.sort(()=> 0.5 - Math.random() )
    
    setTimeout(()=>{
        game.organizarPorOrdem(num)
    },1000)
}

function fase4(){
    game.tabuleiro(10,15)
    let num = []
    for(let i=0;i<150;i++){
        num.push(i)
    }
    num = num.sort(()=> 0.5 - Math.random() )
    
    setTimeout(()=>{
        game.organizarPorOrdem(num)
    },1000)
}

fase3()



