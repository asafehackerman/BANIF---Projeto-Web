import { StyledSubmitButton } from './style';

export default function SubmitButton({ children, ...props }) {
  return (
    <StyledSubmitButton {...props}>
      {children}
    </StyledSubmitButton>
  );
}