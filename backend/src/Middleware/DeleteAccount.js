const { prismaClient } = require("../Database/database");

async function isThereMoney(req, res, next) {
  const { id } = req.params;

  const account = await prismaClient.account.findUnique({
    where: {
      accountNumber: Number(id),
    },
  });

  if (account.Balance > 0) {
    return res.status(400).json({
      message: `Cuidado!! sua conta contem ${
        "R$ " + (account.Balance / 100).toFixed(2)
      } reais, sua conta ainda NÃO foi deletada!`,
    });
  }
  next();
}

module.exports = {
  isThereMoney,
};
