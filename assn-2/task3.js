//default values
const PRINCIPAL = 300000;
const RATE = 5.5;
const YEARS = 30;

const principal = document.getElementById("principal");
const rate = document.getElementById("rate");
const years = document.getElementById("years");
const output = document.getElementById("output");

principal.value = PRINCIPAL;
rate.value = RATE;
years.value = YEARS;
output.innerHTML = calculatePayments();

function calculatePayments() {
    //get total loan amount (P)
    if (!principal.value) {
        principal.value = PRINCIPAL;
    }
    const P = parseFloat(principal.value);
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
        return "Annual Rate entered is not a number!"
    }
    // get number of months (n)
    if (!years.value) {
        years.value = YEARS;
    }
    let n = parseFloat(years.value) * 12;
    if (Number.isNaN(n)) {
        return "Number of Years entered is not a number!"
    }
    if (n <= 0) {
        return "Number of Years must be greater than zero!"
    }

    if (n < 1 && n > 0) {
        n = 1;//most not be less than a month or else it incorrectly inflates the monthly payments
    }
    //calculates the monthly payments (M)
    let M;
    if (Math.abs(r) < 1e-8) {
        M = P / n;//evenly devides if there is no interest rate
    } else {
        M = P * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    }
    M = Math.round(M * 100) / 100;// rounds to nearest hundredth
    if (Number.isNaN(M)) {
        return false;//needed in cases of too large entered numbers
    }
    return `Monthly Payment: $${M}`;
}

principal.addEventListener("blur", () => {
    let msg = calculatePayments();
    if (!msg) {
        msg = "Loan amount entered is too large to calculate!"
    }
    output.innerHTML = msg;
});
rate.addEventListener("blur", () => {
    let msg = calculatePayments();
    if (!msg) {
        msg = "Annual Rate entered is too large to calculate!"
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
