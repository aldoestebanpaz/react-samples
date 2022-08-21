import React from 'react';
import moment from 'moment'

interface DateProps {
  date?: Date
}

function Date({date}: DateProps) {
  const getDate = () => (date ? moment(date) : moment()).format('DD/MM/YYYY');

  return (
    <div>{getDate()}</div>
  );
}

export default Date;
