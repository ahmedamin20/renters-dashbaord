import React from 'react';
import { Document, Page } from 'react-pdf';

function PDFViewer({ pdfContent }) {
  return (
    <div>
      <Document
        file={{ data: pdfContent }}
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}

export default PDFViewer;