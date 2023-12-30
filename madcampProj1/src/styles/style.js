import {globalVariables} from './globalVariables';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  containerDefaults: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: globalVariables.gap.verticalGap,
  },
  screenDefaults: {flex: 1, flexDirection: 'column', gap: 15},
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
  button: {
    fontFamily: 'Pretendard-ExtraBold',
    fontSize: 17,
  },
  input: {
    borderWidth: 2.2,
    borderColor: globalVariables.color.blue1,
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 18,
    flex: 1,
  },
});

export default style;
