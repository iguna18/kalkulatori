import { StyledButton } from './styles/Button.styled';

export const Button = ({symbol, func, dark})=> {
  return (
    <StyledButton onClick={func} dark={dark}>
      {symbol}
    </StyledButton>
  )
}