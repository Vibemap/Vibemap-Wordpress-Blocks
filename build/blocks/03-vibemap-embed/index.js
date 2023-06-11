/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/03-vibemap-embed/index.js":
/*!**********************************************!*\
  !*** ./src/blocks/03-vibemap-embed/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/blocks/03-vibemap-embed/block.json");
/* harmony import */ var _components_Embed__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Embed */ "./src/components/Embed/index.js");
/* harmony import */ var _components_Filters__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Filters */ "./src/components/Filters/index.js");
/* harmony import */ var _components_Filters_useFilterState_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Filters/useFilterState.js */ "./src/components/Filters/useFilterState.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/03-vibemap-embed/editor.scss");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./style.css */ "./src/blocks/03-vibemap-embed/style.css");


// WordPress dependencies




const {
  InspectorControls
} = wp.blockEditor;

// Internal dependencies


// Components


// Hook for Filters state




// Editable UI and block attributes
const Edit = props => {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
  const {
    attributes
  } = props;
  const {
    cities,
    categories,
    tags,
    vibes
  } = attributes;

  // TODO: get all tags
  // List taxonomies: core.getTaxonomies()
  // Get site info: core.getSite()
  // core.getPlugin('vibemap')
  const tag_options = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const core = select('core');
    const tags_data = core.getEntityRecords('taxonomy', 'post_tag', {
      per_page: -1,
      page: 1
    });
    const tag_options = tags_data ? tags_data.map(tag => {
      /* TODO: can it be an object
      return {
      	...tag,
      	label: tag.name,
      	value: tag.id
      } */
      return tag.name;
    }) : [];
    return tag_options;
  });

  // Filters state, set by block attributes
  const filterState = (0,_components_Filters_useFilterState_js__WEBPACK_IMPORTED_MODULE_8__["default"])({
    cities,
    categories,
    tags: tag_options,
    vibes
  });
  const {
    selectedCities,
    selectedCategories,
    selectedTags,
    selectedVibes
  } = filterState;
  console.log('DEBUG: filterState in embed ', filterState, selectedCities);

  // Sync block attributes with filter state
  const cityDep = JSON.stringify(selectedCities);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    props.setAttributes({
      cities: selectedCities
    });
  }, [cityDep]);
  const catDep = JSON.stringify(selectedCategories);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    props.setAttributes({
      categories: selectedCategories
    });
  }, [catDep]);
  const vibeDep = JSON.stringify(selectedVibes);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    props.setAttributes({
      vibes: selectedVibes
    });
  }, [vibeDep]);
  const blockStyle = {
    padding: '20px',
    transform: 'scale(0.8)'
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(InspectorControls, {
    key: "inspector"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Filters__WEBPACK_IMPORTED_MODULE_7__["default"], filterState)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, blockProps, {
    style: blockStyle
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Filters__WEBPACK_IMPORTED_MODULE_7__["default"], filterState), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, "Select the list and map options in the block panel on the right."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Embed__WEBPACK_IMPORTED_MODULE_6__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    cities: selectedCities,
    categories: selectedCategories,
    vibes: selectedVibes
  }))));
};

// Preview in Gutenberg editor
const Save = props => {
  //const blockProps = useBlockProps.save({ style: blockStyle });
  const {
    attributes
  } = props;
  const {
    cities,
    categories,
    vibes
  } = attributes;
  console.log('DEBUG: got attributes ', attributes, ' in save');
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Embed__WEBPACK_IMPORTED_MODULE_6__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    cities: cities,
    categories: categories,
    vibes: vibes
  }));
};

// Destructure the json file to get the name and settings for the block
const {
  name,
  example
} = _block_json__WEBPACK_IMPORTED_MODULE_5__;

// Register the block
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)(name, {
  attributes: {
    "alignment": {
      "type": "string",
      "default": "none"
    },
    "class": {
      "type": "string",
      "default": example?.attributes?.class
    },
    "categories": {
      "type": "array",
      "default": example?.attributes?.categories
    },
    "cities": {
      "type": "array",
      "default": example?.attributes?.cities
    },
    "vibes": {
      "type": "array",
      "default": example?.attributes?.vibes
    },
    "content": {
      "type": "string",
      "source": "html",
      "selector": "p"
    }
  },
  edit: Edit,
  save: Save // Object shorthand property - same as writing: save: save,
});

/***/ }),

/***/ "./src/components/Embed/embed.js":
/*!***************************************!*\
  !*** ./src/components/Embed/embed.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Embed = _ref => {
  let {
    height = 500,
    domain = `https://vibemap.com`,
    path = `map`,
    // Emeded map options
    city = `peoria`,
    categories = [],
    vibes = [],
    ...props
  } = _ref;
  const is_dev = false;
  domain = is_dev ? `http://localhost:8080` : domain;
  console.log('Embed domain ', domain);
  const searchParams = new URLSearchParams({
    embedded: 1,
    placeLayout: 'both',
    cities: city,
    vibes: vibes
  });
  const src = `${domain}/${path}/?${searchParams}`;
  const iframe = `<iframe
            allowtransparency="true"
            allowfullscreen="true"
            frameborder="no"
            height=${height}
            onload="resizeIframe(this)"
            style="width: 100%;"
            scrolling="no"
            title="Vibemap Widget"
            src="${src}">
        </iframe>`;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `vibemap-embed ${path}`,
    style: {
      'height': height
    },
    dangerouslySetInnerHTML: {
      __html: iframe ? iframe : ""
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Embed);

/***/ }),

/***/ "./src/components/Embed/index.js":
/*!***************************************!*\
  !*** ./src/components/Embed/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _embed__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _embed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./embed */ "./src/components/Embed/embed.js");


/***/ }),

/***/ "./src/components/Filters/filters.js":
/*!*******************************************!*\
  !*** ./src/components/Filters/filters.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);




// Props set from useFilterState
const Filters = _ref => {
  let {
    categories,
    category_slugs,
    city_slugs,
    vibes_slugs,
    selectedCities,
    selectedCategories,
    selectedTags,
    selectedVibes,
    setSelectedCities,
    setSelectedCategories,
    setSelectedTags,
    setSelectedVibes,
    tags = [],
    ...props
  } = _ref;
  const activityPicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    __experimentalAutoSelectFirstMatch: true,
    __experimentalExpandOnFocus: true,
    label: "Type a category",
    onChange: tokens => setSelectedCategories(tokens),
    suggestions: category_slugs,
    value: selectedCategories
  });
  const cityPicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    __experimentalAutoSelectFirstMatch: true,
    __experimentalExpandOnFocus: true,
    label: "Type a city",
    onChange: tokens => setSelectedCities(tokens),
    suggestions: city_slugs,
    value: selectedCities
  });
  console.log('DEBUG tags: ', tags);
  const tagPicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    __experimentalAutoSelectFirstMatch: true,
    __experimentalExpandOnFocus: true,
    label: "Type a tag",
    onChange: tokens => setSelectedTags(tokens),
    suggestions: tags,
    value: selectedTags
  });
  const vibePicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    __experimentalAutoSelectFirstMatch: true,
    __experimentalExpandOnFocus: true,
    label: "Type a vibe",
    onChange: tokens => setSelectedVibes(tokens),
    suggestions: vibes_slugs,
    value: selectedVibes
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, activityPicker, cityPicker, vibePicker, tagPicker);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Filters);

/***/ }),

/***/ "./src/components/Filters/index.js":
/*!*****************************************!*\
  !*** ./src/components/Filters/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _filters__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _filters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filters */ "./src/components/Filters/filters.js");


/***/ }),

/***/ "./src/components/Filters/useFilterState.js":
/*!**************************************************!*\
  !*** ./src/components/Filters/useFilterState.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vibemap_constants_dist_activityCategories_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vibemap-constants/dist/activityCategories.json */ "./node_modules/vibemap-constants/dist/activityCategories.json");
/* harmony import */ var vibemap_constants_dist_cities_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vibemap-constants/dist/cities.json */ "./node_modules/vibemap-constants/dist/cities.json");
/* harmony import */ var vibemap_constants_dist_vibes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vibemap-constants/dist/vibes.js */ "./node_modules/vibemap-constants/dist/vibes.js");





const categories1 = (0,vibemap_constants_dist_vibes_js__WEBPACK_IMPORTED_MODULE_4__.getCategoriesByLevel)(1);
const categories2 = (0,vibemap_constants_dist_vibes_js__WEBPACK_IMPORTED_MODULE_4__.getCategoriesByLevel)(2);
const categories_all = categories1.concat(categories2);
const category_slugs = vibemap_constants_dist_activityCategories_json__WEBPACK_IMPORTED_MODULE_2__.activityCategories.map(cat => cat.slug);
const city_slugs = vibemap_constants_dist_cities_json__WEBPACK_IMPORTED_MODULE_3__.map(city => city.slug);
const vibes_slugs = (0,vibemap_constants_dist_vibes_js__WEBPACK_IMPORTED_MODULE_4__.getVibes)();

// Initial state is set in the block.json file
// Or the current state of the block attributes
const useFilterState = _ref => {
  let {
    cities = [],
    categories = [],
    tags = [],
    vibes = [],
    ...props
  } = _ref;
  console.log('DEBUG useFilterState: ', cities, categories, tags, vibes);
  const [selectedCities, setSelectedCities] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(cities);
  const [selectedCategories, setSelectedCategories] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(categories);
  const [selectedTags, setSelectedTags] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(tags);
  const [selectedVibes, setSelectedVibes] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(vibes);
  return {
    // Data
    categories_all,
    category_slugs,
    city_slugs,
    tags,
    vibes_slugs,
    // Getters
    selectedCities,
    selectedCategories,
    selectedVibes,
    // Seters   
    setSelectedCities,
    setSelectedCategories,
    setSelectedTags,
    setSelectedVibes
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useFilterState);

/***/ }),

/***/ "./node_modules/fuse.js/dist/fuse.esm.js":
/*!***********************************************!*\
  !*** ./node_modules/fuse.js/dist/fuse.esm.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Fuse)
/* harmony export */ });
/**
 * Fuse.js v6.6.2 - Lightweight fuzzy-search (http://fusejs.io)
 *
 * Copyright (c) 2022 Kiro Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

function isArray(value) {
  return !Array.isArray
    ? getTag(value) === '[object Array]'
    : Array.isArray(value)
}

// Adapted from: https://github.com/lodash/lodash/blob/master/.internal/baseToString.js
const INFINITY = 1 / 0;
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value
  }
  let result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result
}

function toString(value) {
  return value == null ? '' : baseToString(value)
}

function isString(value) {
  return typeof value === 'string'
}

function isNumber(value) {
  return typeof value === 'number'
}

// Adapted from: https://github.com/lodash/lodash/blob/master/isBoolean.js
function isBoolean(value) {
  return (
    value === true ||
    value === false ||
    (isObjectLike(value) && getTag(value) == '[object Boolean]')
  )
}

function isObject(value) {
  return typeof value === 'object'
}

// Checks if `value` is object-like.
function isObjectLike(value) {
  return isObject(value) && value !== null
}

function isDefined(value) {
  return value !== undefined && value !== null
}

function isBlank(value) {
  return !value.trim().length
}

// Gets the `toStringTag` of `value`.
// Adapted from: https://github.com/lodash/lodash/blob/master/.internal/getTag.js
function getTag(value) {
  return value == null
    ? value === undefined
      ? '[object Undefined]'
      : '[object Null]'
    : Object.prototype.toString.call(value)
}

const EXTENDED_SEARCH_UNAVAILABLE = 'Extended search is not available';

const INCORRECT_INDEX_TYPE = "Incorrect 'index' type";

const LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) =>
  `Invalid value for key ${key}`;

const PATTERN_LENGTH_TOO_LARGE = (max) =>
  `Pattern length exceeds max of ${max}.`;

const MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;

const INVALID_KEY_WEIGHT_VALUE = (key) =>
  `Property 'weight' in key '${key}' must be a positive integer`;

const hasOwn = Object.prototype.hasOwnProperty;

class KeyStore {
  constructor(keys) {
    this._keys = [];
    this._keyMap = {};

    let totalWeight = 0;

    keys.forEach((key) => {
      let obj = createKey(key);

      totalWeight += obj.weight;

      this._keys.push(obj);
      this._keyMap[obj.id] = obj;

      totalWeight += obj.weight;
    });

    // Normalize weights so that their sum is equal to 1
    this._keys.forEach((key) => {
      key.weight /= totalWeight;
    });
  }
  get(keyId) {
    return this._keyMap[keyId]
  }
  keys() {
    return this._keys
  }
  toJSON() {
    return JSON.stringify(this._keys)
  }
}

function createKey(key) {
  let path = null;
  let id = null;
  let src = null;
  let weight = 1;
  let getFn = null;

  if (isString(key) || isArray(key)) {
    src = key;
    path = createKeyPath(key);
    id = createKeyId(key);
  } else {
    if (!hasOwn.call(key, 'name')) {
      throw new Error(MISSING_KEY_PROPERTY('name'))
    }

    const name = key.name;
    src = name;

    if (hasOwn.call(key, 'weight')) {
      weight = key.weight;

      if (weight <= 0) {
        throw new Error(INVALID_KEY_WEIGHT_VALUE(name))
      }
    }

    path = createKeyPath(name);
    id = createKeyId(name);
    getFn = key.getFn;
  }

  return { path, id, weight, src, getFn }
}

function createKeyPath(key) {
  return isArray(key) ? key : key.split('.')
}

function createKeyId(key) {
  return isArray(key) ? key.join('.') : key
}

function get(obj, path) {
  let list = [];
  let arr = false;

  const deepGet = (obj, path, index) => {
    if (!isDefined(obj)) {
      return
    }
    if (!path[index]) {
      // If there's no path left, we've arrived at the object we care about.
      list.push(obj);
    } else {
      let key = path[index];

      const value = obj[key];

      if (!isDefined(value)) {
        return
      }

      // If we're at the last value in the path, and if it's a string/number/bool,
      // add it to the list
      if (
        index === path.length - 1 &&
        (isString(value) || isNumber(value) || isBoolean(value))
      ) {
        list.push(toString(value));
      } else if (isArray(value)) {
        arr = true;
        // Search each item in the array.
        for (let i = 0, len = value.length; i < len; i += 1) {
          deepGet(value[i], path, index + 1);
        }
      } else if (path.length) {
        // An object. Recurse further.
        deepGet(value, path, index + 1);
      }
    }
  };

  // Backwards compatibility (since path used to be a string)
  deepGet(obj, isString(path) ? path.split('.') : path, 0);

  return arr ? list : list[0]
}

const MatchOptions = {
  // Whether the matches should be included in the result set. When `true`, each record in the result
  // set will include the indices of the matched characters.
  // These can consequently be used for highlighting purposes.
  includeMatches: false,
  // When `true`, the matching function will continue to the end of a search pattern even if
  // a perfect match has already been located in the string.
  findAllMatches: false,
  // Minimum number of characters that must be matched before a result is considered a match
  minMatchCharLength: 1
};

const BasicOptions = {
  // When `true`, the algorithm continues searching to the end of the input even if a perfect
  // match is found before the end of the same input.
  isCaseSensitive: false,
  // When true, the matching function will continue to the end of a search pattern even if
  includeScore: false,
  // List of properties that will be searched. This also supports nested properties.
  keys: [],
  // Whether to sort the result list, by score
  shouldSort: true,
  // Default sort function: sort by ascending score, ascending index
  sortFn: (a, b) =>
    a.score === b.score ? (a.idx < b.idx ? -1 : 1) : a.score < b.score ? -1 : 1
};

const FuzzyOptions = {
  // Approximately where in the text is the pattern expected to be found?
  location: 0,
  // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
  // (of both letters and location), a threshold of '1.0' would match anything.
  threshold: 0.6,
  // Determines how close the match must be to the fuzzy location (specified above).
  // An exact letter match which is 'distance' characters away from the fuzzy location
  // would score as a complete mismatch. A distance of '0' requires the match be at
  // the exact location specified, a threshold of '1000' would require a perfect match
  // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
  distance: 100
};

const AdvancedOptions = {
  // When `true`, it enables the use of unix-like search commands
  useExtendedSearch: false,
  // The get function to use when fetching an object's properties.
  // The default will search nested paths *ie foo.bar.baz*
  getFn: get,
  // When `true`, search will ignore `location` and `distance`, so it won't matter
  // where in the string the pattern appears.
  // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
  ignoreLocation: false,
  // When `true`, the calculation for the relevance score (used for sorting) will
  // ignore the field-length norm.
  // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
  ignoreFieldNorm: false,
  // The weight to determine how much field length norm effects scoring.
  fieldNormWeight: 1
};

var Config = {
  ...BasicOptions,
  ...MatchOptions,
  ...FuzzyOptions,
  ...AdvancedOptions
};

const SPACE = /[^ ]+/g;

// Field-length norm: the shorter the field, the higher the weight.
// Set to 3 decimals to reduce index size.
function norm(weight = 1, mantissa = 3) {
  const cache = new Map();
  const m = Math.pow(10, mantissa);

  return {
    get(value) {
      const numTokens = value.match(SPACE).length;

      if (cache.has(numTokens)) {
        return cache.get(numTokens)
      }

      // Default function is 1/sqrt(x), weight makes that variable
      const norm = 1 / Math.pow(numTokens, 0.5 * weight);

      // In place of `toFixed(mantissa)`, for faster computation
      const n = parseFloat(Math.round(norm * m) / m);

      cache.set(numTokens, n);

      return n
    },
    clear() {
      cache.clear();
    }
  }
}

class FuseIndex {
  constructor({
    getFn = Config.getFn,
    fieldNormWeight = Config.fieldNormWeight
  } = {}) {
    this.norm = norm(fieldNormWeight, 3);
    this.getFn = getFn;
    this.isCreated = false;

    this.setIndexRecords();
  }
  setSources(docs = []) {
    this.docs = docs;
  }
  setIndexRecords(records = []) {
    this.records = records;
  }
  setKeys(keys = []) {
    this.keys = keys;
    this._keysMap = {};
    keys.forEach((key, idx) => {
      this._keysMap[key.id] = idx;
    });
  }
  create() {
    if (this.isCreated || !this.docs.length) {
      return
    }

    this.isCreated = true;

    // List is Array<String>
    if (isString(this.docs[0])) {
      this.docs.forEach((doc, docIndex) => {
        this._addString(doc, docIndex);
      });
    } else {
      // List is Array<Object>
      this.docs.forEach((doc, docIndex) => {
        this._addObject(doc, docIndex);
      });
    }

    this.norm.clear();
  }
  // Adds a doc to the end of the index
  add(doc) {
    const idx = this.size();

    if (isString(doc)) {
      this._addString(doc, idx);
    } else {
      this._addObject(doc, idx);
    }
  }
  // Removes the doc at the specified index of the index
  removeAt(idx) {
    this.records.splice(idx, 1);

    // Change ref index of every subsquent doc
    for (let i = idx, len = this.size(); i < len; i += 1) {
      this.records[i].i -= 1;
    }
  }
  getValueForItemAtKeyId(item, keyId) {
    return item[this._keysMap[keyId]]
  }
  size() {
    return this.records.length
  }
  _addString(doc, docIndex) {
    if (!isDefined(doc) || isBlank(doc)) {
      return
    }

    let record = {
      v: doc,
      i: docIndex,
      n: this.norm.get(doc)
    };

    this.records.push(record);
  }
  _addObject(doc, docIndex) {
    let record = { i: docIndex, $: {} };

    // Iterate over every key (i.e, path), and fetch the value at that key
    this.keys.forEach((key, keyIndex) => {
      let value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);

      if (!isDefined(value)) {
        return
      }

      if (isArray(value)) {
        let subRecords = [];
        const stack = [{ nestedArrIndex: -1, value }];

        while (stack.length) {
          const { nestedArrIndex, value } = stack.pop();

          if (!isDefined(value)) {
            continue
          }

          if (isString(value) && !isBlank(value)) {
            let subRecord = {
              v: value,
              i: nestedArrIndex,
              n: this.norm.get(value)
            };

            subRecords.push(subRecord);
          } else if (isArray(value)) {
            value.forEach((item, k) => {
              stack.push({
                nestedArrIndex: k,
                value: item
              });
            });
          } else ;
        }
        record.$[keyIndex] = subRecords;
      } else if (isString(value) && !isBlank(value)) {
        let subRecord = {
          v: value,
          n: this.norm.get(value)
        };

        record.$[keyIndex] = subRecord;
      }
    });

    this.records.push(record);
  }
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    }
  }
}

function createIndex(
  keys,
  docs,
  { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}
) {
  const myIndex = new FuseIndex({ getFn, fieldNormWeight });
  myIndex.setKeys(keys.map(createKey));
  myIndex.setSources(docs);
  myIndex.create();
  return myIndex
}

function parseIndex(
  data,
  { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}
) {
  const { keys, records } = data;
  const myIndex = new FuseIndex({ getFn, fieldNormWeight });
  myIndex.setKeys(keys);
  myIndex.setIndexRecords(records);
  return myIndex
}

function computeScore$1(
  pattern,
  {
    errors = 0,
    currentLocation = 0,
    expectedLocation = 0,
    distance = Config.distance,
    ignoreLocation = Config.ignoreLocation
  } = {}
) {
  const accuracy = errors / pattern.length;

  if (ignoreLocation) {
    return accuracy
  }

  const proximity = Math.abs(expectedLocation - currentLocation);

  if (!distance) {
    // Dodge divide by zero error.
    return proximity ? 1.0 : accuracy
  }

  return accuracy + proximity / distance
}

function convertMaskToIndices(
  matchmask = [],
  minMatchCharLength = Config.minMatchCharLength
) {
  let indices = [];
  let start = -1;
  let end = -1;
  let i = 0;

  for (let len = matchmask.length; i < len; i += 1) {
    let match = matchmask[i];
    if (match && start === -1) {
      start = i;
    } else if (!match && start !== -1) {
      end = i - 1;
      if (end - start + 1 >= minMatchCharLength) {
        indices.push([start, end]);
      }
      start = -1;
    }
  }

  // (i-1 - start) + 1 => i - start
  if (matchmask[i - 1] && i - start >= minMatchCharLength) {
    indices.push([start, i - 1]);
  }

  return indices
}

// Machine word size
const MAX_BITS = 32;

function search(
  text,
  pattern,
  patternAlphabet,
  {
    location = Config.location,
    distance = Config.distance,
    threshold = Config.threshold,
    findAllMatches = Config.findAllMatches,
    minMatchCharLength = Config.minMatchCharLength,
    includeMatches = Config.includeMatches,
    ignoreLocation = Config.ignoreLocation
  } = {}
) {
  if (pattern.length > MAX_BITS) {
    throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS))
  }

  const patternLen = pattern.length;
  // Set starting location at beginning text and initialize the alphabet.
  const textLen = text.length;
  // Handle the case when location > text.length
  const expectedLocation = Math.max(0, Math.min(location, textLen));
  // Highest score beyond which we give up.
  let currentThreshold = threshold;
  // Is there a nearby exact match? (speedup)
  let bestLocation = expectedLocation;

  // Performance: only computer matches when the minMatchCharLength > 1
  // OR if `includeMatches` is true.
  const computeMatches = minMatchCharLength > 1 || includeMatches;
  // A mask of the matches, used for building the indices
  const matchMask = computeMatches ? Array(textLen) : [];

  let index;

  // Get all exact matches, here for speed up
  while ((index = text.indexOf(pattern, bestLocation)) > -1) {
    let score = computeScore$1(pattern, {
      currentLocation: index,
      expectedLocation,
      distance,
      ignoreLocation
    });

    currentThreshold = Math.min(score, currentThreshold);
    bestLocation = index + patternLen;

    if (computeMatches) {
      let i = 0;
      while (i < patternLen) {
        matchMask[index + i] = 1;
        i += 1;
      }
    }
  }

  // Reset the best location
  bestLocation = -1;

  let lastBitArr = [];
  let finalScore = 1;
  let binMax = patternLen + textLen;

  const mask = 1 << (patternLen - 1);

  for (let i = 0; i < patternLen; i += 1) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from the match location we can stray
    // at this error level.
    let binMin = 0;
    let binMid = binMax;

    while (binMin < binMid) {
      const score = computeScore$1(pattern, {
        errors: i,
        currentLocation: expectedLocation + binMid,
        expectedLocation,
        distance,
        ignoreLocation
      });

      if (score <= currentThreshold) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }

      binMid = Math.floor((binMax - binMin) / 2 + binMin);
    }

    // Use the result from this iteration as the maximum for the next.
    binMax = binMid;

    let start = Math.max(1, expectedLocation - binMid + 1);
    let finish = findAllMatches
      ? textLen
      : Math.min(expectedLocation + binMid, textLen) + patternLen;

    // Initialize the bit array
    let bitArr = Array(finish + 2);

    bitArr[finish + 1] = (1 << i) - 1;

    for (let j = finish; j >= start; j -= 1) {
      let currentLocation = j - 1;
      let charMatch = patternAlphabet[text.charAt(currentLocation)];

      if (computeMatches) {
        // Speed up: quick bool to int conversion (i.e, `charMatch ? 1 : 0`)
        matchMask[currentLocation] = +!!charMatch;
      }

      // First pass: exact match
      bitArr[j] = ((bitArr[j + 1] << 1) | 1) & charMatch;

      // Subsequent passes: fuzzy match
      if (i) {
        bitArr[j] |=
          ((lastBitArr[j + 1] | lastBitArr[j]) << 1) | 1 | lastBitArr[j + 1];
      }

      if (bitArr[j] & mask) {
        finalScore = computeScore$1(pattern, {
          errors: i,
          currentLocation,
          expectedLocation,
          distance,
          ignoreLocation
        });

        // This match will almost certainly be better than any existing match.
        // But check anyway.
        if (finalScore <= currentThreshold) {
          // Indeed it is
          currentThreshold = finalScore;
          bestLocation = currentLocation;

          // Already passed `loc`, downhill from here on in.
          if (bestLocation <= expectedLocation) {
            break
          }

          // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
          start = Math.max(1, 2 * expectedLocation - bestLocation);
        }
      }
    }

    // No hope for a (better) match at greater error levels.
    const score = computeScore$1(pattern, {
      errors: i + 1,
      currentLocation: expectedLocation,
      expectedLocation,
      distance,
      ignoreLocation
    });

    if (score > currentThreshold) {
      break
    }

    lastBitArr = bitArr;
  }

  const result = {
    isMatch: bestLocation >= 0,
    // Count exact matches (those with a score of 0) to be "almost" exact
    score: Math.max(0.001, finalScore)
  };

  if (computeMatches) {
    const indices = convertMaskToIndices(matchMask, minMatchCharLength);
    if (!indices.length) {
      result.isMatch = false;
    } else if (includeMatches) {
      result.indices = indices;
    }
  }

  return result
}

function createPatternAlphabet(pattern) {
  let mask = {};

  for (let i = 0, len = pattern.length; i < len; i += 1) {
    const char = pattern.charAt(i);
    mask[char] = (mask[char] || 0) | (1 << (len - i - 1));
  }

  return mask
}

class BitapSearch {
  constructor(
    pattern,
    {
      location = Config.location,
      threshold = Config.threshold,
      distance = Config.distance,
      includeMatches = Config.includeMatches,
      findAllMatches = Config.findAllMatches,
      minMatchCharLength = Config.minMatchCharLength,
      isCaseSensitive = Config.isCaseSensitive,
      ignoreLocation = Config.ignoreLocation
    } = {}
  ) {
    this.options = {
      location,
      threshold,
      distance,
      includeMatches,
      findAllMatches,
      minMatchCharLength,
      isCaseSensitive,
      ignoreLocation
    };

    this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();

    this.chunks = [];

    if (!this.pattern.length) {
      return
    }

    const addChunk = (pattern, startIndex) => {
      this.chunks.push({
        pattern,
        alphabet: createPatternAlphabet(pattern),
        startIndex
      });
    };

    const len = this.pattern.length;

    if (len > MAX_BITS) {
      let i = 0;
      const remainder = len % MAX_BITS;
      const end = len - remainder;

      while (i < end) {
        addChunk(this.pattern.substr(i, MAX_BITS), i);
        i += MAX_BITS;
      }

      if (remainder) {
        const startIndex = len - MAX_BITS;
        addChunk(this.pattern.substr(startIndex), startIndex);
      }
    } else {
      addChunk(this.pattern, 0);
    }
  }

  searchIn(text) {
    const { isCaseSensitive, includeMatches } = this.options;

    if (!isCaseSensitive) {
      text = text.toLowerCase();
    }

    // Exact match
    if (this.pattern === text) {
      let result = {
        isMatch: true,
        score: 0
      };

      if (includeMatches) {
        result.indices = [[0, text.length - 1]];
      }

      return result
    }

    // Otherwise, use Bitap algorithm
    const {
      location,
      distance,
      threshold,
      findAllMatches,
      minMatchCharLength,
      ignoreLocation
    } = this.options;

    let allIndices = [];
    let totalScore = 0;
    let hasMatches = false;

    this.chunks.forEach(({ pattern, alphabet, startIndex }) => {
      const { isMatch, score, indices } = search(text, pattern, alphabet, {
        location: location + startIndex,
        distance,
        threshold,
        findAllMatches,
        minMatchCharLength,
        includeMatches,
        ignoreLocation
      });

      if (isMatch) {
        hasMatches = true;
      }

      totalScore += score;

      if (isMatch && indices) {
        allIndices = [...allIndices, ...indices];
      }
    });

    let result = {
      isMatch: hasMatches,
      score: hasMatches ? totalScore / this.chunks.length : 1
    };

    if (hasMatches && includeMatches) {
      result.indices = allIndices;
    }

    return result
  }
}

class BaseMatch {
  constructor(pattern) {
    this.pattern = pattern;
  }
  static isMultiMatch(pattern) {
    return getMatch(pattern, this.multiRegex)
  }
  static isSingleMatch(pattern) {
    return getMatch(pattern, this.singleRegex)
  }
  search(/*text*/) {}
}

function getMatch(pattern, exp) {
  const matches = pattern.match(exp);
  return matches ? matches[1] : null
}

// Token: 'file

class ExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'exact'
  }
  static get multiRegex() {
    return /^="(.*)"$/
  }
  static get singleRegex() {
    return /^=(.*)$/
  }
  search(text) {
    const isMatch = text === this.pattern;

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    }
  }
}

// Token: !fire

class InverseExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'inverse-exact'
  }
  static get multiRegex() {
    return /^!"(.*)"$/
  }
  static get singleRegex() {
    return /^!(.*)$/
  }
  search(text) {
    const index = text.indexOf(this.pattern);
    const isMatch = index === -1;

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    }
  }
}

// Token: ^file

class PrefixExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'prefix-exact'
  }
  static get multiRegex() {
    return /^\^"(.*)"$/
  }
  static get singleRegex() {
    return /^\^(.*)$/
  }
  search(text) {
    const isMatch = text.startsWith(this.pattern);

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    }
  }
}

// Token: !^fire

class InversePrefixExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'inverse-prefix-exact'
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/
  }
  static get singleRegex() {
    return /^!\^(.*)$/
  }
  search(text) {
    const isMatch = !text.startsWith(this.pattern);

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    }
  }
}

// Token: .file$

class SuffixExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'suffix-exact'
  }
  static get multiRegex() {
    return /^"(.*)"\$$/
  }
  static get singleRegex() {
    return /^(.*)\$$/
  }
  search(text) {
    const isMatch = text.endsWith(this.pattern);

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [text.length - this.pattern.length, text.length - 1]
    }
  }
}

// Token: !.file$

class InverseSuffixExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'inverse-suffix-exact'
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/
  }
  static get singleRegex() {
    return /^!(.*)\$$/
  }
  search(text) {
    const isMatch = !text.endsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    }
  }
}

class FuzzyMatch extends BaseMatch {
  constructor(
    pattern,
    {
      location = Config.location,
      threshold = Config.threshold,
      distance = Config.distance,
      includeMatches = Config.includeMatches,
      findAllMatches = Config.findAllMatches,
      minMatchCharLength = Config.minMatchCharLength,
      isCaseSensitive = Config.isCaseSensitive,
      ignoreLocation = Config.ignoreLocation
    } = {}
  ) {
    super(pattern);
    this._bitapSearch = new BitapSearch(pattern, {
      location,
      threshold,
      distance,
      includeMatches,
      findAllMatches,
      minMatchCharLength,
      isCaseSensitive,
      ignoreLocation
    });
  }
  static get type() {
    return 'fuzzy'
  }
  static get multiRegex() {
    return /^"(.*)"$/
  }
  static get singleRegex() {
    return /^(.*)$/
  }
  search(text) {
    return this._bitapSearch.searchIn(text)
  }
}

// Token: 'file

class IncludeMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'include'
  }
  static get multiRegex() {
    return /^'"(.*)"$/
  }
  static get singleRegex() {
    return /^'(.*)$/
  }
  search(text) {
    let location = 0;
    let index;

    const indices = [];
    const patternLen = this.pattern.length;

    // Get all exact matches
    while ((index = text.indexOf(this.pattern, location)) > -1) {
      location = index + patternLen;
      indices.push([index, location - 1]);
    }

    const isMatch = !!indices.length;

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices
    }
  }
}

// ❗Order is important. DO NOT CHANGE.
const searchers = [
  ExactMatch,
  IncludeMatch,
  PrefixExactMatch,
  InversePrefixExactMatch,
  InverseSuffixExactMatch,
  SuffixExactMatch,
  InverseExactMatch,
  FuzzyMatch
];

const searchersLen = searchers.length;

// Regex to split by spaces, but keep anything in quotes together
const SPACE_RE = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
const OR_TOKEN = '|';

// Return a 2D array representation of the query, for simpler parsing.
// Example:
// "^core go$ | rb$ | py$ xy$" => [["^core", "go$"], ["rb$"], ["py$", "xy$"]]
function parseQuery(pattern, options = {}) {
  return pattern.split(OR_TOKEN).map((item) => {
    let query = item
      .trim()
      .split(SPACE_RE)
      .filter((item) => item && !!item.trim());

    let results = [];
    for (let i = 0, len = query.length; i < len; i += 1) {
      const queryItem = query[i];

      // 1. Handle multiple query match (i.e, once that are quoted, like `"hello world"`)
      let found = false;
      let idx = -1;
      while (!found && ++idx < searchersLen) {
        const searcher = searchers[idx];
        let token = searcher.isMultiMatch(queryItem);
        if (token) {
          results.push(new searcher(token, options));
          found = true;
        }
      }

      if (found) {
        continue
      }

      // 2. Handle single query matches (i.e, once that are *not* quoted)
      idx = -1;
      while (++idx < searchersLen) {
        const searcher = searchers[idx];
        let token = searcher.isSingleMatch(queryItem);
        if (token) {
          results.push(new searcher(token, options));
          break
        }
      }
    }

    return results
  })
}

// These extended matchers can return an array of matches, as opposed
// to a singl match
const MultiMatchSet = new Set([FuzzyMatch.type, IncludeMatch.type]);

/**
 * Command-like searching
 * ======================
 *
 * Given multiple search terms delimited by spaces.e.g. `^jscript .python$ ruby !java`,
 * search in a given text.
 *
 * Search syntax:
 *
 * | Token       | Match type                 | Description                            |
 * | ----------- | -------------------------- | -------------------------------------- |
 * | `jscript`   | fuzzy-match                | Items that fuzzy match `jscript`       |
 * | `=scheme`   | exact-match                | Items that are `scheme`                |
 * | `'python`   | include-match              | Items that include `python`            |
 * | `!ruby`     | inverse-exact-match        | Items that do not include `ruby`       |
 * | `^java`     | prefix-exact-match         | Items that start with `java`           |
 * | `!^earlang` | inverse-prefix-exact-match | Items that do not start with `earlang` |
 * | `.js$`      | suffix-exact-match         | Items that end with `.js`              |
 * | `!.go$`     | inverse-suffix-exact-match | Items that do not end with `.go`       |
 *
 * A single pipe character acts as an OR operator. For example, the following
 * query matches entries that start with `core` and end with either`go`, `rb`,
 * or`py`.
 *
 * ```
 * ^core go$ | rb$ | py$
 * ```
 */
class ExtendedSearch {
  constructor(
    pattern,
    {
      isCaseSensitive = Config.isCaseSensitive,
      includeMatches = Config.includeMatches,
      minMatchCharLength = Config.minMatchCharLength,
      ignoreLocation = Config.ignoreLocation,
      findAllMatches = Config.findAllMatches,
      location = Config.location,
      threshold = Config.threshold,
      distance = Config.distance
    } = {}
  ) {
    this.query = null;
    this.options = {
      isCaseSensitive,
      includeMatches,
      minMatchCharLength,
      findAllMatches,
      ignoreLocation,
      location,
      threshold,
      distance
    };

    this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
    this.query = parseQuery(this.pattern, this.options);
  }

  static condition(_, options) {
    return options.useExtendedSearch
  }

  searchIn(text) {
    const query = this.query;

    if (!query) {
      return {
        isMatch: false,
        score: 1
      }
    }

    const { includeMatches, isCaseSensitive } = this.options;

    text = isCaseSensitive ? text : text.toLowerCase();

    let numMatches = 0;
    let allIndices = [];
    let totalScore = 0;

    // ORs
    for (let i = 0, qLen = query.length; i < qLen; i += 1) {
      const searchers = query[i];

      // Reset indices
      allIndices.length = 0;
      numMatches = 0;

      // ANDs
      for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
        const searcher = searchers[j];
        const { isMatch, indices, score } = searcher.search(text);

        if (isMatch) {
          numMatches += 1;
          totalScore += score;
          if (includeMatches) {
            const type = searcher.constructor.type;
            if (MultiMatchSet.has(type)) {
              allIndices = [...allIndices, ...indices];
            } else {
              allIndices.push(indices);
            }
          }
        } else {
          totalScore = 0;
          numMatches = 0;
          allIndices.length = 0;
          break
        }
      }

      // OR condition, so if TRUE, return
      if (numMatches) {
        let result = {
          isMatch: true,
          score: totalScore / numMatches
        };

        if (includeMatches) {
          result.indices = allIndices;
        }

        return result
      }
    }

    // Nothing was matched
    return {
      isMatch: false,
      score: 1
    }
  }
}

const registeredSearchers = [];

function register(...args) {
  registeredSearchers.push(...args);
}

function createSearcher(pattern, options) {
  for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
    let searcherClass = registeredSearchers[i];
    if (searcherClass.condition(pattern, options)) {
      return new searcherClass(pattern, options)
    }
  }

  return new BitapSearch(pattern, options)
}

const LogicalOperator = {
  AND: '$and',
  OR: '$or'
};

const KeyType = {
  PATH: '$path',
  PATTERN: '$val'
};

const isExpression = (query) =>
  !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);

const isPath = (query) => !!query[KeyType.PATH];

const isLeaf = (query) =>
  !isArray(query) && isObject(query) && !isExpression(query);

const convertToExplicit = (query) => ({
  [LogicalOperator.AND]: Object.keys(query).map((key) => ({
    [key]: query[key]
  }))
});

// When `auto` is `true`, the parse function will infer and initialize and add
// the appropriate `Searcher` instance
function parse(query, options, { auto = true } = {}) {
  const next = (query) => {
    let keys = Object.keys(query);

    const isQueryPath = isPath(query);

    if (!isQueryPath && keys.length > 1 && !isExpression(query)) {
      return next(convertToExplicit(query))
    }

    if (isLeaf(query)) {
      const key = isQueryPath ? query[KeyType.PATH] : keys[0];

      const pattern = isQueryPath ? query[KeyType.PATTERN] : query[key];

      if (!isString(pattern)) {
        throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key))
      }

      const obj = {
        keyId: createKeyId(key),
        pattern
      };

      if (auto) {
        obj.searcher = createSearcher(pattern, options);
      }

      return obj
    }

    let node = {
      children: [],
      operator: keys[0]
    };

    keys.forEach((key) => {
      const value = query[key];

      if (isArray(value)) {
        value.forEach((item) => {
          node.children.push(next(item));
        });
      }
    });

    return node
  };

  if (!isExpression(query)) {
    query = convertToExplicit(query);
  }

  return next(query)
}

// Practical scoring function
function computeScore(
  results,
  { ignoreFieldNorm = Config.ignoreFieldNorm }
) {
  results.forEach((result) => {
    let totalScore = 1;

    result.matches.forEach(({ key, norm, score }) => {
      const weight = key ? key.weight : null;

      totalScore *= Math.pow(
        score === 0 && weight ? Number.EPSILON : score,
        (weight || 1) * (ignoreFieldNorm ? 1 : norm)
      );
    });

    result.score = totalScore;
  });
}

function transformMatches(result, data) {
  const matches = result.matches;
  data.matches = [];

  if (!isDefined(matches)) {
    return
  }

  matches.forEach((match) => {
    if (!isDefined(match.indices) || !match.indices.length) {
      return
    }

    const { indices, value } = match;

    let obj = {
      indices,
      value
    };

    if (match.key) {
      obj.key = match.key.src;
    }

    if (match.idx > -1) {
      obj.refIndex = match.idx;
    }

    data.matches.push(obj);
  });
}

function transformScore(result, data) {
  data.score = result.score;
}

function format(
  results,
  docs,
  {
    includeMatches = Config.includeMatches,
    includeScore = Config.includeScore
  } = {}
) {
  const transformers = [];

  if (includeMatches) transformers.push(transformMatches);
  if (includeScore) transformers.push(transformScore);

  return results.map((result) => {
    const { idx } = result;

    const data = {
      item: docs[idx],
      refIndex: idx
    };

    if (transformers.length) {
      transformers.forEach((transformer) => {
        transformer(result, data);
      });
    }

    return data
  })
}

class Fuse {
  constructor(docs, options = {}, index) {
    this.options = { ...Config, ...options };

    if (
      this.options.useExtendedSearch &&
      !true
    ) {}

    this._keyStore = new KeyStore(this.options.keys);

    this.setCollection(docs, index);
  }

  setCollection(docs, index) {
    this._docs = docs;

    if (index && !(index instanceof FuseIndex)) {
      throw new Error(INCORRECT_INDEX_TYPE)
    }

    this._myIndex =
      index ||
      createIndex(this.options.keys, this._docs, {
        getFn: this.options.getFn,
        fieldNormWeight: this.options.fieldNormWeight
      });
  }

  add(doc) {
    if (!isDefined(doc)) {
      return
    }

    this._docs.push(doc);
    this._myIndex.add(doc);
  }

  remove(predicate = (/* doc, idx */) => false) {
    const results = [];

    for (let i = 0, len = this._docs.length; i < len; i += 1) {
      const doc = this._docs[i];
      if (predicate(doc, i)) {
        this.removeAt(i);
        i -= 1;
        len -= 1;

        results.push(doc);
      }
    }

    return results
  }

  removeAt(idx) {
    this._docs.splice(idx, 1);
    this._myIndex.removeAt(idx);
  }

  getIndex() {
    return this._myIndex
  }

  search(query, { limit = -1 } = {}) {
    const {
      includeMatches,
      includeScore,
      shouldSort,
      sortFn,
      ignoreFieldNorm
    } = this.options;

    let results = isString(query)
      ? isString(this._docs[0])
        ? this._searchStringList(query)
        : this._searchObjectList(query)
      : this._searchLogical(query);

    computeScore(results, { ignoreFieldNorm });

    if (shouldSort) {
      results.sort(sortFn);
    }

    if (isNumber(limit) && limit > -1) {
      results = results.slice(0, limit);
    }

    return format(results, this._docs, {
      includeMatches,
      includeScore
    })
  }

  _searchStringList(query) {
    const searcher = createSearcher(query, this.options);
    const { records } = this._myIndex;
    const results = [];

    // Iterate over every string in the index
    records.forEach(({ v: text, i: idx, n: norm }) => {
      if (!isDefined(text)) {
        return
      }

      const { isMatch, score, indices } = searcher.searchIn(text);

      if (isMatch) {
        results.push({
          item: text,
          idx,
          matches: [{ score, value: text, norm, indices }]
        });
      }
    });

    return results
  }

  _searchLogical(query) {

    const expression = parse(query, this.options);

    const evaluate = (node, item, idx) => {
      if (!node.children) {
        const { keyId, searcher } = node;

        const matches = this._findMatches({
          key: this._keyStore.get(keyId),
          value: this._myIndex.getValueForItemAtKeyId(item, keyId),
          searcher
        });

        if (matches && matches.length) {
          return [
            {
              idx,
              item,
              matches
            }
          ]
        }

        return []
      }

      const res = [];
      for (let i = 0, len = node.children.length; i < len; i += 1) {
        const child = node.children[i];
        const result = evaluate(child, item, idx);
        if (result.length) {
          res.push(...result);
        } else if (node.operator === LogicalOperator.AND) {
          return []
        }
      }
      return res
    };

    const records = this._myIndex.records;
    const resultMap = {};
    const results = [];

    records.forEach(({ $: item, i: idx }) => {
      if (isDefined(item)) {
        let expResults = evaluate(expression, item, idx);

        if (expResults.length) {
          // Dedupe when adding
          if (!resultMap[idx]) {
            resultMap[idx] = { idx, item, matches: [] };
            results.push(resultMap[idx]);
          }
          expResults.forEach(({ matches }) => {
            resultMap[idx].matches.push(...matches);
          });
        }
      }
    });

    return results
  }

  _searchObjectList(query) {
    const searcher = createSearcher(query, this.options);
    const { keys, records } = this._myIndex;
    const results = [];

    // List is Array<Object>
    records.forEach(({ $: item, i: idx }) => {
      if (!isDefined(item)) {
        return
      }

      let matches = [];

      // Iterate over every key (i.e, path), and fetch the value at that key
      keys.forEach((key, keyIndex) => {
        matches.push(
          ...this._findMatches({
            key,
            value: item[keyIndex],
            searcher
          })
        );
      });

      if (matches.length) {
        results.push({
          idx,
          item,
          matches
        });
      }
    });

    return results
  }
  _findMatches({ key, value, searcher }) {
    if (!isDefined(value)) {
      return []
    }

    let matches = [];

    if (isArray(value)) {
      value.forEach(({ v: text, i: idx, n: norm }) => {
        if (!isDefined(text)) {
          return
        }

        const { isMatch, score, indices } = searcher.searchIn(text);

        if (isMatch) {
          matches.push({
            score,
            key,
            value: text,
            idx,
            norm,
            indices
          });
        }
      });
    } else {
      const { v: text, n: norm } = value;

      const { isMatch, score, indices } = searcher.searchIn(text);

      if (isMatch) {
        matches.push({ score, key, value: text, norm, indices });
      }
    }

    return matches
  }
}

Fuse.version = '6.6.2';
Fuse.createIndex = createIndex;
Fuse.parseIndex = parseIndex;
Fuse.config = Config;

{
  Fuse.parseQuery = parse;
}

{
  register(ExtendedSearch);
}




/***/ }),

/***/ "./node_modules/jsonpack/main.js":
/*!***************************************!*\
  !*** ./node_modules/jsonpack/main.js ***!
  \***************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 Copyright (c) 2013, Rodrigo González, Sapienlab All Rights Reserved.
 Available via MIT LICENSE. See https://github.com/roro89/jsonpack/blob/master/LICENSE.md for details.
 */
(function(define) {

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {

		var TOKEN_TRUE = -1;
		var TOKEN_FALSE = -2;
		var TOKEN_NULL = -3;
		var TOKEN_EMPTY_STRING = -4;
		var TOKEN_UNDEFINED = -5;

		var pack = function(json, options) {

			// Canonizes the options
			options = options || {};

			// A shorthand for debugging
			var verbose = options.verbose || false;

			verbose && console.log('Normalize the JSON Object');

			// JSON as Javascript Object (Not string representation)
			json = typeof json === 'string' ? this.JSON.parse(json) : json;

			verbose && console.log('Creating a empty dictionary');

			// The dictionary
			var dictionary = {
				strings : [],
				integers : [],
				floats : []
			};

			verbose && console.log('Creating the AST');

			// The AST
			var ast = (function recursiveAstBuilder(item) {

				verbose && console.log('Calling recursiveAstBuilder with ' + this.JSON.stringify(item));

				// The type of the item
				var type = typeof item;

				// Case 7: The item is null
				if (item === null) {
					return {
						type : 'null',
						index : TOKEN_NULL
					};
				}
				
				//add undefined 
				if (typeof item === 'undefined') {
					return {
						type : 'undefined',
						index : TOKEN_UNDEFINED
					};
				}

				// Case 1: The item is Array Object
				if ( item instanceof Array) {

					// Create a new sub-AST of type Array (@)
					var ast = ['@'];

					// Add each items
					for (var i in item) {
						
						if (!item.hasOwnProperty(i)) continue;

						ast.push(recursiveAstBuilder(item[i]));
					}

					// And return
					return ast;

				}

				// Case 2: The item is Object
				if (type === 'object') {

					// Create a new sub-AST of type Object ($)
					var ast = ['$'];

					// Add each items
					for (var key in item) {

						if (!item.hasOwnProperty(key))
							continue;

						ast.push(recursiveAstBuilder(key));
						ast.push(recursiveAstBuilder(item[key]));
					}

					// And return
					return ast;

				}

				// Case 3: The item empty string
				if (item === '') {
					return {
						type : 'empty',
						index : TOKEN_EMPTY_STRING
					};
				}

				// Case 4: The item is String
				if (type === 'string') {

					// The index of that word in the dictionary
					var index = _indexOf.call(dictionary.strings, item);

					// If not, add to the dictionary and actualize the index
					if (index == -1) {
						dictionary.strings.push(_encode(item));
						index = dictionary.strings.length - 1;
					}

					// Return the token
					return {
						type : 'strings',
						index : index
					};
				}

				// Case 5: The item is integer
				if (type === 'number' && item % 1 === 0) {

					// The index of that number in the dictionary
					var index = _indexOf.call(dictionary.integers, item);

					// If not, add to the dictionary and actualize the index
					if (index == -1) {
						dictionary.integers.push(_base10To36(item));
						index = dictionary.integers.length - 1;
					}

					// Return the token
					return {
						type : 'integers',
						index : index
					};
				}

				// Case 6: The item is float
				if (type === 'number') {
					// The index of that number in the dictionary
					var index = _indexOf.call(dictionary.floats, item);

					// If not, add to the dictionary and actualize the index
					if (index == -1) {
						// Float not use base 36
						dictionary.floats.push(item);
						index = dictionary.floats.length - 1;
					}

					// Return the token
					return {
						type : 'floats',
						index : index
					};
				}

				// Case 7: The item is boolean
				if (type === 'boolean') {
					return {
						type : 'boolean',
						index : item ? TOKEN_TRUE : TOKEN_FALSE
					};
				}

				// Default
				throw new Error('Unexpected argument of type ' + typeof (item));

			})(json);

			// A set of shorthands proxies for the length of the dictionaries
			var stringLength = dictionary.strings.length;
			var integerLength = dictionary.integers.length;
			var floatLength = dictionary.floats.length;

			verbose && console.log('Parsing the dictionary');

			// Create a raw dictionary
			var packed = dictionary.strings.join('|');
			packed += '^' + dictionary.integers.join('|');
			packed += '^' + dictionary.floats.join('|');

			verbose && console.log('Parsing the structure');

			// And add the structure
			packed += '^' + (function recursiveParser(item) {

				verbose && console.log('Calling a recursiveParser with ' + this.JSON.stringify(item));

				// If the item is Array, then is a object of
				// type [object Object] or [object Array]
				if ( item instanceof Array) {

					// The packed resulting
					var packed = item.shift();

					for (var i in item) {
						
						if (!item.hasOwnProperty(i)) 
							continue;
						
						packed += recursiveParser(item[i]) + '|';
					}

					return (packed[packed.length - 1] === '|' ? packed.slice(0, -1) : packed) + ']';

				}

				// A shorthand proxies
				var type = item.type, index = item.index;

				if (type === 'strings') {
					// Just return the base 36 of index
					return _base10To36(index);
				}

				if (type === 'integers') {
					// Return a base 36 of index plus stringLength offset
					return _base10To36(stringLength + index);
				}

				if (type === 'floats') {
					// Return a base 36 of index plus stringLength and integerLength offset
					return _base10To36(stringLength + integerLength + index);
				}

				if (type === 'boolean') {
					return item.index;
				}

				if (type === 'null') {
					return TOKEN_NULL;
				}

				if (type === 'undefined') {
					return TOKEN_UNDEFINED;
				}

				if (type === 'empty') {
					return TOKEN_EMPTY_STRING;
				}

				throw new TypeError('The item is alien!');

			})(ast);

			verbose && console.log('Ending parser');

			// If debug, return a internal representation of dictionary and stuff
			if (options.debug)
				return {
					dictionary : dictionary,
					ast : ast,
					packed : packed
				};

			return packed;

		};

		var unpack = function(packed, options) {

			// Canonizes the options
			options = options || {};

			// A raw buffer
			var rawBuffers = packed.split('^');

			// Create a dictionary
			options.verbose && console.log('Building dictionary');
			var dictionary = [];

			// Add the strings values
			var buffer = rawBuffers[0];
			if (buffer !== '') {
				buffer = buffer.split('|');
				options.verbose && console.log('Parse the strings dictionary');
				for (var i=0, n=buffer.length; i<n; i++){
					dictionary.push(_decode(buffer[i]));
				}
			}

			// Add the integers values
			buffer = rawBuffers[1];
			if (buffer !== '') {
				buffer = buffer.split('|');
				options.verbose && console.log('Parse the integers dictionary');
				for (var i=0, n=buffer.length; i<n; i++){
					dictionary.push(_base36To10(buffer[i]));
				}
			}

			// Add the floats values
			buffer = rawBuffers[2];
			if (buffer !== '') {
				buffer = buffer.split('|')
				options.verbose && console.log('Parse the floats dictionary');
				for (var i=0, n=buffer.length; i<n; i++){
					dictionary.push(parseFloat(buffer[i]));
				}
			}
			// Free memory
			buffer = null;

			options.verbose && console.log('Tokenizing the structure');

			// Tokenizer the structure
			var number36 = '';
			var tokens = [];
			var len=rawBuffers[3].length;
			for (var i = 0; i < len; i++) {
				var symbol = rawBuffers[3].charAt(i);
				if (symbol === '|' || symbol === '$' || symbol === '@' || symbol === ']') {
					if (number36) {
						tokens.push(_base36To10(number36));
						number36 = '';
					}
					symbol !== '|' && tokens.push(symbol);
				} else {
					number36 += symbol;
				}
			}

			// A shorthand proxy for tokens.length
			var tokensLength = tokens.length;

			// The index of the next token to read
			var tokensIndex = 0;

			options.verbose && console.log('Starting recursive parser');

			return (function recursiveUnpackerParser() {

				// Maybe '$' (object) or '@' (array)
				var type = tokens[tokensIndex++];

				options.verbose && console.log('Reading collection type ' + (type === '$' ? 'object' : 'Array'));

				// Parse an array
				if (type === '@') {

					var node = [];

					for (; tokensIndex < tokensLength; tokensIndex++) {
						var value = tokens[tokensIndex];
						options.verbose && console.log('Read ' + value + ' symbol');
						if (value === ']')
							return node;
						if (value === '@' || value === '$') {
							node.push(recursiveUnpackerParser());
						} else {
							switch(value) {
								case TOKEN_TRUE:
									node.push(true);
									break;
								case TOKEN_FALSE:
									node.push(false);
									break;
								case TOKEN_NULL:
									node.push(null);
									break;
								case TOKEN_UNDEFINED:
									node.push(undefined);
									break;
								case TOKEN_EMPTY_STRING:
									node.push('');
									break;
								default:
									node.push(dictionary[value]);
							}

						}
					}

					options.verbose && console.log('Parsed ' + this.JSON.stringify(node));

					return node;

				}

				// Parse a object
				if (type === '$') {
					var node = {};

					for (; tokensIndex < tokensLength; tokensIndex++) {

						var key = tokens[tokensIndex];

						if (key === ']')
							return node;

						if (key === TOKEN_EMPTY_STRING)
							key = '';
						else
							key = dictionary[key];

						var value = tokens[++tokensIndex];

						if (value === '@' || value === '$') {
							node[key] = recursiveUnpackerParser();
						} else {
							switch(value) {
								case TOKEN_TRUE:
									node[key] = true;
									break;
								case TOKEN_FALSE:
									node[key] = false;
									break;
								case TOKEN_NULL:
									node[key] = null;
									break;
								case TOKEN_UNDEFINED:
									node[key] = undefined;
									break;
								case TOKEN_EMPTY_STRING:
									node[key] = '';
									break;
								default:
									node[key] = dictionary[value];
							}

						}
					}

					options.verbose && console.log('Parsed ' + this.JSON.stringify(node));

					return node;
				}

				throw new TypeError('Bad token ' + type + ' isn\'t a type');

			})();

		}
		/**
		 * Get the index value of the dictionary
		 * @param {Object} dictionary a object that have two array attributes: 'string' and 'number'
		 * @param {Object} data
		 */
		var _indexOfDictionary = function(dictionary, value) {

			// The type of the value
			var type = typeof value;

			// If is boolean, return a boolean token
			if (type === 'boolean')
				return value ? TOKEN_TRUE : TOKEN_FALSE;

			// If is null, return a... yes! the null token
			if (value === null)
				return TOKEN_NULL;

			//add undefined
			if (typeof value === 'undefined')
				return TOKEN_UNDEFINED;


			if (value === '') {
				return TOKEN_EMPTY_STRING;
			}

			if (type === 'string') {
				value = _encode(value);
				var index = _indexOf.call(dictionary.strings, value);
				if (index === -1) {
					dictionary.strings.push(value);
					index = dictionary.strings.length - 1;
				}
			}

			// If has an invalid JSON type (example a function)
			if (type !== 'string' && type !== 'number') {
				throw new Error('The type is not a JSON type');
			};

			if (type === 'string') {// string
				value = _encode(value);
			} else if (value % 1 === 0) {// integer
				value = _base10To36(value);
			} else {// float

			}

			// If is number, "serialize" the value
			value = type === 'number' ? _base10To36(value) : _encode(value);

			// Retrieve the index of that value in the dictionary
			var index = _indexOf.call(dictionary[type], value);

			// If that value is not in the dictionary
			if (index === -1) {
				// Push the value
				dictionary[type].push(value);
				// And return their index
				index = dictionary[type].length - 1;
			}

			// If the type is a number, then add the '+'  prefix character
			// to differentiate that they is a number index. If not, then
			// just return a 36-based representation of the index
			return type === 'number' ? '+' + index : index;

		};

		var _encode = function(str) {
			if ( typeof str !== 'string')
				return str;

			return str.replace(/[\+ \|\^\%]/g, function(a) {
				return ({
				' ' : '+',
				'+' : '%2B',
				'|' : '%7C',
				'^' : '%5E',
				'%' : '%25'
				})[a]
			});
		};

		var _decode = function(str) {
			if ( typeof str !== 'string')
				return str;

			return str.replace(/\+|%2B|%7C|%5E|%25/g, function(a) {
				return ({
				'+' : ' ',
				'%2B' : '+',
				'%7C' : '|',
				'%5E' : '^',
				'%25' : '%'
				})[a]
			})
		};

		var _base10To36 = function(number) {
			return Number.prototype.toString.call(number, 36).toUpperCase();
		};

		var _base36To10 = function(number) {
			return parseInt(number, 36);
		};

		var _indexOf = Array.prototype.indexOf ||
		function(obj, start) {
			for (var i = (start || 0), j = this.length; i < j; i++) {
				if (this[i] === obj) {
					return i;
				}
			}
			return -1;
		};

		return {
			JSON : JSON,
			pack : pack,
			unpack : unpack
		};

	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

})( __webpack_require__.amdD);


/***/ }),

/***/ "./node_modules/linear-scale/linear-scale.js":
/*!***************************************************!*\
  !*** ./node_modules/linear-scale/linear-scale.js ***!
  \***************************************************/
/***/ (function(module, exports) {

(function(root) {
  'use strict';

  function LinearScale(domain, range) {
    if (!(this instanceof LinearScale)) {
      return new LinearScale(domain, range);
    }
    this.domain = [];
    this.range = [];

    if (Array.isArray(domain)) {
      this.domain = domain;
    }
    if (Array.isArray(range)) {
      this.range = range;
    }

    var scale = function(value) {
      if (typeof value !== 'number') {
        return null;
      }

      var minValue = this.domain[0];
      var maxValue = this.domain[1];

      var minScale = this.range[0];
      var maxScale = this.range[1];

      if (minScale !== 'number' && typeof maxScale !== 'number') {
        minScale = minValue;
        maxScale = maxValue;
      }

      var ratio = (maxScale - minScale) / (maxValue - minValue);
      const result = minScale + ratio * (value - minValue);

      if (result === Infinity) return maxScale;
      else if (result === -Infinity) return minScale;
      else if (isNaN(result)) return minScale;

      return result
    }.bind(this);

    scale.domain = function(value) {
      if (Array.isArray(value)) {
        this.domain = value;
      }
      return scale;
    }.bind(this);

    scale.range = function(value) {
      if (Array.isArray(value)) {
        this.range = value;
      }
      return scale;
    }.bind(this);

    return scale;
  }

  if (true) {
    if ( true && module.exports) {
      exports = module.exports = LinearScale;
    }
    exports.LinearScale = LinearScale;
  } else {}

})(this);


/***/ }),

/***/ "./src/blocks/03-vibemap-embed/style.css":
/*!***********************************************!*\
  !*** ./src/blocks/03-vibemap-embed/style.css ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/03-vibemap-embed/editor.scss":
/*!*************************************************!*\
  !*** ./src/blocks/03-vibemap-embed/editor.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vibemap-constants/dist/vibes.js":
/*!******************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/vibes.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:!0}));var Fuse=__webpack_require__(/*! fuse.js */ "./node_modules/fuse.js/dist/fuse.esm.js"),LinearScale=__webpack_require__(/*! linear-scale */ "./node_modules/linear-scale/linear-scale.js");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var Fuse__default=_interopDefaultLegacy(Fuse),LinearScale__default=_interopDefaultLegacy(LinearScale),activityCategories$1=[{id:9881,description:"",name:"Acupuncture",slug:"acupuncture",parent:9878,details:{noun:"",sub_categories:[],vibes:[],msv:"1300",icon:"",feature_in_app_:!1},parent_slug:"health",level:3},{id:9830,description:"",name:"Afghan",slug:"afghan",parent:6331,details:{noun:"",sub_categories:[],vibes:[],msv:"1",icon:"",feature_in_app_:!1},parent_slug:"food",level:3},{id:9833,description:"",name:"African",slug:"african",parent:6331,details:{noun:"",sub_categories:[],vibes:[],msv:"10",icon:"",feature_in_app_:!1},parent_slug:"food",level:3},{id:9836,description:"",name:"Albanian",slug:"albanian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:6295,description:"Discover the best things to do in %city%, based on your vibe. Guides, events, activities, and more to help you plan a visit or weekend. Whether you’re a first time visitor or long-time local, we'll recommend something fun and interesting.",name:"All",slug:"all",parent:0,details:{noun:"Things to do",sub_categories:[{slug:"food",id:6331},{slug:"visit",id:6298},{slug:"drink",id:6328},{slug:"outdoors",id:6340},{slug:"community",id:6293},{slug:"events",id:6323},{slug:"learning",id:6573},{id:6334,slug:"entertainment"},{id:6304,slug:"shop"},{id:6337,slug:"games"},{id:6294,slug:"stay"},{id:9878,slug:"health"}],msv:"100000",icon:"allLogo",vibes:["dreamy","creative","fun","local","new","amazing","family","trending","classic","adventurous"],parent_categories:!1,feature_in_app_:!1},level:1},{id:9839,description:"",name:"American / New American",slug:"american",parent:6331,details:{noun:"",vibes:[],msv:"200",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10262,description:"",name:"Amusement Park",slug:"amusement_park",parent:6298,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"visit",level:3},{id:10379,description:"",name:"Antique Store",slug:"antique",parent:6304,details:{noun:"",vibes:[],msv:"400",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10436,description:"",name:"Aquarium",slug:"aquarium",parent:6291,details:{noun:"Aquarium",sub_categories:[],vibes:[],msv:"2000",icon:"",feature_in_app_:!1},parent_slug:"visit",level:3},{id:9917,description:"",name:"Arboretum",slug:"arboretum",parent:6340,details:{noun:"",vibes:[],msv:"600",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10406,description:"",name:"Arcade",slug:"arcade",parent:6291,details:{noun:"",sub_categories:[],vibes:[],msv:"3000",icon:"",feature_in_app_:!1},parent_slug:"entertainment",level:3},{id:9842,description:"",name:"Argentinian",slug:"argentinian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:6291,description:"",name:"Art",slug:"art",parent:6334,details:{noun:"Art",msv:"2400",sub_categories:[{id:10418,slug:"art_museum"},{id:10433,slug:"arts_organization"},{id:6307,slug:"gallery"},{id:10424,slug:"photography"},{id:10430,slug:"print_shop"},{id:10427,slug:"studio"}],vibes:["artsy","creative","inspired"],icon:"art",feature_in_app_:!0},parent_slug:"entertainment",level:3},{id:10418,description:"",name:"Art Museum",slug:"art_museum",parent:6291,details:{noun:"",sub_categories:[],vibes:[],msv:"8000",icon:"",feature_in_app_:!1},parent_slug:"art",level:3},{id:6334,description:"",name:"Arts &amp; Entertainment",slug:"entertainment",parent:6295,details:{noun:"Entertainment",vibes:["fun","interesting","popular","lively","musical"],msv:"500",icon:"entertainment",sub_categories:[{id:10406,slug:"arcade"},{id:6291,slug:"art"},{id:10403,slug:"casino"},{id:6292,slug:"comedy"},{id:10412,slug:"festival"},{id:10394,slug:"film"},{id:6307,slug:"gallery"},{id:10421,slug:"interactive"},{id:10277,slug:"museum"},{id:6343,slug:"music"},{id:10668,slug:"nightclub"},{id:6570,slug:"nightlife"},{id:10400,slug:"performance"},{id:10397,slug:"theater"}]},parent_slug:"all",level:2},{id:10433,description:"",name:"Arts Organization",slug:"arts_organization",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"art",level:3},{id:9845,description:"",name:"Asian Fusion",slug:"asianfusion",parent:6331,details:{noun:"",vibes:[],msv:"170",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:13940,description:"",name:"Attractions",slug:"attractions",parent:6323,details:{noun:"",vibes:[],msv:"100",icon:"",feature_in_app_:!1,sub_categories:[]},parent_slug:"events",level:3},{id:9848,description:"",name:"Austrailian",slug:"austrailian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:12600,description:"Cars, automobiles, and motorcycles",name:"Automobiles",slug:"automobiles",parent:6304,details:{noun:"automobiles",vibes:[],msv:"20",icon:"",feature_in_app_:!1,sub_categories:[]},parent_slug:"shop",level:3},{id:9851,description:"",name:"Bagels",slug:"bagels",parent:6331,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9854,description:"",name:"Bakery",slug:"bakery",parent:6331,details:{noun:"",vibes:[],msv:"8000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9857,description:"",name:"Bangladeshi",slug:"bangladeshi",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10656,description:"",name:"Bar",slug:"bar",parent:6328,details:{noun:"Bar",sub_categories:[],vibes:["drinking","boozy"],msv:"18000",icon:"",feature_in_app_:!0},parent_slug:"drink",level:3},{id:9860,description:"",name:"Barbeque",slug:"barbeque",parent:6331,details:{noun:"",vibes:[],msv:"1900",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10560,description:"",name:"Barber Shop",slug:"barber",parent:9884,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"beauty",level:3},{id:9932,description:"",name:"Beach",slug:"beach",parent:6340,details:{noun:"",sub_categories:[],vibes:[],msv:"22000",icon:"",feature_in_app_:!1},parent_slug:"outdoors",level:3},{id:9884,description:"",name:"Beauty",slug:"beauty",parent:9878,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[{id:10560,slug:"barber"},{id:10557,slug:"hair"},{id:10554,slug:"nails"},{id:10563,slug:"tattoo_parlor"}]},parent_slug:"health",level:3},{id:10181,description:"",name:"Bed &amp; Breakfast",slug:"bed_breakfast",parent:6294,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10301,description:"",name:"Beer Garden",slug:"beer_garden",parent:6328,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:9863,description:"",name:"Bistro",slug:"bistro",parent:6331,details:{noun:"",vibes:[],msv:"170",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10334,description:"",name:"Books",slug:"books",parent:6304,details:{noun:"",sub_categories:[],vibes:[],msv:"720",icon:"",feature_in_app_:!0},parent_slug:"shop",level:3},{id:9929,description:"",name:"Botanical Garden",slug:"botanicalgarden",parent:6340,details:{noun:"",vibes:[],msv:"320",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10235,description:"",name:"Bowling",slug:"bowling",parent:6337,details:{noun:"",vibes:[],msv:"4000",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:9866,description:"",name:"Bowls",slug:"bowls",parent:6331,details:{noun:"",vibes:[],msv:"100",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10187,description:"",name:"Boxing",slug:"boxing",parent:6337,details:{noun:"",vibes:[],msv:"700",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:9872,description:"",name:"Brazilian",slug:"brazilian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10674,description:"",name:"Breakfast",slug:"breakfast",parent:6331,details:{noun:"Breakfast",vibes:[],msv:"12000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10304,description:"",name:"Brewery",slug:"brewery",parent:6328,details:{noun:"",vibes:[],msv:"12000",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10662,description:"",name:"Brewpub",slug:"brewpub",parent:6328,details:{noun:"Brewpub",vibes:[],msv:"320",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10496,description:"",name:"Broadway",slug:"broadway",parent:10397,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"theater",level:3},{id:9869,description:"",name:"Brunch",slug:"brunch",parent:6331,details:{noun:"",sub_categories:[],vibes:[],msv:"15000",icon:"",feature_in_app_:!0},parent_slug:"food",level:3},{id:11247,description:"",name:"Buffet",slug:"buffet",parent:6331,details:{noun:"",vibes:[],msv:"400",icon:"",parent_categories:!1,sub_categories:[]}},{id:9875,description:"",name:"Burger",slug:"burger",parent:6331,details:{noun:"",vibes:[],msv:"2000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10469,description:"",name:"Burlesque",slug:"burlesque",parent:10400,details:{noun:"",vibes:[],msv:"300",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:10472,description:"",name:"Caberet",slug:"caberet",parent:10400,details:{noun:"",vibes:[],msv:"170",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:10638,description:"",name:"Cabin",slug:"cabin",parent:6294,details:{noun:"Cabin",vibes:["outdoorsy","natural","cottagecore","cottage"],msv:"320",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:9944,description:"",name:"Cafe",slug:"cafe",parent:6331,details:{noun:"Cafe",vibes:[],msv:"3000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9950,description:"",name:"Cambodian",slug:"cambodian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10172,description:"",name:"Campground",slug:"campground",parent:6294,details:{noun:"",vibes:[],msv:"1000",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:9953,description:"",name:"Candy",slug:"candy",parent:6331,details:{noun:"",vibes:[],msv:"250",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10566,description:"",name:"Cannabis",slug:"cannabis",parent:9878,details:{noun:"",sub_categories:[],vibes:[],msv:"1",icon:"",feature_in_app_:!0},parent_slug:"health",level:3},{id:9956,description:"",name:"Caribbean",slug:"caribbean",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10403,description:"",name:"Casino",slug:"casino",parent:6291,details:{noun:"",vibes:[],msv:"3000",icon:"",sub_categories:[]},parent_slug:"entertainment",level:3},{id:9941,description:"",name:"Cemetery",slug:"cemetery",parent:6340,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10364,description:"",name:"Children's Clothing Store",slug:"childrens_clothing",parent:10361,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"kids",level:3},{id:10439,description:"",name:"Children's Museum",slug:"children_museum",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:9959,description:"",name:"Chinese",slug:"chinese",parent:6331,details:{noun:"",vibes:[],msv:"3000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10283,description:"",name:"Church",slug:"church",parent:6293,details:{noun:"",sub_categories:[],vibes:[],msv:"1",icon:"",feature_in_app_:!1},parent_slug:"community",level:3},{id:10475,description:"",name:"Circus",slug:"circus",parent:10400,details:{noun:"",vibes:[],msv:"250",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:10295,description:"",name:"City Hall",slug:"city_hall",parent:6293,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"community",level:3},{id:6573,description:"",name:"Classes / Learning",slug:"learning",parent:6295,details:{vibes:["interesting","interactive","family","fun"],icon:"learning",noun:"Learning",msv:"1",sub_categories:[{id:6291,slug:"art"},{id:10680,slug:"cooking"},{id:10502,slug:"dj"},{id:6312,slug:"improv"},{id:6343,slug:"music"},{id:10424,slug:"photography"},{id:9893,slug:"yoga"}]},parent_slug:"all",level:2},{id:10499,description:"",name:"Classical",slug:"classical",parent:6343,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10190,description:"",name:"Climbing",slug:"climbing",parent:6337,details:{noun:"",vibes:[],msv:"170",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10340,description:"",name:"Clothes",slug:"clothes",parent:6304,details:{noun:"",vibes:[],msv:"400",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10391,description:"",name:"Club / Dance",slug:"club",parent:6570,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10184,description:"",name:"Co-Working Space",slug:"co_working",parent:6294,details:{noun:"",vibes:[],msv:"300",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10307,description:"",name:"Cocktails / Spirits",slug:"cocktails_spirits",parent:6328,details:{noun:"",vibes:[],msv:"900",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:9947,description:"",name:"Coffee Shop",slug:"coffeeshop",parent:6331,details:{noun:"",vibes:[],msv:"4500",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9962,description:"",name:"Colombian",slug:"colombian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:6292,description:"",name:"Comedy",slug:"comedy",parent:6295,details:{noun:"Comedy",vibes:["funny","raunchy","spontaneous"],msv:"2000",icon:"comedy",sub_categories:[{id:6317,slug:"stand-up"}]},parent_slug:"entertainment",level:3},{id:6293,description:"Explore ways to get involved in your local community. Support local businesses, volunteer, give back, or pay it forward with these community groups and hubs of local culture. ",name:"Community",slug:"community",parent:6295,details:{noun:"Community",sub_categories:[{id:10283,slug:"church"},{id:10295,slug:"city_hall"},{id:10268,slug:"community_center"},{id:10298,slug:"courthouse"},{id:10274,slug:"library"},{id:10289,slug:"mosque"},{id:10277,slug:"museum"},{id:10271,slug:"non_profit"}],msv:"2",icon:"community",vibes:["community","local","cultural","multicultural","social"],feature_in_app_:!1},parent_slug:"all",level:2},{id:10268,description:"",name:"Community Center",slug:"community_center",parent:6293,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"community",level:3},{id:9920,description:"",name:"Community Garden",slug:"communitygarden",parent:6340,details:{noun:"",vibes:[],msv:"30",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10595,description:"",name:"Concert",slug:"concert",parent:10400,details:{noun:"Concert",sub_categories:[],vibes:["musical","lively","together"],msv:"33000",icon:"",feature_in_app_:!1},parent_slug:"performance",level:3},{id:10466,description:"",name:"Conservatory",slug:"conservatory",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:10370,description:"",name:"Convenience Store / Bodega",slug:"convenience_store",parent:6304,details:{noun:"",vibes:[],msv:"100",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:13987,description:"",name:"Cookies",slug:"cookies",parent:6331,details:{noun:"",vibes:[],msv:"200",icon:"",feature_in_app_:!1,sub_categories:[]},parent_slug:"food",level:3},{id:10680,description:"",name:"Cooking",slug:"cooking",parent:6573,details:{noun:"Cooking",vibes:["interesting","interactive"],msv:"2400",icon:"",sub_categories:[]},parent_slug:"learning",level:3},{id:10644,description:"",name:"Cottage",slug:"cottage",parent:6294,details:{noun:"Cottage",vibes:["cottage","cottagecore"],msv:"110",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10298,description:"",name:"Courthouse",slug:"courthouse",parent:6293,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"community",level:3},{id:10310,description:"",name:"Craft Beer",slug:"craft_beer",parent:6328,details:{noun:"",vibes:[],msv:"250",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10193,description:"",name:"CrossFit",slug:"crossfit",parent:6337,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:9965,description:"",name:"Cuban",slug:"cuban",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10442,description:"",name:"Cultural Museum",slug:"cultural_museum",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:9968,description:"",name:"Cupcakes",slug:"cupcakes",parent:6331,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10196,description:"",name:"Dance",slug:"dance",parent:6337,details:{noun:"",vibes:[],msv:"600",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10592,description:"",name:"Dance",slug:"dance-performance",parent:10400,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:9971,description:"",name:"Deli",slug:"deli",parent:6331,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10445,description:"",name:"Design Museum",slug:"design_museum",parent:6291,details:{noun:"",vibes:[],msv:"10",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:10343,description:"",name:"Design/Furniture",slug:"design_furniture",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:9974,description:"",name:"Dessert",slug:"dessert",parent:6331,details:{noun:"",vibes:[],msv:"2000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9977,description:"",name:"Diner",slug:"diner",parent:6331,details:{noun:"",vibes:[],msv:"6000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10659,description:"",name:"Distillery",slug:"distillery",parent:6328,details:{noun:"Distillery",vibes:[],msv:"400",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10313,description:"",name:"Dive Bar",slug:"dive_bar",parent:6328,details:{noun:"",vibes:[],msv:"80",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10502,description:"",name:"DJ",slug:"dj",parent:6343,details:{noun:"DJ",vibes:[],msv:"30",icon:"",sub_categories:[]},parent_slug:"learning",level:3},{id:9980,description:"",name:"Dominican",slug:"dominican",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9983,description:"",name:"Donuts",slug:"donuts",parent:6331,details:{noun:"",vibes:[],msv:"2000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:6328,description:"Where to drink and enjoy beer, wine, cocktails and sober-friendly options including coffee, tea, and more. Discover drinking styles like tiki, bubbly, and sober-friendly. Beyond watering holes, check out outdoor spots, events, and tours.",name:"Drink",slug:"drink",parent:6295,details:{noun:"Drinking",sub_categories:[{slug:"all",id:6295},{id:10656,slug:"bar"},{id:10301,slug:"beer_garden"},{id:10304,slug:"brewery"},{id:10662,slug:"brewpub"},{id:9944,slug:"cafe"},{id:10391,slug:"club"},{id:10307,slug:"cocktails_spirits"},{id:9947,slug:"coffeeshop"},{id:10310,slug:"craft_beer"},{id:10659,slug:"distillery"},{id:10313,slug:"dive_bar"},{id:10013,slug:"gastropub"},{id:10319,slug:"juice_smoothie"},{id:10665,slug:"lounge"},{id:10322,slug:"mocktails"},{id:10668,slug:"nightclub"},{id:10082,slug:"pub"},{id:10671,slug:"saloon"},{id:10325,slug:"speakeasy"},{id:10145,slug:"tea"},{id:13943,slug:"tiki"},{id:10331,slug:"wine_bar"},{id:10328,slug:"winery"}],vibes:["fun","boozy","happy","cheap","friendly"],msv:"9000",icon:"drink",feature_in_app_:!1},parent_slug:"all",level:2},{id:9986,description:"",name:"Eastern European",slug:"eastern_european",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9989,description:"",name:"Egyptian",slug:"egyptian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10505,description:"",name:"Electronic / Dance",slug:"electronic_dance",parent:6343,details:{noun:"",vibes:[],msv:"80",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:9992,description:"",name:"English",slug:"english",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9995,description:"",name:"Ethiopian",slug:"ethiopian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:6323,description:"Explore what's happening in %city%. Make a plan for tonight or this weekend with your events calendar. Explore art, music, nightlife based on your vibe.",name:"Events",slug:"events",parent:0,details:{noun:"Events",sub_categories:[{slug:"concert",id:10595},{slug:"music",id:6343},{slug:"comedy",id:6292},{slug:"art",id:6291},{id:13940,slug:"attractions"},{id:10334,slug:"books"},{id:6293,slug:"community"},{id:6328,slug:"drink"},{id:11658,slug:"family"},{id:10412,slug:"festival"},{id:10394,slug:"film"},{id:6331,slug:"food"},{id:6340,slug:"outdoors"},{id:9878,slug:"health"}],vibes:["local","chill","fun","unique"],msv:"4000",icon:"events",feature_in_app_:!0,sections:!1},parent_slug:"all",level:2},{id:10448,description:"",name:"Experiential",slug:"experiential",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:10478,description:"",name:"Experimental",slug:"experimental",parent:10400,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:11658,description:"Ways to get out and have fun with your entire family",name:"Family",slug:"family",parent:0,details:{noun:"",vibes:["family","kidcore","children"],msv:"800",icon:"",sub_categories:[],feature_in_app_:!1},parent_slug:"events",level:3},{id:9926,description:"",name:"Farm",slug:"farm",parent:6340,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:9998,description:"",name:"Farm to Table",slug:"farm_table",parent:6331,details:{noun:"",vibes:[],msv:"170",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10346,description:"",name:"Farmers Market",slug:"farmers_market",parent:6304,details:{noun:"",vibes:[],msv:"10000",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10412,description:"",name:"Festival",slug:"festival",parent:6291,details:{noun:"",sub_categories:[],vibes:[],msv:"1200",icon:"",feature_in_app_:!1},parent_slug:"events",level:3},{id:10001,description:"",name:"Filipino",slug:"filipino",parent:6331,details:{noun:"",vibes:[],msv:"1000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10394,description:"",name:"Film",slug:"film",parent:6291,details:{noun:"",vibes:[],msv:"50",icon:"",sub_categories:[{id:10535,slug:"movie_theater"}]},parent_slug:"entertainment",level:3},{id:10451,description:"",name:"Film Museum",slug:"film_museum",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:10677,description:"",name:"Fine Dining",slug:"fine-dining",parent:6331,details:{noun:"Fine Dining",vibes:["elegant","luxury","fancy"],msv:"3000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10349,description:"",name:"Flea Market",slug:"flea_market",parent:6304,details:{noun:"",vibes:[],msv:"2400",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10508,description:"",name:"Folk / Country",slug:"folk_country",parent:6343,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:6331,description:"Eat and explore culinary culture. Whether your vibe is a lively brunch, a friendly lunch, a chill breakfast, or an intimate dinner, we've got you covered with the best restaurants and other places to eat, including outdoor patios, rooftop bars, and markets. You can also discover by taste, like savory, sweet, and spicy.",name:"Food",slug:"food",parent:6295,details:{noun:"Food",sub_categories:[{id:9830,slug:"afghan"},{id:9833,slug:"african"},{id:9836,slug:"albanian"},{id:9839,slug:"american"},{id:9842,slug:"argentinian"},{id:9845,slug:"asianfusion"},{id:9848,slug:"austrailian"},{id:9851,slug:"bagels"},{id:9854,slug:"bakery"},{id:9857,slug:"bangladeshi"},{id:9860,slug:"barbeque"},{id:9863,slug:"bistro"},{id:9866,slug:"bowls"},{id:9872,slug:"brazilian"},{id:10674,slug:"breakfast"},{id:9869,slug:"brunch"},{id:9875,slug:"burger"},{id:9944,slug:"cafe"},{id:9950,slug:"cambodian"},{id:9953,slug:"candy"},{id:9956,slug:"caribbean"},{id:9959,slug:"chinese"},{id:9947,slug:"coffeeshop"},{id:9962,slug:"colombian"},{id:13987,slug:"cookies"},{id:9965,slug:"cuban"},{id:9968,slug:"cupcakes"},{id:9971,slug:"deli"},{id:9974,slug:"dessert"},{id:9977,slug:"diner"},{id:9980,slug:"dominican"},{id:9983,slug:"donuts"},{id:9986,slug:"eastern_european"},{id:9989,slug:"egyptian"},{id:9992,slug:"english"},{id:9995,slug:"ethiopian"},{id:9998,slug:"farm_table"},{id:10001,slug:"filipino"},{id:10677,slug:"fine-dining"},{id:10004,slug:"food_hall"},{id:10007,slug:"food_truck"},{id:10010,slug:"french"},{id:10013,slug:"gastropub"},{id:10016,slug:"german"},{id:10019,slug:"greek"},{id:10022,slug:"hawaiian"},{id:10025,slug:"himalayan_nepalese_tibetan"},{id:10028,slug:"hungarian"},{id:10031,slug:"ice_cream"},{id:10034,slug:"indian"},{id:10037,slug:"italian"},{id:10040,slug:"jamaican"},{id:10043,slug:"japanese"},{id:10046,slug:"korean"},{id:10049,slug:"latin_american"},{id:10052,slug:"mediterranean"},{id:10055,slug:"mexican"},{id:10058,slug:"middle_eastern"},{id:10061,slug:"modern_european"},{id:10064,slug:"moroccan"},{id:10067,slug:"new_zealand"},{id:10070,slug:"pakastani"},{id:10073,slug:"persian"},{id:10076,slug:"peruvian"},{id:10079,slug:"pizza"},{id:10082,slug:"pub"},{id:10085,slug:"ramen"},{id:13934,slug:"restaurant"},{id:10088,slug:"romanian"},{id:10091,slug:"russian"},{id:13937,slug:"salad"},{id:10094,slug:"sandwiches"},{id:10097,slug:"scandinavian"},{id:10100,slug:"seafood"},{id:10103,slug:"senegalese"},{id:10106,slug:"singaporean"},{id:10109,slug:"small_plates"},{id:10112,slug:"soul_southern"},{id:10115,slug:"soup"},{id:10118,slug:"south_african"},{id:10121,slug:"south_american"},{id:10124,slug:"southeast_asian"},{id:10127,slug:"spanish"},{id:10130,slug:"steakhouse"},{id:10133,slug:"sushi"},{id:10136,slug:"tacos"},{id:10142,slug:"tapas"},{id:10145,slug:"tea"},{id:10148,slug:"thai"},{id:10139,slug:"tiawanese"},{id:10151,slug:"turkish"},{id:10154,slug:"uzbek"},{id:10157,slug:"vegan"},{id:10160,slug:"vegetarian"},{id:10163,slug:"vietnamese"}],vibes:["local","foodie","authentic","new","spicy","sweet","popup"],msv:"15000",icon:"food",feature_in_app_:!1},parent_slug:"all",level:2},{id:10004,description:"",name:"Food Hall",slug:"food_hall",parent:6331,details:{noun:"",vibes:[],msv:"170",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10007,description:"",name:"Food Truck / Cart",slug:"food_truck",parent:6331,details:{noun:"",vibes:[],msv:"3600",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10352,description:"",name:"Fragrance",slug:"fragrance",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10010,description:"",name:"French",slug:"french",parent:6331,details:{noun:"",vibes:[],msv:"300",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:6307,description:"",name:"Gallery",slug:"gallery",parent:6291,details:{vibes:["small","local","community"],noun:"",sub_categories:[],msv:"600",icon:"",feature_in_app_:!0},parent_slug:"art",level:3},{id:9905,description:"",name:"Garden",slug:"garden",parent:6340,details:{noun:"",sub_categories:[],vibes:[],msv:"2400",icon:"",feature_in_app_:!0},parent_slug:"outdoors",level:3},{id:10013,description:"",name:"Gastropub",slug:"gastropub",parent:6331,details:{noun:"",vibes:[],msv:"260",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10016,description:"",name:"German",slug:"german",parent:6331,details:{noun:"",vibes:[],msv:"50",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10598,description:"",name:"Gift",slug:"gift",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10019,description:"",name:"Greek",slug:"greek",parent:6331,details:{noun:"",vibes:[],msv:"200",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10337,description:"",name:"Groceries",slug:"groceries",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10647,description:"",name:"Guest house",slug:"guest-house",parent:6294,details:{noun:"Guest house",vibes:[],msv:"110",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10199,description:"",name:"Gym",slug:"gym",parent:6337,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10211,description:"",name:"Gymnastics",slug:"gymnastics",parent:6337,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10557,description:"",name:"Hair Salon",slug:"hair",parent:9884,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"beauty",level:3},{id:10022,description:"",name:"Hawaiian",slug:"hawaiian",parent:6331,details:{noun:"",vibes:[],msv:"100",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10376,description:"",name:"Health Food Store",slug:"health_food",parent:6304,details:{noun:"",vibes:[],msv:"20",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10202,description:"",name:"Hike",slug:"hike-games",parent:6337,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:9935,description:"",name:"Hiking",slug:"hike",parent:6340,details:{noun:"Hiking",sub_categories:[],vibes:["hiking"],msv:"8000",icon:"",feature_in_app_:!0},parent_slug:"outdoors",level:3},{id:10025,description:"",name:"Himalayan/Nepalese/Tibetan",slug:"himalayan_nepalese_tibetan",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10511,description:"",name:"Hip Hop / Rap",slug:"hiphop_rap",parent:6343,details:{noun:"",vibes:[],msv:"100",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10454,description:"",name:"History Museum",slug:"history_museum",parent:6291,details:{noun:"",vibes:[],msv:"500",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:10355,description:"",name:"Home &amp; Garden",slug:"home_garden",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10175,description:"",name:"Home share (AirBNB, VRBO, etc.)",slug:"home_share",parent:6294,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10169,description:"",name:"Hostel",slug:"hostel",parent:6294,details:{noun:"",vibes:[],msv:"4000",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10166,description:"",name:"Hotel",slug:"hotels",parent:6294,details:{noun:"",sub_categories:[],vibes:[],msv:"1400",icon:"",feature_in_app_:!0},parent_slug:"stay",level:3},{id:10028,description:"",name:"Hungarian",slug:"hungarian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10031,description:"",name:"Ice Cream",slug:"ice_cream",parent:6331,details:{noun:"",vibes:[],msv:"3600",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10214,description:"",name:"Ice Skating",slug:"ice_skating",parent:6337,details:{noun:"",vibes:[],msv:"80",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:6312,description:"",name:"Improv",slug:"improv",parent:6292,details:{msv:"480",noun:"",vibes:[],icon:"",sub_categories:[]},parent_slug:"learning",level:3},{id:10481,description:"",name:"Improv",slug:"improv-performance",parent:10400,details:{noun:"",vibes:[],msv:"480",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:10034,description:"",name:"Indian",slug:"indian",parent:6331,details:{noun:"",vibes:[],msv:"300",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10635,description:"",name:"Inn",slug:"inn",parent:6294,details:{noun:"Inn",vibes:[],msv:"2000",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10514,description:"",name:"Instrumental",slug:"instrumental",parent:6343,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10421,description:"",name:"Interactive",slug:"interactive",parent:6291,details:{noun:"",sub_categories:[],vibes:[],msv:"10",icon:"",feature_in_app_:!1},parent_slug:"entertainment",level:3},{id:10037,description:"",name:"Italian",slug:"italian",parent:6331,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9899,description:"",name:"IV Therapy",slug:"ivtherapy",parent:9878,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"health",level:3},{id:10040,description:"",name:"Jamaican",slug:"jamaican",parent:6331,details:{noun:"",vibes:[],msv:"260",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10043,description:"",name:"Japanese",slug:"japanese",parent:6331,details:{noun:"",vibes:[],msv:"900",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10517,description:"",name:"Jazz",slug:"jazz",parent:6343,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10358,description:"",name:"Jewelry",slug:"jewelry",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10319,description:"",name:"Juice / Smoothie",slug:"juice_smoothie",parent:6328,details:{noun:"",vibes:[],msv:"140",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10520,description:"",name:"Karaoke",slug:"karaoke",parent:6343,details:{noun:"",vibes:[],msv:"3000",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10361,description:"",name:"Kids",slug:"kids",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[{id:10364,slug:"childrens_clothing"},{id:10367,slug:"toy_store"}]},parent_slug:"shop",level:3},{id:10586,description:"",name:"Kids",slug:"kids-music",parent:6343,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10589,description:"",name:"Kids",slug:"kids-performance",parent:10400,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:10046,description:"",name:"Korean",slug:"korean",parent:6331,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10250,description:"",name:"Landmark",slug:"landmark",parent:6298,details:{noun:"",vibes:[],msv:"2900",icon:"",sub_categories:[]},parent_slug:"visit",level:3},{id:10217,description:"",name:"Laser Tag",slug:"laser_tag",parent:6337,details:{noun:"",vibes:[],msv:"700",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10049,description:"",name:"Latin American",slug:"latin_american",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10274,description:"",name:"Library",slug:"library",parent:6293,details:{noun:"",vibes:[],msv:"14000",icon:"",sub_categories:[]},parent_slug:"community",level:3},{id:10653,description:"",name:"Lodge",slug:"lodge",parent:0,details:{noun:"Lodge",vibes:["rustic","cozy"],msv:"20",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10665,description:"",name:"Lounge",slug:"lounge",parent:6328,details:{noun:"Lounge",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10484,description:"",name:"Magic",slug:"magic",parent:10400,details:{noun:"",vibes:[],msv:"200",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:11244,description:"",name:"Mall",slug:"mall",parent:6304,details:{noun:"",vibes:[],msv:"1000",icon:"",parent_categories:!1,sub_categories:[]}},{id:9887,description:"",name:"Massage",slug:"massage",parent:9878,details:{noun:"",vibes:[],msv:"8000",icon:"",sub_categories:[]},parent_slug:"health",level:3},{id:9890,description:"",name:"Meditation",slug:"meditation",parent:9878,details:{noun:"",vibes:[],msv:"390",icon:"",sub_categories:[]},parent_slug:"health",level:3},{id:10052,description:"",name:"Mediterranean",slug:"mediterranean",parent:6331,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10055,description:"",name:"Mexican",slug:"mexican",parent:6331,details:{noun:"",vibes:[],msv:"2400",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10058,description:"",name:"Middle Eastern",slug:"middle_eastern",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10220,description:"",name:"Miniature Golf",slug:"minature_golf",parent:6337,details:{noun:"",vibes:[],msv:"700",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10322,description:"",name:"Mocktails",slug:"mocktails",parent:6328,details:{noun:"",vibes:[],msv:"40",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10061,description:"",name:"Modern European",slug:"modern_european",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10064,description:"",name:"Moroccan",slug:"moroccan",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10289,description:"",name:"Mosque",slug:"mosque",parent:6293,details:{noun:"",sub_categories:[],vibes:[],msv:"1",icon:"",feature_in_app_:!1},parent_slug:"community",level:3},{id:10632,description:"",name:"Motel",slug:"motel",parent:6294,details:{noun:"Motel",sub_categories:[],vibes:[],msv:"18000",icon:"",feature_in_app_:!1},parent_slug:"stay",level:3},{id:10535,description:"",name:"Movie Theater",slug:"movie_theater",parent:10394,details:{noun:"",vibes:[],msv:"10000",icon:"",sub_categories:[]},parent_slug:"film",level:3},{id:10256,description:"",name:"Mural",slug:"mural",parent:6298,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"visit",level:3},{id:10277,description:"",name:"Museum",slug:"museum",parent:6293,details:{noun:"",sub_categories:[{id:10436,slug:"aquarium"},{id:10439,slug:"children_museum"},{id:10466,slug:"conservatory"},{id:10442,slug:"cultural_museum"},{id:10445,slug:"design_museum"},{id:10448,slug:"experiential"},{id:10451,slug:"film_museum"},{id:10454,slug:"history_museum"},{id:10463,slug:"planetarium"},{id:10457,slug:"visitor_center"},{id:10460,slug:"zoo"}],vibes:[],msv:"800",icon:"",feature_in_app_:!0},parent_slug:"community",level:3},{id:6343,description:"",name:"Music",slug:"music",parent:6295,details:{vibes:["local","popular","jazzy","lit","shimmy"],noun:"Music",sub_categories:[{id:10499,slug:"classical"},{id:10502,slug:"dj"},{id:10505,slug:"electronic_dance"},{id:10508,slug:"folk_country"},{id:10511,slug:"hiphop_rap"},{id:10514,slug:"instrumental"},{id:10517,slug:"jazz"},{id:10520,slug:"karaoke"},{id:10586,slug:"kids-music"},{id:10523,slug:"r_b"},{id:10526,slug:"rock_indie"},{id:10529,slug:"soul_funk"},{id:10532,slug:"world_international"}],msv:"1300",icon:"music",feature_in_app_:!1},parent_slug:"entertainment",level:3},{id:10580,description:"",name:"Music Shop",slug:"music-store",parent:6304,details:{noun:"",sub_categories:[{id:10583,slug:"record-store"}],vibes:[],msv:"1",icon:"",feature_in_app_:!1},parent_slug:"shop",level:3},{id:10487,description:"",name:"Musical",slug:"musical",parent:10400,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:10554,description:"",name:"Nail Salon",slug:"nails",parent:9884,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"beauty",level:3},{id:9938,description:"",name:"Natural Area",slug:"natural_area",parent:6340,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10067,description:"",name:"New Zealand",slug:"new_zealand",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10388,description:"",name:"Night Market",slug:"night_market",parent:6304,details:{noun:"",vibes:[],msv:"400",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10668,description:"",name:"Nightclub",slug:"nightclub",parent:6328,details:{noun:"Nightclub",vibes:["latenight","after-party","party"],msv:"12000",icon:"",sub_categories:[]},parent_slug:"nightlife",level:3},{id:6570,description:"",name:"Nightlife",slug:"nightlife",parent:6295,details:{vibes:["latenight","lit","musical","buzzing","boozy"],noun:"Nightlife",sub_categories:[{id:10391,slug:"club"},{id:10668,slug:"nightclub"},{id:10325,slug:"speakeasy"}],msv:"12000",icon:"nightlife",feature_in_app_:!1},parent_slug:"entertainment",level:3},{id:10271,description:"",name:"Non-Profit Organization",slug:"non_profit",parent:6293,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"community",level:3},{id:10490,description:"",name:"Opera",slug:"opera",parent:10400,details:{noun:"",vibes:[],msv:"2000",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:6340,description:"",name:"Outdoors",slug:"outdoors",parent:6295,details:{noun:"Outdoors",sub_categories:[{id:9917,slug:"arboretum"},{id:9932,slug:"beach"},{id:9929,slug:"botanicalgarden"},{id:10638,slug:"cabin"},{id:9941,slug:"cemetery"},{id:9920,slug:"communitygarden"},{id:9926,slug:"farm"},{id:9905,slug:"garden"},{id:9935,slug:"hike"},{id:9938,slug:"natural_area"},{id:9908,slug:"park"},{id:9911,slug:"playground"},{id:9914,slug:"plaza"},{id:9923,slug:"urbanfarm"}],vibes:["fun","mindful","sunny","adventurous","relaxing"],msv:"110",icon:"outdoors",feature_in_app_:!1},parent_slug:"all",level:2},{id:10238,description:"",name:"Paint Ball",slug:"paint_ball",parent:6337,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10070,description:"",name:"Pakastani",slug:"pakastani",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9908,description:"",name:"Park",slug:"park",parent:6340,details:{noun:"",vibes:[],msv:"12000",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10400,description:"",name:"Performance",slug:"performance",parent:6291,details:{noun:"Performing Arts",sub_categories:[{id:10469,slug:"burlesque"},{id:10472,slug:"caberet"},{id:10475,slug:"circus"},{id:6292,slug:"comedy"},{id:10595,slug:"concert"},{id:10592,slug:"dance-performance"},{id:10478,slug:"experimental"},{id:10481,slug:"improv-performance"},{id:10589,slug:"kids-performance"},{id:10484,slug:"magic"},{id:10487,slug:"musical"},{id:10490,slug:"opera"},{id:10493,slug:"reading_lecture"},{id:10397,slug:"theater"}],vibes:[],msv:"40",icon:"",feature_in_app_:!0},parent_slug:"entertainment",level:3},{id:10073,description:"",name:"Persian",slug:"persian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10076,description:"",name:"Peruvian",slug:"peruvian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10424,description:"",name:"Photography",slug:"photography",parent:6291,details:{noun:"Photography",vibes:[],msv:"260",icon:"",sub_categories:[]},parent_slug:"learning",level:3},{id:10205,description:"",name:"Pilates",slug:"pilates",parent:6337,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10079,description:"",name:"Pizza",slug:"pizza",parent:6331,details:{noun:"",vibes:[],msv:"8000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10463,description:"",name:"Planetarium",slug:"planetarium",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:9911,description:"",name:"Playground",slug:"playground",parent:6340,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:9914,description:"",name:"Plaza",slug:"plaza",parent:6340,details:{noun:"",vibes:[],msv:"140",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10223,description:"",name:"Pool",slug:"pool",parent:6337,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10430,description:"",name:"Print Shop",slug:"print_shop",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"art",level:3},{id:10082,description:"",name:"Pub",slug:"pub",parent:6331,details:{noun:"",vibes:[],msv:"480",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10259,description:"",name:"Public Art",slug:"public_art",parent:6298,details:{noun:"",vibes:[],msv:"90",icon:"",sub_categories:[]},parent_slug:"visit",level:3},{id:10523,description:"",name:"R&amp;B",slug:"r_b",parent:6343,details:{noun:"",vibes:[],msv:"10",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10085,description:"",name:"Ramen",slug:"ramen",parent:6331,details:{noun:"",vibes:[],msv:"6000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10493,description:"",name:"Reading / Lecture",slug:"reading_lecture",parent:10400,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:10583,description:"",name:"Record Store",slug:"record-store",parent:10580,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"music-store",level:3},{id:10244,description:"",name:"Recreation Center",slug:"recreation_center",parent:6337,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10178,description:"",name:"Resort",slug:"resort",parent:6294,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:13934,description:"",name:"Restaurant",slug:"restaurant",parent:6331,details:{noun:"Restaurant",vibes:[],msv:"2000",icon:"",feature_in_app_:!1,sub_categories:[]},parent_slug:"food",level:3},{id:9902,description:"",name:"Retreat",slug:"retreat",parent:9878,details:{noun:"",vibes:[],msv:"140",icon:"",sub_categories:[]},parent_slug:"health",level:3},{id:10526,description:"",name:"Rock / Indie",slug:"rock_indie",parent:6343,details:{noun:"",vibes:[],msv:"50",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10226,description:"",name:"Rock Climbing",slug:"rock_climbing",parent:6337,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10088,description:"",name:"Romanian",slug:"romanian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10091,description:"",name:"Russian",slug:"russian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:13937,description:"",name:"Salad",slug:"salad",parent:6331,details:{noun:"Salad",vibes:["vegan","vegetarian","healthy"],msv:"200",icon:"",feature_in_app_:!1,sub_categories:[]},parent_slug:"food",level:3},{id:10671,description:"",name:"Saloon",slug:"saloon",parent:6328,details:{noun:"Saloon",vibes:["oldschool","boozy","wild"],msv:"1600",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10094,description:"",name:"Sandwiches",slug:"sandwiches",parent:6331,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10097,description:"",name:"Scandinavian",slug:"scandinavian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10100,description:"",name:"Seafood",slug:"seafood",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10103,description:"",name:"Senegalese",slug:"senegalese",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:6304,description:"",name:"Shopping",slug:"shop",parent:6295,details:{noun:"Shopping",sub_categories:[{slug:"all",id:6295},{id:10379,slug:"antique"},{id:12600,slug:"automobiles"},{id:10334,slug:"books"},{id:10566,slug:"cannabis"},{id:10340,slug:"clothes"},{id:10370,slug:"convenience_store"},{id:10343,slug:"design_furniture"},{id:10346,slug:"farmers_market"},{id:10349,slug:"flea_market"},{id:10352,slug:"fragrance"},{id:10598,slug:"gift"},{id:10337,slug:"groceries"},{id:10376,slug:"health_food"},{id:10355,slug:"home_garden"},{id:10358,slug:"jewelry"},{id:10361,slug:"kids"},{id:10580,slug:"music-store"},{id:10388,slug:"night_market"},{id:10373,slug:"specialty_foods"},{id:10241,slug:"sporting_rental"},{id:10382,slug:"thrift_store"},{id:10385,slug:"vintage"}],vibes:["local","popup","vintage","thrift"],msv:"4400",icon:"shopping",feature_in_app_:!1,sections:!1},parent_slug:"all",level:2},{id:10292,description:"",name:"Shrine",slug:"shrine",parent:6293,details:{noun:"",vibes:[],msv:"1",icon:"",parent_categories:[],sub_categories:[]}},{id:10106,description:"",name:"Singaporean",slug:"singaporean",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10232,description:"",name:"Skating",slug:"skating",parent:6337,details:{noun:"",vibes:[],msv:"400",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10109,description:"",name:"Small Plates",slug:"small_plates",parent:6331,details:{noun:"",sub_categories:[],vibes:[],msv:"40",icon:"",feature_in_app_:!0},parent_slug:"food",level:3},{id:10529,description:"",name:"Soul / Funk",slug:"soul_funk",parent:6343,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10112,description:"",name:"Soul / Southern",slug:"soul_southern",parent:6331,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10115,description:"",name:"Soup",slug:"soup",parent:6331,details:{noun:"",vibes:[],msv:"400",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10118,description:"",name:"South African",slug:"south_african",parent:6331,details:{noun:"",sub_categories:[],vibes:[],msv:"1",icon:"",feature_in_app_:!1},parent_slug:"food",level:3},{id:10121,description:"",name:"South American",slug:"south_american",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10124,description:"",name:"Southeast Asian",slug:"southeast_asian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9896,description:"",name:"Spa",slug:"spa",parent:9878,details:{noun:"",vibes:[],msv:"600",icon:"",sub_categories:[]},parent_slug:"health",level:3},{id:10127,description:"",name:"Spanish",slug:"spanish",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10325,description:"",name:"Speakeasy",slug:"speakeasy",parent:6328,details:{noun:"",vibes:[],msv:"5400",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10373,description:"",name:"Specialty Food Store",slug:"specialty_foods",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10208,description:"",name:"Spin / Cycle",slug:"spin_cycle",parent:6337,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10241,description:"",name:"Sporting Goods",slug:"sporting_rental",parent:6337,details:{noun:"",sub_categories:[],vibes:[],msv:"100",icon:"",feature_in_app_:!1},parent_slug:"games",level:3},{id:6337,description:"",name:"Sports &amp; Fitness",slug:"games",parent:6295,details:{noun:"Sports & Fitness",sub_categories:[{slug:"all",id:6295},{id:10235,slug:"bowling"},{id:10187,slug:"boxing"},{id:10190,slug:"climbing"},{id:10193,slug:"crossfit"},{id:10196,slug:"dance"},{id:10199,slug:"gym"},{id:10211,slug:"gymnastics"},{id:10202,slug:"hike-games"},{id:10214,slug:"ice_skating"},{id:10217,slug:"laser_tag"},{id:10220,slug:"minature_golf"},{id:10238,slug:"paint_ball"},{id:10205,slug:"pilates"},{id:10223,slug:"pool"},{id:10244,slug:"recreation_center"},{id:10226,slug:"rock_climbing"},{id:10232,slug:"skating"},{id:10208,slug:"spin_cycle"},{id:10241,slug:"sporting_rental"},{id:10229,slug:"tennis"},{id:9893,slug:"yoga"}],vibes:["healthy","adventurous","social","fun","local","playtime","inclusive","alternative"],msv:"2000",icon:"health",feature_in_app_:!0,sections:!1},parent_slug:"all",level:2},{id:6317,description:"",name:"Stand up",slug:"stand-up",parent:6292,details:{msv:"170",sub_categories:[],vibes:[]},parent_slug:"comedy",level:3},{id:10253,description:"",name:"Statue",slug:"statue",parent:6298,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"visit",level:3},{id:6294,description:"Explore the best places to stay in %city%. From hotels to guest houses, bed and breakfasts there are great places to stay downtown or in nearby neighborhoods. There's a cozy, adventurous, fun, modern, luxury place to stay that will match your vibe. Plan your visit and book discounted stays with your partner sites.",name:"Stay",slug:"stay",parent:6295,details:{noun:"Hotels",sub_categories:[{id:10181,slug:"bed_breakfast"},{id:10638,slug:"cabin"},{id:10172,slug:"campground"},{id:10184,slug:"co_working"},{id:10644,slug:"cottage"},{id:10647,slug:"guest-house"},{id:10175,slug:"home_share"},{id:10169,slug:"hostel"},{id:10166,slug:"hotels"},{id:10635,slug:"inn"},{id:10653,slug:"lodge"},{id:10632,slug:"motel"},{id:10178,slug:"resort"},{id:10650,slug:"vacation-rental"},{id:10641,slug:"villa"}],msv:"5000",icon:"hotel",vibes:["boutique","local","luxury","design","cheap","minimalist"],feature_in_app_:!1,sections:!1},parent_slug:"all",level:2},{id:10130,description:"",name:"Steakhouse",slug:"steakhouse",parent:6331,details:{noun:"",vibes:[],msv:"9000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10427,description:"",name:"Studio",slug:"studio",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"art",level:3},{id:10133,description:"",name:"Sushi",slug:"sushi",parent:6331,details:{noun:"",vibes:[],msv:"12000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10136,description:"",name:"Tacos",slug:"tacos",parent:6331,details:{noun:"",vibes:[],msv:"2400",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10142,description:"",name:"Tapas",slug:"tapas",parent:6331,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10563,description:"",name:"Tattoo Parlor",slug:"tattoo_parlor",parent:9884,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"beauty",level:3},{id:10145,description:"",name:"Tea",slug:"tea",parent:6328,details:{noun:"Tea",vibes:[],msv:"1000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10286,description:"",name:"Temple",slug:"temple",parent:6293,details:{noun:"",vibes:[],msv:"1",icon:"",parent_categories:[],sub_categories:[]}},{id:10229,description:"",name:"Tennis",slug:"tennis",parent:6337,details:{noun:"",vibes:[],msv:"700",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10148,description:"",name:"Thai",slug:"thai",parent:6331,details:{noun:"",vibes:[],msv:"2900",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10397,description:"",name:"Theater",slug:"theater",parent:6291,details:{noun:"",sub_categories:[{id:10496,slug:"broadway"}],vibes:[],msv:"6600",icon:"",feature_in_app_:!0},parent_slug:"performance",level:3},{id:10382,description:"",name:"Thrift Store",slug:"thrift_store",parent:6304,details:{noun:"",vibes:[],msv:"6600",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10139,description:"",name:"Tiawanese",slug:"tiawanese",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:13943,description:"",name:"Tiki Bar",slug:"tiki",parent:6328,details:{noun:"",vibes:[],msv:"1",icon:"",feature_in_app_:!1,sub_categories:[]},parent_slug:"drink",level:3},{id:10247,description:"",name:"Tour",slug:"tour",parent:6298,details:{noun:"",vibes:[],msv:"9900",icon:"",sub_categories:[]},parent_slug:"visit",level:3},{id:10265,description:"",name:"Tourist Destination",slug:"tourist_destination",parent:6298,details:{noun:"",sub_categories:[{slug:"visit",id:6298}],vibes:[],msv:"1",icon:"",feature_in_app_:!1},parent_slug:"visit",level:3},{id:10367,description:"",name:"Toy Store",slug:"toy_store",parent:10361,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"kids",level:3},{id:10151,description:"",name:"Turkish",slug:"turkish",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9923,description:"",name:"Urban Farm",slug:"urbanfarm",parent:6340,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10154,description:"",name:"Uzbek",slug:"uzbek",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10650,description:"",name:"Vacation Rental",slug:"vacation-rental",parent:6294,details:{noun:"Vacation Rental",vibes:[],msv:"900",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10157,description:"",name:"Vegan",slug:"vegan",parent:6331,details:{noun:"",vibes:[],msv:"2400",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10160,description:"",name:"Vegetarian",slug:"vegetarian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10163,description:"",name:"Vietnamese",slug:"vietnamese",parent:6331,details:{noun:"",vibes:[],msv:"390",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10641,description:"",name:"Villa",slug:"villa",parent:6294,details:{noun:"Villa",vibes:["luxury","relaxing"],msv:"210",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10385,description:"",name:"Vintage Store",slug:"vintage",parent:6304,details:{noun:"",vibes:[],msv:"390",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:6298,description:"Visitors guide to the best of %city%. Discover culture, history, and landmarks while having a fun, memorable time sightseeing and exploring. We've collected must see spots and favorite for tourist and locals alike. Plan your trip or weekend getaway and book these attractions for free or at a discount.",name:"Visit",slug:"visit",parent:6295,details:{noun:"Attractions",sub_categories:[{id:10262,slug:"amusement_park"},{id:10436,slug:"aquarium"},{id:10250,slug:"landmark"},{id:10256,slug:"mural"},{id:10277,slug:"museum"},{id:10259,slug:"public_art"},{id:10253,slug:"statue"},{id:10247,slug:"tour"},{id:10265,slug:"tourist_destination"},{id:10460,slug:"zoo"}],vibes:["popular","scenic","family","artsy","historic","upscale","weekend","aquatic","botanical","cheap","cultural","dreamy","healthy","lgbtq","local","relaxing","sunny","tropical","urban","fun","tourist","cool"],msv:"5500",icon:"visitLogo",feature_in_app_:!1,sections:!1},parent_slug:"all",level:2},{id:10457,description:"",name:"Visitor Center",slug:"visitor_center",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:9878,description:"",name:"Wellness",slug:"health",parent:6295,details:{noun:"Health & Wellness",sub_categories:[{id:9881,slug:"acupuncture"},{id:9884,slug:"beauty"},{id:10566,slug:"cannabis"},{id:9899,slug:"ivtherapy"},{id:9887,slug:"massage"},{id:9890,slug:"meditation"},{id:9902,slug:"retreat"},{id:9896,slug:"spa"},{id:9893,slug:"yoga"}],vibes:[],msv:"4000",icon:"",feature_in_app_:!1,sections:!1},parent_slug:"all",level:2},{id:10331,description:"",name:"Wine Bar",slug:"wine_bar",parent:6328,details:{noun:"",vibes:[],msv:"2000",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10328,description:"",name:"Winery",slug:"winery",parent:6328,details:{noun:"",vibes:[],msv:"3000",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10532,description:"",name:"World / International",slug:"world_international",parent:6343,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:9893,description:"",name:"Yoga",slug:"yoga",parent:9878,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"health",level:3},{id:10460,description:"",name:"Zoo",slug:"zoo",parent:6291,details:{noun:"",sub_categories:[],vibes:[],msv:"20000",icon:""},parent_slug:"visit",level:3}],allActivities={activityCategories:activityCategories$1},asset={font:{icon:{name:"Nantes",woff:"https://etldev.blob.core.windows.net/fonts/Nantes-Regular.woff"}}},color={base:{white:"#ffffff",black:"#000000",gray:{50:"#f9f7fc",100:"#efeff4",200:"#e2e2ed",300:"#e4e4ea",400:"#d1d0d8",500:"#b2b1bc",600:"#9999a3",700:"#7d7c84",800:"#535156",900:"#3c3b3f",1e3:"#242326"},yellow:{bright:"#fdff00",deep:"#ef9b0d",light:"#fef483",pastel:"#f1ffcf",primary:"#fded35"},lime:{bright:"#64ff00",deep:"#58e86b",light:"#a8f36a",pastel:"#d4ffdc",primary:"#78ec6c"},green:{bright:"#54ff95",deep:"#006e59",light:"#61ecb2",pastel:"#b4ffd9",primary:"#00b459"},teal:{bright:"#00ffe4",deep:"#205273",light:"#00cec8",pastel:"#c4f7f4",primary:"#57b5b1"},blue:{bright:"#0000ff",deep:"#000045",light:"#3cd8ff",pastel:"#a0e5f7",primary:"#2d76cc"},violet:{bright:"#6b00d7",deep:"#190087",light:"#5172bf",pastel:"#cad8f9",primary:"#1d54d7"},purple:{bright:"#9100ff",deep:"#4e0089",light:"#d391fa",pastel:"#e5d0ff",primary:"#b34eff"},magenta:{bright:"#ff00ff",deep:"#7e1a65",light:"#e779b8",pastel:"#ffc4ff",primary:"#c400c4"},red:{bright:"#ff0000",deep:"#a30000",light:"#ff6434",pastel:"#ffccbc",primary:"#dd2c00"},orange:{bright:"#ef7200",deep:"#e55929",light:"#d99566",pastel:"#fff3e0",primary:"#ff5722"},golden:{bright:"#f7941d",deep:"#c66900",light:"#ffc947",pastel:"#ffffe4",primary:"#ff9800"}},heatmap:{first:"rgba(255, 200, 71, 0.8)",second:"rgba(255, 0, 255, 0.8)",third:"rgba(178, 77, 255, 0.8)",fourth:"rgba(161, 230, 247, 0.6)",fifth:"rgba(205, 244, 208, 0.4)",sixth:"#f9f7fc"},vibes:{absurd:{primary:"#a8f36a",secondary:"#00ffe4"},active:{primary:"#64ff00",secondary:"#c4f7f4"},activist:{primary:"#e779b8",secondary:"#ef9b0d"},adventurous:{primary:"#64ff00",secondary:"#00cec8",tertiary:"#c4f7f4"},alternative:{primary:"#f7941d",secondary:"#ffc947"},airy:{primary:"#fff3e0",secondary:"#f1ffcf"},analog:{primary:"#205273",secondary:"#ef7200"},antique:{primary:"#d99566",secondary:"#57b5b1"},artisanal:{primary:"#ffccbc",secondary:"#b4ffd9"},architectural:{primary:"#c400c4",secondary:"#fff3e0"},artsy:{primary:"#d391fa",secondary:"#006e59"},aquatic:{primary:"#0000ff",secondary:"#00ffe4"},art:{primary:"#d391fa",secondary:"#00cec8"},authentic:{primary:"#f7941d",secondary:"#b34eff"},aware:{primary:"#9100ff",secondary:"#00ffe4",tertiary:"#fff3e0"},beautiful:{primary:"#e5d0ff",secondary:"#e779b8"},belonging:{primary:"#f7941d",secondary:"#fdff00"},blissful:{primary:"#e779b8",secondary:"#f1ffcf"},boho:{primary:"#fff3e0",secondary:"#c66900"},bold:{primary:"#ef7200",secondary:"#ffc4ff"},boozy:{primary:"#ff5722",secondary:"#dd2c00"},botanical:{primary:"#b4ffd9",secondary:"#006e59"},bright:{primary:"#fdff00",secondary:"#d4ffdc"},busy:{primary:"#e55929",secondary:"#ff9800"},buzzing:{primary:"#c66900",secondary:"#fded35",tertiary:"#ffc947"},calm:{primary:"#ffffe4",secondary:"#d4ffdc",tertiary:"#3cd8ff"},celebration:{primary:"#ff9800",secondary:"#f1ffcf"},celebratory:{primary:"#ff9800",secondary:"#d391fa"},charming:{primary:"#cad8f9",secondary:"#e5d0ff"},cheerful:{primary:"#ffc4ff",secondary:"#fff3e0"},chill:{primary:"#a0e5f7",secondary:"#ffccbc",tertiary:"#f1ffcf"},cinematic:{primary:"#205273",secondary:"#d391fa"},civic:{primary:"#00cec8",secondary:"#205273"},classic:{primary:"#e55929",secondary:"#c400c4"},colorful:{primary:"#ff00ff",secondary:"#00cec8"},community:{primary:"#ffccbc",secondary:"#c400c4"},contemplative:{primary:"#a0e5f7",secondary:"#c4f7f4"},cool:{primary:"#57b5b1",secondary:"#3cd8ff"},courageous:{primary:"#d391fa",secondary:"#fff3e0"},collective:{primary:"#f1ffcf",secondary:"#000045"},collectable:{primary:"#d391fa",secondary:"#f1ffcf"},cozy:{primary:"#ffffe4",secondary:"#cad8f9"},cultural:{primary:"#b34eff",secondary:"#ff00ff"},curious:{primary:"#00cec8",secondary:"#ef9b0d"},cute:{primary:"#e779b8",secondary:"#fded35"},creative:{primary:"#a0e5f7",secondary:"#9100ff"},crowded:{primary:"#000045",secondary:"#ffccbc"},datespot:{primary:"#ff00ff",secondary:"#ff0000"},drip:{primary:"#e55929",secondary:"#4e0089"},diverse:{primary:"#e5d0ff",secondary:"#00ffe4"},diy:{primary:"#5172bf",secondary:"#d391fa"},dreamy:{primary:"#d391fa",secondary:"#a0e5f7",tertiary:"#f1ffcf"},drinking:{primary:"#ff5722",secondary:"#dd2c00"},dynamic:{primary:"#9100ff",secondary:"#78ec6c"},eclectic:{primary:"#ffffe4",secondary:"#64ff00"},edgy:{primary:"#1d54d7",secondary:"#fff3e0"},energetic:{primary:"#ffc947",secondary:"#fded35",tertiary:"#c66900"},energy:{primary:"#ff5722",secondary:"#ff9800"},exciting:{primary:"#fded35",secondary:"#ff00ff"},family:{primary:"#f1ffcf",secondary:"#9100ff"},festive:{primary:"#ffc947",secondary:"#ff00ff"},fierce:{primary:"#a30000",secondary:"#ffccbc"},folk:{primary:"#a30000",secondary:"#fded35"},fragrant:{primary:"#b4ffd9",secondary:"#d4ffdc"},friendly:{primary:"#3cd8ff",secondary:"#d391fa"},fun:{primary:"#ffffe4",secondary:"#00ffe4"},funny:{primary:"#00cec8",secondary:"#fded35"},generous:{primary:"#2d76cc",secondary:"#a8f36a"},happy:{primary:"#ef9b0d",secondary:"#d4ffdc"},healthy:{primary:"#c4f7f4",secondary:"#58e86b"},hippie:{primary:"#ffc4ff",secondary:"#ff9800"},historic:{primary:"#c66900",secondary:"#fff3e0"},hopeful:{primary:"#f7941d",secondary:"#d4ffdc"},inclusive:{primary:"#6b00d7",secondary:"#61ecb2"},iconic:{primary:"#7e1a65",secondary:"#ffc4ff"},inspired:{primary:"#b4ffd9",secondary:"#58e86b"},intimate:{primary:"#dd2c00",secondary:"#ffccbc"},joyful:{primary:"#3cd8ff",secondary:"#ffc4ff"},kitschy:{primary:"#ffccbc",secondary:"#006e59"},legacy:{primary:"#d391fa",secondary:"#e5d0ff"},lit:{primary:"#fded35",secondary:"#ff0000"},lively:{primary:"#ff5722",secondary:"#61ecb2"},local:{primary:"#ff00ff",secondary:"#a8f36a"},loud:{primary:"#ff5722",secondary:"#64ff00"},love:{primary:"#c400c4",secondary:"#b34eff"},magical:{primary:"#ef9b0d",secondary:"#c400c4"},mindful:{primary:"#fef483",secondary:"#d99566"},minimalist:{primary:"#e2e2ed",secondary:"#c4f7f4"},moody:{primary:"#ffccbc",secondary:"#190087"},musical:{primary:"#00ffe4",secondary:"#9100ff"},mystic:{primary:"#f1ffcf",secondary:"#c400c4"},natural:{primary:"#61ecb2",secondary:"#ffccbc"},neon:{primary:"#fdff00",secondary:"#64ff00"},new:{primary:"#64ff00",secondary:"#e5d0ff"},nostalgic:{primary:"#fff3e0",secondary:"#190087",tertiary:"#d99566"},old:{primary:"#57b5b1",secondary:"#ffccbc"},"old-school":{primary:"#190087",secondary:"#d99566",tertiary:"#fff3e0"},outdoors:{primary:"#78ec6c",secondary:"#3cd8ff"},party:{primary:"#9100ff",secondary:"#ffccbc"},patio:{primary:"#fded35",secondary:"#a8f36a"},passionate:{primary:"#ff6434",secondary:"#ffc947"},peaceful:{primary:"#3cd8ff",secondary:"#fff3e0"},playful:{primary:"#00cec8",secondary:"#a8f36a",tertiary:"#00cec8"},playtime:{primary:"#00cec8",secondary:"#a8f36a",tertiary:"#00cec8"},popular:{primary:"#e779b8",secondary:"#ffc947"},proud:{primary:"#0000ff",secondary:"#3cd8ff"},positive:{primary:"#ffc4ff",secondary:"#fded35"},quiet:{primary:"#cad8f9",secondary:"#57b5b1"},"quiet-energy":{primary:"#3cd8ff",secondary:"#b4ffd9",tertiary:"#ffffe4"},radical:{primary:"#c400c4",secondary:"#00ffe4"},rebel:{primary:"#205273",secondary:"#ffccbc"},relaxing:{primary:"#2d76cc",secondary:"#c4f7f4"},retro:{primary:"#2d76cc",secondary:"#ef9b0d"},romantic:{primary:"#ff0000",secondary:"#e5d0ff"},rousing:{primary:"#c4f7f4",secondary:"#f1ffcf"},scenic:{primary:"#58e86b",secondary:"#c4f7f4"},sensual:{primary:"#7e1a65",secondary:"#ffccbc"},serene:{primary:"#d4ffdc",secondary:"#fded35"},shimmy:{primary:"#d391fa",secondary:"#2d76cc"},sleepy:{primary:"#57b5b1",secondary:"#cad8f9"},social:{primary:"#ff0000",secondary:"#ffccbc",tertiary:"#f1ffcf"},solidarity:{primary:"#9100ff",secondary:"#00ffe4",tertiary:"#fff3e0"},spiritual:{primary:"#4e0089",secondary:"#ffc4ff"},spontaneous:{primary:"#e5d0ff",secondary:"#ffc4ff"},throwback:{primary:"#7e1a65",secondary:"#9100ff"},together:{primary:"#ff0000",secondary:"#ffccbc",tertiary:"#f1ffcf"},trendy:{primary:"#fef483",secondary:"#ff00ff"},trending:{primary:"#ffc947",secondary:"#d391fa"},tropical:{primary:"#54ff95",secondary:"#ff00ff"},trust:{primary:"#ffc947",secondary:"#e779b8"},underground:{primary:"#1d54d7",secondary:"#d391fa"},unique:{primary:"#0000ff",secondary:"#e5d0ff"},vibrant:{primary:"#9100ff",secondary:"#ffccbc"},views:{primary:"#3cd8ff",secondary:"#a0e5f7"},vintage:{primary:"#d99566",secondary:"#dd2c00"},volunteer:{primary:"#ff9800",secondary:"#a8f36a"},whimsical:{primary:"#3cd8ff",secondary:"#54ff95"},wild:{primary:"#00b459",secondary:"#006e59"},wistful:{primary:"#ffc947",secondary:"#ffc4ff"},witchy:{primary:"#e779b8",secondary:"#a30000"},witty:{primary:"#205273",secondary:"#a0e5f7"},zen:{primary:"#57b5b1",secondary:"#2d76cc"}},gradients:{quiet_energy:"#57b5b1 #d391fa"},text:{dark:"#3c3b3f",muted:"#535156",light:"#d1d0d8"},ui:{button:{active:"#3c3b3f",disabled:"#9999a3"},tab:{active:"#3c3b3f",disabled:"#b2b1bc"}}},column={gap:{desktop:"1.5rem",mobile:"0.5rem",list:"1.75rem"}},margin={center:"0 auto"},padding={item:"2.5rem",section:"3.5rem"},post={text:{block:{heading:30,subheading:18},card:{title:20,description:14,category:16},caption:16,category:18,cite:16,heading:{title:36,subheading:30,heading1:36,heading2:34,heading3:30,heading4:26,heading5:20,heading6:18},list:18,info:16,paragraph:18,pullquote:32}},transitions={base:{default:"0.35s ease !default"}},font={family:{sans:"Public Sans",serif:"Nantes"},height:{base:1.2,large:1.6,small:1,tall:1.8,none:0},size:{base:16,normal:16,small:14,tiny:12,micro:10,large:18},weight:{base:300,light:200,normal:300,link:400,medium:500,bold:700}},units={base:{base:4,huge:12,large:8,nano:.4,small:2,tiny:1}},variables={asset:asset,color:color,column:column,"line-height":{tall:1.8,large:1.6,base:1.2,small:1,none:0},margin:margin,padding:padding,post:post,transitions:transitions,font:font,units:units};const jsonpack=__webpack_require__(/*! jsonpack */ "./node_modules/jsonpack/main.js");let activityCategories={},allVibes=[],vibeRelations=[];try{const b=__webpack_require__(/*! ../dist/vibesFromCMSTaxonomy.zip.json */ "./node_modules/vibemap-constants/dist/vibesFromCMSTaxonomy.zip.json"),c=(allVibes=jsonpack.unpack(b),__webpack_require__(/*! ../dist/vibeRelations.zip.json */ "./node_modules/vibemap-constants/dist/vibeRelations.zip.json"));vibeRelations=jsonpack.unpack(c),activityCategories=allActivities.activityCategories}catch(e){console.log("Error upacking vibes ",e)}const getVibeInfo=(i="chill")=>{var e=allVibes.find(e=>e.slug===i);return e||null},getVibesFromSlugs=e=>{const s=[];return e.forEach(i=>{var e=allVibes.find(e=>e.slug===i);e&&s.push(e)}),s},getVibeGradient=(i="chill")=>{let e="#DDDDDD",s="#AAAAAA";var a=variables.color.vibes,n=(allVibes.filter(e=>i===e.key),a[i]),a=(a[i]&&(e=n.primary,s=n.secondary),{color1:e,color2:s,gradient:`linear-gradient(44deg, ${e} 20%, ${s} 100% )`});return a},getCategory=(i="food")=>{var e=activityCategories.find(e=>e.slug===i);return e||null},getCategoriesByLevel=(i=2)=>{return activityCategories.filter(e=>{return parseInt(e.level)==i})},flattenCategories=(e,a=1)=>{let n=[];return e.forEach(e=>{const{subcategories:i,...s}=e;n.push(s),1<a&&i&&0<i.length&&(n=[...n,...flattenCategories(i,a-1)])}),n},activityCategoryToOptions=e=>{return e.map(e=>{var i=e.seo&&e.seo.focuskw&&0<e.seo.focuskw.length?e.seo.focuskw:e&&e.title?e.title:e.name;return{key:e.slug,label:i,seo:e.seo,title:e.name,value:e.slug,level:e.level}})},getSubCategories=(i="all",e="all")=>{const s=activityCategories;const a=s.find(e=>e.slug===i).details.sub_categories;let n=[];switch(e){case"keys":n=a.map(e=>e.slug);break;case"all":n=a.map(e=>getCategory(e.slug));break;default:n=a}return n},getVibes=(e="keys")=>{let i=[];return i="keys"===e?allVibes.map(e=>e.slug):allVibes},searchCategories=(e="ing",i=.2,s=["name","definition","title"])=>{s={includeScore:!0,keys:s,threshold:i};const a=new Fuse__default.default(activityCategories,s);return a.search(e)},searchVibes=(e="ing",i=.2,s=["name","definition"])=>{s={includeScore:!0,keys:s,threshold:i};const a=new Fuse__default.default(allVibes,s);return a.search(e)},getVibePreferences=(e="matrix",i=null,s=0,a=!0)=>{if(!i||!i.extra_data)throw new Error("getVibePreferences: the data parameter must have a `extra_data` property");const n=getVibes("keys");let r=n.map(e=>0);const t={favorites:1,myvibes:1,vibepoints:{search:.1,vibecheck:.4,save:.5},upvotedvibes:{vibenames:.4,meta:.2},vibecheckhistory:.7},l=i.extra_data,o=(l.favorites&&Object.values(l.favorites).forEach(e=>{e&&e.properties&&e.properties.vibes&&e.properties.vibes.forEach(e=>{n.includes(e)&&(e=n.indexOf(e),r[e]=r[e]+t.favorites)})}),l.myVibes&&l.myVibes.map(function(e){n.includes(e)&&(e=n.indexOf(e),r[e]=r[e]+t.myvibes)}),l.vibePoints&&l.vibePoints.forEach(e=>{switch(e.reason){case"search vibes":e.searchVibes.forEach(e=>{e=n.indexOf(e);r[e]=r[e]+t.vibepoints.search});break;case"vibe check":if(!e.vibeCheckVibe[0])return;e.vibeCheckVibe[0].forEach(e=>{e=n.indexOf(e);r[e]=r[e]+t.vibepoints.vibecheck})}}),l.upvotedVibes&&Object.values(l.upvotedVibes).forEach(e=>{if(e&&e.place&&e.place.properties&&e.place.properties.vibes){const i=e.place.properties.vibes;i.forEach(e=>{n.includes(e)&&(e=n.indexOf(e),r[e]=r[e]+t.upvotedvibes.meta)}),e&&e.vibeNames&&e.vibeNames.forEach(e=>{n.includes(e)&&(e=n.indexOf(e),r[e]=r[e]+t.upvotedvibes.vibenames)})}}),l.vibeCheckHistory&&l.vibeCheckHistory.forEach(e=>{e&&e.vibes&&e.vibes.forEach(e=>{e.forEach(e=>{n.includes(e)&&(e=n.indexOf(e),r[e]=r[e]+t.vibecheckhistory)})})}),r.reduce((e,i)=>e<i?i:e,0));if("matrix"===e)return a&&0!==o?r.map(e=>e/o):r;const u=r.map((e,i)=>{return{key:n[i],score:a&&0!==o?e/o:e}}),d=u.sort((e,i)=>i.score-e.score),c=d.filter(e=>e.score>s);return c.map(({key:e})=>e)},getVibesFromVibeTimes=e=>{var i=e&&0<e.length?e.sort((e,i)=>i.score-e.score).map(e=>e.name):[];return console.log("Handle these vibe times: ",e,i),i},getRelatedVibes=(e=["chill"],r=.4)=>{let t=e;e=e.flatMap(e=>{var i=getVibeInfo(e);let s=[];i&&i.details&&i.details.vibes&&(t=t.concat(i.details.vibes)),i&&i.alias&&(s=t.concat([i.alias]));var a=vibeRelations[e];const n=[];for(e in a)a[e]>=r&&n.push(e);return s=t.concat(n)});return[...new Set(e)]},yourvibe_scale_v1=e=>{let i=1.061645*e**.289052;return 1<i?i=1:i<0&&(i=0),i},normalize_all=(e=500,i=1,s=100,a=1,n=10)=>{return LinearScale__default.default().domain([i,s]).range([a,n])(e)},percent_yourvibe=(e,s)=>{let a=1/e.length,n=0;var r=[];let t=0;e.map(i=>{s.includes(i)&&(n+=a,t+=1),i in vibeRelations&&s.map(e=>{e in vibeRelations[i]&&r.push(vibeRelations[i][e])})});var i=s.length-t,i=(i=1<=r.length&&1<i?Math.log10(10)/Math.log10(20):1<=r.length&&1==i?r[0]:0,normalize_all(i,0,1,0,a*(e.length-t)));n+=i;let l=yourvibe_scale_v1(n);return l<=0&&(l=.5),Math.round(100*l)};exports.activityCategoryToOptions=activityCategoryToOptions,exports.flattenCategories=flattenCategories,exports.getCategoriesByLevel=getCategoriesByLevel,exports.getCategory=getCategory,exports.getRelatedVibes=getRelatedVibes,exports.getSubCategories=getSubCategories,exports.getVibeGradient=getVibeGradient,exports.getVibeInfo=getVibeInfo,exports.getVibePreferences=getVibePreferences,exports.getVibes=getVibes,exports.getVibesFromSlugs=getVibesFromSlugs,exports.getVibesFromVibeTimes=getVibesFromVibeTimes,exports.normalize_all=normalize_all,exports.percent_yourvibe=percent_yourvibe,exports.searchCategories=searchCategories,exports.searchVibes=searchVibes,exports.yourvibe_scale_v1=yourvibe_scale_v1;


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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

/***/ }),

/***/ "./node_modules/vibemap-constants/dist/activityCategories.json":
/*!*********************************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/activityCategories.json ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"activityCategories":[{"id":9881,"description":"","name":"Acupuncture","slug":"acupuncture","parent":9878,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1300","icon":"","feature_in_app_":false},"parent_slug":"health","level":3},{"id":9830,"description":"","name":"Afghan","slug":"afghan","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"food","level":3},{"id":9833,"description":"","name":"African","slug":"african","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"10","icon":"","feature_in_app_":false},"parent_slug":"food","level":3},{"id":9836,"description":"","name":"Albanian","slug":"albanian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6295,"description":"Discover the best things to do in %city%, based on your vibe. Guides, events, activities, and more to help you plan a visit or weekend. Whether you’re a first time visitor or long-time local, we\'ll recommend something fun and interesting.","name":"All","slug":"all","parent":0,"details":{"noun":"Things to do","sub_categories":[{"slug":"food","id":6331},{"slug":"visit","id":6298},{"slug":"drink","id":6328},{"slug":"outdoors","id":6340},{"slug":"community","id":6293},{"slug":"events","id":6323},{"slug":"learning","id":6573},{"id":6334,"slug":"entertainment"},{"id":6304,"slug":"shop"},{"id":6337,"slug":"games"},{"id":6294,"slug":"stay"},{"id":9878,"slug":"health"}],"msv":"100000","icon":"allLogo","vibes":["dreamy","creative","fun","local","new","amazing","family","trending","classic","adventurous"],"parent_categories":false,"feature_in_app_":false},"level":1},{"id":9839,"description":"","name":"American / New American","slug":"american","parent":6331,"details":{"noun":"","vibes":[],"msv":"200","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10262,"description":"","name":"Amusement Park","slug":"amusement_park","parent":6298,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":10379,"description":"","name":"Antique Store","slug":"antique","parent":6304,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10436,"description":"","name":"Aquarium","slug":"aquarium","parent":6291,"details":{"noun":"Aquarium","sub_categories":[],"vibes":[],"msv":"2000","icon":"","feature_in_app_":false},"parent_slug":"visit","level":3},{"id":9917,"description":"","name":"Arboretum","slug":"arboretum","parent":6340,"details":{"noun":"","vibes":[],"msv":"600","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10406,"description":"","name":"Arcade","slug":"arcade","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"3000","icon":"","feature_in_app_":false},"parent_slug":"entertainment","level":3},{"id":9842,"description":"","name":"Argentinian","slug":"argentinian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6291,"description":"","name":"Art","slug":"art","parent":6334,"details":{"noun":"Art","msv":"2400","sub_categories":[{"id":10418,"slug":"art_museum"},{"id":10433,"slug":"arts_organization"},{"id":6307,"slug":"gallery"},{"id":10424,"slug":"photography"},{"id":10430,"slug":"print_shop"},{"id":10427,"slug":"studio"}],"vibes":["artsy","creative","inspired"],"icon":"art","feature_in_app_":true},"parent_slug":"entertainment","level":3},{"id":10418,"description":"","name":"Art Museum","slug":"art_museum","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"8000","icon":"","feature_in_app_":false},"parent_slug":"art","level":3},{"id":6334,"description":"","name":"Arts &amp; Entertainment","slug":"entertainment","parent":6295,"details":{"noun":"Entertainment","vibes":["fun","interesting","popular","lively","musical"],"msv":"500","icon":"entertainment","sub_categories":[{"id":10406,"slug":"arcade"},{"id":6291,"slug":"art"},{"id":10403,"slug":"casino"},{"id":6292,"slug":"comedy"},{"id":10412,"slug":"festival"},{"id":10394,"slug":"film"},{"id":6307,"slug":"gallery"},{"id":10421,"slug":"interactive"},{"id":10277,"slug":"museum"},{"id":6343,"slug":"music"},{"id":10668,"slug":"nightclub"},{"id":6570,"slug":"nightlife"},{"id":10400,"slug":"performance"},{"id":10397,"slug":"theater"}]},"parent_slug":"all","level":2},{"id":10433,"description":"","name":"Arts Organization","slug":"arts_organization","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"art","level":3},{"id":9845,"description":"","name":"Asian Fusion","slug":"asianfusion","parent":6331,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":13940,"description":"","name":"Attractions","slug":"attractions","parent":6323,"details":{"noun":"","vibes":[],"msv":"100","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"events","level":3},{"id":9848,"description":"","name":"Austrailian","slug":"austrailian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":12600,"description":"Cars, automobiles, and motorcycles","name":"Automobiles","slug":"automobiles","parent":6304,"details":{"noun":"automobiles","vibes":[],"msv":"20","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"shop","level":3},{"id":9851,"description":"","name":"Bagels","slug":"bagels","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9854,"description":"","name":"Bakery","slug":"bakery","parent":6331,"details":{"noun":"","vibes":[],"msv":"8000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9857,"description":"","name":"Bangladeshi","slug":"bangladeshi","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10656,"description":"","name":"Bar","slug":"bar","parent":6328,"details":{"noun":"Bar","sub_categories":[],"vibes":["drinking","boozy"],"msv":"18000","icon":"","feature_in_app_":true},"parent_slug":"drink","level":3},{"id":9860,"description":"","name":"Barbeque","slug":"barbeque","parent":6331,"details":{"noun":"","vibes":[],"msv":"1900","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10560,"description":"","name":"Barber Shop","slug":"barber","parent":9884,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"beauty","level":3},{"id":9932,"description":"","name":"Beach","slug":"beach","parent":6340,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"22000","icon":"","feature_in_app_":false},"parent_slug":"outdoors","level":3},{"id":9884,"description":"","name":"Beauty","slug":"beauty","parent":9878,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[{"id":10560,"slug":"barber"},{"id":10557,"slug":"hair"},{"id":10554,"slug":"nails"},{"id":10563,"slug":"tattoo_parlor"}]},"parent_slug":"health","level":3},{"id":10181,"description":"","name":"Bed &amp; Breakfast","slug":"bed_breakfast","parent":6294,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10301,"description":"","name":"Beer Garden","slug":"beer_garden","parent":6328,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":9863,"description":"","name":"Bistro","slug":"bistro","parent":6331,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10334,"description":"","name":"Books","slug":"books","parent":6304,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"720","icon":"","feature_in_app_":true},"parent_slug":"shop","level":3},{"id":9929,"description":"","name":"Botanical Garden","slug":"botanicalgarden","parent":6340,"details":{"noun":"","vibes":[],"msv":"320","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10235,"description":"","name":"Bowling","slug":"bowling","parent":6337,"details":{"noun":"","vibes":[],"msv":"4000","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":9866,"description":"","name":"Bowls","slug":"bowls","parent":6331,"details":{"noun":"","vibes":[],"msv":"100","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10187,"description":"","name":"Boxing","slug":"boxing","parent":6337,"details":{"noun":"","vibes":[],"msv":"700","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":9872,"description":"","name":"Brazilian","slug":"brazilian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10674,"description":"","name":"Breakfast","slug":"breakfast","parent":6331,"details":{"noun":"Breakfast","vibes":[],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10304,"description":"","name":"Brewery","slug":"brewery","parent":6328,"details":{"noun":"","vibes":[],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10662,"description":"","name":"Brewpub","slug":"brewpub","parent":6328,"details":{"noun":"Brewpub","vibes":[],"msv":"320","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10496,"description":"","name":"Broadway","slug":"broadway","parent":10397,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"theater","level":3},{"id":9869,"description":"","name":"Brunch","slug":"brunch","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"15000","icon":"","feature_in_app_":true},"parent_slug":"food","level":3},{"id":11247,"description":"","name":"Buffet","slug":"buffet","parent":6331,"details":{"noun":"","vibes":[],"msv":"400","icon":"","parent_categories":false,"sub_categories":[]}},{"id":9875,"description":"","name":"Burger","slug":"burger","parent":6331,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10469,"description":"","name":"Burlesque","slug":"burlesque","parent":10400,"details":{"noun":"","vibes":[],"msv":"300","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10472,"description":"","name":"Caberet","slug":"caberet","parent":10400,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10638,"description":"","name":"Cabin","slug":"cabin","parent":6294,"details":{"noun":"Cabin","vibes":["outdoorsy","natural","cottagecore","cottage"],"msv":"320","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":9944,"description":"","name":"Cafe","slug":"cafe","parent":6331,"details":{"noun":"Cafe","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9950,"description":"","name":"Cambodian","slug":"cambodian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10172,"description":"","name":"Campground","slug":"campground","parent":6294,"details":{"noun":"","vibes":[],"msv":"1000","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":9953,"description":"","name":"Candy","slug":"candy","parent":6331,"details":{"noun":"","vibes":[],"msv":"250","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10566,"description":"","name":"Cannabis","slug":"cannabis","parent":9878,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":true},"parent_slug":"health","level":3},{"id":9956,"description":"","name":"Caribbean","slug":"caribbean","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10403,"description":"","name":"Casino","slug":"casino","parent":6291,"details":{"noun":"","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"entertainment","level":3},{"id":9941,"description":"","name":"Cemetery","slug":"cemetery","parent":6340,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10364,"description":"","name":"Children\'s Clothing Store","slug":"childrens_clothing","parent":10361,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"kids","level":3},{"id":10439,"description":"","name":"Children\'s Museum","slug":"children_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":9959,"description":"","name":"Chinese","slug":"chinese","parent":6331,"details":{"noun":"","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10283,"description":"","name":"Church","slug":"church","parent":6293,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"community","level":3},{"id":10475,"description":"","name":"Circus","slug":"circus","parent":10400,"details":{"noun":"","vibes":[],"msv":"250","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10295,"description":"","name":"City Hall","slug":"city_hall","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"community","level":3},{"id":6573,"description":"","name":"Classes / Learning","slug":"learning","parent":6295,"details":{"vibes":["interesting","interactive","family","fun"],"icon":"learning","noun":"Learning","msv":"1","sub_categories":[{"id":6291,"slug":"art"},{"id":10680,"slug":"cooking"},{"id":10502,"slug":"dj"},{"id":6312,"slug":"improv"},{"id":6343,"slug":"music"},{"id":10424,"slug":"photography"},{"id":9893,"slug":"yoga"}]},"parent_slug":"all","level":2},{"id":10499,"description":"","name":"Classical","slug":"classical","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10190,"description":"","name":"Climbing","slug":"climbing","parent":6337,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10340,"description":"","name":"Clothes","slug":"clothes","parent":6304,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10391,"description":"","name":"Club / Dance","slug":"club","parent":6570,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10184,"description":"","name":"Co-Working Space","slug":"co_working","parent":6294,"details":{"noun":"","vibes":[],"msv":"300","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10307,"description":"","name":"Cocktails / Spirits","slug":"cocktails_spirits","parent":6328,"details":{"noun":"","vibes":[],"msv":"900","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":9947,"description":"","name":"Coffee Shop","slug":"coffeeshop","parent":6331,"details":{"noun":"","vibes":[],"msv":"4500","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9962,"description":"","name":"Colombian","slug":"colombian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6292,"description":"","name":"Comedy","slug":"comedy","parent":6295,"details":{"noun":"Comedy","vibes":["funny","raunchy","spontaneous"],"msv":"2000","icon":"comedy","sub_categories":[{"id":6317,"slug":"stand-up"}]},"parent_slug":"entertainment","level":3},{"id":6293,"description":"Explore ways to get involved in your local community. Support local businesses, volunteer, give back, or pay it forward with these community groups and hubs of local culture. ","name":"Community","slug":"community","parent":6295,"details":{"noun":"Community","sub_categories":[{"id":10283,"slug":"church"},{"id":10295,"slug":"city_hall"},{"id":10268,"slug":"community_center"},{"id":10298,"slug":"courthouse"},{"id":10274,"slug":"library"},{"id":10289,"slug":"mosque"},{"id":10277,"slug":"museum"},{"id":10271,"slug":"non_profit"}],"msv":"2","icon":"community","vibes":["community","local","cultural","multicultural","social"],"feature_in_app_":false},"parent_slug":"all","level":2},{"id":10268,"description":"","name":"Community Center","slug":"community_center","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"community","level":3},{"id":9920,"description":"","name":"Community Garden","slug":"communitygarden","parent":6340,"details":{"noun":"","vibes":[],"msv":"30","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10595,"description":"","name":"Concert","slug":"concert","parent":10400,"details":{"noun":"Concert","sub_categories":[],"vibes":["musical","lively","together"],"msv":"33000","icon":"","feature_in_app_":false},"parent_slug":"performance","level":3},{"id":10466,"description":"","name":"Conservatory","slug":"conservatory","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":10370,"description":"","name":"Convenience Store / Bodega","slug":"convenience_store","parent":6304,"details":{"noun":"","vibes":[],"msv":"100","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":13987,"description":"","name":"Cookies","slug":"cookies","parent":6331,"details":{"noun":"","vibes":[],"msv":"200","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"food","level":3},{"id":10680,"description":"","name":"Cooking","slug":"cooking","parent":6573,"details":{"noun":"Cooking","vibes":["interesting","interactive"],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"learning","level":3},{"id":10644,"description":"","name":"Cottage","slug":"cottage","parent":6294,"details":{"noun":"Cottage","vibes":["cottage","cottagecore"],"msv":"110","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10298,"description":"","name":"Courthouse","slug":"courthouse","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"community","level":3},{"id":10310,"description":"","name":"Craft Beer","slug":"craft_beer","parent":6328,"details":{"noun":"","vibes":[],"msv":"250","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10193,"description":"","name":"CrossFit","slug":"crossfit","parent":6337,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":9965,"description":"","name":"Cuban","slug":"cuban","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10442,"description":"","name":"Cultural Museum","slug":"cultural_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":9968,"description":"","name":"Cupcakes","slug":"cupcakes","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10196,"description":"","name":"Dance","slug":"dance","parent":6337,"details":{"noun":"","vibes":[],"msv":"600","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10592,"description":"","name":"Dance","slug":"dance-performance","parent":10400,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":9971,"description":"","name":"Deli","slug":"deli","parent":6331,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10445,"description":"","name":"Design Museum","slug":"design_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"10","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":10343,"description":"","name":"Design/Furniture","slug":"design_furniture","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":9974,"description":"","name":"Dessert","slug":"dessert","parent":6331,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9977,"description":"","name":"Diner","slug":"diner","parent":6331,"details":{"noun":"","vibes":[],"msv":"6000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10659,"description":"","name":"Distillery","slug":"distillery","parent":6328,"details":{"noun":"Distillery","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10313,"description":"","name":"Dive Bar","slug":"dive_bar","parent":6328,"details":{"noun":"","vibes":[],"msv":"80","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10502,"description":"","name":"DJ","slug":"dj","parent":6343,"details":{"noun":"DJ","vibes":[],"msv":"30","icon":"","sub_categories":[]},"parent_slug":"learning","level":3},{"id":9980,"description":"","name":"Dominican","slug":"dominican","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9983,"description":"","name":"Donuts","slug":"donuts","parent":6331,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6328,"description":"Where to drink and enjoy beer, wine, cocktails and sober-friendly options including coffee, tea, and more. Discover drinking styles like tiki, bubbly, and sober-friendly. Beyond watering holes, check out outdoor spots, events, and tours.","name":"Drink","slug":"drink","parent":6295,"details":{"noun":"Drinking","sub_categories":[{"slug":"all","id":6295},{"id":10656,"slug":"bar"},{"id":10301,"slug":"beer_garden"},{"id":10304,"slug":"brewery"},{"id":10662,"slug":"brewpub"},{"id":9944,"slug":"cafe"},{"id":10391,"slug":"club"},{"id":10307,"slug":"cocktails_spirits"},{"id":9947,"slug":"coffeeshop"},{"id":10310,"slug":"craft_beer"},{"id":10659,"slug":"distillery"},{"id":10313,"slug":"dive_bar"},{"id":10013,"slug":"gastropub"},{"id":10319,"slug":"juice_smoothie"},{"id":10665,"slug":"lounge"},{"id":10322,"slug":"mocktails"},{"id":10668,"slug":"nightclub"},{"id":10082,"slug":"pub"},{"id":10671,"slug":"saloon"},{"id":10325,"slug":"speakeasy"},{"id":10145,"slug":"tea"},{"id":13943,"slug":"tiki"},{"id":10331,"slug":"wine_bar"},{"id":10328,"slug":"winery"}],"vibes":["fun","boozy","happy","cheap","friendly"],"msv":"9000","icon":"drink","feature_in_app_":false},"parent_slug":"all","level":2},{"id":9986,"description":"","name":"Eastern European","slug":"eastern_european","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9989,"description":"","name":"Egyptian","slug":"egyptian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10505,"description":"","name":"Electronic / Dance","slug":"electronic_dance","parent":6343,"details":{"noun":"","vibes":[],"msv":"80","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":9992,"description":"","name":"English","slug":"english","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9995,"description":"","name":"Ethiopian","slug":"ethiopian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6323,"description":"Explore what\'s happening in %city%. Make a plan for tonight or this weekend with your events calendar. Explore art, music, nightlife based on your vibe.","name":"Events","slug":"events","parent":0,"details":{"noun":"Events","sub_categories":[{"slug":"concert","id":10595},{"slug":"music","id":6343},{"slug":"comedy","id":6292},{"slug":"art","id":6291},{"id":13940,"slug":"attractions"},{"id":10334,"slug":"books"},{"id":6293,"slug":"community"},{"id":6328,"slug":"drink"},{"id":11658,"slug":"family"},{"id":10412,"slug":"festival"},{"id":10394,"slug":"film"},{"id":6331,"slug":"food"},{"id":6340,"slug":"outdoors"},{"id":9878,"slug":"health"}],"vibes":["local","chill","fun","unique"],"msv":"4000","icon":"events","feature_in_app_":true,"sections":false},"parent_slug":"all","level":2},{"id":10448,"description":"","name":"Experiential","slug":"experiential","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":10478,"description":"","name":"Experimental","slug":"experimental","parent":10400,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":11658,"description":"Ways to get out and have fun with your entire family","name":"Family","slug":"family","parent":0,"details":{"noun":"","vibes":["family","kidcore","children"],"msv":"800","icon":"","sub_categories":[],"feature_in_app_":false},"parent_slug":"events","level":3},{"id":9926,"description":"","name":"Farm","slug":"farm","parent":6340,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":9998,"description":"","name":"Farm to Table","slug":"farm_table","parent":6331,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10346,"description":"","name":"Farmers Market","slug":"farmers_market","parent":6304,"details":{"noun":"","vibes":[],"msv":"10000","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10412,"description":"","name":"Festival","slug":"festival","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1200","icon":"","feature_in_app_":false},"parent_slug":"events","level":3},{"id":10001,"description":"","name":"Filipino","slug":"filipino","parent":6331,"details":{"noun":"","vibes":[],"msv":"1000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10394,"description":"","name":"Film","slug":"film","parent":6291,"details":{"noun":"","vibes":[],"msv":"50","icon":"","sub_categories":[{"id":10535,"slug":"movie_theater"}]},"parent_slug":"entertainment","level":3},{"id":10451,"description":"","name":"Film Museum","slug":"film_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":10677,"description":"","name":"Fine Dining","slug":"fine-dining","parent":6331,"details":{"noun":"Fine Dining","vibes":["elegant","luxury","fancy"],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10349,"description":"","name":"Flea Market","slug":"flea_market","parent":6304,"details":{"noun":"","vibes":[],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10508,"description":"","name":"Folk / Country","slug":"folk_country","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":6331,"description":"Eat and explore culinary culture. Whether your vibe is a lively brunch, a friendly lunch, a chill breakfast, or an intimate dinner, we\'ve got you covered with the best restaurants and other places to eat, including outdoor patios, rooftop bars, and markets. You can also discover by taste, like savory, sweet, and spicy.","name":"Food","slug":"food","parent":6295,"details":{"noun":"Food","sub_categories":[{"id":9830,"slug":"afghan"},{"id":9833,"slug":"african"},{"id":9836,"slug":"albanian"},{"id":9839,"slug":"american"},{"id":9842,"slug":"argentinian"},{"id":9845,"slug":"asianfusion"},{"id":9848,"slug":"austrailian"},{"id":9851,"slug":"bagels"},{"id":9854,"slug":"bakery"},{"id":9857,"slug":"bangladeshi"},{"id":9860,"slug":"barbeque"},{"id":9863,"slug":"bistro"},{"id":9866,"slug":"bowls"},{"id":9872,"slug":"brazilian"},{"id":10674,"slug":"breakfast"},{"id":9869,"slug":"brunch"},{"id":9875,"slug":"burger"},{"id":9944,"slug":"cafe"},{"id":9950,"slug":"cambodian"},{"id":9953,"slug":"candy"},{"id":9956,"slug":"caribbean"},{"id":9959,"slug":"chinese"},{"id":9947,"slug":"coffeeshop"},{"id":9962,"slug":"colombian"},{"id":13987,"slug":"cookies"},{"id":9965,"slug":"cuban"},{"id":9968,"slug":"cupcakes"},{"id":9971,"slug":"deli"},{"id":9974,"slug":"dessert"},{"id":9977,"slug":"diner"},{"id":9980,"slug":"dominican"},{"id":9983,"slug":"donuts"},{"id":9986,"slug":"eastern_european"},{"id":9989,"slug":"egyptian"},{"id":9992,"slug":"english"},{"id":9995,"slug":"ethiopian"},{"id":9998,"slug":"farm_table"},{"id":10001,"slug":"filipino"},{"id":10677,"slug":"fine-dining"},{"id":10004,"slug":"food_hall"},{"id":10007,"slug":"food_truck"},{"id":10010,"slug":"french"},{"id":10013,"slug":"gastropub"},{"id":10016,"slug":"german"},{"id":10019,"slug":"greek"},{"id":10022,"slug":"hawaiian"},{"id":10025,"slug":"himalayan_nepalese_tibetan"},{"id":10028,"slug":"hungarian"},{"id":10031,"slug":"ice_cream"},{"id":10034,"slug":"indian"},{"id":10037,"slug":"italian"},{"id":10040,"slug":"jamaican"},{"id":10043,"slug":"japanese"},{"id":10046,"slug":"korean"},{"id":10049,"slug":"latin_american"},{"id":10052,"slug":"mediterranean"},{"id":10055,"slug":"mexican"},{"id":10058,"slug":"middle_eastern"},{"id":10061,"slug":"modern_european"},{"id":10064,"slug":"moroccan"},{"id":10067,"slug":"new_zealand"},{"id":10070,"slug":"pakastani"},{"id":10073,"slug":"persian"},{"id":10076,"slug":"peruvian"},{"id":10079,"slug":"pizza"},{"id":10082,"slug":"pub"},{"id":10085,"slug":"ramen"},{"id":13934,"slug":"restaurant"},{"id":10088,"slug":"romanian"},{"id":10091,"slug":"russian"},{"id":13937,"slug":"salad"},{"id":10094,"slug":"sandwiches"},{"id":10097,"slug":"scandinavian"},{"id":10100,"slug":"seafood"},{"id":10103,"slug":"senegalese"},{"id":10106,"slug":"singaporean"},{"id":10109,"slug":"small_plates"},{"id":10112,"slug":"soul_southern"},{"id":10115,"slug":"soup"},{"id":10118,"slug":"south_african"},{"id":10121,"slug":"south_american"},{"id":10124,"slug":"southeast_asian"},{"id":10127,"slug":"spanish"},{"id":10130,"slug":"steakhouse"},{"id":10133,"slug":"sushi"},{"id":10136,"slug":"tacos"},{"id":10142,"slug":"tapas"},{"id":10145,"slug":"tea"},{"id":10148,"slug":"thai"},{"id":10139,"slug":"tiawanese"},{"id":10151,"slug":"turkish"},{"id":10154,"slug":"uzbek"},{"id":10157,"slug":"vegan"},{"id":10160,"slug":"vegetarian"},{"id":10163,"slug":"vietnamese"}],"vibes":["local","foodie","authentic","new","spicy","sweet","popup"],"msv":"15000","icon":"food","feature_in_app_":false},"parent_slug":"all","level":2},{"id":10004,"description":"","name":"Food Hall","slug":"food_hall","parent":6331,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10007,"description":"","name":"Food Truck / Cart","slug":"food_truck","parent":6331,"details":{"noun":"","vibes":[],"msv":"3600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10352,"description":"","name":"Fragrance","slug":"fragrance","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10010,"description":"","name":"French","slug":"french","parent":6331,"details":{"noun":"","vibes":[],"msv":"300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6307,"description":"","name":"Gallery","slug":"gallery","parent":6291,"details":{"vibes":["small","local","community"],"noun":"","sub_categories":[],"msv":"600","icon":"","feature_in_app_":true},"parent_slug":"art","level":3},{"id":9905,"description":"","name":"Garden","slug":"garden","parent":6340,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"2400","icon":"","feature_in_app_":true},"parent_slug":"outdoors","level":3},{"id":10013,"description":"","name":"Gastropub","slug":"gastropub","parent":6331,"details":{"noun":"","vibes":[],"msv":"260","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10016,"description":"","name":"German","slug":"german","parent":6331,"details":{"noun":"","vibes":[],"msv":"50","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10598,"description":"","name":"Gift","slug":"gift","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10019,"description":"","name":"Greek","slug":"greek","parent":6331,"details":{"noun":"","vibes":[],"msv":"200","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10337,"description":"","name":"Groceries","slug":"groceries","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10647,"description":"","name":"Guest house","slug":"guest-house","parent":6294,"details":{"noun":"Guest house","vibes":[],"msv":"110","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10199,"description":"","name":"Gym","slug":"gym","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10211,"description":"","name":"Gymnastics","slug":"gymnastics","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10557,"description":"","name":"Hair Salon","slug":"hair","parent":9884,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"beauty","level":3},{"id":10022,"description":"","name":"Hawaiian","slug":"hawaiian","parent":6331,"details":{"noun":"","vibes":[],"msv":"100","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10376,"description":"","name":"Health Food Store","slug":"health_food","parent":6304,"details":{"noun":"","vibes":[],"msv":"20","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10202,"description":"","name":"Hike","slug":"hike-games","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":9935,"description":"","name":"Hiking","slug":"hike","parent":6340,"details":{"noun":"Hiking","sub_categories":[],"vibes":["hiking"],"msv":"8000","icon":"","feature_in_app_":true},"parent_slug":"outdoors","level":3},{"id":10025,"description":"","name":"Himalayan/Nepalese/Tibetan","slug":"himalayan_nepalese_tibetan","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10511,"description":"","name":"Hip Hop / Rap","slug":"hiphop_rap","parent":6343,"details":{"noun":"","vibes":[],"msv":"100","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10454,"description":"","name":"History Museum","slug":"history_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"500","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":10355,"description":"","name":"Home &amp; Garden","slug":"home_garden","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10175,"description":"","name":"Home share (AirBNB, VRBO, etc.)","slug":"home_share","parent":6294,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10169,"description":"","name":"Hostel","slug":"hostel","parent":6294,"details":{"noun":"","vibes":[],"msv":"4000","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10166,"description":"","name":"Hotel","slug":"hotels","parent":6294,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1400","icon":"","feature_in_app_":true},"parent_slug":"stay","level":3},{"id":10028,"description":"","name":"Hungarian","slug":"hungarian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10031,"description":"","name":"Ice Cream","slug":"ice_cream","parent":6331,"details":{"noun":"","vibes":[],"msv":"3600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10214,"description":"","name":"Ice Skating","slug":"ice_skating","parent":6337,"details":{"noun":"","vibes":[],"msv":"80","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":6312,"description":"","name":"Improv","slug":"improv","parent":6292,"details":{"msv":"480","noun":"","vibes":[],"icon":"","sub_categories":[]},"parent_slug":"learning","level":3},{"id":10481,"description":"","name":"Improv","slug":"improv-performance","parent":10400,"details":{"noun":"","vibes":[],"msv":"480","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10034,"description":"","name":"Indian","slug":"indian","parent":6331,"details":{"noun":"","vibes":[],"msv":"300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10635,"description":"","name":"Inn","slug":"inn","parent":6294,"details":{"noun":"Inn","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10514,"description":"","name":"Instrumental","slug":"instrumental","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10421,"description":"","name":"Interactive","slug":"interactive","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"10","icon":"","feature_in_app_":false},"parent_slug":"entertainment","level":3},{"id":10037,"description":"","name":"Italian","slug":"italian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9899,"description":"","name":"IV Therapy","slug":"ivtherapy","parent":9878,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10040,"description":"","name":"Jamaican","slug":"jamaican","parent":6331,"details":{"noun":"","vibes":[],"msv":"260","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10043,"description":"","name":"Japanese","slug":"japanese","parent":6331,"details":{"noun":"","vibes":[],"msv":"900","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10517,"description":"","name":"Jazz","slug":"jazz","parent":6343,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10358,"description":"","name":"Jewelry","slug":"jewelry","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10319,"description":"","name":"Juice / Smoothie","slug":"juice_smoothie","parent":6328,"details":{"noun":"","vibes":[],"msv":"140","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10520,"description":"","name":"Karaoke","slug":"karaoke","parent":6343,"details":{"noun":"","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10361,"description":"","name":"Kids","slug":"kids","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[{"id":10364,"slug":"childrens_clothing"},{"id":10367,"slug":"toy_store"}]},"parent_slug":"shop","level":3},{"id":10586,"description":"","name":"Kids","slug":"kids-music","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10589,"description":"","name":"Kids","slug":"kids-performance","parent":10400,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10046,"description":"","name":"Korean","slug":"korean","parent":6331,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10250,"description":"","name":"Landmark","slug":"landmark","parent":6298,"details":{"noun":"","vibes":[],"msv":"2900","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":10217,"description":"","name":"Laser Tag","slug":"laser_tag","parent":6337,"details":{"noun":"","vibes":[],"msv":"700","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10049,"description":"","name":"Latin American","slug":"latin_american","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10274,"description":"","name":"Library","slug":"library","parent":6293,"details":{"noun":"","vibes":[],"msv":"14000","icon":"","sub_categories":[]},"parent_slug":"community","level":3},{"id":10653,"description":"","name":"Lodge","slug":"lodge","parent":0,"details":{"noun":"Lodge","vibes":["rustic","cozy"],"msv":"20","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10665,"description":"","name":"Lounge","slug":"lounge","parent":6328,"details":{"noun":"Lounge","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10484,"description":"","name":"Magic","slug":"magic","parent":10400,"details":{"noun":"","vibes":[],"msv":"200","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":11244,"description":"","name":"Mall","slug":"mall","parent":6304,"details":{"noun":"","vibes":[],"msv":"1000","icon":"","parent_categories":false,"sub_categories":[]}},{"id":9887,"description":"","name":"Massage","slug":"massage","parent":9878,"details":{"noun":"","vibes":[],"msv":"8000","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":9890,"description":"","name":"Meditation","slug":"meditation","parent":9878,"details":{"noun":"","vibes":[],"msv":"390","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10052,"description":"","name":"Mediterranean","slug":"mediterranean","parent":6331,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10055,"description":"","name":"Mexican","slug":"mexican","parent":6331,"details":{"noun":"","vibes":[],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10058,"description":"","name":"Middle Eastern","slug":"middle_eastern","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10220,"description":"","name":"Miniature Golf","slug":"minature_golf","parent":6337,"details":{"noun":"","vibes":[],"msv":"700","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10322,"description":"","name":"Mocktails","slug":"mocktails","parent":6328,"details":{"noun":"","vibes":[],"msv":"40","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10061,"description":"","name":"Modern European","slug":"modern_european","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10064,"description":"","name":"Moroccan","slug":"moroccan","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10289,"description":"","name":"Mosque","slug":"mosque","parent":6293,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"community","level":3},{"id":10632,"description":"","name":"Motel","slug":"motel","parent":6294,"details":{"noun":"Motel","sub_categories":[],"vibes":[],"msv":"18000","icon":"","feature_in_app_":false},"parent_slug":"stay","level":3},{"id":10535,"description":"","name":"Movie Theater","slug":"movie_theater","parent":10394,"details":{"noun":"","vibes":[],"msv":"10000","icon":"","sub_categories":[]},"parent_slug":"film","level":3},{"id":10256,"description":"","name":"Mural","slug":"mural","parent":6298,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":10277,"description":"","name":"Museum","slug":"museum","parent":6293,"details":{"noun":"","sub_categories":[{"id":10436,"slug":"aquarium"},{"id":10439,"slug":"children_museum"},{"id":10466,"slug":"conservatory"},{"id":10442,"slug":"cultural_museum"},{"id":10445,"slug":"design_museum"},{"id":10448,"slug":"experiential"},{"id":10451,"slug":"film_museum"},{"id":10454,"slug":"history_museum"},{"id":10463,"slug":"planetarium"},{"id":10457,"slug":"visitor_center"},{"id":10460,"slug":"zoo"}],"vibes":[],"msv":"800","icon":"","feature_in_app_":true},"parent_slug":"community","level":3},{"id":6343,"description":"","name":"Music","slug":"music","parent":6295,"details":{"vibes":["local","popular","jazzy","lit","shimmy"],"noun":"Music","sub_categories":[{"id":10499,"slug":"classical"},{"id":10502,"slug":"dj"},{"id":10505,"slug":"electronic_dance"},{"id":10508,"slug":"folk_country"},{"id":10511,"slug":"hiphop_rap"},{"id":10514,"slug":"instrumental"},{"id":10517,"slug":"jazz"},{"id":10520,"slug":"karaoke"},{"id":10586,"slug":"kids-music"},{"id":10523,"slug":"r_b"},{"id":10526,"slug":"rock_indie"},{"id":10529,"slug":"soul_funk"},{"id":10532,"slug":"world_international"}],"msv":"1300","icon":"music","feature_in_app_":false},"parent_slug":"entertainment","level":3},{"id":10580,"description":"","name":"Music Shop","slug":"music-store","parent":6304,"details":{"noun":"","sub_categories":[{"id":10583,"slug":"record-store"}],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"shop","level":3},{"id":10487,"description":"","name":"Musical","slug":"musical","parent":10400,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10554,"description":"","name":"Nail Salon","slug":"nails","parent":9884,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"beauty","level":3},{"id":9938,"description":"","name":"Natural Area","slug":"natural_area","parent":6340,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10067,"description":"","name":"New Zealand","slug":"new_zealand","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10388,"description":"","name":"Night Market","slug":"night_market","parent":6304,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10668,"description":"","name":"Nightclub","slug":"nightclub","parent":6328,"details":{"noun":"Nightclub","vibes":["latenight","after-party","party"],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"nightlife","level":3},{"id":6570,"description":"","name":"Nightlife","slug":"nightlife","parent":6295,"details":{"vibes":["latenight","lit","musical","buzzing","boozy"],"noun":"Nightlife","sub_categories":[{"id":10391,"slug":"club"},{"id":10668,"slug":"nightclub"},{"id":10325,"slug":"speakeasy"}],"msv":"12000","icon":"nightlife","feature_in_app_":false},"parent_slug":"entertainment","level":3},{"id":10271,"description":"","name":"Non-Profit Organization","slug":"non_profit","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"community","level":3},{"id":10490,"description":"","name":"Opera","slug":"opera","parent":10400,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":6340,"description":"","name":"Outdoors","slug":"outdoors","parent":6295,"details":{"noun":"Outdoors","sub_categories":[{"id":9917,"slug":"arboretum"},{"id":9932,"slug":"beach"},{"id":9929,"slug":"botanicalgarden"},{"id":10638,"slug":"cabin"},{"id":9941,"slug":"cemetery"},{"id":9920,"slug":"communitygarden"},{"id":9926,"slug":"farm"},{"id":9905,"slug":"garden"},{"id":9935,"slug":"hike"},{"id":9938,"slug":"natural_area"},{"id":9908,"slug":"park"},{"id":9911,"slug":"playground"},{"id":9914,"slug":"plaza"},{"id":9923,"slug":"urbanfarm"}],"vibes":["fun","mindful","sunny","adventurous","relaxing"],"msv":"110","icon":"outdoors","feature_in_app_":false},"parent_slug":"all","level":2},{"id":10238,"description":"","name":"Paint Ball","slug":"paint_ball","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10070,"description":"","name":"Pakastani","slug":"pakastani","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9908,"description":"","name":"Park","slug":"park","parent":6340,"details":{"noun":"","vibes":[],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10400,"description":"","name":"Performance","slug":"performance","parent":6291,"details":{"noun":"Performing Arts","sub_categories":[{"id":10469,"slug":"burlesque"},{"id":10472,"slug":"caberet"},{"id":10475,"slug":"circus"},{"id":6292,"slug":"comedy"},{"id":10595,"slug":"concert"},{"id":10592,"slug":"dance-performance"},{"id":10478,"slug":"experimental"},{"id":10481,"slug":"improv-performance"},{"id":10589,"slug":"kids-performance"},{"id":10484,"slug":"magic"},{"id":10487,"slug":"musical"},{"id":10490,"slug":"opera"},{"id":10493,"slug":"reading_lecture"},{"id":10397,"slug":"theater"}],"vibes":[],"msv":"40","icon":"","feature_in_app_":true},"parent_slug":"entertainment","level":3},{"id":10073,"description":"","name":"Persian","slug":"persian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10076,"description":"","name":"Peruvian","slug":"peruvian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10424,"description":"","name":"Photography","slug":"photography","parent":6291,"details":{"noun":"Photography","vibes":[],"msv":"260","icon":"","sub_categories":[]},"parent_slug":"learning","level":3},{"id":10205,"description":"","name":"Pilates","slug":"pilates","parent":6337,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10079,"description":"","name":"Pizza","slug":"pizza","parent":6331,"details":{"noun":"","vibes":[],"msv":"8000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10463,"description":"","name":"Planetarium","slug":"planetarium","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":9911,"description":"","name":"Playground","slug":"playground","parent":6340,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":9914,"description":"","name":"Plaza","slug":"plaza","parent":6340,"details":{"noun":"","vibes":[],"msv":"140","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10223,"description":"","name":"Pool","slug":"pool","parent":6337,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10430,"description":"","name":"Print Shop","slug":"print_shop","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"art","level":3},{"id":10082,"description":"","name":"Pub","slug":"pub","parent":6331,"details":{"noun":"","vibes":[],"msv":"480","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10259,"description":"","name":"Public Art","slug":"public_art","parent":6298,"details":{"noun":"","vibes":[],"msv":"90","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":10523,"description":"","name":"R&amp;B","slug":"r_b","parent":6343,"details":{"noun":"","vibes":[],"msv":"10","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10085,"description":"","name":"Ramen","slug":"ramen","parent":6331,"details":{"noun":"","vibes":[],"msv":"6000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10493,"description":"","name":"Reading / Lecture","slug":"reading_lecture","parent":10400,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10583,"description":"","name":"Record Store","slug":"record-store","parent":10580,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music-store","level":3},{"id":10244,"description":"","name":"Recreation Center","slug":"recreation_center","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10178,"description":"","name":"Resort","slug":"resort","parent":6294,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":13934,"description":"","name":"Restaurant","slug":"restaurant","parent":6331,"details":{"noun":"Restaurant","vibes":[],"msv":"2000","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"food","level":3},{"id":9902,"description":"","name":"Retreat","slug":"retreat","parent":9878,"details":{"noun":"","vibes":[],"msv":"140","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10526,"description":"","name":"Rock / Indie","slug":"rock_indie","parent":6343,"details":{"noun":"","vibes":[],"msv":"50","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10226,"description":"","name":"Rock Climbing","slug":"rock_climbing","parent":6337,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10088,"description":"","name":"Romanian","slug":"romanian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10091,"description":"","name":"Russian","slug":"russian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":13937,"description":"","name":"Salad","slug":"salad","parent":6331,"details":{"noun":"Salad","vibes":["vegan","vegetarian","healthy"],"msv":"200","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"food","level":3},{"id":10671,"description":"","name":"Saloon","slug":"saloon","parent":6328,"details":{"noun":"Saloon","vibes":["oldschool","boozy","wild"],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10094,"description":"","name":"Sandwiches","slug":"sandwiches","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10097,"description":"","name":"Scandinavian","slug":"scandinavian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10100,"description":"","name":"Seafood","slug":"seafood","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10103,"description":"","name":"Senegalese","slug":"senegalese","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6304,"description":"","name":"Shopping","slug":"shop","parent":6295,"details":{"noun":"Shopping","sub_categories":[{"slug":"all","id":6295},{"id":10379,"slug":"antique"},{"id":12600,"slug":"automobiles"},{"id":10334,"slug":"books"},{"id":10566,"slug":"cannabis"},{"id":10340,"slug":"clothes"},{"id":10370,"slug":"convenience_store"},{"id":10343,"slug":"design_furniture"},{"id":10346,"slug":"farmers_market"},{"id":10349,"slug":"flea_market"},{"id":10352,"slug":"fragrance"},{"id":10598,"slug":"gift"},{"id":10337,"slug":"groceries"},{"id":10376,"slug":"health_food"},{"id":10355,"slug":"home_garden"},{"id":10358,"slug":"jewelry"},{"id":10361,"slug":"kids"},{"id":10580,"slug":"music-store"},{"id":10388,"slug":"night_market"},{"id":10373,"slug":"specialty_foods"},{"id":10241,"slug":"sporting_rental"},{"id":10382,"slug":"thrift_store"},{"id":10385,"slug":"vintage"}],"vibes":["local","popup","vintage","thrift"],"msv":"4400","icon":"shopping","feature_in_app_":false,"sections":false},"parent_slug":"all","level":2},{"id":10292,"description":"","name":"Shrine","slug":"shrine","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","parent_categories":[],"sub_categories":[]}},{"id":10106,"description":"","name":"Singaporean","slug":"singaporean","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10232,"description":"","name":"Skating","slug":"skating","parent":6337,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10109,"description":"","name":"Small Plates","slug":"small_plates","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"40","icon":"","feature_in_app_":true},"parent_slug":"food","level":3},{"id":10529,"description":"","name":"Soul / Funk","slug":"soul_funk","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10112,"description":"","name":"Soul / Southern","slug":"soul_southern","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10115,"description":"","name":"Soup","slug":"soup","parent":6331,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10118,"description":"","name":"South African","slug":"south_african","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"food","level":3},{"id":10121,"description":"","name":"South American","slug":"south_american","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10124,"description":"","name":"Southeast Asian","slug":"southeast_asian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9896,"description":"","name":"Spa","slug":"spa","parent":9878,"details":{"noun":"","vibes":[],"msv":"600","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10127,"description":"","name":"Spanish","slug":"spanish","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10325,"description":"","name":"Speakeasy","slug":"speakeasy","parent":6328,"details":{"noun":"","vibes":[],"msv":"5400","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10373,"description":"","name":"Specialty Food Store","slug":"specialty_foods","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10208,"description":"","name":"Spin / Cycle","slug":"spin_cycle","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10241,"description":"","name":"Sporting Goods","slug":"sporting_rental","parent":6337,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"100","icon":"","feature_in_app_":false},"parent_slug":"games","level":3},{"id":6337,"description":"","name":"Sports &amp; Fitness","slug":"games","parent":6295,"details":{"noun":"Sports & Fitness","sub_categories":[{"slug":"all","id":6295},{"id":10235,"slug":"bowling"},{"id":10187,"slug":"boxing"},{"id":10190,"slug":"climbing"},{"id":10193,"slug":"crossfit"},{"id":10196,"slug":"dance"},{"id":10199,"slug":"gym"},{"id":10211,"slug":"gymnastics"},{"id":10202,"slug":"hike-games"},{"id":10214,"slug":"ice_skating"},{"id":10217,"slug":"laser_tag"},{"id":10220,"slug":"minature_golf"},{"id":10238,"slug":"paint_ball"},{"id":10205,"slug":"pilates"},{"id":10223,"slug":"pool"},{"id":10244,"slug":"recreation_center"},{"id":10226,"slug":"rock_climbing"},{"id":10232,"slug":"skating"},{"id":10208,"slug":"spin_cycle"},{"id":10241,"slug":"sporting_rental"},{"id":10229,"slug":"tennis"},{"id":9893,"slug":"yoga"}],"vibes":["healthy","adventurous","social","fun","local","playtime","inclusive","alternative"],"msv":"2000","icon":"health","feature_in_app_":true,"sections":false},"parent_slug":"all","level":2},{"id":6317,"description":"","name":"Stand up","slug":"stand-up","parent":6292,"details":{"msv":"170","sub_categories":[],"vibes":[]},"parent_slug":"comedy","level":3},{"id":10253,"description":"","name":"Statue","slug":"statue","parent":6298,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":6294,"description":"Explore the best places to stay in %city%. From hotels to guest houses, bed and breakfasts there are great places to stay downtown or in nearby neighborhoods. There\'s a cozy, adventurous, fun, modern, luxury place to stay that will match your vibe. Plan your visit and book discounted stays with your partner sites.","name":"Stay","slug":"stay","parent":6295,"details":{"noun":"Hotels","sub_categories":[{"id":10181,"slug":"bed_breakfast"},{"id":10638,"slug":"cabin"},{"id":10172,"slug":"campground"},{"id":10184,"slug":"co_working"},{"id":10644,"slug":"cottage"},{"id":10647,"slug":"guest-house"},{"id":10175,"slug":"home_share"},{"id":10169,"slug":"hostel"},{"id":10166,"slug":"hotels"},{"id":10635,"slug":"inn"},{"id":10653,"slug":"lodge"},{"id":10632,"slug":"motel"},{"id":10178,"slug":"resort"},{"id":10650,"slug":"vacation-rental"},{"id":10641,"slug":"villa"}],"msv":"5000","icon":"hotel","vibes":["boutique","local","luxury","design","cheap","minimalist"],"feature_in_app_":false,"sections":false},"parent_slug":"all","level":2},{"id":10130,"description":"","name":"Steakhouse","slug":"steakhouse","parent":6331,"details":{"noun":"","vibes":[],"msv":"9000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10427,"description":"","name":"Studio","slug":"studio","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"art","level":3},{"id":10133,"description":"","name":"Sushi","slug":"sushi","parent":6331,"details":{"noun":"","vibes":[],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10136,"description":"","name":"Tacos","slug":"tacos","parent":6331,"details":{"noun":"","vibes":[],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10142,"description":"","name":"Tapas","slug":"tapas","parent":6331,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10563,"description":"","name":"Tattoo Parlor","slug":"tattoo_parlor","parent":9884,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"beauty","level":3},{"id":10145,"description":"","name":"Tea","slug":"tea","parent":6328,"details":{"noun":"Tea","vibes":[],"msv":"1000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10286,"description":"","name":"Temple","slug":"temple","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","parent_categories":[],"sub_categories":[]}},{"id":10229,"description":"","name":"Tennis","slug":"tennis","parent":6337,"details":{"noun":"","vibes":[],"msv":"700","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10148,"description":"","name":"Thai","slug":"thai","parent":6331,"details":{"noun":"","vibes":[],"msv":"2900","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10397,"description":"","name":"Theater","slug":"theater","parent":6291,"details":{"noun":"","sub_categories":[{"id":10496,"slug":"broadway"}],"vibes":[],"msv":"6600","icon":"","feature_in_app_":true},"parent_slug":"performance","level":3},{"id":10382,"description":"","name":"Thrift Store","slug":"thrift_store","parent":6304,"details":{"noun":"","vibes":[],"msv":"6600","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10139,"description":"","name":"Tiawanese","slug":"tiawanese","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":13943,"description":"","name":"Tiki Bar","slug":"tiki","parent":6328,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"drink","level":3},{"id":10247,"description":"","name":"Tour","slug":"tour","parent":6298,"details":{"noun":"","vibes":[],"msv":"9900","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":10265,"description":"","name":"Tourist Destination","slug":"tourist_destination","parent":6298,"details":{"noun":"","sub_categories":[{"slug":"visit","id":6298}],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"visit","level":3},{"id":10367,"description":"","name":"Toy Store","slug":"toy_store","parent":10361,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"kids","level":3},{"id":10151,"description":"","name":"Turkish","slug":"turkish","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9923,"description":"","name":"Urban Farm","slug":"urbanfarm","parent":6340,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10154,"description":"","name":"Uzbek","slug":"uzbek","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10650,"description":"","name":"Vacation Rental","slug":"vacation-rental","parent":6294,"details":{"noun":"Vacation Rental","vibes":[],"msv":"900","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10157,"description":"","name":"Vegan","slug":"vegan","parent":6331,"details":{"noun":"","vibes":[],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10160,"description":"","name":"Vegetarian","slug":"vegetarian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10163,"description":"","name":"Vietnamese","slug":"vietnamese","parent":6331,"details":{"noun":"","vibes":[],"msv":"390","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10641,"description":"","name":"Villa","slug":"villa","parent":6294,"details":{"noun":"Villa","vibes":["luxury","relaxing"],"msv":"210","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10385,"description":"","name":"Vintage Store","slug":"vintage","parent":6304,"details":{"noun":"","vibes":[],"msv":"390","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":6298,"description":"Visitors guide to the best of %city%. Discover culture, history, and landmarks while having a fun, memorable time sightseeing and exploring. We\'ve collected must see spots and favorite for tourist and locals alike. Plan your trip or weekend getaway and book these attractions for free or at a discount.","name":"Visit","slug":"visit","parent":6295,"details":{"noun":"Attractions","sub_categories":[{"id":10262,"slug":"amusement_park"},{"id":10436,"slug":"aquarium"},{"id":10250,"slug":"landmark"},{"id":10256,"slug":"mural"},{"id":10277,"slug":"museum"},{"id":10259,"slug":"public_art"},{"id":10253,"slug":"statue"},{"id":10247,"slug":"tour"},{"id":10265,"slug":"tourist_destination"},{"id":10460,"slug":"zoo"}],"vibes":["popular","scenic","family","artsy","historic","upscale","weekend","aquatic","botanical","cheap","cultural","dreamy","healthy","lgbtq","local","relaxing","sunny","tropical","urban","fun","tourist","cool"],"msv":"5500","icon":"visitLogo","feature_in_app_":false,"sections":false},"parent_slug":"all","level":2},{"id":10457,"description":"","name":"Visitor Center","slug":"visitor_center","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":9878,"description":"","name":"Wellness","slug":"health","parent":6295,"details":{"noun":"Health & Wellness","sub_categories":[{"id":9881,"slug":"acupuncture"},{"id":9884,"slug":"beauty"},{"id":10566,"slug":"cannabis"},{"id":9899,"slug":"ivtherapy"},{"id":9887,"slug":"massage"},{"id":9890,"slug":"meditation"},{"id":9902,"slug":"retreat"},{"id":9896,"slug":"spa"},{"id":9893,"slug":"yoga"}],"vibes":[],"msv":"4000","icon":"","feature_in_app_":false,"sections":false},"parent_slug":"all","level":2},{"id":10331,"description":"","name":"Wine Bar","slug":"wine_bar","parent":6328,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10328,"description":"","name":"Winery","slug":"winery","parent":6328,"details":{"noun":"","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10532,"description":"","name":"World / International","slug":"world_international","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":9893,"description":"","name":"Yoga","slug":"yoga","parent":9878,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10460,"description":"","name":"Zoo","slug":"zoo","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"20000","icon":""},"parent_slug":"visit","level":3}]}');

/***/ }),

/***/ "./node_modules/vibemap-constants/dist/cities.json":
/*!*********************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/cities.json ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"id":56490,"slug":"berkeley","type":"official","location":{"latitude":37.8715226,"longitude":-122.273042},"centerpoint":[-122.273042,37.8715226],"mailchimp_id":"","radius":12,"name":"Berkeley"},{"id":56488,"slug":"alameda","type":"early","location":{"latitude":37.7798721,"longitude":-122.2821855},"centerpoint":[-122.2821855,37.7798721],"mailchimp_id":"","radius":12,"name":"Alameda"},{"id":55524,"slug":"san-jose","type":"early","location":{"latitude":37.33874,"longitude":-121.8852525},"centerpoint":[-121.8852525,37.33874],"mailchimp_id":"ef90288b3c","radius":15,"name":"San Jose"},{"id":55522,"slug":"dallas","type":"early","location":{"latitude":32.7766642,"longitude":-96.79698789999999},"centerpoint":[-96.79698789999999,32.7766642],"mailchimp_id":"f0de27e219","radius":10,"name":"Dallas"},{"id":55517,"slug":"norfolk","type":"early","location":{"latitude":36.8507689,"longitude":-76.28587259999999},"centerpoint":[-76.28587259999999,36.8507689],"mailchimp_id":"","radius":10,"name":"Norfolk"},{"id":53994,"slug":"ciudad-de-mexico","type":"early","location":{"latitude":19.4326077,"longitude":-99.133208},"centerpoint":[-99.133208,19.4326077],"mailchimp_id":"518242369a","radius":15,"name":"Mexico City"},{"id":52306,"slug":"peoria","type":"early","location":{"latitude":40.6936488,"longitude":-89.5889864},"centerpoint":[-89.5889864,40.6936488],"mailchimp_id":"58578fcae6","radius":10,"name":"Peoria"},{"id":51835,"slug":"toronto","type":"official","location":{"latitude":43.653226,"longitude":-79.3831843},"centerpoint":[-79.3831843,43.653226],"mailchimp_id":"95135b1969","radius":20,"name":"Toronto"},{"id":45678,"slug":"houston","type":"official","location":{"latitude":29.760314934412516,"longitude":-95.36962040978698},"centerpoint":[-95.36962040978698,29.760314934412516],"mailchimp_id":"ea2fe099f2","radius":30,"name":"Houston"},{"id":44901,"slug":"puerto-vallarta","type":"early","location":{"latitude":20.615046993637947,"longitude":-105.231817181398},"centerpoint":[-105.231817181398,20.615046993637947],"mailchimp_id":"57c905a1df","radius":4,"name":"Puerto Vallarta"},{"id":38387,"slug":"austin","type":"early","location":{"latitude":30.267153,"longitude":-97.7430608},"centerpoint":[-97.7430608,30.267153],"mailchimp_id":"1d933c234f","radius":20,"name":"Austin"},{"id":38380,"slug":"denver","type":"official","location":{"latitude":39.7392358,"longitude":-104.990251},"centerpoint":[-104.990251,39.7392358],"mailchimp_id":"b576abf895","radius":20,"name":"Denver"},{"id":38148,"slug":"chicago","type":"official","location":{"latitude":41.8781136,"longitude":-87.6297982},"centerpoint":[-87.6297982,41.8781136],"mailchimp_id":"b865b3ef72","radius":20,"name":"Chicago"},{"id":38143,"slug":"new-york","type":"official","location":{"latitude":40.7127610684055,"longitude":-74.0060103509262},"centerpoint":[-74.0060103509262,40.7127610684055],"mailchimp_id":"56ebd9923f","radius":20,"name":"New York"},{"id":38137,"slug":"san-diego","type":"official","location":{"latitude":32.715738,"longitude":-117.1610838},"centerpoint":[-117.1610838,32.715738],"mailchimp_id":"7fb6e2a465","radius":20,"name":"San Diego"},{"id":38119,"slug":"los-angeles","type":"official","location":{"latitude":34.04734503476973,"longitude":-118.25308336038819},"centerpoint":[-118.25308336038819,34.04734503476973],"mailchimp_id":"7fb6e2a465","radius":30,"name":"Los Angeles"},{"id":1450,"slug":"guadalajara","type":"official","location":{"latitude":20.65969879999999,"longitude":-103.3496092},"centerpoint":[-103.3496092,20.65969879999999],"mailchimp_id":"0154de5655","radius":10,"name":"Guadalajara"},{"id":1447,"slug":"oakland","type":"official","location":{"latitude":37.79831556913852,"longitude":-122.25940509567872},"centerpoint":[-122.25940509567872,37.79831556913852],"mailchimp_id":"da0894a0e6","radius":20,"name":"Oakland"},{"id":1444,"slug":"san-francisco","type":"official","location":{"latitude":37.7749295,"longitude":-122.4194155},"centerpoint":[-122.4194155,37.7749295],"mailchimp_id":"f30df08e52","radius":5,"name":"San Francisco"},{"id":1441,"slug":"portland","type":"official","location":{"latitude":45.53316863144605,"longitude":-122.6352310180664},"centerpoint":[-122.6352310180664,45.53316863144605],"mailchimp_id":"27c0467a17","radius":9,"name":"Portland"},{"id":1438,"slug":"seattle","type":"official","location":{"latitude":47.6062095,"longitude":-122.3320708},"centerpoint":[-122.3320708,47.6062095],"mailchimp_id":"baadb78d87","radius":8,"name":"Seattle"},{"id":1435,"slug":"vancouver","type":"official","location":{"latitude":49.2827291,"longitude":-123.1207375},"centerpoint":[-123.1207375,49.2827291],"mailchimp_id":"da30e0d7dc","radius":7,"name":"Vancouver"}]');

/***/ }),

/***/ "./node_modules/vibemap-constants/dist/vibeRelations.zip.json":
/*!********************************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/vibeRelations.zip.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "absurd|outrageous|silly|weird|crazy|strange|funny|whimsical|interesting|ugly|subversive|entertaining|kitschy|simple|campy|curious|delightful|trippy|adventurous|eclectic|playful|artsy|energetic|quirky|romantic|exciting|creative|funky|tasty|lively|sensual|bold|entrepreneurial|flavorful|fun|bookish|passionate|beautiful|classy|colorful|dreamy|fancy|joyful|luxe|moody|savory|experiential|innovative|jazzy|refreshing|soulful|spicy|authentic|boho|elegant|inspired|outdoors|scenic|wild|futuristic|relaxing|retro|rugged|cute|experimental|friendly|geeky|minimalist|serene|vibrant|dynamic|intimate|musical|raunchy|trendy|young|active|healthy|busy|popular|diverse|intense|positive|quiet|volunteer|activist|feminist|hippie|civic|radical|queer|afternoon|morning|weekend|sunny|airy|comfy|soothing|cozy|oasis|vibe|warm|patio|sweet|upscale|gentle|dark|grimy|neon|decorative|glam|lit|modern|posh|zen|alternative|safe|analog|hifi|oldschool|antique|vintage|art|classic|historic|artisanal|craft|garden|dance|cultural|folk|cinematic|botanical|fashion|hipster|indie|nerdy|nightlife|casual|cool|urban|witchy|vegan|diy|film|hip|parisian|unique|inclusive|interactive|mystic|aquatic|tropical|mermaid|park|fantastic|love|magical|blissful|hidden_gem|natural|proud|happy|peaceful|belonging|big|small|dramatic|vast|biking|hiking|walk|transit|boozy|celebratory|restorative|spontaneous|hearty|brunch|fresh|conversational|drinking|sober|drinks|messy|festive|mingle|crowded|buzzing|popping|loud|calm|laugh|singing|cheap|free|children|family|educational|chill|novel|community|local|social|public|favorite|cold|kindness|intergenerational|participatory|lax|open|tourist|shimmy|mindful|unexpected|dating|holistic|together|emotional|drip|new|exclusive|special|generous|transgender|fierce|rock|games|rejuvenating|gay|underground|perspective|international|solidarity|kink|old|party|views|photo|popup|rebel|reuse|trending^^0.7|0.6|0.5|0.4|0.3|0.8|0.55^$0|$1|6S|2|6T|3|6U|4|6U|5|6U|6|6V|7|6V|8|6W|9|6W|A|6W|B|6W|C|6W|D|6W|E|6W|F|6W|G|6W|H|6W]|I|$J|6U|K|6V|L|6V|G|6V|M|6V|B|6V|N|6V|O|6V|P|6V|Q|6V|R|6V|S|6V|7|6V|T|6W|U|6W|V|6W|W|6W|X|6W|F|6W|Y|6W|Z|6W|10|6W|11|6W|12|6W|13|6W|14|6W|15|6W|8|6W|16|6W|17|6W|18|6W|19|6W|1A|6W|1B|6W|1C|6W|C|6W|1D|6W|1E|6W|1F|6W|1G|6W|1H|6W|4|6W|1I|6W|1J|6W|1K|6W|1L|6W|1M|6W|1N|6W|1O|6W|1P|6W|1Q|6W|H|6W|1R|6W|1S|6W|1T|6W|1U|6W|1V|6W|1W|6W|1X|6W|1Y|6W|1Z|6W|20|6W|21|6W|22|6W|23|6W]|24|$25|6V|M|6W|1Y|6W|26|6W|27|6W|28|6W|29|6W|2A|6W|2B|6W|2C|6W]|2D|$2E|6V|2F|6W|2G|6W|2H|6W|2I|6W]|2J|$2K|6X|2L|6Y|2M|6W]|2N|$14|6U|1I|6U|1V|6Y|1W|6U|R|6U|1C|6V|2O|6V|7|6V|U|6V|2P|6V|11|6V|17|6V|2Q|6V|L|6V|18|6V|K|6V|G|6V|X|6V|2R|6V|2S|6V|2T|6V|1E|6W|H|6W|T|6W|13|6W|C|6W|2U|6W|1P|6W|2M|6W|1X|6W|J|6W|2V|6W|1H|6W|12|6W|1Z|6W|N|6W|1D|6W|2W|6W|2X|6W|16|6W|2Y|6W|1N|6W|2Z|6W|30|6W|1F|6W|S|6W|22|6W|31|6W|M|6W|32|6W|33|6W|34|6W|1R|6W|35|6W|36|6W]|37|$1B|6V|2R|6W|38|6W]|39|$3A|6W|1P|6W|3B|6W]|3C|$3D|6T|31|6V|3E|6V|J|6V|C|6W|3F|6W|1P|6W|7|6W|3G|6W|1G|6W|3H|6W|3I|6W|1I|6W|L|6W|3J|6W]|3E|$3C|6V|L|6V|J|6W|Q|6W|3K|6W|1V|6W|3I|6W|31|6W|34|6W|3L|6W|3M|6W|3D|6W|7|6W|3N|6W|C|6W|1A|6W|U|6W|3O|6W|3P|6W|1S|6W|1X|6W]|L|$3Q|6T|1H|6T|R|6T|C|6U|J|6U|3R|6U|22|6U|N|6U|2F|6U|7|6U|1V|6U|1U|6V|1P|6V|1R|6V|14|6V|17|6V|H|6V|2S|6V|3E|6V|32|6V|3S|6V|I|6V|2W|6V|E|6V|1C|6V|18|6V|2N|6V|3T|6V|K|6V|2I|6V|U|6V|3|6V|11|6V|3N|6V|Q|6V|Z|6W|2O|6W|1I|6W|O|6W|3H|6W|12|6W|15|6W|3M|6W|3U|6W|13|6W|3V|6W|2Q|6W|1S|6W|Y|6W|3W|6W|3X|6W|36|6W|31|6W|6|6W|2Z|6W|1Z|6W|2R|6W|3B|6W|35|6W|3Y|6W|3P|6W|1N|6W|20|6W|30|6W|21|6W|1X|6W|3D|6W|4|6W|G|6W|3Z|6W|2|6W|1E|6W|40|6W|3C|6W|F|6W|W|6W|2E|6W|X|6W|41|6W|42|6W|1L|6W]|3H|$L|6W|19|6W|3Y|6W|3D|6W|W|6W|X|6W|3Q|6W|17|6W|1H|6W|J|6W|22|6W|3I|6W|S|6W|3C|6W|42|6W|2W|6W|1G|6W]|1G|$X|6V|S|6V|3C|6W|43|6V|1P|6V|3D|6W|3F|6W|B|6W|1F|6W|1I|6W|R|6W|19|6W|1A|6W|J|6W|1Z|6W|C|6W|U|6W|1E|6W|34|6W|2W|6W|I|6W|1J|6W|11|6W|3N|6W|3G|6W|44|6W|7|6W|E|6W|3U|6W|13|6W|45|6W|10|6W|1X|6W|3H|6W|T|6W|46|6W|3B|6W|1D|6W|2S|6W|3|6W]|47|$48|6W|3O|6W|49|6W|4A|6W|3J|6W|3W|6W]|11|$G|6T|1I|6U|1W|6U|12|6U|14|6U|4B|6U|1L|6U|4C|6U|U|6U|1X|6U|1R|6V|16|6V|13|6V|4D|6V|2V|6V|2M|6V|O|6V|2N|6V|Y|6V|R|6V|6|6V|7|6V|3|6V|4E|6V|P|6V|1E|6V|L|6V|1D|6W|3V|6W|T|6W|17|6W|K|6W|5|6W|4|6W|18|6W|S|6W|43|6W|X|6W|1Z|6W|C|6W|10|6W|1O|6W|I|6W|2O|6W|2X|6W|8|6W|N|6W|2P|6W|B|6W|4F|6W|1V|6W|H|6W|J|6W|15|6W|3J|6W|32|6W|3G|6W|4G|6W|2R|6W|35|6W|4H|6W|9|6W|2T|6W|1G|6W|1H|6W|1Y|6W|49|6W|48|6W|2Y|6W|31|6W|1N|6W|4I|6W|1J|6W|1C|6W|46|6W|2B|6W|22|6W|2S|6W|23|6W|2Q|6W|M|6W|34|6W|4J|6W|3D|6W|3X|6W|36|6W]|4K|$3D|6W]|4L|$4M|6U|4B|6W|4N|6W|4|6W|4O|6W|P|6W|4I|6W|2|6W]|4P|$4Q|6U|1K|6V|1L|6W|4A|6W|4R|6W|4S|6W|3T|6W|Y|6W]|4E|$14|6U|1W|6U|16|6U|2P|6V|4D|6V|G|6V|O|6V|1O|6V|36|6V|2O|6V|H|6V|11|6V|2V|6V|2M|6W|U|6W|2F|6W|2R|6W|1D|6W|4T|6W|4C|6W|1E|6W|5|6W|2B|6W|3|6W|4U|6W|2Q|6W|3N|6W|1C|6W|18|6W|7|6W|4I|6W|17|6W|4V|6W|4W|6W|48|6W|R|6W|2Z|6W|4X|6W|K|6W]|1H|$3Q|6T|17|6T|L|6T|32|6T|22|6T|R|6U|2F|6U|1P|6U|3P|6V|2S|6V|1C|6V|J|6V|3R|6V|3T|6V|35|6V|14|6V|2E|6V|1E|6V|C|6V|1V|6V|2I|6V|U|6V|2O|6V|1I|6V|42|6V|E|6W|1R|6W|O|6W|2W|6W|3X|6W|3M|6W|H|6W|4T|6W|3U|6W|N|6W|21|6W|3Y|6W|2N|6W|Z|6W|2Z|6W|18|6W|3S|6W|3W|6W|12|6W|1U|6W|41|6W|K|6W|3D|6W|I|6W|3H|6W|7|6W|11|6W|3F|6W|2Q|6W|1F|6W|1X|6W|4Y|6W|1N|6W|49|6W|3B|6W|3|6W|36|6W]|V|$2H|6V|I|6W|4N|6V|13|6W|7|6W|1V|6W|1D|6W|12|6W|Q|6W|1J|6W|K|6W|R|6W|1X|6W|1N|6W|4Z|6W|1B|6W|1|6W]|Z|$3S|6T|1U|6U|L|6W|1R|6W|N|6W|14|6W|3Q|6W|18|6W|K|6W|I|6W|1H|6W|M|6W|O|6W|50|6W|2X|6W|2F|6W|7|6W|4T|6W|F|6W|1I|6W|2B|6W|23|6W]|4T|$51|6V|21|6V|1H|6W|4E|6W|52|6W|35|6W|53|6W|O|6W|4U|6W|2F|6W|3Q|6W|54|6W|18|6W|3S|6W|4X|6W|E|6W|2Z|6W|Z|6W|N|6W|2|6W|14|6W|55|6W|3T|6W]|4Y|$S|6V|2U|6V|X|6W|53|6W|4X|6W|19|6W|J|6W|4U|6W|3Y|6W|56|6W|1O|6W|G|6W|Y|6W|17|6W|3T|6W|1F|6W|22|6W|1H|6W|1I|6W|55|6W|R|6W|2W|6W]|3O|$3J|6U|48|6V|4G|6W|47|6W|31|6W|4V|6W|7|6W|3E|6W|3L|6W|46|6W|13|6W]|26|$2B|6V|57|6V|58|6W|55|6W|4I|6W|24|6W|1O|6W|Y|6W|4|6W|B|6W|P|6W]|58|$59|6U|26|6W|2B|6W|F|6W|T|6W|57|6W|2S|6W|5A|6W|4|6W|3|6W]|5B|$2B|6T|3V|6V|1W|6V|4J|6V|2P|6V|52|6W|2X|6W|38|6W|2T|6W|25|6W|1O|6W|2M|6W]|E|$C|6T|1P|6U|6|6U|21|6U|H|6U|7|6V|3N|6V|1C|6V|K|6V|32|6V|1R|6V|R|6V|3F|6V|N|6V|2|6V|L|6V|B|6V|3S|6V|U|6V|3Q|6V|2S|6V|14|6V|1N|6V|1U|6V|18|6V|20|6V|3X|6V|1H|6W|Y|6W|1V|6W|1E|6W|3|6W|40|6W|O|6W|A|6W|G|6W|3R|6W|17|6W|49|6W|2F|6W|12|6W|J|6W|5C|6W|3B|6W|4T|6W|1F|6W|1G|6W|3V|6W|5D|6W|3D|6W|0|6W|3U|6W|3K|6W|30|6W|1|6W|2I|6W|2V|6W|S|6W]|3U|$1P|6V|22|6V|2W|6V|50|6W|R|6W|K|6W|1H|6W|2O|6W|1I|6W|3Q|6W|17|6W|L|6W|12|6W|1R|6W|B|6W|1U|6W|1Z|6W|C|6W|1T|6W|1V|6W|N|6W|J|6W|15|6W|3P|6W|13|6W|Y|6W|1D|6W|O|6W|1G|6W|3V|6W|2Q|6W|32|6W|T|6W|U|6W|4W|6W|7|6W|E|6W|3B|6W|D|6W|2S|6W]|4U|$16|6U|55|6V|4T|6W|4Y|6W|4E|6W|K|6W|4W|6W|4X|6W|13|6W|T|6W|3K|6W|4I|6W|G|6W|Y|6W|S|6W|19|6W|1W|6W|2T|6W]|5E|$15|6V|D|6W|22|6W|S|6W|37|6W|2|6W|2O|6W|5F|6W]|5G|$5H|6V|23|6V|5I|6W]|5J|$3V|6V|2M|6V|2Q|6W|2S|6W|1O|6V|2P|6W|2O|6W|2Y|6W|1K|6W|2T|6W]|3N|$40|6T|H|6U|E|6V|20|6U|3R|6V|14|6V|U|6V|1N|6V|1V|6V|C|6V|L|6V|O|6V|3F|6W|G|6W|1E|6W|1C|6W|18|6W|3B|6W|7|6W|Q|6W|34|6W|1P|6W|4D|6W|5K|6W|32|6W|2Z|6W|3E|6W|3L|6W|3Q|6W|17|6W|N|6W|1G|6W|4E|6W|19|6W|1A|6W|K|6W|4N|6W|A|6W]|2G|$5L|6V|5M|6V|3L|6V|5N|6V|5O|6W|2C|6W|2D|6W|5I|6W|3W|6W]|3F|$1P|6U|E|6V|R|6V|1J|6V|1N|6V|3N|6W|5P|6W|1G|6W|3D|6Y|34|6V|3B|6V|C|6V|G|6V|1C|6V|1V|6W|N|6W|17|6W|1I|6W|7|6W|12|6W|3C|6W|32|6W|1D|6W|H|6W|14|6W|20|6W|J|6W|15|6W|27|6W|1E|6W|1H|6W|K|6W|B|6W|3M|6W|4D|6W|S|6W|22|6W|43|6W|1R|6W|4N|6W|Y|6W|8|6W|O|6W|3|6W]|12|$1I|6T|11|6U|G|6V|B|6V|1R|6V|15|6V|R|6V|T|6V|4B|6V|3V|6V|32|6V|17|6V|1V|6V|1P|6V|22|6V|3D|6V|2O|6V|6|6V|K|6V|2V|6V|N|6W|1D|6W|L|6W|3P|6W|35|6W|M|6W|C|6W|U|6W|2|6W|3U|6W|3F|6W|2B|6W|1E|6W|S|6W|2W|6W|2S|6W|I|6W|2N|6W|V|6W|1C|6W|18|6W|1W|6W|1H|6W|E|6W|13|6W|J|6W|P|6W|1T|6W|Y|6W|14|6W|O|6W|2X|6W|4I|6W|4C|6W|10|6W|21|6W|8|6W|7|6W|3|6W]|5Q|$5J|6T|2T|6T|3V|6V|2M|6V|1K|6W|2Y|6W]|13|$7|6T|R|6V|11|6V|N|6U|T|6U|K|6V|1X|6V|31|6V|J|6V|C|6V|1I|6V|G|6V|1R|6V|B|6V|30|6V|55|6V|16|6V|1C|6W|H|6W|1W|6W|2N|6W|V|6W|28|6W|M|6W|8|6W|27|6W|L|6W|Y|6W|6|6W|I|6W|4U|6W|12|6W|U|6W|S|6W|14|6W|4D|6W|22|6W|3U|6W|P|6W|X|6W|45|6W|18|6W|21|6W|19|6W|1L|6W|2P|6W|1F|6W|5|6W|2M|6W|43|6W|1G|6W|F|6W|1Y|6W|1N|6W|1J|6W|1D|6W|2|6W|48|6W|2T|6W|3O|6W|2Q|6W|15|6W|1T|6W|1V|6W|1P|6W|9|6W|3D|6W|1M|6W|3|6W]|5L|$2G|6V|5M|6V|5H|6V|2C|6V|5I|6V|3L|6W|5N|6W|5O|6W|1X|6W|5R|6W|28|6W|5S|6W|5T|6W]|50|$K|6V|2X|6V|3U|6W|Z|6W|T|6W|N|6W|6|6W|4W|6W|1Z|6W|1A|6W|U|6W|G|6W|1I|6W|B|6W|45|6W|5C|6W|D|6W|36|6W|1C|6W|3S|6W|1E|6W|7|6W]|3V|$2T|6U|5J|6V|5B|6V|5Q|6V|1R|6V|1D|6V|2M|6V|3|6V|4|6V|6|6V|12|6V|1U|6V|Y|6V|3S|6V|R|6V|1P|6V|2V|6V|2B|6V|11|6W|2S|6W|2O|6W|4B|6W|2|6W|36|6W|L|6W|8|6W|3B|6W|2P|6W|22|6W|K|6W|N|6W|14|6W|1N|6W|1V|6W|18|6W|1O|6W|H|6W|C|6W|48|6W|5|6W|E|6W|3U|6W|F|6W|1T|6W|3Q|6W|2Q|6W|2Y|6W|1W|6W|1F|6W|S|6W]|2O|$R|6U|17|6V|2N|6V|4E|6V|12|6V|1H|6V|2Q|6T|1O|6V|22|6V|1P|6V|2T|6V|1R|6V|1I|6V|35|6V|L|6W|15|6W|3Q|6W|1W|6W|3U|6W|3V|6W|1V|6W|11|6W|32|6W|Y|6W|C|6W|2U|6W|2B|6W|2M|6W|2V|6W|S|6W|2S|6W|14|6W|1Z|6W|N|6W|1Q|6W|2P|6W|3|6W|5E|6W|4X|6W|5J|6W|2Z|6W|1C|6W|2R|6W|36|6W|G|6W|1T|6W|4I|6W|2F|6W|1K|6W|38|6W|7|6W]|2Q|$2O|6T|2T|6V|1Z|6V|35|6V|2N|6V|1O|6V|5J|6W|1T|6W|L|6W|R|6W|5U|6W|17|6W|O|6W|1W|6W|1I|6W|2B|6W|4E|6W|2U|6W|2Z|6W|54|6W|1H|6W|N|6W|22|6W|11|6W|2Y|6W|3U|6W|57|6W|14|6W|13|6W|3V|6W|1R|6W|J|6W|2P|6W|2M|6W|2V|6W|2W|6W]|57|$26|6V|2Z|6W|58|6W|56|6W|2W|6W|2Q|6W|2B|6W|5V|6W|22|6W]|3L|$5N|6U|5I|6V|2G|6V|5L|6W|3E|6W|3N|6W|3O|6W|3G|6V|5S|6V|20|6V|2I|6W|3M|6W|34|6W|3W|6W|1A|6W|2E|6W|5W|6W|3T|6W|1X|6W|28|6W|C|6W|5M|6W]|1R|$6|6T|2|6U|11|6V|L|6V|E|6V|12|6V|3V|6V|K|6U|3S|6Y|3|6Y|N|6U|R|6U|1U|6U|C|6U|2V|6U|7|6U|Y|6V|G|6V|1P|6V|22|6V|4|6V|14|6V|4C|6V|13|6V|2O|6V|15|6V|32|6V|3Q|6V|49|6V|5C|6V|21|6V|1H|6W|5|6W|S|6W|Z|6W|F|6W|1I|6W|9|6W|18|6W|O|6W|3U|6W|2F|6W|8|6W|H|6W|B|6W|2X|6W|17|6W|3X|6W|1T|6W|U|6W|1F|6W|T|6W|D|6W|I|6W|4I|6W|35|6W|36|6W|2N|6W|3F|6W|2Q|6W|1C|6W|16|6W|3B|6W|5X|6W|23|6W]|3I|$3E|6W|3H|6W|3C|6W|3Z|6W|Q|6W|7|6W]|4|$3|6S|6|6U|0|6U|1R|6V|3V|6V|I|6W|4L|6W|2|6T|5|6U|Y|6U|1|6V|1M|6V|4B|6V|5C|6V|4C|6V|F|6V|R|6W|4I|6W|4D|6W|H|6W|8|6W|11|6W|N|6W|15|6W|3S|6W|9|6W|P|6W|1U|6W|2F|6W|L|6W|14|6W|1J|6W|58|6W|B|6W|18|6W|59|6W|26|6W|5A|6W|10|6W|2V|6W]|Q|$1A|6U|I|6V|L|6V|K|6W|10|6W|N|6W|1X|6W|7|6W|3E|6W|3N|6W|20|6W|U|6W|V|6W|1B|6U|W|6U|1Y|6V|M|6W|45|6W|28|6W|J|6W|P|6W|B|6W|A|6W|43|6W|3Z|6W|Y|6W|R|6W|1V|6W|3R|6W|1D|6W|3I|6W|3P|6W]|F|$5|6T|8|6U|4|6V|I|6W|1R|6W|58|6W|Z|6W|13|6W|0|6W|L|6W|3|6U|N|6V|4I|6V|6|6V|10|6W|1D|6W|2|6W|1U|6W|K|6W|G|6W|J|6W|3S|6W|P|6W|5Y|6W|4C|6W|4D|6W|7|6W|3V|6W|B|6W|1J|6W|T|6W|5Z|6W|36|6W]|3K|$5D|6U|3M|6V|3E|6W|4U|6W|E|6W|20|6V|5X|6V|1C|6V|R|6W|1E|6W|U|6W|21|6W|32|6W|Y|6W|2I|6W|3P|6W|16|6W|49|6W|3T|6W|K|6W]|2Y|$18|6V|2Z|6V|5Q|6W|2N|6W|11|6W|5J|6W|30|6W|5|6W|2B|6W|3|6W|14|6W|33|6W|2Q|6W|4D|6W|H|6W|2M|6W|2T|6W|1N|6W|3V|6W|52|6W]|60|$O|6W]|31|$7|6U|3C|6V|13|6V|3J|6V|3O|6W|3E|6W|L|6W|2N|6W|11|6W|C|6V|1I|6W|2U|6W|1V|6W|3Z|6W|17|6W|30|6W|1P|6W|55|6W|X|6W|N|6W|4V|6W]|G|$T|6T|11|6T|B|6U|1I|6U|4B|6U|12|6V|6|6V|1R|6V|Y|6V|8|6V|I|6V|4E|6V|13|6V|X|6V|R|6V|P|6V|2X|6V|2N|6V|J|6V|4X|6W|M|6W|50|6W|S|6Y|7|6U|1D|6U|2V|6U|K|6U|14|6U|4D|6U|N|6V|16|6V|19|6V|1C|6V|O|6V|1W|6V|U|6V|3F|6V|1E|6V|C|6V|H|6V|3N|6W|5|6W|2|6W|1F|6W|3|6W|20|6W|2P|6W|E|6W|4C|6W|3X|6W|2M|6W|F|6W|1L|6W|1X|6W|18|6W|L|6W|4Y|6W|1J|6W|D|6W|43|6W|4U|6W|4F|6W|0|6W|2O|6W|15|6W|1Z|6W|1V|6W|1O|6W]|28|$43|6U|13|6W|Q|6W|3L|6W|24|6W|5L|6W|J|6T|1Y|6U|1X|6V|1B|6V|44|6W|4O|6W|P|6W|10|6W|M|6W|W|6W|5I|6W|61|6W|T|6W|62|6W|1A|6W|45|6W|8|6W]|3Z|$31|6W|Q|6W|L|6W|3B|6W|1P|6W|3I|6W|3A|6W|3R|6W|1U|6W|3J|6W|R|6W|1B|6W]|4N|$5Z|6V|V|6V|4L|6W|3N|6W|3F|6W|2H|6V|3G|6W|4D|6W|29|6W|5|6W|63|6W|8|6W|1D|6W|1Y|6W|4W|6W|P|6W|2A|6W]|14|$18|6T|2N|6U|4E|6U|11|6U|G|6U|L|6V|3N|6V|1H|6V|1R|6V|E|6V|Z|6W|I|6W|3F|6W|3V|6W|2Y|6W|13|6W|2O|6W|12|6W|4|6W|2Q|6W|4T|6W|H|6T|U|6T|O|6U|7|6U|1C|6U|1E|6U|1W|6Y|1V|6U|R|6U|2P|6U|K|6U|2V|6V|C|6V|N|6V|4D|6V|1I|6V|2Z|6V|16|6V|2S|6V|3|6V|3S|6V|2F|6V|46|6V|1P|6V|1N|6V|17|6V|3X|6V|36|6V|2X|6W|5|6W|15|6W|1U|6W|32|6W|3Q|6W|1D|6W|2M|6W|J|6W|1Z|6W|4C|6W|6|6W|2|6W|20|6W|30|6W|19|6W|M|6W|3R|6W|1J|6W|T|6W|49|6W|3M|6W|1O|6W]|53|$4Y|6W|4T|6W|S|6W|51|6U|3T|6W|1F|6W]|51|$53|6U|4T|6V|52|6V|3T|6W]|64|$2P|6W]|1Y|$1X|6U|28|6U|Q|6V|24|6W|11|6W|13|6W|4N|6W|I|6W|M|6U|P|6V|1B|6V|43|6V|T|6V|45|6W|8|6W|10|6W|4B|6W|1D|6W|J|6W|1A|6W|1I|6W|B|6W|34|6W|K|6W]|J|$28|6T|L|6U|N|6U|I|6U|13|6V|1H|6V|3C|6V|G|6V|3E|6W|2N|6W|4Y|6W|Q|6W|1G|6W|14|6W|12|6W|F|6W|3H|6W|11|6W|E|6W|3U|6W|3F|6W|2Q|6W|R|6U|7|6U|1C|6V|20|6V|3R|6V|C|6V|T|6V|1E|6V|2W|6V|2S|6V|1I|6V|M|6V|1V|6V|22|6V|H|6V|3D|6V|3M|6V|3Q|6V|17|6V|1P|6V|B|6W|43|6W|8|6W|1Z|6W|1X|6W|P|6W|2F|6W|S|6W|1S|6W|4F|6W|1B|6W|3T|6W|K|6W|3|6W|1Y|6W|W|6W|1D|6W|1W|6W|4X|6W|1J|6W|U|6W|1|6W|35|6W|19|6W|A|6W|3Y|6W|3X|6W|X|6W|1N|6W|1U|6W|32|6W|16|6W|2R|6W|3B|6W|5|6W]|5I|$3L|6V|5L|6V|5N|6W|5G|6W|2G|6W|28|6W|1A|6V|45|6V|1B|6W|5S|6W|W|6W|61|6W]|1I|$12|6T|11|6U|2N|6U|1V|6U|G|6U|14|6V|13|6V|1H|6V|2O|6V|L|6W|31|6W|1G|6W|3U|6W|3F|6W|1R|6W|2Q|6W|I|6W|50|6W|3C|6W|Z|6W|4Y|6W|17|6U|R|6V|1W|6V|2W|6V|U|6V|1C|6V|15|6V|7|6V|K|6V|35|6V|J|6V|22|6V|1P|6V|D|6V|T|6V|1E|6V|X|6W|1N|6W|1Z|6W|C|6W|34|6W|N|6W|O|6W|S|6W|B|6W|3D|6W|2V|6W|1X|6W|32|6W|18|6W|2X|6W|2P|6W|M|6W|3P|6W|16|6W|2B|6W|1D|6W|43|6W|1Y|6W|1B|6W|19|6W|1Q|6W|1L|6W]|63|$16|6W|4N|6W|29|6W|1Z|6W|10|6W|5Z|6W|5S|6W|5N|6W|1E|6W|O|6W|U|6W|18|6W|B|6W|K|6W|1A|6W]|M|$T|6U|1Y|6U|I|6V|J|6V|10|6V|K|6V|1X|6V|16|6V|B|6V|1E|6V|R|6W|1C|6W|P|6W|2X|6W|24|6W|12|6W|13|6W|Q|6W|U|6W|23|6W|W|6W|4W|6W|Z|6W|1T|6W|25|6W|18|6W|G|6W|29|6W|28|6W|N|6W|1D|6W|1I|6W|4X|6W|5A|6W|2N|6W|14|6W|Y|6W|6|6W|1B|6W|1W|6W|2S|6W|11|6W]|B|$T|6U|G|6U|12|6V|I|6V|E|6V|13|6V|1G|6W|3U|6W|11|6W|1R|6W|Q|6W|0|6W|50|6W|3F|6W|4|6W|F|6W|26|6W|Y|6U|P|6Y|6|6Y|8|6U|S|6V|M|6V|K|6V|10|6V|N|6V|1D|6V|2|6V|45|6V|J|6W|7|6W|4B|6W|X|6W|16|6W|1I|6W|1Z|6W|1T|6W|5C|6W|1O|6W|C|6W|1|6W|21|6W|1Y|6W|63|6W|1B|6W|4C|6W|27|6W|O|6W|55|6W|4I|6W]|W|$Q|6U|I|6W|1X|6W|3H|6W|28|6W|L|6W|1B|6V|1A|6W|M|6W|J|6W|10|6W|5I|6W|4M|6W|43|6W]|P|$1D|6V|I|6V|11|6V|G|6V|Q|6W|28|6W|4|6W|12|6W|F|6W|13|6W|4L|6W|26|6W|4N|6W|8|6T|4B|6T|B|6Y|Y|6U|1B|6V|1Y|6V|43|6V|4H|6V|1X|6V|45|6V|10|6V|T|6W|M|6W|4I|6W|4D|6W|S|6W|J|6W|3|6W|1A|6W|4F|6W|16|6W|6|6W|5|6W|1N|6W|65|6W|29|6W|2A|6W|R|6W]|66|$43|6W|67|6W|1B|6W|45|6W]|1A|$Q|6U|43|6V|1G|6W|I|6W|50|6W|3L|6W|3E|6W|3N|6W|28|6W|45|6T|61|6V|5I|6V|1B|6V|5T|6V|W|6W|P|6W|1Z|6W|5S|6W|U|6W|1Y|6W|4V|6W|Y|6W|5N|6W|63|6W]|1S|$J|6W|1N|6W|L|6W|1B|6W|1V|6W|H|6W|N|6W|I|6W|R|6W|3R|6W|5K|6W|7|6W|37|6W|3E|6W]|5H|$5L|6V|5G|6V|5R|6W]|15|$12|6V|17|6V|1I|6V|5E|6V|1R|6V|2O|6W|L|6W|14|6W|I|6W|4|6W|11|6W|3U|6W|3F|6W|13|6W|G|6W|R|6V|35|6V|22|6V|2|6V|1P|6W|C|6W|1V|6W|1N|6W|N|6W|3|6W|1U|6W|3A|6W|O|6W|S|6W|3D|6W|7|6W|32|6W|1C|6W|42|6W|3S|6W|D|6W|2W|6W|4B|6W|3Q|6W|34|6W]|4B|$P|6T|11|6U|G|6U|Y|6U|4I|6V|4H|6V|12|6V|4|6V|4D|6V|8|6V|43|6V|3|6V|4L|6W|1D|6W|B|6W|3V|6W|T|6W|4C|6W|S|6W|10|6W|5|6W|1Y|6W|6|6W|1X|6W|5P|6W|1J|6W|2A|6W|2|6W|2V|6W|15|6W|68|6W|4F|6W|16|6W]|3P|$22|6V|1H|6V|12|6W|L|6W|3U|6W|3E|6W|3K|6W|Q|6W|32|6V|17|6V|3Q|6W|1P|6W|1I|6W|3T|6W|3D|6W|3R|6W|U|6W]|5P|$27|6V|3F|6W|4C|6V|1J|6W|4B|6W|N|6W|8|6W]|2E|$2I|6U|1H|6V|2D|6V|3L|6W|L|6W|2F|6V|2H|6V|69|6W|U|6W|5N|6W|A|6W|32|6W|3Y|6W|3Q|6W|O|6W|3M|6W]|55|$4U|6V|16|6V|13|6V|26|6W|4T|6W|4Y|6W|31|6W|B|6W|2L|6W|T|6W|S|6W|Y|6W|1O|6W|19|6W]|6A|$T|6W|29|6T|10|6W|1Q|6W]|40|$3N|6T|5K|6W|E|6W|L|6W|3R|6V|20|6W|O|6W]|X|$S|6S|1G|6V|G|6V|2N|6V|4Y|6W|I|6W|B|6W|11|6W|3H|6W|13|6W|L|6W|19|6S|1F|6T|4X|6V|2V|6V|U|6V|1E|6V|1I|6W|1D|6W|3Y|6W|R|6W|K|6W|1C|6W|T|6W|1X|6W|7|6W|Y|6W|16|6W|2P|6W|6|6W|C|6W|17|6W|J|6W|68|6W|2X|6W]|3M|$1E|6V|3K|6V|J|6V|1C|6V|20|6V|6B|6V|2F|6V|46|6V|5D|6V|R|6V|L|6W|1H|6W|3R|6W|3L|6W|3Q|6W|C|6W|N|6W|3E|6W|H|6W|7|6W|34|6W|3F|6W|14|6W|2E|6W|1V|6W|2I|6W|1P|6W|2S|6W]|5F|$5V|6W|5E|6W]|1T|$T|6V|2Q|6W|M|6W|B|6W|2T|6V|2B|6W|68|6W|3U|6W|2X|6W|1X|6W|12|6W|1R|6W|K|6W|N|6W|38|6W|Y|6W|27|6W|1O|6W|I|6W|3V|6W|4I|6W|13|6W|2O|6W|S|6W]|Y|$B|6U|5C|6U|P|6U|6|6U|4|6U|4B|6U|2|6U|3|6V|1R|6V|4C|6V|K|6V|16|6V|1O|6V|G|6V|8|6V|11|6V|3V|6V|R|6V|S|6V|T|6V|N|6V|1D|6V|E|6W|4I|6W|2S|6W|7|6W|I|6W|1K|6W|13|6W|L|6W|4P|6W|45|6W|C|6W|2O|6W|1U|6W|12|6W|Q|6W|4D|6W|1P|6W|2V|6W|H|6W|4Y|6W|3U|6W|3K|6W|55|6W|X|6W|1T|6W|26|6W|4U|6W|M|6W|1A|6W|32|6W|3F|6W|6C|6W|25|6W|3S|6W|5|6W|2M|6W]|R|$1C|6T|L|6T|1H|6U|J|6U|1P|6T|H|6T|N|6U|1E|6U|2S|6U|C|6U|22|6U|3Q|6Y|1V|6Y|7|6Y|1R|6U|14|6U|17|6U|32|6U|2N|6U|2O|6U|K|6U|3|6V|13|6V|1I|6V|1N|6V|U|6V|E|6V|12|6V|15|6V|2F|6V|18|6V|3B|6V|3D|6V|3F|6V|6|6V|2Z|6V|11|6V|S|6V|G|6V|Y|6V|1D|6V|I|6V|3V|6V|1U|6V|30|6V|21|6V|1F|6V|3M|6V|3S|6V|4|6W|M|6W|3R|6W|T|6W|2V|6W|1X|6W|36|6W|3U|6W|3K|6W|2W|6W|1G|6W|X|6W|3X|6W|20|6W|6B|6W|2Q|6W|3A|6W|35|6W|5X|6W|2P|6W|16|6W|34|6W|3T|6W|19|6W|1W|6W|2|6W|5|6W|Q|6W|41|6W|V|6W|2I|6W|3Y|6W|3Z|6W|1S|6W|1J|6W|8|6W|4E|6W|4Y|6W|P|6W|4X|6W|4D|6W|59|6W]|6|$3|6T|1R|6T|Y|6U|B|6Y|4|6U|E|6U|2|6T|5C|6T|N|6Y|K|6U|8|6U|5|6U|7|6V|3S|6V|G|6V|0|6V|3V|6V|R|6V|21|6V|2V|6V|1U|6V|C|6V|11|6V|T|6V|1|6V|12|6V|1D|6V|F|6V|4C|6V|16|6W|H|6W|9|6W|13|6W|50|6W|18|6W|5A|6W|A|6W|S|6W|L|6W|P|6W|4B|6W|14|6W|2X|6W|4I|6W|1C|6W|O|6W|U|6W|1E|6W|10|6W|1F|6W|M|6W|X|6W|3Q|6W|3X|6W|1P|6W|D|6W|2S|6W]|1N|$1P|6Y|R|6V|3N|6V|1I|6W|1S|6W|H|6U|34|6U|1V|6V|2Z|6V|E|6V|3F|6V|14|6V|7|6V|1U|6W|C|6W|3B|6W|30|6W|3|6W|3S|6W|N|6W|1B|6W|5|6W|15|6W|32|6W|17|6W|3V|6W|1C|6W|65|6W|2N|6W|L|6W|I|6W|P|6W|4D|6W|22|6W|3W|6W|43|6W|11|6W|V|6W|13|6W|2Y|6W|3Q|6W|18|6W|3D|6W|1H|6W|J|6W|1J|6W|U|6W]|4Z|$65|6V|V|6W|1D|6V|S|6W|6D|6W|2P|6W|25|6W|2T|6W|4X|6W|1F|6W]|6C|$Y|6W]|3J|$2U|6U|3O|6U|31|6V|11|6W|47|6W|3Z|6W|3C|6W|4A|6V|1K|6W|2R|6W|48|6W]|6E|$69|6S|2E|6V|2I|6S|21|6W|3Q|6W|3T|6W]|1U|$3S|6X|Z|6U|1R|6U|L|6V|3V|6V|6|6V|E|6V|14|6W|3Z|6W|3U|6W|F|6W|1H|6W|4|6W|I|6W|3Q|6U|N|6U|3|6V|2F|6V|2|6V|R|6V|3B|6V|1P|6V|1N|6W|C|6W|22|6W|H|6W|3R|6W|K|6W|2V|6W|15|6W|Y|6W|32|6W|1V|6W|2I|6W|21|6W|O|6W|7|6W|3X|6W|18|6W|36|6W|J|6W]|68|$5R|6W|4X|6V|2X|6W|1T|6W|4I|6W|S|6W|2T|6W|4B|6W|X|6W|4H|6W|2V|6W]|2X|$G|6V|50|6V|14|6W|5B|6W|M|6W|68|6W|11|6W|2N|6W|1R|6W|1T|6W|Z|6W|1I|6W|12|6W|K|6Y|2P|6U|1W|6V|2B|6V|1E|6V|2V|6V|U|6V|16|6V|1C|6W|18|6W|5R|6W|2T|6W|4X|6W|4J|6W|7|6W|T|6W|6|6W|1O|6W|4V|6W|4G|6W|36|6W|X|6W|N|6W|1D|6W|O|6W]|32|$1H|6T|17|6T|R|6U|3P|6V|E|6V|L|6V|12|6V|1R|6V|14|6W|3F|6W|2O|6W|3N|6W|11|6W|3K|6W|2N|6W|3U|6W|1P|6Y|22|6U|3Q|6V|2S|6V|C|6V|35|6V|2F|6V|3R|6V|1C|6V|1V|6V|21|6V|1E|6W|H|6W|U|6W|3T|6W|42|6W|1N|6W|30|6W|6B|6W|O|6W|1I|6W|2E|6W|1U|6W|15|6W|2Z|6W|18|6W|3S|6W|2I|6W|Y|6W|3A|6W|K|6W|3D|6W|J|6W|20|6W|3X|6W]|2Z|$14|6V|R|6V|1N|6V|18|6V|3Q|6V|30|6V|C|6V|H|6V|2Y|6V|1P|6W|1H|6W|57|6W|L|6W|3N|6W|1C|6W|1W|6W|1E|6W|2N|6W|1V|6W|35|6W|2S|6W|4T|6W|2Q|6W|32|6W|2F|6W|54|6W|3|6W|2O|6W|3R|6W|3W|6W|4E|6W|3S|6W|3B|6W|6F|6W]|4I|$4H|6T|4B|6V|F|6V|4|6W|Y|6W|P|6W|68|6W|16|6V|10|6W|4C|6W|25|6W|5C|6W|2A|6W|2V|6W|3|6W|26|6W|5Y|6W|6|6W|8|6W|4U|6W|38|6W|5|6W|11|6W|4L|6W|4E|6W|12|6W|1R|6W|1T|6W|2B|6W|1D|6W|2|6W|2O|6W|B|6W|1O|6W]|25|$38|6V|24|6V|M|6W|4I|6W|4Z|6W|5B|6W|2A|6W|S|6W|1X|6W|4X|6W|4G|6W|2T|6W|T|6W|Y|6W|23|6W]|4X|$X|6V|68|6V|G|6W|4Y|6W|4U|6W|2X|6W|4T|6W|25|6W|2O|6W|J|6W|M|6W|4Z|6W|4E|6W|R|6W|S|6U|19|6V|1F|6V|2T|6V|2V|6V|T|6W|5A|6W|16|6W|K|6W|1C|6W|1D|6W|1E|6W|2M|6W]|3A|$3B|6W|3Z|6W|39|6W|R|6W|15|6W|32|6W|1P|6W|1V|6W|H|6W|3|6W]|4Q|$4P|6U|1L|6V|1K|6W|1O|6W]|3Q|$L|6T|1H|6T|22|6U|E|6V|1R|6V|2O|6W|14|6W|Z|6W|3U|6W|3H|6W|4T|6W|3N|6W|3V|6W|2F|6T|3R|6U|1U|6U|3S|6U|R|6Y|C|6V|1P|6V|32|6V|17|6V|2I|6V|2S|6V|3T|6V|2Z|6V|J|6V|N|6V|H|6V|3Y|6W|41|6W|1C|6W|1V|6W|30|6W|3B|6W|42|6W|6B|6W|3M|6W|3W|6W|2W|6W|36|6W|3P|6W|1E|6W|3X|6W|3|6W|2E|6W|35|6W|6|6W|1N|6W|6E|6W|18|6W|15|6W|3D|6W|7|6W]|3G|$3L|6V|1L|6W|4N|6W|3D|6W|3C|6W|11|6W|1G|6W|34|6W|43|6W|4D|6W]|61|$1A|6V|5T|6V|43|6V|44|6W|4V|6W|1B|6W|6G|6W|6D|6W|5N|6W|28|6W|37|6W|2P|6W|5I|6W]|4F|$2R|6V|J|6W|P|6W|11|6W|S|6W|3T|6W|8|6W|1L|6W|22|6W|G|6W|4B|6W]|41|$22|6V|3Q|6W|1H|6W|R|6W|L|6W|1P|6W]|2F|$3Q|6T|1H|6U|L|6U|R|6V|3M|6V|1U|6V|32|6V|C|6V|3S|6V|H|6V|3Y|6V|2E|6V|1P|6V|14|6V|2S|6V|2I|6W|17|6W|22|6W|J|6W|36|6W|6B|6W|1C|6W|N|6W|1V|6W|1E|6W|3|6W|2Z|6W|49|6W|30|6W|2H|6W|3W|6W|7|6W|46|6W|3D|6W|3X|6W|3R|6V|4E|6W|4T|6W|E|6W|1R|6W|2D|6W|4|6W|Z|6W|2O|6W]|44|$5T|6V|61|6W|28|6W|1G|6W|1X|6W|4J|6W]|3R|$3Q|6U|L|6U|40|6V|3N|6V|1H|6V|J|6V|6B|6V|H|6V|32|6V|2F|6V|N|6V|R|6W|3B|6W|2I|6W|3M|6W|1U|6W|20|6W|3Z|6W|E|6W|1P|6W|1E|6W|C|6W|1V|6W|2S|6W|18|6W|22|6W|1C|6W|3S|6W|Q|6W|14|6W|1S|6W|2Z|6W|3P|6W|3T|6W|6F|6W]|1B|$43|6U|Q|6U|P|6V|28|6V|1Y|6V|1A|6V|37|6V|61|6W|I|6W|V|6W|3Z|6W|45|6V|W|6V|65|6W|J|6W|1N|6W|1X|6W|1S|6W|5I|6W|10|6W|1I|6W|M|6W|B|6W|66|6W|34|6W|N|6W|5T|6W|4H|6W]|1J|$3F|6V|5P|6W|I|6W|1G|6W|V|6W|4|6W|G|6W|J|6W|4B|6W|11|6W|13|6W|14|6W|R|6W|F|6W|1N|6W|7|6W|4C|6W|10|6W|1D|6W|1V|6W|N|6W|1P|6W|8|6W|46|6W|27|6W|4W|6W|3D|6W|3|6W]|29|$6A|6T|63|6W|M|6W|10|6W|4N|6W|P|6W|24|6W|T|6W|2B|6W|1Z|6W]|45|$1A|6T|1B|6V|5I|6V|B|6V|P|6V|43|6V|5T|6W|Q|6W|1Y|6W|Y|6W|50|6W|13|6W|1G|6W|66|6W|T|6W|8|6W|28|6W]|5S|$3L|6V|63|6W|1A|6W|5I|6W|5L|6W|5N|6V|5T|6W]|6H|$5M|6W]|8|$P|6T|F|6U|B|6U|6|6U|G|6V|Y|6V|4B|6V|0|6W|4|6W|J|6W|13|6W|3V|6W|1Y|6W|I|6W|11|6W|1R|6W|4F|6W|4I|6W|4N|6W|R|6W|1J|6W|45|6W|3F|6W|12|6W|28|6W|5P|6W|3|6U|5|6U|1D|6V|T|6V|2|6V|N|6V|43|6V|S|6W|9|6W|6G|6W|27|6W|2A|6W|5Z|6W|4D|6W|1|6W|7|6W|D|6W|H|6W]|1Z|$2Q|6V|1I|6W|J|6W|63|6W|11|6W|1A|6W|2N|6W|1G|6W|3U|6W|50|6W|B|6W|L|6W|14|6W|2O|6W|I|6W|G|6W|29|6W|O|6U|U|6V|1E|6W|K|6W|1W|6W|56|6W|21|6W|43|6W|T|6W|4W|6W|18|6W|20|6W|2U|6W|2B|6W|1O|6W|2W|6W]|1C|$R|6T|14|6U|2N|6V|E|6V|1H|6V|3M|6V|J|6V|1I|6V|L|6V|G|6V|3K|6V|32|6V|3F|6V|13|6W|M|6W|3N|6W|2X|6W|3Q|6W|12|6W|2F|6W|I|6W|X|6W|1N|6W|2Z|6W|6|6W|3R|6W|4E|6W|15|6W|11|6W|50|6W|2O|6W|4X|6W|1R|6W|1E|6S|H|6U|20|6Y|K|6Y|U|6Y|1V|6U|1P|6U|7|6U|18|6V|C|6V|2S|6V|5D|6V|2P|6V|16|6V|17|6V|N|6V|O|6W|T|6W|19|6W|3B|6W|2V|6W|21|6W|5X|6W|1F|6W|3X|6W|1D|6W|6B|6W|1W|6W|3S|6W|3D|6W|3|6W|S|6W|22|6W]|16|$4U|6U|4E|6U|11|6V|G|6V|M|6V|Y|6V|14|6V|55|6V|4I|6V|13|6V|2X|6V|63|6W|B|6W|6|6W|I|6W|P|6W|2N|6W|R|6W|4X|6W|1I|6W|X|6W|3K|6W|1R|6W|J|6W|4B|6W|K|6Y|1W|6U|1E|6V|U|6V|4W|6V|7|6V|T|6V|1C|6V|5C|6V|4D|6V|4J|6V|5D|6V|2P|6V|2V|6V|4C|6W|10|6W|1X|6W|O|6W|18|6W|1D|6W|5|6W|H|6W|5A|6W|2B|6W|N|6W|1O|6W|2M|6W|5R|6W|20|6W|S|6W|3|6W|52|6W|2S|6W|4H|6W|2T|6W]|C|$E|6T|1P|6T|1C|6V|7|6T|L|6U|R|6U|N|6U|1R|6U|H|6U|22|6V|14|6V|3Q|6V|1V|6V|K|6V|13|6V|32|6V|30|6V|2|6V|17|6V|3F|6V|J|6V|6|6V|2F|6V|1H|6V|31|6V|21|6V|U|6V|3D|6V|3N|6V|2Z|6V|3|6V|G|6V|1I|6W|1N|6W|1U|6W|49|6W|15|6W|3S|6W|O|6W|2N|6W|3C|6W|12|6W|2S|6W|11|6W|18|6W|20|6W|S|6W|1G|6W|3U|6W|3M|6W|Y|6W|3R|6W|A|6W|2W|6W|I|6W|2O|6W|19|6W|1E|6W|3E|6W|3V|6W|B|6W|1F|6W|36|6W|1L|6W|0|6W|X|6W|34|6W|3B|6W|2V|6W|3L|6W|35|6W|6B|6W]|5R|$6I|6V|16|6W|4C|6V|68|6W|2X|6W|2C|6W|5L|6W|5H|6W]|6J|$3|6W]|5U|$2Q|6W]|5C|$6|6T|Y|6U|4|6V|1R|6V|4I|6W|B|6W|E|6W|50|6W|2|6V|4C|6V|K|6V|16|6V|3|6V|5A|6W|5D|6W|5X|6W|3S|6W|56|6W|N|6W|4R|6W]|33|$2Y|6W|2N|6W|30|6W|59|6W|2T|6W]|T|$G|6T|B|6U|M|6U|13|6U|12|6V|8|6V|1Y|6V|J|6V|1T|6V|6|6V|Y|6V|1I|6V|I|6W|50|6W|P|6W|R|6W|2N|6W|11|6W|6A|6W|4B|6W|4X|6W|58|6W|4U|6W|55|6W|X|6W|2X|6W|1R|6W|3U|6W|28|6W|14|6W|25|6W|29|6W|1G|6W|F|6W|45|6W|1X|6U|K|6U|N|6V|16|6V|S|6V|10|6W|2B|6W|1C|6W|1W|6W|1D|6W|7|6W|2T|6W|1E|6W|U|6W|1Z|6W|4W|6W|1F|6W]|5A|$5C|6W|2B|6V|6|6W|4X|6W|16|6W|10|6W|58|6W|M|6W|2P|6W|4|6W|K|6W|5D|6W]|5M|$2G|6V|5L|6V|6H|6W|3L|6W|2C|6W|5O|6W|5N|6W]|17|$1H|6T|32|6T|1I|6U|R|6U|2O|6V|L|6V|15|6V|3P|6V|3Q|6V|2N|6V|12|6V|J|6V|14|6V|11|6W|3F|6W|2F|6W|3U|6W|E|6W|I|6W|2Q|6W|1N|6W|3H|6W|1R|6W|3N|6W|4Y|6W|4E|6W|31|6W|X|6W|22|6U|2W|6U|35|6U|1P|6U|1V|6U|C|6V|U|6V|1C|6V|3D|6V|3T|6W|2S|6W|36|6W|N|6W|7|6W|42|6W|1W|6W|34|6W|O|6W|19|6W|1E|6W|H|6W|3Y|6W|30|6W|2R|6W|1F|6W|S|6W|3X|6W]|4C|$11|6U|O|6V|Y|6V|4|6V|1R|6V|5C|6V|5P|6V|6|6V|4B|6W|4I|6W|G|6W|4E|6W|1J|6W|14|6W|F|6W|12|6W|B|6W|10|6U|5R|6V|3|6V|16|6W|2V|6W|U|6W|4D|6W|1E|6W|5|6W|K|6W|2|6W|2S|6W|1K|6W|5D|6W]|4D|$5|6U|16|6V|46|6U|G|6U|11|6V|14|6V|4E|6V|4B|6V|3|6V|7|6V|4|6W|43|6W|P|6W|2V|6W|3X|6W|H|6W|3N|6W|4N|6W|20|6W|N|6W|1M|6W|13|6W|2Y|6W|Y|6W|4C|6W|O|6W|67|6W|F|6W|1N|6W|8|6W|6D|6W|4V|6W|1W|6W|2|6W|2P|6W|3F|6W|K|6W|1D|6W|R|6W|3G|6W|49|6W|5Z|6W]|54|$4T|6W|2Q|6W|2Z|6W|9|6U|3|6W|5|6W|2|6W|D|6W]|49|$1R|6V|C|6W|47|6W|E|6W|7|6W|30|6W|3X|6W|11|6W|14|6W|2F|6W|46|6W|1H|6W|3K|6W|4D|6W|5X|6W]|1V|$1I|6U|2N|6Y|R|6Y|14|6U|1P|6U|1C|6U|17|6U|C|6V|H|6U|7|6U|L|6U|1N|6V|18|6V|U|6V|N|6V|3N|6V|12|6V|J|6V|1E|6V|36|6V|1H|6V|32|6V|34|6V|K|6V|22|6V|E|6W|3F|6W|1W|6W|3B|6W|15|6W|3Q|6W|D|6W|2S|6W|3E|6W|V|6W|2O|6W|31|6W|1S|6W|3R|6W|2P|6W|11|6W|3U|6W|3V|6W|2F|6W|Q|6W|1U|6W|2Z|6W|3A|6W|1J|6W|I|6W|1D|6W|3D|6W|13|6W|G|6W|3M|6W|20|6W|30|6W]|5Y|$4I|6W|F|6W|4H|6W]|56|$4Y|6W|57|6W|1Z|6W|5C|6W|4R|6W]|34|$1N|6U|3F|6V|1V|6V|1I|6W|3N|6W|3L|6W|3E|6W|1G|6W|R|6W|3M|6W|3G|6W|2N|6W|1Y|6W|1B|6W|11|6W|15|6W|1P|6W|65|6W|3W|6W|43|6W|17|6W|22|6W|3B|6W|C|6W|N|6W|1X|6W|3D|6W]|18|$14|6T|H|6Y|1C|6V|K|6U|U|6U|1E|6U|1V|6V|R|6V|O|6V|N|6V|7|6V|2Y|6V|2Z|6V|L|6V|1W|6V|2N|6V|2P|6V|2S|6V|E|6V|3S|6V|3N|6W|2X|6W|3|6W|11|6W|Z|6W|1R|6W|6|6W|16|6W|C|6W|3X|6W|I|6W|1H|6W|12|6W|M|6W|2V|6W|4T|6W|3V|6W|1I|6W|3R|6W|2B|6W|G|6W|3B|6W|5|6W|4E|6W|13|6W|63|6W|1U|6W|32|6W|21|6W|4|6W|1N|6W|3Q|6W|1Z|6W|52|6W|36|6W|1P|6W|1F|6W]|2K|$2J|6X|2L|6U|2M|6W]|20|$1C|6Y|5D|6U|C|6W|4D|6W|16|6W|1E|6U|3N|6U|3K|6V|3M|6V|J|6V|7|6V|E|6V|3L|6V|H|6W|3R|6W|O|6W|G|6W|40|6W|Q|6W|R|6W|6B|6W|3F|6W|N|6W|U|6W|L|6W|K|6W|14|6W|1Z|6W|21|6W|I|6W|32|6W|1V|6W]|46|$4D|6U|3M|6V|14|6V|U|6V|3X|6V|H|6W|36|6W|5|6W|1E|6W|O|6W|7|6W|3|6W|11|6W|3O|6W|1J|6W|49|6W|2P|6W|1G|6W|2F|6W|4V|6W|1W|6W]|4G|$3O|6W|11|6W|25|6W|2X|6W|4V|6W|43|6W|1W|6W|4W|6W|48|6W|4O|6W]|3S|$1U|6X|Z|6T|3Q|6U|1R|6Y|6|6V|L|6V|E|6V|2F|6V|3V|6V|14|6V|R|6V|1N|6W|1H|6W|4|6W|4T|6W|F|6W|3R|6W|32|6W|15|6W|50|6W|Y|6W|2Z|6W|N|6V|3|6V|2|6V|18|6V|C|6W|K|6W|3B|6W|1P|6W|H|6W|3X|6W|2I|6W|O|6W|7|6W|21|6W|2V|6W|22|6W|1C|6W|5C|6W|A|6W|5|6W|36|6W]|30|$C|6V|2Z|6V|H|6V|13|6V|R|6V|33|6W|49|6W|1P|6V|2Y|6W|1N|6W|3Q|6W|32|6W|7|6W|2N|6W|L|6W|14|6W|3T|6W|22|6W|31|6W|2F|6W|E|6W|17|6W|1V|6W|42|6W]|65|$4Z|6V|43|6V|1B|6W|34|6W|1N|6W|P|6W|67|6W]|3T|$22|6V|1H|6V|17|6W|5W|6V|3Q|6V|1X|6V|L|6V|2S|6V|2R|6W|2W|6W|3W|6W|32|6W|2I|6W|J|6W|4F|6W|R|6W|3L|6W|4Y|6W|51|6W|30|6W|53|6W|3P|6W|35|6W|4P|6W|4T|6W|3K|6W|6E|6W|3R|6W|42|6W|21|6W|1O|6W|O|6W|1L|6W]|5K|$40|6W|3N|6W|1S|6W]|2R|$1W|6V|4F|6V|2N|6V|3T|6W|1X|6W|4E|6W|2W|6W|2P|6W|36|6W|L|6W|11|6W|2B|6W|1O|6W|3J|6W|1L|6W|2O|6W|1D|6W|2S|6W|37|6W|J|6W|17|6W]|6K|$23|6V]|3B|$1P|6U|3F|6V|R|6V|1V|6W|3S|6W|1C|6W|18|6W|34|6W|C|6W|H|6V|1U|6V|1N|6W|3A|6W|3R|6W|3N|6W|3V|6W|3Q|6W|36|6W|L|6W|3D|6W|E|6W|2S|6W|3Z|6W|1D|6W|3|6W|1E|6W|1G|6W|1H|6W|3U|6W|1R|6W|J|6W|2Z|6W|6B|6W]|5V|$5F|6W|57|6W]|1K|$4P|6V|3J|6W|1O|6W|4C|6W|2U|6W|2M|6W|Y|6W|4Q|6W|5Q|6W|2T|6W|I|6W|5J|6W|2O|6W]|1|$0|6S|4|6V|6|6V|B|6W|V|6W|J|6W|8|6W|E|6W|3|6V|21|6V|5|6W|9|6W|A|6W|5Z|6W|7|6W]|5T|$44|6V|5N|6V|1A|6V|61|6V|45|6W|5S|6W|4W|6W|1X|6W|4J|6W|5L|6W|1B|6W]|42|$1H|6V|32|6W|3Q|6W|O|6W|17|6W|15|6W|3H|6W|L|6W|22|6W|35|6W|3D|6W|U|6W|30|6W|3T|6W]|4A|$3J|6V|47|6W|1L|6W|4P|6W|5W|6W|2U|6W|4R|6W]|6L|$5N|6T]|10|$4C|6U|M|6V|4H|6V|B|6V|P|6V|4I|6W|T|6W|F|6W|16|6W|Q|6W|63|6W|1X|6W|I|6W|11|6W|28|6W|6A|6W|1Y|6W|4B|6W|1J|6W|29|6W|U|6W|1E|6W|W|6W|5A|6W|K|6W|23|6W|6|6W|1B|6W|1G|6W|12|6W|O|6W|4|6W]|2U|$3J|6U|4Y|6V|1K|6W|2N|6W|31|6W|2O|6W|2W|6W|2Q|6W|1O|6W|2M|6W|1Z|6W|4A|6W]|4J|$1W|6V|5T|6W|2B|6V|5B|6V|16|6V|2X|6W|4W|6W|38|6W|52|6W|2M|6W|44|6W|6I|6W|11|6W]|6G|$8|6W|61|6W|6M|6W|43|6W]|6N|$1R|6V]|K|$7|6T|1R|6U|16|6Y|N|6U|U|6U|2X|6Y|1C|6Y|6|6U|18|6U|G|6U|14|6U|R|6U|T|6U|13|6V|E|6V|M|6V|I|6V|Y|6V|1E|6V|C|6V|50|6V|B|6V|21|6V|O|6V|1I|6V|2V|6V|2|6V|H|6V|2N|6V|L|6V|12|6V|5C|6V|1V|6V|4W|6V|4U|6W|3|6W|11|6W|3U|6W|Q|6W|3S|6W|1W|6W|Z|6W|1U|6W|1D|6W|2P|6W|1P|6W|A|6W|3V|6W|F|6W|J|6W|X|6W|1H|6W|1Z|6W|2S|6W|2T|6W|V|6W|1T|6W|4X|6W|20|6W|10|6W|1F|6W|1M|6W|36|6W|3F|6W|5|6W|S|6W|3N|6W|1Y|6W|63|6W|32|6W|4C|6W|4D|6W|19|6W|5X|6W|4E|6W|3K|6W|5A|6W]|27|$5P|6V|13|6W|3F|6W|8|6W|1T|6W|24|6W|B|6W|1J|6W|22|6V|N|6W|D|6W|43|6W]|59|$58|6U|3|6W|33|6W|4|6W|5|6W|R|6W]|6O|$4R|6W]|2A|$25|6W|4I|6W|8|6W|4B|6W|P|6W|24|6W|4N|6W]|35|$2W|6U|17|6U|42|6W|3T|6W|C|6W|22|6U|15|6V|1H|6V|32|6V|2Q|6V|1I|6V|2O|6V|4T|6W|12|6W|1W|6W|R|6W|L|6W|11|6W|2Z|6W|3Q|6W|1R|6W|J|6W|2N|6W|O|6W]|4H|$4I|6T|4B|6V|P|6V|10|6V|11|6W|5Y|6W|68|6W|1B|6W|16|6W]|5O|$2G|6W|5M|6W|5L|6W|5N|6W]|2I|$6E|6S|69|6T|2E|6U|3Q|6V|L|6V|1H|6V|3L|6W|2F|6W|3R|6W|3T|6W|3S|6W|3Y|6W|1U|6W|21|6W|A|6W|3K|6W|R|6W|32|6W|5N|6W|3W|6W|3|6W|2D|6W|E|6W|3M|6W|H|6W]|2B|$5B|6T|4J|6V|5A|6V|T|6W|18|6W|16|6W|2R|6W|1Z|6W|1W|6Y|2X|6V|26|6V|3V|6V|1O|6W|2M|6W|58|6W|12|6W|1T|6W|38|6W|52|6W|2P|6W|2T|6W|2Y|6W|4E|6W|2O|6W|2Q|6W|2V|6W|1I|6W|11|6W|57|6W|4I|6W|29|6W|4M|6W|24|6W|Z|6W|36|6W]|N|$7|6T|R|6U|J|6U|C|6U|K|6U|3S|6V|T|6V|1V|6V|18|6V|1C|6V|17|6W|4D|6W|16|6W|3|6U|6|6Y|L|6U|1R|6U|13|6U|1U|6U|5|6U|G|6V|14|6V|1P|6V|E|6V|I|6V|2|6V|H|6V|F|6V|22|6V|B|6V|Y|6V|3Q|6V|8|6V|3R|6V|1D|6V|3F|6W|12|6W|43|6W|Z|6W|1I|6W|2V|6W|1H|6W|50|6W|Q|6W|1N|6W|4|6W|O|6W|2N|6W|11|6W|3V|6W|15|6W|3M|6W|2F|6W|21|6W|2S|6W|3D|6W|3X|6W|3U|6W|20|6W|1E|6W|S|6W|3N|6W|2O|6W|M|6W|1S|6W|1T|6W|27|6W|A|6W|1J|6W|19|6W|36|6W|4T|6W|2Q|6W|5P|6W|1B|6W|34|6W|31|6W|2X|6W|5C|6W|U|6W|5Z|6W]|2H|$V|6V|A|6V|4N|6V|2E|6V|2D|6W|4W|6W|2F|6W]|21|$E|6U|6|6V|K|6V|U|6V|4T|6V|C|6V|R|6V|32|6V|1R|6V|1|6V|O|6W|2|6W|1H|6W|3K|6W|N|6W|1P|6W|1F|6W|1C|6W|3S|6W|1E|6W|L|6W|B|6W|6E|6W|1U|6W|1Z|6W|2I|6W|A|6W|13|6W|18|6W|7|6W|12|6W|20|6W|H|6W|I|6W|3T|6W|1M|6W|3|6W]|6P|$A|6W|2E|6W]|1D|$G|6U|8|6V|3V|6V|P|6V|R|6V|B|6V|6|6V|4Z|6V|Y|6V|N|6V|11|6W|12|6W|4B|6W|X|6W|F|6W|14|6W|T|6W|K|6W|4E|6W|V|6W|2N|6W|3F|6W|16|6W|I|6W|1Y|6W|1J|6W|J|6W|M|6W|1C|6W|3U|6W|4N|6W|1I|6W|3B|6W|13|6W|Q|6W|4I|6W|4X|6W|4D|6W|1V|6W|2R|6W|1G|6W|2X|6W|2V|6V|2P|6V|S|6V|6D|6V|5|6W|3|6W|1O|6W|1W|6W|1X|6W|1P|6W|1F|6W|43|6W|2S|6W|2T|6W|36|6W|19|6W|2M|6W|U|6W|7|6W|1E|6W|22|6W|H|6W|2|6W]|1O|$Y|6V|2O|6V|4E|6V|2Q|6V|1K|6W|2B|6W|1D|6W|11|6W|5J|6W|3V|6W|B|6W|4Q|6W|4Y|6W|26|6W|16|6W|2R|6W|2U|6W|I|6W|1T|6W|2X|6W|5B|6W|G|6W|14|6W|55|6W|4I|6W|1Z|6W|3T|6W|2P|6U|1W|6V|6D|6V|2M|6W|1L|6W|2T|6W|4V|6W|36|6W|O|6W|48|6W]|6D|$1O|6V|4V|6V|2P|6V|1D|6V|1X|6W|4Z|6W|61|6W|4D|6W|1W|6W]|4V|$6D|6V|2P|6V|61|6W|4G|6W|3O|6W|1O|6W|1W|6W|1A|6W|2X|6W|4D|6W|4E|6W|U|6W|31|6W|46|6W|36|6W]|6Q|$3D|6T]|1P|$R|6T|C|6T|3F|6U|E|6U|1N|6Y|32|6Y|1V|6U|17|6U|3B|6U|1H|6U|1C|6U|L|6V|3Q|6V|1R|6V|N|6V|3U|6V|12|6V|2O|6V|2F|6V|3V|6V|14|6V|J|6V|1I|6V|1U|6V|1G|6V|30|6V|15|6W|3A|6W|41|6W|34|6W|2N|6W|3S|6W|3N|6W|2Z|6W|3R|6W|K|6W|1D|6W|3C|6W|21|6W|3P|6W|Y|6W|I|6W|3Z|6W|1J|6W|31|6W|13|6W|3M|6W|6|6W|18|6W|3D|6T|22|6U|H|6U|2S|6V|7|6V|1E|6W|3|6W|U|6W|2W|6W|S|6W|36|6W|2V|6W]|6B|$3M|6V|3R|6V|R|6W|3Q|6W|2F|6W|20|6W|32|6W|1C|6W|C|6W|3B|6W|1E|6W|H|6W|6F|6W]|O|$14|6U|1Z|6U|4C|6V|11|6V|18|6V|4E|6V|K|6V|I|6V|G|6V|3N|6V|L|6W|1H|6W|1C|6W|21|6W|1I|6W|C|6W|20|6W|E|6W|16|6W|4T|6W|1R|6W|60|6W|N|6W|Z|6W|2Q|6W|32|6W|3S|6W|42|6W|15|6W|63|6W|6|6W|1U|6W|17|6W|4D|6W|46|6W|3U|6W|12|6W|2E|6W|B|6W|10|6W|3F|6W|40|6W|2X|6W|3T|6W|35|6W|U|6U|7|6V|1E|6V|2V|6W|1F|6W|19|6W|4W|6W|H|6W|1W|6W|1L|6W|5|6W|3|6W|1O|6W|2|6W|3X|6W]|1Q|$2O|6W|I|6W|1I|6W|6A|6W|1L|6W]|38|$25|6V|5B|6W|2B|6W|4J|6W|1T|6W|4I|6W|37|6W|2O|6W]|19|$X|6S|G|6V|4X|6V|1G|6W|4Y|6W|3H|6W|1C|6W|I|6W|R|6W|C|6W|1D|6W|3N|6W|13|6W|14|6W|17|6W|N|6W|J|6W|1I|6W|K|6W|4U|6W|55|6W|1F|6S|S|6T|2V|6U|U|6V|1E|6W|O|6W|3Y|6W|7|6W]|1L|$11|6U|4Q|6V|3G|6W|4P|6W|4A|6W|G|6W|I|6W|4F|6W|13|6W|C|6W|2R|6W|L|6W|1I|6W|3T|6W|1W|6V|5W|6W|1O|6W|1Q|6W|O|6W|2M|6W|7|6W]|1W|$11|6U|14|6Y|2B|6Y|16|6U|2R|6V|4J|6V|18|6V|1V|6W|T|6W|K|6W|1D|6W|35|6W|1Z|6W|17|6W|1C|6W|4D|6W|4G|6W|46|6W|2P|6U|4E|6U|36|6U|2N|6U|1O|6V|5B|6V|1I|6V|2X|6V|2M|6V|1L|6V|G|6V|U|6V|1X|6V|2O|6W|7|6W|13|6W|1E|6W|12|6W|2Q|6W|R|6W|2Z|6W|4V|6W|O|6W|H|6W|2W|6W|2S|6W|J|6W|5|6W|2V|6W|48|6W|2T|6W|I|6W|M|6W|52|6W|4U|6W|3V|6W|6D|6W]|U|$14|6T|O|6U|1E|6T|K|6U|1C|6Y|18|6U|11|6U|R|6V|H|6V|1I|6V|1Z|6V|1V|6V|16|6V|7|6V|2N|6V|E|6V|3N|6V|21|6V|2P|6V|G|6V|2X|6V|17|6V|1W|6V|1F|6V|X|6V|C|6V|L|6V|1H|6V|2V|6V|46|6V|19|6V|I|6W|4E|6W|32|6W|12|6W|M|6W|3X|6W|3K|6W|2S|6W|1G|6W|Q|6W|2E|6W|4C|6W|1P|6W|4W|6W|13|6W|50|6W|1A|6W|20|6W|10|6W|1R|6W|63|6W|6|6W|T|6W|1X|6W|3E|6W|J|6W|1D|6W|3U|6W|42|6W|4V|6W|A|6W|S|6W|48|6W|36|6W|3P|6W|1N|6W|N|6W]|5X|$3K|6V|R|6W|1C|6W|5C|6W|K|6W|1R|6W|49|6W|5D|6W]|2|$0|6T|6|6T|4|6T|1R|6U|1|6U|Y|6U|5C|6V|E|6V|C|6V|3S|6V|N|6V|15|6V|1U|6V|8|6V|K|6V|B|6V|G|6W|21|6W|12|6W|3V|6W|F|6W|R|6W|54|6W|5E|6W|14|6W|L|6W|4B|6W|4D|6W|4T|6W|13|6W|4I|6W|4C|6W|4L|6W|1D|6W|3|6T|5|6V|7|6V|9|6V|D|6W|H|6W|2V|6W|O|6W|1M|6W]|D|$1I|6V|2|6W|1V|6W|5E|6W|50|6W|1R|6W|G|6W|0|6W|15|6W|3U|6W|6|6W|8|6W|S|6W|54|6W|4W|6W|7|6W|27|6W|4M|6W|2V|6W]|5D|$20|6U|1C|6V|16|6V|5C|6W|5X|6W|5A|6W|4C|6W|1E|6U|3K|6U|3M|6V|E|6W]|4M|$4L|6U|W|6W|2B|6W|4O|6W|D|6W|2W|6W]|5N|$3L|6U|5S|6V|5T|6V|2G|6V|5I|6W|5L|6W|2E|6W|63|6W|61|6W|1A|6W|5O|6W|2I|6W|5M|6W|3W|6W]|52|$51|6V|4T|6W|5B|6W|2B|6W|4J|6W|16|6W|18|6W|1W|6W|2Y|6W|38|6W]|6I|$5R|6V|4J|6W]|2P|$1W|6U|14|6U|2X|6U|1O|6U|4E|6V|2N|6V|5B|6V|6D|6V|U|6V|1C|6V|1D|6V|18|6V|4V|6V|16|6V|1E|6V|2T|6V|2V|6W|H|6W|G|6W|K|6W|36|6W|3V|6W|2B|6W|7|6W|11|6W|R|6W|1V|6W|2R|6W|4Z|6W|5J|6W|2O|6W|1I|6W|13|6W|X|6W|5A|6W|4D|6W|64|6W|61|6W|46|6W|2Q|6W|1F|6W]|1E|$1C|6S|U|6T|R|6U|14|6U|5D|6U|20|6U|18|6U|16|6V|K|6V|1V|6V|1Z|6W|C|6W|T|6W|46|6W|10|6W|N|6W|21|6W|17|6W|4C|6W|3B|6W|1D|6W|3M|6V|2V|6V|2S|6V|2X|6V|1H|6V|J|6V|M|6V|O|6V|11|6V|G|6V|1I|6V|X|6V|2P|6V|2N|6W|E|6W|3N|6W|32|6W|6B|6W|1F|6W|1P|6W|7|6W|3K|6W|12|6W|3R|6W|19|6W|1W|6W|1G|6W|4E|6W|I|6W|63|6W|2Z|6W|3Q|6W|2F|6W|S|6W|3F|6W|6|6W|L|6W|4X|6W|3X|6W|50|6W|1X|6W]|67|$66|6W|4D|6W|65|6W|43|6V]|1F|$19|6S|X|6T|S|6T|2V|6U|4X|6V|U|6V|R|6V|1E|6W|1G|6W|G|6W|1D|6W|O|6W|21|6W|I|6W|1C|6W|2N|6W|1R|6W|C|6W|K|6W|4Y|6W|E|6W|13|6W|6|6W|3Y|6W|1H|6W|53|6W|4Z|6W|T|6W|2T|6W|3V|6W|17|6W|18|6W|2P|6W]|4W|$16|6V|K|6V|4U|6W|50|6W|M|6W|4J|6W|O|6W|U|6W|5T|6W|D|6W|1Z|6W|T|6W|2H|6W|4G|6W|5Z|6W|4E|6W|3U|6W|4N|6W|1J|6W|7|6W|A|6W]|5|$F|6T|8|6U|4|6U|6|6U|4D|6U|0|6U|N|6U|1R|6W|G|6W|14|6W|1|6W|1D|6W|11|6W|2Y|6W|46|6W|1N|6W|4E|6W|4B|6W|16|6W|54|6W|R|6W|4N|6W|P|6W|18|6W|13|6W|3V|6W|4I|6W|4C|6W|K|6W|59|6W|J|6W|Y|6W|3S|6W|3|6X|2|6V|9|6V|5Z|6V|7|6V|H|6W|2V|6W|1W|6W|3X|6W|O|6W|43|6W|36|6W]|A|$2H|6V|E|6W|0|6W|K|6W|2E|6W|6|6W|C|6W|1|6W|2I|6W|N|6W|21|6W|3S|6W|6P|6W|H|6W|Q|6W|7|6W|J|6W|U|6W|3|6W|3N|6W|4W|6W]|2M|$1W|6V|2T|6U|11|6V|3V|6V|5Q|6V|5J|6V|48|6V|4E|6W|2J|6W|1K|6W|1O|6W|2N|6W|2B|6W|14|6W|G|6W|2O|6W|16|6W|1D|6W|1L|6W|13|6W|2Y|6W|4J|6W|2V|6W|2U|6W|5B|6W|2Q|6W|Y|6W|4X|6W|2K|6W]|2V|$19|6U|S|6U|1F|6U|G|6U|1R|6U|14|6V|11|6V|X|6V|1D|6V|1E|6V|6|6V|2X|6V|K|6V|4E|6V|12|6V|3V|6V|4X|6V|U|6V|16|6V|R|6W|2P|6W|4C|6W|4D|6W|N|6W|7|6W|3|6W|O|6W|2N|6W|1I|6W|1U|6W|4I|6W|1C|6W|18|6W|5|6W|2O|6W|3S|6W|Y|6W|2B|6W|1W|6W|2|6W|2M|6W|2T|6W|3X|6W|4B|6W|C|6W|D|6W|E|6W|2Q|6W|4|6W|68|6W|1P|6W]|S|$X|6S|19|6T|1F|6T|4X|6U|2V|6U|G|6Y|4Y|6V|B|6V|R|6V|1G|6V|Y|6V|1D|6V|I|6V|T|6V|1R|6W|8|6W|1I|6W|P|6W|11|6W|J|6W|4Z|6W|25|6W|12|6W|4B|6W|4F|6W|6|6W|D|6W|5E|6W|13|6W|2O|6W|15|6W|2N|6W|53|6W|55|6W|68|6W|3H|6W|4U|6W|3F|6W|E|6W|3V|6W|1T|6W|3Y|6V|C|6W|N|6W|1E|6W|22|6W|7|6W|16|6W|K|6W|1P|6W|U|6W|1C|6W|17|6W|2T|6W]|62|$28|6W]|5W|$3T|6V|1L|6W|3L|6W|4A|6W|4S|6W]|48|$2M|6V|3O|6V|47|6W|2T|6W|3V|6W|11|6W|1W|6W|4E|6W|13|6W|4G|6W|1O|6W|U|6W|1M|6W|3J|6W]|69|$6E|6S|2I|6T|2E|6W]|4S|$4P|6W|5W|6W|3W|6W]|22|$1H|6T|3Q|6U|17|6U|L|6U|R|6U|35|6U|1P|6U|2W|6U|32|6U|3P|6V|C|6V|3T|6V|1R|6V|15|6V|3U|6V|2O|6V|12|6V|J|6V|1I|6V|N|6V|3Y|6V|41|6V|1V|6V|27|6V|1U|6W|2F|6W|3V|6W|2S|6W|5E|6W|3R|6W|S|6W|3H|6W|13|6W|34|6W|3S|6W|42|6W|2N|6W|4Y|6W|1N|6W|4F|6W|30|6W|3D|6W|11|6W|3F|6W|2Q|6W|1D|6W|I|6W|57|6W|1C|6W|3W|6W|1X|6W|7|6W]|6R|$22|6T]|H|$14|6T|R|6T|1C|6U|18|6Y|3N|6U|C|6U|1V|6U|1N|6U|E|6U|L|6V|2F|6V|3R|6V|3B|6V|N|6V|4E|6V|J|6V|30|6V|K|6V|2Z|6V|G|6V|3Q|6V|2N|6W|13|6W|4|6W|1U|6W|32|6W|20|6W|1H|6W|6|6W|46|6W|4D|6W|3S|6W|3F|6W|1R|6W|1S|6W|16|6W|11|6W|3V|6W|2Y|6W|3M|6W|Y|6W|I|6W|17|6W|3A|6W|21|6W|1D|6W|0|6W|8|6W|2I|6W|7|6Y|3|6U|1P|6U|1E|6U|U|6V|2S|6V|5|6W|2P|6W|36|6W|6B|6W|O|6W|A|6W|1W|6W|2|6W|3X|6W]|3Y|$2F|6V|S|6V|22|6V|3Q|6W|X|6W|3H|6W|1H|6W|L|6W|4Y|6W|2E|6W|2I|6W|19|6W|R|6W|1F|6W|J|6W|17|6W]|6M|$6G|6W|61|6W]|3W|$3T|6W|34|6W|5N|6W|2I|6W|4S|6W|2W|6W|3L|6W|L|6W|1H|6W|3Q|6W|1N|6W|2G|6W|2Z|6W|2F|6W|1X|6W|47|6W|22|6W|6F|6W]|9|$54|6U|2|6V|3|6V|5|6V|6|6W|0|6W|1R|6W|1|6W|8|6W|4|6W|11|6W|13|6W]|6F|$6B|6W|2Z|6W|3R|6W|3W|6W]|5Z|$4N|6V|5|6V|63|6W|8|6W|1|6W|4W|6W|F|6W|4D|6W|N|6W]|43|$1B|6U|28|6U|1Y|6V|P|6V|1A|6V|4B|6V|1G|6V|8|6V|61|6V|45|6V|65|6V|67|6V|J|6W|66|6W|4D|6W|N|6W|11|6W|1D|6W|Q|6W|34|6W|1Z|6W|4G|6W|13|6W|G|6W|1I|6W|1N|6W|3F|6W|3G|6W|6G|6W|W|6W|27|6W]|2W|$35|6U|17|6U|22|6U|1I|6V|L|6V|J|6V|3U|6V|1H|6W|3W|6W|R|6W|3T|6W|12|6W|2R|6W|2N|6W|3Q|6W|C|6W|1G|6W|2U|6W|1W|6W|1P|6W|57|6W|3H|6W|15|6W|4Y|6W|2Q|6W|1Z|6W]|4O|$4M|6W|28|6W|4L|6W|4G|6W]|2S|$R|6U|1P|6V|1H|6V|1C|6V|L|6V|32|6V|3Q|6V|1E|6V|14|6V|J|6V|H|6V|E|6V|2F|6V|18|6V|3T|6V|2N|6V|Y|6W|3V|6W|C|6W|1V|6W|5J|6W|12|6W|U|6W|3R|6W|2O|6W|58|6W|2Z|6W|11|6W|M|6W|1G|6W|3U|6W|3M|6W|6|6W|3|6W|17|6W|22|6W|N|6W|K|6W|1D|6W|1W|6W|1X|6W|36|6W|3B|6W|16|6W|4C|6W|2R|6W|3D|6W|2T|6W|S|6W]|1X|$T|6U|1Y|6U|11|6U|28|6V|M|6V|13|6V|3T|6V|P|6V|1W|6V|R|6W|2R|6W|J|6W|16|6W|2N|6W|Q|6W|10|6W|1D|6W|W|6W|25|6W|1B|6W|1I|6W|6D|6W|5L|6W|G|6W|4B|6W|X|6W|1T|6W|44|6W|43|6W|2S|6W|L|6W|3L|6W|U|6W|V|6W|5T|6W|I|6W|1G|6W|1H|6W|34|6W|3W|6W|3E|6W|1E|6W|22|6W]|3D|$3C|6T|1P|6T|3F|6Y|R|6V|12|6V|J|6V|C|6V|17|6V|1G|6W|1I|6W|3G|6W|3H|6W|N|6W|3E|6W|1H|6W|15|6W|3B|6W|L|6W|22|6W|E|6W|3P|6W|1N|6W|32|6W|1J|6W|11|6W|13|6W|3Q|6W|2F|6W|2S|6W|7|6W|1C|6W|42|6W|1V|6W|34|6W]|2C|$5L|6V|2G|6W|5M|6W|5R|6W|24|6W]|4R|$4P|6W|56|6W|5C|6W|4A|6W]|2T|$5Q|6T|5J|6U|2M|6U|3V|6U|2Q|6V|4X|6V|2O|6V|1T|6V|2N|6V|2P|6V|2X|6W|1O|6W|T|6W|2B|6W|48|6W|5B|6W|1K|6W|K|6W|1D|6W|11|6W|4Z|6W|25|6W|33|6W|2Y|6W|1W|6W|2V|6W|13|6W|68|6W|1F|6W|4U|6W|16|6W|S|6W|2S|6W]|2L|$2J|6Y|2K|6U|55|6W]|7|$K|6T|N|6T|C|6T|13|6T|14|6U|R|6Y|H|6Y|G|6U|1R|6U|L|6U|31|6U|J|6U|1V|6U|1C|6U|E|6V|6|6V|2|6V|2N|6V|U|6V|16|6V|1P|6V|1I|6V|18|6V|4D|6V|O|6V|20|6V|2V|6W|T|6W|49|6W|17|6W|3S|6W|30|6W|46|6W|21|6W|1D|6W|1|6W|3|6V|11|6V|I|6V|0|6V|1N|6V|5|6V|B|6W|1W|6W|Y|6W|1E|6W|V|6W|3N|6W|3F|6W|Q|6W|1J|6W|2P|6W|3C|6W|2X|6W|3E|6W|15|6W|A|6W|S|6W|3D|6W|3X|6W|1H|6W|X|6W|3M|6W|1U|6W|19|6W|1G|6W|4E|6W|Z|6W|3O|6W|F|6W|D|6W|43|6W|36|6W|3U|6W|1S|6W|2F|6W|8|6W|4W|6W|12|6W|50|6W|2O|6W|3I|6W|3Q|6W|1L|6W|22|6W]|3X|$E|6V|14|6V|46|6V|1H|6W|4D|6W|R|6W|U|6W|G|6W|18|6W|3S|6W|L|6W|N|6W|1R|6W|3Q|6W|1C|6W|49|6W|H|6W|7|6W|1U|6W|5|6W|2V|6W|J|6W|6|6W|O|6W|1E|6W|11|6W|32|6W|2F|6W|17|6W|3|6W]|1M|$4|6V|4D|6W|I|6W|K|6W|48|6W|13|6W|2|6W|3|6W|21|6W]|3|$5|6X|4|6S|6|6T|2|6T|N|6U|1R|6Y|8|6U|0|6U|H|6U|F|6U|Y|6V|R|6V|3V|6V|1U|6V|4D|6V|3S|6V|14|6V|4B|6V|7|6V|11|6V|1|6V|9|6V|L|6V|C|6V|5C|6V|4C|6V|E|6W|K|6W|59|6W|G|6W|1N|6W|18|6W|1D|6W|2V|6W|3X|6W|P|6W|54|6W|1P|6W|2S|6W|2Y|6W|J|6W|15|6W|4I|6W|O|6W|A|6W|36|6W|4E|6W|3Q|6W|2F|6W|2O|6W|1M|6W|2Z|6W|16|6W|46|6W|3B|6W|3A|6W|1C|6W|6J|6W|2I|6W|1H|6W|58|6W|3F|6W|12|6W|13|6W|1J|6W|21|6W|67|6W]|23|$6K|6V|5G|6V|M|6W|10|6W|11|6W|I|6W|Z|6W|1R|6W|25|6W|2M|6W]|36|$1W|6U|4E|6V|1V|6V|14|6V|R|6W|46|6W|H|6W|3V|6W|2F|6W|2P|6W|17|6W|L|6W|3Q|6W|2R|6W|3B|6W|3|6W|1D|6W|2S|6W|50|6W|C|6W|K|6W|1O|6W|N|6W|7|6W|2O|6W|1R|6W|1U|6W|2X|6W|18|6W|1P|6W|U|6W|2N|6W|11|6W|1H|6W|F|6W|3S|6W|2B|6W|4V|6W|5|6W]]";

/***/ }),

/***/ "./node_modules/vibemap-constants/dist/vibesFromCMSTaxonomy.zip.json":
/*!***************************************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/vibesFromCMSTaxonomy.zip.json ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "description|Arousing+amusement+in+the+silly+and+illogical|name|Absurd|slug|absurd|details|categories|vibeset|vibes|crazy|unexpected|outrageous|silly|weird|strange|funny|eccentric|whimsical|search_term|msv|affirmations|Not+everything+has+to+make+sense|Embrace+the+unknown|Academic|academic|bookish|nerdy|literary|educational|cultural|civic|Accessible|accessible|inclusive|affordable|open|participatory|helpful|Action|action|adventurous|wild|extreme|adrenaline|healthy|supportive|energetic|enthusiastic|busy|Engaging+and+energetic+pursuits|Active|active|outdoors|fitness|exercise|workout|wellness|Take+a+step+forward|A+simple+is+positive+movement|Bringing+about+positive+change|Activist|activist|term_id|Community|community|term_group|term_taxonomy_id|taxonomy|activity|Explore+ways+to+get+involved+in+your+local+community.+Support+local+businesses,+volunteer,+give+back,+or+pay+it+forward+with+these+community+groups+and+hubs+of+local+culture.+|parent|count|filter|raw|solidarity|vegan|radical|hippie|feminist|volunteer|justice|Fairness+and+justice+are+a+jam|Challenging+the+status+quo|Showing+up+for+a+fair,+kind,+joyous+world|+What+new+solutions+can+you+bring+about?|Adorable|adorable|cute|sweet|Adrenaline|Willingness+to+try+new+things|Adventurous|scenic|eclectic|aquatic|sporty|lively|rebel|hiking|bold|carefree|courageous|inventive|outdoorsy|playful|passionate|wanderlust|imaginative|recess|Everyday+can+be+full+of+excitement|Picture+new+possibilities|Always+keep+those+tricks+up+your+sleeves|Aesthetic|aesthetic|artsy|chic|cinematic|decorative|design|elegant|luxe|minimalist|fancy|stylish|bright|fashion|Affordable|cheap|After+Party|after-party|dark|party|buzzing|After+Work|after-work|fun|boozy|chill|Afternoon|afternoon|sunny|relaxing|lazy|weekend|summer|lunch|Spacious,+light-filled+bliss|Airy|airy|patio|fresh|dreamy|earthy|breezy|serene|lush|pastel|crisp|mellow|soothing|beautiful|seductive|oasis|tranquil|wistful|angelic|Take+a+deep+breath+of+light+air|Aloha|aloha|happy|welcoming|kindness|namaste|tiki|love|surf|ocean|tropical|floral|paradise|beach|Open+to+other+possibilities|Alternative|alternative|indie|boho|revolutionary|There+are+few+deadends|Unexpected+wonder\n|Amazing|amazing|cool|fantastic|exciting|interesting|magical|delightful|memorable|sublime|inspired|Americana|americana|traditional|classic|kitschy|retro|nostalgic|Throw+it+back+to+the+old+school+ways|Analog|analog|oldschool|handmade|throwback|deepcut|hifi|legacy|Take+it+back+to+another+time|Angelic|soulful|blissful|joyful|sensual|sparkly|blessed|enchanted|gentle|sexy|empath|Animals|animals|Outdoors|0|Cute|vibe|Endearing+and+youthful|2|Cats|cats|3|Children|children|Young+and+innocent|4|Wild|Natural+and+uninhibited|Anime|anime|dress-up|sci-fi|cosplay|geeky|Nostalgic+collectables|Antique|antique|Shopping|shop|vintage|collectable|cottage|art|historic|homemade|heritage|Add+to+your+collection|Under+the+sea|Aquatic|colorful|nautical|mermaid|scuba|waterfront|coastal|+Be+at+peace+amongst+the+water|Architecture|architecture|creative|iconic|popularity_in_django|Arctic|arctic|cold|snowy|frosty|wintry|Human+creativity|Art|street-art|interactive|dance|experiential|Imagine+the+world+around+you+as+a+painting|Art-Deco|art-deco|Handmade+and+traditional+crafts|Artisanal|artisanal|foodie|organic|craft|rustic|gourmet|nosh|Appreciate+the+care+put+into+things|Surrounded+and+made+from+art|Artsy|hipster|funky|trendy|groovy|edgy|quirky|highbrow|deluxe|glam|beatnik|fashionista|Imagine+the+world+around+you+as+a+painting|Listening+to+that+creative+energy|The+art+of+living+with+others|Listen+to+your+creative+energy+today|Atmosphere|atmosphere|fairytale|harmonious|Original,+genuine,+and+true|Authentic|authentic|family|unique|wholesome|Being+yourself+is+attractive|Looking+at+the+world+through+through+fresh+eyes|Make+a+new+ritual+that+speaks+to+your+truest+self|An+open+understanding|Aware|aware|mindful|curious|grateful|optimistic|proud|Elevate+your+knowledge|Badass|badass|punk|dope|Bagel|bagel|kosher|coffee|granola|Balanced|balanced|zen|calm|Beach|warm|vacation|picnic|tourist|sunset|getaway|staycation|Beatnik|rock|jazzy|laidback|trippy|grunge|psychedelic|disco|Pleasing+to+the+senses|Beautiful|classy|vibrant|Beauty+is+everywhere|A+place+that+invites+and+feels+right|Belonging|belonging|friendly|trust|+Find+a+home+away+from+home|You+belong+here|Tune+into+the+vibration+around+you|Of+great+size+or+intensity|Big|big|vast|There+is+always+more|Human-powered+movement|Biking|biking|urban|park|Experience+the+freedom+of+cruising|Bizarre|bizarre|Blessed|generous|comforting|Complete+joy|Blissful|Bliss+is+near|Complete+joy|Lacking+the+need+to+confirm+to+society|Boho|You+do+you|Strong+and+vivid|Bold|visionary|dramatic|Build+in+confidence|Boogie|boogie|Enjoyment+of+stories+and+learning|Bookish|moody|+A+good+book+can+take+you+anywhere|Intoxicating+experiences|Boozy|social|hangover|drinks|tipsy|rowdy|drinking|raunchy|Let+loose+and+celebrate+anything|Natural+green+and+goodness|Botanical|botanical|mystic|garden|natural|plant|restorative|jungle|Sprout+roots+and+grow|Boujee|boujee|upscale|Boutique|boutique|luxury|pampering|posh|opulent|Breezy|Bright|lit|glitter|neon|Bubbly+late+breakfast+with+friends|Brunch|brunch|tasty|savory|snacky|hearty|delicious|diner|Bubblegum|bubblegum|pretty|Bussin|bussin|Full+of+activity|Busy|crowded|festive|Let+loose+and+celebrate+anything|Humming+feelings+or+sounds|Buzzing|popular|trending|popping|red-hot|loud|Gotta+have+the+funk|Feel+the+good+vibrations|Caffeine|caffeine|California|california|seasonal|Undisturbed+and+unshakable|Calm|peaceful|quiet|quiet-energy|Embrace+stillness|Into+the+wild|Camp|camp|rugged|ranch|Exaggerated+and+amusing+humor|Campy|campy|original|sassy|Take+it+over+the+top|Candlelit|candlelit|romantic|datespot|intimate|Cannabis|cannabis|smokey|No+worries|Carefree|casual|Let+it+all+go|Caribbean|caribbean|Relaxed+and+easy|Casual|comfy|+Go+with+the+flow|Enjoying+something+special|Celebratory|celebratory|special|Applaud+the+people+growing+alongside+you|There+are+many+causes+to+celebrate|Express+love+to+your+road+dogs|Celebrity|celebrity|exclusive|hollywood|shopaholic|Centered|centered|Charming|charming|Almost+free|Cheap|free|simple|Free+as+in+freedom|Cheerful|cheerful|Chic|Young+and+innocent|kidcore|young|playtime|intergenerational|Remember+a+happy+place|Relaxed+in+a+way+you+want+to+be+around|Chill|Refused+to+be+rushed|Super+calm+vibes+are+in+your+future|Living+in+the+moment+is+part+of+being+chill|Christmas|christmas|yuletide|holiday|Dramatic+and+moving|Cinematic|musical|film|Imagine+the+score+to+your+adventure|City+Life|city-life|Being+a+part+of+the+city|Civic|local|positive|public|neighborhood|Community+=+a+force+far+greater+than+money|Show+up+in+every+way+you+can|Collectively-minded+is+a+cool+way+to+be|Outstanding+over+time|Classic|Rituals+bring+perspective|Timeless+outlasts+trends|Embrace+one+retro+activity+today|Classy|Clean|clean|Club|club|music|Clubhouse|clubhouse|Coastal|Coffee|Cold|Collaborative|collaborative|together|innovative|Lively,+expressive,+and+bright|Colorful|rainbow|Imagine+yourself+as+a+mural|Comforting|refreshing|Comfy|cozy|Your+people|multicultural|Support+those+around+you|Contemporary|contemporary|modern|Conversational|conversational|Cool|Cosplay|costume|futuristic|halloween|Costume|Cottage|cottagecore|Calm,+collected,+and+always+in+style|Cottagecore|country|Country|roadhouse|western|cowboy|rodeo|cowgirl|honky-tonk|Country+Club|country-club|country+club|Couple|couple|couples|Courageous|spirited|fierce|Cowboy|woodsy|lumberjack|Cowgirl|Warm,+snug,+and+loved|Cozy|+Wrap+yourself+in+something+fluffy|Made+with+care+and+skill|Craft|diy|folk|Crazy|laugh|Creative|entrepreneurial|dynamic|The+world+needs+your+creativity|Creative+energy+exists+in+all+aspects+of+your+life|Crisp|Crowded|Crunchy|crunchy|flavorful|Ideas+and+identities|Cultural|diverse|spiritual|Find+inspiration+in+a+group|Roam+through+new+teachings+today|Connect+to+a+place+and+its+story+today|Take+an+artsy+path+today|Eager+to+learn+and+explore|Curious|entertaining|mysterious|+Free+to+grow+and+roam|Learning+about+yourself+is+the+same+as+learning+about+the+world|Make+space+for+a+new+lesson+today|Endearing+and+youthful|Picture+your+favorite+animal+playing|Cutty|cutty|hidden-gem|hip-hop|Shakin'+&amp;+swayin|Dance|shimmy|singing|Move+with+the+beat+of+the+music|Dark|spooky|Date+Spot|Seek+out+your+person|Dating|dating|kinky|Seek+out+your+person|Decorative|If+you+know,+you+know|Deep+Cut|Appreciate+what+your+childhood+taught+you|Delicious|spicy|juicy|slurpy|sugary|Delightful|Deluxe|Desert|desert|Design|Diner|Disco|Discover|discover|explore|wander|Dive|dive|old|A+variety+of+it+all|Diverse|We+are+in+this+together|Do-It-Yourself|DIY|eco|recyled|Make+use+of+what+you+have+in+abundance|Dogs|dogs|Anything+good|Dope|Dramatic|Magical+or+otherworldly|Dreamy|Picture+yourself+anywhere+you+like|Each+moment+is+new|Dress-up|Tasty+beverages+with+friends|Drinking|nightlife|latenight|+Give+a+toast+to+absent+friends|Take+some+downtime+today|Keep+a+full+bottle+of+water+with+you+today|Drinks|All+the+swagger|Drip|drip|Always+be+yourself|Constantly+changing+and+evolving|Dynamic|transformative|Try+shifting+your+mindset+today|Stay+open+to+new+ideas+today|Earthy|sustainable|green|Eccentric|Diverse+styles+and+tastes|Eclectic|Living+life+in+full|Discover+your+next+favorite+thing|Picture+new+possibilities|From+earth+and+good+for+earth|Eco|thrift|Edgy|Educational|Eerie|eerie|gothic|supernatural|haunted|Refined+style+and+taste|Elegant|elevated|You+deserve+a+slide+of+goodness|Positivity+and+respect|Elevated|refined|Emo|emo|emotional|All+the+feelings|Emotional|intense|Empath|Enchanted|Full+of+vitality+and+possibility|Energetic|A+positive+attitude+boosts+your+energy|The+world+needs+your+energy+today|Entertaining|Enthusiastic|Entrepreneurial|Epic|epic|legendary|Euro|euro|french|parisian|Evergreen|evergreen|forest|Beyond+stoked|Exciting|It’s+time+for+one+new+daily+ritual!|Stay+open+to+deeper+connections+today.|The+world+needs+your+enthusiasm.+Get+out+there.|Exclusive|vip|Exercise|selfcare|Experiential|Experimental|experimental|fusion|Take+a+new+path|Explore|Extreme|Fairytale|utopian|Together+with+those+you+love|Family|Taking+time+to+show+the+genes+some+love|Pouring+good+love+into+my+people|Take+time+to+enjoy+your+people|family+friendly|family-friendly|Famous|famous|favorite|Fancy|Fantastic|Fantasy|fantasy|Farout|farout|Fashion|All+about+the+glam|Fashionista|treatyourself|Fast|fast|Favorite|Feminist|queer|subversive|Femme|femme|Cheerful+and+colorful+gathering|Festive|Be+the+life+of+the+party|Fierce|Film|novel|Fitness|Flapper|flapper|prohibition|speakeasy|Flavorful|Flex|flex|Flirty|flirty|Floral|Focused|forcused|work|productive|hardworking|study|Traditions+of+everyday+people|Folk|Music|Make+time+to+look+at+the+Moon|Honor+the+wisdom+traditions|Food+is+life|Foodie|vegetarian|Forest|At+no+cost|Free|French|Nice,+new,+and+refreshing|Fresh|new|Savor+something+crisp,+sweet+and+made+from+light|Kind+and+inviting|Friendly|Open+the+door+to+friendship|Frosty|Fruity|fruity|Enjoyment+and+laughter|Fun|Plan+a+playdate|Funky|Comedic+relief|Funny|spontaneous|Remember+to+laugh|Laughter+is+essential+to+survival|Truth+comes+through+laughter|Fusion|Futuristic|Games|games|Growth+of+fruits+and+flowers|Garden|Admire+new+growth+in+something+old|Gay|gay|lgbtq|Profound+Enthusiasm|Geeky|Belonging+is+a+club+for+us+all|Abundance+of+giving|Generous|Pay+something+forward|Gentle|Getaway|Beautiful+beyond+compare|Glam|Your+light+is+strong|Glitter|Global|global|international|Goofy|goofy|Gothic|Gourmet|Granola|Grateful|Greek|greek|Green|Grimy|grimy|underground|Groovy|Grunge|Halloween|paranormal|pumpkin|Handmade|Hangover|Hanukkah|hanukkah|Happy|Happy+Hour|happy-hour|Hardworking|Positive+balance|Harmonious|Haunted|witchy|Healing|healing|rejuvenating|All+about+what+is+good+for+you|Healthy|Make+your+self+care+a+priority|Take+care+of+yourself|Hearty|Helpful|Heritage|old-world|All+about+that+high+quality|Hi+Fi|You+deserve+the+best|Amazing+but+not+widely+known|Hidden+Gem|secret|Highbrow|Walking+around+in+nature|Hiking|walk|Hip|hip|Hip+Hop|Chill+out|Hippie|Dance+to+the+beat+of+your+own+drum|Hipster|Places+of+importance|Historic|Cross+paths+with+so+many+who+came+before|Holiday|Holistic|holistic|perspective|Hollywood|Homemade|Honky-tonk|Hot|hot|Hustle|hustle|+Cozy+&amp;+Comfortable|Hygge|hygge|Hyphy|hyphy|Iconic|landmark|Imaginative|Immaculate|immaculate|impeccable|Impeccable|In+Solidarity|in-solidarity|Common+good|In-solidarity|+Goodness+in+groups+multiplies|Envision+a+new+way+of+being|Collectively-minded+is+a+cool+way+to+be|Open+to+everyone|Inclusive|Who’s+missing?+Work+on+acknowledgement+and+awareness+today|Finding+common+ground+takes+a+good+heart|Be+especially+open+to+the+beauty+of+others+today|Independent+and+original|Indie|Industrial|industrial|Influencial|influencial|Innovative|Brilliant+and+life+affirming|Inspired|Higher+places+are+calling|Your+inner+beauty+is+shining|Smiling+makes+the+brain+think+happy+thoughts|Intense|Interactive|Arousing+curiosity+and+feeling|Interesting|Intergenerational|International|Warmth+of+closeness|Intimate|small|Intimacy+flourishes+in+safe+spaces|Inventive|Inviting|inviting|Eye+catching+style|Jazzy|Feeling+great+pleasure+and+happiness|Joyful|Be+happy+with+yourself|Looking+for+joy+is+a+pleasure+itself|Juicy|Jungle|Justice|Kidcore|Kindness|Kinky|Kitschy|The+oddest+things+can+bring+the+greatest+joys|Kosher|Laid-back|Landmark|Late+Night|Laugh|Lax|lax|Lazy|Legacy|Legendary|Legit|legit|LGBTQ|Liberating|liberating|It's+happening|Lit|Find+yourself+amongst+the+crowds|Literary|Full+of+energy+and+activity|Lively|+Enjoy+the+sound+of+indistinct+chatter|Stay+open+to+having+a+wild+experience+today|Belonging+to+a+nearby+area+and+community|Local|Actively+supporting+my+network|Making+time+for+mutual+growth|Spread+that+local+love+today|See+some+local+history+today|It's+turned+up|Loud|Let+your+voice+be+heard|Profound+affection+for+yourself+and+others|Love|The+magnificent+opportunities+of+an+open+heart|Valuing+the+unions+in+our+life|A+healthy+dose+of+acceptance+helps|Lovely|lovely|Low-Key|low-key|Lumberjack|Lunch|Food|food|Eat+and+explore+culinary+culture.+Whether+your+vibe+is+a+lively+brunch,+a+friendly+lunch,+a+chill+breakfast,+or+an+intimate+dinner,+we've+got+you+covered+with+the+best+restaurants+and+other+places+to+eat,+including+outdoor+patios,+rooftop+bars,+and+markets.+You+can+also+discover+by+taste,+like+savory,+sweet,+and+spicy.|Lush|Oh+so+fancy|Luxe|You+define+your+beauty|So+glamourous|Luxury|You+define+your+beauty|Beyond+the+ordinary|Magical|Life+bringing+surprises+&+triumphs|There+is+magic+in+showing+up|Find+inspiration+is+somewhere+unexpected|Mellow|Memorable|From+the+land+to+the+sea|Mermaid|Be+authentically+yourself|Messy|messy|Mid-century|mid-century|Aware+of+the+present|Mindful|Dig.+Deep.+Down.|Envision+a+new+way+of+being|Turning+your+gaze+toward+yourself|Mingle|mingle|Simple+and+good+use+of+effort|Minimalist|Freeing+up+mental+space+for+new+opportunities|Modern|sophisticated|A+sudden+burst+of+a+mood|Moody|Be+flexible+as+your+personality+evolves|Stay+tuned+in+with+your+feelings|Morning|morning|Mountain|mountain|Multicultural|Sounds+of+feeling+and+harmony|Musical|Curating+a+joyful+playfist|Music+is+like+mother’s+medicine|Slow+down+with+a+slow+jam+today|Must-See|must-see|Mysterious|Holding+onto+that+spiritual+magic|Mystic|Your+hold+your+own+power|Namaste|yoga|Of+the+earth|Natural|Be+one+with+the+land|Be+part+of+the+natural+world|Of+the+sea|Nautical|Neighborhood|All+the+bright+lights|Neon|Shine+your+brightest|Nerdy|New|New+Wave|new-wave|Nightlife|Snack+on|Nosh|Remembrance+of+the+past|Nostalgic|Recreate+some+aspect+of+local+history|A+nostalgic+experience+is+in+your+future|Novel|Like+finding+water+in+the+desert|Oasis|Ocean|Old|Respect+for+the+coolness+of+earlier+eras|Old+School|Remember+to+keep+it+evergreen|Recreate+some+aspect+of+local+history|Old+World|Open|Optimistic|Opulent|Oregon|oregon|Organic|Eat+and+explore+culinary+culture.+Whether+your+vibe+is+a+lively+brunch,+a+friendly+lunch,+a+chill+breakfast,+or+an+intimate+dinner,+we've+got+you+covered+with+the+best+restaurants+and+other+places+to+eat,+including+outdoor+patios,+rooftop+bars,+and+markets.+You+can+also+discover+by+taste,+like+savory,+sweet,+and+spicy.|Original|Outside+in+open+air|Nurturing+the+soul+through+nature|Being+one+with+the+sun,+the+stars,+the+elements|Beinging+one+with+the+land|Outdoorsy|views|Nurturing+the+soul+through+nature|Explore+the+sun,+the+stars,+the+elements+and+yourself|Being+one+with+the+sun,+the+stars,+the+elements|Outgoing|outgoing|Outrageous|Pampering|A+wide+beautiful+view|Panoramic|panoramic|photo|skyline|Paradise|Paranormal|Everyday,+effortless+chic|Parisian|The+outdoor+spaces+we+all+share|Park|+Enjoy+a+break+and+people+watch|Participatory|Party|Deeply+caring+for+something|Passionate|Lean+in+to+what+you+care+about|+Dreamy+and+calm|Pastel|Relaxation+shared+outdoors|Patio|+Enjoy+a+break+and+people+watch|Patriotic|patriotic|Tranquil+and+undisturbed|Peaceful|Finding+room+to+breathe|A+slice+of+something+soothing+and+lush|Pools+of+peace+can+be+found+within|Perspective|Photo|Photogenic|photogenic|picturesque|Afternoon+in+the+park|Picnic|Seeing+an+old+view+a+new+way|Picturesque|Plant|Fun+and+games|Playful|Make+an+errand+a+game|Take+time+to+enjoy+pets+&+animals|Breathe+deeper|Playtime|It's+on+fire|Poppin'|It's+happening|Popular|Joy+multiplies+when+shared+widely|Do+one+activity+beloved+by+many|Ephemeral+experiences|Popup|popup|Posh|Good+vibes+only|Positive|Pass+along+good+vibes|Pretty|Priceless|priceless|Productive|Progressive|progressive|Prohibition|Deserved+power+and+pleasure|Proud|Speaking+truth+without+hesitation|Reclaiming+our+stories|Find+a+new+way+to+engage+in+civic+pride|Psychedelic|Public|Pumpkin|Punk|Queer|A+space+with+little+distraction|Quiet|safe|Being+comfortable+in+silence|Listen+for+that+divine+intelligence|Establish+a+calm+environment+today|Quiet+Energy|Quirky|On+the+edge+of+the+common|Radical|Bravely+go+out+into+the+world|Move+beyond+your+wildest+dreams|Rainbow|Ranch|Raunchy|Original+and+outside+the+box|Rebel|Learn+the+rules+and+bend+them|Recess|Recyled|reuse|Red-Hot|Refined|Refreshing|Rejuvenating|A+release+of+tension|Relaxing|+Doing+nothing+is+fine|Let+go|Renowned|renowned|Restorative|Styles+of+the+past|Retro|Honor+the+things+that+came+before|Give+respect+to+the+coolness+of+earlier+eras|Vintage+is+built+to+last+-+go+explore+why|Reuse|Revolutionary|Roadhouse|Rock|Rodeo|Grand+feelings,+especially+love|Romantic|+Nothing+nourishes+like+a+warm+embrace|There+is+more+love+awaiting|Love+is+there+even+when+not+easy+to+see|Rooftop|rooftop|Rowdy|Wild+&amp;+rough|Rugged|Rustic|Safe|Salty|salty|san+francisco+museums|san-francisco-museums|san+francisco+top+10+museums|san-francisco-top-10-museums|Sassy|Savory|Scary|scary|Impressive+and+beautiful+views|Scenic|Seeing+an+old+view+a+new+way|Sci-fi|Scuba|Seasonal|Secret|Seductive|Take+care+of+yourself|Self+Care|Invoking+the+senses|Sensual|A+warm+embrace+is+so+nourishing|There+is+more+love+ahead+|Serene|Sexy|Shakin'+&amp;+swayin'|Shimmy|turnedup|+Move+with+the+beat+of+the+music|Shop|Shop+till+you+drop|Shopaholic|Silly|Simple|Singing|Skate|skate|Skyline|Slurpy|Smackin'|smackin|yummy|Small|Smokey|Snacky|Snowy|Sober|sober|Get+together+with+good+energy|Social|Get+together+with+good+energy|Soothing|Sophisticated|Soulful|Sparkly|Speakeasy|Special|Spicy|Spirited|Spiritual|Go+with+the+flow|Spontaneous|Spooky|Sporty|Spring|spring|Staycation|Strange|Street+Art|Study|Stylish|Sublime|Subversive|Sugary|Summer|Full+of+warmth+and+light|Sunny|Sunshine+unites+all+life|Amazing+end+to+the+day|Sunset|Sunshine+unites+all+life|Supernatural|Supportive|Surf|Good+for+the+long+term|Sustainable|Sweet|Taco|taco|Tasty|Good+for+a+second+time|Thrift|Of+another+time|Throwback|Hold+your+memories+close|Tiki|Timeless|timeless|Tipsy|Closeness+and+shared+experiences|Togetherness|Belonging+is+a+club+for+us+all|Tokyo|tokyo|Top+vibes+on+Vibemap|Top|top|Tourist|Visit|visit|Visitors+guide+to+the+best+of+%25city%25.+Discover+culture,+history,+and+landmarks+while+having+a+fun,+memorable+time+sightseeing+and+exploring.+We've+collected+must+see+spots+and+favorite+for+tourist+and+locals+alike.+Plan+your+trip+or+weekend+getaway+and+book+these+attractions+for+free+or+at+a+discount.|Traditional|Tranquil|Transformative|Transit|transit|You+deserve+it|Treat+Yourself|Trending|Drop+into+something+new|Currents+of+taste|Trendy|Drop+into+something+new|Unexpectedly+different|Trippy|Look+for+the+unexpected|Warm+and+lush|Tropical|Find+your+life's+adventure|Trust|Volume+to+11|Turned+Up|You+are+the+life+of+the+party|Turnt|turnt|Ugly|ugly|If+you+know,+you+know|Underground|You+find+what+you+need+where+you+least+expect+it|Unexpected|Unique|Upbeat|upbeat|Upscale|Urban|Utopian|Vacation|Be+mine+&lt;3|Valentine|valentine|Vast|Conscious+eating+and+good+greens|Vegan|Eat+and+explore+culinary+culture.+Whether+your+vibe+is+a+lively+brunch,+a+friendly+lunch,+a+chill+breakfast,+or+an+intimate+dinner,+we've+got+you+covered+with+the+best+restaurants+and+other+places+to+eat,+including+outdoor+patios,+rooftop+bars,+and+markets.+You+can+also+discover+by+taste,+like+savory,+sweet,+and+spicy.|Vegetarian|Full+of+energy+and+life|Vibrant|Your+presence+helps+make+vibrancy|Feel+the+pulse+of+life|Pleasing+landscapes+or+environments|Views|Be+present+and+look+beyond|In+and+of+the+past|Vintage|Honor+things+that+came+before|VIP|Visionary|Vivacious|vivacious|Helping+other+and+giving+back|Volunteer|Explore+ways+to+get+involved+in+your+local+community.+Support+local+businesses,+volunteer,+give+back,+or+pay+it+forward+with+these+community+groups+and+hubs+of+local+culture.+|Joining+forces+creates+abundance|Service+gives+perspective|Small+acts+can+be+mighty|Walk|Wander|Wanderlust|Warm|Waterfront|Weekend|Weird|Welcoming|Wellness|Wes+Anderson|wes-anderson|Western|Carefree+and+playful+amusement|Whimsical|Have+fun+for+fun's+sake|Welcome+free+expression|Wholesome|Natural+and+uninhibited|Nature+shows+us+ways+of+being|Wintry|Wistful|In+possession+of+the+supernatural|Witchy|wizard|Your+magic+is+strong|Wizard|Woodsy|Work|Workout|Yoga|Young|Yuletide|Yummy|Zen^A|A|A|A|78|4UT|0|4UT|4UV|D|A|A|A|1JK|AU|1O|A|A|A|A|A|2S|B4|A|14|4W4|0|4W4|4UV|E|573|0|573|0|0|6NP|0|6NP|0|0|5A0|0|5A0|0|3|57F|0|57F|0|7|14|A|4V4|0|4V4|4UV|C|AU|4W4|0|4W4|4UV|E|14|5K|4UR|0|4UR|4VY|7|2S|K|4UR|0|4UR|4VY|7|B4|A|5K|K|A|A|A|B4|A|A|JG|A|A|2I|2I|A|A|A|32|5K|A|668|A|A|A|K|A|4Q|4W4|0|4W4|4UV|E|8C|A|A|A|A|5K|A|A|A|A|U|1JK|A|78|A|GO|14|A|14|3UW|U|A|A|A|5K|A|2I|A|A|2S|A|14|3C|A|A|A|2I|A|A|8C|1E|A|A|5K|8W|1O|5K|K|2I|A|5U|GO|A|8C|A|A|A|A|32|A|A|28|4G|2S|A|U|5K|K|A|K|A|A|1O|A|K|B4|A|2S|14|B4|A|5K|A|A|RS|A|A|A|A|K|14|14|A|A|A|A|A|5K|4UR|0|4UR|4VY|7|4W7|0|4W7|4UV|6|334|A|1JK|A|5K|1O|A|4MO|1JK|RS|2I|1O|A|A|A|A|A|A|U|A|A|A|1E|14|78|A|A|A|A|5K|1Y|50|18G|5K|2I|K|M8|K|A|28|K|A|K|A|A|A|K|3W|1Y|K|14|B4|14|A|A|1O|A|U|28|A|U|1O|A|28|K|5K|4MO|A|14|A|A|5K|4VV|0|4VV|4UV|S|A|A|28|1O|A|K|U|A|A|14|A|A|1E|2S|A|1O|A|3M|1Y|A|5K|5K|52I|0|52I|4UV|7|K|28|50|28|50|4VV|0|4VV|4UV|S|2S|8W|A|A|5K|A|A|4Q|A|DC|A|32|A|U|A|B4|A|78|14|K|AU|A|A|A|A|14|A|U|A|K|A|14|A|A|A|A|4Q|6O|K|A|B4|A|U|A|A|K|AK|A|A|B4|A|A|A|A|A|3W|1Y|A|A|K|A|A|A|14|A|A|2I|28|A|M8|3W|A|A|14|A|14|5K|28|1E0|A|28|2I|K|A|A|A|A|14|A|B4|4UY|0|4UY|4UV|F|U|A|3W|A|K|A|K|A|B4|A|B4|A|14|3W|A|B3|JG|4VV|0|4VV|4UV|S|5K|A|12W|104|8W|A|B4|4UT|0|4UT|4UV|D|A|A|78|8C|DC|1O|A|A|A|K|64|A|A|3W|A|A|A|78|A|A|2I^NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN^@$0|1|2|3|4|5|6|$7|-2|8|-2|9|@A|B|C|D|E|F|G|H|I]|J|-4|K|17A|L|@M|N]]]|$0|-4|2|O|4|P|6|$7|-2|8|-2|9|@Q|R|S|T|U|V]|J|-4|K|17B]]|$0|-4|2|W|4|X|6|$7|-2|8|-2|9|@Y|Z|10|11|12]|J|-4|K|17C]]|$0|-4|2|13|4|14|6|$9|@15|16|17|18|19|1A|1B|1C|1D]|7|-2|J|-4|L|-2|K|17D|8|-2]]|$0|1E|2|1F|4|1G|6|$7|-2|8|-2|9|@19|1H|15|1D|1B|1A|1C|1I|1J|1K|1L]|J|-4|K|17E|L|@1M|1N]]]|$0|1O|2|1P|4|1Q|6|$7|@$1R|17F|2|1S|4|1T|1U|17G|1V|17H|1W|1X|0|1Y|1Z|17I|20|17J|21|22]]|8|-2|9|@23|24|Y|1T|V|25|26|27|28|29]|J|-4|K|17K|L|@2A|2B|2C|2D]]]|$0|-4|2|2E|4|2F|6|$9|@2G|2H]|7|-2|J|-4|L|-2|K|17L|8|-2]]|$0|-4|2|2I|4|18|6|$9|@15|16|17|14]|7|-2|J|-4|L|-2|K|17M|8|-2]]|$0|2J|2|2K|4|15|6|$7|-2|8|-2|9|@2L|2M|2N|2O|2P|2Q|2R|16|2S|2T|2U|1B|2V|2W|2X|2Y|2Z|30|31]|J|-4|K|17N|L|@32|33|34]]]|$0|-4|2|35|4|36|6|$7|-2|8|-2|9|@37|38|39|3A|3B|3C|3D|3E|3F|I|3G|3H|3I]|J|-4|K|17O]]|$0|-4|2|3J|4|Z|6|$7|-2|8|-2|9|@3K|X|Y]|J|-4|K|17P]]|$0|-4|2|3L|4|3M|6|$9|@3N|16|3O|3P]|7|-2|J|3O|K|17Q|8|-2]]|$0|-4|2|3Q|4|3R|6|$9|@3O|3S|3T|3U]|7|-2|J|-4|L|-2|K|17R|8|-2]]|$0|-4|2|3V|4|3W|6|$7|-2|8|-2|9|@3X|3Y|3Z|40|41|42]|J|-4|K|17S]]|$0|43|2|44|4|45|6|$7|-2|8|-2|9|@46|47|3H|48|3C|3E|49|4A|4B|4C|4D|I|4E|4F|38|4G|3G|4H|3D|4I|4J|4K|4L|4M]|J|-4|K|17T|L|@4N]]]|$0|-4|2|4O|4|4P|6|$9|@4Q|4R|4S|4T|4U|4V|4W|23|4X|4Y|4Z|50|51]|K|17U]]|$0|52|2|53|4|54|6|$7|-2|8|-2|9|@55|2Q|56|30|25|57]|J|-4|K|17V|L|@58]]]|$0|59|2|5A|4|5B|6|$7|-2|8|-2|9|@5C|5D|5E|4H|5F|5G|A|5H|5I|5J|5K]|J|-4|K|17W]]|$0|-4|2|5L|4|5M|6|$9|@5N|5O|5P|5Q|5R]|7|-2|J|-4|K|17X|8|-2]]|$0|5S|2|5T|4|5U|6|$7|-2|8|-2|9|@3U|5V|5W|5Q|5X|5Y|5Z|5N|60|5R]|J|-4|K|17Y|L|@61]]]|$0|-4|2|62|4|4M|6|$9|@48|4H|63|2H|2G|45|64|65|4B|66|67|68|69|6A|6B|6C|4L|4I|4G]|K|1KO]]|$0|-4|2|6D|4|6E|6|$7|@$1R|17Z|2|6F|4|1H|1U|180|1V|181|1W|1X|0|-4|1Z|182|20|183|21|22]]|8|-2|9|$6G|$1R|184|2|6H|4|2G|1U|185|1V|186|1W|6I|0|6J|1Z|187|20|188|21|22]|6K|$1R|189|2|6L|4|6M|1U|18A|1V|18B|1W|6I|0|-4|1Z|18C|20|18D|21|22]|6N|$1R|18E|2|6O|4|6P|1U|18F|1V|18G|1W|6I|0|6Q|1Z|18H|20|18I|21|22]|6R|$1R|18J|2|6S|4|16|1U|18K|1V|18L|1W|6I|0|6T|1Z|18M|20|18N|21|22]]|J|-4|K|18O]]|$0|-4|2|6U|4|6V|6|$9|@R|6W|6X|6Y|6Z]|7|-2|J|-4|L|-2|K|18P|8|-2]]|$0|70|2|71|4|72|6|$7|@$1R|18Q|2|73|4|74|1U|18R|1V|18S|1W|1X|0|-4|1Z|18T|20|18U|21|22]]|8|-2|9|@5V|75|76|77|5R|5W|3A|78|2M|5P|5O|5Q|I|79|7A|7B]|J|-4|K|18V|L|@7C]]]|$0|7D|2|7E|4|2N|6|$7|@$1R|18W|2|6F|4|1H|1U|18X|1V|18Y|1W|1X|0|-4|1Z|18Z|20|190|21|22]]|8|-2|9|@7F|15|7G|7H|4X|4Y|7I|7J|7K|51|4W]|J|-4|K|191|L|@7L]]]|$0|-4|2|7M|4|7N|6|$9|@V|78|7O|7P]|7|-2|J|-4|L|-2|7Q|-4|K|192|8|-2]]|$0|-4|2|7R|4|7S|6|$9|@7T|7U|7V|7W|4X]|K|1KP]]|$0|7X|2|7Y|4|78|6|$7|@$1R|193|2|7Y|4|78|1U|194|1V|195|1W|1X|0|-4|1Z|196|20|197|21|22]]|8|-2|9|@7O|37|7Z|80|36|2M|81|3E|3A|I|3B|39|82]|J|-4|K|198|L|@83]]]|$0|-4|2|84|4|85|6|$9|@5Q|36]|K|1KQ]]|$0|86|2|87|4|88|6|$7|-2|8|-2|9|@5W|37|89|8A|8B|8C|8D|8E]|J|-4|K|199|L|@8F]]]|$0|8G|2|8H|4|37|6|$7|@$1R|19A|2|7Y|4|78|1U|19B|1V|19C|1W|1X|0|-4|1Z|19D|20|19E|21|22]]|8|-2|9|@7O|80|36|8I|8J|38|5P|2M|55|8K|8L|8M|8N|I|3E|8O|8P|78|85|8Q|8R|3G|39|88|30|3I|8S]|J|-4|K|19F|L|@8T|8U|8V|8W]]]|$0|-4|2|8X|4|8Y|6|$9|@36|4J|4B|4K|45|8Z|65|4F|90]|7|-2|J|8Y|K|19G|8|-2]]|$0|91|2|92|4|93|6|$7|-2|8|-2|9|@94|5W|2M|37|5N|95|5R|5Q|96|7B|75|5O|7A]|J|-4|K|19H|L|@97|98|99]]]|$0|9A|2|9B|4|9C|6|$7|-2|8|-2|9|@10|9D|9E|9F|4Q|1A|9G|9H|X]|J|-4|K|19I|L|@9I]]]|$0|-4|2|9J|4|9K|6|$9|@3S|15|16|6B|8L|9L|9M]|K|1KR]]|$0|-4|2|9N|4|9O|6|$9|@9P|9Q|9R|8E|8D]|K|1KS]]|$0|-4|2|9S|4|9T|6|$9|@3U|9U|9V|9D]|7|-2|J|-4|L|-2|K|19J|8|-2]]|$0|-4|2|9W|4|51|6|$9|@3U|2N|4Y|3Y|9X|7G|2T|7H|7K|4W|4X|7J|9Y|9Z|A0|A1|A2|50|7I|A3]|7|-2|J|-4|K|19K|8|-2]]|$0|-4|2|A4|4|8R|6|$9|@3U|48|5Q|37|Q|8J|A5|9L|56|2T|38|26|8I|A6|A7|A8|H|A9|8M|AA|AB|8L|55]|7|-2|J|8R|K|19L|8|-2]]|$0|AC|2|AD|4|4H|6|$K|19M|9|@48|78|AE|8Q|3H|5H|4C|3C|4B|5B|5D|2L|4K|4V|66|AF|3G|69|5J]|7|-2|J|-4|8|-2|L|@AG]]]|$0|AH|2|AI|4|AJ|6|$7|-2|8|-2|9|@AK|Y|1T|AL]|J|-4|K|19N|L|@AM|AN|AO]]]|$0|AP|2|AQ|4|AR|6|$7|-2|8|-2|9|@AS]|J|-4|K|19O|L|@AT]]]|$0|AU|2|AV|4|AW|6|$7|-2|8|-2|9|@3S|2L|19|1H|AX|1G|2W|AY|A3|1K|1J]|J|-4|K|19P|L|@AZ]]]|$0|-4|2|B0|4|B1|6|$9|@95|H|2M]|7|-2|J|-4|L|-2|K|19Q|8|-2]]|$0|-4|2|B2|4|68|6|$9|@9F|9H|4H|4Q|65|5B|5D|B3|4M|64|4S|B4]|K|1KT]]|$0|B5|2|B6|4|64|6|$7|-2|8|-2|9|@48|4H|5G|4Q|9U|3Y|2T|5H|90|65|4V|4F|4B|4G|5J|4K|4M|69|B4|4L|8Z]|J|-4|K|19R|L|@B7|B8]]]|$0|B9|2|BA|4|56|6|$7|-2|8|-2|9|@2M|5Q|37|55|54|8J|8K|5C|2T|38|49|8Q|26|8I|A6|A7|3D|3E|8M|8R|8L]|J|-4|K|19S|L|@BB]]]|$0|BC|2|BD|4|2S|6|$7|-2|8|-2|9|@AF|2U|25|BE|BF|30|8M|2V|15|7F|I]|J|-4|K|19T|L|@BG]]]|$0|-4|2|BH|4|BI|6|$9|@AB|8L|81|A6|A5]|7|-2|J|-4|L|-2|K|19U|8|-2]]|$0|BJ|2|BK|4|Q|6|$9|@P|R|S|H|8R|37|6C|A7|8N|8I|BL|56]|7|-2|J|-4|L|@BM]|K|19V|8|-2]]|$0|BN|2|BO|4|3T|6|$9|@3P|BP|BQ|3O|BR|3M|BS|BT|BU|BV|8R]|7|-2|J|-4|L|@BW]|K|19W|8|-2]]|$0|BX|2|BY|4|BZ|6|$K|19X|9|@4H|1H|4Z|2N|C0|4Y|47|C1|C2|C3|C4|36|4C|C5|48]|7|-2|J|-4|8|-2|L|@C6]]]|$0|-4|2|C7|4|C8|6|$9|@3F|C9]|K|1KU]]|$0|-4|2|CA|4|CB|6|$K|19Y|9|@37|4H|8K|C9|38|3D|8D|3I|8S|4Z|56|2M|CC|8Q|CD|3G|88|CE|CF|3C]]]|$0|-4|2|CG|4|4A|6|$9|@45|3X|4E|7W|A7|4F|2T|4B|4L]|K|1KV]]|$0|-4|2|CH|4|3H|6|$9|@7F|AF|4H|CI|3X|4E|67|CJ|CK]|7|-2|J|-4|K|19Z|8|-2]]|$0|CL|2|CM|4|CN|6|$K|1A0|9|@3S|CO|3T|3X|3W|42|CP|CQ|BR|CR|8E|CD|8D|CS|9Q|CT]|7|-2|J|-4|8|-2]]|$0|-4|2|CU|4|CV|6|$9|@7F|4D|CW|I]|7|-2|J|-4|L|-2|K|1A1|8|-2]]|$0|-4|2|CX|4|CY|6|$9|@CO|5D|8E|CS|89]|7|-2|J|-4|L|-2|K|1A2|8|-2]]|$0|CZ|2|D0|4|1D|6|$7|-2|8|-2|9|@3P|D1|D2|2P]|J|-4|K|1A3|L|@D3]]]|$0|D4|2|D5|4|3P|6|$9|@D6|D7|CI|2P|16|1B|3O|D8|D9|3M|DA|1C]|7|-2|J|-4|K|1A4|8|-2|L|@DB|DC]]]|$0|-4|2|DD|4|DE|6|$9|@3P|CI|16|D8|BR|BU|9Q|1B|BQ]|7|-2|J|-4|K|1A5|8|-2]]|$0|-4|2|DF|4|DG|6|$9|@4W|51|2W|26|DH]|K|1KW]]|$0|DI|2|DJ|4|9V|6|$7|-2|8|-2|9|@3U|DK|9U|4B|4K|DL|DM]|J|-4|K|1A6|L|@DN]]]|$0|DO|2|DP|4|DQ|6|$7|@$1R|1A7|2|6F|4|1H|1U|1A8|1V|1A9|1W|1X|0|-4|1Z|1AA|20|1AB|21|22]]|8|-2|9|@3U|15|2W|DR|41|9Z|DS|C5|AY|2R|50|8C|9Y|40]|J|-4|K|1AC]]|$0|DT|2|DU|4|DV|6|$7|-2|8|-2|9|@3S|G|E|DW|5P|5Q|DX|8M|BV|I|2X|8L|37]|J|-4|K|1AD|L|@DY]]]|$0|-4|2|DZ|4|E0|6|$7|-2|8|-2|9|@E1|3N|E2|E3|BL|4B|A1|3C|64]|J|-4|K|1AE]]|$0|-4|2|E4|4|E5|6|$7|-2|8|-2|9|@3U|19|E6|9M|AA|BZ|26]|J|-4|K|1AF]]|$0|E7|2|E8|4|2T|6|$7|-2|8|-2|9|@3U|3Y|9V|E9|2X|64|A7|65|48|4B|4L|4K]|J|-4|K|1AG|L|@EA]]]|$0|-4|2|EB|4|EC|6|$9|@4Y|3U]|K|1KX]]|$0|ED|2|EE|4|E9|6|$7|-2|8|-2|9|@3U|3Y|2T|EF|A7]|J|-4|K|1AH|L|@EG]]]|$0|-4|2|6L|4|6M|6|$9|@6E|2G]|7|-2|J|-4|L|-2|K|1AI|8|-2]]|$0|EH|2|EI|4|EJ|6|$9|@3S|94|AK|D2|2P|EK|65|5I|2X|4R]|7|-2|J|-4|K|1AJ|8|-2|L|@EL|EM|EN]]]|$0|-4|2|EO|4|EP|6|$9|@D6|C9|8K|EQ|3F|3I|8S|ER|3D|ES|CE|8O|CC]|7|-2|J|-4|K|1AK|8|-2]]|$0|-4|2|ET|4|EU|6|$9|@9T|DK]|7|-2|J|-4|L|-2|K|1AL|8|-2]]|$0|-4|2|EV|4|EW|6|$9|@2G|4V]|7|-2|J|-4|L|-2|K|1AM|8|-2]]|$0|EX|2|EY|4|3K|6|$K|1AN|9|@Y|EZ|Z|2T|E9|F0]|7|-2|J|-4|8|-2|L|@F1]]]|$0|-4|2|F2|4|F3|6|$9|@4Q|3X|9G]|7|-2|J|-4|L|-2|K|1AO|8|-2]]|$0|-4|2|F4|4|38|6|$7|-2|8|-2|9|@Y|5Q|37|C9|CB|8K|56|3C|8S|8Q|3D|CE|3I|3G|6B|8P|36|4H|CC]|J|-4|K|1AP]]|$0|F5|2|6O|4|6P|6|$7|-2|8|-2|9|@94|F6|F7|6E|F8|F9]|J|-4|K|1AQ|L|@FA]]]|$0|FB|2|FC|4|3U|6|$K|1AR|9|@3Y|64|E9|EF|A7|4G|4F|8Y|9V|45]|7|-2|J|-4|8|-2|L|@FD|FE|FF]]]|$0|-4|2|FG|4|FH|6|$7|-2|8|-2|9|@D2|EJ|7U|7V|7W|FI|FJ|9Y]|J|-4|K|1AS]]|$0|FK|2|FL|4|39|6|$9|@48|G|ER|FM|BF|3G|FN|A8|DV|55]|7|-2|J|-4|L|@FO]|K|1AT|8|-2]]|$0|-4|2|FP|4|FQ|6|@1KY]]|$0|FR|2|FS|4|V|6|$7|-2|8|-2|9|@23|AF|FT|1T|U|FU|1Q|28|BP|FV|FW]|J|-4|K|1AU|L|@FX|FY|FZ]]]|$0|G0|2|G1|4|5O|6|$K|1AV|9|@5V|D6|5Q|5N|5B|75|5X|5R]|7|-2|J|-4|8|-2|L|@G2|G3|G4]]]|$0|-4|2|G5|4|AE|6|$K|1AW|9|@C9|5H|8S|3F|3I|3G|3C|4H|38|8Q|3D|CF]]]|$0|-4|2|G6|4|G7|6|$9|@47|F0]|7|-2|J|-4|L|-2|7Q|-4|K|1AX|8|-2]]|$0|-4|2|G8|4|G9|6|$9|@81|DA|GA|D8|16]|7|-2|J|-4|L|-2|K|1AY|8|-2]]|$0|-4|2|GB|4|GC|6|$9|@3S|EQ]|7|-2|J|G9|K|1AZ|8|-2]]|$0|-4|2|GD|4|7K|6|$K|1B0|9|@2N|7G|4A|51|4X|7J|4Y|2L|A0|4W]|J|7K]]|$0|-4|2|GE|4|9Q|6|$9|@3P|2P|DE|BR]|7|-2|J|-4|K|1B1|8|-2]]|$0|-4|2|GF|4|7T|6|$K|1B2|9|@7U|7S|7V|7W|3U|4A]]]|$0|-4|2|GG|4|GH|6|$9|@7O|GI|80|11|GJ|82]|7|-2|J|-4|K|1B3|8|-2]]|$0|-4|2|76|4|76|6|$9|@2M|72|5R|75|5W|5Q|I|5P]|7|-2|J|-4|K|1B4|8|-2]]|$0|GK|2|GL|4|7F|6|$K|1B5|9|@AF|4H|4Z|CK|16|2S|7H|4D|2X|67|CJ|I|3H|30|GM]|7|-2|J|-4|L|@GN]|8|-2]]|$0|-4|2|GO|4|B4|6|$9|@DK|3Y|4G|12|GP|4B|4R|4K]|7|-2|J|-4|K|1B6|8|-2]]|$0|-4|2|GQ|4|EF|6|$K|1B7|9|@GR|B4|3G|38|3Y|A7|4F]|7|-2|J|-4|8|-2]]|$0|GS|2|1S|4|1T|6|$K|1B8|9|@23|94|AK|FT|U|V|BP|1Q|FW|28|GT|4S|11|1A|4R]|7|-2|J|-4|8|-2|L|@GU]]]|$0|-4|2|GV|4|GW|6|$9|@GX|3G|3C]|7|-2|J|-4|L|-2|K|1B9|8|-2]]|$0|-4|2|GY|4|GZ|6|$9|@3Y|2X|E9|A7]|K|1KZ]]|$0|-4|2|H0|4|5C|6|$9|@3U|D6|4F|GP]|K|1L0]]|$0|-4|2|H1|4|6Y|6|$9|@R|H2|6W|3I|H3|H4|30|6X|6Z]|7|-2|J|-4|L|-2|K|1BA|8|-2]]|$0|-4|2|H5|4|H2|6|$9|@ER|6W|H4|DV]|K|1L1]]|$0|-4|2|H6|4|77|6|$9|@H7|EF|8C|C1|DS|9Y]|7|-2|J|-4|K|1BB|8|-2]]|$0|H8|2|H9|4|H7|6|$K|1BC|9|@5V|5N|5R|C2|F0|HA]]]|$0|-4|2|HB|4|HA|6|$9|@E9|HC|HD|HE|HF|DS|HG|HH]|7|-2|J|-4|K|1BD|8|-2]]|$0|-4|2|HI|4|HJ|6|$9|@C9|3F|EQ|5N|5O|5V]|7|-2|J|HK|K|1BE|8|-2]]|$0|-4|2|HL|4|HM|6|$9|@E1|GI|E2|E3|4V|94]|7|-2|J|HN|K|1BF|8|-2]]|$0|-4|2|HO|4|2U|6|$K|1BG|9|@9H|2S|BE|HP|2Y|HQ]]]|$0|-4|2|HR|4|HE|6|$9|@8C|HS|HF|DS|HA|HC|HT|2W]|7|-2|J|-4|K|1BH|8|-2]]|$0|-4|2|HU|4|HG|6|$9|@E9|HE|HF|DS|HA|DX|HC]|7|-2|J|-4|K|1BI|8|-2]]|$0|HV|2|HW|4|GR|6|$K|1BJ|9|@9X|EF|E3|B4|77|H7]|7|-2|J|-4|L|@HX]|8|-2]]|$0|HY|2|HZ|4|8B|6|$K|1BK|9|@5W|37|88|3B|7A|72|I0|I1]]]|$0|-4|2|I2|4|A|6|$K|1BL|9|@G|E|16|5|D|F|C|5D|I3]]]|$0|-4|2|I4|4|7O|6|$K|1BM|9|@78|37|2Q|9C|3B|5K|DW|30|2V|82|GJ|I5|I6|15|5E]|7|-2|J|-4|8|-2|L|@I7|I8]]]|$0|-4|2|I9|4|4E|6|$K|1BN|9|@47|7V|4A|45|48]]]|$0|-4|2|IA|4|D1|6|$9|@3P|1D|BT|2P]|K|1L2]]|$0|-4|2|IB|4|IC|6|$9|@ID|8E|89]|K|1L3]]|$0|IE|2|IF|4|U|6|$K|1BO|9|@IG|FT|1T|9H|93|GT|7B|T|S|V|IH|F9]|7|-2|J|-4|8|-2|L|@II|IJ|IK|IL]]]|$0|IM|2|IN|4|9E|6|$9|@2M|9C|5F|2X|IO|F|E|IP|8N|69]|7|-2|J|-4|K|1BP|8|-2|L|@IQ|IR|IS]]]|$0|IT|2|6H|4|2G|6|$K|1BQ|9|@2X|F7|G|6B|D|DX|2H|I]|7|-2|J|-4|L|@IU]|8|-2]]|$0|-4|2|IV|4|IW|6|$9|@IX|7Z|IY|5Y|5X]|K|1L4]]|$0|IZ|2|J0|4|81|6|$K|1BR|9|@CI|A6|FM|D8|J1|GA|J2|63|66]|7|-2|J|-4|8|-2|L|@J3]]]|$0|-4|2|J4|4|3N|6|$9|@E0|BL|J5|IP|E6|CK]|K|1L5]]|$0|-4|2|J6|4|E2|6|$9|@3S|E1|GI|E3|E0]|7|-2|J|-4|L|@J7]|K|1BS|8|-2]]|$0|-4|2|J8|4|J9|6|$K|1BT|9|@E1|GI|E2|JA|6B|E3|4V]|7|-2|J|-4|L|@JB]|8|-2]]|$0|-4|2|JC|4|3A|6|$9|@5W|4Z|I|72|7F|36|C1|4D|5P]|K|1L6]]|$0|JD|2|JE|4|5Y|6|$9|@IX|5Q|5R|5U|5X|54|FT|5V]|7|-2|J|-4|K|1BU|8|-2|L|@JF]]]|$0|-4|2|JG|4|CS|6|$9|@CO|89|5H|8E|ID|CP|JH|CQ|8D|2H|IC|CR|JI|CN|JJ|JK]|7|-2|J|-4|K|1BV|8|-2]]|$0|-4|2|JL|4|5H|6|$9|@CS|5J|2P|4H|CO|IO|I|3C|5I|GP|2H|2X|48|5D]|K|1L7]]|$0|-4|2|JM|4|8P|6|$9|@C9|3F|3D|CC|CD|CF|3G|8D|38|CE|3C]|7|-2|J|-4|K|1BW|8|-2]]|$0|-4|2|JN|4|JO|6|$9|-2|7|-2|J|-4|L|-2|K|1BX|8|-2]]|$0|-4|2|JP|4|3B|6|$K|1BY|9|@7O|78|37|3B|36|3E|GJ|3G|3C|H3|3A]]]|$0|-4|2|JQ|4|CT|6|$9|@5V|CN|5O|5N]|7|-2|J|-4|L|-2|K|1BZ|8|-2]]|$0|-4|2|JR|4|AB|6|$9|@7F|81|A5|9L|26|A6|AA|8L|5Q|8J|8Q|56|8R|GA|FM|A9|A8]|7|-2|J|-4|K|1C0|8|-2]]|$0|-4|2|JS|4|JT|6|$9|@JU|IP|69|9E|JV|15]|K|1L8]]|$0|-4|2|JW|4|JX|6|$K|1C1|9|@3T|JY|DR|2O]]]|$0|JZ|2|K0|4|IG|6|$K|1C2|9|@Y|FT|1T|GT|95|AF|U|1A]|7|-2|J|-4|8|-2|L|@K1]]]|$0|K2|2|K3|4|I0|6|$K|1C3|9|@7O|37|8B|7A|K4|K5|3A|5V|5Q]|7|-2|J|-4|8|-2|L|@K6]]]|$0|-4|2|K7|4|K8|6|$9|@6E]|7|-2|J|-4|L|-2|K|1C4|8|-2]]|$0|K9|2|KA|4|9M|6|$9|@3T|5C|E5|E6|25|5B]|K|1L9]]|$0|-4|2|KB|4|BF|6|$9|@39|C]|K|1LA]]|$0|KC|2|KD|4|48|6|$9|@7F|7O|37|9E|5K|BL|A8|4L|4C|66|4I|45|E1|I|A6|63|4F|4B|64|2T]|7|-2|J|-4|K|1C5|8|-2|L|@KE|KF]]]|$0|-4|2|KG|4|6W|6|$9|@3S|5O|H2|ER|3F|H4|3G|6Y]|K|1LB]]|$0|KH|2|KI|4|BU|6|$K|1C6|9|@3S|3T|BP|2P|3O|DE|9Q|BQ|KJ|KK|BT]|7|-2|J|-4|8|-2|L|@KL|KM|KN]]]|$0|-4|2|KO|4|BR|6|$K|1C7|9|@3T|BU|DE|9Q]]]|$0|KP|2|KQ|4|KR|6|$9|@D6|CI|8K|16|8Q|3D|38|6B]|7|-2|J|-4|K|1C8|8|-2|L|@KS]]]|$0|KT|2|KU|4|I6|6|$K|1C9|9|@D6|95|5C|B|AF|IG|2P|7O|2V|KV]|7|-2|J|-4|8|-2|L|@KW|KX]]]|$0|-4|2|KY|4|49|6|$9|@KZ|8A|L0|8C|63|26]|7|-2|J|-4|K|1CA|8|-2]]|$0|-4|2|L1|4|H|6|$9|@8N|2M|Q|E|6Z|I|R|15|30|2V|BL|8R|2X|37|49]|K|1LC]]|$0|L2|2|L3|4|2M|6|$9|@8N|9E|55|8J|E|5H|5F|I|IG|37|H|15|2V|A7|7F|56|A6|FM]|7|-2|J|-4|K|1CB|8|-2|L|@L4|L5|L6]]]|$0|L7|2|L8|4|K4|6|$K|1CC|9|@KZ|49|K5|L9|L0|I0|8A|AX]|7|-2|J|-4|8|-2]]|$0|-4|2|LA|4|8M|6|$9|@8K|2Q|8J|8N|37|DV|2M|BV|6B|BL|2X|DX|15|2V|56|38|3G]|7|-2|J|-4|K|1CD|8|-2]]|$0|-4|2|LB|4|T|6|$9|@P|U|V|S|R|6Z]|K|1LD]]|$0|-4|2|LC|4|LD|6|$9|@48|5G|IP|C0|J5|E|3N|BL|F|A8|LE|LF|LG]|K|1LE]]|$0|LH|2|LI|4|3C|6|$K|1CE|9|@4H|5O|LJ|8Q|EQ|3G|AE|38|45|5H|49|8J|48|36]|7|-2|J|-4|8|-2|L|@LK]]]|$0|LL|2|LM|4|LJ|6|$K|1CF|9|@C9|FU|LN]]]|$0|-4|2|LO|4|LP|6|$9|@55|9L|LQ|A9|A5|37|AA|R|A8|56|BL|63]|K|1LF]]|$0|LR|2|LS|4|LQ|6|$9|@IH|LT|65|2Y|63|B4|49]|K|1LG]]|$0|-4|2|LU|4|6C|6|$9|@DM|9V|LQ|LP|66|63]|7|-2|J|-4|K|1CG|8|-2]]|$0|-4|2|LV|4|69|6|$9|@5G|5H|8Q|48|4H|C0|I|LD|64|9E|30|5K|4V|4I]|K|1LH]]|$0|LW|2|LX|4|1B|6|$K|1CH|9|@AF|2P|16|HP|I6|2Y|2X|65|2V|15]|7|-2|J|-4|8|-2|L|@LY|LZ]]]|$0|-4|2|M0|4|IO|6|$9|@2P|5I|5H|2V|AE|15]|K|1LI]]|$0|-4|2|M1|4|1C|6|$9|@2Y|1B|9G|1A|4R|9E|9H|2P]|K|1LJ]]|$0|-4|2|M2|4|I5|6|$9|@GJ|2V|7O|BE|15|KV|AF|GH]|K|1LK]]|$0|-4|2|M3|4|M4|6|$9|@5B|15|AR|M5]|7|-2|J|-4|L|-2|K|1CI|8|-2]]|$0|-4|2|M6|4|M7|6|$9|@M8|M9]|K|1LL]]|$0|-4|2|MA|4|MB|6|$9|@1H|5O|MC|H3]|K|1LM]]|$0|MD|2|ME|4|5E|6|$K|1CJ|9|@3S|3P|2P|15|5B|5I|GP|95|9H|2V]|7|-2|J|-4|8|-2|L|@MF|MG|MH]]]|$0|-4|2|MI|4|EQ|6|$9|@C9|EP|HJ|95|EK|8P|MJ|CC|CE]|K|1LN]]|$0|-4|2|MK|4|1J|6|$9|@19|2O|1G|ML|1L|1K|1J|1I]|7|-2|J|-4|L|-2|K|1CK|8|-2]]|$0|-4|2|MM|4|82|6|$9|@80|7O|T|95|1L|KV|11|I5]|K|1LO]]|$0|-4|2|MN|4|MO|6|$9|@GJ|AA|MP|2M|37|H|15|8M|7O]|K|1LP]]|$0|MQ|2|MR|4|JU|6|$K|1CL|9|@JT|15|9E|JV|2Z|30]]]|$0|-4|2|MS|4|17|6|$9|@F8|15|16|18|14]|7|-2|J|-4|L|-2|K|1CM|8|-2]]|$0|-4|2|MT|4|8Z|6|$9|@48|5G|5D|69|5H|LE|I|64|MU|7H]|7|-2|J|-4|K|1CN|8|-2]]|$0|MV|2|MW|4|94|6|$K|1CO|9|@GI|BP|4V|1T|6P|FW|7B|U|96]|7|-2|J|-4|8|-2|L|@MX|MY|MZ]|7Q|-4]]|$0|-4|2|N0|4|N1|6|$9|-2|7|-2|J|-4|L|-2|7Q|-4|K|1CP|8|-2]]|$0|-4|2|N2|4|N3|6|$9|@D6|N4|ER]|7|-2|J|-4|L|-2|7Q|-4|K|1CQ|8|-2]]|$0|-4|2|N5|4|3F|6|$9|@C9|EQ|AE|8P|3D|CE|3G|CF|CC]|K|1LQ]]|$0|-4|2|N6|4|5D|6|$9|@5B|5E|4H|5H|4Q|5G]|K|1LR]]|$0|-4|2|N7|4|N8|6|$9|@R|5G|15|5D|LF|30|6X|8Z|48|I|MU|39|C0]|7|-2|J|-4|K|1CR|8|-2]]|$0|-4|2|N9|4|NA|6|$9|@16|26|AA|5B]|K|1LS]]|$0|-4|2|NB|4|3I|6|$9|@8S|3G|38|8K|56|3D|CB|AE]|K|1LT]]|$0|NC|2|ND|4|8S|6|$9|@ES|NE|3I|3G|38|56|8Q|8I|8K|3D|DX|CB]|7|-2|J|-4|K|1CS|8|-2]]|$0|-4|2|NF|4|NG|6|$9|@E9|1B]|7|-2|J|-4|L|-2|K|1CT|8|-2]]|$0|-4|2|NH|4|N4|6|$9|@D6|FT|4V|5I|5O|5K]|K|1LU]]|$0|-4|2|NI|4|27|6|$K|1CU|9|@23|S|NJ|56|1Q|25|DX|MU|NK]]]|$0|-4|2|NL|4|NM|6|$9|@DX|6B|27]|K|1LV]]|$0|NN|2|NO|4|D2|6|$9|@3S|2P|EJ|16|65|7F|DH|5R]|7|-2|J|-4|K|1CV|8|-2|L|@NP]]]|$0|-4|2|NQ|4|HQ|6|$9|@2S|HP|2P|2Y|2U|DR|BT|9H]|K|1LW]]|$0|-4|2|NR|4|FN|6|$9|@39|NS|DV|FM|GA|S|37]|K|1LX]]|$0|-4|2|NT|4|1I|6|$9|@19|2O|1G|ML|1L|1K|1J|1I]|7|-2|J|-4|L|-2|K|1CW|8|-2]]|$0|-4|2|NU|4|NV|6|$9|@NW|3O|NX]|7|-2|J|-4|L|-2|K|1CX|8|-2]]|$0|-4|2|NY|4|ID|6|$9|@CO|JH|89|JI|D9]|K|1LY]]|$0|-4|2|NZ|4|O0|6|$9|@I6]|7|-2|J|-4|K|1CY|8|-2]]|$0|-4|2|O1|4|O2|6|$9|@6B|DX|4I|66]|7|-2|J|-4|L|-2|K|1CZ|8|-2]]|$0|-4|2|O3|4|4Z|6|$9|@BZ|4H|47|C2|3A|4D|C1|7F|I|CB|3I]|J|4Z|K|1LZ]]|$0|-4|2|O4|4|O5|6|$9|@O6|O7|O8|O9]|7|-2|J|-4|L|-2|K|1D0|8|-2]]|$0|OA|2|OB|4|I1|6|$K|1D1|9|@5V|5N|5O|5R|5X|GA|9L|63|A6]|7|@$1R|1D2|2|7Y|4|78|1U|1D3|1V|1D4|1W|1X|0|-4|1Z|1D5|20|1D6|21|22]|$1R|1D7|2|OC|4|GA|1U|1D8|1V|1D9|1W|1X|0|-4|1Z|1DA|20|1DB|21|22]]|J|-4|8|-2|L|@OD|OE]]]|$0|OF|2|OG|4|89|6|$K|1DC|9|@CO|LJ|5Z|8E|8D|CS|24|OH|CQ|88|CP|JH|9P]]]|$0|-4|2|OI|4|MC|6|$9|@1H|16|2W|DR|HS|C5|BZ|4C|AY|2L|MB|HT|C2|2R]|7|-2|J|-4|K|1DD|8|-2]]|$0|OJ|2|OK|4|EZ|6|$K|1DE|9|@Y|3K|10|Z|X]]]|$0|-4|2|OL|4|M8|6|$9|@C9|AE|M9|3F|38]|7|-2|J|-4|K|1DF|8|-2]]|$0|OM|2|ON|4|47|6|$K|1DG|9|@19|GP|OO|CO|4E|CQ]|7|-2|J|-4|L|@OP]|8|-2]]|$0|OQ|2|OR|4|AK|6|$K|1DH|9|@GI|GR|BP|4R|2P|9X|A7|1A|96]|7|-2|J|-4|L|@OS]|8|-2]]|$0|-4|2|OT|4|7V|6|$9|@FH|7T|7U|7W|7S|GR]|K|1M0]]|$0|-4|2|OU|4|OV|6|$9|@CO]|7|-2|J|-4|L|-2|K|1DI|8|-2]]|$0|OW|2|OX|4|3S|6|$K|1DJ|9|@4Q|5E|65|IO|I3|A|5D|D|E|2G|2X|5H]|7|-2|J|-4|L|@OY]|8|-2]]|$0|-4|2|OZ|4|8J|6|$9|@8N|A6|5Q|37|A8|38|63|56|2M|8M|5P|AA|3G|8K]|K|1M1]]|$0|P0|2|P1|4|G|6|$K|1DK|9|@3S|BP|16|2X|BV|E|2G|D|I3|IO|8N|A|P2]|7|-2|J|-4|8|-2|L|@P3|P4|P5]|7Q|-4]]|$0|-4|2|P6|4|MP|6|$9|@CO|89|8E|MO|8J]|K|1M2]]|$0|-4|2|P7|4|H3|6|$9|@GJ|I5|GX|MU|6X|57]|K|1M3]]|$0|-4|2|P8|4|P9|6|$9|@N8|3S|F8|IO]|K|1M4]]|$0|PA|2|PB|4|C1|6|$K|1DL|9|@BZ|4Z|L0|46|3A|9Z|1H|AY|HS|MB|4K|4H]|7|-2|J|-4|L|@PC]|8|-2]]|$0|-4|2|PD|4|PE|6|$K|1DM|9|@PF|NJ|27|NM|1Q|U]]]|$0|PG|2|PH|4|6Z|6|$9|@R|5F|2Y|Q|P|S|6X]|7|-2|J|-4|K|1DN|8|-2|L|@PI]]]|$0|PJ|2|PK|4|B3|6|$9|@CR|96|1A|1C|68|4S|AK]|7|-2|J|-4|L|@PL]|K|1DO|8|-2]]|$0|-4|2|PM|4|6A|6|$9|@2H|9V|2X|4F|4G|4B|DL|4K|49|63|66|A7]|7|-2|J|-4|K|1DP|8|-2]]|$0|-4|2|PN|4|A2|6|$9|@15|9Y|A3|2L|50|CD|A0]|7|-2|J|-4|K|1DQ|8|-2]]|$0|PO|2|PP|4|8Q|6|$9|@4H|KR|EQ|3F|3I|38|56|3D|8S|6B|67|8K|3G]|7|-2|J|-4|K|1DR|8|-2|L|@PQ]]]|$0|-4|2|PR|4|CJ|6|$9|@7F|67|8Q|CK|AB|GM|3A|5P|4D|38|7H|3H]|K|1M5]]|$0|-4|2|PS|4|PT|6|$9|@PU|IG]|7|-2|J|-4|L|-2|7Q|-4|K|1DS|8|-2]]|$0|-4|2|PV|4|PW|6|$9|@G|H]|7|-2|J|-4|L|-2|K|1DT|8|-2]]|$0|-4|2|PX|4|LE|6|$K|1DU|9|@J5|BL|LD|LP|9L]]]|$0|-4|2|PY|4|8D|6|$9|@CO|89|8E|CS|88|CP|8P|3D|C9]|7|-2|J|-4|K|1DV|8|-2]]|$0|-4|2|PZ|4|9R|6|$9|@24|IC|OH|CQ|26|49|56]|K|1M6]]|$0|-4|2|Q0|4|9F|6|$9|@9H|68|B3|2U|9C|5B|B4]|K|1M7]]|$0|-4|2|Q1|4|Q2|6|$9|@M7]|7|-2|J|-4|L|-2|K|1DW|8|-2]]|$0|-4|2|Q3|4|L0|6|$9|@K4|3H|KZ|K5|8A|C1]|K|1M8]]|$0|-4|2|Q4|4|Q5|6|$9|@8J|BL|3N|Q6|9L|A8|5Q]|K|1M9]]|$0|-4|2|Q7|4|8L|6|$9|@3U|5Q|5C|38|8S|26|A6|3I|3G|8J|A8|8I|AA|56|4F|37|AB|8R]|7|-2|J|-4|K|1DX|8|-2]]|$0|-4|2|Q8|4|A9|6|$9|@55|A5|9L|93|26|LP|56|8R|AB]|K|1MA]]|$0|-4|2|Q9|4|H4|6|$K|1DY|9|@J5|QA|6W|LF|H2|QB|D2]]]|$0|-4|2|QC|4|5W|6|$K|1DZ|9|@7A|3A|72|I|K5|75]]]|$0|-4|2|QD|4|BQ|6|$9|@3U|DM|3T|DL|BU]|K|1MB]]|$0|-4|2|QE|4|QF|6|$9|@D2|EJ|94]|K|1MC]]|$0|-4|2|QG|4|4Q|6|$K|1E0|9|@9H|9F|9G|5D|68|1C|1A|65|9E|4R|5B]]]|$0|-4|2|QH|4|QI|6|$9|@3S|3U|3T|3P|GI]|7|-2|J|-4|L|-2|K|1E1|8|-2]]|$0|-4|2|QJ|4|O8|6|$9|@O6|O5|O7|O9]|7|-2|J|-4|L|-2|K|1E2|8|-2]]|$0|QK|2|QL|4|90|6|$9|@4B|DK|4K|65|4F|AF|64|4H|96]|K|1MD]]|$0|-4|2|QM|4|LG|6|$9|@QA|QN|5G|C0|IP|LF|J5|H4]|7|-2|J|-4|L|-2|K|1E3|8|-2]]|$0|-4|2|QO|4|QP|6|$9|@19|ML|1L|C4|QQ|IH|4G|C0|B4|KV]|7|-2|J|-4|K|1E4|8|-2]]|$0|QR|2|QS|4|19|6|$K|1E5|9|@8A|FU|C2|ML|96|QP|1L|1G|1B|4Q|90|47|1K|1J|1I]|7|-2|J|-4|8|-2|L|@QT|QU]]]|$0|-4|2|QV|4|CR|6|$9|@B3|CO|CS|ID|CP|JH|8E|JJ|9X]|K|1ME]]|$0|-4|2|QW|4|12|6|$9|@B3|1A|B4|AK|9F|FU]|K|1MF]]|$0|-4|2|QX|4|7B|6|$9|@5V|5N|5R|QY|U|60|GT|93|I1|8C|1T|9H]|K|1MG]]|$0|QZ|2|R0|4|5Z|6|$K|1E6|9|@C9|93|LJ|3D|3F|GA|5U]|7|-2|J|-4|8|-2|L|@R1]]]|$0|R2|2|R3|4|IX|6|$K|1E7|9|@95|R4|5O|5Y]|7|-2|J|-4|8|-2]]|$0|-4|2|R5|4|8O|6|$9|@C9|EQ|3F|S|37|38|CE]|K|1MH]]|$0|R6|2|R7|4|2R|6|$K|1E8|9|@2L|19|1H|9Z|3Y|15|AW|2W|HS|R8|1J]|7|-2|J|-4|8|-2]]|$0|-4|2|R9|4|RA|6|$9|@8K|5Q|38|3G|56|36]|K|1MI]]|$0|-4|2|RB|4|IY|6|$K|1E9|9|@GA|IW|DW]]]|$0|RC|2|RD|4|26|6|$K|1EA|9|@3U|9L|2Q|56|25|E5|8I|C2|8R|AA|37|LP|MU|4F|I1|2T|A8]|7|-2|J|-4|8|-2|L|@RE]]]|$0|-4|2|RF|4|8I|6|$K|1EB|9|@5Q|37|26|LP|LQ|A9|8R|56|3E|8K]]]|$0|RG|2|RH|4|79|6|$K|1EC|9|@5F|JY|EK|7B|U|2L|5R|60]|7|-2|J|-4|L|@RI]|8|-2|7Q|-4]]|$0|-4|2|RJ|4|FJ|6|$9|@D2|EJ|9Y|DH|A3|A2|A0|3Y]|K|1MJ]]|$0|-4|2|RK|4|RL|6|$9|@19|1L|82|KZ|11|IH|C4|QQ|RM]|K|1MK]]|$0|-4|2|RN|4|ER|6|$K|1ED|9|@EP|DG|8Q|FN]]]|$0|-4|2|RO|4|7A|6|$9|@5W|CO|CS|93|5P]|K|1ML]]|$0|-4|2|RP|4|HH|6|$9|@HC|GA|2P|BT|5V|HD|HA|HG|HE|DR|DS|HF]|7|-2|J|-4|L|-2|K|1EE|8|-2]]|$0|-4|2|RQ|4|RR|6|$K|1EF|9|@JH|D9|9X]]]|$0|-4|2|RS|4|RT|6|$9|@I5|GJ|JU]|K|1MM]]|$0|RU|2|RV|4|RW|6|$K|1EG|9|@GR|EF|9X|66|4K|KV]]]|$0|-4|2|RX|4|RY|6|$9|@IY|81|8R|8M|5C|5Y]|7|-2|J|-4|L|-2|K|1EH|8|-2]]|$0|-4|2|RZ|4|7P|6|$9|@S0|D6|5O]|7|-2|J|-4|L|-2|K|1EI|8|-2]]|$0|-4|2|S1|4|30|6|$9|@7O|37|15|2V|I|2X|IO|5H|8N|H|1B|BE|7F|2M|82|48|5G|2S|I6]|7|-2|J|-4|K|1EJ|8|-2]]|$0|-4|2|S2|4|S3|6|$9|@S4]|7|-2|J|-4|L|-2|K|1EK|8|-2]]|$0|-4|2|S5|4|S4|6|$9|@S3]|7|-2|J|-4|L|-2|K|1EL|8|-2]]|$0|-4|2|S6|4|S7|6|@1MN]]|$0|S8|2|S9|4|23|6|$K|1EM|9|@Y|1T|9H|FU|2U|90|1Q|9F|29]|7|-2|J|-4|8|-2|L|@SA|SB|SC]]]|$0|SD|2|SE|4|Y|6|$K|1EN|9|@23|AK|IG|1T|9H|11|X|90|RL|GT|AF|93|1A|4R]|7|-2|J|-4|8|-2|L|@SF|SG|SH]]]|$0|SI|2|SJ|4|55|6|$K|1EO|9|@2M|FT|54|9L|LP|8I|37|A9|FN|39|56|GA|A5|A8|26]]]|$0|-4|2|SK|4|SL|6|$9|@AX|3E|GX|H3]|K|1MO]]|$0|-4|2|SM|4|SN|6|$9|@D6|1G|DA|D7]|K|1MP]]|$0|-4|2|SO|4|GJ|6|$K|1EP|9|@2V|I5|30|95|7O|5E|GH|57|BE]]]|$0|SP|2|SQ|4|5K|6|$K|1EQ|9|@7O|FU|LJ|65|GP|5O|69|5B|30|I|4V|2V]|7|-2|J|-4|8|-2|L|@SR|SS|ST]]]|$0|-4|2|SU|4|LT|6|@1MQ]]|$0|-4|2|SV|4|80|6|$9|@11|82|GJ|T|IO|30|7O|GH]|K|1MR]]|$0|SW|2|SX|4|5F|6|$K|1ER|9|@5E|9E|5B|IO|E|F|G|GP|5I|5H]]]|$0|-4|2|SY|4|F9|6|$9|@BP|U|GT|LQ|1T]|K|1MS]]|$0|-4|2|SZ|4|PU|6|$9|@FT|U|GT|1T]|K|1MT]]|$0|T0|2|T1|4|E3|6|$K|1ES|9|@E2|4V|DL|66|T2|GR|E0|49|82]|7|-2|J|-4|8|-2|L|@T3]]]|$0|-4|2|T4|4|2V|6|$9|@GJ|I5|30|7O|15|IO|H|2M]|K|1MU]]|$0|-4|2|T5|4|T6|6|$9|@4R|AK|GR|E3]|7|-2|J|-4|K|1ET|8|-2]]|$0|T7|2|T8|4|A6|6|$9|@J1|81|FM|3G|2P]|7|-2|J|-4|K|1EU|8|-2]]|$0|T9|2|TA|4|65|6|$K|1EV|9|@3S|4Q|FU|2T|EJ|64|5H|1B|B4|48|68|90]|7|-2|J|-4|L|@TB|TC]|8|-2]]|$0|-4|2|TD|4|JI|6|$9|@CO|ID|JH|47|6B|4C|D9|CS|IC|5H|4E]|K|1MV]]|$0|-4|2|TE|4|C5|6|$9|@BZ|4Y|4J|4C|MC|69]|7|-2|J|-4|K|1EW|8|-2]]|$0|-4|2|TF|4|29|6|$9|@23|1Q|QP|V|1T|27|Y|BP|4S|DK|IH|KZ|MU]|K|1MW]]|$0|-4|2|TG|4|F6|6|$9|@F7|6P|3S|5R]|K|1MX]]|$0|-4|2|TH|4|4S|6|$K|1EX|9|@23|4P|B3|9F|2U|6A|28|68|65|1T|94|B4|AK]]]|$0|-4|2|TI|4|JA|6|$K|1EY|9|@6B]]]|$0|-4|2|TJ|4|5P|6|$9|@D|DV|5Q|I|37|8J|8L|2G]|7|-2|J|-4|L|@TK]|K|1EZ|8|-2]]|$0|-4|2|TL|4|9P|6|$K|1F0|9|@ID|8E|89]]]|$0|-4|2|TM|4|A7|6|$9|@3U|DM|9V|2T|4A|E9|48|49|26|37|8R|56]|K|1MY]]|$0|-4|2|TN|4|S0|6|$9|@79|2L|A0]|K|1MZ]]|$0|-4|2|TO|4|KK|6|$K|1F1|9|@3T|IO|BQ|3P|2P]]]|$0|-4|2|TP|4|I3|6|$9|@G]|K|1N0]]|$0|-4|2|TQ|4|TR|6|$9|@3U|3Y]|K|1N1]]|$0|-4|2|TS|4|3Z|6|$9|@A7|2T]|K|1N2]]|$0|-4|2|TT|4|60|6|$9|@7B|94|79|U]|K|1N3]]|$0|-4|2|TU|4|M5|6|$9|@M4|5B]|7|-2|J|-4|L|-2|K|1F2|8|-2]]|$0|-4|2|TV|4|TW|6|$9|@5C|93|9K|2S|5V]|K|1N4]]|$0|-4|2|TX|4|PF|6|$K|1F3|9|@NJ|1Q|NM|23|4R]]]|$0|-4|2|TY|4|TZ|6|$9|@KV|65|DK|QQ|B4|2U]|K|1N5]]|$0|U0|2|U1|4|CI|6|$K|1F4|9|@AF|2P|16|DA|3H|3P|EJ|D1]|7|-2|J|-4|8|-2|L|@U2]]]|$0|-4|2|U3|4|S|6|$9|@Q|P|R|8O|39|27|U|3M|55|37|8R|56]|K|1N6]]|$0|U4|2|U5|4|2P|6|$K|1F5|9|@3P|AF|DA|FM|HP|5H|IO|1B|7F|2X]|7|-2|J|-4|8|-2|L|@U6|U7]]]|$0|U8|2|U9|4|FT|6|$K|1F6|9|@1T|U|Y|9H|FW|V]|7|-2|J|-4|8|-2|L|@UA|UB|UC|UD]|7Q|-4]]|$0|UE|2|UF|4|DA|6|$9|@CI|2P|C|BT|3P|1B|D1|EJ]|7|-2|J|-4|K|1F7|8|-2|L|@UG]]]|$0|UH|2|UI|4|4V|6|$K|1F8|9|@94|E1|FU|E3|4H|2Y|69|GI|E2]|7|-2|J|-4|8|-2|L|@UJ|UK|UL]]]|$0|-4|2|UM|4|UN|6|$9|@EW|E1|4B]|7|-2|J|-4|L|-2|K|1F9|8|-2]]|$0|-4|2|UO|4|UP|6|$9|@3U|9V|A7]|7|-2|J|UP|K|1FA|8|-2]]|$0|-4|2|UQ|4|HT|6|$9|@2W|DR|HS|HE|HG|HF|MC]|K|1N7]]|$0|-4|2|UR|4|42|6|$K|1FB|9|@E9|8E|CQ|CO]|7|@$1R|1FC|2|US|4|UT|1U|1FD|1V|1FE|1W|1X|0|UU|1Z|1FF|20|1FG|21|22]]|J|-4|8|-2]]|$0|-4|2|UV|4|4C|6|$9|@AF|BZ|C5|4H|48|4B|49|45|CF|A6|3C]|7|-2|J|-4|K|1FH|8|-2]]|$0|UW|2|UX|4|3D|6|$9|@4H|CC|8Q|CW|EQ|3F|38|56|3C|3I|8S]|7|-2|J|-4|K|1FI|8|-2|L|@UY]]]|$0|UZ|2|V0|4|CC|6|$K|1FJ|9|@C9|LJ|3D|8D|8P|CB|3F|3C|AE]|7|-2|J|-4|L|@V1]|8|-2]]|$0|V2|2|V3|4|5G|6|$K|1FK|9|@C0|5B|5H|B|I|69|8Z|LD|4H|48|64|5D|30]|7|-2|J|-4|8|-2|L|@V4|V5|V6]]]|$0|-4|2|V7|4|4F|6|$9|@3U|3Y|9V|A7|63|8L|49|48|6A|4A|2T|45]|7|-2|J|-4|K|1FL|8|-2]]|$0|-4|2|V8|4|5I|6|$9|@5R|IO|5H|5G|5F]|K|1N8]]|$0|V9|2|VA|4|7H|6|$K|1FM|9|@7F|2N|7G|6B|67|2G|5P|69|4M|51|CJ|8Z|4H]|7|-2|J|-4|8|-2|L|@VB]]]|$0|-4|2|VC|4|VD|6|@1N9]]|$0|-4|2|VE|4|VF|6|@1NA]]|$0|VG|2|VH|4|9D|6|$K|1FN|9|@DK|9U|3Y|9C|9V|5K|9F|9G|1A|68]|7|-2|J|-4|8|-2|L|@VI|VJ|VK]]]|$0|-4|2|VL|4|VM|6|$9|@D1|BP]|K|1NB]]|$0|VN|2|VO|4|3E|6|$9|@45|3B|3D|GX|10|3C|36|3G|48|38]|7|-2|J|-4|K|1FO|8|-2|L|@VP]]]|$0|-4|2|VQ|4|GX|6|$9|@5O|36|3C|3E|VR|3I|H3|3G|GW]|K|1NC]]|$0|VS|2|VT|4|BL|6|$9|@2M|E0|3N|LT|KK|48|4F|A8|LP|LQ]|7|-2|J|-4|K|1FP|8|-2|L|@VU|VV]]]|$0|-4|2|VW|4|VX|6|$K|1FQ|9|@3X|47|9C|3H|4A]|7|-2|J|-4|8|-2]]|$0|-4|2|VY|4|VZ|6|$9|-2|7|-2|J|-4|L|-2|K|1FR|8|-2]]|$0|-4|2|W0|4|GT|6|$9|@IG|U|NJ|AF|7B|2M|82|Y|F9]|K|1ND]]|$0|-4|2|OC|4|GA|6|$9|@I1|81|J2|55|A6|AB|2M|3M|8L|5Z]|K|1NE]]|$0|W1|2|W2|4|FM|6|$9|@81|8J|3Y|2P|A6|J1|GA|J2|63|39|I1]|7|-2|J|-4|K|1FS|8|-2|L|@W3|W4|W5]]]|$0|-4|2|W6|4|W7|6|$9|@2L|D6|5B]|7|-2|J|-4|L|-2|K|1FT|8|-2]]|$0|-4|2|W8|4|IP|6|$K|1FU|9|@C0|F|LD|5G|9E|3N|H|69|J5]]]|$0|W9|2|WA|4|C0|6|$9|@5G|16|25|QN|IH|IP|6C|69|4M|I1|48|49|QA|H]|7|-2|J|-4|K|1FV|8|-2|L|@WB]]]|$0|-4|2|WC|4|4T|6|$9|@3U|DM|9U|9V|WD|6A]|K|1NF]]|$0|WE|2|WF|4|C2|6|$K|1FW|9|@BZ|1H|8A|2R|47|49|L0|4H|19|4C|MC|QP|90]|7|-2|J|-4|8|-2|L|@WG|WH]]]|$0|WI|2|WJ|4|7G|6|$9|@79|2N|7H|QY|4U|4X|7I|7J|7K]|7|-2|J|-4|K|1FX|8|-2]]|$0|-4|2|WK|4|FW|6|$K|1FY|9|@AK|FT|1T|V]|7|-2|J|-4|8|-2]]|$0|WL|2|WM|4|CK|6|$K|1FZ|9|@7F|5Q|KJ|CJ|67|5P|8L|Q5|AA|8J|3H|3N|H3|AB|CI]|7|-2|J|-4|L|@WN]|8|-2]]|$0|-4|2|WO|4|R|6|$9|@P|9E|6Z|5F|6X|Q]|7|-2|J|-4|K|1G0|8|-2]]|$0|-4|2|WP|4|OO|6|$K|1G1|9|@47|GJ|GX|H3|DW]]]|$0|-4|2|WQ|4|WR|6|$9|@8K|D7|37]|K|1NG]]|$0|-4|2|WS|4|KJ|6|$K|1G2|9|@3P|2P|KK|FM|8K|56|8I|37|38]|7|@$1R|1G3|2|WS|4|KJ|1U|1G4|1V|1G5|1W|1X|0|-4|1Z|1G6|20|1G7|21|22]]|J|-4|8|-2]]|$0|WT|2|WU|4|8E|6|$9|@CO|89|CQ|CN|CS|8D|42|CR|ID]|K|1NH]]|$0|WV|2|WW|4|5R|6|$9|@79|5I|5O|75|5X|5Y|4L|5P|8L|48]|7|-2|J|-4|K|1G8|8|-2|L|@WX|WY]]]|$0|-4|2|WZ|4|NS|6|$9|@S|MO|30|2V]|K|1NI]]|$0|X0|2|X1|4|4J|6|$K|1G9|9|@IX|R4|4Y|QQ|4K|4C|45|8Y|64|37|38|4H|69]|7|-2|J|-4|8|-2|L|@]]]|$0|-4|2|X2|4|4X|6|$9|@51|7K|4Y|2N|7G|7H|4P|EC|C2]|K|1NJ]]|$0|-4|2|X3|4|JY|6|$9|@5V|5N|72|75|QY]|7|-2|J|-4|K|1GA|8|-2]]|$0|X4|2|X5|4|5V|6|$K|1GB|9|@5Q|5N|5O|75|5U|5X|5Y]|7|-2|J|-4|8|-2|L|@X6|X7]]]|$0|-4|2|X8|4|QY|6|$9|@JY|5V|5N|5O]|K|1NK]]|$0|-4|2|X9|4|10|6|$9|@4R|X|EZ|T6]|K|1NL]]|$0|-4|2|XA|4|9G|6|$9|@1C|4Q|1A|9F]|K|1NM]]|$0|-4|2|XB|4|CF|6|$9|@3C|3D|CC|C9|4C|38|45|4H]|K|1NN]]|$0|-4|2|XC|4|XD|6|@1NO]]|$0|-4|2|XE|4|8A|6|$K|1GC|9|@KZ|19|K4|24|88|9R|C2]|7|@$1R|1GD|2|US|4|UT|1U|1GE|1V|1GF|1W|1X|0|XF|1Z|1GG|20|1GH|21|22]]|J|-4|8|-2]]|$0|-4|2|XG|4|DW|6|$9|@OO|5O]|K|1NP]]|$0|XH|2|6F|4|1H|6|$K|1GI|9|@3Y|C1|C2|DR|AW|2R|15]|7|-2|J|-4|8|-2|L|@XI|XJ]]]|$0|XK|2|XL|4|2W|6|$K|1GJ|9|@3Y|15|2R|DQ|C2|DR|82|XM|8C|1H]|7|-2|J|-4|8|-2|L|@XN|XO|XP]]]|$0|-4|2|XQ|4|XR|6|$9|@15|BP|2X]|7|-2|J|-4|L|-2|K|1GK|8|-2]]|$0|-4|2|XS|4|C|6|$9|@5|D|A|5B|G]|K|1NQ]]|$0|-4|2|XT|4|CD|6|$9|@ML|NE|1L|8P|3D|CC|8D|RL]|7|-2|J|-4|K|1GL|8|-2]]|$0|XU|2|XV|4|XW|6|$K|1GM|9|@2L|4H|XX|XM|XY]|7|-2|J|-4|8|-2]]|$0|-4|2|XZ|4|50|6|$9|@3U|4Y|3Y|9X|2T|4J|64|A7|A2|48|5G]|K|1NR]]|$0|-4|2|Y0|4|QA|6|$9|@5G|IP|C0|J5|5D|QN|6C|LF|LG]|7|-2|J|-4|L|-2|K|1GN|8|-2]]|$0|Y1|2|Y2|4|M9|6|$9|@AE|3E|GX|3G|M8|56|38|8I|E1|8O|E0]|7|-2|J|-4|K|1GO|8|-2]]|$0|Y3|2|Y4|4|AY|6|$K|1GP|9|@3X|FU|45|EF|2W|C1]|7|-2|J|-4|8|-2|L|@Y5]]]|$0|-4|2|Y6|4|11|6|$9|@1T|80|Y|GH|BP|82|RL|X]|K|1NS]]|$0|-4|2|Y7|4|3O|6|$9|@3P|AF|16|3H|3M|EJ|D1|BT|3T|KK]|K|1NT]]|$0|Y8|2|Y9|4|2Y|6|$9|@5F|4V|1C|1B|IO|1A|2U|E2|5E|9F|4Q]|7|-2|J|-4|L|@YA]|K|1GQ|8|-2]]|$0|YB|2|YC|4|4D|6|$9|@4Z|I|48|45|7F]|K|1NU]]|$0|YD|2|YE|4|46|6|$K|1GR|9|@1H|GR|45|C1|10]|7|-2|J|-4|L|@YF]|8|-2]]|$0|-4|2|YG|4|YH|6|$9|@D2|57]|7|-2|J|-4|L|-2|K|1GS|8|-2]]|$0|YI|2|YJ|4|DK|6|$K|1GT|9|@3U|9V|65|4B|6A|4K|90|4F|2T|23|Y|64|A7|8Y|TZ|QP]|7|-2|J|-4|8|-2|L|@YK|YL|YM]]]|$0|-4|2|YN|4|RM|6|$9|@XM|5F|RL|I6]|K|1NV]]|$0|-4|2|YO|4|XX|6|$9|@XW]|K|1NW]]|$0|-4|2|YP|4|YQ|6|$9|@4H|CW|2L|XM|YR]|7|-2|J|-4|L|-2|K|1GU|8|-2]]|$0|YS|2|YT|4|9Z|6|$9|@3U|3X|FV|2W|XM|42|C1|AY|51|8E]|7|-2|J|-4|K|1GV|8|-2|L|@YU]]]|$0|-4|2|YV|4|YR|6|$9|@YQ|4H|CW|2L]|7|-2|J|-4|L|-2|K|1GW|8|-2]]|$0|-4|2|YW|4|C3|6|$K|1GX|9|@BZ|C5|C1|AY|MC]]]|$0|YX|2|YY|4|2X|6|$9|@3S|F8|I|2G|6A|A6|65|G|30|2T|5H|48|2P|P2]|7|-2|J|-4|L|@YZ|Z0|Z1]|K|1GY|8|-2|7Q|-4]]|$0|-4|2|Z2|4|F8|6|$9|@3S|1H|2G|64|2T|6P|2X|31]|K|1NX]]|$0|Z3|2|Z4|4|D8|6|$9|@3P|CI|D1|BT|KR|5Z|TW|DA|1D]|K|1NY]]|$0|Z5|2|Z6|4|D6|6|$K|1GZ|9|@3P|AF|D7|2P|8K|N4|5I]|7|-2|J|-4|8|-2|L|@Z7|Z8]]]|$0|Z9|2|ZA|4|ZB|6|$K|1H0]]|$0|-4|2|ZC|4|CE|6|$9|@C9|3B|3I|CF|8P|3D|CC|3F|8Q|3C]|7|-2|J|-4|K|1H1|8|-2]]|$0|ZD|2|ZE|4|FU|6|$K|1H2|9|@3S|4Q|10|9G|19|1C|12]|7|-2|J|-4|8|-2|L|@ZF]]]|$0|-4|2|ZG|4|CW|6|$9|@4H|5B|2G]|K|1NZ]]|$0|-4|2|ZH|4|ZI|6|$9|@3K|IX|5B]|7|-2|J|-4|L|-2|K|1H3|8|-2]]|$0|-4|2|ZJ|4|O7|6|$9|@O6|O5|O9|O8]|7|-2|J|-4|L|-2|K|1H4|8|-2]]|$0|-4|2|ZK|4|ZL|6|$9|@GJ|29]|7|-2|J|-4|L|-2|K|1H5|8|-2]]|$0|-4|2|ZM|4|NW|6|$9|@NX|NV|3T|5V]|7|-2|J|-4|L|-2|K|1H6|8|-2]]|$0|ZN|2|ZO|4|9H|6|$K|1H7|9|@23|1T|V|25|5K|9F|4Q|68|5D|2Y|1A|4R|2U|9G]|7|-2|J|-4|8|-2|L|@ZP|ZQ|ZR]]]|$0|-4|2|ZS|4|AA|6|$9|@7F|I1|A5|CK|16|E5|26|LP|A9|3H|8R|A8|8L|8J|A6|48|LE|4F|AB]|7|-2|J|-4|K|1H8|8|-2]]|$0|-4|2|ZT|4|FV|6|$9|@V|FT|1T|BP|T|10|X]|K|1O0]]|$0|-4|2|ZU|4|QB|6|$9|@H4|C1]|K|1O1]]|$0|-4|2|ZV|4|9L|6|$9|@2Q|A9|LP|8I|55|AA|26|8L|8J|8Q|56|8R|AB]|K|1O2]]|$0|-4|2|ZW|4|NJ|6|$9|@PE|27|8I|GT|37|NM]|K|1O3]]|$0|ZX|2|ZY|4|DL|6|$K|1H9|9|@3U|DK|9V|ZZ|4K|4F|6A|A7|2T|64|EF|GR|90|B4|65]|7|-2|J|-4|8|-2|L|@100|101|102]]]|$0|-4|2|103|4|DM|6|$9|@3U|DK|9V|DL|4B|4K|4F|4G|6A|ZZ]|7|-2|J|-4|L|-2|K|1HA|8|-2]]|$0|-4|2|104|4|8N|6|$9|@2M|E|H|I|8J|5P|2X|8M|G|37|2G|7F|2V|30|6Z|48]|K|1O4]]|$0|105|2|106|4|25|6|$9|@23|1T|9H|2Q|26|57|2S|BF|27|14|1Q|8R|H3|TZ|AA|2U]|7|-2|J|-4|K|1HB|8|-2|L|@107|108]]]|$0|-4|2|109|4|GM|6|$9|@7F|IG|9H|7H|CJ|CK|4D|5G|8Z|67]|K|1O5]]|$0|-4|2|10A|4|DS|6|$9|@HS|HE|HF|HG|HA]|7|-2|J|-4|K|1HC|8|-2]]|$0|-4|2|10B|4|BV|6|$9|@JA|6B|DV|8M|DX|2X]|K|1O6]]|$0|10C|2|10D|4|2Q|6|$K|1HD|9|@23|55|54|9H|16|1Q|57|B|HP|D9|25|27|NK]|7|-2|J|-4|8|-2|L|@10E]]]|$0|-4|2|10F|4|31|6|$9|@14|15|3S|2X|F8|2T|18|17]|7|-2|J|-4|L|-2|K|1HE|8|-2]]|$0|-4|2|10G|4|K5|6|$9|@KZ|10H|K4|I0|L0|8A|7A]|7|-2|J|-4|K|1HF|8|-2]]|$0|-4|2|10I|4|D9|6|$9|@8K|2Q|16|2S|HP|JH]|7|-2|J|-4|K|1HG|8|-2]]|$0|-4|2|10J|4|LN|6|$9|@C9|3F|3C|36|3D|38|CF]|K|1O7]]|$0|-4|2|10K|4|GP|6|$9|@47|5H|5F|B4|QQ]|K|1O8]]|$0|-4|2|10L|4|QQ|6|$9|@C4|B4|QP|4G|TZ|47|RL|5G|5R|4J]|7|-2|J|-4|K|1HH|8|-2]]|$0|10M|2|10N|4|3Y|6|$K|1HI|9|@3U|QQ|4G|3S|A7|CD|EF|64|GR|4F|2T|B4]|7|-2|J|-4|8|-2|L|@10O|10P]]]|$0|-4|2|10Q|4|10R|6|$9|@GJ|D6|H|5K|SN]|K|1O9]]|$0|-4|2|10S|4|C4|6|$9|@3U|4B|B4|QP|QQ|RL|36|C2|CD|3Y]|K|1OA]]|$0|10T|2|10U|4|5Q|6|$K|1HJ|9|@2M|5N|5O|8J|5R|5U|5Y|8L|5P|DV|AB|5V]|7|-2|J|-4|8|-2|L|@10V|10W|10X]]]|$0|-4|2|10Y|4|10H|6|$9|@KZ|K5|K4|I0|GJ|SL]|K|1OB]]|$0|-4|2|10Z|4|57|6|$9|@2Q|93|2U|25|GJ|H3|TZ|5K]|K|1OC]]|$0|-4|2|110|4|HC|6|$9|@5V|GR|2P|2Q|HD|HE|HA|HG|HH|8R|DS|I1|5P]|7|-2|J|-4|K|1HK|8|-2]]|$0|-4|2|111|4|A5|6|$9|@GA|55|I1|9L|FM|AA|A9|LP|AB|8L|A8|8J]|K|1OD]]|$0|-4|2|112|4|HF|6|$9|@8C|HS|HD|HE|DS|HA|HG|HT]|7|-2|J|-4|K|1HL|8|-2]]|$0|113|2|114|4|E1|6|$K|1HM|9|@GI|E0|E3|4V|66|48|JA|4H|64]|7|-2|J|-4|8|-2|L|@115|116|117]]]|$0|-4|2|118|4|119|6|$9|@2L|XM|XW]|7|-2|J|-4|K|1HN|8|-2]]|$0|-4|2|11A|4|BT|6|$K|1HO|9|@3P|16|3O|DA|3T|BV|2P|IO|1B|KJ]]]|$0|11B|2|11C|4|DR|6|$9|@16|DQ|HT|2W|DR|HS|15|49]|7|-2|J|-4|K|1HP|8|-2]]|$0|-4|2|11D|4|8C|6|$9|@5V|5R|HT|JY|QY|HS|49|HC|H7]|K|1OE]]|$0|-4|2|11E|4|ZZ|6|$9|@B4|19|9V|DL|Z|DK|AK|X]|K|1OF]]|$0|-4|2|11F|4|11G|6|$9|@DX|CO|ID|JH]|7|-2|J|-4|L|-2|K|1HQ|8|-2]]|$0|-4|2|11H|4|11I|6|@1OG]]|$0|-4|2|11J|4|11K|6|@1OH]]|$0|-4|2|11L|4|DX|6|$9|@JH|11G|2G|2X|8J|DV|NM|56|A6]|K|1OI]]|$0|-4|2|11M|4|CP|6|$9|@CO|ID|JH|8E|CS|IC|8D|JI|5H|49|CR|89]|K|1OJ]]|$0|-4|2|11N|4|11O|6|$9|@IP|J5|LD|3N]|7|-2|J|-4|L|-2|K|1HR|8|-2]]|$0|11P|2|11Q|4|2L|6|$K|1HS|9|@4H|1H|2R|2W|XW|XX|8C|4K|XM|4C|XY]|7|-2|J|-4|8|-2|L|@11R]]]|$0|-4|2|11S|4|6X|6|$9|@R|6Z|MU|H3|P9|30|N8|6V|6Y]|7|-2|J|-4|K|1HT|8|-2]]|$0|-4|2|11T|4|7I|6|$9|@2N|7G|51|A2|4X]|K|1OK]]|$0|-4|2|11U|4|DH|6|$9|@D2|FJ]|K|1OL]]|$0|-4|2|11V|4|R4|6|$9|@IX|IP|3N|EQ]|K|1OM]]|$0|-4|2|11W|4|4I|6|$9|@E1|3N|E2|J9|E3|4V|BL|48|49|4M|JA|69]|7|-2|J|-4|K|1HU|8|-2]]|$0|11X|2|11Y|4|ML|6|$K|1HV|9|@19|3Y|FU|QQ|QP|C4]|7|-2|J|-4|8|-2]]|$0|11Z|2|120|4|66|6|$9|@E1|63|E3|4V|4I|DX|6B|48|BL]|7|-2|J|-4|K|1HW|8|-2|L|@121|122]]]|$0|-4|2|123|4|4B|6|$9|@3U|DM|DK|9V|DL|4K|48|64|2T]|7|-2|J|-4|K|1HX|8|-2]]|$0|-4|2|124|4|6B|6|$9|@4H|2G|JI|JA|DX|66|9K|4C|D9|4I|O2]|7|-2|J|-4|K|1HY|8|-2]]|$0|125|2|126|4|J1|6|$9|@CI|81|A6|127|IW|8J|AB|8L]|7|-2|J|-4|K|1HZ|8|-2|L|@128]]]|$0|-4|2|129|4|74|6|$9|-2|7|-2|J|-4|L|-2|7Q|-4|K|1I0|8|-2]]|$0|12A|2|12B|4|ES|6|$9|@8Q|NE|3G|3I|8S|CD|CB]|K|1ON]]|$0|-4|2|12C|4|D|6|$K|1I1|9|@3S|G|5|A|C|I3]]]|$0|-4|2|12D|4|F0|6|$K|1I2|9|@3C|3E|3K|2V]]]|$0|-4|2|12E|4|J2|6|$9|@FM|81|GA|I1|A6|65|4M]|K|1OO]]|$0|-4|2|12F|4|12G|6|$9|@JX|81|AW|9L|2Q]|K|1OP]]|$0|-4|2|12H|4|XY|6|$9|@2L|XM|XW]|7|-2|J|-4|L|-2|K|1I3|8|-2]]|$0|-4|2|12I|4|JJ|6|$9|@9X|JI|IW|ID]|K|1OQ]]|$0|-4|2|12J|4|12K|6|$9|@89|8E|CO|12L|CS]|7|-2|J|-4|L|-2|K|1I4|8|-2]]|$0|-4|2|12M|4|T2|6|$K|1I5]]|$0|-4|2|12N|4|E6|6|$9|@5V|5R|48|8J|3N|LD|IW|J5|E5]|K|1OR]]|$0|-4|2|12O|4|CQ|6|$9|@CO|E9|8E|CS|ID|JJ]|K|1OS]]|$0|-4|2|12P|4|7U|6|$9|@7T|7S|7V|7W|3U|4A]|7|-2|J|-4|K|1I6|8|-2]]|$0|-4|2|12Q|4|12R|6|@1OT]]|$0|12S|2|12T|4|BP|6|$9|@AK|GI|U|F9|11|V|T|1T|GT]|7|-2|J|-4|L|@12U]|K|1I7|8|-2]]|$0|-4|2|12V|4|4G|6|$9|@3Y|DL|QQ|B4|4B|4F|4K|48|64|4C]|7|-2|J|-4|K|1I8|8|-2]]|$0|-4|2|12W|4|VR|6|$9|@GX|LN|2V|3C]|K|1OU]]|$0|-4|2|12X|4|63|6|$K|1I9|9|@BL|A6|4F|49|66|8J|48|DX|8L|J2|4L|FM|4I]]]|$0|-4|2|12Y|4|67|6|$9|@7F|CJ|8Q|6B|2G|38|8L|CK|4D|DX|56|3H]|7|-2|J|-4|K|1IA|8|-2]]|$0|-4|2|12Z|4|NX|6|$9|@5V|3T|75|NV|NW]|7|-2|J|-4|L|-2|K|1IB|8|-2]]|$0|-4|2|130|4|EK|6|$K|1IC|9|@95|EQ|5G|5D|8P]]]|$0|-4|2|131|4|JH|6|$K|1ID|9|@93|6B|D9|CP|ID|8E]]]|$0|-4|2|132|4|HP|6|$9|@15|16|2S|2P|1B|HQ|2U|2X|BT|2Y]|7|-2|J|-4|K|1IE|8|-2]]|$0|-4|2|133|4|IH|6|$9|@LF|C0|LQ|U|QP|WD|C4|RL|66|BP]|K|1OV]]|$0|134|2|135|4|P2|6|$K|1IF|9|@5E|JU|B|65|2X|EJ]]]|$0|-4|2|136|4|J5|6|$K|1IG|9|@8N|5G|IP|QA|LD|LE|H4|QN|LF|LG]]]|$0|-4|2|137|4|2O|6|$9|@19|1H|15|1G|38|1I|1K|1J]|K|1OW]]|$0|-4|2|138|4|139|6|$9|@47|45|OO|41]|7|-2|J|-4|L|-2|K|1IH|8|-2]]|$0|-4|2|13A|4|A3|6|$9|@FT|A2|FJ]|7|-2|J|-4|K|1II|8|-2]]|$0|-4|2|13B|4|F|6|$K|1IJ|9|@95|9E|E|IP|LD|J5]]]|$0|-4|2|13C|4|7Z|6|$9|@37|AX|FT]|K|1OX]]|$0|-4|2|13D|4|O9|6|$9|@O8|O6|O5|O7]|7|-2|J|-4|L|-2|K|1IK|8|-2]]|$0|-4|2|13E|4|3G|6|$9|@8K|8S|3I|38|3C|AE|2O|8P|6B]|K|1OY]]|$0|-4|2|13F|4|5J|6|$K|1IL|9|@5D|5H|48|5G|4H|5B|66|39]]]|$0|-4|2|13G|4|NK|6|$9|@2Q|57|25|30|2V]|K|1OZ]]|$0|-4|2|13H|4|JK|6|$9|@2H|CQ|ID]|K|1P0]]|$0|-4|2|13I|4|41|6|$K|1IM|9|@3U|3S|3X|EZ|4Q|4Y|9X|40|3W|FJ|DH]|7|-2|J|-4|8|-2]]|$0|13J|2|13K|4|3X|6|$9|@9X|FU|9C|A1|4A|4B]|7|-2|J|-4|K|1IN|8|-2|L|@13L]]]|$0|13M|2|13N|4|A1|6|$K|1IO|9|@2L|3X|9C|51]|7|-2|J|-4|L|@13O]|8|-2]]|$0|-4|2|13P|4|LF|6|$9|@5G|J5|QA|QN|C0|IP|6C|IH|LD|39]|7|-2|J|-4|K|1IP|8|-2]]|$0|-4|2|13Q|4|1A|6|$9|@B4|1C|9F|FU|12|4R|4Q|9G]|K|1P1]]|$0|-4|2|13R|4|4W|6|$9|@3U|2N|51|4X|7I|7K|7G]|K|1P2]]|$0|13S|2|13T|4|KZ|6|$K|1IQ|9|@23|19|49|K4|MB|L0|RL|8A]|7|-2|J|-4|8|-2]]|$0|-4|2|13U|4|2H|6|$9|@CO|2H|NE|CS|5H|JK|JJ]|K|1P3]]|$0|-4|2|13V|4|13W|6|$9|@JH|5D|IC|ID|CS]|K|1P4]]|$0|-4|2|13X|4|CO|6|$9|@89|8E|8D|CS|ID|CP|JH|2H|CQ|CR]|K|1P5]]|$0|13Y|2|13Z|4|L9|6|$K|1IR|9|@3K|I5|ES|A3]]]|$0|140|2|141|4|5X|6|$9|@5Q|5O|5R|5U|3O|EQ|8J|5V]|7|-2|J|-4|K|1IS|8|-2|L|@142]]]|$0|-4|2|143|4|4U|6|$9|@3S|5Q|2N|3T|4Y|8L|7G]|7|-2|J|-4|K|1IT|8|-2]]|$0|-4|2|144|4|145|6|$9|@5O|69|93|66|36|63|5R|E1]|7|-2|J|-4|L|-2|K|1IU|8|-2]]|$0|-4|2|146|4|BS|6|$9|@3T]|7|-2|J|-4|L|-2|K|1IV|8|-2]]|$0|147|2|148|4|GI|6|$9|@94|AK|E1|1T|V|BP|4V|90|GH|IG]|7|-2|J|-4|K|1IW|8|-2|L|@149]]]|$0|-4|2|14A|4|14B|6|$K|1IX]]|$0|14C|2|14D|4|14E|6|$9|@15|CN|9V|3U|EZ|94|3S|7F|IX|2X|FT|P2|24|BZ|5Q|9D|CK|2L|63|4Y|QN|2Q|JH]|7|-2|J|-4|L|-2|K|1IY|8|-2]]|$0|-4|2|14F|4|A0|6|$K|1IZ|9|@3S|3P|2L|D6|AX|9Y|A3|A2|FJ]|7|@$1R|1J0|2|14G|4|14H|1U|1J1|1V|1J2|1W|1X|0|14I|1Z|1J3|20|1J4|21|22]]|J|-4|8|-2]]|$0|-4|2|14J|4|5N|6|$K|1J5|9|@5V|5O|QY|I1|93|8C|U]]]|$0|-4|2|14K|4|4K|6|$9|@3U|DM|DK|9U|9V|DL|4B|4H|4G|4J|3Y|64|4F|2T|ML|48]|K|1P6]]|$0|-4|2|14L|4|KV|6|$9|@TZ|57|5G|82|5E|GJ|I6|30|7O|C4|BF|25]|K|1P7]]|$0|-4|2|14M|4|14N|6|$9|@AW|2R]|K|1P8]]|$0|14O|2|14P|4|NE|6|$9|@2H|3F|ML]|7|-2|J|-4|K|1J6|8|-2]]|$0|-4|2|14Q|4|D7|6|$K|1J7|9|@D6|OO|8K]|7|-2|J|-4|8|-2|L|@14R]]]|$0|14S|2|14T|4|8K|6|$9|@C9|8S|3F|3I|3G|38|56|RA|8P|3D|CC|37|CB|8Q]|7|-2|J|-4|L|@14U]|K|1J8|8|-2]]|$0|14V|2|14W|4|A8|6|$9|@7F|16|25|B|NA|AA|8L|48|8J|A6|BL|39|E5|J5]|7|-2|J|-4|K|1J9|8|-2|L|@14X]]]|$0|14Y|2|14Z|4|4Y|6|$9|@7F|2N|9X|C2|2W|4U|4X|C5|4C|F]|7|-2|J|-4|K|1JA|8|-2|L|@150]]]|$0|-4|2|151|4|AL|6|$9|@4S|4V|AJ|23|1A]|K|1P9]]|$0|152|2|153|4|127|6|$9|@2P|CI|KR|81|16|5Z|DA]|7|-2|J|-4|K|1JB|8|-2|L|@154]]]|$0|-4|2|155|4|156|6|$9|@16|3M|3O|CK|CI|D8]|7|-2|J|-4|L|-2|K|1JC|8|-2]]|$0|-4|2|157|4|158|6|$9|@VD]|K|1PA]]|$0|159|2|15A|4|Q6|6|$K|1JD|9|@IX|R4|9L|5C|5Y|A5|Q5|55|NK|8I|9M]|7|-2|J|-4|8|-2|L|@15B]]]|$0|-4|2|15C|4|B|6|$9|@BF|F|IP|5B|LQ|P2]|7|-2|J|-4|L|@]|K|1JE|8|-2]]|$0|-4|2|15D|4|95|6|$K|1JF|9|@B|GJ|IG|I6]|7|-2|J|-4|8|-2]]|$0|-4|2|15E|4|15F|6|$9|@3S|3P|9G]|7|-2|J|-4|L|-2|K|1JG|8|-2]]|$0|-4|2|15G|4|C9|6|$9|@3F|CE|8P|3D|CC|CF|8K|38|CB|3C|3G]|K|1PB]]|$0|-4|2|15H|4|AX|6|$K|1JH|9|@FW|SL|8I]]]|$0|-4|2|15I|4|MU|6|$9|@H3|26|48|25|57|64|27|8Z|90]|K|1PC]]|$0|-4|2|15J|4|9Y|6|$K|1JI|9|@3S|94|3Y|9X|A0|A2|FJ|A3|51|41]|7|-2|J|-4|8|-2]]|$0|15K|2|15L|4|15M|6|$9|@E1|E2|E3|4V|5W]|7|-2|J|-4|K|1JJ|8|@1JK]]]|$0|-4|2|15N|4|AS|6|$9|@XW|AR]|K|1PD]]|$0|15O|2|15P|4|24|6|$K|1JL|9|@23|19|8A|OH|89|9R|9P|26|8I]|7|@$1R|1JM|2|US|4|UT|1U|1JN|1V|1JO|1W|1X|0|15Q|1Z|1JP|20|1JQ|21|22]]|J|-4|8|-2]]|$0|-4|2|15R|4|OH|6|$K|1JR|9|@19|24|8A|89]|7|-2|J|-4|8|-2]]|$0|15S|2|15T|4|AF|6|$9|@7F|2S|3H|2P|I6|4H|IG|1B|GT]|7|-2|J|-4|L|@15U|15V]|K|1JS|8|-2]]|$0|15W|2|15X|4|XM|6|$K|1JT|9|@2L|4H|36|XW|RM|A0|XY]|7|-2|J|-4|8|-2|L|@15Y]]]|$0|15Z|2|160|4|75|6|$K|1JU|9|@5V|5Q|5N|5R|5U|93|5X|L9|72|5O|8L|5W]|7|-2|J|-4|8|-2|L|@161]]]|$0|-4|2|162|4|MJ|6|$K|1JV|9|@C9|EQ|3F|EP|CD]]]|$0|-4|2|163|4|BE|6|$9|@GJ|KV|I5|30|2U|7O|2S|57|2Y|2V|10R]|K|1PE]]|$0|-4|2|164|4|165|6|$9|@2P|18|95|5E]|7|-2|J|-4|L|-2|K|1JW|8|-2]]|$0|166|2|167|4|28|6|$K|1JX|9|@23|1T|V|9H|FT|4S]|7|@$1R|1JY|2|1S|4|1T|1U|1JZ|1V|1K0|1W|1X|0|168|1Z|1K1|20|1K2|21|22]]|J|-4|8|-2|L|@169|16A|16B]]]|$0|-4|2|16C|4|R8|6|$9|@19|AX|2R|1G|AW|2W|1J]|7|-2|J|-4|K|1K3|8|-2]]|$0|-4|2|16D|4|JV|6|$9|@15|5E|R8|VM|4K|2Z|JU|JT]|K|1PF]]|$0|-4|2|16E|4|2Z|6|$9|@15|16|5E|JV|2T|2W|48]|7|-2|J|-4|K|1K4|8|-2]]|$0|-4|2|16F|4|9X|6|$K|1K5|9|@4Y|CR|47|AK|LQ]]]|$0|-4|2|16G|4|7J|6|$K|1K6|9|@2L|2N|7G|45|51|7K|4X]|7|-2|J|-4|8|-2]]|$0|-4|2|16H|4|40|6|$K|1K7|9|@3U|3S|BP|41|D2]|7|-2|J|-4|8|-2]]|$0|-4|2|16I|4|E|6|$K|1K8|9|@8N|2V|H|I|F|A|G|D|2G|5|A8|9E]]]|$0|-4|2|16J|4|4R|6|$7|-2|J|-4|K|1K9|8|-2|9|@AK|10|T6|1A|1C|9H|B4]]]|$0|-4|2|16K|4|1L|6|$9|@19|ML|QP|RL|82|CD|C4|IH]|7|-2|J|-4|K|1KA|8|-2]]|$0|-4|2|16L|4|16M|6|$9|@4D|C9]|7|-2|J|-4|K|1KB|8|-2]]|$0|-4|2|16N|4|HD|6|$9|@5V|2W|DR|HE|HF|DS|HA|HG|HC|HH]|K|1PG]]|$0|16O|2|16P|4|I|6|$K|1KC|9|@2X|8N|30|5P|7F|48|8J|A8|5H|H|2V|2G|37|3A|2M|4D]|7|-2|J|-4|L|@16Q|16R]|8|-2]]|$0|-4|2|16S|4|96|6|$9|@19|CO|4V|CR|2T]|K|1PH]]|$0|16T|2|6S|4|16|6|$K|1KD|9|@2X|F8|48|2M|8N]|7|-2|J|-4|8|-2|L|@16U]]]|$0|-4|2|16V|4|7W|6|$9|@7T|7U|7V|7S|4A|4E]|7|-2|J|-4|K|1KE|8|-2]]|$0|-4|2|16W|4|4L|6|$9|@DM|DK|45|9V|5R|48|63|2T|65|BL|64|A6]|7|-2|J|-4|K|1KF|8|-2]]|$0|16X|2|16Y|4|QN|6|$K|1KG|9|@BZ|8N|2M|5G|IP|C0|16|25|IH|LF|16Z|J5|4I|6C]|7|-2|J|-4|8|-2|L|@170]]]|$0|-4|2|171|4|16Z|6|$9|@5G|IP|C0|QA|QN|LF|6Z|69|R|Q|8Z]|7|-2|J|-4|K|1KH|8|-2]]|$0|-4|2|172|4|HS|6|$9|@HT|2W|DR|MC|8C]|K|1PI]]|$0|-4|2|173|4|O6|6|$9|@O5|O7]|7|-2|J|-4|L|-2|K|1KI|8|-2]]|$0|-4|2|174|4|1K|6|$9|@19|1G|1I|1J|2O|1L]|7|-2|J|-4|L|-2|K|1KJ|8|-2]]|$0|-4|2|175|4|WD|6|$K|1KK|9|@9D|19|DK|9U|1L|4T|IH|24|RL|QP]]]|$0|-4|2|176|4|F7|6|$9|@6P|1B]|K|1PJ]]|$0|-4|2|177|4|FI|6|$9|@D2|FJ|7U|FH|7V]|7|-2|J|-4|K|1KL|8|-2]]|$0|-4|2|178|4|12L|6|$9|@CO|89|8E|CS]|7|-2|J|-4|L|-2|K|1KM|8|-2]]|$0|-4|2|179|4|9U|6|$K|1KN|9|@3U|9D|DM|DK|DL|4B|4K|WD|8L|64|A7|4F|3E|4T|48|C0|4G]]]]";

/***/ }),

/***/ "./src/blocks/03-vibemap-embed/block.json":
/*!************************************************!*\
  !*** ./src/blocks/03-vibemap-embed/block.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"blocks/vibemap-embed","title":"Vibemap Embed Blocks","textdomain":"gutenberg-examples","icon":"location-alt","category":"layout","keywords":["map","listings"],"example":{"attributes":{"content":"Hello world","cities":["peoria"],"categories":[],"vibes":[],"align":"center","class":"vibemap-embed iframe","frameborder":"0","height":500,"width":"100%","scrolling":"yes"}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd define */
/******/ 	(() => {
/******/ 		__webpack_require__.amdD = function () {
/******/ 			throw new Error('define cannot be used indirect');
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"03-vibemap-embed/index": 0,
/******/ 			"03-vibemap-embed/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkvibemap_blocks"] = globalThis["webpackChunkvibemap_blocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["03-vibemap-embed/style-index"], () => (__webpack_require__("./src/blocks/03-vibemap-embed/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map