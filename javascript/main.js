


//Always want the grid to be 50 x 25







//Change speed function required


function windowResize()
{
    grid.clearGrid();
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    cellWidth = window.innerWidth / cellColumns;
    cellHeight = window.innerHeight / cellRows;

    if ((Math.abs(cellWidth - cellHeight)/cellHeight) * 100 > 10)
    {
        cellWidth = cellHeight = Math.min(window.innerWidth / cellColumns, window.innerHeight / cellRows);
    }

    grid.cellHeight = cellHeight;
    grid.cellWidth = cellWidth;

    if (window.innerWidth > cellWidth * cellColumns)
    {
        canvasContainer.style.marginLeft =  (window.innerWidth/2) - ((cellWidth * cellColumns) /2) + "px";
    }
    else 
    {
        canvasContainer.style.marginLeft =  "0px";
    }


    


    grid.drawGrid();
}



function keyDown(event)
{
    let keyCode = event.keyCode;
    //38 = up
    //40 = down

    let spaceCount = 0;


    console.log(keyCode)

    if (keyCode == 38)
    {
        if (backtrack.speed > 0 && aStar.speed > 0)
        {
            backtrack.speed -= 10;
            aStar.speed -=10;
        }
        
    }
    else if (keyCode == 40)
    {
        if (backtrack.speed < 1000 && aStar.speed < 1000)
        {
            backtrack.speed += 10;
            aStar.speed +=10;
        }
    }
    
}


window.addEventListener("keydown", keyDown );




let canvas = document.getElementById("main-canvas");
let canvasContainer = document.getElementById("canvas-container");


let speed = 75;
let cellColumns = 30;
let cellRows = 15;

let cellWidth = window.innerWidth / cellColumns;
let cellHeight = (window.innerHeight) / cellRows;


let grid = new Grid(document.getElementById("main-canvas"),cellColumns,cellRows,cellWidth, cellHeight, "rgba(51,51,51,0.3)", "rgba(150,150,150,0.5)");
let aStar = new AStar(grid, grid.getCell(0,0), grid.getCell(29, 14),speed);
let backtrack = new Backtracker(grid, 0,0,"rgba(50,100,192,0.7)",aStar,speed);






window.addEventListener('resize', windowResize);

windowResize()


















