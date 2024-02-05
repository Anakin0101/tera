import 'react-native-gesture-handler';
import React, { useLayoutEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from 'store';
import { Navigation } from 'navigation';
import 'translations';

import { saveToastRef } from 'utils/toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modal, Toast } from 'components';
import { saveModalRef } from 'utils/modal';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { LogBox, Platform, StatusBar } from 'react-native';
import { Colors } from 'theme/Variables';

const App = () => {
  //  We set statusbar custom color - only for android on the root level
  //   For IOS, we need to tweak the statusbar, so CustomStatusbar Component was created
  useLayoutEffect(() => {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(Colors.dashboardBackground);
    }
  }, []);

  LogBox.ignoreAllLogs();

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BottomSheetModalProvider>
              <Navigation />
              <Modal ref={saveModalRef} />
              <Toast ref={saveToastRef} />
            </BottomSheetModalProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
