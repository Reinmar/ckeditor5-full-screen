import { Plugin, ButtonView, ClassicEditor } from 'ckeditor5';

import ckeditor5Icon from '../theme/icons/ckeditor.svg';
import FullScreenCommand from './fullscreencommand.js';

export default class FullScreen extends Plugin {
	public static get pluginName() {
		return 'FullScreen' as const;
	}

	public init(): void {
		const editor = this.editor;
		const t = editor.t;
		const fullsScreenCommand = new FullScreenCommand( editor );

		if ( !( editor instanceof ClassicEditor ) ) {
			throw new Error( 'The FullScreen plugin is compatible only with the ClassicEditor editor.' );
		}

		editor.commands.add( 'fullScreen', fullsScreenCommand );

		editor.ui.componentFactory.add( 'fullScreen', locale => {
			const view = new ButtonView( locale );

			view.bind( 'isEnabled' ).to( fullsScreenCommand, 'isEnabled' );
			view.bind( 'isOn' ).to( fullsScreenCommand, 'value' );

			view.set( {
				label: t( 'Full screen' ),
				icon: ckeditor5Icon,
				tooltip: true,
				isToggleable: true
			} );

			this.listenTo( view, 'execute', () => {
				editor.execute( 'fullScreen' );
				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}
