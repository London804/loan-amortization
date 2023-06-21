import styled from 'styled-components';
import { colors } from './colors.styles';


export const NewLoanForm = styled.form`
    margin: 1rem 0 1.5rem;
    .text-field {
        background: ${colors.white};
        margin-right: 1rem;
        margin-bottom: 1rem;
        border-radius: 0.5rem;
    }  

    .button {
        height: 2.5rem;
        right: 0.5rem;
    }

    .submit-button {
        height: 2.5rem;
    }
    

    .MuiInputAdornment-root {
        width: 1.25rem;
    }
`;

export const ExpandedSection = styled.section`
    min-height: 12.5rem;
    padding: 1rem;

`