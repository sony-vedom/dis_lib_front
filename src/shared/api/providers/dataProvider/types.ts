export enum AdminRole {
  SUPER_ADMIN = 'superadmin',
  ADMIN = 'admin',
}

export enum DBEntities {
  ROLES = 'role',
  ADMINS = 'admin',
  USERS = 'user',
  INTERESTS = 'insterest',
  EVENTS = 'event',
}

export interface IUser {
  id: number
  firstname: string
  lastname: string
  phone: string
  email: string
  birthday: string //ISOString
  city: string
  main_push_notified: boolean
  ad_push_notified: boolean
  is_confirmed: boolean
  is_blocked: boolean
  is_deleted: boolean
  created_at: string //ISOString
  updated_at: string //ISOString
}

export interface IAdmin {
  id: number
  firstname: string
  lastname: string
  midname: string
  phone: string
  email: string
  birthday: string //ISOString
  role_name: AdminRole
  is_blocked: boolean
  is_deleted: boolean
  created_at: string //ISOString
  updated_at: string //ISOString
}


