import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Grommet } from '../../Grommet';
import { DataTable } from '..';
describe('DataTable', function() {
  afterEach(cleanup);
  test('empty', function() {
    var _render = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, null),
        ),
      ),
      container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('basic', function() {
    var _render2 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
              },
              {
                property: 'b',
                header: 'B',
              },
            ],
            data: [
              {
                a: 'one',
                b: 1,
              },
              {
                a: 'two',
                b: 2,
              },
            ],
          }),
        ),
      ),
      container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('paths', function() {
    var _render3 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
              },
              {
                property: 'b.c',
                header: 'B',
              },
            ],
            data: [
              {
                a: 'one',
                b: {
                  c: 1,
                },
              },
              {
                a: 'two',
                b: {
                  c: 2,
                },
              },
            ],
          }),
        ),
      ),
      container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('primaryKey', function() {
    var _render4 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
              },
              {
                property: 'b',
                header: 'B',
              },
            ],
            data: [
              {
                a: 'one',
                b: 1,
              },
              {
                a: 'two',
                b: 2,
              },
            ],
            primaryKey: 'b',
          }),
        ),
      ),
      container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('footer', function() {
    var _render5 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
                footer: 'Total',
              },
              {
                property: 'b',
                header: 'B',
              },
            ],
            data: [
              {
                a: 'one',
                b: 1,
              },
              {
                a: 'two',
                b: 2,
              },
            ],
          }),
        ),
      ),
      container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('sort', function() {
    var _render6 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
              },
              {
                property: 'b',
                header: 'B',
              },
            ],
            data: [
              {
                a: 'zero',
                b: 0,
              },
              {
                a: 'one',
                b: 1,
              },
              {
                a: 'two',
                b: 2,
              },
            ],
            sortable: true,
          }),
        ),
      ),
      container = _render6.container,
      getByText = _render6.getByText;

    expect(container.firstChild).toMatchSnapshot();
    var headerCell = getByText('A');
    fireEvent.click(headerCell, {});
    expect(container.firstChild).toMatchSnapshot();
  });
  test('onSort', function() {
    var onSort = jest.fn();

    var _render7 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
              },
              {
                property: 'b',
                header: 'B',
              },
            ],
            data: [
              {
                a: 'zero',
                b: 0,
              },
              {
                a: 'one',
                b: 1,
              },
              {
                a: 'two',
                b: 2,
              },
            ],
            onSort: onSort,
            sortable: true,
          }),
        ),
      ),
      container = _render7.container,
      getByText = _render7.getByText;

    expect(container.firstChild).toMatchSnapshot();
    var headerCell = getByText('A');
    fireEvent.click(headerCell, {});
    expect(onSort).toBeCalledWith(
      expect.objectContaining({
        property: 'a',
        direction: 'asc',
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('search', function() {
    var _render8 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
                search: true,
              },
            ],
            data: [
              {
                a: 'Alpha',
              },
              {
                a: 'beta',
              },
              {
                a: '[]',
              },
            ],
          }),
        ),
      ),
      container = _render8.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(container.querySelector('[aria-label="focus-search-a"]'));
    var searchInput = container.querySelector('[name="search-a"]');
    expect(document.activeElement).toBe(searchInput);
    fireEvent.change(searchInput, {
      target: {
        value: '[',
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });
  test('resizeable', function() {
    var _render9 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
              },
              {
                property: 'b',
                header: 'B',
              },
            ],
            data: [
              {
                a: 'one',
                b: 1,
              },
              {
                a: 'two',
                b: 2,
              },
            ],
            resizeable: true,
          }),
        ),
      ),
      container = _render9.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('aggregate', function() {
    var _render10 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
              },
              {
                property: 'b',
                header: 'B',
                aggregate: 'sum',
                footer: {
                  aggregate: true,
                },
              },
            ],
            data: [
              {
                a: 'one',
                b: 1,
              },
              {
                a: 'two',
                b: 2,
              },
            ],
          }),
        ),
      ),
      container = _render10.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('groupBy', function() {
    var _render11 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
              },
              {
                property: 'b',
                header: 'B',
              },
            ],
            data: [
              {
                a: 'one',
                b: 1.1,
              },
              {
                a: 'one',
                b: 1.2,
              },
              {
                a: 'two',
                b: 2.1,
              },
              {
                a: 'two',
                b: 2.2,
              },
            ],
            groupBy: 'a',
          }),
        ),
      ),
      container = _render11.container,
      getByText = _render11.getByText;

    expect(container.firstChild).toMatchSnapshot();
    var headerCell = getByText('A');
    fireEvent.click(headerCell, {});
    expect(container.firstChild).toMatchSnapshot();
  });
  test('click', function() {
    var onClickRow = jest.fn();

    var _render12 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
              },
            ],
            data: [
              {
                a: 'alpha',
              },
              {
                a: 'beta',
              },
            ],
            onClickRow: onClickRow,
          }),
        ),
      ),
      container = _render12.container,
      getByText = _render12.getByText;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('beta'));
    expect(onClickRow).toBeCalledWith(
      expect.objectContaining({
        datum: {
          a: 'beta',
        },
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('background', function() {
    var _render13 = render(
        React.createElement(
          Grommet,
          null,
          [
            'accent-1',
            ['accent-1', 'accent-2'],
            {
              header: 'accent-1',
              body: 'accent-2',
              footer: 'accent-3',
            },
          ].map(function(background) {
            return React.createElement(DataTable, {
              key: JSON.stringify(background),
              columns: [
                {
                  property: 'a',
                  header: 'A',
                  footer: 'Total',
                },
                {
                  property: 'b',
                  header: 'B',
                },
              ],
              data: [
                {
                  a: 'one',
                  b: 1,
                },
                {
                  a: 'two',
                  b: 2,
                },
              ],
              background: background,
            });
          }),
        ),
      ),
      container = _render13.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('border', function() {
    var _render14 = render(
        React.createElement(
          Grommet,
          null,
          [
            true,
            'top',
            {
              color: 'accent-1',
              side: 'top',
              size: 'small',
            },
            {
              header: 'top',
              body: {
                color: 'accent-1',
                side: 'top',
                size: 'small',
              },
            },
          ].map(function(border) {
            return React.createElement(DataTable, {
              key: JSON.stringify(border),
              columns: [
                {
                  property: 'a',
                  header: 'A',
                  footer: 'Total',
                },
                {
                  property: 'b',
                  header: 'B',
                },
              ],
              data: [
                {
                  a: 'one',
                  b: 1,
                },
                {
                  a: 'two',
                  b: 2,
                },
              ],
              border: border,
            });
          }),
        ),
      ),
      container = _render14.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('pad', function() {
    var _render15 = render(
        React.createElement(
          Grommet,
          null,
          [
            'small',
            {
              vertical: 'small',
              horizontal: 'medium',
            },
            {
              header: 'small',
              body: {
                vertical: 'small',
                horizontal: 'medium',
              },
            },
          ].map(function(pad) {
            return React.createElement(DataTable, {
              key: JSON.stringify(pad),
              columns: [
                {
                  property: 'a',
                  header: 'A',
                  footer: 'Total',
                },
                {
                  property: 'b',
                  header: 'B',
                },
              ],
              data: [
                {
                  a: 'one',
                  b: 1,
                },
                {
                  a: 'two',
                  b: 2,
                },
              ],
              pad: pad,
            });
          }),
        ),
      ),
      container = _render15.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('rowProps', function() {
    var _render16 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
                footer: 'Total',
              },
              {
                property: 'b',
                header: 'B',
              },
            ],
            data: [
              {
                a: 'one',
                b: 1,
              },
              {
                a: 'two',
                b: 2,
              },
            ],
            rowProps: {
              one: {
                background: 'accent-1',
                border: 'bottom',
                pad: 'large',
              },
            },
          }),
        ),
      ),
      container = _render16.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('groupBy property', function() {
    var _render17 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
              },
              {
                property: 'b',
                header: 'B',
              },
            ],
            data: [
              {
                a: 'one',
                b: 1.1,
              },
              {
                a: 'one',
                b: 1.2,
              },
              {
                a: 'two',
                b: 2.1,
              },
              {
                a: 'two',
                b: 2.2,
              },
            ],
            groupBy: {
              property: 'a',
            },
          }),
        ),
      ),
      container = _render17.container,
      getByText = _render17.getByText;

    expect(container.firstChild).toMatchSnapshot();
    var headerCell = getByText('A');
    fireEvent.click(headerCell, {});
    expect(container.firstChild).toMatchSnapshot();
  });
  test('groupBy expand', function() {
    var _render18 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
              },
              {
                property: 'b',
                header: 'B',
              },
            ],
            data: [
              {
                a: 'one',
                b: 1.1,
              },
              {
                a: 'one',
                b: 1.2,
              },
              {
                a: 'two',
                b: 2.1,
              },
              {
                a: 'two',
                b: 2.2,
              },
            ],
            primaryKey: 'b',
            groupBy: {
              property: 'a',
              expand: ['one'],
            },
          }),
        ),
      ),
      container = _render18.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('groupBy onExpand', function() {
    var onExpand = jest.fn(function(groupState) {
      return groupState;
    });

    var _render19 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
              },
              {
                property: 'b',
                header: 'B',
              },
            ],
            data: [
              {
                a: 'one',
                b: 1.1,
              },
              {
                a: 'one',
                b: 1.2,
              },
              {
                a: 'two',
                b: 2.1,
              },
              {
                a: 'two',
                b: 2.2,
              },
            ],
            primaryKey: 'b',
            groupBy: {
              property: 'a',
              onExpand: onExpand,
            },
          }),
        ),
      ),
      getAllByLabelText = _render19.getAllByLabelText;

    var expandButtons = getAllByLabelText('expand');
    fireEvent.click(expandButtons[1], {});
    expect(onExpand).toBeCalled();
    expect(onExpand.mock.results[0].value).toEqual(['one']);
    expect(onExpand.mock.results[0].value).toMatchSnapshot();
  });
  test('replace', function() {
    var _render20 = render(
        React.createElement(
          Grommet,
          null,
          React.createElement(DataTable, {
            columns: [
              {
                property: 'a',
                header: 'A',
              },
              {
                property: 'b',
                header: 'B',
              },
            ],
            data: [
              {
                a: 'one',
                b: 1.1,
              },
              {
                a: 'one',
                b: 1.2,
              },
              {
                a: 'two',
                b: 2.1,
              },
              {
                a: 'two',
                b: 2.2,
              },
            ],
            primaryKey: 'b',
            step: 2,
            replace: true,
          }),
        ),
      ),
      container = _render20.container;

    expect(container.firstChild).toMatchSnapshot();
  });
});
