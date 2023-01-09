import TodoForm from "../components/TodoForm";
import Welcome from "../components/Welcome";

function Dashboard() {
  return (
    <section className="flex flex-col items-center justify-center pt-16">
      <Welcome />
      <TodoForm />
    </section>
  );
}
export default Dashboard;
