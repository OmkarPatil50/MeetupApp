import { useEffect, useReducer } from "react";
import { AppContext } from "..";
import { data } from "../Data/Data";

export function AppContextProvider({ children }) {
  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "UPDATE_RENDER_LIST": {
        return { ...state, renderList: action.payload };
      }

      case "UPDATE_SEARCH_TEXT": {
        return { ...state, searchText: action.payload };
      }

      case "UPDATE_FILTER_TYPE": {
        return { ...state, filterByEventType: action.payload };
      }

      default:
        return state;
    }
  };

  const initialValue = {
    meetUpsList: data.meetups,
    renderList: data.meetups,
    searchText: "",
    filterByEventType: "Both"
  };

  const [state, dispatch] = useReducer(reducerFunction, initialValue);

  useEffect(() => {
    let data = [...state.meetUpsList];
    if (state.searchText) {
      data = data.filter(({ title, eventTags }) => {
        return (
          title.includes(state.searchText) ||
          eventTags.some((tag) => {
            return tag.includes(state.searchText);
          })
        );
      });
    }
    if (state.filterByEventType === "Both") {
      data = data;
    }
    if (state.filterByEventType !== "Both") {
      data = data.filter(({ eventType }) => {
        return eventType === state.filterByEventType;
      });
    }
    dispatch({ type: "UPDATE_RENDER_LIST", payload: data });
  }, [state.searchText, state.filterByEventType]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
