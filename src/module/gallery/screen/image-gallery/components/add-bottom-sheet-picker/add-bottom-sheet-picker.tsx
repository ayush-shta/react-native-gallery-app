import React, {useCallback} from 'react';
import {BottomSheet} from '@rneui/themed';
import {Pressable, Text, View} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import style from './style';
import {GALLERY_NAME} from '../../../../gallery.constants';
import {AppPermission} from '../../../../../../types/permission.types';
import {useCheckPermission} from '../../../../../../hooks/use-check-permission';

interface IBottomSheetPickerProps {
  isVisible: boolean;
  handleClose: () => void;
  onSaveImage: () => void;
}

const AddBottomSheetPicker = (props: IBottomSheetPickerProps) => {
  const {isVisible, handleClose, onSaveImage} = props;
  const {checkPermission} = useCheckPermission();

  const handleSave = useCallback(
    async (result: ImagePickerResponse) => {
      if (result.assets) {
        const fileAsset = result.assets[0];

        fileAsset.uri &&
          CameraRoll.save(fileAsset.uri, {type: 'photo', album: GALLERY_NAME});
      }
      onSaveImage();
    },
    [onSaveImage],
  );

  const onCameraPress = useCallback(async () => {
    handleClose();

    const isPermissionGranted = await checkPermission(AppPermission.camera);

    if (!isPermissionGranted) {
      return;
    }

    const result = await launchCamera({mediaType: 'photo'});

    handleSave(result);
  }, [checkPermission, handleClose, handleSave]);

  const onLibraryPress = useCallback(async () => {
    handleClose();

    const isPermissionGranted = await checkPermission(
      AppPermission.photoLibrary,
    );

    if (!isPermissionGranted) {
      return;
    }

    const result = await launchImageLibrary({mediaType: 'photo'});

    handleSave(result);
  }, [handleSave, checkPermission, handleClose]);

  return (
    <BottomSheet isVisible={isVisible}>
      <View style={style.container}>
        <Pressable onPress={onCameraPress}>
          <Text style={style.optionsText}>From Camera</Text>
        </Pressable>
        <Pressable onPress={onLibraryPress}>
          <Text style={style.optionsText}>Add From Library</Text>
        </Pressable>
        <Pressable onPress={handleClose}>
          <Text style={[style.optionsText, style.cancelText]}>Cancel</Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
};

export default AddBottomSheetPicker;
