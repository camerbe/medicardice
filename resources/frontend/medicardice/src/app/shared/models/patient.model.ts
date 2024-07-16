import {User} from "./user.response.login";

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
