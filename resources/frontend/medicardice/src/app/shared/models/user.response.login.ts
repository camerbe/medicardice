
export interface UserResponseLogin {
  success:boolean,
  user:UserLogin,
  token:string,
  expire_at:Date,
  message:string
}
export interface UserProfile {
  role:string,
  user:UserResponseLogin

}
export interface UserLogin{
  "id": number,
  "first_name": string,
  "last_name": string,
  "email": string,
  "email_verified_at": Date,
  "password_changed_at": Date,
  "deleted_at": Date,
  "created_at": Date,
  "updated_at": Date,
  "roles" :Role[],
  "role" :string,
  "token":string,
  "expires_at":string,
  "message":string
}
export interface Role {
  "id":number,
  "role":string,
  "created_at": Date,
  "updated_at": Date
}
export interface Specialite {
  "id":number,
  "specialty_name":string,

}

export interface Profile {
  'success':boolean,
  'id':number,
  'profile':string,
  'email':string,
  'role':string
}

export interface User{
  'success':boolean,
  'data':UserData,
  'message':string
}
export interface UserData{
  'id':number,
  'first_name':string,
  'last_name':string ,
  'email':string,
  "email_verified_at": Date,
  "deleted_at": Date,
  "created_at": Date,
  "updated_at": Date,
  'roles':Role[]
}
export interface PasswordReset{
  email:string;
  password:string;
  confirm_password:string;
}
