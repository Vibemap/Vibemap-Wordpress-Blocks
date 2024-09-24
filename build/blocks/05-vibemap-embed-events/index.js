/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/05-vibemap-embed-events/index.js":
/*!*****************************************************!*\
  !*** ./src/blocks/05-vibemap-embed-events/index.js ***!
  \*****************************************************/
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
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/blocks/05-vibemap-embed-events/block.json");
/* harmony import */ var _components_Embed__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Embed */ "./src/components/Embed/index.js");
/* harmony import */ var _components_Filters__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Filters */ "./src/components/Filters/index.js");
/* harmony import */ var _components_Filters_useFilterState_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Filters/useFilterState.js */ "./src/components/Filters/useFilterState.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/05-vibemap-embed-events/editor.scss");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./style.css */ "./src/blocks/05-vibemap-embed-events/style.css");


// WordPress dependencies




const {
  InspectorControls
} = wp.blockEditor;

// Internal dependencies


// Components


// Hook for Filters state



let outputHeight = 2000;

// Editable UI and block attributes
const Edit = props => {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
  const {
    attributes
  } = props;
  const {
    cities,
    categories,
    height = outputHeight,
    tags,
    vibes,
    zoom
  } = attributes;
  console.log('DEBUG: test WP got attributes ', attributes);
  const previewHeight = 420;
  outputHeight = height ? height : 2000;

  // TODO: make this reuable
  const tag_options = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const core = select('core');
    const tags_data = core.getEntityRecords('taxonomy', 'post_tag', {
      per_page: -1,
      page: 1
    });
    const tag_options = tags_data ? tags_data.map(tag => {
      return tag.name;
    }) : [];
    return tag_options;
  });

  // Filters state, set by block attributes
  const filterState = (0,_components_Filters_useFilterState_js__WEBPACK_IMPORTED_MODULE_8__["default"])({
    cities,
    categories,
    vibesSelected: vibes,
    tags,
    tagsAll: tag_options,
    vibes
  });
  const {
    citiesSelected,
    categoriesSelected,
    tagsSelected,
    vibesSelected
  } = filterState;
  console.log('DEBUG: filterState in embed ', filterState, citiesSelected);

  // Sync block attributes with filter state
  const cityDep = JSON.stringify(citiesSelected);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    props.setAttributes({
      cities: citiesSelected
    });
  }, [cityDep]);
  const catDep = JSON.stringify(categoriesSelected);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    props.setAttributes({
      categories: categoriesSelected
    });
  }, [catDep]);
  const tagsDep = JSON.stringify(tagsSelected);
  console.log('DEBUG: tagsDep ', tagsDep);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    console.log('DEBUG: setting tags in block attributes ', tags);
    props.setAttributes({
      tags: tagsSelected
    });
  }, [tagsDep]);
  const vibeDep = JSON.stringify(vibesSelected);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    props.setAttributes({
      vibes: vibesSelected
    });
  }, [vibeDep]);

  // TODO: add date range filter

  const blockStyle = {
    padding: '20px',
    transform: 'scale(0.8)'
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(InspectorControls, {
    key: "inspector"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Filters__WEBPACK_IMPORTED_MODULE_7__["default"], filterState)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, blockProps, {
    style: blockStyle
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Filters__WEBPACK_IMPORTED_MODULE_7__["default"], filterState), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, "Select the list and map options in the block panel on the right."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Embed__WEBPACK_IMPORTED_MODULE_6__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    path: "events",
    height: height,
    cities: citiesSelected,
    categories: categoriesSelected,
    tags: tagsSelected,
    vibes: vibesSelected
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
    height,
    tags,
    vibes
  } = attributes;
  console.log('DEBUG: test got attributes ', attributes, ' in save');
  outputHeight = height ? height : 2000;
  console.log('DEBUG: outputHeight ', outputHeight, outputHeight);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Embed__WEBPACK_IMPORTED_MODULE_6__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    path: "events",
    height: outputHeight,
    cities: cities,
    categories: categories,
    tags: tags,
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
    "height": {
      "type": "number",
      "default": example?.attributes?.height
    },
    "tags": {
      "type": "array",
      "default": example?.attributes?.tags
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
    height = 800,
    radius = 60,
    zoom = 14,
    domain = `https://vibemap.com`,
    path = `map`,
    // Emeded map options
    city = `peoria`,
    theme = 'peoria',
    categories = [],
    tags = [],
    vibes = [],
    ...props
  } = _ref;
  const is_dev = false;
  domain = is_dev ? `http://localhost:8080` : domain;
  console.log('Embed domain ', domain);
  const searchParams = new URLSearchParams({
    embedded: 1,
    placeLayout: 'both',
    activities: categories,
    // TODO: rename to categories
    cities: city,
    tags: tags,
    vibes: vibes,
    radius: radius,
    showCats: 0,
    showTags: 1,
    showVibes: 0,
    theme: theme,
    zoom: zoom
  });
  const src = `${domain}/${path}/?${searchParams}`;
  console.log('DEBUG: Embed src ', src, ' in Embed', zoom);
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
    citiesSelected,
    categoriesSelected,
    tagsSelected,
    vibesSelected,
    setCitiesSelected,
    setCategoriesSelected,
    setTagsSelected,
    setVibesSelected,
    tags = [],
    zoom = 13,
    radius = 60,
    height = 800,
    setHeight,
    setRadius,
    setZoom,
    ...props
  } = _ref;
  const zoomInput = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalInputControl, {
    type: "number",
    value: zoom,
    onChange: value => setZoom(value)
  });
  const radiusInput = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalInputControl, {
    type: "number",
    value: radius,
    onChange: value => setRadius(value)
  });
  const heightInput = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalInputControl, {
    type: "number",
    value: height,
    onChange: value => setHeight(value)
  });
  const activityPicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    __experimentalAutoSelectFirstMatch: true,
    __experimentalExpandOnFocus: true,
    label: "Type a category",
    onChange: tokens => setCategoriesSelected(tokens),
    suggestions: category_slugs,
    value: categoriesSelected
  });
  const cityPicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    __experimentalAutoSelectFirstMatch: true,
    __experimentalExpandOnFocus: true,
    label: "Type a city",
    onChange: tokens => setCitiesSelected(tokens),
    suggestions: city_slugs,
    value: citiesSelected
  });
  const tagPicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    __experimentalAutoSelectFirstMatch: true,
    __experimentalExpandOnFocus: true,
    label: "Type a tag",
    onChange: tokens => setTagsSelected(tokens),
    suggestions: tags,
    value: tagsSelected
  });
  const vibePicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    __experimentalAutoSelectFirstMatch: true,
    __experimentalExpandOnFocus: true,
    label: "Type a vibe",
    onChange: tokens => setVibesSelected(tokens),
    suggestions: vibes_slugs,
    value: vibesSelected
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Options"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, "Zoom"), zoomInput, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, "Radius"), radiusInput, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, "Height"), heightInput, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Filters"), activityPicker, cityPicker, vibePicker, tagPicker);
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
    tagsAll = [],
    vibes = [],
    heightDef = 800,
    radiusDef = 60,
    zoomDef = 14,
    ...props
  } = _ref;
  console.log('DEBUG useFilterState: ', cities, categories, tagsAll, vibes);
  const [citiesSelected, setCitiesSelected] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(cities);
  const [categoriesSelected, setCategoriesSelected] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(categories);
  const [tagsSelected, setTagsSelected] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(tags);
  const [vibesSelected, setVibesSelected] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(vibes);
  const [height, setHeight] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(heightDef);
  const [radius, setRadius] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(radiusDef);
  const [zoom, setZoom] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(zoomDef);
  return {
    // Data
    categories_all,
    category_slugs,
    city_slugs,
    tagsAll,
    vibes_slugs,
    // Getters
    citiesSelected,
    categoriesSelected,
    tagsSelected,
    vibesSelected,
    height,
    radius,
    zoom,
    // Setters
    setCitiesSelected,
    setCategoriesSelected,
    setTagsSelected,
    setVibesSelected,
    setHeight,
    setRadius,
    setZoom
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

/***/ "./src/blocks/05-vibemap-embed-events/style.css":
/*!******************************************************!*\
  !*** ./src/blocks/05-vibemap-embed-events/style.css ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/05-vibemap-embed-events/editor.scss":
/*!********************************************************!*\
  !*** ./src/blocks/05-vibemap-embed-events/editor.scss ***!
  \********************************************************/
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
Object.defineProperty(exports, "__esModule", ({value:!0}));var Fuse=__webpack_require__(/*! fuse.js */ "./node_modules/fuse.js/dist/fuse.esm.js"),LinearScale=__webpack_require__(/*! linear-scale */ "./node_modules/linear-scale/linear-scale.js");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var Fuse__default=_interopDefaultLegacy(Fuse),LinearScale__default=_interopDefaultLegacy(LinearScale),asset={font:{icon:{name:"Nantes",woff:"https://etldev.blob.core.windows.net/fonts/Nantes-Regular.woff"}}},color={base:{white:"#ffffff",black:"#000000",gray:{50:"#f9f7fc",100:"#efeff4",200:"#e2e2ed",300:"#e4e4ea",400:"#d1d0d8",500:"#b2b1bc",600:"#9999a3",700:"#7d7c84",800:"#535156",900:"#3c3b3f",1e3:"#242326"},yellow:{bright:"#fdff00",deep:"#ef9b0d",light:"#fef483",pastel:"#f1ffcf",primary:"#fded35"},lime:{bright:"#64ff00",deep:"#58e86b",light:"#a8f36a",pastel:"#d4ffdc",primary:"#78ec6c"},green:{bright:"#54ff95",deep:"#006e59",light:"#61ecb2",pastel:"#b4ffd9",primary:"#00b459"},teal:{bright:"#00ffe4",deep:"#205273",light:"#00cec8",pastel:"#c4f7f4",primary:"#57b5b1"},blue:{bright:"#0000ff",deep:"#000045",light:"#3cd8ff",pastel:"#a0e5f7",primary:"#2d76cc"},violet:{bright:"#6b00d7",deep:"#190087",light:"#5172bf",pastel:"#cad8f9",primary:"#1d54d7"},purple:{bright:"#9100ff",deep:"#4e0089",light:"#d391fa",pastel:"#e5d0ff",primary:"#b34eff"},magenta:{bright:"#ff00ff",deep:"#7e1a65",light:"#e779b8",pastel:"#ffc4ff",primary:"#c400c4"},red:{bright:"#ff0000",deep:"#a30000",light:"#ff6434",pastel:"#ffccbc",primary:"#dd2c00"},orange:{bright:"#ef7200",deep:"#e55929",light:"#d99566",pastel:"#fff3e0",primary:"#ff5722"},golden:{bright:"#f7941d",deep:"#c66900",light:"#ffc947",pastel:"#ffffe4",primary:"#ff9800"}},heatmap:{first:"rgba(255, 200, 71, 0.8)",second:"rgba(255, 0, 255, 0.8)",third:"rgba(178, 77, 255, 0.8)",fourth:"rgba(161, 230, 247, 0.6)",fifth:"rgba(205, 244, 208, 0.4)",sixth:"#f9f7fc"},vibes:{absurd:{primary:"#a8f36a",secondary:"#00ffe4"},active:{primary:"#64ff00",secondary:"#c4f7f4"},activist:{primary:"#e779b8",secondary:"#ef9b0d"},adventurous:{primary:"#64ff00",secondary:"#00cec8",tertiary:"#c4f7f4"},alternative:{primary:"#f7941d",secondary:"#ffc947"},airy:{primary:"#fff3e0",secondary:"#f1ffcf"},analog:{primary:"#205273",secondary:"#ef7200"},antique:{primary:"#d99566",secondary:"#57b5b1"},artisanal:{primary:"#ffccbc",secondary:"#b4ffd9"},architectural:{primary:"#c400c4",secondary:"#fff3e0"},artsy:{primary:"#d391fa",secondary:"#006e59"},aquatic:{primary:"#0000ff",secondary:"#00ffe4"},art:{primary:"#d391fa",secondary:"#00cec8"},authentic:{primary:"#f7941d",secondary:"#b34eff"},aware:{primary:"#9100ff",secondary:"#00ffe4",tertiary:"#fff3e0"},beautiful:{primary:"#e5d0ff",secondary:"#e779b8"},belonging:{primary:"#f7941d",secondary:"#fdff00"},blissful:{primary:"#e779b8",secondary:"#f1ffcf"},boho:{primary:"#fff3e0",secondary:"#c66900"},bold:{primary:"#ef7200",secondary:"#ffc4ff"},boozy:{primary:"#ff5722",secondary:"#dd2c00"},botanical:{primary:"#b4ffd9",secondary:"#006e59"},bright:{primary:"#fdff00",secondary:"#d4ffdc"},brunch:{primary:"#fded35",secondary:"#ff00ff"},busy:{primary:"#e55929",secondary:"#ff9800"},buzzing:{primary:"#c66900",secondary:"#fded35",tertiary:"#ffc947"},calm:{primary:"#ffffe4",secondary:"#d4ffdc",tertiary:"#3cd8ff"},celebration:{primary:"#ff9800",secondary:"#f1ffcf"},celebratory:{primary:"#ff9800",secondary:"#d391fa"},charming:{primary:"#cad8f9",secondary:"#e5d0ff"},cheerful:{primary:"#ffc4ff",secondary:"#fff3e0"},chill:{primary:"#a0e5f7",secondary:"#ffccbc",tertiary:"#f1ffcf"},cinematic:{primary:"#205273",secondary:"#d391fa"},civic:{primary:"#00cec8",secondary:"#205273"},classic:{primary:"#e55929",secondary:"#c400c4"},colorful:{primary:"#ff00ff",secondary:"#00cec8"},community:{primary:"#ffccbc",secondary:"#c400c4"},contemplative:{primary:"#a0e5f7",secondary:"#c4f7f4"},cool:{primary:"#57b5b1",secondary:"#3cd8ff"},courageous:{primary:"#d391fa",secondary:"#fff3e0"},collective:{primary:"#f1ffcf",secondary:"#000045"},collectable:{primary:"#d391fa",secondary:"#f1ffcf"},cozy:{primary:"#ffffe4",secondary:"#cad8f9"},cultural:{primary:"#b34eff",secondary:"#ff00ff"},curious:{primary:"#00cec8",secondary:"#ef9b0d"},cute:{primary:"#e779b8",secondary:"#fded35"},creative:{primary:"#a0e5f7",secondary:"#9100ff"},crowded:{primary:"#000045",secondary:"#ffccbc"},datespot:{primary:"#ff00ff",secondary:"#ff0000"},drip:{primary:"#e55929",secondary:"#4e0089"},diverse:{primary:"#e5d0ff",secondary:"#00ffe4"},diy:{primary:"#5172bf",secondary:"#d391fa"},dreamy:{primary:"#d391fa",secondary:"#a0e5f7",tertiary:"#f1ffcf"},drinking:{primary:"#ff5722",secondary:"#dd2c00"},dynamic:{primary:"#9100ff",secondary:"#78ec6c"},eclectic:{primary:"#ffffe4",secondary:"#64ff00"},edgy:{primary:"#1d54d7",secondary:"#fff3e0"},energetic:{primary:"#ffc947",secondary:"#fded35",tertiary:"#c66900"},energy:{primary:"#ff5722",secondary:"#ff9800"},exciting:{primary:"#fded35",secondary:"#ff00ff"},family:{primary:"#f1ffcf",secondary:"#9100ff"},festive:{primary:"#ffc947",secondary:"#ff00ff"},fierce:{primary:"#a30000",secondary:"#ffccbc"},folk:{primary:"#a30000",secondary:"#fded35"},fragrant:{primary:"#b4ffd9",secondary:"#d4ffdc"},friendly:{primary:"#3cd8ff",secondary:"#d391fa"},fun:{primary:"#ffffe4",secondary:"#00ffe4"},funny:{primary:"#00cec8",secondary:"#fded35"},generous:{primary:"#2d76cc",secondary:"#a8f36a"},happy:{primary:"#ef9b0d",secondary:"#d4ffdc"},healthy:{primary:"#c4f7f4",secondary:"#58e86b"},hippie:{primary:"#ffc4ff",secondary:"#ff9800"},historic:{primary:"#c66900",secondary:"#fff3e0"},hopeful:{primary:"#f7941d",secondary:"#d4ffdc"},inclusive:{primary:"#6b00d7",secondary:"#61ecb2"},iconic:{primary:"#7e1a65",secondary:"#ffc4ff"},inspired:{primary:"#b4ffd9",secondary:"#58e86b"},intimate:{primary:"#dd2c00",secondary:"#ffccbc"},joyful:{primary:"#3cd8ff",secondary:"#ffc4ff"},kitschy:{primary:"#ffccbc",secondary:"#006e59"},legacy:{primary:"#d391fa",secondary:"#e5d0ff"},lit:{primary:"#fded35",secondary:"#ff0000"},lively:{primary:"#ff5722",secondary:"#61ecb2"},local:{primary:"#ff00ff",secondary:"#a8f36a"},loud:{primary:"#ff5722",secondary:"#64ff00"},love:{primary:"#c400c4",secondary:"#b34eff"},magical:{primary:"#ef9b0d",secondary:"#c400c4"},mindful:{primary:"#fef483",secondary:"#d99566"},minimalist:{primary:"#e2e2ed",secondary:"#c4f7f4"},moody:{primary:"#ffccbc",secondary:"#190087"},musical:{primary:"#00ffe4",secondary:"#9100ff"},mystic:{primary:"#f1ffcf",secondary:"#c400c4"},natural:{primary:"#61ecb2",secondary:"#ffccbc"},neon:{primary:"#fdff00",secondary:"#64ff00"},new:{primary:"#64ff00",secondary:"#e5d0ff"},nostalgic:{primary:"#fff3e0",secondary:"#190087",tertiary:"#d99566"},old:{primary:"#57b5b1",secondary:"#ffccbc"},"old-school":{primary:"#190087",secondary:"#d99566",tertiary:"#fff3e0"},outdoors:{primary:"#78ec6c",secondary:"#3cd8ff"},party:{primary:"#9100ff",secondary:"#ffccbc"},patio:{primary:"#fded35",secondary:"#a8f36a"},passionate:{primary:"#ff6434",secondary:"#ffc947"},peaceful:{primary:"#3cd8ff",secondary:"#fff3e0"},playful:{primary:"#00cec8",secondary:"#a8f36a",tertiary:"#00cec8"},playtime:{primary:"#00cec8",secondary:"#a8f36a",tertiary:"#00cec8"},popular:{primary:"#e779b8",secondary:"#ffc947"},proud:{primary:"#0000ff",secondary:"#3cd8ff"},positive:{primary:"#ffc4ff",secondary:"#fded35"},quiet:{primary:"#cad8f9",secondary:"#57b5b1"},"quiet-energy":{primary:"#3cd8ff",secondary:"#b4ffd9",tertiary:"#ffffe4"},radical:{primary:"#c400c4",secondary:"#00ffe4"},rebel:{primary:"#205273",secondary:"#ffccbc"},relaxing:{primary:"#2d76cc",secondary:"#c4f7f4"},retro:{primary:"#2d76cc",secondary:"#ef9b0d"},romantic:{primary:"#ff0000",secondary:"#e5d0ff"},rousing:{primary:"#c4f7f4",secondary:"#f1ffcf"},scenic:{primary:"#58e86b",secondary:"#c4f7f4"},sensual:{primary:"#7e1a65",secondary:"#ffccbc"},serene:{primary:"#d4ffdc",secondary:"#fded35"},shimmy:{primary:"#d391fa",secondary:"#2d76cc"},sleepy:{primary:"#57b5b1",secondary:"#cad8f9"},social:{primary:"#ff0000",secondary:"#ffccbc",tertiary:"#f1ffcf"},solidarity:{primary:"#9100ff",secondary:"#00ffe4",tertiary:"#fff3e0"},spiritual:{primary:"#4e0089",secondary:"#ffc4ff"},spontaneous:{primary:"#e5d0ff",secondary:"#ffc4ff"},throwback:{primary:"#7e1a65",secondary:"#9100ff"},together:{primary:"#ff0000",secondary:"#ffccbc",tertiary:"#f1ffcf"},trendy:{primary:"#fef483",secondary:"#ff00ff"},trending:{primary:"#ffc947",secondary:"#d391fa"},tropical:{primary:"#54ff95",secondary:"#ff00ff"},trust:{primary:"#ffc947",secondary:"#e779b8"},underground:{primary:"#1d54d7",secondary:"#d391fa"},unique:{primary:"#0000ff",secondary:"#e5d0ff"},vibrant:{primary:"#9100ff",secondary:"#ffccbc"},views:{primary:"#3cd8ff",secondary:"#a0e5f7"},vintage:{primary:"#d99566",secondary:"#dd2c00"},volunteer:{primary:"#ff9800",secondary:"#a8f36a"},whimsical:{primary:"#3cd8ff",secondary:"#54ff95"},wild:{primary:"#00b459",secondary:"#006e59"},wistful:{primary:"#ffc947",secondary:"#ffc4ff"},witchy:{primary:"#e779b8",secondary:"#a30000"},witty:{primary:"#205273",secondary:"#a0e5f7"},zen:{primary:"#57b5b1",secondary:"#2d76cc"}},gradients:{quiet_energy:"#57b5b1 #d391fa"},text:{dark:"#3c3b3f",muted:"#535156",light:"#d1d0d8"},ui:{button:{active:"#3c3b3f",disabled:"#9999a3"},tab:{active:"#3c3b3f",disabled:"#b2b1bc"}}},column={gap:{desktop:"1.5rem",mobile:"0.5rem",list:"1.75rem"}},margin={center:"0 auto"},padding={item:"2.5rem",section:"3.5rem"},post={text:{block:{heading:30,subheading:18},card:{title:20,description:14,category:16},caption:16,category:18,cite:16,heading:{title:36,subheading:30,heading1:36,heading2:34,heading3:30,heading4:26,heading5:20,heading6:18},list:18,info:16,paragraph:18,pullquote:32}},transitions={base:{default:"0.35s ease !default"}},font={family:{sans:"Public Sans",serif:"Nantes"},height:{base:1.2,large:1.6,small:1,tall:1.8,none:0},size:{base:16,normal:16,small:14,tiny:12,micro:10,large:18},weight:{base:300,light:200,normal:300,link:400,medium:500,bold:700}},units={base:{base:4,huge:12,large:8,nano:.4,small:2,tiny:1}},variables={asset:asset,color:color,column:column,"line-height":{tall:1.8,large:1.6,base:1.2,small:1,none:0},margin:margin,padding:padding,post:post,transitions:transitions,font:font,units:units};const jsonpack=__webpack_require__(/*! jsonpack */ "./node_modules/jsonpack/main.js");let activityCategories={},allVibes=[],vibeRelations=[];try{const b=__webpack_require__(/*! ../dist/vibesFromCMSTaxonomy.zip.json */ "./node_modules/vibemap-constants/dist/vibesFromCMSTaxonomy.zip.json"),c=(allVibes=jsonpack.unpack(b),__webpack_require__(/*! ../dist/vibeRelations.zip.json */ "./node_modules/vibemap-constants/dist/vibeRelations.zip.json")),d=(vibeRelations=jsonpack.unpack(c),__webpack_require__(/*! ../dist/activityCategories.zip.json */ "./node_modules/vibemap-constants/dist/activityCategories.zip.json"));activityCategories=jsonpack.unpack(d)}catch(e){console.log("Error upacking vibes ",e)}const getVibeInfo=(r="chill")=>{var e=allVibes.find(e=>e.slug===r);return e||null},getVibesFromSlugs=e=>{const a=[];return e.forEach(r=>{var e=allVibes.find(e=>e.slug===r);e&&a.push(e)}),a},getVibeGradient=(r="chill")=>{let e="#DDDDDD",a="#AAAAAA";var f=variables.color.vibes,i=(allVibes.filter(e=>r===e.key),f[r]),f=(f[r]&&(e=i.primary,a=i.secondary),{color1:e,color2:a,gradient:`linear-gradient(44deg, ${e} 20%, ${a} 100% )`});return f},getCategory=(r="food")=>{var e=activityCategories.find(e=>e.slug===r);return e||null},getCategoriesByLevel=(r=2)=>{return activityCategories.filter(e=>{return parseInt(e.level)==r})},flattenCategories=(e,f=1)=>{let i=[];return e.forEach(e=>{const{subcategories:r,...a}=e;i.push(a),1<f&&r&&0<r.length&&(i=[...i,...flattenCategories(r,f-1)])}),i},activityCategoryToOptions=e=>{return e.map(e=>{var r=e.seo&&e.seo.focuskw&&0<e.seo.focuskw.length?e.seo.focuskw:e&&e.title?e.title:e.name;return{key:e.slug,label:r,seo:e.seo,title:e.name,value:e.slug,level:e.level}})},getSubCategories=(r="all",e="all")=>{const a=activityCategories;const f=a.find(e=>e.slug===r).details.sub_categories;let i=[];switch(e){case"keys":i=f.map(e=>e.slug);break;case"all":i=f.map(e=>getCategory(e.slug));break;default:i=f}return i},getVibes=(e="keys")=>{let r=[];return r="keys"===e?allVibes.map(e=>e.slug):allVibes},searchCategories=(e="ing",r=.2,a=["name","definition","title"])=>{a={includeScore:!0,keys:a,threshold:r};const f=new Fuse__default.default(activityCategories,a);return f.search(e)},searchVibes=(e="ing",r=.2,a=["name","definition"])=>{a={includeScore:!0,keys:a,threshold:r};const f=new Fuse__default.default(allVibes,a);return f.search(e)},getVibePreferences=(e="matrix",r=null,a=0,f=!0)=>{if(!r||!r.extra_data)throw new Error("getVibePreferences: the data parameter must have a `extra_data` property");const i=getVibes("keys");let c=i.map(e=>0);const s={favorites:1,myvibes:1,vibepoints:{search:.1,vibecheck:.4,save:.5},upvotedvibes:{vibenames:.4,meta:.2},vibecheckhistory:.7},t=r.extra_data,o=(t.favorites&&Object.values(t.favorites).forEach(e=>{e&&e.properties&&e.properties.vibes&&e.properties.vibes.forEach(e=>{i.includes(e)&&(e=i.indexOf(e),c[e]=c[e]+s.favorites)})}),t.myVibes&&t.myVibes.map(function(e){i.includes(e)&&(e=i.indexOf(e),c[e]=c[e]+s.myvibes)}),t.vibePoints&&t.vibePoints.forEach(e=>{switch(e.reason){case"search vibes":e.searchVibes.forEach(e=>{e=i.indexOf(e);c[e]=c[e]+s.vibepoints.search});break;case"vibe check":if(!e.vibeCheckVibe[0])return;e.vibeCheckVibe[0].forEach(e=>{e=i.indexOf(e);c[e]=c[e]+s.vibepoints.vibecheck})}}),t.upvotedVibes&&Object.values(t.upvotedVibes).forEach(e=>{if(e&&e.place&&e.place.properties&&e.place.properties.vibes){const r=e.place.properties.vibes;r.forEach(e=>{i.includes(e)&&(e=i.indexOf(e),c[e]=c[e]+s.upvotedvibes.meta)}),e&&e.vibeNames&&e.vibeNames.forEach(e=>{i.includes(e)&&(e=i.indexOf(e),c[e]=c[e]+s.upvotedvibes.vibenames)})}}),t.vibeCheckHistory&&t.vibeCheckHistory.forEach(e=>{e&&e.vibes&&e.vibes.forEach(e=>{e.forEach(e=>{i.includes(e)&&(e=i.indexOf(e),c[e]=c[e]+s.vibecheckhistory)})})}),c.reduce((e,r)=>e<r?r:e,0));if("matrix"===e)return f&&0!==o?c.map(e=>e/o):c;const n=c.map((e,r)=>{return{key:i[r],score:f&&0!==o?e/o:e}}),d=n.sort((e,r)=>r.score-e.score),y=d.filter(e=>e.score>a);return y.map(({key:e})=>e)},getVibesFromVibeTimes=e=>{var r=e&&0<e.length?e.sort((e,r)=>r.score-e.score).map(e=>e.name):[];return console.log("Handle these vibe times: ",e,r),r},getRelatedVibes=(e=["chill"],c=.4)=>{let s=e;e=e.flatMap(e=>{var r=getVibeInfo(e);let a=[];r&&r.details&&r.details.vibes&&(s=s.concat(r.details.vibes)),r&&r.alias&&(a=s.concat([r.alias]));var f=vibeRelations[e];const i=[];for(e in f)f[e]>=c&&i.push(e);return a=s.concat(i)});return[...new Set(e)]},yourvibe_scale_v1=e=>{let r=1.061645*e**.289052;return 1<r?r=1:r<0&&(r=0),r},normalize_all=(e=500,r=1,a=100,f=1,i=10)=>{return LinearScale__default.default().domain([r,a]).range([f,i])(e)},percent_yourvibe=(e,a)=>{let f=1/e.length,i=0;var c=[];let s=0;e.map(r=>{a.includes(r)&&(i+=f,s+=1),r in vibeRelations&&a.map(e=>{e in vibeRelations[r]&&c.push(vibeRelations[r][e])})});var r=a.length-s,r=(r=1<=c.length&&1<r?Math.log10(10)/Math.log10(20):1<=c.length&&1==r?c[0]:0,normalize_all(r,0,1,0,f*(e.length-s)));i+=r;let t=yourvibe_scale_v1(i);return t<=0&&(t=.5),Math.round(100*t)};exports.activityCategoryToOptions=activityCategoryToOptions,exports.flattenCategories=flattenCategories,exports.getCategoriesByLevel=getCategoriesByLevel,exports.getCategory=getCategory,exports.getRelatedVibes=getRelatedVibes,exports.getSubCategories=getSubCategories,exports.getVibeGradient=getVibeGradient,exports.getVibeInfo=getVibeInfo,exports.getVibePreferences=getVibePreferences,exports.getVibes=getVibes,exports.getVibesFromSlugs=getVibesFromSlugs,exports.getVibesFromVibeTimes=getVibesFromVibeTimes,exports.normalize_all=normalize_all,exports.percent_yourvibe=percent_yourvibe,exports.searchCategories=searchCategories,exports.searchVibes=searchVibes,exports.yourvibe_scale_v1=yourvibe_scale_v1;
//# sourceMappingURL=vibes.js.map


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
module.exports = JSON.parse('{"activityCategories":[{"id":17429,"description":"","name":"Active Senior Living","slug":"senior-living","parent":17426,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"residential","level":3},{"id":9881,"description":"","name":"Acupuncture","slug":"acupuncture","parent":9878,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1300","icon":"","feature_in_app_":false},"parent_slug":"health","level":3},{"id":15061,"description":"","name":"Adult Entertainment","slug":"adult_entertainment","parent":6334,"details":{"noun":"","vibes":[],"msv":"80","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":9830,"description":"","name":"Afghan","slug":"afghan","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"food","level":3},{"id":9833,"description":"","name":"African","slug":"african","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"10","icon":"","feature_in_app_":false},"parent_slug":"food","level":3},{"id":9836,"description":"","name":"Albanian","slug":"albanian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":17432,"description":"","name":"Alcohol","slug":"alcohol","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"shop","level":3},{"id":6295,"description":"Discover the best things to do in %city%, based on your vibe. Guides, events, activities, and more to help you plan a visit or weekend. Whether you’re a first time visitor or long-time local, we\'ll recommend something fun and interesting.","name":"All","slug":"all","parent":0,"details":{"noun":"Things to do","sub_categories":[{"slug":"food","id":6331},{"slug":"visit","id":6298},{"slug":"drink","id":6328},{"slug":"outdoors","id":6340},{"slug":"community","id":6293},{"slug":"events","id":6323},{"slug":"learning","id":6573},{"id":6334,"slug":"entertainment"},{"id":17426,"slug":"residential"},{"id":17360,"slug":"services"},{"id":6304,"slug":"shop"},{"id":6337,"slug":"games"},{"id":6294,"slug":"stay"},{"id":9878,"slug":"health"}],"msv":"100000","icon":"allLogo","vibes":["dreamy","creative","fun","local","new","amazing","family","trending","classic","adventurous"],"parent_categories":false,"feature_in_app_":false},"level":1},{"id":9839,"description":"","name":"American / New American","slug":"american","parent":6331,"details":{"noun":"","vibes":[],"msv":"200","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10262,"description":"","name":"Amusement Park","slug":"amusement_park","parent":6298,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":17411,"description":"","name":"Animal Care","slug":"animal_care","parent":17360,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":10379,"description":"","name":"Antique Store","slug":"antique","parent":6304,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":17435,"description":"","name":"Apartment","slug":"apartment","parent":17426,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"residential","level":3},{"id":10436,"description":"","name":"Aquarium","slug":"aquarium","parent":6291,"details":{"noun":"Aquarium","sub_categories":[],"vibes":[],"msv":"2000","icon":"","feature_in_app_":false},"parent_slug":"visit","level":3},{"id":9917,"description":"","name":"Arboretum","slug":"arboretum","parent":6340,"details":{"noun":"","vibes":[],"msv":"600","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10406,"description":"","name":"Arcade","slug":"arcade","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"3000","icon":"","feature_in_app_":false},"parent_slug":"entertainment","level":3},{"id":17414,"description":"","name":"Architecture","slug":"architecture","parent":17360,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":9842,"description":"","name":"Argentinian","slug":"argentinian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6291,"description":"","name":"Art","slug":"art","parent":6334,"details":{"noun":"Art","msv":"2400","sub_categories":[{"id":10418,"slug":"art_museum"},{"id":10433,"slug":"arts_organization"},{"id":6307,"slug":"gallery"},{"id":10424,"slug":"photography"},{"id":10430,"slug":"print_shop"},{"id":10427,"slug":"studio"}],"vibes":["artsy","creative","inspired"],"icon":"art","feature_in_app_":true},"parent_slug":"entertainment","level":3},{"id":10418,"description":"","name":"Art Museum","slug":"art_museum","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"8000","icon":"","feature_in_app_":false},"parent_slug":"art","level":3},{"id":6334,"description":"","name":"Arts &amp; Entertainment","slug":"entertainment","parent":6295,"details":{"noun":"Entertainment","vibes":["fun","interesting","popular","lively","musical"],"msv":"500","icon":"entertainment","sub_categories":[{"id":10406,"slug":"arcade"},{"id":6291,"slug":"art"},{"id":10403,"slug":"casino"},{"id":6292,"slug":"comedy"},{"id":10412,"slug":"festival"},{"id":10394,"slug":"film"},{"id":6307,"slug":"gallery"},{"id":10421,"slug":"interactive"},{"id":10277,"slug":"museum"},{"id":6343,"slug":"music"},{"id":10668,"slug":"nightclub"},{"id":6570,"slug":"nightlife"},{"id":10400,"slug":"performance"},{"id":10397,"slug":"theater"}]},"parent_slug":"all","level":2},{"id":10433,"description":"","name":"Arts Organization","slug":"arts_organization","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"art","level":3},{"id":9845,"description":"","name":"Asian Fusion","slug":"asianfusion","parent":6331,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":13940,"description":"","name":"Attractions","slug":"attractions","parent":6323,"details":{"noun":"","vibes":[],"msv":"100","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"events","level":3},{"id":9848,"description":"","name":"Austrailian","slug":"austrailian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":12600,"description":"Cars, automobiles, and motorcycles","name":"Automobiles","slug":"automobiles","parent":6304,"details":{"noun":"automobiles","vibes":[],"msv":"20","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"shop","level":3},{"id":9851,"description":"","name":"Bagels","slug":"bagels","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9854,"description":"","name":"Bakery","slug":"bakery","parent":6331,"details":{"noun":"","vibes":[],"msv":"8000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9857,"description":"","name":"Bangladeshi","slug":"bangladeshi","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":17417,"description":"","name":"Bank","slug":"bank","parent":17360,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":10656,"description":"","name":"Bar","slug":"bar","parent":6328,"details":{"noun":"Bar","sub_categories":[],"vibes":["drinking","boozy"],"msv":"18000","icon":"","feature_in_app_":true},"parent_slug":"drink","level":3},{"id":9860,"description":"","name":"Barbeque","slug":"barbeque","parent":6331,"details":{"noun":"","vibes":[],"msv":"1900","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10560,"description":"","name":"Barber Shop","slug":"barber","parent":9884,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"beauty","level":3},{"id":9932,"description":"","name":"Beach","slug":"beach","parent":6340,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"22000","icon":"","feature_in_app_":false},"parent_slug":"outdoors","level":3},{"id":9884,"description":"","name":"Beauty","slug":"beauty","parent":9878,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[{"id":10560,"slug":"barber"},{"id":10557,"slug":"hair"},{"id":10554,"slug":"nails"},{"id":10563,"slug":"tattoo_parlor"}]},"parent_slug":"health","level":3},{"id":10181,"description":"","name":"Bed &amp; Breakfast","slug":"bed_breakfast","parent":6294,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10301,"description":"","name":"Beer Garden","slug":"beer_garden","parent":6328,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":9863,"description":"","name":"Bistro","slug":"bistro","parent":6331,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":15064,"description":"","name":"Boats","slug":"boats","parent":6340,"details":{"noun":"","vibes":[],"msv":"40","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":10334,"description":"","name":"Books","slug":"books","parent":6304,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"720","icon":"","feature_in_app_":true},"parent_slug":"shop","level":3},{"id":9929,"description":"","name":"Botanical Garden","slug":"botanicalgarden","parent":6340,"details":{"noun":"","vibes":[],"msv":"320","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10235,"description":"","name":"Bowling","slug":"bowling","parent":6337,"details":{"noun":"","vibes":[],"msv":"4000","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":9866,"description":"","name":"Bowls","slug":"bowls","parent":6331,"details":{"noun":"","vibes":[],"msv":"100","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10187,"description":"","name":"Boxing","slug":"boxing","parent":6337,"details":{"noun":"","vibes":[],"msv":"700","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":9872,"description":"","name":"Brazilian","slug":"brazilian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10674,"description":"","name":"Breakfast","slug":"breakfast","parent":6331,"details":{"noun":"Breakfast","vibes":[],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10304,"description":"","name":"Brewery","slug":"brewery","parent":6328,"details":{"noun":"","vibes":[],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10662,"description":"","name":"Brewpub","slug":"brewpub","parent":6328,"details":{"noun":"Brewpub","vibes":[],"msv":"320","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10496,"description":"","name":"Broadway","slug":"broadway","parent":10397,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"theater","level":3},{"id":9869,"description":"","name":"Brunch","slug":"brunch","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"15000","icon":"","feature_in_app_":true},"parent_slug":"food","level":3},{"id":11247,"description":"","name":"Buffet","slug":"buffet","parent":6331,"details":{"noun":"","vibes":[],"msv":"400","icon":"","parent_categories":false,"sub_categories":[]}},{"id":9875,"description":"","name":"Burger","slug":"burger","parent":6331,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10469,"description":"","name":"Burlesque","slug":"burlesque","parent":10400,"details":{"noun":"","vibes":[],"msv":"300","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10472,"description":"","name":"Caberet","slug":"caberet","parent":10400,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10638,"description":"","name":"Cabin","slug":"cabin","parent":6294,"details":{"noun":"Cabin","vibes":["outdoorsy","natural","cottagecore","cottage"],"msv":"320","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":9944,"description":"","name":"Cafe","slug":"cafe","parent":6331,"details":{"noun":"Cafe","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9950,"description":"","name":"Cambodian","slug":"cambodian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10172,"description":"","name":"Campground","slug":"campground","parent":6294,"details":{"noun":"","vibes":[],"msv":"1000","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":9953,"description":"","name":"Candy","slug":"candy","parent":6331,"details":{"noun":"","vibes":[],"msv":"250","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10566,"description":"","name":"Cannabis","slug":"cannabis","parent":9878,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":true},"parent_slug":"health","level":3},{"id":9956,"description":"","name":"Caribbean","slug":"caribbean","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10403,"description":"","name":"Casino","slug":"casino","parent":6291,"details":{"noun":"","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"entertainment","level":3},{"id":9941,"description":"","name":"Cemetery","slug":"cemetery","parent":6340,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10364,"description":"","name":"Children\'s Clothing Store","slug":"childrens_clothing","parent":10361,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"kids","level":3},{"id":10439,"description":"","name":"Children\'s Museum","slug":"children_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":9959,"description":"","name":"Chinese","slug":"chinese","parent":6331,"details":{"noun":"","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":17396,"description":"","name":"Chiropractic","slug":"chiropractic","parent":17360,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":17447,"description":"","name":"Chocolate","slug":"chocolate","parent":0,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"shop","level":3},{"id":10283,"description":"","name":"Church","slug":"church","parent":6293,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"community","level":3},{"id":10475,"description":"","name":"Circus","slug":"circus","parent":10400,"details":{"noun":"","vibes":[],"msv":"250","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10295,"description":"","name":"City Hall","slug":"city_hall","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"community","level":3},{"id":6573,"description":"","name":"Classes / Learning","slug":"learning","parent":6295,"details":{"vibes":["interesting","interactive","family","fun"],"icon":"learning","noun":"Learning","msv":"1","sub_categories":[{"id":6291,"slug":"art"},{"id":10680,"slug":"cooking"},{"id":10502,"slug":"dj"},{"id":6312,"slug":"improv"},{"id":6343,"slug":"music"},{"id":10424,"slug":"photography"},{"id":9893,"slug":"yoga"}]},"parent_slug":"all","level":2},{"id":10499,"description":"","name":"Classical","slug":"classical","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":17420,"description":"","name":"Cleaners &amp; Laundry","slug":"clearers","parent":17360,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":17378,"description":"","name":"Cleaning &amp; Laundry","slug":"cleaning","parent":17360,"details":{"noun":"","vibes":[],"msv":"-22","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":10190,"description":"","name":"Climbing","slug":"climbing","parent":6337,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10340,"description":"","name":"Clothes","slug":"clothes","parent":6304,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10391,"description":"","name":"Club / Dance","slug":"club","parent":6570,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10184,"description":"","name":"Co-Working Space","slug":"co_working","parent":6294,"details":{"noun":"","sub_categories":[{"slug":"stay","id":6294}],"vibes":[],"msv":"300","icon":"","feature_in_app_":true,"sections":false},"parent_slug":"stay","level":3},{"id":10307,"description":"","name":"Cocktails / Spirits","slug":"cocktails_spirits","parent":6328,"details":{"noun":"","vibes":[],"msv":"900","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":9947,"description":"","name":"Coffee Shop","slug":"coffeeshop","parent":6331,"details":{"noun":"","vibes":[],"msv":"4500","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9962,"description":"","name":"Colombian","slug":"colombian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6292,"description":"","name":"Comedy","slug":"comedy","parent":6295,"details":{"noun":"Comedy","vibes":["funny","raunchy","spontaneous"],"msv":"2000","icon":"comedy","sub_categories":[{"id":6317,"slug":"stand-up"}]},"parent_slug":"entertainment","level":3},{"id":6293,"description":"Explore ways to get involved in your local community. Support local businesses, volunteer, give back, or pay it forward with these community groups and hubs of local culture. ","name":"Community","slug":"community","parent":6295,"details":{"noun":"Community","sub_categories":[{"id":10283,"slug":"church"},{"id":10295,"slug":"city_hall"},{"id":10268,"slug":"community_center"},{"id":10298,"slug":"courthouse"},{"id":10274,"slug":"library"},{"id":10289,"slug":"mosque"},{"id":10277,"slug":"museum"},{"id":10271,"slug":"non_profit"}],"msv":"2","icon":"community","vibes":["community","local","cultural","multicultural","social"],"feature_in_app_":false},"parent_slug":"all","level":2},{"id":10268,"description":"","name":"Community Center","slug":"community_center","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"community","level":3},{"id":9920,"description":"","name":"Community Garden","slug":"communitygarden","parent":6340,"details":{"noun":"","vibes":[],"msv":"30","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":17366,"description":"","name":"Company","slug":"company","parent":17360,"details":{"noun":"","vibes":[],"msv":"10","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":10595,"description":"","name":"Concert","slug":"concert","parent":10400,"details":{"noun":"Concert","sub_categories":[],"vibes":["musical","lively","together"],"msv":"33000","icon":"","feature_in_app_":false},"parent_slug":"performance","level":3},{"id":17438,"description":"","name":"Condo","slug":"condo","parent":0,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"residential","level":3},{"id":10466,"description":"","name":"Conservatory","slug":"conservatory","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":17390,"description":"","name":"Consulting","slug":"consulting","parent":17360,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":10370,"description":"","name":"Convenience Store / Bodega","slug":"convenience_store","parent":6304,"details":{"noun":"","vibes":[],"msv":"100","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":13987,"description":"","name":"Cookies","slug":"cookies","parent":6331,"details":{"noun":"","vibes":[],"msv":"200","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"food","level":3},{"id":10680,"description":"","name":"Cooking","slug":"cooking","parent":6573,"details":{"noun":"Cooking","vibes":["interesting","interactive"],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"learning","level":3},{"id":10644,"description":"","name":"Cottage","slug":"cottage","parent":6294,"details":{"noun":"Cottage","vibes":["cottage","cottagecore"],"msv":"110","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10298,"description":"","name":"Courthouse","slug":"courthouse","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"community","level":3},{"id":10310,"description":"","name":"Craft Beer","slug":"craft_beer","parent":6328,"details":{"noun":"","vibes":[],"msv":"250","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10193,"description":"","name":"CrossFit","slug":"crossfit","parent":6337,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":9965,"description":"","name":"Cuban","slug":"cuban","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10442,"description":"","name":"Cultural Museum","slug":"cultural_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":9968,"description":"","name":"Cupcakes","slug":"cupcakes","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10196,"description":"","name":"Dance","slug":"dance","parent":6337,"details":{"noun":"","vibes":[],"msv":"600","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10592,"description":"","name":"Dance","slug":"dance-performance","parent":10400,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":9971,"description":"","name":"Deli","slug":"deli","parent":6331,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":17375,"description":"","name":"Dental","slug":"dental","parent":17360,"details":{"noun":"","vibes":[],"msv":"10","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":17405,"description":"","name":"Design","slug":"design","parent":17360,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":10445,"description":"","name":"Design Museum","slug":"design_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"10","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":10343,"description":"","name":"Design/Furniture","slug":"design_furniture","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":9974,"description":"","name":"Dessert","slug":"dessert","parent":6331,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9977,"description":"","name":"Diner","slug":"diner","parent":6331,"details":{"noun":"","vibes":[],"msv":"6000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10659,"description":"","name":"Distillery","slug":"distillery","parent":6328,"details":{"noun":"Distillery","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10313,"description":"","name":"Dive Bar","slug":"dive_bar","parent":6328,"details":{"noun":"","vibes":[],"msv":"80","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10502,"description":"","name":"DJ","slug":"dj","parent":6343,"details":{"noun":"DJ","vibes":[],"msv":"30","icon":"","sub_categories":[]},"parent_slug":"learning","level":3},{"id":9980,"description":"","name":"Dominican","slug":"dominican","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9983,"description":"","name":"Donuts","slug":"donuts","parent":6331,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6328,"description":"Where to drink and enjoy beer, wine, cocktails and sober-friendly options including coffee, tea, and more. Discover drinking styles like tiki, bubbly, and sober-friendly. Beyond watering holes, check out outdoor spots, events, and tours.","name":"Drink","slug":"drink","parent":6295,"details":{"noun":"Drinking","sub_categories":[{"slug":"all","id":6295},{"id":10656,"slug":"bar"},{"id":10301,"slug":"beer_garden"},{"id":10304,"slug":"brewery"},{"id":10662,"slug":"brewpub"},{"id":9944,"slug":"cafe"},{"id":10391,"slug":"club"},{"id":10307,"slug":"cocktails_spirits"},{"id":9947,"slug":"coffeeshop"},{"id":10310,"slug":"craft_beer"},{"id":10659,"slug":"distillery"},{"id":10313,"slug":"dive_bar"},{"id":10013,"slug":"gastropub"},{"id":10319,"slug":"juice_smoothie"},{"id":10665,"slug":"lounge"},{"id":10322,"slug":"mocktails"},{"id":10668,"slug":"nightclub"},{"id":10082,"slug":"pub"},{"id":10671,"slug":"saloon"},{"id":10325,"slug":"speakeasy"},{"id":10145,"slug":"tea"},{"id":13943,"slug":"tiki"},{"id":10331,"slug":"wine_bar"},{"id":10328,"slug":"winery"}],"vibes":["fun","boozy","happy","cheap","friendly"],"msv":"9000","icon":"drink","feature_in_app_":false},"parent_slug":"all","level":2},{"id":9986,"description":"","name":"Eastern European","slug":"eastern_european","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9989,"description":"","name":"Egyptian","slug":"egyptian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10505,"description":"","name":"Electronic / Dance","slug":"electronic_dance","parent":6343,"details":{"noun":"","vibes":[],"msv":"80","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":17423,"description":"","name":"Electronics &amp; Phones","slug":"electronics","parent":17360,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":17384,"description":"","name":"Engineering","slug":"engineering","parent":17360,"details":{"noun":"","vibes":[],"msv":"10","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":9992,"description":"","name":"English","slug":"english","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9995,"description":"","name":"Ethiopian","slug":"ethiopian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6323,"description":"Explore what\'s happening in %city%. Make a plan for tonight or this weekend with your events calendar. Explore art, music, nightlife based on your vibe.","name":"Events","slug":"events","parent":0,"details":{"noun":"Events","sub_categories":[{"slug":"concert","id":10595},{"slug":"music","id":6343},{"slug":"comedy","id":6292},{"slug":"art","id":6291},{"id":13940,"slug":"attractions"},{"id":10334,"slug":"books"},{"id":6293,"slug":"community"},{"id":6328,"slug":"drink"},{"id":11658,"slug":"family"},{"id":10412,"slug":"festival"},{"id":10394,"slug":"film"},{"id":6331,"slug":"food"},{"id":6340,"slug":"outdoors"},{"id":9878,"slug":"health"}],"vibes":["local","chill","fun","unique"],"msv":"4000","icon":"events","feature_in_app_":true,"sections":false},"parent_slug":"all","level":2},{"id":10448,"description":"","name":"Experiential","slug":"experiential","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":10478,"description":"","name":"Experimental","slug":"experimental","parent":10400,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":11658,"description":"Ways to get out and have fun with your entire family","name":"Family","slug":"family","parent":0,"details":{"noun":"","vibes":["family","kidcore","children"],"msv":"800","icon":"","sub_categories":[],"feature_in_app_":false},"parent_slug":"events","level":3},{"id":9926,"description":"","name":"Farm","slug":"farm","parent":6340,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":9998,"description":"","name":"Farm to Table","slug":"farm_table","parent":6331,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10346,"description":"","name":"Farmers Market","slug":"farmers_market","parent":6304,"details":{"noun":"","vibes":[],"msv":"10000","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":15058,"description":"","name":"Fast Casual","slug":"fast_casual","parent":6331,"details":{"noun":"","vibes":[],"msv":"40","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":10412,"description":"","name":"Festival","slug":"festival","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1200","icon":"","feature_in_app_":false},"parent_slug":"events","level":3},{"id":10001,"description":"","name":"Filipino","slug":"filipino","parent":6331,"details":{"noun":"","vibes":[],"msv":"1000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10394,"description":"","name":"Film","slug":"film","parent":6291,"details":{"noun":"","vibes":[],"msv":"50","icon":"","sub_categories":[{"id":10535,"slug":"movie_theater"}]},"parent_slug":"entertainment","level":3},{"id":10451,"description":"","name":"Film Museum","slug":"film_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":17372,"description":"","name":"Financial","slug":"financial","parent":17360,"details":{"noun":"","vibes":[],"msv":"10","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":10677,"description":"","name":"Fine Dining","slug":"fine-dining","parent":6331,"details":{"noun":"Fine Dining","vibes":["elegant","luxury","fancy"],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":15067,"description":"","name":"Fishing","slug":"fishing","parent":0,"details":{"noun":"","vibes":[],"msv":"40","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":10349,"description":"","name":"Flea Market","slug":"flea_market","parent":6304,"details":{"noun":"","vibes":[],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":15079,"description":"","name":"Florist","slug":"florist","parent":6304,"details":{"noun":"","vibes":[],"msv":"80","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":17441,"description":"","name":"Flowers","slug":"flowers","parent":0,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"shop","level":3},{"id":10508,"description":"","name":"Folk / Country","slug":"folk_country","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":6331,"description":"Eat and explore culinary culture. Whether your vibe is a lively brunch, a friendly lunch, a chill breakfast, or an intimate dinner, we\'ve got you covered with the best restaurants and other places to eat, including outdoor patios, rooftop bars, and markets. You can also discover by taste, like savory, sweet, and spicy.","name":"Food","slug":"food","parent":6295,"details":{"noun":"Food","sub_categories":[{"id":9830,"slug":"afghan"},{"id":9833,"slug":"african"},{"id":9836,"slug":"albanian"},{"id":9839,"slug":"american"},{"id":9842,"slug":"argentinian"},{"id":9845,"slug":"asianfusion"},{"id":9848,"slug":"austrailian"},{"id":9851,"slug":"bagels"},{"id":9854,"slug":"bakery"},{"id":9857,"slug":"bangladeshi"},{"id":9860,"slug":"barbeque"},{"id":9863,"slug":"bistro"},{"id":9866,"slug":"bowls"},{"id":9872,"slug":"brazilian"},{"id":10674,"slug":"breakfast"},{"id":9869,"slug":"brunch"},{"id":9875,"slug":"burger"},{"id":9944,"slug":"cafe"},{"id":9950,"slug":"cambodian"},{"id":9953,"slug":"candy"},{"id":9956,"slug":"caribbean"},{"id":9959,"slug":"chinese"},{"id":17447,"slug":"chocolate"},{"id":9947,"slug":"coffeeshop"},{"id":9962,"slug":"colombian"},{"id":13987,"slug":"cookies"},{"id":9965,"slug":"cuban"},{"id":9968,"slug":"cupcakes"},{"id":9971,"slug":"deli"},{"id":9974,"slug":"dessert"},{"id":9977,"slug":"diner"},{"id":9980,"slug":"dominican"},{"id":9983,"slug":"donuts"},{"id":9986,"slug":"eastern_european"},{"id":9989,"slug":"egyptian"},{"id":9992,"slug":"english"},{"id":9995,"slug":"ethiopian"},{"id":9998,"slug":"farm_table"},{"id":10001,"slug":"filipino"},{"id":10677,"slug":"fine-dining"},{"id":10004,"slug":"food_hall"},{"id":10007,"slug":"food_truck"},{"id":10010,"slug":"french"},{"id":10013,"slug":"gastropub"},{"id":10016,"slug":"german"},{"id":10019,"slug":"greek"},{"id":10022,"slug":"hawaiian"},{"id":10025,"slug":"himalayan_nepalese_tibetan"},{"id":10028,"slug":"hungarian"},{"id":10031,"slug":"ice_cream"},{"id":10034,"slug":"indian"},{"id":10037,"slug":"italian"},{"id":10040,"slug":"jamaican"},{"id":10043,"slug":"japanese"},{"id":10046,"slug":"korean"},{"id":10049,"slug":"latin_american"},{"id":10052,"slug":"mediterranean"},{"id":10055,"slug":"mexican"},{"id":10058,"slug":"middle_eastern"},{"id":10061,"slug":"modern_european"},{"id":10064,"slug":"moroccan"},{"id":10067,"slug":"new_zealand"},{"id":10070,"slug":"pakastani"},{"id":10073,"slug":"persian"},{"id":10076,"slug":"peruvian"},{"id":10079,"slug":"pizza"},{"id":10082,"slug":"pub"},{"id":10085,"slug":"ramen"},{"id":13934,"slug":"restaurant"},{"id":10088,"slug":"romanian"},{"id":10091,"slug":"russian"},{"id":13937,"slug":"salad"},{"id":10094,"slug":"sandwiches"},{"id":10097,"slug":"scandinavian"},{"id":10100,"slug":"seafood"},{"id":10103,"slug":"senegalese"},{"id":10106,"slug":"singaporean"},{"id":10109,"slug":"small_plates"},{"id":10112,"slug":"soul_southern"},{"id":10115,"slug":"soup"},{"id":10118,"slug":"south_african"},{"id":10121,"slug":"south_american"},{"id":10124,"slug":"southeast_asian"},{"id":10127,"slug":"spanish"},{"id":10130,"slug":"steakhouse"},{"id":10133,"slug":"sushi"},{"id":10136,"slug":"tacos"},{"id":10142,"slug":"tapas"},{"id":10145,"slug":"tea"},{"id":10148,"slug":"thai"},{"id":10139,"slug":"tiawanese"},{"id":10151,"slug":"turkish"},{"id":10154,"slug":"uzbek"},{"id":10157,"slug":"vegan"},{"id":10160,"slug":"vegetarian"},{"id":10163,"slug":"vietnamese"},{"id":15052,"slug":"wings"}],"vibes":["local","foodie","authentic","new","spicy","sweet","popup"],"msv":"15000","icon":"food","feature_in_app_":false},"parent_slug":"all","level":2},{"id":10004,"description":"","name":"Food Hall","slug":"food_hall","parent":6331,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":15087,"description":"","name":"Food Market","slug":"food_market","parent":6304,"details":{"noun":"","vibes":[],"msv":"80","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":10007,"description":"","name":"Food Truck / Cart","slug":"food_truck","parent":6331,"details":{"noun":"","vibes":[],"msv":"3600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10352,"description":"","name":"Fragrance","slug":"fragrance","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10010,"description":"","name":"French","slug":"french","parent":6331,"details":{"noun":"","vibes":[],"msv":"300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":15055,"description":"","name":"Fries","slug":"fries","parent":6331,"details":{"noun":"","vibes":[],"msv":"100","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":6307,"description":"","name":"Gallery","slug":"gallery","parent":6291,"details":{"vibes":["small","local","community"],"noun":"","sub_categories":[],"msv":"600","icon":"","feature_in_app_":true},"parent_slug":"art","level":3},{"id":9905,"description":"","name":"Garden","slug":"garden","parent":6340,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"2400","icon":"","feature_in_app_":true},"parent_slug":"outdoors","level":3},{"id":10013,"description":"","name":"Gastropub","slug":"gastropub","parent":6331,"details":{"noun":"","vibes":[],"msv":"260","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10016,"description":"","name":"German","slug":"german","parent":6331,"details":{"noun":"","vibes":[],"msv":"50","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10598,"description":"","name":"Gift","slug":"gift","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":15070,"description":"","name":"Golf","slug":"golf","parent":6337,"details":{"noun":"","vibes":[],"msv":"80","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":17399,"description":"","name":"Government Agency","slug":"government_agency","parent":17360,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"social-services","level":3},{"id":10019,"description":"","name":"Greek","slug":"greek","parent":6331,"details":{"noun":"","vibes":[],"msv":"200","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10337,"description":"","name":"Groceries","slug":"groceries","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10647,"description":"","name":"Guest house","slug":"guest-house","parent":6294,"details":{"noun":"Guest house","vibes":[],"msv":"110","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10199,"description":"","name":"Gym","slug":"gym","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10211,"description":"","name":"Gymnastics","slug":"gymnastics","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":17408,"description":"","name":"Hair removal","slug":"hair-removal","parent":17360,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":10557,"description":"","name":"Hair Salon","slug":"hair","parent":9884,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"beauty","level":3},{"id":10022,"description":"","name":"Hawaiian","slug":"hawaiian","parent":6331,"details":{"noun":"","vibes":[],"msv":"100","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10376,"description":"","name":"Health Food Store","slug":"health_food","parent":6304,"details":{"noun":"","vibes":[],"msv":"20","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10202,"description":"","name":"Hike","slug":"hike-games","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":9935,"description":"","name":"Hiking","slug":"hike","parent":6340,"details":{"noun":"Hiking","sub_categories":[],"vibes":["hiking"],"msv":"8000","icon":"","feature_in_app_":true},"parent_slug":"outdoors","level":3},{"id":10025,"description":"","name":"Himalayan/Nepalese/Tibetan","slug":"himalayan_nepalese_tibetan","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10511,"description":"","name":"Hip Hop / Rap","slug":"hiphop_rap","parent":6343,"details":{"noun":"","vibes":[],"msv":"100","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10454,"description":"","name":"History Museum","slug":"history_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"500","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":10355,"description":"","name":"Home &amp; Garden","slug":"home_garden","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10175,"description":"","name":"Home share (AirBNB, VRBO, etc.)","slug":"home_share","parent":6294,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10169,"description":"","name":"Hostel","slug":"hostel","parent":6294,"details":{"noun":"","vibes":[],"msv":"4000","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10166,"description":"","name":"Hotel","slug":"hotels","parent":6294,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1400","icon":"","feature_in_app_":true},"parent_slug":"stay","level":3},{"id":10028,"description":"","name":"Hungarian","slug":"hungarian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10031,"description":"","name":"Ice Cream","slug":"ice_cream","parent":6331,"details":{"noun":"","vibes":[],"msv":"3600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10214,"description":"","name":"Ice Skating","slug":"ice_skating","parent":6337,"details":{"noun":"","vibes":[],"msv":"80","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":6312,"description":"","name":"Improv","slug":"improv","parent":6292,"details":{"msv":"480","noun":"","vibes":[],"icon":"","sub_categories":[]},"parent_slug":"learning","level":3},{"id":10481,"description":"","name":"Improv","slug":"improv-performance","parent":10400,"details":{"noun":"","vibes":[],"msv":"480","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10034,"description":"","name":"Indian","slug":"indian","parent":6331,"details":{"noun":"","vibes":[],"msv":"300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10635,"description":"","name":"Inn","slug":"inn","parent":6294,"details":{"noun":"Inn","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10514,"description":"","name":"Instrumental","slug":"instrumental","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":17363,"description":"","name":"Insurance","slug":"insurance","parent":17360,"details":{"noun":"","vibes":[],"msv":"10","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":10421,"description":"","name":"Interactive","slug":"interactive","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"10","icon":"","feature_in_app_":false},"parent_slug":"entertainment","level":3},{"id":10037,"description":"","name":"Italian","slug":"italian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9899,"description":"","name":"IV Therapy","slug":"ivtherapy","parent":9878,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10040,"description":"","name":"Jamaican","slug":"jamaican","parent":6331,"details":{"noun":"","vibes":[],"msv":"260","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10043,"description":"","name":"Japanese","slug":"japanese","parent":6331,"details":{"noun":"","vibes":[],"msv":"900","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10517,"description":"","name":"Jazz","slug":"jazz","parent":6343,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10358,"description":"","name":"Jewelry","slug":"jewelry","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10319,"description":"","name":"Juice / Smoothie","slug":"juice_smoothie","parent":6328,"details":{"noun":"","vibes":[],"msv":"140","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10520,"description":"","name":"Karaoke","slug":"karaoke","parent":6343,"details":{"noun":"","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10361,"description":"","name":"Kids","slug":"kids","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[{"id":10364,"slug":"childrens_clothing"},{"id":10367,"slug":"toy_store"}]},"parent_slug":"shop","level":3},{"id":10589,"description":"","name":"Kids","slug":"kids-performance","parent":10400,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10586,"description":"","name":"Kids","slug":"kids-music","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10046,"description":"","name":"Korean","slug":"korean","parent":6331,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10250,"description":"","name":"Landmark","slug":"landmark","parent":6298,"details":{"noun":"","vibes":[],"msv":"2900","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":10217,"description":"","name":"Laser Tag","slug":"laser_tag","parent":6337,"details":{"noun":"","vibes":[],"msv":"700","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10049,"description":"","name":"Latin American","slug":"latin_american","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10274,"description":"","name":"Library","slug":"library","parent":6293,"details":{"noun":"","vibes":[],"msv":"14000","icon":"","sub_categories":[]},"parent_slug":"community","level":3},{"id":10653,"description":"","name":"Lodge","slug":"lodge","parent":0,"details":{"noun":"Lodge","vibes":["rustic","cozy"],"msv":"20","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10665,"description":"","name":"Lounge","slug":"lounge","parent":6328,"details":{"noun":"Lounge","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10484,"description":"","name":"Magic","slug":"magic","parent":10400,"details":{"noun":"","vibes":[],"msv":"200","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":11244,"description":"","name":"Mall","slug":"mall","parent":6304,"details":{"noun":"","vibes":[],"msv":"1000","icon":"","parent_categories":false,"sub_categories":[]}},{"id":9887,"description":"","name":"Massage","slug":"massage","parent":9878,"details":{"noun":"","vibes":[],"msv":"8000","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":9890,"description":"","name":"Meditation","slug":"meditation","parent":9878,"details":{"noun":"","vibes":[],"msv":"390","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10052,"description":"","name":"Mediterranean","slug":"mediterranean","parent":6331,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10055,"description":"","name":"Mexican","slug":"mexican","parent":6331,"details":{"noun":"","vibes":[],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10058,"description":"","name":"Middle Eastern","slug":"middle_eastern","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10220,"description":"","name":"Miniature Golf","slug":"minature_golf","parent":6337,"details":{"noun":"","vibes":[],"msv":"700","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10322,"description":"","name":"Mocktails","slug":"mocktails","parent":6328,"details":{"noun":"","vibes":[],"msv":"40","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10061,"description":"","name":"Modern European","slug":"modern_european","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10064,"description":"","name":"Moroccan","slug":"moroccan","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10289,"description":"","name":"Mosque","slug":"mosque","parent":6293,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"community","level":3},{"id":10632,"description":"","name":"Motel","slug":"motel","parent":6294,"details":{"noun":"Motel","sub_categories":[],"vibes":[],"msv":"18000","icon":"","feature_in_app_":false},"parent_slug":"stay","level":3},{"id":10535,"description":"","name":"Movie Theater","slug":"movie_theater","parent":10394,"details":{"noun":"","vibes":[],"msv":"10000","icon":"","sub_categories":[]},"parent_slug":"film","level":3},{"id":10256,"description":"","name":"Mural","slug":"mural","parent":6298,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":10277,"description":"","name":"Museum","slug":"museum","parent":6293,"details":{"noun":"","sub_categories":[{"id":10436,"slug":"aquarium"},{"id":10439,"slug":"children_museum"},{"id":10466,"slug":"conservatory"},{"id":10442,"slug":"cultural_museum"},{"id":10445,"slug":"design_museum"},{"id":10448,"slug":"experiential"},{"id":10451,"slug":"film_museum"},{"id":10454,"slug":"history_museum"},{"id":10463,"slug":"planetarium"},{"id":10457,"slug":"visitor_center"},{"id":10460,"slug":"zoo"}],"vibes":[],"msv":"800","icon":"","feature_in_app_":true},"parent_slug":"community","level":3},{"id":6343,"description":"","name":"Music","slug":"music","parent":6295,"details":{"vibes":["local","popular","jazzy","lit","shimmy"],"noun":"Music","sub_categories":[{"id":10499,"slug":"classical"},{"id":10502,"slug":"dj"},{"id":10505,"slug":"electronic_dance"},{"id":10508,"slug":"folk_country"},{"id":10511,"slug":"hiphop_rap"},{"id":10514,"slug":"instrumental"},{"id":10517,"slug":"jazz"},{"id":10520,"slug":"karaoke"},{"id":10586,"slug":"kids-music"},{"id":10523,"slug":"r_b"},{"id":10526,"slug":"rock_indie"},{"id":10529,"slug":"soul_funk"},{"id":10532,"slug":"world_international"}],"msv":"1300","icon":"music","feature_in_app_":false},"parent_slug":"entertainment","level":3},{"id":10580,"description":"","name":"Music Shop","slug":"music-store","parent":6304,"details":{"noun":"","sub_categories":[{"id":10583,"slug":"record-store"}],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"shop","level":3},{"id":10487,"description":"","name":"Musical","slug":"musical","parent":10400,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10554,"description":"","name":"Nail Salon","slug":"nails","parent":9884,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"beauty","level":3},{"id":9938,"description":"","name":"Natural Area","slug":"natural_area","parent":6340,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10067,"description":"","name":"New Zealand","slug":"new_zealand","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10388,"description":"","name":"Night Market","slug":"night_market","parent":6304,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10668,"description":"","name":"Nightclub","slug":"nightclub","parent":6328,"details":{"noun":"Nightclub","vibes":["latenight","after-party","party"],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"nightlife","level":3},{"id":6570,"description":"","name":"Nightlife","slug":"nightlife","parent":6295,"details":{"vibes":["latenight","lit","musical","buzzing","boozy"],"noun":"Nightlife","sub_categories":[{"id":10391,"slug":"club"},{"id":10668,"slug":"nightclub"},{"id":10325,"slug":"speakeasy"}],"msv":"12000","icon":"nightlife","feature_in_app_":false},"parent_slug":"entertainment","level":3},{"id":10271,"description":"","name":"Non-Profit Organization","slug":"non_profit","parent":6293,"details":{"noun":"","sub_categories":[{"slug":"community","id":6293}],"vibes":[],"msv":"1","icon":"","feature_in_app_":true,"sections":false},"parent_slug":"community","level":3},{"id":15073,"description":"","name":"Nursery","slug":"nursery","parent":10355,"details":{"noun":"","vibes":[],"msv":"10","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":10490,"description":"","name":"Opera","slug":"opera","parent":10400,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":15076,"description":"","name":"Orchard","slug":"orchard","parent":6298,"details":{"noun":"","vibes":[],"msv":"20","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":6340,"description":"","name":"Outdoors","slug":"outdoors","parent":6295,"details":{"noun":"Outdoors","sub_categories":[{"id":9917,"slug":"arboretum"},{"id":9932,"slug":"beach"},{"id":9929,"slug":"botanicalgarden"},{"id":10638,"slug":"cabin"},{"id":9941,"slug":"cemetery"},{"id":9920,"slug":"communitygarden"},{"id":9926,"slug":"farm"},{"id":9905,"slug":"garden"},{"id":9935,"slug":"hike"},{"id":9938,"slug":"natural_area"},{"id":9908,"slug":"park"},{"id":9911,"slug":"playground"},{"id":9914,"slug":"plaza"},{"id":9923,"slug":"urbanfarm"}],"vibes":["fun","mindful","sunny","adventurous","relaxing"],"msv":"110","icon":"outdoors","feature_in_app_":false},"parent_slug":"all","level":2},{"id":15082,"description":"","name":"Outlet","slug":"outlet","parent":6304,"details":{"noun":"","vibes":[],"msv":"40","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":10238,"description":"","name":"Paint Ball","slug":"paint_ball","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10070,"description":"","name":"Pakastani","slug":"pakastani","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9908,"description":"","name":"Park","slug":"park","parent":6340,"details":{"noun":"","vibes":[],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10400,"description":"","name":"Performance","slug":"performance","parent":6291,"details":{"noun":"Performing Arts","sub_categories":[{"id":10469,"slug":"burlesque"},{"id":10472,"slug":"caberet"},{"id":10475,"slug":"circus"},{"id":6292,"slug":"comedy"},{"id":10595,"slug":"concert"},{"id":10592,"slug":"dance-performance"},{"id":10478,"slug":"experimental"},{"id":10481,"slug":"improv-performance"},{"id":10589,"slug":"kids-performance"},{"id":10484,"slug":"magic"},{"id":10487,"slug":"musical"},{"id":10490,"slug":"opera"},{"id":10493,"slug":"reading_lecture"},{"id":10397,"slug":"theater"}],"vibes":[],"msv":"40","icon":"","feature_in_app_":true},"parent_slug":"entertainment","level":3},{"id":10073,"description":"","name":"Persian","slug":"persian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10076,"description":"","name":"Peruvian","slug":"peruvian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10424,"description":"","name":"Photography","slug":"photography","parent":6291,"details":{"noun":"Photography","vibes":[],"msv":"260","icon":"","sub_categories":[]},"parent_slug":"learning","level":3},{"id":10205,"description":"","name":"Pilates","slug":"pilates","parent":6337,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10079,"description":"","name":"Pizza","slug":"pizza","parent":6331,"details":{"noun":"","vibes":[],"msv":"8000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10463,"description":"","name":"Planetarium","slug":"planetarium","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":9911,"description":"","name":"Playground","slug":"playground","parent":6340,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":9914,"description":"","name":"Plaza","slug":"plaza","parent":6340,"details":{"noun":"","vibes":[],"msv":"140","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10223,"description":"","name":"Pool","slug":"pool","parent":6337,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10430,"description":"","name":"Print Shop","slug":"print_shop","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"art","level":3},{"id":17402,"description":"","name":"Property Management","slug":"property_management","parent":17360,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":10082,"description":"","name":"Pub","slug":"pub","parent":6331,"details":{"noun":"","vibes":[],"msv":"480","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10259,"description":"","name":"Public Art","slug":"public_art","parent":6298,"details":{"noun":"","vibes":[],"msv":"90","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":10523,"description":"","name":"R&amp;B","slug":"r_b","parent":6343,"details":{"noun":"","vibes":[],"msv":"10","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10085,"description":"","name":"Ramen","slug":"ramen","parent":6331,"details":{"noun":"","vibes":[],"msv":"6000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10493,"description":"","name":"Reading / Lecture","slug":"reading_lecture","parent":10400,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":17381,"description":"","name":"Real Estate","slug":"real-estate","parent":17360,"details":{"noun":"","vibes":[],"msv":"20","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"services","level":3},{"id":10583,"description":"","name":"Record Store","slug":"record-store","parent":10580,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music-store","level":3},{"id":10244,"description":"","name":"Recreation Center","slug":"recreation_center","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":17426,"description":"","name":"Residential","slug":"residential","parent":6295,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[{"id":17429,"slug":"senior-living"},{"id":17435,"slug":"apartment"},{"id":17438,"slug":"condo"}],"sections":false},"parent_slug":"all","level":2},{"id":10178,"description":"","name":"Resort","slug":"resort","parent":6294,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":13934,"description":"","name":"Restaurant","slug":"restaurant","parent":6331,"details":{"noun":"Restaurant","vibes":[],"msv":"2000","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"food","level":3},{"id":9902,"description":"","name":"Retreat","slug":"retreat","parent":9878,"details":{"noun":"","vibes":[],"msv":"140","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10526,"description":"","name":"Rock / Indie","slug":"rock_indie","parent":6343,"details":{"noun":"","vibes":[],"msv":"50","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10226,"description":"","name":"Rock Climbing","slug":"rock_climbing","parent":6337,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10088,"description":"","name":"Romanian","slug":"romanian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10091,"description":"","name":"Russian","slug":"russian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":13937,"description":"","name":"Salad","slug":"salad","parent":6331,"details":{"noun":"Salad","vibes":["vegan","vegetarian","healthy"],"msv":"200","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"food","level":3},{"id":10671,"description":"","name":"Saloon","slug":"saloon","parent":6328,"details":{"noun":"Saloon","vibes":["oldschool","boozy","wild"],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10094,"description":"","name":"Sandwiches","slug":"sandwiches","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10097,"description":"","name":"Scandinavian","slug":"scandinavian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10100,"description":"","name":"Seafood","slug":"seafood","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10103,"description":"","name":"Senegalese","slug":"senegalese","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":17360,"description":"","name":"Services","slug":"services","parent":6295,"details":{"noun":"","vibes":[],"msv":"1000","icon":"","feature_in_app_":false,"sub_categories":[{"id":17411,"slug":"animal_care"},{"id":17414,"slug":"architecture"},{"id":17417,"slug":"bank"},{"id":17396,"slug":"chiropractic"},{"id":17420,"slug":"clearers"},{"id":17378,"slug":"cleaning"},{"id":10184,"slug":"co_working"},{"id":17366,"slug":"company"},{"id":17390,"slug":"consulting"},{"id":17375,"slug":"dental"},{"id":17405,"slug":"design"},{"id":17423,"slug":"electronics"},{"id":17384,"slug":"engineering"},{"id":17372,"slug":"financial"},{"id":17408,"slug":"hair-removal"},{"id":17363,"slug":"insurance"},{"id":10271,"slug":"non_profit"},{"id":17402,"slug":"property_management"},{"id":17381,"slug":"real-estate"}],"sections":false},"parent_slug":"all","level":2},{"id":6304,"description":"","name":"Shopping","slug":"shop","parent":6295,"details":{"noun":"Shopping","sub_categories":[{"slug":"all","id":6295},{"id":17432,"slug":"alcohol"},{"id":10379,"slug":"antique"},{"id":12600,"slug":"automobiles"},{"id":10334,"slug":"books"},{"id":10566,"slug":"cannabis"},{"id":17447,"slug":"chocolate"},{"id":10340,"slug":"clothes"},{"id":10370,"slug":"convenience_store"},{"id":10343,"slug":"design_furniture"},{"id":17423,"slug":"electronics"},{"id":10346,"slug":"farmers_market"},{"id":10349,"slug":"flea_market"},{"id":17441,"slug":"flowers"},{"id":10352,"slug":"fragrance"},{"id":10598,"slug":"gift"},{"id":10337,"slug":"groceries"},{"id":10376,"slug":"health_food"},{"id":10355,"slug":"home_garden"},{"id":10358,"slug":"jewelry"},{"id":10361,"slug":"kids"},{"id":10580,"slug":"music-store"},{"id":10388,"slug":"night_market"},{"id":10373,"slug":"specialty_foods"},{"id":10241,"slug":"sporting_rental"},{"id":10382,"slug":"thrift_store"},{"id":10385,"slug":"vintage"},{"id":17444,"slug":"suplements"}],"vibes":["local","popup","vintage","thrift"],"msv":"4400","icon":"shopping","feature_in_app_":false,"sections":false},"parent_slug":"all","level":2},{"id":10292,"description":"","name":"Shrine","slug":"shrine","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","parent_categories":[],"sub_categories":[]}},{"id":10106,"description":"","name":"Singaporean","slug":"singaporean","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10232,"description":"","name":"Skating","slug":"skating","parent":6337,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10109,"description":"","name":"Small Plates","slug":"small_plates","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"40","icon":"","feature_in_app_":true},"parent_slug":"food","level":3},{"id":17393,"description":"","name":"Social Services","slug":"social-services","parent":17360,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[{"id":17399,"slug":"government_agency"}]}},{"id":17387,"description":"","name":"Software","slug":"software","parent":17360,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[{"slug":"services","id":17360}],"sections":false}},{"id":10529,"description":"","name":"Soul / Funk","slug":"soul_funk","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10112,"description":"","name":"Soul / Southern","slug":"soul_southern","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10115,"description":"","name":"Soup","slug":"soup","parent":6331,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10118,"description":"","name":"South African","slug":"south_african","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"food","level":3},{"id":10121,"description":"","name":"South American","slug":"south_american","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10124,"description":"","name":"Southeast Asian","slug":"southeast_asian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9896,"description":"","name":"Spa","slug":"spa","parent":9878,"details":{"noun":"","vibes":[],"msv":"600","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10127,"description":"","name":"Spanish","slug":"spanish","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10325,"description":"","name":"Speakeasy","slug":"speakeasy","parent":6328,"details":{"noun":"","vibes":[],"msv":"5400","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10373,"description":"","name":"Specialty Food Store","slug":"specialty_foods","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10208,"description":"","name":"Spin / Cycle","slug":"spin_cycle","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10241,"description":"","name":"Sporting Goods","slug":"sporting_rental","parent":6337,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"100","icon":"","feature_in_app_":false},"parent_slug":"games","level":3},{"id":6337,"description":"","name":"Sports &amp; Fitness","slug":"games","parent":6295,"details":{"noun":"Sports & Fitness","sub_categories":[{"slug":"all","id":6295},{"id":10235,"slug":"bowling"},{"id":10187,"slug":"boxing"},{"id":10190,"slug":"climbing"},{"id":10193,"slug":"crossfit"},{"id":10196,"slug":"dance"},{"id":10199,"slug":"gym"},{"id":10211,"slug":"gymnastics"},{"id":10202,"slug":"hike-games"},{"id":10214,"slug":"ice_skating"},{"id":10217,"slug":"laser_tag"},{"id":10220,"slug":"minature_golf"},{"id":10238,"slug":"paint_ball"},{"id":10205,"slug":"pilates"},{"id":10223,"slug":"pool"},{"id":10244,"slug":"recreation_center"},{"id":10226,"slug":"rock_climbing"},{"id":10232,"slug":"skating"},{"id":10208,"slug":"spin_cycle"},{"id":10241,"slug":"sporting_rental"},{"id":10229,"slug":"tennis"},{"id":9893,"slug":"yoga"}],"vibes":["healthy","adventurous","social","fun","local","playtime","inclusive","alternative"],"msv":"2000","icon":"health","feature_in_app_":true,"sections":false},"parent_slug":"all","level":2},{"id":6317,"description":"","name":"Stand up","slug":"stand-up","parent":6292,"details":{"msv":"170","sub_categories":[],"vibes":[]},"parent_slug":"comedy","level":3},{"id":10253,"description":"","name":"Statue","slug":"statue","parent":6298,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":6294,"description":"Explore the best places to stay in %city%. From hotels to guest houses, bed and breakfasts there are great places to stay downtown or in nearby neighborhoods. There\'s a cozy, adventurous, fun, modern, luxury place to stay that will match your vibe. Plan your visit and book discounted stays with your partner sites.","name":"Stay","slug":"stay","parent":6295,"details":{"noun":"Hotels","sub_categories":[{"id":10181,"slug":"bed_breakfast"},{"id":10638,"slug":"cabin"},{"id":10172,"slug":"campground"},{"id":10184,"slug":"co_working"},{"id":10644,"slug":"cottage"},{"id":10647,"slug":"guest-house"},{"id":10175,"slug":"home_share"},{"id":10169,"slug":"hostel"},{"id":10166,"slug":"hotels"},{"id":10635,"slug":"inn"},{"id":10653,"slug":"lodge"},{"id":10632,"slug":"motel"},{"id":10178,"slug":"resort"},{"id":10650,"slug":"vacation-rental"},{"id":10641,"slug":"villa"}],"msv":"5000","icon":"hotel","vibes":["boutique","local","luxury","design","cheap","minimalist"],"feature_in_app_":false,"sections":false},"parent_slug":"all","level":2},{"id":10130,"description":"","name":"Steakhouse","slug":"steakhouse","parent":6331,"details":{"noun":"","vibes":[],"msv":"9000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10427,"description":"","name":"Studio","slug":"studio","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"art","level":3},{"id":10133,"description":"","name":"Sushi","slug":"sushi","parent":6331,"details":{"noun":"","vibes":[],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10136,"description":"","name":"Tacos","slug":"tacos","parent":6331,"details":{"noun":"","vibes":[],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10142,"description":"","name":"Tapas","slug":"tapas","parent":6331,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10563,"description":"","name":"Tattoo Parlor","slug":"tattoo_parlor","parent":9884,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"beauty","level":3},{"id":10145,"description":"","name":"Tea","slug":"tea","parent":6328,"details":{"noun":"Tea","vibes":[],"msv":"1000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10286,"description":"","name":"Temple","slug":"temple","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","parent_categories":[],"sub_categories":[]}},{"id":10229,"description":"","name":"Tennis","slug":"tennis","parent":6337,"details":{"noun":"","vibes":[],"msv":"700","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10148,"description":"","name":"Thai","slug":"thai","parent":6331,"details":{"noun":"","vibes":[],"msv":"2900","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10397,"description":"","name":"Theater","slug":"theater","parent":6291,"details":{"noun":"","sub_categories":[{"id":10496,"slug":"broadway"}],"vibes":[],"msv":"6600","icon":"","feature_in_app_":true},"parent_slug":"performance","level":3},{"id":10382,"description":"","name":"Thrift Store","slug":"thrift_store","parent":6304,"details":{"noun":"","vibes":[],"msv":"6600","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10139,"description":"","name":"Tiawanese","slug":"tiawanese","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":13943,"description":"","name":"Tiki Bar","slug":"tiki","parent":6328,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"drink","level":3},{"id":10247,"description":"","name":"Tour","slug":"tour","parent":6298,"details":{"noun":"","vibes":[],"msv":"9900","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":10265,"description":"","name":"Tourist Destination","slug":"tourist_destination","parent":6298,"details":{"noun":"","sub_categories":[{"slug":"visit","id":6298}],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"visit","level":3},{"id":10367,"description":"","name":"Toy Store","slug":"toy_store","parent":10361,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"kids","level":3},{"id":10151,"description":"","name":"Turkish","slug":"turkish","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9923,"description":"","name":"Urban Farm","slug":"urbanfarm","parent":6340,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10154,"description":"","name":"Uzbek","slug":"uzbek","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10650,"description":"","name":"Vacation Rental","slug":"vacation-rental","parent":6294,"details":{"noun":"Vacation Rental","vibes":[],"msv":"900","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10157,"description":"","name":"Vegan","slug":"vegan","parent":6331,"details":{"noun":"","vibes":[],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10160,"description":"","name":"Vegetarian","slug":"vegetarian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10163,"description":"","name":"Vietnamese","slug":"vietnamese","parent":6331,"details":{"noun":"","vibes":[],"msv":"390","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10641,"description":"","name":"Villa","slug":"villa","parent":6294,"details":{"noun":"Villa","vibes":["luxury","relaxing"],"msv":"210","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10385,"description":"","name":"Vintage Store","slug":"vintage","parent":6304,"details":{"noun":"","vibes":[],"msv":"390","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":6298,"description":"Visitors guide to the best of %city%. Discover culture, history, and landmarks while having a fun, memorable time sightseeing and exploring. We\'ve collected must see spots and favorite for tourist and locals alike. Plan your trip or weekend getaway and book these attractions for free or at a discount.","name":"Visit","slug":"visit","parent":6295,"details":{"noun":"Attractions","sub_categories":[{"id":10262,"slug":"amusement_park"},{"id":10436,"slug":"aquarium"},{"id":10250,"slug":"landmark"},{"id":10256,"slug":"mural"},{"id":10277,"slug":"museum"},{"id":10259,"slug":"public_art"},{"id":10253,"slug":"statue"},{"id":10247,"slug":"tour"},{"id":10265,"slug":"tourist_destination"},{"id":10460,"slug":"zoo"}],"vibes":["popular","scenic","family","artsy","historic","upscale","weekend","aquatic","botanical","cheap","cultural","dreamy","healthy","lgbtq","local","relaxing","sunny","tropical","urban","fun","tourist","cool"],"msv":"5500","icon":"visitLogo","feature_in_app_":false,"sections":false},"parent_slug":"all","level":2},{"id":10457,"description":"","name":"Visitor Center","slug":"visitor_center","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":17444,"description":"","name":"Vitamins &amp; Suplements","slug":"suplements","parent":0,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"shop","level":3},{"id":9878,"description":"","name":"Wellness","slug":"health","parent":6295,"details":{"noun":"Health & Wellness","sub_categories":[{"id":9881,"slug":"acupuncture"},{"id":9884,"slug":"beauty"},{"id":10566,"slug":"cannabis"},{"id":9899,"slug":"ivtherapy"},{"id":9887,"slug":"massage"},{"id":9890,"slug":"meditation"},{"id":9902,"slug":"retreat"},{"id":9896,"slug":"spa"},{"id":9893,"slug":"yoga"}],"vibes":[],"msv":"4000","icon":"","feature_in_app_":false,"sections":false},"parent_slug":"all","level":2},{"id":10331,"description":"","name":"Wine Bar","slug":"wine_bar","parent":6328,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10328,"description":"","name":"Winery","slug":"winery","parent":6328,"details":{"noun":"","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":15052,"description":"","name":"Wings","slug":"wings","parent":6331,"details":{"noun":"","vibes":[],"msv":"400","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"food","level":3},{"id":10532,"description":"","name":"World / International","slug":"world_international","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":9893,"description":"","name":"Yoga","slug":"yoga","parent":9878,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10460,"description":"","name":"Zoo","slug":"zoo","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"20000","icon":""},"parent_slug":"visit","level":3}]}');

/***/ }),

