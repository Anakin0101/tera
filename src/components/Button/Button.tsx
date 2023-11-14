import { ButtonProps, ButtonType } from './Button.types';
import { withButton } from 'components/HOC';

export const Button: {
  [key in ButtonType]: React.FC<ButtonProps>;
} = {
  Primary: withButton('Primary'),
  Secondary: withButton('Secondary'),
  Destructive: withButton('Destructive'),
  Text: withButton('Text'),
  Outline: withButton('Outline'),
};

// -- usage --
//<Button.Primary
//   text="Primary button - full width"
//   size="large"
//   fullWidth
//   disabled />

// <Button.Text
// text="Text button"
// size="large"
// fullWidth
// disabled
// />
