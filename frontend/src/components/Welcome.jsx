import { useSelector } from "react-redux";

function Welcome() {
  const {
    user: { user },
  } = useSelector((state) => state.auth);

  return (
    
      <div className="max-w-5xl mx-auto">
        <h1 className="text-slate-900 font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-center">
          Hello {user.name} 🔥
        </h1>
        <p className="mt-6 text-md sm:text-lg text-slate-600 text-center max-w-3xl">
          Let's get some work done today 💪
        </p>
      </div>
   
  );
}
export default Welcome;
