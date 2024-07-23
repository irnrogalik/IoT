import { useEffect, useState } from "react";
import { DeviceInfo } from "../interface";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";

export const DeviceInfoTable = () => {
  const { deviceId } = useParams();
  const [searchParams] = useSearchParams();
  const realTime = searchParams.get("realTime") || false;
  const interval = realTime ? 3000 : 30000;
  const data: DeviceInfo[] = [
    {
      deviceId: "",
      sensorInfo: {
        sensorType: "",
        sensorId: "",
        charge: "",
        location: [],
      },
      timestamp: "",
      date: "",
    },
  ];
  const [deviceInfo, setData] = useState(data);

  useEffect(() => {
    const getData = () => {
      axios
        .get(`http://localhost:4000/device/${deviceId}`)
        .then((response) => {
          setData(response.data.map((device: string) => JSON.parse(device)));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
    const timer = setInterval(() => {
      getData();
    }, interval);
    return () => clearInterval(timer);
  }, [deviceId, interval]);

  if (deviceInfo && deviceInfo[0].sensorInfo.sensorId) {
    deviceInfo.map((device) => {
      device.date = new Date(Number(device.timestamp)).toLocaleString();
    });
    deviceInfo.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  }

  const rows = deviceInfo.map((device, index) => (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{device.sensorInfo.sensorId}</td>
      <td>{device.sensorInfo.sensorType}</td>
      <td>{device.sensorInfo.charge}</td>
      <td>{device.sensorInfo.location}</td>
      <td>{device.date}</td>
    </tr>
  ));

  if (!deviceInfo || !deviceInfo[0].sensorInfo.sensorId)
    return (
      <div className="d-flex justify-content-center m-5">
        <p className="text-danger">Nothing found for device #{deviceId}</p>
      </div>
    );

  return (
    <>
      <div className="d-flex justify-content-center m-5">
        <div>
          <h3>Device info #{deviceId}</h3>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">sensor id</th>
                <th scope="col">sensor type</th>
                <th scope="col">charge</th>
                <th scope="col">location</th>
                <th scope="col">timestamp</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};
