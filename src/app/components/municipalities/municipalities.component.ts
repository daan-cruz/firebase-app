import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FirestoreService} from '../../services/firestore/firestore.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MouseEvent} from '@agm/core';


// maps
@Component({
  selector: 'app-municipalities',
  templateUrl: './municipalities.component.html',
  styleUrls: ['./municipalities.component.css']
})
export class MunicipalitiesComponent implements OnInit {
  public users = [];
  public user;
  public documentId = null;
  public currentStatus = 1;
  public newMunicipalitiesForm;
  // @ts-ignore
  @ViewChild('exampleModal') private modal;
  // @ts-ignore
  @ViewChild('alertSwal') private alertSwal: SwalComponent;


  public zoom = 5.48;
  // initial center position for the map
  public lat = 23.0259554;
  public lng = -103.0461714;
  public lngMunicpipaliti = 23.0259554;
  public latMunicpipaliti = -103.0461714;
  public markers: marker[] = [
    // {
    //   lat: 51.673858,
    //   lng: 7.815982,
    //   label: 'A',
    //   draggable: true
    // },
    // {
    //   lat: 51.373858,
    //   lng: 7.215982,
    //   label: 'B',
    //   draggable: false
    // },
    // {
    //   lat: 51.723858,
    //   lng: 7.895982,
    //   label: 'C',
    //   draggable: true
    // }
  ];


  constructor(
    private firestoreService: FirestoreService,
    private modalService: NgbModal
  ) {
    this.newMunicipalitiesForm = new FormGroup({
      id: new FormControl(''),
      NOMBRE: new FormControl('', Validators.required),
      IGECEM: new FormControl('', Validators.required),
      ALTITUD: new FormControl('', Validators.required),
      CABECERA: new FormControl('', Validators.required),
      CLIMA: new FormControl('', Validators.required),
      SIGNIFICADO: new FormControl('', Validators.required),
      inundacionCheck: new FormControl(false),
      deslaveCheck: new FormControl(false),
      sismoCheck: new FormControl(false),
      incendioCheck: new FormControl(false),
      vocanesCheck: new FormControl(false),
      derrumbesCheck: new FormControl(false),
    });
    this.resetForm();
  }

  ngOnInit() {
    // this.firestoreService.getMunicipalities().subscribe((usersSnapshot) => {
    //   this.users = [];
    //   usersSnapshot.forEach((userData: any) => {
    //     this.users.push({
    //       id: userData.payload.doc.id,
    //       data: userData.payload.doc.data()
    //     });
    //   });
    // });
  }

// ***************************CRUD***************************************** //
  public delete(user) {
    this.firestoreService.deleteMunicipalities(user);
  }

  public update(user, data) {
    this.firestoreService.updateMunicipalities(this.user, data).then(() => {
      this.successFull('Municipio modificado');
    }, (error) => {
    });
  }

  public new(data) {
    this.firestoreService.createMunicipalities(data).then(() => {
      this.successFull('Municipio agregado');
    }, (error) => {
    });
  }

  public upsert(form) {
    const data = {
      NOMBRE: form.NOMBRE,
      IGECEM: form.IGECEM,
      ALTITUD: form.ALTITUD,
      CABECERA: form.CABECERA,
      CLIMA: form.CLIMA,
      SIGNIFICADO: form.SIGNIFICADO,
      inundacionCheck: form.inundacionCheck,
      deslaveCheck: form.deslaveCheck,
      sismoCheck: form.sismoCheck,
      incendioCheck: form.incendioCheck,
      vocanesCheck: form.vocanesCheck,
      derrumbesCheck: form.derrumbesCheck,
      LATITUD: this.latMunicpipaliti,
      LONGITUD: this.lngMunicpipaliti
    };
    if (this.currentStatus === 1) {
      this.new(data);
    } else {
      this.update(this.user, data);
    }
  }


  public successFull(text) {
    this.resetForm();
    this.alertSwal.title = 'Correcto';
    this.alertSwal.type = 'success';
    this.alertSwal.text = text;
    this.alertSwal.show();
    this.modalService.dismissAll();
  }

  public resetForm() {
    this.newMunicipalitiesForm.setValue({
      id: '',
      NOMBRE: '',
      IGECEM: '',
      ALTITUD: '',
      CABECERA: '',
      CLIMA: '',
      SIGNIFICADO: '',
      inundacionCheck: '',
      deslaveCheck: '',
      sismoCheck: '',
      incendioCheck: '',
      vocanesCheck: '',
      derrumbesCheck: '',
    });
  }

// *************************MAPS **************************
  public clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  public mapClicked($event: MouseEvent) {
    this.latMunicpipaliti = $event.coords.lat;
    this.lngMunicpipaliti = $event.coords.lng;
    console.log(this.latMunicpipaliti);
    console.log(this.lngMunicpipaliti);
    this.markers = [];
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  public markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  public openModal(content, newMunicipalitiesForm, user = null) {
    this.user = user;
    this.currentStatus = 1;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    })
      .result.then((result) => {
      this.resetForm();
    }, (reason) => {
      this.resetForm();
    });
    if (user != null) {
      this.resetForm();
      this.currentStatus = 2;
    }
  }


}

// just an interface for type safety.
// tslint:disable-next-line:class-name
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
