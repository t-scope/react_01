import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';

import React ,{CSSProperties, FC} from 'react'
import { NavLink } from 'react-router-dom';

interface SidebarProps{
    drawerWidth:number,
    mobileOpen:boolean,
    handleDrawerClose:()=>void,
    handleDrawerTransitionEnd:()=>void
}

interface menuItem{
  text:string,
  path:string,
  icon:React.ComponentType,

}


const SideBar:FC<SidebarProps> = ({drawerWidth,mobileOpen,handleDrawerClose,handleDrawerTransitionEnd}) => {

  const menuItems:menuItem[] = [
    {  text:"Home", path:"/",icon:HomeIcon},
    {  text:"Report", path:"/report",icon:EqualizerIcon}
  ]
 const baseLinkStyle:CSSProperties={
    textDecoration:"none",
    color:"inherit",
    display:"block"
 }
  const activeLinkStyle:CSSProperties= {
    backgroundColor:"rgba(0,0,0,0.08)"
  }
  
    const drawer = (
        <div>
          <Toolbar />
          <Divider />
          <List>
            {menuItems.map((item, index) => (
              <NavLink key={index} to={item.path} style={(({isActive})=>{
                return {
                  ...baseLinkStyle,
                  ...(isActive ? activeLinkStyle : {})
                }
              })}>
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
              </NavLink>
            
            ))}
          </List>
         
        </div>
      );
  
    return (
          <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* モバイル用*/}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
          
        </Drawer>
          {/* PC用*/}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
  )
}

export default SideBar
