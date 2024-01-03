import ContactImage from '../ContactImage';
import React from 'react';
import {Pressable, View} from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

import ImageEditIcon from '@src/assets/icons/icon-edit-image.svg';

const EditImageInput = ({
  thumbnailPath,
  setThumbnail,
}: {
  thumbnailPath: {url?: string; originalPath?: string};
  setThumbnail: (originalPath: string, uriPath: string) => void;
}) => {
  const handleEditImage = () => {
    const option: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
    };
    launchImageLibrary(option, (response: ImagePickerResponse) => {
      if (
        response.assets &&
        response.assets.length >= 0 &&
        response.assets[0] &&
        response.assets[0].uri &&
        response.assets[0].originalPath
      ) {
        setThumbnail(response.assets[0].originalPath, response.assets[0].uri);
        console.log(
          response.assets && response.assets.length >= 0 && response.assets[0],
        );
      }
    });
  };

  return (
    <Pressable onPress={handleEditImage}>
      <ContactImage image={thumbnailPath.url} />
      <View style={{position: 'absolute', bottom: 0, right: 0}}>
        <ImageEditIcon width={35} height={35} />
      </View>
    </Pressable>
  );
};

export default React.memo(EditImageInput);
