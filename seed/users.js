import bcrypt from "bcrypt";

const users = [
  {
    name: "Cesar",
    lastName: "Caceres",
    email: "juliocace21@gmail.com",
    password: bcrypt.hashSync("juliocesar", 10),
    confirmed: 1,
  },
  {
    name: "Carmen",
    lastName: "Caceres",
    email: "tradingmy33@gmail.com",
    password: bcrypt.hashSync("12345678", 10),
    confirmed: 1,
  },
];

export default users;
