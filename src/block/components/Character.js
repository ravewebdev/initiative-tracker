/**
 * Character.
 */

const {
	hooks: {
		applyFilters,
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
		index,
		editCharacter,
		activeIndex,
		onFrontend = false,
		before = null,
		after = null,
	} = props;

	const isCurrent = ! onFrontend ? false : ( activeIndex === index );

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

	const displayCharacter = <span className="name">{ name }</span>,
		displayplayer = 0 < player.length ? <span className="player">{ `( ${ player } )` }</span> : null;

	return (
		<li className={ `character ${ isCurrent ? 'current' : '' }` }>

			{ before }

			{ displayCharacter } { displayplayer } :&nbsp;{ displayInitiative() }

			{ after }
		</li>
	);
};

export default Character;
