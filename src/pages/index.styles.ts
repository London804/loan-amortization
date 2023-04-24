import styled from 'styled-components';
import { colors } from '../styles/colors.styles';

export const UserForm = styled.form`
  display: flex;
  margin-bottom: 2.5rem; 
  .userForm-name{
      display: flex;
      flex-direction: column;
  } 

  .userForm-submit {
    margin-left: 2rem;
  }
`


export const Search = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;

  .search-container {
    position: relative;
  }

  .search-bar {
    width: 25rem;
    height: 2.5rem;
    border: none;
    padding: 0 3rem 0 1rem;
    border-radius: 0.5rem;
  }

  .search-button {
    position: absolute;
    right: 2px;
    top: 2px;
    height: 2.25rem;
    width: 2.5rem;
    background: transparent;
    font-size: 1rem;
    border-radius: 0px 8px 8px 0px;
    border: none;
    cursor: pointer;
  }

  .ico-mglass {
    position: relative;
    display:inline-block;
    background: ${colors.white};
    border-radius: 30px;
    height: 12px;
    width: 12px;
    border: 2px solid ${colors.grey};
    
    &:after {
      content: "";
      height: 4px;
      width: 9px;
      position: absolute;
      top: 8px;
      left: 5px;
      background: #888;  // ${colors.grey} not working here
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
    }
    
  }
`;

export const ExpandedSection = styled.section`
  min-height: 12.5rem;
  padding: 1rem;

`