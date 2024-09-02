import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../shared/environments/environment";
import {AuthService} from "../../public/auth.service";
import {ExpiresAtService} from "../../shared/services/expires-at.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationService} from "../../shared/services/location/location.service";
import {first} from "rxjs";
import {Location} from "../../shared/models/welcome";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {

  isAddMode!: boolean;
  id!:number;
  isExpired!:boolean;
  frmGroupLocation!: FormGroup;
  selectedFile!: File;
  childTitle=signal('location')
  label=signal('liste');
  svgAddPath=signal('M12 4.5v15m7.5-7.5h-15');
  labelAdd=signal('ajouter');
  svgUpdPath=signal('m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125');
  labelUpd=signal('mettre à jour');
  // @ts-ignore
  init={
    path_absolute : "/",
    relative_urls: false,
    base_url: '/tinymce',
    suffix: '.min',
    height: 450,
    menubar: 'file edit view insert format tools table tc help',
    toolbar_sticky: false,
    // @ts-ignore
    file_picker_callback : function(callback, value, meta) {
      var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
      var y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
      var cmsURL = `${environment.baseUrl}laravel-filemanager?editor=` + meta.fieldname;

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
          //console.log(`message ${message['content']}`);
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
    private locationService:LocationService,
    private fb:FormBuilder,
    private authService:AuthService,
    private expireService:ExpiresAtService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.frmGroupLocation=this.fb.group({
      location_titre_fr:['',[Validators.required]],
      location_titre_en:['',[Validators.required]],
      location_msg_fr:['',[Validators.required]],
      location_msg_en:['',[Validators.required]],
      photo:['',[Validators.required]],
      location_keyword_en:['',[Validators.required]],
      location_keyword_fr:['',[Validators.required]],
      location_description_en:['location_description_en',[Validators.required]],
      location_description_fr:['location_description_fr',[Validators.required]],
      location_titre_en_slug :['location_titre_en_slug'],
      location_titre_fr_slug :['location_titre_fr_slug'],

    })
  }


  onFileSelected(event: any) {
    const target = event.target as HTMLInputElement;
    // @ts-ignore
    const fileList: FileList = target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      // Use file immediately or store a copy
      new FileReader();
      this.frmGroupLocation.patchValue({photo: file});
      this.photo?.updateValueAndValidity();
      this.selectedFile = file
    }
  }

  get location_titre_fr(){
    return this.frmGroupLocation.get('location_titre_fr')
  }
  get location_titre_en(){
    return this.frmGroupLocation.get('location_titre_en')
  }
  get location_msg_fr(){
    return this.frmGroupLocation.get('location_msg_fr')
  }
  get location_msg_en(){
    return this.frmGroupLocation.get('location_msg_en')
  }
  get location_keyword_en(){
    return this.frmGroupLocation.get('location_keyword_en')
  }
  get location_keyword_fr(){
    return this.frmGroupLocation.get('location_keyword_fr')
  }
  get location_description_en(){
    return this.frmGroupLocation.get('location_description_en')
  }
  get location_description_fr(){
    return this.frmGroupLocation.get('location_description_fr')
  }
  get location_titre_en_slug(){
    return this.frmGroupLocation.get('location_titre_en_slug')
  }
  get location_titre_fr_slug(){
    return this.frmGroupLocation.get('location_titre_fr_slug')
  }
  get photo(){
    return this.frmGroupLocation.get('photo')
  }
  ngOnInit(): void {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router)
    this.id=this.route.snapshot.params['id'];
    this.isAddMode=!this.id;
    if(!this.isAddMode){
      localStorage.getItem('authUser');
      this.locationService.show(this.id)
        .pipe(first())
        .subscribe({
          next:res=>{
            // @ts-ignore
            const location:Location=res['data'];
            this.frmGroupLocation.patchValue(location)
          }
        })
    }
  }

  onSubmit() {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router);
    const file=this.photo?.value

    console.log(`${file} ${file.name}`)
    const formData = new FormData();
    if (file != undefined && file != null) {
      formData.append('photo',file);
    }
    formData.append('location_titre_fr_slug',this.location_titre_fr_slug?.value);
    formData.append('location_titre_en_slug',this.location_titre_en_slug?.value);
    formData.append('location_description_fr',this.location_description_fr?.value);
    formData.append('location_description_en',this.location_description_en?.value);
    formData.append('location_keyword_fr',this.location_keyword_fr?.value);
    formData.append('location_keyword_en',this.location_keyword_en?.value);
    formData.append('location_msg_en',this.location_msg_en?.value);
    formData.append('location_msg_fr',this.location_msg_fr?.value);
    formData.append('location_titre_en',this.location_titre_en?.value);
    formData.append('location_titre_fr',this.location_titre_fr?.value);
    if(this.isAddMode){
      this.locationService.store(formData)
        .subscribe({
          next:res=>{
            // @ts-ignore
            this.childTitle.set(res.message)
            // @ts-ignore
            if (!res.success) {
              return;
            }
            this.router.navigateByUrl('dashboard/location/list')
          }
        })
    }
    else{

      formData.append('_method', 'PUT');
      this.locationService.updateByFormData(this.id,formData)
        .subscribe({
          next:res=>{
            // @ts-ignore
            if (!res.success) {
              return;
            }
            this.router.navigateByUrl('dashboard/location/list')
          },
          error:err=>console.log(err)
        })
    }
  }
}
