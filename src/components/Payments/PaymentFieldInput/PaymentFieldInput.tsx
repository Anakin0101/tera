import React from 'react';
import { ServiceFieldTypeEnum } from 'services/apis/paymentsAPI/paymentEnums';
import { ControlledInput, TextInput } from 'components';
import { PaymentFieldInputProps } from './PaymentFieldInput.types';
import { PaymentDropDownFieldInput } from './PaymentDropDownFieldInput';

/**
 * Functional component for rendering different types of payment field inputs based on the fieldType.
 *
 * @function
 * @name PaymentFieldInput
 * @memberof YourComponent
 * @param {PaymentFieldInputProps} props - The properties passed to the component.
 * @param {object} props.item - The payment field item.
 * @param {string} props.value - The current value of the input.
 * @param {Function} props.onChangeText - The callback function to handle text changes.
 * @returns {React.ReactNode} - The rendered React component based on the fieldType.
 */
export const PaymentFieldInput: React.FC<PaymentFieldInputProps> = ({
  item,
  value,
  onChangeText,
  control,
  errors,
}) => {
  switch (item.fieldType) {
    case ServiceFieldTypeEnum.Text:
      return (
        <ControlledInput
          control={control}
          name={item.key}
          label={item.name}
          marginTop={24}
          errors={errors}
          required={true}
          rules={{
            required: {
              value: item.required,
              message: 'common:form.is_required',
            },
          }}
          handleChange={text => {
            text && onChangeText(item.id, text);
          }}
        />
      );
    case ServiceFieldTypeEnum.Date:
      return <></>;
    case ServiceFieldTypeEnum.DropDown:
      return (
        <PaymentDropDownFieldInput
          item={item}
          value={value}
          onChangeText={text => {
            onChangeText(item.id, text);
          }}
        />
      );
    case ServiceFieldTypeEnum.Number:
      return (
        <TextInput
          label={item.name}
          value={value}
          onChangeText={text => {
            onChangeText(item.id, text);
          }}
          marginTop={24}
          keyboardType="numeric"
        />
      );
    default:
      return <></>;
  }
};
