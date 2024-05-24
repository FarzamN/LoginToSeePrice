import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const user = {
  name: 'Monkey D. Luffy',
  avatar: '../../../images/user/user-01.png',
  jobTitle: 'React Developer',
  email: 'pirate@gmail.com',
  city: 'Los Angeles',
  timezone: 'GTM-7',
} as const;

export function AccountInfo(): React.JSX.Element {
  return (
    <Card className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <CardContent>
        <Stack spacing={4.4} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={user.avatar} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5" className="font-medium text-black dark:text-white">{user.name}</Typography>
            <Typography color="text.secondary" variant="body2" className="font-medium text-black dark:text-white">
              {user.jobTitle} 
            </Typography>
            <Typography color="text.secondary" variant="body2" className="font-medium text-black dark:text-white">
              {user.email}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
