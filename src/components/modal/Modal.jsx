import { useSelector } from 'react-redux'
import { Button } from '../button/Button'
import {
  selectModalIsOpen,
  selectModalOnCancel,
  selectModalOnConfirm,
  selectModalTitle,
} from '../../selectors'
import styled from 'styled-components'

const ModalContainer = ({ className }) => {
  const isOpen = useSelector(selectModalIsOpen)
  const modalTitle = useSelector(selectModalTitle)
  const onConfirm = useSelector(selectModalOnConfirm)
  const onCancel = useSelector(selectModalOnCancel)

  if (!isOpen) {
    return null
  }

  return (
    <div className={className}>
      <div className='overlay'></div>
      <div className='modal-content'>
        <h3>{modalTitle}</h3>
        <p>This is a modal dialog.</p>
        <div className='buttons'>
          <Button onClick={onConfirm}>Ok</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export const Modal = styled(ModalContainer)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  & .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  & .modal-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 50%;
    height: 50%;
    min-width: 250px;
    min-height: 100px;
    padding: 20px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  & .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
