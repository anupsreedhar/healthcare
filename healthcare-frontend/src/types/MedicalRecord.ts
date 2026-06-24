export interface MedicalRecord {
  id: number;
  recordType: string;     // e.g. "Test Result", "Hospital Visit"
  description: string;
  date: string;           // ISO date string
  doctorName?: string;
}
