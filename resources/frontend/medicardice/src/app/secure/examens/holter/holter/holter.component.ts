import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../shared/environments/environment";
import {AuthService} from "../../../../public/auth.service";
import {ExpiresAtService} from "../../../../shared/services/expires-at.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HolterService} from "../../../../shared/services/holter/holter.service";
import {first} from "rxjs";
import {Welcome} from "../../../../shared/models/welcome";


@Component({
  selector: 'app-holter',
  templateUrl: './holter.component.html',
  styleUrl: './holter.component.css'
})
export class HolterComponent implements OnInit {

  isAddMode!: boolean;
  strError: string = '';
  id!: number;
  isExpired!: boolean;
  frmGroupHolter!: FormGroup;
  childTitle = signal('Holter')
  label = signal('liste');
  svgAddPath = signal('M12 4.5v15m7.5-7.5h-15');
  labelAdd = signal('ajouter');
  svgUpdPath = signal('m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125');
  labelUpd = signal('mettre à jour');
  selectedFile!: File;
  // @ts-ignore
  init = {
    path_absolute: "/",
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
    private holterService: HolterService,
    private fb: FormBuilder,
    private authService: AuthService,
    private expireService: ExpiresAtService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.frmGroupHolter = this.fb.group({
      holter_titre_fr: ['', [Validators.required]],
      holter_titre_en: ['', [Validators.required]],
      holter_msg_fr: ['', [Validators.required]],
      holter_msg_en: ['', [Validators.required]],
      photo: [null, [Validators.required]],
      holter_keyword_en: ['', [Validators.required]],
      holter_keyword_fr: ['', [Validators.required]],
      holter_description_en: ['holter_description_en', [Validators.required]],
      holter_description_fr: ['holter_description_fr', [Validators.required]],
      holter_titre_en_slug: ['holter_titre_en_slug'],
      holter_titre_fr_slug: ['holter_titre_fr_slug'],

    })
  }

  get holter_titre_fr() {
    return this.frmGroupHolter.get('holter_titre_fr')
  }

  get holter_titre_en() {
    return this.frmGroupHolter.get('holter_titre_en')
  }

  get holter_msg_fr() {
    return this.frmGroupHolter.get('holter_msg_fr')
  }

  get holter_msg_en() {
    return this.frmGroupHolter.get('holter_msg_en')
  }

  get holter_keyword_en() {
    return this.frmGroupHolter.get('holter_keyword_en')
  }

  get holter_keyword_fr() {
    return this.frmGroupHolter.get('holter_keyword_fr')
  }

  get holter_description_en() {
    return this.frmGroupHolter.get('holter_description_en')
  }

  get holter_description_fr() {
    return this.frmGroupHolter.get('holter_description_fr')
  }

  get holter_titre_en_slug() {
    return this.frmGroupHolter.get('holter_titre_en_slug')
  }

  get holter_titre_fr_slug() {
    return this.frmGroupHolter.get('holter_titre_fr_slug')
  }

  get photo() {
    return this.frmGroupHolter.get('photo')
  }

  ngOnInit(): void {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router)
    this.id=this.route.snapshot.params['id'];
    this.isAddMode=!this.id;
    if(!this.isAddMode){
      const currentUser=localStorage.getItem('authUser')
      this.holterService.show(this.id)
        .pipe(first())
        .subscribe({
          next:res=>{
            // @ts-ignore
            const holter:Welcome=res['data'];
            this.frmGroupHolter.patchValue(holter)
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
      this.frmGroupHolter.patchValue({photo: file});
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
    formData.append('holter_titre_fr_slug',this.holter_titre_fr_slug?.value);
    formData.append('holter_titre_en_slug',this.holter_titre_en_slug?.value);
    formData.append('holter_description_fr',this.holter_description_fr?.value);
    formData.append('holter_description_en',this.holter_description_en?.value);
    formData.append('holter_keyword_fr',this.holter_keyword_fr?.value);
    formData.append('holter_keyword_en',this.holter_keyword_en?.value);
    formData.append('holter_msg_en',this.holter_msg_en?.value);
    formData.append('holter_msg_fr',this.holter_msg_fr?.value);
    formData.append('holter_titre_en',this.holter_titre_en?.value);
    formData.append('holter_titre_fr',this.holter_titre_fr?.value);
    // @ts-ignore
    if(this.isAddMode){
      this.holterService.store(formData)
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
            this.router.navigateByUrl('dashboard/holter/list')
          }
        })
    }
    else{
      formData.append('_method', 'PUT');
      this.holterService.updateByFormData(this.id,formData)
        .subscribe({
          next:res=>{
            // @ts-ignore
            if (!res.success) {
              return;
            }
            this.router.navigateByUrl('dashboard/holter/list')
          },
          error:err=>console.log(err)
        })
    }
  }
}
