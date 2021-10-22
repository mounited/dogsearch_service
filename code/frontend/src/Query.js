import React from "react"

import { useSelector, useDispatch } from "react-redux"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import Select from "@mui/material/Select"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"

import { selectAllAttributes } from "features/attributes/slice"

const Query = () => {
  const attributes = useSelector(selectAllAttributes)
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {attributes.map((a) => (
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>{a.name}</InputLabel>
                <Select label={a.name}>
                  {a.values.map((v) => (
                    <MenuItem>{v}</MenuItem>
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

export default Query
