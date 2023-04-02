export type RootStackParams = {
  homeStacks: undefined;
};

export type HomeStackParams = {
  modal: undefined;
};

export type ModalStackParams = {
  imageGallery: {imageUrl: string};
  imageView: {imageUrl: string; setPhotos: () => void};
};
