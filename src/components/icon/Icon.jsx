import styled from 'styled-components'

const IconContainer = ({ id }) => <i className={`fa fa-${id}`} />

export const Icon = styled(IconContainer)`
  font-size: ${({ size = '16px' }) => size};
  margin: ${({ margin = '0' }) => margin};
`
