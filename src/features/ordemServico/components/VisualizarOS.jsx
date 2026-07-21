import Modal from "../../../components/ui/Modal";
import { gerarOSPdf } from "../pdf/gerarOSPdf";
import { FileText, Printer } from "lucide-react";

export default function VisualizarOS({
  open,
  onClose,
  ordem,
}) {
  if (!ordem) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Ordem de Serviço #${ordem.numero}`}
    >
      <div className="space-y-5">

        <div className="grid grid-cols-2 gap-4">

          <div>
            <strong>Cliente</strong>
            <p>{ordem.cliente_nome}</p>
          </div>

          <div>
            <strong>Contato</strong>
            <p>{ordem.cliente_telefone}</p>
          </div>

          <div>
            <strong>Data</strong>
            <p>{ordem.data}</p>
          </div>

          <div>
            <strong>Marca</strong>
            <p>{ordem.marca}</p>
          </div>

          <div>
            <strong>Modelo</strong>
            <p>{ordem.modelo}</p>
          </div>

          <div>
            <strong>Nº Série</strong>
            <p>{ordem.serial}</p>
          </div>

          <div>
            <strong>Liga</strong>
            <p>{ordem.liga}</p>
          </div>

          <div>
            <strong>Testado</strong>
            <p>{ordem.testado}</p>
          </div>

          <div>
            <strong>Valor</strong>
            <p>
              R$ {Number(ordem.valor || 0).toFixed(2)}
            </p>
          </div>

        </div>

        <div>

          <strong>Defeito Reclamado</strong>

          <div className="border rounded-lg p-3 mt-2 bg-slate-50">
            {ordem.defeito}
          </div>

        </div>

        <div>

          <strong>Observações</strong>

          <div className="border rounded-lg p-3 mt-2 bg-slate-50">
            {ordem.observacoes}
          </div>

        </div>

        <div className="flex gap-3 pt-5">

          <button
            onClick={() => gerarOSPdf(ordem)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg p-3 flex justify-center items-center gap-2"
          >
            <FileText size={18} />
            Gerar PDF
          </button>

          <button
            onClick={() => {
              gerarOSPdf(ordem);
              setTimeout(() => window.print(), 500);
            }}
            className="flex-1 bg-slate-700 hover:bg-slate-800 text-white rounded-lg p-3 flex justify-center items-center gap-2"
          >
            <Printer size={18} />
            Imprimir
          </button>

        </div>

      </div>
    </Modal>
  );
}