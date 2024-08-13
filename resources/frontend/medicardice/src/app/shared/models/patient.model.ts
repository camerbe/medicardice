import {Specialite, User} from "./user.response.login";

export interface Patient {
  'id':number,
  'prenom':string,
  'nom':string,
  'tel':string,
  'user_id':number,
  'dob':Date,
  'created_by':string,
  'updated_by':string,
  'user':User
}
export interface Doctor {
  'id':number,
  'first_name':string,
  'last_name':string,
  'user_id':number,
  'specialite_id':number,
  'created_by':string,
  'updated_by':string,
  'phone_number':string,
  'user':Administrator,
  'specialite':Specialite
}

export interface Administrator{
  'id':number,
  'nom':string,
  'prenom':string ,
  'active':boolean,
  "email": string
}
