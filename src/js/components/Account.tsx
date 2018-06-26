import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { apiUrl } from '../config';

export class Account extends React.PureComponent<{}, {}> {
  private seedForm: HTMLFormElement;

  postAccount(e: React.SyntheticEvent<{}>) {
    e.preventDefault();
    const seedFormData = this.seedForm;
    const seed = seedFormData.seed.value;

    fetch(`${apiUrl}/account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seed }),
    })
      .then((result: any) => result.json())
      .then((account: {
        address: string;
      }) => {
        alert(`Account Balance: ${account.address}`);
        console.log('result', account.address);
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
             <h2>Sign up</h2>
             <form
               noValidate
               autoComplete="off"
               style={{display: "block", width: "100%"}}
               ref={(form: HTMLFormElement) => { this.seedForm = form } }
             >
               <TextField
                 id="full-width"
                 label="Seed"
                 InputLabelProps={{
                   shrink: true,
                 }}
                 placeholder="12345"
                 fullWidth
                 margin="normal"
                 name="seed"
               />
               <Button variant="contained" color="primary" onClick={this.postAccount.bind(this)} type="submit">
                 CREATE ADDRESS
               </Button>
             </form>
           </Grid>
         </div>
      </div>
    );
  }
}
