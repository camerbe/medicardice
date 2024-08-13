import {Component, Inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../public/auth.service";
import {DoctorService} from "../../../shared/services/doctor/doctor.service";
import {ExpiresAtService} from "../../../shared/services/expires-at.service";
import {SpecialiteService} from "../../../shared/services/doctor/specialite.service";
import {Specialite} from "../../../shared/models/user.response.login";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {Doctor} from "../../../shared/models/patient.model";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit{
  frmGroupDoctor!:FormGroup;
  userData: Doctor[]=[];
  specialites:Specialite[]=[];
  selectedSpecialiteId!:number;
  isExpired!:boolean;
  isAddMode!:boolean;
  id!:number;
  childTitle=signal('médecin');
  svgAddPath=signal('M12 4.5v15m7.5-7.5h-15');
  labelAdd=signal('ajouter');
  svgUpdPath=signal('m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125');
  labelUpd=signal('mettre à jour');
  label=signal('liste');
  constructor(
    private authService:AuthService,
    private doctorService:DoctorService,
    private fb:FormBuilder,
    private expireService:ExpiresAtService,
    private specialiteService:SpecialiteService,
    private router:Router,
    private route:ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
      this.frmGroupDoctor=this.fb.group({
        last_name:['',[Validators.required]],
        first_name:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]],
        role:['Doctor'],
        specialite_id:['',[Validators.required]],
        phone_number:[''],
        password:['123456'],
        password_confirm:['123456'],
        updated_by:[''],
        created_by:[''],
      })
  }
  get specialite_id(){
    return this.frmGroupDoctor.get('specialite_id')
  }
  get phone_number(){
    return this.frmGroupDoctor.get('phone_number')
  }
  get last_name(){
    return this.frmGroupDoctor.get('last_name')
  }
  get first_name(){
    return this.frmGroupDoctor.get('first_name')
  }
  get email(){
    return this.frmGroupDoctor.get('email')
  }
  get password(){
    return this.frmGroupDoctor.get('password')
  }
  get password_confirm(){
    return this.frmGroupDoctor.get('password_confirm')
  }
  get role(){
    return this.frmGroupDoctor.get('role')
  }
  onSubmit() {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router)
    if(this.isAddMode){
      this.doctorService.create(this.frmGroupDoctor.value)
        .subscribe({
          next:res=>{
            this.router.navigate(['dashboard/doctor/list'])
          }
        })
    }
    else{
      this.doctorService.update(this.id,this.frmGroupDoctor.value)
        .subscribe({
          next:res=>{
            // @ts-ignore
            if (!res.success) {
              return;
            }
            this.router.navigateByUrl('dashboard/doctor/list')
          },
          error:err=>console.log(err)
        })
    }

  }
  getAllSpecialite(){
    return this.specialiteService.getAll()
      .subscribe({
        next:res=>{
          const data:string|any="data"
          // @ts-ignore
          this.specialites=res[data]
        }
      })
  }
  ngOnInit(): void {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router)
    this.id=this.route.snapshot.params['id'];
    this.isAddMode=!this.id
    if(!this.isAddMode){
      const currentUser=localStorage.getItem('authUser')
      this.doctorService.show(this.id)
        .pipe(first())
        .subscribe({
          next:res=>{
            const data:string|any="data"
            // @ts-ignore
            this.userData=res[data]
            console.log(res)
            const { active, email, id, nom, prenom } = this.userData[0].user
            this.frmGroupDoctor.patchValue({

              id:this.id,
              user_id:this.userData[0].user_id,
              last_name:nom,
              first_name:prenom,
              email:email,
              specialite_id:this.userData[0].specialite_id,
              phone_number:this.userData[0].phone_number,
              updated_by:currentUser,
              //created_by:currentUser,
            })
            console.log(this.frmGroupDoctor.value)
          }
        })
    }
    this.getAllSpecialite()
  }

  onChange(event: Event) {
    const target = event.target as HTMLButtonElement;
    this.selectedSpecialiteId=+target.value
  }
}
