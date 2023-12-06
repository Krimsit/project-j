import { registerRootComponent } from 'expo'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ApiProvider } from '@mobile/api-provider'

import App from './src/app/App'

const MobileApplication = () => (
  <SafeAreaProvider>
    <ApiProvider>
      <App />
    </ApiProvider>
  </SafeAreaProvider>
)

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(MobileApplication)
