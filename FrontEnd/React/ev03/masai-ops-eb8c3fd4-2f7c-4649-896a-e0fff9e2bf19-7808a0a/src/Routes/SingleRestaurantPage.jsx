import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleRestaurantPage() {
  const [data, setData] = useState({});

  const {id} = useParams();

  useEffect(() =>{
    axios.get(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants/${id}`).then((res) =>{
      console.log(res.data.data);
      setData(res.data.data);
    })
  }, []);

  return (
    <div data-testid="restaurant-container">
      <div>
        <h3 data-testid="restaurant-name">{data.name}</h3>
      </div>
      <div data-testid="restaurant-type">Type:{data.type}</div>
      <div data-testid="restaurant-rating">Rating:{data.rating}</div>
      <div data-testid="restaurant-votes">Votes:{data.number_of_votes}</div>
      <div data-testid="restaurant-price">Starting Price:{data.price_starts_from}</div>
      <div>
        <img data-testid="restaurant-image" width={"100px"} src={data.image} />
      </div>
    </div>
  );
}
export default SingleRestaurantPage;