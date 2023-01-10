import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteGoal, updateGoal } from "../features/goals/goalSlice";

function GoalItem({ goal }) {
  const { _id, title, completed } = goal;

  const refContainer = useRef(null);
  const [editing, setEditing] = useState(false);
  const [textValue, setTextValue] = useState(title);

  useEffect(() => {
    if (editing) refContainer.current.focus();
  }, [editing]);

  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    dispatch(updateGoal({ ...goal, title: textValue }));
    setEditing(false);
  }

  return (
    <li
      style={{
        backgroundColor: completed ? "rgb(187 247 208 / 1)" : "",
      }}
      className="bg-white text-slate-600 mb-4 flex h-12 shadow-md border rounded-md items-center justify-center"
    >
      <button
        onClick={() => dispatch(updateGoal({ ...goal, completed: !completed }))}
        className="mx-2 hover:bg-slate-100 p-1"
        style={{
          color: completed ? "rgb(34 197 94 / 1)" : "rgb(251 113 133 / 1)",
        }}
      >
        <DoneIcon />
      </button>
      {editing ? (
        <form className="grow" onSubmit={submitHandler}>
          <input
            type="text"
            onChange={(e) => setTextValue(e.target.value)}
            value={textValue}
            ref={refContainer}
            className="w-full h-full border-0 focus:outline-none bg-transparent border-b-2 border-solid border-b-gray-600"
          />
        </form>
      ) : (
        <h3
          onClick={() => {
            setEditing(true);
          }}
          className="grow cursor-pointer"
        >
          {title}
        </h3>
      )}
      <div className="flex items-center mr-3">
        <button
          onClick={() => {
            setTextValue(title);
            setEditing(!editing);
          }}
          className="mr-3 text-gray-500 hover:bg-slate-100 p-1"
        >
          <EditIcon />
        </button>
        <button
          onClick={() => dispatch(deleteGoal(_id))}
          className="text-rose-500 hover:bg-slate-100 p-1"
        >
          <CancelIcon />
        </button>
      </div>
    </li>
  );

  //       {editing ? (
  //         <form className="w-full h-full flex items-center flex-auto">
  //           <input
  //             type="text"
  //             className="p-3 focus:outline-none border-b-4 border-slate-500 w-full"
  //             value={textValue}
  //             onChange={(e) => setTextValue(e.target.value)}
  //           />
  //         </form>
  //       ) : (
  //         <h3
  //           onClick={() => setEditing(!editing)}
  //           className="ml-3 font-medium text-slate-500 cursor-pointer flex-auto"
  //         >
  //           {title}
  //         </h3>
  //       )}
}

const EditIcon = () => {
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
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );
};

const CancelIcon = () => {
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
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

const DoneIcon = () => {
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
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default GoalItem;
