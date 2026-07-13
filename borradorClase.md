dia 4 jul

temas principales:
- paginas web locales: html, css y javascript
- redes locales: ip, puertos, protocolos, cliente-servidor
- vpn usando zerotier(una de tantas).
- bases de datos: relacionales, servidores.
- instalacion de servidor de base de datos.
- ip fija e ip dinamica, redes lan y wan.
- reportes automaticos con ia.

trabajo practico:

Lo primero es plantear el modelo de negocio. En este caso vamos a usar el instituto como musa inspiradora. La idea principal es tener un punto de recoleccion de datos. Lo vamos a materializar con varios puntos de entradas de datos, algunos puntos por medio de la recepcionista que debara usar una interfaz limitada mediante la configuracion de la pagina, y otra manual por parte de los alumnos que escanearan un qr accederan a una plantilla tipo web, que corre globalmente por medio de las appscript de las hojas de calculo de google. La computadora de la recepecionista va a estar conectada via ethernet. a una computadora que va a estar usando dos interfaces de red distintas, una para la red lan y otra para la red de wifi, en este nodo central que conecta los dos mundos se va a dar la "magia". En este lugar se debe fusionar los datos que guardo la recepcionista con las distintas entradas que pueden haber por parte de los alumnos.

Modelo de negocio.
Es un sistema de registro de alumnos. El postulante a alumno debera contactarse con la recepcionista, dejar algunos datos personales y documentacion. Una vez que la recepcionista ingresa al alumno, le va a entregar un usuario y contrasenia. el cual usara el alumno para registrar el resto de los datos personalmente manualmente por medio de la pagina web creada en app script. usando el usuario y contrasenia para acceder al sistema y cargar los datos. 
La pagina web tendra como funcion ademas de cargar los datos personales, facilitarle a los alumnos, la verificacion de su estado, con respecto a las materias cursadas, las notas, las inasistencias como tambien la fecha de examenes finales. (estos datos los cargara el docente a un hoja de drive vinculada por medio de una ip)

 