import { useEffect } from "react";
import { useRef, useState } from "react";
import { createGoal } from "../features/goals/goalSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function GoalForm() {
  const [textValue, setTextValue] = useState("");
  const refContainer = useRef(null);

  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();

    if (textValue) {
      dispatch(createGoal({ title: textValue }));

      setTextValue("");

      toast.info("New Goal 🔥", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  useEffect(() => {
    refContainer.current.focus();
  });

  return (
    <form
      onSubmit={submitHandler}
      className="flex justify-center space-x-6 mt-16 w-full"
    >
      <input
        type="text"
        placeholder="Add a new goal..."
        className="focus:outline-none  h-12 px-3 rounded-lg bg-white border-2 w-1/2 text-slate-700"
        value={textValue}
        ref={refContainer}
        onChange={(e) => setTextValue(e.target.value)}
      />
      <button className="flex items-center justify-center space-x-1  bg-slate-700 hover:bg-slate-600 text-white font-semibold h-12 px-3  rounded-lg ">
        <PlusIcon />
        <span>Add</span>
      </button>
    </form>
  );
}

const PlusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default GoalForm;
