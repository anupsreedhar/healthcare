export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  departmentId: number;
  departmentName?: string;
  email?: string;
  experienceYears?: number;
  hospital?: string;
}
