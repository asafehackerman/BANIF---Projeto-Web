import { StyledForgotPasswordButton } from './style';

export default function ForgotPasswordButton({ children, ...props }) {
  return (
    <StyledForgotPasswordButton {...props}>
      {children}
    </StyledForgotPasswordButton>
  );
}