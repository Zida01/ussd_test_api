const db = [
  {
    id: 1,
    name: "Alice",
    age: 25,
    account: 1001,
    email: "alice@example.com"
  },
  {
    id: 2,
    name: "Bob",
    age: 30,
    account: 2002,
    email: "bob@example.com"
  }
];

function findCustomerAccount(accountNumber) {
  console.log(accountNumber);

  const user = db.find(user => user.account === accountNumber);

  if (user) {
    console.log(user.name);
  } else {
    console.log("User does not exist in the inline DB");
  }
}

findCustomerAccount(1001); // Will print "Alice"
//findCustomerAccount(1234); // Will print "User does not exist in the inline DB"
