import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "..";

export function Navbar() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  return (
    <div className="navbar">
      <h2 className="navbar-heading">Meetup</h2>
      <input
        type="search"
        name="search"
        placeholder="Search By Title And Tags"
        className="search-box"
        value={state.searchText}
        onChange={(event) => {
          dispatch({ type: "UPDATE_SEARCH_TEXT", payload: event.target.value });
          navigate("/");
        }}
      />
    </div>
  );
}
