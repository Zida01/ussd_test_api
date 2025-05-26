// const  loanCalculate=(amount,option)=>{

// }

const loanCalculate = (amount, option) => {
  console.log(amount, option);
  amount = parseFloat(amount); // Convert amount to a number
  let dailyrate, days, month;
  if (option == "1") {
    dailyrate = 0.01;
    days = 60;
    month = 2;
    amount = amount;
  } else if (option == "2") {
    dailyrate = 0.09;
    days = 90;
    month = 3;
    amount = amount;
  }
  const totalInterest = amount * dailyrate * days;
  const totalRepayment = amount + totalInterest;
  const monthlyRepayment = totalRepayment / month;

  return `Loan Breakdown:
Loan Amount: ₦${amount}
Duration: ${month} months
Interest: ₦${totalInterest.toFixed(2)}
Total Repayment: ₦${totalRepayment.toFixed(2)}
Monthly Repayment: ₦${monthlyRepayment.toFixed(2)}`;
};


const loanfees=()=>{

    return `Loan fees breakdown
    Application Fess:1%
    processing Fess: 1%`

}
module.exports = {loanCalculate,  loanfees};
