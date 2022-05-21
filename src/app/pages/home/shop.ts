import * as Phaser from 'phaser';

import { debug } from 'console';

export class ShopScene extends Phaser.Scene{
    bg;
    music;
  clean: any;
  life: any;
  coins: any;
  coinText: Phaser.GameObjects.Text;
  
    init (data)
    {
        console.log('init', data);
        this.clean = data.clean;
        this.life = data.hp;
        this.coins = data.coins;
    }
 
    constructor() {
        super({ key: 'shop' });
      }
     
     
      preload() {
        this.load.setPath('./assets/Game');
        this.load.image('shop', 'shop.jpg');
        this.load.image('buttonshop1', 'button_voltar.png');
        this.load.audio('friendaudio', 'liro.mp3');
        
    }

        
        create(){
         
        
            //set background
          this.add.image(250, 400, 'shop');
          this.makeButton(410,35,1);
         
          this.coinText = this.add.text(120,84, '', { font: '30px Arial', fill: '#835fd2' });
          this.coinText.setText(''+this.coins);
          
            
        this.music=  this.sound.add('friendaudio');
        this.music.loop = true; // This is what you are lookig for
        this.music.play();
         }
        
        
     
        makeButton(xx,yy,index)
        {
          
           let button =this.add.image(xx,yy,"buttonshop"+ index);
          
           button.setInteractive();
        
           button.on('pointerdown', this.doSomething.bind(this))
           
           return button;
        }
        doSomething()
        {         
          this.music.stop();
            this.scene.start('menu',{ life: this.life ,clean:this.clean,coins:this.coins})
      
        }
        
       


    }