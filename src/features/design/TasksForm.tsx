export const TasksForm = () => {
  const fieldDivStyle = 'flex flex-col mb-5 bg-transparent';
  const labelStyle = 'text-sm px-2 flex flex-row gap-2';
  const fieldStyle =
    'rounded-2xl border border-stone-200 focus:outline-none px-4 py-1 text-sm md:text-base bg-white bg-opacity-40';

  return (
    <form className="w-full md:w-3/4 mx-auto">
      <div className={fieldDivStyle}>
        <label className={labelStyle} htmlFor="world">
          <span> Select a world </span>
        </label>
        <select id="world" className={fieldStyle}>
          <option value="-1" disabled hidden>
            Select a world
          </option>
          <option value="en127">127</option>
          <option value="en131">131</option>
          <option value="en135">135</option>
        </select>
      </div>

      <div className={fieldDivStyle}>
        <label className={labelStyle} htmlFor="type">
          <span> Select a type </span>
        </label>
        <select id="world" className={fieldStyle}>
          <option value="-1" disabled hidden>
            Select a world
          </option>
          <option value="reminder">Reminder</option>
          <option value="attack">Attack</option>
          <option value="dodge">Dodge</option>
        </select>
      </div>

      <div className={fieldDivStyle}>
        <label className={labelStyle} htmlFor="alarmOffset">
          <span>Alarm offset (play 0 seconds early)</span>
        </label>
        <input type="number" id="alarmOffset" className={fieldStyle} />
      </div>

      <div className={fieldDivStyle}>
        <label className={labelStyle} htmlFor="text">
          <span>Parse from text or type a reminder</span>
        </label>
        <textarea id="text" rows={10} className={fieldStyle} />
      </div>

      <div className="flex flex-row justify-end gap-2">
        <button
          type="button"
          className="h-8 px-6 font-semibold bg-stone-400 text-stone-100 rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="h-8 px-6 font-semibold bg-yellow-800 text-stone-100 rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
};
