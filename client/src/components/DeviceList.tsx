import axios from "axios";
import { useEffect, useState } from "react";

export const DeviceList = () => {
  const [devices, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/device")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  devices.sort();

  const listItems = devices.map((deviceId, index) => (
    <div className="w-25 p-3 m-2 bg-secondary" key={index}>
      <a
        href={`/device/${deviceId}`}
        className="text-secondary-emphasis link-underline link-underline-opacity-0 text-center text-secondary-emphasis"
      >
        <h5>{deviceId}</h5>
      </a>
    </div>
  ));

  return (
    <>
      <div className="d-flex justify-content-center m-5">
        <div className="row">
          <h1>Devices:</h1>
          {devices.length === 0 && (
            <p className="text-danger">Devices not found</p>
          )}
          <div className="d-flex flex-wrap">{listItems}</div>
        </div>
      </div>
    </>
  );
};
