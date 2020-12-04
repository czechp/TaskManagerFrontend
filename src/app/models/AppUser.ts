export interface AppUser {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  role?: string;
  enabled?: boolean;
  adminApproved?: boolean;
  firstName?: string;
  secondName?: string;
  fullName?: string;
}
