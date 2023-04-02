import React from 'react';
import {BottomSheet} from '@rneui/themed';
import {Pressable, Text, View} from 'react-native';

import style from './style';

interface IBottomSheetPickerProps {
  isVisible: boolean;
  handleClose: () => void;
  handleDeletePress: () => void;
}

const DeleteBottomSheetPicker = (props: IBottomSheetPickerProps) => {
  const {isVisible, handleClose, handleDeletePress} = props;

  return (
    <BottomSheet isVisible={isVisible}>
      <View style={style.container}>
        <Text style={style.titleText}>Delete From Library?</Text>
        <Pressable onPress={handleDeletePress}>
          <Text style={style.optionsText}>Delete</Text>
        </Pressable>
        <Pressable onPress={handleClose}>
          <Text style={[style.optionsText, style.cancelText]}>Cancel</Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
};

export default DeleteBottomSheetPicker;
