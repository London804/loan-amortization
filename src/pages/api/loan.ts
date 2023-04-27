const URL = 'https://lending-api.azurewebsites.net/users';


const fetchUsers = async () => {
  const result = await fetch(URL);
  return await result.json().catch(error => console.log('error', error))
};

const setUser = async (user: string) => {
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: user })
  };
  const result = await fetch(URL, settings);
  return await result.json().catch(error => console.log('error', error))
};

const fetchLoans = async (user_id: number) => {
  const loanURL = `https://lending-api.azurewebsites.net/users/${user_id}/loans`
  const result = await fetch(loanURL);
  return await result.json().catch(error => console.log('error', error))
};

const fetchLoanSchedule = async (user_id: number, loan_id: number) => {
  const loanURL = `https://lending-api.azurewebsites.net/loans/${loan_id}?user_id=${user_id}`
  const result = await fetch(loanURL);
  return await result.json().catch(error => console.log('error', error))
};

const createLoan = async (owner_id: number, amount: number, apr: number, term: number, active: string) => {
  const createLoanURL = 'https://lending-api.azurewebsites.net/loans';
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ owner_id, amount, apr, term, active })
  };
  const result = await fetch(createLoanURL, settings);
  return await result.json().catch(error => console.log('error', error))
};

const shareLoan = async (owner_id: number, loan_id: number, user_id: number) => {
  const createLoanURL = `https://lending-api.azurewebsites.net/loans/${loan_id}/share?owner_id=${owner_id}&user_id=${user_id}`;
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({loan_id, owner_id, user_id })
  };
  const result = await fetch(createLoanURL, settings);
  return await result.json().catch(error => console.log('error', error))
};

export const endpoints = {
  fetchUsers,
  setUser,
  fetchLoans,
  fetchLoanSchedule,
  createLoan,
  shareLoan
}