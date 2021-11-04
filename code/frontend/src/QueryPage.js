import React, { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"

import _ from "lodash"

import { styled } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import ImageListItemBar from "@mui/material/ImageListItemBar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Dialog from "@mui/material/Dialog"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"

import { selectAllAttributes, fetchAttributes } from "features/attributes/slice"
import { selectAllImages, fetchImages } from "features/images/slice"

const QueryForm = () => {
  const attributes = useSelector(selectAllAttributes)
  const status = useSelector((state) => state.attributes.status)
  const dispatch = useDispatch()

  const emptyQuery = attributes.reduce((res, a) => {
    res[a.name] = ""
    return res
  }, {})
  const [query, setQuery] = useState({})

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAttributes())
    } else if (status === "success") {
      setQuery(emptyQuery)
    }
  }, [status, dispatch])

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {attributes.filter(a => a.values).map((a, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <TextField
                  label={a.desc}
                  value={query[a.name] ? query[a.name] : ""}
                  onChange={(e) => {
                    setQuery({ ...query, [a.name]: e.target.value })
                  }}
                  select
                >
                  <MenuItem value={""}>&hellip;</MenuItem>
                  {a.values.map((v, idx) => (
                    <MenuItem key={idx} value={v.raw}>
                      {v.desc}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() =>
            dispatch(
              fetchImages(
                _.flow([
                  Object.entries,
                  (arr) => arr.filter(([key, value]) => value !== ""),
                  Object.fromEntries,
                ])(query)
              )
            )
          }
        >
          Поиск
        </Button>
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
            src={`api/images/${image.id}`}
            alt={image.filename}
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
            <img src={`api/images/${image.id}`} alt={image.filename} />
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
