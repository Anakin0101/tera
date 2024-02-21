import React, { memo } from 'react';
import { View, Animated, Pressable } from 'react-native';
import { DeleteIcon, EditIcon } from 'assets/SVGs';
import { useStyles } from './CartItem.styles';

export interface SwipeButtonsActionsProps {
  trans: Animated.AnimatedInterpolation<number>;
  disableButtons: boolean;
  deleteOnPress: () => void;
  editOnPress: () => void;
}

export const SwipeButtonsActions: React.FC<SwipeButtonsActionsProps> = memo(
  ({ trans, disableButtons, deleteOnPress = () => {}, editOnPress = () => {} }) => {
    const styles = useStyles();

    return (
      <View style={styles.swipeableButtonsWrapper}>
        <Pressable disabled={disableButtons} onPress={deleteOnPress}>
          <Animated.View
            style={[
              styles.swipeableButton,
              {
                transform: [{ translateX: trans }],
              },
            ]}
          >
            <DeleteIcon />
          </Animated.View>
        </Pressable>
        <Pressable disabled={disableButtons} onPress={editOnPress}>
          <Animated.View
            style={[
              styles.swipeableButton,
              styles.editBtnWrapper,
              {
                transform: [{ translateX: trans }],
              },
            ]}
          >
            <EditIcon />
          </Animated.View>
        </Pressable>
      </View>
    );
  },
);
