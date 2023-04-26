import Image from 'next/image'
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Grid from '@mui/material/Grid'; // Grid version 1
import { 
  TextField,
  Icon,
  IconButton,
} from "@mui/material";
import Add from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import { endpoints } from './api/loan';
import { useRouter } from 'next/router';
import { SubmitUserForm } from './index.styles';
import { Status } from '../styles/statusHandling.styles'


export default function Home() {
  const [users, setUsers] = useState<any | null>(null);
  const [status, setStatus] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const formQuery = useRef<any>(null);
  const router = useRouter();

  type DataRow = {
  username: string;
  id: string;
};

const columns: TableColumn<DataRow>[] = [
  {
    name: 'Name',
    selector: row => row.username,
    id: 'name',
    style: {
      'font-size': '16px',
    },
    cells: {
      name: {
        style: {
          fontWeight: 'bold',
        },
      },
    },
  },
  {
    name: 'ID',
    selector: row => row.id,
    id: 'id',
  },
];

  const getUsers = async () => {
    setLoading(true);
    try {
      const data = await endpoints.fetchUsers()
      if (!data) {
        setStatus('There was a problem loading the photos')
      } else {
        console.log('users', data);
        setUsers(data);
      }

    } catch (e) {
      setStatus(`error something went wrong, ${e}`)
    } finally {
      setLoading(false);
    }
  }

  const createUser = async (query) => {
    query.preventDefault();
    const searchText = query?.target[0].value
    console.log('searchText', searchText)
    setLoading(true);
    try {
      const data = await endpoints.setUser(searchText)
      if (!data) {
        setStatus('No Users Found')
      } else {
        console.log('New User', data);
        setStatus('User added! Please refresh the browser')
      }

    } catch (e) {
      setStatus(`error something went wrong, ${e}`)
    } finally {
      setLoading(false);
    }
  }

  const navigateToLoansPage = (row) => {
    console.log('row', row);
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <main className="container">
     
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SubmitUserForm 
            data-testid='submit-user' 
            ref={formQuery} 
            onSubmit={createUser}>
              <TextField
                className='text-field'
                variant="outlined"
                label="Create New User"
                size="small"
                required
                name="create_user"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton type='submit' className='button'>
                        <Add />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                >
              </TextField>
          </SubmitUserForm>
         
          {status && <Status>{status}</Status>}
        </Grid>
        <Grid item xs={12}>
          {users && (
            <DataTable
              className='data-table' 
              columns={columns} 
              data={users}
              pagination
              title="Users"
              progressPending={loading} 
              onRowClicked={row => {
                navigateToLoansPage(row)
                router.push('/loans/[username]/[id]', `/loans/${row.username}/${row.id}`)
              }}
            />
            )
          }
        </Grid>

              
      </Grid>

    </main>
  )
}

