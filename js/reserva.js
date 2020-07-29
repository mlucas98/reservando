class Reserva {
    constructor(date, cantPersonas, precioXPersona, codDesc) {
        this.horario = date;
        this.cantidadPersonas = cantPersonas;
        this.precioXPersona = precioXPersona;
        this.codigoDescuento = codDesc;
        this.adicionales = 0;
        this.desc200 = false;
        this.descuentoFinal = 0;
    }


    descPersonas = function () {
        if (4 <= this.cantidadPersonas && this.cantidadPersonas <= 6) {
            this.descuentoFinal += 5;
        }
        else if (7 <= this.cantidadPersonas && this.cantidadPersonas <= 8) {
            this.descuentoFinal += 10;
        }
        else if (8 < this.cantidadPersonas) {
            this.descuentoFinal += 15;
        }
        return this.descuentoFinal;
    }
    descCodigo = function () {
        switch (this.codigoDescuento) {
            case 'DES15':
                this.descuentoFinal += 15;
                break;
            case 'DES1':
                this.cantidadPersonas--;
                break;
            case 'DES200':
                this.desc200 = true;
                break;
            default:
                return;
        }
    }
    calcularPorcentaje = function (descuento) {
        return (100 - descuento) / 100;
    }
    calcularAdicionales = function () {
        let dia = this.horario.getDay();
        let hora = this.horario.getHours();
        if((hora >= 13 && hora <= 14) || (hora >= 20 && hora <= 21)){
            this.adicionales -=5
        }
        if(dia == 4 || dia == 5 || dia == 6){
            this.adicionales -= 10
        }
        return this.adicionales
    }
    precioBase = function(){
        return this.cantidadPersonas*this.precioXPersona;
    }
    precioReserva = function () {
        this.descPersonas();
        this.descCodigo();
        this.calcularAdicionales();
        let adicional = this.calcularPorcentaje(this.adicionales);
        let descuento = this.calcularPorcentaje(this.descuentoFinal);
        let precio = (this.cantidadPersonas * this.precioXPersona) * descuento * adicional;
        if(this.desc200){
            precio-= 200;
        }
        // console.log(precio);
        // console.log(this.cantidadPersonas+' '+this.precioXPersona+' '+this.calcularPorcentaje(this.adicionales)+' '+this.calcularPorcentaje(this.descuentoFinal));
        return precio;
    }
}

