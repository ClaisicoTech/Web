// Map Application Logic

// Default Location (Madrid) if geolocation fails
const DEFAULT_LAT = 40.4168;
const DEFAULT_LNG = -3.7038;

let map;
let userMarker;
let poiMarkers = [];
let currentLat = DEFAULT_LAT;
let currentLng = DEFAULT_LNG;

// Icons
const userIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color: #3b82f6; width: 15px; height: 15px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);'></div>",
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

const poiIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color: #6366f1; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.2);'></div>",
    iconSize: [16, 16],
    iconAnchor: [8, 8]
});

// Initialize Map
function initMap() {
    map = L.map('map').setView([DEFAULT_LAT, DEFAULT_LNG], 15);

    // Dark Mode Tiles (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Try to get user location on load
    locateUser();
}

// Locate User
function locateUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLat = position.coords.latitude;
                currentLng = position.coords.longitude;
                updateUserLocation(currentLat, currentLng);
                fetchPOIs(currentLat, currentLng, 'all');
            },
            (error) => {
                console.warn("Geolocation denied or failed. Using default.", error);
                updateUserLocation(DEFAULT_LAT, DEFAULT_LNG); // Show default but don't claim it's user
                fetchPOIs(DEFAULT_LAT, DEFAULT_LNG, 'all');
            }
        );
    } else {
        // Fallback
        fetchPOIs(DEFAULT_LAT, DEFAULT_LNG, 'all');
    }
}

function updateUserLocation(lat, lng) {
    if (userMarker) {
        map.removeLayer(userMarker);
    }

    userMarker = L.marker([lat, lng], { icon: userIcon }).addTo(map);
    userMarker.bindPopup("<b>Tu Ubicación</b>").openPopup();

    map.flyTo([lat, lng], 16, {
        animate: true,
        duration: 1.5
    });
}

// Fetch POIs using Overpass API
async function fetchPOIs(lat, lng, type) {
    // Clear existing markers
    poiMarkers.forEach(marker => map.removeLayer(marker));
    poiMarkers = [];

    const listContainer = document.getElementById('poi-list');
    listContainer.innerHTML = '<div class="empty-state"><i class="fa-solid fa-spinner fa-spin"></i><p>Buscando sitios cercanos...</p></div>';

    // Build Overpass Query
    // Search radius: 1000m
    let queryType = '';
    if (type === 'restaurant') queryType = '["amenity"="restaurant"]';
    else if (type === 'cafe') queryType = '["amenity"="cafe"]';
    else if (type === 'bar') queryType = '["amenity"="bar"]';
    else queryType = '["amenity"~"restaurant|cafe|bar"]';

    const query = `
        [out:json][timeout:25];
        (
          node${queryType}(around:800, ${lat}, ${lng});
        );
        out body;
        >;
        out skel qt;
    `;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        listContainer.innerHTML = ''; // Clear loading

        if (data.elements && data.elements.length > 0) {
            // Limit to 20 results for performance
            const results = data.elements.slice(0, 20);

            results.forEach(poi => {
                addPoiMarker(poi);
                addPoiToList(poi);
            });
        } else {
            listContainer.innerHTML = '<div class="empty-state"><p>No se encontraron sitios cerca.</p></div>';
        }

    } catch (error) {
        console.error("Error fetching POIs:", error);
        listContainer.innerHTML = '<div class="empty-state"><p>Error al cargar datos.</p></div>';
    }
}

// Mock Data Generators
function generateRating() {
    return (3.5 + Math.random() * 1.5).toFixed(1); // 3.5 to 5.0
}

function generateReviews() {
    const reviews = [
        "¡Excelente servicio y comida deliciosa!",
        "El ambiente es muy agradable, volveré.",
        "Un poco caro para lo que es, pero está bien.",
        "El mejor café de la zona sin duda.",
        "Muy recomendable para ir con amigos.",
        "Tardaron un poco en servir, pero valió la pena."
    ];
    // Pick 2 random reviews
    const r1 = reviews[Math.floor(Math.random() * reviews.length)];
    const r2 = reviews[Math.floor(Math.random() * reviews.length)];
    return [r1, r2];
}

function addPoiMarker(poi) {
    if (!poi.lat || !poi.lon) return;

    const name = poi.tags.name || "Sitio sin nombre";
    const type = poi.tags.amenity || "Lugar";
    const rating = generateRating();
    const reviews = generateReviews();

    const popupContent = `
        <div class="popup-title">${name}</div>
        <div class="popup-info">${type.toUpperCase()} · <span class="rating"><i class="fa-solid fa-star"></i> ${rating}</span></div>
        <div class="popup-reviews">
            <div class="review-item">"${reviews[0]}"</div>
            <div class="review-item">"${reviews[1]}"</div>
        </div>
    `;

    const marker = L.marker([poi.lat, poi.lon], { icon: poiIcon })
        .addTo(map)
        .bindPopup(popupContent);

    poiMarkers.push(marker);
}

function addPoiToList(poi) {
    const name = poi.tags.name || "Sitio sin nombre";
    const type = poi.tags.amenity || "Lugar";
    const rating = generateRating();

    const item = document.createElement('div');
    item.className = 'poi-card';
    item.innerHTML = `
        <div class="poi-name">${name}</div>
        <div class="poi-meta">
            <span>${type}</span>
            <span class="rating"><i class="fa-solid fa-star"></i> ${rating}</span>
        </div>
    `;

    item.addEventListener('click', () => {
        // Find marker and open popup
        const marker = poiMarkers.find(m => m.getLatLng().lat === poi.lat && m.getLatLng().lng === poi.lon);
        if (marker) {
            map.flyTo([poi.lat, poi.lon], 17);
            marker.openPopup();
        }
    });

    document.getElementById('poi-list').appendChild(item);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initMap);

document.getElementById('btn-locate').addEventListener('click', locateUser);

document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Update active state
        document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        // Filter
        const type = e.target.dataset.type;
        fetchPOIs(currentLat, currentLng, type);
    });
});
