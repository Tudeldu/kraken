export async function getVisitorId() {
    return new Promise((resolve) => {
        const checkReady = () => {
            if (window.FingerprintJS) {
                FingerprintJS.load().then((fp) => {
                    fp.get().then((result) => {
                        resolve(result.visitorId);
                    });
                });
            } else {
                setTimeout(checkReady, 100);
            }
        };
        checkReady();
    });
}