import * as React from 'react';
import Grid from "@mui/material/Grid";
import {FormControl, InputLabel, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export const ExpensesFilter = ({ categories, setFilterName,setFilterAmount, setFilterCategory, filterCategory, filterType, setFilterType }) => {

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <TextField
            style={{padding:"10px"}}
            fullWidth
            id="outlined-password-input"
            label="Search by name"
            onChange={(event) => setFilterName((event.target.value).toLowerCase())}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            style={{padding:"10px"}}
            fullWidth
            id="outlined-password-input"
            label="Search by amount"
            onChange={(event) => setFilterAmount((event.target.value).toLowerCase())}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <FormControl fullWidth style={{padding:"10px"}}>
            <InputLabel id="demo-simple-select-label">Type of transaction</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type of transaction"
              value={filterType}
              onChange={(event) => setFilterType(event.target.value)}
            >
              <MenuItem value="allTypes">All types</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl fullWidth style={{padding:"10px"}}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              value={filterCategory}
              onChange={(event) => setFilterCategory(event.target.value)}
            >
              <MenuItem value="AllCategories">All categories</MenuItem>
              {categories.map((category, index) => {
                return <MenuItem key={index} value={category}>{category}</MenuItem>
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}
