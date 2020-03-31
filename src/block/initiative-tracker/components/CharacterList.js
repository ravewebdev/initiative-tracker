/**
 * WP dependencies
 */
const {
    components: {
        Button,
    },
    element: {
        Component,
    },
} = wp;

/**
 * Components
 */
import Character from './Character';
import AddEditCharacterForm from './AddEditCharacterForm';

export default class CharacterList extends Component {
	constructor( props ) {
		super( props );
	
		this.state = {
			adding: false,
		};
	};

	render() {
		const {
			adding,
		} = this.state;
		const {
			title,
			characters,
			type,
			addCharacter,
			editCharacter,
			deleteCharacter,
			addText,
			editText,
		} = this.props;

		const toggleAdd = () => {
			this.setState( {
				adding: ! adding
			} );
		};
		
		return (
			<div className={ `character-list--${type}` }>
				<h2>{ title }</h2>

				{ characters.length && (
					<ul>
						{ characters.map( ( character, index ) => (
							<Character
								character={ character }
								type={ type }
								index={ index }
								editCharacter={ editCharacter }
								deleteCharacter={ deleteCharacter }
								editText={ editText }
							/>
						) ) }
					</ul>
				) }

				{ ! adding && (
					<Button
			            isPrimary
			            onClick={ () => {
			            	this.setState( {
			            		adding: true
			            	} );
			            } }
					>
						{ addText }
					</Button>
				) }

				{ adding && (
					<AddEditCharacterForm
						type={ type}
						characterFn={ addCharacter }
						buttonText={ addText }
						toggle={ toggleAdd }
					/>
				) }
			</div>
		);
	};
}
