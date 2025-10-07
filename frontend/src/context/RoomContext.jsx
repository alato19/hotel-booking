import { createContext, useContext, useState, useEffect } from "react";
import { get_rooms_services } from "../services/rooms";

const RoomContext = createContext({});

const RoomProvider = (props) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    refreshRooms();
  }, []);

  const refreshRooms = async () => {
    try {
      const result = await get_rooms_services();
      if (Array.isArray(result)) {
        setRooms(result);
      } else if (result.status === 200) {
        setRooms(result.result);
      }
    } catch (error) {
      console.error("Error refreshing rooms:", error);
    }
  };

  const values = {
    rooms,
    refreshRooms,
  };
  return (
    <RoomContext.Provider value={values}>{props.children}</RoomContext.Provider>
  );
};

const useRoomContext = () => {
  return useContext(RoomContext);
};
export { RoomProvider, useRoomContext };
