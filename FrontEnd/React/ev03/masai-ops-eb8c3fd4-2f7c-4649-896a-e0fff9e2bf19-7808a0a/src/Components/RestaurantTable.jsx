
import { RestaurantCard } from "./RestaurantCard";

function RestaurantTable({ data }) {
    //console.log(data)

  return (
    <table border="1px">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rating</th>
          <th>Type</th>
          <th>Number of Votes</th>
          <th>Price Starts From</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => {
            
          return <RestaurantCard
            key={item.id}
            name={item.name}
            rating={item.rating}
            type={item.type}
            number_of_votes={item.number_of_votes}
            price_starts_from={item.price_starts_from}
            id={item.id}
          />;
        })}
      </tbody>
    </table>
  );
}

export default RestaurantTable;

// id: 1
// image: "https://picsum.photos/200"
// name: "Shute"
// number_of_votes: 588
// price_starts_from: 925
// rating: 4.5
// type: "fine_dining"