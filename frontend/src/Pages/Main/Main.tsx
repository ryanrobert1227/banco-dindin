import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import compareAsc from "date-fns/compareAsc";

import api from "../../api/api.ts";

import { RegistroType } from "../../types/propsTypes.ts";

import PerfilPhoto from "../../assets/photo.svg";
import LeftIcon from "../../assets/leftIcon.svg";
import Filter from "../../assets/icons8-filtro-48 1.png";
import Logo from "../../components/Logo/Logo.tsx";

import LeftTop from "./leftTop/leftTop.tsx";
import LeftBottom from "./LeftBottom/LeftBottom.tsx";
import Right from "./right/right.tsx";
import EditarPefil from "./modals/EditarPerfil/EditarPerfil.tsx";
import AdicionarDeposito from "./modals/AdicionaDeposito/AdicionarDeposito.tsx";

import { MainPageCSS } from "./Main";

export default function Main() {
  const [perfilModal, setPerfilModal] = useState(false);
  const [filtros] = useState<string[]>([
    "Alimentação",
    "Assinatura e Serviços",
    "Casa",
    "Compras",
    "Cuidados pessoais",
    "Educação",
    "Contas",
    "Farmacia",
    "Lazer",
  ]);
  const [depositoModal, setDepositoModal] = useState(false);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [keyWordFilter, setkeyWordFilter] = useState([""]);
  const [registros, setRegistros] = useState<RegistroType[]>([]);
  const [numeroDaConta, setNumeroDaConta] = useState(0);
  const [userName, setUserName] = useState("");

  async function listarExtrato() {
    try {
      const contas = await api.get("/contas?bank_password=Cubos123Bank");

      const conta = contas.data.rows.find((account: any) => {
        return (
          account.user.email === localStorage.getItem("userLogin") ||
          account.user.cpf === localStorage.getItem("userLogin")
        );
      });

      setUserName(conta.user.name);

      const response = await api.get(
        `/contas/extrato?accountNumber=${
          conta.accountNumber
        }&password=${localStorage.getItem("userPassword")}`
      );

      setRegistros(
        response.data.deposit
          .concat(response.data.withdrow)
          .concat(response.data.transfer)
      );
      setNumeroDaConta(conta.accountNumber);

      // if (!registros) {
      //   listarExtrato();
      // }
    } catch (error: any) {
      return toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  function exibirSomaDosDepositos() {
    const registrosFiltrados = registros.filter(
      (registro) =>
        registro.type === "Deposito" ||
        (registro.type === "Transferencia" &&
          registro.recipientAccountNumber === numeroDaConta)
    );

    let sum = 0;
    if (registrosFiltrados.length > 0) {
      for (const cada of registrosFiltrados) {
        sum += Number(cada.value);
      }
    }

    return String((sum / 100).toFixed(2));
  }

  function exibirSomaDosSaques() {
    const registrosFiltrados = registros.filter((registro) => {
      return (
        registro.type === "Saque" ||
        (registro.type === "Transferencia" &&
          registro.originAccountNumber === numeroDaConta)
      );
    });

    let sum = 0;
    if (registrosFiltrados.length > 0) {
      for (const cada of registrosFiltrados) {
        sum += Number(cada.value);
      }
    }

    return String((sum / 100).toFixed(2));
  }

  function alterEstadoDeFiltro(value: string) {
    const a = [...keyWordFilter];

    a.push(value);

    setkeyWordFilter(a);
  }

  useEffect(() => {
    listarExtrato();
  }, []);

  return (
    <>
      <MainPageCSS>
        <EditarPefil
          setPerfilModal={setPerfilModal}
          perfilModal={perfilModal}
        />
        <AdicionarDeposito
          setDepositoModal={setDepositoModal}
          depositoModal={depositoModal}
        />
        <header>
          <Logo />
          <div className="perfil">
            <img
              className="perfil-photo"
              onClick={() => {
                setPerfilModal(true);
              }}
              src={PerfilPhoto}
            />
            <span>{userName}</span>
            <Link to="/">
              <img className="left-icon" src={LeftIcon} />
            </Link>
          </div>
        </header>
        <div className="box">
          <button
            onClick={() => setFilterIsOpen(!filterIsOpen)}
            className="Filter-button"
          >
            <img src={Filter} /> Filtrar
          </button>

          <section className="column">
            <div className="left">
              {filterIsOpen && (
                <LeftTop
                  filtros={filtros}
                  keyWordFilter={keyWordFilter}
                  setkeyWordFilter={setkeyWordFilter}
                  alterEstadoDeFiltro={alterEstadoDeFiltro}
                />
              )}
              <LeftBottom registros={registros} keyWordFilter={keyWordFilter} />
            </div>
            <Right
              exibirSomaDosDepositos={exibirSomaDosDepositos}
              exibirSomaDosSaques={exibirSomaDosSaques}
              setDepositoModal={setDepositoModal}
            />
          </section>
        </div>
      </MainPageCSS>
    </>
  );
}
