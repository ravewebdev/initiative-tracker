/**
* WordPress dependencies.
*/
const {
    components: {
        PanelBody,
        PanelRow,
        TextControl,
        Button,
    },
    element: {
        Component,
    }
} = wp;

/**
 * Components
 */
import Character from './Character';

export default class CharacterPanel extends Component {
    constructor( props ) {
        super( props )
    
        this.state = {
            adding: false,
        }
    }

    render() {
        const {
            type,
            title,
            buttonText,
            addCharacter,
            characters,
        } = this.props;
        const {
            adding,
        } = this.state;

        const sortedCharacters = [ ...characters ];
        sortedCharacters.sort( function( char1, char2 ) {
            return char1.name.localeCompare( char2.name );
        } );

        return (
            <PanelBody title={ title } className="character-panel">
                <PanelRow>
                    { sortedCharacters.length && (
                        <ul className="character-list">
                            { sortedCharacters.map( character => (
                                <Character characterName={ character.name } type={ type } />
                            ) ) }
                        </ul>
                    ) }
                    { adding && (
                        <Character type={ type } addCharacter={ addCharacter } />
                    ) }
                    { ! adding && (
                        <Button
                            className="is-button is-primary"
                            isPrimary
                            onClick={ () => {
                                this.setState( {
                                    adding: true
                                } );
                            } }
                        >
                            { `+ Add ${buttonText}` }
                        </Button>
                    ) }
                </PanelRow>
            </PanelBody>
        );
    };
}
