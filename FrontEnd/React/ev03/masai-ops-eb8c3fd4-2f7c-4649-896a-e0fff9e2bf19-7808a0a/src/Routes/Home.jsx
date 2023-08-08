import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

function Home() {
 const Auth = useContext(AppContext)
 console.log(Auth)
  return (
    <div>
      <Link to="/login">
        <h3 data-testid="login-link">Login Page</h3>
      </Link>
      <Link to="/dashboard">
        <h3 data-testid="home-link">Home</h3>
      </Link>
    </div>
  );
}
export default Home;
