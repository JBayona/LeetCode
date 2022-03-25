public class RetainBestCache<K, V extends Rankable> {
  // Add any fields you need here
 
  /**
   * Constructor with a data source (assumed to be slow) and a cache size
   * @param ds the persistent layer of the the cache
   * @param capacity the number of entries that the cache can hold
   */
  public RetainBestCache(DataSource<K, V> ds, int capacity) {
    // Implementation here
    this.heap = new Array(capacity);
    this.map = new Map();
    this.ds = ds;
  }
 
  /**
   * Gets some data. If possible, retrieves it from cache to be fast. If the data is not cached,
   * retrieves it from the data source and, if possible, cache it. If the cache is full, attempt
   to cache the returned data,
   * evicting the V with lowest rank among the ones that it has available
   * If there is a tie, the cache may choose any V with lowest rank to evict.
   * @param key the key of the cache entry being queried
   * @return the Rankable value of the cache entry
   */
  public V get(K key) {
    // Implementation here
    if(!this.map.has(key)) {
      // Hit the DB
      let val = this.ds.get(key);
      if(this.heap.size  === capacity) {
        const {..val, key} = this.heap.pop();
        this.map.remove(key);
      }
      this.heap.push({val, key});
      this.hash.put(key, val);
    }
  }
}
 
/*
 * For reference, here are the Rankable and DataSource interfaces.
 * You do not need to implement them, and should not make assumptions
 * about their implementations.
 */
 
public interface Rankable {
  /**
   * Returns the Rank of this object, using some algorithm and potentially
   * the internal state of the Rankable.
   */
  long getRank();
}
 
public interface DataSource<K, V extends Rankable> {
  V get (K key);
}