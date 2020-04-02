/**
 * WP dependencies
 */
const {
    i18n: {
        __,
    },
    element: {
        Component,
    },
    components: {
		Dashicon,
        Button,
	},
} = wp;

/**
 * Components
 */
import DeleteCharacterModal from './DeleteCharacterModal';
import AddEditCharacterForm from './AddEditCharacterForm';

export default class Character extends Component {
	constructor( props ) {
		super( props );
	
		this.state = {
			editing: false,
		}
	};

	render() {
		const {
			editing,
		} = this.state;
		const {
			character: {
				name,
				player,
				initiative,
			},
			type,
			index,
			editCharacter,
			deleteCharacter,
			editText,
			active,
		} = this.props;

		const toggleEdit = () => {
			this.setState( {
				editing: ! editing
			} );
		};

		if ( editing ) {
			return (
				<AddEditCharacterForm
			 		type={ type}
			 		characterFn={ editCharacter }
			 		buttonText={ editText }
			 		toggle={ toggleEdit }
			 		character={ {
			 			name,
			 			player,
			 			initiative,
			 			index,
			 		} }
			 	/>
			);
		}

		return (
			<li className="character">
				<span className="name">{ name }</span>

				{ ! active && (
					<span className="player">{ ` ( ${ '' === player ? 'NPC' : player } ) `}</span>
				) }

				<span className="initiative">{ ` - ${initiative}` }</span>

				{ active && (
					<>
						<Button
							className="edit-character"
							isTertiary
							onClick={ toggleEdit }
						>
							<Dashicon icon="edit" />
						</Button>
						<DeleteCharacterModal
							index={ index }
							deleteCharacter={ deleteCharacter }
							name={ name }
							type={ type }
						/>
					</>
				) }
			</li>
		);
	};
}
