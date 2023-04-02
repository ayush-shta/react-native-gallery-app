import {StyleSheet} from 'react-native';

import appTheme from '../../constants/app-theme';

const style = StyleSheet.create({
  header: {
    backgroundColor: appTheme.primary,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 24,
    paddingHorizontal: 8,
  },
});

export default style;
