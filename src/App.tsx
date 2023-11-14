import 'react-native-gesture-handler';
import React from 'react';
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

const App = () => {
  return (
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
