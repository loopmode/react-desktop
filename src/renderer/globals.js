import env from './env'
import history from './history'
import restart from './utils/restart'

if (env.isDevelopment) {
  window.app = { env, history, restart }
}
