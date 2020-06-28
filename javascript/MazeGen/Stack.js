class Stack
{
    constructor() 
    {
        this.pointer = -1;
        this.items = [];
    }


    push (item)
    {
        this.items.push(item);
        this.pointer++;
    }

    pop() 
    {
        returnItem = this.items[this.pointer];
        this.items[this.pointer] = null;
        this.pointer += -1;
        return returnItem;
    }

    isEmpty()
    {
        return this.pointer === -1;
    }


    size()
    {
        return this.pointer + 1;
    }


}