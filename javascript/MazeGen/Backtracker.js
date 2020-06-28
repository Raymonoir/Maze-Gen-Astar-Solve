

//Backtracker class implements the recursive backtracking algorithm
//here: https://en.wikipedia.org/wiki/Maze_generation_algorithm
//Altered slightly to allow me to animate the process
class Backtracker
{
    constructor(grid, initalCellX, initialCellY) 
    {
        
        this.cellStack = new Stack();

        this.grid = grid;

        this.initalCell = grid.getCell(initalCellX,initialCellY);
        this.initalCell.visited = true;

        this.cellStack.push(this.initalCell);
        
        this.grid.drawGrid();

        this.startBacktrack();
    
    }


    //Begins the backtracking algorithm
    startBacktrack()
    {
        if (!this.cellStack.isEmpty())
        {
            this.doNextIteration()
            
            setTimeout(() => {this.startBacktrack();}, 0)
        }
    }


    //Performs a single iteration of the back tracking algorithm
    doNextIteration ()
    {
        this.grid.clearGrid();
        let currentCell = this.cellStack.pop();
        currentCell.colour = "rgb(0,0,255)"

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