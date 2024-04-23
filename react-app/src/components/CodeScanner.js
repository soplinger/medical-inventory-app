import { useEffect, useRef, useState } from "react";
import {
  BrowserDatamatrixCodeReader,
  BrowserQRCodeReader,
  BrowserBarcodeReader,
} from "@zxing/library";
import { getItemById } from "../api/api";

const CodeScanner = (props) => {
  const [detectedCode, setDetectedCode] = useState();
  const [detectedItem, setDetectedItem] = useState();
  const videoElement = useRef(null);

  const scan = () => {
    let reader;
    if (props.scanType === "qr_code") {
      reader = new BrowserQRCodeReader();
    } else if (props.scanType === "barcode") {
      reader = new BrowserBarcodeReader();
    } else if (props.scanType === "data_matrix") {
      reader = new BrowserDatamatrixCodeReader();
    }
    reader
      .decodeFromInputVideoDevice(undefined, videoElement.current)
      .then((res) => {
        setDetectedCode(res.text);
        getItemById(res.text)
          .then((res) => {
            console.log(res);
            setDetectedItem(res.name ? res.name : "No Item Found.");
            res && props.populateForm(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log("scan error: " + err));
  };

  useEffect(() => {
    setDetectedCode("");
    setDetectedItem("");
    const constraints = {
      audio: false,
      advanced: [
        {
          facingMode: "environment",
        },
      ],
    };
    navigator.mediaDevices
      .getUserMedia({ video: constraints })
      .then((stream) => {
        videoElement.current.srcObject = stream;
        scan();
      })
      .catch((err) => console.log("camera video error: " + err));
  }, [props.scanType]);

  return (
    <div className="barcode_scanner">
      <video
        id="camera-feed"
        width="640"
        height="480"
        autoPlay
        playsInline
        ref={videoElement}
      >
        Your Browser Does Not Support the Video Tag.
      </video>
      <h1>Scanning {props.scanType}</h1>
      <h2>Detected Code: {detectedCode}</h2>
      <h2>Detected Item: {detectedItem}</h2>
    </div>
  );
};

export default CodeScanner;
