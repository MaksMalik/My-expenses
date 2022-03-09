import * as React from 'react';
import {TextField} from "@mui/material";
import {useState} from "react";
import {addDoc, collection} from "firebase/firestore";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {db} from "../../Firebase/firebase";
import Box from "@mui/material/Box";

const initialRows = [
  {
    id: 1,
    name: 'Damien',
    age: 25,
    dateCreated: 12,
    lastLogin: 41,
    isAdmin: true,
    country: 'Spain',
    discount: '',
  },
  {
    id: 2,
    name: 'Nicolas',
    age: 36,
    dateCreated: 312,
    lastLogin: 123,
    isAdmin: false,
    country: 'France',
    discount: '',
  },
  {
    id: 3,
    name: 'Kate',
    age: 19,
    dateCreated: 2,
    lastLogin: 2,
    isAdmin: false,
    country: 'Brazil',
    discount: 'junior',
  },
];

const Expenses = ({realUser}) => {

  const [title, setTitle] = useState("")
  const createCollection = collection(db, "Expenses")


  const create = async () => {
    await addDoc(createCollection, {
      title,
      author: {name: realUser.email, id: realUser.uid}
    })
  }


  const [rows, setRows] = React.useState(initialRows);

  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    [],
  );

  const toggleAdmin = React.useCallback(
    (id) => () => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
        ),
      );
    },
    [],
  );

  const duplicateUser = React.useCallback(
    (id) => () => {
      setRows((prevRows) => {
        const rowToDuplicate = prevRows.find((row) => row.id === id);
        return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
      });
    },
    [],
  );

  const columns = React.useMemo(
    () => [
      { field: 'name', type: 'string' },
      { field: 'age', type: 'number' },
      { field: 'dateCreated', type: 'date', width: 130 },
      { field: 'lastLogin', type: 'dateTime', width: 180 },
      { field: 'isAdmin', type: 'boolean', width: 120 },
      {
        field: 'country',
        type: 'singleSelect',
        width: 120,
        valueOptions: [
          'Bulgaria',
          'Netherlands',
          'France',
          'United Kingdom',
          'Spain',
          'Brazil',
        ],
      },
      {
        field: 'discount',
        type: 'singleSelect',
        width: 120,
        editable: true,
        valueOptions: ({ row }) => {
          if (row === undefined) {
            return ['EU-resident', 'junior'];
          }
          const options = [];
          if (!['United Kingdom', 'Brazil'].includes(row.country)) {
            options.push('EU-resident');
          }
          if (row.age < 27) {
            options.push('junior');
          }
          return options;
        },
      },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label="Toggle Admin"
            onClick={toggleAdmin(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<FileCopyIcon />}
            label="Duplicate User"
            onClick={duplicateUser(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteUser, toggleAdmin, duplicateUser],
  );

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 3,
          width: '90%',
          height: 'minContent',
        },
      }} style={{backgroundColor: 'rgba(255,255,255,0.5)'}}>
        <DataGrid columns={columns} rows={rows} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 3,
            width: '90%',
            height: 'minContent',
          },
        }}
      >
        <TextField id="outlined-basic" label="Expenses" variant="outlined" onChange={(event) => {setTitle(event.target.value)}}/>
        <TextField id="outlined-basic" label="Income" variant="outlined" />
        <button onClick={create}>Send</button>
      </Box>
    </>
  )
}

export default Expenses