import {Component, Inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user/user.service";
import {Role, User} from "../../shared/models/user.response.login";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../public/auth.service";
import {ExpiresAtService} from "../../shared/services/expires-at.service";
import {first} from "rxjs";
import {isPlatformBrowser} from "@angular/common";
import {FormHeaderComponent} from "../components/form-header/form-header.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',

})
export class UserComponent implements OnInit{
  frmGroupUser!:FormGroup;
  insertedUser!:User;
  //userData!:UserData;
  name!:string;
  titre:string='ajout';
  childTitle=signal('administrateur')
  label=signal('liste');
  titreButton:string='ajouter';
  isExpired!:boolean;
  id!:number;
  isAddMode!:boolean;

  constructor(
    private userService:UserService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private authService:AuthService,
    private expireService:ExpiresAtService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
      this.frmGroupUser=this.fb.group({
        last_name:['',[Validators.required]],
        first_name:['',[Validators.required]],
        email:['',[Validators.required]],
        role:[''],
        password:['123456'],
        password_confirm:['123456'],
      })
  }
  get last_name(){
    return this.frmGroupUser.get('last_name')
  }
  get first_name(){
    return this.frmGroupUser.get('first_name')
  }
  get email(){
    return this.frmGroupUser.get('email')
  }
  get password(){
    return this.frmGroupUser.get('password')
  }
  get password_confirm(){
    return this.frmGroupUser.get('password_confirm')
  }
  get role(){
    return this.frmGroupUser.get('role')
  }
  onSubmit() {
    //console.log(this.frmGroupUser.value)
    if(this.isAddMode)
    {
      this.userService.create(this.frmGroupUser.value)
        .subscribe({
          next:user=>{
            this.insertedUser=user
            this.router.navigateByUrl('dashboard/user/list')
            /*if(user.success){
              const fullName=`${this.insertedUser.data.last_name} ${this.insertedUser.data.first_name}`
              this.router.navigate(['activation',fullName])
            }*/
          },
          error:err =>console.log(err.error)
        });
    }
    else{
      this.userService.update(this.id,this.frmGroupUser.value)
        .subscribe({
          next:res=>{
            if(res.success){
              this.router.navigateByUrl('dashboard/user/list')
            }
          },
          error:err=>console.log(err)
        })
    }

  }

  ngOnInit(): void {
      this.expireService.updateState(this.authService.isExpired());
      this.expireService.state$.subscribe(res=>this.isExpired=res);
      if(this.isExpired){
        if(isPlatformBrowser(this.platformId)){
          localStorage.clear();
        }

        this.router.navigateByUrl('login',{replaceUrl:true})
          .then(()=>{
            this.router.navigate([this.router.url])
          })
      }
      this.name=this.route.snapshot.params['name']!
      this.id=this.route.snapshot.params['id'];
      this.isAddMode=!this.id
      if(!this.isAddMode){
        this.titre='mise à jour'
        this.userService.show(this.id)
          .pipe(first())
          .subscribe({
            next:(res)=>{
              const dataKey:number|any=0
              this.insertedUser=res
              //console.log(this.insertedUser)
              // @ts-ignore
              const roles =this.insertedUser.data[dataKey].roles as Role
              // @ts-ignore

              this.frmGroupUser.patchValue({
                // @ts-ignore
                email:this.insertedUser.data[dataKey].email,
                // @ts-ignore
                last_name:this.insertedUser.data[dataKey].nom,
                // @ts-ignore
                first_name:this.insertedUser.data[dataKey].prenom,
                // @ts-ignore
                role:roles[0].role
              });
            },
            error:(err)=>console.log(err)
          })
      }
  }
}
