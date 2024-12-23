import type { FullScreen } from './index.js';

declare module '@ckeditor/ckeditor5-core' {
	interface PluginsMap {
		[ FullScreen.pluginName ]: FullScreen;
	}
}
