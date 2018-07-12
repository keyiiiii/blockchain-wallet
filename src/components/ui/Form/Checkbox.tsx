import * as React from 'react';
import { WrappedFieldProps } from 'redux-form/lib/Field';
import { Checkbox as MaterialCheckbox } from '@material-ui/core';

interface Props extends React.InputHTMLAttributes<{}> {
  name: string;
}

export const Checkbox: React.SFC<Props & WrappedFieldProps> = ({
  name,
  input,
  ...props
}) => {
  const { value, ...other } = input;
  return (
    <MaterialCheckbox
      onChange={input.onChange}
      value={name}
      {...props}
      {...other}
    />
  );
};
