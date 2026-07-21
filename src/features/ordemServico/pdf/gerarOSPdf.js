import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

export async function gerarOSPdf(ordem) {
  const pdf = await PDFDocument.create();

  const page = pdf.addPage([595, 842]);

  const { width, height } = page.getSize();

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  page.drawRectangle({
    x: 0,
    y: height - 70,
    width,
    height: 70,
    color: rgb(0.12, 0.39, 0.93),
  });

  page.drawText("PK STORE", {
    x: 40,
    y: height - 42,
    size: 24,
    font: bold,
    color: rgb(1, 1, 1),
  });

  page.drawText(
    `ORDEM DE SERVIÇO Nº ${ordem.numero}`,
    {
      x: 330,
      y: height - 42,
      size: 16,
      font: bold,
      color: rgb(1, 1, 1),
    }
  );

  let y = height - 110;

  function linha(titulo, valor) {
    page.drawText(titulo, {
      x: 40,
      y,
      size: 12,
      font: bold,
    });

    page.drawText(String(valor || "-"), {
      x: 170,
      y,
      size: 12,
      font,
    });

    y -= 24;
  }

  linha("Cliente:", ordem.cliente_nome);
  linha("Contato:", ordem.cliente_telefone);
  linha("Data:", ordem.data);
  linha("Marca:", ordem.marca);
  linha("Modelo:", ordem.modelo);
  linha("Serial:", ordem.serial);
  linha("Liga:", ordem.liga);
  linha("Testado:", ordem.testado);
  linha("Valor:", `R$ ${Number(ordem.valor || 0).toFixed(2)}`);

  y -= 15;

  page.drawText("Defeito Reclamado", {
    x: 40,
    y,
    size: 14,
    font: bold,
  });

  y -= 22;

  page.drawText(
    ordem.defeito || "-",
    {
      x: 40,
      y,
      size: 12,
      font,
      maxWidth: 510,
      lineHeight: 18,
    }
  );

  y -= 110;

  page.drawText("Observações", {
    x: 40,
    y,
    size: 14,
    font: bold,
  });

  y -= 22;

  page.drawText(
    ordem.observacoes || "-",
    {
      x: 40,
      y,
      size: 12,
      font,
      maxWidth: 510,
      lineHeight: 18,
    }
  );

  page.drawLine({
    start: { x: 60, y: 120 },
    end: { x: 240, y: 120 },
    thickness: 1,
  });

  page.drawText("Assinatura do Cliente", {
    x: 80,
    y: 100,
    size: 10,
    font,
  });

  page.drawLine({
    start: { x: 350, y: 120 },
    end: { x: 530, y: 120 },
    thickness: 1,
  });

  page.drawText("PK Store", {
    x: 410,
    y: 100,
    size: 10,
    font,
  });

  const bytes = await pdf.save();

  const blob = new Blob([bytes], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);

  window.open(url);
}