//declaramos el objeto calculadora con todas sus variables y funciones.
var Calculadora = {
  resultado: 0,
  init: function(){
    this.asignarEventosTeclas('tecla')
    document.getElementById('on').onclick = this.reiniciarCaja;
  },
//función que asigna el cambio de tamaño de las teclas al evento onclick.
  asignarEventosTeclas: function(selector){
    var teclas = document.getElementsByClassName(selector);
    for (var i=0; i<teclas.length; i++){
      teclas[i].onmousedown = this.eventoTeclaLarge;
      teclas[i].onmouseup = this.eventoTeclaSmall;
      teclas[i].onclick = this.eventoAddNumero;
    }
  },
//función que disminuye de tamaño de las teclas.
  eventoTeclaLarge: function(event){
    var tecla = event.target;
    tecla.style.padding = "0.1rem";
  },
//función que devuelve el tamaño original a las teclas.
  eventoTeclaSmall: function(event){
    var tecla = event.target;
    tecla.style.padding = "0";
  },
//función que agrega un número al display.
  eventoAddNumero: function(event){
    var cajaNumeros = document.getElementById('display');
    var numero = event.currentTarget.id;
    if((cajaNumeros.textContent == 0)&&(numero != 'on')&&(numero != 'sign')&&(numero != 'raiz')&&(numero != 'dividido')&&(numero != 'por')&&(numero != 'menos')&&(numero != 'punto')&&(numero != 'igual')&&(numero != 'mas')){
      cajaNumeros.textContent = numero;
    } else if((numero != 'on')&&(numero != 'sign')&&(numero != 'raiz')&&(numero != 'dividido')&&(numero != 'por')&&(numero != 'menos')&&(numero != 'punto')&&(numero != 'igual')&&(numero != 'mas')){
      cajaNumeros.textContent = cajaNumeros.textContent + numero;
    }
  },
//función para reiniciar del botón ON
  reiniciarCaja: function(){
    document.getElementById('display').textContent = "0";
  }

}

//ejecutamos la función inicializadora del objeto calculadoraFondo.
Calculadora.init()
