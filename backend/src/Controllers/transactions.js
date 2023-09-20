const { prismaClient } = require("../Database/database");

const { handleGetDay } = require("../utils/utils");

async function deposit(req, res) {
  const { accountNumber, value, type, discription } = req.body;

  const oldAccount = await prismaClient.account.findUnique({
    where: {
      accountNumber: Number(accountNumber),
    },
  });

  const account = await prismaClient.account.update({
    where: {
      accountNumber: Number(accountNumber),
    },
    data: {
      Balance: Number(oldAccount.Balance) + Number(value),
    },
  });

  await prismaClient.deposit.create({
    data: {
      account_key: oldAccount.id,
      day: handleGetDay(),
      value,
      category: type || "",
      discription: discription || "",
      type: "Deposito",
    },
  });

  return res.json({
    message: `Depósito realizado com sucesso!`,
    newBalance: account.Balance,
  });
}

async function withdrow(req, res) {
  const { accountNumber, value, type, discription } = req.body;

  const oldAccount = await prismaClient.account.findUnique({
    where: {
      accountNumber: Number(accountNumber),
    },
  });

  const account = await prismaClient.account.update({
    where: {
      accountNumber: Number(accountNumber),
    },
    data: {
      Balance: Number(oldAccount.Balance) - Number(value),
    },
  });

  await prismaClient.withdrow.create({
    data: {
      account_key: oldAccount.id,
      day: handleGetDay(),
      value,
      category: type || "",
      discription: discription || "",
      type: "Saque",
    },
  });

  return res.json({
    message: `Saque realizado com sucesso!`,
    newBalance: account.Balance,
  });
}

async function transfer(req, res) {
  const {
    accountNumberOrigin,
    accountNumberDestination,
    value,
    type,
    discription,
  } = req.body;

  // Olds Accounts - toget old balance values

  const oldAccountOrigin = await prismaClient.account.findUnique({
    where: {
      accountNumber: Number(accountNumberOrigin),
    },
  });

  const oldAccountDestination = await prismaClient.account.findUnique({
    where: {
      accountNumber: Number(accountNumberDestination),
    },
  });

  // Updated Accounts -- update balance values

  const accountOrigin = await prismaClient.account.update({
    where: {
      accountNumber: Number(accountNumberOrigin),
    },
    data: {
      Balance: Number(oldAccountOrigin.Balance) - Number(value),
    },
  });

  const accountDestination = await prismaClient.account.update({
    where: {
      accountNumber: Number(accountNumberDestination),
    },
    data: {
      Balance: Number(oldAccountDestination.Balance) + Number(value),
    },
    include: {
      user: true,
    },
  });

  // Add Register

  await prismaClient.transfer.create({
    data: {
      account_origin_key: oldAccountOrigin.id,
      user_recipient_key: accountDestination.user_key,
      day: handleGetDay(),
      value,
      category: type || "",
      discription: discription || "",
      type: "Transferencia",
    },
  });

  return res.status(200).json({
    message: "Transferência realizada com sucesso! Volte sempre (^-^)",
    newBalance: accountOrigin.Balance,
  });
}

async function checkBalance(req, res) {
  const { accountNumber } = req.query;

  const account = await prismaClient.account.findUnique({
    where: {
      accountNumber: Number(accountNumber),
    },
  });

  return res
    .status(200)
    .json({ message: "Saldo consultado com sucesso", saldo: account.Balance });
}

async function checkBankStatement(req, res) {
  const { accountNumber } = req.query;

  // Get Account ID

  const account = await prismaClient.account.findUnique({
    where: {
      accountNumber: Number(accountNumber),
    },
  });

  // Filter By Account ID

  const responseDeposit = await prismaClient.deposit.findMany({
    where: {
      account_key: account.id,
    },
    select: {
      date: true,
      day: true,
      value: true,
      type: true,
      discription: true,
      category: true,
    },
  });

  const responseWithdrow = await prismaClient.withdrow.findMany({
    where: {
      account_key: account.id,
    },
    select: {
      date: true,
      day: true,
      value: true,
      type: true,
      discription: true,
      category: true,
    },
  });

  const responseTransfer = await prismaClient.transfer.findMany({
    where: {
      OR: [
        { account_origin_key: account.id },
        { user_recipient_key: account.user_key },
      ],
    },
    select: {
      account_origin_key: true,
      user_recipient_key: true,
      date: true,
      day: true,
      value: true,
      type: true,
      discription: true,
      category: true,
    },
  });

  // get accountNumbers
  if (responseTransfer.length > 0) {
    const originAccountNumber = await prismaClient.account.findFirst({
      where: {
        id: responseTransfer[0].account_origin_key,
      },
    });

    const recipientAccountNumber = await prismaClient.user.findFirst({
      where: {
        id: responseTransfer[0].user_recipient_key,
      },
      include: {
        account: true,
      },
    });

    return res.status(201).json({
      message: "Extrato realizado com sucesso!",
      deposit: responseDeposit.map((e) => {
        return { ...e, accountNumber: account.accountNumber };
      }),
      withdrow: responseWithdrow.map((e) => {
        return { ...e, accountNumber: account.accountNumber };
      }),
      transfer: responseTransfer.map((e) => {
        return {
          ...e,
          originAccountNumber: originAccountNumber.accountNumber,
          recipientAccountNumber:
            recipientAccountNumber.account[0].accountNumber,
        };
      }),
    });
  }

  // Response

  return res.status(201).json({
    message: "Extrato realizado com sucesso!",
    deposit: responseDeposit.map((e) => {
      return { ...e, accountNumber: account.accountNumber };
    }),
    withdrow: responseWithdrow.map((e) => {
      return { ...e, accountNumber: account.accountNumber };
    }),
    transfer: responseTransfer,
  });
}

module.exports = {
  deposit,
  withdrow,
  transfer,
  checkBalance,
  checkBankStatement,
};
