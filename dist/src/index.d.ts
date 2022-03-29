export * from './types';
export * from './errors';
export { Client, ClientConfig, KeyDAO } from './client';
import { Client, ClientConfig } from './client';
/**
 * Initialize IRITA SDK
 *
 * @param config IRITA SDK [[ClientConfig]]
 *
 * @returns New IRITA SDK Instance
 */
export declare function newClient(config: ClientConfig): Client;
