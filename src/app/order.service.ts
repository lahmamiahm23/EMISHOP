import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, getDoc, QuerySnapshot, DocumentSnapshot } from '@angular/fire/firestore';
import { Orders } from './orders';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 private orderCollection = collection(this.firestore , 'commandes');

  constructor(private firestore: Firestore, private auth: Auth) {}

  async addOrder(order: Orders) {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      order.userId = currentUser.uid;
      return await addDoc(this.orderCollection, order);
    } else {
      throw new Error('Utilisateur non authentifié');
    }
  }

  // Récupérer les commandes de l'utilisateur actuel
  async getUserOrders(): Promise<Orders[]> {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      const q = query(this.orderCollection, where('userId', '==', currentUser.uid));
      const snapshot: QuerySnapshot = await getDocs(q);  // Type explicite pour snapshot
      return snapshot.docs.map((doc: DocumentSnapshot) => ({ id: doc.id, ...doc.data() as Orders }));  // Type explicite pour doc
    } else {
      throw new Error('Utilisateur non authentifié');
    }
  }

  // Récupérer toutes les commandes (pour l'admin, par exemple)
  getOrders() {
    return getDocs(this.orderCollection);
  }

  // Récupérer une commande par ID
  getOrderById(id: string) {
    const orderDoc = doc(this.firestore, `commandes/${id}`);
    return getDoc(orderDoc);
  }

  // Mettre à jour une commande
  updateOrder(id: string, data: Partial<Orders>) {
    const orderDoc = doc(this.firestore, `commandes/${id}`);
    return updateDoc(orderDoc, data);
  }

  // Supprimer une commande
  deleteOrder(id: string) {
    const orderDoc = doc(this.firestore, `commandes/${id}`);
    return deleteDoc(orderDoc);
  }
}
