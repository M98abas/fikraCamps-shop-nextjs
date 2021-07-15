import moment from "moment";
import Link from "next/link";
import { Empty } from "antd";

const PureCard = ({ item, link }) => {
  console.log(item.image);
  return (
    <Link href={`${link}/${item.id}`}>
      <div className="category-card">
        {item.image ? (
          <img src={item.image} alt="" />
        ) : (
          <img
            src={
              "https://lh3.googleusercontent.com/proxy/NCkJFV1isTukKzRM9YSoBjCUzBKFc4rTy8iKzMlxu1mVkhoomrBJ9J0wW4YclGM6CyWwMdjWcxT68VKWVWwezYgCfjMCveRKa_rtVaF9QloHVlfAkWk2mQjWkJVZoQ"
            }
            alt=""
          />
        )}
        {/* <img
          src={item ? "./images/electronics.svg" : "./images/phone.svg"}
          alt="" */}
        {/* /> */}
        <p className="card-name">{item.name}</p>
        <p className="card-date">
          {moment(item.createdAt).format("DD/MM/YYYY, HH:MM A")}
        </p>
        {item.price && <p className="card-price">${item.price}</p>}
      </div>
    </Link>
  );
};

export default PureCard;
