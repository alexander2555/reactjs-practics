import { SpecialPanel } from '../special-panel/SpecialPanel'
import { Button, Icon } from '../../../../components'
import styled from 'styled-components'

const ImgFloat = styled.img`
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
`

const PostContentContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  return (
    <div className={className}>
      {imageUrl && <ImgFloat src={imageUrl} alt={title} />}
      <h1>{title}</h1>
      <SpecialPanel
        id={id}
        className={className}
        publishedAt={publishedAt}
        editButton={
          <Button link={'/post/' + id + '/edit'}>
            <Icon id='edit' />
          </Button>
        }
      />
      <div className='post-content'>
        <p>{content}</p>
      </div>
    </div>
  )
}

export const PostContent = styled(PostContentContainer)``
