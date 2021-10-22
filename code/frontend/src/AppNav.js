import React, { useState } from "react"

import { Link, useLocation } from "react-router-dom"

import { styled } from "@mui/material/styles"

import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Icon from "@mui/material/Icon"
import MenuIcon from "@mui/icons-material/Menu"
import Typography from "@mui/material/Typography"
import Drawer from "@mui/material/Drawer"

const drawerWidth = 200

const AppNav = (props) => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const handleDrawerToggle = () => {
    setOpen(!open)
  }
  const drawerItems = [
    { text: "Search", icon: "search" },
    { text: "Upload", icon: "upload" },
    { text: "Status", icon: "assessment" },
  ]
  let selected
  for (let item of drawerItems) {
    if (location.pathname.startsWith(`/${item.text.toLowerCase()}`)) {
      selected = item.text
      break
    }
  }
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar)
  const drawer = (
    <>
      <Offset />
      <Divider />
      <List>
        {drawerItems.map((s) => {
          const path = s.text.toLowerCase()
          return (
            <ListItem
              key={s.text}
              selected={s.text === selected}
              button
              component={Link}
              to={`/${path}`}
            >
              <ListItemIcon>
                <Icon>{s.icon}</Icon>
              </ListItemIcon>
              <ListItemText>{s.text}</ListItemText>
            </ListItem>
          )
        })}
      </List>
    </>
  )
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: drawerWidth },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              mr: 2,
              display: {
                sm: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {selected}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 1 },
        }}
      >
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            width: drawerWidth,
            flexShrink: { sm: 0 },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          sx={{
            display: { xs: "none", sm: "block" },
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Offset />
        {props.children}
      </Box>
    </>
  )
}

export default AppNav
