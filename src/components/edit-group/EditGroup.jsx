import PropTypes from 'prop-types'

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

EditGroup.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}
