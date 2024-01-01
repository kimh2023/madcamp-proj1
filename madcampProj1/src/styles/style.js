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
    color: globalVariables.color.dark,
  },
  h2: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    color: globalVariables.color.dark,
  },
  h3: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    color: globalVariables.color.dark,
  },
  h4: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 10,
    color: globalVariables.color.dark,
  },
  tabBar: {
    fontFamily: 'Pretendard-ExtraBold',
    fontSize: 10,
  },
  button: {
    fontFamily: 'Pretendard-ExtraBold',
    fontSize: 17,
    color: globalVariables.color.dark,
    textShadowColor: globalVariables.color.white,
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
  },
  input: {
    borderWidth: 2.2,
    borderColor: globalVariables.color.blue1,
    borderRadius: 50,
    height: 40,
    paddingVertical: 0,
    paddingHorizontal: 18,
    flex: 1,
  },
});

export default style;
