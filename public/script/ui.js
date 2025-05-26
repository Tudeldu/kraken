let visitChart, behaviorChart;

export function renderData(initialData) {
    const infoDiv = document.getElementById('info');
    infoDiv.innerHTML = `<h2>Technical & Identity Data</h2><pre>${JSON.stringify(initialData, null, 2)}</pre>`;

    if (initialData.fingerprintJS) {
        const fp = initialData.fingerprintJS;
        infoDiv.innerHTML += `
    <h4 class="mt-4">🔍 FingerprintJS Pro</h4>
    <pre>${JSON.stringify(fp, null, 2)}</pre>
  `;
    }
    renderCharts();
}

function renderCharts() {
    // Visit history from localStorage
    const visitHistory = JSON.parse(localStorage.getItem('visitHistory')) || [];

    // Aggregate visits per day
    const visitsPerDay = {};
    visitHistory.forEach(dateStr => {
        const date = new Date(dateStr).toISOString().slice(0, 10);
        visitsPerDay[date] = (visitsPerDay[date] || 0) + 1;
    });

    const visitLabels = Object.keys(visitsPerDay).sort();
    const visitData = visitLabels.map(date => visitsPerDay[date]);

    // Behavior analytics from localStorage
    const behavior = JSON.parse(localStorage.getItem('behaviorAnalytics') || '{}');

    // Data for behavior chart
    const behaviorData = {
        clicks: behavior.clicks?.length || 0,
        maxScroll: Math.round(behavior.maxScroll || 0),
        idleTime: Math.round(behavior.idleTime || 0),
        mouseMoves: behavior.mouseMoves?.length || 0
    };

    // Create or update visit history chart
    const visitCtx = document.getElementById('visitHistoryChart').getContext('2d');
    if (visitChart) {
        visitChart.data.labels = visitLabels;
        visitChart.data.datasets[0].data = visitData;
        visitChart.update();
    } else {
        visitChart = new Chart(visitCtx, {
            type: 'line',
            data: {
                labels: visitLabels,
                datasets: [{
                    label: 'Visits per Day',
                    data: visitData,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    tooltip: { enabled: true }
                },
                scales: {
                    x: { title: { display: true, text: 'Date' } },
                    y: { title: { display: true, text: 'Visits' }, beginAtZero: true }
                }
            }
        });
    }

    // Create or update behavior chart (bar chart)
    const behaviorCtx = document.getElementById('behaviorChart').getContext('2d');
    if (behaviorChart) {
        behaviorChart.data.datasets[0].data = Object.values(behaviorData);
        behaviorChart.update();
    } else {
        behaviorChart = new Chart(behaviorCtx, {
            type: 'bar',
            data: {
                labels: ['Clicks', 'Max Scroll %', 'Idle Time (s)', 'Mouse Moves'],
                datasets: [{
                    label: 'Behavior Analytics',
                    data: Object.values(behaviorData),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)'
                    ]
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
}
