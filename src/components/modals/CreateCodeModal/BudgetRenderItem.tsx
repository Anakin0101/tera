import React from 'react';
import { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'components/Text/Text';
import { closeModal } from 'utils/modal';
import { createBudgetEnum } from './CreateModal.types';
import { Divider } from 'components/Divider/Divider';
import { debounce } from 'utils/debounce';
interface RenderItemProps {
  item: {
    id: string;
    name: string;
  };
  showUnderline: boolean | undefined;
  showAboveLine: boolean;
  setChosenItem: (id: string) => void;
  onChangeBudgetCode: (id: string) => void;
  showHideComponent: () => void;
  activeIndex: number;
}

const BudgetRenderItem: FunctionComponent<RenderItemProps> = ({
  item,
  setChosenItem,
  onChangeBudgetCode,
  showHideComponent,
  activeIndex,
  showUnderline,
  showAboveLine,
}) => {
  const debouncedCloseModal = debounce(() => {
    closeModal();
  }, 500);
  const handlePress = () => {
    setChosenItem(item.id);
    onChangeBudgetCode(item.id);
    showHideComponent();

    if (activeIndex >= createBudgetEnum.THIRD_VIEW) {
      debouncedCloseModal();
    }
  };

  return (
    <View>
      {showAboveLine && <Divider height={1} marginTop={18} marginBottom={18} width="100%" />}
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Text children={`${item.id}    ${item.name}`} />
      </TouchableOpacity>
      {showUnderline && <Divider height={1} marginTop={18} marginBottom={18} width="100%" />}
    </View>
  );
};

export default BudgetRenderItem;
