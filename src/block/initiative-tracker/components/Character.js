/**
 * Character.
 */

const {
	i18n: {
        __,
    },
    components: {
        TextControl,
	},
    element: {
        useState,
    },
} = wp;

/**
 * Single Character.
 *
 * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
 * @since  1.0.0
 * @since  2.0.0 Converted to functional component.
 *
 * @param  {Object} props Component props.
 * @return {ReactElement} Component render JSX.
 */
const Character = ( props ) => {
	const {
		character: {
			name,
			player,
			initiative,
		},
		type,
		index,
		editCharacter,
		activeIndex,
		setActive,
		onFrontend,
	} = props;

	const [ isEditing, setIsEditing ] = useState( false );

	const isCurrent = ! onFrontend ? false : ( activeIndex === index );

	/**
	 * Toggle editing state.
	 *
	 * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
	 * @since  1.0.0
	 */
	const toggleEdit = () => {
		setIsEditing( ! isEditing );
	};

	/**
	 * Display AddEditCharacterForm if in admin.
	 *
	 * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return {JSX|null} JSX to edit Character if in admin, null otherwise.
	 */
	const maybeEditCharacter = () => (
		null !== editCharacter ? editCharacter( type, isEditing, toggleEdit, props.character, index ) : null
	);

	if ( isEditing ) {
		return maybeEditCharacter();
	}

	return (
		<li className={ `character ${ isCurrent ? 'current' : '' }` }>
			<span className="name">{ name }</span>

			{ '' !== player && (
				<>
					&nbsp;
					<span className="player">{ `( ${ player } )`}</span>
				</>
			) }

			&nbsp;&mdash;&nbsp;

			{ onFrontend && (
				<TextControl
					className="initiative"
                    type="number"
                    value={ initiative }
                    onFocus={ () => {
                    	setActive( true );
                    } }
                    onBlur={ () => {
                    	setActive( false );
                    } }
                    onChange={ ( newInitiative ) => {
                    	editCharacter( {
                    		...props.character,
                    		initiative: newInitiative,
                    	}, props.character );
                    } }
                />
			) }

			{ ! onFrontend && (
				<span className="initiative">{ initiative || 0 }</span>
			) }

			{ maybeEditCharacter() }
		</li>
	);
};

export default Character;
