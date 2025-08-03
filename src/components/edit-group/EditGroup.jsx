import { Button, Icon } from '../'

import styled from 'styled-components'

const EditGroupContainer = ({ className, name, data, setData, placeholder, onClick }) => {
  return (
    <div className={className}>
      <textarea
        name={name}
        value={data}
        onChange={({ target }) => setData(target.value)}
        placeholder={placeholder}
      />
      <Button onClick={onClick} disabled={!data}>
        <Icon id='save' />
      </Button>
    </div>
  )
}

export const EditGroup = styled(EditGroupContainer)`
  display: flex;
`
