let map;
let marker;

function pos(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;


    if (!map) {
        map = L.map("map").setView([lat, lon], 17);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        marker = L.marker([lat, lon]).addTo(map);
    } else {
        map.setView([lat, lon]);
        marker.setLatLng([lat, lon]);
    }

    marker.bindPopup("<b>Olá!</b><br>Sou o super GPS");
}

setInterval(() => {
    navigator.geolocation.getCurrentPosition(pos);
}, 10000);