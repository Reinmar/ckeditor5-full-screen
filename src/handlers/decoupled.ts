import { type DecoupledEditor } from 'ckeditor5';
import { EditorFullScreenHandler } from './base.js';

export class DecoupledEditorFullScreenHandler extends EditorFullScreenHandler {
	public override readonly editor: DecoupledEditor;

	constructor( editor: DecoupledEditor ) {
		super();

		this.editor = editor;
	}

	public override enterFullScreen(): void {
		this.moveToFullScreen( this.editor.ui.getEditableElement()!, 'editor' );
		this.moveToFullScreen( this.editor.ui.view.toolbar.element!, 'toolbar' );

		if ( this.editor.ui.view.menuBarView ) {
			this.moveToFullScreen( this.editor.ui.view.menuBarView.element!, 'menu-bar' );
		}
	}

	public override afterEnterFullScreen(): void {
	}

	public override exitFullScreen(): void {
		this.revertMoved();
	}

	public override afterExitFullScreen(): void {
	}

	public override getContainer(): HTMLElement {
		if ( !this._container ) {
			const container = super.getContainer();

			container.classList.add( 'ck-full-screen__decoupled' );

			container.innerHTML = `
				<div class="ck-full-screen__menu-bar" data-full-screen-placeholder="menu-bar"></div>
				<div class="ck-full-screen__toolbar" data-full-screen-placeholder="toolbar"></div>
				<div class="ck-full-screen__editor-wrapper">
					<div class="ck-full-screen__sidebar" data-full-screen-placeholder="sidebar"></div>
					<div class="ck-full-screen__editor "data-full-screen-placeholder="editor"></div>
				</div>
			`;
		}

		return super.getContainer();
	}
}
