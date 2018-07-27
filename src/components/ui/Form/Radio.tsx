import * as React from 'react';
import { WrappedFieldProps } from 'redux-form/lib/Field';
import { Radio as MaterialRadio } from '@material-ui/core';

interface Props extends React.InputHTMLAttributes<{}> {
  name: string;
}

export const Radio: React.SFC<Props & WrappedFieldProps> = ({
  name,
  input,
  ...props
}) => {
  const { value, ...other } = input;
  return (
    <MaterialRadio
      onChange={input.onChange}
      value={value}
      {...props}
      {...other}
    />
  );
};
