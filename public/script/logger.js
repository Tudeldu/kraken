// public/script/logger.js

const LOG_LEVELS = ['debug', 'info', 'warn', 'error'];

export function log(level, ...args) {
    if (!LOG_LEVELS.includes(level)) {
        level = 'info';
    }

    const time = new Date().toISOString();
    const prefix = `[${time}] [${level.toUpperCase()}]`;

    // Log to console for now
    switch (level) {
        case 'debug':
            console.debug(prefix, ...args);
            break;
        case 'info':
            console.info(prefix, ...args);
            break;
        case 'warn':
            console.warn(prefix, ...args);
            break;
        case 'error':
            console.error(prefix, ...args);
            break;
    }

    // Future: send to backend or store in localStorage
}
