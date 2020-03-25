const { __ } = wp.i18n;

import { Button } from '@wordpress/components';

/**
 * Button to add a new character.
 *
 * @author Rebekah Van Epps <rave@ravanepps.com>
 * @since  2020-03-19
 *
 * @param  {Object}    props Properties passed from parent.
 * @return {WPElement}       Element to render.
 */
const AddCharacterButton = props => {
	const { type, buttonText, addCharacter } = props;

	return (
		<Button
			className="is-button is-primary"
			isPrimary
			onClick={ () => {
				addCharacter( type )
			} }
		>
			{ `+ Add ${buttonText}` }
		</Button>
	);
}

export default AddCharacterButton;
