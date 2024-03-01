import { useEffect } from 'react';
import { EmitterSubscription, Keyboard, KeyboardEventName } from 'react-native';

export const useTrackKeyboardActivity = ({
  eventType,
  eventTypes,
  callbackFn = () => {},
}: {
  eventType?: KeyboardEventName;
  eventTypes?: KeyboardEventName[];
  callbackFn?: () => void;
}) => {
  useEffect(() => {
    let keyboardSubscription: EmitterSubscription;

    if (eventTypes) {
      eventTypes.forEach(type => {
        keyboardSubscription = Keyboard.addListener(type, callbackFn);
      });
    }

    if (eventType) {
      keyboardSubscription = Keyboard.addListener(eventType, callbackFn);
    }

    return () => {
      keyboardSubscription.remove();
    };
  }, [callbackFn, eventType, eventTypes]);
};
