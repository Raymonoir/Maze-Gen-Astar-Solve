
//Grid object stores a 2D array of cell objects
class Grid
{
    constructor(canvasElement, columnCount, rowCount, cellSize, fillColour, lineColour) 
    {
        this.canvas = canvasElement;
        this.canvasContext = this.canvas.getContext("2d");

        this.height = this.canvas.height;
        this.width = this.canvas.width;


        this.grid = new Array();
        this.cellSize = cellSize;


        this.columnCount = columnCount;
        this.rowCount = rowCount;


        this.fillColour = fillColour;
        this.lineColour = lineColour;

        this.generateGrid()

    }


    //returns the cell at the given column, row
    getCell(column, row)
    {
        return this.grid[column][row];
    }


    //returns a random unvisited neighbour of the provided cell
    getRandomNeighbour(cell)
    {
        let currentCell = cell;
        let randomNeigbour = null;
        let neighboursArray = []


        //Above currentCell
        if (currentCell.yPos > 0 && !this.grid[currentCell.xPos][currentCell.yPos - 1].visited)
        {
            neighboursArray.push(this.grid[currentCell.xPos][currentCell.yPos - 1]);
        }

        //Right of currentCell
        if (currentCell.xPos < this.rowCount-1 && !this.grid[currentCell.xPos + 1][currentCell.yPos].visited)
        {
            neighboursArray.push(this.grid[currentCell.xPos + 1][currentCell.yPos]);
        }

        //Below currentCell
        if (currentCell.yPos < this.columnCount-1 && !this.grid[currentCell.xPos][currentCell.yPos + 1].visited)
        {
            neighboursArray.push(this.grid[currentCell.xPos][currentCell.yPos + 1]);
        }

        //Left of currentCell
        if (currentCell.xPos > 0 && !this.grid[currentCell.xPos -1][currentCell.yPos].visited)
        {
            neighboursArray.push(this.grid[currentCell.xPos -1][currentCell.yPos]);
        }


        if (neighboursArray.length > 0)
        {
            randomNeigbour = neighboursArray[Math.floor(Math.random() * neighboursArray.length)]
        }


        return randomNeigbour;

    }



    //Removes the wall between the provided two cells
    removeWall(cell1, cell2)
    {
        //0    1       2     3
        //TOP RIGHT BOTTOM LEFT


        //Cell2 is on right of cel11, remove cell2 left wall and cell1 right wall
        if (cell2.xPos - cell1.xPos == 1)
        {
            cell2.removeWall(3);
            cell1.removeWall(1);
        }
        //cell 1 is on the right of cell 2, remove cell2 right wall and cell1 left wall
        else if (cell2.xPos - cell1.xPos == -1)
        {
            cell2.removeWall(1);
            cell1.removeWall(3);
        }
        //Cell 2 is below cell1, remove cell2 top and cell1 bottom
        else if (cell2.yPos - cell1.yPos == 1)
        {
            cell2.removeWall(0);
            cell1.removeWall(2);
        }
        //cell 1 is below cell2, remove cell 1 top and cell2 bottom
        else if (cell2.yPos - cell1.yPos == -1)
        {
            cell2.removeWall(2);
            cell1.removeWall(0);
        }



    }


    //Generated the grid of cells
    generateGrid()
    {
        for(let column = 0; column < this.columnCount; column++)
        {
            this.grid.push(new Array());
            for (let row = 0; row < this.rowCount; row++)
            {
                this.grid[column][row] = new Cell(this.cellSize,column,row, this.fillColour, column.toString() + row.toString());
            }
        }
    }



    //Clears the grid of
    clearGrid()
    {   
        this.canvasContext.clearRect(0,0,this.canvasWidth, this.canvasHeight);
    }

    //Draws all lines of each cell on the grid
    drawGrid()
    {
        this.canvasContext.beginPath()
        this.canvasContext.lineWidth = 1;
        this.canvasContext.strokeStyle = self.lineColor;
        



        for(let column = 0; column < this.columnCount; column++)
        {
            for (let row = 0; row < this.rowCount; row++)
            {
                //Top
                if (this.grid[column][row].getWall(0))
                {  
                    this.canvasContext.moveTo(column * this.cellSize+1, row * this.cellSize+1);
                    this.canvasContext.lineTo((column+1) * this.cellSize+1, row * this.cellSize+1);
                }

                //Right
                if (this.grid[column][row].getWall(1))
                {
                    this.canvasContext.moveTo((column+1) * this.cellSize+1, row * this.cellSize+1);
                    this.canvasContext.lineTo((column+1) * this.cellSize+1, (row+1) * this.cellSize+1);
                }

                //Bottom
                if (this.grid[column][row].getWall(2))
                {
                    this.canvasContext.moveTo((column+1) * this.cellSize+1, (row +1)* this.cellSize+1);
                    this.canvasContext.lineTo(column * this.cellSize+1, (row+1) * this.cellSize+1);
                }

                //Left
                if (this.grid[column][row].getWall(3))
                {
                    this.canvasContext.moveTo(column * this.cellSize+1, (row+1) * this.cellSize+1);
                    this.canvasContext.lineTo(column * this.cellSize+1, row * this.cellSize+1);
                }


                this.canvasContext.fillStyle = this.grid[column][row].colour;
                this.canvasContext.fillRect(column * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
                this.canvasContext.stroke();
            }
        }
    

    }
}