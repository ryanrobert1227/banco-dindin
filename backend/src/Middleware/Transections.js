const securePassword = require("secure-password");
const pwd = securePassword();
const { prismaClient } = require("../Database/database");

// deposit

// passou
function verifyMinValue(req, res, next) {
  const { value } = req.body;

  if (value < 1) {
    return res.status(417).json({
      message: "O valor depositado precisa ser maior do que 1 centavo!!",
    });
  }

  return next();
}

// withdrow

async function verifyEnoughMoney(req, res, next) {
  const { accountNumber, value } = req.body;

  const account = await prismaClient.account.findFirst({
    where: {
      accountNumber: Number(accountNumber),
    },
  });

  if (value > account.Balance) {
    return res.status(202).json({
      message: "Saldo Insuficiente!",
    });
  }

  return next();
}

// tranfers

function verifyNullFieldsTransfer(req, res, next) {
  const { accountNumberOrigin, accountNumberDestination, value, password } =
    req.body;

  if (
    !accountNumberOrigin ||
    !accountNumberDestination ||
    !password ||
    !value
  ) {
    return res.status(417).json({
      message: "todos os campos devem se preenchidos!!",
      example: {
        accountNumberOrigin: "x",
        accountNumberDestination: "y",
        value: 1500,
        password: "*********",
        type: "opcional",
        discription: "opcional",
      },
    });
  }

  return next();
}

async function verifySomeAccountNotExist(req, res, next) {
  const { accountNumberOrigin, accountNumberDestination } = req.body;

  const accountOrigin = await prismaClient.account.findUnique({
    where: {
      accountNumber: Number(accountNumberOrigin),
    },
  });

  const accountDestination = await prismaClient.account.findUnique({
    where: {
      accountNumber: Number(accountNumberDestination),
    },
  });

  if (!accountOrigin || !accountDestination) {
    return res.status(404).json({
      message: "Conta não existe no sistema! Verifique a escrita!",
    });
  }

  return next();
}

async function verifyOriginPassword(req, res, next) {
  const { accountNumberOrigin, password } = req.body;

  const accountOrigin = await prismaClient.account.findUnique({
    where: {
      accountNumber: Number(accountNumberOrigin),
    },
    include: {
      user: true,
    },
  });

  try {
    const result = await pwd.verify(
      Buffer.from(password),
      Buffer.from(accountOrigin.user.password, "hex")
    );

    switch (result) {
      case securePassword.INVALID:
      case securePassword.INVALID_UNRECOGNIZED_HASH:
        return res.status(400).json({ message: "Senha invalida." });
      case securePassword.VALID:
      case securePassword.VALID_NEEDS_REHASH:
        return next();
    }
  } catch (err) {
    console.error("erro:" + err);
    return res
      .status(500)
      .json({ message: "Não foi possivel concluir o procedimento!" });
  }
}

async function verifyEnoughMoneyInOrigin(req, res, next) {
  const { accountNumberOrigin, value } = req.body;

  const accountOrigin = await prismaClient.account.findUnique({
    where: {
      accountNumber: Number(accountNumberOrigin),
    },
  });

  if (value > accountOrigin.Balance) {
    return res
      .status(202)
      .json({ message: "Ohhh não! Saldo Insuficiente (T-T)" });
  }

  return next();
}

module.exports = {
  verifyMinValue,
  verifyEnoughMoney,
  verifyNullFieldsTransfer,
  verifySomeAccountNotExist,
  verifyOriginPassword,
  verifyEnoughMoneyInOrigin,
};
