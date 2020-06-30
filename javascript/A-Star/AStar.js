class AStar
{
    constructor(grid, startCell, endCell) 
    {   
        this.startCell = startCell;
        this.endCell = endCell;
        this.grid = grid;



        this.speed = 75;
        this.closedSet = [];
        this.openSet = new PriorityQueue();


        this.complete = false;
        this.found = false;



        this.openSet.push(this.startCell);
        
        this.startCell.gScore = 0;
        this.startCell.fScore = this.heuristicFunction(startCell);
        

    }


    doNextIteration()
    {

        this.grid.clearGrid();
        let currentCell = this.openSet.pop();
        
    

        if (currentCell.id === this.endCell.id)
        {
            this.complete = true;
            this.found = true;
        }

        
        this.highlightCorrectCells(currentCell);

        this.grid.getAllAvailableNeighbours(currentCell).forEach((nextCell) =>
        { 
            let tempGScore = currentCell.gScore + 1;

            if (tempGScore < nextCell.gScore)
            {
                nextCell.cameFrom = currentCell;

                nextCell.gScore = tempGScore;
                nextCell.fScore = nextCell.gScore + this.heuristicFunction(nextCell);

                if (!this.openSet.contains(nextCell))
                {
                    this.openSet.push(nextCell);
                }
                
            }

        });

        this.closedSet.push(currentCell.id);

        this.grid.drawGrid();

    }



    highlightCorrectCells(currentCell)
    {
        let ctx = this.grid.canvasContext;

        ctx.strokeStyle = "rgb(0,255,0)";
        ctx.lineWidth = 4;
        ctx.moveTo(49.5 * this.grid.cellWidth, 24.5 * this.grid.cellHeight);

        ctx.beginPath()
        while (currentCell != null)
        {
            ctx.lineTo((currentCell.xPos + 0.5) * this.grid.cellWidth, (currentCell.yPos + 0.5) * this.grid.cellHeight);
            currentCell = currentCell.cameFrom;
        }
        ctx.stroke();


    }


    startAStar()
    {
        if (!this.openSet.isEmpty() && !this.complete)
        {
            this.doNextIteration()
            
            setTimeout(() => {this.startAStar();}, this.speed );
        }
        else
        {
            console.log('Algorithm Finished');

            if (this.found)
            {
                console.log("Shortest path found");


                let currentCell = this.endCell;

                

                

                this.grid.drawGrid();

            }
            else
            {
                console.log("No path");
            }
            
        }
    }








    heuristicFunction(currentCell)
    {
        let dx = Math.abs(currentCell.xPos - this.endCell.xPos);
        let dy = Math.abs(currentCell.yPos - this.endCell.yPos);

        return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));


    }
}