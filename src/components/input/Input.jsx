import { forwardRef } from 'react'
import styled from 'styled-components'

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
  return <input className={className} {...props} ref={ref} />
})

export const Input = styled(InputContainer)`
  // height: 40px;
  width: ${({ width = '100%' }) => width};
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 4px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #ccc;
  }
`
