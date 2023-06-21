import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid'; // Grid version 1
import {
    Button,
    TextField,
    IconButton,
} from "@mui/material";
import Add from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import DataTable from 'react-data-table-component';
import { endpoints } from '../../../api/loan';
import { NewLoanForm, ExpandedSection } from '../../../styles/id.styles';
import { addCommas, removeCommas, formatLoanScheduleData, formatLoanData } from '../../../helpers/formatter';
import  Notification from "../../../components/notification";
import { Loan, LoanSchedule } from '../../../constants/loan.constant';

type DataRow = {
    name: string;
    selector: any;
}

const columns: Array<DataRow> = [
    {
        name: 'Amount',
        selector: row => row.amount,
    },
    {
        name: 'APR',
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


interface loanScheduleRow {
    month: number;
    open_balance: number;
    total_payment: number;
    principal_payment: number;
    interest_payment: number;
    close_balance: number;
}

const loanScheduleColumns: Array<DataRow> = [
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
    const [status, setStatus] = useState<any | null>(null);
    const [error, setError] = useState<any | null>(null);
    const [newLoanStatus, setNewLoanStatus] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingLoan, setLoadingLoan] = useState(false);
    const [parentID, setParentID] = useState<any | null>(null);
    const newLoanQuery = useRef<any>(null);
    const shareLoanQuery = useRef<any>(null);

    const [inputValue, setInputValue] = useState('');
    const [APR, setAPR] = useState<string | any>('.');
    const [active, setActive] = useState<string>('active')

    const router = useRouter();

    const getLoans = async (id: number) => {
        setLoading(true);
        try {
            const data = await endpoints.fetchLoans(id)
            if (!data) {
                setError({type: 'error', message: 'There was a problem loading loans'})
            } else {
                setLoans(formatLoanData(data));
            }

        } catch (e) {
            setError({type: 'error', message: `error something went wrong, ${e}`})
        } finally {
            setLoading(false);
        }
    }

    const getLoanSchedule = async (userId: number, loanId: number) => {
        setLoading(true);
        try {
            const data = await endpoints.fetchLoanSchedule(userId, loanId)
            if (!data) {
                setError({ type: 'error', message: 'There was a problem loading loans' })
            } else {
                setLoanSchedule(formatLoanScheduleData(data));
            }

        } catch (e) {
            setError({ type: 'error', message: `error something went wrong, ${e}`})
        } finally {
            setLoading(false);
        }
    }

    const createNewLoan = async (query: any) => {
        query.preventDefault();
        const amount = removeCommas(query?.target[0].value);
        const apr = query?.target[2].value;
        const term = query?.target[4].value;
        const active = query?.target[6].value;
        setLoadingLoan(true);
        try {
            const data = await endpoints.createLoan(userID, amount, apr, term, active)
            if (!data) {
                setNewLoanStatus({type: 'error', message: 'There was a problem creating this loan'})
            } else {
                setNewLoanStatus({type: 'success', message: 'This loan was created successfully! Please refresh your browser to see it below.'})
            }

        } catch (e) {
            setNewLoanStatus({type: 'error', message:`Error something went wrong, ${e}`})
        } finally {
            setLoadingLoan(false);
        }
    }

    const shareCurrentLoan = async (query: any, loanData: Loan) => {
        query.preventDefault();
        const userId = query?.target[0].value;

        setLoading(true);
        try {
            const data = await endpoints.shareLoan(loanData.owner_id, loanData.id, userId)
            if (!data) {
                setStatus({type: 'error', message: 'There was a problem creating this loan'})
            } else {
                setStatus({type: 'success', message: 'This loan was shared successfully!'})
            }

        } catch (e) {
            setStatus({type: 'error', message:`Error something went wrong, ${e}`})
        } finally {
            setLoading(false);
        }
    }


    const handleRowExpandToggle = (row: boolean, parentData: Loan) => {
        getLoanSchedule(userID, parentData.id)
        setParentID(parentData.id);
    }

    const handleInputChange = (e) => {
        const formattedValue = addCommas(e.target.value);
        setInputValue(formattedValue);
    };

   

    const handleInputChange2 = (e) => {
        const formattedValue = formatAPR(e.target.value);
        setAPR(formattedValue);
    };

    const formatAPR = (value: string) => {
        // Remove any non-digit characters from the value
        const numericValue = value.replace(/[^0-9]/g, '');

        // Add a decimal point if the value is not empty and doesn't have one already
        if (numericValue && !numericValue.includes('.')) {
            return `.${numericValue}`;
        }

        return `.${numericValue}`;
    };


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
        let updatedLoans = loans?.map((loan: Loan) => {
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
    }, [parentID, loanSchedule])

    const ExpandedComponent = ({data}: any) => {
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
                            name="user_id"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton type='submit' className='button'>
                                            <Add />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}>
                        </TextField>
                    </NewLoanForm>
                    {status && (
                        <Notification
                            type={status.type}
                            message={status.message}
                        />
                    )}


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
                                inputProps={{
                                    max: '1000000000'
                                }}
                                type="text"
                                value={inputValue} 
                                onChange={handleInputChange}
                                name="amount">
                            </TextField>
                            <TextField
                                className='text-field'
                                variant="outlined"
                                label="APR"
                                type='text'
                                size="small"
                                required
                                name="apr"
                                value={APR}
                                onChange={handleInputChange2} >
                            </TextField>
                            <TextField
                                className='text-field'
                                variant="outlined"
                                label="Term"
                                inputProps={{
                                    max: '360'
                                }}
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
                                value={active}
                                name="status">
                            </TextField>
                            <Button className='submit-button' type="submit" variant="contained">Submit loan</Button>
                        </NewLoanForm>
                        {newLoanStatus && (
                            <Notification
                                type={newLoanStatus.type}
                                message={newLoanStatus.message}
                            />
                        )}
                        {error && (
                            <Notification
                                type={error.type}
                                message={error.message}
                            />
                        )}
                    </section>

                    {loans && (
                        <DataTable
                            data-testid='table' 
                            className='data-table'
                            columns={columns}
                            data={loans}
                            title={`Loans for ${username}`}
                            progressPending={loadingLoan} 
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
