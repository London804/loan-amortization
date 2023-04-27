import Image from 'next/image'
import { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid'; // Grid version 1
import { 
  TextField,
  IconButton,
} from "@mui/material";
import Add from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import DataTable from 'react-data-table-component';
import { endpoints } from './api/loan';
import { useRouter } from 'next/router';
import { SubmitUserForm } from './index.styles';
import Notification from "../components/notification";
import {Attention} from '../constants/loan.constant';


export default function Home() {
    const [users, setUsers] = useState<any | null>(null);
    const [status, setStatus] = useState<Attention | null>(null);
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
                setStatus({type: 'error', message: 'There was a problem loading the photos'})
            } else {
                setUsers(data);
            }

        } catch (e) {
            setStatus({type: 'error', message: `Error something went wrong, ${e}`})
        } finally {
            setLoading(false);
        }
    }

    const createUser = async (query) => {
        query.preventDefault();
        const searchText = query?.target[0].value
        setLoading(true);
        try {
            const data = await endpoints.setUser(searchText)
            if (!data) {
                setStatus({type: 'info', message: 'No Users Found'})
            } else {
                setStatus({type: 'success', message: 'User added! Please refresh the browser'})
            }

        } catch (e) {
            setStatus({type: 'error', message: `error something went wrong, ${e}`})
        } finally {
            setLoading(false);
        }
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
            
            { status && (
                <Notification
                    type={status.type}
                    message={status.message}
                />
            )}
            </Grid>

            <Grid item xs={12}>
            {users && (
                <DataTable
                    data-testid='table' 
                    className='users-table' 
                    columns={columns} 
                    data={users}
                    pagination
                    title="Users"
                    progressPending={loading} 
                    onRowClicked={row => {
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

