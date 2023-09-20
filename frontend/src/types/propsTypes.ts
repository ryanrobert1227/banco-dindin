export interface ButtonProps {
  text: string;
  widthflex: string;
}

export interface RegistroType {
  date: string | number;
  day: string;
  accountNumber: number;
  originAccountNumber: number;
  recipientAccountNumber: number;
  value: number;
  category: string;
  type: string;
}

export interface registroRowProps {
  data: string;
  semana: string;
  descricao: string;
  categoria: string;
  valor: number;
  tipo: string;
}

export interface LeftTopProps {
  filtros: string[];
  keyWordFilter: string[];
  setkeyWordFilter: React.Dispatch<React.SetStateAction<string[]>>;
  alterEstadoDeFiltro: Function;
}

export interface LeftBottomProps {
  registros: RegistroType[];
  keyWordFilter: string[];
}

export interface rightProps {
  exibirSomaDosDepositos: any;
  exibirSomaDosSaques: any;
  setDepositoModal: React.Dispatch<React.SetStateAction<boolean>>;
}
