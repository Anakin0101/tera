import { ButtonType } from '../Button.types';

import { useStyleTheme as usePrimaryButtonStyles } from '../PrimaryButton/PrimaryButton.styles';
import { useStyleTheme as useSecondaryButtonStyles } from '../SecondaryButton/SecondaryButton.styles';
import { useStyleTheme as useDestructiveButtonStyles } from '../DestructiveButton/DestructiveButton.styles';
import { useStyleTheme as useTextButtonStyles } from '../TextButton/TextButton.styles';
import { useStyleTheme as useOutlineButtonStyles } from '../OutlineButton/OutlineButton.styles';
import { ButtonStyleType } from './useButtonTypeStyle.types';

export const useButtonTypeStyle = (buttonType: ButtonType): ButtonStyleType => {
  const primaryButtonStyles: ButtonStyleType = usePrimaryButtonStyles();
  const secondaryButtonStyles: ButtonStyleType = useSecondaryButtonStyles();
  const destructiveButtonStyles: ButtonStyleType = useDestructiveButtonStyles();
  const textButtonStyles: ButtonStyleType = useTextButtonStyles();
  const outlineButtonStyles: ButtonStyleType = useOutlineButtonStyles();
  switch (buttonType) {
    case 'Primary':
      return primaryButtonStyles;
    case 'Secondary':
      return secondaryButtonStyles;
    case 'Text':
      return textButtonStyles;
    case 'Destructive':
      return destructiveButtonStyles;
    case 'Outline':
      return outlineButtonStyles;
  }
};
