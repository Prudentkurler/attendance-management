// sampleLocationData.ts
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
    action:string;

}



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
  
  export const sampleLocationData: Location[] = [
    {
      id: "1",
      country: "USA",
   
      branch: "New York",
      locationName: "NYC Office",
      latitude: "40.712776",
      longitude: "-74.005974",
      wifiId: "NYC-WIFI-001",
      bluetoothDeviceId: "BT-NYC-001",
      radius: 0.05,
      lastUpdated: "2024-11-01",
      locationType: "Bluetooth",
      updatedBy: "Admin John",
    },
    {
      id: "2",
      country: "Canada",
    
      branch: "Toronto",
      locationName: "Toronto Office",
      latitude: "43.651070",
      longitude: "-79.347015",
      wifiId: "TO-WIFI-002",
      bluetoothDeviceId: "BT-TO-002",
      radius: 0.1,
      lastUpdated: "2024-11-02",
      locationType: "WiFi",
      updatedBy: "Admin Sarah",
    },
    {
      id: "3",
     
      branch: "Berlin",
      country: "Germany",
      locationName: "Berlin Office",
      latitude: "52.520008",
      longitude: "13.404954",
      wifiId: "BER-WIFI-003",
      bluetoothDeviceId: "BT-BER-003",
      radius: 0.2,
      lastUpdated: "2024-11-03",
      locationType: "GPS",
      updatedBy: "Admin Alex",
    },
    {
      id: "4",
      
      branch: "London",
      country: "UK",
      locationName: "London Office",
      latitude: "51.507351",
      longitude: "-0.127758",
      wifiId: "LDN-WIFI-004",
      bluetoothDeviceId: "BT-LDN-004",
      radius: 0.15,
      lastUpdated: "2024-11-04",
      locationType: "Bluetooth",
      updatedBy: "Admin Emily",
    },
    {
      id: "5",
    
      branch: "Sydney",
      country: "Australia",
      locationName: "Sydney Office",
      latitude: "-33.868820",
      longitude: "151.209290",
      wifiId: "SYD-WIFI-005",
      bluetoothDeviceId: "BT-SYD-005",
      radius: 0.1,
      lastUpdated: "2024-11-05",
      locationType: "WiFi",
      updatedBy: "Admin Liam",
    },
  ];
  