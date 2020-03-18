'use strict';

var _react = _interopRequireDefault(require('react'));

var _reactTestRenderer = _interopRequireDefault(require('react-test-renderer'));

var _react2 = require('@testing-library/react');

require('jest-styled-components');

var _Grommet = require('../../Grommet');

var _ = require('..');

var _FormField = require('../../FormField');

var _Button = require('../../Button');

var _Text = require('../../Text');

var _TextInput = require('../../TextInput');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

describe('Form', function() {
  afterEach(_react2.cleanup);
  test('empty', function() {
    var component = _reactTestRenderer['default'].create(
      _react['default'].createElement(
        _Grommet.Grommet,
        null,
        _react['default'].createElement(_.Form, null),
      ),
    );

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('with field', function() {
    var component = _reactTestRenderer['default'].create(
      _react['default'].createElement(
        _Grommet.Grommet,
        null,
        _react['default'].createElement(
          _.Form,
          null,
          _react['default'].createElement(_FormField.FormField, {
            name: 'test',
          }),
        ),
      ),
    );

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('errors', function() {
    var component = _reactTestRenderer['default'].create(
      _react['default'].createElement(
        _Grommet.Grommet,
        null,
        _react['default'].createElement(
          _.Form,
          {
            errors: {
              test: 'missing',
            },
          },
          _react['default'].createElement(_FormField.FormField, {
            name: 'test',
          }),
        ),
      ),
    );

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('infos', function() {
    var component = _reactTestRenderer['default'].create(
      _react['default'].createElement(
        _Grommet.Grommet,
        null,
        _react['default'].createElement(
          _.Form,
          {
            infos: {
              test: 'missing',
            },
          },
          _react['default'].createElement(_FormField.FormField, {
            name: 'test',
          }),
        ),
      ),
    );

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('update', function() {
    var validate = jest
      .fn()
      .mockReturnValueOnce('too short')
      .mockReturnValueOnce(undefined);
    var validate2 = jest.fn().mockReturnValue(undefined);
    var onSubmit = jest.fn();

    var _render = (0, _react2.render)(
        _react['default'].createElement(
          _Grommet.Grommet,
          null,
          _react['default'].createElement(
            _.Form,
            {
              onSubmit: onSubmit,
            },
            _react['default'].createElement(_FormField.FormField, {
              name: 'test',
              required: true,
              validate: validate,
              placeholder: 'test input',
            }),
            _react['default'].createElement(_FormField.FormField, {
              name: 'test2',
              placeholder: 'test-2 input',
              validate: [validate2],
            }),
            _react['default'].createElement(_Button.Button, {
              type: 'submit',
              primary: true,
              label: 'Submit',
            }),
          ),
        ),
      ),
      getByPlaceholderText = _render.getByPlaceholderText,
      getByText = _render.getByText,
      container = _render.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v',
      },
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(validate).toBeCalledWith('v', {
      test: 'v',
    });
    expect(validate2).toBeCalledWith(undefined, {
      test: 'v',
    });

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'value',
      },
    });

    _react2.fireEvent.change(getByPlaceholderText('test-2 input'), {
      target: {
        value: 'value-2',
      },
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(validate).toBeCalledWith('value', {
      test: 'value',
      test2: 'value-2',
    });
    expect(validate2).toBeCalledWith('value-2', {
      test: 'value',
      test2: 'value-2',
    });
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        value: {
          test: 'value',
          test2: 'value-2',
        },
        touched: {
          test: true,
          test2: true,
        },
      }),
    );
  });
  test('regexp validation', function() {
    var onSubmit = jest.fn();

    var _render2 = (0, _react2.render)(
        _react['default'].createElement(
          _Grommet.Grommet,
          null,
          _react['default'].createElement(
            _.Form,
            {
              onSubmit: onSubmit,
            },
            _react['default'].createElement(_FormField.FormField, {
              name: 'test',
              required: true,
              validate: {
                regexp: /^[a-z]/i,
              },
              placeholder: 'test input',
            }),
            _react['default'].createElement(_Button.Button, {
              type: 'submit',
              primary: true,
              label: 'Submit',
            }),
          ),
        ),
      ),
      getByPlaceholderText = _render2.getByPlaceholderText,
      getByText = _render2.getByText,
      queryByText = _render2.queryByText;

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: '1',
      },
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(getByText('invalid')).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'a',
      },
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(queryByText('invalid')).toBeNull();
  });
  test('validate', function() {
    var onSubmit = jest.fn();

    var _render3 = (0, _react2.render)(
        _react['default'].createElement(
          _Grommet.Grommet,
          null,
          _react['default'].createElement(
            _.Form,
            {
              onSubmit: onSubmit,
            },
            _react['default'].createElement(_FormField.FormField, {
              name: 'test',
              required: true,
              validate: [
                function(value) {
                  return value.length === 1 ? 'simple string' : undefined;
                },
                function(value) {
                  return value.length === 2
                    ? _react['default'].createElement(
                        _Text.Text,
                        null,
                        ' ReactNode ',
                      )
                    : undefined;
                },
                function(value) {
                  return value.length === 3
                    ? {
                        message: 'status error',
                        status: 'error',
                      }
                    : undefined;
                },
                function(value) {
                  return value.length === 4
                    ? {
                        message: 'status info',
                        status: 'info',
                      }
                    : undefined;
                },
              ],
              placeholder: 'test input',
            }),
            _react['default'].createElement(_Button.Button, {
              type: 'submit',
              primary: true,
              label: 'Submit',
            }),
          ),
        ),
      ),
      getByPlaceholderText = _render3.getByPlaceholderText,
      getByText = _render3.getByText;

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'a',
      },
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(getByText('simple string')).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'ab',
      },
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(getByText('ReactNode')).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'abc',
      },
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(getByText('status error')).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'abcd',
      },
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(getByText('status info')).toMatchSnapshot();
  });
  test('required validation', function() {
    var onSubmit = jest.fn();

    var _render4 = (0, _react2.render)(
        _react['default'].createElement(
          _Grommet.Grommet,
          null,
          _react['default'].createElement(
            _.Form,
            {
              onSubmit: onSubmit,
            },
            _react['default'].createElement(_FormField.FormField, {
              name: 'test',
              required: true,
              placeholder: 'test input',
            }),
            _react['default'].createElement(_Button.Button, {
              type: 'submit',
              primary: true,
              label: 'Submit',
            }),
          ),
        ),
      ),
      getByPlaceholderText = _render4.getByPlaceholderText,
      getByText = _render4.getByText,
      queryByText = _render4.queryByText;

    _react2.fireEvent.click(getByText('Submit'));

    expect(queryByText('required')).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: '1',
      },
    });

    expect(queryByText('required')).toBeNull();
  });
  test('reset clears form', function() {
    var onReset = jest.fn();

    var _render5 = (0, _react2.render)(
        _react['default'].createElement(
          _Grommet.Grommet,
          null,
          _react['default'].createElement(
            _.Form,
            {
              onReset: onReset,
            },
            _react['default'].createElement(_FormField.FormField, {
              name: 'test',
              required: true,
              placeholder: 'test input',
            }),
            _react['default'].createElement(_Button.Button, {
              type: 'reset',
              primary: true,
              label: 'Reset',
            }),
          ),
        ),
      ),
      getByPlaceholderText = _render5.getByPlaceholderText,
      getByText = _render5.getByText,
      queryByText = _render5.queryByText;

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'Input has changed',
      },
    });

    _react2.fireEvent.click(getByText('Reset'));

    expect(queryByText('Input has changed')).toBeNull();
  });
  test('initial values', function() {
    var _onSubmit = jest.fn();

    var _render6 = (0, _react2.render)(
        _react['default'].createElement(
          _Grommet.Grommet,
          null,
          _react['default'].createElement(
            _.Form,
            {
              onSubmit: function onSubmit(_ref) {
                var value = _ref.value,
                  touched = _ref.touched;
                return _onSubmit({
                  value: value,
                  touched: touched,
                });
              },
            },
            _react['default'].createElement(_FormField.FormField, {
              name: 'test',
              required: true,
              placeholder: 'test input',
              value: 'Initial value',
            }),
            _react['default'].createElement(_FormField.FormField, {
              name: 'test2',
              value: 'Initial value2',
            }),
            _react['default'].createElement(_Button.Button, {
              type: 'submit',
              primary: true,
              label: 'Submit',
            }),
          ),
        ),
      ),
      getByText = _render6.getByText,
      queryByText = _render6.queryByText;

    _react2.fireEvent.click(getByText('Submit'));

    expect(queryByText('required')).toBeNull();
    expect(_onSubmit).toBeCalledWith(
      expect.objectContaining({
        value: {
          test: 'Initial value',
          test2: 'Initial value2',
        },
        touched: {},
      }),
    );
  });
  test('lazy value', function() {
    var _onSubmit2 = jest.fn();

    var Test = function Test() {
      var _React$useState = _react['default'].useState(),
        test = _React$useState[0],
        setTest = _React$useState[1];

      return _react['default'].createElement(
        _.Form,
        {
          onSubmit: function onSubmit(_ref2) {
            var value = _ref2.value,
              touched = _ref2.touched;
            return _onSubmit2({
              value: value,
              touched: touched,
            });
          },
        },
        _react['default'].createElement(_TextInput.TextInput, {
          name: 'test',
          value: test,
        }),
        _react['default'].createElement(_Button.Button, {
          label: 'set',
          onClick: function onClick() {
            return setTest('a');
          },
        }),
        _react['default'].createElement(_Button.Button, {
          label: 'submit',
          type: 'submit',
        }),
      );
    };

    var _render7 = (0, _react2.render)(
        _react['default'].createElement(
          _Grommet.Grommet,
          null,
          _react['default'].createElement(Test, null),
        ),
      ),
      container = _render7.container,
      getByText = _render7.getByText;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(getByText('set'));

    _react2.fireEvent.click(getByText('submit'));

    expect(_onSubmit2).toBeCalledWith(
      expect.objectContaining({
        value: {
          test: 'a',
        },
        touched: {
          test: true,
        },
      }),
    );
  });
});
