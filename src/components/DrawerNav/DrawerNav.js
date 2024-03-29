import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListIcon from '@mui/icons-material/List';
// type Anchor = 'top' | 'left' | 'bottom' | 'right';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
export default function SwipeableTemporaryDrawer() {
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor, open) =>
    (event) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event ).key === 'Tab' ||
          (event ).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home'].map((text, index) => (
            <Link to='/' style={{textDecoration:'none',color:'rgba(0, 0, 0, 0.87)'}} >
          <ListItem key={text} disablePadding>
            <ListItemButton >
            
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
           
            </ListItemButton>
          </ListItem>
          </Link> 
        ))}
      </List>
      <Divider />
      <List>
      

<ListItem  disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
               <LogoutIcon/>
              </ListItemIcon>
              <ListItemText primary='Se déconnecter' />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {(['right'] ).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><ListIcon style={{color:'black'}}/></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}