import React, { memo } from 'react';
import { View, Animated, Pressable } from 'react-native';
import { DeleteIcon } from 'assets/SVGs';
import { useStyles } from './CartPaymentItem.styles';

export interface SwipeButtonsActionsProps {
  trans: Animated.AnimatedInterpolation<number>;
  disableButtons: boolean;
  deleteOnPress: () => void;
}

export const SwipeButtonsActions: React.FC<SwipeButtonsActionsProps> = memo(
  ({ trans, disableButtons, deleteOnPress = () => {} }) => {
    const styles = useStyles();

    return (
      <View style={styles.swipeableButtonsWrapper}>
        <Pressable disabled={disableButtons} onPress={deleteOnPress}>
          <Animated.View
            style={[
              styles.swipeableButton,
              styles.editBtnWrapper,
              {
                transform: [{ translateX: trans }],
              },
            ]}
          >
            <DeleteIcon />
          </Animated.View>
        </Pressable>
      </View>
    );
  },
);
