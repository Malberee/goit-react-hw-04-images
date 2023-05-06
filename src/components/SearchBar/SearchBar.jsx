import {useState} from 'react'
import { FaSearch } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { Header, Form, Input, SearchBtn } from './SearchBar.styled'

const SearchBar = ({onFormSubmit}) => {
	const [query, setQuery] = useState('')

	const onInputChange = (e) => {
		setQuery(e.target.value)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		if(query.trim() !== '') onFormSubmit(query)
	}

		return (
			<Header>
				<Form onSubmit={onSubmit}>
					<SearchBtn type="submit">
						<FaSearch></FaSearch>
					</SearchBtn>

					<Input
						type="text"
						autocomplete="off"
						autoFocus
						placeholder="Search images and photos"
						value={query}
						onChange={onInputChange}
					/>
				</Form>
			</Header>
		)
	
}

SearchBar.propTypes = {
	onFormSubmit: PropTypes.func.isRequired
}

SearchBar.defaultProps = {}

export default SearchBar
