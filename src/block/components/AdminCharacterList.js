/**
 * Admin Character List
 */

import AddCharacterButton from '../components/AddCharacterButton';
import Character from '../components/Character';
import CharacterList from '../components/CharacterList';
import EditCharacterButtons from '../components/EditCharacterButtons';
import withCharacterButtons from '../components/withCharacterButtons';

/**
 * Admin Character List.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  NEXT
 *
 * @param  {Object} props Component props.
 * @return {ReactElement} Component render JSX.
 */
const AdminCharacterList = ( props ) => {
	const {
		title,
		characters,
		type,
		addFunction,
		editFunction,
		deleteFunction,
	} = props;

	// HOC: Character with Character editing buttons.
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const CharacterWithButtons = withCharacterButtons( Character );

	// HOC: CharacterList with Character editing buttons.
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const CharacterListWithButtons = withCharacterButtons( CharacterList );

	return (
		<CharacterListWithButtons
			title={ title }
			characters={ characters }
			type={ type }
			buttons={ (
				<AddCharacterButton
					addFunction={ addFunction }
					type={ type }
				/>
			) }
			position="after"
		>
			<ul>
				{ characters.map( ( character, index ) => (
					<CharacterWithButtons
						key={ character.key }
						character={ character }
						index={ index }
						buttons={ (
							<EditCharacterButtons
								type={ type }
								character={ character }
								index={ index }
								editFunction={ editFunction }
								deleteFunction={ deleteFunction }
							/>
						) }
						position="after"
					/>
				) ) }
			</ul>
		</CharacterListWithButtons>
	);
};

export default AdminCharacterList;
