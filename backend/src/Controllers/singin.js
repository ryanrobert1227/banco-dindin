const securePassword = require("secure-password");
const { prismaClient } = require("../Database/database");
const pwd = securePassword();

async function singin(req, res) {
  const { login, password } = req.body;

  const account = await prismaClient.user.findFirst({
    where: {
      OR: [
        { email: login },
        { cpf: login.replaceAll(".", "").replace("-", "") },
      ],
    },
  });

  try {
    const result = await pwd.verify(
      Buffer.from(password),
      Buffer.from(account.password, "hex")
    );

    switch (result) {
      case securePassword.INVALID:
      case securePassword.INVALID_UNRECOGNIZED_HASH:
        return res.status(403).json({ message: "Email ou Senha invalidos" });
      case securePassword.VALID:
      case securePassword.VALID_NEEDS_REHASH:
        return res.status(200).json({ message: "Logado com Sucesso!!" });
    }
  } catch (err) {
    console.error("erro:" + err);
    return res
      .status(500)
      .json({ message: "Não foi possivel concluir o procedimento!" });
  }
}

module.exports = { singin };
