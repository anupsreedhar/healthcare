export interface Appointment {
  id: number;
  appointmentDate: string;
  status: string;
  patient: {
    id: number;
    name: string;
  };
  doctor: {
    id: number;
    name: string;
    specialization: string;
  };
}
