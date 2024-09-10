import {Component, OnInit} from '@angular/core';
import {SlotService} from "../../../../shared/services/slot/slot.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth.service";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import {Router} from "@angular/router";
import {AppointmentService} from "../../../../shared/services/appointment/appointment.service";
import {PatientIdService} from "../../../../shared/services/patient-id.service";
import {DoctorService} from "../../../../shared/services/doctor/doctor.service";
import {DisplayAppointment} from "../../../../shared/models/patient.model";

//import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

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
  ngOnInit(): void {
    //this.patientIdService.setUserIDObs(Number(localStorage.getItem('id')) )
    // @ts-ignore
    this.currentDoctor=localStorage.getItem('authUser');
    // @ts-ignore
    this.user_id=this.patientIdService.getUserIdObs() ;
    /*this.doctorService.getDoctorId(this.user_id)
      .subscribe({
        next:res=>{
          this.id=res
          //console.log(`this.id ${this.id}`)
          this.patientIdService.setDoctorIDObs(res)
        }
      })*/
    this.id=this.patientIdService.getDoctorIdObs();
    console.log(`this.id ${this.id}`)
    this.doctorService.findDoctorAppointment(this.id)
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.appointments=res['data']
          console.log(this.appointments[0].patient)
        }
      })
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
}
