import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Pagination from "../Components/Pagination";
import { useSearchParams } from "react-router-dom";
import RestaurantTable from "../Components/RestaurantTable";
import { AppContext } from "../Context/AppContext";

function Dashboard() {
  const { auth,setLogIn,logOutUser } = useContext(AppContext);

  const [data , setData] = useState([]);
  const   [searchParam,setSearchParam]=useSearchParams()

  const [page , setPage] = useState(searchParam.get("page")||1);
  
  const [totalPages , setTotalPages] = useState();


  useEffect(() =>{
    axios.get(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants?page=${page}&limit=10`).then((res)=>{
        //console.log(res.data.data);
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
        setSearchParam({page:page})
    })
  }, [page,setSearchParam])

 


  const handlePageChange = (page) =>{
    setPage(page);
  }

 



  //Logout
  const handleLogout = () =>{
    logOutUser()
  }


  return (
    <div>
      <h3>Dashboard</h3>
      <div>
        <button data-testid="logout-btn" onClick={handleLogout}>Logout</button>
        <p>
          Token:
          <b data-testid="user-token">ABCD</b>
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* restaurant table */}
        <RestaurantTable data={data} />
      </div>
      <div data-testid="pagination-container">
        <Pagination totalPages={totalPages} currentPage={page} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default Dashboard;
