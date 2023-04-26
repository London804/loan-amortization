interface Users {
    username: string;
    id: number;
}

interface Loans {
    amount: number;
    apr: number;
    term: number;
    status: string;
    owner_id: number;
    id: number;

}

export const users: Array<Users> = [
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

export const loans: Array<Loans> = [
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