/***/ "./node_modules/vibemap-constants/dist/activityCategories.zip.json":
/*!*************************************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/activityCategories.zip.json ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "id|description|name|Active+Senior+Living|slug|senior-living|parent|details|noun|vibes|msv|1|icon|feature_in_app_|sub_categories|sections|parent_slug|residential|level|Acupuncture|acupuncture|1300|health|Adult+Entertainment|adult_entertainment|80|parent_categories|Afghan|afghan|food|African|african|10|Albanian|albanian|Alcohol|alcohol|shop|Discover+the+best+things+to+do+in+%25city%25,+based+on+your+vibe.+Guides,+events,+activities,+and+more+to+help+you+plan+a+visit+or+weekend.+Whether+you’re+a+first+time+visitor+or+long-time+local,+we'll+recommend+something+fun+and+interesting.|All|all|Things+to+do|visit|drink|outdoors|community|events|learning|entertainment|services|games|stay|100000|allLogo|dreamy|creative|fun|local|new|amazing|family|trending|classic|adventurous|American+/+New+American|american|200|Amusement+Park|amusement_park|Animal+Care|animal_care|Antique+Store|antique|400|Apartment|apartment|Aquarium|aquarium|2000|Arboretum|arboretum|600|Arcade|arcade|3000|Architecture|architecture|Argentinian|argentinian|Art|art|2400|art_museum|arts_organization|gallery|photography|print_shop|studio|artsy|inspired|Art+Museum|8000|Arts+&amp;+Entertainment|Entertainment|interesting|popular|lively|musical|500|casino|comedy|festival|film|interactive|museum|music|nightclub|nightlife|performance|theater|Arts+Organization|Asian+Fusion|asianfusion|170|Attractions|attractions|100|Austrailian|austrailian|Cars,+automobiles,+and+motorcycles|Automobiles|automobiles|20|Bagels|bagels|Bakery|bakery|Bangladeshi|bangladeshi|Bank|bank|Bar|bar|drinking|boozy|18000|Barbeque|barbeque|1900|Barber+Shop|barber|beauty|Beach|beach|22000|Beauty|hair|nails|tattoo_parlor|Bed+&amp;+Breakfast|bed_breakfast|1600|Beer+Garden|beer_garden|Bistro|bistro|Boats|boats|40|Books|books|720|Botanical+Garden|botanicalgarden|320|Bowling|bowling|4000|Bowls|bowls|Boxing|boxing|700|Brazilian|brazilian|Breakfast|breakfast|12000|Brewery|brewery|Brewpub|brewpub|Broadway|broadway|Brunch|brunch|15000|Buffet|buffet|Burger|burger|Burlesque|burlesque|300|Caberet|caberet|Cabin|cabin|outdoorsy|natural|cottagecore|cottage|Cafe|cafe|Cambodian|cambodian|Campground|campground|1000|Candy|candy|250|Cannabis|cannabis|Caribbean|caribbean|Casino|Cemetery|cemetery|Children's+Clothing+Store|childrens_clothing|kids|Children's+Museum|children_museum|Chinese|chinese|Chiropractic|chiropractic|Chocolate|chocolate|Church|church|Circus|circus|City+Hall|city_hall|Classes+/+Learning|Learning|cooking|dj|improv|yoga|Classical|classical|Cleaners+&amp;+Laundry|clearers|Cleaning+&amp;+Laundry|cleaning|-22|Climbing|climbing|Clothes|clothes|Club+/+Dance|club|Co-Working+Space|co_working|Cocktails+/+Spirits|cocktails_spirits|900|Coffee+Shop|coffeeshop|4500|Colombian|colombian|Comedy|funny|raunchy|spontaneous|stand-up|Explore+ways+to+get+involved+in+your+local+community.+Support+local+businesses,+volunteer,+give+back,+or+pay+it+forward+with+these+community+groups+and+hubs+of+local+culture.+|Community|community_center|courthouse|library|mosque|non_profit|2|cultural|multicultural|social|Community+Center|Community+Garden|communitygarden|30|Company|company|Concert|concert|together|33000|Condo|condo|Conservatory|conservatory|Consulting|consulting|Convenience+Store+/+Bodega|convenience_store|Cookies|cookies|Cooking|Cottage|110|Courthouse|Craft+Beer|craft_beer|CrossFit|crossfit|Cuban|cuban|Cultural+Museum|cultural_museum|Cupcakes|cupcakes|Dance|dance|dance-performance|Deli|deli|Dental|dental|Design|design|Design+Museum|design_museum|Design/Furniture|design_furniture|Dessert|dessert|Diner|diner|6000|Distillery|distillery|Dive+Bar|dive_bar|DJ|Dominican|dominican|Donuts|donuts|Where+to+drink+and+enjoy+beer,+wine,+cocktails+and+sober-friendly+options+including+coffee,+tea,+and+more.+Discover+drinking+styles+like+tiki,+bubbly,+and+sober-friendly.+Beyond+watering+holes,+check+out+outdoor+spots,+events,+and+tours.|Drink|Drinking|gastropub|juice_smoothie|lounge|mocktails|pub|saloon|speakeasy|tea|tiki|wine_bar|winery|happy|cheap|friendly|9000|Eastern+European|eastern_european|Egyptian|egyptian|Electronic+/+Dance|electronic_dance|Electronics+&amp;+Phones|electronics|Engineering|engineering|English|english|Ethiopian|ethiopian|Explore+what's+happening+in+%25city%25.+Make+a+plan+for+tonight+or+this+weekend+with+your+events+calendar.+Explore+art,+music,+nightlife+based+on+your+vibe.|Events|chill|unique|Experiential|experiential|Experimental|experimental|Ways+to+get+out+and+have+fun+with+your+entire+family|Family|kidcore|children|800|Farm|farm|Farm+to+Table|farm_table|Farmers+Market|farmers_market|10000|Fast+Casual|fast_casual|Festival|1200|Filipino|filipino|Film|50|movie_theater|Film+Museum|film_museum|Financial|financial|Fine+Dining|fine-dining|Fine+Dining|elegant|luxury|fancy|Fishing|fishing|Flea+Market|flea_market|Florist|florist|Flowers|flowers|Folk+/+Country|folk_country|Eat+and+explore+culinary+culture.+Whether+your+vibe+is+a+lively+brunch,+a+friendly+lunch,+a+chill+breakfast,+or+an+intimate+dinner,+we've+got+you+covered+with+the+best+restaurants+and+other+places+to+eat,+including+outdoor+patios,+rooftop+bars,+and+markets.+You+can+also+discover+by+taste,+like+savory,+sweet,+and+spicy.|Food|food_hall|food_truck|french|german|greek|hawaiian|himalayan_nepalese_tibetan|hungarian|ice_cream|indian|italian|jamaican|japanese|korean|latin_american|mediterranean|mexican|middle_eastern|modern_european|moroccan|new_zealand|pakastani|persian|peruvian|pizza|ramen|restaurant|romanian|russian|salad|sandwiches|scandinavian|seafood|senegalese|singaporean|small_plates|soul_southern|soup|south_african|south_american|southeast_asian|spanish|steakhouse|sushi|tacos|tapas|thai|tiawanese|turkish|uzbek|vegan|vegetarian|vietnamese|wings|foodie|authentic|spicy|sweet|popup|Food+Hall|Food+Market|food_market|Food+Truck+/+Cart|3600|Fragrance|fragrance|French|Fries|fries|Gallery|small|Garden|garden|Gastropub|260|German|Gift|gift|Golf|golf|Government+Agency|government_agency|social-services|Greek|Groceries|groceries|Guest+house|guest-house|Guest+house|Gym|gym|Gymnastics|gymnastics|Hair+removal|hair-removal|Hair+Salon|Hawaiian|Health+Food+Store|health_food|Hike|hike-games|Hiking|hike|hiking|Himalayan/Nepalese/Tibetan|Hip+Hop+/+Rap|hiphop_rap|History+Museum|history_museum|Home+&amp;+Garden|home_garden|Home+share+(AirBNB,+VRBO,+etc.)|home_share|Hostel|hostel|Hotel|hotels|1400|Hungarian|Ice+Cream|Ice+Skating|ice_skating|Improv|480|improv-performance|Indian|Inn|inn|Instrumental|instrumental|Insurance|insurance|Interactive|Italian|IV+Therapy|ivtherapy|Jamaican|Japanese|Jazz|jazz|Jewelry|jewelry|Juice+/+Smoothie|140|Karaoke|karaoke|Kids|toy_store|kids-performance|kids-music|Korean|Landmark|landmark|2900|Laser+Tag|laser_tag|Latin+American|Library|14000|Lodge|lodge|rustic|cozy|Lounge|Magic|magic|Mall|mall|Massage|massage|Meditation|meditation|390|Mediterranean|Mexican|Middle+Eastern|Miniature+Golf|minature_golf|Mocktails|Modern+European|Moroccan|Mosque|Motel|motel|Movie+Theater|Mural|mural|Museum|planetarium|visitor_center|zoo|Music|jazzy|lit|shimmy|r_b|rock_indie|soul_funk|world_international|Music+Shop|music-store|record-store|Musical|Nail+Salon|Natural+Area|natural_area|New+Zealand|Night+Market|night_market|Nightclub|latenight|after-party|party|Nightlife|buzzing|Non-Profit+Organization|Nursery|nursery|Opera|opera|Orchard|orchard|Outdoors|park|playground|plaza|urbanfarm|mindful|sunny|relaxing|Outlet|outlet|Paint+Ball|paint_ball|Pakastani|Park|Performance|Performing+Arts|reading_lecture|Persian|Peruvian|Photography|Pilates|pilates|Pizza|Planetarium|Playground|Plaza|Pool|pool|Print+Shop|Property+Management|property_management|Pub|Public+Art|public_art|90|R&amp;B|Ramen|Reading+/+Lecture|Real+Estate|real-estate|Record+Store|Recreation+Center|recreation_center|Residential|Resort|resort|Restaurant|Retreat|retreat|Rock+/+Indie|Rock+Climbing|rock_climbing|Romanian|Russian|Salad|healthy|Saloon|oldschool|wild|Sandwiches|Scandinavian|Seafood|Senegalese|Services|Shopping|specialty_foods|sporting_rental|thrift_store|vintage|suplements|thrift|4400|shopping|Shrine|shrine|Singaporean|Skating|skating|Small+Plates|Social+Services|Software|software|Soul+/+Funk|Soul+/+Southern|Soup|South+African|South+American|Southeast+Asian|Spa|spa|Spanish|Speakeasy|5400|Specialty+Food+Store|Spin+/+Cycle|spin_cycle|Sporting+Goods|Sports+&amp;+Fitness|Sports+&+Fitness|tennis|playtime|inclusive|alternative|Stand+up|Statue|statue|Explore+the+best+places+to+stay+in+%25city%25.+From+hotels+to+guest+houses,+bed+and+breakfasts+there+are+great+places+to+stay+downtown+or+in+nearby+neighborhoods.+There's+a+cozy,+adventurous,+fun,+modern,+luxury+place+to+stay+that+will+match+your+vibe.+Plan+your+visit+and+book+discounted+stays+with+your+partner+sites.|Stay|Hotels|vacation-rental|villa|5000|hotel|boutique|minimalist|Steakhouse|Studio|Sushi|Tacos|Tapas|Tattoo+Parlor|Tea|Temple|temple|Tennis|Thai|Theater|6600|Thrift+Store|Tiawanese|Tiki+Bar|Tour|tour|9900|Tourist+Destination|tourist_destination|Toy+Store|Turkish|Urban+Farm|Uzbek|Vacation+Rental|Vacation+Rental|Vegan|Vegetarian|Vietnamese|Villa|210|Vintage+Store|Visitors+guide+to+the+best+of+%25city%25.+Discover+culture,+history,+and+landmarks+while+having+a+fun,+memorable+time+sightseeing+and+exploring.+We've+collected+must+see+spots+and+favorite+for+tourist+and+locals+alike.+Plan+your+trip+or+weekend+getaway+and+book+these+attractions+for+free+or+at+a+discount.|Visit|scenic|historic|upscale|weekend|aquatic|botanical|lgbtq|tropical|urban|tourist|cool|5500|visitLogo|Visitor+Center|Vitamins+&amp;+Suplements|Wellness|Health+&+Wellness|Wine+Bar|Winery|Wings|World+/+International|Yoga|Zoo|20000^DG5|DG2|3|7MH|7ME|3|BMD|4VY|7L2|4VV|3|7L5|4VV|3|7L8|4VV|3|DG8|4V4|3|4UV|0|4VV|4UY|4VS|4W4|4UT|4VN|52L|4VY|DG2|DE8|4V4|4W1|4UU|7ME|1|7LB|4VV|3|7X2|4UY|3|DFN|DE8|3|80B|4V4|3|DGB|DG2|3|81W|4UR|3|7NH|4W4|3|812|4UR|3|DFQ|DE8|3|7LE|4VV|3|4UR|4VY|81E|81T|4V7|81K|81Q|81N|3|81E|4UR|3|4VY|4UV|812|4UR|80Z|4US|818|80Q|4V7|81H|7XH|4W7|88C|52I|80W|80T|2|81T|4UR|3|7LH|4VV|3|AR8|4VN|3|7LK|4VV|3|9Q0|4V4|3|7LN|4VV|3|7LQ|4VV|3|7LT|4VV|3|DFT|DE8|3|880|4VS|3|7LW|4VV|3|85C|7MK|3|7NW|4W4|3|7MK|7ME|85C|859|856|85F|3|7UT|4UU|3|7Y5|4VS|3|7LZ|4VV|3|BMG|4W4|7Z2|4V4|3|7NT|4W4|3|7WB|4W1|3|7M2|4VV|3|7UZ|4W1|3|7M8|4VV|3|88I|4VV|3|7Y8|4VS|3|886|4VS|3|83K|80T|3|7M5|4VV|3|8OF|4VV|7MB|4VV|3|82T|80W|3|82W|80W|3|87I|4UU|3|7O8|4VV|3|7OE|4VV|3|7UK|4UU|3|7OH|4VV|3|85I|7ME|3|7OK|4VV|3|80Z|4UR|3|7O5|4W4|3|7ZW|7ZT|3|81Z|4UR|3|7ON|4VV|3|DF8|DE8|3|DGN|0|3|7XN|4UT|3|82Z|80W|3|7XZ|4UT|3|52L|4UV|4UR|88O|83Q|4VC|4W7|81K|7MT|2|83N|4W7|3|DFW|DE8|3|DEQ|DE8|3|7V2|4W1|3|7Z8|4V4|3|80N|52I|3|7UW|4UU|4UU|3|7YB|4VS|3|7OB|4VV|3|7OQ|4VV|3|4US|4UV|4VH|3|4UT|4UV|7XN|7XZ|7X8|7Y2|7XE|7XT|7XH|7XB|2|7X8|4UT|3|7NK|4W4|3|DEE|DE8|3|86B|80W|3|DGE|0|3|82Q|4UR|3|DF2|DE8|3|802|4V4|3|ASJ|4VV|3|88O|52L|3|87O|4UU|3|7Y2|4UT|3|7YE|4VS|3|7V5|4W1|3|7OT|4VV|3|822|4UR|3|7OW|4VV|3|7V8|4W1|3|868|80W|3|7OZ|4VV|3|DEN|DE8|3|DFH|DE8|3|825|4UR|3|7ZB|4V4|3|7P2|4VV|3|7P5|4VV|3|883|4VS|3|7YH|4VS|3|83Q|4W7|3|7P8|4VV|3|7PB|4VV|3|4VS|4UV|4UV|880|7Y5|7Y8|886|7O8|80N|7YB|7OB|7YE|883|7YH|7Q5|7YN|889|7YQ|88C|7S2|88F|7YT|7TT|ARB|7YZ|7YW|2|7PE|4VV|3|7PH|4VV|3|83T|4W7|3|DFZ|DE8|3|DEW|DE8|3|7PK|4VV|3|7PN|4VV|3|4VN|0|86B|4W7|4US|4UR|AR8|7Z2|4UT|4VS|8ZU|818|80Q|4VV|4W4|7ME|2|828|4UR|3|832|80W|3|8ZU|0|3|7NQ|4W4|3|7PQ|4VV|3|7ZE|4V4|3|BMA|4VV|818|4UR|3|7PT|4VV|3|80Q|4UR|84N|3|82B|4UR|3|DEK|DE8|3|88L|4VV|3|BMJ|0|7ZH|4V4|3|BMV|4V4|DGH|0|3|83W|4W7|3|4VV|4UV|7L2|7L5|7L8|7LB|7LE|7LH|7LK|7LN|7LQ|7LT|7LW|7LZ|7M2|7M8|88I|7M5|7MB|7O8|7OE|7OH|7OK|7ON|DGN|7OB|7OQ|ASJ|7OT|7OW|7OZ|7P2|7P5|7P8|7PB|7PE|7PH|7PK|7PN|7PQ|7PT|88L|7PW|7PZ|7Q2|7Q5|7Q8|7QB|7QE|7QH|7QK|7QN|7QQ|7QT|7QW|7QZ|7R2|7R5|7R8|7RB|7RE|7RH|7RK|7RN|7RQ|7RT|7RW|7RZ|7S2|7S5|AR2|7S8|7SB|AR5|7SE|7SH|7SK|7SN|7SQ|7ST|7SW|7SZ|7T2|7T5|7T8|7TB|7TE|7TH|7TK|7TQ|7TT|7TW|7TN|7TZ|7U2|7U5|7U8|7UB|BM4|2|7PW|4VV|3|BN3|4V4|7PZ|4VV|3|7ZK|4V4|3|7Q2|4VV|3|BM7|4VV|4V7|4UR|3|7N5|4W4|3|7Q5|4VV|3|7Q8|4VV|3|86E|4V4|3|BMM|4W1|DFB|DE8|3|7QB|4VV|3|7Z5|4V4|3|87R|4UU|3|7VB|4W1|3|7VN|4W1|3|DFK|DE8|3|859|7MK|3|7QE|4VV|3|808|4V4|3|7VE|4W1|3|7NZ|4W4|3|7QH|4VV|3|83Z|4W7|3|82E|4UR|3|7ZN|4V4|3|7UN|4UU|3|7UH|4UU|3|7UE|4UU|3|7QK|4VV|3|7QN|4VV|3|7VQ|4W1|3|4VC|4US|3|835|80W|3|7QQ|4VV|3|87F|4UU|3|842|4W7|3|DEB|DE8|3|81H|4UR|3|7QT|4VV|3|7MZ|7ME|3|7QW|4VV|3|7QZ|4VV|3|845|4W7|3|7ZQ|4V4|3|7YN|4VS|3|848|4W7|3|7ZT|4V4|7ZW|7ZZ|3|865|80W|3|862|4W7|3|7R2|4VV|3|7WQ|4UY|3|7VT|4W1|3|7R5|4VV|3|7XE|4UT|3|87X|0|3|889|4VS|3|838|80W|3|8OC|4V4|7MN|7ME|3|7MQ|7ME|3|7R8|4VV|3|7RB|4VV|3|7RE|4VV|3|7VW|4W1|3|7YQ|4VS|3|7RH|4VV|3|7RK|4VV|3|7XT|4UT|3|87C|4UU|3|84N|80Q|3|7WW|4UY|3|7XH|4UT|81W|81Z|82Q|822|825|828|82B|82E|82N|82H|82K|3|4W7|4UV|83N|83Q|83T|83W|83Z|842|845|848|862|84B|84E|84H|84K|3|85W|4V4|85Z|3|83B|80W|3|856|7MK|3|7O2|4W4|3|7RN|4VV|3|80K|4V4|3|88C|4VS|3|52I|4UV|80N|88C|7YT|3|7XB|4UT|4UT|3|BMP|7ZN|83E|80W|3|BMS|4UY|4W4|4UV|7NH|7NW|7NT|87I|7O5|7NK|7NQ|7N5|7NZ|7O2|7N8|7NB|7NE|7NN|2|BMY|4V4|7WE|4W1|3|7RQ|4VV|3|7N8|4W4|3|80W|4UR|82T|82W|82Z|4US|86B|868|832|835|865|838|83B|83E|83H|80T|3|7RT|4VV|3|7RW|4VV|3|81K|4UR|3|7VH|4W1|3|7RZ|4VV|3|82N|4UR|3|7NB|4W4|3|7NE|4W4|3|7VZ|4W1|3|81Q|4UR|3|DFE|DE8|3|7S2|4VV|3|7WZ|4UY|3|84B|4W7|3|7S5|4VV|3|83H|80W|3|DET|DE8|3|85Z|85W|3|7WK|4W1|3|DG2|4UV|DG5|DGB|DGE|2|7UQ|4UU|3|AR2|4VV|3|7N2|7ME|3|84E|4W7|3|7W2|4W1|3|7S8|4VV|3|7SB|4VV|3|AR5|4VV|3|88F|4VS|3|7SE|4VV|3|7SH|4VV|3|7SK|4VV|3|7SN|4VV|3|DE8|4UV|DFN|DFQ|DFT|DF8|DFW|DEQ|7UW|DEE|DF2|DEN|DFH|DFZ|DEW|DEK|DFK|DEB|7XB|DFE|DET|2|4V4|4UV|4UV|DG8|80B|9Q0|7Z2|85I|DGN|7Z8|802|7ZB|DFZ|7ZE|7ZH|DGH|7ZK|86E|7Z5|808|7ZN|7ZQ|7ZT|85W|80K|805|7WH|80E|80H|DGK|2|7XW|4UT|7SQ|4VV|3|7W8|4W1|3|7ST|4VV|3|DF5|DE8|DFB|DEZ|DE8|DE8|84H|4W7|3|7SW|4VV|3|7SZ|4VV|3|7T2|4VV|3|7T5|4VV|3|7T8|4VV|3|7MW|7ME|3|7TB|4VV|3|7YT|4VS|3|805|4V4|3|7VK|4W1|3|7WH|4W1|3|4W1|4UV|4UV|7WB|7UZ|7V2|7V5|7V8|7VB|7VN|7VE|7VQ|7VT|7VW|7WE|7VH|7VZ|7WK|7W2|7W8|7VK|7WH|7W5|7MT|2|4VH|4US|3|7WT|4UY|3|4UU|4UV|7UT|87I|7UK|7UW|87O|87R|7UN|7UH|7UE|87F|87X|87C|7UQ|87U|87L|2|7TE|4VV|3|81N|4UR|3|7TH|4VV|3|7TK|4VV|3|7TQ|4VV|3|85F|7MK|3|7TT|4VS|3|7XQ|4UT|7W5|4W1|3|7TW|4VV|3|80T|4UR|83K|3|80E|4V4|3|7TN|4VV|3|ARB|4VS|3|7WN|4UY|3|7X5|4UY|4UY|3|7ZZ|7ZT|3|7TZ|4VV|3|7NN|4W4|3|7U2|4VV|3|87U|4UU|3|7U5|4VV|3|7U8|4VV|3|7UB|4VV|3|87L|4UU|3|80H|4V4|3|4UY|4UV|7X2|81W|7WQ|7WW|7XH|7WZ|7WT|7WN|7X5|82K|2|82H|4UR|3|DGK|0|3|7ME|4UV|7MH|7MK|85I|7MZ|7MN|7MQ|7N2|7MW|7MT|2|7YZ|4VS|3|7YW|4VS|3|BM4|4VV|3|84K|4W7|3|7MT|7ME|3|82K|4UR|3^^@$0|N3|1|-4|2|3|4|5|6|N4|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|H|I|N5]|$0|N6|1|-4|2|J|4|K|6|N7|7|$8|-4|E|@]|9|@]|A|L|C|-4|D|-2]|G|M|I|N8]|$0|N9|1|-4|2|N|4|O|6|NA|7|$8|-4|9|@]|A|P|C|-4|D|-2|Q|-2|E|@]|F|-2]]|$0|NB|1|-4|2|R|4|S|6|NC|7|$8|-4|E|@]|9|@]|A|B|C|-4|D|-2]|G|T|I|ND]|$0|NE|1|-4|2|U|4|V|6|NF|7|$8|-4|E|@]|9|@]|A|W|C|-4|D|-2]|G|T|I|NG]|$0|NH|1|-4|2|X|4|Y|6|NI|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|NJ]|$0|NK|1|-4|2|Z|4|10|6|NL|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|11|I|NM]|$0|NN|1|12|2|13|4|14|6|NO|7|$8|15|E|@$4|T|0|NP]|$4|16|0|NQ]|$4|17|0|NR]|$4|18|0|NS]|$4|19|0|NT]|$4|1A|0|NU]|$4|1B|0|NV]|$0|NW|4|1C]|$0|NX|4|H]|$0|NY|4|1D]|$0|NZ|4|11]|$0|O0|4|1E]|$0|O1|4|1F]|$0|O2|4|M]]|A|1G|C|1H|9|@1I|1J|1K|1L|1M|1N|1O|1P|1Q|1R]|Q|-2|D|-2]|I|O3]|$0|O4|1|-4|2|1S|4|1T|6|O5|7|$8|-4|9|@]|A|1U|C|-4|E|@]]|G|T|I|O6]|$0|O7|1|-4|2|1V|4|1W|6|O8|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|16|I|O9]|$0|OA|1|-4|2|1X|4|1Y|6|OB|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|1D|I|OC]|$0|OD|1|-4|2|1Z|4|20|6|OE|7|$8|-4|9|@]|A|21|C|-4|E|@]]|G|11|I|OF]|$0|OG|1|-4|2|22|4|23|6|OH|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|H|I|OI]|$0|OJ|1|-4|2|24|4|25|6|OK|7|$8|24|E|@]|9|@]|A|26|C|-4|D|-2]|G|16|I|OL]|$0|OM|1|-4|2|27|4|28|6|ON|7|$8|-4|9|@]|A|29|C|-4|E|@]]|G|18|I|OO]|$0|OP|1|-4|2|2A|4|2B|6|OQ|7|$8|-4|E|@]|9|@]|A|2C|C|-4|D|-2]|G|1C|I|OR]|$0|OS|1|-4|2|2D|4|2E|6|OT|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|1D|I|OU]|$0|OV|1|-4|2|2F|4|2G|6|OW|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|OX]|$0|OY|1|-4|2|2H|4|2I|6|OZ|7|$8|2H|A|2J|E|@$0|P0|4|2K]|$0|P1|4|2L]|$0|P2|4|2M]|$0|P3|4|2N]|$0|P4|4|2O]|$0|P5|4|2P]]|9|@2Q|1J|2R]|C|2I|D|-1]|G|1C|I|P6]|$0|P7|1|-4|2|2S|4|2K|6|P8|7|$8|-4|E|@]|9|@]|A|2T|C|-4|D|-2]|G|2I|I|P9]|$0|PA|1|-4|2|2U|4|1C|6|PB|7|$8|2V|9|@1K|2W|2X|2Y|2Z]|A|30|C|1C|E|@$0|PC|4|2B]|$0|PD|4|2I]|$0|PE|4|31]|$0|PF|4|32]|$0|PG|4|33]|$0|PH|4|34]|$0|PI|4|2M]|$0|PJ|4|35]|$0|PK|4|36]|$0|PL|4|37]|$0|PM|4|38]|$0|PN|4|39]|$0|PO|4|3A]|$0|PP|4|3B]]]|G|14|I|PQ]|$0|PR|1|-4|2|3C|4|2L|6|PS|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|2I|I|PT]|$0|PU|1|-4|2|3D|4|3E|6|PV|7|$8|-4|9|@]|A|3F|C|-4|E|@]]|G|T|I|PW]|$0|PX|1|-4|2|3G|4|3H|6|PY|7|$8|-4|9|@]|A|3I|C|-4|D|-2|E|@]]|G|1A|I|PZ]|$0|Q0|1|-4|2|3J|4|3K|6|Q1|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|Q2]|$0|Q3|1|3L|2|3M|4|3N|6|Q4|7|$8|3N|9|@]|A|3O|C|-4|D|-2|E|@]]|G|11|I|Q5]|$0|Q6|1|-4|2|3P|4|3Q|6|Q7|7|$8|-4|9|@]|A|L|C|-4|E|@]]|G|T|I|Q8]|$0|Q9|1|-4|2|3R|4|3S|6|QA|7|$8|-4|9|@]|A|2T|C|-4|E|@]]|G|T|I|QB]|$0|QC|1|-4|2|3T|4|3U|6|QD|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|QE]|$0|QF|1|-4|2|3V|4|3W|6|QG|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|1D|I|QH]|$0|QI|1|-4|2|3X|4|3Y|6|QJ|7|$8|3X|E|@]|9|@3Z|40]|A|41|C|-4|D|-1]|G|17|I|QK]|$0|QL|1|-4|2|42|4|43|6|QM|7|$8|-4|9|@]|A|44|C|-4|E|@]]|G|T|I|QN]|$0|QO|1|-4|2|45|4|46|6|QP|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|47|I|QQ]|$0|QR|1|-4|2|48|4|49|6|QS|7|$8|-4|E|@]|9|@]|A|4A|C|-4|D|-2]|G|18|I|QT]|$0|QU|1|-4|2|4B|4|47|6|QV|7|$8|-4|9|@]|A|B|C|-4|E|@$0|QW|4|46]|$0|QX|4|4C]|$0|QY|4|4D]|$0|QZ|4|4E]]]|G|M|I|R0]|$0|R1|1|-4|2|4F|4|4G|6|R2|7|$8|-4|9|@]|A|4H|C|-4|E|@]]|G|1F|I|R3]|$0|R4|1|-4|2|4I|4|4J|6|R5|7|$8|-4|9|@]|A|4H|C|-4|E|@]]|G|17|I|R6]|$0|R7|1|-4|2|4K|4|4L|6|R8|7|$8|-4|9|@]|A|3F|C|-4|E|@]]|G|T|I|R9]|$0|RA|1|-4|2|4M|4|4N|6|RB|7|$8|-4|9|@]|A|4O|C|-4|D|-2|Q|-2|E|@]|F|-2]]|$0|RC|1|-4|2|4P|4|4Q|6|RD|7|$8|-4|E|@]|9|@]|A|4R|C|-4|D|-1]|G|11|I|RE]|$0|RF|1|-4|2|4S|4|4T|6|RG|7|$8|-4|9|@]|A|4U|C|-4|E|@]]|G|18|I|RH]|$0|RI|1|-4|2|4V|4|4W|6|RJ|7|$8|-4|9|@]|A|4X|C|-4|E|@]]|G|1E|I|RK]|$0|RL|1|-4|2|4Y|4|4Z|6|RM|7|$8|-4|9|@]|A|3I|C|-4|E|@]]|G|T|I|RN]|$0|RO|1|-4|2|50|4|51|6|RP|7|$8|-4|9|@]|A|52|C|-4|E|@]]|G|1E|I|RQ]|$0|RR|1|-4|2|53|4|54|6|RS|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|RT]|$0|RU|1|-4|2|55|4|56|6|RV|7|$8|55|9|@]|A|57|C|-4|E|@]]|G|T|I|RW]|$0|RX|1|-4|2|58|4|59|6|RY|7|$8|-4|9|@]|A|57|C|-4|E|@]]|G|17|I|RZ]|$0|S0|1|-4|2|5A|4|5B|6|S1|7|$8|5A|9|@]|A|4U|C|-4|E|@]]|G|17|I|S2]|$0|S3|1|-4|2|5C|4|5D|6|S4|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|3B|I|S5]|$0|S6|1|-4|2|5E|4|5F|6|S7|7|$8|-4|E|@]|9|@]|A|5G|C|-4|D|-1]|G|T|I|S8]|$0|S9|1|-4|2|5H|4|5I|6|SA|7|$8|-4|9|@]|A|21|C|-4|Q|-2|E|@]]]|$0|SB|1|-4|2|5J|4|5K|6|SC|7|$8|-4|9|@]|A|26|C|-4|E|@]]|G|T|I|SD]|$0|SE|1|-4|2|5L|4|5M|6|SF|7|$8|-4|9|@]|A|5N|C|-4|E|@]]|G|3A|I|SG]|$0|SH|1|-4|2|5O|4|5P|6|SI|7|$8|-4|9|@]|A|3F|C|-4|E|@]]|G|3A|I|SJ]|$0|SK|1|-4|2|5Q|4|5R|6|SL|7|$8|5Q|9|@5S|5T|5U|5V]|A|4U|C|-4|E|@]]|G|1F|I|SM]|$0|SN|1|-4|2|5W|4|5X|6|SO|7|$8|5W|9|@]|A|2C|C|-4|E|@]]|G|T|I|SP]|$0|SQ|1|-4|2|5Y|4|5Z|6|SR|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|SS]|$0|ST|1|-4|2|60|4|61|6|SU|7|$8|-4|9|@]|A|62|C|-4|E|@]]|G|1F|I|SV]|$0|SW|1|-4|2|63|4|64|6|SX|7|$8|-4|9|@]|A|65|C|-4|E|@]]|G|T|I|SY]|$0|SZ|1|-4|2|66|4|67|6|T0|7|$8|-4|E|@]|9|@]|A|B|C|-4|D|-1]|G|M|I|T1]|$0|T2|1|-4|2|68|4|69|6|T3|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|T4]|$0|T5|1|-4|2|6A|4|31|6|T6|7|$8|-4|9|@]|A|2C|C|-4|E|@]]|G|1C|I|T7]|$0|T8|1|-4|2|6B|4|6C|6|T9|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|18|I|TA]|$0|TB|1|-4|2|6D|4|6E|6|TC|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|6F|I|TD]|$0|TE|1|-4|2|6G|4|6H|6|TF|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|36|I|TG]|$0|TH|1|-4|2|6I|4|6J|6|TI|7|$8|-4|9|@]|A|2C|C|-4|E|@]]|G|T|I|TJ]|$0|TK|1|-4|2|6K|4|6L|6|TL|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|1D|I|TM]|$0|TN|1|-4|2|6M|4|6N|6|TO|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|11|I|TP]|$0|TQ|1|-4|2|6O|4|6P|6|TR|7|$8|-4|E|@]|9|@]|A|B|C|-4|D|-2]|G|19|I|TS]|$0|TT|1|-4|2|6Q|4|6R|6|TU|7|$8|-4|9|@]|A|65|C|-4|E|@]]|G|3A|I|TV]|$0|TW|1|-4|2|6S|4|6T|6|TX|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|19|I|TY]|$0|TZ|1|-4|2|6U|4|1B|6|U0|7|$9|@2W|35|1O|1K]|C|1B|8|6V|A|B|E|@$0|U1|4|2I]|$0|U2|4|6W]|$0|U3|4|6X]|$0|U4|4|6Y]|$0|U5|4|37]|$0|U6|4|2N]|$0|U7|4|6Z]]]|G|14|I|U8]|$0|U9|1|-4|2|70|4|71|6|UA|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|37|I|UB]|$0|UC|1|-4|2|72|4|73|6|UD|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|1D|I|UE]|$0|UF|1|-4|2|74|4|75|6|UG|7|$8|-4|9|@]|A|76|C|-4|D|-2|E|@]|F|-2]|G|1D|I|UH]|$0|UI|1|-4|2|77|4|78|6|UJ|7|$8|-4|9|@]|A|3F|C|-4|E|@]]|G|1E|I|UK]|$0|UL|1|-4|2|79|4|7A|6|UM|7|$8|-4|9|@]|A|21|C|-4|E|@]]|G|11|I|UN]|$0|UO|1|-4|2|7B|4|7C|6|UP|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|17|I|UQ]|$0|UR|1|-4|2|7D|4|7E|6|US|7|$8|-4|E|@$4|1F|0|UT]]|9|@]|A|5N|C|-4|D|-1|F|-2]|G|1F|I|UU]|$0|UV|1|-4|2|7F|4|7G|6|UW|7|$8|-4|9|@]|A|7H|C|-4|E|@]]|G|17|I|UX]|$0|UY|1|-4|2|7I|4|7J|6|UZ|7|$8|-4|9|@]|A|7K|C|-4|E|@]]|G|T|I|V0]|$0|V1|1|-4|2|7L|4|7M|6|V2|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|V3]|$0|V4|1|-4|2|7N|4|32|6|V5|7|$8|7N|9|@7O|7P|7Q]|A|26|C|32|E|@$0|V6|4|7R]]]|G|1C|I|V7]|$0|V8|1|7S|2|7T|4|19|6|V9|7|$8|7T|E|@$0|VA|4|6P]|$0|VB|4|6T]|$0|VC|4|7U]|$0|VD|4|7V]|$0|VE|4|7W]|$0|VF|4|7X]|$0|VG|4|36]|$0|VH|4|7Y]]|A|7Z|C|19|9|@19|1L|80|81|82]|D|-2]|G|14|I|VI]|$0|VJ|1|-4|2|83|4|7U|6|VK|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|19|I|VL]|$0|VM|1|-4|2|84|4|85|6|VN|7|$8|-4|9|@]|A|86|C|-4|E|@]]|G|18|I|VO]|$0|VP|1|-4|2|87|4|88|6|VQ|7|$8|-4|9|@]|A|W|C|-4|D|-2|E|@]|F|-2]|G|1D|I|VR]|$0|VS|1|-4|2|89|4|8A|6|VT|7|$8|89|E|@]|9|@2Z|2Y|8B]|A|8C|C|-4|D|-2]|G|3A|I|VU]|$0|VV|1|-4|2|8D|4|8E|6|VW|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|H|I|VX]|$0|VY|1|-4|2|8F|4|8G|6|VZ|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|36|I|W0]|$0|W1|1|-4|2|8H|4|8I|6|W2|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|1D|I|W3]|$0|W4|1|-4|2|8J|4|8K|6|W5|7|$8|-4|9|@]|A|3I|C|-4|E|@]]|G|11|I|W6]|$0|W7|1|-4|2|8L|4|8M|6|W8|7|$8|-4|9|@]|A|1U|C|-4|D|-2|E|@]]|G|T|I|W9]|$0|WA|1|-4|2|8N|4|6W|6|WB|7|$8|8N|9|@2W|35]|A|2J|C|-4|E|@]]|G|1B|I|WC]|$0|WD|1|-4|2|8O|4|5V|6|WE|7|$8|8O|9|@5V|5U]|A|8P|C|-4|E|@]]|G|1F|I|WF]|$0|WG|1|-4|2|8Q|4|7V|6|WH|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|19|I|WI]|$0|WJ|1|-4|2|8R|4|8S|6|WK|7|$8|-4|9|@]|A|65|C|-4|E|@]]|G|17|I|WL]|$0|WM|1|-4|2|8T|4|8U|6|WN|7|$8|-4|9|@]|A|L|C|-4|E|@]]|G|1E|I|WO]|$0|WP|1|-4|2|8V|4|8W|6|WQ|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|WR]|$0|WS|1|-4|2|8X|4|8Y|6|WT|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|36|I|WU]|$0|WV|1|-4|2|8Z|4|90|6|WW|7|$8|-4|9|@]|A|L|C|-4|E|@]]|G|T|I|WX]|$0|WY|1|-4|2|91|4|92|6|WZ|7|$8|-4|9|@]|A|29|C|-4|E|@]]|G|1E|I|X0]|$0|X1|1|-4|2|91|4|93|6|X2|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|3A|I|X3]|$0|X4|1|-4|2|94|4|95|6|X5|7|$8|-4|9|@]|A|4H|C|-4|E|@]]|G|T|I|X6]|$0|X7|1|-4|2|96|4|97|6|X8|7|$8|-4|9|@]|A|W|C|-4|D|-2|E|@]|F|-2]|G|1D|I|X9]|$0|XA|1|-4|2|98|4|99|6|XB|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|1D|I|XC]|$0|XD|1|-4|2|9A|4|9B|6|XE|7|$8|-4|9|@]|A|W|C|-4|E|@]]|G|36|I|XF]|$0|XG|1|-4|2|9C|4|9D|6|XH|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|11|I|XI]|$0|XJ|1|-4|2|9E|4|9F|6|XK|7|$8|-4|9|@]|A|26|C|-4|E|@]]|G|T|I|XL]|$0|XM|1|-4|2|9G|4|9H|6|XN|7|$8|-4|9|@]|A|9I|C|-4|E|@]]|G|T|I|XO]|$0|XP|1|-4|2|9J|4|9K|6|XQ|7|$8|9J|9|@]|A|21|C|-4|E|@]]|G|17|I|XR]|$0|XS|1|-4|2|9L|4|9M|6|XT|7|$8|-4|9|@]|A|P|C|-4|E|@]]|G|17|I|XU]|$0|XV|1|-4|2|9N|4|6X|6|XW|7|$8|9N|9|@]|A|86|C|-4|E|@]]|G|1B|I|XX]|$0|XY|1|-4|2|9O|4|9P|6|XZ|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|Y0]|$0|Y1|1|-4|2|9Q|4|9R|6|Y2|7|$8|-4|9|@]|A|26|C|-4|E|@]]|G|T|I|Y3]|$0|Y4|1|9S|2|9T|4|17|6|Y5|7|$8|9U|E|@$4|14|0|Y6]|$0|Y7|4|3Y]|$0|Y8|4|4J]|$0|Y9|4|59]|$0|YA|4|5B]|$0|YB|4|5X]|$0|YC|4|7C]|$0|YD|4|7G]|$0|YE|4|7J]|$0|YF|4|8S]|$0|YG|4|9K]|$0|YH|4|9M]|$0|YI|4|9V]|$0|YJ|4|9W]|$0|YK|4|9X]|$0|YL|4|9Y]|$0|YM|4|38]|$0|YN|4|9Z]|$0|YO|4|A0]|$0|YP|4|A1]|$0|YQ|4|A2]|$0|YR|4|A3]|$0|YS|4|A4]|$0|YT|4|A5]]|9|@1K|40|A6|A7|A8]|A|A9|C|17|D|-2]|G|14|I|YU]|$0|YV|1|-4|2|AA|4|AB|6|YW|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|YX]|$0|YY|1|-4|2|AC|4|AD|6|YZ|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|Z0]|$0|Z1|1|-4|2|AE|4|AF|6|Z2|7|$8|-4|9|@]|A|P|C|-4|E|@]]|G|37|I|Z3]|$0|Z4|1|-4|2|AG|4|AH|6|Z5|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|1D|I|Z6]|$0|Z7|1|-4|2|AI|4|AJ|6|Z8|7|$8|-4|9|@]|A|W|C|-4|D|-2|E|@]|F|-2]|G|1D|I|Z9]|$0|ZA|1|-4|2|AK|4|AL|6|ZB|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|ZC]|$0|ZD|1|-4|2|AM|4|AN|6|ZE|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|ZF]|$0|ZG|1|AO|2|AP|4|1A|6|ZH|7|$8|AP|E|@$4|8A|0|ZI]|$4|37|0|ZJ]|$4|32|0|ZK]|$4|2I|0|ZL]|$0|ZM|4|3H]|$0|ZN|4|4Q]|$0|ZO|4|19]|$0|ZP|4|17]|$0|ZQ|4|1O]|$0|ZR|4|33]|$0|ZS|4|34]|$0|ZT|4|T]|$0|ZU|4|18]|$0|ZV|4|M]]|9|@1L|AQ|1K|AR]|A|4X|C|1A|D|-1|F|-2]|G|14|I|ZW]|$0|ZX|1|-4|2|AS|4|AT|6|ZY|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|36|I|ZZ]|$0|100|1|-4|2|AU|4|AV|6|101|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|3A|I|102]|$0|103|1|AW|2|AX|4|1O|6|104|7|$8|-4|9|@1O|AY|AZ]|A|B0|C|-4|E|@]|D|-2]|G|1A|I|105]|$0|106|1|-4|2|B1|4|B2|6|107|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|18|I|108]|$0|109|1|-4|2|B3|4|B4|6|10A|7|$8|-4|9|@]|A|3F|C|-4|E|@]]|G|T|I|10B]|$0|10C|1|-4|2|B5|4|B6|6|10D|7|$8|-4|9|@]|A|B7|C|-4|E|@]]|G|11|I|10E]|$0|10F|1|-4|2|B8|4|B9|6|10G|7|$8|-4|9|@]|A|4O|C|-4|D|-2|Q|-2|E|@]|F|-2]]|$0|10H|1|-4|2|BA|4|33|6|10I|7|$8|-4|E|@]|9|@]|A|BB|C|-4|D|-2]|G|1A|I|10J]|$0|10K|1|-4|2|BC|4|BD|6|10L|7|$8|-4|9|@]|A|62|C|-4|E|@]]|G|T|I|10M]|$0|10N|1|-4|2|BE|4|34|6|10O|7|$8|-4|9|@]|A|BF|C|-4|E|@$0|10P|4|BG]]]|G|1C|I|10Q]|$0|10R|1|-4|2|BH|4|BI|6|10S|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|36|I|10T]|$0|10U|1|-4|2|BJ|4|BK|6|10V|7|$8|-4|9|@]|A|W|C|-4|D|-2|E|@]|F|-2]|G|1D|I|10W]|$0|10X|1|-4|2|BL|4|BM|6|10Y|7|$8|BN|9|@BO|BP|BQ]|A|2C|C|-4|E|@]]|G|T|I|10Z]|$0|110|1|-4|2|BR|4|BS|6|111|7|$8|-4|9|@]|A|4O|C|-4|D|-2|Q|-2|E|@]|F|-2]]|$0|112|1|-4|2|BT|4|BU|6|113|7|$8|-4|9|@]|A|2J|C|-4|E|@]]|G|11|I|114]|$0|115|1|-4|2|BV|4|BW|6|116|7|$8|-4|9|@]|A|P|C|-4|D|-2|Q|-2|E|@]|F|-2]]|$0|117|1|-4|2|BX|4|BY|6|118|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|11|I|119]|$0|11A|1|-4|2|BZ|4|C0|6|11B|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|37|I|11C]|$0|11D|1|C1|2|C2|4|T|6|11E|7|$8|C2|E|@$0|11F|4|S]|$0|11G|4|V]|$0|11H|4|Y]|$0|11I|4|1T]|$0|11J|4|2G]|$0|11K|4|3E]|$0|11L|4|3K]|$0|11M|4|3Q]|$0|11N|4|3S]|$0|11O|4|3U]|$0|11P|4|43]|$0|11Q|4|4L]|$0|11R|4|4Z]|$0|11S|4|54]|$0|11T|4|56]|$0|11U|4|5F]|$0|11V|4|5K]|$0|11W|4|5X]|$0|11X|4|5Z]|$0|11Y|4|64]|$0|11Z|4|69]|$0|120|4|6J]|$0|121|4|6N]|$0|122|4|7J]|$0|123|4|7M]|$0|124|4|8M]|$0|125|4|8W]|$0|126|4|90]|$0|127|4|95]|$0|128|4|9F]|$0|129|4|9H]|$0|12A|4|9P]|$0|12B|4|9R]|$0|12C|4|AB]|$0|12D|4|AD]|$0|12E|4|AL]|$0|12F|4|AN]|$0|12G|4|B4]|$0|12H|4|BD]|$0|12I|4|BM]|$0|12J|4|C3]|$0|12K|4|C4]|$0|12L|4|C5]|$0|12M|4|9V]|$0|12N|4|C6]|$0|12O|4|C7]|$0|12P|4|C8]|$0|12Q|4|C9]|$0|12R|4|CA]|$0|12S|4|CB]|$0|12T|4|CC]|$0|12U|4|CD]|$0|12V|4|CE]|$0|12W|4|CF]|$0|12X|4|CG]|$0|12Y|4|CH]|$0|12Z|4|CI]|$0|130|4|CJ]|$0|131|4|CK]|$0|132|4|CL]|$0|133|4|CM]|$0|134|4|CN]|$0|135|4|CO]|$0|136|4|CP]|$0|137|4|CQ]|$0|138|4|CR]|$0|139|4|9Z]|$0|13A|4|CS]|$0|13B|4|CT]|$0|13C|4|CU]|$0|13D|4|CV]|$0|13E|4|CW]|$0|13F|4|CX]|$0|13G|4|CY]|$0|13H|4|CZ]|$0|13I|4|D0]|$0|13J|4|D1]|$0|13K|4|D2]|$0|13L|4|D3]|$0|13M|4|D4]|$0|13N|4|D5]|$0|13O|4|D6]|$0|13P|4|D7]|$0|13Q|4|D8]|$0|13R|4|D9]|$0|13S|4|DA]|$0|13T|4|DB]|$0|13U|4|DC]|$0|13V|4|A2]|$0|13W|4|DD]|$0|13X|4|DE]|$0|13Y|4|DF]|$0|13Z|4|DG]|$0|140|4|DH]|$0|141|4|DI]|$0|142|4|DJ]|$0|143|4|DK]]|9|@1L|DL|DM|1M|DN|DO|DP]|A|5G|C|T|D|-2]|G|14|I|144]|$0|145|1|-4|2|DQ|4|C3|6|146|7|$8|-4|9|@]|A|3F|C|-4|E|@]]|G|T|I|147]|$0|148|1|-4|2|DR|4|DS|6|149|7|$8|-4|9|@]|A|P|C|-4|D|-2|Q|-2|E|@]|F|-2]]|$0|14A|1|-4|2|DT|4|C4|6|14B|7|$8|-4|9|@]|A|DU|C|-4|E|@]]|G|T|I|14C]|$0|14D|1|-4|2|DV|4|DW|6|14E|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|11|I|14F]|$0|14G|1|-4|2|DX|4|C5|6|14H|7|$8|-4|9|@]|A|5N|C|-4|E|@]]|G|T|I|14I]|$0|14J|1|-4|2|DY|4|DZ|6|14K|7|$8|-4|9|@]|A|3I|C|-4|D|-2|Q|-2|E|@]|F|-2]]|$0|14L|1|-4|2|E0|4|2M|6|14M|7|$9|@E1|1L|19]|8|-4|E|@]|A|29|C|-4|D|-1]|G|2I|I|14N]|$0|14O|1|-4|2|E2|4|E3|6|14P|7|$8|-4|E|@]|9|@]|A|2J|C|-4|D|-1]|G|18|I|14Q]|$0|14R|1|-4|2|E4|4|9V|6|14S|7|$8|-4|9|@]|A|E5|C|-4|E|@]]|G|T|I|14T]|$0|14U|1|-4|2|E6|4|C6|6|14V|7|$8|-4|9|@]|A|BF|C|-4|E|@]]|G|T|I|14W]|$0|14X|1|-4|2|E7|4|E8|6|14Y|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|11|I|14Z]|$0|150|1|-4|2|E9|4|EA|6|151|7|$8|-4|9|@]|A|P|C|-4|D|-2|Q|-2|E|@]|F|-2]]|$0|152|1|-4|2|EB|4|EC|6|153|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|ED|I|154]|$0|155|1|-4|2|EE|4|C7|6|156|7|$8|-4|9|@]|A|1U|C|-4|E|@]]|G|T|I|157]|$0|158|1|-4|2|EF|4|EG|6|159|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|11|I|15A]|$0|15B|1|-4|2|EH|4|EI|6|15C|7|$8|EJ|9|@]|A|8P|C|-4|E|@]]|G|1F|I|15D]|$0|15E|1|-4|2|EK|4|EL|6|15F|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|1E|I|15G]|$0|15H|1|-4|2|EM|4|EN|6|15I|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|1E|I|15J]|$0|15K|1|-4|2|EO|4|EP|6|15L|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|1D|I|15M]|$0|15N|1|-4|2|EQ|4|4C|6|15O|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|47|I|15P]|$0|15Q|1|-4|2|ER|4|C8|6|15R|7|$8|-4|9|@]|A|3I|C|-4|E|@]]|G|T|I|15S]|$0|15T|1|-4|2|ES|4|ET|6|15U|7|$8|-4|9|@]|A|3O|C|-4|E|@]]|G|11|I|15V]|$0|15W|1|-4|2|EU|4|EV|6|15X|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|1E|I|15Y]|$0|15Z|1|-4|2|EW|4|EX|6|160|7|$8|EW|E|@]|9|@EY]|A|2T|C|-4|D|-1]|G|18|I|161]|$0|162|1|-4|2|EZ|4|C9|6|163|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|164]|$0|165|1|-4|2|F0|4|F1|6|166|7|$8|-4|9|@]|A|3I|C|-4|E|@]]|G|37|I|167]|$0|168|1|-4|2|F2|4|F3|6|169|7|$8|-4|9|@]|A|30|C|-4|E|@]]|G|36|I|16A]|$0|16B|1|-4|2|F4|4|F5|6|16C|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|11|I|16D]|$0|16E|1|-4|2|F6|4|F7|6|16F|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|1F|I|16G]|$0|16H|1|-4|2|F8|4|F9|6|16I|7|$8|-4|9|@]|A|4X|C|-4|E|@]]|G|1F|I|16J]|$0|16K|1|-4|2|FA|4|FB|6|16L|7|$8|-4|E|@]|9|@]|A|FC|C|-4|D|-1]|G|1F|I|16M]|$0|16N|1|-4|2|FD|4|CA|6|16O|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|16P]|$0|16Q|1|-4|2|FE|4|CB|6|16R|7|$8|-4|9|@]|A|DU|C|-4|E|@]]|G|T|I|16S]|$0|16T|1|-4|2|FF|4|FG|6|16U|7|$8|-4|9|@]|A|P|C|-4|E|@]]|G|1E|I|16V]|$0|16W|1|-4|2|FH|4|6Y|6|16X|7|$A|FI|8|-4|9|@]|C|-4|E|@]]|G|1B|I|16Y]|$0|16Z|1|-4|2|FH|4|FJ|6|170|7|$8|-4|9|@]|A|FI|C|-4|E|@]]|G|3A|I|171]|$0|172|1|-4|2|FK|4|CC|6|173|7|$8|-4|9|@]|A|5N|C|-4|E|@]]|G|T|I|174]|$0|175|1|-4|2|FL|4|FM|6|176|7|$8|FL|9|@]|A|26|C|-4|E|@]]|G|1F|I|177]|$0|178|1|-4|2|FN|4|FO|6|179|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|37|I|17A]|$0|17B|1|-4|2|FP|4|FQ|6|17C|7|$8|-4|9|@]|A|W|C|-4|D|-2|E|@]|F|-2]|G|1D|I|17D]|$0|17E|1|-4|2|FR|4|35|6|17F|7|$8|-4|E|@]|9|@]|A|W|C|-4|D|-2]|G|1C|I|17G]|$0|17H|1|-4|2|FS|4|CD|6|17I|7|$8|-4|9|@]|A|L|C|-4|E|@]]|G|T|I|17J]|$0|17K|1|-4|2|FT|4|FU|6|17L|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|M|I|17M]|$0|17N|1|-4|2|FV|4|CE|6|17O|7|$8|-4|9|@]|A|E5|C|-4|E|@]]|G|T|I|17P]|$0|17Q|1|-4|2|FW|4|CF|6|17R|7|$8|-4|9|@]|A|7H|C|-4|E|@]]|G|T|I|17S]|$0|17T|1|-4|2|FX|4|FY|6|17U|7|$8|-4|9|@]|A|L|C|-4|E|@]]|G|37|I|17V]|$0|17W|1|-4|2|FZ|4|G0|6|17X|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|11|I|17Y]|$0|17Z|1|-4|2|G1|4|9W|6|180|7|$8|-4|9|@]|A|G2|C|-4|E|@]]|G|17|I|181]|$0|182|1|-4|2|G3|4|G4|6|183|7|$8|-4|9|@]|A|2C|C|-4|E|@]]|G|37|I|184]|$0|185|1|-4|2|G5|4|6F|6|186|7|$8|-4|9|@]|A|B|C|-4|E|@$0|187|4|6E]|$0|188|4|G6]]]|G|11|I|189]|$0|18A|1|-4|2|G5|4|G7|6|18B|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|3A|I|18C]|$0|18D|1|-4|2|G5|4|G8|6|18E|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|37|I|18F]|$0|18G|1|-4|2|G9|4|CG|6|18H|7|$8|-4|9|@]|A|4H|C|-4|E|@]]|G|T|I|18I]|$0|18J|1|-4|2|GA|4|GB|6|18K|7|$8|-4|9|@]|A|GC|C|-4|E|@]]|G|16|I|18L]|$0|18M|1|-4|2|GD|4|GE|6|18N|7|$8|-4|9|@]|A|52|C|-4|E|@]]|G|1E|I|18O]|$0|18P|1|-4|2|GF|4|CH|6|18Q|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|18R]|$0|18S|1|-4|2|GG|4|7W|6|18T|7|$8|-4|9|@]|A|GH|C|-4|E|@]]|G|19|I|18U]|$0|18V|1|-4|2|GI|4|GJ|6|18W|7|$8|GI|9|@GK|GL]|A|3O|C|-4|E|@]]|G|1F|I|18X]|$0|18Y|1|-4|2|GM|4|9X|6|18Z|7|$8|GM|9|@]|A|L|C|-4|E|@]]|G|17|I|190]|$0|191|1|-4|2|GN|4|GO|6|192|7|$8|-4|9|@]|A|1U|C|-4|E|@]]|G|3A|I|193]|$0|194|1|-4|2|GP|4|GQ|6|195|7|$8|-4|9|@]|A|62|C|-4|Q|-2|E|@]]]|$0|196|1|-4|2|GR|4|GS|6|197|7|$8|-4|9|@]|A|2T|C|-4|E|@]]|G|M|I|198]|$0|199|1|-4|2|GT|4|GU|6|19A|7|$8|-4|9|@]|A|GV|C|-4|E|@]]|G|M|I|19B]|$0|19C|1|-4|2|GW|4|CI|6|19D|7|$8|-4|9|@]|A|4H|C|-4|E|@]]|G|T|I|19E]|$0|19F|1|-4|2|GX|4|CJ|6|19G|7|$8|-4|9|@]|A|2J|C|-4|E|@]]|G|T|I|19H]|$0|19I|1|-4|2|GY|4|CK|6|19J|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|19K]|$0|19L|1|-4|2|GZ|4|H0|6|19M|7|$8|-4|9|@]|A|52|C|-4|E|@]]|G|1E|I|19N]|$0|19O|1|-4|2|H1|4|9Y|6|19P|7|$8|-4|9|@]|A|4O|C|-4|E|@]]|G|17|I|19Q]|$0|19R|1|-4|2|H2|4|CL|6|19S|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|19T]|$0|19U|1|-4|2|H3|4|CM|6|19V|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|19W]|$0|19X|1|-4|2|H4|4|7X|6|19Y|7|$8|-4|E|@]|9|@]|A|B|C|-4|D|-2]|G|19|I|19Z]|$0|1A0|1|-4|2|H5|4|H6|6|1A1|7|$8|H5|E|@]|9|@]|A|41|C|-4|D|-2]|G|1F|I|1A2]|$0|1A3|1|-4|2|H7|4|BG|6|1A4|7|$8|-4|9|@]|A|B7|C|-4|E|@]]|G|34|I|1A5]|$0|1A6|1|-4|2|H8|4|H9|6|1A7|7|$8|-4|9|@]|A|L|C|-4|E|@]]|G|16|I|1A8]|$0|1A9|1|-4|2|HA|4|36|6|1AA|7|$8|-4|E|@$0|1AB|4|25]|$0|1AC|4|6H]|$0|1AD|4|8G]|$0|1AE|4|8Y]|$0|1AF|4|9B]|$0|1AG|4|AT]|$0|1AH|4|BI]|$0|1AI|4|F3]|$0|1AJ|4|HB]|$0|1AK|4|HC]|$0|1AL|4|HD]]|9|@]|A|B0|C|-4|D|-1]|G|19|I|1AM]|$0|1AN|1|-4|2|HE|4|37|6|1AO|7|$9|@1L|2X|HF|HG|HH]|8|HE|E|@$0|1AP|4|71]|$0|1AQ|4|6X]|$0|1AR|4|AF]|$0|1AS|4|C0]|$0|1AT|4|F1]|$0|1AU|4|FO]|$0|1AV|4|FY]|$0|1AW|4|G4]|$0|1AX|4|G8]|$0|1AY|4|HI]|$0|1AZ|4|HJ]|$0|1B0|4|HK]|$0|1B1|4|HL]]|A|L|C|37|D|-2]|G|1C|I|1B2]|$0|1B3|1|-4|2|HM|4|HN|6|1B4|7|$8|-4|E|@$0|1B5|4|HO]]|9|@]|A|B|C|-4|D|-2]|G|11|I|1B6]|$0|1B7|1|-4|2|HP|4|2Z|6|1B8|7|$8|-4|9|@]|A|4H|C|-4|E|@]]|G|3A|I|1B9]|$0|1BA|1|-4|2|HQ|4|4D|6|1BB|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|47|I|1BC]|$0|1BD|1|-4|2|HR|4|HS|6|1BE|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|18|I|1BF]|$0|1BG|1|-4|2|HT|4|CN|6|1BH|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1BI]|$0|1BJ|1|-4|2|HU|4|HV|6|1BK|7|$8|-4|9|@]|A|21|C|-4|E|@]]|G|11|I|1BL]|$0|1BM|1|-4|2|HW|4|38|6|1BN|7|$8|HW|9|@HX|HY|HZ]|A|57|C|-4|E|@]]|G|39|I|1BO]|$0|1BP|1|-4|2|I0|4|39|6|1BQ|7|$9|@HX|HG|2Z|I1|40]|8|I0|E|@$0|1BR|4|7C]|$0|1BS|4|38]|$0|1BT|4|A1]]|A|57|C|39|D|-2]|G|1C|I|1BU]|$0|1BV|1|-4|2|I2|4|7Y|6|1BW|7|$8|-4|E|@$4|19|0|1BX]]|9|@]|A|B|C|-4|D|-1|F|-2]|G|19|I|1BY]|$0|1BZ|1|-4|2|I3|4|I4|6|1C0|7|$8|-4|9|@]|A|W|C|-4|D|-2|Q|-2|E|@]|F|-2]]|$0|1C1|1|-4|2|I5|4|I6|6|1C2|7|$8|-4|9|@]|A|26|C|-4|E|@]]|G|3A|I|1C3]|$0|1C4|1|-4|2|I7|4|I8|6|1C5|7|$8|-4|9|@]|A|3O|C|-4|D|-2|Q|-2|E|@]|F|-2]]|$0|1C6|1|-4|2|I9|4|18|6|1C7|7|$8|I9|E|@$0|1C8|4|28]|$0|1C9|4|49]|$0|1CA|4|4T]|$0|1CB|4|5R]|$0|1CC|4|6C]|$0|1CD|4|85]|$0|1CE|4|B2]|$0|1CF|4|E3]|$0|1CG|4|EX]|$0|1CH|4|HS]|$0|1CI|4|IA]|$0|1CJ|4|IB]|$0|1CK|4|IC]|$0|1CL|4|ID]]|9|@1K|IE|IF|1R|IG]|A|8P|C|18|D|-2]|G|14|I|1CM]|$0|1CN|1|-4|2|IH|4|II|6|1CO|7|$8|-4|9|@]|A|4O|C|-4|D|-2|Q|-2|E|@]|F|-2]]|$0|1CP|1|-4|2|IJ|4|IK|6|1CQ|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|1E|I|1CR]|$0|1CS|1|-4|2|IL|4|CO|6|1CT|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1CU]|$0|1CV|1|-4|2|IM|4|IA|6|1CW|7|$8|-4|9|@]|A|57|C|-4|E|@]]|G|18|I|1CX]|$0|1CY|1|-4|2|IN|4|3A|6|1CZ|7|$8|IO|E|@$0|1D0|4|5M]|$0|1D1|4|5P]|$0|1D2|4|6R]|$0|1D3|4|32]|$0|1D4|4|8A]|$0|1D5|4|93]|$0|1D6|4|AV]|$0|1D7|4|FJ]|$0|1D8|4|G7]|$0|1D9|4|GO]|$0|1DA|4|2Z]|$0|1DB|4|I6]|$0|1DC|4|IP]|$0|1DD|4|3B]]|9|@]|A|4O|C|-4|D|-1]|G|1C|I|1DE]|$0|1DF|1|-4|2|IQ|4|CP|6|1DG|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1DH]|$0|1DI|1|-4|2|IR|4|CQ|6|1DJ|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1DK]|$0|1DL|1|-4|2|IS|4|2N|6|1DM|7|$8|IS|9|@]|A|E5|C|-4|E|@]]|G|1B|I|1DN]|$0|1DO|1|-4|2|IT|4|IU|6|1DP|7|$8|-4|9|@]|A|L|C|-4|E|@]]|G|1E|I|1DQ]|$0|1DR|1|-4|2|IV|4|CR|6|1DS|7|$8|-4|9|@]|A|2T|C|-4|E|@]]|G|T|I|1DT]|$0|1DU|1|-4|2|IW|4|HB|6|1DV|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|36|I|1DW]|$0|1DX|1|-4|2|IX|4|IB|6|1DY|7|$8|-4|9|@]|A|4H|C|-4|E|@]]|G|18|I|1DZ]|$0|1E0|1|-4|2|IY|4|IC|6|1E1|7|$8|-4|9|@]|A|G2|C|-4|E|@]]|G|18|I|1E2]|$0|1E3|1|-4|2|IZ|4|J0|6|1E4|7|$8|-4|9|@]|A|L|C|-4|E|@]]|G|1E|I|1E5]|$0|1E6|1|-4|2|J1|4|2O|6|1E7|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|2I|I|1E8]|$0|1E9|1|-4|2|J2|4|J3|6|1EA|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|1D|I|1EB]|$0|1EC|1|-4|2|J4|4|9Z|6|1ED|7|$8|-4|9|@]|A|FI|C|-4|E|@]]|G|T|I|1EE]|$0|1EF|1|-4|2|J5|4|J6|6|1EG|7|$8|-4|9|@]|A|J7|C|-4|E|@]]|G|16|I|1EH]|$0|1EI|1|-4|2|J8|4|HI|6|1EJ|7|$8|-4|9|@]|A|W|C|-4|E|@]]|G|37|I|1EK]|$0|1EL|1|-4|2|J9|4|CS|6|1EM|7|$8|-4|9|@]|A|9I|C|-4|E|@]]|G|T|I|1EN]|$0|1EO|1|-4|2|JA|4|IP|6|1EP|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|3A|I|1EQ]|$0|1ER|1|-4|2|JB|4|JC|6|1ES|7|$8|-4|9|@]|A|3O|C|-4|D|-2|E|@]|F|-2]|G|1D|I|1ET]|$0|1EU|1|-4|2|JD|4|HO|6|1EV|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|HN|I|1EW]|$0|1EX|1|-4|2|JE|4|JF|6|1EY|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|1E|I|1EZ]|$0|1F0|1|-4|2|JG|4|H|6|1F1|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@$0|1F2|4|5]|$0|1F3|4|23]|$0|1F4|4|8E]]|F|-2]|G|14|I|1F5]|$0|1F6|1|-4|2|JH|4|JI|6|1F7|7|$8|-4|9|@]|A|4H|C|-4|E|@]]|G|1F|I|1F8]|$0|1F9|1|-4|2|JJ|4|CT|6|1FA|7|$8|JJ|9|@]|A|26|C|-4|D|-2|E|@]]|G|T|I|1FB]|$0|1FC|1|-4|2|JK|4|JL|6|1FD|7|$8|-4|9|@]|A|G2|C|-4|E|@]]|G|M|I|1FE]|$0|1FF|1|-4|2|JM|4|HJ|6|1FG|7|$8|-4|9|@]|A|BF|C|-4|E|@]]|G|37|I|1FH]|$0|1FI|1|-4|2|JN|4|JO|6|1FJ|7|$8|-4|9|@]|A|L|C|-4|E|@]]|G|1E|I|1FK]|$0|1FL|1|-4|2|JP|4|CU|6|1FM|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1FN]|$0|1FO|1|-4|2|JQ|4|CV|6|1FP|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1FQ]|$0|1FR|1|-4|2|JR|4|CW|6|1FS|7|$8|JR|9|@DH|DI|JS]|A|1U|C|-4|D|-2|E|@]]|G|T|I|1FT]|$0|1FU|1|-4|2|JT|4|A0|6|1FV|7|$8|JT|9|@JU|40|JV]|A|4H|C|-4|E|@]]|G|17|I|1FW]|$0|1FX|1|-4|2|JW|4|CX|6|1FY|7|$8|-4|9|@]|A|L|C|-4|E|@]]|G|T|I|1FZ]|$0|1G0|1|-4|2|JX|4|CY|6|1G1|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1G2]|$0|1G3|1|-4|2|JY|4|CZ|6|1G4|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1G5]|$0|1G6|1|-4|2|JZ|4|D0|6|1G7|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1G8]|$0|1G9|1|-4|2|K0|4|1D|6|1GA|7|$8|-4|9|@]|A|62|C|-4|D|-2|E|@$0|1GB|4|1Y]|$0|1GC|4|2E]|$0|1GD|4|3W]|$0|1GE|4|6L]|$0|1GF|4|73]|$0|1GG|4|75]|$0|1GH|4|7E]|$0|1GI|4|88]|$0|1GJ|4|8I]|$0|1GK|4|97]|$0|1GL|4|99]|$0|1GM|4|AH]|$0|1GN|4|AJ]|$0|1GO|4|BK]|$0|1GP|4|EP]|$0|1GQ|4|FQ]|$0|1GR|4|7Y]|$0|1GS|4|J3]|$0|1GT|4|JC]]|F|-2]|G|14|I|1GU]|$0|1GV|1|-4|2|K1|4|11|6|1GW|7|$8|K1|E|@$4|14|0|1GX]|$0|1GY|4|10]|$0|1GZ|4|20]|$0|1H0|4|3N]|$0|1H1|4|4Q]|$0|1H2|4|67]|$0|1H3|4|6N]|$0|1H4|4|7A]|$0|1H5|4|8K]|$0|1H6|4|9D]|$0|1H7|4|AH]|$0|1H8|4|B6]|$0|1H9|4|BU]|$0|1HA|4|BY]|$0|1HB|4|DW]|$0|1HC|4|E8]|$0|1HD|4|EG]|$0|1HE|4|ET]|$0|1HF|4|F5]|$0|1HG|4|G0]|$0|1HH|4|6F]|$0|1HI|4|HN]|$0|1HJ|4|HV]|$0|1HK|4|K2]|$0|1HL|4|K3]|$0|1HM|4|K4]|$0|1HN|4|K5]|$0|1HO|4|K6]]|9|@1L|DP|K5|K7]|A|K8|C|K9|D|-2|F|-2]|G|14|I|1HP]|$0|1HQ|1|-4|2|KA|4|KB|6|1HR|7|$8|-4|9|@]|A|B|C|-4|Q|@]|E|@]]]|$0|1HS|1|-4|2|KC|4|D1|6|1HT|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1HU]|$0|1HV|1|-4|2|KD|4|KE|6|1HW|7|$8|-4|9|@]|A|21|C|-4|E|@]]|G|1E|I|1HX]|$0|1HY|1|-4|2|KF|4|D2|6|1HZ|7|$8|-4|E|@]|9|@]|A|4O|C|-4|D|-1]|G|T|I|1I0]|$0|1I1|1|-4|2|KG|4|ED|6|1I2|7|$8|-4|9|@]|A|B|C|-4|E|@$0|1I3|4|EC]]]]|$0|1I4|1|-4|2|KH|4|KI|6|1I5|7|$8|-4|9|@]|A|B|C|-4|D|-2|Q|-2|E|@$4|1D|0|1I6]]|F|-2]]|$0|1I7|1|-4|2|KJ|4|HK|6|1I8|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|37|I|1I9]|$0|1IA|1|-4|2|KK|4|D3|6|1IB|7|$8|-4|9|@]|A|L|C|-4|E|@]]|G|T|I|1IC]|$0|1ID|1|-4|2|KL|4|D4|6|1IE|7|$8|-4|9|@]|A|21|C|-4|E|@]]|G|T|I|1IF]|$0|1IG|1|-4|2|KM|4|D5|6|1IH|7|$8|-4|E|@]|9|@]|A|B|C|-4|D|-2]|G|T|I|1II]|$0|1IJ|1|-4|2|KN|4|D6|6|1IK|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1IL]|$0|1IM|1|-4|2|KO|4|D7|6|1IN|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1IO]|$0|1IP|1|-4|2|KP|4|KQ|6|1IQ|7|$8|-4|9|@]|A|29|C|-4|E|@]]|G|M|I|1IR]|$0|1IS|1|-4|2|KR|4|D8|6|1IT|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1IU]|$0|1IV|1|-4|2|KS|4|A1|6|1IW|7|$8|-4|9|@]|A|KT|C|-4|E|@]]|G|17|I|1IX]|$0|1IY|1|-4|2|KU|4|K2|6|1IZ|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|11|I|1J0]|$0|1J1|1|-4|2|KV|4|KW|6|1J2|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|1E|I|1J3]|$0|1J4|1|-4|2|KX|4|K3|6|1J5|7|$8|-4|E|@]|9|@]|A|3I|C|-4|D|-2]|G|1E|I|1J6]|$0|1J7|1|-4|2|KY|4|1E|6|1J8|7|$8|KZ|E|@$4|14|0|1J9]|$0|1JA|4|4W]|$0|1JB|4|51]|$0|1JC|4|78]|$0|1JD|4|8U]|$0|1JE|4|92]|$0|1JF|4|EL]|$0|1JG|4|EN]|$0|1JH|4|EV]|$0|1JI|4|FG]|$0|1JJ|4|GE]|$0|1JK|4|H0]|$0|1JL|4|IK]|$0|1JM|4|IU]|$0|1JN|4|J0]|$0|1JO|4|JF]|$0|1JP|4|JO]|$0|1JQ|4|KE]|$0|1JR|4|KW]|$0|1JS|4|K3]|$0|1JT|4|L0]|$0|1JU|4|6Z]]|9|@JS|1R|82|1K|1L|L1|L2|L3]|A|26|C|M|D|-1|F|-2]|G|14|I|1JV]|$0|1JW|1|-4|2|L4|4|7R|6|1JX|7|$A|3F|E|@]|9|@]]|G|32|I|1JY]|$0|1JZ|1|-4|2|L5|4|L6|6|1K0|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|16|I|1K1]|$0|1K2|1|L7|2|L8|4|1F|6|1K3|7|$8|L9|E|@$0|1K4|4|4G]|$0|1K5|4|5R]|$0|1K6|4|61]|$0|1K7|4|7E]|$0|1K8|4|5V]|$0|1K9|4|EI]|$0|1KA|4|F7]|$0|1KB|4|F9]|$0|1KC|4|FB]|$0|1KD|4|FM]|$0|1KE|4|GJ]|$0|1KF|4|H6]|$0|1KG|4|JI]|$0|1KH|4|LA]|$0|1KI|4|LB]]|A|LC|C|LD|9|@LE|1L|BP|99|A7|LF]|D|-2|F|-2]|G|14|I|1KJ]|$0|1KK|1|-4|2|LG|4|D9|6|1KL|7|$8|-4|9|@]|A|A9|C|-4|E|@]]|G|T|I|1KM]|$0|1KN|1|-4|2|LH|4|2P|6|1KO|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|2I|I|1KP]|$0|1KQ|1|-4|2|LI|4|DA|6|1KR|7|$8|-4|9|@]|A|57|C|-4|E|@]]|G|T|I|1KS]|$0|1KT|1|-4|2|LJ|4|DB|6|1KU|7|$8|-4|9|@]|A|2J|C|-4|E|@]]|G|T|I|1KV]|$0|1KW|1|-4|2|LK|4|DC|6|1KX|7|$8|-4|9|@]|A|4H|C|-4|E|@]]|G|T|I|1KY]|$0|1KZ|1|-4|2|LL|4|4E|6|1L0|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|47|I|1L1]|$0|1L2|1|-4|2|LM|4|A2|6|1L3|7|$8|LM|9|@]|A|62|C|-4|E|@]]|G|T|I|1L4]|$0|1L5|1|-4|2|LN|4|LO|6|1L6|7|$8|-4|9|@]|A|B|C|-4|Q|@]|E|@]]]|$0|1L7|1|-4|2|LP|4|L0|6|1L8|7|$8|-4|9|@]|A|52|C|-4|E|@]]|G|1E|I|1L9]|$0|1LA|1|-4|2|LQ|4|DD|6|1LB|7|$8|-4|9|@]|A|GC|C|-4|E|@]]|G|T|I|1LC]|$0|1LD|1|-4|2|LR|4|3B|6|1LE|7|$8|-4|E|@$0|1LF|4|5D]]|9|@]|A|LS|C|-4|D|-1]|G|3A|I|1LG]|$0|1LH|1|-4|2|LT|4|K4|6|1LI|7|$8|-4|9|@]|A|LS|C|-4|E|@]]|G|11|I|1LJ]|$0|1LK|1|-4|2|LU|4|DE|6|1LL|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1LM]|$0|1LN|1|-4|2|LV|4|A3|6|1LO|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]]|G|17|I|1LP]|$0|1LQ|1|-4|2|LW|4|LX|6|1LR|7|$8|-4|9|@]|A|LY|C|-4|E|@]]|G|16|I|1LS]|$0|1LT|1|-4|2|LZ|4|M0|6|1LU|7|$8|-4|E|@$4|16|0|1LV]]|9|@]|A|B|C|-4|D|-2]|G|16|I|1LW]|$0|1LX|1|-4|2|M1|4|G6|6|1LY|7|$8|-4|9|@]|A|L|C|-4|E|@]]|G|6F|I|1LZ]|$0|1M0|1|-4|2|M2|4|DF|6|1M1|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1M2]|$0|1M3|1|-4|2|M3|4|ID|6|1M4|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|18|I|1M5]|$0|1M6|1|-4|2|M4|4|DG|6|1M7|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1M8]|$0|1M9|1|-4|2|M5|4|LA|6|1MA|7|$8|M6|9|@]|A|7H|C|-4|E|@]]|G|1F|I|1MB]|$0|1MC|1|-4|2|M7|4|DH|6|1MD|7|$8|-4|9|@]|A|2J|C|-4|E|@]]|G|T|I|1ME]|$0|1MF|1|-4|2|M8|4|DI|6|1MG|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|T|I|1MH]|$0|1MI|1|-4|2|M9|4|DJ|6|1MJ|7|$8|-4|9|@]|A|GV|C|-4|E|@]]|G|T|I|1MK]|$0|1ML|1|-4|2|MA|4|LB|6|1MM|7|$8|MA|9|@BP|IG]|A|MB|C|-4|E|@]]|G|1F|I|1MN]|$0|1MO|1|-4|2|MC|4|K5|6|1MP|7|$8|-4|9|@]|A|GV|C|-4|E|@]]|G|11|I|1MQ]|$0|1MR|1|MD|2|ME|4|16|6|1MS|7|$8|3G|E|@$0|1MT|4|1W]|$0|1MU|4|25]|$0|1MV|4|GB]|$0|1MW|4|H9]|$0|1MX|4|36]|$0|1MY|4|J6]|$0|1MZ|4|L6]|$0|1N0|4|LX]|$0|1N1|4|M0]|$0|1N2|4|HD]]|9|@2X|MF|1O|2Q|MG|MH|MI|MJ|MK|A7|80|1I|JS|ML|1L|IG|IF|MM|MN|1K|MO|MP]|A|MQ|C|MR|D|-2|F|-2]|G|14|I|1N3]|$0|1N4|1|-4|2|MS|4|HC|6|1N5|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|36|I|1N6]|$0|1N7|1|-4|2|MT|4|K6|6|1N8|7|$8|-4|9|@]|A|B|C|-4|D|-2|E|@]|F|-2]|G|11|I|1N9]|$0|1NA|1|-4|2|MU|4|M|6|1NB|7|$8|MV|E|@$0|1NC|4|K]|$0|1ND|4|47]|$0|1NE|4|67]|$0|1NF|4|FU]|$0|1NG|4|GS]|$0|1NH|4|GU]|$0|1NI|4|JL]|$0|1NJ|4|KQ]|$0|1NK|4|6Z]]|9|@]|A|4X|C|-4|D|-2|F|-2]|G|14|I|1NL]|$0|1NM|1|-4|2|MW|4|A4|6|1NN|7|$8|-4|9|@]|A|26|C|-4|E|@]]|G|17|I|1NO]|$0|1NP|1|-4|2|MX|4|A5|6|1NQ|7|$8|-4|9|@]|A|2C|C|-4|E|@]]|G|17|I|1NR]|$0|1NS|1|-4|2|MY|4|DK|6|1NT|7|$8|-4|9|@]|A|21|C|-4|D|-2|E|@]|F|-2]|G|T|I|1NU]|$0|1NV|1|-4|2|MZ|4|HL|6|1NW|7|$8|-4|9|@]|A|B|C|-4|E|@]]|G|37|I|1NX]|$0|1NY|1|-4|2|N0|4|6Z|6|1NZ|7|$8|-4|9|@]|A|4H|C|-4|E|@]]|G|M|I|1O0]|$0|1O1|1|-4|2|N1|4|HD|6|1O2|7|$8|-4|E|@]|9|@]|A|N2|C|-4]|G|16|I|1O3]]";

/***/ }),

