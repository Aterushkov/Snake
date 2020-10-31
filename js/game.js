let game ={
    x:0,
    y:0,
    start: function (){
        let canvas= document.getElementById("mycanvas");
        let ctx = canvas.getContext("2d");

        let background =new Image();
        background.src = "img/background.png";
        let cell =new Image();
        cell.src = "img/cell.png";
        background.addEventListener("load", ()=>{
            window.requestAnimationFrame(()=>{
                ctx.drawImage(background,this.x ,this.y);
            });
        });

    }
};
game.start();

