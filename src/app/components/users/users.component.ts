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
  public user;
  public documentId = null;
  public currentStatus = 1;
  public newUserForm;
  // @ts-ignore
  @ViewChild('exampleModal') private modal;

  constructor(
    private firestoreService: FirestoreService,
    private modalService: NgbModal
  ) {
    this.newUserForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required),
      id: new FormControl('')
    });
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

  public openModal(content, newUserForm, user) {
    this.user = user;
    this.currentStatus = 1;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      },
      (reason) => {
      });


    if (user != null) {
      this.newUserForm.setValue({
        nombre: user.data.nombre,
        apellido: user.data.apellido,
        correo: user.data.correo,
        edad: user.data.edad,
        id: user.id
      });
      this.currentStatus = 2;
    }
  }

  delete(user) {
    this.firestoreService.deleteUser(user);
  }

  update(user, form) {
    const data = {
      nombre: form.nombre,
      apellido: form.apellido,
      correo: form.correo,
      edad: form.edad
    };
    this.firestoreService.updateUser(user, data);
  }


  public newUser(form, documentId = this.documentId) {
    console.log('Status: ${this.currentStatus}');
    if (this.currentStatus === 1) {
      const data = {
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        edad: form.edad
      };
      this.firestoreService.createUser(data).then(() => {
        console.log('Documento creado exitósamente!');
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
      this.firestoreService.updateUser(this.user.id, data).then(() => {
        this.currentStatus = 1;
        this.newUserForm.setValue({
          nombre: '',
          apellido: '',
          correo: '',
          edad: '',
          id: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }
}
