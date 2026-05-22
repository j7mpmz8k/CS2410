class Sandwich {
    constructor(size, bread, main, cheese, toppings) {
        this.size = size;
        this.bread = bread;
        this.main = main;
        this.cheese = cheese;
        this.toppings = toppings;
    }

    getHTML = () => {
        let sandwhichDIVs = this._elementFromHTML(`
            <div>
                <div>
                    <strong>${this.size} Sandwich:</strong>
                </div>
                <div>
                    --${this.bread} bread
                </div>
                <div>
                    --${this.main}
                </div>
                <div>
                    --${this.cheese}
                </div>
            </div>
        `);
        for (const topping of this.toppings) {
            sandwhichDIVs.appendChild(this._elementFromHTML(`
                <div>
                    --${topping}
                </div>
            `));
        }
        return sandwhichDIVs;
    }
    
    _elementFromHTML = (htmlString) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = htmlString;
        return wrapper.firstElementChild;
    }
}
