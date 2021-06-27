import styles from '../styles/Home.module.css';

export default function Home() {
  async function search() {
    const response = await fetch('/api/yelp');
    if (response.ok) {
      const json = await response.json();
      console.log(json);
    }
  }

  return (
    <div className={styles.home}>
      <button onClick={search}>Search</button>
    </div>
  );
}
