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
 * @author R A Van Epps <rave@ravanepps.com>
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
		onFrontend = false,
	} = props;

	const [ isEditing, setIsEditing ] = useState( false );

	const isCurrent = ! onFrontend ? false : ( activeIndex === index );

	/**
	 * Toggle editing state.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  1.0.0
	 */
	const toggleEdit = () => {
		setIsEditing( ! isEditing );
	};

	/**
	 * Display AddEditCharacterForm if in admin.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 *
	 * @return {ReactElement} JSX to edit Character if in admin.
	 */
	const maybeEditCharacter = () => (
		( ! onFrontend && null !== editCharacter ) ? editCharacter( type, isEditing, toggleEdit, props.character, index ) : null
	);

	if ( isEditing ) {
		return maybeEditCharacter();
	}

	/**
	 * Display Initiative inputs if editing on frontend.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 *
	 * @return {ReactElement} JSX for read-only or editable initiative score.
	 */
	const displayInitiative = () => {
		let initiativeDisplay = null;

		if ( onFrontend && null !== editCharacter ) {
			initiativeDisplay = editCharacter( props.character );
		}

		return initiativeDisplay || <span className="initiative">{ initiative || 0 }</span>;
	};

	return (
		<li className={ `character ${ isCurrent ? 'current' : '' }` }>
			<span className="name">{ name }</span>

			{ '' !== player && (
				<>
					&nbsp;
					<span className="player">{ `( ${ player } )`}</span>
				</>
			) }

			&nbsp;:&nbsp;

			{ displayInitiative() }

			{ maybeEditCharacter() }
		</li>
	);
};

export default Character;
