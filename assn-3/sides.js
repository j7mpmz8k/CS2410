class Sides {
    constructor(sides) {
        this.sides = sides;
    }

    getHTML = () => {
        if (!this.sides.length) {
            return null;
        } else {
            let sidesDIVs = this._elementFromHTML(`
                <div>
                    <div>
                        <strong>Sides:</strong>
                    </div>
                </div>
            `);
            for (const side of this.sides) {
                 sidesDIVs.appendChild(this._elementFromHTML(`
                    <div>
                        --${side}
                    </div>
                `));
            }
            return sidesDIVs;
        }
    }
    _elementFromHTML = (htmlString) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = htmlString;
        return wrapper.firstElementChild;
    }
}
