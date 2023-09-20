const date = new Date();

function handleGetDay() {
  const result = date.getDay();
  let day;

  switch (result) {
    case 0:
      day = "Domingo";
      break;
    case 1:
      day = "Segunda";
      break;
    case 2:
      day = "terça";
      break;
    case 3:
      day = "Quarta";
      break;
    case 4:
      day = "Quinta";
      break;
    case 5:
      day = "Sexta";
      break;
    case 6:
      day = "Sabado";
      break;
  }

  return day;
}

module.exports = { handleGetDay };
