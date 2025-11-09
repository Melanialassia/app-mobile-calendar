export const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const formatHour = (date: Date) => {
  const CONVERT_STRING = date.toISOString(); 
  const TIME = CONVERT_STRING.split("T")[1]; 
  const [hours, minutes] = TIME.split(":"); 
  return `${hours}:${minutes}`;
};

export const parseDateTime = (dateString: string, hourString?: string) => {
  const DATE = new Date(dateString + "T00:00:00");

  if (hourString) {
    const [h, m] = hourString.split(":").map(Number);
     DATE.setHours(h, m, 0, 0);
  } else {
     DATE.setHours(0, 0, 0, 0); 
  }

  return  DATE;
};