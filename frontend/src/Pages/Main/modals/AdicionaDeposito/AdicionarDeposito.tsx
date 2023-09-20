import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

import { AdicionarDepositoCSS } from "./AdicionarDeposito";
import ModalDepositForm from "../../../../components/ModalDepositForm/ModalDepositForm.tsx";
import ModalSaqueForm from "../../../../components/ModalSaqueForm/ModalSaqueForm.tsx";
import ModalTransferenciaForm from "../../../../components/ModalTransferenciaForm/ModalTransferenciaForm.tsx";

// import "./edit.css";

interface DepositoProps {
  setDepositoModal: any;
  depositoModal: any;
}
export default function AdicionarDeposito(props: DepositoProps) {
  const { setDepositoModal, depositoModal } = props;

  const [toggleDepositSaque, setToggleDepositSaque] = useState("deposito");

  function depositoModalClose() {
    setDepositoModal(false);
  }

  return (
    <>
      <AdicionarDepositoCSS />
      <Modal
        isOpen={depositoModal}
        onRequestClose={depositoModalClose}
        contentLabel="example label"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        {toggleDepositSaque === "saque" && (
          <>
            <h1>Saque</h1>
            <div className="botoes">
              <button
                value="R$"
                className="deposito2"
                onClick={() => setToggleDepositSaque("deposito")}
              >
                Deposito
              </button>
              <button
                className="transferencia2"
                onClick={() => setToggleDepositSaque("transferencia")}
              >
                Transferencia
              </button>
              <button
                className="saque2"
                onClick={() => setToggleDepositSaque("saque")}
              >
                Saque
              </button>
            </div>
            <ModalSaqueForm />
          </>
        )}
        {toggleDepositSaque === "deposito" && (
          <>
            <h1>Deposito</h1>
            <div className="botoes">
              <button
                className="deposito"
                onClick={() => setToggleDepositSaque("deposito")}
              >
                Deposito
              </button>
              <button
                className="transferencia"
                onClick={() => setToggleDepositSaque("transferencia")}
              >
                Transferencia
              </button>
              <button
                className="saque"
                onClick={() => setToggleDepositSaque("saque")}
              >
                Saque
              </button>
            </div>
            <ModalDepositForm />
          </>
        )}
        {toggleDepositSaque === "transferencia" && (
          <>
            <h1>Deposito</h1>
            <div className="botoes">
              <button
                className="deposito3"
                onClick={() => setToggleDepositSaque("deposito")}
              >
                Deposito
              </button>
              <button
                className="transferencia3"
                onClick={() => setToggleDepositSaque("transferencia")}
              >
                Transferencia
              </button>
              <button
                className="saque3"
                onClick={() => setToggleDepositSaque("saque")}
              >
                Saque
              </button>
            </div>
            <ModalTransferenciaForm />
          </>
        )}
      </Modal>
    </>
  );
}
