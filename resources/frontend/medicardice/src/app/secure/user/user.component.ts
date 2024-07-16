import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user/user.service";
import {User} from "../../shared/models/user.response.login";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../public/auth.service";
import {ExpiresAtService} from "../../shared/services/expires-at.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  frmGroupUser!:FormGroup;
  insertedUser!:User;
  name!:string;
  isExpired!:boolean

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

  onSubmit() {
    this.userService.create(this.frmGroupUser.value)
      .subscribe({
        next:user=>{
          this.insertedUser=user
          if(user.success){
            const fullName=`${this.insertedUser.data[0].last_name} ${this.insertedUser.data[0].first_name}`
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
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
        this.router.navigateByUrl('login',{replaceUrl:true})
          .then(()=>{
            this.router.navigate([this.router.url])
          })
      }
      this.name=this.route.snapshot.params['name']!
  }
}
