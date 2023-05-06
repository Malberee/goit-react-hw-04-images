import { useEffect, useState } from 'react'
import getImages from '../scripts/getImages'
import SearchBar from './SearchBar'
import ImageGallery from './ImageGallery'
import Loader from './Loader'
import Button from './Button'
import Modal from './Modal'

const App = () => {
	const [query, setQuery] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [images, setImages] = useState([])
	const [currentImage, setCurrentImage] = useState('')
	const [loadPages, setLoadPages] = useState(1)
	const [totalImages, setTotalImages] = useState(0)

	useEffect(() => {
		if(!query) return
		async function fetchData() {
			try {
				toggleLoading()
				const { hits, totalHits } = await getImages(query, loadPages)
				setImages([...images, ...hits])
				setTotalImages(totalHits)
			} catch (err) {
				console.log(err)
			} finally {
				toggleLoading()
			}
		}
		fetchData()
	}, [loadPages, query])

	const toggleLoading = () => {
		setIsLoading(prevState => !prevState)
	}

	const toggleModal = (image = '') => {
		setCurrentImage(image)
	}

	const onSearchSubmit = (newQuery) => {
		if (newQuery !== query) {
			setQuery(newQuery)
			setImages([])
			setLoadPages(1)
			setTotalImages(0)
		}
	}

	const onLoadMore = () => {
		setLoadPages(prevState => prevState + 1)
	}

	const showButton = images.length !== totalImages && !isLoading
	return (
		<>
			<SearchBar onFormSubmit={onSearchSubmit} />
			{images.length && (
				<ImageGallery images={images} toggleModal={toggleModal} />
			)}
			{isLoading && <Loader />}
			{showButton && <Button onLoadMore={onLoadMore} />}
			{currentImage && <Modal image={currentImage} toggleModal={toggleModal} />}
		</>
	)
}

export default App
