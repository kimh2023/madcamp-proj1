import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  containerDefaults: {flexDirection: 'row', alignItems: 'center', gap: 15},
  screenDefaults: {flexDirection: 'column', gap: 15},
  h1: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 25,
  },
  h2: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
  },
  h3: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 10,
  },
  tabBar: {
    fontFamily: 'Pretendard-ExtraBold',
    fontSize: 12,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default style;
