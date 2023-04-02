import React from 'react';
import {Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import style from './style';
import {useGalleryContext} from '../../../../gallery.context';

interface GalleryItemProps {
  imageUrl: string;
}

const GalleryItem = (props: GalleryItemProps) => {
  const {imageUrl} = props;
  const navigation = useNavigation<any>();
  const {setPhotos} = useGalleryContext();

  const onImageClick = () =>
    navigation.navigate('imageView', {imageUrl, setPhotos});

  return (
    <Pressable onPress={onImageClick}>
      <Image source={{uri: imageUrl}} style={style.image} />
    </Pressable>
  );
};

export default GalleryItem;
