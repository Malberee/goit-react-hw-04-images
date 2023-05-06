import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { Overlay, ModalWindow, Image } from './Modal.styled'

const modalRoot = document.querySelector('#modal-root')

const Modal = ({ toggleModal, image }) => {
	useEffect(() => {
		window.addEventListener('keydown', onEscape)

		return () => {
			window.removeEventListener('keydown', onEscape)
		}
	}, [])

	const onEscape = (e) => {
		if (e.code === 'Escape') {
			toggleModal()
		}
	}

	return createPortal(
		<Overlay onClick={() => toggleModal()}>
			<ModalWindow onClick={(e) => e.stopPropagation()}>
				<Image src={image} alt="" />
			</ModalWindow>
		</Overlay>,
		modalRoot
	)
}

Modal.propTypes = {
	image: PropTypes.string.isRequired,
	toggleModal: PropTypes.func.isRequired,
}

Modal.defaultProps = {}

export default Modal
