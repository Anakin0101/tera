import React from 'react';
import { ServiceFieldTypeEnum } from 'services/apis/paymentsAPI/paymentEnums';
import { TextInput } from 'components/TextInput/TextInput';
import { PaymentFieldInputProps } from './PaymentFieldInput.types';

export const PaymentFieldInput: React.FC<PaymentFieldInputProps> = ({
  item,
  value,
  onChangeText,
}) => {
  switch (item.fieldType) {
    case ServiceFieldTypeEnum.Text:
      return (
        <TextInput
          label={item.name}
          value={value}
          onChangeText={text => {
            onChangeText(item.id, text);
          }}
          marginTop={24}
        />
      );
    case ServiceFieldTypeEnum.Date:
      return <></>;
    case ServiceFieldTypeEnum.DropDown:
      return <></>;
    case ServiceFieldTypeEnum.Number:
      return <></>;
    default:
      return <></>;
  }
};
