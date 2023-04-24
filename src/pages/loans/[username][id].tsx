import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Grid from '@mui/material/Grid'; // Grid version 1
import {
    Button
} from "@mui/material";
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import { endpoints } from '../api/loan';
import { UserForm, Search, ExpandedSection } from '../index.styles';

const inter = Inter({ subsets: ['latin'] })

type DataRow = {
    username: string;
    id: string;
};

const columns: TableColumn<DataRow>[] = [
    {
        name: 'Name',
        selector: row => row.username,
    },
    {
        name: 'Id',
        selector: row => row.id,
    },
];

const paginationComponentOptions = {
    rowsPerPage: 20
}


export default function Loans(props) {
    const {users} = props

    const [loans, setLoans] = useState<any | null>(null);
    const [loanSchedule, setLoanSchedule] = useState<any | null>(null);
    const [error, setError] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const formQuery = useRef<any>(null);


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


    useEffect(() => {
        getLoans()
    }, [])

    const ExpandedComponent = ({ data }) => {
        console.log('data component', data);
        return (
            <ExpandedSection>
                <Button variant="text">Create a new loan</Button>
                <Button variant="text" onClick={(id) => getLoans(data.id)}>View all loans</Button>
                <div>
                    {loans && loans.map((loan, index) => {
                        return (
                            <div>
                                <h1 onClick={() => getLoanSchedule(data.id, loan.id)}>Loan {index + 1}</h1>
                                <p>{loan.amount}</p>
                                <p>{loan.apr}</p>
                                <p>{loan.id}</p>
                                <p>{loan.owner_id}</p>
                                <p>{loan.status}</p>
                                <p>{loan.term}</p>
                            </div>
                        )
                    })}
                </div>
            </ExpandedSection>


        )

    };

    return (
        <main className="container">

            <Grid container spacing={2}>
                <Grid item sm={12} >
                    <h2>Users</h2>
                   
                    {users && (
                        <DataTable
                            className='data-table'
                            columns={columns}
                            data={users}
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                            pagination
                        />
                    )
                    }
                </Grid>


            </Grid>

        </main>
    )
}
