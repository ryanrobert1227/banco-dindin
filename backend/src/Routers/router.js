const express = require("express");

// ApiRest Controller

const {
  searchAllAccounts,
  addNewAccount,
  editAccount,
  deleteAccount,
} = require("../Controllers/controllers");

// Transaction.js

const {
  deposit,
  withdrow,
  transfer,
  checkBalance,
  checkBankStatement,
} = require("../Controllers/transactions");

// singin Controller

const { singin } = require("../Controllers/singin");

// Middlewares

const {
  verifyBankPassword,
  verifyDuplicateAccount,
  validateCPF,
  isValidEmail,
  isValidPassword,
  searchAccountById,
  verifyPassword,
  valueIsANumber,
} = require("../Middleware/Middlewares");

const {
  areThereNullFieldsAdd,
  verifyDuplicateEmail,
} = require("../Middleware/AddAccount");
const { isThereMoney } = require("../Middleware/DeleteAccount");
const { areThereNullFieldsEdit } = require("../Middleware/EditAccount");
const {
  verifyEnoughMoney,
  verifyEnoughMoneyInOrigin,
  verifyMinValue,
  verifyNullFieldsTransfer,
  verifyOriginPassword,
  verifySomeAccountNotExist,
} = require("../Middleware/Transections");

const roteador = express();

roteador.get("/contas", verifyBankPassword, searchAllAccounts);
roteador.get(
  "/contas/saldo",
  [searchAccountById, verifyPassword],
  checkBalance
);
roteador.get(
  "/contas/extrato",
  [searchAccountById, verifyPassword],
  checkBankStatement
);

roteador.post(
  "/contas",
  [
    areThereNullFieldsAdd,
    verifyDuplicateAccount,
    verifyDuplicateEmail,
    validateCPF,
    isValidEmail,
    isValidPassword,
  ],
  addNewAccount
);
roteador.post("/login", [searchAccountById], singin);
roteador.post(
  "/transacoes/depositar",
  [valueIsANumber, verifyMinValue, searchAccountById],
  deposit
);
roteador.post(
  "/transacoes/sacar",
  [valueIsANumber, searchAccountById, verifyEnoughMoney, verifyPassword],
  withdrow
);
roteador.post(
  "/transacoes/transferir",
  [
    verifyNullFieldsTransfer,
    valueIsANumber,
    verifySomeAccountNotExist,
    verifyOriginPassword,
    verifyEnoughMoneyInOrigin,
  ],
  transfer
);

roteador.put(
  "/contas/:id/usuario",
  [areThereNullFieldsEdit, searchAccountById, verifyPassword],
  editAccount
);

roteador.delete(
  "/contas/:id",
  [searchAccountById, isThereMoney],
  deleteAccount
);

module.exports = roteador;
