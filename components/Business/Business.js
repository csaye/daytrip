import styles from './Business.module.css';

export default function Business(props) {
  const { image_url, name, location, rating, review_count, categories } = props.business;
  const { address1, address2, address3, city, state, zip_code } = location;

  return (
    <div>
      <img src={image_url} alt=""/>
      <h2>{name}</h2>
      <div>
        <div>
          <p>{address1}</p>
          {address2 && <p>{address2}</p>}
          {address3 && <p>{address3}</p>}
          <p>{city}</p>
          <p>{state} {zip_code}</p>
        </div>
        <div>
          <h3>{categories.map(category => category.title).join(', ')}</h3>
          <h3>{rating} stars</h3>
          <p>{review_count} reviews</p>
        </div>
      </div>
    </div>
  );
}
