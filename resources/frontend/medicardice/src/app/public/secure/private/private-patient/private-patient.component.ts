import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../auth.service";
import {Router} from "@angular/router";
import {PatientService} from "../../../../shared/services/patients/patient.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Calendar, CalendarOptions, EventApi} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin  from "@fullcalendar/interaction";
import {AppointmentService} from "../../../../shared/services/appointment/appointment.service";
import Swal from "sweetalert2";
import {PatientIdService} from "../../../../shared/services/patient-id.service";
import {DisplayAppointment} from "../../../../shared/models/patient.model";


@Component({
  selector: 'app-private-patient',
  templateUrl: './private-patient.component.html',
  styleUrl: './private-patient.component.css'
})
export class PrivatePatientComponent implements OnInit{
  userId!:number;
  id!:number;
  doctorId!:number;
  isModalOpen: boolean=false;
  frmGroupAppointment! : FormGroup;
  Events: any[] = [];
  appointments: DisplayAppointment[] = [];
  currentPatient!:string;
  tmpAppointment:any;
  // @ts-ignore
  // @ts-ignore
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    //initialView: 'timeGridWeek',
    locale: 'fr',
    selectable: true,
    eventColor: '#378006',
    eventDisplay:'block',
    dateClick: (info) => this.onDateSelect(info),
    eventClick: (info) => this.onEventClick(info),
    // @ts-ignore
    eventClassNames: this.disableNonEventCells,
    // @ts-ignore
    eventDidMount: this.onEventDidMount,
    plugins: [dayGridPlugin,timeGridPlugin,interactionPlugin ]
  };
  disableNonEventCells = (eventInfo: { event: EventApi; el: HTMLElement }) => {
    if (!eventInfo.event.start) {
      eventInfo.el.classList.add('fc-disabled-cell');
    }
  };
  onEventDidMount = (info: { event: EventApi; el: HTMLElement; view: Calendar }) => {
    if (!info.event.start) {
      info.el.classList.add('fc-disabled-cell');
    }
  };
  constructor(
    private authService:AuthService,
    private patientService:PatientService,
    private appointmentService:AppointmentService,
    private router:Router,
    private fb: FormBuilder,
    private patientIdService:PatientIdService
  ) {
    this.frmGroupAppointment=this.fb.group({
      slot_id: [''],
      patient_id: [''],
      doctor_id: [''],
      appointment_date: [''],
      status: ['Scheduled'],
    });
  }

  get slot_id() {
    return this.frmGroupAppointment.get('slot_id')
  }
  get patient_id() {
    return this.frmGroupAppointment.get('patient_id')
  }
  get doctor_id() {
    return this.frmGroupAppointment.get('doctor_id')
  }
  get appointment_date() {
    return this.frmGroupAppointment.get('appointment_date')
  }
  get status() {
    return this.frmGroupAppointment.get('status')
  }
  logout() {
    const token =`Bearer `+localStorage.getItem('token');
    this.authService.logout(token)
    localStorage.clear()
    this.router.navigate(['accueil/fr'])
  }

  private getDoctor(){
    return this.appointmentService.getDoctors()
      .subscribe({
        next:res=>{
          const data=res['data']

          this.doctorId=data[0].id
          this.patientIdService.setDoctorIDObs(this.doctorId)

        }
      })
  }
  private getSlots(){
    return this.appointmentService.getSlots()
      .subscribe({
        next:res=>{
          // @ts-ignore
          const data=res['data'];
          // @ts-ignore
          this.Events=data.map(el=>({
            id:el.id,
            title:el.status,
            start:el.start,
            end:el.end,

          }));
          this.calendarOptions.events=this.Events
        }
      })
  }
  private getPatient(id:number){
    return this.patientService.getPatientId(this.userId)
      .subscribe({
        next:res=>{
          const patientid=res
          console.log(`const ${patientid}`)
          localStorage.setItem('patientid',patientid)
          this.patientIdService.setPatientIDObs(Number(patientid))
        }
      })
  }
  ngOnInit(): void {

    this.userId=this.patientIdService.getUserIdObs();
    this.id=this.patientIdService.getPatientIdObs()
    // @ts-ignore
    this.currentPatient=localStorage.getItem('authUser');

    this.patientService.findPatientAppointment(this.id)
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.appointments=res['data']
          //console.log(this.appointments)
        }
      })

    this.getSlots();
    this.getDoctor();
    this.doctorId=this.patientIdService.getDoctorIdObs()
  }

  private onDateSelect(info:any) {
    const eventDates = this.Events.map(event => event.start);
    if (!eventDates.includes(info.dateStr)) {
      this.frmGroupAppointment.reset()
      Swal.fire("Pas de rendez-vous possible pour cette date !");
      return;
    }

  }

  private onEventClick(info:any) {
    const arrDate=info.event.start.toLocaleString().split(' ')
    Swal.fire({
      title: "Etes-vous sûr?",
      text: `Votre rendez-vous est fixé pour le ${arrDate[0]} à ${arrDate[1]}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enregistrer !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Confirmation!",
          text: `Votre rendez-vous est bien enregistré pour le ${arrDate[0]} à ${arrDate[1]}`,
          icon: "success"
        });
        this.tmpAppointment={
          slot_id: Number(info.event.id) ,
          patient_id:this.id,
          doctor_id:this.doctorId,
          appointment_date:this.formattedDate(info.event.start.toLocaleString()),
          status:'Scheduled',
        }
        this.appointmentService.create(this.tmpAppointment)
          .subscribe(res=>console.log(res))
        this.closeModal()
        this.patientService.findPatientAppointment(this.id)
          .subscribe({
            next:res=>{
              // @ts-ignore
              this.appointments=res['data']
              this.getSlots();
              this.getDoctor();
            }
          })

      }
    });

    //this.frmGroupAppointment.markAsPristine();
    //this.frmGroupAppointment.markAsUntouched();
    //this.frmGroupAppointment.updateValueAndValidity();
    //console.log(this.frmGroupAppointment.valid)

  }

  closeModal() {
    this.isModalOpen=false
  }

  openModal(){
    this.isModalOpen=true
  }
  submitForm() {

    this.appointmentService.create(this.tmpAppointment)
      .subscribe(res=>console.log(res))
    this.closeModal()
    this.patientService.findPatientAppointment(this.id)
      .subscribe(res=>console.log(res))
    this.getSlots();
    this.getDoctor();
  }
  private formattedDate(date:any){
    const arrDate=date.split('/');
    const arrHourMin=arrDate[2].split(' ')
    return `${arrHourMin[0]}-${arrDate[1]}-${arrDate[0]} ${arrHourMin[1]}`
  }
  // @ts-ignore

  onCancel(id: number) {
    Swal.fire({
      title: "Êtes-vous sûr",
      text: "De vouloir supprimer ce rendez-vous",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Supprimé!",
          text: "Votre rendez-vous a été supprimé.",
          icon: "success"
        });
        this.appointmentService.delete(id)
          .subscribe({
            next:res=>{
              this.appointments=this.appointments.filter(el=>el.id!=id)
              this.getSlots();
              this.getDoctor();
            }
          })
      }
    });


    /*this.patientService.findPatientAppointment(this.id)
      .subscribe(res=>console.log(res))*/


  }

}
