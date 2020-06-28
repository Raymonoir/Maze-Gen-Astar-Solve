

//Represents a single cell within the grid
class Cell
{
    constructor(size, xPos, yPos, colour, id) 
    {
        //This id will be used to identify each cell, used for A* maps 
        this.id = id;

        this.visited = false;

        this.size = size;    
        this.xPos = xPos;
        this.yPos = yPos;         
        this.walls = [true,true,true,true];  //TOP RIGHT BOTTOM LEFT
        this.colour = colour;
    }

    //Removes a wall at the provided position
    removeWall(wallPos)
    {
        this.walls[wallPos] = false;
    }

    getWall(wallPos)
    {
        return this.walls[wallPos];
    }

    setColour(newColour)
    {
        this.colour = newColour;
    }


}