import React from 'react'

type Props = {
  label?: string;
  date: string;
  minDate?: string | undefined;
  maxDate?: string | undefined;
  handleChange: ({ target }: any) => void;
}

export const CalendarInput = ({
  label,
  date,
  minDate,
  maxDate,
  handleChange,
}: Props) => {
  return (
    <>
      {label && <label htmlFor="calendar">{label}</label>}
      <input
        id="calendar"
        type="date"
        value={date}
        min={minDate}
        max={maxDate}
        onChange={handleChange}
      />
    </>
  )
}
