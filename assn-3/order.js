class Order {
    constructor(size, bread, main, cheese, drink, toppings, sides) {
        this.sandwhichObj = new Sandwich(size, bread, main, cheese, toppings);
        this.drinkObj = new Drink(drink);
        this.sidesObj = new Sides(sides);
    }

    getHTML = () => {
        let orderCard = document.createElement("div");
        orderCard.className = "cards";
        orderCard.appendChild(this.sandwhichObj.getHTML());

        const drinkHTML = this.drinkObj.getHTML();
        if (drinkHTML) {
            orderCard.appendChild(drinkHTML);
        }

        const sidesHTML = this.sidesObj.getHTML();
        if (sidesHTML) {
            orderCard.appendChild(sidesHTML);
        }

        return orderCard;
    }
}
