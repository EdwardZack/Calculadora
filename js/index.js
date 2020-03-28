//declaramos el objeto calculadora con todas sus variables y funciones.
var Calculadora = {
  init: function(){
    this.asignarEventosTeclas('tecla')
  },
//función que asigna el cambio de tamaño de las teclas al evento onclick.
  asignarEventosTeclas: function(selector){
    var teclas = document.getElementsByClassName(selector);
    for (var i=0; i<teclas.length; i++){
      teclas[i].onmousedown = this.eventoTeclaLarge;
      teclas[i].onmouseup = this.eventoTeclaSmall;
    }
  },
//función para el cambio de tamaño de las teclas.
  eventoTeclaLarge: function(event){
    var tecla = event.target;
    tecla.style.padding = "0.1rem";
  },
  eventoTeclaSmall: function(event){
    var tecla = event.target;
    tecla.style.padding = "0";
  }
}

//ejecutamos la función inicializadora del objeto calculadoraFondo.
Calculadora.init()
