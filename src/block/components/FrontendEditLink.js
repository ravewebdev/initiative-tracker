/**
 * Frontend Edit Link.
 */

const {
	components: {
		Dashicon,
	},
} = wp;

/**
 * Frontend editing link.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  NEXT
 *
 * @param  {Object} props Component props.
 * @return {ReactElement} Component render JSX.
 */
const FrontendEditLink = ( props ) => {
	const {
		linkClass,
		icon,
		label,
		clickFunction,
		isLoading,
	} = props;

	return (
		<button
			className={ linkClass }
			onClick={ ( event ) => {
				event.preventDefault();

				// Stop here if currently in loading state.
				if ( isLoading ) {
					return false;
				}

				clickFunction();
			} }
		>
			<Dashicon icon={ icon } /> { label }
		</button>
	);
};

export default FrontendEditLink;
