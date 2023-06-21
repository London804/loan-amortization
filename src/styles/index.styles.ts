import styled from 'styled-components';
import { colors } from './colors.styles';

export const UserForm = styled.form`
    display: flex;
    margin-bottom: 2.5rem; 
`

export const SubmitUserForm = styled.form`
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;

    .text-field {
        background: ${colors.white};
        border-radius: 0.5rem;
    } 

    .button {
        right: 0.5rem;
    }

    .MuiInputAdornment-root {
        width: 1.25rem;
    }
`;
