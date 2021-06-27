import styles from './Business.module.css';

export default function Business(props) {
  const { image_url, name, location, rating, review_count, categories } = props.business;
  const { address1, city, state, zip_code } = location;

  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <img src={image_url} alt=""/>
      </div>
      <div className={styles.summary}>
        <h2 className={styles.title}>{name}</h2>
        <div className={styles.info}>
          <div>
            <p>{address1}</p>
            <p>{city}</p>
            <p>{state} {zip_code}</p>
          </div>
          <div className={styles.rating}>
            <p>{categories[0].title}</p>
            <p>{rating} stars</p>
            <p>{review_count} reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}
