import {Component, Inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {Angio, Chest, Heart, Hypertension} from "../../../../shared/models/welcome";
import {AuthService} from "../../../../public/auth.service";
import {Router} from "@angular/router";
import {ExpiresAtService} from "../../../../shared/services/expires-at.service";
import Swal from "sweetalert2";
import {UserData} from "../../../../shared/models/user.response.login";
import {ChestService} from "../../../../shared/services/chests/chest.service";
import {HeartService} from "../../../../shared/services/heart/heart.service";

@Component({
  selector: 'app-heart-list',
  templateUrl: './heart-list.component.html',
  styleUrl: './heart-list.component.css'
})
export class HeartListComponent implements OnInit{

  userData: Heart[]=[];
  isExpired!:boolean;
  url=signal("/dashboard/heart/add");
  label=signal('nouveau heart');
  labelTitle=signal('');
  items!:Heart[];

  constructor(
    private authService:AuthService,
    private router:Router,
    private expireService:ExpiresAtService,
    private heartService:HeartService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private getAll(){
    return this.heartService.getAll()
      .subscribe({
        next:res=>{
          const dataKey:string="data"
          // @ts-ignore
          this.userData=res[dataKey]
          //console.log(this.userData)
          // @ts-ignore
          this.labelTitle.set(res.message)
        }
      })
  }
  ngOnInit(): void {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router);
    this.getAll();
  }

  deleteHeart(id: number) {
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
      text: "De vouloir supprimer ce Chest !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler ',
      reverseButtons: true
    }).then((result)=>{
      if(result.isConfirmed){
        this.heartService.delete(id)
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
    this.router.navigate(['/dashboard/heart/list'])
  }
}
