import {Component, EventEmitter, Input, Output} from '@angular/core';

interface MedicalRecord {
  patient_id: string;
  doctor_id: string;
  visit_date: string;
  prescriptions: string;
  notes: string;
}
@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrl: './medical-record.component.css'
})
export class MedicalRecordComponent {

  @Input() medicalRecord: MedicalRecord = {
    patient_id: '',
    doctor_id: '',
    visit_date: '',
    prescriptions: '',
    notes: ''
  };

  @Input() isEditMode = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveMedicalRecord = new EventEmitter<MedicalRecord>();
  @Output() deleteMedicalRecord = new EventEmitter<MedicalRecord>();

  onSubmit() {
    this.saveMedicalRecord.emit(this.medicalRecord);
  }

  onClose() {
    this.closeModal.emit();
  }

  onDelete() {
    this.deleteMedicalRecord.emit(this.medicalRecord);
  }
}
