import PropTypes from 'prop-types'
import { Button } from '../../../../components'
import styled from 'styled-components'

const PaginationContainer = ({ className, page, setPage, lastPage }) => {
  return (
    <div className={className}>
      <Button onClick={() => setPage(1)} disabled={page === 1}>
        Begin
      </Button>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </Button>
      <div className='current-page'>{page}</div>
      <Button onClick={() => setPage(page + 1)} disabled={page === lastPage}>
        Next
      </Button>
      <Button onClick={() => setPage(lastPage)} disabled={page === lastPage}>
        End
      </Button>
    </div>
  )
}

export const Pagination = styled(PaginationContainer)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px auto;

  & .current-page {
    padding: 10px;
  }
`

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,
}
