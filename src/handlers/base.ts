import { createElement, type Editor } from 'ckeditor5';

export class EditorFullScreenHandler {
	declare public readonly editor: Editor;

	declare public _container: HTMLElement;

	/**
	 * Map of moved elements (moved -> placeholder).
	 *
	 * @private
	 */
	declare private _movedElements: Map<HTMLElement, HTMLElement>;

	constructor() {
		this._movedElements = new Map();
	}

	public moveToFullScreen( elementToMove: HTMLElement, placeholderName: string ): void {
		const placeholder = createElement( document, 'div' );

		elementToMove.replaceWith( placeholder );

		this.getContainer().querySelector( `[data-full-screen-placeholder="${ placeholderName }"]` )!.append( elementToMove );

		this._movedElements.set( elementToMove, placeholder );
	}

	public revertMoved(): void {
		this._movedElements.forEach( ( placeholder, moved ) => {
			placeholder.replaceWith( moved );
			placeholder.remove();
		} );

		this._movedElements.clear();
	}

	public getContainer(): HTMLElement {
		if ( !this._container ) {
			this._container = createElement( document, 'div', {
				class: 'ck ck-reset-all ck-full-screen'
			} );

			// TODO: Wouldn't it be better to use here the body collection?
			document.body.appendChild( this._container );
		}

		return this._container;
	}

	public enterFullScreen(): void {}

	public afterEnterFullScreen(): void {}

	public exitFullScreen(): void {}

	public afterExitFullScreen(): void {}
}
