import { useLogout } from 'hooks/useLogout';
import React, { ComponentType, useEffect } from 'react';
import BackgroundTimer from 'react-native-background-timer';

export const withActivityTimeout = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const { handleLogout } = useLogout();

    useEffect(() => {
      let timerId = BackgroundTimer.setTimeout(() => {
        handleLogout();
      }, 10000); // 5 minutes

      return () => {
        BackgroundTimer.clearTimeout(timerId);
      };
    }, [handleLogout]);

    return <WrappedComponent {...props} />;
  };
};
