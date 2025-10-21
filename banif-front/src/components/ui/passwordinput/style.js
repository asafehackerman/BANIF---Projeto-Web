import styled from 'styled-components';

export const StyledPasswordInput = styled.input.attrs({ type: 'password' })` 
    width: 90%;
    border: none;
    border-bottom: 1px solid #888;
    border-radius: 3px;

    &:focus {
        outline: none;
        border: 1px solid #555;
        border-radius: 4px;
    }
`;