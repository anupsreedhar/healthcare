export interface Prescription {
  id: number;
  medicineName: string;
  dosage: string;
  date: string; // ISO date string
  doctorName?: string;
}
