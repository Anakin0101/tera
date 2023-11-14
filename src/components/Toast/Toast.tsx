import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
  useAnimatedGestureHandler,
  Easing,
} from 'react-native-reanimated';
import { Success, Error } from 'assets/SVGs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { useStyleTheme } from './Toast.styles';
import { WithTimingConfig } from 'react-native-reanimated';
import useTheme from 'hooks/useTheme';
import { Text } from '../index';
interface ToastProps {
  errorMessage?: string;
  type?: 'error' | 'success' | 'warning' | 'default';
}

type ImagesType = {
  colors: any;
  check: any;
  send: any;
  translate: any;
  successIcon: React.ReactNode;
};

export interface ToastRef {
  start: (
    errorMessage: string,
    type?: 'error' | 'success' | 'warning' | 'default',
    height?: number,
  ) => void;
  stop: () => void;
}

type BackgroundStyle = {
  backgroundColor: string;
  icon: keyof ImagesType | React.ReactNode;
  textColor: string;
};

const defaultBackgroundStyle: BackgroundStyle = {
  backgroundColor: 'gray',
  icon: <Success />,
  textColor: 'white',
};

const DEFAULT_HEIGHT = 90;

export const Toast = forwardRef<ToastRef, ToastProps>((props, ref) => {
  const { Colors } = useTheme();
  const Yposition = useSharedValue(-75);
  const delay = useSharedValue(4000);
  const [toast, setToast] = useState<string>('');
  const s = useStyleTheme();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const insets = useSafeAreaInsets();
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  const typeToBackgroundStyle: Record<
    'error' | 'success' | 'warning' | 'default',
    BackgroundStyle
  > = {
    error: {
      backgroundColor: Colors.errorToastColor,
      icon: <Error />,
      textColor: Colors.textBlack,
    },
    success: {
      backgroundColor: Colors.successToastColor,
      icon: <Success />,
      textColor: Colors.successToastTextColor,
    },
    warning: {
      backgroundColor: Colors.successToastColor,
      icon: <Success />,
      textColor: Colors.successToastTextColor,
    },
    default: defaultBackgroundStyle,
  };

  useEffect(() => {
    setStatusBarHeight(insets.top);
  }, [insets]);

  useImperativeHandle(ref, () => ({
    start: (
      errorMessage: string,
      type?: 'error' | 'success' | 'warning' | 'default',
      containerHeight?,
    ) => {
      setToast(errorMessage);

      const timingConfig: WithTimingConfig = {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      };
      Yposition.value = withSequence(
        withTiming(statusBarHeight + 75, timingConfig),
        withDelay(delay.value, withTiming(-75, timingConfig)),
      );

      const backgroundStyle = typeToBackgroundStyle[type || 'default'];
      setBackgroundStyle(backgroundStyle);

      if (containerHeight) {
        setHeight(containerHeight);
      }
    },
    stop: () => {
      setToast('');
      setHeight(DEFAULT_HEIGHT);
      const timingConfig: WithTimingConfig = {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      };
      Yposition.value = withTiming(-75, timingConfig);
    },
  }));

  const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>(defaultBackgroundStyle);
  const bgColor = backgroundStyle.backgroundColor;
  const toastStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: Yposition.value }],
    backgroundColor: bgColor,
  }));

  const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      Yposition.value = statusBarHeight + 75;
    },
    onActive: e => {
      const timingConfig: WithTimingConfig = {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      };
      if (e.translationY <= -3) {
        Yposition.value = withTiming(-75, timingConfig);
      }
    },
    onEnd: e => {
      if (e.velocityY > 1000 || Yposition.value > 0) {
        const timingConfig: WithTimingConfig = {
          duration: 200,
          easing: Easing.inOut(Easing.ease),
        };
        Yposition.value = withTiming(-75, timingConfig);
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler} onHandlerStateChange={panGestureHandler}>
      <Animated.View style={[toastStyle, s.container, { height, zIndex: 1000 }]}>
        <Text>{backgroundStyle.icon}</Text>
        <Text label children={toast} style={[s.toastText, { color: backgroundStyle.textColor }]} />
      </Animated.View>
    </PanGestureHandler>
  );
});
