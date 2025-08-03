import { Button, Icon } from '../../../../components'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Img = styled.img`
  max-height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
`

const PostcardContainer = ({
  className,
  id,
  title,
  imageUrl,
  publishedAt,
  commentsCount,
}) => {
  return (
    <div className={className}>
      <Link to={'/post/' + id}>
        {imageUrl && <Img src={imageUrl} alt={title} />}
        <h2>{title}</h2>
        <Icon id='calendar' /> {new Date(publishedAt).toLocaleDateString()}
        <div>Comments {commentsCount}</div>
      </Link>
    </div>
  )
}

export const Postcard = styled(PostcardContainer)``
