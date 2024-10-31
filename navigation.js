// Inicjalizacja mapy
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// Inicjalizacja pinezki i śladu
var marker = L.marker([51.505, -0.09]).addTo(map);
var polyline = L.polyline([], { color: 'blue' }).addTo(map);

// Inicjalizacja zmiennych pozycji
var currentLat = 51.505;
var currentLng = -0.09;

// Funkcja do aktualizacji pozycji pinezki i śladu
function updateMarkerAndPolyline(lat, lng) {
  var latlng = L.latLng(lat, lng);
  marker.setLatLng(latlng);
  polyline.addLatLng(latlng);
}

// Symulacja poruszania się pinezki
function moveMarker() {
  currentLat += 0.005; // Przykładowa wartość zmiany dla szerokości geograficznej
  currentLng -= 0.005; // Przykładowa wartość zmiany dla długości geograficznej

  updateMarkerAndPolyline(currentLat, currentLng);

  setTimeout(moveMarker, 1000); // Czas w milisekundach między punktami
}

// Rozpoczęcie symulacji
moveMarker();