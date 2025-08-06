import { ControlPanel, Logo } from './components'
import styled from 'styled-components'

const Description = styled.div`
  font-style: italic;
`

const HeaderContainer = ({ className }) => (
  <header className={className}>
    <Logo />
    <Description>
      <p>Welcome to the application!</p>
    </Description>
    <ControlPanel />
  </header>
)
export const Header = styled(HeaderContainer)`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height, 100px);
  width: 100%;
  padding: 20px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
