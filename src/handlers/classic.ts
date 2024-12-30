import { type ClassicEditor } from 'ckeditor5';
import { type DocumentOutlineUI } from 'ckeditor5-premium-features';
import { EditorFullScreenHandler } from './base.js';

export class ClassicEditorFullScreenHandler extends EditorFullScreenHandler {
	public override readonly editor: ClassicEditor;

	constructor( editor: ClassicEditor ) {
		super();

		this.editor = editor;
	}

	public override enterFullScreen(): void {
		this.moveToFullScreen( this.editor.ui.element as HTMLElement, 'editor' );

		if ( this.editor.plugins.has( 'DocumentOutlineUI' ) ) {
			const docOutlineElement = ( this.editor.plugins.get( 'DocumentOutlineUI' ) as DocumentOutlineUI ).view.element as HTMLElement;
			this.moveToFullScreen( docOutlineElement, 'left-sidebar' );

			// TODO I use this class to show/hide the sidebar. The same can be achieved by making the
			// template in `getContainer()` smarter.
			this.getContainer().classList.add( 'ck-full-screen__with-left-sidebar' );
		}

		if ( this.editor.plugins.has( 'Sidebar' ) ) {
			// TODO This works, but it'd feel better if I could extract this container from the Editor API.
			// Also: It'd be best if this was the `.ck-sidebar` element, not the outer container
			// (which isn't actually "our" as it's created by the integrator).
			const rightSidebarContainer = this.editor.config.get( 'sidebar.container' )?.querySelector( '.ck-sidebar' ) as HTMLElement;

			if ( rightSidebarContainer ) {
				this.moveToFullScreen( rightSidebarContainer, 'right-sidebar' );

				// TODO I use this class to show/hide the sidebar. The same can be achieved by making the
				// template in `getContainer()` smarter.
				this.getContainer().classList.add( 'ck-full-screen__with-right-sidebar' );
			}
		}
	}

	public override afterEnterFullScreen(): void {
		// TODO This helps, but not in all cases.
		( this.editor as ClassicEditor ).ui.view.stickyPanel.checkIfShouldBeSticky();
	}

	public override exitFullScreen(): void {
		this.revertMoved();
	}

	public override afterExitFullScreen(): void {
		// TODO This helps, but not in all cases.
		( this.editor as ClassicEditor ).ui.view.stickyPanel.checkIfShouldBeSticky();
	}

	// TODO Dunno how to better organize this method.
	public override getContainer(): HTMLElement {
		if ( !this._container ) {
			const container = super.getContainer();

			container.classList.add( 'ck-full-screen__classic' );

			container.innerHTML = `
				<div class="ck ck-full-screen__main-container">
					<div class="ck ck-full-screen__menu-bar" data-full-screen-placeholder="menu-bar"></div>
					<div class="ck ck-full-screen__editor-wrapper">
						<div class="ck ck-full-screen__left-sidebar" data-full-screen-placeholder="left-sidebar"></div>
						<div class="ck ck-full-screen__editor "data-full-screen-placeholder="editor"></div>
						<div class="ck ck-full-screen__right-sidebar" data-full-screen-placeholder="right-sidebar"></div>
					</div>
				</div>
			`;
		}

		return super.getContainer();
	}
}
