import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLayoutEffect, useRef, useState } from 'react'
import { Button, Icon, Input } from '../../../../components'
import { SpecialPanel } from '../special-panel/SpecialPanel'
import { sanitizeContent } from './utils'
import { savePostAsync } from '../../../../actions'
import styled from 'styled-components'
import { useServerRequest } from '../../../../hooks'

const ImgFloat = styled.img`
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
`

const PostFormContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const [imageUrlVal, setImageUrlVal] = useState(imageUrl)
  const [titleVal, setTitleVal] = useState(title)
  const contentRef = useRef(null)

  useLayoutEffect(() => {
    setImageUrlVal(imageUrl)
    setTitleVal(title)
  }, [imageUrl, title])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const requestServer = useServerRequest()

  const onSave = () => {
    const newContent = sanitizeContent(contentRef.current.innerHTML)

    dispatch(
      savePostAsync(requestServer, {
        id,
        imageUrl: imageUrlVal,
        title: titleVal,
        content: newContent,
      }),
    ).then(({ id }) => navigate('/post/' + id))
  }

  const onImageUrlChange = ({ target }) => setImageUrlVal(target.value)
  const onTitleChange = ({ target }) => setTitleVal(target.value)

  return (
    <div className={className}>
      <Input value={titleVal} placeholder='Title...' onChange={onTitleChange} />
      <Input value={imageUrlVal} placeholder='Image...' onChange={onImageUrlChange} />
      {imageUrl && <ImgFloat src={imageUrl} alt={title} />}
      <h1>{title}</h1>
      <SpecialPanel
        id={id}
        className={className}
        publishedAt={publishedAt}
        editButton={
          <Button onClick={onSave}>
            <Icon id='save' />
          </Button>
        }
      />
      <div className='post-content'>
        <div
          contentEditable={true}
          suppressContentEditableWarning={true}
          ref={contentRef}
        >
          {content}
        </div>
      </div>
    </div>
  )
}

export const PostForm = styled(PostFormContainer)``
