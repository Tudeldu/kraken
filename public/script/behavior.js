import { log } from './logger.js';

/**
 * Starts tracking user behavior on the page, including mouse movements, clicks, scroll depth, and idle time.
 * 
 * <p>
 * The collected data is stored in the `behaviorData` object, which contains:
 * <ul>
 *   <li><b>mouseMoves</b>: Array of mouse movement events, each with x/y coordinates and a timestamp.</li>
 *   <li><b>clicks</b>: Array of click events, each with x/y coordinates, the clicked element's tag name, and a timestamp.</li>
 *   <li><b>maxScroll</b>: The maximum percentage of the page the user has scrolled.</li>
 *   <li><b>idleTime</b>: The total time (in seconds) the user has been idle (no activity detected).</li>
 * </ul>
 * 
 * <p>
 * The function sets up event listeners for:
 * <ul>
 *   <li>Mouse movement: Captures position and time, limits stored events for performance.</li>
 *   <li>Clicks: Captures position, element tag, and time.</li>
 *   <li>Scroll: Tracks the furthest scroll depth as a percentage of the page.</li>
 *   <li>Idle detection: Increments idle time if no activity is detected for over 1 second.</li>
 * </ul>
 * 
 * <p>
 * Data is periodically saved to <code>localStorage</code> under the key <code>'behaviorAnalytics'</code> every second.
 * 
 * <p>
 * Example usage:
 * <pre>
 *   import { startBehaviorTracking } from './behavior.js';
 *   startBehaviorTracking();
 * </pre>
 * 
 * @function
 * @name startBehaviorTracking
 * @global
 * @returns {void}
 */
export function startBehaviorTracking() {
    log('info', 'Behavior tracking started');
    const behaviorData = {
        /**
         * Array of mouse movement events.
         * @type {Array<{x: number, y: number, t: number}>}
         */
        mouseMoves: [],
        /**
         * Array of click events.
         * @type {Array<{x: number, y: number, tag: string, t: number}>}
         */
        clicks: [],
        /**
         * Maximum scroll percentage reached by the user.
         * @type {number}
         */
        maxScroll: 0,
        /**
         * Total idle time in seconds.
         * @type {number}
         */
        idleTime: 0
    };

    // Mouse movement
    document.addEventListener('mousemove', e => {
        behaviorData.mouseMoves.push({ x: e.clientX, y: e.clientY, t: Date.now() });
        // Optional: limit stored movements for performance
        if (behaviorData.mouseMoves.length > 1000) {
            behaviorData.mouseMoves.shift();
        }
    });

    // Clicks
    document.addEventListener('click', e => {
        behaviorData.clicks.push({
            x: e.clientX,
            y: e.clientY,
            tag: e.target.tagName,
            t: Date.now()
        });
        log('debug', 'Click at', e.clientX, e.clientY);
    });

    // Scroll tracking
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (scrollPercent > behaviorData.maxScroll) {
            behaviorData.maxScroll = scrollPercent;
        }
    });

    // Idle time (user inactive for > X ms)
    let idleStart = Date.now();
    const resetIdle = () => idleStart = Date.now();

    ['mousemove', 'keydown', 'scroll', 'click'].forEach(evt =>
        document.addEventListener(evt, resetIdle)
    );

    setInterval(() => {
        const now = Date.now();
        const delta = now - idleStart;
        if (delta > 1000) { // 1 sec of inactivity
            behaviorData.idleTime += 5;
            idleStart = now;
        }
    }, 5000);

    // Save to localStorage periodically
    setInterval(() => {
        localStorage.setItem('behaviorAnalytics', JSON.stringify(behaviorData));
    }, 1000);
}