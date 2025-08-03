import { useCallback, useEffect, useState } from 'react'
import { Pagination, Postcard, Search } from './components'
import { useServerRequest } from '../../hooks'
import { debounce, getLastPage } from './utils'
import styled from 'styled-components'
import { PAG_LIMIT } from '../../constants'

const MainContainer = ({ className }) => {
  const requestServer = useServerRequest()
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [search, setSearch] = useState(false)
  const [searchPhrase, setSearchPhrase] = useState('')

  useEffect(() => {
    requestServer('fetchPosts', searchPhrase, PAG_LIMIT, page).then(posts => {
      setPosts(posts.res)
      setLastPage(getLastPage(posts.links))
    })
  }, [requestServer, page, search])

  const debouncedSearch = useCallback(debounce(setSearch, 2000), [])

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value)
    debouncedSearch(!search)
  }

  return (
    <>
      <h1>Main Page</h1>
      <Search searchPhrase={searchPhrase} onChange={onSearch} />
      {posts.length ? (
        <div className={className}>
          {posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => (
            <Postcard
              key={id}
              id={id}
              title={title}
              imageUrl={imageUrl}
              publishedAt={publishedAt}
              commentsCount={commentsCount}
            />
          ))}
        </div>
      ) : (
        <div>Nothing</div>
      )}
      {!!((lastPage > 1) & posts.length) && (
        <Pagination setPage={setPage} page={page} lastPage={lastPage} />
      )}
    </>
  )
}

export const Main = styled(MainContainer)``
