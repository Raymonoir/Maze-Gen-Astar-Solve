


class Cell
{
    constructor(size, xPos, yPos, colour) 
    {
        this.size = size;    
        this.xPos = xPos;
        this.yPos = yPos;         
        this.walls = [true,true,true,true];  //TOP RIGHT BOTTOM LEFT
        this.colour = colour;
    }

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