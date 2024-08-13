import {Component, Inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {AuthService} from "../../../public/auth.service";
import {Router} from "@angular/router";
import {ExpiresAtService} from "../../../shared/services/expires-at.service";
import {User, UserData} from "../../../shared/models/user.response.login";
import {UserService} from "../../../shared/services/user/user.service";
import Swal from "sweetalert2";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  isExpired!:boolean;
  users!:User[];
  title!:string;
  userData!:UserData[]|any;
  label=signal('nouvel admin');
  labelTitle=signal('');
  constructor(
    private authService:AuthService,
    private router:Router,
    private expireService:ExpiresAtService,
    private userService:UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit(): void {

    this.expireService.updateState(this.authService.isExpired());
    this.expireService.state$.subscribe(res=>this.isExpired=res);
    if(this.isExpired){
      if(isPlatformBrowser(this.platformId)){
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
      }

      this.router.navigateByUrl('login',{replaceUrl:true})
        .then(()=>{
          this.router.navigate([this.router.url])
        })
    }
    this.getAll();
  }

  private getAll() {
    this.expireService.updateState(this.authService.isExpired());
    this.expireService.state$.subscribe(res=>this.isExpired=res);
    if(this.isExpired){
      localStorage.clear()
      this.router.navigateByUrl('login',{replaceUrl:true})
        .then(()=>{
          this.router.navigate([this.router.url])
        })
    }
    return this.userService.getAll()
      .subscribe(res=>{
        const key: string|any = "message";
        const data:string|any="data"
        this.users=res;
        this.labelTitle.set((this.users[key]).toString())
        //const usr=res as unknown as User;
        //const data =usr.data as unknown as UserData;
        this.userData=this.users[data];
        //console.log(this.userData)
      })
  }


  deleteUser(id:number) {
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
        this.userService.delete(id)
          .subscribe({
            next:()=>{
              this.userData=this.userData.filter((a:UserData)=>a.id!=id);
              this.getAll();
            },
            error:(err)=>console.log(err)
          })
      }
      else if(result.dismiss===Swal.DismissReason.cancel){

      }
    })

    this.router.navigate(['/dashboard/user/list'])
  }
}
