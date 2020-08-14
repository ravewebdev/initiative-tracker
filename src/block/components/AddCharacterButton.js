/**
 * Add Character button.
 */

import AddEditCharacterModal from './AddEditCharacterModal';

const {
	i18n: {
		__,
	},
} = wp;

/**
 * Add Character button.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  NEXT
 *
 * @param  {Object} props Component props.
 * @return {ReactElement} Component render JSX.
 */
const AddCharacterButton = ( props ) => {
	const {
		type,
		addFunction,
	} = props;

	return (
		<AddEditCharacterModal
			type={ type }
			buttonText={ __( 'Add Character' ) }
			characterFn={ addFunction }
		/>
	);
};

export default AddCharacterButton;
