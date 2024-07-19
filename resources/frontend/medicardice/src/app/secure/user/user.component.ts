import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user/user.service";
import {User} from "../../shared/models/user.response.login";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../public/auth.service";
import {ExpiresAtService} from "../../shared/services/expires-at.service";
import {first} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  frmGroupUser!:FormGroup;
  insertedUser!:User;
  //userData!:UserData;
  name!:string;
  isExpired!:boolean;
  id!:number;
  isAddMode!:boolean;

  constructor(
    private userService:UserService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private authService:AuthService,
    private expireService:ExpiresAtService
  ) {
      this.frmGroupUser=this.fb.group({
        last_name:['',[Validators.required]],
        first_name:['',[Validators.required]],
        email:['',[Validators.required]],
        password:['',[Validators.required]],
        password_confirm:['',[Validators.required]],
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
  onSubmit() {
    this.userService.create(this.frmGroupUser.value)
      .subscribe({
        next:user=>{
          this.insertedUser=user
          if(user.success){
            const fullName=`${this.insertedUser.data.last_name} ${this.insertedUser.data.first_name}`
            this.router.navigate(['activation',fullName])
          }
        },
        error:err =>console.log(err.error)
      });
  }

  ngOnInit(): void {

      this.expireService.updateState(this.authService.isExpired());
      this.expireService.state$.subscribe(res=>this.isExpired=res);
      if(this.isExpired){
        /*const token =`Bearer `+localStorage.getItem('token');
        this.authService.logout(token)
          .subscribe(res=>console.log(res))*/
        localStorage.clear();
        this.router.navigateByUrl('login',{replaceUrl:true})
          .then(()=>{

            this.router.navigate([this.router.url])
          })
      }
      this.name=this.route.snapshot.params['name']!
      this.id=this.route.snapshot.params['id'];
      this.isAddMode=!this.id
      if(!this.isAddMode){
        this.userService.show(this.id)
          .pipe(first())
          .subscribe({
            next:(res)=>{
              //const key:string|any='nom'
              const dataKey:number|any=0
              this.insertedUser=res
              this.frmGroupUser.patchValue({
                // @ts-ignore
                email:this.insertedUser.data[dataKey].email,
                // @ts-ignore
                last_name:this.insertedUser.data[dataKey].nom,
                // @ts-ignore
                first_name:this.insertedUser.data[dataKey].prenom
              });
            },
            error:(err)=>console.log(err)
          })
      }
  }
}
