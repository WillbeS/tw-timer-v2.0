import { ModalHelpData } from '../../../data/types';
import { todoTypes } from '../../todos/data/constants'; //temp

// Keeping this only because of the data, to use it for the help component
export const todosFormHelpData: ModalHelpData = {
  world: {
    heading: 'World Field Help',
    content: [
      {
        heading: 'Why is it needed?',
        content:
          'For some of the types you will need to select a world (for example, attack or dodge). This is important in order to take the correct village information where needed.  Some types of tasks also have urls pointing to the game and without a specified world it is impossible to generate them',
      },
      {
        heading: 'Is it required?',
        content:
          "By default this field is required by some task types, and not by others (reminder type) or they won't be parsed. You can choose to make it optional for all from the settings but keep in mind that without it the tasks will just list the village coordinates and won't be able to include names/links.",
      },
    ],
  },
  [todoTypes.REMINDER]: {
    heading: 'Reminder Type Help',
    content: [
      {
        heading: 'Default Type',
        content:
          'This is the default type. To see the help for other types just select a type from the drop down menu and click the help icon again.',
      },
      {
        heading: 'Type: reminder',
        content:
          'It creates a task from the text you write and a specified time in the future. The time is in the following format: "in/after N hours/minutes"',
      },
      {
        heading: 'Examples:',
        content:
          '"Send farm run in 50 minutes"; "Do something in 5 hours"; "Do something else after 2 hours and 34 minutes"',
      },
      {
        heading: 'Additional info:',
        content: 'As of this version, only one reminder task can be added at a time',
      },
    ],
  },
  [todoTypes.ATTACK]: {
    heading: 'Attack Type Help',
    content: [
      {
        heading: 'Type: attack',
        content:
          'Grab the bb coded results of an attack planner script/tool and paste it bellow. This type requires selecting a world in order to display properly. Supported planners:',
      },
      {
        heading: 'Single Village Planner',
        content: 'Author:  RedAlert. Copy the plan from the "Export Plan without tables" field',
      },
      {
        heading: 'Mass Attack Planner',
        content: 'Author:  RedAlert. Copy the plan from the "Results" field',
      },
      {
        heading: "Devil's Planner (Simple)",
        content:
          "Address:  https://devilicious.dev/. For simplicity reasons the parser works with results that include only the following options: Unit, Send Time, Coordinates, Target URL. Please make sure nothing else is selected when you generate the results, the tasks may or may not get parsed and accuracy can't be guaranteed.",
      },
      {
        heading: 'Fodox Planner Planner',
        content:
          'Address:  http://www.fxutility.net/massap_eng.php. Copy the plan from the BB-Code field in the Results (with table)',
      },
      {
        heading: 'More Planners',
        content:
          "These are the ones I've been using over the years, if you know a planner that is not supported send me a message at vvillbes@gmail.com and I will try to add it",
      },
    ],
  },
  [todoTypes.DODGE]: {
    heading: 'Dodge Type Help',
    content: [
      {
        heading: 'Type: dodge',
        content:
          "This type requires selecting a world in order to display properly. The main purpose is to keep your troops available while under attack. This is usually done by dodging right before the attack and then canceling when it's safe. With many incomings it's really hard to keep track of all dodges.",
      },
      {
        heading: 'How to add dodge tasks?',
        content:
          'Go to the Overviews --> Incoming page (with a dodge group selected if you have one), select all the incomings that you wish to dodge and then copy/paste them below (selecting the whole page will work too)',
      },
      {
        heading: 'How it works',
        content:
          'By default a dodge task will trigger the alarm 7 minutes before the incoming\'s landing time. If you go to the village by clicking the "Dodge" link the task will update and will change to a cancel task, with a "Cancel" link and an offset that will trigger the alarm when it\'s safe to cancel. Since the exact time of your dodging is not known it adds some extra time to the offset.',
      },
    ],
  },
  [todoTypes.SNIPE]: {
    heading: 'Snipe Type Help',
    content: [
      {
        heading: 'Type: snipe',
        content:
          'Grab the bb coded results of a snipe script and paste it bellow. This type requires selecting a world in order to display properly. Supported scripts:',
      },
      {
        heading: 'Single Village Snipe',
        content:
          'Author:  RedAlert. Click on the "Export as BB Code" button to copy the times and paste it below',
      },
      {
        heading: 'Mass Snipe',
        content:
          'Author:  RedAlert. Click on the "Export as BB Code" button to copy the times and paste it below',
      },
    ],
  },
  // [todoTypes.MINTING]: {
  //   heading: 'Minting Type Help',
  //   content: [
  //     {
  //       heading: 'Type: minting',
  //       content:
  //         'This task is created from all the transports incoming to your minting village and it triggers the alarm some time before the WH is full. It can be updated manually or automatically (you can choose how from the Settings)',
  //     },
  //     {
  //       heading: 'Adding the task',
  //       content:
  //         "Go to Market --> Transports, select the whole page (it's important to select the Server time or the transport times will not be correct) and copy/paste it below.",
  //     },
  //     {
  //       heading: 'Default data',
  //       content:
  //         'In order to be able to calculate the next overflow time some data has to be present. The WH capacity and some buffer resources that are assumed to be present in the WH at all time (you can set those from the Settings as well)',
  //     },
  //     {
  //       heading: 'Manual update',
  //       content:
  //         "If you've chosen to update it manually, you will get an update button next to it. Clicking it will assume that the WH has been emptied (reset to its buffer resources) and will recalculate the next overflow time.",
  //     },
  //     {
  //       heading: 'Automatic update',
  //       content:
  //         "With the automatic update the task will assume that you've minted when the alarm was triggered and will reset and recalculate the next overflow without waiting for an action from you",
  //     },
  //   ],
  // },
  alarmOffset: {
    heading: 'Alarm Offset Help',
    content: [
      {
        heading: 'Purpose',
        content:
          'It determines how long before the actual due time the alarm will be triggered. Each type of task has a default offset which can be changed from the Settings. You can also manually type an offset of your choice.',
      },
      {
        heading: 'Measure',
        content:
          'The offset value must be in seconds only (but for your convenience it shows the amount in minutes too',
      },
    ],
  },
};
