
//Grid object stores a 2D array of cell objects
class Grid
{
    constructor(canvasElement, columnCount, rowCount, cellWidth, cellHeight, fillColour, lineColour) 
    {
        this.canvas = canvasElement;
        this.canvasContext = this.canvas.getContext("2d");


        this.grid = new Array();


        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;


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



    getAllAvailableNeighbours(cell)
    {
        let neighboursArray = [];
        let currentCell = cell;

        //For a neighbour to be available, they must be next to the current cell and not have a wall between them

        //Above current cell, must have no wall between them 
        if (currentCell.yPos > 0 && !this.grid[currentCell.xPos][currentCell.yPos - 1].getWall(2) && !currentCell.getWall(0))
        {
            neighboursArray.push(this.grid[currentCell.xPos][currentCell.yPos - 1]);
        }

        //Right of currentCell
        if (currentCell.xPos < this.columnCount-1 && !this.grid[currentCell.xPos + 1][currentCell.yPos].getWall(3) && !currentCell.getWall(1))
        {
            neighboursArray.push(this.grid[currentCell.xPos + 1][currentCell.yPos]);
        }

        //Below currentCell
        if (currentCell.yPos < this.rowCount-1 && !this.grid[currentCell.xPos][currentCell.yPos + 1].getWall(0)  && !currentCell.getWall(2))
        {
            neighboursArray.push(this.grid[currentCell.xPos][currentCell.yPos + 1]);
        }

        //Left of currentCell
        if (currentCell.xPos > 0 && !this.grid[currentCell.xPos -1][currentCell.yPos].getWall(1) && !currentCell.getWall(3))
        {
            neighboursArray.push(this.grid[currentCell.xPos -1][currentCell.yPos]);
        }

        return neighboursArray;

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
        if (currentCell.xPos < this.columnCount-1 && !this.grid[currentCell.xPos + 1][currentCell.yPos].visited)
        {
            neighboursArray.push(this.grid[currentCell.xPos + 1][currentCell.yPos]);
        }

        //Below currentCell
        if (currentCell.yPos < this.rowCount-1 && !this.grid[currentCell.xPos][currentCell.yPos + 1].visited)
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
        let id = 0;
        for(let column = 0; column < this.columnCount; column++)
        {
            this.grid.push(new Array());
            for (let row = 0; row < this.rowCount; row++)
            {
                this.grid[column][row] = new Cell(this.cellSize,column,row, this.fillColour, id);
                id++;
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



        // document.getElementById("main-canvas").getContext("2d").fillStyle = "rgb(255,255,255)"
        // document.getElementById("main-canvas").getContext("2d").font = "50px Helvetica";
        // document.getElementById("main-canvas").getContext("2d").textAlign = "center";
        // document.getElementById("main-canvas").getContext("2d").fillText("Raymond Ward",this.width/2,this.height / 2);



        this.canvasContext.beginPath()
        this.canvasContext.lineWidth = 0.3;
        
        for(let column = 0; column < this.columnCount; column++)
        {
            for (let row = 0; row < this.rowCount; row++)
            {
                //Top
                if (this.grid[column][row].getWall(0))
                {  
                    this.canvasContext.moveTo(column * this.cellWidth+1, row * this.cellHeight+1);
                    this.canvasContext.lineTo((column+1) * this.cellWidth+1, row * this.cellHeight+1);
                }

                //Right
                if (this.grid[column][row].getWall(1))
                {
                    this.canvasContext.moveTo((column+1) * this.cellWidth+1, row * this.cellHeight+1);
                    this.canvasContext.lineTo((column+1) * this.cellWidth+1, (row+1) * this.cellHeight+1);
                }

                //Bottom
                if (this.grid[column][row].getWall(2))
                {
                    this.canvasContext.moveTo((column+1) * this.cellWidth+1, (row +1)* this.cellHeight+1);
                    this.canvasContext.lineTo(column * this.cellWidth+1, (row+1) * this.cellHeight+1);
                }

                //Left
                if (this.grid[column][row].getWall(3))
                {
                    this.canvasContext.moveTo(column * this.cellWidth+1, (row+1) * this.cellHeight+1);
                    this.canvasContext.lineTo(column * this.cellWidth+1, row * this.cellHeight+1);
                }



                //console.log(this.grid[column][row].colour);
                this.canvasContext.fillStyle = this.grid[column][row].colour;
                this.canvasContext.fillRect(column * this.cellWidth, row * this.cellHeight, this.cellWidth, this.cellHeight);
                this.canvasContext.strokeStyle = this.lineColour;
                
            }
        }
        this.canvasContext.stroke();
    

    }
}