export interface Appointment {
  id: number;
  appointmentDate: string;   // ISO date string
  appointmentTime: string;   // e.g. "10:30 AM"
  status: string;            // e.g. "Scheduled", "Completed", "Cancelled"
  paymentStatus: boolean;    // true if paid
  doctor: {
    id: number;
    name: string;
    specialization: string;
    user:{
    id: number;
    name: string;
    role: string;
  }
  };
  patient: {
    id: number;
    name: string;
    user:{
    id: number;
    name: string;
    role: string;
  }
  };
  
}
