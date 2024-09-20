import {Component, Inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {AuthService} from "../../../public/auth.service";
import {Router} from "@angular/router";
import {ExpiresAtService} from "../../../shared/services/expires-at.service";
import {WelcomeService} from "../../../shared/services/welcomes/welcome.service";
import {Welcome} from "../../../shared/models/welcome";
import Swal from "sweetalert2";
import {UserData} from "../../../shared/models/user.response.login";

// @ts-ignore
@Component({
  selector: 'app-welcome-list',
  templateUrl: './welcome-list.component.html',
  styleUrl: './welcome-list.component.css'
})
export class WelcomeListComponent implements OnInit
{
  url=signal("/dashboard/welcome/add");
  label=signal('nouveau welcome');
  labelTitle=signal('');
  userData:Welcome[]=[];
  isExpired!:boolean;
  constructor(
    private authService:AuthService,
    private router:Router,
    private expireService:ExpiresAtService,
    private welcomeService:WelcomeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getAll(){
    return this.welcomeService.getAll()
      .subscribe({
        next:res=>{
          console.log(res)
          // @ts-ignore
          this.labelTitle.set(res.message)
          // @ts-ignore
          this.userData=res['data']
          //console.log(this.userData)
        }
      })
  }

  ngOnInit(): void {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router)
    this.getAll()

  }


  deleteWelcome(id: number) {
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
      text: "De vouloir supprimer ce welcome !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler ',
      reverseButtons: true
    }).then((result)=>{
      if(result.isConfirmed){
        this.welcomeService.delete(id)
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

    this.router.navigate(['/dashboard/welcome/list'])
  }
}
