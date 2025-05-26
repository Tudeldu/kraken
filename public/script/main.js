/**
 * @file main.js
 * @description
 * Entry point for the client-side application. This script initializes all major features of the analytics dashboard,
 * including user fingerprinting, visit tracking, behavior analytics, heatmap visualization, geolocation mapping, 
 * dark mode toggling, and UI rendering.
 *
 * <p>
 * The main flow is as follows:
 * <ul>
 *   <li>Initializes logging and announces app start.</li>
 *   <li>Obtains a unique visitor ID using fingerprinting.</li>
 *   <li>Initializes dark mode toggle functionality.</li>
 *   <li>Tracks the current visit and collects visit data.</li>
 *   <li>Fetches additional fingerprint data from the server using the visitor ID.</li>
 *   <li>Augments visit data with server-side fingerprint information.</li>
 *   <li>Logs the complete visit data object.</li>
 *   <li>Starts behavior tracking (mouse, click, scroll, idle).</li>
 *   <li>Renders the visit data in the UI.</li>
 *   <li>Initializes the heatmap visualization.</li>
 *   <li>If geolocation data is available, initializes the map centered on the user's location.</li>
 * </ul>
 *
 * <p>
 * All major modules are imported at the top of the file. The main logic is wrapped in an immediately-invoked async function expression (IIFE).
 * </p>
 *
 * @module main
 * @requires ./tracker.js
 * @requires ./ui.js
 * @requires ./behavior.js
 * @requires ./heatmap.js
 * @requires ./map.js
 * @requires ./logger.js
 * @requires ./fingerprintTest.js
 * @requires ./darkmode.js
 */

import { trackVisit } from './tracker.js';
import { renderData } from './ui.js';
import { startBehaviorTracking } from './behavior.js';
import { initHeatmap } from './heatmap.js';
import { initMap } from './map.js';
import { log } from './logger.js';
import { getVisitorId } from './fingerprintTest.js';
import { initDarkModeToggle } from './darkmode.js';

/**
 * Main application bootstrap.
 * 
 * <p>
 * This async IIFE coordinates the initialization of all analytics and UI modules. It ensures that
 * fingerprinting and visit tracking are completed before rendering data and initializing visualizations.
 * </p>
 * 
 * @async
 * @function
 * @returns {Promise<void>}
 */
(async function () {
    log('info', 'App started');

    // Obtain a unique visitor ID using fingerprinting
    const visitorId = await getVisitorId();
    log('info', 'Fingerprint visitorId:', visitorId);

    // Initialize dark mode toggle
    initDarkModeToggle();

    // Track the current visit and collect visit data
    const visitData = await trackVisit();

    // Fetch additional fingerprint data from the server
    const fpResponse = await fetch('/api/track/fingerprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId })
    });
    const fingerprintData = await fpResponse.json();
    visitData.fingerprintJS = fingerprintData;

    log('info', 'Visit data collected', visitData);

    // Start tracking user behavior (mouse, click, scroll, idle)
    startBehaviorTracking();

    // Render the visit data in the UI
    renderData(visitData);

    // Initialize the heatmap visualization
    initHeatmap();

    // If geolocation data is available, initialize the map
    if (visitData.geolocation && visitData.geolocation.latitude && visitData.geolocation.longitude) {
        initMap(visitData.geolocation.latitude, visitData.geolocation.longitude);
        log('info', 'Map initialized at', visitData.geolocation.latitude, visitData.geolocation.longitude);
    } else {
        log('warn', 'No geolocation data for map');
    }
})();