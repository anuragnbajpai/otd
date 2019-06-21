import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore, private fireStorage: AngularFireStorage) {
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

  addArrayItem(name, id, item){
    this.firestore.collection(name).doc(id).update( {
      name: firebase.firestore.FieldValue.arrayUnion(item)
    } );
  }
  deleteArrayItem(name, id, item){
    this.firestore.collection(name).doc(id).update( {
      name: firebase.firestore.FieldValue.arrayRemove(item)
    } );
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

  updateReports(name, id, reports) {
    this.firestore.collection(name).doc(id).set( { reports });
  }

  updateAvgRating(id, rating){
    this.firestore.collection('products').doc(id).update( { avgRating: rating });
  }

  getServerDate(){
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    return timestamp;
  }

  uploadImage(link, file){
    try{
      const guid = this.firestore.createId();
      let fileRef = this.fireStorage.ref(link + guid );
      // fileRef.put(file).then(response=>{
      //   console.log(response);
      // }).catch(error=>{
      //   console.log(error);
      // });
      let task = fileRef.put(file);
      let uploadProgress = task.percentageChanges();
      return task.snapshotChanges().pipe(
        map(() => fileRef.getDownloadURL() )
      );
      // .subscribe(t => {
      //   t.subscribe(url => {
      //     console.log(url);
      //     return url;
      //   });
      //   console.log(t);
      // });
 
    } catch(e){
      console.log(e);
  } 
}
}
