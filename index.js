const dns = require("dns");

function obtenerDominioDeCorreo(correo) {
  const dominio = correo.split('@')[1];
  return dominio;
}
  //Expresiones regulares y limite de caracteres
function esNombreDeUsuarioValido(nombreDeUsuario) {
  const regex = /^[a-zA-Z0-9._]+$/;
   if (!regex.test(nombreDeUsuario)){
    return 'El nombre de usuario contiene caracteres no validos.';
   }
   for (let i = 0;i <nombreDeUsuario - 1; i++){
    if (nombreDeUsuario[i] === nombreDeUsuario[i + 1]){
        return 'Cambia el nombre de usuario, no se permiten letras consecutivas.';
    }
   }
   return true;
}

const correo = "oacosta@estudio-galicia.com"; 
const nombreDeUsuario = correo.split('@')[0];

try {
  if (nombreDeUsuario.length <= 2 || !esNombreDeUsuarioValido(nombreDeUsuario)) {
    throw new Error('Nombre de usuario inválido o caracteres insuficientes.');
  }

  const dominio = obtenerDominioDeCorreo(correo);
console.log({dominio})
  dns.resolveMx(dominio, (error, address, family) => {
    // Si el dominio no existe
    if (error) {
      console.error(error.message);
    } else {
      // Si el dominio existe
      console.log(
        {address,family}
      );
    }
  });
} catch (excepcion) {
  console.error('Error:', excepcion.message);
}
