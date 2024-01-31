import React, { FC, memo, useCallback } from 'react';
import { View, TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';
import { Item } from './Item';
import { Text } from '../index';
import { Colors } from 'theme/Variables';
import { ActionSheetProps } from './ActionSheet.types';
import { useStyles } from './ActionSheet.styles';

export const ActionSheet: FC<ActionSheetProps> = memo(
  ({ isVisible, onCancel, actionItems, title }) => {
    const styles = useStyles();

    const getActions = useCallback(() => {
      return actionItems?.map((actionItem, index) => (
        <Item
          key={index}
          item={actionItem}
          isFirst={!title && index === 0}
          isLast={index === actionItems.length - 1}
        />
      ));
    }, [actionItems, title]);

    return (
      <Modal isVisible={isVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          {title && (
            <View style={styles.title}>
              <Text children={title} center label />
            </View>
          )}
          {getActions()}
          <TouchableHighlight onPress={onCancel} style={styles.cancel}>
            <Text center children="common.cancel" size={18} color={Colors.primary} />
          </TouchableHighlight>
        </View>
      </Modal>
    );
  },
);
