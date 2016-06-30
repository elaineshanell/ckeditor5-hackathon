define('tests', ['/ckeditor5/engine/model/delta/basic-transformations.js', '/ckeditor5/engine/model/delta/transform.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/delta/weakinsertdelta.js', '/ckeditor5/engine/model/delta/attributedelta.js', '/ckeditor5/engine/model/operation/insertoperation.js', '/ckeditor5/engine/model/operation/attributeoperation.js', '/tests/engine/model/delta/transform/_utils/utils.js'], function (_basicTransformations, _transform, _text, _position, _range, _weakinsertdelta, _attributedelta, _insertoperation, _attributeoperation, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, operation */

	'use strict';

	var _basicTransformations2 = _interopRequireDefault(_basicTransformations);

	var _transform2 = _interopRequireDefault(_transform);

	var _text2 = _interopRequireDefault(_text);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _weakinsertdelta2 = _interopRequireDefault(_weakinsertdelta);

	var _attributedelta2 = _interopRequireDefault(_attributedelta);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _attributeoperation2 = _interopRequireDefault(_attributeoperation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('transform', () => {
		let doc, root, baseVersion;

		beforeEach(() => {
			doc = (0, _utils.getFilledDocument)();
			root = doc.getRoot('root');
			baseVersion = doc.version;
		});

		describe('AttributeDelta by', () => {
			let insertDelta;

			beforeEach(() => {
				let insertPosition = new _position2.default(root, [3, 3, 0]);
				insertDelta = (0, _utils.getWeakInsertDelta)(insertPosition, ['a', new _text2.default('b', { key: 'new' }), new _text2.default('c', { key: 'different' }), 'de'], baseVersion);
			});

			describe('WeakInsertDelta', () => {
				it('weak insert inside attribute range should "fix" splitting the range', () => {
					let attrRange = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [3, 3, 3, 9]));
					let attrDelta = (0, _utils.getAttributeDelta)(attrRange, 'key', 'old', 'new', baseVersion);

					let transformed = (0, _transform2.default)(insertDelta, attrDelta);

					expect(transformed.length).to.equal(2);

					baseVersion = attrDelta.operations.length;

					(0, _utils.expectDelta)(transformed[0], {
						type: _weakinsertdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: new _position2.default(root, [3, 3, 0]),
							baseVersion: baseVersion
						}]
					});

					(0, _utils.expectDelta)(transformed[1], {
						type: _attributedelta2.default,
						operations: [{
							type: _attributeoperation2.default,
							range: new _range2.default(new _position2.default(root, [3, 3, 0]), new _position2.default(root, [3, 3, 1])),
							key: 'key',
							oldValue: undefined,
							newValue: 'new',
							baseVersion: baseVersion + 1
						}, {
							type: _attributeoperation2.default,
							range: new _range2.default(new _position2.default(root, [3, 3, 2]), new _position2.default(root, [3, 3, 3])),
							key: 'key',
							oldValue: 'different',
							newValue: 'new',
							baseVersion: baseVersion + 2
						}, {
							type: _attributeoperation2.default,
							range: new _range2.default(new _position2.default(root, [3, 3, 3]), new _position2.default(root, [3, 3, 5])),
							key: 'key',
							oldValue: undefined,
							newValue: 'new',
							baseVersion: baseVersion + 3
						}]
					});
				});

				it('should be normally transformed if weak insert is not in the attribute range', () => {
					let attrRange = new _range2.default(new _position2.default(root, [5]), new _position2.default(root, [7]));
					let attrDelta = (0, _utils.getAttributeDelta)(attrRange, 'key', 'old', 'new', baseVersion);

					let transformed = (0, _transform2.default)(insertDelta, attrDelta);

					expect(transformed.length).to.equal(1);

					baseVersion = attrDelta.operations.length;

					(0, _utils.expectDelta)(transformed[0], {
						type: _weakinsertdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: new _position2.default(root, [3, 3, 0]),
							baseVersion: baseVersion
						}]
					});
				});
			});
		});
	});
	/*jshint unused: false*/
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
