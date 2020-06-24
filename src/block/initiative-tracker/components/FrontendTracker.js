/**
 * Display Initiative Tracker on frontend.
 */
const {
	i18n: {
        __,
    },
    element: {
    	useState,
    	useEffect,
    }
} = wp;

import CharacterList from './CharacterList';

const FrontendTracker = ( props ) => {
	const {
		dataAttributes,
		className,
	} = props;

	const [ attributes, setAttributes ] = useState( {
		players: [],
		npcs: [],
	} );

	const [ activeIndex, setActiveIndex ] = useState( 0 );

	const {
		players,
		npcs,
	} = attributes;

	const characters = [
        ...players,
        ...npcs,
    ];

	// Set initial attribute values from props.
	useEffect( () => {
		setAttributes( {
			...dataAttributes,
		} );
	}, [] );

	return (
		<div className={ className }>
            <div className="characters">
				<CharacterList
		            title={ __( 'Characters', 'initiative-tracker' ) }
		            characters={ characters }
		            active={ false }
		            activeIndex={ activeIndex }
		        />
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
