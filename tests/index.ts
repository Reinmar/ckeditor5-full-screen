import { describe, expect, it } from 'vitest';
import { FullScreen as FullScreenDll, icons } from '../src/index.js';
import FullScreen from '../src/fullscreen.js';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 FullScreen DLL', () => {
	it( 'exports FullScreen', () => {
		expect( FullScreenDll ).to.equal( FullScreen );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
