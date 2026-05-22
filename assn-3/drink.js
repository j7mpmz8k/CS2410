class Drink {
    constructor(drink) {
        this.drink = drink;
    }

    getHTML = () => {
        if (this.drink == "none") {
            return null
        } else {
            const drinkDiv = this.elementFromHTML(`
                <div>
                    <div>
                        <strong>Drink:</strong>
                    </div>
                    <div>
                        --${this.drink}
                    </div>
                </div>
            `);
            return drinkDiv;
        }
    }
    elementFromHTML = (htmlString) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = htmlString;
        return wrapper.firstElementChild;
    }
}
