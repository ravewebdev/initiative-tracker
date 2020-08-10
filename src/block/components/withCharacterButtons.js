/**
 * HOC: Component with Character editing buttons.
 */

/**
 * Display component with Character editing buttons.
 *
 * @author @author R A Van Epps <rave@ravanepps.com>
 * @since  NEXT
 *
 * @param  {ReactElement} WrappedComponent      Component to display.
 * @param  {ReactElement} options.buttonFn      Button function used to display buttons within wrapped component.
 * @param  {string}       options.position      Placement of buttons (e.g., before, after).
 * @param  {Array}        options.requiredProps Props from wrapped component to pass through to buttonFn.
 * @return {ReactElement}                       Component to display.
 */
const withCharacterButtons = ( WrappedComponent, { buttonFn = null, position = null, requiredProps = [] } ) => {

	return ( props ) => {
		const newProps = { ...props };

		// Retrieve prop values from wrapped component.
		const args = requiredProps.reduce( ( tmpArgs, curArg ) => ( {
			...tmpArgs,
			[ curArg ]: newProps.hasOwnProperty( curArg ) ? newProps[ curArg ] : null,
		} ), {} );

		// Add buttons to specified position, if provided.
		if ( null !== buttonFn && null !== position ) {
			newProps[ position ] = (
				<div className="edit-character-buttons">
					{ buttonFn( { ...args } ) }
				</div>
			);
		}

		return <WrappedComponent { ...newProps } />;
	};
};

export default withCharacterButtons;
