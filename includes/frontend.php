<?php
/**
 * Render block contents on frontend.
 *
 * @package Rave\InitiativeTracker
 * @author  R A Van Epps <rave@ravanepps.com>
 * @since   2.0.0
 */

namespace Rave\InitiativeTracker;

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
	$id         = $attributes['id'];
	$players    = $attributes['players'] ?? [];
	$npcs       = $attributes['npcs'] ?? [];
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

	<div
		class="<?php echo esc_attr( $class ); ?>"
		data-id="<?php echo esc_attr( $id ); ?>"
		data-players="<?php echo esc_attr( wp_json_encode( $players ) ); ?>"
		data-npcs="<?php echo esc_attr( wp_json_encode( $npcs ) ); ?>"
	>
		<?php if ( count( $characters ) > 0 ) : ?>
			<div class="characters">
				<div class="character-list">
					<h2><?php esc_html_e( 'Characters', 'initiative-tracker' ); ?></h2>
					<ul>
						<?php
						array_map( function( $character, $index ) {
							$name       = $character['name'] ?? '';
							$player     = $character['player'] ?? '';
							$initiative = $character['initiative'] ?: 0;
							?>
							<li class="character <?php echo esc_attr( 0 === $index ? 'current' : '' ); ?>">
								<span class="name"><?php echo esc_html( $name ); ?></span>
								<?php if ( ! empty( $player ) ) : ?>
									<span class="player"><?php echo esc_html( "( {$player} )" ); ?></span>
								<?php endif; ?>
								<span class="initiative"><?php echo esc_html( " &mdash; {$initiative}" ); ?></span>
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
