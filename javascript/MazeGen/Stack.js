


//Stack class used within the backtracking algorithm
//Used to store cells
class Stack
{
    constructor() 
    {
        this.pointer = -1;
        this.items = [];
    }


    //Allows an item to be pushed onto stack
    push (item)
    {
        this.items.push(item);
        this.pointer++;
    }

    //Allows item to be removed from the stack
    pop() 
    {
        let returnItem = this.items[this.pointer];

        this.items.splice(this.pointer,1);

        this.pointer -= 1;

        return returnItem;
    }

    //Returns true is stack is empty
    isEmpty()
    {
        return this.pointer === -1;
    }

    //returns size of stack
    size()
    {
        return this.pointer + 1;
    }


}