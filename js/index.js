const tabla = document.querySelector("#cuerpo");
const boton = document.getElementById("boton");
const menu = document.querySelector(".container22");
const agregar = document.querySelector(".agregar");
const texto = document.querySelector(".teto");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const telefono = document.getElementById("telefono");
const cancel = document.querySelector(".cancelar");

const opciones = {
  method: "POST",
};

window.addEventListener("load", () => {
  fetch("http://www.raydelto.org/agenda.php")
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      datos.forEach((element) => {
        tabla.innerHTML += `
            <tr class="rows">
            <td>${element.nombre}</td>
            <td>${element.apellido}</td>
                  <td>${element.telefono}</td>
          </tr>

            `;
      });
    });
});

boton.addEventListener("click", () => {
  menu.classList.toggle("spread");
});

window.addEventListener("click", (e) => {
  if (
    menu.classList.contains("") &&
    e.target != menu &&
    e.target != cancel &&
    e.target != boton
  )
    menu.classList.toggle("spread");
});

cancel.addEventListener("click", () => {
  nombre.value = "";
  apellido.value = "";
  telefono.value = "";
  menu.classList.toggle("spread");
});

agregar.addEventListener("click", () => {
  if (nombre.value == "" || apellido.value == ""||telefono.value == "") {
    alert("Debe de llenar todos los campos");
  } else {
    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
      });
      return response.json();
    }
    postData("http://www.raydelto.org/agenda.php", {
      nombre: nombre.value,
      apellido: apellido.value,
      telefono: telefono.value,
    }).then((data) => {
      tabla.innerHTML += `
            <tr class="rows">
                   <td>${nombre.value}</td>

                   
            <td>${apellido.value}</td>


            <td>${telefono.value}</td>
          </tr>


            `;
      alert("Se ha agregado el dato con exito");
      menu.classList.toggle("spread");
    });
  }
});
