export type IScriptCallback = (
  args: string[],
  basePath: string,
) => Promise<any>;

export interface IScripts {
  [scriptName: string]: IScriptCallback;
}
