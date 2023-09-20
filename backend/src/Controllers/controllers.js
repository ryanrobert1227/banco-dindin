const securePassword = require("secure-password");
const { prismaClient } = require("../Database/database");
const pwd = securePassword();

async function searchAllAccounts(req, res) {
  const response = await prismaClient.account.findMany({
    select: {
      accountNumber: true,
      Balance: true,
      user: {
        select: {
          name: true,
          cpf: true,
          bornDate: true,
          phoneNumber: true,
          email: true,
          password: true,
        },
      },
    },
  });

  return res.status(200).json({
    message: "lista de todas as contas registradas",
    count: response.length,
    rows: response,
  });
}

async function addNewAccount(req, res) {
  const { name, cpf, bornDate, phoneNumber, email, password } = req.body;

  try {
    const hash = (await pwd.hash(Buffer.from(password))).toString("hex");

    const newUser = await prismaClient.user.create({
      data: {
        name,
        cpf: cpf.replaceAll(".", "").replaceAll("-", ""),
        bornDate,
        phoneNumber,
        email,
        password: hash,
      },
    });

    const newAccount = await prismaClient.account.create({
      data: {
        Balance: 0,
        user_key: newUser.id,
      },
    });

    const response = await prismaClient.account.findMany({
      where: {
        id: newAccount.id,
      },
      select: {
        accountNumber: true,
        Balance: true,
        user: {
          select: {
            name: true,
            cpf: true,
            bornDate: true,
            phoneNumber: true,
            email: true,
            password: true,
          },
        },
      },
    });

    res.status(201).json({
      message: "Conta criada com sucesso!! Seja Bem-vindo!!",
      account: response[0],
    });
  } catch (err) {
    console.error("erro:" + err);
  }
}

async function editAccount(req, res) {
  const { name, cpf, bornDate, phoneNumber, email, newPassword } = req.body;

  const user = await prismaClient.user.findUnique({
    where: {
      cpf,
    },
  });

  try {
    const hash = (await pwd.hash(Buffer.from(newPassword))).toString("hex");

    const newAccount = await prismaClient.user.update({
      where: {
        cpf,
      },
      data: {
        name: name || user.name,
        bornDate: bornDate || user.bornDate,
        phoneNumber: phoneNumber || user.phoneNumber,
        email: email || user.email,
        password: hash || user.password,
      },
      select: {
        name: true,
        cpf: true,
        bornDate: true,
        phoneNumber: true,
        email: true,
        password: true,
      },
    });

    return res.status(201).json({
      message: "sua conta foi atualizada com sucesso!",
      user: newAccount,
    });
  } catch (err) {
    console.error("erro:" + err);
    return res
      .status(500)
      .json({ message: "Não foi possivel concluir o procedimento!" });
  }
}

async function deleteAccount(req, res) {
  const { id } = req.params;

  const oldAccount = await prismaClient.account.findFirst({
    where: {
      accountNumber: parseInt(id),
    },
  });

  // delete registers

  await prismaClient.deposit.deleteMany({
    where: {
      account_key: oldAccount.id,
    },
  });

  await prismaClient.withdrow.deleteMany({
    where: {
      account_key: oldAccount.id,
    },
  });

  await prismaClient.transfer.deleteMany({
    where: {
      account_origin_key: oldAccount.id,
    },
  });

  // delete account

  const account = await prismaClient.account.delete({
    where: {
      accountNumber: parseInt(id),
    },
  });

  // delete user

  const user = await prismaClient.user.delete({
    where: {
      id: account.user_key,
    },
  });

  return res.status(200).json({
    message:
      "Conta excluída com sucesso!! Que pena, você ter nos deixado (T-T)",
    account: { ...account, user },
  });
}

module.exports = {
  searchAllAccounts,
  addNewAccount,
  editAccount,
  deleteAccount,
};
