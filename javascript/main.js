


//Always want the grid to be 50 x 25










function windowResize()
{
    grid.clearGrid();
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight * 0.9;

    cellWidth = window.innerWidth / cellColumns;
    cellHeight = (window.innerHeight * 0.9) / cellRows;

    if ((Math.abs(cellWidth - cellHeight)/cellHeight) * 100 > 30)
    {
        cellWidth = cellHeight = Math.min(window.innerWidth / cellColumns, (window.innerHeight * 0.9) / cellRows);
        
        console.log(cellHeight);
        console.log(cellWidth);
    }

    grid.cellHeight = cellHeight;
    grid.cellWidth = cellWidth;

    grid.drawGrid();
}



function keyDown(event)
{
    let keyCode = event.keyCode;
    //38 = up
    //40 = down


    if (keyCode == 38)
    {
        if (backtrack.speed > 0)
        {
            backtrack.speed -= 10;
        }
        
    }
    else if (keyCode == 40)
    {
        if (backtrack.speed < 1000)
        {
            backtrack.speed += 10;
        }
        
    }


}


window.addEventListener("keydown", keyDown );




let canvas = document.getElementById("main-canvas");


let speed = 75;
let cellColumns = 50;
let cellRows = 25;

let cellWidth = window.innerWidth / cellColumns;
let cellHeight = (window.innerHeight * 0.9) / cellRows;


let grid = new Grid(document.getElementById("main-canvas"),cellColumns,cellRows,cellWidth, cellHeight, "rgba(51,51,51,0.3)", "rgba(150,150,150,0.5)");
let backtrack = new Backtracker(grid, 0,0,"rgba(50,100,192,0.7)",speed);






window.addEventListener('resize', windowResize);

windowResize()


















