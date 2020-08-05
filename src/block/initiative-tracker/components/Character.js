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
		type,
		index,
		editCharacter,
		activeIndex,
		onFrontend = false,
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

	// Args to pass to content filters.
	const filterArgs = {
		type,
		character: { ...props.character },
		index,
	};

	/**
	 * Render content before Character.
	 *
	 * @since  NEXT
	 *
	 * @param  {?ReactElement} JSX to display.
	 * @param  {Object}        Filter args.
	 */
	const renderBeforeCharacter = applyFilters( 'rave.initiativeTracker.beforeCharacter', null, filterArgs );

	/**
	 * Render content after Character.
	 *
	 * @since  NEXT
	 *
	 * @param  {?ReactElement} JSX to display.
	 * @param  {Object}        Filter args.
	 */
	const renderAfterCharacter = applyFilters( 'rave.initiativeTracker.afterCharacter', null, filterArgs );

	const displayCharacter = <span className="name">{ name }</span>,
		displayplayer = 0 < player.length ? <span className="player">{ ` ( ${ player } )` }</span> : null;

	return (
		<li className={ `character ${ isCurrent ? 'current' : '' }` }>

			{ renderBeforeCharacter }

			{ displayCharacter } { displayplayer } : { displayInitiative() }

			{ renderAfterCharacter }
		</li>
	);
};

export default Character;
