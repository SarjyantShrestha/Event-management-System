const navLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    icon: "fas fa-home",
    roles: ["admin", "user"],
  },
  {
    id: 2,
    name: "Events Calendar",
    path: "/events-calendar",
    icon: "fas fa-calendar-alt",
    roles: ["admin", "user"],
  },
  {
    id: 3,
    name: "Event Booking",
    path: "/event-booking",
    icon: "fas fa-ticket-alt",
    roles: ["admin", "user"],
  },
  {
    id: 4,
    name: "User Details",
    path: "/user-details",
    icon: "fas fa-user",
    roles: ["admin"],
  },
  {
    id: 5,
    name: "Venue",
    path: "/Spaces",
    icon: "fas fa-location-dot",
    roles: ["admin"],
  },
  {
    id: 6,
    name: "Manage Events",
    path: "/manage-events",
    icon: "fas fa-calendar-check",
    roles: ["admin"],
  },
];

export default navLinks;
