/**
 * HOC: Component with Character editing buttons.
 */

/**
 * Display component with Character editing buttons.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  NEXT
 *
 * @param  {Object} options.buttonFn      Button function used to display buttons within wrapped component.
 * @param  {string} options.position      Placement of buttons (e.g., before, after).
 * @param  {Array}  options.requiredProps Props from wrapped component to pass through to buttonFn.
 * @return {Function}                     A function that accepts a single param, `WrappedComponent`, to display the HOC.
 */
const withCharacterButtons = ( { buttonFn = null, position = null, requiredProps = [] } ) => {

	/**
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  NEXT
	 *
	 * @param  {ReactElement} WrappedComponent The wrapped component to display.
	 * @return {Function}                      A function that accepts a single param, `props`, to display the wrapped component.
	 */
	return ( WrappedComponent ) => {

		/**
		 * @author R A Van Epps <rave@ravanepps.com>
		 * @since  NEXT
		 *
		 * @param  {Object} props Props of the wrapped component.
		 * @return {ReactElement} The wrapped component.
		 */
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
};

export default withCharacterButtons;
