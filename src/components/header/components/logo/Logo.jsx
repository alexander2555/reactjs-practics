import { Link } from 'react-router-dom'
import { Icon } from '../../../icon/Icon'
import styled from 'styled-components'

const LogoText = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
`

const LogoContainer = ({ className }) => (
  <Link to='/' className={className}>
    <Icon id='code' size='32px' />
    <div>
      <LogoText>Blog</LogoText>
    </div>
  </Link>
)

export const Logo = styled(LogoContainer)`
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
`
