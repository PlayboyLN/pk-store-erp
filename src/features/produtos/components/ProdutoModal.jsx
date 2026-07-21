import Modal from "../../../components/ui/Modal";
import ProdutoForm from "./ProdutoForm";

export default function ProdutoModal({
  open,
  onClose,
  atualizarLista,
  produto,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={produto ? "Editar Produto" : "Novo Produto"}
    >
      <ProdutoForm
        produto={produto}
        atualizarLista={atualizarLista}
        fecharModal={onClose}
      />
    </Modal>
  );
}