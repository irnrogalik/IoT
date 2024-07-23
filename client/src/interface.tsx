export interface DeviceInfo {
  deviceId: string;
  sensorInfo: SensorInfo;
  timestamp: string;
  date: string;
}

export interface SensorInfo {
  sensorId: string;
  sensorType: string;
  charge?: string;
  location?: string[];
}
