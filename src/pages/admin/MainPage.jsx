import React from "react";
import Calendar from "../../components/atoms/Calendar";

const MainPage = () => {
  const handleChangeCalendar = () => {};
  return (
    <div>
      <Calendar handleChangeCalendar={handleChangeCalendar} />
    </div>
  );
};

export default MainPage;
