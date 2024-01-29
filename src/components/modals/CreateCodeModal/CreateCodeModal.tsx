import React, { useState, memo, useCallback } from 'react';
import { TouchableOpacity, View, FlatList } from 'react-native';
import { Text } from 'components/Text/Text';
import { createBudgetEnum } from './CreateModal.types';
import { closeModal } from 'utils/modal';
import { useBudget } from 'screens/BudgetTransactionScreen/container';
import { useStyles } from './CreateCodeModal.styles';
import RenderItem from './RenderItem';
import { renderItemProps } from './CreateModal.types';
import { getTextForIndex } from 'utils/transactionUtils';
import { ArrowHeader } from 'assets/SVGs/ArrowHeader';
import LottieView from 'lottie-react-native';

export const CreateCodeModal = memo(() => {
  const styles = useStyles();
  const { treasury, onChangeBudgetCode } = useBudget(true);
  const [chosenItems, setChosenItems] = useState<Array<string | null>>([]);
  const [activeCompIndex, setActiveCompIndex] = useState<number>(createBudgetEnum.FIRST_VIEW);

  const showHideComponent = useCallback((activeComponentIndex: number) => {
    setActiveCompIndex(activeComponentIndex);
  }, []);

  const handleBackPrompt = useCallback(() => {
    if (activeCompIndex === createBudgetEnum.FIRST_VIEW) {
      closeModal();
    } else {
      setActiveCompIndex(activeCompIndex - 1);
      setChosenItems(prevChosenItems => {
        prevChosenItems[activeCompIndex - 1] = null;
        return [...prevChosenItems];
      });

      onChangeBudgetCode('', String.fromCharCode('a'.charCodeAt(0) + activeCompIndex - 1));
    }
  }, [activeCompIndex, onChangeBudgetCode]);

  const renderSelectedItem = (index: number) => {
    return (
      <View style={styles.viewWrapper} key={index}>
        {!!chosenItems[index] && <Text children={chosenItems[index]} style={styles.selected} />}
      </View>
    );
  };
  const handleSetChosenItem = useCallback(
    (chosenItem: string | null) => {
      setChosenItems(prevChosenItems => {
        const updatedChosenItems = [...prevChosenItems];
        updatedChosenItems[activeCompIndex - 1] = chosenItem;
        return updatedChosenItems;
      });
    },
    [activeCompIndex, setChosenItems],
  );

  const handleChangeBudgetCode = useCallback(
    (code: string) => {
      onChangeBudgetCode(code, String.fromCharCode('a'.charCodeAt(0) + activeCompIndex - 1));
    },
    [activeCompIndex, onChangeBudgetCode],
  );
  const renderItem = ({ item, index }: renderItemProps) => {
    return (
      <RenderItem
        item={item}
        activeIndex={activeCompIndex}
        showAboveLine={index === 0}
        showUnderline={treasury && index < treasury?.length - 1}
        setChosenItem={handleSetChosenItem}
        onChangeBudgetCode={handleChangeBudgetCode}
        showHideComponent={() => showHideComponent(activeCompIndex + 1)}
      />
    );
  };

  return (
    <View>
      {!treasury ? (
        <View style={styles.loadingSpinnerContainer}>
          <LottieView
            style={styles.loadingSpinner}
            source={require('../../../components/LoadingView/LoadingViewAnimation.json')}
            autoPlay
            loop
          />
        </View>
      ) : (
        <View>
          <View style={styles.modalView}>
            {Array.from({ length: 3 }).map((_, index) => renderSelectedItem(index))}
          </View>
          <View>
            <Text children={getTextForIndex(activeCompIndex)} style={styles.label} />
          </View>
          <FlatList
            data={treasury}
            keyExtractor={(item, index) => item.id + index.toString()}
            renderItem={renderItem}
          />
          {activeCompIndex !== createBudgetEnum.FIRST_VIEW && (
            <TouchableOpacity onPress={handleBackPrompt} activeOpacity={0.8} style={styles.btn}>
              <ArrowHeader />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
});
