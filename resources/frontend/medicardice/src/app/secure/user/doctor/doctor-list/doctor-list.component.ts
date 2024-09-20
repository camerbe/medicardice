import {Component, Inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {Doctor} from "../../../../shared/models/patient.model";
import {AuthService} from "../../../../public/auth.service";
import {Router} from "@angular/router";
import {ExpiresAtService} from "../../../../shared/services/expires-at.service";
import {DoctorService} from "../../../../shared/services/doctor/doctor.service";
import Swal from "sweetalert2";
import {UserData} from "../../../../shared/models/user.response.login";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit{
  userData: Doctor[]=[];
  isExpired!:boolean;
  url=signal("/dashboard/doctor/add");
  label=signal('nouveau docteur');
  labelTitle=signal('');
  items!:Doctor[];
  constructor(
    private authService:AuthService,
    private router:Router,
    private expireService:ExpiresAtService,
    private doctorService:DoctorService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit(): void {
    this.getAll()
  }
  private getAll(){
    return this.doctorService.getAll()
      .subscribe({
        next:res=>{
          const dataKey:string="data"
          // @ts-ignore
          this.userData=res[dataKey]
          // @ts-ignore
          this.labelTitle.set(res.message)
          //console.log(this.userData)
          // @ts-ignore
          /*const { active, email, id, nom, prenom } = this.userData[0].user
          this.items=this.userData
          console.log(res)
          console.log(this.userData)
          console.log(`USER_ID ${this.userData[0].id}`)
          //console.log(`nom ${this.userData[0].user}`)
          console.log(`nom ${nom}`)*/
        }
      })
  }



  deleteDoctor(id: number) {
    const swalWithTailwindButtons=Swal.mixin({
      customClass:{
        container: 'bg-gray-800',
        popup: 'rounded-lg p-4 shadow-lg',
        title: 'text-2xl font-bold text-gray-600',
        //content: 'text-md text-gray-200',
        confirmButton: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
      },
      buttonsStyling: false
    })
    swalWithTailwindButtons.fire({
      title: 'Êtes-vous sûr?',
      text: "De vouloir supprimer cet utilisateur !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler ',
      reverseButtons: true
    }).then((result)=>{
      if(result.isConfirmed){
        this.doctorService.delete(id)
          .subscribe({
            next:()=>{
              // @ts-ignore
              this.userData=this.userData.filter((a:UserData)=>a.id!=id);
              this.getAll();
            },
            error:(err)=>console.log(err)
          })
      }
      else if(result.dismiss===Swal.DismissReason.cancel){

      }
    })

    this.router.navigate(['/dashboard/doctor/list'])
  }
}
