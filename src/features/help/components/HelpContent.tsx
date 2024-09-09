import { Heading2, Heading3, HR } from '../../../components/theme/layout';
import { attackImages } from '../data/slideData';
import { taskTypesHelp } from '../data/taskTypesHelp';
import { ScreensSlide } from './ScreensSlide';

import { TaskTypeItem } from './TaskTypeItem';

export const HelpContent = () => {
  return (
    <div>
      <section className="mb-4">
        <Heading2>Screenshot Tutorials</Heading2>
        <div className="flex flex-wrap gap-3 justify-evenly">
          <ScreensSlide title="Add Attacks" thumbName="attack.jpg" images={attackImages} />
        </div>
      </section>

      <section className="mb-4">
        <Heading2>What is TW Timer</Heading2>
        <p>
          The purpose of this tool is to display various TW related (tribalwars.net) timed tasks and
          to trigger an alarm when it's time to complete them (
          <span className="font-semibold">the alarm functionality is not reliable on mobile</span>).
        </p>
      </section>

      <section className="mb-4">
        <Heading2>Add Tasks</Heading2>
        <p>
          By clicking on the "Add Tasks" button you will see a form for parsing text into a number
          of tasks. The parser is designed to understand input from some of the most popular
          planning tools and script.
        </p>

        <Heading3>Types of Tasks</Heading3>
        <ol className="list-disc list-inside">
          {Object.keys(taskTypesHelp).map((key) => {
            return <TaskTypeItem key={key} typeName={key} explanation={taskTypesHelp[key]} />;
          })}
        </ol>
      </section>
    </div>
  );
};
