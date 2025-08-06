import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon, Input } from '../../../../components'

const SearchContainer = ({ className, searchPhrase, onChange }) => {
  return (
    <div className={className}>
      <Input
        value={searchPhrase}
        placeholder='Search with title...'
        onChange={onChange}
      />
      <Icon id='search' />
    </div>
  )
}

export const Search = styled(SearchContainer)`
  display: flex;
  align-items: center;
  margin: 0 auto 20px;
  padding: 0 10px;
  border: 1px solid black;
  border-radius: 3px;
  max-width: 400px;

  & input {
    margin: 0;

    border: none;
  }
`

Search.propTypes = {
  searchPhrase: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
