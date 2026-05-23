let orderNum = 0;
function elementFromHTML(htmlString) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = htmlString.trim();
    return wrapper.firstElementChild;
}

const form = document.getElementById("orderForm");

form.addEventListener("submit", e => {
    e.preventDefault();
    //required 
    const size = e.target.size.value;
    const bread = e.target.bread.value;
    const main = e.target.main.value;    
    const cheese = e.target.cheese.value;
    const customerName = e.target.customerName.value;

    //optional...if no selection, they will have falsy value (ie. empty array or empty string)
    const drink = e.target.drink.value;
    const toppingOptions = e.target.toppings;
    const sideOptions = e.target.sides;
    let toppings = [];
    let sides = [];
    for (const topping of toppingOptions) {
        if (topping.checked) {
            toppings.push(topping.value);
        }
    }
    for (const side of sideOptions) {
        if (side.checked) {
            sides.push(side.value);
        }
    }

    const newOrder = new Order(size, bread, main, cheese, drink, toppings, sides, ++orderNum, customerName);
    document.getElementById("orderPlacementHeader").innerHTML = `Place Order #${orderNum + 1}`;
    const orderCard = newOrder.getHTML();
    let newCards = document.getElementById("new");
    newCards.appendChild(orderCard);
    form.reset();
});
