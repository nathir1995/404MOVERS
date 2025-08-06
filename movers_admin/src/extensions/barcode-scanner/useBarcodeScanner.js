import { useState, useEffect } from "react";

const useBarcodeScanner = () => {
  const [barcode, setBarcode] = useState("");
  const [signal, setSignal] = useState(false);

  useEffect(() => {
    let timeoutId;
    let barcodeInput = "";

    function handleKeyDown(e) {
      barcodeInput += e.key;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (barcodeInput.length > 1) {
          // check if input is longer than one character to avoid false positives
          let trimmedBarcode = barcodeInput;
          if (barcodeInput.endsWith("\r\n")) {
            // check for Carriage Return and Line Feed
            trimmedBarcode = barcodeInput.slice(0, -2);
          } else if (barcodeInput.endsWith("\n")) {
            // check for Line Feed
            trimmedBarcode = barcodeInput.slice(0, -1);
          } else if (barcodeInput.endsWith("\r")) {
            // check for Carriage Return
            trimmedBarcode = barcodeInput.slice(0, -1);
          } else if (barcodeInput.endsWith("Enter")) {
            trimmedBarcode = barcodeInput.slice(0, -5);
          }
          setBarcode(trimmedBarcode);
          setSignal((v) => !v);
        }
        barcodeInput = "";
      }, 50);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return [barcode, signal];
};

export default useBarcodeScanner;
