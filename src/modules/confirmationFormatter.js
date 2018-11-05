import uuid from "uuid/v1";
import { pickProps } from "./utils";

export default function confirmationFormatter(hotel, room) {
  return {
    id: uuid(),
    hotelId: hotel.id,
    roomId: room.id,
    hotel: pickProps(hotel, [
      "name",
      "distance_to_venue",
      "rating",
      "amenities"
    ]),
    room: pickProps(room, ["name", "max_occupancy", "price_in_usd"])
  };
}
