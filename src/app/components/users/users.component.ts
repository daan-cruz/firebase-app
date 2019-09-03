import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirestoreService} from '../../services/firestore/firestore.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import * as $ from 'jquery';
import * as s from 'bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',

  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users = [];
  public documentId = null;
  public currentStatus = 1;
  public newUserForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  // @ts-ignore
  @ViewChild('exampleModal') private modal;

  constructor(
    private firestoreService: FirestoreService,
    private modalService: NgbModal
  ) {
    this.newUserForm.setValue({
      id: '',
      nombre: '',
      apellido: '',
      correo: '',
      edad: ''
    });
  }

  ngOnInit() {

    this.firestoreService.getUsers().subscribe((usersSnapshot) => {
      this.users = [];
      usersSnapshot.forEach((userData: any) => {
        this.users.push({
          id: userData.payload.doc.id,
          data: userData.payload.doc.data()
        });
      });
    });
  }

  public openModal(content) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {

    });
  }

  public newUser(form, documentId = this.documentId) {
    if (this.currentStatus === 1) {
      const data = {
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        edad: form.edad
      };
      this.firestoreService.createUser(data).then(() => {
        this.newUserForm.setValue({
          nombre: '',
          apellido: '',
          correo: '',
          edad: '',
          id: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      const data = {
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        edad: form.edad
      };
      this.firestoreService.updateUser(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newUserForm.setValue({
          nombre: '',
          apellido: '',
          correo: '',
          edad: '',
          id: ''
        });
      }, (error) => {
        console.log(error);
      });
    }
  }
}
