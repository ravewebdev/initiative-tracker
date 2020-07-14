/**
 * Display Initiative Tracker on frontend.
 */

/* global initTracker */

import CharacterList from './CharacterList';
import { sortCharacters } from '../util';

const {
	apiFetch,
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
    },
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

	// Handle loading state.
	const [ isLoading, setLoading ] = useState( false );

	// Handle update status messaging.
	const [ notice, setNotice ] = useState( null );

	// Set initial attribute values from props.
	useEffect( () => {
		resetAttributes();
	}, [] );

    // Clear notice after delay if not null.
    useEffect( () => {
        if ( null === notice ) {
            return;
        }

        const timer = setTimeout( () => {
            setNotice( null );
        }, 60000 );

        return () => clearTimeout( timer );
    }, [ notice ] );

	/**
	 * Reset state attributes to original dataAttributes.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  2.0.0
	 */
	const resetAttributes = () => {
		setAttributes( {
			...dataAttributes,
		} );
	}

    /**
     * Helper function to update isEditing status and clear notice.
     *
     * @author R A Van Epps <rave@ravanepps.com>
     * @since  2.0.0
     *
     * @param  {boolean} status New isEditing status.
     */
    const onSetIsEditing = ( status ) => {
        setIsEditing( status );
        setNotice( null );
    };

	// Sort characters: alphabetical if editing, by initiative otherwise.
	const characters = isEditing ? [
		...sortCharacters( players ),
		...sortCharacters( npcs ),
	] : sortCharacters( [
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
     * @author R A Van Epps <rave@ravanepps.com>
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
	            	editCharacter( {
	            		...character,
	            		initiative,
	            	}, character );
	            } }
	            onBlur={ () => {
	            	const initiative = parseInt( character.initiative, 10 );

	            	// Reset initiative to 0 if not a number or less than 0.
	            	if ( isNaN( initiative ) || 0 > initiative ) {
	            		editCharacter( {
		            		...character,
		            		initiative: 0,
		            	}, character );
	            	}
	            } }
	            min="0"
	        />
		);
    };

    /**
     * Display edit/save Character links.
     *
     * @author R A Van Epps <rave@ravanepps.com>
     * @since  2.0.0
     *
     * @return {ReactElement} Character link JSX.
     */
    const displayEditLinks = () => {
    	const path = initTracker.initiative,
    		nonce = initTracker.nonce;

    	if ( null === path || null === nonce ) {
    		return;
    	}

    	const linkClass = `char-link ${ isLoading ? 'disabled' : '' }`;

    	if ( ! isEditing ) {
    		return displayEditLink( linkClass, 'edit', __( 'Edit Initiative', 'initiative-tracker' ), () => onSetIsEditing( true ) );
    	}

    	return (
    		<>
    			{ displayEditLink( linkClass, 'no', __( 'Cancel', 'initiative-tracker' ), () => {
	                resetAttributes();
    				onSetIsEditing( false );
    			} ) }
    			{ displayEditLink( linkClass, 'yes', __( 'Save Initiative', 'initiative-tracker' ), () => saveCharacterUpdates() ) }
    		</>
    	);
    };

    /**
     * Display edit/save link.
     *
     * @author R A Van Epps <rave@ravanepps.com>
     * @since  2.0.0
     *
     * @param  {string}   linkClass Link class(es).
     * @param  {string}   icon      Dashicon icon.
     * @param  {string}   label     Link label text.
     * @param  {function} clickFn   Functionality to call on link click.
     * @return {ReactElement}       Link JSX.
     */
    const displayEditLink = ( linkClass, icon, label, clickFn ) => {
    	return (
    		<a
        		href="#"
                className={ linkClass }
                onClick={ ( event ) => {
                	event.preventDefault();

                	// Stop here if currently in loading state.
                	if ( isLoading ) {
                		return false;
                	}

                	clickFn();
                } }
            >
                <Dashicon icon={ icon } /> { label }
            </a>
    	);
    };

    /**
     * Update block attributes.
     *
     * @author R A Van Epps <rave@ravanepps.com>
     * @since  2.0.0
     *
     * @return {void}
     */
    const saveCharacterUpdates = async () => {
        if ( 'object' !== typeof initTracker || ! initTracker.hasOwnProperty( 'initiative' ) || ! initTracker.hasOwnProperty( 'nonce' ) ) {
            return;
        }

    	const path = initTracker.initiative,
    		nonce = initTracker.nonce;

    	if ( null === path || null === nonce ) {
    		return;
    	}

		setLoading( true );
        setNotice( null );

    	const response = await apiFetch( {
    		path: `${path}/${ dataAttributes.post_id }`,
    		method: 'POST',
    		data: {
    			...attributes,
    		},
    	} )
    		.then( ( success ) => {
    			// Update dataAttributes to reflect changes.
		    	dataAttributes.players = [ ...players ];
		    	dataAttributes.npcs = [ ...npcs ];

                onSetIsEditing( false );

		    	return {
		    		type: 'success',
		    		message: success,
		    	};
    		} )
			.catch( ( error ) => {
				return {
					type: 'error',
					message: error.message,
				};
			} );

		setLoading( false );
        setNotice( response );
    };

	return (
		<div className={ `${ className } ${ isLoading ? 'is-loading' : '' }` }>
            <div className="characters">
				<CharacterList
		            title={ __( 'Characters', 'initiative-tracker' ) }
		            characters={ characters }
		            editCharacter={ displayEditForm }
		            activeIndex={ activeIndex }
		        >
		        	<div className="fe-edit-character-buttons">
		        		{ displayEditLinks() }
		        		{ null !== notice && (
		        			<span className={ `notice ${ notice.type }` } role={ 'error' === notice.type ? 'alert' : 'status' }>
		        				{ notice.message }
		        			</span>
		        		) }
		        	</div>
		        </CharacterList>

		        <button
		        	type="button"
		        	className="next-character"
		        	onClick={ () => {
		        		const newIndex = activeIndex + 1;

		        		setActiveIndex( newIndex >= characters.length ? 0 : newIndex );
		        	} }
					disabled={ isLoading }
		        >
					&raquo; { __( 'Next Character', 'initiative-tracker' ) }
				</button>
            </div>
        </div>
	);
};

export default FrontendTracker;
