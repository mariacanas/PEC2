
Observa que se han creado funciones handle en el fichero controlador
(todo.controller.js), las cuales son pasadas como parámetro. Esto es debido al
problema con el cambio de contexto (this) que existe en JavaScript. Ahora mismo si
no tienes muy claro que está sucediendo, revisa qué hacen las “fat-arrow” de ES6 sobre
el objeto this, y prueba a cambiar el código para comprender qué está sucediendo
cuando se modifica la siguiente línea:
this.view.bindAddTodo(this.handleAddTodo);
Por esta:
this.view.bindAddTodo(this.service.addTodo);
Responde, en un documento texto en el directorio de entrega a la siguiente pregunta:


¿Por qué es el valor de this es undefined?


Cuando estamos pasando this.service.addTodo en vez de this.handleAddTodo, dentro de addTodo, this no va a estar definido explicitamente, por lo que el resultado que nos va a dar va a ser undefined. Esto se debe a que addTodo es un método de service y el valor que tenga this dentro de una función va a depender de como se llame a esta función. Por lo que, si no se ha definido un contexto, this no va a apuntar a nada dando como resultado el valor de undefined.

