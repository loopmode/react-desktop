export const EVENT_NAME = 'restartApp'

/**
 * Dispatches an event to restart the app.
 * The event and the actual restart is handled within renderer/index.js.
 * @param {*} options
 */
export default function restart(options) {
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { ...options } }))
}

export { EVENT_NAME as RESTART }
