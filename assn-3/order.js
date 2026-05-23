class Order {
    constructor(size, bread, main, cheese, drink, toppings, sides, orderNum, customerName) {
        this._sandwhichObj = new Sandwich(size, bread, main, cheese, toppings);
        this._drinkObj = new Drink(drink);
        this._sidesObj = new Sides(sides);
        this._completed = false;
        this._now = Date.now();
        // Save the order number to the instance
        this._orderNum = orderNum;
        this._customerName = customerName;
    }

    getHTML = () => {
        let orderCard = document.createElement("div");
        orderCard.className = "cards";

        let customerDiv = document.createElement("div");
        customerDiv.innerHTML = `<strong>Customer:</strong> ${this._customerName}`;
        orderCard.appendChild(customerDiv);

        orderCard.appendChild(this._sandwhichObj.getHTML());

        const drinkHTML = this._drinkObj.getHTML();
        if (drinkHTML) {
            orderCard.appendChild(drinkHTML);
        }

        const sidesHTML = this._sidesObj.getHTML();
        if (sidesHTML) {
            orderCard.appendChild(sidesHTML);
        }

        setTimeout(() => {
            const waitingCol = document.getElementById("waiting");
            if (!this._completed) {
                waitingCol.appendChild(orderCard);
                
                setTimeout(() => {
                    const hurryCol = document.getElementById("hurry");
                    if (!this._completed) {
                        hurryCol.appendChild(orderCard);
                    }
                }, 30000); // 30 seconds
            }
        }, 60000); // 60 seconds

        orderCard.addEventListener("dblclick", () => {
            this._completed = true;
            this._completedTime = Date.now();

            const completedCol = document.getElementById("completed");

            const itemsOrdered = [`${this._sandwhichObj.size}-Sandwich`];
            // adds the drink if ordered to the summary
            if (this._drinkObj.drink !== "none") {
                itemsOrdered.push(this._drinkObj.drink);
            }
            // any sides ordered to summery
            for (const side of this._sidesObj.sides) {
                itemsOrdered.push(side);
            }

            //no commas or "and" if only one item ordered
            let summary = "";
            summary = itemsOrdered[0];
            //adds "and" between items if only two
            if (itemsOrdered.length === 2) {
                summary += " and " + itemsOrdered[1];
            //adds commas & "and" if more than 2 items
            } else if (itemsOrdered.length > 2) {
                for (let i = 1; i < itemsOrdered.length - 1; i++) {
                    summary += ", " + itemsOrdered[i];
                }
                summary += " and " + itemsOrdered[itemsOrdered.length - 1];
            }

            const completedCard = elementFromHTML(`
                <div>
                    Order ${this._orderNum} (${this._customerName})  |  ${this.getTime()}  |  ${summary}
                </div>
            `);
            completedCard.className = "completedCard";

            //replaces pending card with summerized completed card 
            orderCard.remove();
            completedCol.prepend(completedCard);
        });
        return orderCard;
    }

    getTime = () => {
        const totalMilSec = Date.now() - this._now;
        const totalSec = Math.trunc(totalMilSec / 1000);
        const mins = Math.trunc(totalSec / 60);
        const secs = totalSec % 60;
        
        if (mins > 0) {
            return `${mins}min ${secs}sec`;
        }
        return `${secs}sec`;
    }
}
