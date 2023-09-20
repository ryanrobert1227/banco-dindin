const securePassword = require("secure-password");
const pwd = securePassword();
const { prismaClient } = require("../Database/database");

// geral
async function verifyBankPassword(req, res, next) {
  const { bank_password } = req.query;

  const banco = await prismaClient.bank.findMany({
    where: {},
  });

  if (bank_password != banco[0].senha) {
    return res
      .status(403)
      .json({ message: "Autorização negada! Verifique a senha" });
  }

  next();
}

async function verifyDuplicateAccount(req, res, next) {
  const { cpf } = req.body;

  const account = await prismaClient.user.findUnique({
    where: {
      cpf,
    },
  });

  if (account) {
    return res.status(409).json({ message: "Essa conta já existe" });
  }

  next();
}

async function searchAccountById(req, res, next) {
  const { id } = req.params;
  const { accountNumber, login } = req.body;
  const { accountNumber: number } = req.query;

  const account = await prismaClient.account.findFirst({
    where: {
      OR: [
        {
          accountNumber:
            Number(id) || Number(accountNumber) || Number(number) || 0,
        },
        {
          user: {
            cpf: login && login.replaceAll(".", "").replace("-", ""),
          },
        },
        {
          user: {
            email: login,
          },
        },
      ],
    },
    include: {
      user: true,
    },
  });
  if (!account) {
    return res.status(408).json({ message: "Conta não encontrada!" });
  }

  next();
}

function validateCPF(req, res, next) {
  let { cpf } = req.body;

  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, "");

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcula os dígitos verificadores
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.charAt(9))) {
    return res.status(409).json({ message: "CPF invalido" });
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.charAt(10))) {
    return res.status(409).json({ message: "CPF invalido" });
  }

  return next();
}

function isValidEmail(req, res, next) {
  const { email } = req.body;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailRegex.test(email)) {
    return res.status(409).json({ message: "Email invalido" });
  }

  return next();
}

function isValidPassword(req, res, next) {
  const { password } = req.body;

  // Pelo menos 6 caracteres
  if (password.length < 6) {
    return res.status(409).json({
      message: "Senha invalido",
      tip: "Senha deve conter Letras Maiusculas, Minusculas, Numeros e Simbolos",
    });
  }

  // Pelo menos uma letra maiúscula
  if (!/[A-Z]/.test(password)) {
    return res.status(409).json({
      message: "Senha invalido",
      tip: "Senha deve conter Letras Maiusculas, Minusculas, Numeros e Simbolos",
    });
  }

  // Pelo menos uma letra minúscula
  if (!/[a-z]/.test(password)) {
    return res.status(409).json({
      message: "Senha invalido",
      tip: "Senha deve conter Letras Maiusculas, Minusculas, Numeros e Simbolos",
    });
  }

  // Pelo menos um número
  if (!/[0-9]/.test(password)) {
    return res.status(409).json({
      message: "Senha invalido",
      tip: "Senha deve conter Letras Maiusculas, Minusculas, Numeros e Simbolos",
    });
  }

  // Pelo menos um símbolo (caractere especial)
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
    return res.status(409).json({
      message: "Senha invalido",
      tip: "Senha deve conter Letras Maiusculas, Minusculas, Numeros e Simbolos",
    });
  }

  // Se todas as condições forem atendidas, a senha é válida
  next();
}

async function verifyPassword(req, res, next) {
  const { id } = req.params;
  const { accountNumber } = req.body;
  const { accountNumber: number } = req.query;

  // get correct password hash

  const account = await prismaClient.account.findFirst({
    where: {
      OR: [
        {
          accountNumber: Number(id) || Number(accountNumber) || Number(number),
        },
      ],
    },
    include: {
      user: true,
    },
  });

  // get try password

  let password;
  if (req.body.password) {
    password = req.body.password;
  } else {
    password = req.query.password;
  }

  // verify password

  try {
    const result = await pwd.verify(
      Buffer.from(password),
      Buffer.from(account.user.password, "hex")
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

function valueIsANumber(req, res, next) {
  const { value } = req.body;

  if (value != Number(value)) {
    return res.status(417).json({ message: "'value' precisa ser um numero" });
  }

  return next();
}

module.exports = {
  verifyBankPassword,
  verifyDuplicateAccount,
  validateCPF,
  isValidEmail,
  isValidPassword,
  searchAccountById,
  verifyPassword,
  valueIsANumber,
};
