import { useEffect, useLayoutEffect, useState } from 'react'
import { useMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Error, PrivateContent } from '../../components'
import { PostContent, Comments, PostForm } from './components'
import { useServerRequest } from '../../hooks'
import { loadPostAsync, RESET_POST_DATA } from '../../actions'
import { selectPost } from '../../selectors'
import { ROLE } from '../../constants'
import styled from 'styled-components'

const PostContainer = ({ className }) => {
  const dispatch = useDispatch()
  const post = useSelector(selectPost)

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const params = useParams()
  const isCreating = !!useMatch('/post')
  const isEditing = !!useMatch('/post/:id/edit')
  const requestSerevr = useServerRequest()

  useLayoutEffect(() => {
    dispatch(RESET_POST_DATA)
  }, [dispatch, isCreating])

  useEffect(() => {
    if (isCreating) {
      setError(false)
      setIsLoading(false)
      return
    }
    dispatch(loadPostAsync(requestSerevr, params.id)).then(postData => {
      setError(postData.error)
      setIsLoading(false)
    })
  }, [dispatch, requestSerevr, params.id, isCreating])

  const SpecPostPage =
    isEditing || isCreating ? (
      <PrivateContent access={[ROLE.ADMIN]} serverError={error}>
        <div className={className}>
          <PostForm className={className} post={post} />
        </div>
      </PrivateContent>
    ) : (
      <div className={className}>
        <PostContent post={post} />
        <Comments comments={post.comments} postId={post.id} />
      </div>
    )

  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <Error error={error.message} />
  ) : (
    SpecPostPage
  )
}

export const Post = styled(PostContainer)`
  margin: 40px 0;
  padding: 0 80px;
`
