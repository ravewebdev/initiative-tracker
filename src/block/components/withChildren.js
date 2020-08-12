/**
 * HOC: Component with `children` prop.
 */

/**
 * Display component with custom `children` prop.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  NEXT
 *
 * @param  {Function} options.childrenFn    Function used to generate `children` prop.
 * @param  {Array}    options.requiredProps Props from wrapped component to pass through to buttonFn.
 * @return {Function}                       A function that accepts a single param, `WrappedComponent`, to display the HOC.
 */
const withChildren = ( { childrenFn = null, requiredProps = [] } ) => {

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

			// Add `children` if provided.
			if ( null !== childrenFn ) {
				newProps.children = childrenFn( { ...args } );
			}

			return (
				<WrappedComponent { ...newProps } />
			);
		};
	};
};

export default withChildren;
