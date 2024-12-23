import { type ClassicEditor } from 'ckeditor5';
import { EditorFullScreenHandler } from './base.js';

export class ClassicEditorFullScreenHandler extends EditorFullScreenHandler {
	public override readonly editor: ClassicEditor;

	constructor( editor: ClassicEditor ) {
		super();

		this.editor = editor;
	}

	public override enterFullScreen(): void {
		this.moveToFullScreen( this.editor.ui.element as HTMLElement, 'editor' );
	}

	public override afterEnterFullScreen(): void {
		( this.editor as ClassicEditor ).ui.view.stickyPanel.checkIfShouldBeSticky();
	}

	public override exitFullScreen(): void {
		this.revertMoved();
	}

	public override afterExitFullScreen(): void {
		( this.editor as ClassicEditor ).ui.view.stickyPanel.checkIfShouldBeSticky();
	}

	// TODO Dunno how to better organize this method.
	public override getContainer(): HTMLElement {
		if ( !this._container ) {
			const container = super.getContainer();

			container.classList.add( 'ck-full-screen__classic' );

			container.innerHTML = `
				<div class="ck-full-screen__menu-bar" data-full-screen-placeholder="menu-bar"></div>
				<div class="ck-full-screen__editor-wrapper">
					<div class="ck-full-screen__sidebar" data-full-screen-placeholder="sidebar"></div>
					<div class="ck-full-screen__editor "data-full-screen-placeholder="editor"></div>
				</div>
			`;
		}

		return super.getContainer();
	}
}
