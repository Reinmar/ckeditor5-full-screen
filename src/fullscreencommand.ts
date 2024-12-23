import { type Editor, Command, ClassicEditor, DecoupledEditor } from 'ckeditor5';
import { EditorFullScreenHandler } from './handlers/base.js';
import { ClassicEditorFullScreenHandler } from './handlers/classic.js';
import { DecoupledEditorFullScreenHandler } from './handlers/decoupled.js';

export default class FullScreenCommand extends Command {
	/**
	 * @observable
	 * @readonly
	*/
	public override value = false;

	declare private _container: HTMLElement;
	private _editorHandler: EditorFullScreenHandler;

	public constructor( editor: Editor ) {
		super( editor );

		if ( editor instanceof ClassicEditor ) {
			this._editorHandler = new ClassicEditorFullScreenHandler( editor );
		} else if ( editor instanceof DecoupledEditor ) {
			this._editorHandler = new DecoupledEditorFullScreenHandler( editor );
		} else {
			this._editorHandler = new EditorFullScreenHandler();
		}
	}

	public override execute(): void {
		if ( this.value ) {
			this._exitFullScreen();
		} else {
			this._enterFullScreen();
		}
	}

	private _enterFullScreen(): void {
		document.body.classList.add( 'ck-body_full-screen__on' );

		this._editorHandler.enterFullScreen();

		this.value = true;

		this._editorHandler.afterEnterFullScreen();
	}

	private _exitFullScreen(): void {
		document.body.classList.remove( 'ck-body_full-screen__on' );

		this._editorHandler.exitFullScreen();

		this.value = false;

		this._editorHandler.afterExitFullScreen();
	}
}