/***/ "./node_modules/vibemap-constants/dist/cities.json":
/*!*********************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/cities.json ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"id":"ffcaf00b-8b8c-4bf0-a03e-5f53f21b0701","mailchimp_id":null,"name":"Alameda, CA","city":null,"state":"CA","shortname":"Alameda","slug":"alameda","type":"hidden","admin_level":"city","centerpoint":[-122.24191187109032,37.76534619050406],"location":{"latitude":37.76534619050406,"longitude":-122.24191187109032},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":12,"id_wordpress":56488},{"id":"57778528-908f-4b42-9ddd-e756dcbb1428","mailchimp_id":null,"name":"Appanoose County","city":null,"state":null,"shortname":"Appanoose County","slug":"appanoose_county","type":"early","admin_level":"city","centerpoint":[-92.87412642140572,40.73431521480227],"location":{"latitude":40.73431521480227,"longitude":-92.87412642140572},"zoom_start":null,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"31c71dc4-b861-42a3-b722-03d52894fc24","mailchimp_id":"1d933c234f","name":"Austin, TX","city":null,"state":"TX","shortname":"Austin","slug":"austin","type":"early","admin_level":"city","centerpoint":[-97.74501799209159,30.26766933412888],"location":{"latitude":30.26766933412888,"longitude":-97.74501799209159},"zoom_start":12,"bearing_start":null,"pitch_start":null,"radius":20,"id_wordpress":38387},{"id":"01aee2d8-75f1-4f34-9ced-a155f4bb7e55","mailchimp_id":null,"name":"Berkeley, CA","city":null,"state":"CA","shortname":"Berkeley","slug":"berkeley","type":"hidden","admin_level":"city","centerpoint":[-122.26796148503786,37.86997517250884],"location":{"latitude":37.86997517250884,"longitude":-122.26796148503786},"zoom_start":12,"bearing_start":null,"pitch_start":null,"radius":12,"id_wordpress":56490},{"id":"f31dfe4b-00fd-4f99-81bf-1a70b7ce5d7e","mailchimp_id":null,"name":"Birmingham, AL","city":null,"state":"AL","shortname":"The Magic City","slug":"the-magic-city","type":"early","admin_level":"city","centerpoint":[-86.80340765698308,33.51914300798579],"location":{"latitude":33.51914300798579,"longitude":-86.80340765698308},"zoom_start":null,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"56a56e10-460e-40d0-a72f-58b04bd051b4","mailchimp_id":"b865b3ef72","name":"Chicago, IL","city":null,"state":"IL","shortname":"Chicago","slug":"chicago","type":"official","admin_level":"city","centerpoint":[-87.62609480591793,41.882074196644645],"location":{"latitude":41.882074196644645,"longitude":-87.62609480591793},"zoom_start":12,"bearing_start":null,"pitch_start":null,"radius":20,"id_wordpress":38148},{"id":"88668d03-7605-41c8-9d16-cabf84dcf34e","mailchimp_id":null,"name":"Chillicothe","city":null,"state":null,"shortname":"Chillicothe","slug":"chillicothe","type":"hidden","admin_level":"city","centerpoint":[-89.484350668849,40.91577339143399],"location":{"latitude":40.91577339143399,"longitude":-89.484350668849},"zoom_start":14,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"3552c34f-9946-44ac-a982-592043bba2e1","mailchimp_id":null,"name":"Dallas, TX","city":null,"state":"TX","shortname":"Dallas","slug":"dallas","type":"early","admin_level":"city","centerpoint":[-96.79701803766334,32.776833732609774],"location":{"latitude":32.776833732609774,"longitude":-96.79701803766334},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":10,"id_wordpress":55522},{"id":"a2a38afe-f0e1-445c-92eb-7518acdaaf82","mailchimp_id":"b576abf895","name":"Denver, CO","city":null,"state":"CO","shortname":"Denver","slug":"denver","type":"official","admin_level":"city","centerpoint":[-104.9888706064419,39.73921143083599],"location":{"latitude":39.73921143083599,"longitude":-104.9888706064419},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":20,"id_wordpress":38380},{"id":"f0ac905a-e5cb-499b-8625-a623139c6d49","mailchimp_id":null,"name":"Downtown Portland, ME","city":null,"state":"ME","shortname":null,"slug":"downtown-portland","type":"early","admin_level":"city","centerpoint":[-70.25885580992247,43.65787511863841],"location":{"latitude":43.65787511863841,"longitude":-70.25885580992247},"zoom_start":14,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"4b85c8e2-80fa-460e-8d44-1aac8c7660ee","mailchimp_id":null,"name":"Downtown Tampa","city":null,"state":null,"shortname":"Downtown Tampa","slug":"downtown-tampa","type":"early","admin_level":"city","centerpoint":[-82.4563199,27.949447],"location":{"latitude":27.949447,"longitude":-82.4563199},"zoom_start":null,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"c084c6fa-369d-4508-949d-daf6e6e1c113","mailchimp_id":null,"name":"East Peoria","city":null,"state":null,"shortname":"East Peoria","slug":"east-peoria","type":"hidden","admin_level":"city","centerpoint":[-89.58006261532013,40.666284633377046],"location":{"latitude":40.666284633377046,"longitude":-89.58006261532013},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"d9dd3771-3ba6-44cc-965b-f172ae7d4c0c","mailchimp_id":null,"name":"Elmwood","city":null,"state":null,"shortname":"Elmwood IL","slug":"elmwood-il","type":"hidden","admin_level":"city","centerpoint":[-89.96620415387446,40.777975257756324],"location":{"latitude":40.777975257756324,"longitude":-89.96620415387446},"zoom_start":14,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"b239f810-ce35-4ac5-9d6e-08a316d6e4a8","mailchimp_id":null,"name":"Fulton County","city":null,"state":null,"shortname":"Fulton County","slug":"fulton-county","type":"early","admin_level":"city","centerpoint":[-90.03514765438196,40.5581345944574],"location":{"latitude":40.5581345944574,"longitude":-90.03514765438196},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"6e31a0eb-e654-4405-80b3-c7aa01c68191","mailchimp_id":"e5598770be","name":"Guadalajara, JAL","city":null,"state":"JAL","shortname":"Guadalajara","slug":"guadalajara","type":"official","admin_level":"city","centerpoint":[-103.34581373683528,20.676999695845534],"location":{"latitude":20.676999695845534,"longitude":-103.34581373683528},"zoom_start":12,"bearing_start":-1.23,"pitch_start":null,"radius":10,"id_wordpress":1450},{"id":"a4a14002-755c-4596-be99-08d0c4680ff3","mailchimp_id":"ea2fe099f2","name":"Houston, TX","city":null,"state":"TX","shortname":"Houston","slug":"houston","type":"official","admin_level":"city","centerpoint":[-95.36343096361392,29.758861342696047],"location":{"latitude":29.758861342696047,"longitude":-95.36343096361392},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":30,"id_wordpress":45678},{"id":"25893582-dcad-4cd2-8ec1-66599356a73f","mailchimp_id":null,"name":"Hyde Park, Chicago","city":null,"state":"Chicago","shortname":"Hyde Park","slug":"hyde-park","type":"hidden","admin_level":"city","centerpoint":[-87.60876379999999,41.80546409999996],"location":{"latitude":41.80546409999996,"longitude":-87.60876379999999},"zoom_start":null,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"c9a66e10-a1c4-482b-b47f-03d33c87495a","mailchimp_id":"403aaf0a11","name":"Los Angeles, CA","city":null,"state":"CA","shortname":"Los Angeles","slug":"los-angeles","type":"official","admin_level":"city","centerpoint":[-118.24670923698993,34.05415565319232],"location":{"latitude":34.05415565319232,"longitude":-118.24670923698993},"zoom_start":12,"bearing_start":null,"pitch_start":null,"radius":30,"id_wordpress":38119},{"id":"c1adb0b0-c5f0-4ad5-b712-eeb3f320aac1","mailchimp_id":null,"name":"Mason County","city":null,"state":null,"shortname":"Mason County","slug":"mason-county","type":"early","admin_level":"city","centerpoint":[-89.84550474823354,40.232870240679276],"location":{"latitude":40.232870240679276,"longitude":-89.84550474823354},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"c560692d-c554-4dc8-a50b-9493beb34bc6","mailchimp_id":null,"name":"Memphis, TN","city":null,"state":"TN","shortname":"Home of the Blues","slug":"memphis","type":"early","admin_level":"city","centerpoint":[-90.05175589260534,35.14602174101943],"location":{"latitude":35.14602174101943,"longitude":-90.05175589260534},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":10,"id_wordpress":60877},{"id":"3e1f6100-e8ec-4663-b959-c7e41851d56a","mailchimp_id":"e5598770be","name":"Mexico City, CDMX","city":null,"state":"CDMX","shortname":"Mexico City","slug":"mexico-city","type":"early","admin_level":"city","centerpoint":[-99.0527343612074,19.311143352478304],"location":{"latitude":19.311143352478304,"longitude":-99.0527343612074},"zoom_start":12,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"4505fd97-4768-47bf-b653-e8da5e381d4c","mailchimp_id":"56ebd9923f","name":"New York, NY","city":null,"state":"NY","shortname":"New York","slug":"new-york","type":"official","admin_level":"city","centerpoint":[-73.9947223573414,40.72599967574379],"location":{"latitude":40.72599967574379,"longitude":-73.9947223573414},"zoom_start":12,"bearing_start":null,"pitch_start":null,"radius":20,"id_wordpress":38143},{"id":"41c05cbb-e431-47e0-a702-0a39f90ce429","mailchimp_id":"f58e029346","name":"Norfolk, VA","city":null,"state":"VA","shortname":"Norfolk","slug":"norkolk","type":"hidden","admin_level":"city","centerpoint":[-76.28554343115562,36.84559407019498],"location":{"latitude":36.84559407019498,"longitude":-76.28554343115562},"zoom_start":11,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"6bfe09a3-34c3-489a-8693-c6da18d5a528","mailchimp_id":"da0894a0e6","name":"Oakland, CA","city":null,"state":"CA","shortname":"Oakland","slug":"oakland","type":"official","admin_level":"city","centerpoint":[-122.27113722052209,37.804373633176105],"location":{"latitude":37.804373633176105,"longitude":-122.27113722052209},"zoom_start":11,"bearing_start":26.3,"pitch_start":null,"radius":20,"id_wordpress":1447},{"id":"fc38d9a6-a75e-4fbb-9bd9-7438504b7d60","mailchimp_id":null,"name":"Pekin","city":null,"state":null,"shortname":"Pekin","slug":"pekin","type":"hidden","admin_level":"city","centerpoint":[-89.6406054372004,40.56750183788999],"location":{"latitude":40.56750183788999,"longitude":-89.6406054372004},"zoom_start":14,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"d3f1d7ce-9472-4392-8640-77f535e7fac2","mailchimp_id":"57302","name":"Peoria Heights","city":null,"state":null,"shortname":"Peoria Heights","slug":"peoria-heights","type":"hidden","admin_level":"city","centerpoint":[-89.5743870610475,40.746924374583735],"location":{"latitude":40.746924374583735,"longitude":-89.5743870610475},"zoom_start":14,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":57307},{"id":"235c9dc0-d6a6-4293-a656-abf512995374","mailchimp_id":"58578fcae6","name":"Peoria, IL","city":null,"state":"IL","shortname":"Peoria","slug":"peoria","type":"early","admin_level":"city","centerpoint":[-89.59022282307566,40.69436248260995],"location":{"latitude":40.69436248260995,"longitude":-89.59022282307566},"zoom_start":12,"bearing_start":null,"pitch_start":null,"radius":10,"id_wordpress":52306},{"id":"1051c44b-cd1c-4ae0-8730-349c2ee81c4d","mailchimp_id":null,"name":"Portland, ME","city":null,"state":"ME","shortname":"Portland","slug":"portland-me","type":"official","admin_level":"city","centerpoint":[-70.2582641646811,43.658573412039445],"location":{"latitude":43.658573412039445,"longitude":-70.2582641646811},"zoom_start":null,"bearing_start":null,"pitch_start":null,"radius":10,"id_wordpress":59015},{"id":"1fc95260-6940-4757-bb26-39b03686fb88","mailchimp_id":"27c0467a17","name":"Portland, OR","city":null,"state":"OR","shortname":"Portland","slug":"portland-or","type":"official","admin_level":"city","centerpoint":[-122.67642973146059,45.523908756701125],"location":{"latitude":45.523908756701125,"longitude":-122.67642973146059},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":9,"id_wordpress":1441},{"id":"05205a9e-b38e-4f36-b560-01a396adef2d","mailchimp_id":null,"name":"Princeville","city":null,"state":null,"shortname":"Princeville IL","slug":"princeville-il","type":"hidden","admin_level":"city","centerpoint":[-89.75791453065783,40.93057722651726],"location":{"latitude":40.93057722651726,"longitude":-89.75791453065783},"zoom_start":14,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"954b2484-77ea-43bb-97b3-2c072b1689ba","mailchimp_id":"57c905a1df","name":"Puerto Vallarta, JAL","city":null,"state":"JAL","shortname":"Puerto Vallarta","slug":"puerto-vallarta","type":"early","admin_level":"city","centerpoint":[-105.23364363635632,20.609020650313113],"location":{"latitude":20.609020650313113,"longitude":-105.23364363635632},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":4,"id_wordpress":44901},{"id":"2f86fd6b-3cdc-41f3-92ae-b41dc2101662","mailchimp_id":"7fb6e2a465","name":"San Diego, CA","city":null,"state":"CA","shortname":"San Diego","slug":"san-diego","type":"official","admin_level":"city","centerpoint":[-117.16035019737146,32.71559656683386],"location":{"latitude":32.71559656683386,"longitude":-117.16035019737146},"zoom_start":12,"bearing_start":null,"pitch_start":null,"radius":20,"id_wordpress":38137},{"id":"2b22ebd8-d96d-4396-9033-3f296293a968","mailchimp_id":"f30df08e52","name":"San Francisco, CA","city":null,"state":"CA","shortname":"San Francisco","slug":"san-francisco","type":"official","admin_level":"city","centerpoint":[-122.41928098880994,37.77523155978081],"location":{"latitude":37.77523155978081,"longitude":-122.41928098880994},"zoom_start":12,"bearing_start":-4,"pitch_start":null,"radius":5,"id_wordpress":1444},{"id":"d42e63d2-a680-4484-ac11-649ca484740d","mailchimp_id":"ef90288b3c","name":"San Jose, CA","city":null,"state":"CA","shortname":"San Jose","slug":"san-jose","type":"early","admin_level":"city","centerpoint":[-121.89331052990144,37.331948569147215],"location":{"latitude":37.331948569147215,"longitude":-121.89331052990144},"zoom_start":12,"bearing_start":0,"pitch_start":0,"radius":15,"id_wordpress":55524},{"id":"afcbdca1-5848-4bdf-90b8-d4fb3d86aaa3","mailchimp_id":null,"name":"Santa Clara","city":null,"state":null,"shortname":"The Mission City","slug":"santa-clara","type":"official","admin_level":"city","centerpoint":[-121.9543146917118,37.35279514140096],"location":{"latitude":37.35279514140096,"longitude":-121.9543146917118},"zoom_start":null,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"142ed33f-d405-489e-9d14-bd71486a08e5","mailchimp_id":"baadb78d87","name":"Seattle, WA","city":null,"state":"WA","shortname":"Seattle","slug":"seattle","type":"official","admin_level":"city","centerpoint":[-122.33134878960345,47.60272764341253],"location":{"latitude":47.60272764341253,"longitude":-122.33134878960345},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":8,"id_wordpress":1438},{"id":"4fc37e93-ef8b-4f1d-a17a-ce6b91170ed8","mailchimp_id":null,"name":"Stark County","city":null,"state":null,"shortname":"Stark County","slug":"stark-county","type":"hidden","admin_level":"city","centerpoint":[-89.77306364717445,41.06152625637429],"location":{"latitude":41.06152625637429,"longitude":-89.77306364717445},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"f1967265-2eb4-474f-9547-630961bd3d9c","mailchimp_id":null,"name":"Tampa, FL","city":null,"state":"FL","shortname":"The Big Guava","slug":"the-big-guava","type":"official","admin_level":"city","centerpoint":[-82.45492457195759,27.950796808907633],"location":{"latitude":27.950796808907633,"longitude":-82.45492457195759},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"34971667-cb89-46d1-a5a7-24b6aae89495","mailchimp_id":null,"name":"Tazewell County","city":null,"state":null,"shortname":"Tazewell County","slug":"tazewell-county","type":"early","admin_level":"city","centerpoint":[-89.47540281957568,40.526448290415516],"location":{"latitude":40.526448290415516,"longitude":-89.47540281957568},"zoom_start":12.5,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"006aec24-5193-4902-b1c9-6446c4fe1da9","mailchimp_id":null,"name":"The Junction, Toronto","city":null,"state":"Toronto","shortname":"The Junction","slug":"the-junction","type":"early","admin_level":"city","centerpoint":[-79.47213279999995,43.66550880000001],"location":{"latitude":43.66550880000001,"longitude":-79.47213279999995},"zoom_start":null,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"42dfa01a-b48d-4bab-9843-e34f6c3b1b40","mailchimp_id":"95135b1969","name":"Toronto, ON","city":null,"state":"ON","shortname":"Toronto","slug":"toronto","type":"early","admin_level":"city","centerpoint":[-79.40917967644656,43.66469252331888],"location":{"latitude":43.66469252331888,"longitude":-79.40917967644656},"zoom_start":12,"bearing_start":null,"pitch_start":null,"radius":20,"id_wordpress":51835},{"id":"9e07707f-ab88-46f3-bf3b-f26a702665ce","mailchimp_id":null,"name":"Tulsa","city":null,"state":null,"shortname":"Tulsa, OK","slug":"tulsa-ok","type":"early","admin_level":"city","centerpoint":[-95.99398611639802,36.155326911051404],"location":{"latitude":36.155326911051404,"longitude":-95.99398611639802},"zoom_start":null,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"bf753c41-259b-4f7b-bf43-44ab0fe4be57","mailchimp_id":"da30e0d7dc","name":"Vancouver, BC","city":null,"state":"BC","shortname":"Vancouver","slug":"vancouver","type":"early","admin_level":"city","centerpoint":[-123.118716606276,49.28244857379048],"location":{"latitude":49.28244857379048,"longitude":-123.118716606276},"zoom_start":12,"bearing_start":2.85,"pitch_start":null,"radius":7,"id_wordpress":1435},{"id":"b36ad0e5-589e-4454-b3f4-78722fd636b5","mailchimp_id":null,"name":"Village of Morton","city":null,"state":null,"shortname":"Morton IL","slug":"morton-il","type":"hidden","admin_level":"city","centerpoint":[-89.46020005887726,40.612218743334516],"location":{"latitude":40.612218743334516,"longitude":-89.46020005887726},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"a484215e-f08c-4344-b331-c0a040e60353","mailchimp_id":null,"name":"Washington County","city":null,"state":null,"shortname":null,"slug":"","type":"early","admin_level":"city","centerpoint":[-89.40659879393723,40.70339966736671],"location":{"latitude":40.70339966736671,"longitude":-89.40659879393723},"zoom_start":13,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null},{"id":"289e6fcb-b2f6-4e7b-945d-475ffde79683","mailchimp_id":null,"name":"Woodford County","city":null,"state":null,"shortname":"Woodford County","slug":"woodford-county","type":"hidden","admin_level":"city","centerpoint":[-89.40725325293971,40.70336794644869],"location":{"latitude":40.70336794644869,"longitude":-89.40725325293971},"zoom_start":12.5,"bearing_start":null,"pitch_start":null,"radius":null,"id_wordpress":null}]');

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
module.exports = "description|Arousing+amusement+in+the+silly+and+illogical|name|Absurd|slug|absurd|details|categories|vibeset|vibes|crazy|unexpected|outrageous|silly|weird|strange|funny|eccentric|whimsical|search_term|msv|affirmations|Not+everything+has+to+make+sense|Embrace+the+unknown|Academic|academic|bookish|nerdy|literary|educational|cultural|civic|Accessible|accessible|inclusive|affordable|open|participatory|helpful|Action|action|adventurous|wild|extreme|adrenaline|healthy|supportive|energetic|enthusiastic|busy|Engaging+and+energetic+pursuits|Active|active|outdoors|fitness|exercise|workout|wellness|Take+a+step+forward|A+simple+is+positive+movement|Bringing+about+positive+change|Activist|activist|term_id|Community|community|term_group|term_taxonomy_id|taxonomy|activity|Explore+ways+to+get+involved+in+your+local+community.+Support+local+businesses,+volunteer,+give+back,+or+pay+it+forward+with+these+community+groups+and+hubs+of+local+culture.+|parent|count|filter|raw|solidarity|vegan|radical|hippie|feminist|volunteer|justice|Fairness+and+justice+are+a+jam|Challenging+the+status+quo|Showing+up+for+a+fair,+kind,+joyous+world|+What+new+solutions+can+you+bring+about?|Adorable|adorable|cute|sweet|Adrenaline|adventure|Willingness+to+try+new+things|Adventurous|scenic|eclectic|aquatic|sporty|lively|rebel|hiking|bold|carefree|courageous|inventive|outdoorsy|playful|passionate|wanderlust|imaginative|recess|Everyday+can+be+full+of+excitement|Picture+new+possibilities|Always+keep+those+tricks+up+your+sleeves|Aesthetic|aesthetic|artsy|chic|cinematic|decorative|design|elegant|luxe|minimalist|fancy|stylish|bright|fashion|Affordable|cheap|After+Party|after-party|dark|party|buzzing|After+Work|after-work|fun|boozy|chill|Afternoon|afternoon|sunny|relaxing|lazy|weekend|summer|lunch|Spacious,+light-filled+bliss|Airy|airy|patio|fresh|dreamy|earthy|breezy|serene|lush|pastel|crisp|mellow|soothing|beautiful|seductive|oasis|tranquil|wistful|angelic|Take+a+deep+breath+of+light+air|Aloha|aloha|happy|welcoming|kindness|namaste|tiki|love|surf|ocean|tropical|floral|paradise|beach|Open+to+other+possibilities|Alternative|alternative|indie|boho|revolutionary|There+are+few+deadends|Unexpected+wonder\n|Amazing|amazing|cool|fantastic|exciting|interesting|magical|delightful|memorable|sublime|inspired|Americana|americana|traditional|classic|kitschy|retro|nostalgic|Throw+it+back+to+the+old+school+ways|Analog|analog|oldschool|handmade|throwback|deepcut|hifi|legacy|Take+it+back+to+another+time|Angelic|soulful|blissful|joyful|sensual|sparkly|blessed|enchanted|gentle|sexy|empath|Animals|animals|Outdoors|0|Cute|vibe|Endearing+and+youthful|2|Cats|cats|3|Children|children|Young+and+innocent|4|Wild|Natural+and+uninhibited|Anime|anime|dress-up|sci-fi|cosplay|geeky|Nostalgic+collectables|Antique|antique|Shopping|shop|vintage|collectable|cottage|art|historic|homemade|heritage|Add+to+your+collection|Under+the+sea|Aquatic|colorful|nautical|mermaid|scuba|waterfront|coastal|+Be+at+peace+amongst+the+water|Architecture|architecture|creative|iconic|popularity_in_django|Arctic|arctic|cold|snowy|frosty|wintry|Human+creativity|Art|street-art|interactive|dance|experiential|Imagine+the+world+around+you+as+a+painting|Art-Deco|art-deco|Handmade+and+traditional+crafts|Artisanal|artisanal|foodie|organic|craft|rustic|gourmet|nosh|Appreciate+the+care+put+into+things|Surrounded+and+made+from+art|Artsy|hipster|funky|trendy|groovy|edgy|quirky|highbrow|deluxe|glam|beatnik|fashionista|Imagine+the+world+around+you+as+a+painting|Listening+to+that+creative+energy|The+art+of+living+with+others|Listen+to+your+creative+energy+today|Atmosphere|atmosphere|fairytale|harmonious|Original,+genuine,+and+true|Authentic|authentic|family|unique|wholesome|Being+yourself+is+attractive|Looking+at+the+world+through+through+fresh+eyes|Make+a+new+ritual+that+speaks+to+your+truest+self|An+open+understanding|Aware|aware|mindful|curious|grateful|optimistic|proud|Elevate+your+knowledge|awesome|Badass|badass|punk|dope|Bagel|bagel|kosher|coffee|granola|Balanced|balanced|zen|calm|Beach|warm|vacation|picnic|tourist|sunset|getaway|staycation|Beatnik|rock|jazzy|laidback|trippy|grunge|psychedelic|disco|Pleasing+to+the+senses|Beautiful|classy|vibrant|Beauty+is+everywhere|A+place+that+invites+and+feels+right|Belonging|belonging|friendly|trust|+Find+a+home+away+from+home|You+belong+here|Tune+into+the+vibration+around+you|Of+great+size+or+intensity|Big|big|vast|There+is+always+more|Human-powered+movement|Biking|biking|urban|park|Experience+the+freedom+of+cruising|Bizarre|bizarre|Blessed|generous|comforting|Complete+joy|Blissful|Bliss+is+near|Complete+joy|Lacking+the+need+to+confirm+to+society|Boho|You+do+you|Strong+and+vivid|Bold|visionary|dramatic|Build+in+confidence|Boogie|boogie|Enjoyment+of+stories+and+learning|Bookish|moody|+A+good+book+can+take+you+anywhere|Intoxicating+experiences|Boozy|social|hangover|drinks|tipsy|rowdy|drinking|raunchy|Let+loose+and+celebrate+anything|Natural+green+and+goodness|Botanical|botanical|mystic|garden|natural|plant|restorative|jungle|Sprout+roots+and+grow|Boujee|boujee|upscale|Boutique|boutique|luxury|pampering|posh|opulent|Breezy|Bright|lit|glitter|neon|Bubbly+late+breakfast+with+friends|Brunch|brunch|tasty|savory|snacky|hearty|delicious|diner|Bubblegum|bubblegum|pretty|Business|business|sections|Bussin|bussin|Full+of+activity|Busy|crowded|festive|Let+loose+and+celebrate+anything|Humming+feelings+or+sounds|Buzzing|popular|trending|popping|red-hot|loud|Gotta+have+the+funk|Feel+the+good+vibrations|Caffeine|caffeine|California|california|seasonal|Undisturbed+and+unshakable|Calm|peaceful|quiet|quiet-energy|Embrace+stillness|Into+the+wild|Camp|camp|rugged|ranch|Exaggerated+and+amusing+humor|Campy|campy|original|sassy|Take+it+over+the+top|Candlelit|candlelit|romantic|datespot|intimate|Cannabis|cannabis|smokey|No+worries|Carefree|casual|Let+it+all+go|Caribbean|caribbean|Relaxed+and+easy|Casual|comfy|+Go+with+the+flow|Enjoying+something+special|Celebratory|celebratory|special|Applaud+the+people+growing+alongside+you|There+are+many+causes+to+celebrate|Express+love+to+your+road+dogs|Celebrity|celebrity|exclusive|hollywood|shopaholic|Centered|centered|Charming|charming|Almost+free|Cheap|free|simple|Free+as+in+freedom|Cheerful|cheerful|Chic|Young+and+innocent|kidcore|young|playtime|intergenerational|Remember+a+happy+place|Relaxed+in+a+way+you+want+to+be+around|Chill|Refused+to+be+rushed|Super+calm+vibes+are+in+your+future|Living+in+the+moment+is+part+of+being+chill|Christmas|christmas|yuletide|holiday|Dramatic+and+moving|Cinematic|musical|film|Imagine+the+score+to+your+adventure|City+Life|city-life|Being+a+part+of+the+city|Civic|local|positive|public|neighborhood|Community+=+a+force+far+greater+than+money|Show+up+in+every+way+you+can|Collectively-minded+is+a+cool+way+to+be|Outstanding+over+time|Classic|Rituals+bring+perspective|Timeless+outlasts+trends|Embrace+one+retro+activity+today|Classy|Clean|clean|Club|club|music|Clubhouse|clubhouse|Coastal|Coffee|Cold|Collaborative|collaborative|together|innovative|Lively,+expressive,+and+bright|Colorful|rainbow|Imagine+yourself+as+a+mural|Comforting|refreshing|Comfy|cozy|Your+people|multicultural|Support+those+around+you|Contemporary|contemporary|modern|Conversational|conversational|Cool|Cosplay|costume|futuristic|halloween|Costume|Cottage|cottagecore|Calm,+collected,+and+always+in+style|Cottagecore|country|Country|roadhouse|western|cowboy|rodeo|cowgirl|honky-tonk|Country+Club|country-club|country+club|Couple|couple|couples|Courageous|spirited|fierce|Cowboy|woodsy|lumberjack|Cowgirl|Warm,+snug,+and+loved|Cozy|+Wrap+yourself+in+something+fluffy|Made+with+care+and+skill|Craft|diy|folk|Crazy|laugh|Creative|entrepreneurial|dynamic|The+world+needs+your+creativity|Creative+energy+exists+in+all+aspects+of+your+life|Crisp|Crowded|Crunchy|crunchy|flavorful|Ideas+and+identities|Cultural|diverse|spiritual|Find+inspiration+in+a+group|Roam+through+new+teachings+today|Connect+to+a+place+and+its+story+today|Take+an+artsy+path+today|Eager+to+learn+and+explore|Curious|entertaining|mysterious|+Free+to+grow+and+roam|Learning+about+yourself+is+the+same+as+learning+about+the+world|Make+space+for+a+new+lesson+today|Endearing+and+youthful|Picture+your+favorite+animal+playing|Cutty|cutty|hidden-gem|hip-hop|Shakin'+&amp;+swayin|Dance|shimmy|singing|Move+with+the+beat+of+the+music|Dark|spooky|Date+Spot|Seek+out+your+person|Dating|dating|kinky|Seek+out+your+person|Decorative|If+you+know,+you+know|Deep+Cut|Appreciate+what+your+childhood+taught+you|Delicious|spicy|juicy|slurpy|sugary|Delightful|Deluxe|Desert|desert|Design|Diner|Disco|Discover|discover|explore|wander|Dive|dive|old|A+variety+of+it+all|Diverse|We+are+in+this+together|Do-It-Yourself|DIY|eco|recyled|Make+use+of+what+you+have+in+abundance|Dogs|dogs|Anything+good|Dope|Dramatic|Magical+or+otherworldly|Dreamy|Picture+yourself+anywhere+you+like|Each+moment+is+new|Dress-up|dri\\|dri|drink|Tasty+beverages+with+friends|Drinking|nightlife|latenight|+Give+a+toast+to+absent+friends|Take+some+downtime+today|Keep+a+full+bottle+of+water+with+you+today|Drinks|All+the+swagger|Drip|drip|Always+be+yourself|Constantly+changing+and+evolving|Dynamic|transformative|Try+shifting+your+mindset+today|Stay+open+to+new+ideas+today|Earthy|sustainable|green|Eccentric|Diverse+styles+and+tastes|Eclectic|Living+life+in+full|Discover+your+next+favorite+thing|Picture+new+possibilities|From+earth+and+good+for+earth|Eco|thrift|Edgy|Educational|Eerie|eerie|gothic|supernatural|haunted|Refined+style+and+taste|Elegant|elevated|You+deserve+a+slide+of+goodness|Positivity+and+respect|Elevated|refined|Emo|emo|emotional|All+the+feelings|Emotional|intense|Empath|Enchanted|Full+of+vitality+and+possibility|Energetic|A+positive+attitude+boosts+your+energy|The+world+needs+your+energy+today|Entertaining|Enthusiastic|Entrepreneurial|Epic|epic|legendary|Euro|euro|french|parisian|Evergreen|evergreen|forest|Beyond+stoked|Exciting|It’s+time+for+one+new+daily+ritual!|Stay+open+to+deeper+connections+today.|The+world+needs+your+enthusiasm.+Get+out+there.|Exclusive|vip|Exercise|selfcare|Experiential|Experimental|experimental|fusion|Take+a+new+path|Explore|Extreme|Fairytale|utopian|Together+with+those+you+love|Family|Taking+time+to+show+the+genes+some+love|Pouring+good+love+into+my+people|Take+time+to+enjoy+your+people|family+friendly|family-friendly|Famous|famous|favorite|Fancy|Fantastic|Fantasy|fantasy|Farout|farout|Fashion|All+about+the+glam|Fashionista|treatyourself|Fast|fast|Favorite|Feminist|queer|subversive|Femme|femme|Cheerful+and+colorful+gathering|Festive|Be+the+life+of+the+party|Fierce|Film|novel|Fitness|Flapper|flapper|prohibition|speakeasy|Flavorful|Flex|flex|Flirty|flirty|Floral|Focused|forcused|work|productive|hardworking|study|Traditions+of+everyday+people|Folk|Music|Make+time+to+look+at+the+Moon|Honor+the+wisdom+traditions|Food+is+life|Foodie|vegetarian|Forest|At+no+cost|Free|French|Nice,+new,+and+refreshing|Fresh|new|Savor+something+crisp,+sweet+and+made+from+light|Kind+and+inviting|Friendly|Open+the+door+to+friendship|Frosty|Fruity|fruity|Enjoyment+and+laughter|Fun|Plan+a+playdate|Funky|Comedic+relief|Funny|spontaneous|Remember+to+laugh|Laughter+is+essential+to+survival|Truth+comes+through+laughter|Fusion|Futuristic|Games|games|Growth+of+fruits+and+flowers|Garden|Admire+new+growth+in+something+old|Gay|gay|lgbtq|Profound+Enthusiasm|Geeky|Belonging+is+a+club+for+us+all|Abundance+of+giving|Generous|Pay+something+forward|Gentle|Getaway|Beautiful+beyond+compare|Glam|Your+light+is+strong|Glitter|Global|global|international|Goofy|goofy|Gothic|Gourmet|Granola|Grateful|Greek|greek|Green|Grimy|grimy|underground|Groovy|Grunge|Halloween|paranormal|pumpkin|Handmade|Hangover|Hanukkah|hanukkah|Happy|Happy+Hour|happy-hour|Hardworking|Positive+balance|Harmonious|Haunted|witchy|Healing|healing|rejuvenating|All+about+what+is+good+for+you|Healthy|Make+your+self+care+a+priority|Take+care+of+yourself|Hearty|Helpful|Heritage|old-world|All+about+that+high+quality|Hi+Fi|You+deserve+the+best|Amazing+but+not+widely+known|Hidden+Gem|secret|Highbrow|Walking+around+in+nature|Hiking|walk|Hip|hip|Hip+Hop|Chill+out|Hippie|Dance+to+the+beat+of+your+own+drum|Hipster|Places+of+importance|Historic|Cross+paths+with+so+many+who+came+before|Holiday|Holistic|holistic|perspective|Hollywood|Homemade|Honky-tonk|Hot|hot|Hustle|hustle|+Cozy+&amp;+Comfortable|Hygge|hygge|Hyphy|hyphy|Iconic|landmark|Imaginative|Immaculate|immaculate|impeccable|Impeccable|In+Solidarity|in-solidarity|Common+good|In-solidarity|+Goodness+in+groups+multiplies|Envision+a+new+way+of+being|Collectively-minded+is+a+cool+way+to+be|Open+to+everyone|Inclusive|Who’s+missing?+Work+on+acknowledgement+and+awareness+today|Finding+common+ground+takes+a+good+heart|Be+especially+open+to+the+beauty+of+others+today|Independent+and+original|Indie|Industrial|industrial|Influencial|influencial|Innovative|Brilliant+and+life+affirming|Inspired|Higher+places+are+calling|Your+inner+beauty+is+shining|Smiling+makes+the+brain+think+happy+thoughts|Intense|Interactive|Arousing+curiosity+and+feeling|Interesting|Intergenerational|International|Warmth+of+closeness|Intimate|small|Intimacy+flourishes+in+safe+spaces|Inventive|Inviting|inviting|Eye+catching+style|Jazzy|Feeling+great+pleasure+and+happiness|Joyful|Be+happy+with+yourself|Looking+for+joy+is+a+pleasure+itself|Juicy|Jungle|Justice|Kidcore|Kindness|Kinky|Kitschy|The+oddest+things+can+bring+the+greatest+joys|Kosher|Laid-back|Landmark|Late+Night|Laugh|Lax|lax|Lazy|Legacy|Legendary|Legit|legit|LGBTQ|Liberating|liberating|It's+happening|Lit|Find+yourself+amongst+the+crowds|Literary|Full+of+energy+and+activity|Lively|+Enjoy+the+sound+of+indistinct+chatter|Stay+open+to+having+a+wild+experience+today|Belonging+to+a+nearby+area+and+community|Local|Actively+supporting+my+network|Making+time+for+mutual+growth|Spread+that+local+love+today|See+some+local+history+today|It's+turned+up|Loud|Let+your+voice+be+heard|Profound+affection+for+yourself+and+others|Love|The+magnificent+opportunities+of+an+open+heart|Valuing+the+unions+in+our+life|A+healthy+dose+of+acceptance+helps|Lovely|lovely|Low-Key|low-key|Lumberjack|Lunch|Food|food|Eat+and+explore+culinary+culture.+Whether+your+vibe+is+a+lively+brunch,+a+friendly+lunch,+a+chill+breakfast,+or+an+intimate+dinner,+we've+got+you+covered+with+the+best+restaurants+and+other+places+to+eat,+including+outdoor+patios,+rooftop+bars,+and+markets.+You+can+also+discover+by+taste,+like+savory,+sweet,+and+spicy.|Lush|Oh+so+fancy|Luxe|You+define+your+beauty|So+glamourous|Luxury|You+define+your+beauty|Beyond+the+ordinary|Magical|Life+bringing+surprises+&+triumphs|There+is+magic+in+showing+up|Find+inspiration+is+somewhere+unexpected|Mellow|Memorable|From+the+land+to+the+sea|Mermaid|Be+authentically+yourself|Messy|messy|Mid-century|mid-century|Aware+of+the+present|Mindful|Dig.+Deep.+Down.|Envision+a+new+way+of+being|Turning+your+gaze+toward+yourself|Mingle|mingle|Simple+and+good+use+of+effort|Minimalist|Freeing+up+mental+space+for+new+opportunities|Modern|sophisticated|A+sudden+burst+of+a+mood|Moody|Be+flexible+as+your+personality+evolves|Stay+tuned+in+with+your+feelings|Morning|morning|Mountain|mountain|Multicultural|Sounds+of+feeling+and+harmony|Musical|Curating+a+joyful+playfist|Music+is+like+mother’s+medicine|Slow+down+with+a+slow+jam+today|Must-See|must-see|Mysterious|Holding+onto+that+spiritual+magic|Mystic|Your+hold+your+own+power|Namaste|yoga|Of+the+earth|Natural|Be+one+with+the+land|Be+part+of+the+natural+world|Of+the+sea|Nautical|Neighborhood|All+the+bright+lights|Neon|Shine+your+brightest|Nerdy|New|New+Wave|new-wave|Nightlife|Snack+on|Nosh|Remembrance+of+the+past|Nostalgic|Recreate+some+aspect+of+local+history|A+nostalgic+experience+is+in+your+future|Novel|Like+finding+water+in+the+desert|Oasis|Ocean|Old|Respect+for+the+coolness+of+earlier+eras|Old+School|Remember+to+keep+it+evergreen|Recreate+some+aspect+of+local+history|Old+World|Open|Optimistic|Opulent|Oregon|oregon|Organic|Eat+and+explore+culinary+culture.+Whether+your+vibe+is+a+lively+brunch,+a+friendly+lunch,+a+chill+breakfast,+or+an+intimate+dinner,+we've+got+you+covered+with+the+best+restaurants+and+other+places+to+eat,+including+outdoor+patios,+rooftop+bars,+and+markets.+You+can+also+discover+by+taste,+like+savory,+sweet,+and+spicy.|Original|Outside+in+open+air|Nurturing+the+soul+through+nature|Being+one+with+the+sun,+the+stars,+the+elements|Beinging+one+with+the+land|Outdoorsy|views|Nurturing+the+soul+through+nature|Explore+the+sun,+the+stars,+the+elements+and+yourself|Being+one+with+the+sun,+the+stars,+the+elements|Outgoing|outgoing|Outrageous|Pampering|A+wide+beautiful+view|Panoramic|panoramic|photo|skyline|Paradise|Paranormal|Everyday,+effortless+chic|Parisian|The+outdoor+spaces+we+all+share|Park|+Enjoy+a+break+and+people+watch|Participatory|Party|Deeply+caring+for+something|Passionate|Lean+in+to+what+you+care+about|+Dreamy+and+calm|Pastel|Relaxation+shared+outdoors|Patio|+Enjoy+a+break+and+people+watch|Patriotic|patriotic|Tranquil+and+undisturbed|Peaceful|Finding+room+to+breathe|A+slice+of+something+soothing+and+lush|Pools+of+peace+can+be+found+within|Perspective|Photo|Photogenic|photogenic|picturesque|Afternoon+in+the+park|Picnic|Seeing+an+old+view+a+new+way|Picturesque|Plant|Fun+and+games|Playful|Make+an+errand+a+game|Take+time+to+enjoy+pets+&+animals|Breathe+deeper|Playtime|It's+on+fire|Poppin'|It's+happening|Popular|Joy+multiplies+when+shared+widely|Do+one+activity+beloved+by+many|Ephemeral+experiences|Popup|popup|Posh|Good+vibes+only|Positive|Pass+along+good+vibes|Pretty|Priceless|priceless|Productive|Progressive|progressive|Prohibition|Deserved+power+and+pleasure|Proud|Speaking+truth+without+hesitation|Reclaiming+our+stories|Find+a+new+way+to+engage+in+civic+pride|Psychedelic|Public|Pumpkin|Punk|Queer|A+space+with+little+distraction|Quiet|safe|Being+comfortable+in+silence|Listen+for+that+divine+intelligence|Establish+a+calm+environment+today|Quiet+Energy|Quirky|On+the+edge+of+the+common|Radical|Bravely+go+out+into+the+world|Move+beyond+your+wildest+dreams|Rainbow|Ranch|Raunchy|Original+and+outside+the+box|Rebel|Learn+the+rules+and+bend+them|Recess|Recyled|reuse|Red-Hot|Refined|Refreshing|Rejuvenating|A+release+of+tension|Relaxing|+Doing+nothing+is+fine|Let+go|Renowned|renowned|Restorative|Styles+of+the+past|Retro|Honor+the+things+that+came+before|Give+respect+to+the+coolness+of+earlier+eras|Vintage+is+built+to+last+-+go+explore+why|Reuse|Revolutionary|Roadhouse|Rock|Rodeo|Grand+feelings,+especially+love|Romantic|+Nothing+nourishes+like+a+warm+embrace|There+is+more+love+awaiting|Love+is+there+even+when+not+easy+to+see|Rooftop|rooftop|Rowdy|Wild+&amp;+rough|Rugged|Rustic|Safe|Salty|salty|san+francisco+museums|san-francisco-museums|Sassy|Savory|Scary|scary|Impressive+and+beautiful+views|Scenic|Seeing+an+old+view+a+new+way|Sci-fi|Scuba|Seasonal|Secret|Seductive|Take+care+of+yourself|Self+Care|Invoking+the+senses|Sensual|A+warm+embrace+is+so+nourishing|There+is+more+love+ahead+|Serene|Sexy|Shakin'+&amp;+swayin'|Shimmy|turnedup|+Move+with+the+beat+of+the+music|Shop|Shop+till+you+drop|Shopaholic|Silly|Simple|Singing|Skate|skate|Skyline|Slurpy|Smackin'|smackin|yummy|Small|Smokey|Snacky|Snowy|Sober|sober|Get+together+with+good+energy|Social|Get+together+with+good+energy|Soothing|Sophisticated|Soulful|Sparkly|Speakeasy|Special|Spicy|Spirited|Spiritual|Go+with+the+flow|Spontaneous|Spooky|Sporty|Spring|spring|Staycation|Strange|Street+Art|Study|Stylish|Sublime|Subversive|Sugary|Summer|Full+of+warmth+and+light|Sunny|Sunshine+unites+all+life|Amazing+end+to+the+day|Sunset|Sunshine+unites+all+life|Supernatural|Supportive|Surf|Good+for+the+long+term|Sustainable|Sweet|Taco|taco|Tasty|Good+for+a+second+time|Thrift|Of+another+time|Throwback|Hold+your+memories+close|Tiki|Timeless|timeless|Tipsy|Closeness+and+shared+experiences|Togetherness|Belonging+is+a+club+for+us+all|Tokyo|tokyo|Top+vibes+on+Vibemap|Top|top|Tourist|Visit|visit|Visitors+guide+to+the+best+of+%25city%25.+Discover+culture,+history,+and+landmarks+while+having+a+fun,+memorable+time+sightseeing+and+exploring.+We've+collected+must+see+spots+and+favorite+for+tourist+and+locals+alike.+Plan+your+trip+or+weekend+getaway+and+book+these+attractions+for+free+or+at+a+discount.|Traditional|Tranquil|Transformative|Transit|transit|You+deserve+it|Treat+Yourself|Trending|Drop+into+something+new|Currents+of+taste|Trendy|Drop+into+something+new|Unexpectedly+different|Trippy|Look+for+the+unexpected|Warm+and+lush|Tropical|Find+your+life's+adventure|Trust|Volume+to+11|Turned+Up|You+are+the+life+of+the+party|Turnt|turnt|Ugly|ugly|If+you+know,+you+know|Underground|You+find+what+you+need+where+you+least+expect+it|Unexpected|Unique|Upbeat|upbeat|Upscale|Urban|Utopian|Vacation|Be+mine+&lt;3|Valentine|valentine|Vast|Conscious+eating+and+good+greens|Vegan|Eat+and+explore+culinary+culture.+Whether+your+vibe+is+a+lively+brunch,+a+friendly+lunch,+a+chill+breakfast,+or+an+intimate+dinner,+we've+got+you+covered+with+the+best+restaurants+and+other+places+to+eat,+including+outdoor+patios,+rooftop+bars,+and+markets.+You+can+also+discover+by+taste,+like+savory,+sweet,+and+spicy.|Vegetarian|Full+of+energy+and+life|Vibrant|Your+presence+helps+make+vibrancy|Feel+the+pulse+of+life|Pleasing+landscapes+or+environments|Views|Be+present+and+look+beyond|In+and+of+the+past|Vintage|Honor+things+that+came+before|VIP|Visionary|Vivacious|vivacious|Helping+other+and+giving+back|Volunteer|Explore+ways+to+get+involved+in+your+local+community.+Support+local+businesses,+volunteer,+give+back,+or+pay+it+forward+with+these+community+groups+and+hubs+of+local+culture.+|Joining+forces+creates+abundance|Service+gives+perspective|Small+acts+can+be+mighty|Walk|Wander|Wanderlust|Warm|Waterfront|Weekend|Weird|Welcoming|Wellness|Wes+Anderson|wes-anderson|Western|Carefree+and+playful+amusement|Whimsical|Have+fun+for+fun's+sake|Welcome+free+expression|Wholesome|Natural+and+uninhibited|Nature+shows+us+ways+of+being|Wintry|Wistful|In+possession+of+the+supernatural|Witchy|wizard|Your+magic+is+strong|Wizard|Woodsy|Work|Workout|Yoga|Young|Yuletide|Yummy|Zen^A|A|A|A|78|4UT|0|4UT|4UV|C|A|A|A|1JK|AU|1O|A|A|A|A|A|2S|B4|A|14|4W4|0|4W4|4UV|E|573|0|573|0|0|6NP|0|6NP|0|0|5A0|0|5A0|0|4|57F|0|57F|0|0|14|A|4V4|0|4V4|4UV|C|AU|4W4|0|4W4|4UV|E|14|5K|4UR|0|4UR|4VY|7|2S|K|4UR|0|4UR|4VY|7|B4|A|5K|K|A|A|A|B4|A|A|JG|A|A|2I|2I|A|A|A|32|5K|A|668|A|5K|A|A|K|A|4Q|4W4|0|4W4|4UV|E|8C|A|A|A|A|5K|A|A|A|A|U|1JK|A|78|A|GO|14|A|14|3UW|U|A|A|A|5K|A|2I|A|A|2S|A|14|3C|A|A|A|2I|A|A|8C|1E|A|A|5K|8W|1O|5K|K|2I|A|5U|GO|A|8C|A|A|A|A|32|A|A|28|4G|2S|A|U|5K|K|A|K|A|A|1O|A|K|B4|A|2S|14|B4|A|5K|A|A|RS|A|A|A|A|K|14|14|A|A|A|A|A|5K|4UR|0|4UR|4VY|7|4W7|0|4W7|4UV|6|334|A|1JK|A|5K|1O|A|4MO|1JK|RS|2I|1O|A|A|A|A|A|A|U|A|A|A|1E|14|78|A|A|A|A|5K|1Y|50|18G|5K|2I|K|M8|K|A|28|K|A|K|A|A|A|K|3W|1Y|K|14|B4|14|A|A|1O|A|U|28|A|U|1O|A|28|K|5K|4MO|A|14|A|A|5K|4VV|0|4VV|4UV|S|A|A|28|1O|A|K|U|A|A|14|A|A|1E|2S|A|1O|A|3M|1Y|A|5K|5K|52I|0|52I|4UV|6|K|28|50|28|50|4VV|0|4VV|4UV|S|2S|8W|A|A|5K|A|A|4Q|A|DC|A|32|A|U|A|B4|A|78|14|K|AU|A|A|A|A|14|A|U|A|K|A|14|A|A|A|A|4Q|6O|K|A|B4|A|U|A|A|K|AK|A|A|B4|A|A|A|A|A|3W|1Y|A|A|K|A|A|A|14|A|A|2I|28|A|M8|3W|A|A|14|A|14|5K|28|1E0|A|28|2I|K|A|A|A|A|14|A|B4|4UY|0|4UY|4UV|F|U|A|3W|A|K|A|K|A|B4|A|B4|A|14|3W|A|B3|JG|4VV|0|4VV|4UV|S|5K|A|12W|104|8W|A|B4|4UT|0|4UT|4UV|C|A|A|78|8C|DC|1O|A|A|A|K|64|A|A|3W|A|A|A|78|A|A|2I^NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN^@$0|1|2|3|4|5|6|$7|-2|8|-2|9|@A|B|C|D|E|F|G|H|I]|J|-4|K|17G|L|@M|N]]]|$0|-4|2|O|4|P|6|$7|-2|8|-2|9|@Q|R|S|T|U|V]|J|-4|K|17H]]|$0|-4|2|W|4|X|6|$7|-2|8|-2|9|@Y|Z|10|11|12]|J|-4|K|17I]]|$0|-4|2|13|4|14|6|$9|@15|16|17|18|19|1A|1B|1C|1D]|7|-2|J|-4|L|-2|K|17J|8|-2]]|$0|1E|2|1F|4|1G|6|$7|-2|8|-2|9|@19|1H|15|1D|1B|1A|1C|1I|1J|1K|1L]|J|-4|K|17K|L|@1M|1N]]]|$0|1O|2|1P|4|1Q|6|$7|@$1R|17L|2|1S|4|1T|1U|17M|1V|17N|1W|1X|0|1Y|1Z|17O|20|17P|21|22]]|8|-2|9|@23|24|Y|1T|V|25|26|27|28|29]|J|-4|K|17Q|L|@2A|2B|2C|2D]]]|$0|-4|2|2E|4|2F|6|$9|@2G|2H]|7|-2|J|-4|L|-2|K|17R|8|-2]]|$0|-4|2|2I|4|18|6|$9|@15|16|17|14]|7|-2|J|-4|L|-2|K|17S|8|-2]]|$0|-4|2|2J|4|2J|6|@1KV]]|$0|2K|2|2L|4|15|6|$7|-2|8|-2|9|@2M|2N|2O|2P|2Q|2R|2S|16|2T|2U|2V|1B|2W|2X|2Y|2Z|30|31|32]|J|-4|K|17T|L|@33|34|35]]]|$0|-4|2|36|4|37|6|$7|-2|8|-2|9|@38|39|3A|3B|3C|3D|3E|3F|3G|I|3H|3I|3J]|J|-4|K|17U]]|$0|-4|2|3K|4|Z|6|$7|-2|8|-2|9|@3L|X|Y]|J|-4|K|17V]]|$0|-4|2|3M|4|3N|6|$9|@3O|16|3P|3Q]|7|-2|J|3P|K|17W|8|-2]]|$0|-4|2|3R|4|3S|6|$9|@3P|3T|3U|3V]|7|-2|J|-4|L|-2|K|17X|8|-2]]|$0|-4|2|3W|4|3X|6|$7|-2|8|-2|9|@3Y|3Z|40|41|42|43]|J|-4|K|17Y]]|$0|44|2|45|4|46|6|$7|-2|8|-2|9|@47|48|3I|49|3D|3F|4A|4B|4C|4D|4E|I|4F|4G|39|4H|3H|4I|3E|4J|4K|4L|4M|4N]|J|-4|K|17Z|L|@4O]]]|$0|-4|2|4P|4|4Q|6|$9|@4R|4S|4T|4U|4V|4W|4X|23|4Y|4Z|50|51|52]|K|180]]|$0|53|2|54|4|55|6|$7|-2|8|-2|9|@56|2R|57|31|25|58]|J|-4|K|181|L|@59]]]|$0|5A|2|5B|4|5C|6|$7|-2|8|-2|9|@5D|5E|5F|4I|5G|5H|A|5I|5J|5K|5L]|J|-4|K|182]]|$0|-4|2|5M|4|5N|6|$9|@5O|5P|5Q|5R|5S]|7|-2|J|-4|K|183|8|-2]]|$0|5T|2|5U|4|5V|6|$7|-2|8|-2|9|@3V|5W|5X|5R|5Y|5Z|60|5O|61|5S]|J|-4|K|184|L|@62]]]|$0|-4|2|63|4|4N|6|$9|@49|4I|64|2H|2G|46|65|66|4C|67|68|69|6A|6B|6C|6D|4M|4J|4H]|K|1KW]]|$0|-4|2|6E|4|6F|6|$7|@$1R|185|2|6G|4|1H|1U|186|1V|187|1W|1X|0|-4|1Z|188|20|189|21|22]]|8|-2|9|$6H|$1R|18A|2|6I|4|2G|1U|18B|1V|18C|1W|6J|0|6K|1Z|18D|20|18E|21|22]|6L|$1R|18F|2|6M|4|6N|1U|18G|1V|18H|1W|6J|0|-4|1Z|18I|20|18J|21|22]|6O|$1R|18K|2|6P|4|6Q|1U|18L|1V|18M|1W|6J|0|6R|1Z|18N|20|18O|21|22]|6S|$1R|18P|2|6T|4|16|1U|18Q|1V|18R|1W|6J|0|6U|1Z|18S|20|18T|21|22]]|J|-4|K|18U]]|$0|-4|2|6V|4|6W|6|$9|@R|6X|6Y|6Z|70]|7|-2|J|-4|L|-2|K|18V|8|-2]]|$0|71|2|72|4|73|6|$7|@$1R|18W|2|74|4|75|1U|18X|1V|18Y|1W|1X|0|-4|1Z|18Z|20|190|21|22]]|8|-2|9|@5W|76|77|78|5S|5X|3B|79|2N|5Q|5P|5R|I|7A|7B|7C]|J|-4|K|191|L|@7D]]]|$0|7E|2|7F|4|2O|6|$7|@$1R|192|2|6G|4|1H|1U|193|1V|194|1W|1X|0|-4|1Z|195|20|196|21|22]]|8|-2|9|@7G|15|7H|7I|4Y|4Z|7J|7K|7L|52|4X]|J|-4|K|197|L|@7M]]]|$0|-4|2|7N|4|7O|6|$9|@V|79|7P|7Q]|7|-2|J|-4|L|-2|7R|-4|K|198|8|-2]]|$0|-4|2|7S|4|7T|6|$9|@7U|7V|7W|7X|4Y]|K|1KX]]|$0|7Y|2|7Z|4|79|6|$7|@$1R|199|2|7Z|4|79|1U|19A|1V|19B|1W|1X|0|-4|1Z|19C|20|19D|21|22]]|8|-2|9|@7P|38|80|81|37|2N|82|3F|3B|I|3C|3A|83]|J|-4|K|19E|L|@84]]]|$0|-4|2|85|4|86|6|$9|@5R|37]|K|1KY]]|$0|87|2|88|4|89|6|$7|-2|8|-2|9|@5X|38|8A|8B|8C|8D|8E|8F]|J|-4|K|19F|L|@8G]]]|$0|8H|2|8I|4|38|6|$7|@$1R|19G|2|7Z|4|79|1U|19H|1V|19I|1W|1X|0|-4|1Z|19J|20|19K|21|22]]|8|-2|9|@7P|81|37|8J|8K|39|5Q|2N|56|8L|8M|8N|8O|I|3F|8P|8Q|79|86|8R|8S|3H|3A|89|31|3J|8T]|J|-4|K|19L|L|@8U|8V|8W|8X]]]|$0|-4|2|8Y|4|8Z|6|$9|@37|4K|4C|4L|46|90|66|4G|91]|7|-2|J|8Z|K|19M|8|-2]]|$0|92|2|93|4|94|6|$7|-2|8|-2|9|@95|5X|2N|38|5O|96|5S|5R|97|7C|76|5P|7B]|J|-4|K|19N|L|@98|99|9A]]]|$0|9B|2|9C|4|9D|6|$7|-2|8|-2|9|@10|9E|9F|9G|4R|1A|9H|9I|X]|J|-4|K|19O|L|@9J]]]|$0|-4|2|9K|4|9K|6|@1KZ]]|$0|-4|2|9L|4|9M|6|$9|@3T|15|16|6C|8M|9N|9O]|K|1L0]]|$0|-4|2|9P|4|9Q|6|$9|@9R|9S|9T|8F|8E]|K|1L1]]|$0|-4|2|9U|4|9V|6|$9|@3V|9W|9X|9E]|7|-2|J|-4|L|-2|K|19P|8|-2]]|$0|-4|2|9Y|4|52|6|$9|@3V|2O|4Z|3Z|9Z|7H|2U|7I|7L|4X|4Y|7K|A0|A1|A2|A3|A4|51|7J|A5]|7|-2|J|-4|K|19Q|8|-2]]|$0|-4|2|A6|4|8S|6|$9|@3V|49|5R|38|Q|8K|A7|9N|57|2U|39|26|8J|A8|A9|AA|H|AB|8N|AC|AD|8M|56]|7|-2|J|8S|K|19R|8|-2]]|$0|AE|2|AF|4|4I|6|$K|19S|9|@49|79|AG|8R|3I|5I|4D|3D|4C|5C|5E|2M|4L|4W|67|AH|3H|6A|5K]|7|-2|J|-4|8|-2|L|@AI]]]|$0|AJ|2|AK|4|AL|6|$7|-2|8|-2|9|@AM|Y|1T|AN]|J|-4|K|19T|L|@AO|AP|AQ]]]|$0|AR|2|AS|4|AT|6|$7|-2|8|-2|9|@AU]|J|-4|K|19U|L|@AV]]]|$0|AW|2|AX|4|AY|6|$7|-2|8|-2|9|@3T|2M|19|1H|AZ|1G|2X|B0|A5|1K|1J]|J|-4|K|19V|L|@B1]]]|$0|-4|2|B2|4|B3|6|$9|@96|H|2N]|7|-2|J|-4|L|-2|K|19W|8|-2]]|$0|-4|2|B4|4|69|6|$9|@9G|9I|4I|4R|66|5C|5E|B5|4N|65|4T|B6]|K|1L2]]|$0|B7|2|B8|4|65|6|$7|-2|8|-2|9|@49|4I|5H|4R|9W|3Z|2U|5I|91|66|4W|4G|4C|4H|5K|4L|4N|6A|B6|4M|90]|J|-4|K|19X|L|@B9|BA]]]|$0|BB|2|BC|4|57|6|$7|-2|8|-2|9|@2N|5R|38|56|55|8K|8L|5D|2U|39|4A|8R|26|8J|A8|A9|3E|3F|8N|8S|8M]|J|-4|K|19Y|L|@BD]]]|$0|BE|2|BF|4|2T|6|$7|-2|8|-2|9|@AH|2V|25|BG|BH|31|8N|2W|15|7G|I]|J|-4|K|19Z|L|@BI]]]|$0|-4|2|BJ|4|BK|6|$9|@AD|8M|82|A8|A7]|7|-2|J|-4|L|-2|K|1A0|8|-2]]|$0|BL|2|BM|4|Q|6|$9|@P|R|S|H|8S|38|6D|A9|8O|8J|BN|57]|7|-2|J|-4|L|@BO]|K|1A1|8|-2]]|$0|BP|2|BQ|4|3U|6|$9|@3Q|BR|BS|3P|BT|3N|BU|BV|BW|BX|8S]|7|-2|J|-4|L|@BY]|K|1A2|8|-2]]|$0|BZ|2|C0|4|C1|6|$K|1A3|9|@4I|1H|50|2O|C2|4Z|48|C3|C4|C5|C6|37|4D|C7|49]|7|-2|J|-4|8|-2|L|@C8]]]|$0|-4|2|C9|4|CA|6|$9|@3G|CB]|K|1L3]]|$0|-4|2|CC|4|CD|6|$K|1A4|9|@38|4I|8L|CB|39|3E|8E|3J|8T|50|57|2N|CE|8R|CF|3H|89|CG|CH|3D]]]|$0|-4|2|CI|4|4B|6|$9|@46|3Y|4F|7X|A9|4G|2U|4C|4M]|K|1L4]]|$0|-4|2|CJ|4|3I|6|$9|@7G|AH|4I|CK|3Y|4F|68|CL|CM]|7|-2|J|-4|K|1A5|8|-2]]|$0|CN|2|CO|4|CP|6|$K|1A6|9|@3T|CQ|3U|3Y|3X|43|CR|CS|BT|CT|8F|CF|8E|CU|9S|CV]|7|-2|J|-4|8|-2]]|$0|-4|2|CW|4|CX|6|$9|@7G|4E|CY|I]|7|-2|J|-4|L|-2|K|1A7|8|-2]]|$0|-4|2|CZ|4|D0|6|$9|-2|7|-2|J|-4|L|-2|7R|-4|K|1A8|8|-2|D1|-2]]|$0|-4|2|D2|4|D3|6|$9|@CQ|5E|8F|CU|8A]|7|-2|J|-4|L|-2|K|1A9|8|-2]]|$0|D4|2|D5|4|1D|6|$7|-2|8|-2|9|@3Q|D6|D7|2Q]|J|-4|K|1AA|L|@D8]]]|$0|D9|2|DA|4|3Q|6|$9|@DB|DC|CK|2Q|16|1B|3P|DD|DE|3N|DF|1C]|7|-2|J|-4|K|1AB|8|-2|L|@DG|DH]]]|$0|-4|2|DI|4|DJ|6|$9|@3Q|CK|16|DD|BT|BW|9S|1B|BS]|7|-2|J|-4|K|1AC|8|-2]]|$0|-4|2|DK|4|DL|6|$9|@4X|52|2X|26|DM]|K|1L5]]|$0|DN|2|DO|4|9X|6|$7|-2|8|-2|9|@3V|DP|9W|4C|4L|DQ|DR]|J|-4|K|1AD|L|@DS]]]|$0|DT|2|DU|4|DV|6|$7|@$1R|1AE|2|6G|4|1H|1U|1AF|1V|1AG|1W|1X|0|-4|1Z|1AH|20|1AI|21|22]]|8|-2|9|@3V|15|2X|DW|42|A1|DX|C7|B0|2S|51|8D|A0|41]|J|-4|K|1AJ]]|$0|DY|2|DZ|4|E0|6|$7|-2|8|-2|9|@3T|G|E|E1|5Q|5R|E2|8N|BX|I|2Y|8M|38]|J|-4|K|1AK|L|@E3]]]|$0|-4|2|E4|4|E5|6|$7|-2|8|-2|9|@E6|3O|E7|E8|BN|4C|A3|3D|65]|J|-4|K|1AL]]|$0|-4|2|E9|4|EA|6|$7|-2|8|-2|9|@3V|19|EB|9O|AC|C1|26]|J|-4|K|1AM]]|$0|EC|2|ED|4|2U|6|$7|-2|8|-2|9|@3V|3Z|9X|EE|2Y|65|A9|66|49|4C|4M|4L]|J|-4|K|1AN|L|@EF]]]|$0|-4|2|EG|4|EH|6|$9|@4Z|3V]|K|1L6]]|$0|EI|2|EJ|4|EE|6|$7|-2|8|-2|9|@3V|3Z|2U|EK|A9]|J|-4|K|1AO|L|@EL]]]|$0|-4|2|6M|4|6N|6|$9|@6F|2G]|7|-2|J|-4|L|-2|K|1AP|8|-2]]|$0|EM|2|EN|4|EO|6|$9|@3T|95|AM|D7|2Q|EP|66|5J|2Y|4S]|7|-2|J|-4|K|1AQ|8|-2|L|@EQ|ER|ES]]]|$0|-4|2|ET|4|EU|6|$9|@DB|CB|8L|EV|3G|3J|8T|EW|3E|EX|CG|8P|CE]|7|-2|J|-4|K|1AR|8|-2]]|$0|-4|2|EY|4|EZ|6|$9|@9V|DP]|7|-2|J|-4|L|-2|K|1AS|8|-2]]|$0|-4|2|F0|4|F1|6|$9|@2G|4W]|7|-2|J|-4|L|-2|K|1AT|8|-2]]|$0|F2|2|F3|4|3L|6|$K|1AU|9|@Y|F4|Z|2U|EE|F5]|7|-2|J|-4|8|-2|L|@F6]]]|$0|-4|2|F7|4|F8|6|$9|@4R|3Y|9H]|7|-2|J|-4|L|-2|K|1AV|8|-2]]|$0|-4|2|F9|4|39|6|$7|-2|8|-2|9|@Y|5R|38|CB|CD|8L|57|3D|8T|8R|3E|CG|3J|3H|6C|8Q|37|4I|CE]|J|-4|K|1AW]]|$0|FA|2|6P|4|6Q|6|$7|-2|8|-2|9|@95|FB|FC|6F|FD|FE]|J|-4|K|1AX|L|@FF]]]|$0|FG|2|FH|4|3V|6|$K|1AY|9|@3Z|65|EE|EK|A9|4H|4G|8Z|9X|46]|7|-2|J|-4|8|-2|L|@FI|FJ|FK]]]|$0|-4|2|FL|4|FM|6|$7|-2|8|-2|9|@D7|EO|7V|7W|7X|FN|FO|A0]|J|-4|K|1AZ]]|$0|FP|2|FQ|4|3A|6|$9|@49|G|EW|FR|BH|3H|FS|AA|E0|56]|7|-2|J|-4|L|@FT]|K|1B0|8|-2]]|$0|-4|2|FU|4|FV|6|@1L7]]|$0|FW|2|FX|4|V|6|$7|-2|8|-2|9|@23|AH|FY|1T|U|FZ|1Q|28|BR|G0|G1]|J|-4|K|1B1|L|@G2|G3|G4]]]|$0|G5|2|G6|4|5P|6|$K|1B2|9|@5W|DB|5R|5O|5C|76|5Y|5S]|7|-2|J|-4|8|-2|L|@G7|G8|G9]]]|$0|-4|2|GA|4|AG|6|$K|1B3|9|@CB|5I|8T|3G|3J|3H|3D|4I|39|8R|3E|CH]]]|$0|-4|2|GB|4|GC|6|$9|@48|F5]|7|-2|J|-4|L|-2|7R|-4|K|1B4|8|-2]]|$0|-4|2|GD|4|GE|6|$9|@82|DF|GF|DD|16]|7|-2|J|-4|L|-2|K|1B5|8|-2]]|$0|-4|2|GG|4|GH|6|$9|@3T|EV]|7|-2|J|GE|K|1B6|8|-2]]|$0|-4|2|GI|4|7L|6|$K|1B7|9|@2O|7H|4B|52|4Y|7K|4Z|2M|A2|4X]|J|7L]]|$0|-4|2|GJ|4|9S|6|$9|@3Q|2Q|DJ|BT]|7|-2|J|-4|K|1B8|8|-2]]|$0|-4|2|GK|4|7U|6|$K|1B9|9|@7V|7T|7W|7X|3V|4B]]]|$0|-4|2|GL|4|GM|6|$9|@7P|GN|81|11|GO|83]|7|-2|J|-4|K|1BA|8|-2]]|$0|-4|2|77|4|77|6|$9|@2N|73|5S|76|5X|5R|I|5Q]|7|-2|J|-4|K|1BB|8|-2]]|$0|GP|2|GQ|4|7G|6|$K|1BC|9|@AH|4I|50|CM|16|2T|7I|4E|2Y|68|CL|I|3I|31|GR]|7|-2|J|-4|L|@GS]|8|-2]]|$0|-4|2|GT|4|B6|6|$9|@DP|3Z|4H|12|GU|4C|4S|4L]|7|-2|J|-4|K|1BD|8|-2]]|$0|-4|2|GV|4|EK|6|$K|1BE|9|@GW|B6|3H|39|3Z|A9|4G]|7|-2|J|-4|8|-2]]|$0|GX|2|1S|4|1T|6|$K|1BF|9|@23|95|AM|FY|U|V|BR|1Q|G1|28|GY|4T|11|1A|4S]|7|-2|J|-4|8|-2|L|@GZ]]]|$0|-4|2|H0|4|H1|6|$9|@H2|3H|3D]|7|-2|J|-4|L|-2|K|1BG|8|-2]]|$0|-4|2|H3|4|H4|6|$9|@3Z|2Y|EE|A9]|K|1L8]]|$0|-4|2|H5|4|5D|6|$9|@3V|DB|4G|GU]|K|1L9]]|$0|-4|2|H6|4|6Z|6|$9|@R|H7|6X|3J|H8|H9|31|6Y|70]|7|-2|J|-4|L|-2|K|1BH|8|-2]]|$0|-4|2|HA|4|H7|6|$9|@EW|6X|H9|E0]|K|1LA]]|$0|-4|2|HB|4|78|6|$9|@HC|EK|8D|C3|DX|A0]|7|-2|J|-4|K|1BI|8|-2]]|$0|HD|2|HE|4|HC|6|$K|1BJ|9|@5W|5O|5S|C4|F5|HF]]]|$0|-4|2|HG|4|HF|6|$9|@EE|HH|HI|HJ|HK|DX|HL|HM]|7|-2|J|-4|K|1BK|8|-2]]|$0|-4|2|HN|4|HO|6|$9|@CB|3G|EV|5O|5P|5W]|7|-2|J|HP|K|1BL|8|-2]]|$0|-4|2|HQ|4|HR|6|$9|@E6|GN|E7|E8|4W|95]|7|-2|J|HS|K|1BM|8|-2]]|$0|-4|2|HT|4|2V|6|$K|1BN|9|@9I|2T|BG|HU|2Z|HV]]]|$0|-4|2|HW|4|HJ|6|$9|@8D|HX|HK|DX|HF|HH|HY|2X]|7|-2|J|-4|K|1BO|8|-2]]|$0|-4|2|HZ|4|HL|6|$9|@EE|HJ|HK|DX|HF|E2|HH]|7|-2|J|-4|K|1BP|8|-2]]|$0|I0|2|I1|4|GW|6|$K|1BQ|9|@9Z|EK|E8|B6|78|HC]|7|-2|J|-4|L|@I2]|8|-2]]|$0|I3|2|I4|4|8C|6|$K|1BR|9|@5X|38|89|3C|7B|73|I5|I6]]]|$0|-4|2|I7|4|A|6|$K|1BS|9|@G|E|16|5|D|F|C|5E|I8]]]|$0|-4|2|I9|4|7P|6|$K|1BT|9|@79|38|2R|9D|3C|5L|E1|31|2W|83|GO|IA|IB|15|5F]|7|-2|J|-4|8|-2|L|@IC|ID]]]|$0|-4|2|IE|4|4F|6|$K|1BU|9|@48|7W|4B|46|49]]]|$0|-4|2|IF|4|D6|6|$9|@3Q|1D|BV|2Q]|K|1LB]]|$0|-4|2|IG|4|IH|6|$9|@II|8F|8A]|K|1LC]]|$0|IJ|2|IK|4|U|6|$K|1BV|9|@IL|FY|1T|9I|94|GY|7C|T|S|V|IM|FE]|7|-2|J|-4|8|-2|L|@IN|IO|IP|IQ]]]|$0|IR|2|IS|4|9F|6|$9|@2N|9D|5G|2Y|IT|F|E|IU|8O|6A]|7|-2|J|-4|K|1BW|8|-2|L|@IV|IW|IX]]]|$0|IY|2|6I|4|2G|6|$K|1BX|9|@2Y|FC|G|6C|D|E2|2H|I]|7|-2|J|-4|L|@IZ]|8|-2]]|$0|-4|2|J0|4|J1|6|$9|@J2|80|J3|5Z|5Y]|K|1LD]]|$0|J4|2|J5|4|82|6|$K|1BY|9|@CK|A8|FR|DD|J6|GF|J7|64|67]|7|-2|J|-4|8|-2|L|@J8]]]|$0|-4|2|J9|4|3O|6|$9|@E5|BN|JA|IU|EB|CM]|K|1LE]]|$0|-4|2|JB|4|E7|6|$9|@3T|E6|GN|E8|E5]|7|-2|J|-4|L|@JC]|K|1BZ|8|-2]]|$0|-4|2|JD|4|JE|6|$K|1C0|9|@E6|GN|E7|JF|6C|E8|4W]|7|-2|J|-4|L|@JG]|8|-2]]|$0|-4|2|JH|4|3B|6|$9|@5X|50|I|73|7G|37|C3|4E|5Q]|K|1LF]]|$0|JI|2|JJ|4|5Z|6|$9|@J2|5R|5S|5V|5Y|55|FY|5W]|7|-2|J|-4|K|1C1|8|-2|L|@JK]]]|$0|-4|2|JL|4|CU|6|$9|@CQ|8A|5I|8F|II|CR|JM|CS|8E|2H|IH|CT|JN|CP|JO|JP]|7|-2|J|-4|K|1C2|8|-2]]|$0|-4|2|JQ|4|5I|6|$9|@CU|5K|2Q|4I|CQ|IT|I|3D|5J|GU|2H|2Y|49|5E]|K|1LG]]|$0|-4|2|JR|4|8Q|6|$9|@CB|3G|3E|CE|CF|CH|3H|8E|39|CG|3D]|7|-2|J|-4|K|1C3|8|-2]]|$0|-4|2|JS|4|JT|6|$9|-2|7|-2|J|-4|L|-2|K|1C4|8|-2]]|$0|-4|2|JU|4|3C|6|$K|1C5|9|@7P|79|38|3C|37|3F|GO|3H|3D|H8|3B]]]|$0|-4|2|JV|4|CV|6|$9|@5W|CP|5P|5O]|7|-2|J|-4|L|-2|K|1C6|8|-2]]|$0|-4|2|JW|4|AD|6|$9|@7G|82|A7|9N|26|A8|AC|8M|5R|8K|8R|57|8S|GF|FR|AB|AA]|7|-2|J|-4|K|1C7|8|-2]]|$0|-4|2|JX|4|JY|6|$9|@JZ|IU|6A|9F|K0|15]|K|1LH]]|$0|-4|2|K1|4|K2|6|$K|1C8|9|@3U|K3|DW|2P]]]|$0|K4|2|K5|4|IL|6|$K|1C9|9|@Y|FY|1T|GY|96|AH|U|1A]|7|-2|J|-4|8|-2|L|@K6]]]|$0|K7|2|K8|4|I5|6|$K|1CA|9|@7P|38|8C|7B|K9|KA|3B|5W|5R]|7|-2|J|-4|8|-2|L|@KB]]]|$0|-4|2|KC|4|KD|6|$9|@6F]|7|-2|J|-4|L|-2|K|1CB|8|-2]]|$0|KE|2|KF|4|9O|6|$9|@3U|5D|EA|EB|25|5C]|K|1LI]]|$0|-4|2|KG|4|BH|6|$9|@3A|C]|K|1LJ]]|$0|KH|2|KI|4|49|6|$9|@7G|7P|38|9F|5L|BN|AA|4M|4D|67|4J|46|E6|I|A8|64|4G|4C|65|2U]|7|-2|J|-4|K|1CC|8|-2|L|@KJ|KK]]]|$0|-4|2|KL|4|6X|6|$9|@3T|5P|H7|EW|3G|H9|3H|6Z]|K|1LK]]|$0|-4|2|KM|4|KN|6|@1LL]]|$0|-4|2|KO|4|KO|6|@1LM]]|$0|KP|2|KQ|4|BW|6|$K|1CD|9|@3T|3U|BR|2Q|3P|DJ|9S|BS|KR|KS|BV]|7|-2|J|-4|8|-2|L|@KT|KU|KV]]]|$0|-4|2|KW|4|BT|6|$K|1CE|9|@3U|BW|DJ|9S]]]|$0|KX|2|KY|4|KZ|6|$9|@DB|CK|8L|16|8R|3E|39|6C]|7|-2|J|-4|K|1CF|8|-2|L|@L0]]]|$0|L1|2|L2|4|IB|6|$K|1CG|9|@DB|96|5D|B|AH|IL|2Q|7P|2W|L3]|7|-2|J|-4|8|-2|L|@L4|L5]]]|$0|-4|2|L6|4|4A|6|$9|@L7|8B|L8|8D|64|26]|7|-2|J|-4|K|1CH|8|-2]]|$0|-4|2|L9|4|H|6|$9|@8O|2N|Q|E|70|I|R|15|31|2W|BN|8S|2Y|38|4A]|K|1LN]]|$0|LA|2|LB|4|2N|6|$9|@8O|9F|56|8K|E|5I|5G|I|IL|38|H|15|2W|A9|7G|57|A8|FR]|7|-2|J|-4|K|1CI|8|-2|L|@LC|LD|LE]]]|$0|LF|2|LG|4|K9|6|$K|1CJ|9|@L7|4A|KA|LH|L8|I5|8B|AZ]|7|-2|J|-4|8|-2]]|$0|-4|2|LI|4|8N|6|$9|@8L|2R|8K|8O|38|E0|2N|BX|6C|BN|2Y|E2|15|2W|57|39|3H]|7|-2|J|-4|K|1CK|8|-2]]|$0|-4|2|LJ|4|T|6|$9|@P|U|V|S|R|70]|K|1LO]]|$0|-4|2|LK|4|LL|6|$9|@49|5H|IU|C2|JA|E|3O|BN|F|AA|LM|LN|LO]|K|1LP]]|$0|LP|2|LQ|4|3D|6|$K|1CL|9|@4I|5P|LR|8R|EV|3H|AG|39|46|5I|4A|8K|49|37]|7|-2|J|-4|8|-2|L|@LS]]]|$0|LT|2|LU|4|LR|6|$K|1CM|9|@CB|FZ|LV]]]|$0|-4|2|LW|4|LX|6|$9|@56|9N|LY|AB|A7|38|AC|R|AA|57|BN|64]|K|1LQ]]|$0|LZ|2|M0|4|LY|6|$9|@IM|M1|66|2Z|64|B6|4A]|K|1LR]]|$0|-4|2|M2|4|6D|6|$9|@DR|9X|LY|LX|67|64]|7|-2|J|-4|K|1CN|8|-2]]|$0|-4|2|M3|4|6A|6|$9|@5H|5I|8R|49|4I|C2|I|LL|65|9F|31|5L|4W|4J]|K|1LS]]|$0|M4|2|M5|4|1B|6|$K|1CO|9|@AH|2Q|16|HU|IB|2Z|2Y|66|2W|15]|7|-2|J|-4|8|-2|L|@M6|M7]]]|$0|-4|2|M8|4|IT|6|$9|@2Q|5J|5I|2W|AG|15]|K|1LT]]|$0|-4|2|M9|4|1C|6|$9|@2Z|1B|9H|1A|4S|9F|9I|2Q]|K|1LU]]|$0|-4|2|MA|4|IA|6|$9|@GO|2W|7P|BG|15|L3|AH|GM]|K|1LV]]|$0|-4|2|MB|4|MC|6|$9|@5C|15|AT|MD]|7|-2|J|-4|L|-2|K|1CP|8|-2]]|$0|-4|2|ME|4|MF|6|$9|@MG|MH]|K|1LW]]|$0|-4|2|MI|4|MJ|6|$9|@1H|5P|MK|H8]|K|1LX]]|$0|ML|2|MM|4|5F|6|$K|1CQ|9|@3T|3Q|2Q|15|5C|5J|GU|96|9I|2W]|7|-2|J|-4|8|-2|L|@MN|MO|MP]]]|$0|-4|2|MQ|4|EV|6|$9|@CB|EU|HO|96|EP|8Q|MR|CE|CG]|K|1LY]]|$0|-4|2|MS|4|1J|6|$9|@19|2P|1G|MT|1L|1K|1J|1I]|7|-2|J|-4|L|-2|K|1CR|8|-2]]|$0|-4|2|MU|4|83|6|$9|@81|7P|T|96|1L|L3|11|IA]|K|1LZ]]|$0|-4|2|MV|4|MW|6|$9|@GO|AC|MX|2N|38|H|15|8N|7P]|K|1M0]]|$0|MY|2|MZ|4|JZ|6|$K|1CS|9|@JY|15|9F|K0|30|31]]]|$0|-4|2|N0|4|17|6|$9|@FD|15|16|18|14]|7|-2|J|-4|L|-2|K|1CT|8|-2]]|$0|-4|2|N1|4|90|6|$9|@49|5H|5E|6A|5I|LM|I|65|N2|7I]|7|-2|J|-4|K|1CU|8|-2]]|$0|N3|2|N4|4|95|6|$K|1CV|9|@GN|BR|4W|1T|6Q|G1|7C|U|97]|7|-2|J|-4|8|-2|L|@N5|N6|N7]|7R|-4]]|$0|-4|2|N8|4|N9|6|$9|-2|7|-2|J|-4|L|-2|7R|-4|K|1CW|8|-2]]|$0|-4|2|NA|4|NB|6|$9|@DB|NC|EW]|7|-2|J|-4|L|-2|7R|-4|K|1CX|8|-2]]|$0|-4|2|ND|4|3G|6|$9|@CB|EV|AG|8Q|3E|CG|3H|CH|CE]|K|1M1]]|$0|-4|2|NE|4|5E|6|$9|@5C|5F|4I|5I|4R|5H]|K|1M2]]|$0|-4|2|NF|4|NG|6|$9|@R|5H|15|5E|LN|31|6Y|90|49|I|N2|3A|C2]|7|-2|J|-4|K|1CY|8|-2]]|$0|-4|2|NH|4|NI|6|$9|@16|26|AC|5C]|K|1M3]]|$0|-4|2|NJ|4|3J|6|$9|@8T|3H|39|8L|57|3E|CD|AG]|K|1M4]]|$0|NK|2|NL|4|8T|6|$9|@EX|NM|3J|3H|39|57|8R|8J|8L|3E|E2|CD]|7|-2|J|-4|K|1CZ|8|-2]]|$0|-4|2|NN|4|NO|6|$9|@EE|1B]|7|-2|J|-4|L|-2|K|1D0|8|-2]]|$0|-4|2|NP|4|NC|6|$9|@DB|FY|4W|5J|5P|5L]|K|1M5]]|$0|-4|2|NQ|4|27|6|$K|1D1|9|@23|S|NR|57|1Q|25|E2|N2|NS]]]|$0|-4|2|NT|4|NU|6|$9|@E2|6C|27]|K|1M6]]|$0|NV|2|NW|4|D7|6|$9|@3T|2Q|EO|16|66|7G|DM|5S]|7|-2|J|-4|K|1D2|8|-2|L|@NX]]]|$0|-4|2|NY|4|HV|6|$9|@2T|HU|2Q|2Z|2V|DW|BV|9I]|K|1M7]]|$0|-4|2|NZ|4|FS|6|$9|@3A|O0|E0|FR|GF|S|38]|K|1M8]]|$0|-4|2|O1|4|1I|6|$9|@19|2P|1G|MT|1L|1K|1J|1I]|7|-2|J|-4|L|-2|K|1D3|8|-2]]|$0|-4|2|O2|4|O3|6|$9|@O4|3P|O5]|7|-2|J|-4|L|-2|K|1D4|8|-2]]|$0|-4|2|O6|4|II|6|$9|@CQ|JM|8A|JN|DE]|K|1M9]]|$0|-4|2|O7|4|O8|6|$9|@IB]|7|-2|J|-4|K|1D5|8|-2]]|$0|-4|2|O9|4|OA|6|$9|@6C|E2|4J|67]|7|-2|J|-4|L|-2|K|1D6|8|-2]]|$0|-4|2|OB|4|50|6|$9|@C1|4I|48|C4|3B|4E|C3|7G|I|CD|3J]|J|50|K|1MA]]|$0|-4|2|OC|4|OD|6|$9|@OE|OF|OG|OH]|7|-2|J|-4|L|-2|K|1D7|8|-2]]|$0|OI|2|OJ|4|I6|6|$K|1D8|9|@5W|5O|5P|5S|5Y|GF|9N|64|A8]|7|@$1R|1D9|2|7Z|4|79|1U|1DA|1V|1DB|1W|1X|0|-4|1Z|1DC|20|1DD|21|22]|$1R|1DE|2|OK|4|GF|1U|1DF|1V|1DG|1W|1X|0|-4|1Z|1DH|20|1DI|21|22]]|J|-4|8|-2|L|@OL|OM]]]|$0|ON|2|OO|4|8A|6|$K|1DJ|9|@CQ|LR|60|8F|8E|CU|24|OP|CS|89|CR|JM|9R]]]|$0|-4|2|OQ|4|MK|6|$9|@1H|16|2X|DW|HX|C7|C1|4D|B0|2M|MJ|HY|C4|2S]|7|-2|J|-4|K|1DK|8|-2]]|$0|OR|2|OS|4|F4|6|$K|1DL|9|@Y|3L|10|Z|X]]]|$0|-4|2|OT|4|MG|6|$9|@CB|AG|MH|3G|39]|7|-2|J|-4|K|1DM|8|-2]]|$0|OU|2|OV|4|48|6|$K|1DN|9|@19|GU|OW|CQ|4F|CS]|7|-2|J|-4|L|@OX]|8|-2]]|$0|OY|2|OZ|4|AM|6|$K|1DO|9|@GN|GW|BR|4S|2Q|9Z|A9|1A|97]|7|-2|J|-4|L|@P0]|8|-2]]|$0|-4|2|P1|4|7W|6|$9|@FM|7U|7V|7X|7T|GW]|K|1MB]]|$0|-4|2|P2|4|P3|6|$9|@CQ]|7|-2|J|-4|L|-2|K|1DP|8|-2]]|$0|P4|2|P5|4|3T|6|$K|1DQ|9|@4R|5F|66|IT|I8|A|5E|D|E|2G|2Y|5I]|7|-2|J|-4|L|@P6]|8|-2]]|$0|-4|2|P7|4|8K|6|$9|@8O|A8|5R|38|AA|39|64|57|2N|8N|5Q|AC|3H|8L]|K|1MC]]|$0|P8|2|P9|4|G|6|$K|1DR|9|@3T|BR|16|2Y|BX|E|2G|D|I8|IT|8O|A|PA]|7|-2|J|-4|8|-2|L|@PB|PC|PD]|7R|-4]]|$0|-4|2|PE|4|MX|6|$9|@CQ|8A|8F|MW|8K]|K|1MD]]|$0|-4|2|PF|4|H8|6|$9|@GO|IA|H2|N2|6Y|58]|K|1ME]]|$0|-4|2|PG|4|PH|6|$9|@NG|3T|FD|IT]|K|1MF]]|$0|PI|2|PJ|4|C3|6|$K|1DS|9|@C1|50|L8|47|3B|A1|1H|B0|HX|MJ|4L|4I]|7|-2|J|-4|L|@PK]|8|-2]]|$0|-4|2|PL|4|PM|6|$K|1DT|9|@PN|NR|27|NU|1Q|U]]]|$0|PO|2|PP|4|70|6|$9|@R|5G|2Z|Q|P|S|6Y]|7|-2|J|-4|K|1DU|8|-2|L|@PQ]]]|$0|PR|2|PS|4|B5|6|$9|@CT|97|1A|1C|69|4T|AM]|7|-2|J|-4|L|@PT]|K|1DV|8|-2]]|$0|-4|2|PU|4|6B|6|$9|@2H|9X|2Y|4G|4H|4C|DQ|4L|4A|64|67|A9]|7|-2|J|-4|K|1DW|8|-2]]|$0|-4|2|PV|4|A4|6|$9|@15|A0|A5|2M|51|CF|A2]|7|-2|J|-4|K|1DX|8|-2]]|$0|PW|2|PX|4|8R|6|$9|@4I|KZ|EV|3G|3J|39|57|3E|8T|6C|68|8L|3H]|7|-2|J|-4|K|1DY|8|-2|L|@PY]]]|$0|-4|2|PZ|4|CL|6|$9|@7G|68|8R|CM|AD|GR|3B|5Q|4E|39|7I|3I]|K|1MG]]|$0|-4|2|Q0|4|Q1|6|$9|@Q2|IL]|7|-2|J|-4|L|-2|7R|-4|K|1DZ|8|-2]]|$0|-4|2|Q3|4|Q4|6|$9|@G|H]|7|-2|J|-4|L|-2|K|1E0|8|-2]]|$0|-4|2|Q5|4|LM|6|$K|1E1|9|@JA|BN|LL|LX|9N]]]|$0|-4|2|Q6|4|8E|6|$9|@CQ|8A|8F|CU|89|CR|8Q|3E|CB]|7|-2|J|-4|K|1E2|8|-2]]|$0|-4|2|Q7|4|9T|6|$9|@24|IH|OP|CS|26|4A|57]|K|1MH]]|$0|-4|2|Q8|4|9G|6|$9|@9I|69|B5|2V|9D|5C|B6]|K|1MI]]|$0|-4|2|Q9|4|QA|6|$9|@MF]|7|-2|J|-4|L|-2|K|1E3|8|-2]]|$0|-4|2|QB|4|L8|6|$9|@K9|3I|L7|KA|8B|C3]|K|1MJ]]|$0|-4|2|QC|4|QD|6|$9|@8K|BN|3O|QE|9N|AA|5R]|K|1MK]]|$0|-4|2|QF|4|8M|6|$9|@3V|5R|5D|39|8T|26|A8|3J|3H|8K|AA|8J|AC|57|4G|38|AD|8S]|7|-2|J|-4|K|1E4|8|-2]]|$0|-4|2|QG|4|AB|6|$9|@56|A7|9N|94|26|LX|57|8S|AD]|K|1ML]]|$0|-4|2|QH|4|H9|6|$K|1E5|9|@JA|QI|6X|LN|H7|QJ|D7]]]|$0|-4|2|QK|4|5X|6|$K|1E6|9|@7B|3B|73|I|KA|76]]]|$0|-4|2|QL|4|BS|6|$9|@3V|DR|3U|DQ|BW]|K|1MM]]|$0|-4|2|QM|4|QN|6|$9|@D7|EO|95]|K|1MN]]|$0|-4|2|QO|4|4R|6|$K|1E7|9|@9I|9G|9H|5E|69|1C|1A|66|9F|4S|5C]]]|$0|-4|2|QP|4|QQ|6|$9|@3T|3V|3U|3Q|GN]|7|-2|J|-4|L|-2|K|1E8|8|-2]]|$0|-4|2|QR|4|OG|6|$9|@OE|OD|OF|OH]|7|-2|J|-4|L|-2|K|1E9|8|-2]]|$0|QS|2|QT|4|91|6|$9|@4C|DP|4L|66|4G|AH|65|4I|97]|K|1MO]]|$0|-4|2|QU|4|LO|6|$9|@QI|QV|5H|C2|IU|LN|JA|H9]|7|-2|J|-4|L|-2|K|1EA|8|-2]]|$0|-4|2|QW|4|QX|6|$9|@19|MT|1L|C6|QY|IM|4H|C2|B6|L3]|7|-2|J|-4|K|1EB|8|-2]]|$0|QZ|2|R0|4|19|6|$K|1EC|9|@8B|FZ|C4|MT|97|QX|1L|1G|1B|4R|91|48|1K|1J|1I]|7|-2|J|-4|8|-2|L|@R1|R2]]]|$0|-4|2|R3|4|CT|6|$9|@B5|CQ|CU|II|CR|JM|8F|JO|9Z]|K|1MP]]|$0|-4|2|R4|4|12|6|$9|@B5|1A|B6|AM|9G|FZ]|K|1MQ]]|$0|-4|2|R5|4|7C|6|$9|@5W|5O|5S|R6|U|61|GY|94|I6|8D|1T|9I]|K|1MR]]|$0|R7|2|R8|4|60|6|$K|1ED|9|@CB|94|LR|3E|3G|GF|5V]|7|-2|J|-4|8|-2|L|@R9]]]|$0|RA|2|RB|4|J2|6|$K|1EE|9|@96|RC|5P|5Z]|7|-2|J|-4|8|-2]]|$0|-4|2|RD|4|8P|6|$9|@CB|EV|3G|S|38|39|CG]|K|1MS]]|$0|RE|2|RF|4|2S|6|$K|1EF|9|@2M|19|1H|A1|3Z|15|AY|2X|HX|RG|1J]|7|-2|J|-4|8|-2]]|$0|-4|2|RH|4|RI|6|$9|@8L|5R|39|3H|57|37]|K|1MT]]|$0|-4|2|RJ|4|J3|6|$K|1EG|9|@GF|J1|E1]]]|$0|RK|2|RL|4|26|6|$K|1EH|9|@3V|9N|2R|57|25|EA|8J|C4|8S|AC|38|LX|N2|4G|I6|2U|AA]|7|-2|J|-4|8|-2|L|@RM]]]|$0|-4|2|RN|4|8J|6|$K|1EI|9|@5R|38|26|LX|LY|AB|8S|57|3F|8L]]]|$0|RO|2|RP|4|7A|6|$K|1EJ|9|@5G|K3|EP|7C|U|2M|5S|61]|7|-2|J|-4|L|@RQ]|8|-2|7R|-4]]|$0|-4|2|RR|4|FO|6|$9|@D7|EO|A0|DM|A5|A4|A2|3Z]|K|1MU]]|$0|-4|2|RS|4|RT|6|$9|@19|1L|83|L7|11|IM|C6|QY|RU]|K|1MV]]|$0|-4|2|RV|4|EW|6|$K|1EK|9|@EU|DL|8R|FS]]]|$0|-4|2|RW|4|7B|6|$9|@5X|CQ|CU|94|5Q]|K|1MW]]|$0|-4|2|RX|4|HM|6|$9|@HH|GF|2Q|BV|5W|HI|HF|HL|HJ|DW|DX|HK]|7|-2|J|-4|L|-2|K|1EL|8|-2]]|$0|-4|2|RY|4|RZ|6|$K|1EM|9|@JM|DE|9Z]]]|$0|-4|2|S0|4|S1|6|$9|@IA|GO|JZ]|K|1MX]]|$0|S2|2|S3|4|S4|6|$K|1EN|9|@GW|EK|9Z|67|4L|L3]]]|$0|-4|2|S5|4|S6|6|$9|@J3|82|8S|8N|5D|5Z]|7|-2|J|-4|L|-2|K|1EO|8|-2]]|$0|-4|2|S7|4|7Q|6|$9|@S8|DB|5P]|7|-2|J|-4|L|-2|K|1EP|8|-2]]|$0|-4|2|S9|4|31|6|$9|@7P|38|15|2W|I|2Y|IT|5I|8O|H|1B|BG|7G|2N|83|49|5H|2T|IB]|7|-2|J|-4|K|1EQ|8|-2]]|$0|-4|2|SA|4|SB|6|$9|@SC]|7|-2|J|-4|L|-2|K|1ER|8|-2]]|$0|-4|2|SD|4|SC|6|$9|@SB]|7|-2|J|-4|L|-2|K|1ES|8|-2]]|$0|-4|2|SE|4|SF|6|@1MY]]|$0|SG|2|SH|4|23|6|$K|1ET|9|@Y|1T|9I|FZ|2V|91|1Q|9G|29]|7|-2|J|-4|8|-2|L|@SI|SJ|SK]]]|$0|SL|2|SM|4|Y|6|$K|1EU|9|@23|AM|IL|1T|9I|11|X|91|RT|GY|AH|94|1A|4S]|7|-2|J|-4|8|-2|L|@SN|SO|SP]]]|$0|SQ|2|SR|4|56|6|$K|1EV|9|@2N|FY|55|9N|LX|8J|38|AB|FS|3A|57|GF|A7|AA|26]]]|$0|-4|2|SS|4|ST|6|$9|@AZ|3F|H2|H8]|K|1MZ]]|$0|-4|2|SU|4|SV|6|$9|@DB|1G|DF|DC]|K|1N0]]|$0|-4|2|SW|4|GO|6|$K|1EW|9|@2W|IA|31|96|7P|5F|GM|58|BG]]]|$0|SX|2|SY|4|5L|6|$K|1EX|9|@7P|FZ|LR|66|GU|5P|6A|5C|31|I|4W|2W]|7|-2|J|-4|8|-2|L|@SZ|T0|T1]]]|$0|-4|2|T2|4|M1|6|@1N1]]|$0|-4|2|T3|4|81|6|$9|@11|83|GO|T|IT|31|7P|GM]|K|1N2]]|$0|T4|2|T5|4|5G|6|$K|1EY|9|@5F|9F|5C|IT|E|F|G|GU|5J|5I]]]|$0|-4|2|T6|4|FE|6|$9|@BR|U|GY|LY|1T]|K|1N3]]|$0|-4|2|T7|4|Q2|6|$9|@FY|U|GY|1T]|K|1N4]]|$0|T8|2|T9|4|E8|6|$K|1EZ|9|@E7|4W|DQ|67|TA|GW|E5|4A|83]|7|-2|J|-4|8|-2|L|@TB]]]|$0|-4|2|TC|4|2W|6|$9|@GO|IA|31|7P|15|IT|H|2N]|K|1N5]]|$0|-4|2|TD|4|TE|6|$9|@4S|AM|GW|E8]|7|-2|J|-4|K|1F0|8|-2]]|$0|TF|2|TG|4|A8|6|$9|@J6|82|FR|3H|2Q]|7|-2|J|-4|K|1F1|8|-2]]|$0|TH|2|TI|4|66|6|$K|1F2|9|@3T|4R|FZ|2U|EO|65|5I|1B|B6|49|69|91]|7|-2|J|-4|L|@TJ|TK]|8|-2]]|$0|-4|2|TL|4|JN|6|$9|@CQ|II|JM|48|6C|4D|DE|CU|IH|5I|4F]|K|1N6]]|$0|-4|2|TM|4|C7|6|$9|@C1|4Z|4K|4D|MK|6A]|7|-2|J|-4|K|1F3|8|-2]]|$0|-4|2|TN|4|29|6|$9|@23|1Q|QX|V|1T|27|Y|BR|4T|DP|IM|L7|N2]|K|1N7]]|$0|-4|2|TO|4|FB|6|$9|@FC|6Q|3T|5S]|K|1N8]]|$0|-4|2|TP|4|4T|6|$K|1F4|9|@23|4Q|B5|9G|2V|6B|28|69|66|1T|95|B6|AM]]]|$0|-4|2|TQ|4|JF|6|$K|1F5|9|@6C]]]|$0|-4|2|TR|4|5Q|6|$9|@D|E0|5R|I|38|8K|8M|2G]|7|-2|J|-4|L|@TS]|K|1F6|8|-2]]|$0|-4|2|TT|4|9R|6|$K|1F7|9|@II|8F|8A]]]|$0|-4|2|TU|4|A9|6|$9|@3V|DR|9X|2U|4B|EE|49|4A|26|38|8S|57]|K|1N9]]|$0|-4|2|TV|4|S8|6|$9|@7A|2M|A2]|K|1NA]]|$0|-4|2|TW|4|KS|6|$K|1F8|9|@3U|IT|BS|3Q|2Q]]]|$0|-4|2|TX|4|I8|6|$9|@G]|K|1NB]]|$0|-4|2|TY|4|TZ|6|$9|@3V|3Z]|K|1NC]]|$0|-4|2|U0|4|40|6|$9|@A9|2U]|K|1ND]]|$0|-4|2|U1|4|61|6|$9|@7C|95|7A|U]|K|1NE]]|$0|-4|2|U2|4|MD|6|$9|@MC|5C]|7|-2|J|-4|L|-2|K|1F9|8|-2]]|$0|-4|2|U3|4|U4|6|$9|@5D|94|9M|2T|5W]|K|1NF]]|$0|-4|2|U5|4|PN|6|$K|1FA|9|@NR|1Q|NU|23|4S]]]|$0|-4|2|U6|4|U7|6|$9|@L3|66|DP|QY|B6|2V]|K|1NG]]|$0|U8|2|U9|4|CK|6|$K|1FB|9|@AH|2Q|16|DF|3I|3Q|EO|D6]|7|-2|J|-4|8|-2|L|@UA]]]|$0|-4|2|UB|4|S|6|$9|@Q|P|R|8P|3A|27|U|3N|56|38|8S|57]|K|1NH]]|$0|UC|2|UD|4|2Q|6|$K|1FC|9|@3Q|AH|DF|FR|HU|5I|IT|1B|7G|2Y]|7|-2|J|-4|8|-2|L|@UE|UF]]]|$0|UG|2|UH|4|FY|6|$K|1FD|9|@1T|U|Y|9I|G1|V]|7|-2|J|-4|8|-2|L|@UI|UJ|UK|UL]|7R|-4]]|$0|UM|2|UN|4|DF|6|$9|@CK|2Q|C|BV|3Q|1B|D6|EO]|7|-2|J|-4|K|1FE|8|-2|L|@UO]]]|$0|UP|2|UQ|4|4W|6|$K|1FF|9|@95|E6|FZ|E8|4I|2Z|6A|GN|E7]|7|-2|J|-4|8|-2|L|@UR|US|UT]]]|$0|-4|2|UU|4|UV|6|$9|@F1|E6|4C]|7|-2|J|-4|L|-2|K|1FG|8|-2]]|$0|-4|2|UW|4|UX|6|$9|@3V|9X|A9]|7|-2|J|UX|K|1FH|8|-2]]|$0|-4|2|UY|4|HY|6|$9|@2X|DW|HX|HJ|HL|HK|MK]|K|1NI]]|$0|-4|2|UZ|4|43|6|$K|1FI|9|@EE|8F|CS|CQ]|7|@$1R|1FJ|2|V0|4|V1|1U|1FK|1V|1FL|1W|1X|0|V2|1Z|1FM|20|1FN|21|22]]|J|-4|8|-2]]|$0|-4|2|V3|4|4D|6|$9|@AH|C1|C7|4I|49|4C|4A|46|CH|A8|3D]|7|-2|J|-4|K|1FO|8|-2]]|$0|V4|2|V5|4|3E|6|$9|@4I|CE|8R|CY|EV|3G|39|57|3D|3J|8T]|7|-2|J|-4|K|1FP|8|-2|L|@V6]]]|$0|V7|2|V8|4|CE|6|$K|1FQ|9|@CB|LR|3E|8E|8Q|CD|3G|3D|AG]|7|-2|J|-4|L|@V9]|8|-2]]|$0|VA|2|VB|4|5H|6|$K|1FR|9|@C2|5C|5I|B|I|6A|90|LL|4I|49|65|5E|31]|7|-2|J|-4|8|-2|L|@VC|VD|VE]]]|$0|-4|2|VF|4|4G|6|$9|@3V|3Z|9X|A9|64|8M|4A|49|6B|4B|2U|46]|7|-2|J|-4|K|1FS|8|-2]]|$0|-4|2|VG|4|5J|6|$9|@5S|IT|5I|5H|5G]|K|1NJ]]|$0|VH|2|VI|4|7I|6|$K|1FT|9|@7G|2O|7H|6C|68|2G|5Q|6A|4N|52|CL|90|4I]|7|-2|J|-4|8|-2|L|@VJ]]]|$0|-4|2|VK|4|VL|6|@1NK]]|$0|-4|2|VM|4|VN|6|@1NL]]|$0|VO|2|VP|4|9E|6|$K|1FU|9|@DP|9W|3Z|9D|9X|5L|9G|9H|1A|69]|7|-2|J|-4|8|-2|L|@VQ|VR|VS]]]|$0|-4|2|VT|4|VU|6|$9|@D6|BR]|K|1NM]]|$0|VV|2|VW|4|3F|6|$9|@46|3C|3E|H2|10|3D|37|3H|49|39]|7|-2|J|-4|K|1FV|8|-2|L|@VX]]]|$0|-4|2|VY|4|H2|6|$9|@5P|37|3D|3F|VZ|3J|H8|3H|H1]|K|1NN]]|$0|W0|2|W1|4|BN|6|$9|@2N|E5|3O|M1|KS|49|4G|AA|LX|LY]|7|-2|J|-4|K|1FW|8|-2|L|@W2|W3]]]|$0|-4|2|W4|4|W5|6|$K|1FX|9|@3Y|48|9D|3I|4B]|7|-2|J|-4|8|-2]]|$0|-4|2|W6|4|W7|6|$9|-2|7|-2|J|-4|L|-2|K|1FY|8|-2]]|$0|-4|2|W8|4|GY|6|$9|@IL|U|NR|AH|7C|2N|83|Y|FE]|K|1NO]]|$0|-4|2|OK|4|GF|6|$9|@I6|82|J7|56|A8|AD|2N|3N|8M|60]|K|1NP]]|$0|W9|2|WA|4|FR|6|$9|@82|8K|3Z|2Q|A8|J6|GF|J7|64|3A|I6]|7|-2|J|-4|K|1FZ|8|-2|L|@WB|WC|WD]]]|$0|-4|2|WE|4|WF|6|$9|@2M|DB|5C]|7|-2|J|-4|L|-2|K|1G0|8|-2]]|$0|-4|2|WG|4|IU|6|$K|1G1|9|@C2|F|LL|5H|9F|3O|H|6A|JA]]]|$0|WH|2|WI|4|C2|6|$9|@5H|16|25|QV|IM|IU|6D|6A|4N|I6|49|4A|QI|H]|7|-2|J|-4|K|1G2|8|-2|L|@WJ]]]|$0|-4|2|WK|4|4U|6|$9|@3V|DR|9W|9X|WL|6B]|K|1NQ]]|$0|WM|2|WN|4|C4|6|$K|1G3|9|@C1|1H|8B|2S|48|4A|L8|4I|19|4D|MK|QX|91]|7|-2|J|-4|8|-2|L|@WO|WP]]]|$0|WQ|2|WR|4|7H|6|$9|@7A|2O|7I|R6|4V|4Y|7J|7K|7L]|7|-2|J|-4|K|1G4|8|-2]]|$0|-4|2|WS|4|G1|6|$K|1G5|9|@AM|FY|1T|V]|7|-2|J|-4|8|-2]]|$0|WT|2|WU|4|CM|6|$K|1G6|9|@7G|5R|KR|CL|68|5Q|8M|QD|AC|8K|3I|3O|H8|AD|CK]|7|-2|J|-4|L|@WV]|8|-2]]|$0|-4|2|WW|4|R|6|$9|@P|9F|70|5G|6Y|Q]|7|-2|J|-4|K|1G7|8|-2]]|$0|-4|2|WX|4|OW|6|$K|1G8|9|@48|GO|H2|H8|E1]]]|$0|-4|2|WY|4|WZ|6|$9|@8L|DC|38]|K|1NR]]|$0|-4|2|X0|4|KR|6|$K|1G9|9|@3Q|2Q|KS|FR|8L|57|8J|38|39]|7|@$1R|1GA|2|X0|4|KR|1U|1GB|1V|1GC|1W|1X|0|-4|1Z|1GD|20|1GE|21|22]]|J|-4|8|-2]]|$0|X1|2|X2|4|8F|6|$9|@CQ|8A|CS|CP|CU|8E|43|CT|II]|K|1NS]]|$0|X3|2|X4|4|5S|6|$9|@7A|5J|5P|76|5Y|5Z|4M|5Q|8M|49]|7|-2|J|-4|K|1GF|8|-2|L|@X5|X6]]]|$0|-4|2|X7|4|O0|6|$9|@S|MW|31|2W]|K|1NT]]|$0|X8|2|X9|4|4K|6|$K|1GG|9|@J2|RC|4Z|QY|4L|4D|46|8Z|65|38|39|4I|6A]|7|-2|J|-4|8|-2|L|@]]]|$0|-4|2|XA|4|4Y|6|$9|@52|7L|4Z|2O|7H|7I|4Q|EH|C4]|K|1NU]]|$0|-4|2|XB|4|K3|6|$9|@5W|5O|73|76|R6]|7|-2|J|-4|K|1GH|8|-2]]|$0|XC|2|XD|4|5W|6|$K|1GI|9|@5R|5O|5P|76|5V|5Y|5Z]|7|-2|J|-4|8|-2|L|@XE|XF]]]|$0|-4|2|XG|4|R6|6|$9|@K3|5W|5O|5P]|K|1NV]]|$0|-4|2|XH|4|10|6|$9|@4S|X|F4|TE]|K|1NW]]|$0|-4|2|XI|4|9H|6|$9|@1C|4R|1A|9G]|K|1NX]]|$0|-4|2|XJ|4|CH|6|$9|@3D|3E|CE|CB|4D|39|46|4I]|K|1NY]]|$0|-4|2|XK|4|XL|6|@1NZ]]|$0|-4|2|XM|4|8B|6|$K|1GJ|9|@L7|19|K9|24|89|9T|C4]|7|@$1R|1GK|2|V0|4|V1|1U|1GL|1V|1GM|1W|1X|0|XN|1Z|1GN|20|1GO|21|22]]|J|-4|8|-2]]|$0|-4|2|XO|4|E1|6|$9|@OW|5P]|K|1O0]]|$0|XP|2|6G|4|1H|6|$K|1GP|9|@3Z|C3|C4|DW|AY|2S|15]|7|-2|J|-4|8|-2|L|@XQ|XR]]]|$0|XS|2|XT|4|2X|6|$K|1GQ|9|@3Z|15|2S|DV|C4|DW|83|XU|8D|1H]|7|-2|J|-4|8|-2|L|@XV|XW|XX]]]|$0|-4|2|XY|4|XZ|6|$9|@15|BR|2Y]|7|-2|J|-4|L|-2|K|1GR|8|-2]]|$0|-4|2|Y0|4|C|6|$9|@5|D|A|5C|G]|K|1O1]]|$0|-4|2|Y1|4|CF|6|$9|@MT|NM|1L|8Q|3E|CE|8E|RT]|7|-2|J|-4|K|1GS|8|-2]]|$0|Y2|2|Y3|4|Y4|6|$K|1GT|9|@2M|4I|Y5|XU|Y6]|7|-2|J|-4|8|-2]]|$0|-4|2|Y7|4|51|6|$9|@3V|4Z|3Z|9Z|2U|4K|65|A9|A4|49|5H]|K|1O2]]|$0|-4|2|Y8|4|QI|6|$9|@5H|IU|C2|JA|5E|QV|6D|LN|LO]|7|-2|J|-4|L|-2|K|1GU|8|-2]]|$0|Y9|2|YA|4|MH|6|$9|@AG|3F|H2|3H|MG|57|39|8J|E6|8P|E5]|7|-2|J|-4|K|1GV|8|-2]]|$0|YB|2|YC|4|B0|6|$K|1GW|9|@3Y|FZ|46|EK|2X|C3]|7|-2|J|-4|8|-2|L|@YD]]]|$0|-4|2|YE|4|11|6|$9|@1T|81|Y|GM|BR|83|RT|X]|K|1O3]]|$0|-4|2|YF|4|3P|6|$9|@3Q|AH|16|3I|3N|EO|D6|BV|3U|KS]|K|1O4]]|$0|YG|2|YH|4|2Z|6|$9|@5G|4W|1C|1B|IT|1A|2V|E7|5F|9G|4R]|7|-2|J|-4|L|@YI]|K|1GX|8|-2]]|$0|YJ|2|YK|4|4E|6|$9|@50|I|49|46|7G]|K|1O5]]|$0|YL|2|YM|4|47|6|$K|1GY|9|@1H|GW|46|C3|10]|7|-2|J|-4|L|@YN]|8|-2]]|$0|-4|2|YO|4|YP|6|$9|@D7|58]|7|-2|J|-4|L|-2|K|1GZ|8|-2]]|$0|YQ|2|YR|4|DP|6|$K|1H0|9|@3V|9X|66|4C|6B|4L|91|4G|2U|23|Y|65|A9|8Z|U7|QX]|7|-2|J|-4|8|-2|L|@YS|YT|YU]]]|$0|-4|2|YV|4|RU|6|$9|@XU|5G|RT|IB]|K|1O6]]|$0|-4|2|YW|4|Y5|6|$9|@Y4]|K|1O7]]|$0|-4|2|YX|4|YY|6|$9|@4I|CY|2M|XU|YZ]|7|-2|J|-4|L|-2|K|1H1|8|-2]]|$0|Z0|2|Z1|4|A1|6|$9|@3V|3Y|G0|2X|XU|43|C3|B0|52|8F]|7|-2|J|-4|K|1H2|8|-2|L|@Z2]]]|$0|-4|2|Z3|4|YZ|6|$9|@YY|4I|CY|2M]|7|-2|J|-4|L|-2|K|1H3|8|-2]]|$0|-4|2|Z4|4|C5|6|$K|1H4|9|@C1|C7|C3|B0|MK]]]|$0|Z5|2|Z6|4|2Y|6|$9|@3T|FD|I|2G|6B|A8|66|G|31|2U|5I|49|2Q|PA]|7|-2|J|-4|L|@Z7|Z8|Z9]|K|1H5|8|-2|7R|-4]]|$0|-4|2|ZA|4|FD|6|$9|@3T|1H|2G|65|2U|6Q|2Y|32]|K|1O8]]|$0|ZB|2|ZC|4|DD|6|$9|@3Q|CK|D6|BV|KZ|60|U4|DF|1D]|K|1O9]]|$0|ZD|2|ZE|4|DB|6|$K|1H6|9|@3Q|AH|DC|2Q|8L|NC|5J]|7|-2|J|-4|8|-2|L|@ZF|ZG]]]|$0|ZH|2|ZI|4|ZJ|6|$K|1H7]]|$0|-4|2|ZK|4|CG|6|$9|@CB|3C|3J|CH|8Q|3E|CE|3G|8R|3D]|7|-2|J|-4|K|1H8|8|-2]]|$0|ZL|2|ZM|4|FZ|6|$K|1H9|9|@3T|4R|10|9H|19|1C|12]|7|-2|J|-4|8|-2|L|@ZN]]]|$0|-4|2|ZO|4|CY|6|$9|@4I|5C|2G]|K|1OA]]|$0|-4|2|ZP|4|ZQ|6|$9|@3L|J2|5C]|7|-2|J|-4|L|-2|K|1HA|8|-2]]|$0|-4|2|ZR|4|OF|6|$9|@OE|OD|OH|OG]|7|-2|J|-4|L|-2|K|1HB|8|-2]]|$0|-4|2|ZS|4|ZT|6|$9|@GO|29]|7|-2|J|-4|L|-2|K|1HC|8|-2]]|$0|-4|2|ZU|4|O4|6|$9|@O5|O3|3U|5W]|7|-2|J|-4|L|-2|K|1HD|8|-2]]|$0|ZV|2|ZW|4|9I|6|$K|1HE|9|@23|1T|V|25|5L|9G|4R|69|5E|2Z|1A|4S|2V|9H]|7|-2|J|-4|8|-2|L|@ZX|ZY|ZZ]]]|$0|-4|2|100|4|AC|6|$9|@7G|I6|A7|CM|16|EA|26|LX|AB|3I|8S|AA|8M|8K|A8|49|LM|4G|AD]|7|-2|J|-4|K|1HF|8|-2]]|$0|-4|2|101|4|G0|6|$9|@V|FY|1T|BR|T|10|X]|K|1OB]]|$0|-4|2|102|4|QJ|6|$9|@H9|C3]|K|1OC]]|$0|-4|2|103|4|9N|6|$9|@2R|AB|LX|8J|56|AC|26|8M|8K|8R|57|8S|AD]|K|1OD]]|$0|-4|2|104|4|NR|6|$9|@PM|27|8J|GY|38|NU]|K|1OE]]|$0|105|2|106|4|DQ|6|$K|1HG|9|@3V|DP|9X|107|4L|4G|6B|A9|2U|65|EK|GW|91|B6|66]|7|-2|J|-4|8|-2|L|@108|109|10A]]]|$0|-4|2|10B|4|DR|6|$9|@3V|DP|9X|DQ|4C|4L|4G|4H|6B|107]|7|-2|J|-4|L|-2|K|1HH|8|-2]]|$0|-4|2|10C|4|8O|6|$9|@2N|E|H|I|8K|5Q|2Y|8N|G|38|2G|7G|2W|31|70|49]|K|1OF]]|$0|10D|2|10E|4|25|6|$9|@23|1T|9I|2R|26|58|2T|BH|27|14|1Q|8S|H8|U7|AC|2V]|7|-2|J|-4|K|1HI|8|-2|L|@10F|10G]]]|$0|-4|2|10H|4|GR|6|$9|@7G|IL|9I|7I|CL|CM|4E|5H|90|68]|K|1OG]]|$0|-4|2|10I|4|DX|6|$9|@HX|HJ|HK|HL|HF]|7|-2|J|-4|K|1HJ|8|-2]]|$0|-4|2|10J|4|BX|6|$9|@JF|6C|E0|8N|E2|2Y]|K|1OH]]|$0|10K|2|10L|4|2R|6|$K|1HK|9|@23|56|55|9I|16|1Q|58|B|HU|DE|25|27|NS]|7|-2|J|-4|8|-2|L|@10M]]]|$0|-4|2|10N|4|32|6|$9|@14|15|3T|2Y|FD|2U|18|17]|7|-2|J|-4|L|-2|K|1HL|8|-2]]|$0|-4|2|10O|4|KA|6|$9|@L7|10P|K9|I5|L8|8B|7B]|7|-2|J|-4|K|1HM|8|-2]]|$0|-4|2|10Q|4|DE|6|$9|@8L|2R|16|2T|HU|JM]|7|-2|J|-4|K|1HN|8|-2]]|$0|-4|2|10R|4|LV|6|$9|@CB|3G|3D|37|3E|39|CH]|K|1OI]]|$0|-4|2|10S|4|GU|6|$9|@48|5I|5G|B6|QY]|K|1OJ]]|$0|-4|2|10T|4|QY|6|$9|@C6|B6|QX|4H|U7|48|RT|5H|5S|4K]|7|-2|J|-4|K|1HO|8|-2]]|$0|10U|2|10V|4|3Z|6|$K|1HP|9|@3V|QY|4H|3T|A9|CF|EK|65|GW|4G|2U|B6]|7|-2|J|-4|8|-2|L|@10W|10X]]]|$0|-4|2|10Y|4|10Z|6|$9|@GO|DB|H|5L|SV]|K|1OK]]|$0|-4|2|110|4|C6|6|$9|@3V|4C|B6|QX|QY|RT|37|C4|CF|3Z]|K|1OL]]|$0|111|2|112|4|5R|6|$K|1HQ|9|@2N|5O|5P|8K|5S|5V|5Z|8M|5Q|E0|AD|5W]|7|-2|J|-4|8|-2|L|@113|114|115]]]|$0|-4|2|116|4|10P|6|$9|@L7|KA|K9|I5|GO|ST]|K|1OM]]|$0|-4|2|117|4|58|6|$9|@2R|94|2V|25|GO|H8|U7|5L]|K|1ON]]|$0|-4|2|118|4|HH|6|$9|@5W|GW|2Q|2R|HI|HJ|HF|HL|HM|8S|DX|I6|5Q]|7|-2|J|-4|K|1HR|8|-2]]|$0|-4|2|119|4|A7|6|$9|@GF|56|I6|9N|FR|AC|AB|LX|AD|8M|AA|8K]|K|1OO]]|$0|-4|2|11A|4|HK|6|$9|@8D|HX|HI|HJ|DX|HF|HL|HY]|7|-2|J|-4|K|1HS|8|-2]]|$0|11B|2|11C|4|E6|6|$K|1HT|9|@GN|E5|E8|4W|67|49|JF|4I|65]|7|-2|J|-4|8|-2|L|@11D|11E|11F]]]|$0|-4|2|11G|4|11H|6|$9|@2M|XU|Y4]|7|-2|J|-4|K|1HU|8|-2]]|$0|-4|2|11I|4|BV|6|$K|1HV|9|@3Q|16|3P|DF|3U|BX|2Q|IT|1B|KR]]]|$0|11J|2|11K|4|DW|6|$9|@16|DV|HY|2X|DW|HX|15|4A]|7|-2|J|-4|K|1HW|8|-2]]|$0|-4|2|11L|4|8D|6|$9|@5W|5S|HY|K3|R6|HX|4A|HH|HC]|K|1OP]]|$0|-4|2|11M|4|107|6|$9|@B6|19|9X|DQ|Z|DP|AM|X]|K|1OQ]]|$0|-4|2|11N|4|11O|6|$9|@E2|CQ|II|JM]|7|-2|J|-4|L|-2|K|1HX|8|-2]]|$0|-4|2|11P|4|11Q|6|@1OR]]|$0|-4|2|11R|4|E2|6|$9|@JM|11O|2G|2Y|8K|E0|NU|57|A8]|K|1OS]]|$0|-4|2|11S|4|CR|6|$9|@CQ|II|JM|8F|CU|IH|8E|JN|5I|4A|CT|8A]|K|1OT]]|$0|-4|2|11T|4|11U|6|$9|@IU|JA|LL|3O]|7|-2|J|-4|L|-2|K|1HY|8|-2]]|$0|11V|2|11W|4|2M|6|$K|1HZ|9|@4I|1H|2S|2X|Y4|Y5|8D|4L|XU|4D|Y6]|7|-2|J|-4|8|-2|L|@11X]]]|$0|-4|2|11Y|4|6Y|6|$9|@R|70|N2|H8|PH|31|NG|6W|6Z]|7|-2|J|-4|K|1I0|8|-2]]|$0|-4|2|11Z|4|7J|6|$9|@2O|7H|52|A4|4Y]|K|1OU]]|$0|-4|2|120|4|DM|6|$9|@D7|FO]|K|1OV]]|$0|-4|2|121|4|RC|6|$9|@J2|IU|3O|EV]|K|1OW]]|$0|-4|2|122|4|4J|6|$9|@E6|3O|E7|JE|E8|4W|BN|49|4A|4N|JF|6A]|7|-2|J|-4|K|1I1|8|-2]]|$0|123|2|124|4|MT|6|$K|1I2|9|@19|3Z|FZ|QY|QX|C6]|7|-2|J|-4|8|-2]]|$0|125|2|126|4|67|6|$9|@E6|64|E8|4W|4J|E2|6C|49|BN]|7|-2|J|-4|K|1I3|8|-2|L|@127|128]]]|$0|-4|2|129|4|4C|6|$9|@3V|DR|DP|9X|DQ|4L|49|65|2U]|7|-2|J|-4|K|1I4|8|-2]]|$0|-4|2|12A|4|6C|6|$9|@4I|2G|JN|JF|E2|67|9M|4D|DE|4J|OA]|7|-2|J|-4|K|1I5|8|-2]]|$0|12B|2|12C|4|J6|6|$9|@CK|82|A8|12D|J1|8K|AD|8M]|7|-2|J|-4|K|1I6|8|-2|L|@12E]]]|$0|-4|2|12F|4|75|6|$9|-2|7|-2|J|-4|L|-2|7R|-4|K|1I7|8|-2]]|$0|12G|2|12H|4|EX|6|$9|@8R|NM|3H|3J|8T|CF|CD]|K|1OX]]|$0|-4|2|12I|4|D|6|$K|1I8|9|@3T|G|5|A|C|I8]]]|$0|-4|2|12J|4|F5|6|$K|1I9|9|@3D|3F|3L|2W]]]|$0|-4|2|12K|4|J7|6|$9|@FR|82|GF|I6|A8|66|4N]|K|1OY]]|$0|-4|2|12L|4|12M|6|$9|@K2|82|AY|9N|2R]|K|1OZ]]|$0|-4|2|12N|4|Y6|6|$9|@2M|XU|Y4]|7|-2|J|-4|L|-2|K|1IA|8|-2]]|$0|-4|2|12O|4|JO|6|$9|@9Z|JN|J1|II]|K|1P0]]|$0|-4|2|12P|4|12Q|6|$9|@8A|8F|CQ|12R|CU]|7|-2|J|-4|L|-2|K|1IB|8|-2]]|$0|-4|2|12S|4|TA|6|$K|1IC]]|$0|-4|2|12T|4|EB|6|$9|@5W|5S|49|8K|3O|LL|J1|JA|EA]|K|1P1]]|$0|-4|2|12U|4|CS|6|$9|@CQ|EE|8F|CU|II|JO]|K|1P2]]|$0|-4|2|12V|4|7V|6|$9|@7U|7T|7W|7X|3V|4B]|7|-2|J|-4|K|1ID|8|-2]]|$0|-4|2|12W|4|12X|6|@1P3]]|$0|12Y|2|12Z|4|BR|6|$9|@AM|GN|U|FE|11|V|T|1T|GY]|7|-2|J|-4|L|@130]|K|1IE|8|-2]]|$0|-4|2|131|4|4H|6|$9|@3Z|DQ|QY|B6|4C|4G|4L|49|65|4D]|7|-2|J|-4|K|1IF|8|-2]]|$0|-4|2|132|4|VZ|6|$9|@H2|LV|2W|3D]|K|1P4]]|$0|-4|2|133|4|64|6|$K|1IG|9|@BN|A8|4G|4A|67|8K|49|E2|8M|J7|4M|FR|4J]]]|$0|-4|2|134|4|68|6|$9|@7G|CL|8R|6C|2G|39|8M|CM|4E|E2|57|3I]|7|-2|J|-4|K|1IH|8|-2]]|$0|-4|2|135|4|O5|6|$9|@5W|3U|76|O3|O4]|7|-2|J|-4|L|-2|K|1II|8|-2]]|$0|-4|2|136|4|EP|6|$K|1IJ|9|@96|EV|5H|5E|8Q]]]|$0|-4|2|137|4|JM|6|$K|1IK|9|@94|6C|DE|CR|II|8F]]]|$0|-4|2|138|4|HU|6|$9|@15|16|2T|2Q|1B|HV|2V|2Y|BV|2Z]|7|-2|J|-4|K|1IL|8|-2]]|$0|-4|2|139|4|IM|6|$9|@LN|C2|LY|U|QX|WL|C6|RT|67|BR]|K|1P5]]|$0|13A|2|13B|4|PA|6|$K|1IM|9|@5F|JZ|B|66|2Y|EO]]]|$0|-4|2|13C|4|JA|6|$K|1IN|9|@8O|5H|IU|QI|LL|LM|H9|QV|LN|LO]]]|$0|-4|2|13D|4|2P|6|$9|@19|1H|15|1G|39|1I|1K|1J]|K|1P6]]|$0|-4|2|13E|4|13F|6|$9|@48|46|OW|42]|7|-2|J|-4|L|-2|K|1IO|8|-2]]|$0|-4|2|13G|4|A5|6|$9|@FY|A4|FO]|7|-2|J|-4|K|1IP|8|-2]]|$0|-4|2|13H|4|F|6|$K|1IQ|9|@96|9F|E|IU|LL|JA]]]|$0|-4|2|13I|4|80|6|$9|@38|AZ|FY]|K|1P7]]|$0|-4|2|13J|4|OH|6|$9|@OG|OE|OD|OF]|7|-2|J|-4|L|-2|K|1IR|8|-2]]|$0|-4|2|13K|4|3H|6|$9|@8L|8T|3J|39|3D|AG|2P|8Q|6C]|K|1P8]]|$0|-4|2|13L|4|5K|6|$K|1IS|9|@5E|5I|49|5H|4I|5C|67|3A]]]|$0|-4|2|13M|4|NS|6|$9|@2R|58|25|31|2W]|K|1P9]]|$0|-4|2|13N|4|JP|6|$9|@2H|CS|II]|K|1PA]]|$0|-4|2|13O|4|42|6|$K|1IT|9|@3V|3T|3Y|F4|4R|4Z|9Z|41|3X|FO|DM]|7|-2|J|-4|8|-2]]|$0|13P|2|13Q|4|3Y|6|$9|@9Z|FZ|9D|A3|4B|4C]|7|-2|J|-4|K|1IU|8|-2|L|@13R]]]|$0|13S|2|13T|4|A3|6|$K|1IV|9|@2M|3Y|9D|52]|7|-2|J|-4|L|@13U]|8|-2]]|$0|-4|2|13V|4|LN|6|$9|@5H|JA|QI|QV|C2|IU|6D|IM|LL|3A]|7|-2|J|-4|K|1IW|8|-2]]|$0|-4|2|13W|4|1A|6|$9|@B6|1C|9G|FZ|12|4S|4R|9H]|K|1PB]]|$0|-4|2|13X|4|4X|6|$9|@3V|2O|52|4Y|7J|7L|7H]|K|1PC]]|$0|13Y|2|13Z|4|L7|6|$K|1IX|9|@23|19|4A|K9|MJ|L8|RT|8B]|7|-2|J|-4|8|-2]]|$0|-4|2|140|4|2H|6|$9|@CQ|2H|NM|CU|5I|JP|JO]|K|1PD]]|$0|-4|2|141|4|142|6|$9|@JM|5E|IH|II|CU]|K|1PE]]|$0|-4|2|143|4|CQ|6|$9|@8A|8F|8E|CU|II|CR|JM|2H|CS|CT]|K|1PF]]|$0|144|2|145|4|LH|6|$K|1IY|9|@3L|IA|EX|A5]]]|$0|146|2|147|4|5Y|6|$9|@5R|5P|5S|5V|3P|EV|8K|5W]|7|-2|J|-4|K|1IZ|8|-2|L|@148]]]|$0|-4|2|149|4|4V|6|$9|@3T|5R|2O|3U|4Z|8M|7H]|7|-2|J|-4|K|1J0|8|-2]]|$0|-4|2|14A|4|14B|6|$9|@5P|6A|94|67|37|64|5S|E6]|7|-2|J|-4|L|-2|K|1J1|8|-2]]|$0|-4|2|14C|4|BU|6|$9|@3U]|7|-2|J|-4|L|-2|K|1J2|8|-2]]|$0|14D|2|14E|4|GN|6|$9|@95|AM|E6|1T|V|BR|4W|91|GM|IL]|7|-2|J|-4|K|1J3|8|-2|L|@14F]]]|$0|-4|2|14G|4|14H|6|$K|1J4]]|$0|14I|2|14J|4|14K|6|$9|@15|CP|9X|3V|F4|95|3T|7G|J2|2Y|FY|PA|24|C1|5R|9E|CM|2M|64|4Z|QV|2R|JM]|7|-2|J|-4|L|-2|K|1J5|8|-2]]|$0|-4|2|14L|4|A2|6|$K|1J6|9|@3T|3Q|2M|DB|AZ|A0|A5|A4|FO]|7|@$1R|1J7|2|14M|4|14N|1U|1J8|1V|1J9|1W|1X|0|14O|1Z|1JA|20|1JB|21|22]]|J|-4|8|-2]]|$0|-4|2|14P|4|5O|6|$K|1JC|9|@5W|5P|R6|I6|94|8D|U]]]|$0|-4|2|14Q|4|4L|6|$9|@3V|DR|DP|9W|9X|DQ|4C|4I|4H|4K|3Z|65|4G|2U|MT|49]|K|1PG]]|$0|-4|2|14R|4|L3|6|$9|@U7|58|5H|83|5F|GO|IB|31|7P|C6|BH|25]|K|1PH]]|$0|-4|2|14S|4|14T|6|$9|@AY|2S]|K|1PI]]|$0|14U|2|14V|4|NM|6|$9|@2H|3G|MT]|7|-2|J|-4|K|1JD|8|-2]]|$0|-4|2|14W|4|DC|6|$K|1JE|9|@DB|OW|8L]|7|-2|J|-4|8|-2|L|@14X]]]|$0|14Y|2|14Z|4|8L|6|$9|@CB|8T|3G|3J|3H|39|57|RI|8Q|3E|CE|38|CD|8R]|7|-2|J|-4|L|@150]|K|1JF|8|-2]]|$0|151|2|152|4|AA|6|$9|@7G|16|25|B|NI|AC|8M|49|8K|A8|BN|3A|EA|JA]|7|-2|J|-4|K|1JG|8|-2|L|@153]]]|$0|154|2|155|4|4Z|6|$9|@7G|2O|9Z|C4|2X|4V|4Y|C7|4D|F]|7|-2|J|-4|K|1JH|8|-2|L|@156]]]|$0|-4|2|157|4|AN|6|$9|@4T|4W|AL|23|1A]|K|1PJ]]|$0|158|2|159|4|12D|6|$9|@2Q|CK|KZ|82|16|60|DF]|7|-2|J|-4|K|1JI|8|-2|L|@15A]]]|$0|-4|2|15B|4|15C|6|$9|@16|3N|3P|CM|CK|DD]|7|-2|J|-4|L|-2|K|1JJ|8|-2]]|$0|-4|2|15D|4|15E|6|$9|@VL]|K|1PK]]|$0|15F|2|15G|4|QE|6|$K|1JK|9|@J2|RC|9N|5D|5Z|A7|QD|56|NS|8J|9O]|7|-2|J|-4|8|-2|L|@15H]]]|$0|-4|2|15I|4|B|6|$9|@BH|F|IU|5C|LY|PA]|7|-2|J|-4|L|@]|K|1JL|8|-2]]|$0|-4|2|15J|4|96|6|$K|1JM|9|@B|GO|IL|IB]|7|-2|J|-4|8|-2]]|$0|-4|2|15K|4|15L|6|$9|@3T|3Q|9H]|7|-2|J|-4|L|-2|K|1JN|8|-2]]|$0|-4|2|15M|4|CB|6|$9|@3G|CG|8Q|3E|CE|CH|8L|39|CD|3D|3H]|K|1PL]]|$0|-4|2|15N|4|AZ|6|$K|1JO|9|@G1|ST|8J]]]|$0|-4|2|15O|4|N2|6|$9|@H8|26|49|25|58|65|27|90|91]|K|1PM]]|$0|-4|2|15P|4|A0|6|$K|1JP|9|@3T|95|3Z|9Z|A2|A4|FO|A5|52|42]|7|-2|J|-4|8|-2]]|$0|15Q|2|15R|4|15S|6|$9|@E6|E7|E8|4W|5X]|7|-2|J|-4|K|1JQ|8|@1JR]]]|$0|-4|2|15T|4|AU|6|$9|@Y4|AT]|K|1PN]]|$0|15U|2|15V|4|24|6|$K|1JS|9|@23|19|8B|OP|8A|9T|9R|26|8J]|7|@$1R|1JT|2|V0|4|V1|1U|1JU|1V|1JV|1W|1X|0|15W|1Z|1JW|20|1JX|21|22]]|J|-4|8|-2]]|$0|-4|2|15X|4|OP|6|$K|1JY|9|@19|24|8B|8A]|7|-2|J|-4|8|-2]]|$0|15Y|2|15Z|4|AH|6|$9|@7G|2T|3I|2Q|IB|4I|IL|1B|GY]|7|-2|J|-4|L|@160|161]|K|1JZ|8|-2]]|$0|162|2|163|4|XU|6|$K|1K0|9|@2M|4I|37|Y4|RU|A2|Y6]|7|-2|J|-4|8|-2|L|@164]]]|$0|165|2|166|4|76|6|$K|1K1|9|@5W|5R|5O|5S|5V|94|5Y|LH|73|5P|8M|5X]|7|-2|J|-4|8|-2|L|@167]]]|$0|-4|2|168|4|MR|6|$K|1K2|9|@CB|EV|3G|EU|CF]]]|$0|-4|2|169|4|BG|6|$9|@GO|L3|IA|31|2V|7P|2T|58|2Z|2W|10Z]|K|1PO]]|$0|-4|2|16A|4|16B|6|$9|@2Q|18|96|5F]|7|-2|J|-4|L|-2|K|1K3|8|-2]]|$0|16C|2|16D|4|28|6|$K|1K4|9|@23|1T|V|9I|FY|4T]|7|@$1R|1K5|2|1S|4|1T|1U|1K6|1V|1K7|1W|1X|0|16E|1Z|1K8|20|1K9|21|22]]|J|-4|8|-2|L|@16F|16G|16H]]]|$0|-4|2|16I|4|RG|6|$9|@19|AZ|2S|1G|AY|2X|1J]|7|-2|J|-4|K|1KA|8|-2]]|$0|-4|2|16J|4|K0|6|$9|@15|5F|RG|VU|4L|30|JZ|JY]|K|1PP]]|$0|-4|2|16K|4|30|6|$9|@15|16|5F|K0|2U|2X|49]|7|-2|J|-4|K|1KB|8|-2]]|$0|-4|2|16L|4|9Z|6|$K|1KC|9|@4Z|CT|48|AM|LY]]]|$0|-4|2|16M|4|7K|6|$K|1KD|9|@2M|2O|7H|46|52|7L|4Y]|7|-2|J|-4|8|-2]]|$0|-4|2|16N|4|41|6|$K|1KE|9|@3V|3T|BR|42|D7]|7|-2|J|-4|8|-2]]|$0|-4|2|16O|4|E|6|$K|1KF|9|@8O|2W|H|I|F|A|G|D|2G|5|AA|9F]]]|$0|-4|2|16P|4|4S|6|$7|-2|J|-4|K|1KG|8|-2|9|@AM|10|TE|1A|1C|9I|B6]]]|$0|-4|2|16Q|4|1L|6|$9|@19|MT|QX|RT|83|CF|C6|IM]|7|-2|J|-4|K|1KH|8|-2]]|$0|-4|2|16R|4|16S|6|$9|@4E|CB]|7|-2|J|-4|K|1KI|8|-2]]|$0|-4|2|16T|4|HI|6|$9|@5W|2X|DW|HJ|HK|DX|HF|HL|HH|HM]|K|1PQ]]|$0|16U|2|16V|4|I|6|$K|1KJ|9|@2Y|8O|31|5Q|7G|49|8K|AA|5I|H|2W|2G|38|3B|2N|4E]|7|-2|J|-4|L|@16W|16X]|8|-2]]|$0|-4|2|16Y|4|97|6|$9|@19|CQ|4W|CT|2U]|K|1PR]]|$0|16Z|2|6T|4|16|6|$K|1KK|9|@2Y|FD|49|2N|8O]|7|-2|J|-4|8|-2|L|@170]]]|$0|-4|2|171|4|7X|6|$9|@7U|7V|7W|7T|4B|4F]|7|-2|J|-4|K|1KL|8|-2]]|$0|-4|2|172|4|4M|6|$9|@DR|DP|46|9X|5S|49|64|2U|66|BN|65|A8]|7|-2|J|-4|K|1KM|8|-2]]|$0|173|2|174|4|QV|6|$K|1KN|9|@C1|8O|2N|5H|IU|C2|16|25|IM|LN|175|JA|4J|6D]|7|-2|J|-4|8|-2|L|@176]]]|$0|-4|2|177|4|175|6|$9|@5H|IU|C2|QI|QV|LN|70|6A|R|Q|90]|7|-2|J|-4|K|1KO|8|-2]]|$0|-4|2|178|4|HX|6|$9|@HY|2X|DW|MK|8D]|K|1PS]]|$0|-4|2|179|4|OE|6|$9|@OD|OF]|7|-2|J|-4|L|-2|K|1KP|8|-2]]|$0|-4|2|17A|4|1K|6|$9|@19|1G|1I|1J|2P|1L]|7|-2|J|-4|L|-2|K|1KQ|8|-2]]|$0|-4|2|17B|4|WL|6|$K|1KR|9|@9E|19|DP|9W|1L|4U|IM|24|RT|QX]]]|$0|-4|2|17C|4|FC|6|$9|@6Q|1B]|K|1PT]]|$0|-4|2|17D|4|FN|6|$9|@D7|FO|7V|FM|7W]|7|-2|J|-4|K|1KS|8|-2]]|$0|-4|2|17E|4|12R|6|$9|@CQ|8A|8F|CU]|7|-2|J|-4|L|-2|K|1KT|8|-2]]|$0|-4|2|17F|4|9W|6|$K|1KU|9|@3V|9E|DR|DP|DQ|4C|4L|WL|8M|65|A9|4G|3F|4U|49|C2|4H]]]]";

/***/ }),

/***/ "./src/blocks/05-vibemap-embed-events/block.json":
/*!*******************************************************!*\
  !*** ./src/blocks/05-vibemap-embed-events/block.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"blocks/vibemap-embed-events","title":"Vibemap Events Embed Blocks","textdomain":"gutenberg-examples","icon":"location-alt","category":"layout","keywords":["map","listings","events"],"example":{"attributes":{"content":"Hello world","embed":"events","cities":["peoria"],"categories":[],"tags":[],"vibes":[],"align":"center","class":"vibemap-embed iframe","frameborder":"0","height":2000,"width":"100%","scrolling":"yes"}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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
/******/ 			"05-vibemap-embed-events/index": 0,
/******/ 			"05-vibemap-embed-events/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["05-vibemap-embed-events/style-index"], () => (__webpack_require__("./src/blocks/05-vibemap-embed-events/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map