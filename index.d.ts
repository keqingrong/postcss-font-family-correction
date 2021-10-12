import { PluginCreator } from 'postcss';

declare namespace plugin {
  type FontFamily = string;
  type FontWeight = number | string;

  interface Options {
    /**
     * `font-family` mappings
     */
    mappings?:
      | {
          fontFamily: FontFamily;
          fontWeight: FontWeight;
        }
      | [FontFamily, FontWeight];
    /**
     * Preserve ignore comments
     */
    preserveComments?: boolean;
    /**
     * Clear `font-family` property
     */
    clearFontFamily?: boolean;
    /**
     * Overwrite `font-weight` property
     */
    overwriteFontWeight?: boolean;
  }

  type Plugin = PluginCreator<Options>;
}

declare const plugin: plugin.Plugin;

export = plugin;
