/**
 * Modules that should be exposed by this container. Property names are used as public paths.
 */
export interface ExposesObject {
  [index: string]: string | ExposesConfig | string[];
}

/**
 * Advanced configuration for modules that should be exposed by this container.
 */
export interface ExposesConfig {
  /**
   * Request to a module that should be exposed by this container.
   */
  import: string | string[];

  /**
   * Custom chunk name for the exposed module.
   */
  name?: string;
}
