import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.dark ? 'white' : 'black')};

    background: ${props => (props.dark ? `rgb(2,0,36)` : `rgb(238,174,202)`)};
    background: ${props => (props.dark ? 
      `radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 75%, rgba(0,212,255,1) 100%)`
      : `radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)` )}
  }
`