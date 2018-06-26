import React from "react";
import { WrappedFieldProps } from 'redux-form/lib/Field';
import { TextField } from '@material-ui/core';

interface Props extends React.InputHTMLAttributes<{}> {
  label: string;
  placeholder: string;
  name: string;
}

export const Field: React.SFC<Props & WrappedFieldProps> = ({
  label,
  placeholder,
  name,
  input,
}) => (
  <div  {...input}>
    <TextField
      id="full-width"
      label={label}
      InputLabelProps={{
        shrink: true,
      }}
      placeholder={placeholder}
      fullWidth
      margin="normal"
      name={name}
    />
  </div>
);
