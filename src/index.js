/**!
 * Element Picker.
 * A JavaScript library that allows you to point and click to get the hovered element.
 * @author  James Bechet <jamesbechet@gmail.com>
 * @license MIT
 */

(function elementPickerModule(factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  }
  else if (typeof module != 'undefined' && typeof module.exports != 'undefined') {
    module.exports = factory();
  }
  else {
    window['elementPicker'] = factory();
  }
})(function elementPickerFactory() {

  if (typeof window === 'undefined' || !window.document) {
    console.error('elementPicker requires the window and document.');
  }

  var oldTarget;
  var oldBackgroundColor;
  var onClick;

  function onMouseMove(event) {

    event      = event || window.event;
    var target = event.target || event.srcElement;
    if (oldTarget) {
      resetOldTargetColor();
    }
    else {
      document.body.style.cursor = 'pointer';
    }
    oldTarget = target;
    oldBackgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';

  }

  function onMouseClick(event) {

    event      = event || window.event;
    var target = event.target || event.srcElement;
    onClick(target);
    reset();

  }

  function reset() {

    document.removeEventListener('mousemove', onMouseMove, false);
    document.body.style.cursor = 'auto';
    if (oldTarget) {
      resetOldTargetColor();
    }
    oldTarget = null;
    oldBackgroundColor = null;

  }

  function resetOldTargetColor() {
    oldTarget.style.backgroundColor = oldBackgroundColor
  }

  function init(options) {

    if (!options || !options.onClick) {
      console.error('onClick option needs to be specified.');
      return;
    }
    onClick = options.onClick;
    document.addEventListener('click', onMouseClick, false);
    document.addEventListener('mousemove', onMouseMove, false);

    return elementPicker;

  }

  /**
   * The library object.
   * @property {Function} init    - Function called to init the library.
   * @property {Function} onClick - The callback triggered once an element is clicked.
   * @property {String} version   - The library's version.
   * @type {Object}
   */
  var elementPicker     = {};
  elementPicker.version = '1.0.0';
  elementPicker.init    = init;

  return elementPicker;

});