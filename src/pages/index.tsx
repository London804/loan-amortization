import Image from 'next/image'
import { Inter } from 'next/font/google'
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
import Loans from './loans/[username]/[id]';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [users, setUsers] = useState<any | null>(null);
  const [redirState, setReDirState] = useState(false);
  const [loans, setLoans] = useState<any | null>(null);
  const [loanSchedule, setLoanSchedule] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const formQuery = useRef<any>(null);
  const router = useRouter();

  type DataRow = {
  username: string;
  id: string;
};

const LinkRow = ({ row }) => (
  <Link href={`/users/${row.username}`}>
    <a>{row.name}</a>
  </Link>
);

const columns: TableColumn<DataRow>[] = [
  {
    name: 'Name',
    selector: row => row.username,
    id: 'name',
    style: {
      'font-size': '16px',
    },
    onClick: (row) => {
      window.location.href = `/users/${row.username}`;
    },
    cells: {
      name: {
        style: {
          fontWeight: 'bold',
        },
        format: (cell, row) => <LinkRow row={row} />,
      },
    },
  },
  {
    name: 'ID',
    selector: row => row.id,
    id: 'id',
    style: {
      'font-size': '16px',
    }
  },
];

  const getUsers = async () => {
    setLoading(true);
    try {
      const data = await endpoints.fetchUsers()
      if (!data) {
        setError('There was a problem loading the photos')
      } else {
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
        setError('No Photos found')
        console.log('error')
      } else {
        console.log('New User', data);
      }

    } catch (e) {
      setError(`error something went wrong, ${e}`)
    } finally {
      setLoading(false);
    }
  }

  const getLoans = async (id: number) => {
    setLoading(true);
    try {
      const data = await endpoints.fetchLoans(id)
      console.log('loans', data);
      if (!data) {
        setError('There was a problem loading the photos')
      } else {
        setLoans(data);
      }

    } catch (e) {
      setError(`error something went wrong, ${e}`)
    } finally {
      setLoading(false);
    }
  }

  const getLoanSchedule = async (userId, loanId: number) => {
    console.log('id schedule', userId, loanId)
    setLoading(true);
    try {
      const data = await endpoints.fetchLoanSchedule(userId, loanId)
      console.log('loan schedule', data);
      if (!data) {
        setError('There was a problem loading the photos')
      } else {
        setLoanSchedule(data);
      }

    } catch (e) {
      setError(`error something went wrong, ${e}`)
      console.log('error', e)
    } finally {
      setLoading(false);
    }
  }

  let redirecting = redirState ? (<Loans push to={`/users/${redirState}`} />) : '';

  const navigateToLoansPage = (row) => {
    console.log('row', row);
  }


  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    console.log(redirState)
  }, [redirState])
  // const ExpandedComponent = ({ data }) => {
  //   console.log('data component', data);
  //   return (
  //     <ExpandedSection>
  //       <Button variant="text">Create a new loan</Button>
  //       <Button variant="text" onClick={(id) => getLoans(data.id)}>View all loans</Button>
  //       <div>
  //         {loans && loans.map((loan, index) => {
  //           return (
  //             <div>
  //               <h1 onClick={() => getLoanSchedule(data.id, loan.id)}>Loan {index + 1}</h1>
  //               <p>{loan.amount}</p>
  //               <p>{loan.apr}</p>
  //               <p>{loan.id}</p>
  //               <p>{loan.owner_id}</p>
  //               <p>{loan.status}</p>
  //               <p>{loan.term}</p>
  //             </div>
  //           )
  //         })}
  //       </div>
  //     </ExpandedSection>
  //   )

  // };

  return (
    <main className="container">
     
      <Grid container spacing={2}>
        <Grid item sm={12}>
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
        </Grid>
        <Grid item sm={12}>
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

