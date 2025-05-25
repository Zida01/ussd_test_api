// const  Post= require('./models/Post')
// const User = require('./models/User')
// const sequelize = require("./config/database")

// sequelize.sync().then(()=>{
//     console.log("all TABle are loaded")
// }).catch(err=>{
//     console.log(err)
// })

const e = require("express");
const express = require("express");
const { escape } = require("sequelize/lib/sql-string");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = [
  {
    id: 1,
    name: "Alice",
    age: 25,
    account: 1001,
    email: "alice@example.com",
  },
  {
    id: 2,
    name: "Bob",
    age: 30,
    account: 2002,
    email: "bob@example.com",
  },
];

// function findCustomerAccount(accountNumber) {
//   console.log(accountNumber);

//   const user = db.find(user => user.account === accountNumber);

//   if (user) {
//     console.log(user.name);
//   } else {
//     console.log("User does not exist in the inline DB");
//   }
// }

function findCustomerAccount(accountNumber) {
  const user = db.find(
    (user) => String(user.account) === String(accountNumber)
  );

  if (user) {
    return user.name;
  } else {
    return "User Does not exit";
  }
}
app.get("/", (req, res) => {
  res.json("welcome");
});

app.post("/ussd", (req, res) => {
  // Read the variables sent via POST from our API
  const { sessionId, serviceCode, phoneNumber, text, pin } = req.body;

  let response = "";
  let balance = "30,000";
  const correctPin = "1234"; // Hardcoded PIN for demo

  const textArray = text.split("*");

  if (text == "") {
    // This is the first request. Note how we start the response with CON
    response = `CON What would you like to check
        1. My account
        2. My phone number
        3. Account`;
  } else if (text == "1") {
    // Business logic for first level response
    response = `CON Choose account information you want to view
        1. Account number`;
  } else if (text == "2") {
    // Business logic for first level response
    // This is a terminal request. Note how we start the response with END
    response = `END Your phone number is ${phoneNumber}`;
  } else if (text == "1*1") {
    // This is a second level response where the user selected 1 in the first instance
    const accountNumber = "ACC100101";
    // This is a terminal request. Note how we start the response with END
    response = `END Your account number is ${accountNumber}`;
  } else if (text == "3") {
    response = ` CON  Welcome to Moni Bank 
        1. Tranfer Mooney
        2.  Check Balance
        3   Buy Airtikme`;
  } else if (text == "3*1") {
    response = `CON Enter Account Number `;
  } else if (
    textArray[0] === "3" &&
    textArray[1] === "1" &&
    textArray.length === 3
  ) {
    let data = textArray[2];
    console.log(textArray);

    if (data) {
      const getUserAccount = findCustomerAccount(data);
      console.log(getUserAccount);
      if (getUserAccount === "User Does not exit") {
        response = `END User with ${data} does not exit`;
      } else {
        response = `CON  confirm Tranfer to Account with  name ${getUserAccount} and account number ${data}
        1. Accept
        2. Reject`;
        if (data== 2) {
          response = `  END  Transaction cancelled`;
        } 
        if (data == 1) {
          response = `  END  Transacton Approved`;
        }
        if  (data !==1  && data  !==  2){
             response = `CON  Invalid details  confirm Tranfer to Account with  name ${getUserAccount} and account number ${data}
        1. Accept
        2. Reject`;
        }
      }
    } else {
      response = `END Wrong . Try again.`;
    }
  } else if (text == "3*2") {
    response = `CON Enter Pin to check Balance`;
  } else if (
    textArray[0] === "3" &&
    textArray[1] === "2" &&
    textArray.length === 3
  ) {
    if (textArray[2] === correctPin) {
      response = `END YOUR ACCOUNT BALANCE IS KES ${balance}`;
    } else {
      response = `END Wrong PIN. Try again.`;
    }
  } else {
    `END INVALID INPUT `;
  }

  // Send the response back to the API
  res.set("Content-Type: text/plain");
  res.send(response);
});

app.listen(3000, (req, res) => {
  console.log(`http://127.0.0.1:3000`);
});
