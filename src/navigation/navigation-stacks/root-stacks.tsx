import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParams} from '../navigation.types';

import HomeStacks from './home-stacks';

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootStacks = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="homeStacks" component={HomeStacks} />
    </RootStack.Navigator>
  );
};

export default RootStacks;
