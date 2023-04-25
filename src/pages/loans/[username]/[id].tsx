import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid'; // Grid version 1
import {
    Button,
    TextField,
} from "@mui/material";
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import { endpoints } from '../../api/loan';
import { UserForm, Search, ExpandedSection } from '../../index.styles';
import { NewLoanForm } from './id.styles';

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


export default function Loans() {

    const [loans, setLoans] = useState<any | null>(null);
    const [loanSchedule, setLoanSchedule] = useState<any | null>(null);
    const [username, setUsername] = useState<string | any>(['']);
    const [userID, setUserID] = useState<string | any>('');
    const [expandedRows, setExpandedRows] = useState([]);
    const [error, setError] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const formQuery = useRef<any>(null);

    const router = useRouter();

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

   const handleRowExpandToggle = (row, parentData) => {
    console.log('parentData', parentData);
       const newExpandedRows = parentData
           ? [row.id]
           : expandedRows.filter((r) => r !== row.id);

       setExpandedRows(newExpandedRows);
       console.log('expandedRows', expandedRows)

    //    if (parentData) {
    //        getLoanSchedule(userID, newExpandedRows);
    //    }
   }

    useEffect(() => {
        if (router.isReady) {
            const { username, id } = router.query;
            setUsername(username);
            setUserID(id);
            let idToNumber = Number(id)
            getLoans(idToNumber);
        }
       
        console.log('router params', router.query);
    }, [router.isReady])


    const ExpandedComponent = ({ data }) => {
        console.log('data component', data);
        const [childData, setChildData] = useState([]);
        // loanBuffer(userID, data.id)
       
        return (
            <ExpandedSection>
                <Button onClick={() => getLoanSchedule(userID, data.id)} variant="text">Create a new loan</Button>
                <h3>Loan Schedule</h3>
                <div>
                    {loanSchedule && (
                        <DataTable
                            className='data-table'
                            columns={loanScheduleColumns}
                            data={loanSchedule}
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
                    <section>
                        <h2>Create a New Loan</h2>
                        <NewLoanForm ref={formQuery} onSubmit={null}>
                            <TextField
                                className='text-field'
                                variant="outlined"
                                label="Amount"
                                size="small"
                                name="amount">
                            </TextField>
                            <TextField
                                className='text-field'
                                variant="outlined"
                                label="APR"
                                size="small"
                                name="apr">
                            </TextField>
                            <TextField
                                className='text-field'
                                variant="outlined"
                                label="Term"
                                size="small"
                                name="term">
                            </TextField>
                            <TextField
                                className='text-field'
                                variant="outlined"
                                label="Status"
                                size="small"
                                name="status">
                            </TextField>
                            <Button variant="contained">Create a new loan</Button>
                        </NewLoanForm>
                    </section>
                   
                    {loans && (
                        <DataTable
                            className='data-table'
                            columns={columns}
                            data={loans}
                            title={`Loans for ${username}`}
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                            pagination
                            onRowExpandToggled={handleRowExpandToggle}
                        />
                        )
                    }
                </Grid>


            </Grid>

        </main>
    )
}
