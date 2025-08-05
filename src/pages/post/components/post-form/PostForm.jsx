import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLayoutEffect, useRef, useState } from 'react'
import { Button, Icon, Input } from '../../../../components'
import { SpecialPanel } from '../special-panel/SpecialPanel'
import { sanitizeContent } from './utils'
import { savePostAsync } from '../../../../actions'
import { useServerRequest } from '../../../../hooks'
import { PROP_TYPE } from '../../../../constants'
import styled from 'styled-components'

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
        publishedAt={publishedAt}
        editButton={
          <Button onClick={onSave}>
            <Icon id='save' />
          </Button>
        }
      />

      <div className='post-content'>
        <span className='placeholder'>Write or edit your content...</span>
        <div
          contentEditable={true}
          suppressContentEditableWarning={true}
          placeholder='Content...'
          ref={contentRef}
        >
          {content}
        </div>
      </div>
    </div>
  )
}

export const PostForm = styled(PostFormContainer)`
  & h1 {
    text-align: left;
    text-transform: capitalize;
  }
  & .post-content {
    width: 100%;
    position: relative;
    border: 1px solid #000;
    padding: 10px;
    border-radius: 3px;
    float: left;

    & .placeholder {
      font-size: smaller;
      // font-style: italic;
      opacity: 0.5;
    }

    &:focus-within {
      & .placeholder {
        display: none;
      }
    }
  }
`

PostForm.propTypes = {
  post: PropTypes.arrayOf(PROP_TYPE.POST).isRequired,
}
