export interface SensorInfo {
  sensorType: string;
  deviceInfo: DeviceInfo;
  timestamp: string;
}

export interface DeviceInfo {
  deviceId: string;
  sensorId: string;
  charge?: string;
  location?: string[];
}
