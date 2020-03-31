/**
* WP dependencies
*/
const {
    i18n: {
        __,
    },
} = wp;

const Save = ( props ) => {
    const {
        attributes: {
            notes,
            players,
            npcs,
        },
        className,
    } = props;
    console.log( 'props', props )

    return (
        <p>
            { __(
                'TTRPG Initiative Helper – hello from the saved content!',
                'rave-rpg-initiative'
            ) }
        </p>
    );
};

export default Save;
