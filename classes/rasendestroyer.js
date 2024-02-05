const functions = require('./Setup.js')
const LivingCreature = require("./LivingCreature.js");
module.exports = class RasenDestroyer extends LivingCreature {
    energie = 15;
    constructor(z,s) {
      super(z, s)
      this.geschlecht = Math.floor(Math.random() * 2)
      this.platziereSelbstInMatrix()
      this.vermehrungsRate()
    }
    platziereSelbstInMatrix() {
      if(this.geschlecht == 0){
        matrix[this.zeile][this.spalte] = 2;
      }
      else{
        matrix[this.zeile][this.spalte] = 4;
      }
    };
    vermehrungsRate(){
      this.vermehrung = 0
      if(this.geschlecht == 0){
        this.vermehrung = 40
      }
      else{
        this.vermehrung = 30
      }
      return this.vermehrung
    }
    spielzug() {
      if (this.energie > this.vermehrung) {
        this.platzierNeuesObjekt();
        this.energie = 15;
      } else if (this.energie > 0) {
        // this.machSchritt();
        this.machSchritt("yes", RasenDestroyerArr, RasenDestroyer)
      } else {
        functions.löschObjekt(this.zeile,this.spalte,RasenDestroyerArr, 0);
      }
      this.updateUmgebung()
    };
    platzierNeuesObjekt() {
      let umgebungGefiltert = this.umgebungFiltern(0);
         if(umgebungGefiltert.length > 0){
          let pos = functions.randPos(umgebungGefiltert)
          RasenDestroyerArr.push(new RasenDestroyer(pos[0], pos[1]));
         }
        return;
    }
};