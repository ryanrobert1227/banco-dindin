function areThereNullFieldsEdit(req, res, next) {
  const { name, cpf, bornDate, phoneNumber, email, password, newPassword } =
    req.body;

  if (
    (!name || !cpf || !bornDate || !phoneNumber || !email || !newPassword) &&
    !password
  ) {
    return res.status(417).json({ message: "preencha pelo menos um campo" });
  }

  next();
}

module.exports = {
  areThereNullFieldsEdit,
};
