import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FirestoreService} from '../../services/firestore/firestore.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MouseEvent} from '@agm/core';
import {AppComponent} from '../../app.component';

// icons
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';

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
  public admin = false;
  public faTrash = faTrash;
  public faEdit = faEdit;
  public faEye = faEye;
  mun = [
    {
      IGECEM: 1,
      NOMBRE: 'Acambay',
      CABECERA: 'Acambay',
      SUPERFICIE: '465.7',
      ALTITUD: '465.7',
      CLIMA: 'cálido',
      LATITUD: 19.9958,
      LONGITUD: -99.8417,
      SIGNIFICADO: 'Okha «Dios» y mbaye «peñasco»: «Peñascos de Dios».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 2,
      NOMBRE: 'Acolman',
      CABECERA: 'Acolman de Nezahualcóyotl',
      SUPERFICIE: '83,95',
      ALTITUD: '83,95',
      CLIMA: 'semiárido',
      LATITUD: 19.3998,
      LONGITUD: -98.884,
      SIGNIFICADO: 'Aculli «hombre», máitl «mano»: «Hombre con mano o brazo».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 3,
      NOMBRE: 'Aculco',
      CABECERA: 'Aculco de Espinosa',
      SUPERFICIE: '453,26',
      ALTITUD: '453,26',
      CLIMA: 'seco',
      LATITUD: 20.0990629,
      LONGITUD: -99.8272712,
      SIGNIFICADO: 'Atl «agua», cóltic «torcido» y co «en»: «En el agua torcida».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 4,
      NOMBRE: 'Almoloya de Alquisiras',
      CABECERA: 'Almoloya de Alquisiras',
      SUPERFICIE: '182,65',
      ALTITUD: '182,65',
      CLIMA: 'templado',
      LATITUD: 18.8664837,
      LONGITUD: -99.9001158,
      SIGNIFICADO: 'Atl «agua», molloni «manar» y yan «lugar»: «Lugar donde mana el agua». Nombrado en honor al insurgente Pedro Ascencio Alquisiras.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 5,
      NOMBRE: 'Almoloya de Juárez',
      CABECERA: 'Villa de Almoloya de Juárez',
      SUPERFICIE: '485,21',
      ALTITUD: '485,21',
      CLIMA: 'semifrio',
      LATITUD: 18.8665041,
      LONGITUD: -99.9001158,
      SIGNIFICADO: 'Atl «agua», molloni «manar» y yan «lugar»: «Lugar donde mana el agua». Nombrado en honor al presidente Benito Juárez.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 6,
      NOMBRE: 'Almoloya del Río',
      CABECERA: 'Almoloya del Río',
      SUPERFICIE: '16,53',
      ALTITUD: '16,53',
      CLIMA: 'frio',
      LATITUD: 19.16397,
      LONGITUD: -99.4891727,
      SIGNIFICADO: 'Atl «agua», molloni «manar» y yan «lugar»: «Lugar donde mana el agua».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 7,
      NOMBRE: 'Amanalco',
      CABECERA: 'Amanalco de Becerra',
      SUPERFICIE: '222,27',
      ALTITUD: '222,27',
      CLIMA: 'seco',
      LATITUD: 19.2543187,
      LONGITUD: -100.0239514,
      SIGNIFICADO: 'Atl «agua», manalli «estar tendido» y co «en»: «En el estanque».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 8,
      NOMBRE: 'Amatepec',
      CABECERA: 'Amatepec',
      SUPERFICIE: '638,55',
      ALTITUD: '638,55',
      CLIMA: 'templado',
      LATITUD: 18.6996269,
      LONGITUD: -100.3862512,
      SIGNIFICADO: 'Amatl «amate o árbol de papel», tepetl «cerro» y co «en»: «En el cerro de los amates o árboles de papel».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 9,
      NOMBRE: 'Amecameca',
      CABECERA: 'Amecameca de Juárez',
      SUPERFICIE: '189,48',
      ALTITUD: '189,48',
      CLIMA: 'semifrio',
      LATITUD: 19.1257243,
      LONGITUD: -98.7843978,
      SIGNIFICADO: 'Amatl «papel», queme «señalar» y can «lugar»: «Lugar donde los papeles señalan».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 10,
      NOMBRE: 'Apaxco',
      CABECERA: 'Apaxco de Ocampo',
      SUPERFICIE: '75,73',
      ALTITUD: '75,73',
      CLIMA: 'frio',
      LATITUD: 19.9833,
      LONGITUD: -99.1667,
      SIGNIFICADO: 'Atl «agua» y patzca «exprimir»: «Donde se exprime o escurre el agua».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 11,
      NOMBRE: 'Atenco',
      CABECERA: 'San Salvador Atenco',
      SUPERFICIE: '83,8',
      ALTITUD: '83,8',
      CLIMA: 'cálido',
      LATITUD: 19.5514,
      LONGITUD: -98.9161,
      SIGNIFICADO: 'Atl «agua», entli «orilla» y co «en»: «En la orilla del agua».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 12,
      NOMBRE: 'Atizapán',
      CABECERA: 'Santa Cruz Atizapán',
      SUPERFICIE: '6,92',
      ALTITUD: '6,92',
      CLIMA: 'semiárido',
      LATITUD: 19.1770714,
      LONGITUD: -99.4945791,
      SIGNIFICADO: 'Atl «agua», tizatl «tierra o cosa blanca» y pan «sobre»: «En el agua o tierra blanca».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 13,
      NOMBRE: 'Atizapán de Zaragoza',
      CABECERA: 'Ciudad López Mateos',
      SUPERFICIE: '91,07',
      ALTITUD: '91,07',
      CLIMA: 'seco',
      LATITUD: 19.517983,
      LONGITUD: -99.3609684,
      SIGNIFICADO: 'Atl «agua», tizatl «tierra o cosa blanca» y pan «sobre»: «En el agua o tierra blanca». Nombrado en honor al general Ignacio Zaragoza.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 14,
      NOMBRE: 'Atlacomulco',
      CABECERA: 'Atlacomulco de Fabela',
      SUPERFICIE: '267,89',
      ALTITUD: '267,89',
      CLIMA: 'templado',
      LATITUD: 19.7980556,
      LONGITUD: -99.89317,
      SIGNIFICADO: 'Atlacomulli «pozo» y co «en»: «En los pozos».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 15,
      NOMBRE: 'Atlautla',
      CABECERA: 'Atlautla de Victoria',
      SUPERFICIE: '162,06',
      ALTITUD: '162,06',
      CLIMA: 'semifrio',
      LATITUD: 19.03012,
      LONGITUD: -98.7894974,
      SIGNIFICADO: 'Atlautli «barranca», tla «abundancia»: «Donde abundan las barrancas».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 16,
      NOMBRE: 'Axapusco',
      CABECERA: 'Axapusco',
      SUPERFICIE: '230,94',
      ALTITUD: '230,94',
      CLIMA: 'frio',
      LATITUD: 19.7252565,
      LONGITUD: -98.7621809,
      SIGNIFICADO: 'Atl «agua», xapochtli «aljibe»: «En el aljibe de agua».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 17,
      NOMBRE: 'Ayapango',
      CABECERA: 'Ayapango de Gabriel Ramos Millán',
      SUPERFICIE: '36,41',
      ALTITUD: '36,41',
      CLIMA: 'cálido',
      LATITUD: 19.1266022,
      LONGITUD: -98.8136491,
      SIGNIFICADO: 'Ayáhuitl «neblina», pan «sobre» y co «lugar»: «Lugar de neblinas en las alturas».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 18,
      NOMBRE: 'Calimaya',
      CABECERA: 'Calimaya de Díaz González',
      SUPERFICIE: '101,19',
      ALTITUD: '101,19',
      CLIMA: 'semiárido',
      LATITUD: 19.1687371,
      LONGITUD: -99.635865,
      SIGNIFICADO: 'Calli «casa», máitl «mano» y yan «lugar»: «Lugar en que se construyen casas».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 19,
      NOMBRE: 'Capulhuac',
      CABECERA: 'Capulhuac de Mirafuentes',
      SUPERFICIE: '32,25',
      ALTITUD: '32,25',
      CLIMA: 'seco',
      LATITUD: 19.2169304,
      LONGITUD: -99.4562818,
      SIGNIFICADO: 'Capulli «capulín» y apan «canal»: «En el canal de capulines».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 20,
      NOMBRE: 'Coacalco de Berriozábal',
      CABECERA: 'San Francisco Coacalco',
      SUPERFICIE: '35,1',
      ALTITUD: '35,1',
      CLIMA: 'templado',
      LATITUD: 19.6262642,
      LONGITUD: -99.1006278,
      SIGNIFICADO: 'Coatl «serpiente», calli «casa» y co «lugar»: «En la casa de la serpiente». Nombrado en honor al gobernador Felipe Berriozábal.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 21,
      NOMBRE: 'Coatepec Harinas',
      CABECERA: 'Coatepec Harinas',
      SUPERFICIE: '282,36',
      ALTITUD: '282,36',
      CLIMA: 'semifrio',
      LATITUD: 18.9223599,
      LONGITUD: -99.7676931,
      SIGNIFICADO: 'Coatl «serpiente» y tepetl «cerro»: «Cerro de las serpientes». Se le denominó «Harinas» por la producción de este producto en el municipio.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 22,
      NOMBRE: 'Cocotitlán',
      CABECERA: 'Cocotitlán',
      SUPERFICIE: '14,86',
      ALTITUD: '14,86',
      CLIMA: 'frio',
      LATITUD: 19.232597,
      LONGITUD: -98.8642108,
      SIGNIFICADO: 'Cocoh «tórtola», titlán «junto o entre»: «Lugar de tórtolas».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 23,
      NOMBRE: 'Coyotepec',
      CABECERA: 'Coyotepec',
      SUPERFICIE: '49,32',
      ALTITUD: '49,32',
      CLIMA: 'cálido',
      LATITUD: 19.7765924,
      LONGITUD: -99.2092896,
      SIGNIFICADO: 'Coyotl «coyote», tepetl «cerro» y co «en»: «En el cerro del coyote».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 24,
      NOMBRE: 'Cuautitlán',
      CABECERA: 'Cuautitlán',
      SUPERFICIE: '26,32',
      ALTITUD: '26,32',
      CLIMA: 'semiárido',
      LATITUD: 19.6726588,
      LONGITUD: -99.1648692,
      SIGNIFICADO: 'Cuáhutli «árbol» y titlán «junto o entre»: «Entre los árboles».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 25,
      NOMBRE: 'Chalco',
      CABECERA: 'Chalco de Díaz Covarrubias',
      SUPERFICIE: '219,22',
      ALTITUD: '219,22',
      CLIMA: 'seco',
      LATITUD: 19.26244,
      LONGITUD: -98.8969427,
      SIGNIFICADO: 'Challi «borde de lago» y co «en»: «En el borde del lago»',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 26,
      NOMBRE: 'Chapa de Mota',
      CABECERA: 'Chapa de Mota',
      SUPERFICIE: '292,32',
      ALTITUD: '292,32',
      CLIMA: 'templado',
      LATITUD: 19.8140165,
      LONGITUD: -99.5261662,
      SIGNIFICADO: 'Chía «semilla de chía», atl «agua» y pan «lugar»: «En el río de la chía». Nombrado en honor al conquistador Jerónimo Ruiz de la Mota.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 27,
      NOMBRE: 'Chapultepec',
      CABECERA: 'Chapultepec',
      SUPERFICIE: '12,62',
      ALTITUD: '12,62',
      CLIMA: 'semifrio',
      LATITUD: 19.2030655,
      LONGITUD: -99.5478784,
      SIGNIFICADO: 'Chapulli «chapulín», tepetl «cerro» y co «en»: «En el cerro del chapulín».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 28,
      NOMBRE: 'Chiautla',
      CABECERA: 'Chiautla',
      SUPERFICIE: '20,7',
      ALTITUD: '20,7',
      CLIMA: 'frio',
      LATITUD: 19.5490592,
      LONGITUD: -98.8831506,
      SIGNIFICADO: 'Chiauac «grasa» y tla «abundancia»: «Abundancia de piedras grasosas».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 29,
      NOMBRE: 'Chicoloapan',
      CABECERA: 'Chicoloapan de Juárez',
      SUPERFICIE: '53,91',
      ALTITUD: '53,91',
      CLIMA: 'cálido',
      LATITUD: 19.4143591,
      LONGITUD: -98.9062442,
      SIGNIFICADO: 'Chicoltic «Casa torcida», atl «agua» y pan «lugar»: «Lugar donde se tuerce el agua».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 30,
      NOMBRE: 'Chiconcuac',
      CABECERA: 'Chiconcuac de Juárez',
      SUPERFICIE: '6,82',
      ALTITUD: '6,82',
      CLIMA: 'semiárido',
      LATITUD: 19.5610249,
      LONGITUD: -98.8995504,
      SIGNIFICADO: 'Chicome «siete», coatl «serpiente» y co «en»: «En siete Serpientes»',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 31,
      NOMBRE: 'Chimalhuacán',
      CABECERA: 'Chimalhuacán',
      SUPERFICIE: '44,69',
      ALTITUD: '44,69',
      CLIMA: 'seco',
      LATITUD: 19.4314047,
      LONGITUD: -98.9582048,
      SIGNIFICADO: 'Chimalli «escudo o rodela», hua «poseer» y can «lugar»: «Lugar de escudo o rodela»',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 32,
      NOMBRE: 'Donato Guerra',
      CABECERA: 'Villa de Donato Guerra',
      SUPERFICIE: '192,03',
      ALTITUD: '192,03',
      CLIMA: 'templado',
      LATITUD: 19.3110323,
      LONGITUD: -100.1418032,
      SIGNIFICADO: 'Nombrado así en honor al militar Donato Guerra.nota 3​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 33,
      NOMBRE: 'Ecatepec de Morelos',
      CABECERA: 'Ecatepec de Morelos',
      SUPERFICIE: '160,17',
      ALTITUD: '160,17',
      CLIMA: 'semifrio',
      LATITUD: 19.571859,
      LONGITUD: -99.0377048,
      SIGNIFICADO: 'Ecatl «viento, aire», tepetl «cerro» y co «en»: «En el cerro del viento o del aire». Nombrado en honor al insurgente José María Morelos.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 34,
      NOMBRE: 'Ecatzingo',
      CABECERA: 'Ecatzingo de Hidalgo',
      SUPERFICIE: '50,77',
      ALTITUD: '50,77',
      CLIMA: 'frio',
      LATITUD: 18.9683219,
      LONGITUD: -98.7328567,
      SIGNIFICADO: 'Ecatl «viento, aire», tzintli «pequeño» y go «lugar»: «Lugar consagrado al viento».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 35,
      NOMBRE: 'Huehuetoca',
      CABECERA: 'Huehuetoca',
      SUPERFICIE: '118,02',
      ALTITUD: '118,02',
      CLIMA: 'cálido',
      LATITUD: 19.828228,
      LONGITUD: -99.2033265,
      SIGNIFICADO: 'Huehue «viejo» y toca «habla, lengua»: «Lugar de la lengua antigua».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 36,
      NOMBRE: 'Hueypoxtla',
      CABECERA: 'Hueypoxtla',
      SUPERFICIE: '233,91',
      ALTITUD: '233,91',
      CLIMA: 'semiárido',
      LATITUD: 19.950774,
      LONGITUD: -99.04255,
      SIGNIFICADO: 'Huei «grande», pochtecatl «comerciante» y tlan «abundancia»: «Lugar de grandes mercaderes».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 37,
      NOMBRE: 'Huixquilucan',
      CABECERA: 'Huixquilucan de Degollado',
      SUPERFICIE: '140,67',
      ALTITUD: '140,67',
      CLIMA: 'seco',
      LATITUD: 19.371098,
      LONGITUD: -99.3218243,
      SIGNIFICADO: 'Huitzquilitl «cardo comestible», can «lugar»: «Lugar lleno de cardos comestibles».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 38,
      NOMBRE: 'Isidro Fabela',
      CABECERA: 'Tlazala de Fabela',
      SUPERFICIE: '75,79',
      ALTITUD: '75,79',
      CLIMA: 'templado',
      LATITUD: 19.5579234,
      LONGITUD: -99.4168426,
      SIGNIFICADO: 'Nombrado así en honor al político y escritor Isidro Fabela.nota 4​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 39,
      NOMBRE: 'Ixtapaluca',
      CABECERA: 'Ixtapaluca',
      SUPERFICIE: '327,4',
      ALTITUD: '327,4',
      CLIMA: 'semifrio',
      LATITUD: 19.3176558,
      LONGITUD: -98.901606,
      SIGNIFICADO: 'Iztatl «sal», pallutl «mojadura» y can «lugar»: «Lugar donde se moja la sal».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 40,
      NOMBRE: 'Ixtapan de la Sal',
      CABECERA: 'Ixtapan de la Sal',
      SUPERFICIE: '110,75',
      ALTITUD: '110,75',
      CLIMA: 'frio',
      LATITUD: 18.843579,
      LONGITUD: -99.6787811,
      SIGNIFICADO: 'Iztatl «sal» y pan «sobre»: «Sobre la sal».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 41,
      NOMBRE: 'Ixtapan del Oro',
      CABECERA: 'Ixtapan del Oro',
      SUPERFICIE: '101,35',
      ALTITUD: '101,35',
      CLIMA: 'cálido',
      LATITUD: 19.2631287,
      LONGITUD: -100.265173,
      SIGNIFICADO: 'Iztatl «sal» y pan «sobre»: «Sobre la sal». El término «Oro» alude a sus vetas de oro.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 42,
      NOMBRE: 'Ixtlahuaca',
      CABECERA: 'Ixtlahuaca de Rayón',
      SUPERFICIE: '335,85',
      ALTITUD: '335,85',
      CLIMA: 'semiárido',
      LATITUD: 19.5715044,
      LONGITUD: -99.7627696,
      SIGNIFICADO: 'Ixtlahuacan: «Llanura, tierra despoblada de árboles».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 43,
      NOMBRE: 'Xalatlaco',
      CABECERA: 'Xalatlaco',
      SUPERFICIE: '116,47',
      ALTITUD: '116,47',
      CLIMA: 'seco',
      LATITUD: 19.1797624,
      LONGITUD: -99.4200318,
      SIGNIFICADO: 'Xalli «arena», Atlauhtli «barranca» y co «en»: «En la barranca de arena».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 44,
      NOMBRE: 'Jaltenco',
      CABECERA: 'Jaltenco',
      SUPERFICIE: '4,73',
      ALTITUD: '4,73',
      CLIMA: 'templado',
      LATITUD: 19.7542639,
      LONGITUD: -99.0924713,
      SIGNIFICADO: 'Xalli «arena», tentli «labio, orilla» y co «en»: «En la orilla de la arena».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 45,
      NOMBRE: 'Jilotepec',
      CABECERA: 'Jilotepec de Molina Enríquez',
      SUPERFICIE: '583,95',
      ALTITUD: '583,95',
      CLIMA: 'semifrio',
      LATITUD: 19.9516945,
      LONGITUD: -99.535162,
      SIGNIFICADO: 'Xilotl «jilote», tepetl «cerro» y co «en»: «En el cerro de los jilotes».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 46,
      NOMBRE: 'Jilotzingo',
      CABECERA: 'Santa Ana Jilotzingo',
      SUPERFICIE: '119,7',
      ALTITUD: '119,7',
      CLIMA: 'frio',
      LATITUD: 19.4976989,
      LONGITUD: -99.3974672,
      SIGNIFICADO: 'Xilonen —diosa del maíz—, xin «venerar» y co «en»: «Donde se venera a Xilonen».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 47,
      NOMBRE: 'Jiquipilco',
      CABECERA: 'Jiquipilco',
      SUPERFICIE: '272,56',
      ALTITUD: '272,56',
      CLIMA: 'cálido',
      LATITUD: 19.5560943,
      LONGITUD: -99.6073306,
      SIGNIFICADO: 'Xiquipilli «costal, alforja» y co «en»: «Lugar de costales o alforjas».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 48,
      NOMBRE: 'Jocotitlán',
      CABECERA: 'Jocotitlán',
      SUPERFICIE: '277,26',
      ALTITUD: '277,26',
      CLIMA: 'semiárido',
      LATITUD: 19.7091485,
      LONGITUD: -99.7885236,
      SIGNIFICADO: 'Xocotl «fruta agridulce», titlan «entre»: «Entre árboles de fruta ágridulce».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 49,
      NOMBRE: 'Joquicingo',
      CABECERA: 'Joquicingo',
      SUPERFICIE: '63,66',
      ALTITUD: '63,66',
      CLIMA: 'seco',
      LATITUD: 19.0620844,
      LONGITUD: -99.5168927,
      SIGNIFICADO: 'Zoquitl «lodo, barro», tzintli «pequeño» y co «en»: «En el barrialito».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 50,
      NOMBRE: 'Juchitepec',
      CABECERA: 'Juchitepec de Mariano Rivapalacio',
      SUPERFICIE: '140,11',
      ALTITUD: '140,11',
      CLIMA: 'templado',
      LATITUD: 19.0911407,
      LONGITUD: -98.881554,
      SIGNIFICADO: 'Xóchitl «flor» y tepetl «cerro»: «Cerro de las flores».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 51,
      NOMBRE: 'Lerma',
      CABECERA: 'Lerma de Villada',
      SUPERFICIE: '212,83',
      ALTITUD: '212,83',
      CLIMA: 'semifrio',
      LATITUD: 19.2791137,
      LONGITUD: -99.6826821,
      SIGNIFICADO: 'Nombrado así en honor al Duque de Lerma.nota 5​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 52,
      NOMBRE: 'Malinalco',
      CABECERA: 'Malinalco',
      SUPERFICIE: '204,95',
      ALTITUD: '204,95',
      CLIMA: 'frio',
      LATITUD: 18.9474124,
      LONGITUD: -99.5141589,
      SIGNIFICADO: 'Mallinalli —una planta gramínea—, xóchitl «flor» y co «en»: «En donde se venera a Malinalxóchitl, la flor del malinalli».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 53,
      NOMBRE: 'Melchor Ocampo',
      CABECERA: 'Melchor Ocampo',
      SUPERFICIE: '17,78',
      ALTITUD: '17,78',
      CLIMA: 'cálido',
      LATITUD: 19.7067566,
      LONGITUD: -99.1377217,
      SIGNIFICADO: 'Nombrado así en honor al político Melchor Ocampo.nota 6​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 54,
      NOMBRE: 'Metepec',
      CABECERA: 'Metepec',
      SUPERFICIE: '67,52',
      ALTITUD: '67,52',
      CLIMA: 'semiárido',
      LATITUD: 19.2621434,
      LONGITUD: -99.5989735,
      SIGNIFICADO: 'Metl «maguey», tepetl «cerro» y co «en»: «En el cerro de los magueyes».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 55,
      NOMBRE: 'Mexicaltzingo',
      CABECERA: 'San Mateo Mexicaltzingo',
      SUPERFICIE: '11,47',
      ALTITUD: '11,47',
      CLIMA: 'seco',
      LATITUD: 19.2124321,
      LONGITUD: -99.5853272,
      SIGNIFICADO: 'Mexicatl «mexicano», tzintli «reverencia» y co «en»: «En donde habitan los mexicanos distinguidos».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 56,
      NOMBRE: 'Morelos',
      CABECERA: 'San Bartolo Morelos',
      SUPERFICIE: '236,32',
      ALTITUD: '236,32',
      CLIMA: 'templado',
      LATITUD: 19.6833296,
      LONGITUD: -99.6666683,
      SIGNIFICADO: 'Nombrado así en honor al héroe de la independencia José María Morelos.nota 7​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 57,
      NOMBRE: 'Naucalpan de Juárez',
      CABECERA: 'Naucalpan de Juárez',
      SUPERFICIE: '156,63',
      ALTITUD: '156,63',
      CLIMA: 'semifrio',
      LATITUD: 19.4697619,
      LONGITUD: -99.2548994,
      SIGNIFICADO: 'Nahui «cuatro», calli «casa» y pan «en»: «En las cuatro casas». Nombrado así en honor al presidente Benito Juárez.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 58,
      NOMBRE: 'Nezahualcóyotl',
      CABECERA: 'Nezahualcóyotl',
      SUPERFICIE: '63,74',
      ALTITUD: '63,74',
      CLIMA: 'frio',
      LATITUD: 19.4324945,
      LONGITUD: -99.0169328,
      SIGNIFICADO: 'Nezahualo «ayunar» y coyotl «coyote»: «Coyote que ayuna». Nombrado así en honor al rey y poeta Nezahualcóyotl.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 59,
      NOMBRE: 'Nextlalpan',
      CABECERA: 'Santa Ana Nextlalpan',
      SUPERFICIE: '54,51',
      ALTITUD: '54,51',
      CLIMA: 'cálido',
      LATITUD: 19.7320396,
      LONGITUD: -99.067544,
      SIGNIFICADO: 'Nextli «ceniza», tlalli «tierra, suelo» y pan «sobre»: «Sobre el suelo de ceniza».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 60,
      NOMBRE: 'Nicolás Romero',
      CABECERA: 'Villa Nicolás Romero',
      SUPERFICIE: '235,65',
      ALTITUD: '235,65',
      CLIMA: 'semiárido',
      LATITUD: 19.6193,
      LONGITUD: -99.3074185,
      SIGNIFICADO: 'Nombrado así en honor al militar Nicolás Romero.nota 8​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 61,
      NOMBRE: 'Nopaltepec',
      CABECERA: 'Nopaltepec',
      SUPERFICIE: '83,7',
      ALTITUD: '83,7',
      CLIMA: 'seco',
      LATITUD: 19.7777903,
      LONGITUD: -98.7140088,
      SIGNIFICADO: 'Nopalli «nopal», tepetl «cerro» y co «en»: «En el cerro de los nopales».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 62,
      NOMBRE: 'Ocoyoacac',
      CABECERA: 'Ocoyoacac',
      SUPERFICIE: '134,72',
      ALTITUD: '134,72',
      CLIMA: 'templado',
      LATITUD: 19.2699076,
      LONGITUD: -99.4553661,
      SIGNIFICADO: 'Ocotl «ocote, pino», yácatl «nariz, principio» y co «en»: «Donde principian los ocotes o pinos».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 63,
      NOMBRE: 'Ocuilan',
      CABECERA: 'Ocuilan de Arteaga',
      SUPERFICIE: '314,53',
      ALTITUD: '314,53',
      CLIMA: 'semifrio',
      LATITUD: 19.0013496,
      LONGITUD: -99.3993863,
      SIGNIFICADO: 'Oculi «gusano», tla «abundancia»: «Donde abundan los gusanos».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 64,
      NOMBRE: 'El Oro',
      CABECERA: 'El Oro de Hidalgo',
      SUPERFICIE: '137,47',
      ALTITUD: '137,47',
      CLIMA: 'frio',
      LATITUD: 19.8028386,
      LONGITUD: -100.138199,
      SIGNIFICADO: 'Su nombre hace referencia a los yacimientos de oro en la región.nota 9​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 65,
      NOMBRE: 'Otumba',
      CABECERA: 'Otumba de Gómez Farías',
      SUPERFICIE: '195,56',
      ALTITUD: '195,56',
      CLIMA: 'cálido',
      LATITUD: 19.6996778,
      LONGITUD: -98.7531575,
      SIGNIFICADO: 'Otomitl «Jefe de Otomíes» y pan «en, sobre»: «Lugar de otomíes».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 66,
      NOMBRE: 'Otzoloapan',
      CABECERA: 'Otzoloapan',
      SUPERFICIE: '157,43',
      ALTITUD: '157,43',
      CLIMA: 'semiárido',
      LATITUD: 19.1186115,
      LONGITUD: -100.2972304,
      SIGNIFICADO: 'Ocelotl «jaguar» y apan «río»: «Río de los jaguares».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 67,
      NOMBRE: 'Otzolotepec',
      CABECERA: 'Villa Cuauhtémoc',
      SUPERFICIE: '116,67',
      ALTITUD: '116,67',
      CLIMA: 'seco',
      LATITUD: 19.4444342,
      LONGITUD: -99.5338184,
      SIGNIFICADO: 'Ocelotl «jaguar», tepetl «cerro» y co «en»: «En el cerro del jaguar».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 68,
      NOMBRE: 'Ozumba',
      CABECERA: 'Ozumba de Alzate',
      SUPERFICIE: '45,64',
      ALTITUD: '45,64',
      CLIMA: 'templado',
      LATITUD: 19.0161301,
      LONGITUD: -98.80821,
      SIGNIFICADO: 'Atl «agua», tzontli «cabello» y pan «sobre»: «Sobre los cabellos del agua».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 69,
      NOMBRE: 'Papalotla',
      CABECERA: 'Papalotla',
      SUPERFICIE: '3,19',
      ALTITUD: '3,19',
      CLIMA: 'semifrio',
      LATITUD: 19.5610826,
      LONGITUD: -98.8590085,
      SIGNIFICADO: 'Papalotl «mariposa», tla «abundancia, lugar»: «Lugar de mariposas».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 70,
      NOMBRE: 'La Paz',
      CABECERA: 'Los Reyes Acaquilpan',
      SUPERFICIE: '36,36',
      ALTITUD: '36,36',
      CLIMA: 'frio',
      LATITUD: 19.3637572,
      LONGITUD: -98.9519549,
      SIGNIFICADO: 'Recibe este nombre dado que en la época prehispánica, los jefes militares se reunían aquí para firmar los acuerdos de paz.nota 10​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 71,
      NOMBRE: 'Polotitlán',
      CABECERA: 'Polotitlán de la Ilustración',
      SUPERFICIE: '127,49',
      ALTITUD: '127,49',
      CLIMA: 'cálido',
      LATITUD: 20.2189025,
      LONGITUD: -99.8064108,
      SIGNIFICADO: 'Polo —apellido español—, titlán «entre, lugar»: «Lugar de los Polo».nota 11​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 72,
      NOMBRE: 'Rayón',
      CABECERA: 'Santa María Rayón',
      SUPERFICIE: '23,4',
      ALTITUD: '23,4',
      CLIMA: 'semiárido',
      LATITUD: 19.1444,
      LONGITUD: -99.5836,
      SIGNIFICADO: 'Nombrado así en honor al insurgente Ignacio López Rayón.nota 12​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 73,
      NOMBRE: 'San Antonio la Isla',
      CABECERA: 'San Antonio la Isla',
      SUPERFICIE: '18,5',
      ALTITUD: '18,5',
      CLIMA: 'seco',
      LATITUD: 19.1611,
      LONGITUD: -99.5708,
      SIGNIFICADO: 'Nombrado así en honor a San Antonio de Padua.nota 13​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 74,
      NOMBRE: 'San Felipe del Progreso',
      CABECERA: 'San Felipe del Progreso',
      SUPERFICIE: '368,15',
      ALTITUD: '368,15',
      CLIMA: 'templado',
      LATITUD: 19.7128,
      LONGITUD: -99.9519,
      SIGNIFICADO: 'Nombrado así en honor a San Felipe Apóstol. Se le denominó «del Progreso» después de que el pueblo alcanzó la categoría de villa.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 75,
      NOMBRE: 'San Martín de las Pirámides',
      CABECERA: 'San Martín de las Pirámides',
      SUPERFICIE: '67,22',
      ALTITUD: '67,22',
      CLIMA: 'semifrio',
      LATITUD: 19.7,
      LONGITUD: -98.8333,
      SIGNIFICADO: 'Nombrado así en honor a San Martín de Tours. «De las Pirámides» hace referencia a la zona arqueológica que se ubica en su territorio.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 76,
      NOMBRE: 'San Mateo Atenco',
      CABECERA: 'San Mateo Atenco',
      SUPERFICIE: '27,38',
      ALTITUD: '27,38',
      CLIMA: 'frio',
      LATITUD: 19.5474,
      LONGITUD: -99.8516,
      SIGNIFICADO: 'Nombrado así en honor a San Mateo Apóstol. Atenco viene de Atl «agua», entli«orilla» y co «en»: «En la orilla del agua».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 77,
      NOMBRE: 'San Simón de Guerrero',
      CABECERA: 'San Simón de Guerrero',
      SUPERFICIE: '129,23',
      ALTITUD: '129,23',
      CLIMA: 'cálido',
      LATITUD: 19.025,
      LONGITUD: -100.0083,
      SIGNIFICADO: 'Nombrado así en honor a San Simón Apóstol y al presidente Vicente Guerrero.nota 14​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 78,
      NOMBRE: 'Santo Tomás',
      CABECERA: 'Santo Tomás de los Plátanos',
      SUPERFICIE: '104,25',
      ALTITUD: '104,25',
      CLIMA: 'semiárido',
      LATITUD: 18.6833,
      LONGITUD: -100.2778,
      SIGNIFICADO: 'Nombrado así en honor a Tomás el Apóstol.nota 15​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 79,
      NOMBRE: 'Soyaniquilpan de Juárez',
      CABECERA: 'San Francisco Soyaniquilpan',
      SUPERFICIE: '128,8',
      ALTITUD: '128,8',
      CLIMA: 'seco',
      LATITUD: 19.9833,
      LONGITUD: -99.5,
      SIGNIFICADO: 'Tzatzayani «se rompe o hiende», quilit «hierba», atl «agua», pan «en»: «Lugar de agua donde la hierba se rompe o hiende». Nombrado en honor al presidente Benito Juárez.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 80,
      NOMBRE: 'Sultepec',
      CABECERA: 'Sultepec de Pedro Ascencio de Alquisiras',
      SUPERFICIE: '564,04',
      ALTITUD: '564,04',
      CLIMA: 'templado',
      LATITUD: 18.8627911,
      LONGITUD: -99.9750179,
      SIGNIFICADO: 'Zulli «codorniz», tepetl «cerro» y co «en»: «En el cerro de las codornices».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 81,
      NOMBRE: 'Tecámac',
      CABECERA: 'Tecámac de Felipe Villanueva',
      SUPERFICIE: '157,34',
      ALTITUD: '157,34',
      CLIMA: 'semifrio',
      LATITUD: 19.7133413,
      LONGITUD: -98.987542,
      SIGNIFICADO: 'Tetl «piedra», camatl «boca» y co «en»: «En la boca de piedra».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 82,
      NOMBRE: 'Tejupilco',
      CABECERA: 'Tejupilco de Hidalgo',
      SUPERFICIE: '669,13',
      ALTITUD: '669,13',
      CLIMA: 'frio',
      LATITUD: 18.9090983,
      LONGITUD: -100.1675205,
      SIGNIFICADO: 'Texopill «dedos de los pies», co «en»: «En los dedos de los pies».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 83,
      NOMBRE: 'Temamatla',
      CABECERA: 'Temamatla',
      SUPERFICIE: '28,75',
      ALTITUD: '28,75',
      CLIMA: 'cálido',
      LATITUD: 19.2049153,
      LONGITUD: -98.8771393,
      SIGNIFICADO: 'Tetl «piedra», mamatlall «escalera» y tla «abundancia»: «Escalera de piedra».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 84,
      NOMBRE: 'Temascalapa',
      CABECERA: 'Temascalapa',
      SUPERFICIE: '163,8',
      ALTITUD: '163,8',
      CLIMA: 'semiárido',
      LATITUD: 19.8263377,
      LONGITUD: -98.9194072,
      SIGNIFICADO: 'Temazcalli «baño de vapor», atl «agua» y pan «en»: «En los baños de vapor».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 85,
      NOMBRE: 'Temascalcingo',
      CABECERA: 'Temascalcingo de José María Velasco',
      SUPERFICIE: '362,39',
      ALTITUD: '362,39',
      CLIMA: 'seco',
      LATITUD: 19.9221175,
      LONGITUD: -100.0239202,
      SIGNIFICADO: 'Temazcalli «baño de vapor», tzintli «pequeño», co «en»: «En el pequeño baño de vapor».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 86,
      NOMBRE: 'Temascaltepec',
      CABECERA: 'Temascaltepec de González',
      SUPERFICIE: '544,59',
      ALTITUD: '544,59',
      CLIMA: 'templado',
      LATITUD: 19.0458271,
      LONGITUD: -100.0525492,
      SIGNIFICADO: 'Temazcalli «baño de vapor», tepetl «cerro» y co «en»: «En el cerro de los baños de vapor».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 87,
      NOMBRE: 'Temoaya',
      CABECERA: 'Temoaya',
      SUPERFICIE: '190,34',
      ALTITUD: '190,34',
      CLIMA: 'semifrio',
      LATITUD: 19.4685168,
      LONGITUD: -99.6037575,
      SIGNIFICADO: 'Temoa «bajar, descender» y yan «lugar»: «Lugar donde se desciende».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 88,
      NOMBRE: 'Tenancingo',
      CABECERA: 'Tenancingo de Degollado',
      SUPERFICIE: '163,15',
      ALTITUD: '163,15',
      CLIMA: 'frio',
      LATITUD: 18.9632486,
      LONGITUD: -99.6022614,
      SIGNIFICADO: 'Tenamitl «muralla», tzintli «pequeño», co «en»: «Lugar de la pequeña muralla»',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 89,
      NOMBRE: 'Tenango del Aire',
      CABECERA: 'Tenango del Aire',
      SUPERFICIE: '37,77',
      ALTITUD: '37,77',
      CLIMA: 'cálido',
      LATITUD: 19.1559552,
      LONGITUD: -98.8677837,
      SIGNIFICADO: 'Tenamitl «muralla» y co «en»: «Lugar amurallado». «Del Aire» hace referencia a los fuertes vientos existentes en la estación seca.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 90,
      NOMBRE: 'Tenango del Valle',
      CABECERA: 'Tenango de Arista',
      SUPERFICIE: '207,54',
      ALTITUD: '207,54',
      CLIMA: 'semiárido',
      LATITUD: 19.1109089,
      LONGITUD: -99.6047508,
      SIGNIFICADO: 'Teotl «Dios», tenamitl «muralla» y co «en»: «En la muralla sagrada». «Del Valle» indica su ubicación en el Valle de Toluca.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 91,
      NOMBRE: 'Teoloyucan',
      CABECERA: 'Teoloyucan',
      SUPERFICIE: '53,04',
      ALTITUD: '53,04',
      CLIMA: 'seco',
      LATITUD: 19.755485,
      LONGITUD: -99.1893559,
      SIGNIFICADO: 'Tehuilotl «vidrio, cristal de roca», yotl «plenitud» y can «lugar»: «Lugar lleno de vidrio o cristal de roca».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 92,
      NOMBRE: 'Teotihuacán',
      CABECERA: 'Teotihuacán de Arista',
      SUPERFICIE: '83,16',
      ALTITUD: '83,16',
      CLIMA: 'templado',
      LATITUD: 19.6880928,
      LONGITUD: -98.8758635,
      SIGNIFICADO: 'Teotl «Dios», hua «posesivo» y can «lugar»: «Lugar que tiene a nuestros dioses».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 93,
      NOMBRE: 'Tepetlaoxtoc',
      CABECERA: 'Tepetlaoxtoc de Hidalgo',
      SUPERFICIE: '178,37',
      ALTITUD: '178,37',
      CLIMA: 'semifrio',
      LATITUD: 19.5492495,
      LONGITUD: -98.7625797,
      SIGNIFICADO: 'Tepetl «tepetate», ozto «cueva» y co «en»: «En las cuevas de tepetate».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 94,
      NOMBRE: 'Tepetlixpa',
      CABECERA: 'Tepetlixpa',
      SUPERFICIE: '42,98',
      ALTITUD: '42,98',
      CLIMA: 'frio',
      LATITUD: 19.0283173,
      LONGITUD: -98.817753,
      SIGNIFICADO: 'Tepetl «cerro» e ixpan «en la cara o superficie»: «En la cara o superficie del cerro».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 95,
      NOMBRE: 'Tepotzotlán',
      CABECERA: 'Tepotzotlán',
      SUPERFICIE: '187,82',
      ALTITUD: '187,82',
      CLIMA: 'cálido',
      LATITUD: 19.7192648,
      LONGITUD: -99.217524,
      SIGNIFICADO: 'Tepotzotli «joroba» y tlan «entre»: «Entre jorobados».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 96,
      NOMBRE: 'Tequixquiac',
      CABECERA: 'Santiago Tequixquiac',
      SUPERFICIE: '122,32',
      ALTITUD: '122,32',
      CLIMA: 'semiárido',
      LATITUD: 19.9039067,
      LONGITUD: -99.141374,
      SIGNIFICADO: 'Tequixquitl «tequesquite», atl «agua» y co «en»: «En el agua tequesquitosa».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 97,
      NOMBRE: 'Texcaltitlán',
      CABECERA: 'Texcaltitlán',
      SUPERFICIE: '150,66',
      ALTITUD: '150,66',
      CLIMA: 'seco',
      LATITUD: 18.9282503,
      LONGITUD: -99.9417054,
      SIGNIFICADO: 'Texcalli «roca» y titlán «entre»: «Entre las rocas».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 98,
      NOMBRE: 'Texcalyacac',
      CABECERA: 'San Mateo Texcalyacac',
      SUPERFICIE: '24,78',
      ALTITUD: '24,78',
      CLIMA: 'templado',
      LATITUD: 19.1270057,
      LONGITUD: -99.494735,
      SIGNIFICADO: 'Texcalli «pedregal», yacátl «nariz, punta» y con «en»: «En la punta del pedregal».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 99,
      NOMBRE: 'Texcoco',
      CABECERA: 'Texcoco de Mora',
      SUPERFICIE: '432,61',
      ALTITUD: '432,61',
      CLIMA: 'semifrio',
      LATITUD: 19.5089289,
      LONGITUD: -98.8862218,
      SIGNIFICADO: 'Texcalli «peñasco, risco», tlacolt «jarilla» y co «en»: «En la jarilla del risco».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 100,
      NOMBRE: 'Tezoyuca',
      CABECERA: 'Tezoyuca',
      SUPERFICIE: '17,46',
      ALTITUD: '17,46',
      CLIMA: 'frio',
      LATITUD: 19.5089289,
      LONGITUD: -98.8862218,
      SIGNIFICADO: 'Tezontli «tezontle», yotl «plenitud» y can «lugar»: «Lugar lleno de tezontle».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 101,
      NOMBRE: 'Tianguistenco',
      CABECERA: 'Santiago Tianguistenco de Galeana',
      SUPERFICIE: '167,97',
      ALTITUD: '167,97',
      CLIMA: 'cálido',
      LATITUD: 19.1745704,
      LONGITUD: -99.4605193,
      SIGNIFICADO: 'Tianquistli «mercado», tentli «labio, orilla» y co «en»: «En la orilla del mercado».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 102,
      NOMBRE: 'Timilpan',
      CABECERA: 'San Andrés Timilpan',
      SUPERFICIE: '172,81',
      ALTITUD: '172,81',
      CLIMA: 'semiárido',
      LATITUD: 19.8763977,
      LONGITUD: -99.7356023,
      SIGNIFICADO: 'Tetl «piedra», milli «sementera» y pan «sobre, en»: «En la sementera de piedra».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 103,
      NOMBRE: 'Tlalmanalco',
      CABECERA: 'Tlalmanalco de Velázquez',
      SUPERFICIE: '161,57',
      ALTITUD: '161,57',
      CLIMA: 'seco',
      LATITUD: 19.205735,
      LONGITUD: -98.8011942,
      SIGNIFICADO: 'Tlalli «tierra», manalli «aplanada» y co «lugar»: «Lugar de tierra aplanada».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 104,
      NOMBRE: 'Tlalnepantla de Baz',
      CABECERA: 'Tlalnepantla',
      SUPERFICIE: '77,17',
      ALTITUD: '77,17',
      CLIMA: 'templado',
      LATITUD: 19.5464134,
      LONGITUD: -99.1648411,
      SIGNIFICADO: 'Tlalli «tierra», nepantla «en medio»: «En medio de la tierra». Nombrado en honor al gobernador y médico Gustavo Baz Prada.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 105,
      NOMBRE: 'Tlatlaya',
      CABECERA: 'Tlatlaya',
      SUPERFICIE: '791,49',
      ALTITUD: '791,49',
      CLIMA: 'semifrio',
      LATITUD: 18.6168681,
      LONGITUD: -100.2077766,
      SIGNIFICADO: 'Tlatla «arder», yan «lugar»: «Tierra que arde».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 106,
      NOMBRE: 'Toluca',
      CABECERA: 'Toluca de Lerdo',
      SUPERFICIE: '452,371',
      ALTITUD: '452,371',
      CLIMA: 'frio',
      LATITUD: 19.294261,
      LONGITUD: -99.7012546,
      SIGNIFICADO: 'Toloqui «inclinar la cabeza», co «en»: «En donde está el dios Tolo».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 107,
      NOMBRE: 'Tonatico',
      CABECERA: 'Tonatico',
      SUPERFICIE: '91,98',
      ALTITUD: '91,98',
      CLIMA: 'cálido',
      LATITUD: 18.8057529,
      LONGITUD: -99.6763218,
      SIGNIFICADO: 'Tonatiuh «sol», co «lugar»: «Lugar de sol».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 108,
      NOMBRE: 'Tultepec',
      CABECERA: 'Tultepec',
      SUPERFICIE: '27,22',
      ALTITUD: '27,22',
      CLIMA: 'semiárido',
      LATITUD: 19.6882413,
      LONGITUD: -99.1372376,
      SIGNIFICADO: 'Tollin «tule», tepetl «cerro» y co «en»: «En el cerro del tule».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 109,
      NOMBRE: 'Tultitlán',
      CABECERA: 'Tultitlán de Mariano Escobedo',
      SUPERFICIE: '69,15',
      ALTITUD: '69,15',
      CLIMA: 'seco',
      LATITUD: 19.6457412,
      LONGITUD: -99.1825013,
      SIGNIFICADO: 'Tollin «tule», titlán «entre»: «Lugar entre tules».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 110,
      NOMBRE: 'Valle de Bravo',
      CABECERA: 'Valle de Bravo',
      SUPERFICIE: '430,8',
      ALTITUD: '430,8',
      CLIMA: 'templado',
      LATITUD: 19.1820952,
      LONGITUD: -100.1634028,
      SIGNIFICADO: 'Nombrado así en honor al presidente Nicolás Bravo.nota 16​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 111,
      NOMBRE: 'Villa de Allende',
      CABECERA: 'San José Villa de Allende',
      SUPERFICIE: '309,28',
      ALTITUD: '309,28',
      CLIMA: 'semifrio',
      LATITUD: 19.3762014,
      LONGITUD: -100.1537683,
      SIGNIFICADO: 'Nombrado así en honor al héroe de la independencia Ignacio Allende.nota 17​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 112,
      NOMBRE: 'Villa del Carbón',
      CABECERA: 'Villa del Carbón',
      SUPERFICIE: '306,56',
      ALTITUD: '306,56',
      CLIMA: 'frio',
      LATITUD: 19.7317654,
      LONGITUD: -99.4837233,
      SIGNIFICADO: 'Nombrado así en referencia a la producción de carbón en la cabecera municipal.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 113,
      NOMBRE: 'Villa Guerrero',
      CABECERA: 'Villa Guerrero',
      SUPERFICIE: '209,96',
      ALTITUD: '209,96',
      CLIMA: 'cálido',
      LATITUD: 18.9596724,
      LONGITUD: -99.646487,
      SIGNIFICADO: 'Nombrado así en honor al insurgente y presidente Vicente Guerrero.nota 18​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 114,
      NOMBRE: 'Villa Victoria',
      CABECERA: 'Villa Victoria',
      SUPERFICIE: '419,35',
      ALTITUD: '419,35',
      CLIMA: 'semiárido',
      LATITUD: 19.4349173,
      LONGITUD: -100.0050714,
      SIGNIFICADO: 'Nombrado así en honor al primer presidente del país, Guadalupe Victoria.nota 19​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 115,
      NOMBRE: 'Xonacatlán',
      CABECERA: 'Xonacatlán',
      SUPERFICIE: '65,85',
      ALTITUD: '65,85',
      CLIMA: 'seco',
      LATITUD: 19.4096534,
      LONGITUD: -99.5409503,
      SIGNIFICADO: 'Xonacatl «cebolla», tlan «entre»: «Entre las cebollas».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 116,
      NOMBRE: 'Zacazonapan',
      CABECERA: 'Zacazonapan',
      SUPERFICIE: '66,67',
      ALTITUD: '66,67',
      CLIMA: 'templado',
      LATITUD: 19.0742547,
      LONGITUD: -100.2637905,
      SIGNIFICADO: 'Zacatzontetl «césped», atl «agua» y pan «sobre»: «Sobre agua de céspedes».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 117,
      NOMBRE: 'Zacualpan',
      CABECERA: 'Real de Minas Zacualpan',
      SUPERFICIE: '301.47',
      ALTITUD: '301.47',
      CLIMA: 'semifrio',
      LATITUD: 18.7142006,
      LONGITUD: -99.9505567,
      SIGNIFICADO: 'Tzacualli «pirámide» y pan «sobre»: «Sobre la pirámide».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 118,
      NOMBRE: 'Zinacantepec',
      CABECERA: 'San Miguel Zinacantepec',
      SUPERFICIE: '308,62',
      ALTITUD: '308,62',
      CLIMA: 'frio',
      LATITUD: 19.2836398,
      LONGITUD: -99.760454,
      SIGNIFICADO: 'Tzanacan «murciélago», tepetl «cerro» y co «en»: «En el cerro de los murciélagos».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 119,
      NOMBRE: 'Zumpahuacán',
      CABECERA: 'Zumpahuacán',
      SUPERFICIE: '201,18',
      ALTITUD: '201,18',
      CLIMA: 'cálido',
      LATITUD: 18.8367998,
      LONGITUD: -99.5900444,
      SIGNIFICADO: 'Tzompantli «zompantli», hua «poseer» y can «lugar»: «Lugar para guardar los cráneos de los sacrificados».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 120,
      NOMBRE: 'Zumpango',
      CABECERA: 'Zumpango de Ocampo',
      SUPERFICIE: '223,95',
      ALTITUD: '223,95',
      CLIMA: 'semiárido',
      LATITUD: 19.7998188,
      LONGITUD: -99.1246031,
      SIGNIFICADO: 'Tzompantli «zompantli», co «lugar»: «Lugar del zompantli».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 121,
      NOMBRE: 'Cuautitlán Izcalli',
      CABECERA: 'Cuautitlán Izcalli',
      SUPERFICIE: '109,54',
      ALTITUD: '109,54',
      CLIMA: 'seco',
      LATITUD: 19.657687,
      LONGITUD: -99.2958126,
      SIGNIFICADO: 'Cuáhutli «árbol» y titlán «junto o entre»; iz «tu, tuyo» y calli «casa»: «Tu casa entre los árboles».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 122,
      NOMBRE: 'Valle de Chalco Solidaridad',
      CABECERA: 'Xico',
      SUPERFICIE: '46,53',
      ALTITUD: '46,53',
      CLIMA: 'templado',
      LATITUD: 19.2825545,
      LONGITUD: -99.0138998,
      SIGNIFICADO: 'Su nombre se refiere a su ubicación en el valle del antiguo lago de Chalco, y que el poblamiento de la zona se inició gracias al programa «Solidaridad».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 123,
      NOMBRE: 'Luvianos',
      CABECERA: 'Villa Luvianos',
      SUPERFICIE: '703',
      ALTITUD: '703',
      CLIMA: 'semifrio',
      LATITUD: 18.91966,
      LONGITUD: -100.3062969,
      SIGNIFICADO: 'Nombrado así en honor al fundador de Villa Luvianos, Cristóbal Lubiano.nota 20​',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 124,
      NOMBRE: 'San José del Rincón',
      CABECERA: 'San José del Rincón',
      SUPERFICIE: '492,25',
      ALTITUD: '492,25',
      CLIMA: 'frio',
      LATITUD: 19.6359544,
      LONGITUD: -100.2813478,
      SIGNIFICADO: 'Nombrado así en honor a San José. «Del Rincón» hace referencia al difícil acceso y relativo aislamiento de su cabecera municipal.',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
    {
      IGECEM: 125,
      NOMBRE: 'Tonanitla',
      CABECERA: 'Santa María Tonanitla',
      SUPERFICIE: '8,47',
      ALTITUD: '8,47',
      CLIMA: 'cálido',
      LATITUD: 19.6798286,
      LONGITUD: -99.0763197,
      SIGNIFICADO: 'Tonantzin «Nuestra madre» y tlan «lugar»: «Lugar de nuestra madre».',
      inundacionCheck: false,
      deslaveCheck: false,
      sismoCheck: false,
      incendioCheck: false,
      vocanesCheck: false,
      derrumbesCheck: false
    },
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
    this.admin = AppComponent.admin;
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
  addFull(){
    for (let x=0; x< this.mun.length;x++){
      this.new(this.mun[x]);
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
