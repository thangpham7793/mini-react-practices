const ONE_MINUTE = 60000;

type SaveProps = { key: string; value: any; expireIn?: number };
type GetProps = { key: string };
type Item = { value: any; expireIn: number; savedAt: number };

class Cache {
  private static instance: Cache;
  private constructor() {}
  static getInstance = () => {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  };

  private dataStore = new Map<string, Item | any>();

  save({ key, value, expireIn = 5 }: SaveProps) {
    this.dataStore.set(key, {
      value,
      savedAt: Date.now(),
      expireIn: expireIn * ONE_MINUTE,
    });
  }

  private hasExpired(key: string) {
    const { savedAt, expireIn } = this.dataStore.get(key) as Item;
    return savedAt + expireIn < Date.now();
  }

  get({ key }: GetProps) {
    if (!this.dataStore.get(key) || this.hasExpired(key)) return null;
    return this.dataStore.get(key).value;
  }
}

export default Cache.getInstance();
