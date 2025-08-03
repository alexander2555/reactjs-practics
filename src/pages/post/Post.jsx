import { useState } from 'react'
import { useEffect, useLayoutEffect } from 'react'
import { useMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Error } from '../../components'
import { PostContent, Comments, PostForm } from './components'
import { useServerRequest } from '../../hooks'
import { loadPostAsync, RESET_POST_DATA } from '../../actions'
import { selectPost } from '../../selectors'
import styled from 'styled-components'

const PostContainer = ({ className }) => {
  const dispatch = useDispatch()
  const post = useSelector(selectPost)

  const [error, setError] = useState(true)
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

  console.log(isLoading)

  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <Error error={error.message} />
  ) : (
    <div className={className}>
      {isEditing || isCreating ? (
        <PostForm className={className} post={post} />
      ) : (
        <>
          <PostContent className={className} post={post} />
          <Comments comments={post.comments} postId={post.id} />
        </>
      )}
    </div>
  )
}

export const Post = styled(PostContainer)``
