import { Command, createElement } from 'ckeditor5';

export default class FullScreenCommand extends Command {
	/**
	 * @observable
	 * @readonly
	*/
	declare public value: boolean;

	declare private _container: HTMLElement;
	declare private _placeholder: HTMLElement;

	public override execute(): void {
		if ( this.value ) {
			this._exitFullScreen();
		} else {
			this._enterFullScreen();
		}
	}

	private _enterFullScreen(): void {
		const editor = this.editor;

		document.body.classList.add( 'ck-body_full-screen__on' );

		const placeholder = createElement( document, 'div' );
		const elementToReplace = editor.ui.element as HTMLElement;

		elementToReplace.parentNode!.insertBefore( placeholder, elementToReplace.nextSibling );

		const fullScreenContainer = this._getContainer();
		fullScreenContainer.append( elementToReplace );

		this._placeholder = placeholder;
		this.value = true;
	}

	private _exitFullScreen(): void {
		const editor = this.editor;

		document.body.classList.remove( 'ck-body_full-screen__on' );

		this._placeholder.replaceWith( editor.ui.element as HTMLElement );

		this.value = false;
	}

	private _getContainer(): HTMLElement {
		if ( !this._container ) {
			this._container = createElement( document, 'div', {
				class: 'ck ck-reset-all ck-editor_full-screen'
			} );

			// TODO: Wouldn't it be better to use here the body collection?
			document.body.appendChild( this._container );
		}

		return this._container;
	}
}
