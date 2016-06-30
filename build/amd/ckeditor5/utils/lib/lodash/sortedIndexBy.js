define(['exports', './_baseIteratee.js', './_baseSortedIndexBy.js'], function (exports, _baseIteratee, _baseSortedIndexBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _baseSortedIndexBy2 = _interopRequireDefault(_baseSortedIndexBy);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.sortedIndex` except that it accepts `iteratee`
   * which is invoked for `value` and each element of `array` to compute their
   * sort ranking. The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The sorted array to inspect.
   * @param {*} value The value to evaluate.
   * @param {Array|Function|Object|string} [iteratee=_.identity]
   *  The iteratee invoked per element.
   * @returns {number} Returns the index at which `value` should be inserted
   *  into `array`.
   * @example
   *
   * var dict = { 'thirty': 30, 'forty': 40, 'fifty': 50 };
   *
   * _.sortedIndexBy(['thirty', 'fifty'], 'forty', _.propertyOf(dict));
   * // => 1
   *
   * // The `_.property` iteratee shorthand.
   * _.sortedIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, 'x');
   * // => 0
   */
  function sortedIndexBy(array, value, iteratee) {
    return (0, _baseSortedIndexBy2.default)(array, value, (0, _baseIteratee2.default)(iteratee));
  }

  exports.default = sortedIndexBy;
});