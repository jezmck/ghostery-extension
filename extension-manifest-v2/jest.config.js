/**
 * Jest Config
 *
 * Ghostery Browser Extension
 * https://www.ghostery.com/
 *
 * Copyright 2019 Ghostery, Inc. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0
 */

module.exports = {
	verbose: true,
	setupFiles: [
		'./test/setup.js'
	],
	roots: [
		'<rootDir>/test/',
		'<rootDir>/app/'
	],
	testEnvironment: 'jsdom',
	testEnvironmentOptions: {
		url: 'http://localhost',
	}
};
