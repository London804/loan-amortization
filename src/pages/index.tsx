import Image from 'next/image'
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Grid from '@mui/material/Grid'; // Grid version 1
import {
  Button 
} from "@mui/material";
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import { endpoints } from './api/loan';
import { useRouter } from 'next/router';
import { UserForm, Search, ExpandedSection } from './index.styles';


export default function Home() {
  const [users, setUsers] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);
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
        setError('There was a problem loading the photos')
      } else {
        console.log('users', data);
        setUsers(data);
      }

    } catch (e) {
      setError(`error something went wrong, ${e}`)
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
        setError('No Users Found')
      } else {
        console.log('New User', data);
      }

    } catch (e) {
      setError(`error something went wrong, ${e}`)
    } finally {
      setLoading(false);
      router.reload()
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
          <Search data-testid='search'>
            <div className='search-container'>
              <form ref={formQuery} onSubmit={createUser}>
                <input
                  className='search-bar'
                  type="text"
                  placeholder='Create New User'
                  name="search" >
                </input>
                <button className='search-button'>
                  <span className="ico ico-mglass"></span>
                </button>
              </form>
            </div>
          </Search>
          {error && <p>{error}</p>}
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

