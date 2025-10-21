import styled from 'styled-components';

export const Container = styled.div`
    box-sizing: border-box;
    padding-top: 50px;
    padding-left: 50px;
    padding-bottom: 50px;
`;

export const SendBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    width: 90%;
    padding-bottom: 30px;
    border-bottom: 1px solid #555;
`

export const MsgBox = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    text-align: center;
    width: 90%;
    padding-top: 10px;
    color: red;
`
