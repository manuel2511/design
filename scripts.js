function imprimirEtiqueta() {
    let numeroIncremento = parseInt(document.getElementById("numeroIncremento").value, 10);
    const quantidadeDuasVias = parseInt(document.getElementById("numeroDuasVias").value, 10);
    const quantidadeUmaVia = parseInt(document.getElementById("numeroUmaVia").value, 10);

    if (isNaN(numeroIncremento) || isNaN(quantidadeDuasVias) || isNaN(quantidadeUmaVia)) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "cm",
      format: [5, 10],
    });

    let firstPage = true;

    for (let i = 0; i < quantidadeDuasVias; i++) {
      numeroIncremento = adicionarEtiqueta(doc, numeroIncremento, true, firstPage);
      firstPage = false;
    }

    for (let i = 0; i < quantidadeUmaVia; i++) {
      numeroIncremento = adicionarEtiqueta(doc, numeroIncremento, false, firstPage);
      firstPage = false;
    }

    doc.save("Etiqueta.pdf");
  }

  function adicionarEtiqueta(doc, numeroIncremento, duasVias, firstPage) {
  const content = `${numeroIncremento.toString()} ${numeroIncremento.toString()}` ;

    for (let j = 0; j < (duasVias ? 2 : 1); j++) {
      if (!firstPage) {
        doc.addPage([5, 10], 'landscape');
      } else {
        firstPage = false;
      }

      doc.setFillColor(0, 0, 0);
      doc.rect(0, 0, 10, 5, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(40);
      doc.setFont("Helvetica", "bold");

      const textWidth = doc.getTextWidth(content);
      const pageWidth = 10;
      const pageHeight = 5;
      const xPosition = (pageWidth - textWidth) / 2;
      const yPosition = pageHeight / 2 + 30 / 72 / 2;

       // Adicionar uma linha vertical no centro
       const lineX = pageWidth / 2; // X posição para a linha central
      doc.setLineWidth(0.04); // Espessura da linha em cm (2px aproximadamente)
      doc.setDrawColor(255, 255, 255); // Cor da linha branca
      doc.line(lineX, 0, lineX, pageHeight); // Linha vertical do topo ao fundo


      doc.text(content, xPosition, yPosition);
    }
    
    return numeroIncremento + 1;
    
  }

  function limparEtiqueta() {
    document.getElementById("numeroIncremento").value = '';
    document.getElementById("numeroDuasVias").value = '';
    document.getElementById("numeroUmaVia").value = '';
  }