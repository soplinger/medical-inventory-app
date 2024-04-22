import { useEffect, useState } from "react";
import Quagga from "quagga";
import { getItemById } from "../api/api";

const BarcodeScanner = () => {
  const [codeResults, setCodeResults] = useState([]);
  const [detectedCode, setDetectedCode] = useState();
  const [detectedItem, setDetectedItem] = useState();

  function getMostFrequent(arr) {
    let map = {};
    for (let idx = 0; idx < arr.length; idx++) {
      const cur = arr[idx];
      if (map[cur]) {
        map[cur]++;
      } else {
        map[cur] = 1;
      }
    }
    const keys = Object.keys(map);
    let biggest = 0;
    for (let idx = 0; idx < keys.length; idx++) {
      const cur = keys[idx];
      biggest = Math.max(biggest, map[cur]);
    }
    var key = Object.keys(map).filter(function (key) {
      return map[key] === biggest;
    })[0];
    return key;
  }

  useEffect(() => {
    const constraints = {
      advanced: [
        {
          facingMode: "environment",
        },
      ],
    };
    const camera = document.getElementById("camera-feed");
    navigator.mediaDevices
      .getUserMedia({ video: constraints })
      .then((stream) => (camera.srcObject = stream))
      .catch((err) => console.log("camera video error: " + err));
    Quagga.init(
      {
        locate: false,
        inputStream: {
          name: "Live",
          type: "LiveStream",
          numOfWorkers: navigator.hardwareConcurrency || 2,
          target: camera,
        },
        locator: {
          patchSize: "large",
          halfSample: true,
        },
        decoder: {
          // "code_128_reader","ean_reader","ean_8_reader","code_39_reader","code_39_vin_reader","codabar_reader","upc_reader","upc_e_reader","i2of5_reader","2of5_reader","code_93_reader"
          readers: ["code_128_reader"],
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      if (data && data.codeResult) {
        setCodeResults((prev) => [...prev, data.codeResult.code]);
      }
    });
  }, []);

  if (codeResults.length > 20) {
    const mostFrequent = getMostFrequent(codeResults);
    setDetectedCode(mostFrequent);
    setCodeResults([]);
    getItemById(mostFrequent).then((res) => {
      console.log(res);
      setDetectedItem(res.name);
    });
    Quagga.stop();
  }

  console.log(codeResults);

  return (
    <div className="barcode_scanner">
      <video id="camera-feed" width="640" height="480" autoPlay playsInline>
        Your Browser Does Not Support the Video Tag.
      </video>
      <h1>Detected Code: {detectedCode}</h1>
      <h1>Detected Item: {detectedItem}</h1>
    </div>
  );
};

export default BarcodeScanner;
