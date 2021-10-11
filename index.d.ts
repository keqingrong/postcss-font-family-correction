import { PluginCreator } from 'postcss';

declare namespace plugin {
  type FontFamily = string;
  type FontWeight = number | string;

  interface Options {
    /**
     * font-family mappings
     */
    mappings?:
      | {
          fontFamily: FontFamily;
          fontWeight: FontWeight;
        }
      | [FontFamily, FontWeight];
  }

  type Plugin = PluginCreator<Options>;
}

declare const plugin: plugin.Plugin;

export = plugin;
