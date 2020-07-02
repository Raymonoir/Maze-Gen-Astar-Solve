

//Backtracker class implements the recursive backtracking algorithm
//here: https://en.wikipedia.org/wiki/Maze_generation_algorithm
//Altered slightly to allow me to animate the process
class Backtracker
{
    constructor(grid, initalCellX, initialCellY,currentCellColour,aStar,speed) 
    {
        
        this.currentCellColour = currentCellColour;
        this.cellStack = new Stack();

        this.speed = speed
        this.grid = grid;

        this.initalCell = grid.getCell(initalCellX,initialCellY);
        this.initalCell.visited = true;

        this.cellStack.push(this.initalCell);
        
        this.grid.drawGrid();

        this.aStar = aStar;

        this.startBacktrack();

    
    }


    //Begins the backtracking algorithm
    startBacktrack()
    {
        if (!this.cellStack.isEmpty())
        {
            this.doNextIteration()
            
            setTimeout(() => {this.startBacktrack();}, this.speed)
        }
        else
        {
            //Just cleans up the current cell trail
            this.grid.getCell(0,0).colour = this.currentCellColour;
            for (let i = 0; i < 7; i++)
            {
                this.grid.drawGrid();
            }


            
            this.aStar.startAStar();
            
        }
    }


    increaseSpeed()
    {

    }



    //Performs a single iteration of the back tracking algorithm
    doNextIteration ()
    {
        this.grid.clearGrid();
        let currentCell = this.cellStack.pop();
        currentCell.colour = this.currentCellColour; 

        if (this.grid.getRandomNeighbour(currentCell))
        {
            this.cellStack.push(currentCell);
            let nextNeighbour = this.grid.getRandomNeighbour(currentCell);

            grid.removeWall(currentCell, nextNeighbour);
            nextNeighbour.visited = true;
            this.cellStack.push(nextNeighbour);
        }

        this.grid.drawGrid();
        currentCell.colour = grid.fillColour;
    }
}