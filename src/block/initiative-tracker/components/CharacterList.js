/**
 * Character List.
 */

const {
	element: {
		useState,
	},
} = wp;

/**
 * Character List.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 * @since  2.0.0 Converted to functional component.
 *
 * @param  {Object} props Component props.
 * @return {ReactElement} Component render JSX.
 */
const CharacterList = ( props ) => {
	const {
		title,
		characters,
		renderCharacters = null,
		type = null,
		activeIndex = null,
		children = null,
	} = props;

	const [ isAdding, setIsAdding ] = useState( false );

	/**
	 * Toggle adding state.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  1.0.0
	 */
	const toggleAdd = () => {
		setIsAdding( ! isAdding );
	};

	return (
		<div className={ `character-list${ null === type ? '' : `--${ type }` }` }>
			<h2>{ title }</h2>

			{ null !== children && children }

			{ null !== renderCharacters && renderCharacters( {
				type,
				characters,
				isAdding,
				toggleAdd,
			} ) }
		</div>
	);
};

export default CharacterList;
