/**
 * WP dependencies
 */
const {
    i18n: {
        __,
    },
    element: {
        Component,
    	useState,
    },
    components: {
		Dashicon,
        Button,
        Modal,
	},
} = wp;

const DeleteCharacterModal = ( props ) => {
	const {
		name,
		index,
		type,
		deleteCharacter,
	} = props;
	const [ isOpen, setOpen ] = useState( false );
	const toggle = () => {
		setOpen( isOpen ? false : true );
	};

	return (
		<>
			<Button
				className="delete-character button-link-delete"
	            onClick={ toggle }
	            isDestructive
			>
				<Dashicon icon="trash" />
			</Button>
			{ isOpen && (
				<Modal
					title={ __( 'Delete Character: ', 'rave-rpg-initiative' ) + name }
					onRequestClose={ toggle }
				>
					<p> { __( 'Are you sure you want to delete this character?' ) } </p>
					<Button
						className="is-button"
	                    isSecondary
	                    onClick={ toggle }
	                >
	                    { __( 'Cancel', 'rave-rpg-initiative' ) }
	                </Button>
	                <Button
	                    className="button-link-delete"
	                    isDestructive
	                    onClick={ () => {
	                        deleteCharacter( type, index );
	                        toggle();
	                    } }
	                >
	                    { __( 'Delete Character', 'rave-rpg-initiative' ) }
	                </Button>
				</Modal>
			) }
		</>
	);
}

export default class Character extends Component {
	constructor( props ) {
		super( props )
	
		this.state = {
			editing: false,
		}
	}

	render() {
		const {
			editing,
		} = this.state;
		const {
			characterName,
			playerName,
			type,
			index,
			deleteCharacter,
		} = this.props;

		{ editing && (
			<div className="edit-character">
				<TextControl
					label={ __( 'Character Name', 'rave-rpg-initiative' ) }
				/>
				{ 'player' === type && (
					<TextControl
						label={ __( 'Player Name', 'rave-rpg-initiative' ) }
					/>
				) }
			</div>
		) }

		return (
			<div className="character">
				<span className="character-name">{ characterName }</span>
				<Button className="edit-character" isTertiary>
					<Dashicon icon="edit" />
				</Button>
				<DeleteCharacterModal index={ index } deleteCharacter={ deleteCharacter } name={ characterName } type={ type } />
			</div>
		);
	}
}
