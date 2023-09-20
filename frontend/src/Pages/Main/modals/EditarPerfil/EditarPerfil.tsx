import Modal from "react-modal";

Modal.setAppElement("#root");

import { EditarPerfilCSS } from "./EditarPerfil";
import ModalPerfilForm from "../../../../components/ModalPerfilForm/ModalPerfilForm.tsx";

// import "./edit.css";

interface editarPerfilProps {
  setPerfilModal: any;
  perfilModal: any;
}
export default function EditarPefil(props: editarPerfilProps) {
  const { setPerfilModal, perfilModal } = props;

  function perfilModalClose() {
    setPerfilModal(false);
  }

  return (
    <>
      <EditarPerfilCSS />
      <Modal
        isOpen={perfilModal}
        onRequestClose={perfilModalClose}
        contentLabel="example label"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <h1>Editar Perfil</h1>
        <ModalPerfilForm />
      </Modal>
    </>
  );
}
