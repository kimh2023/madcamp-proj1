import React from 'react';
import {Image, View} from 'react-native';

import ContactIcon from '@src/assets/icons/contact-icon.svg';

import style from '@src/styles/style';

function ContactImage({image}: {image: string | undefined}) {
  return (
    <React.Fragment>
      {image ? (
        <View
          style={[
            style.containerDefaults,
            {
              borderRadius: 400,
              overflow: 'hidden',
            },
          ]}>
          <Image
            source={{uri: image}}
            style={{
              height: 130,
              width: 130,
            }}
          />
        </View>
      ) : (
        <ContactIcon width={130} height={130} />
      )}
    </React.Fragment>
  );
}

export default ContactImage;
