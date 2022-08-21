import React from 'react';
import TestRenderer from 'react-test-renderer';
import OptionsFilter from './OptionsFilter';

describe('OptionsFilter', () => {
  it('should include all options (all are selected)', () => {
    // arrange
    const options = [
      { code: 'freetoplay', name: 'Free to Play', active: true, selected: true },
      { code: 'earlyaccess', name: 'Early Access', active: true, selected: true },
      { code: 'action', name: 'Action', active: true, selected: true },
      { code: 'adventure', name: 'Adventure', active: true, selected: true },
      { code: 'casual', name: 'Casual', active: true, selected: true },
      { code: 'indie', name: 'Indie', active: true, selected: true },
      { code: 'massmulti', name: 'Massively Multiplayer', active: true, selected: true },
      { code: 'racing', name: 'Racing', active: true, selected: true },
      { code: 'rpg', name: 'RPG', active: true, selected: true },
      { code: 'simulation', name: 'Simulation', active: true, selected: true },
      { code: 'sports', name: 'Sports', active: true, selected: true },
      { code: 'strategy', name: 'Strategy', active: true, selected: true }
    ];

    // act
    const testRenderer = TestRenderer.create(
      <OptionsFilter options={options} onChangeSelection={() => {}} />
    );
    const testInstance = testRenderer.root;

    // assert
    // console.log(testRenderer.toJSON());
    // console.log(testInstance.findAllByType('input'));
    const inputElArray = testInstance.findAllByType('input');
    expect(inputElArray.length).toBe(options.length);
    inputElArray.forEach(x =>
      expect(x.props.checked).toBe(true));
  });

  it('should include all options (all are not selected)', () => {
    // arrange
    const options = [
      { code: 'freetoplay', name: 'Free to Play', active: true, selected: false },
      { code: 'earlyaccess', name: 'Early Access', active: true, selected: false },
      { code: 'action', name: 'Action', active: true, selected: false },
      { code: 'adventure', name: 'Adventure', active: true, selected: false },
      { code: 'casual', name: 'Casual', active: true, selected: false },
      { code: 'indie', name: 'Indie', active: true, selected: false },
      { code: 'massmulti', name: 'Massively Multiplayer', active: true, selected: false },
      { code: 'racing', name: 'Racing', active: true, selected: false },
      { code: 'rpg', name: 'RPG', active: true, selected: false },
      { code: 'simulation', name: 'Simulation', active: true, selected: false },
      { code: 'sports', name: 'Sports', active: true, selected: false },
      { code: 'strategy', name: 'Strategy', active: true, selected: false }
    ];

    // act
    const testRenderer = TestRenderer.create(
      <OptionsFilter options={options} onChangeSelection={() => {}} />
    );
    const testInstance = testRenderer.root;

    // assert
    const inputElArray = testInstance.findAllByType('input');
    expect(inputElArray.length).toBe(options.length);
    inputElArray.forEach(x =>
      expect(x.props.checked).toBe(false));
  });

  it('should include all options (just a few are selected)', () => {
    // arrange
    const options = [
      { code: 'freetoplay', name: 'Free to Play', active: true, selected: true },
      { code: 'earlyaccess', name: 'Early Access', active: true, selected: false },
      { code: 'action', name: 'Action', active: true, selected: false },
      { code: 'adventure', name: 'Adventure', active: true, selected: false },
      { code: 'casual', name: 'Casual', active: true, selected: false },
      { code: 'indie', name: 'Indie', active: true, selected: false },
      { code: 'massmulti', name: 'Massively Multiplayer', active: true, selected: false },
      { code: 'racing', name: 'Racing', active: true, selected: false },
      { code: 'rpg', name: 'RPG', active: true, selected: false },
      { code: 'simulation', name: 'Simulation', active: true, selected: false },
      { code: 'sports', name: 'Sports', active: true, selected: false },
      { code: 'strategy', name: 'Strategy', active: true, selected: true }
    ];

    // act
    const testRenderer = TestRenderer.create(
      <OptionsFilter options={options} onChangeSelection={() => {}} />
    );
    const testInstance = testRenderer.root;

    // assert
    const inputElArray = testInstance.findAllByType('input');
    expect(inputElArray.length).toBe(options.length);
    const selected = inputElArray.filter(x => x.props.checked == true);
    expect(selected.length).toBe(2);
  });

  it('should include correct css for selected and deselected items', () => {
    // arrange
    const options = [
      { code: 'freetoplay', name: 'Free to Play', active: true, selected: true },
      { code: 'earlyaccess', name: 'Early Access', active: true, selected: false },
      { code: 'action', name: 'Action', active: true, selected: false },
      { code: 'adventure', name: 'Adventure', active: true, selected: false },
      { code: 'casual', name: 'Casual', active: true, selected: true }
    ];

    // act
    const testRenderer = TestRenderer.create(
      <OptionsFilter options={options} onChangeSelection={() => {}} />
    );
    const testInstance = testRenderer.root;

    // assert
    const selected = testInstance.findAll(x =>
      x.props.className == 'option-selected');
    // const deselected = testInstance.findAll((x: { props: { className: string } }) =>
    //   x.props.className == 'option-deselected');
    const deselected = testInstance.findAllByProps({ className: 'option-deselected' });
    expect(selected.length).toBe(2);
    expect(deselected.length).toBe(3);
  });
});
