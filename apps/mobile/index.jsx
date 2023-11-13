import { registerRootComponent } from 'expo'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import App from './src/app/App'

const MobileApplication = () => {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  )
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(MobileApplication)
