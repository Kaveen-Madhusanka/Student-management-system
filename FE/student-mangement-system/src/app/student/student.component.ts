import {Component, OnInit} from '@angular/core';
import {StudentService} from "./student.service";
import {Student} from "../Model/student";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  student: Student = {} as Student;

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.initializeStudent();
    this.studentService.getStudentById(1).subscribe(x => {
      console.log("students->", x.value);
      this.students = x.value;
    });
  }

  OnCreateStudent() {
    this.studentService.createStudent(this.student).subscribe(x => {
      console.log("inserted");
    });
  }

  OnUpdateStudent() {
    this.studentService.updateStudent(this.student).subscribe(x => {
      console.log("Updated");
    });
  }

  initializeStudent() {
    this.student.id = 2;
    this.student.name = 'test';
    this.student.address = 'testAddress';
    this.student.contact = '+94754575789';
    this.student.parantName = 'testparantName';
  }

  OnGetStudents() {
    this.studentService.getStudent().subscribe(x => {
      console.log("students->", x.value);
      this.students = x.value;
    });
  }

  OnDeleteStudents() {
    this.studentService.deleteStudent(2).subscribe(x => {
      console.log("Deleted");
    });
  }
}
