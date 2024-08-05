'use strict';
/**
 * External dependencies
 */
const { v2: dockerCompose } = require( 'docker-compose' );

/**
 * Internal dependencies
 */
const initConfig = require( '../init-config' );

/**
 * Stops the development server.
 *
 * @param {Object}  options
 * @param {Object}  options.spinner A CLI spinner which indicates progress.
 * @param {boolean} options.debug   True if debug mode is enabled.
 */
module.exports = async function stop( { spinner, debug } ) {
	const { additionalDockerConfigs, dockerComposeConfigPath } =
		await initConfig( {
			spinner,
			debug,
		} );

	for ( const additionalConfig of additionalDockerConfigs ) {
		spinner.text = `Stopping additional config: (${ additionalConfig })...`;
		await dockerCompose.down( {
			config: additionalConfig,
			log: debug,
		} );
		spinner.text = `Stopped additional config: (${ additionalConfig }).`;
	}

	spinner.text = 'Stopping WordPress.';

	await dockerCompose.down( {
		config: dockerComposeConfigPath,
		log: debug,
	} );

	spinner.text = 'Stopped WordPress.';
};
