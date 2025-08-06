import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const UserContainer = ({ className }) => {
  const params = useParams()

  return (
    <div className={className}>
      <h1>User ID: {params.id}</h1>
      <p>This will the user page content...</p>
    </div>
  )
}

export const User = styled(UserContainer)`
  & p {
    text-align: center;
  }
`
