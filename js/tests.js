var expect = chai.expect;
//Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.
describe('Test reservarHorario()', function() {
    it('Al reservarse un horario en un rstrt, dicho horario debe ser eliminado del arreglo', function(){
        let restaurant = new Restaurant(25, "Restaurant Test", "Pizza", "Roma", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [8, 5, 5, 6, 5]);
        restaurant.reservarHorario('15:00');
        //expect(restaurant.horarios[0]).to.eql('15:30').but.not.equal('13:00');
        expect(restaurant.horarios).that.does.not.include('15:00');
    })
    it('Cuando se reserva un horario que el rstrt no tiene, el arreglo permanece idéntico', function(){
        let restaurant = new Restaurant(25, "Restaurant Test", "Pizza", "Roma", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [8, 5, 5, 6, 5]);
        let horariosSinModificar = restaurant.horarios.length;
        restaurant.reservarHorario('17:00');
        expect(restaurant.horarios.length).to.equal(horariosSinModificar);
        expect(restaurant.horarios).to.eql(['21:00', '22:30', '15:00']);
    })
    it('Cuando se intenta reservar sin horario, el arreglo permanece idéntico', function(){
        let restaurant = new Restaurant(25, "Restaurant Test", "Pizza", "Roma", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [8, 5, 5, 6, 5]);       
        let horariosSinModificar = restaurant.horarios.length;
        restaurant.reservarHorario();
        expect(restaurant.horarios.length).to.equal(horariosSinModificar);
    })    
})

describe('Test obtenerPuntuación()', function(){
    it('Con las calificaciones de un rstrt, el promedio debe ser correcto', function(){   
        let restaurant = new Restaurant(25, "Restaurant Test", "Pizza", "Roma", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [8, 5, 5, 6, 5]);
        expect(restaurant.obtenerPuntuacion()).to.equal(5.8);
    })
    it('Un rstrt sin calificaciones, debería tener promedio 0', function(){
        let restaurant = new Restaurant(25, "Restaurant Test", "Pizza", "Roma", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", []);
        expect(restaurant.obtenerPuntuacion()).to.equal(0);
    })
})

describe('Test calificar()', function(){
    it('Al agregar una calificación inválida, el arreglo no debería inmutarse', function(){        
        let restaurant = new Restaurant(25, "Restaurant Test", "Pizza", "Roma", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [8, 5, 5, 6, 5]);
        let largoCalificacionesAnterior = restaurant.calificaciones.length;
        restaurant.calificar(12);
        expect(restaurant.calificaciones.length).to.equal(largoCalificacionesAnterior);

    })
    it('Al agregar una nueva calificación, debería incluirse en el arreglo de calificaciones', function(){
        let restaurant = new Restaurant(25, "Restaurant Test", "Pizza", "Roma", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [8, 5, 5, 6, 5]);
        restaurant.calificar(9);
        expect(restaurant.calificaciones[restaurant.calificaciones.length-1]).to.equal(9);
    })
    it('Al agregar una nueva calificación vacía, el arreglo no debería inmutarse', function(){
        let restaurant = new Restaurant(25, "Restaurant Test", "Pizza", "Roma", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [8, 5, 5, 6, 5]);
        let largoCalificacionesAnterior = restaurant.calificaciones.length;
        restaurant.calificar();
        expect(restaurant.calificaciones.length).to.equal(largoCalificacionesAnterior);

    })
})

describe('Test buscarRestaurante', function(){
    it('Buscando un restaurante por id, el resultado debe coincidir con lo esperado', function(){
        let restaurante= listado.buscarRestaurante(4);
        expect(restaurante.nombre).to.equal('Bleecker Street Pizza');
    })
    it('Buscando un restaurante con un id incorrecto, debería devoler un mensaje de que no se encontró ningún restaurant', function(){
        let restaurante = listado.buscarRestaurante(0);
        expect(restaurante).to.be.a('string', 'No se ha encontrado ningún restaurant');
    })
})

describe('Test obtenerRestaurantes()', function(){
    it('Filtros nulos a excepción de Rubro', function(){
        let arregloResultado = listado.obtenerRestaurantes('Ensalada', null, null);
        expect(arregloResultado.length).to.eql(4);
        expect(arregloResultado[2].rubro).to.equal('Ensalada');
    })
    it('Filtros nulos a excepción de Ciudad', function(){
        let arregloResultado = listado.obtenerRestaurantes(null, 'Nueva York', null);
        expect(arregloResultado.length).to.eql(7);
        expect(arregloResultado[6].ubicacion).to.equal('Nueva York');
    })
    it('Filtros nulos a excepción de Horario', function(){
        let arregloResultado = listado.obtenerRestaurantes(null, null, '12:00');
        expect(arregloResultado.length).to.eql(11);
        expect(arregloResultado[9].horarios).to.include('12:00');
    })
    it('Utilización de los 3 filtros en simultáneo', function(){
        let arregloResultado = listado.obtenerRestaurantes('Asiática', 'Nueva York', '13:00');
        expect(arregloResultado[0].nombre).to.eql('TAO Uptown');
    })
    it('Utilización de 2 de los filtros', function(){
        let arregloResultado = listado.obtenerRestaurantes(null, 'Londres', '15:00');
        expect(arregloResultado[0].nombre).to.equal('Mandarín Kitchen');
    })
})

describe('Testeo del objeto Reserva', function(){
    it('Test precio base', function(){
        let nuevaReserva = new Reserva('', 3, 450);
        let precio = nuevaReserva.precioBase();
        expect(precio).to.equal(1350);
    })
    it('Reserva ejemplo', function(){
        let nuevaReserva = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1"); //24 de agosto de 2018, 11hs
        let precioBaseEsperado = 2800;
        let precioBaseObjeto = nuevaReserva.precioBase();
        expect(precioBaseObjeto).to.equal(precioBaseEsperado);
        let precio = nuevaReserva.precioReserva();
        expect(precio).to.equal(2425.5);
    })
    it('Reserva ejemplo 2', function(){
        let nuevaReserva = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
        let precioBaseEsperado = 300;
        let precioBaseObjeto = nuevaReserva.precioBase();
        expect(precioBaseObjeto).to.equal(precioBaseEsperado);
        let precio = nuevaReserva.precioReserva();
        expect(precio).to.equal(100);
    })
    it('Test precioReserva()', function(){
        let nuevaReserva = new Reserva(new Date(2018, 7, 27, 14, 100), 5, 230, 'DES1');
        let precio = nuevaReserva.precioReserva();
        expect(precio).to.equal(874);
    })

})
