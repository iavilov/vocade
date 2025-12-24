import { Colors } from '@/constants/design-tokens';
import { createBrutalShadow } from '@/utils/platform-styles';
import { TextStyle, ViewStyle } from 'react-native';

export const NavigationStyles = {
  container: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    height: 80,
    backgroundColor: Colors.surface,
    borderWidth: 3,
    borderColor: Colors.border,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    ...createBrutalShadow(4, Colors.border),
    alignSelf: 'center',
    maxWidth: 480,
  } as ViewStyle,

  tabItem: {
    flex: 1,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  indicator: {
    position: 'absolute',
    top: 6, // (70 - 3*2 - 48) / 2 = 8px margin from borders
    left: -5,
    width: 60, // Square width
    height: 60, // Square height
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 8,
    ...createBrutalShadow(2, Colors.border),
    zIndex: 0,
  } as ViewStyle,

  floatingButton: {
    position: 'relative',
    top: -24,
    height: 64,
    width: 64,
    backgroundColor: Colors.primary,
    borderWidth: 3,
    borderColor: Colors.border,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...createBrutalShadow(6, Colors.border),
  } as ViewStyle,

  floatingButtonInactive: {
    backgroundColor: Colors.surface,
    ...createBrutalShadow(4, Colors.border),
  } as ViewStyle,

  label: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: Colors.gray500,
  } as TextStyle,

  activeLabel: {
    color: Colors.textMain,
  } as TextStyle,
};

export const TAB_BAR_SCREEN_OPTIONS = {
  headerShown: false,
  tabBarShowLabel: false, // We handle labels in custom tab bar
};
