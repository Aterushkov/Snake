game.snake ={
    game:game,
    cells:[],
    moving:false,
    direction:false,
    directions : {
        up:{
            row : -1,
            col : 0,
            angle:180
        },
        down:{
            row : 1,
            col : 0,
            angle:0
        },
        left:{
            row : 0,
            col : -1,
            angle:90
        },
        right:{
            row : 0,
            col : 1,
            angle:270
        }
    },
    create(){
        let startCells =[{row:7, col:7}, {row:8, col:7}];
        this.direction = this.directions.up;
        for (let startCell of  startCells){
            let cell = this.game.board.getCell(startCell.row,startCell.col);
            this.cells.push(cell);
        }
    },
    renderHead(){
        let head = this.cells[0];
        let halfSize = this.game.sprites.head.width/2;

        this.game.ctx.save();
        this.game.ctx.translate(head.x,head.y);
        this.game.ctx.translate(halfSize,halfSize);
        let degree = this.direction.angle;
        this.game.ctx.rotate(degree * Math.PI / 180);
        this.game.ctx.drawImage(this.game.sprites.head,-halfSize,-halfSize);
        this.game.ctx.restore();

    },
    renderBody(){
        for (let i = 1; i< this.cells.length; i++){
            this.game.ctx.drawImage(this.game.sprites.body,this.cells[i].x,this.cells[i].y);
        }
    },
    render(){
        this.renderHead();
        this.renderBody();
    },
    start(keyCode){
        switch (keyCode){
            case 38:
                this.direction = this.directions.up;
                break;
            case 37:
                this.direction = this.directions.left;
                break;
            case 39:
                this.direction = this.directions.right;
                break;
            case 40:
                this.direction = this.directions.down;
                break;
        }
        if(!this.moving){
            this.game.onSnakeStart();
        }
        this.moving = true;
    },
    move(){
        if(!this.moving){
            return;
        }
        let cell = this.getNexCell();

        if(!cell || this.hasCell(cell) || this.game.board.isBomdCell(cell) ){
            this.game.stop();
        }else if(this.game.score === 2){
            this.game.win();
        } else{
            this.cells.unshift(cell);
            if(!this.game.board.isFoodCell(cell)){
                this.cells.pop();
            }else{
                this.game.onSnakeEat();
            }
        }
    },
    hasCell(cell){
       return this.cells.find(part => part === cell);
    },
    getNexCell(){
        let head = this.cells[0];
        let row = head.row + this.direction.row;
        let col = head.col + this.direction.col;
        return this.game.board.getCell(row,col);

    }
};