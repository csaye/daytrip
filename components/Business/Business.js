import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon from '@material-ui/icons/Star';

import styles from './Business.module.css';

export default function Business(props) {
  const { image_url, url, name, location, rating, review_count, categories } = props.business;
  const { address1, city, state, zip_code } = location;

  // returns star components representing rating
  function getStars() {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating <= i) stars.push(<StarBorderIcon key={`star${i}`} />);
      else if (rating <= i + 0.5) stars.push(<StarHalfIcon key={`star${i}`} />);
      else stars.push(<StarIcon key={`star${i}`} />);
    }
    return stars;
  }

  return (
    <div className={styles.container}>
      <a href={url} target="_blank" rel="noreferrer noopener">
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
              <p className={styles.stars}>{getStars()}</p>
              <p>{review_count} reviews</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
