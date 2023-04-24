import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid'; // Grid version 1
import {
    Button
} from "@mui/material";
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import { endpoints } from '../../api/loan';
import { UserForm, Search, ExpandedSection } from '../../index.styles';

const inter = Inter({ subsets: ['latin'] })

interface DataRow {
    amount: number;
    apr: number;
    id: number;
    owner_id: number;
    status: string;
    term: number;

};

const columns: TableColumn<DataRow>[] = [
    {
        name: 'Amount',
        selector: row => row.amount,
    },
    {
        name: 'Apr',
        selector: row => row.apr,
    },
    {
        name: 'ID',
        selector: row => row.id,
    },
    {
        name: 'Owner ID',
        selector: row => row.owner_id,
    },
    {
        name: 'Status',
        selector: row => row.status,
    },
    {
        name: 'Term',
        selector: row => row.term,
    },
];


const paginationComponentOptions = {
    rowsPerPage: 20
}

interface loanScheduleRow {
    month: number;
    open_balance: number;
    total_payment: number;
    principal_payment: number;
    interest_payment: number;
    close_balance: number;
}

const loanScheduleColumns: TableColumn<loanScheduleRow>[] = [
    {
        name: 'Month',
        selector: row => row.month,
    },
    {
        name: 'Open Balance',
        selector: row => row.open_balance,
    },
    {
        name: 'Total Payment',
        selector: row => row.total_payment,
    },
    {
        name: 'Principal Payment',
        selector: row => row.principal_payment,
    },
    {
        name: 'Interest Payment',
        selector: row => row.interest_payment,
    },
    {
        name: 'Close Balance',
        selector: row => row.close_balance,
    },
];


export default function Loans(props) {
    const {users} = props

    const [loans, setLoans] = useState<any | null>(null);
    const [loanSchedule, setLoanSchedule] = useState<any | null>(null);
    const [error, setError] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const formQuery = useRef<any>(null);

    const router = useRouter();
    const { username, id } = router.query;


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
        let idToNumber = Number(id)
        getLoans(idToNumber);
        console.log('id', typeof id);
        console.log('router params', router.query);
    }, [])

    const ExpandedComponent = ({ data }) => {
        console.log('data component', data);
        return (
            <ExpandedSection>
                <Button variant="text">Create a new loan</Button>
                <h3>Loan Schedule</h3>
                <div>
                    {loanSchedule && (
                        <DataTable
                            className='data-table'
                            columns={loanScheduleColumns}
                            data={loanSchedule}
                            title={`Loans for ${username}`}

                        />
                    )
                    }
                    
                </div>
            </ExpandedSection>


        )

    };

    return (
        <main className="container">
            <Grid container spacing={2}>
                <Grid item sm={12} >
                   
                    {loans && (
                        <DataTable
                            className='data-table'
                            columns={columns}
                            data={loans}
                            title={`Loans for ${username}`}
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                            pagination
                            onRowExpandToggled={row => {
                                console.log('row wpanded', row);
                                // getLoanSchedule(id, row.id)
                            }}
                        />
                        )
                    }
                </Grid>


            </Grid>

        </main>
    )
}
