import React, { useState } from "react"

import { useSelector, useDispatch } from "react-redux"

import _ from "lodash"

import Box from "@mui/material/Box"
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
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
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
  return (
    <Dialog open={isOpen} onClose={hide}>
      <List dense>
        {_.map(image.attribute_values, (v, a) => (
          <ListItem>
            <ListItemText>{`${a}: ${v}`}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

const QueryResults = () => {
  const images = useSelector(selectAllImages)
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState(null)
  return (
    <>
      <ImageList variant="masonry" cols={4} gap={8}>
        {images.map((image) => (
          <ImageListItem key={image.id}>
            <img src={`/api/images/${image.id}`} />
            <ImageListItemBar
              subtitle={image.filename}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  onClick={() => {
                    setImage(image)
                    setIsOpen(true)
                  }}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      {image && (
        <ImageDetails image={image} isOpen={isOpen} hide={() => setIsOpen(false)} />
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
