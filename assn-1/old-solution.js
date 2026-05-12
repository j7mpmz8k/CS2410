/*
  filter: returns a subset of the input data that contains only the items for which the predicate returns true
  @data: an array of any arbitrary data
  @predicate: a function that takes a single datapoint as an argument. Returns either true or false.
  @return: a new array that contains all of the values in data
           for which the predicate function returns true
*/
function filter(data, predicate) {
    const newArray = [];
    for (let i of data) {
        if (predicate(i)) {
            newArray.push(i);
        }
    }
    return newArray;
}

/*
  findLast: finds the last value in an array that meets the condition specified in the predicate
  @data: an array of any arbitrary data
  @predicate: a function that takes a single datapoint as an argument. Returns either true or false.
  @return: a single data point from data
*/
function findLast(data, predicate) {
    for (let i = data.length - 1; i >= 0; i--)
        if (predicate(data[i])) {
            return data[i];
        }
    return null;
}

/*
  map: creates a new array based on the input array where the value at each position in the array is the result of the callback function.
  @data: an array of any arbitrary data
  @callback: a function that takes a single datapoint as an argument. Returns a new value based on the input value
  @return: a new array of the callback function results
*/
function map(data, callback) {
    const newArray = [];
    for (let i of data) {
        newArray.push(callback(i));
    }
    return newArray;
}

/*
  pairIf: creates a new array based on the input arrays where the value at each position is an 
          array that contains the 2 values that pair according to the predicate function.
  @data1: an array of any arbitrary data
  @data2: an array of any arbitrary data
  @predicate: a function that takes a single datapoint from each input array as an argument. Returns true or false
  @return: the newly created array of pairs
*/
function pairIf(data1, data2, predicate) {
    const newArray = [];
    for (let i of data1) {
        for (let j of data2) {
            if (predicate(i, j)) {
                newArray.push([i, j]);    
            }
        }
    }
    return newArray;
}

/*
  reduce: creates an accumulated result based on the reducer function. The value returned is returned
          is the return value of the reducer function for the final iteration.
  @data: an array of any arbitrary data
  @reducer: a function that takes a single datapoint from each input array as an
            argument and the result of the reducer function from the previous iteration.
            Returns the result to be passed to the next iteration
  @initialValue: the starting point for the reduction.
  @return: the value from the final call to the reducer function.
*/
function reduce(data, reducer, initialValue) {
    let accumulatedResult = initialValue;
    for (let i of data) {
        accumulatedResult = reducer(i, accumulatedResult);
    }
    return accumulatedResult;
}

//predicate for invalid transactions filter
function isInvalid(transaction) {
    if (!transaction.amount) {
        return true;
    } 
    switch (transaction.product) {
        case "FIG_JAM":
        case "FIG_JELLY":
        case "SPICY_FIG_JAM":
        case "ORANGE_FIG_JELLY":
            return false;
            break;
        default:
            return true;
    }
}

//predicate for duplicate customers
function isDuplicate(customerA, customerB) {return customerA.emailAddress === customerB.emailAddress && customerA.id !== customerB.id;}

//predicate for transactions over $200
function isOver200(transaction) {return transaction.amount > 200;}

//reducer for small, medium, large transactions
function txnReducerFnGenerator(predicate) {
    return (transaction, accumulatedResult) => {
        if (isInvalid(transaction)) {
            return accumulatedResult;
        }
        if (predicate(transaction.amount)) {
            return ++accumulatedResult;
        } else {
            return accumulatedResult;
        }
    }
}
const smallTxnReducer = txnReducerFnGenerator(amount => amount < 25);
const mediumTxnReducer = txnReducerFnGenerator(amount => amount >= 25 && amount < 75);
const largeTxnReducer = txnReducerFnGenerator(amount => amount >= 75);

//logic to get all the customers who had transactions over $200
const transactionsOver200 = filter(transactions, isOver200);
const pairedData = pairIf(customers, transactionsOver200, (customer, transaction) => {return customer.id === transaction.customerId;});
function uniqueCustomerReducer(pairedTransaction, uniqueCustomers) {
    if (uniqueCustomers.includes(pairedTransaction[0]) || isInvalid(pairedTransaction[1])) {
        return uniqueCustomers;
    } else {
        uniqueCustomers.push(pairedTransaction[0]);
        return uniqueCustomers;
    }
}
const uniqueCustomers = reduce(pairedData, uniqueCustomerReducer, []);
const customerNames = map(uniqueCustomers, customer => customer.firstName + " " + customer.lastName);

console.log(`Number of invalid transactions: ${filter(transactions, isInvalid).length}`);
console.log(`Number of duplicate customers: ${pairIf(customers, customers, isDuplicate).length / 2}`);
console.log(`Most recent transaction over $200: $${findLast(transactions, isOver200).amount}`);
console.log(`Number of small transactions: ${reduce(transactions, smallTxnReducer, 0)}`);
console.log(`Number of medium transactions: ${reduce(transactions, mediumTxnReducer, 0)}`);
console.log(`Number of large transactions: ${reduce(transactions, largeTxnReducer, 0)}`);
console.log("Customers with transactions over $200:", uniqueCustomers);
console.log("Names of customers with transactions over $200:", customerNames);
