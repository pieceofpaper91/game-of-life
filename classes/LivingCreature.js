const functions = require('./Setup.js')

module.exports = class LivingCreature{
    constructor(z, s){
        this.zeile = z;
        this.spalte = s;
        
        this.umgebung = []
        functions.initUmgebung(1,this.zeile,this.spalte,this.umgebung);
    }
    updateUmgebung(){
        this.umgebung = []
        functions.initUmgebung(1,this.zeile,this.spalte,this.umgebung);
    }
    umgebungFiltern(target){
        let umgebungGefiltert = [];
        for (let i = 0; i < this.umgebung.length; i++) {
            let koordinate = this.umgebung[i]
            let zeile = koordinate[0]
            let spalte = koordinate[1]
            if (functions.isPosVal(koordinate)) {
                if (matrix[zeile][spalte] === target) {
                    umgebungGefiltert.push(koordinate);
                }
            }
        };
        return umgebungGefiltert
    }

    moveTo(pos) {
        matrix[this.zeile][this.spalte] = 0
        this.zeile = pos[0]
        this.spalte = pos[1]
        functions.löschObjekt(this.zeile, this.spalte, GrasArr, 0)
        this.platziereSelbstInMatrix()
        return;
    }
    machSchritt(index, array, type){
        let umgebungGefiltert = this.umgebungFiltern(1)
        if(umgebungGefiltert.length > 0){
          let pos = functions.randPos(umgebungGefiltert)
          this.moveTo(pos);
          this.energie++
        } else if(index == "yes"){
            this.energie--
        }
        return;
    }
}

