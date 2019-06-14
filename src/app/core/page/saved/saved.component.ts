import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FirestoreService } from '../../service/firestore.service';
import { User } from '../../model/Session.model';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  users: User[];
  constructor(private svcFirestore: FirestoreService) {
    this.svcFirestore.getCollection('users').subscribe(u => {
      this.users = u.map(e => e.payload.doc.data()) as User[];
    });
  }

  ngOnInit() {
  }

  updateProducts() {
    const where = ref => ref.where('category', '==', 'Cameras');

    this.svcFirestore.getCollectionCondition('products', where).pipe(take(1)).subscribe(data => {
      console.log(data.length);

      data.map(e => {

         // update tags
          let d = {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
            tags: [e.payload.doc.data()['category'].toLowerCase(), e.payload.doc.data()['brand'].toLowerCase(),
                  e.payload.doc.data()['title'].toLowerCase()],
            price: { 'us': e.payload.doc.data()['price'], 'ca': 0, 'in': 0 }
          } as any;

          this.svcFirestore.updateItem('products', d);

        // update images

          this.svcFirestore.getDocument('images', e.payload.doc.id).pipe(take(1)).subscribe((i: any) => {
          console.log(i.payload.data());
          let images = [];
          i.payload.data().images.forEach(element => {
            console.log(element);
            let user = this.users[Math.floor((Math.random() * 10) % 5)];
            images.push({
              ...element,
              userId: user.id,
              userPicture: user.picture,
              userName: user.name,
              review: {
                liked: Array.from({ length: Math.floor(Math.random() * 30) }, () => Math.floor(Math.random() * 100).toString()),
                unliked: Array.from({ length: Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 100).toString())
              }
            });
          });
          console.log(images);
          this.svcFirestore.updateImages('images', e.payload.doc.id, images);
        });

           // update deals

          this.svcFirestore.getDocument('deals', e.payload.doc.id).pipe(take(1)).subscribe((d: any) => {
            console.log(d.payload.data());
            let deals = [];
            d.payload.data().deals.forEach(element => {
              console.log(element);
              let user = this.users[Math.floor((Math.random() * 10) % 5)];
              deals.push({
                ...element,
                userId: user.id,
                userPicture: user.picture,
                userName: user.name,
                review: {
                  liked: Array.from({ length: Math.floor(Math.random() * 100) }, () => Math.floor(Math.random() * 100).toString()),
                  unliked: Array.from({ length: Math.floor(Math.random() * 30) }, () => Math.floor(Math.random() * 100).toString())
                }
              });
            });
            console.log(deals);
            this.svcFirestore.updateDeals('deals', e.payload.doc.id + '-us', deals);
          });

           // update review

          this.svcFirestore.getDocument('reviews', e.payload.doc.id).pipe(take(1)).subscribe((r: any) => {
            console.log(r.payload.data());
            let reviews = [];
            r.payload.data().reviews.forEach(element => {
              console.log(element);
              let user = this.users[Math.floor((Math.random() * 10) % 5)];
              reviews.push({
                ...element,
                userId: user.id,
                userPicture: user.picture,
                userName: user.name,
                review: {
                  liked: Array.from({ length: Math.floor(Math.random() * 30) }, () => Math.floor(Math.random() * 100).toString()),
                  unliked: Array.from({ length: Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 100).toString())
                }
              });
            });
            console.log(reviews);
            this.svcFirestore.updateReviews('reviews', e.payload.doc.id, reviews);
          });

      });
    });
  }

}
