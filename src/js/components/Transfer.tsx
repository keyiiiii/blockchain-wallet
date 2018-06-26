import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { apiUrl } from '../config';

export class Transfer extends React.PureComponent<{}, {}> {
  private transactionForm: HTMLFormElement;

  postTransaction(e: React.SyntheticEvent<{}>) {
    e.preventDefault();
    const transactionFormData = this.transactionForm;
    const from = transactionFormData.from.value;
    const to = transactionFormData.to.value;
    const value = transactionFormData.value.value;

    fetch(`${apiUrl}/transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, value }),
    })
      .then((result: any) => {
        console.log('result', result);
        confirm('送金しました');
      })
      .catch((err: Error) => {
        console.error(err);
        alert('error: 残高が足りません');
      });
  }

  render() {
    return (
      <div style={{padding: 80}}>
        <Grid container spacing={40}>
          <h2>Token Transfer</h2>
          <form
            noValidate
            autoComplete="off"
            style={{display: "block", width: "100%"}}
            ref={(form: HTMLFormElement) => {
              this.transactionForm = form
            }}
          >
            <TextField
              id="full-width"
              label="From"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="1"
              fullWidth
              margin="normal"
              name="from"
            />
            <TextField
              id="full-width"
              label="To"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="2"
              fullWidth
              margin="normal"
              name="to"
            />
            <TextField
              id="full-width"
              label="Value"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="100"
              fullWidth
              margin="normal"
              name="value"
            />
            <Button variant="contained" color="primary" onClick={this.postTransaction.bind(this)} type="submit">
              PAYMENT
            </Button>
          </form>
        </Grid>
      </div>
    );
  }
}
