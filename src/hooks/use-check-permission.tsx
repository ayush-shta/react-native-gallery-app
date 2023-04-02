import {useCallback} from 'react';
import {Alert, Platform} from 'react-native';
import RNPermissions, {
  Permission,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import {AppPermission} from '../types/permission.types';

interface IPermissionRequest {
  permission: Permission;
  description: string;
}

const getPermissionRequest = (
  permissionRequestType: AppPermission,
): IPermissionRequest | undefined => {
  switch (permissionRequestType) {
    case AppPermission.photoLibrary: {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

      const description = 'photo library';

      return {
        permission,
        description,
      };
    }

    case AppPermission.camera: {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;

      const description = 'camera';

      return {
        permission,
        description,
      };
    }
  }
};

export const useCheckPermission = () => {
  const checkPermission = useCallback(async (permissionType: AppPermission) => {
    const permissionRequest = getPermissionRequest(permissionType);

    if (!permissionRequest) {
      Alert.alert('Error', 'Permission Request not supported');

      return;
    }

    const {permission, description} = permissionRequest;

    const permissionStatus = await RNPermissions.check(permission).then(
      result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert(
              'Error',
              `Hardware to support ${description} is not available`,
            );
            break;

          case RESULTS.BLOCKED:
            Alert.alert(
              'Error',
              `Permission to access  ${description} was blocked, please grant manually`,
              [{text: 'OK'}],
            );
            break;

          case RESULTS.DENIED: {
            return RNPermissions.request(permission).then(result => {
              if (result === RESULTS.GRANTED) {
                return true;
              }
              Alert.alert(
                'Error',
                `Permission to access  ${description} was not granted, please grant manually`,
                [{text: 'OK'}],
              );
            });
          }

          default:
            return true;
        }
      },
    );

    return permissionStatus;
  }, []);

  return {checkPermission};
};
