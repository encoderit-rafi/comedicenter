// Define the interfaces for the entities
interface Patient {
  patient: any;
  id: number;
  active: boolean;
  created_by: number | null;
  updated_by: number;
  deleted_by: number | null;
  role: string;
  uid: string;
  provider: string;
  name: string;
  email: string;
  phone_code: string;
  phone: string;
  avatar: string | null;
  qr_code: string | null;
  license: string | null;
  location_id: number;
  clinic_id: number | null;
  is_verified: boolean;
  is_reviewe_needed: boolean | null;
  is_admin: boolean;
  is_featured: boolean;
  stripe_customer_id: string;
  last_login_at: string | null;
  hours_of_operation: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface Provider {
  id: number;
  active: boolean;
  created_by: number;
  updated_by: number;
  deleted_by: number | null;
  role: string;
  uid: string;
  provider: string;
  name: string;
  email: string;
  phone_code: string;
  phone: string;
  avatar: string | null;
  qr_code: string | null;
  license: string;
  location_id: number;
  clinic_id: number;
  is_verified: boolean;
  is_reviewe_needed: boolean | null;
  is_admin: boolean;
  is_featured: boolean;
  stripe_customer_id: string;
  last_login_at: string | null;
  hours_of_operation: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface Clinic {
  id: number;
  active: boolean;
  created_by: number | null;
  updated_by: number;
  deleted_by: number | null;
  role: string;
  uid: string;
  provider: string;
  name: string;
  email: string;
  phone_code: string;
  phone: string;
  avatar: string | null;
  qr_code: string | null;
  license: string | null;
  location_id: number;
  clinic_id: number | null;
  is_verified: boolean;
  is_reviewe_needed: boolean | null;
  is_admin: boolean;
  is_featured: boolean;
  stripe_customer_id: string | null;
  last_login_at: string | null;
  hours_of_operation: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  location: {
    id: number;
    active: boolean;
    created_by: number | null;
    updated_by: number | null;
    deleted_by: number | null;
    latitude: number | null;
    longitude: number | null;
    address: string;
    city: string;
    time_zone: string | null;
    state_id: number;
    zip_code: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };
}

interface Rating {
  id: number;
  active: boolean;
  created_by: number;
  updated_by: number;
  deleted_by: number | null;
  uid: string;
  visit_id: number;
  title: string;
  description: string;
  rating: number;
  photos: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// Main visit history interface
interface VisitHistory {
  id: number;
  active: boolean;
  created_by: number;
  updated_by: number;
  deleted_by: number | null;
  uid: string;
  patient_id: number;
  provider_id: number;
  clinic_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  patient: Patient;
  provider: Provider;
  clinic: Clinic;
  rating: Rating;
  doctor_clinic: any;
}

// Export the interface
export type { Clinic, Patient, Provider, Rating, VisitHistory };
