import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeStackParams} from '../navigation.types';

import ModalStacks from './modal-stacks';

const HomeStack = createNativeStackNavigator<HomeStackParams>();

const HomeStacks = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="modal" component={ModalStacks} />
    </HomeStack.Navigator>
  );
};

export default HomeStacks;
