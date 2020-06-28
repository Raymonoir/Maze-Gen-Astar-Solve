class Grid
{
    constructor(canvasElement, columnCount, rowCount, cellSize) 
    {
        this.canvas = canvasElement;
        this.canvasContext = this.canvas.getContext("2d");
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.grid = new Array();
        this.cellSize = cellSize;
        this.columnCount = columnCount;
        this.rowCount = rowCount;
        this.generateGrid()

        

    }

    generateGrid()
    {
        for(let column = 0; column < this.columnCount; column++)
        {
            this.grid.push(new Array());
            for (let row = 0; row < this.rowCount; row++)
            {
                this.grid[column][row] = new Cell(this.cellSize,column,row, "rgb(0,0,0)");
            }
        }
    }


    drawGridOutline()
    {

        this.canvasContext.moveTo(0, 0);
        this.canvasContext.lineTo(this.cellSize * this.columnCount, 0);
        this.canvasContext.lineTo(this.cellSize * this.columnCount, this.cellSize * this.rowCount);
        this.canvasContext.lineTo(0, this.cellSize * this.rowCount);
        this.canvasContext.lineTo(0, 0);
        
    }


    drawGrid()
    {
        
        for(let column = 0; column < this.columnCount; column++)
        {
            for (let row = 0; row < this.rowCount; row++)
            {
                //Top
                if (this.grid[column][row].getWall(0))
                {  
                    this.canvasContext.moveTo(column * this.cellSize, row * this.cellSize);
                    this.canvasContext.lineTo((column+1) * this.cellSize, row * this.cellSize);
                }

                //Right
                if (this.grid[column][row].getWall(1))
                {
                    this.canvasContext.moveTo((column+1) * this.cellSize, row * this.cellSize);
                    this.canvasContext.lineTo((column+1) * this.cellSize, (row+1) * this.cellSize);
                }

                //Bottom
                if (this.grid[column][row].getWall(2))
                {
                    this.canvasContext.moveTo((column+1) * this.cellSize, (row +1)* this.cellSize);
                    this.canvasContext.lineTo(column * this.cellSize, (row+1) * this.cellSize);
                }

                //Left
                if (this.grid[column][row].getWall(3))
                {
                    this.canvasContext.moveTo(column * this.cellSize, (row+1) * this.cellSize);
                    this.canvasContext.lineTo(column * this.cellSize, row * this.cellSize);
                }

                let num1 = Math.random() * (row / this.rowCount) * 255;
                let num2 = Math.random() * (column / this.columnCount) * 255;
                let num3 = Math.random() * row + column;


                this.canvasContext.fillStyle = "rgb(" + this.grid[column][row].colour + ")";

                this.canvasContext.fillRect(column * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);

                
            }
        }
        this.canvasContext.strokeStyle = "rgb(255,0,0)";
        this.canvasContext.lineWidth = 1;

        this.drawGridOutline()

        this.canvasContext.stroke();

        

       
    }
}