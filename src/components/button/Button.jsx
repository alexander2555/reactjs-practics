import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const btnStyles = `
  display: inline-block;
  padding: 10px;
  border: 1px solid black;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover:not(:disabled) {
    color: white;
    background-color: black;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
const linkStyles = `
  border-color: transparent;
`
const btn = styled('button')`
  ${btnStyles}
`
const lnk = styled(Link)`
  ${btnStyles + linkStyles}
`

export const Button = ({ link, nav, onClick, children, className, title, disabled }) => {
  const navigate = useNavigate()
  const ButtonContainer = link || nav ? lnk : btn

  const handleClick = e => {
    if (onClick) {
      onClick(e)
    }
    if (nav) {
      navigate(nav)
    }
  }

  return (
    <ButtonContainer
      className={className}
      onClick={handleClick}
      to={link}
      title={title}
      disabled={disabled}
    >
      {children}
    </ButtonContainer>
  )
}

Button.propTypes = {
  link: PropTypes.string,
  nav: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  disabled: PropTypes.bool,
}
