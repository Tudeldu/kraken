export async function trackVisit() {
    const startTime = Date.now();

    // Track time on page
    window.addEventListener('beforeunload', () => {
        const duration = Math.round((Date.now() - startTime) / 1000);
        localStorage.setItem('timeOnPage', duration);
    });

    // Track local visit history
    const visitHistory = JSON.parse(localStorage.getItem('visitHistory')) || [];
    const now = new Date().toISOString();
    visitHistory.push(now);
    localStorage.setItem('visitHistory', JSON.stringify(visitHistory));

    // Load FingerprintJS
    const fp = await FingerprintJS.load();
    const fingerprint = (await fp.get()).visitorId;

    // Request location from backend
    // const serverData = await fetch('/api/client-info').then(res => res.json());

    // Get geolocation (browser-based)
    const geolocation = await new Promise(resolve => {
        if (!navigator.geolocation) return resolve(null);
        navigator.geolocation.getCurrentPosition(
            pos => resolve({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                accuracy: pos.coords.accuracy
            }),
            () => resolve(null),
            { timeout: 5000 }
        );
    });

    return {
        // ...serverData,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        platform: navigator.platform,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        fingerprint,
        visitCount: visitHistory.length,
        lastVisit: visitHistory.at(-2) || null,
        doNotTrack: navigator.doNotTrack,
        cookieEnabled: navigator.cookieEnabled,
        localStorageSupported: !!window.localStorage,
        geolocation
    };
}
