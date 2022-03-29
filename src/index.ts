export * from './types';
export * from './errors';
export { Client, ClientConfig, KeyDAO } from './client';
import {
  Client,
  ClientConfig,
  DefaultClientConfig,
} from './client';

/**
 * Initialize IRITA SDK
 *
 * @param config IRITA SDK [[ClientConfig]]
 *
 * @returns New IRITA SDK Instance
 */
export function newClient(config: ClientConfig): Client {
  const copyConfig = new DefaultClientConfig();
  Object.assign(copyConfig, config);
  return new Client(copyConfig);
}
