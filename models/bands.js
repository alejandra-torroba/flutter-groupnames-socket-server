const Band = require('./band');

class Bands{

    constructor(){
        this.bands = [];
    }

    addBand( band = new Band() ){            // AGREGAR UNA NUEVA BANDA
        this.bands.push( band );
    }

    getBands(){                             // OBTENEMOS LAS BANDAS
        return this.bands;
    }

    deleteBands( id = ''){                  // ELIMINAMOS UNA BANDA
        this.bands = this.bands.filter( band => band.id !== id );
        return this.bands;
    }

    voteBand(id = ''){                      // VOTAMOS POR UNA BANDA
        this.bands = this.bands.map( band => {
            if(band.id === id){
                band.votes++;
                return band;
            } else {
                return band;
            }
        });
    }
}


module.exports = Bands;