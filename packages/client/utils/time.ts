import dayjs from "dayjs";
import { Message } from "@shared/types";

export const messageTimestamp = (timestamp: string | Date) => {
  const givenDate = dayjs(timestamp);

  return givenDate.format("hh:mm A");
};

export const timestamp = (timestamp: string | Date) => {
  if (!timestamp) return "";

  const now = dayjs();
  const givenDate = dayjs(timestamp);
  const differenceInMinutes = now.diff(givenDate, "minute");
  const differenceInHours = now.diff(givenDate, "hour");
  const differenceInDays = now.diff(givenDate, "day");

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes}m`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours}h`;
  } else if (differenceInDays === 1) {
    return "Yesterday";
  } else if (differenceInDays < 7) {
    return givenDate.format("dddd");
  } else {
    return givenDate.format("DD/MM/YY hh:mm A");
  }
};

export const getDayLabel = (timestamp: string | Date) => {
  const now = dayjs();
  const givenDate = dayjs(timestamp);
  const startOfToday = now.startOf("day");
  const differenceInDays = now.diff(givenDate, "day");

  if (givenDate.isAfter(startOfToday)) {
    return "Today";
  } else if (
    givenDate.isAfter(startOfToday.subtract(1, "day")) &&
    givenDate.isBefore(startOfToday)
  ) {
    return "Yesterday";
  } else if (differenceInDays < 7) {
    return givenDate.format("dddd");
  } else {
    return givenDate.format("DD/MM/YYYY");
  }
};

interface GroupedMessages {
  [key: string]: Message[];
}

export const groupMessagesByDay = (messages: Message[]): GroupedMessages => {
  return messages.reduce((acc: GroupedMessages, message) => {
    const dayLabel = getDayLabel(message.createdAt);

    if (!acc[dayLabel]) {
      acc[dayLabel] = [];
    }

    acc[dayLabel].push(message);
    return acc;
  }, {});
};
