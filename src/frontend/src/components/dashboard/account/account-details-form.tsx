'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';

const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
] as const;

export function AccountDetailsForm(): React.JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <CardHeader subheader="" title="Admin Info" className="font-extrabold text-black dark:text-white" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel className="font-medium text-black dark:text-bodydark2">First name</InputLabel>
                <OutlinedInput defaultValue="Sofia" label="First name" name="firstName" className="font-medium text-black dark:text-white"/>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12} >
              <FormControl fullWidth required>
                <InputLabel className="font-medium text-black dark:text-bodydark2">Last name</InputLabel>
                <OutlinedInput className="font-medium text-black dark:text-white" defaultValue="Rivers" label="Last name" name="lastName" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel className="font-medium text-black dark:text-bodydark2">Email address</InputLabel>
                <OutlinedInput className="font-medium text-black dark:text-white" defaultValue="sofia@devias.io" label="Email address" name="email" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel className="font-medium text-black dark:text-bodydark2">Phone number</InputLabel>
                <OutlinedInput className="font-medium text-black dark:text-white" label="Phone number" name="phone" type="tel" />
              </FormControl>
            </Grid>
      
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" >Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
}
