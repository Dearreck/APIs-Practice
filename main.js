


function ShowUser() {

  let datos = document.getElementById("user-data");
  let contenedor = document.getElementById("user-container");
  let nacionalidad = document.getElementById("user-nat");

  fetch("https://randomuser.me/api/")
    .then(response => response.json())
    .then(result => {

      // Obtener el objeto con los datos
      person = result.results[0];

      // Foto y Nombre Completo
      contenedor.innerHTML = `
        <picture id="logo">
          <source media="(min-width: 768px)" srcset="${person.picture.large}">
          <source media="(min-width: 480px)" srcset="${person.picture.medium}">
          <img src="${person.picture.thumbnail}" alt="">
        </picture>
        <h3>${person.name.first} ${person.name.last}</h3>
      `;
      // Cambiar el fondo
      if (person.gender == "female") {
        contenedor.style.backgroundColor = "pink";
        contenedor.style.color = "black";
      }

      // Datos Personales
      datos.innerHTML = `
        <label>Datos Personales</label>
        <label>Nombre Completo: ${person.name.title} ${person.name.first} ${person.name.last}</label>
        <label for="dob">Fecha de Nacimiento: <input type="date" name="dob" id="dob" value="${person.dob.date.slice(0, 10)}" readonly></label>
        <br/><label>Datos de Contacto</label>
        <label>e-mail: ${person.email}</label>
        <label>Teléfono: ${person.phone}</label>
        <label>Celular: ${person.cell}</label>
      `;

      // Nacionalidad: Bandera
      nacionalidad.innerHTML = `
      <picture id="flag">
        <source media="(min-width: 480px)" srcset="https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${person.nat.toLowerCase()}.svg">
        <img src="https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/${person.nat.toLowerCase()}.svg" alt="">
      </picture>
      <label>País: ${person.location.country}</label>
      <label>Estado: ${person.location.state}</label>
      <label>Ciudad: ${person.location.city}</label>
      <label>Dirección: ${person.location.street.number} ${person.location.street.name}</label><br/>
      `;

      // Mostrar el mapa: Somoto (13.479576, -86.586356)
      let latit = Number(person.location.coordinates.latitude)
      let longit = Number(person.location.coordinates.longitude)
      var map = L.map('map').setView([latit, longit], 3);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([latit, longit]).addTo(map)
        .bindPopup('Es una ubicación ficticia.<br> Point: ' + latit + ', ' + longit)
        .openPopup();


      console.log(person);

    })
    .catch(error => console.log('error', error));
}



