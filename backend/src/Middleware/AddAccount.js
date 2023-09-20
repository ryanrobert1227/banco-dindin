const { prismaClient } = require("../Database/database");

function areThereNullFieldsAdd(req, res, next) {
  const { name, cpf, bornDate, phoneNumber, email, password } = req.body;

  if (!name || !cpf || !bornDate || !phoneNumber || !email || !password) {
    return res.status(412).json({ message: "preencha todos os campos" });
  }

  next();
}

async function verifyDuplicateEmail(req, res, next) {
  const { email } = req.body;

  const account = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (account) {
    return res.status(409).json({ message: "Essa conta já existe" });
  }

  next();
}

module.exports = {
  areThereNullFieldsAdd,
  verifyDuplicateEmail,
};
