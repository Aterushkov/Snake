game.snake ={
    game:game,
    cells:[],
    create(){
        let startCells =[{row:7, col:7}, {row:8, col:7}];
        for (let startCell of  startCells){
            let cell = this.game.board.getCell(startCell.row,startCell.col);
            this.cells.push(cell);
        }
    },
    render(){
        this.cells.forEach(cell =>{
            this.game.ctx.drawImage(this.game.sprites.body,cell.x,cell.y);
        });
    },
    move(){
        let cell = this.getnexCell();
        if(cell){
            this.cells.unshift(cell);
            this.cells.pop();
        }
    },
    getnexCell(){
        let head = this.cells[0];
        let row = head.row-1;
        let col = head.col;
        return this.game.board.getCell(row,col);

    }
};