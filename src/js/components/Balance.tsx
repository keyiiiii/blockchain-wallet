import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { apiUrl } from '../config';

export class Balance extends React.PureComponent<{}, {}> {
  private balanceForm: HTMLFormElement;

  postTransaction(e: React.SyntheticEvent<{}>) {
    e.preventDefault();
    const balanceFormData = this.balanceForm;
    const address = balanceFormData.address.value;

    fetch(`${apiUrl}/account/${address}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result: any) => result.json())
      .then((value: number) => {
        alert(`Account Balance: ${value}.`);
        console.log('result', value);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <div style={{ padding: 80 }}>
           <Grid container spacing={40}>
             <h2>Account Balance</h2>
             <form
               noValidate
               autoComplete="off"
               style={{display: "block", width: "100%"}}
               ref={(form: HTMLFormElement) => { this.balanceForm = form } }
             >
               <TextField
                 id="full-width"
                 label="Address"
                 InputLabelProps={{
                   shrink: true,
                 }}
                 placeholder="1"
                 fullWidth
                 margin="normal"
                 name="address"
               />
               <Button variant="contained" color="primary" onClick={this.postTransaction.bind(this)} type="submit">
                 SHOW
               </Button>
             </form>
           </Grid>
         </div>
      </div>
    );
  }
}
