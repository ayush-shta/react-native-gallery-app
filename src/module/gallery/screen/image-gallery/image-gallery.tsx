import {View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import React, {useCallback, useEffect, useState} from 'react';

import style from './style';
import GalleryItem from './components/gallery-item';
import AddImageFab from './components/add-image-fab';
import {usePhotos} from '../../../../hooks/use-photos';
import {AppPermission} from '../../../../types/permission.types';
import {useCheckPermission} from '../../../../hooks/use-check-permission';
import {GalleryContextProvider, useGalleryContext} from '../../gallery.context';

const ImageGallery = () => {
  const {photos, setPhotos} = useGalleryContext();
  const {fetchPhotos} = usePhotos();
  const {checkPermission} = useCheckPermission();

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const loadPhotos = useCallback(async () => {
    const loadedPhotos = await fetchPhotos();
    setPhotos(loadedPhotos);
  }, [fetchPhotos, setPhotos]);

  const reloadPhotos = useCallback(async () => {
    setIsRefreshing(true);
    await loadPhotos();
    setIsRefreshing(false);
  }, [loadPhotos]);

  useEffect(() => {
    const initialze = async () => {
      const isPermissionGranted = await checkPermission(
        AppPermission.photoLibrary,
      );

      isPermissionGranted && (await loadPhotos());
    };

    initialze();
  }, [loadPhotos, checkPermission]);

  return (
    <View style={style.container}>
      <FlatGrid
        data={photos}
        keyExtractor={item => item.node.image.uri}
        extraData={photos}
        onRefresh={reloadPhotos}
        refreshing={isRefreshing}
        renderItem={({item}) => <GalleryItem imageUrl={item.node.image.uri} />}
      />
      <AddImageFab reloadPhotos={reloadPhotos} />
    </View>
  );
};

const ImageGalleryWrapper = () => {
  return (
    <GalleryContextProvider>
      <ImageGallery />
    </GalleryContextProvider>
  );
};

export default ImageGalleryWrapper;
