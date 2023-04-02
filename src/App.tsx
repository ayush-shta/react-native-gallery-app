import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import RootStacks from './navigation/navigation-stacks/root-stacks';

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <RootStacks />
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
