/**
 * WP dependencies
 */
const {
    i18n: {
        __,
    },
    components: {
        TextControl,
        Button,
    },
    element: {
        Component,
    },
} = wp;

export default class AddEditCharacterForm extends Component {
    constructor( props ) {
        super( props )
    
        this.state = {
            name: '',
            player: '',
            initiative: 0,
        }
    };

    render() {
        const {
            name,
            player,
            initiative,
        } = this.state;
        const {
            type,
            addCharacter,
            toggle,
        } = this.props;

        return (
            <>
                <TextControl
                    label={ __( 'Character Name', 'rave-rpg-initiative' ) }
                    value={ name }
                    onChange={ ( name ) => {
                        this.setState( {
                            name
                        } )
                    } }
                />
                { 'player' === type && (
                    <TextControl
                        label={ __( 'Player Name', 'rave-rpg-initiative' ) }
                        value={ player }
                        onChange={ ( player ) => {
                            this.setState( {
                                player
                            } )
                        } }
                    />
                ) }
                <TextControl
                    label={ __( 'Initiative', 'rave-rpg-initiative' ) }
                    type="number"
                    value={ initiative }
                    onChange={ ( initiative ) => {
                        this.setState( {
                            initiative
                        } )
                    } }
                />
                <Button
                    className="is-button is-secondary"
                    isSecondary
                    onClick={ toggle }
                >
                    Cancel
                </Button>
                <Button
                    className="is-button is-primary"
                    isPrimary
                    onClick={ ( { name, player, initiative } ) => {
                        addCharacter( type, {
                            name,
                            player,
                            initiative,
                        } );
                        toggle();
                    } }
                >
                    Save
                </Button>
            </>
        );
    }
}
