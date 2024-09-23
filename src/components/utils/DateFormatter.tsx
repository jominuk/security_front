import React from "react";

interface FormattedDateTimeProps {
  dateTimeString: string | null;
}

const FormattedDateTime: React.FC<FormattedDateTimeProps> = ({
  dateTimeString,
}) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const ampm = hours >= 12 ? "오후" : "오전";
    const formattedHour = hours % 12 || 12;

    return `${year}.${month}.${day} ${ampm} ${formattedHour}:${minutes}:${seconds}`;
  };

  return <span>{formatDate(dateTimeString)}</span>;
};

export default FormattedDateTime;
