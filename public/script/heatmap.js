export function initHeatmap() {
    // Create canvas overlay
    const canvas = document.createElement('canvas');
    canvas.id = 'heatmapCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = 9999;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const container = document.querySelector('.card-body.position-relative');
    container.appendChild(canvas);


    const ctx = canvas.getContext('2d');

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    function drawHeatDot(x, y, intensity = 0.2, radius = 20) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(255, 0, 0, ${intensity})`);
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    function renderHeatmap() {
        const data = JSON.parse(localStorage.getItem('behaviorAnalytics') || '{}');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw mouse movement heat
        if (Array.isArray(data.mouseMoves)) {
            for (const move of data.mouseMoves) {
                drawHeatDot(move.x, move.y, 0.05);
            }
        }

        // Draw clicks with higher intensity
        if (Array.isArray(data.clicks)) {
            for (const click of data.clicks) {
                drawHeatDot(click.x, click.y, 0.2, 30);
            }
        }
    }

    setInterval(renderHeatmap, 1000); // update heatmap every second
}
