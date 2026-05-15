//default values
const PRINCIPLE = 300000;
const RATE = 5.5;
const YEARS = 30;

const priciple = document.getElementById("priciple");
const rate = document.getElementById("rate");
const years = document.getElementById("years");
const output = document.getElementById("output");

priciple.value = PRINCIPLE;
rate.value = RATE;
years.value = YEARS;
output.innerHTML = calculatePayments();

function calculatePayments() {
    //get total loan amount (P)
    if (!priciple.value) {
        priciple.value = PRINCIPLE;
    }
    const P = parseFloat(priciple.value);
    if (Number.isNaN(P)) {
        return "Loan amount entered is not a number!"
    }
    if (P <= 0) {
        return "Loan amount must be greater than zero!"
    }
    //get monthy rate (r)
    if (!rate.value) {
        rate.value = RATE;
    }
    const r = parseFloat(rate.value) / 1200;//converts annual % to monthy rate as decimal
    if (Number.isNaN(r)) {
        return "Annunl Rate entered is not a number!"
    }
    if (r < 0) {
        return "Annual Rate cannot be negative!"
    }
    // get number of months (n)
    if (!years.value) {
        years.value = YEARS;
    }
    const n = parseFloat(years.value) * 12;
    if (n <= 0) {
        return "Number of Years must be greater than zero!"
    }
    if (n < 1 && n > 0) {
        n = 1;
    }
    if (Number.isNaN(n)) {
        return "Number of Years entered is not a number!"
    }

    let M;
    if (Math.abs(r) < 1e-8) {
        M = P / n;
    } else {
        M = P * ((r * ((1 + r) ** n)) / (((1 + r) ** n) - 1));
    }
    M = Math.round(M * 100) / 100;// rounds to nearest hundredth
    if (Number.isNaN(M)) {
        return false;
    }
    if (M > P) {
        M = P;
    }
    return `Monthly Payment: $${M}`;
}

priciple.addEventListener("blur", () => {
    let msg = calculatePayments();
    if (!msg) {
        msg = "Loan amount entered is too large to calculate!"
    }
    output.innerHTML = msg;
});
rate.addEventListener("blur", () => {
    let msg = calculatePayments();
    if (!msg) {
        msg = "Annunl Rate entered is too large to calculate!"
    }
    output.innerHTML = msg;
});
years.addEventListener("blur", () => {
    let msg = calculatePayments();
    if (!msg) {
        msg = "Number of Years entered is too large to calculate!"
    }
    output.innerHTML = msg;
});
