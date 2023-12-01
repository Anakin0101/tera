import React, { useState, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { Transfer } from './Transfer';
import { CardSwap } from './CardSwap';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { Button } from 'components';
import { openModal } from 'utils/modal';
import { DestinationModal } from 'components/DestinationModal/DestinationModal';

export const TransferToAccountScreen = ({}) => {
  const { accountFromData, accountToData } = useAppSelector(state => state.transfers);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const inputRef = useRef(null);

  const handleTextChange = (text: string) => {
    setIsButtonDisabled(!text || text.trim() === '');
  };
  const openTransferModal = () => {
    Keyboard.dismiss();
    openModal({
      title: 'დანიშნულება',
      element: <DestinationModal />,
    });
  };

  const styles = useStyleTheme();
  return (
    <View style={styles.container}>
      {/* <Convert /> */}
      <Transfer
        onTextChange={handleTextChange}
        inputRef={inputRef}
        openTransferModal={openTransferModal}
      />
      <CardSwap accountFromData={accountFromData} accountToData={accountToData} />
      <View style={styles.buttonView}>
        <Button.Primary text="onboarding.next" fullWidth disabled={isButtonDisabled} />
      </View>
    </View>
  );
};
