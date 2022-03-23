# irita-sdk-js

## Prerequisites
### 1. Known issue on Node 17
> for node version 17, need to do `export NODE_OPTIONS=--openssl-legacy-provider` to fix `error:03000086:digital envelope routines::initialization error`

### 2. Installation
```
npm i --save tw-bc-group/irita-sdk-js
```
### 3. KeyDAO Implementation
The SDK requires you to create your own key DAO implementation. The following example is a simple in-memory implementation:
```
import { Key, KeyDAO } from "@irita/irita-sdk";

export class CacheKeyDAOImpl implements KeyDAO {
  private map: {[key: string]: object};

  constructor() {
    this.map = {};
  }
  write(name: string, key: Key): void {
    this.map[name] = key;
  }
  read(name: string): Key {
    return this.map[name];
  }
  delete(name: string): void {
    delete this.map[name];
  }
}

```
### 4. Configuration
This should make you able to connect to the test network of wenchang chain.
```
import { newClient, CLIENT } from "@irita/irita-sdk";
const config = {
  node: "http://47.100.192.234:26657",
  chainId: "testing",
  keyDAO: new KeyDAOImpl(),
};
const client: Client = newClient(config);
const key = client.keys.recover('tester', password, "opera vivid pride shallow brick crew found resist decade neck expect apple chalk belt sick author know try tank detail tree impact hand best", PubkeyType.sm2);
```
For other configurations please refer to `ClientConfig`


## Keys management
### 1. Create new mnemonic
```
import { PubkeyType } from "@irita/irita-sdk";
const key = client.keys.add(name, password, PubkeyType.sm2);
console.log(key.address, key.mnemonic);
```
### 2. recover private key
#### 2.1 Recover fro mnemonic
```
import { PubkeyType } from "@irita/irita-sdk";
const key = client.keys.recover(name, password, mnemonic, PubkeyType.sm2);
```

## NFT management
### 1. Issue a denom
```
const denomId = `denomid${Math.floor(Math.random() * 1000000)}`;
const denomName = `Denom name ${Math.floor(Math.random() * 10000000)}`;
const schema = "no schema";
client.nft.issueDenom(denomId, denomName, schema, tx);
```
### 2. Mint a NFT
```
const tx = {
    from: "tester",
    password: "your password for the key",
    pubkeyType: PubkeyType.sm2,
    fee: {
      denom: "ugas",
      amount: "200000",
    },
  };
const nftId = `nftid${Math.floor(Math.random() * 1000000)}`;
const nftName = `NFT name ${Math.floor(Math.random() * 10000000)}`;
client.nft.mintNft(nftId, denomId, nftName, uri, data, receipient, tx);
```
### 3. Edit a NFT
```
const newProperty: {name?: string, uri?: string, data?: string} = {};
client.nft.editNft(denomId, nftId, newProperty, tx);
```
### 4. Transfer a NFT
```
const newProperty: {name?: string, uri?: string, data?: string} = {};
const key2 = client.keys.add("tester2", password, PubkeyType.sm2);
client.nft.transferNft(nftId, denomId, client.keys.show("tester2"), newProperty, tx);
```
### 5. Burn a NFT
```
client.nft.burnNft(nftId, denomId, tx);
```
### 6. Query all denoms
```
client.nft.queryDenoms();
```
### 7. Query a denom
```
client.nft.queryDenom(denomId);
```
### 8. Query collection under denom
```
client.nft.queryCollection(denomId);
```
### 9. Query by owner
```
client.nft.queryOwner(client.keys.show("tester"));
```
### 10. Query a NFT
```
client.nft.queryNFT(denomId, nftId);
```
### 11. Query supply
```
client.nft.querySupply(denomId, owner);
```
