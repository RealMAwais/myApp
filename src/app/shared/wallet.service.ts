import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Wallet {
  userId: string;
  balance: number;
}

@Injectable({
  providedIn: 'root'
})

export class WalletService {
  constructor(private firebaseDb: AngularFireDatabase) { }

  getWallet(userId: string): Observable<Wallet | null> {
    return this.firebaseDb.object<Wallet>(`wallets/${userId}`).valueChanges();
  }

  topUp(userId: string, amount: number): void {
    // this.firebaseDb.object(`wallets/${userId}`).update({ balance: amount });
    this.firebaseDb.object(`wallets/${userId}/balance`).query.ref.transaction(currentBalance => (currentBalance || 0) + amount);
  }

  withdraw(userId: string, amount: number): void {
    this.firebaseDb.object(`wallets/${userId}/balance`).query.ref.transaction(currentBalance => {
      const newBalance = (currentBalance || 0) - amount;
      return newBalance >= 0 ? newBalance : currentBalance;
    });
  }
  // makeTransaction(userId: string, amount: number): void {
  //   this.firebaseDb.object(`wallets/${userId}/balance`).query.ref.transaction(currentBalance => {
  //     const newBalance = (currentBalance || 0) - amount;
  //     return newBalance >= 0 ? newBalance : currentBalance;
  //   });
  // }
}
