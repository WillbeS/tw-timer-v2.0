import { useEffect } from 'react';

import { setAsVisited } from '../srvices/storage';
import { Alert } from '../../../components/ui/Alert';

// TODO - make this navigate/refresh the home page on close
export const Welcome = () => {
  // useEffect(() => {
  //   setAsVisited();
  //   console.log('Set as visited');
  // }, []);

  const reloadPage = () => {
    console.log('needs to reload the home page');
    setAsVisited();
  };

  return (
    <Alert type="information" heading="Welcome!" closable={true} onClose={reloadPage}>
      <p className="my-3 text-xl">
        This is a helper tool for the online game Tribal Wars. Its main purpose is to help with
        various timed tasks, like scheduled attack launches, dodging, etc.
      </p>

      <p className="my-3 text-xl">
        Start adding tasks by clicking on the "Add Tasks" button or check the help menu for more
        details
      </p>
    </Alert>
  );
};
