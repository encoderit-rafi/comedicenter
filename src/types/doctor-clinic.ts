interface DoctorClinic {
  active: boolean;
  clinic_id: number;
  created_at: string;
  created_by: number | null;
  deleted_at: string | null;
  deleted_by: number | null;
  id: number;
  is_admin: boolean;
  role: string;
  updated_at: string;
  updated_by: number;
  user_id: number;
}
