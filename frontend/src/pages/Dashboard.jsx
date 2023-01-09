import GoalForm from "../components/GoalForm";
import Goals from "../components/Goals";
import Welcome from "../components/Welcome";

function Dashboard() {
  return (
    <>
      <section className="flex flex-col items-center justify-center pt-16">
        <Welcome />
        <GoalForm />
      </section>
      <Goals />
    </>
  );
}
export default Dashboard;
