import GoalItem from "./GoalItem";
import { PulseLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { readGoals, reset } from "../features/goals/goalSlice";
import { toast } from "react-toastify";

function Goals() {
  const dispatch = useDispatch();

  const { isError, isSuccess, message, goals, isLoading } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }

    dispatch(readGoals());

    return () => {
      dispatch(reset());
    };
  }, [isError, message]);

  return (
    <article className="mt-16 w-full">
      {goals && (
        <ul className="flex flex-col w-5/6 m-auto">
          {goals.map((item) => {
            return <GoalItem key={item._id} {...item} />;
          })}
        </ul>
      )}
      {isLoading && (
        <div className="flex justify-center mt-36 w-3/4 m-auto">
          <PulseLoader color="rgb(2 132 199)" />
        </div>
      )}
    </article>
  );
}
export default Goals;
