import Modal from "../../../components/ui/Modal";
import OrdemForm from "./OrdemForm";

export default function OrdemModal({
  open,
  onClose,
  atualizarLista,
  ordem,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        ordem
          ? `Editar OS #${ordem.numero}`
          : "Nova Ordem de Serviço"
      }
    >
      <OrdemForm
        ordem={ordem}
        atualizarLista={atualizarLista}
        fecharModal={onClose}
      />
    </Modal>
  );
}