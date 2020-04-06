/**
 * WP dependencies
 */
const {
    i18n: {
        __,
    },
    element: {
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
					title={ __( 'Delete Character: ', 'initiative-tracker' ) + name }
					onRequestClose={ toggle }
				>
					<p> { __( 'Are you sure you want to delete this character?' ) } </p>
					<div className="edit-character-buttons">
						<Button
							className="is-button"
		                    isSecondary
		                    onClick={ toggle }
		                >
		                    { __( 'Cancel', 'initiative-tracker' ) }
		                </Button>
		                <Button
		                    className="button-link-delete"
		                    isDestructive
		                    onClick={ () => {
		                        deleteCharacter( type, index );
		                        toggle();
		                    } }
		                >
		                    { __( 'Delete Character', 'initiative-tracker' ) }
		                </Button>
	                </div>
				</Modal>
			) }
		</>
	);
}

export default DeleteCharacterModal;
