//declaramos el objeto calculadora con todas sus variables y funciones.
var Calculadora = {
  init: function(){
  //atributos generales y asignación de eventos a los botones.
    var datos = { //objeto que inicializa las variables de las operaciones.
      numero1: "0",
      numero2: "0",
      operacion: "",
      resultado: "",
      continue: 2 //propiedad de se usa para controlar la funcionalidad de secuencia de operaciones al presionar el boton =.
    };
    localStorage.setItem('datos', JSON.stringify(datos)); //Se almacenan el objeto datos en el WebStorage para fácil acceso.
    this.asignarEventosTeclas('tecla');
    this.eventoAddPunto();
    document.getElementById('on').onclick = this.reiniciarCaja;
    document.getElementById('sign').onclick = this.eventoAddNegativo;
    document.getElementById('mas').onclick = this.eventoOperacionTeclas;
    document.getElementById('menos').onclick = this.eventoOperacionTeclas;
    document.getElementById('por').onclick = this.eventoOperacionTeclas;
    document.getElementById('dividido').onclick = this.eventoOperacionTeclas;
    document.getElementById('igual').onclick = this.eventoOperacionTeclas;
  },
//método que asigna los eventos generales de las teclas (efecto de click, agregar el número al display).
  asignarEventosTeclas: function(selector){
    var teclas = document.getElementsByClassName(selector);
    for (var i=0; i<teclas.length; i++){
      teclas[i].onmousedown = this.eventoTeclaLarge;
      teclas[i].onmouseup = this.eventoTeclaSmall;
      teclas[i].onclick = this.eventoAddNumero;
    }
  },
//método que disminuye de tamaño de las teclas.
  eventoTeclaLarge: function(event){
    var tecla = event.target;
    tecla.style.padding = "0.1rem";
  },
//método que devuelve el tamaño original a las teclas.
  eventoTeclaSmall: function(event){
    var tecla = event.target;
    tecla.style.padding = "0";
  },
//método que agrega un número al display.
  eventoAddNumero: function(event){
    var cajaNumeros = document.getElementById('display');
    var datos = JSON.parse(localStorage.getItem('datos'));
    var numero = event.currentTarget.id;

    if((cajaNumeros.textContent == "0")&&(numero != 'on')&&(numero != 'sign')&&(numero != 'raiz')&&(numero != 'dividido')&&(numero != 'por')&&(numero != 'menos')&&(numero != 'punto')&&(numero != 'igual')&&(numero != 'mas')){
          cajaNumeros.textContent = numero;
    } else if((numero != 'on')&&(numero != 'sign')&&(numero != 'raiz')&&(numero != 'dividido')&&(numero != 'por')&&(numero != 'menos')&&(numero != 'punto')&&(numero != 'igual')&&(numero != 'mas')){
          cajaNumeros.textContent = cajaNumeros.textContent + numero;
        cajaNumeros.textContent = self.limitarCaracteres(cajaNumeros.textContent);
              if(datos.continue == 3){ //true indica que se acaba de dar un resultado y se debe iniciar nuevamente los parametros.
                self.reiniciarCaja();
                cajaNumeros.textContent = numero;
              };
    }
  },
//método para validar y agregar el punto.
  eventoAddPunto: function(){
    var cajaNumeros = document.getElementById('display');
    var separador = ".";
    self = this;
    document.getElementById('punto').addEventListener('click', function(){
      var datos = JSON.parse(localStorage.getItem('datos'));
      var validarPunto = cajaNumeros.textContent.split(separador);
      if(cajaNumeros.textContent == "0"){
        cajaNumeros.textContent = cajaNumeros.textContent + ".";
      } else if(validarPunto.length <= 1){
        cajaNumeros.textContent = cajaNumeros.textContent + ".";
      };
      if(datos.continue == 3){ //si la caja tiene un resultado(se presionó el igual) y no se selecciona una nueva operación.
        self.reiniciarCaja();
        cajaNumeros.textContent = "0.";
      };
      cajaNumeros.textContent = self.limitarCaracteres(cajaNumeros.textContent);
    })
  },
//método para convertir números positivos a negativos y viceversa.
  eventoAddNegativo: function(){
    var cajaNumeros = document.getElementById('display');
    var validarSigno = cajaNumeros.textContent.split("");
    var signo = validarSigno[0];
    if(signo == "-"){
        cajaNumeros.textContent = cajaNumeros.textContent.substring(1);
    } else if(cajaNumeros.textContent == "0"){
    } else {
      cajaNumeros.textContent = "-" + cajaNumeros.textContent;
    }
  },
//método reinicio del botón ON.
  reiniciarCaja: function(){
    document.getElementById('display').textContent = "0";
    var datos = JSON.parse(localStorage.getItem('datos'));
    datos.numero1 = "0";
    datos.numero2 = "0";
    datos.operacion = "";
    datos.resultado = "";
    datos.continue = 2
    localStorage.setItem('datos', JSON.stringify(datos));
  },
//metodo para limitar caracteres en el display.
  limitarCaracteres: function(){
    var cajaNumeros = document.getElementById('display');
    var limite = "0";
    limite = cajaNumeros.textContent;
    limite = limite.slice(0,8);
    return limite;
  },
//método que selecciona el tipo de operación y asigna el valor a las variables.
  eventoOperacionTeclas: function(event){
    var cajaNumeros = document.getElementById('display');
    var operador = event.currentTarget.id;
    var datos = JSON.parse(localStorage.getItem('datos'))
    switch (operador) {
    case "mas":
      datos.numero1 = cajaNumeros.textContent;
      datos.operacion = "+";
      datos.continue = 1;
      cajaNumeros.textContent = "";
      break;
    case "menos":
      datos.numero1 = cajaNumeros.textContent;
      datos.operacion = "-";
      datos.continue = 1;
      cajaNumeros.textContent = "";
      break;
    case "por":
      datos.numero1 = cajaNumeros.textContent;
      datos.operacion = "*";
      datos.continue = 1;
      cajaNumeros.textContent = "";
      break;
    case "dividido":
      datos.numero1 = cajaNumeros.textContent;
      datos.operacion = "/";
      datos.continue = 1;
      cajaNumeros.textContent = "";
      break;
    case "igual":
    if (localStorage.datos){
      var datos = JSON.parse(localStorage.getItem('datos'))
    };
    if (datos.continue == 1){
      datos.numero2 = cajaNumeros.textContent;
    };
    if (cajaNumeros.textContent == ""){
      cajaNumeros.textContent = "0";
      datos.numero1 = "0";
      datos.numero2 = "0";
    };
      cajaNumeros.textContent= self.eventoResolver(datos); //invoca el método para resolver la operación.
      datos.numero1 = cajaNumeros.textContent;
      datos.continue = 3;
      localStorage.setItem('datos',JSON.stringify(datos));
      cajaNumeros.textContent = self.limitarCaracteres();
      break;
  }
  localStorage.setItem('datos',JSON.stringify(datos));
},
//método para realizar la operación seleccionada.
  eventoResolver: function(datos){
    var cajaNumeros = document.getElementById('display');
    var operador = datos.operacion;
    switch(operador) {
    case "+":
      datos.resultado = parseFloat(datos.numero1) + parseFloat(datos.numero2);
      break;
    case "-":
      datos.resultado = parseFloat(datos.numero1) - parseFloat(datos.numero2);
      break;
    case "*":
      datos.resultado = parseFloat(datos.numero1) * parseFloat(datos.numero2);
      break;
    case "/":
      datos.resultado = parseFloat(datos.numero1) / parseFloat(datos.numero2);
      break;
      default:
      datos.resultado = "0";
  }
  return datos.resultado; //retorna el resultado al eventoOperacionTeclas.
  }

}

//ejecutamos la función inicializadora del objeto Calculadora.
Calculadora.init()
