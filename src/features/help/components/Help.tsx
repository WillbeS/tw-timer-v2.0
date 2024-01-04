export const Help = () => {
  const subHeadingStyles = 'text-xl font-semibold mb-1';
  return (
    <div className="px-2 py-3 rounded-md">
      <section className="mb-4">
        <h2 className={subHeadingStyles}>What is TW Timer</h2>
        <p>
          The purpose of this tool is to display various TW (tribalwars.net) related timed tasks and
          to trigger an alarm when it's time to complete them (the alarm functionality is not
          reliable on mobile).
        </p>
      </section>

      <section className="mb-4">
        <h2 className={subHeadingStyles}>How to use the TW Timer</h2>
        <ol className="list-disc list-inside">
          <li>Add new tasks by clicking on the Add button.</li>
          <li>Switch on the alarm, it should become green</li>
          <li>You will see a list of timed tasks ordered by time with a live countdown timer</li>
          <li>Click on the 🔎 details icon to see more information about the task</li>
          <li>Click on the delete button to remove a task</li>
        </ol>
      </section>

      {/* <section className="mb-4">
        <h2 className={subHeadingStyles}>How to add tasks</h2>
      </section> */}
    </div>
  );
};
