export interface Vehicle {
  id: number;
  name: string;
  imei: string;
  location: string;
  status: 'Running' | 'Idle' | 'Offline';
  lastSeen: string;
}