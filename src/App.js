import PropTypes from 'prop-types';
import { useState } from 'react';
import { StyledFlex as Flex } from './components/styles/Flex.styled';
import { StyledRow as Row } from './components/styles/Row.styled';
import { Button } from './components/Button';
import { GlobalStyle } from './components/styles/Global.styled';

function App() {
  const [stack, setStack] = useState(['0'])
  const [dark, setDark]= useState(false)
  const isOperation = (c) => {
    return c=='-' || c=='+' || c=='%' || c=='*'
  }
  const func = (c) => () => { //for this handler function to work initial number in stack (0) must be present
    if(c == '=') { // equality mark was pressed. calculate the expression
      let tempStack = [...stack]
      const ops = ['%','*','-','+']
      for(let i=0; i<4; i++) {
        let op = ops[i]
        tempStack = tempStack.reduce((acc, curr) => { 
          if(acc.length >= 2) {
            let last = acc[acc.length-1]
            let beforeLast = acc[acc.length-2]
            let res;
            if(last === op) {
              if(op === '%') {
                res = parseFloat(beforeLast) / parseFloat(curr)
              } else if(op === '*') {
                res = parseFloat(beforeLast) * parseFloat(curr)
              } else if(op === '-') {
                res = parseFloat(beforeLast) - parseFloat(curr)
              } else if(op === '+') {
                res = parseFloat(beforeLast) + parseFloat(curr)
              }
              const ret =  acc.slice(0, acc.length-2).concat(''+res)
              return ret
            }
          }
          return acc.concat(curr)
        },[])
      }
      setStack(tempStack)
    }
    else if(isOperation(c)) { // one of operation buttons was pressed
      const last = stack[stack.length - 1]
      if(isOperation(last)) {
        setStack(stack.slice(0, stack.length-1).concat(c)) //replace with new operation
      } else { // last was number
        setStack(stack.concat(c)) // simply add new operation to the stack
      }
    } 
    else { // number or point was pressed
      const last = stack[stack.length - 1]
      if(isOperation(last)) { // last in stack is operation
        setStack(stack.concat(c))
      } else { //last in stack is number. elongate it
        let elongated = ''
        if(c != '.' && stack.length === 1 && stack[0] == '0') {
          elongated = c
        } else {
          elongated = stack[stack.length - 1].concat(c)
        }
        const tempStack = [...stack]
        tempStack[stack.length - 1] = elongated
        setStack(tempStack)
      }
    }
  }
  
  return (
    <>
    <GlobalStyle dark={dark}/>
      <header style = {{display:'flex', justifyContent: 'space-between', padding: '0em 2em'}}>
        <div>
          Simple Calculator
        </div>
        <button onClick={() => setDark(!dark)}>
          Change to {dark?'light':'dark'} background
        </button>
      </header>
      <Flex>
      <div style = {{fontSize:'2em'}}>
        {
          stack.reduce((acc, curr) => {
            return acc.concat(curr)
          }, '')
        }
      </div>
        <Row>
          <Button symbol='1' func={func('1')} dark={false}/>
          <Button symbol='2' func={func('2')} dark={false}/>
          <Button symbol='3' func={func('3')} dark={false}/>
          <Button symbol='%' func={func('%')} dark={true}/>
        </Row>
        <Row >
          <Button symbol='4' func={func('4')} dark={false}/>
          <Button symbol='5' func={func('5')} dark={false}/>
          <Button symbol='6' func={func('6')} dark={false}/>
          <Button symbol='*' func={func('*')} dark={true}/>
        </Row>
        <Row>
          <Button symbol='7' func={func('7')} dark={false}/>
          <Button symbol='8' func={func('8')} dark={false}/>
          <Button symbol='9' func={func('9')} dark={false}/>
          <Button symbol='-' func={func('-')} dark={true}/>
        </Row>
        <Row>
          <Button symbol='0' func={func('0')} dark={false}/>
          <Button symbol='.' func={func('.')} dark={true}/>
          <Button symbol='=' func={func('=')} dark={true}/>
          <Button symbol='+' func={func('+')} dark={true}/>
        </Row>
      </Flex>
    </>
  );
}

Button.propTypes = {
  symbol: PropTypes.string
};

export default App;
