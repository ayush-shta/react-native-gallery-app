import React, {createContext, useContext, useState} from 'react';
import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';

interface IGalleryContext {
  photos: PhotoIdentifier[];
  setPhotos: (photos: PhotoIdentifier[]) => void;
}

interface IGalleryContextProps {
  children: React.ReactNode;
}

const GalleryContext = createContext<IGalleryContext>({
  photos: [],
  setPhotos: () => {},
});

export const GalleryContextProvider = ({children}: IGalleryContextProps) => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);

  const contextValue: IGalleryContext = {
    photos,
    setPhotos,
  };

  return (
    <GalleryContext.Provider value={contextValue}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGalleryContext = () => useContext(GalleryContext);
