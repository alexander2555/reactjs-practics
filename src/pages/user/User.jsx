import styled from 'styled-components'

const UserContainer = ({ className, login }) => {
  return (
    <div className={className}>
      <h2>User ${login}</h2>
      <p>This is the user page content.</p>
    </div>
  )
}

export const User = styled(UserContainer)``
