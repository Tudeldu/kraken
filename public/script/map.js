import { log } from './logger.js';

export function initMap(lat, lon) {
    if (!lat || !lon) {
        log('warn', 'No geolocation provided to map');
        return;
    }

    log('info', 'Initializing map at', lat, lon);

    // Create the map and set view to user's location
    const map = L.map('map').setView([lat, lon], 13);

    // Use OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add a marker at the user's location
    L.marker([lat, lon])
        .addTo(map)
        .bindPopup('You are here')
        .openPopup();
}
