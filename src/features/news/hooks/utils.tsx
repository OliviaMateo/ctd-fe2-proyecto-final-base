export const calcMinutes = (date: Date) => {
  const today = new Date();
  const minutosTranscurridos = Math.floor(
    (today.getTime() - date.getTime()) / 60000
  );
  return minutosTranscurridos;
};

export const capWords = (title: string) => {
  const capitalizedTitle = title
    .split(" ")
    .map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(" ");

  return capitalizedTitle;
};
