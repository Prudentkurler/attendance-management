export interface User {
  id: string;
  name: string;
  imageUrl: string;
  branch: string;
  category: string;
  group: string;
  subgroup: string;
  schedules: Schedule[];
}

export interface Schedule {
  id: string;
  name: string;
  abbreviation: string;
  startTime: string;
  endTime: string;
}

export interface ClockEvent {
  userId: string;
  timestamp: Date;
  type: 'IN' | 'OUT';
  location: Location;
  device?: Device;
  adminId?: string;
}

export interface Location {
  type: 'KNOWN' | 'UNKNOWN';
  coordinates?: {
    lat: number;
    lng: number;
  };
  address?: string;
  landmark?: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  status: 'ACTIVE' | 'INACTIVE';
}
