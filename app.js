const express = require("express");
const loanCalculate = require("./utils/loan");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Just in case

app.post("/ussd", (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text, pin } = req.body;

  //   let response = "";

  let response = "";
  const textArray = text ? text.split("*") : [];

  if (text === "") {
    response = `CON  welcome to MONi  bank  
    1.   Loan
    2.   repayment`;
  } else if (text == "1") {
    response = ` CON   kindly enter the amount loan Amount `;
  } else if (textArray[0] === "1" && textArray.length === 2) {
    if (/^\d+$/.test(textArray[1])) {
      console.log("step 1");
      response = `CON Kindly enter your Bank Account number`;
    } else {
      response = `END Invalid Response`;
    }
  } else if (textArray[0] === "1" && textArray.length === 3) {
    if (/^\d{11}$/.test(textArray[2])) {
      console.log("step 2");
      response = `CON have you read our term and condition   
      1.  Yes
      2.  No `;
    } else {
      response = `END  Invalid Response`;
    }
  } else if (textArray[0] === "1" && textArray.length === 4) {
    if (textArray[3] === "1") {
      response = `CON  Enter Your Bvn Number`;
    } else {
      response = `END  Invalid Response`;
    }
  } else if (textArray[0] === "1" && textArray.length === 5) {
    if (textArray[4] && /^\d{10}$/.test(textArray[4])) {
      response = `Select a loan repayment   Plan
    1.  3month @ 1% daily
    2.  6month @ 0.8% daily`;
    } else {
      response = `CON ENTER A  VALID BVN NUMBER `;
    }
  } else if (textArray[0] === "1" && textArray.length === 6) {
    if (textArray[5] === "1") {
      let data = loanCalculate(textArray[1], textArray[5]);
      console.log("eemes");
      response = `CON  ${data}  
      1.   Accept
      2.   Reject`;
    } else {
      response = `CON Invalid Loan Repayment `;
    }
  }
  else  if(textArray[0]=== "1"  &&  textArray.length === 7){
    if(textArray[6]=== "1"){
        response = `CON  Dear Customer Kindly Note   Account  will
    credited  soon`
    }
    else {
      response = `CON Thank you for banking with  us  `;
    }
  }

  res.set("Content-Type: text/plain");
  res.send(response);
});

app.listen(4000, (req, res) => {
  console.log(" App  is running ");
});

// const express = require('express');
// const app = express();

// // Middleware to parse URL-encoded form data (as USSD providers usually send)
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json()); // Just in case

// app.post('/ussd', (req, res) => {
//   const { sessionId, serviceCode, phoneNumber, text } = req.body;

//   let response = "";
//   const textArray = text ? text.split("*") : [];

//   // MAIN MENU
//   if (text === "") {
//     response = `CON Welcome to MONi Bank
// 1. Loan
// 2. Repayment`;

//   // OPTION 1: Loan - Step 1 (Amount)
//   } else if (text === "1") {
//     response = `CON Kindly enter the loan amount`;

//   // OPTION 1: Loan - Step 2 (Validate Amount and Ask for Bank Account)
//   } else if (textArray[0] === "1" && textArray.length === 2) {
//     if (/^\d+$/.test(textArray[1])) {
//       response = `CON Kindly enter your Bank Account number`;
//     } else {
//       response = `CON Invalid amount. Please enter a valid number`;
//     }

//   // OPTION 1: Loan - Step 3 (BVN)
//   } else if (textArray[0] === "1" && textArray.length === 3) {
//     if (/^\d{11}$/.test(textArray[2])) {
//       response = `CON Have you read our Terms and Conditions?
// 1. Yes
// 2. No`;
//     } else {
//       response = `CON Invalid BVN. Kindly enter a valid 11-digit BVN number`;
//     }

//   // OPTION 1: Loan - Step 4 (Confirm T&C)
//   } else if (textArray[0] === "1" && textArray.length === 4) {
//     if (textArray[3] === "1") {
//       response = `END Loan processing started. Thank you!`;
//     } else {
//       response = `END You must accept the Terms and Conditions to proceed.`;
//     }

//   // DEFAULT fallback
//   } else {
//     response = `END Invalid input. Please try again.`;
//   }

//   res.set("Content-Type", "text/plain");
//   res.send(response);
// });

// app.listen(4000, () => {
//   console.log("App is running on port 4000");
// });
