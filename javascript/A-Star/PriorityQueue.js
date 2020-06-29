class PriorityQueue
{
    constructor() 
    {
        this.items = [];
    }

    sortList()
    {
        this.items.sort(function(a,b)
        {
            return a.fScore - b.fScore;
        });
    }



    contains(item)
    {
        let containsItem = false;
        this.items.forEach(function (currentItem)
        {
 
            if (item.id == currentItem.id)
            {
                containsItem =  true;
            }
        });

        return containsItem;
    }

    
    push (item)
    {
        this.items.push(item);
        this.sortList();
    }

    //Allows item to be removed from the priority queue
    pop() 
    {
        let returnItem = this.items[0];

        this.items.splice(0,1);

        this.sortList();

        return returnItem;
    }

    //Returns true is queue is empty
    isEmpty()
    {
        return this.items.length === 0;
    }

    //returns size of queue
    size()
    {
        return this.items.length;
    }
}