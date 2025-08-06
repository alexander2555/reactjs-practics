import { PROP_TYPE } from '../../constants'
import styled from 'styled-components'

const ErrorContainer = ({ error }) => {
  return (
    <div>
      <h2>Error</h2>
      <p>{error}</p>
    </div>
  )
}

export const Error = styled(ErrorContainer)``

Error.propTypes = {
  error: PROP_TYPE.ERROR,
}
