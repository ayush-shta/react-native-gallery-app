import {FAB} from '@rneui/themed';
import React, {useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';

import appTheme from '../../../../../../constants/app-theme';
import {usePhotos} from '../../../../../../hooks/use-photos';
import DeleteBottomSheetPicker from '../delete-bottom-sheet-picker';

const DeleteIcon = () => (
  <Icon name="delete" size={16} color={appTheme.white} />
);

interface IDeleteImageFabProps {
  photoUri: string;
  setPhotos: (photos: PhotoIdentifier[]) => void;
}

const DeleteImageFab = (props: IDeleteImageFabProps) => {
  const {photoUri, setPhotos} = props;

  const [isBottomSheetVisible, setIsBottomSheetVisible] =
    useState<boolean>(false);

  const navigation = useNavigation();

  const {fetchPhotos} = usePhotos();

  const onDeleteClick = () => setIsBottomSheetVisible(true);

  const handleDelete = useCallback(async () => {
    setIsBottomSheetVisible(false);

    await CameraRoll.deletePhotos([photoUri]);

    navigation.goBack();
    const updatedPhotos = await fetchPhotos();

    setPhotos(updatedPhotos);
  }, [fetchPhotos, navigation, setPhotos, photoUri]);

  return (
    <>
      <FAB
        placement={'right'}
        icon={<DeleteIcon />}
        color={appTheme.primary}
        onPress={onDeleteClick}
      />
      <DeleteBottomSheetPicker
        handleDeletePress={handleDelete}
        isVisible={isBottomSheetVisible}
        handleClose={() => setIsBottomSheetVisible(false)}
      />
    </>
  );
};

export default DeleteImageFab;
