import React, { useState } from "react"

import { useSelector, useDispatch } from "react-redux"

import _ from "lodash"

import { styled } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import Select from "@mui/material/Select"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import ImageListItemBar from "@mui/material/ImageListItemBar"
import IconButton from "@mui/material/IconButton"
import InfoIcon from "@mui/icons-material/Info"
import CloseIcon from "@mui/icons-material/Close"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"

import { selectAllAttributes } from "features/attributes/slice"
import { selectAllImages } from "features/images/slice"

const QueryForm = () => {
  const attributes = useSelector(selectAllAttributes)
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {attributes.map((a, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>{a.name}</InputLabel>
                <Select label={a.name}>
                  {a.values.map((v, idx) => (
                    <MenuItem key={idx}>{v}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Button variant="contained">Search</Button>
      </Box>
    </>
  )
}

const ImageDetails = ({ image, isOpen, hide }) => {
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar)
  return (
    <Dialog fullScreen open={isOpen} onClose={hide}>
      <AppBar sx={{ position: "fixed" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={hide}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {image.filename}
          </Typography>
        </Toolbar>
      </AppBar>
      <Offset />
      <Grid container>
        <Grid
          item
          xs={12}
          sm={3}
          md={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <List dense>
            {_.map(image.attribute_values, (v, a) => (
              <ListItem key={a}>
                <ListItemText>
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    {" "}
                    {`${a}: `}{" "}
                  </Box>
                  {v}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={9} md={10} sx={{ textAlign: "center" }}>
          <img
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            src={`/api/images/${image.id}`}
          />
        </Grid>
      </Grid>
    </Dialog>
  )
}

const QueryResults = () => {
  const images = useSelector(selectAllImages)
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState(null)
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"))
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.down("md"))
  return (
    <>
      <ImageList
        variant="masonry"
        cols={isSmallScreen ? 1 : isMediumScreen ? 2 : 4}
        gap={8}
      >
        {images.map((image) => (
          <ImageListItem
            key={image.id}
            onClick={() => {
              setImage(image)
              setIsOpen(true)
            }}
          >
            <img src={`/api/images/${image.id}`} />
            <ImageListItemBar subtitle={image.filename} />
          </ImageListItem>
        ))}
      </ImageList>
      {image && (
        <ImageDetails
          image={image}
          isOpen={isOpen}
          hide={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

const QueryPage = () => {
  return (
    <>
      <QueryForm />
      <QueryResults />
    </>
  )
}

export default QueryPage
