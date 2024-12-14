export interface Location {
  id: string;
  country: string;
  branch: string;
  locationName: string;
  latitude: string;
  longitude: string;
  wifiId?: string;
  bluetoothDeviceId?: string;
  radius: number;
  lastUpdated: string;
  locationType: 'GPS' | 'WiFi' | 'Bluetooth';
  updatedBy: string;
}

export interface LocationHeader {
  id: string;
  locationName: string;
  branch: string;
  country: string;
  latitude: string;
  longitude: string;
  wifiId: string;
  bluetoothDeviceId: string;
  radius: string;
  lastUpdated: string;
  locationType: string;
  updatedBy: string;
  action: string;
}

