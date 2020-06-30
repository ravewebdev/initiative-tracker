/**
 * Display Initiative Tracker on frontend.
 */

/* global initTracker */

import CharacterList from './CharacterList';
import { sortCharacters } from '../util';

const {
	i18n: {
        __,
    },
    components: {
        Dashicon,
        TextControl,
    },
    element: {
    	useEffect,
    	useState,
    }
} = wp;

/**
 * Frontend Initiative Tracker.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 *
 * @param  {Object} props Component props.
 * @return {ReactElement} Component render JSX.
 */
const FrontendTracker = ( props ) => {
	const {
		dataAttributes,
		className,
	} = props;

	// Block attributes.
	const [ attributes, setAttributes ] = useState( {
		block_id: 0,
		players: [],
		npcs: [],
	} );

	const {
		players,
		npcs,
	} = attributes;

	// Currently active character by index.
	const [ activeIndex, setActiveIndex ] = useState( 0 );

	// Whether actively editing initiative.
	const [ isEditing, setIsEditing ] = useState( false );

	// Whether actively editing a character.
	const [ active, setActive ] = useState( false );

	// Set initial attribute values from props.
	useEffect( () => {
		setAttributes( {
			...dataAttributes,
		} );
	}, [] );

	const characters = sortCharacters( [
        ...players,
        ...npcs,
    ], false );

	/**
     * Edit character attributes on frontend.
     *
     * @author R A Van Epps <rave@ravanepps.com>
     * @since  2.0.0
     *
     * @param  {Object} newCharacter Modified character object.
     * @param  {Object} character    Original character object.
     */
    const editCharacter = ( newCharacter, character ) => {
    	const type = 0 === character.player.trim().length ? 'npcs' : 'players',
    		newCharacters = [ ...attributes[ type ] ],
    		index = newCharacters.indexOf( character );
    	
    	newCharacters[ index ] = newCharacter;

        setAttributes( {
        	...attributes,
            [ type ]: newCharacters,
        } );
    }

    /**
     * Display input to edit Initiative.
     *
     * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
     * @since  2.0.0
     *
     * @param  {Object} character Character object.
     * @return {?ReactElement}    Text input JSX.
     */
    const displayEditForm = ( character ) => {
    	if ( ! isEditing ) {
    		return null;
    	}

    	return (
	    	<TextControl
				className="initiative"
	            type="number"
	            value={ character.initiative }
	            onChange={ ( initiative ) => {
	            	console.log( 'initiative', initiative );
	            	/*editCharacter( {
	            		...props.character,
	            		initiative,
	            	}, props.character );*/
	            } }
	        />
		);
    };

    /**
     * Display edit/save Character link.
     *
     * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
     * @since  2.0.0
     *
     * @return {ReactElement} Edit/save Character link.
     */
    const displayEditLink = () => {
    	const icon = isEditing ? 'yes' : 'edit',
    		label = isEditing ? __( 'Save Initiative', 'initiative-tracker' ) : __( 'Edit Initiative', 'initiative-tracker' );

    	return (
    		<a
        		href=""
                className="fe-edit-character"
                onClick={ ( event ) => {
                	event.preventDefault();
                	setIsEditing( ! isEditing );
                } }
            >
                <Dashicon icon={ icon } /> { label }
            </a>
    	);
    };

	return (
		<div className={ className }>
            <div className="characters">
				<CharacterList
		            title={ __( 'Characters', 'initiative-tracker' ) }
		            characters={ characters }
		            editCharacter={ displayEditForm }
		            setActive={ setActive }
		            active={ active }
		            activeIndex={ activeIndex }
		        >
		        	{ displayEditLink() }
		        </CharacterList>

		        <button
		        	type="button"
		        	className="next-character"
		        	onClick={ () => {
		        		const newIndex = activeIndex + 1;

		        		setActiveIndex( newIndex >= characters.length ? 0 : newIndex );
		        	} }
		        >
					&raquo; { __( 'Next Character', 'initiative-tracker' ) }
				</button>
            </div>
        </div>
	);
};

export default FrontendTracker;
