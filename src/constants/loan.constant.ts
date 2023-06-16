export interface User {
    username: string;
    id: number;
}

export interface Loan {
    amount: number;
    apr: number;
    term: number;
    status: string;
    owner_id: number;
    id: number;
    loan_details?: Array<object>;
}

export interface LoanSchedule {
    month: number;
    open_balance: number;
    total_payment: number;
    principal_payment: number;
    interest_payment: number;
    close_balance: number;
}

export interface Attention {
    type: 'success' | 'error' | 'info';
    message: string;
}

export const users: Array<User> = [
    {
        "username": "Laura Connor",
        "id": 1
    },
    {
        "username": "John Connor",
        "id": 2
    },
    {
        "username": "Tim Anderson",
        "id": 3
    },
    {
        "username": "Michael Rodgers",
        "id": 4
    },
    {
        "username": "Tim Harris",
        "id": 5
    },
    {
        "username": "John Jacobs",
        "id": 6
    },
    {
        "username": "Ryan Williams",
        "id": 7
    }
]

export const loans: Array<Loan> = [
    {
        "amount": 4000,
        "apr": 4,
        "term": 60,
        "status": "active",
        "owner_id": 1,
        "id": 1
    },
    {
        "amount": 5000,
        "apr": 2,
        "term": 36,
        "status": "active",
        "owner_id": 1,
        "id": 2
    },
    {
        "amount": 3000,
        "apr": 6,
        "term": 36,
        "status": "active",
        "owner_id": 2,
        "id": 3
    },
    {
        "amount": 10000,
        "apr": 0.05,
        "term": 60,
        "status": "active",
        "owner_id": 1,
        "id": 5
    },
    {
        "amount": 8000,
        "apr": 0.07,
        "term": 48,
        "status": "active",
        "owner_id": 1,
        "id": 6
    },
    {
        "amount": 1200,
        "apr": 0.11,
        "term": 12,
        "status": "active",
        "owner_id": 1,
        "id": 7
    },
    {
        "amount": 2000,
        "apr": 0.1,
        "term": 12,
        "status": "active",
        "owner_id": 1,
        "id": 8
    }
]

export const loanScheduleMock: Array<LoanSchedule> = [
    {
        "month": 1,
        "open_balance": 1200,
        "total_payment": 106.05799022592372,
        "principal_payment": 95.05799022592372,
        "interest_payment": 11,
        "close_balance": 1104.9420097740763
    },
    {
        "month": 2,
        "open_balance": 1104.9420097740763,
        "total_payment": 106.05799022592372,
        "principal_payment": 95.92935513632801,
        "interest_payment": 10.128635089595699,
        "close_balance": 1009.0126546377483
    },
    {
        "month": 3,
        "open_balance": 1009.0126546377483,
        "total_payment": 106.05799022592372,
        "principal_payment": 96.80870755841103,
        "interest_payment": 9.249282667512693,
        "close_balance": 912.2039470793372
    },
    {
        "month": 4,
        "open_balance": 912.2039470793372,
        "total_payment": 106.05799022592372,
        "principal_payment": 97.69612071102979,
        "interest_payment": 8.361869514893925,
        "close_balance": 814.5078263683074
    },
    {
        "month": 5,
        "open_balance": 814.5078263683074,
        "total_payment": 106.05799022592372,
        "principal_payment": 98.59166848421424,
        "interest_payment": 7.466321741709485,
        "close_balance": 715.9161578840932
    },
    {
        "month": 6,
        "open_balance": 715.9161578840932,
        "total_payment": 106.05799022592372,
        "principal_payment": 99.49542544531953,
        "interest_payment": 6.562564780604188,
        "close_balance": 616.4207324387737
    },
    {
        "month": 7,
        "open_balance": 616.4207324387737,
        "total_payment": 106.05799022592372,
        "principal_payment": 100.40746684523496,
        "interest_payment": 5.650523380688759,
        "close_balance": 516.0132655935388
    },
    {
        "month": 8,
        "open_balance": 516.0132655935388,
        "total_payment": 106.05799022592372,
        "principal_payment": 101.32786862464961,
        "interest_payment": 4.730121601274106,
        "close_balance": 414.68539696888917
    },
    {
        "month": 9,
        "open_balance": 414.68539696888917,
        "total_payment": 106.05799022592372,
        "principal_payment": 102.25670742037556,
        "interest_payment": 3.801282805548151,
        "close_balance": 312.4286895485136
    },
    {
        "month": 10,
        "open_balance": 312.4286895485136,
        "total_payment": 106.05799022592372,
        "principal_payment": 103.19406057172901,
        "interest_payment": 2.863929654194708,
        "close_balance": 209.2346289767846
    },
    {
        "month": 11,
        "open_balance": 209.2346289767846,
        "total_payment": 106.05799022592372,
        "principal_payment": 104.14000612696987,
        "interest_payment": 1.9179840989538588,
        "close_balance": 105.09462284981473
    },
    {
        "month": 12,
        "open_balance": 105.09462284981473,
        "total_payment": 106.05799022592372,
        "principal_payment": 105.09462284980042,
        "interest_payment": 0.9633673761233017,
        "close_balance": 1.4310330698208418e-11
    }
]