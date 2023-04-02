import {StyleSheet} from 'react-native';

import appTheme from '../../../../../../constants/app-theme';

const style = StyleSheet.create({
  container: {
    backgroundColor: appTheme.white,
  },
  optionsText: {
    padding: 16,
    color: appTheme.primary,
  },
  cancelText: {
    color: appTheme.secondaryRed,
  },
});

export default style;
