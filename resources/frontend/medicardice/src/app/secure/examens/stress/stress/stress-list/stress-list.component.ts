import {Component, Inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {Echocardiographie, Stress} from "../../../../../shared/models/welcome";
import {AuthService} from "../../../../../public/auth.service";
import {Router} from "@angular/router";
import {ExpiresAtService} from "../../../../../shared/services/expires-at.service";
import {StressService} from "../../../../../shared/services/stress/stress.service";
import Swal from "sweetalert2";
import {UserData} from "../../../../../shared/models/user.response.login";

@Component({
  selector: 'app-stress-list',
  templateUrl: './stress-list.component.html',
  styleUrl: './stress-list.component.css'
})
export class StressListComponent implements OnInit{

  userData: Stress[]=[];
  isExpired!:boolean;
  url=signal("/dashboard/stress/add");
  label=signal('nouveau stress');
  labelTitle=signal('');
  items!:Stress[];

  constructor(
    private authService:AuthService,
    private router:Router,
    private expireService:ExpiresAtService,
    private stressService:StressService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private getAll(){
    return this.stressService.getAll()
      .subscribe({
        next:res=>{
          const dataKey:string="data"
          // @ts-ignore
          this.userData=res[dataKey]
          // @ts-ignore
          this.labelTitle.set(res.message)
        }
      })
  }
  ngOnInit(): void {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router);
    this.getAll();
  }

  deleteStress(id: number) {
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
      text: "De vouloir supprimer ce stress !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler ',
      reverseButtons: true
    }).then((result)=>{
      if(result.isConfirmed){
        this.stressService.delete(id)
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
    this.router.navigate(['/dashboard/stress/list'])
  }
}
