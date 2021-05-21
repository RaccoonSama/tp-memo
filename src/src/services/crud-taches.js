import firebase from 'firebase/app';
import { collUtil, collTaches } from './config';
import { instanceFirestore } from './firebase-initialisation';

/**
 * Créer une nouvelle tâche pour l'utilisateur connecté
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @param {Object} tache document à ajouter aux tâches de l'utilisateur
 * @returns {Promise<null>} Promesse sans paramètre
 */
export async function creer(uid, tache) {
  // On ajoute la propriété 'date' à l'objet représentant la tâche en prenant la 
  // date du serveur Firestore.
  tache.date = firebase.firestore.FieldValue.serverTimestamp();
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
    .add(tache).then(
      tacheRef => tacheRef.get()
    );
}

/**
 * Obtenir toutes les tâches d'un utilisateur
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @returns {Promise<any[]>} Promesse avec le tableau des tâches
 */
 export async function lireTout(uid, filtre) {
  console.log("Valeur du filtre:", filtre);
  const taches = [];
  if(filtre === 'toutes'){ 
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
  /*.where('completee', '==', true)*/
  /*.where('completee', '==', false)*/
  .orderBy('date','desc')
  .get().then(
    reponse => reponse.forEach(
      doc => {
        taches.push({id: doc.id, ...doc.data()})
      }
    )
  ).then(
    () => taches
  );
}else if(filtre === true){
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
  .where('completee', '==', true)
  /*.where('completee', '==', false)*/
  .orderBy('date','desc')
  .get().then(
  reponse => reponse.forEach(
    doc => {
      taches.push({id: doc.id, ...doc.data()})
    }
  )
  ).then(
    () => taches
  );
}else{
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
/*.where('completee', '==', true)*/
.where('completee', '==', false)
.orderBy('date','desc')
.get().then(
  reponse => reponse.forEach(
    doc => {
      taches.push({id: doc.id, ...doc.data()})
    }
  )
).then(
  () => taches
);
}
}

export async function supprimer(uidUtil, idTache) {
  return instanceFirestore.collection(collUtil).doc(uidUtil).collection(collTaches).doc(idTache).delete();
}

export async function modifier(uidUtil, idTache, updates) {
  return instanceFirestore.collection(collUtil).doc(uidUtil).collection(collTaches).doc(idTache).update(updates);
}

export async function supprimerTout(uidUtil){
  return instanceFirestore.collection(collUtil).doc(uidUtil).collection(collTaches)
  .where('completee', '==', true)
  .get().then(
    (querySnapshot) => {
      var batch = instanceFirestore.batch();
      querySnapshot.forEach((doc) =>  {
        batch.delete(doc.ref);
      })
      return batch.commit();
    });
    }
  


export async function size(uidUtil) {
  return instanceFirestore.collection(collUtil).doc(uidUtil).collection(collTaches)
  .where('completee', '==', false).get()
}