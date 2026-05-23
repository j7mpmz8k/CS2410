class Drink {
    constructor(drink) {
        this.drink = drink;
    }

    getHTML = () => {
        if (this.drink === "none") {
            return null;
        } else {
            const drinkDiv = elementFromHTML(`
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
}
