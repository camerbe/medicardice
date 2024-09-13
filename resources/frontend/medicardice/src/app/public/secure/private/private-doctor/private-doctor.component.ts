import {Component, OnInit} from '@angular/core';
import {SlotService} from "../../../../shared/services/slot/slot.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth.service";
import {CalendarOptions, EventApi} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import {Router} from "@angular/router";
import {AppointmentService} from "../../../../shared/services/appointment/appointment.service";
import {PatientIdService} from "../../../../shared/services/patient-id.service";
import {DoctorService} from "../../../../shared/services/doctor/doctor.service";
import {DisplayAppointment} from "../../../../shared/models/patient.model";
import Swal from "sweetalert2";

//import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
interface MedicalRecord {
  patient_id: string;
  doctor_id: string;
  visit_date: string;
  prescriptions: string;
  notes: string;
}
@Component({
  selector: 'app-private-doctor',
  templateUrl: './private-doctor.component.html',
  styleUrl: './private-doctor.component.css'
})

export class PrivateDoctorComponent implements OnInit{
  currentDoctor!:string;
  id!:number;
  user_id!:number;
  strStart:string='';
  strEnd:string='';
  strSlotDate:string='';
  frmGroupPrivateSlot!: FormGroup;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'fr',

    plugins: [dayGridPlugin,timeGridPlugin ]
  };

  Events: any[] = [];
  Resources: any[] = [];

  appointments: DisplayAppointment[] = [];
/*********** MedicalRecord ******************/
  isModalOpen = false;
  isEditMode = false;
  selectedMedicalRecord!: MedicalRecord ;


  constructor(
    private slotService :SlotService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router,
    private appointmentService:AppointmentService,
    private patientIdService:PatientIdService,
    private doctorService:DoctorService

  )
  {
    this.frmGroupPrivateSlot=this.fb.group({
      date_slot: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      status: ['Available'],
      created_by: ['', [Validators.required]],
      updated_by: ['', [Validators.required]],
      doctor_id : ['', [Validators.required]],
    });
    this.frmGroupPrivateSlot.get('start')?.valueChanges.subscribe(value=>this.strStart=value);
    this.frmGroupPrivateSlot.get('end')?.valueChanges.subscribe(value=>this.strEnd=value);
    this.frmGroupPrivateSlot.get('date_slot')?.valueChanges.subscribe(value=>this.strSlotDate=value);
  }
  renderEventContent(eventInfo: EventApi){
    const eventType = eventInfo.title;
    let backgroundColor = '';

    switch(eventType) {
      case 'Available':
        backgroundColor = 'ff3363';
        break;
      case 'Reserve':
        backgroundColor = '#1fa03d';
        break;

    }

    return { html: `<div style="background-color: ${backgroundColor}; color: white; padding: 2px;">${eventInfo.title}</div>` };
  }

  get date_slot() {
    return this.frmGroupPrivateSlot.get('date_slot')
  }
  get start() {
    return this.frmGroupPrivateSlot.get('start')
  }
  get end() {
    return this.frmGroupPrivateSlot.get('end')
  }
  get status() {
    return this.frmGroupPrivateSlot.get('status')
  }
  get created_by() {
    return this.frmGroupPrivateSlot.get('created_by')
  }
  get updated_by() {
    return this.frmGroupPrivateSlot.get('updated_by')
  }

  get doctor_id() {
    return this.frmGroupPrivateSlot.get('doctor_id')
  }


  private getAll(){
    return this.slotService.getAll()
      .subscribe(res=>{
        // @ts-ignore
        const data=res['data'];
        const evt={'title':'','start':'','end':''}
        // @ts-ignore
        this.Events=data.map(slot=>({
          title:slot.status,
          resourceId:slot.id,
          start:slot.start,
          end:slot.end,
          rendering:'background'
          //rendering : (slot.status=='Reserve')? '#ff3363':'#1fa03d'
        }));
        // @ts-ignore
        /*this.Resources=data.map(resource=>({
          id:resource.id,
          title:resource.status,

        }));*/
        this.calendarOptions.events=this.Events
        //this.calendarOptions.resources=this.Resources
        //console.log(res)
      })
  }
  private getDoctorAppointmant(id:number){
    return this.doctorService.findDoctorAppointment(id)
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.appointments=res['data']

        }
      })
  }
  ngOnInit(): void {
    //this.patientIdService.setUserIDObs(Number(localStorage.getItem('id')) )
    // @ts-ignore
    this.currentDoctor=localStorage.getItem('authUser');
    // @ts-ignore
    this.user_id=this.patientIdService.getUserIdObs() ;
    this.id=this.patientIdService.getDoctorIdObs();
    this.getDoctorAppointmant(this.id)
    this.getAll()

  }

  onSubmit() {

    this.frmGroupPrivateSlot.patchValue({
      'start':`${this.strSlotDate} ${this.strStart}`,
      'end':`${this.strSlotDate} ${this.strEnd}`,
      'doctor_id':Number(this.id),
      'created_by':this.currentDoctor,
      'updated_by':this.currentDoctor,
    })
    this.slotService.create(this.frmGroupPrivateSlot.value)
      .subscribe(res=>console.log(res))
    this.getAll()
  }

  logout() {
    const token =`Bearer `+localStorage.getItem('token');
    this.authService.logout(token)
    localStorage.clear()
    this.router.navigate(['login'])
  }

  cancelAppointment(id: number) {
    // @ts-ignore
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, annulez-le!",
      cancelButtonText: "Annuler",
      // @ts-ignore
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.delete(id)
          .subscribe({
            next:res=>{
              this.appointments=this.appointments.filter(el=>el.id!=id)
              this.getAll()
            }
          })
        Swal.fire({
          title: "Annulation!",
          text: "Ce rendez-vous a été annulé.",
          icon: "success"
        });
      }
    });
    //this.getDoctorAppointmant(this.id)

  }
  /**************** Medical Record***************************************/
  openModal(record?: MedicalRecord) {
    this.isModalOpen = true;
    this.isEditMode = !!record;
    this.selectedMedicalRecord = record || {
      patient_id: '',
      doctor_id: '',
      visit_date: '',
      prescriptions: '',
      notes: ''
    };
  }
  closeModal() {
    this.isModalOpen = false;
  }

  handleSave(record: MedicalRecord) {
    console.log('Medical record saved:', record);
    this.closeModal();
  }

  handleDelete(record: MedicalRecord) {
    console.log('Medical record deleted:', record);
    this.closeModal();
  }
}
