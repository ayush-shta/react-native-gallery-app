import {useCallback} from 'react';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {GALLERY_NAME} from '../module/gallery/gallery.constants';

export const usePhotos = () => {
  const fetchPhotos = useCallback(async () => {
    // setIsRefreshing(true);

    // TODO find alternative
    const totalImages = 40;

    const photosResponse = await CameraRoll.getPhotos({
      first: totalImages,
      groupTypes: 'Album',
      groupName: GALLERY_NAME,
    });

    return photosResponse.edges;
  }, []);

  return {fetchPhotos};
};
