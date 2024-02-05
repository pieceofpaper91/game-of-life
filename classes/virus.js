const LivingCreature = require("./LivingCreature.js");
const RasenDestroyer = require("./rasendestroyer.js");
const functions = require('./Setup.js');
const Gras = require("./gras.js");
module.exports = class virus extends LivingCreature{
    energie = 15
    constructor(z,s) {
      super(z, s)
      this.platziereSelbstInMatrix();
    }
    platziereSelbstInMatrix() {
        matrix[this.zeile][this.spalte] = 3;
    };
    spielzug() {
      if (this.energie > 60) {
        this.werdegesund();
      } else {
        this.stecke_an()
        this.machSchritt("no", VirusArr, virus)
        super.updateUmgebung()
      }


    };
    werdegesund () {
      let result = Math.floor(Math.random()*3)
      if(result == 0){
        functions.löschObjekt(this.zeile,this.spalte,VirusArr,2);
        RasenDestroyerArr.push(new RasenDestroyer(this.zeile,this.spalte))
      } else if(result == 1){
        functions.löschObjekt(this.zeile,this.spalte,VirusArr, 1);
        GrasArr.push(new Gras(this.zeile,this.spalte))
      } else{
        this.energie = 0
      }
    }
    stecke_an(){
      let gefaerdeteUmgebung = []
        functions.initUmgebung(2,this.zeile,this.spalte,gefaerdeteUmgebung);
        let gefaerdeteUmgebungGefiltert = [];
        for (let i = 0; i < 24; i++) {
          //console.log(i)
            let koordinate = gefaerdeteUmgebung[i]
            let zeile = koordinate[0]
            let spalte = koordinate[1]
            if (functions.isPosVal(koordinate)) {
              if (matrix[zeile][spalte] === 2 || matrix[zeile][spalte] === 4) {
                functions.löschObjekt(koordinate[0],koordinate[1], RasenDestroyerArr,3);
                VirusArr.push(new virus(zeile,spalte));
                gefaerdeteUmgebungGefiltert.push(koordinate);
              }
          }
        };
          for (let i = 0; i < gefaerdeteUmgebungGefiltert.length; i++){
          let koordinate = gefaerdeteUmgebungGefiltert[i]
          functions.löschObjekt(koordinate[0],koordinate[1],RasenDestroyerArr,3);
          VirusArr.push(new virus(koordinate[0],koordinate[1]));
        }
    }
}

