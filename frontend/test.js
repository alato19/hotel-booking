const rooms = [
  { id: 1, title: "title" },
  { id: 2, title: "title" },
];

function Home() {
  return rooms;
}

function RoomById(id) {
  const result = Home();
  const roomById = result.find((room, index) => {
    if (room.id === id) {
      room.title = "new title";
      room.description = "new description";
      return room;
    }
  });
  return roomById;
}

console.log("--", RoomById(1));
console.log("--", Home());
