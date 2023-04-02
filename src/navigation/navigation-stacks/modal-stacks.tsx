import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import appTheme from '../../constants/app-theme';
import {ModalStackParams} from '../navigation.types';
import ImageView from '../../module/gallery/screen/image-view';
import ImageGallery from '../../module/gallery/screen/image-gallery';

const ModalStack = createNativeStackNavigator<ModalStackParams>();

const ModalStacks = () => {
  return (
    <ModalStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: appTheme.primary},
        headerTintColor: appTheme.white,
      }}>
      <ModalStack.Screen
        name="imageGallery"
        options={{title: 'Image Gallery'}}
        component={ImageGallery}
      />
      <ModalStack.Screen
        name="imageView"
        options={{title: ''}}
        component={ImageView}
      />
    </ModalStack.Navigator>
  );
};

export default ModalStacks;
