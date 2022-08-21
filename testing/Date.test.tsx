import React from 'react';
import { render, screen } from '@testing-library/react';
import DateComponent from './Date';
import moment from 'moment';

describe('Date', () => {
  test(`should render today's date if not props are passed`, () => {
    // arrange
    const currentDateString = moment().format('DD/MM/YYYY');

    // act
    render(<DateComponent/>);

    // assert
    expect(screen.getByText(currentDateString)).toBeInTheDocument();
  });

  test(`should render date passed by props`, () => {
    // arrange
    const date = new Date(2021, 10, 15); // new Date(year, monthIndex, day)

    // act
    render(<DateComponent date={date} />);

    // assert
    expect(screen.getByText('15/11/2021')).toBeInTheDocument();
  });
});
