export type AssertData = {
  [key: string]: string;
};

// Assert helper for asserting object types
export const assertPropExists = (data: object, propName: string) => {
  if (!(propName in data)) {
    throw new Error(`Data doesn't contain ${propName}`);
  }
};

export const assertPropIsCorrectType = (
  testObj: object,
  assertData: AssertData,
  optionalData?: AssertData,
) => {
  const propValues = Object.values(testObj);
  const propKeys = Object.keys(testObj);

  for (let i = 0; i < propValues.length; i++) {
    const prop = propValues[i];
    const propName = propKeys[i];

    //console.log(`Type of ${propName} is `, typeof prop);
    if (optionalData && optionalData[propName]) {
      //console.log('Assert optional props');
      if (typeof prop !== optionalData[propName]) {
        throw new Error(`${propName} is not a ${optionalData[propName]}`);
      }
    } else if (typeof prop !== assertData[propName]) {
      throw new Error(`${propName} is not a ${assertData[propName]}`);
    }
  }
};
