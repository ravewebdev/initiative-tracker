/**
 * Add/Edit Character Form.
 */

const {
	i18n: {
		__,
	},
	components: {
		Button,
		TextControl,
	},
	element: {
		useEffect,
		useState,
	},
} = wp;

/**
 * Add/Edit Character form.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 * @since  2.0.0 Converted to functional component.
 *
 * @param  {Object} props Component props.
 * @return {ReactElement} Component render JSX.
 */
const AddEditCharacterForm = ( props ) => {
	const {
		type,
		characterFn,
		toggle,
		character = null,
		index = null,
	} = props;

	const [ state, setState ] = useState( {
		name: null,
		player: null,
		initiative: 0,
		nameIsEmpty: true,
		playerIsEmpty: true,
		editing: false,
	} );

	// Set initial state values.
	useEffect( () => {
		if ( null === character ) {
			return;
		}

		setState( {
			...state,
			...character,
			nameIsEmpty: false,
			playerIsEmpty: false,
			editing: true,
		} );
	}, [] );

	/**
	 * Submit form to add/update Character.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 */
	const submitForm = () => {
		const regexDigits = /^[\d]+$/;
		const tmpCharacter = {
			...character,
			name: name.trim(),
			player: ( isPlayer ? player.trim() : '' ),
			initiative: regexDigits.test( initiative ) ? initiative : 0,
		};

		if ( editing ) {
			characterFn( type, index, tmpCharacter );
		} else {
			characterFn( type, tmpCharacter );
		}

		toggle( type );
	};

	/**
	 * Handle potentially submitting form on enter.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 *
	 * @param  {Object} event Key press event.
	 * @return {void}
	 */
	const maybeSubmitForm = ( event ) => {
		if ( 'Enter' !== event.key ) {
			return;
		}

		submitForm();
	};

	const {
		name,
		player,
		initiative,
		nameIsEmpty,
		playerIsEmpty,
		editing,
	} = state;

	const errorClass = 'input-error',
		isPlayer = 'players' === type,
		disableSave = ( isPlayer && playerIsEmpty ) || nameIsEmpty;

	return (
		<div className="edit-character-form">
			<TextControl
				label={ __( 'Character Name *', 'initiative-tracker' ) }
				value={ nameIsEmpty ? '' : name }
				onChange={ ( newName ) => {
					setState( {
						...state,
						name: newName,
						nameIsEmpty: ( '' === newName.trim() ),
					} );
				} }
				className={ null !== name && nameIsEmpty ? errorClass : '' }
				onKeyPress={ maybeSubmitForm }
			/>
			{ isPlayer && (
				<TextControl
					label={ __( 'Player Name *', 'initiative-tracker' ) }
					value={ playerIsEmpty ? '' : player }
					onChange={ ( newPlayer ) => {
						setState( {
							...state,
							player: newPlayer,
							playerIsEmpty: ( '' === newPlayer.trim() ),
						} );
					} }
					className={ null !== player && playerIsEmpty ? errorClass : '' }
					onKeyPress={ maybeSubmitForm }
				/>
			) }
			<TextControl
				label={ __( 'Initiative', 'initiative-tracker' ) }
				type="number"
				value={ initiative }
				onChange={ ( newInitiative ) => {
					setState( {
						...state,
						initiative: newInitiative,
					} );
				} }
				onKeyPress={ maybeSubmitForm }
				min="0"
			/>
			<div className="edit-character-buttons">
				<Button
					isSecondary
					onClick={ () => toggle( type ) }
				>
					{ __( 'Cancel', 'initiative-tracker' ) }
				</Button>
				<Button
					isPrimary
					disabled={ disableSave }
					onClick={ submitForm }
				>
					{ __( 'Save', 'initiative-tracker' ) }
				</Button>
			</div>
		</div>
	);
};

export default AddEditCharacterForm;
