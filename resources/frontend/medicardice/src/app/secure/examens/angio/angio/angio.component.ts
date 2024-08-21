import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../shared/environments/environment";
import {CatheterizationService} from "../../../../shared/services/catheterization/catheterization.service";
import {AuthService} from "../../../../public/auth.service";
import {ExpiresAtService} from "../../../../shared/services/expires-at.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngioService} from "../../../../shared/services/angio/angio.service";
import {first} from "rxjs";

@Component({
  selector: 'app-angio',
  templateUrl: './angio.component.html',
  styleUrl: './angio.component.css'
})
export class AngioComponent implements OnInit{

  isAddMode!: boolean;
  strError: string = '';
  id!: number;
  isExpired!: boolean;
  frmGroupAngio!: FormGroup;
  childTitle = signal('Angio')
  label = signal('liste');
  svgAddPath = signal('M12 4.5v15m7.5-7.5h-15');
  labelAdd = signal('ajouter');
  svgUpdPath = signal('m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125');
  labelUpd = signal('mettre à jour');
  selectedFile!: File;
  // @ts-ignore
  init = {
    path_absolute: "/storage",
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
    private angioService: AngioService,
    private fb: FormBuilder,
    private authService: AuthService,
    private expireService: ExpiresAtService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.frmGroupAngio = this.fb.group({
      angio_titre_fr: ['', [Validators.required]],
      angio_titre_en: ['', [Validators.required]],
      angio_msg_fr: ['', [Validators.required]],
      angio_msg_en: ['', [Validators.required]],
      photo: [null, [Validators.required]],
      angio_keyword_en: ['', [Validators.required]],
      angio_keyword_fr: ['', [Validators.required]],
      angio_description_en: ['angio_description_en', [Validators.required]],
      angio_description_fr: ['angio_description_fr', [Validators.required]],
      angio_titre_en_slug: ['angio_titre_en_slug'],
      angio_titre_fr_slug: ['angio_titre_fr_slug'],

    })
  }
  get angio_titre_fr() {
    return this.frmGroupAngio.get('angio_titre_fr')
  }

  get angio_titre_en() {
    return this.frmGroupAngio.get('angio_titre_en')
  }

  get angio_msg_fr() {
    return this.frmGroupAngio.get('angio_msg_fr')
  }

  get angio_msg_en() {
    return this.frmGroupAngio.get('angio_msg_en')
  }

  get angio_keyword_en() {
    return this.frmGroupAngio.get('angio_keyword_en')
  }

  get angio_keyword_fr() {
    return this.frmGroupAngio.get('angio_keyword_fr')
  }

  get angio_description_en() {
    return this.frmGroupAngio.get('angio_description_en')
  }

  get angio_description_fr() {
    return this.frmGroupAngio.get('angio_description_fr')
  }

  get angio_titre_en_slug() {
    return this.frmGroupAngio.get('angio_titre_en_slug')
  }

  get angio_titre_fr_slug() {
    return this.frmGroupAngio.get('angio_titre_fr_slug')
  }

  get photo() {
    return this.frmGroupAngio.get('photo')
  }
  ngOnInit(): void {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router)
    this.id=this.route.snapshot.params['id'];
    this.isAddMode=!this.id;
    if(!this.isAddMode){
      const currentUser=localStorage.getItem('authUser')
      this.angioService.show(this.id)
        .pipe(first())
        .subscribe({
          next:res=>{
            // @ts-ignore
            const angio=res['data'];
            this.frmGroupAngio.patchValue(angio)
          }
        })
    }
  }

  onFileSelected(event: any) {
    const target = event.target as HTMLInputElement;
    // @ts-ignore
    const fileList: FileList = target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      // Use file immediately or store a copy
      const reader = new FileReader();
      this.frmGroupAngio.patchValue({photo: file});
      this.photo?.updateValueAndValidity();
      this.selectedFile = file
    }
  }

  onSubmit() {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router);
    const file=this.photo?.value
    const formData = new FormData();
    if (file != undefined && file != null) {
      formData.append('photo',file,file.name);
    }
    formData.append('angio_titre_fr_slug',this.angio_titre_fr_slug?.value);
    formData.append('angio_titre_en_slug',this.angio_titre_en_slug?.value);
    formData.append('angio_description_fr',this.angio_description_fr?.value);
    formData.append('angio_description_en',this.angio_description_en?.value);
    formData.append('angio_keyword_fr',this.angio_keyword_fr?.value);
    formData.append('angio_keyword_en',this.angio_keyword_en?.value);
    formData.append('angio_msg_en',this.angio_msg_en?.value);
    formData.append('angio_msg_fr',this.angio_msg_fr?.value);
    formData.append('angio_titre_en',this.angio_titre_en?.value);
    formData.append('angio_titre_fr',this.angio_titre_fr?.value);
    // @ts-ignore
    if(this.isAddMode){

      this.angioService.store(formData)
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
            this.router.navigateByUrl('dashboard/angio/list')
          }
        })
    }
    else{
      formData.append('_method', 'PUT');
      this.angioService.updateByFormData(this.id,formData)
        .subscribe({
          next:res=>{
            // @ts-ignore
            if (!res.success) {
              return;
            }
            this.router.navigateByUrl('dashboard/angio/list')
          },
          error:err=>console.log(err)
        })
    }
  }
}
