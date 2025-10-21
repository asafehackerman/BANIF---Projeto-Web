import styled from 'styled-components';

export const StyledTextInput = styled.input.attrs({ type: 'text' })` 
    width: 90%;
    border: none;
    border-bottom: 1px solid #888;
    border-radius: 3px;
    padding-bottom: 20px;

    &:focus {
        outline: none;
        border: 1px solid #555;
        border-radius: 4px;
    }
`;