import {Component, OnInit} from '@angular/core';
import {FirestoreService} from '../../services/firestore/firestore.service';


@Component({
  selector: 'app-users',

  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users = [];

  constructor(
    private firestoreService: FirestoreService
  ) {
  }

  ngOnInit() {
    this.firestoreService.getUsers().subscribe((usersSnapshot) => {
      this.users = [];
      usersSnapshot.forEach((userData: any) => {


        this.users.push({
          id: userData.payload.doc.id,
          data: userData.payload.doc.data()
        });
        console.log(usersSnapshot);
        console.log(this.users);
      });
    });
  }
}
