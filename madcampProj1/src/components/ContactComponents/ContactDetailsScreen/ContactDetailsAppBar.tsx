import React from 'react';
import {Linking, Platform, Pressable, View} from 'react-native';

import PhoneIcon from '@src/assets/icons/app-icon-phone.svg';
import SMSIcon from '@src/assets/icons/app-icon-sms.svg';

import style from '@src/styles/style';

function ContactDetailsAppBar({
  phoneNumber,
}: {
  phoneNumber: string | undefined;
}) {
  const handleSMS = () => {
    if (!phoneNumber) {
      return;
    }
    const defaultSMSText = '몰입캠프에 참가해 봐!';
    Linking.openURL(
      Platform.OS === 'android'
        ? `sms:${phoneNumber}?body=${defaultSMSText}`
        : `sms:/open?addresses=${phoneNumber}&body=${defaultSMSText}`,
    );
  };
  const handlePhone = () => {
    if (!phoneNumber) {
      return;
    }
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={[style.containerDefaults, {marginTop: 20, gap: 20}]}>
      <Pressable onPress={handlePhone}>
        <PhoneIcon width={25} height={25} />
      </Pressable>
      <Pressable onPress={handleSMS}>
        <SMSIcon width={25} height={25} />
      </Pressable>
    </View>
  );
}

export default ContactDetailsAppBar;
