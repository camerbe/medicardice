import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WelcomeService} from "../../shared/services/welcomes/welcome.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../shared/environments/environment";
import {AuthService} from "../../public/auth.service";
import {ExpiresAtService} from "../../shared/services/expires-at.service";
import {first} from "rxjs";
import {Welcome} from "../../shared/models/welcome";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{
  isAddMode!: boolean;
  strError: string='';
  id!:number;
  isExpired!:boolean;
  frmGroupWelcome!: FormGroup;
  childTitle=signal('welcome')
  label=signal('liste');
  svgAddPath=signal('M12 4.5v15m7.5-7.5h-15');
  labelAdd=signal('ajouter');
  svgUpdPath=signal('m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125');
  labelUpd=signal('mettre à jour');
  selectedFile!:File;
  // @ts-ignore
  init={
    path_absolute : "/",
    relative_urls: false,
    base_url: '/tinymce',
    suffix: '.min',
    height: 450,
    menubar: 'file edit view insert format tools table tc help',
    toolbar_sticky: false,
    extended_valid_elements:"svg[*],defs[*],pattern[*],desc[*],metadata[*],g[*],mask[*],path[*],line[*],marker[*],rect[*],circle[*]",
    // @ts-ignore
    file_picker_callback : function(callback, value, meta) {

      var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
      var y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
      var cmsURL = `${environment.baseUrl}filemanager?editor=` + meta.fieldname;

      if (meta.filetype == 'image') {
        cmsURL = cmsURL + "&type=Images";
      }
      else {
        cmsURL = cmsURL + "&type=Files";
      }

      // @ts-ignore
      // @ts-ignore
      tinymce.activeEditor.windowManager.openUrl({
        url : cmsURL,
        title : 'Médicardice Filemanager',
        width : x * 0.8,
        height : y * 0.8,
        //resizable : 'yes',
        //close_previous : 'no',
        // @ts-ignore
        onMessage: (api, message) => {
          console.log(`message ${message['content']}`);
          callback(message['content'],'*');
        }

      });
    },
    plugins: [
      'image', 'media', 'tools', 'link', 'advlist',
      'autolink', 'lists', 'table', 'wordcount','code'
    ],
    toolbar:'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table mergetags  blockquote'

  };


  constructor(
    private welcomeService:WelcomeService,
    private fb:FormBuilder,
    private authService:AuthService,
    private expireService:ExpiresAtService,
    private route:ActivatedRoute,
    private router:Router

  ) {
    this.frmGroupWelcome=this.fb.group({
      welcome_titre_fr:['',[Validators.required]],
      welcome_titre_en:['',[Validators.required]],
      welcome_msg_fr:['',[Validators.required]],
      welcome_msg_en:['',[Validators.required]],
      photo:[null,[Validators.required]],
      welcome_keyword_en:['',[Validators.required]],
      welcome_keyword_fr:['',[Validators.required]],
      welcome_description_en:['welcome_description_en',[Validators.required]],
      welcome_description_fr:['welcome_description_fr',[Validators.required]],
      welcome_titre_en_slug :['welcome_titre_en_slug'],
      welcome_titre_fr_slug :['welcome_titre_fr_slug'],

    })
  }

  get welcome_titre_fr(){
    return this.frmGroupWelcome.get('welcome_titre_fr')
  }
  get welcome_titre_en(){
    return this.frmGroupWelcome.get('welcome_titre_en')
  }
  get welcome_msg_fr(){
    return this.frmGroupWelcome.get('welcome_msg_fr')
  }
  get welcome_msg_en(){
    return this.frmGroupWelcome.get('welcome_msg_en')
  }
  get welcome_keyword_en(){
    return this.frmGroupWelcome.get('welcome_keyword_en')
  }
  get welcome_keyword_fr(){
    return this.frmGroupWelcome.get('welcome_keyword_fr')
  }
  get welcome_description_en(){
    return this.frmGroupWelcome.get('welcome_description_en')
  }
  get welcome_description_fr(){
    return this.frmGroupWelcome.get('welcome_description_fr')
  }
  get welcome_titre_en_slug(){
    return this.frmGroupWelcome.get('welcome_titre_en_slug')
  }
  get welcome_titre_fr_slug(){
    return this.frmGroupWelcome.get('welcome_titre_fr_slug')
  }
  get photo(){
    return this.frmGroupWelcome.get('photo')
  }

  onSubmit() {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router);
    const file=this.photo?.value
    const formData = new FormData();
    if (file != undefined && file != null) {
      formData.append('photo',file,file.name);
    }
    //console.log(`${file} ${file.name}`)


    //formData.append('photo',file,file.name);
    formData.append('welcome_titre_fr_slug',this.welcome_titre_fr_slug?.value);
    formData.append('welcome_titre_en_slug',this.welcome_titre_en_slug?.value);
    formData.append('welcome_description_fr',this.welcome_description_fr?.value);
    formData.append('welcome_description_en',this.welcome_description_en?.value);
    formData.append('welcome_keyword_fr',this.welcome_keyword_fr?.value);
    formData.append('welcome_keyword_en',this.welcome_keyword_en?.value);
    formData.append('welcome_msg_en',this.welcome_msg_en?.value);
    formData.append('welcome_msg_fr',this.welcome_msg_fr?.value);
    formData.append('welcome_titre_en',this.welcome_titre_en?.value);
    formData.append('welcome_titre_fr',this.welcome_titre_fr?.value);
    // @ts-ignore
    if(this.isAddMode){

      //this.frmGroupWelcome.patchValue({photo:[this.selectedFile]})
      //console.log(this.frmGroupWelcome.value)
      //console.log(formData)
      // @ts-ignore
      //const fileObject=this.welcomeService.fileToJSON(file)
      //this.frmGroupWelcome.patchValue({photo:this.welcomeService.fileToJSON(file)})
      //console.log(this.frmGroupWelcome.value)

      this.welcomeService.store(formData)
        .subscribe({
          next:res=>{
            // @ts-ignore
            this.childTitle.set(res.message)
            // @ts-ignore
            if (!res.success) {
              // @ts-ignore
              this.strError=res.message
              return;
            }
            this.router.navigateByUrl('dashboard/welcome/list')
          }
        })
    }
    else{
      formData.append('_method', 'PUT');
      this.welcomeService.updateByFormData(this.id,formData)
        .subscribe({
          next:res=>{
            // @ts-ignore
            if (!res.success) {
              return;
            }
            this.router.navigateByUrl('dashboard/welcome/list')
          },
          error:err=>console.log(err)
        })
    }
  }

  ngOnInit(): void {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router)
    this.id=this.route.snapshot.params['id'];
    this.isAddMode=!this.id;
    if(!this.isAddMode){
      localStorage.getItem('authUser');
      this.welcomeService.show(this.id)
        .pipe(first())
        .subscribe({
          next:res=>{
            // @ts-ignore
            const welcome:Welcome=res['data'];
            this.frmGroupWelcome.patchValue(welcome)
          }
        })
    }
  }

  onFileSelected(event: any) {
    // @ts-ignore
    //const fileSelected=(event.target as HTMLInputElement).files[0];
    //const fileSelected = event.target.files[0];
    // @ts-ignore
    //this.frmGroupWelcome.patchValue({photo:fileSelected});
   // this.frmGroupWelcome.patchValue({ photo: this.selectedFile});
    //this.photo?.updateValueAndValidity();
   // this.selectedFile=fileSelected


    const target = event.target as HTMLInputElement;
    // @ts-ignore
    const fileList: FileList = target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      // Use file immediately or store a copy
      new FileReader();
      this.frmGroupWelcome.patchValue({photo:file});
      this.photo?.updateValueAndValidity();
      this.selectedFile=file
      //console.log(`${this.selectedFile}`)
    }
    //console.log(`${this.selectedFile}`)
  }
}
