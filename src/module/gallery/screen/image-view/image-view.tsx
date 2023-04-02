import React, {createRef, useRef} from 'react';
import {Animated} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  gestureHandlerRootHOC,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';

import style from './style';
import DeleteImageFab from './components/delete-image-fab';
import {ModalStackParams} from '../../../../navigation/navigation.types';

const ImageView = gestureHandlerRootHOC(() => {
  const route = useRoute<RouteProp<ModalStackParams, 'imageView'>>();

  const {imageUrl, setPhotos} = route.params;

  const scale = useRef(new Animated.Value(1)).current;

  const pinchRef = createRef();

  const onPinchEvent = Animated.event([{nativeEvent: {scale}}], {
    useNativeDriver: true,
  });

  const handlePinchStateChange = ({nativeEvent}: any) => {
    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <>
      <PinchGestureHandler
        ref={pinchRef}
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={handlePinchStateChange}>
        <Animated.Image
          source={{uri: imageUrl}}
          style={[style.image, {transform: [{scale}]}]}
        />
      </PinchGestureHandler>
      <DeleteImageFab photoUri={imageUrl} setPhotos={setPhotos} />
    </>
  );
});

export default ImageView;
