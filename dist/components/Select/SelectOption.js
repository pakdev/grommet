'use strict';

exports.__esModule = true;
exports.SelectOption = void 0;

var _react = _interopRequireDefault(require('react'));

var _Box = require('../Box');

var _Button = require('../Button');

var _hocs = require('../hocs');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function areEqual(prevProps, nextProps) {
  var active = prevProps.active,
    disabled = prevProps.disabled,
    option = prevProps.option,
    selected = prevProps.selected;
  var nextActive = nextProps.active,
    nextDisabled = nextProps.disabled,
    nextOption = nextProps.option,
    nextSelected = nextProps.selected;
  return (
    active === nextActive &&
    selected === nextSelected &&
    disabled === nextDisabled &&
    option === nextOption
  );
}

var SelectOption = _react['default'].memo(function(_ref) {
  var forwardRef = _ref.forwardRef,
    rest = _objectWithoutPropertiesLoose(_ref, ['forwardRef']);

  return _react['default'].createElement(
    _Box.Box,
    {
      flex: false,
    },
    _react['default'].createElement(
      _Button.Button,
      _extends(
        {
          tabIndex: '-1',
          ref: forwardRef,
          role: 'menuitem',
          hoverIndicator: 'background',
        },
        rest,
      ),
    ),
  );
}, areEqual);

var SelectOptionWrapper = (0, _hocs.withForwardRef)(SelectOption);
exports.SelectOption = SelectOptionWrapper;
