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
  public municipalitiess = [];
  public municipalities;
  public documentId = null;
  public currentStatus = 1;
  public newMunicipalitiesForm;
  derrumbe = false;
  deslave = false;
  incendio = false;
  inundacion = false;
  sismo = false;
  vocanes = false;
  // @ts-ignore
  @ViewChild('exampleModal') private modal;
  // @ts-ignore
  @ViewChild('alertSwal') private alertSwal: SwalComponent;

  public zoom = 4.48;
  // initial center position for the map
  public lat = 23.0259554;
  public lng = -103.0461714;
  public lngMunicpipaliti = 23.0259554;
  public latMunicpipaliti = -103.0461714;
  public markers: marker[] = [];


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
    this.firestoreService
      .getMunicipalities(this.derrumbe, this.deslave, this.incendio, this.inundacion, this.sismo, this.vocanes)
      .subscribe((municipalitiessSnapshot) => {
        this.municipalitiess = [];
        municipalitiessSnapshot.forEach((municipalitiesData: any) => {
          this.municipalitiess.push({
            id: municipalitiesData.payload.doc.id,
            data: municipalitiesData.payload.doc.data()
          });
        });
      });
  }

// ***************************CRUD***************************************** //
  public delete(municipalities) {
    this.firestoreService.deleteMunicipalities(municipalities);
  }

  public update(municipalities, data) {
    this.firestoreService.updateMunicipalities(this.municipalities, data).then(() => {
      this.successFull('Municipio modificado');
    }, (error) => {
    });
  }

  public new(data) {
    let fleat = true;
    for (let x = 0; x < this.municipalitiess.length; x++) {
      if (this.municipalitiess[x].data.IGECEM == data.IGECEM) {
        fleat = false;
        break;
      }
    }
    if (fleat) {
      this.firestoreService.createMunicipalities(data).then(() => {
        this.successFull('Municipio agregado');
      }, (error) => {
      });
    } else {
      this.error('IGECEM ya registrado');
    }
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
      this.update(this.municipalities, data);
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
  public error(text) {
    this.alertSwal.title = 'Error';
    this.alertSwal.type = 'error';
    this.alertSwal.text = text;
    this.alertSwal.show();
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
    this.markers = [];
  }

// *************************MAPS **************************
  public clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  public addMarker(lat, lng) {
    this.latMunicpipaliti = lat;
    this.lngMunicpipaliti = lng;
    this.markers = [];
    this.markers.push({
      lat: this.latMunicpipaliti,
      lng: this.lngMunicpipaliti,
      draggable: true
    });
  }

  public mapClicked($event: MouseEvent) {
    this.addMarker($event.coords.lat, $event.coords.lng);
    this.latMunicpipaliti = $event.coords.lat;
    this.lngMunicpipaliti = $event.coords.lng;
  }

  public markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  public openModal(content, newMunicipalitiesForm, municipalities = null) {
    this.municipalities = municipalities;
    this.currentStatus = 1;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    })
      .result.then((result) => {
      this.resetForm();
    }, (reason) => {
      this.resetForm();
    });
    if (municipalities != null) {
      console.log(municipalities);
      this.newMunicipalitiesForm.setValue({
        id: municipalities.id,
        NOMBRE: municipalities.data.NOMBRE,
        IGECEM: municipalities.data.IGECEM,
        ALTITUD: municipalities.data.ALTITUD,
        CABECERA: municipalities.data.CABECERA,
        CLIMA: municipalities.data.CLIMA,
        SIGNIFICADO: municipalities.data.SIGNIFICADO,
        inundacionCheck: municipalities.data.inundacionCheck,
        deslaveCheck: municipalities.data.deslaveCheck,
        sismoCheck: municipalities.data.sismoCheck,
        incendioCheck: municipalities.data.incendioCheck,
        vocanesCheck: municipalities.data.vocanesCheck,
        derrumbesCheck: municipalities.data.derrumbesCheck,
      });

      this.addMarker(municipalities.data.LATITUD, municipalities.data.LONGITUD);
      this.lat = municipalities.data.LATITUD;
      this.lng = municipalities.data.LONGITUD;
      this.currentStatus = 2;
    }
  }

  public derrumbeFilter() {
    this.derrumbe = !(this.derrumbe);
    this.filter();
  }

  public deslaveFilter() {
    this.deslave = !(this.deslave);
    this.filter();
  }

  public incendioFilter() {
    this.incendio = !(this.incendio);
    this.filter();
  }

  public inundacionFilter() {
    this.inundacion = !(this.inundacion);
    this.filter();
  }

  public sismoFilter() {
    this.sismo = !(this.sismo);
    this.filter();
  }

  public vocanesFilter() {
    this.vocanes = !(this.vocanes);
    this.filter();
  }

  public filter() {
    console.log('Filtros');
    this.municipalitiess = [];
    this.firestoreService
      .getMunicipalities(this.derrumbe, this.deslave, this.incendio, this.inundacion, this.sismo, this.vocanes)
      .subscribe((municipalitiessSnapshot) => {
        this.municipalitiess = [];
        municipalitiessSnapshot.forEach((municipalitiesData: any) => {
          this.municipalitiess.push({
            id: municipalitiesData.payload.doc.id,
            data: municipalitiesData.payload.doc.data()
          });
        });
      });
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
