class Sides {
    constructor(sides) {
        this.sides = sides;
    }

    getHTML = () => {
        if (!this.sides.length) {
            return null;
        } else {
            const sidesDIVs = elementFromHTML(`
                <div>
                    <div>
                        <strong>Sides:</strong>
                    </div>
                </div>
            `);
            for (const side of this.sides) {
                sidesDIVs.appendChild(elementFromHTML(`
                    <div>
                        --${side}
                    </div>
                `));
            }
            return sidesDIVs;
        }
    }
}
