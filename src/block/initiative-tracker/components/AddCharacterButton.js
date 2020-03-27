/**
 * WP dependencies
 */
const {
    i18n: {
        __,
    },
    components: {
    	Button,
    },
} = wp;

const AddCharacterButton = ( props ) => {
	const {
		type,
		buttonText,
		addCharacter,
	} = props;

	return (
		<Button
			className="is-button is-primary"
			isPrimary
			onClick={ () => {
				addCharacter( type, {} )
			} }
		>
			{ `+ Add ${buttonText}` }
		</Button>
	);
}

export default AddCharacterButton;
