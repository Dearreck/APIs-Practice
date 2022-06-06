


function ShowUser() {

  let datos = document.getElementById("user-data");
  let contenedor = document.getElementById("user-container");
  let nacionalidad = document.getElementById("user-nat");

  fetch("https://randomuser.me/api/")
    .then(response => response.json())
    .then(result => {

      // Foto y Nombre Completo
      contenedor.innerHTML = `
        <picture id="logo">
          <source media="(min-width: 768px)" srcset="${result.results[0].picture.large}">
          <source media="(min-width: 480px)" srcset="${result.results[0].picture.medium}">
          <img src="${result.results[0].picture.thumbnail}" alt="">
        </picture>
        <h3>${result.results[0].name.first} ${result.results[0].name.last}</h3>
      `;
      // Cambiar el fondo
      if (result.results[0].gender == "female") {
        contenedor.style.backgroundColor = "pink";
        contenedor.style.color = "black";
      }

      // Nacionalidad: Bandera
      nacionalidad.innerHTML = `
      <picture id="flag">
        <source media="(min-width: 480px)" srcset="https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${result.results[0].nat.toLowerCase()}.svg">
        <img src="https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/${result.results[0].nat.toLowerCase()}.svg" alt="">
      </picture>
      <label>País: ${result.results[0].location.country}</label>
      <label>Estado: ${result.results[0].location.state}</label>
      <label>Ciudad: ${result.results[0].location.city}</label>
      <label>Dirección: ${result.results[0].location.street.number} ${result.results[0].location.street.name}</label><br/>
      `;

      // Mostrar el mapa: Somoto (13.479576, -86.586356)
      let latit = Number(result.results[0].location.coordinates.latitude)
      let longit = Number(result.results[0].location.coordinates.longitude)
      var map = L.map('map').setView([latit, longit], 3);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([latit, longit]).addTo(map)
        .bindPopup('Es una ubicación ficticia.<br> Point: ' + latit + ', ' + longit)
        .openPopup();


      console.log(result.results[0]);

    })
    .catch(error => console.log('error', error));
}



