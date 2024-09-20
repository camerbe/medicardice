import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../shared/environments/environment";
import {AuthService} from "../../../../public/auth.service";
import {ExpiresAtService} from "../../../../shared/services/expires-at.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {HeartService} from "../../../../shared/services/heart/heart.service";


@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrl: './heart.component.css'
})
export class HeartComponent implements OnInit{

  isAddMode!: boolean;
  strError: string = '';
  id!: number;
  isExpired!: boolean;
  frmGroupHeart!: FormGroup;
  childTitle = signal('insuffisance cardiaque')
  label = signal('liste');
  svgAddPath = signal('M12 4.5v15m7.5-7.5h-15');
  labelAdd = signal('ajouter');
  svgUpdPath = signal('m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125');
  labelUpd = signal('mettre à jour');
  selectedFile!: File[];
  // @ts-ignore
  init = {
    path_absolute: "http:/localhost:8000/storage",
    relative_urls: false,
    base_url: '/tinymce',
    suffix: '.min',
    height: 450,
    menubar: 'file edit view insert format tools table tc help',
    toolbar_sticky: false,
    extended_valid_elements: "svg[*],defs[*],pattern[*],desc[*],metadata[*],g[*],mask[*],path[*],line[*],marker[*],rect[*],circle[*]",
    // @ts-ignore
    file_picker_callback: function (callback, value, meta) {

      var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
      var y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
      var cmsURL = `${environment.baseUrl}filemanager?editor=` + meta.fieldname;

      if (meta.filetype == 'image') {
        cmsURL = cmsURL + "&type=Images";
      } else {
        cmsURL = cmsURL + "&type=Files";
      }

      // @ts-ignore
      // @ts-ignore
      tinymce.activeEditor.windowManager.openUrl({
        url: cmsURL,
        title: 'Médicardice Filemanager',
        width: x * 0.8,
        height: y * 0.8,
        //resizable : 'yes',
        //close_previous : 'no',
        // @ts-ignore
        onMessage: (api, message) => {
          console.log(`message ${message['content']}`);
          callback(message['content'], '*');
        }

      });
    },
    plugins: [
      'image', 'media', 'tools', 'link', 'advlist',
      'autolink', 'lists', 'table', 'wordcount', 'code'
    ],
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table mergetags  blockquote'

  };

  constructor(
    private heartService: HeartService,
    private fb: FormBuilder,
    private authService: AuthService,
    private expireService: ExpiresAtService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.frmGroupHeart = this.fb.group({
      heart_titre_fr: ['', [Validators.required]],
      heart_titre_en: ['', [Validators.required]],
      heart_msg_fr: ['', [Validators.required]],
      heart_msg_en: ['', [Validators.required]],
      photo: [null, [Validators.required]],
      heart_keyword_en: ['', [Validators.required]],
      heart_keyword_fr: ['', [Validators.required]],
      heart_description_en: ['heart_description_en', [Validators.required]],
      heart_description_fr: ['heart_description_fr', [Validators.required]],
      heart_titre_en_slug: ['heart_titre_en_slug'],
      heart_titre_fr_slug: ['heart_titre_fr_slug'],

    })
  }
  get heart_titre_fr() {
    return this.frmGroupHeart.get('heart_titre_fr')
  }

  get heart_titre_en() {
    return this.frmGroupHeart.get('heart_titre_en')
  }

  get heart_msg_fr() {
    return this.frmGroupHeart.get('heart_msg_fr')
  }

  get heart_msg_en() {
    return this.frmGroupHeart.get('heart_msg_en')
  }

  get heart_keyword_en() {
    return this.frmGroupHeart.get('heart_keyword_en')
  }

  get heart_keyword_fr() {
    return this.frmGroupHeart.get('heart_keyword_fr')
  }

  get heart_description_en() {
    return this.frmGroupHeart.get('heart_description_en')
  }

  get heart_description_fr() {
    return this.frmGroupHeart.get('heart_description_fr')
  }

  get heart_titre_en_slug() {
    return this.frmGroupHeart.get('heart_titre_en_slug')
  }

  get heart_titre_fr_slug() {
    return this.frmGroupHeart.get('heart_titre_fr_slug')
  }

  get photo() {
    return this.frmGroupHeart.get('photo')
  }
  ngOnInit(): void {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router)
    this.id=this.route.snapshot.params['id'];
    this.isAddMode=!this.id;
    if(!this.isAddMode){
      const currentUser=localStorage.getItem('authUser')
      this.heartService.show(this.id)
        .pipe(first())
        .subscribe({
          next:res=>{
            // @ts-ignore
            const heart=res['data'];
            this.frmGroupHeart.patchValue(heart)
          }
        })
    }
  }

  onFileSelected(event: any) {
    const target = event.target as HTMLInputElement;
    // @ts-ignore
    const fileList: FileList = target.files;
    if (fileList.length > 0) {
      //console.log(`fileList ${fileList.length}`)
      //const file = fileList[0];
      const file = Array.from(fileList);
      // Use file immediately or store a copy
      const reader = new FileReader();
      this.frmGroupHeart.patchValue({photo: file});
      this.photo?.updateValueAndValidity();
      this.selectedFile = file
    }
  }

  onSubmit() {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router);
    const files=this.photo?.value

    const formData = new FormData();
    if (files != undefined && files != null) {
      for (let i = 0; i < files.length; i++) {
        formData.append('photo['+i+']', files[i], files[i].name);
      }
      //console.log(`photo ${file}`)
      //formData.append('photo',file);
    }
    formData.append('heart_titre_fr_slug',this.heart_titre_fr_slug?.value);
    formData.append('heart_titre_en_slug',this.heart_titre_en_slug?.value);
    formData.append('heart_description_fr',this.heart_description_fr?.value);
    formData.append('heart_description_en',this.heart_description_en?.value);
    formData.append('heart_keyword_fr',this.heart_keyword_fr?.value);
    formData.append('heart_keyword_en',this.heart_keyword_en?.value);
    formData.append('heart_msg_en',this.heart_msg_en?.value);
    formData.append('heart_msg_fr',this.heart_msg_fr?.value);
    formData.append('heart_titre_en',this.heart_titre_en?.value);
    formData.append('heart_titre_fr',this.heart_titre_fr?.value);
    // @ts-ignore
    if(this.isAddMode){

      this.heartService.store(formData)
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
            this.router.navigateByUrl('dashboard/heart/list')
          }
        })
    }
    else{
      formData.append('_method', 'PUT');
      this.heartService.updateByFormData(this.id,formData)
        .subscribe({
          next:res=>{
            // @ts-ignore
            if (!res.success) {
              return;
            }
            this.router.navigateByUrl('dashboard/heart/list')
          },
          error:err=>console.log(err)
        })
    }
  }
}
