import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Student} from "../Model/student";
import {StudentService} from "../student/student.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {StudentAddEditDialogComponent} from "../student-add-edit-dialog/student-add-edit-dialog.component";
import {ConfirmDialog} from "../Model/confirm-dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import * as Console from "console";


@Component({
  selector: 'app-student-grid',
  templateUrl: './student-grid.component.html',
  styleUrls: ['./student-grid.component.scss']
})
export class StudentGridComponent implements OnInit  {
  public allStudents: Student[]=[];
  displayedColumns: string[] = ['id','name', 'address','contact','parantName','action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  constructor(private studentService: StudentService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  getAllStudents(){
    this.studentService.getStudent().subscribe(x => {
      console.log("students->", x.value);
      this.allStudents = x.value;
      this.dataSource= new MatTableDataSource<Student>(this.allStudents);
      this.dataSource.paginator = this.paginator;
    });
  }

  FunctionEdit(student :Student) {
   this.OpenDialog('1000ms','600ms',student)
  }

  FunctionDelete(code: any) {
    this.confirmDialog(code);
  }

  OpenDialog(enteranimation: any, exitanimation: any,student:any) {

    this.dialog.open(StudentAddEditDialogComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data:student
    })
  }

  onCreateStudent() {
    this.OpenDialog('1000ms','600ms',null);
  }

  confirmDialog(id: number): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = {title:"Confirm Action", message:message} as ConfirmDialog;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
     if (dialogResult){
       this.deleteStudent(id)
     }
    });
  }

  deleteStudent(id:number){
    this.studentService.deleteStudent(id).subscribe(x => {
      console.log("Deleted");
    });
  }
}
