/**
 * HOC: Component with Character editing buttons.
 */

/**
 * Component with Character editing buttons.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  NEXT
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  NEXT
 *
 * @param  {ReactElement} WrappedComponent The wrapped component to display.
 * @return {Function}                      A function that accepts a single param, `props`, to display the wrapped component.
 */
const withCharacterButtons = ( WrappedComponent ) => {

	/**
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  NEXT
	 *
	 * @param  {Object} props Props of the wrapped component.
	 * @return {ReactElement} The wrapped component.
	 */
	return ( props ) => {
		const {
			buttons = null,
			position = null,
			...passThruProps
		} = props;

		// Add buttons to specified position, if provided.
		if ( null !== buttons && null !== position ) {
			passThruProps[ position ] = (
				<div className="edit-character-buttons">
					{ buttons }
				</div>
			);
		}

		return <WrappedComponent { ...passThruProps } />;
	};
};

export default withCharacterButtons;
