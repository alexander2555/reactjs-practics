import styled from 'styled-components'
import { Icon, Input } from '../../../../components'

const SearchContainer = ({ className, searchPhrase, onChange }) => {
  return (
    <div className={className}>
      <Input value={searchPhrase} placeholder='Search in title...' onChange={onChange} />
      <Icon id='search' />
    </div>
  )
}

export const Search = styled(SearchContainer)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
  border: 1px solid black;

  & input {
    margin: 0;

    border: none;
  }
`
