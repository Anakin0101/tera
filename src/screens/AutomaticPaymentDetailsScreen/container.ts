import { useCallback, useMemo, useState } from 'react';
import { Colors } from 'theme/Variables';

export const useAutomaticPaymentDetails = () => {
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);

  const toggleActionSheet = useCallback(() => {
    setIsActionSheetVisible(prev => !prev);
  }, []);

  const actionItems = useMemo(
    () => [
      {
        label: 'common.edit',
        onPress: () => {},
      },
      {
        label: 'common.delete',
        color: Colors.error,
        onPress: () => {},
      },
    ],
    [],
  );

  return {
    isActionSheetVisible,
    toggleActionSheet,
    actionItems,
  };
};
