import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'kchhwq30',
    dataset: 'production',
  },
  /** Avoid interactive hostname prompt on `sanity deploy` (CI / scripted runs). */
  studioHost: 'portici-dadaocheng',
  deployment: {
    appId: 'wmbo6t6zwy1am001mb3nxqxh',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
