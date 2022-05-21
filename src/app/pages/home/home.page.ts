import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, Platform } from '@ionic/angular';
import * as Phaser from 'phaser';
import { TitleScene } from './menu';
import { GameScene } from './game';
import { cleanUpScene } from './game1';
import { debug } from 'console';
import { FriendScene } from './friends';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { GameOverScene } from './gameover';
import { Itens } from 'src/app/interfaces/itens';
import { map } from 'rxjs/operators';
import { workScene } from './game2';
import { NgIf } from '@angular/common';
import {global} from "./global";
import { ShopScene } from './shop';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit,OnDestroy {
 
  
  static hp2 = 20;
  

 
  

  private loading: any;
  private VarSave:AngularFirestoreCollection<Itens>
   ishidden = global.loginState;
   ishidden1 =global.loginState; ;
  config: Phaser.Types.Core.GameConfig;
  
  public game: Phaser.Game;
  static test = true;
  constructor( 
    private authService:AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private angularFirestore:AngularFirestore,
    private plt: Platform
     
  

    ) {
      this.VarSave =this.angularFirestore.collection<Itens>("Var");
          
      this.config = {
        type: Phaser.AUTO,
        width: 500,
        height: 800,
        // width: this.plt.width(),
        // height: this.plt.height(),
         


        parent: 'gameContainer',
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0},
            debug: false
          }
        },
        scene: [ TitleScene, GameScene, cleanUpScene,FriendScene,GameOverScene,workScene,ShopScene ]
        
       
      };
      



     }

  ngOnInit() {
    this.game = new Phaser.Game(this.config);
    
 

  }
  ngOnDestroy() {
    this.game.destroy(true, false);
  }
  


 async logout(){
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }

  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
  test()
  {
    return this.ishidden=global.loginState
  }
  test1()
  {
    return this.ishidden1=global.loginState1
  }
  press()
  {
    return global.pressBack =true;
  }
  

  insert(itens:Itens)
  {
    

  }

  
  updateVar(hp:number,clean:number,coins:number,itens:Itens)
  {

  }
  getItens()
  {
    return this.VarSave.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
  

 

}
