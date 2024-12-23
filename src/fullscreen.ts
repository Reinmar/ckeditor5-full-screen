import { Plugin, ButtonView, ClassicEditor, DecoupledEditor } from 'ckeditor5';

import ckeditor5Icon from '../theme/icons/ckeditor.svg';
import FullScreenCommand from './fullscreencommand.js';

import '../theme/fullscreen.css';

export default class FullScreen extends Plugin {
	public static get pluginName() {
		return 'FullScreen' as const;
	}

	public init(): void {
		const editor = this.editor;
		const t = editor.t;
		const fullsScreenCommand = new FullScreenCommand( editor );

		if (
			!( editor instanceof ClassicEditor ) &&
			!( editor instanceof DecoupledEditor )
		) {
			throw new Error( 'The FullScreen plugin is compatible only with the ClassicEditor and Decoupled editors.' );
		}

		editor.commands.add( 'fullScreen', fullsScreenCommand );

		editor.ui.componentFactory.add( 'fullScreen', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'Full screen' ),
				icon: ckeditor5Icon,
				tooltip: true,
				isToggleable: true
			} );

			view.bind( 'isEnabled' ).to( fullsScreenCommand, 'isEnabled' );
			view.bind( 'isOn' ).to( fullsScreenCommand, 'value' );

			this.listenTo( view, 'execute', () => {
				editor.execute( 'fullScreen' );
				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}
