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
export interface Slot {
  'id':number,
  'start':Date,
  'end':Date,
  'status':string,
  'created_by':string,
  'updated_by':string,
  'doctor_id':number
}
export interface Appointment {
  'id':number,
  'slot_id':number,
  'patient_id':number,
  'status':string,
  'appointment_date':Date,
  'doctor_id':number
}
export interface DisplayAppointment{
  'id':number,
  'slot':Slot,
  'patient':Patient,
  'doctor':Doctor,
  'status':string,
  'appointment_date':Date,
}

