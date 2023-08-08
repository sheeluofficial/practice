import { useNavigate } from "react-router-dom"
import {Link} from "react-router-dom";


export function RestaurantCard({
    id , name , number_of_votes , price_starts_from , rating ,type
}){

    // const navigate = useNavigate();

    // const handleGoToSinglePage = () =>{
    //     navigate(`/restaurants/${id}`)
    // }


    return (
        <tr data-testid="item">
            <td>
            <Link data-testid="name" to={`/restaurants/${id}`} >
               {name}
            </Link>
            </td>
            
            <td data-testid="rating">
                {rating}
            </td>
            <td data-testid="type">
                {type}
            </td>
            <td data-testid="votes">
                {number_of_votes}
            </td>
            <td data-testid="price">
                {price_starts_from}
            </td>
        </tr>
    )
}


// id: 1
// image: "https://picsum.photos/200"
// name: "Shute"
// number_of_votes: 588
// price_starts_from: 925
// rating: 4.5
// type: "fine_dining"