import Home from "../components/customers/routes/Home";
import Tickets from "../components/customers/routes/Tickets";
import About from "../components/customers/routes/About";
import OneTicket from "../components/customers/routes/OneTicket";
import HomeAdmin from "../components/admin/routes/Home";
import TicketsAdmin from "../components/admin/routes/Tickets";
import OneTicketAdmin from "../components/admin/routes/OneTicket";

const routers = [
  { path: "/", component: Home },
  { path: "/tickets", component: Tickets },
  { path: "/about", component: About },
  { path: "/tickets/:id", component: OneTicket, props: true },
  { path: "/admin", component: HomeAdmin },
  { path: "/admin/tickets", component: TicketsAdmin },
  { path: "/admin/tickets/:id", component: OneTicketAdmin, props: true }
];

export default routers;
