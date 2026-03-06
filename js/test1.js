const start = document.getElementById("btn");

let bankAcc = null;  //variable to save account


// create an account function
function creatAcc() {
    let name = prompt("Enter your full name")

    if (name === null) {
        window.location.reload();
        return;
    }

    let natID = prompt("Enter your National ID Number")
    if (natID === null) {
        window.location.reload();
        return;
    }
    let age = parseInt(prompt("Enter your age"));
    if (age === null) {
        window.location.reload();
        return;
    }

    if (isNaN(age) || age < 18) {
        alert("sorry you cannot create an account")
        return;
    }
    //entering account type and make sure to be one of the options to calculate the annual interest correctly
    let accType;
    let validTypes = ["savings", "current", "business"];
    while (true) {
        accType = prompt("Enter Account Type(savings / current / business)").toLowerCase();
        if (accType === null) {
            window.location.reload();
            return false;
        }
        if (validTypes.indexOf(accType) !== -1) {
            break;
        } else {
            alert("Invalid type. please enter (saving, current, business)")
        }
    }

    //initial deposit amount
    let deposit = parseFloat(prompt("Enter your deposit amount"));
    if (isNaN(deposit) || deposit < 0) deposit = 0; // if entered value is not true

    //create account object
    bankAcc = {
        accountNumber: Math.floor(100000 + Math.random() * 900000),
        fullname: name,
        natID: natID,
        age: age,
        balance: deposit,
        accType: accType,
        transactionHistory: [],
        status: "active"
    };

    // register first deposit
    if (deposit > 0) {
        bankAcc.transactionHistory.push({
            type: "deposit ",
            amount: deposit,
            date: new Date()
        });
    }
    alert("Account created successfully. Account Number: " + bankAcc.accountNumber)
}

//main function
const menu = function () {
    let stay = true;

    while (stay) {
        if (bankAcc.status === "closed") {
            alert("The account is closed can not do any transaction process");
            stay = false;
            break;
        }

        //show operations list
        let list = prompt("chose the process\n" + "1. Deposit\n" + "2. Withdraw\n" + "3. View Balance\n" + "4. Transaction History\n" + "5. Annual Interest\n" + "6. Close Account\n" + "7. Log Out");

        // to exit
        if (list === null) list = "7";

        //handel the process chosen 
        if (list === '1') { doDeposit(); }
        else if (list === '2') { doWithdraw(); }
        else if (list === '3') { alert("Current Balance: " + bankAcc.balance + " OMR"); }
        else if (list === '4') { seeHistory(); }
        else if (list === '5') { calculatInterest(); }
        else if (list === '6') { closeAcc(); }
        else if (list === '7') { stay = false; }
        else { alert("Invalid choice"); }
    }
};

//deposit function
function doDeposit() {
    let amount = parseFloat(prompt("Enter deposit amount"));
    if (isNaN(amount) || amount <= 0) {
        alert("Amount Invalid");
        return;
    }
    bankAcc.balance += amount;
    bankAcc.transactionHistory.push({ type: " deposit ", amount: amount, date: new Date() });
    alert("Deposit successful .. New Balance: " + bankAcc.balance + " OMR");
};
//withdraw function
const doWithdraw = function () {
    let amount = parseFloat(prompt("Enter Withdraw amount"));
    if (isNaN(amount) || amount <= 0) {
        alert("Amount Invalid");
        return;
    }
    if (amount > bankAcc.balance) {
        alert("Error amount more than valid balance");
        return
    }
    else {
        bankAcc.balance -= amount;
        bankAcc.transactionHistory.push({ type: " withdraw ", amount: amount, date: new Date() });
        alert("Withdraw successful .. New Balance: " + bankAcc.balance + " OMR");
    }
};
// calculating interest function
function calculatInterest() {
    let rate = 0;
    if (bankAcc.accType === 'savings') rate = 0.10;
    else if (bankAcc.accType === 'current') rate = 0.05;
    else if (bankAcc.accType === 'business') rate = 0.15;

    let interest = bankAcc.balance * rate;
    alert("Annul Interest:" + interest.toFixed(2) + " OMR");
};

// view history function
function seeHistory() {
    if (bankAcc.transactionHistory.length === 0) {
        alert("Their is No transactions done yet.");
        return;
    }
    let OutputList = "Transaction History \n";
    for (let i = 0; i < bankAcc.transactionHistory.length; i++) {
        let j = bankAcc.transactionHistory[i];
        OutputList += j.type.toUpperCase() + j.amount + " OMR" + " | Date: " + j.date.toLocaleDateString() + "\n";
    }
    alert(OutputList);
};

// close account function
function closeAcc() {
    if (confirm("Are you sure to close the account")) {
        bankAcc.status = "closed";
        alert("Account closed")
    }
}

//starting main process function
function startSystem() {
    creatAcc();

    if (bankAcc) {
        setTimeout(function () {
            console.log("account loaded.>> starting operation .......");
            menu();
            console.log(" Account Summary");
            console.log("Account Number: ", bankAcc.accountNumber);
            console.log("Full Name: ", bankAcc.fullname);
            console.log("National ID: ", bankAcc.natID);
            console.log("Age: ", bankAcc.age);
            console.log("Account Type: ", bankAcc.accType);
            console.log("Account balance: ", bankAcc.balance);
            console.log("Transaction History: ", bankAcc.transactionHistory);

        }, 400);
    }
};

//to start the process while clicking on the button
start.addEventListener("click", startSystem);









