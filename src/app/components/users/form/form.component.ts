import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirestoreService} from '../../../services/firestore/firestore.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


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

  constructor(
    private firestoreService: FirestoreService
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
    console.log('asdsadas');
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
      this.firestoreService.updateUser(documentId, data).then(() => {
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
