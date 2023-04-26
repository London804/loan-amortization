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
import { ExpandedSection } from '../../index.styles';
import { NewLoanForm } from './id.styles';

const inter = Inter({ subsets: ['latin'] })

interface DataRow {
    amount: number;
    apr: number;
    id: number;
    owner_id: number;
    status: string;
    term: number;
    loan_details?: Array<object>;

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
    const [parentID, setParentID] = useState<any | null>(null);
    const newLoanQuery = useRef<any>(null);
    const shareLoanQuery = useRef<any>(null);

    const router = useRouter();

    const getLoans = async (id: number) => {
        setLoading(true);
        try {
            const data = await endpoints.fetchLoans(id)
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

    const formatData = (data) => {
        return data.map(d => {
            const formattedObj = {};
            for (let key in d) {
                if (key !== 'month') {
                    console.log('key', key); 
                    formattedObj[key] = +(d[key]).toFixed(2);
                } else {
                    formattedObj[key] = d[key];
                }
                // return Number.parseFloat(d[item]).toFixed(2);
            }
            return formattedObj
        })
    }

    const getLoanSchedule = async (userId, loanId: number) => {
        setLoading(true);
        try {
            const data = await endpoints.fetchLoanSchedule(userId, loanId)
            if (!data) {
                setError('There was a problem loading the photos')
            } else {
                
                setLoanSchedule(formatData(data));
            }

        } catch (e) {
            setError(`error something went wrong, ${e}`)
            console.log('error', e)
        } finally {
            setLoading(false);
        }
    }

    const createNewLoan = async (query) => {
        query.preventDefault();
        const amount = query?.target[0].value;
        const apr = query?.target[2].value;
        const term = query?.target[4].value;
        const active = query?.target[6].value;
        setLoading(true);
        try {
            const data = await endpoints.createLoan(userID, amount, apr, term, active)
            if (!data) {
                setError('There was a problem creating this loan')
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

    const shareCurrentLoan = async (query, loanData) => {
        query.preventDefault();
        const userId = query?.target[0].value;
       
        setLoading(true);
        try {
            const data = await endpoints.shareLoan(loanData.owner_id, loanData.id, userId)
            if (!data) {
                setError('There was a problem creating this loan')
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


    const handleRowExpandToggle = (row, parentData) => {
        console.log('parentData', parentData);
        getLoanSchedule(userID, parentData.id)
        setParentID(parentData.id);
    }

    useEffect(() => {
        if (router.isReady) {
            const { username, id } = router.query;
            setUsername(username);
            setUserID(id);
            let idToNumber = Number(id)
            getLoans(idToNumber);
        }
    }, [router.isReady, router.query])

    useEffect(() => {
        let updatedLoans = loans?.map(loan => {
            if (loan.id === parentID) {
                return {
                    ...loan,
                    loan_details: [...(loanSchedule || [])]

                }
            } else {
                return loan
            }
        })
        setLoans(updatedLoans);
        console.log('loanSchedule', loanSchedule)
    }, [parentID, loanSchedule])

    const ExpandedComponent = ({ data }) => {
        console.log('data expandedComponent', data);
        
        return (
            <ExpandedSection>
                <div>
                    <h3>Share loan with another user</h3>
                    <NewLoanForm ref={shareLoanQuery} onSubmit={(query) => shareCurrentLoan(query, data)}>
                        <TextField
                            className='text-field'
                            variant="outlined"
                            label="User ID"
                            size="small"
                            required
                            type="number"
                            name="user_id">
                        </TextField>
                       
                        <Button type="submit" variant="contained">Share Loan</Button>
                    </NewLoanForm>
                    {data.loan_details && 
                    (
                        <DataTable
                            className='data-table'
                            columns={loanScheduleColumns}
                            data={data.loan_details}
                            title="Loan Schedule"
                            progressPending={loading}
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
                <Grid item xs={12} >
                    <section>
                        <h2>Create a New Loan</h2>
                        <NewLoanForm ref={newLoanQuery} onSubmit={createNewLoan}>
                            <TextField
                                className='text-field'
                                variant="outlined"
                                label="Amount"
                                size="small"
                                required
                                type="number"
                                name="amount">
                            </TextField>
                            <TextField
                                className='text-field'
                                variant="outlined"
                                label="APR"
                                size="small"
                                required
                                name="apr">
                            </TextField>
                            <TextField
                                className='text-field'
                                variant="outlined"
                                label="Term"
                                size="small"
                                required
                                type="number"
                                name="term">
                            </TextField>
                            <TextField
                                className='text-field'
                                variant="outlined"
                                label="Status"
                                size="small"
                                required
                                name="status">
                            </TextField>
                            <Button type="submit" variant="contained">Create a new loan</Button>
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
