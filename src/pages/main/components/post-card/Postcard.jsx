import { Icon } from '../../../../components'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PostcardContainer = ({
  className,
  id,
  title,
  imageUrl,
  publishedAt,
  commentsCount,
}) => {
  return (
    <Link to={'/post/' + id} className={className}>
      {imageUrl && <img src={imageUrl} alt={title} />}
      <div className='post-card-info'>
        <h3>{title}</h3>
        <Icon id='calendar' />
        &nbsp;{new Date(publishedAt).toLocaleDateString()}
        <div>Comments {commentsCount}</div>
      </div>
    </Link>
  )
}

export const Postcard = styled(PostcardContainer)`
  display: block;
  width: calc(33.33% - 15px);
  max-width: 285px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  text-decoration: none;
  color: inherit;
  transition: color 0.3s, box-shadow 0.3s, transform 0.3s;

  & img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 3px;
  }

  &:hover {
    color: inherit;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
`
