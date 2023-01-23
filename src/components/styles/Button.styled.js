import styled from "styled-components";

export const StyledButton = styled.button`
  width: 3em;
  height: 3em;
  font-size: 1.5em;
  border: none;
  margin: 0.3em;
  background-color: ${props => (props.dark ? 'black' : 'white')};
  color: ${props => (props.dark ? 'white' : 'black')}
`