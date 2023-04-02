import {FAB} from '@rneui/themed';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import appTheme from '../../../../../../constants/app-theme';
import AddBottomSheetPicker from '../add-bottom-sheet-picker';

const AddIcon = () => <Icon name="plus" size={16} color={appTheme.white} />;

interface IAddImageFabProps {
  reloadPhotos: () => void;
}

const AddImageFab = ({reloadPhotos}: IAddImageFabProps) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] =
    useState<boolean>(false);

  const onAddClick = () => setIsBottomSheetVisible(true);

  return (
    <>
      <FAB
        placement={'right'}
        icon={<AddIcon />}
        color={appTheme.primary}
        onPress={onAddClick}
      />
      <AddBottomSheetPicker
        isVisible={isBottomSheetVisible}
        handleClose={() => setIsBottomSheetVisible(false)}
        onSaveImage={reloadPhotos}
      />
    </>
  );
};

export default AddImageFab;
