import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Student} from "../Model/student";
import {StudentService} from "../student/student.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-student-add-edit-dialog',
  templateUrl: './student-add-edit-dialog.component.html',
  styleUrls: ['./student-add-edit-dialog.component.scss']
})
export class StudentAddEditDialogComponent implements OnInit {
  studentForm: FormGroup = {} as FormGroup;
  public formHeader: string = 'Edit Student';
  private formAction='Edit';
  private student: Student ={} as Student;
  constructor(public dialogref: MatDialogRef<StudentAddEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:Student,
              private studentService: StudentService,private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data == null){
      this.formHeader = 'Add Student';
      this.formAction ='Add';
    }
    this.initializeForm();
  }

  onSave(){
    this.setStudent();
    console.log(this.student);
    if (this.formAction =='Add'){
      this.OnCreateStudent();
    }else {
      this.OnUpdateStudent();
    }
    this.dialogref.close();
  }

  initializeForm(){
    if(this.formAction =='Add'){
      this.studentForm = new FormGroup({
        id: new FormControl( '' ),
        name: new FormControl("", Validators.required),
        address: new FormControl("", Validators.required),
        contact: new FormControl("", Validators.required),
        pName: new FormControl("")
      });
    }else {
      this.studentForm = new FormGroup({
        id: new FormControl({ value: this.data.id, disabled: true }),
        name: new FormControl(this.data.name, Validators.required),
        address: new FormControl(this.data.address, Validators.required),
        contact: new FormControl(this.data.contact, Validators.required),
        pName: new FormControl(this.data.parantName)
      });
    }

  }

  setStudent(): Student{
    this.student.id = this.studentForm.controls['id'].value;
    this.student.name = this.studentForm.controls['name']?.value;
    this.student.address = this.studentForm.controls['address']?.value;
    this.student.contact = this.studentForm.controls['contact']?.value;
    this.student.parantName = this.studentForm.controls['pName']?.value;

    return this.student;
  }
  OnCreateStudent() {
    this.studentService.createStudent(this.student).subscribe(x => {
      console.log("inserted");
    });
  }

  OnUpdateStudent() {
    this.studentService.updateStudent(this.student).subscribe(x => {
      console.log("Updated");
      this.toastr.success('Updated', 'Info');
    });
  }
}
