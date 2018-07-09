import * as React from 'react';
import { WrappedFieldProps } from 'redux-form/lib/Field';
import { Select as MaterialSelect } from '@material-ui/core';

interface Props extends React.InputHTMLAttributes<{}> {
  id: string;
  name: string;
}

export const Select: React.SFC<Props & WrappedFieldProps> = ({
  id,
  name,
  input,
  ...props
}) => (
  <MaterialSelect
    inputProps={{
      id,
      name,
    }}
    {...props}
    {...input}
  />
);
