import { useEffect } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { setAsVisited } from '../srvices/storage';

export const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setAsVisited();
    };
  }, []);

  return (
    <div className="flex flex-col md:w-3/5 lg:w-2/5 xl:w-2/7 mx-auto mt-8 md:mt-20 bg-orange-100 p-3 text-center justify-center border-2 border-yellow-800 drop-shadow-xl">
      <h1 className="mt-6 mb-4 text-4xl font-bold">TW Timer</h1>
      <p className="my-3 text-xl">
        This is a helper tool for the online game Tribal Wars. Its main purpose is to help with
        various timed tasks, especially when you need to be doing something else and can't focus on
        the game all the time.
      </p>

      <p className="my-3 text-xl">Start adding tasks by clicking on this button</p>

      <button
        type="button"
        className="h-8 px-6 font-semibold bg-yellow-800 text-stone-100 rounded-lg  w-1/2 sm:w-1/3 mx-auto drop-shadow-md hover:drop-shadow-lg"
        onClick={() => navigate('/parse')}
      >
        Add Task
      </button>

      <p className="mt-5 text-md">Or if you need more information check the Help section</p>
      <Link className="underline font-semibold" to="/help">
        Go to Help
      </Link>
    </div>
  );
};
