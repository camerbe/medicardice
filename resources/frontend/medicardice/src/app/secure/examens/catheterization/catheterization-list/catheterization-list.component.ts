import {Component, Inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {Catheterization, Monitoring} from "../../../../shared/models/welcome";
import {AuthService} from "../../../../public/auth.service";
import {Router} from "@angular/router";
import {ExpiresAtService} from "../../../../shared/services/expires-at.service";
import {MonitoringService} from "../../../../shared/services/monitoring/monitoring.service";
import {CatheterizationService} from "../../../../shared/services/catheterization/catheterization.service";
import Swal from "sweetalert2";
import {UserData} from "../../../../shared/models/user.response.login";

@Component({
  selector: 'app-catheterization-list',
  templateUrl: './catheterization-list.component.html',
  styleUrl: './catheterization-list.component.css'
})
export class CatheterizationListComponent implements OnInit{

  userData: Catheterization[]=[];
  isExpired!:boolean;
  url=signal("/dashboard/catheterization/add");
  label=signal('nouvelle catheterization');
  labelTitle=signal('');
  items!:Catheterization[];

  constructor(
    private authService:AuthService,
    private router:Router,
    private expireService:ExpiresAtService,
    private catheterizationService:CatheterizationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  ngOnInit(): void {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router);
    this.getAll();
  }

  private getAll(){
    return this.catheterizationService.getAll()
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

  deleteCatheterization(id: number) {
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
      text: "De vouloir supprimer cette Catheterization !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler ',
      reverseButtons: true
    }).then((result)=>{
      if(result.isConfirmed){
        this.catheterizationService.delete(id)
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
    this.router.navigate(['/dashboard/catheterization/list'])
  }
}
