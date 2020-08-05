/**
 * Add/Edit Character Modal.
 */

import AddEditCharacterForm from './AddEditCharacterForm';

const {
	components: {
		Button,
		Modal,
	},
	element: {
		useState,
	},
} = wp;

/**
 * Add/Edit Character modal.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  NEXT
 *
 * @param  {Object} props Component props.
 * @return {ReactElement} Component render JSX.
 */
const AddEditCharacterModal = ( props ) => {
	const {
		type,
		buttonText,
		characterFn,
	} = props;

	const [ isOpen, setOpen ] = useState( false );

	/**
	 * Toggle open state.
	 *
	 * @author R A Van Epps <rave@ravanepps.com>
	 * @since  NEXT
	 */
	const toggleOpen = () => {
		setOpen( ! isOpen );
	};

	return (
		<>
			<Button
				isPrimary
				onClick={ toggleOpen }
			>
				{ buttonText }
			</Button>
			{ isOpen && (
				<Modal
					title={ buttonText }
					onRequestClose={ toggleOpen }
				>
					<AddEditCharacterForm
						type={ type }
						toggle={ toggleOpen }
						characterFn={ characterFn }
					/>
				</Modal>
			) }
		</>
	);
};

export default AddEditCharacterModal;
