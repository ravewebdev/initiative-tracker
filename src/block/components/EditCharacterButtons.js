/**
 * Edit/delete Character buttons.
 */

import AddEditCharacterModal from './AddEditCharacterModal';
import DeleteCharacterModal from './DeleteCharacterModal';

const {
	i18n: {
		__,
	},
} = wp;

/**
 * Add/Edit Character modal.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  NEXT
 *
 * @param  {Object} props Component props.
 * @return {ReactElement} Component render JSX.
 */
const EditCharacterButtons = ( props ) => {
	const {
		type,
		editFunction,
		deleteFunction,
		character,
		index,
	} = props;

	return (
		<>
			<AddEditCharacterModal
				type={ type }
				buttonText={ __( 'Edit Character' ) }
				characterFn={ editFunction }
				character={ character }
				index={ index }
			/>
			<DeleteCharacterModal
				index={ index }
				deleteCharacter={ deleteFunction }
				name={ character.name }
				type={ type }
			/>
		</>
	);
};

export default EditCharacterButtons;
