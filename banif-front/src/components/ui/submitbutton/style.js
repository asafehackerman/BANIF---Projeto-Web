import styled from 'styled-components';

export const StyledSubmitButton = styled.button`
    box-sizing: border-box;
    width: 180px;
    height: 35px;
    background-color: black;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    margin-top: 20px;
    border: 0px;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    &:active {
      opacity: 0.8;
      transform: translateY(0);
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      opacity: 0.7;
    }
`;