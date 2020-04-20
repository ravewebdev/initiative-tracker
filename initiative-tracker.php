<?php
/**
 * Plugin Name:     Initiative Tracker
 * Description:     A block plugin for tracking character initiative scores in Table-Top Role-Playing Games.
 * Version:         1.0.1
 * Author:          R A Van Epps
 * Author URI:      https://ravanepps.com
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     initiative-tracker
 *
 * @package Rave\InitiativeTracker
 * @since 0.0.1
 */

namespace Rave\InitiativeTracker;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Register the block with WordPress.
 *
 * @author Rave
 * @since 0.1.0
 */
function register_block() {

	// Define our assets.
	$editor_script   = 'build/index.js';
	$editor_style    = 'build/editor.css';
	$frontend_style  = 'build/style.css';
	$frontend_script = 'build/frontend.js';

	// Verify we have an editor script.
	if ( ! file_exists( plugin_dir_path( __FILE__ ) . $editor_script ) ) {
		wp_die( esc_html__( 'Whoops! You need to run `npm run build` for the Initiative Tracker Plugin first.', 'initiative-tracker' ) );
	}

	// Autoload dependencies and version.
	$asset_file = require plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	// Register editor script.
	wp_register_script(
		'initiative-tracker-editor-script',
		plugins_url( $editor_script, __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	// Register editor style.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $editor_style ) ) {
		wp_register_style(
			'initiative-tracker-editor-style',
			plugins_url( $editor_style, __FILE__ ),
			[ 'wp-edit-blocks' ],
			filemtime( plugin_dir_path( __FILE__ ) . $editor_style )
		);
	}

	// Register frontend style.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $frontend_style ) ) {
		wp_register_style(
			'initiative-tracker-style',
			plugins_url( $frontend_style, __FILE__ ),
			[],
			filemtime( plugin_dir_path( __FILE__ ) . $frontend_style )
		);
	}

	// Register block with WordPress.
	register_block_type( 'rave/initiative-tracker', array(
		'editor_script'   => 'initiative-tracker-editor-script',
		'editor_style'    => 'initiative-tracker-editor-style',
		'style'           => 'initiative-tracker-style',
		'render_callback' => __NAMESPACE__ . '\render_block',
	) );

	// Register frontend script.
	if ( ! is_admin() && file_exists( plugin_dir_path( __FILE__ ) . $frontend_script ) ) {
		wp_enqueue_script(
			'initiative-tracker-frontend-script',
			plugins_url( $frontend_script, __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
	}
}
add_action( 'init', __NAMESPACE__ . '\register_block' );

/**
 * Render initiative tracker block on frontend.
 *
 * @author R A Van Epps <rave@ravanepps.com>
 * @since  1.0.0
 *
 * @param  array $attributes Block attributes.
 * @return string            Block HTML to render.
 */
function render_block( array $attributes ) : string {
	$players    = $attributes['players'] ?? [];
	$npcs       = $attributes['npcs'] ?? [];
	$notes      = $attributes['notes'] ?? '';
	$class      = 'wp-block-rave-initiative-tracker';
	$characters = array_merge( $players, $npcs );

	usort( $characters, function( $char1, $char2 ) {
		$compare  = strnatcmp( $char1['initiative'], $char2['initiative'] );
		$compare *= -1; // Invert order.

		if ( 0 !== $compare ) {
			return $compare;
		}

		return strnatcmp( $char1['name'], $char2['name'] );
	} );

	ob_start();
	?>

	<div class="<?php echo esc_attr( $class ); ?>">
		<h2><?php esc_html_e( 'Combat Notes', 'initiative-tracker' ); ?></h2>
		<div class="notes">
			<?php echo wp_kses_post( $notes ); ?>
		</div>
		<?php if ( count( $characters ) > 0 ) : ?>
			<div class="characters">
				<div class="character-list">
					<h2><?php esc_html_e( 'Characters', 'initiative-tracker' ); ?></h2>
					<ul>
						<?php
						array_map( function( $character, $index ) {
							$name       = $character['name'] ?? '';
							$player     = $character['player'] ?? '';
							$player     = '' === $player ? 'NPC' : $player;
							$initiative = $character['initiative'] ?? '';
							?>
							<li class="character <?php echo esc_attr( 0 === $index ? 'current' : '' ); ?>">
								<span class="name"><?php echo esc_html( $name ); ?></span>
								<span class="player"><?php echo esc_html( "( {$player} )" ); ?></span>
								<span class="initiative"><?php echo esc_html( " - {$initiative}" ); ?></span>
							</li>
							<?php
						}, $characters, array_keys( $characters ) );
						?>
					</ul>
					<button type="button" class="next-character">
						<?php esc_html_e( '&raquo; Next Character', 'initiative-tracker' ); ?>
					</button>
				</div>
			</div>
		<?php endif; ?>
	</div>

	<?php
	return ob_get_clean();
}
