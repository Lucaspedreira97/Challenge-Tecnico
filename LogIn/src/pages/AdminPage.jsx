import AdminPedidos from "../components/AdminPedidos";
import 'bootstrap/dist/css/bootstrap.min.css';



const AdminPage = () => {
  const email = localStorage.getItem("userEmail");

  return (
    <div>
      <AdminPedidos email={email} />
    </div>
  );
};
export default AdminPage;
