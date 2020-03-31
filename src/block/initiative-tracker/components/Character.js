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
			<div className="character">
				<span className="character-name">{ name }</span>
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
			</div>
		);
	};
}
