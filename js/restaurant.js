var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
   let nuevosHorarios = this.horarios.filter(horario => horario!=horarioReservado); //función devuelve resultados filtrados
   this.horarios = nuevosHorarios;
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion >= 0 && nuevaCalificacion <= 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.sumatoria = function(arreglo){ //el arreglo esperado es el de las calificaciones de cada rstrt
    let sumatoria = 0;
    if(arreglo.length!=0){
        for(let i=0; i<arreglo.length; i++){
            sumatoria+=arreglo[i];
        }
    }
    return sumatoria;
}
Restaurant.prototype.promedio = function(arreglo){
    let sumatoria = this.sumatoria(arreglo);
    // console.log(sumatoria);
    if(sumatoria != 0){
        let promedio = sumatoria / this.calificaciones.length;
        return Math.round(promedio * 10) / 10;
    }
    else {
        return sumatoria;
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    let puntuacion = this.promedio(this.calificaciones);
    return puntuacion;
}

