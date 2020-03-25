/**
* WordPress dependencies.
*/
const {
    components: {
        PanelBody,
        PanelRow,
    }
} = wp;

/**
 * Components
 */
import AddCharacterButton from './AddCharacterButton';

const CharacterPanel = ( props ) => {
	const {
		type,
		title,
		buttonText,
		addCharacter,
	} = props;

	return (
		<PanelBody title={ title }>
            <PanelRow>
                <AddCharacterButton
                    type={ type }
                    buttonText={ buttonText }
                    addCharacter={ addCharacter }
                />
            </PanelRow>
        </PanelBody>
	);
};

export default CharacterPanel;
