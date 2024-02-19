const errorToString = (e: unknown): string => {
  let err: string = "";
  if (typeof e === "string") {
    err = e.toUpperCase();
  } else if (e instanceof Error) {
    err = e.message;
  }
  return err;
};

export { errorToString };

const isContainSpace = (value: string): boolean => {
  return !value.includes(" ");
};

const longtext = (text: string, long: number): string => {
  if (text.length <= long) {
    return text;
  } else {
    return text.substring(0, long) + " ...";
  }
};
export { longtext };

export { isContainSpace };
