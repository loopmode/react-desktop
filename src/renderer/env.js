import { remote } from 'electron'
import env from 'common/env'
export default {
  ...env,
  // custom stuff related to renderer process:
  //------------------------------------------
  isRenderer: true,
  get isMainWindow() {
    return remote.getCurrentWindow().isMainWindow || false
  }
}
