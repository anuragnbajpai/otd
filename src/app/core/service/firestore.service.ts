import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {
  }

  getCollection(name) {
    return this.firestore.collection(name).snapshotChanges();
  }

  getCollectionCondition(name, where) {
    return this.firestore.collection(name, where).snapshotChanges();
  }
  getDocument(name, id){
    return this.firestore.collection(name).doc(id).snapshotChanges();
  }

  createItem(name, item) {
    const guid = this.firestore.createId();
    this.firestore.collection(name).doc(guid).set( { id: guid, ...item});
    return guid;
   // return this.firestore.collection(name).add(item);
  }
  createDocument(name, id , item){
    const guid = this.firestore.createId();
    this.firestore.collection(name).doc(guid).set(item);
    return guid;
  }
  updateItem(name, item) {
  //  delete item.id;
    this.firestore.doc(name + '/' + item.id).update(item);
  }
  updateDocument(name,id, item) {
    // delete item.id;
    this.firestore.collection(name).doc(id).update( {images: item} );
  }


  deleteItem(name , id: string) {
    this.firestore.doc(name + '/' + id).delete();
  }
  
  // getCategory() {
  //   return this.firestore.collection('categories').snapshotChanges();
  // }
  // getSearchResult(name, where) {
  //   return this.firestore.collection(name, where).snapshotChanges();
  // }

  updateImages(name,id, images) {
    // delete item.id;
    this.firestore.collection(name).doc(id).set( { images });
  }

  updateDeals(name,id, deals) {
    // delete item.id;
    this.firestore.collection(name).doc(id).set( { deals });
  }

  updateReviews(name, id, reviews) {
    // delete item.id;
    this.firestore.collection(name).doc(id).set( { reviews });
  }


  
}
