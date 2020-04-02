<?php
/**
 * Plugin Name:     TTRPG Initiative Helper
 * Description:     This block helps track and organize player initiative scores.
 * Version:         0.1.0
 * Author:          R A Van Epps
 * Author URI:      https://ravanepps.com
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     rpg-initiative
 *
 * @package Rave\RpgInitiative
 */

namespace Rave\RpgInitiative;

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
		wp_die( esc_html__( 'Whoops! You need to run `npm run build` for the Rave Rpg Initiative Plugin first.', 'rpg-initiative' ) );
	}

	// Autoload dependencies and version.
	$asset_file = require plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	// Register editor script.
	wp_register_script(
		'rpg-initiative-editor-script',
		plugins_url( $editor_script, __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	// Register editor style.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $editor_style ) ) {
		wp_register_style(
			'rpg-initiative-editor-style',
			plugins_url( $editor_style, __FILE__ ),
			[ 'wp-edit-blocks' ],
			filemtime( plugin_dir_path( __FILE__ ) . $editor_style )
		);
	}

	// Register frontend style.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $frontend_style ) ) {
		wp_register_style(
			'rpg-initiative-style',
			plugins_url( $frontend_style, __FILE__ ),
			[],
			filemtime( plugin_dir_path( __FILE__ ) . $frontend_style )
		);
	}

	// Register block with WordPress.
	register_block_type( 'rave/rpg-initiative-tracker', array(
		'editor_script'   => 'rpg-initiative-editor-script',
		'editor_style'    => 'rpg-initiative-editor-style',
		'style'           => 'rpg-initiative-style',
		'render_callback' => __NAMESPACE__ . '\render_block',
	) );

	// Register frontend script.
	if ( ! is_admin() && file_exists( plugin_dir_path( __FILE__ ) . $frontend_script ) ) {
		wp_enqueue_script(
			'rpg-initiative-frontend-script',
			plugins_url( $frontend_script, __FILE__ ),
			array_merge( [
				'wp-i18n',
				'components',
			], $asset_file['dependencies'] ),
			$asset_file['version'],
			true
		);
	}
}
add_action( 'init', __NAMESPACE__ . '\register_block' );

/**
 * Render initiative tracker block on frontend.
 *
 * @author Rebekah Van Epps <rebekah.vanepps@webdevstudios.com>
 * @since  2020-04-02
 *
 * @param  array $attributes Block attributes.
 * @return string            Block HTML to render.
 */
function render_block( array $attributes ) : string {
	$players    = $attributes['players'] ?? [];
	$npcs       = $attributes['npcs'] ?? [];
	$notes      = $attributes['notes'] ?? '';
	$class      = $attributes['className'] ?? '';
	$characters = array_merge( $players, $npcs );
usort( $characters, function( $char1, $char2 ) {
		$compare = strnatcmp( $char1['initiative'], $char2['initiative'] );
		$compare *= -1; // Invert order.

		if ( 0 !== $compare ) {
			return $compare;
		}

		return strnatcmp( $char1['name'], $char2['name'] );
	} );

	ob_start();
	?>

	<div class="<?php echo esc_attr( $class ); ?>">
		<h2><?php esc_html_e( 'Combat Notes', 'rave-rpg-initiative' ); ?></h2>
		<div class="notes">
			<?php echo wp_kses_post( $notes ); ?>
		</div>
		<?php if ( sizeof( $characters ) > 0 ) : ?>
			<div class="characters">
				<div class="character-list">
					<h2><?php esc_html_e( 'Characters', 'rave-rpg-initiative' ); ?></h2>
					<ul>
						<?php
						array_map( function( $character ) {
							$name       = $character['name'] ?? '';
							$player     = $character['player'] ?? '';
							$player     = '' === $player ? 'NPC' : $player;
							$initiative = $character['initiative'] ?? '';
							?>
							<li>
								<span class="name"><?php echo esc_html__( $name ); ?></span>
								<span class="player"><?php echo esc_html__( "( {$player} )" ); ?></span>
								<span class="initiative"><?php echo esc_html__( " - {$initiative}" ); ?></span>
							</li>
							<?php
						}, $characters );
						?>
					</ul>
				</div>
			</div>
		<?php endif; ?>
	</div>

	<?php
	return ob_get_clean();
}
