/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@mapbox/geo-viewport/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@mapbox/geo-viewport/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SphericalMercator = __webpack_require__(/*! @mapbox/sphericalmercator */ "./node_modules/@mapbox/sphericalmercator/sphericalmercator.js");

// The SphericalMercator library only accepts a variable
// tileSize on instantiation, which it uses to pre-cache
// calculations by zoom level.
// We cache each instantiation, keyed by tile size, to avoid
// repeating this cost when working with a single tile size
// (assumed to be the most-common use case).
var smCache = {};

module.exports.viewport = viewport;
module.exports.bounds = bounds;

function fetchMerc(tileSize) {
    tileSize = tileSize || 256;

    if (!smCache[tileSize]) {
        smCache[tileSize] = new SphericalMercator({ size: tileSize });
    }

    return smCache[tileSize];
}

function getAdjusted(base, ratios, allowFloat) {
    var adjusted = Math.min(
        base - (Math.log(ratios[0]) / Math.log(2)),
        base - (Math.log(ratios[1]) / Math.log(2)));

    return allowFloat ? adjusted : Math.floor(adjusted);
}

function viewport(bounds, dimensions, minzoom, maxzoom, tileSize, allowFloat) {
    minzoom = (minzoom === undefined) ? 0 : minzoom;
    maxzoom = (maxzoom === undefined) ? 20 : maxzoom;
    var merc = fetchMerc(tileSize);
    var base = maxzoom;
    var bl = merc.px([bounds[0], bounds[1]], base);
    var tr = merc.px([bounds[2], bounds[3]], base);
    var width = tr[0] - bl[0];
    var height = bl[1] - tr[1];
    var centerPixelX = bl[0] + (width / 2);
    var centerPixelY = tr[1] + (height / 2);
    var ratios = [width / dimensions[0], height / dimensions[1]];
    var adjusted = getAdjusted(base, ratios, allowFloat);

    var center = merc.ll([centerPixelX, centerPixelY], base);
    var zoom = Math.max(minzoom, Math.min(maxzoom, adjusted));

    return { center, zoom };
}

function bounds(viewport, zoom, dimensions, tileSize) {
    if (viewport.lon !== undefined) {
        viewport = [
            viewport.lon,
            viewport.lat
        ];
    }

    var merc = fetchMerc(tileSize);
    var px = merc.px(viewport, zoom);
    var tl = merc.ll([
        px[0] - (dimensions[0] / 2),
        px[1] - (dimensions[1] / 2)
    ], zoom);
    var br = merc.ll([
        px[0] + (dimensions[0] / 2),
        px[1] + (dimensions[1] / 2)
    ], zoom);
    return [tl[0], br[1], br[0], tl[1]];
}


/***/ }),

/***/ "./node_modules/@mapbox/sphericalmercator/sphericalmercator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@mapbox/sphericalmercator/sphericalmercator.js ***!
  \*********************************************************************/
/***/ ((module, exports) => {

var SphericalMercator = (function(){

// Closures including constants and other precalculated values.
var cache = {},
    EPSLN = 1.0e-10,
    D2R = Math.PI / 180,
    R2D = 180 / Math.PI,
    // 900913 properties.
    A = 6378137.0,
    MAXEXTENT = 20037508.342789244;

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

// SphericalMercator constructor: precaches calculations
// for fast tile lookups.
function SphericalMercator(options) {
    options = options || {};
    this.size = options.size || 256;
    if (!cache[this.size]) {
        var size = this.size;
        var c = cache[this.size] = {};
        c.Bc = [];
        c.Cc = [];
        c.zc = [];
        c.Ac = [];
        for (var d = 0; d < 30; d++) {
            c.Bc.push(size / 360);
            c.Cc.push(size / (2 * Math.PI));
            c.zc.push(size / 2);
            c.Ac.push(size);
            size *= 2;
        }
    }
    this.Bc = cache[this.size].Bc;
    this.Cc = cache[this.size].Cc;
    this.zc = cache[this.size].zc;
    this.Ac = cache[this.size].Ac;
};

// Convert lon lat to screen pixel value
//
// - `ll` {Array} `[lon, lat]` array of geographic coordinates.
// - `zoom` {Number} zoom level.
SphericalMercator.prototype.px = function(ll, zoom) {
  if (isFloat(zoom)) {
    var size = this.size * Math.pow(2, zoom);
    var d = size / 2;
    var bc = (size / 360);
    var cc = (size / (2 * Math.PI));
    var ac = size;
    var f = Math.min(Math.max(Math.sin(D2R * ll[1]), -0.9999), 0.9999);
    var x = d + ll[0] * bc;
    var y = d + 0.5 * Math.log((1 + f) / (1 - f)) * -cc;
    (x > ac) && (x = ac);
    (y > ac) && (y = ac);
    //(x < 0) && (x = 0);
    //(y < 0) && (y = 0);
    return [x, y];
  } else {
    var d = this.zc[zoom];
    var f = Math.min(Math.max(Math.sin(D2R * ll[1]), -0.9999), 0.9999);
    var x = Math.round(d + ll[0] * this.Bc[zoom]);
    var y = Math.round(d + 0.5 * Math.log((1 + f) / (1 - f)) * (-this.Cc[zoom]));
    (x > this.Ac[zoom]) && (x = this.Ac[zoom]);
    (y > this.Ac[zoom]) && (y = this.Ac[zoom]);
    //(x < 0) && (x = 0);
    //(y < 0) && (y = 0);
    return [x, y];
  }
};

// Convert screen pixel value to lon lat
//
// - `px` {Array} `[x, y]` array of geographic coordinates.
// - `zoom` {Number} zoom level.
SphericalMercator.prototype.ll = function(px, zoom) {
  if (isFloat(zoom)) {
    var size = this.size * Math.pow(2, zoom);
    var bc = (size / 360);
    var cc = (size / (2 * Math.PI));
    var zc = size / 2;
    var g = (px[1] - zc) / -cc;
    var lon = (px[0] - zc) / bc;
    var lat = R2D * (2 * Math.atan(Math.exp(g)) - 0.5 * Math.PI);
    return [lon, lat];
  } else {
    var g = (px[1] - this.zc[zoom]) / (-this.Cc[zoom]);
    var lon = (px[0] - this.zc[zoom]) / this.Bc[zoom];
    var lat = R2D * (2 * Math.atan(Math.exp(g)) - 0.5 * Math.PI);
    return [lon, lat];
  }
};

// Convert tile xyz value to bbox of the form `[w, s, e, n]`
//
// - `x` {Number} x (longitude) number.
// - `y` {Number} y (latitude) number.
// - `zoom` {Number} zoom.
// - `tms_style` {Boolean} whether to compute using tms-style.
// - `srs` {String} projection for resulting bbox (WGS84|900913).
// - `return` {Array} bbox array of values in form `[w, s, e, n]`.
SphericalMercator.prototype.bbox = function(x, y, zoom, tms_style, srs) {
    // Convert xyz into bbox with srs WGS84
    if (tms_style) {
        y = (Math.pow(2, zoom) - 1) - y;
    }
    // Use +y to make sure it's a number to avoid inadvertent concatenation.
    var ll = [x * this.size, (+y + 1) * this.size]; // lower left
    // Use +x to make sure it's a number to avoid inadvertent concatenation.
    var ur = [(+x + 1) * this.size, y * this.size]; // upper right
    var bbox = this.ll(ll, zoom).concat(this.ll(ur, zoom));

    // If web mercator requested reproject to 900913.
    if (srs === '900913') {
        return this.convert(bbox, '900913');
    } else {
        return bbox;
    }
};

// Convert bbox to xyx bounds
//
// - `bbox` {Number} bbox in the form `[w, s, e, n]`.
// - `zoom` {Number} zoom.
// - `tms_style` {Boolean} whether to compute using tms-style.
// - `srs` {String} projection of input bbox (WGS84|900913).
// - `@return` {Object} XYZ bounds containing minX, maxX, minY, maxY properties.
SphericalMercator.prototype.xyz = function(bbox, zoom, tms_style, srs) {
    // If web mercator provided reproject to WGS84.
    if (srs === '900913') {
        bbox = this.convert(bbox, 'WGS84');
    }

    var ll = [bbox[0], bbox[1]]; // lower left
    var ur = [bbox[2], bbox[3]]; // upper right
    var px_ll = this.px(ll, zoom);
    var px_ur = this.px(ur, zoom);
    // Y = 0 for XYZ is the top hence minY uses px_ur[1].
    var x = [ Math.floor(px_ll[0] / this.size), Math.floor((px_ur[0] - 1) / this.size) ];
    var y = [ Math.floor(px_ur[1] / this.size), Math.floor((px_ll[1] - 1) / this.size) ];
    var bounds = {
        minX: Math.min.apply(Math, x) < 0 ? 0 : Math.min.apply(Math, x),
        minY: Math.min.apply(Math, y) < 0 ? 0 : Math.min.apply(Math, y),
        maxX: Math.max.apply(Math, x),
        maxY: Math.max.apply(Math, y)
    };
    if (tms_style) {
        var tms = {
            minY: (Math.pow(2, zoom) - 1) - bounds.maxY,
            maxY: (Math.pow(2, zoom) - 1) - bounds.minY
        };
        bounds.minY = tms.minY;
        bounds.maxY = tms.maxY;
    }
    return bounds;
};

// Convert projection of given bbox.
//
// - `bbox` {Number} bbox in the form `[w, s, e, n]`.
// - `to` {String} projection of output bbox (WGS84|900913). Input bbox
//   assumed to be the "other" projection.
// - `@return` {Object} bbox with reprojected coordinates.
SphericalMercator.prototype.convert = function(bbox, to) {
    if (to === '900913') {
        return this.forward(bbox.slice(0, 2)).concat(this.forward(bbox.slice(2,4)));
    } else {
        return this.inverse(bbox.slice(0, 2)).concat(this.inverse(bbox.slice(2,4)));
    }
};

// Convert lon/lat values to 900913 x/y.
SphericalMercator.prototype.forward = function(ll) {
    var xy = [
        A * ll[0] * D2R,
        A * Math.log(Math.tan((Math.PI*0.25) + (0.5 * ll[1] * D2R)))
    ];
    // if xy value is beyond maxextent (e.g. poles), return maxextent.
    (xy[0] > MAXEXTENT) && (xy[0] = MAXEXTENT);
    (xy[0] < -MAXEXTENT) && (xy[0] = -MAXEXTENT);
    (xy[1] > MAXEXTENT) && (xy[1] = MAXEXTENT);
    (xy[1] < -MAXEXTENT) && (xy[1] = -MAXEXTENT);
    return xy;
};

// Convert 900913 x/y values to lon/lat.
SphericalMercator.prototype.inverse = function(xy) {
    return [
        (xy[0] * R2D / A),
        ((Math.PI*0.5) - 2.0 * Math.atan(Math.exp(-xy[1] / A))) * R2D
    ];
};

return SphericalMercator;

})();

if (true) {
    module.exports = exports = SphericalMercator;
}


/***/ }),

/***/ "./node_modules/@turf/bbox-polygon/dist/js/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@turf/bbox-polygon/dist/js/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var helpers_1 = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js");
/**
 * Takes a bbox and returns an equivalent {@link Polygon|polygon}.
 *
 * @name bboxPolygon
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @param {Object} [options={}] Optional parameters
 * @param {Properties} [options.properties={}] Translate properties to Polygon
 * @param {string|number} [options.id={}] Translate Id to Polygon
 * @returns {Feature<Polygon>} a Polygon representation of the bounding box
 * @example
 * var bbox = [0, 0, 10, 10];
 *
 * var poly = turf.bboxPolygon(bbox);
 *
 * //addToMap
 * var addToMap = [poly]
 */
function bboxPolygon(bbox, options) {
    if (options === void 0) { options = {}; }
    // Convert BBox positions to Numbers
    // No performance loss for including Number()
    // https://github.com/Turfjs/turf/issues/1119
    var west = Number(bbox[0]);
    var south = Number(bbox[1]);
    var east = Number(bbox[2]);
    var north = Number(bbox[3]);
    if (bbox.length === 6) {
        throw new Error("@turf/bbox-polygon does not support BBox with 6 positions");
    }
    var lowLeft = [west, south];
    var topLeft = [west, north];
    var topRight = [east, north];
    var lowRight = [east, south];
    return helpers_1.polygon([[lowLeft, lowRight, topRight, topLeft, lowLeft]], options.properties, { bbox: bbox, id: options.id });
}
exports["default"] = bboxPolygon;


/***/ }),

/***/ "./node_modules/@turf/bbox/dist/js/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@turf/bbox/dist/js/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var meta_1 = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/js/index.js");
/**
 * Takes a set of features, calculates the bbox of all input features, and returns a bounding box.
 *
 * @name bbox
 * @param {GeoJSON} geojson any GeoJSON object
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
 * var bbox = turf.bbox(line);
 * var bboxPolygon = turf.bboxPolygon(bbox);
 *
 * //addToMap
 * var addToMap = [line, bboxPolygon]
 */
function bbox(geojson) {
    var result = [Infinity, Infinity, -Infinity, -Infinity];
    meta_1.coordEach(geojson, function (coord) {
        if (result[0] > coord[0]) {
            result[0] = coord[0];
        }
        if (result[1] > coord[1]) {
            result[1] = coord[1];
        }
        if (result[2] < coord[0]) {
            result[2] = coord[0];
        }
        if (result[3] < coord[1]) {
            result[3] = coord[1];
        }
    });
    return result;
}
bbox["default"] = bbox;
exports["default"] = bbox;


/***/ }),

/***/ "./node_modules/@turf/boolean-point-in-polygon/dist/js/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@turf/boolean-point-in-polygon/dist/js/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var invariant_1 = __webpack_require__(/*! @turf/invariant */ "./node_modules/@turf/invariant/dist/js/index.js");
// http://en.wikipedia.org/wiki/Even%E2%80%93odd_rule
// modified from: https://github.com/substack/point-in-polygon/blob/master/index.js
// which was modified from http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
/**
 * Takes a {@link Point} and a {@link Polygon} or {@link MultiPolygon} and determines if the point
 * resides inside the polygon. The polygon can be convex or concave. The function accounts for holes.
 *
 * @name booleanPointInPolygon
 * @param {Coord} point input point
 * @param {Feature<Polygon|MultiPolygon>} polygon input polygon or multipolygon
 * @param {Object} [options={}] Optional parameters
 * @param {boolean} [options.ignoreBoundary=false] True if polygon boundary should be ignored when determining if
 * the point is inside the polygon otherwise false.
 * @returns {boolean} `true` if the Point is inside the Polygon; `false` if the Point is not inside the Polygon
 * @example
 * var pt = turf.point([-77, 44]);
 * var poly = turf.polygon([[
 *   [-81, 41],
 *   [-81, 47],
 *   [-72, 47],
 *   [-72, 41],
 *   [-81, 41]
 * ]]);
 *
 * turf.booleanPointInPolygon(pt, poly);
 * //= true
 */
function booleanPointInPolygon(point, polygon, options) {
    if (options === void 0) { options = {}; }
    // validation
    if (!point) {
        throw new Error("point is required");
    }
    if (!polygon) {
        throw new Error("polygon is required");
    }
    var pt = invariant_1.getCoord(point);
    var geom = invariant_1.getGeom(polygon);
    var type = geom.type;
    var bbox = polygon.bbox;
    var polys = geom.coordinates;
    // Quick elimination if point is not inside bbox
    if (bbox && inBBox(pt, bbox) === false) {
        return false;
    }
    // normalize to multipolygon
    if (type === "Polygon") {
        polys = [polys];
    }
    var insidePoly = false;
    for (var i = 0; i < polys.length && !insidePoly; i++) {
        // check if it is in the outer ring first
        if (inRing(pt, polys[i][0], options.ignoreBoundary)) {
            var inHole = false;
            var k = 1;
            // check for the point in any of the holes
            while (k < polys[i].length && !inHole) {
                if (inRing(pt, polys[i][k], !options.ignoreBoundary)) {
                    inHole = true;
                }
                k++;
            }
            if (!inHole) {
                insidePoly = true;
            }
        }
    }
    return insidePoly;
}
exports["default"] = booleanPointInPolygon;
/**
 * inRing
 *
 * @private
 * @param {Array<number>} pt [x,y]
 * @param {Array<Array<number>>} ring [[x,y], [x,y],..]
 * @param {boolean} ignoreBoundary ignoreBoundary
 * @returns {boolean} inRing
 */
function inRing(pt, ring, ignoreBoundary) {
    var isInside = false;
    if (ring[0][0] === ring[ring.length - 1][0] &&
        ring[0][1] === ring[ring.length - 1][1]) {
        ring = ring.slice(0, ring.length - 1);
    }
    for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        var xi = ring[i][0];
        var yi = ring[i][1];
        var xj = ring[j][0];
        var yj = ring[j][1];
        var onBoundary = pt[1] * (xi - xj) + yi * (xj - pt[0]) + yj * (pt[0] - xi) === 0 &&
            (xi - pt[0]) * (xj - pt[0]) <= 0 &&
            (yi - pt[1]) * (yj - pt[1]) <= 0;
        if (onBoundary) {
            return !ignoreBoundary;
        }
        var intersect = yi > pt[1] !== yj > pt[1] &&
            pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi;
        if (intersect) {
            isInside = !isInside;
        }
    }
    return isInside;
}
/**
 * inBBox
 *
 * @private
 * @param {Position} pt point [x,y]
 * @param {BBox} bbox BBox [west, south, east, north]
 * @returns {boolean} true/false if point is inside BBox
 */
function inBBox(pt, bbox) {
    return (bbox[0] <= pt[0] && bbox[1] <= pt[1] && bbox[2] >= pt[0] && bbox[3] >= pt[1]);
}


/***/ }),

/***/ "./node_modules/@turf/center/dist/js/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@turf/center/dist/js/index.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var bbox_1 = __importDefault(__webpack_require__(/*! @turf/bbox */ "./node_modules/@turf/bbox/dist/js/index.js"));
var helpers_1 = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js");
/**
 * Takes a {@link Feature} or {@link FeatureCollection} and returns the absolute center point of all features.
 *
 * @name center
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] Translate GeoJSON Properties to Point
 * @param {Object} [options.bbox={}] Translate GeoJSON BBox to Point
 * @param {Object} [options.id={}] Translate GeoJSON Id to Point
 * @returns {Feature<Point>} a Point feature at the absolute center point of all input features
 * @example
 * var features = turf.points([
 *   [-97.522259, 35.4691],
 *   [-97.502754, 35.463455],
 *   [-97.508269, 35.463245]
 * ]);
 *
 * var center = turf.center(features);
 *
 * //addToMap
 * var addToMap = [features, center]
 * center.properties['marker-size'] = 'large';
 * center.properties['marker-color'] = '#000';
 */
function center(geojson, options) {
    if (options === void 0) { options = {}; }
    var ext = bbox_1.default(geojson);
    var x = (ext[0] + ext[2]) / 2;
    var y = (ext[1] + ext[3]) / 2;
    return helpers_1.point([x, y], options.properties, options);
}
exports["default"] = center;


/***/ }),

/***/ "./node_modules/@turf/clone/dist/js/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@turf/clone/dist/js/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Returns a cloned copy of the passed GeoJSON Object, including possible 'Foreign Members'.
 * ~3-5x faster than the common JSON.parse + JSON.stringify combo method.
 *
 * @name clone
 * @param {GeoJSON} geojson GeoJSON Object
 * @returns {GeoJSON} cloned GeoJSON Object
 * @example
 * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]], {color: 'red'});
 *
 * var lineCloned = turf.clone(line);
 */
function clone(geojson) {
    if (!geojson) {
        throw new Error("geojson is required");
    }
    switch (geojson.type) {
        case "Feature":
            return cloneFeature(geojson);
        case "FeatureCollection":
            return cloneFeatureCollection(geojson);
        case "Point":
        case "LineString":
        case "Polygon":
        case "MultiPoint":
        case "MultiLineString":
        case "MultiPolygon":
        case "GeometryCollection":
            return cloneGeometry(geojson);
        default:
            throw new Error("unknown GeoJSON type");
    }
}
/**
 * Clone Feature
 *
 * @private
 * @param {Feature<any>} geojson GeoJSON Feature
 * @returns {Feature<any>} cloned Feature
 */
function cloneFeature(geojson) {
    var cloned = { type: "Feature" };
    // Preserve Foreign Members
    Object.keys(geojson).forEach(function (key) {
        switch (key) {
            case "type":
            case "properties":
            case "geometry":
                return;
            default:
                cloned[key] = geojson[key];
        }
    });
    // Add properties & geometry last
    cloned.properties = cloneProperties(geojson.properties);
    cloned.geometry = cloneGeometry(geojson.geometry);
    return cloned;
}
/**
 * Clone Properties
 *
 * @private
 * @param {Object} properties GeoJSON Properties
 * @returns {Object} cloned Properties
 */
function cloneProperties(properties) {
    var cloned = {};
    if (!properties) {
        return cloned;
    }
    Object.keys(properties).forEach(function (key) {
        var value = properties[key];
        if (typeof value === "object") {
            if (value === null) {
                // handle null
                cloned[key] = null;
            }
            else if (Array.isArray(value)) {
                // handle Array
                cloned[key] = value.map(function (item) {
                    return item;
                });
            }
            else {
                // handle generic Object
                cloned[key] = cloneProperties(value);
            }
        }
        else {
            cloned[key] = value;
        }
    });
    return cloned;
}
/**
 * Clone Feature Collection
 *
 * @private
 * @param {FeatureCollection<any>} geojson GeoJSON Feature Collection
 * @returns {FeatureCollection<any>} cloned Feature Collection
 */
function cloneFeatureCollection(geojson) {
    var cloned = { type: "FeatureCollection" };
    // Preserve Foreign Members
    Object.keys(geojson).forEach(function (key) {
        switch (key) {
            case "type":
            case "features":
                return;
            default:
                cloned[key] = geojson[key];
        }
    });
    // Add features
    cloned.features = geojson.features.map(function (feature) {
        return cloneFeature(feature);
    });
    return cloned;
}
/**
 * Clone Geometry
 *
 * @private
 * @param {Geometry<any>} geometry GeoJSON Geometry
 * @returns {Geometry<any>} cloned Geometry
 */
function cloneGeometry(geometry) {
    var geom = { type: geometry.type };
    if (geometry.bbox) {
        geom.bbox = geometry.bbox;
    }
    if (geometry.type === "GeometryCollection") {
        geom.geometries = geometry.geometries.map(function (g) {
            return cloneGeometry(g);
        });
        return geom;
    }
    geom.coordinates = deepSlice(geometry.coordinates);
    return geom;
}
/**
 * Deep Slice coordinates
 *
 * @private
 * @param {Coordinates} coords Coordinates
 * @returns {Coordinates} all coordinates sliced
 */
function deepSlice(coords) {
    var cloned = coords;
    if (typeof cloned[0] !== "object") {
        return cloned.slice();
    }
    return cloned.map(function (coord) {
        return deepSlice(coord);
    });
}
exports["default"] = clone;


/***/ }),

/***/ "./node_modules/@turf/clusters-dbscan/dist/js/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@turf/clusters-dbscan/dist/js/index.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var clone_1 = __importDefault(__webpack_require__(/*! @turf/clone */ "./node_modules/@turf/clone/dist/js/index.js"));
var distance_1 = __importDefault(__webpack_require__(/*! @turf/distance */ "./node_modules/@turf/distance/dist/js/index.js"));
var meta_1 = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/js/index.js");
var helpers_1 = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js");
var density_clustering_1 = __importDefault(__webpack_require__(/*! density-clustering */ "./node_modules/density-clustering/lib/index.js"));
/**
 * Takes a set of {@link Point|points} and partition them into clusters according to {@link DBSCAN's|https://en.wikipedia.org/wiki/DBSCAN} data clustering algorithm.
 *
 * @name clustersDbscan
 * @param {FeatureCollection<Point>} points to be clustered
 * @param {number} maxDistance Maximum Distance between any point of the cluster to generate the clusters (kilometers only)
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units="kilometers"] in which `maxDistance` is expressed, can be degrees, radians, miles, or kilometers
 * @param {boolean} [options.mutate=false] Allows GeoJSON input to be mutated
 * @param {number} [options.minPoints=3] Minimum number of points to generate a single cluster,
 * points which do not meet this requirement will be classified as an 'edge' or 'noise'.
 * @returns {FeatureCollection<Point>} Clustered Points with an additional two properties associated to each Feature:
 * - {number} cluster - the associated clusterId
 * - {string} dbscan - type of point it has been classified as ('core'|'edge'|'noise')
 * @example
 * // create random points with random z-values in their properties
 * var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
 * var maxDistance = 100;
 * var clustered = turf.clustersDbscan(points, maxDistance);
 *
 * //addToMap
 * var addToMap = [clustered];
 */
function clustersDbscan(points, maxDistance, options) {
    // Input validation being handled by Typescript
    // collectionOf(points, 'Point', 'points must consist of a FeatureCollection of only Points');
    // if (maxDistance === null || maxDistance === undefined) throw new Error('maxDistance is required');
    // if (!(Math.sign(maxDistance) > 0)) throw new Error('maxDistance is invalid');
    // if (!(minPoints === undefined || minPoints === null || Math.sign(minPoints) > 0)) throw new Error('options.minPoints is invalid');
    if (options === void 0) { options = {}; }
    // Clone points to prevent any mutations
    if (options.mutate !== true)
        points = clone_1.default(points);
    // Defaults
    options.minPoints = options.minPoints || 3;
    // create clustered ids
    var dbscan = new density_clustering_1.default.DBSCAN();
    var clusteredIds = dbscan.run(meta_1.coordAll(points), helpers_1.convertLength(maxDistance, options.units), options.minPoints, distance_1.default);
    // Tag points to Clusters ID
    var clusterId = -1;
    clusteredIds.forEach(function (clusterIds) {
        clusterId++;
        // assign cluster ids to input points
        clusterIds.forEach(function (idx) {
            var clusterPoint = points.features[idx];
            if (!clusterPoint.properties)
                clusterPoint.properties = {};
            clusterPoint.properties.cluster = clusterId;
            clusterPoint.properties.dbscan = "core";
        });
    });
    // handle noise points, if any
    // edges points are tagged by DBSCAN as both 'noise' and 'cluster' as they can "reach" less than 'minPoints' number of points
    dbscan.noise.forEach(function (noiseId) {
        var noisePoint = points.features[noiseId];
        if (!noisePoint.properties)
            noisePoint.properties = {};
        if (noisePoint.properties.cluster)
            noisePoint.properties.dbscan = "edge";
        else
            noisePoint.properties.dbscan = "noise";
    });
    return points;
}
exports["default"] = clustersDbscan;


/***/ }),

/***/ "./node_modules/@turf/clusters/dist/js/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@turf/clusters/dist/js/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var meta_1 = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/js/index.js");
var helpers_1 = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js");
/**
 * Get Cluster
 *
 * @name getCluster
 * @param {FeatureCollection} geojson GeoJSON Features
 * @param {*} filter Filter used on GeoJSON properties to get Cluster
 * @returns {FeatureCollection} Single Cluster filtered by GeoJSON Properties
 * @example
 * var geojson = turf.featureCollection([
 *     turf.point([0, 0], {'marker-symbol': 'circle'}),
 *     turf.point([2, 4], {'marker-symbol': 'star'}),
 *     turf.point([3, 6], {'marker-symbol': 'star'}),
 *     turf.point([5, 1], {'marker-symbol': 'square'}),
 *     turf.point([4, 2], {'marker-symbol': 'circle'})
 * ]);
 *
 * // Create a cluster using K-Means (adds `cluster` to GeoJSON properties)
 * var clustered = turf.clustersKmeans(geojson);
 *
 * // Retrieve first cluster (0)
 * var cluster = turf.getCluster(clustered, {cluster: 0});
 * //= cluster
 *
 * // Retrieve cluster based on custom properties
 * turf.getCluster(clustered, {'marker-symbol': 'circle'}).length;
 * //= 2
 * turf.getCluster(clustered, {'marker-symbol': 'square'}).length;
 * //= 1
 */
function getCluster(geojson, filter) {
    // Validation
    if (!geojson)
        throw new Error("geojson is required");
    if (geojson.type !== "FeatureCollection")
        throw new Error("geojson must be a FeatureCollection");
    if (filter === undefined || filter === null)
        throw new Error("filter is required");
    // Filter Features
    var features = [];
    meta_1.featureEach(geojson, function (feature) {
        if (applyFilter(feature.properties, filter))
            features.push(feature);
    });
    return helpers_1.featureCollection(features);
}
exports.getCluster = getCluster;
/**
 * Callback for clusterEach
 *
 * @callback clusterEachCallback
 * @param {FeatureCollection} [cluster] The current cluster being processed.
 * @param {*} [clusterValue] Value used to create cluster being processed.
 * @param {number} [currentIndex] The index of the current element being processed in the array.Starts at index 0
 * @returns {void}
 */
/**
 * clusterEach
 *
 * @name clusterEach
 * @param {FeatureCollection} geojson GeoJSON Features
 * @param {string|number} property GeoJSON property key/value used to create clusters
 * @param {Function} callback a method that takes (cluster, clusterValue, currentIndex)
 * @returns {void}
 * @example
 * var geojson = turf.featureCollection([
 *     turf.point([0, 0]),
 *     turf.point([2, 4]),
 *     turf.point([3, 6]),
 *     turf.point([5, 1]),
 *     turf.point([4, 2])
 * ]);
 *
 * // Create a cluster using K-Means (adds `cluster` to GeoJSON properties)
 * var clustered = turf.clustersKmeans(geojson);
 *
 * // Iterate over each cluster
 * turf.clusterEach(clustered, 'cluster', function (cluster, clusterValue, currentIndex) {
 *     //= cluster
 *     //= clusterValue
 *     //= currentIndex
 * })
 *
 * // Calculate the total number of clusters
 * var total = 0
 * turf.clusterEach(clustered, 'cluster', function () {
 *     total++;
 * });
 *
 * // Create an Array of all the values retrieved from the 'cluster' property
 * var values = []
 * turf.clusterEach(clustered, 'cluster', function (cluster, clusterValue) {
 *     values.push(clusterValue);
 * });
 */
function clusterEach(geojson, property, callback) {
    // Validation
    if (!geojson)
        throw new Error("geojson is required");
    if (geojson.type !== "FeatureCollection")
        throw new Error("geojson must be a FeatureCollection");
    if (property === undefined || property === null)
        throw new Error("property is required");
    // Create clusters based on property values
    var bins = createBins(geojson, property);
    var values = Object.keys(bins);
    for (var index = 0; index < values.length; index++) {
        var value = values[index];
        var bin = bins[value];
        var features = [];
        for (var i = 0; i < bin.length; i++) {
            features.push(geojson.features[bin[i]]);
        }
        callback(helpers_1.featureCollection(features), value, index);
    }
}
exports.clusterEach = clusterEach;
/**
 * Callback for clusterReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback clusterReduceCallback
 * @param {*} [previousValue] The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {FeatureCollection} [cluster] The current cluster being processed.
 * @param {*} [clusterValue] Value used to create cluster being processed.
 * @param {number} [currentIndex] The index of the current element being processed in the
 * array. Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 */
/**
 * Reduce clusters in GeoJSON Features, similar to Array.reduce()
 *
 * @name clusterReduce
 * @param {FeatureCollection} geojson GeoJSON Features
 * @param {string|number} property GeoJSON property key/value used to create clusters
 * @param {Function} callback a method that takes (previousValue, cluster, clusterValue, currentIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var geojson = turf.featureCollection([
 *     turf.point([0, 0]),
 *     turf.point([2, 4]),
 *     turf.point([3, 6]),
 *     turf.point([5, 1]),
 *     turf.point([4, 2])
 * ]);
 *
 * // Create a cluster using K-Means (adds `cluster` to GeoJSON properties)
 * var clustered = turf.clustersKmeans(geojson);
 *
 * // Iterate over each cluster and perform a calculation
 * var initialValue = 0
 * turf.clusterReduce(clustered, 'cluster', function (previousValue, cluster, clusterValue, currentIndex) {
 *     //=previousValue
 *     //=cluster
 *     //=clusterValue
 *     //=currentIndex
 *     return previousValue++;
 * }, initialValue);
 *
 * // Calculate the total number of clusters
 * var total = turf.clusterReduce(clustered, 'cluster', function (previousValue) {
 *     return previousValue++;
 * }, 0);
 *
 * // Create an Array of all the values retrieved from the 'cluster' property
 * var values = turf.clusterReduce(clustered, 'cluster', function (previousValue, cluster, clusterValue) {
 *     return previousValue.concat(clusterValue);
 * }, []);
 */
function clusterReduce(geojson, property, callback, initialValue) {
    var previousValue = initialValue;
    clusterEach(geojson, property, function (cluster, clusterValue, currentIndex) {
        if (currentIndex === 0 && initialValue === undefined)
            previousValue = cluster;
        else
            previousValue = callback(previousValue, cluster, clusterValue, currentIndex);
    });
    return previousValue;
}
exports.clusterReduce = clusterReduce;
/**
 * Create Bins
 *
 * @private
 * @param {FeatureCollection} geojson GeoJSON Features
 * @param {string|number} property Property values are used to create bins
 * @returns {Object} bins with Feature IDs
 * @example
 * var geojson = turf.featureCollection([
 *     turf.point([0, 0], {cluster: 0, foo: 'null'}),
 *     turf.point([2, 4], {cluster: 1, foo: 'bar'}),
 *     turf.point([5, 1], {0: 'foo'}),
 *     turf.point([3, 6], {cluster: 1}),
 * ]);
 * createBins(geojson, 'cluster');
 * //= { '0': [ 0 ], '1': [ 1, 3 ] }
 */
function createBins(geojson, property) {
    var bins = {};
    meta_1.featureEach(geojson, function (feature, i) {
        var properties = feature.properties || {};
        if (Object.prototype.hasOwnProperty.call(properties, String(property))) {
            var value = properties[property];
            if (Object.prototype.hasOwnProperty.call(bins, value))
                bins[value].push(i);
            else
                bins[value] = [i];
        }
    });
    return bins;
}
exports.createBins = createBins;
/**
 * Apply Filter
 *
 * @private
 * @param {*} properties Properties
 * @param {*} filter Filter
 * @returns {boolean} applied Filter to properties
 */
function applyFilter(properties, filter) {
    if (properties === undefined)
        return false;
    var filterType = typeof filter;
    // String & Number
    if (filterType === "number" || filterType === "string")
        return Object.prototype.hasOwnProperty.call(properties, filter);
    // Array
    else if (Array.isArray(filter)) {
        for (var i = 0; i < filter.length; i++) {
            if (!applyFilter(properties, filter[i]))
                return false;
        }
        return true;
        // Object
    }
    else {
        return propertiesContainsFilter(properties, filter);
    }
}
exports.applyFilter = applyFilter;
/**
 * Properties contains filter (does not apply deepEqual operations)
 *
 * @private
 * @param {*} properties Properties
 * @param {Object} filter Filter
 * @returns {boolean} does filter equal Properties
 * @example
 * propertiesContainsFilter({foo: 'bar', cluster: 0}, {cluster: 0})
 * //= true
 * propertiesContainsFilter({foo: 'bar', cluster: 0}, {cluster: 1})
 * //= false
 */
function propertiesContainsFilter(properties, filter) {
    var keys = Object.keys(filter);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (properties[key] !== filter[key])
            return false;
    }
    return true;
}
exports.propertiesContainsFilter = propertiesContainsFilter;
/**
 * Filter Properties
 *
 * @private
 * @param {*} properties Properties
 * @param {Array<string>} keys Used to filter Properties
 * @returns {*} filtered Properties
 * @example
 * filterProperties({foo: 'bar', cluster: 0}, ['cluster'])
 * //= {cluster: 0}
 */
function filterProperties(properties, keys) {
    if (!keys)
        return {};
    if (!keys.length)
        return {};
    var newProperties = {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (Object.prototype.hasOwnProperty.call(properties, key))
            newProperties[key] = properties[key];
    }
    return newProperties;
}
exports.filterProperties = filterProperties;


/***/ }),

/***/ "./node_modules/@turf/distance/dist/js/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@turf/distance/dist/js/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var invariant_1 = __webpack_require__(/*! @turf/invariant */ "./node_modules/@turf/invariant/dist/js/index.js");
var helpers_1 = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js");
//http://en.wikipedia.org/wiki/Haversine_formula
//http://www.movable-type.co.uk/scripts/latlong.html
/**
 * Calculates the distance between two {@link Point|points} in degrees, radians, miles, or kilometers.
 * This uses the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula) to account for global curvature.
 *
 * @name distance
 * @param {Coord | Point} from origin point or coordinate
 * @param {Coord | Point} to destination point or coordinate
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
 * @returns {number} distance between the two points
 * @example
 * var from = turf.point([-75.343, 39.984]);
 * var to = turf.point([-75.534, 39.123]);
 * var options = {units: 'miles'};
 *
 * var distance = turf.distance(from, to, options);
 *
 * //addToMap
 * var addToMap = [from, to];
 * from.properties.distance = distance;
 * to.properties.distance = distance;
 */
function distance(from, to, options) {
    if (options === void 0) { options = {}; }
    var coordinates1 = invariant_1.getCoord(from);
    var coordinates2 = invariant_1.getCoord(to);
    var dLat = helpers_1.degreesToRadians(coordinates2[1] - coordinates1[1]);
    var dLon = helpers_1.degreesToRadians(coordinates2[0] - coordinates1[0]);
    var lat1 = helpers_1.degreesToRadians(coordinates1[1]);
    var lat2 = helpers_1.degreesToRadians(coordinates2[1]);
    var a = Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    return helpers_1.radiansToLength(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), options.units);
}
exports["default"] = distance;


/***/ }),

/***/ "./node_modules/@turf/helpers/dist/js/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@turf/helpers/dist/js/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * @module helpers
 */
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 *
 * @memberof helpers
 * @type {number}
 */
exports.earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.factors = {
    centimeters: exports.earthRadius * 100,
    centimetres: exports.earthRadius * 100,
    degrees: exports.earthRadius / 111325,
    feet: exports.earthRadius * 3.28084,
    inches: exports.earthRadius * 39.37,
    kilometers: exports.earthRadius / 1000,
    kilometres: exports.earthRadius / 1000,
    meters: exports.earthRadius,
    metres: exports.earthRadius,
    miles: exports.earthRadius / 1609.344,
    millimeters: exports.earthRadius * 1000,
    millimetres: exports.earthRadius * 1000,
    nauticalmiles: exports.earthRadius / 1852,
    radians: 1,
    yards: exports.earthRadius * 1.0936,
};
/**
 * Units of measurement factors based on 1 meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.unitsFactors = {
    centimeters: 100,
    centimetres: 100,
    degrees: 1 / 111325,
    feet: 3.28084,
    inches: 39.37,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    meters: 1,
    metres: 1,
    miles: 1 / 1609.344,
    millimeters: 1000,
    millimetres: 1000,
    nauticalmiles: 1 / 1852,
    radians: 1 / exports.earthRadius,
    yards: 1.0936133,
};
/**
 * Area of measurement factors based on 1 square meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.areaFactors = {
    acres: 0.000247105,
    centimeters: 10000,
    centimetres: 10000,
    feet: 10.763910417,
    hectares: 0.0001,
    inches: 1550.003100006,
    kilometers: 0.000001,
    kilometres: 0.000001,
    meters: 1,
    metres: 1,
    miles: 3.86e-7,
    millimeters: 1000000,
    millimetres: 1000000,
    yards: 1.195990046,
};
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}
exports.feature = feature;
/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<any>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = "Point";
 * var coordinates = [110, 50];
 * var geometry = turf.geometry(type, coordinates);
 * // => geometry
 */
function geometry(type, coordinates, _options) {
    if (_options === void 0) { _options = {}; }
    switch (type) {
        case "Point":
            return point(coordinates).geometry;
        case "LineString":
            return lineString(coordinates).geometry;
        case "Polygon":
            return polygon(coordinates).geometry;
        case "MultiPoint":
            return multiPoint(coordinates).geometry;
        case "MultiLineString":
            return multiLineString(coordinates).geometry;
        case "MultiPolygon":
            return multiPolygon(coordinates).geometry;
        default:
            throw new Error(type + " is invalid");
    }
}
exports.geometry = geometry;
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (!coordinates) {
        throw new Error("coordinates is required");
    }
    if (!Array.isArray(coordinates)) {
        throw new Error("coordinates must be an Array");
    }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be at least 2 numbers long");
    }
    if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
        throw new Error("coordinates must contain numbers");
    }
    var geom = {
        type: "Point",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.point = point;
/**
 * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
 *
 * @name points
 * @param {Array<Array<number>>} coordinates an array of Points
 * @param {Object} [properties={}] Translate these properties to each Feature
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Point>} Point Feature
 * @example
 * var points = turf.points([
 *   [-75, 39],
 *   [-80, 45],
 *   [-78, 50]
 * ]);
 *
 * //=points
 */
function points(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return point(coords, properties);
    }), options);
}
exports.points = points;
/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
function polygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
        var ring = coordinates_1[_i];
        if (ring.length < 4) {
            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error("First and last Position are not equivalent.");
            }
        }
    }
    var geom = {
        type: "Polygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.polygon = polygon;
/**
 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
 *
 * @name polygons
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
 * @example
 * var polygons = turf.polygons([
 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
 * ]);
 *
 * //=polygons
 */
function polygons(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return polygon(coords, properties);
    }), options);
}
exports.polygons = polygons;
/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
    }
    var geom = {
        type: "LineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.lineString = lineString;
/**
 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
 *
 * @name lineStrings
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
 * @example
 * var linestrings = turf.lineStrings([
 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
 * ]);
 *
 * //=linestrings
 */
function lineStrings(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return lineString(coords, properties);
    }), options);
}
exports.lineStrings = lineStrings;
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    if (options === void 0) { options = {}; }
    var fc = { type: "FeatureCollection" };
    if (options.id) {
        fc.id = options.id;
    }
    if (options.bbox) {
        fc.bbox = options.bbox;
    }
    fc.features = features;
    return fc;
}
exports.featureCollection = featureCollection;
/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiLineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiLineString = multiLineString;
/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPoint",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPoint = multiPoint;
/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
function multiPolygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPolygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPolygon = multiPolygon;
/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = turf.geometry("Point", [100, 0]);
 * var line = turf.geometry("LineString", [[101, 0], [102, 1]]);
 * var collection = turf.geometryCollection([pt, line]);
 *
 * // => collection
 */
function geometryCollection(geometries, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "GeometryCollection",
        geometries: geometries,
    };
    return feature(geom, properties, options);
}
exports.geometryCollection = geometryCollection;
/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    if (precision && !(precision >= 0)) {
        throw new Error("precision must be a positive number");
    }
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}
exports.round = round;
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return radians * factor;
}
exports.radiansToLength = radiansToLength;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return distance / factor;
}
exports.lengthToRadians = lengthToRadians;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} degrees
 */
function lengthToDegrees(distance, units) {
    return radiansToDegrees(lengthToRadians(distance, units));
}
exports.lengthToDegrees = lengthToDegrees;
/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAzimuth
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
function bearingToAzimuth(bearing) {
    var angle = bearing % 360;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}
exports.bearingToAzimuth = bearingToAzimuth;
/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radiansToDegrees(radians) {
    var degrees = radians % (2 * Math.PI);
    return (degrees * 180) / Math.PI;
}
exports.radiansToDegrees = radiansToDegrees;
/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    var radians = degrees % 360;
    return (radians * Math.PI) / 180;
}
exports.degreesToRadians = degreesToRadians;
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Units} [originalUnit="kilometers"] of the length
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "kilometers"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(length >= 0)) {
        throw new Error("length must be a positive number");
    }
    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
exports.convertLength = convertLength;
/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches, hectares
 * @param {number} area to be converted
 * @param {Units} [originalUnit="meters"] of the distance
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted area
 */
function convertArea(area, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "meters"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(area >= 0)) {
        throw new Error("area must be a positive number");
    }
    var startFactor = exports.areaFactors[originalUnit];
    if (!startFactor) {
        throw new Error("invalid original units");
    }
    var finalFactor = exports.areaFactors[finalUnit];
    if (!finalFactor) {
        throw new Error("invalid final units");
    }
    return (area / startFactor) * finalFactor;
}
exports.convertArea = convertArea;
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num);
}
exports.isNumber = isNumber;
/**
 * isObject
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 * @example
 * turf.isObject({elevation: 10})
 * //=true
 * turf.isObject('foo')
 * //=false
 */
function isObject(input) {
    return !!input && input.constructor === Object;
}
exports.isObject = isObject;
/**
 * Validate BBox
 *
 * @private
 * @param {Array<number>} bbox BBox to validate
 * @returns {void}
 * @throws Error if BBox is not valid
 * @example
 * validateBBox([-180, -40, 110, 50])
 * //=OK
 * validateBBox([-180, -40])
 * //=Error
 * validateBBox('Foo')
 * //=Error
 * validateBBox(5)
 * //=Error
 * validateBBox(null)
 * //=Error
 * validateBBox(undefined)
 * //=Error
 */
function validateBBox(bbox) {
    if (!bbox) {
        throw new Error("bbox is required");
    }
    if (!Array.isArray(bbox)) {
        throw new Error("bbox must be an Array");
    }
    if (bbox.length !== 4 && bbox.length !== 6) {
        throw new Error("bbox must be an Array of 4 or 6 numbers");
    }
    bbox.forEach(function (num) {
        if (!isNumber(num)) {
            throw new Error("bbox must only contain numbers");
        }
    });
}
exports.validateBBox = validateBBox;
/**
 * Validate Id
 *
 * @private
 * @param {string|number} id Id to validate
 * @returns {void}
 * @throws Error if Id is not valid
 * @example
 * validateId([-180, -40, 110, 50])
 * //=Error
 * validateId([-180, -40])
 * //=Error
 * validateId('Foo')
 * //=OK
 * validateId(5)
 * //=OK
 * validateId(null)
 * //=Error
 * validateId(undefined)
 * //=Error
 */
function validateId(id) {
    if (!id) {
        throw new Error("id is required");
    }
    if (["string", "number"].indexOf(typeof id) === -1) {
        throw new Error("id must be a number or a string");
    }
}
exports.validateId = validateId;


/***/ }),

/***/ "./node_modules/@turf/invariant/dist/js/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@turf/invariant/dist/js/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var helpers_1 = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js");
/**
 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
 *
 * @name getCoord
 * @param {Array<number>|Geometry<Point>|Feature<Point>} coord GeoJSON Point or an Array of numbers
 * @returns {Array<number>} coordinates
 * @example
 * var pt = turf.point([10, 10]);
 *
 * var coord = turf.getCoord(pt);
 * //= [10, 10]
 */
function getCoord(coord) {
    if (!coord) {
        throw new Error("coord is required");
    }
    if (!Array.isArray(coord)) {
        if (coord.type === "Feature" &&
            coord.geometry !== null &&
            coord.geometry.type === "Point") {
            return coord.geometry.coordinates;
        }
        if (coord.type === "Point") {
            return coord.coordinates;
        }
    }
    if (Array.isArray(coord) &&
        coord.length >= 2 &&
        !Array.isArray(coord[0]) &&
        !Array.isArray(coord[1])) {
        return coord;
    }
    throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
exports.getCoord = getCoord;
/**
 * Unwrap coordinates from a Feature, Geometry Object or an Array
 *
 * @name getCoords
 * @param {Array<any>|Geometry|Feature} coords Feature, Geometry Object or an Array
 * @returns {Array<any>} coordinates
 * @example
 * var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
 *
 * var coords = turf.getCoords(poly);
 * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
 */
function getCoords(coords) {
    if (Array.isArray(coords)) {
        return coords;
    }
    // Feature
    if (coords.type === "Feature") {
        if (coords.geometry !== null) {
            return coords.geometry.coordinates;
        }
    }
    else {
        // Geometry
        if (coords.coordinates) {
            return coords.coordinates;
        }
    }
    throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}
exports.getCoords = getCoords;
/**
 * Checks if coordinates contains a number
 *
 * @name containsNumber
 * @param {Array<any>} coordinates GeoJSON Coordinates
 * @returns {boolean} true if Array contains a number
 */
function containsNumber(coordinates) {
    if (coordinates.length > 1 &&
        helpers_1.isNumber(coordinates[0]) &&
        helpers_1.isNumber(coordinates[1])) {
        return true;
    }
    if (Array.isArray(coordinates[0]) && coordinates[0].length) {
        return containsNumber(coordinates[0]);
    }
    throw new Error("coordinates must only contain numbers");
}
exports.containsNumber = containsNumber;
/**
 * Enforce expectations about types of GeoJSON objects for Turf.
 *
 * @name geojsonType
 * @param {GeoJSON} value any GeoJSON object
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function geojsonType(value, type, name) {
    if (!type || !name) {
        throw new Error("type and name required");
    }
    if (!value || value.type !== type) {
        throw new Error("Invalid input to " +
            name +
            ": must be a " +
            type +
            ", given " +
            value.type);
    }
}
exports.geojsonType = geojsonType;
/**
 * Enforce expectations about types of {@link Feature} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name featureOf
 * @param {Feature} feature a feature with an expected geometry type
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} error if value is not the expected type.
 */
function featureOf(feature, type, name) {
    if (!feature) {
        throw new Error("No feature passed");
    }
    if (!name) {
        throw new Error(".featureOf() requires a name");
    }
    if (!feature || feature.type !== "Feature" || !feature.geometry) {
        throw new Error("Invalid input to " + name + ", Feature with geometry required");
    }
    if (!feature.geometry || feature.geometry.type !== type) {
        throw new Error("Invalid input to " +
            name +
            ": must be a " +
            type +
            ", given " +
            feature.geometry.type);
    }
}
exports.featureOf = featureOf;
/**
 * Enforce expectations about types of {@link FeatureCollection} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name collectionOf
 * @param {FeatureCollection} featureCollection a FeatureCollection for which features will be judged
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function collectionOf(featureCollection, type, name) {
    if (!featureCollection) {
        throw new Error("No featureCollection passed");
    }
    if (!name) {
        throw new Error(".collectionOf() requires a name");
    }
    if (!featureCollection || featureCollection.type !== "FeatureCollection") {
        throw new Error("Invalid input to " + name + ", FeatureCollection required");
    }
    for (var _i = 0, _a = featureCollection.features; _i < _a.length; _i++) {
        var feature = _a[_i];
        if (!feature || feature.type !== "Feature" || !feature.geometry) {
            throw new Error("Invalid input to " + name + ", Feature with geometry required");
        }
        if (!feature.geometry || feature.geometry.type !== type) {
            throw new Error("Invalid input to " +
                name +
                ": must be a " +
                type +
                ", given " +
                feature.geometry.type);
        }
    }
}
exports.collectionOf = collectionOf;
/**
 * Get Geometry from Feature or Geometry Object
 *
 * @param {Feature|Geometry} geojson GeoJSON Feature or Geometry Object
 * @returns {Geometry|null} GeoJSON Geometry Object
 * @throws {Error} if geojson is not a Feature or Geometry Object
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getGeom(point)
 * //={"type": "Point", "coordinates": [110, 40]}
 */
function getGeom(geojson) {
    if (geojson.type === "Feature") {
        return geojson.geometry;
    }
    return geojson;
}
exports.getGeom = getGeom;
/**
 * Get GeoJSON object's type, Geometry type is prioritize.
 *
 * @param {GeoJSON} geojson GeoJSON object
 * @param {string} [name="geojson"] name of the variable to display in error message (unused)
 * @returns {string} GeoJSON type
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getType(point)
 * //="Point"
 */
function getType(geojson, _name) {
    if (geojson.type === "FeatureCollection") {
        return "FeatureCollection";
    }
    if (geojson.type === "GeometryCollection") {
        return "GeometryCollection";
    }
    if (geojson.type === "Feature" && geojson.geometry !== null) {
        return geojson.geometry.type;
    }
    return geojson.type;
}
exports.getType = getType;


/***/ }),

/***/ "./node_modules/@turf/meta/dist/js/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@turf/meta/dist/js/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var helpers = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js");

/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
  // Handles null Geometry -- Skips this GeoJSON
  if (geojson === null) return;
  var j,
    k,
    l,
    geometry,
    stopG,
    coords,
    geometryMaybeCollection,
    wrapShrink = 0,
    coordIndex = 0,
    isGeometryCollection,
    type = geojson.type,
    isFeatureCollection = type === "FeatureCollection",
    isFeature = type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[featureIndex].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[geomIndex]
        : geometryMaybeCollection;

      // Handles null Geometry -- Skips this geometry
      if (geometry === null) continue;
      coords = geometry.coordinates;
      var geomType = geometry.type;

      wrapShrink =
        excludeWrapCoord &&
        (geomType === "Polygon" || geomType === "MultiPolygon")
          ? 1
          : 0;

      switch (geomType) {
        case null:
          break;
        case "Point":
          if (
            callback(
              coords,
              coordIndex,
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false
          )
            return false;
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (
              callback(
                coords[j],
                coordIndex,
                featureIndex,
                multiFeatureIndex,
                geometryIndex
              ) === false
            )
              return false;
            coordIndex++;
            if (geomType === "MultiPoint") multiFeatureIndex++;
          }
          if (geomType === "LineString") multiFeatureIndex++;
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (
                callback(
                  coords[j][k],
                  coordIndex,
                  featureIndex,
                  multiFeatureIndex,
                  geometryIndex
                ) === false
              )
                return false;
              coordIndex++;
            }
            if (geomType === "MultiLineString") multiFeatureIndex++;
            if (geomType === "Polygon") geometryIndex++;
          }
          if (geomType === "Polygon") multiFeatureIndex++;
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            geometryIndex = 0;
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (
                  callback(
                    coords[j][k][l],
                    coordIndex,
                    featureIndex,
                    multiFeatureIndex,
                    geometryIndex
                  ) === false
                )
                  return false;
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case "GeometryCollection":
          for (j = 0; j < geometry.geometries.length; j++)
            if (
              coordEach(geometry.geometries[j], callback, excludeWrapCoord) ===
              false
            )
              return false;
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}

/**
 * Callback for coordReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback coordReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Reduce coordinates in any GeoJSON object, similar to Array.reduce()
 *
 * @name coordReduce
 * @param {FeatureCollection|Geometry|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentCoord, coordIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordReduce(features, function (previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentCoord;
 * });
 */
function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
  var previousValue = initialValue;
  coordEach(
    geojson,
    function (
      currentCoord,
      coordIndex,
      featureIndex,
      multiFeatureIndex,
      geometryIndex
    ) {
      if (coordIndex === 0 && initialValue === undefined)
        previousValue = currentCoord;
      else
        previousValue = callback(
          previousValue,
          currentCoord,
          coordIndex,
          featureIndex,
          multiFeatureIndex,
          geometryIndex
        );
    },
    excludeWrapCoord
  );
  return previousValue;
}

/**
 * Callback for propEach
 *
 * @callback propEachCallback
 * @param {Object} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over properties in any GeoJSON object, similar to Array.forEach()
 *
 * @name propEach
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentProperties, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propEach(features, function (currentProperties, featureIndex) {
 *   //=currentProperties
 *   //=featureIndex
 * });
 */
function propEach(geojson, callback) {
  var i;
  switch (geojson.type) {
    case "FeatureCollection":
      for (i = 0; i < geojson.features.length; i++) {
        if (callback(geojson.features[i].properties, i) === false) break;
      }
      break;
    case "Feature":
      callback(geojson.properties, 0);
      break;
  }
}

/**
 * Callback for propReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback propReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {*} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce properties in any GeoJSON object into a single value,
 * similar to how Array.reduce works. However, in this case we lazily run
 * the reduction, so an array of all properties is unnecessary.
 *
 * @name propReduce
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentProperties, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propReduce(features, function (previousValue, currentProperties, featureIndex) {
 *   //=previousValue
 *   //=currentProperties
 *   //=featureIndex
 *   return currentProperties
 * });
 */
function propReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  propEach(geojson, function (currentProperties, featureIndex) {
    if (featureIndex === 0 && initialValue === undefined)
      previousValue = currentProperties;
    else
      previousValue = callback(previousValue, currentProperties, featureIndex);
  });
  return previousValue;
}

/**
 * Callback for featureEach
 *
 * @callback featureEachCallback
 * @param {Feature<any>} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name featureEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.featureEach(features, function (currentFeature, featureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 * });
 */
function featureEach(geojson, callback) {
  if (geojson.type === "Feature") {
    callback(geojson, 0);
  } else if (geojson.type === "FeatureCollection") {
    for (var i = 0; i < geojson.features.length; i++) {
      if (callback(geojson.features[i], i) === false) break;
    }
  }
}

/**
 * Callback for featureReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback featureReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name featureReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.featureReduce(features, function (previousValue, currentFeature, featureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   return currentFeature
 * });
 */
function featureReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  featureEach(geojson, function (currentFeature, featureIndex) {
    if (featureIndex === 0 && initialValue === undefined)
      previousValue = currentFeature;
    else previousValue = callback(previousValue, currentFeature, featureIndex);
  });
  return previousValue;
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @name coordAll
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = turf.coordAll(features);
 * //= [[26, 37], [36, 53]]
 */
function coordAll(geojson) {
  var coords = [];
  coordEach(geojson, function (coord) {
    coords.push(coord);
  });
  return coords;
}

/**
 * Callback for geomEach
 *
 * @callback geomEachCallback
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
 *
 * @name geomEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 * });
 */
function geomEach(geojson, callback) {
  var i,
    j,
    g,
    geometry,
    stopG,
    geometryMaybeCollection,
    isGeometryCollection,
    featureProperties,
    featureBBox,
    featureId,
    featureIndex = 0,
    isFeatureCollection = geojson.type === "FeatureCollection",
    isFeature = geojson.type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[i].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    featureProperties = isFeatureCollection
      ? geojson.features[i].properties
      : isFeature
      ? geojson.properties
      : {};
    featureBBox = isFeatureCollection
      ? geojson.features[i].bbox
      : isFeature
      ? geojson.bbox
      : undefined;
    featureId = isFeatureCollection
      ? geojson.features[i].id
      : isFeature
      ? geojson.id
      : undefined;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (g = 0; g < stopG; g++) {
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[g]
        : geometryMaybeCollection;

      // Handle null Geometry
      if (geometry === null) {
        if (
          callback(
            null,
            featureIndex,
            featureProperties,
            featureBBox,
            featureId
          ) === false
        )
          return false;
        continue;
      }
      switch (geometry.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (
            callback(
              geometry,
              featureIndex,
              featureProperties,
              featureBBox,
              featureId
            ) === false
          )
            return false;
          break;
        }
        case "GeometryCollection": {
          for (j = 0; j < geometry.geometries.length; j++) {
            if (
              callback(
                geometry.geometries[j],
                featureIndex,
                featureProperties,
                featureBBox,
                featureId
              ) === false
            )
              return false;
          }
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    // Only increase `featureIndex` per each feature
    featureIndex++;
  }
}

/**
 * Callback for geomReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback geomReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Reduce geometry in any GeoJSON object, similar to Array.reduce().
 *
 * @name geomReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=previousValue
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 *   return currentGeometry
 * });
 */
function geomReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  geomEach(
    geojson,
    function (
      currentGeometry,
      featureIndex,
      featureProperties,
      featureBBox,
      featureId
    ) {
      if (featureIndex === 0 && initialValue === undefined)
        previousValue = currentGeometry;
      else
        previousValue = callback(
          previousValue,
          currentGeometry,
          featureIndex,
          featureProperties,
          featureBBox,
          featureId
        );
    }
  );
  return previousValue;
}

/**
 * Callback for flattenEach
 *
 * @callback flattenEachCallback
 * @param {Feature} currentFeature The current flattened feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Iterate over flattened features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name flattenEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex, multiFeatureIndex)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenEach(features, function (currentFeature, featureIndex, multiFeatureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 * });
 */
function flattenEach(geojson, callback) {
  geomEach(geojson, function (geometry, featureIndex, properties, bbox, id) {
    // Callback for single geometry
    var type = geometry === null ? null : geometry.type;
    switch (type) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        if (
          callback(
            helpers.feature(geometry, properties, { bbox: bbox, id: id }),
            featureIndex,
            0
          ) === false
        )
          return false;
        return;
    }

    var geomType;

    // Callback for multi-geometry
    switch (type) {
      case "MultiPoint":
        geomType = "Point";
        break;
      case "MultiLineString":
        geomType = "LineString";
        break;
      case "MultiPolygon":
        geomType = "Polygon";
        break;
    }

    for (
      var multiFeatureIndex = 0;
      multiFeatureIndex < geometry.coordinates.length;
      multiFeatureIndex++
    ) {
      var coordinate = geometry.coordinates[multiFeatureIndex];
      var geom = {
        type: geomType,
        coordinates: coordinate,
      };
      if (
        callback(helpers.feature(geom, properties), featureIndex, multiFeatureIndex) ===
        false
      )
        return false;
    }
  });
}

/**
 * Callback for flattenReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback flattenReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Reduce flattened features in any GeoJSON object, similar to Array.reduce().
 *
 * @name flattenReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex, multiFeatureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenReduce(features, function (previousValue, currentFeature, featureIndex, multiFeatureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   return currentFeature
 * });
 */
function flattenReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  flattenEach(
    geojson,
    function (currentFeature, featureIndex, multiFeatureIndex) {
      if (
        featureIndex === 0 &&
        multiFeatureIndex === 0 &&
        initialValue === undefined
      )
        previousValue = currentFeature;
      else
        previousValue = callback(
          previousValue,
          currentFeature,
          featureIndex,
          multiFeatureIndex
        );
    }
  );
  return previousValue;
}

/**
 * Callback for segmentEach
 *
 * @callback segmentEachCallback
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 * @returns {void}
 */

/**
 * Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex)
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentEach(polygon, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //=currentSegment
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   //=segmentIndex
 * });
 *
 * // Calculate the total number of segments
 * var total = 0;
 * turf.segmentEach(polygon, function () {
 *     total++;
 * });
 */
function segmentEach(geojson, callback) {
  flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
    var segmentIndex = 0;

    // Exclude null Geometries
    if (!feature.geometry) return;
    // (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
    var type = feature.geometry.type;
    if (type === "Point" || type === "MultiPoint") return;

    // Generate 2-vertex line segments
    var previousCoords;
    var previousFeatureIndex = 0;
    var previousMultiIndex = 0;
    var prevGeomIndex = 0;
    if (
      coordEach(
        feature,
        function (
          currentCoord,
          coordIndex,
          featureIndexCoord,
          multiPartIndexCoord,
          geometryIndex
        ) {
          // Simulating a meta.coordReduce() since `reduce` operations cannot be stopped by returning `false`
          if (
            previousCoords === undefined ||
            featureIndex > previousFeatureIndex ||
            multiPartIndexCoord > previousMultiIndex ||
            geometryIndex > prevGeomIndex
          ) {
            previousCoords = currentCoord;
            previousFeatureIndex = featureIndex;
            previousMultiIndex = multiPartIndexCoord;
            prevGeomIndex = geometryIndex;
            segmentIndex = 0;
            return;
          }
          var currentSegment = helpers.lineString(
            [previousCoords, currentCoord],
            feature.properties
          );
          if (
            callback(
              currentSegment,
              featureIndex,
              multiFeatureIndex,
              geometryIndex,
              segmentIndex
            ) === false
          )
            return false;
          segmentIndex++;
          previousCoords = currentCoord;
        }
      ) === false
    )
      return false;
  });
}

/**
 * Callback for segmentReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback segmentReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 */

/**
 * Reduce 2-vertex line segment in any GeoJSON object, similar to Array.reduce()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (previousValue, currentSegment, currentIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentReduce(polygon, function (previousSegment, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //= previousSegment
 *   //= currentSegment
 *   //= featureIndex
 *   //= multiFeatureIndex
 *   //= geometryIndex
 *   //= segmentIndex
 *   return currentSegment
 * });
 *
 * // Calculate the total number of segments
 * var initialValue = 0
 * var total = turf.segmentReduce(polygon, function (previousValue) {
 *     previousValue++;
 *     return previousValue;
 * }, initialValue);
 */
function segmentReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  var started = false;
  segmentEach(
    geojson,
    function (
      currentSegment,
      featureIndex,
      multiFeatureIndex,
      geometryIndex,
      segmentIndex
    ) {
      if (started === false && initialValue === undefined)
        previousValue = currentSegment;
      else
        previousValue = callback(
          previousValue,
          currentSegment,
          featureIndex,
          multiFeatureIndex,
          geometryIndex,
          segmentIndex
        );
      started = true;
    }
  );
  return previousValue;
}

/**
 * Callback for lineEach
 *
 * @callback lineEachCallback
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Iterate over line or ring coordinates in LineString, Polygon, MultiLineString, MultiPolygon Features or Geometries,
 * similar to Array.forEach.
 *
 * @name lineEach
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @example
 * var multiLine = turf.multiLineString([
 *   [[26, 37], [35, 45]],
 *   [[36, 53], [38, 50], [41, 55]]
 * ]);
 *
 * turf.lineEach(multiLine, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function lineEach(geojson, callback) {
  // validation
  if (!geojson) throw new Error("geojson is required");

  flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
    if (feature.geometry === null) return;
    var type = feature.geometry.type;
    var coords = feature.geometry.coordinates;
    switch (type) {
      case "LineString":
        if (callback(feature, featureIndex, multiFeatureIndex, 0, 0) === false)
          return false;
        break;
      case "Polygon":
        for (
          var geometryIndex = 0;
          geometryIndex < coords.length;
          geometryIndex++
        ) {
          if (
            callback(
              helpers.lineString(coords[geometryIndex], feature.properties),
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false
          )
            return false;
        }
        break;
    }
  });
}

/**
 * Callback for lineReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback lineReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed.
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name lineReduce
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var multiPoly = turf.multiPolygon([
 *   turf.polygon([[[12,48],[2,41],[24,38],[12,48]], [[9,44],[13,41],[13,45],[9,44]]]),
 *   turf.polygon([[[5, 5], [0, 0], [2, 2], [4, 4], [5, 5]]])
 * ]);
 *
 * turf.lineReduce(multiPoly, function (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentLine
 * });
 */
function lineReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  lineEach(
    geojson,
    function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
      if (featureIndex === 0 && initialValue === undefined)
        previousValue = currentLine;
      else
        previousValue = callback(
          previousValue,
          currentLine,
          featureIndex,
          multiFeatureIndex,
          geometryIndex
        );
    }
  );
  return previousValue;
}

/**
 * Finds a particular 2-vertex LineString Segment from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 * Point & MultiPoint will always return null.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.segmentIndex=0] Segment Index
 * @param {Object} [options.properties={}] Translate Properties to output LineString
 * @param {BBox} [options.bbox={}] Translate BBox to output LineString
 * @param {number|string} [options.id={}] Translate Id to output LineString
 * @returns {Feature<LineString>} 2-vertex GeoJSON Feature LineString
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findSegment(multiLine);
 * // => Feature<LineString<[[10, 10], [50, 30]]>>
 *
 * // First Segment of 2nd Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: 1});
 * // => Feature<LineString<[[-10, -10], [-50, -30]]>>
 *
 * // Last Segment of Last Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: -1, segmentIndex: -1});
 * // => Feature<LineString<[[-50, -30], [-30, -40]]>>
 */
function findSegment(geojson, options) {
  // Optional Parameters
  options = options || {};
  if (!helpers.isObject(options)) throw new Error("options is invalid");
  var featureIndex = options.featureIndex || 0;
  var multiFeatureIndex = options.multiFeatureIndex || 0;
  var geometryIndex = options.geometryIndex || 0;
  var segmentIndex = options.segmentIndex || 0;

  // Find FeatureIndex
  var properties = options.properties;
  var geometry;

  switch (geojson.type) {
    case "FeatureCollection":
      if (featureIndex < 0)
        featureIndex = geojson.features.length + featureIndex;
      properties = properties || geojson.features[featureIndex].properties;
      geometry = geojson.features[featureIndex].geometry;
      break;
    case "Feature":
      properties = properties || geojson.properties;
      geometry = geojson.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      geometry = geojson;
      break;
    default:
      throw new Error("geojson is invalid");
  }

  // Find SegmentIndex
  if (geometry === null) return null;
  var coords = geometry.coordinates;
  switch (geometry.type) {
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
      if (segmentIndex < 0) segmentIndex = coords.length + segmentIndex - 1;
      return helpers.lineString(
        [coords[segmentIndex], coords[segmentIndex + 1]],
        properties,
        options
      );
    case "Polygon":
      if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
      if (segmentIndex < 0)
        segmentIndex = coords[geometryIndex].length + segmentIndex - 1;
      return helpers.lineString(
        [
          coords[geometryIndex][segmentIndex],
          coords[geometryIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
    case "MultiLineString":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (segmentIndex < 0)
        segmentIndex = coords[multiFeatureIndex].length + segmentIndex - 1;
      return helpers.lineString(
        [
          coords[multiFeatureIndex][segmentIndex],
          coords[multiFeatureIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
    case "MultiPolygon":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (geometryIndex < 0)
        geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
      if (segmentIndex < 0)
        segmentIndex =
          coords[multiFeatureIndex][geometryIndex].length - segmentIndex - 1;
      return helpers.lineString(
        [
          coords[multiFeatureIndex][geometryIndex][segmentIndex],
          coords[multiFeatureIndex][geometryIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
  }
  throw new Error("geojson is invalid");
}

/**
 * Finds a particular Point from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.coordIndex=0] Coord Index
 * @param {Object} [options.properties={}] Translate Properties to output Point
 * @param {BBox} [options.bbox={}] Translate BBox to output Point
 * @param {number|string} [options.id={}] Translate Id to output Point
 * @returns {Feature<Point>} 2-vertex GeoJSON Feature Point
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findPoint(multiLine);
 * // => Feature<Point<[10, 10]>>
 *
 * // First Segment of the 2nd Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: 1});
 * // => Feature<Point<[-10, -10]>>
 *
 * // Last Segment of last Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: -1, coordIndex: -1});
 * // => Feature<Point<[-30, -40]>>
 */
function findPoint(geojson, options) {
  // Optional Parameters
  options = options || {};
  if (!helpers.isObject(options)) throw new Error("options is invalid");
  var featureIndex = options.featureIndex || 0;
  var multiFeatureIndex = options.multiFeatureIndex || 0;
  var geometryIndex = options.geometryIndex || 0;
  var coordIndex = options.coordIndex || 0;

  // Find FeatureIndex
  var properties = options.properties;
  var geometry;

  switch (geojson.type) {
    case "FeatureCollection":
      if (featureIndex < 0)
        featureIndex = geojson.features.length + featureIndex;
      properties = properties || geojson.features[featureIndex].properties;
      geometry = geojson.features[featureIndex].geometry;
      break;
    case "Feature":
      properties = properties || geojson.properties;
      geometry = geojson.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      geometry = geojson;
      break;
    default:
      throw new Error("geojson is invalid");
  }

  // Find Coord Index
  if (geometry === null) return null;
  var coords = geometry.coordinates;
  switch (geometry.type) {
    case "Point":
      return helpers.point(coords, properties, options);
    case "MultiPoint":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      return helpers.point(coords[multiFeatureIndex], properties, options);
    case "LineString":
      if (coordIndex < 0) coordIndex = coords.length + coordIndex;
      return helpers.point(coords[coordIndex], properties, options);
    case "Polygon":
      if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
      if (coordIndex < 0)
        coordIndex = coords[geometryIndex].length + coordIndex;
      return helpers.point(coords[geometryIndex][coordIndex], properties, options);
    case "MultiLineString":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (coordIndex < 0)
        coordIndex = coords[multiFeatureIndex].length + coordIndex;
      return helpers.point(coords[multiFeatureIndex][coordIndex], properties, options);
    case "MultiPolygon":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (geometryIndex < 0)
        geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
      if (coordIndex < 0)
        coordIndex =
          coords[multiFeatureIndex][geometryIndex].length - coordIndex;
      return helpers.point(
        coords[multiFeatureIndex][geometryIndex][coordIndex],
        properties,
        options
      );
  }
  throw new Error("geojson is invalid");
}

exports.coordAll = coordAll;
exports.coordEach = coordEach;
exports.coordReduce = coordReduce;
exports.featureEach = featureEach;
exports.featureReduce = featureReduce;
exports.findPoint = findPoint;
exports.findSegment = findSegment;
exports.flattenEach = flattenEach;
exports.flattenReduce = flattenReduce;
exports.geomEach = geomEach;
exports.geomReduce = geomReduce;
exports.lineEach = lineEach;
exports.lineReduce = lineReduce;
exports.propEach = propEach;
exports.propReduce = propReduce;
exports.segmentEach = segmentEach;
exports.segmentReduce = segmentReduce;


/***/ }),

/***/ "./node_modules/@turf/points-within-polygon/dist/js/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@turf/points-within-polygon/dist/js/index.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var pointInPolygon = __webpack_require__(/*! @turf/boolean-point-in-polygon */ "./node_modules/@turf/boolean-point-in-polygon/dist/js/index.js");
var helpers = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js");
var meta = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/js/index.js");

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var pointInPolygon__default = /*#__PURE__*/_interopDefaultLegacy(pointInPolygon);

/**
 * Finds {@link Points} or {@link MultiPoint} coordinate positions that fall within {@link (Multi)Polygon(s)}.
 *
 * @name pointsWithinPolygon
 * @param {Feature|FeatureCollection<Point|MultiPoint>} points Point(s) or MultiPoint(s) as input search
 * @param {FeatureCollection|Geometry|Feature<Polygon|MultiPolygon>} polygons (Multi)Polygon(s) to check if points are within
 * @returns {FeatureCollection<Point|MultiPoint>} Point(s) or MultiPoint(s) with positions that land within at least one polygon.  The geometry type will match what was passsed in
 * @example
 * var points = turf.points([
 *     [-46.6318, -23.5523],
 *     [-46.6246, -23.5325],
 *     [-46.6062, -23.5513],
 *     [-46.663, -23.554],
 *     [-46.643, -23.557]
 * ]);
 *
 * var searchWithin = turf.polygon([[
 *     [-46.653,-23.543],
 *     [-46.634,-23.5346],
 *     [-46.613,-23.543],
 *     [-46.614,-23.559],
 *     [-46.631,-23.567],
 *     [-46.653,-23.560],
 *     [-46.653,-23.543]
 * ]]);
 *
 * var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);
 *
 * //addToMap
 * var addToMap = [points, searchWithin, ptsWithin]
 * turf.featureEach(ptsWithin, function (currentFeature) {
 *   currentFeature.properties['marker-size'] = 'large';
 *   currentFeature.properties['marker-color'] = '#000';
 * });
 */
function pointsWithinPolygon(points, polygons) {
  var results = [];
  meta.featureEach(points, function (point) {
    var contained = false;
    if (point.geometry.type === "Point") {
      meta.geomEach(polygons, function (polygon) {
        if (pointInPolygon__default['default'](point, polygon)) contained = true;
      });
      if (contained) {
        results.push(point);
      }
    } else if (point.geometry.type === "MultiPoint") {
      var pointsWithin = [];
      meta.geomEach(polygons, function (polygon) {
        meta.coordEach(point, function (pointCoord) {
          if (pointInPolygon__default['default'](pointCoord, polygon)) {
            contained = true;
            pointsWithin.push(pointCoord);
          }
        });
      });
      if (contained) {
        results.push(helpers.multiPoint(pointsWithin));
      }
    } else {
      throw new Error("Input geometry must be a Point or MultiPoint");
    }
  });
  return helpers.featureCollection(results);
}

module.exports = pointsWithinPolygon;
module.exports["default"] = pointsWithinPolygon;


/***/ }),

/***/ "./node_modules/@turf/rhumb-bearing/dist/js/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@turf/rhumb-bearing/dist/js/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// https://en.wikipedia.org/wiki/Rhumb_line
var helpers_1 = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js");
var invariant_1 = __webpack_require__(/*! @turf/invariant */ "./node_modules/@turf/invariant/dist/js/index.js");
/**
 * Takes two {@link Point|points} and finds the bearing angle between them along a Rhumb line
 * i.e. the angle measured in degrees start the north line (0 degrees)
 *
 * @name rhumbBearing
 * @param {Coord} start starting Point
 * @param {Coord} end ending Point
 * @param {Object} [options] Optional parameters
 * @param {boolean} [options.final=false] calculates the final bearing if true
 * @returns {number} bearing from north in decimal degrees, between -180 and 180 degrees (positive clockwise)
 * @example
 * var point1 = turf.point([-75.343, 39.984], {"marker-color": "#F00"});
 * var point2 = turf.point([-75.534, 39.123], {"marker-color": "#00F"});
 *
 * var bearing = turf.rhumbBearing(point1, point2);
 *
 * //addToMap
 * var addToMap = [point1, point2];
 * point1.properties.bearing = bearing;
 * point2.properties.bearing = bearing;
 */
function rhumbBearing(start, end, options) {
    if (options === void 0) { options = {}; }
    var bear360;
    if (options.final) {
        bear360 = calculateRhumbBearing(invariant_1.getCoord(end), invariant_1.getCoord(start));
    }
    else {
        bear360 = calculateRhumbBearing(invariant_1.getCoord(start), invariant_1.getCoord(end));
    }
    var bear180 = bear360 > 180 ? -(360 - bear360) : bear360;
    return bear180;
}
/**
 * Returns the bearing from ‘this’ point to destination point along a rhumb line.
 * Adapted from Geodesy: https://github.com/chrisveness/geodesy/blob/master/latlon-spherical.js
 *
 * @private
 * @param   {Array<number>} from - origin point.
 * @param   {Array<number>} to - destination point.
 * @returns {number} Bearing in degrees from north.
 * @example
 * var p1 = new LatLon(51.127, 1.338);
 * var p2 = new LatLon(50.964, 1.853);
 * var d = p1.rhumbBearingTo(p2); // 116.7 m
 */
function calculateRhumbBearing(from, to) {
    // φ => phi
    // Δλ => deltaLambda
    // Δψ => deltaPsi
    // θ => theta
    var phi1 = helpers_1.degreesToRadians(from[1]);
    var phi2 = helpers_1.degreesToRadians(to[1]);
    var deltaLambda = helpers_1.degreesToRadians(to[0] - from[0]);
    // if deltaLambdaon over 180° take shorter rhumb line across the anti-meridian:
    if (deltaLambda > Math.PI) {
        deltaLambda -= 2 * Math.PI;
    }
    if (deltaLambda < -Math.PI) {
        deltaLambda += 2 * Math.PI;
    }
    var deltaPsi = Math.log(Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4));
    var theta = Math.atan2(deltaLambda, deltaPsi);
    return (helpers_1.radiansToDegrees(theta) + 360) % 360;
}
exports["default"] = rhumbBearing;


/***/ }),

/***/ "./node_modules/@turf/rhumb-destination/dist/js/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@turf/rhumb-destination/dist/js/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// https://en.wikipedia.org/wiki/Rhumb_line
var helpers_1 = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js");
var invariant_1 = __webpack_require__(/*! @turf/invariant */ "./node_modules/@turf/invariant/dist/js/index.js");
/**
 * Returns the destination {@link Point} having travelled the given distance along a Rhumb line from the
 * origin Point with the (varant) given bearing.
 *
 * @name rhumbDestination
 * @param {Coord} origin starting point
 * @param {number} distance distance from the starting point
 * @param {number} bearing varant bearing angle ranging from -180 to 180 degrees from north
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
 * @param {Object} [options.properties={}] translate properties to destination point
 * @returns {Feature<Point>} Destination point.
 * @example
 * var pt = turf.point([-75.343, 39.984], {"marker-color": "F00"});
 * var distance = 50;
 * var bearing = 90;
 * var options = {units: 'miles'};
 *
 * var destination = turf.rhumbDestination(pt, distance, bearing, options);
 *
 * //addToMap
 * var addToMap = [pt, destination]
 * destination.properties['marker-color'] = '#00F';
 */
function rhumbDestination(origin, distance, bearing, options) {
    if (options === void 0) { options = {}; }
    var wasNegativeDistance = distance < 0;
    var distanceInMeters = helpers_1.convertLength(Math.abs(distance), options.units, "meters");
    if (wasNegativeDistance)
        distanceInMeters = -Math.abs(distanceInMeters);
    var coords = invariant_1.getCoord(origin);
    var destination = calculateRhumbDestination(coords, distanceInMeters, bearing);
    // compensate the crossing of the 180th meridian (https://macwright.org/2016/09/26/the-180th-meridian.html)
    // solution from https://github.com/mapbox/mapbox-gl-js/issues/3250#issuecomment-294887678
    destination[0] +=
        destination[0] - coords[0] > 180
            ? -360
            : coords[0] - destination[0] > 180
                ? 360
                : 0;
    return helpers_1.point(destination, options.properties);
}
/**
 * Returns the destination point having travelled along a rhumb line from origin point the given
 * distance on the  given bearing.
 * Adapted from Geodesy: http://www.movable-type.co.uk/scripts/latlong.html#rhumblines
 *
 * @private
 * @param   {Array<number>} origin - point
 * @param   {number} distance - Distance travelled, in same units as earth radius (default: metres).
 * @param   {number} bearing - Bearing in degrees from north.
 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
 * @returns {Array<number>} Destination point.
 */
function calculateRhumbDestination(origin, distance, bearing, radius) {
    // φ => phi
    // λ => lambda
    // ψ => psi
    // Δ => Delta
    // δ => delta
    // θ => theta
    radius = radius === undefined ? helpers_1.earthRadius : Number(radius);
    var delta = distance / radius; // angular distance in radians
    var lambda1 = (origin[0] * Math.PI) / 180; // to radians, but without normalize to 𝜋
    var phi1 = helpers_1.degreesToRadians(origin[1]);
    var theta = helpers_1.degreesToRadians(bearing);
    var DeltaPhi = delta * Math.cos(theta);
    var phi2 = phi1 + DeltaPhi;
    // check for some daft bugger going past the pole, normalise latitude if so
    if (Math.abs(phi2) > Math.PI / 2) {
        phi2 = phi2 > 0 ? Math.PI - phi2 : -Math.PI - phi2;
    }
    var DeltaPsi = Math.log(Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4));
    // E-W course becomes ill-conditioned with 0/0
    var q = Math.abs(DeltaPsi) > 10e-12 ? DeltaPhi / DeltaPsi : Math.cos(phi1);
    var DeltaLambda = (delta * Math.sin(theta)) / q;
    var lambda2 = lambda1 + DeltaLambda;
    return [
        (((lambda2 * 180) / Math.PI + 540) % 360) - 180,
        (phi2 * 180) / Math.PI,
    ]; // normalise to −180..+180°
}
exports["default"] = rhumbDestination;


/***/ }),

/***/ "./node_modules/@turf/rhumb-distance/dist/js/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@turf/rhumb-distance/dist/js/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// https://en.wikipedia.org/wiki/Rhumb_line
var helpers_1 = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js");
var invariant_1 = __webpack_require__(/*! @turf/invariant */ "./node_modules/@turf/invariant/dist/js/index.js");
/**
 * Calculates the distance along a rhumb line between two {@link Point|points} in degrees, radians,
 * miles, or kilometers.
 *
 * @name rhumbDistance
 * @param {Coord} from origin point
 * @param {Coord} to destination point
 * @param {Object} [options] Optional parameters
 * @param {string} [options.units="kilometers"] can be degrees, radians, miles, or kilometers
 * @returns {number} distance between the two points
 * @example
 * var from = turf.point([-75.343, 39.984]);
 * var to = turf.point([-75.534, 39.123]);
 * var options = {units: 'miles'};
 *
 * var distance = turf.rhumbDistance(from, to, options);
 *
 * //addToMap
 * var addToMap = [from, to];
 * from.properties.distance = distance;
 * to.properties.distance = distance;
 */
function rhumbDistance(from, to, options) {
    if (options === void 0) { options = {}; }
    var origin = invariant_1.getCoord(from);
    var destination = invariant_1.getCoord(to);
    // compensate the crossing of the 180th meridian (https://macwright.org/2016/09/26/the-180th-meridian.html)
    // solution from https://github.com/mapbox/mapbox-gl-js/issues/3250#issuecomment-294887678
    destination[0] +=
        destination[0] - origin[0] > 180
            ? -360
            : origin[0] - destination[0] > 180
                ? 360
                : 0;
    var distanceInMeters = calculateRhumbDistance(origin, destination);
    var distance = helpers_1.convertLength(distanceInMeters, "meters", options.units);
    return distance;
}
/**
 * Returns the distance travelling from ‘this’ point to destination point along a rhumb line.
 * Adapted from Geodesy: https://github.com/chrisveness/geodesy/blob/master/latlon-spherical.js
 *
 * @private
 * @param   {Array<number>} origin point.
 * @param   {Array<number>} destination point.
 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
 * @returns {number} Distance in km between this point and destination point (same units as radius).
 *
 * @example
 *     var p1 = new LatLon(51.127, 1.338);
 *     var p2 = new LatLon(50.964, 1.853);
 *     var d = p1.distanceTo(p2); // 40.31 km
 */
function calculateRhumbDistance(origin, destination, radius) {
    // φ => phi
    // λ => lambda
    // ψ => psi
    // Δ => Delta
    // δ => delta
    // θ => theta
    radius = radius === undefined ? helpers_1.earthRadius : Number(radius);
    // see www.edwilliams.org/avform.htm#Rhumb
    var R = radius;
    var phi1 = (origin[1] * Math.PI) / 180;
    var phi2 = (destination[1] * Math.PI) / 180;
    var DeltaPhi = phi2 - phi1;
    var DeltaLambda = (Math.abs(destination[0] - origin[0]) * Math.PI) / 180;
    // if dLon over 180° take shorter rhumb line across the anti-meridian:
    if (DeltaLambda > Math.PI) {
        DeltaLambda -= 2 * Math.PI;
    }
    // on Mercator projection, longitude distances shrink by latitude; q is the 'stretch factor'
    // q becomes ill-conditioned along E-W line (0/0); use empirical tolerance to avoid it
    var DeltaPsi = Math.log(Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4));
    var q = Math.abs(DeltaPsi) > 10e-12 ? DeltaPhi / DeltaPsi : Math.cos(phi1);
    // distance is pythagoras on 'stretched' Mercator projection
    var delta = Math.sqrt(DeltaPhi * DeltaPhi + q * q * DeltaLambda * DeltaLambda); // angular distance in radians
    var dist = delta * R;
    return dist;
}
exports["default"] = rhumbDistance;


/***/ }),

/***/ "./node_modules/@turf/truncate/dist/js/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@turf/truncate/dist/js/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var meta_1 = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/js/index.js");
/**
 * Takes a GeoJSON Feature or FeatureCollection and truncates the precision of the geometry.
 *
 * @name truncate
 * @param {GeoJSON} geojson any GeoJSON Feature, FeatureCollection, Geometry or GeometryCollection.
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.precision=6] coordinate decimal precision
 * @param {number} [options.coordinates=3] maximum number of coordinates (primarly used to remove z coordinates)
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {GeoJSON} layer with truncated geometry
 * @example
 * var point = turf.point([
 *     70.46923055566859,
 *     58.11088890802906,
 *     1508
 * ]);
 * var options = {precision: 3, coordinates: 2};
 * var truncated = turf.truncate(point, options);
 * //=truncated.geometry.coordinates => [70.469, 58.111]
 *
 * //addToMap
 * var addToMap = [truncated];
 */
function truncate(geojson, options) {
    if (options === void 0) { options = {}; }
    // Optional parameters
    var precision = options.precision;
    var coordinates = options.coordinates;
    var mutate = options.mutate;
    // default params
    precision =
        precision === undefined || precision === null || isNaN(precision)
            ? 6
            : precision;
    coordinates =
        coordinates === undefined || coordinates === null || isNaN(coordinates)
            ? 3
            : coordinates;
    // validation
    if (!geojson)
        throw new Error("<geojson> is required");
    if (typeof precision !== "number")
        throw new Error("<precision> must be a number");
    if (typeof coordinates !== "number")
        throw new Error("<coordinates> must be a number");
    // prevent input mutation
    if (mutate === false || mutate === undefined)
        geojson = JSON.parse(JSON.stringify(geojson));
    var factor = Math.pow(10, precision);
    // Truncate Coordinates
    meta_1.coordEach(geojson, function (coords) {
        truncateCoords(coords, factor, coordinates);
    });
    return geojson;
}
/**
 * Truncate Coordinates - Mutates coordinates in place
 *
 * @private
 * @param {Array<any>} coords Geometry Coordinates
 * @param {number} factor rounding factor for coordinate decimal precision
 * @param {number} coordinates maximum number of coordinates (primarly used to remove z coordinates)
 * @returns {Array<any>} mutated coordinates
 */
function truncateCoords(coords, factor, coordinates) {
    // Remove extra coordinates (usually elevation coordinates and more)
    if (coords.length > coordinates)
        coords.splice(coordinates, coords.length);
    // Truncate coordinate decimals
    for (var i = 0; i < coords.length; i++) {
        coords[i] = Math.round(coords[i] * factor) / factor;
    }
    return coords;
}
exports["default"] = truncate;


/***/ }),

/***/ "./node_modules/axios-retry/index.js":
/*!*******************************************!*\
  !*** ./node_modules/axios-retry/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const axiosRetry = (__webpack_require__(/*! ./lib/cjs/index */ "./node_modules/axios-retry/lib/cjs/index.js")["default"]);

module.exports = axiosRetry;
module.exports["default"] = axiosRetry;


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ./core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var pkg = __webpack_require__(/*! ./../../package.json */ "./node_modules/axios/package.json");

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

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
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/05-vibemap-embed-events/block.json");
/* harmony import */ var _components_Embed__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Embed */ "./src/components/Embed/index.js");
/* harmony import */ var _components_Filters__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Filters */ "./src/components/Filters/index.js");
/* harmony import */ var _components_Filters_useFilterState_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Filters/useFilterState.js */ "./src/components/Filters/useFilterState.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/05-vibemap-embed-events/editor.scss");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./style.css */ "./src/blocks/05-vibemap-embed-events/style.css");


// WordPress dependencies



const {
  InspectorControls
} = wp.blockEditor;

// Internal dependencies


// Components


// Hook for Filters state



const previewHeight = 420;
const outputHeight = 1000;

// Editable UI and block attributes
const Edit = props => {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
  const {
    attributes
  } = props;
  const {
    cities,
    categories,
    vibes
  } = attributes;

  // Filters state, set by block attributes
  const filterState = (0,_components_Filters_useFilterState_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
    cities,
    categories,
    vibes
  });
  const {
    selectedCities,
    selectedCategories,
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

  // TODO: add date range filter

  const blockStyle = {
    padding: '20px',
    transform: 'scale(0.8)'
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(InspectorControls, {
    key: "inspector"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Filters__WEBPACK_IMPORTED_MODULE_6__["default"], filterState)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, blockProps, {
    style: blockStyle
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Filters__WEBPACK_IMPORTED_MODULE_6__["default"], filterState), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, "Select the list and map options in the block panel on the right."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Embed__WEBPACK_IMPORTED_MODULE_5__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    path: "events",
    height: previewHeight,
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
  console.log('DEBUG: test got attributes ', attributes, ' in save');
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Embed__WEBPACK_IMPORTED_MODULE_5__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    path: "events",
    height: outputHeight,
    cities: cities,
    categories: categories,
    vibes: vibes
  }));
};

// Destructure the json file to get the name and settings for the block
const {
  name,
  example
} = _block_json__WEBPACK_IMPORTED_MODULE_4__;

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
    activities: categories,
    // TODO: rename to categories
    cities: city,
    vibes: vibes
  });
  const src = `${domain}/${path}/?${searchParams}`;
  console.log('DEBUG: Embed src ', src, ' in Embed');
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
/* harmony import */ var vibemap_constants_dist_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vibemap-constants/dist/helpers */ "./node_modules/vibemap-constants/dist/helpers.js");
/* harmony import */ var vibemap_constants_dist_vibes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vibemap-constants/dist/vibes.js */ "./node_modules/vibemap-constants/dist/vibes.js");






const categories1 = (0,vibemap_constants_dist_vibes_js__WEBPACK_IMPORTED_MODULE_5__.getCategoriesByLevel)(1);
const categories2 = (0,vibemap_constants_dist_vibes_js__WEBPACK_IMPORTED_MODULE_5__.getCategoriesByLevel)(2);
const categories_all = categories1.concat(categories2);
const category_slugs = vibemap_constants_dist_activityCategories_json__WEBPACK_IMPORTED_MODULE_2__.activityCategories.map(cat => cat.slug);
const city_slugs = vibemap_constants_dist_cities_json__WEBPACK_IMPORTED_MODULE_3__.map(city => city.slug);
const vibes_slugs = (0,vibemap_constants_dist_vibes_js__WEBPACK_IMPORTED_MODULE_5__.getVibes)();

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

/***/ "./node_modules/dayjs-recur/index.min.js":
/*!***********************************************!*\
  !*** ./node_modules/dayjs-recur/index.min.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__(/*! dayjs/plugin/utc */ "./node_modules/dayjs/plugin/utc.js"),__webpack_require__(/*! dayjs/plugin/weekOfYear */ "./node_modules/dayjs/plugin/weekOfYear.js")):0}(this,(function(t,e){"use strict";t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t,e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e;return(r,n,s)=>{s.extend(t),s.extend(e);var a={create:function(t,e){for(var r in t)if(t.hasOwnProperty(r)&&parseInt(r,10)<=0)throw Error("Intervals must be greater than zero");return{measure:e.toLowerCase(),units:t}},match:function(t,e,r,n){var s=null;for(var a in s=n.isBefore(r)?r.diff(n,t,!0):n.diff(r,t,!0),"days"==t&&(s=parseInt(s)),e)if(e.hasOwnProperty(a)&&s%(a=parseInt(a,10))==0)return!0;return!1}},i=function(){const t={daysOfMonth:"date",daysOfWeek:"day",weeksOfMonth:"monthWeek",weeksOfMonthByDay:"monthWeekByDay",weeksOfYear:"week",monthsOfYear:"month"},e={daysOfMonth:{low:1,high:31},daysOfWeek:{low:0,high:6},weeksOfMonth:{low:0,high:4},weeksOfMonthByDay:{low:0,high:4},weeksOfYear:{low:0,high:52},monthsOfYear:{low:0,high:11}},r={Sunday:0,Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6};function n(t,e){var n,a,i={};for(n in t)t.hasOwnProperty(n)&&(a=parseInt(n,10),isNaN(a)&&(a=n),i["days"===e&&isNaN(a)?s().set("day",r[a]).get("day"):s().set(e,a).get(e)]=t[n]);return i}return{create:function(t,r){var s=[];for(var a in"daysOfWeek"===r&&(t=n(t,"days")),"monthsOfYear"===r&&(t=n(t,"months")),t)hasOwnProperty.call(t,a)&&s.push(a);return function(t,e,r){r.forEach((function(r){if(r<t||r>e)throw Error("Value should be in range "+t+" to "+e)}))}(e[r].low,e[r].high,s),{measure:r,units:t}},match:function(e,r,n){var s=t[e],a=n[s]();if(r[a])return!0;if("date"===s&&a==n.add(1,"months").date(0).format("D")&&a<31)for(;a<=31;){if(r[a])return!0;a++}return!1}}}(),o=function(){var t={days:"interval",weeks:"interval",months:"interval",years:"interval",daysOfWeek:"calendar",daysOfMonth:"calendar",weeksOfMonth:"calendar",weeksOfMonthByDay:"calendar",weeksOfYear:"calendar",monthsOfYear:"calendar"},e={days:"day",weeks:"week",months:"month",years:"year",daysOfWeek:"dayOfWeek",daysOfMonth:"dayOfMonth",weeksOfMonth:"weekOfMonth",weeksOfMonthByDay:"weekOfMonthByDay",weeksOfYear:"weekOfYear",monthsOfYear:"monthOfYear"};function r(){var e,r=t[this.measure];if(!(this instanceof u))throw Error("Private method trigger() was called directly or not called as instance of Recur!");if(void 0===this.units||null===this.units||!this.measure)return this;if("calendar"!==r&&"interval"!==r)throw Error("Invalid measure provided: "+this.measure);if("interval"===r){if(!this.start)throw Error("Must have a start date set to set an interval!");e=a.create(this.units,this.measure)}if("calendar"===r&&(e=i.create(this.units,this.measure)),this.units=null,this.measure=null,"weeksOfMonthByDay"===e.measure&&!this.hasRule("daysOfWeek"))throw Error("weeksOfMonthByDay must be combined with daysOfWeek");for(var n=0;n<this.rules.length;n++)this.rules[n].measure===e.measure&&this.rules.splice(n,1);return this.rules.push(e),this}function n(t,e,r){var n,s,a=[];if(!(this instanceof u))throw Error("Private method trigger() was called directly or not called as instance of Recur!");if(!this.start&&!this.from)throw Error("Cannot get occurrences without start or from date.");if("all"===r&&!this.end)throw Error("Cannot get all occurrences without an end date.");if(this.end&&this.start>this.end)throw Error("Start date cannot be later than end date.");if("all"!==r&&!(t>0))return a;for(n=(this.from||this.start).clone(),"all"===r&&this.matches(n,!1)&&(s=e?n.format(e):n.clone(),a.push(s));a.length<(null===t?a.length+1:t)&&(n="next"===r||"all"===r?n.add(1,"day"):n.subtract(1,"day"),this.matches(n,"all"!==r)&&(s=e?n.format(e):n.clone(),a.push(s)),!(n>=this.end)););return a}function o(t){switch(t){case"day":return"days";case"week":return"weeks";case"month":return"months";case"year":return"years";case"dayOfWeek":return"daysOfWeek";case"dayOfMonth":return"daysOfMonth";case"weekOfMonth":return"weeksOfMonth";case"weekOfMonthByDay":return"weeksOfMonthByDay";case"weekOfYear":return"weeksOfYear";case"monthOfYear":return"monthsOfYear";default:return t}}function h(t){return function(e){return this.every.call(this,e,t),this}}var u=function(t){t.start&&(this.start=s(t.start).dateOnly()),t.end&&(this.end=s(t.end).dateOnly()),this.rules=t.rules||[];var e=t.exceptions||[];this.exceptions=[];for(var r=0;r<e.length;r++)this.except(e[r]);return this.units=null,this.measure=null,this.from=null,this};for(var f in u.prototype.startDate=function(t){return null===t?(this.start=null,this):t?(this.start=s(t).dateOnly(),this):this.start},u.prototype.endDate=function(t){return null===t?(this.end=null,this):t?(this.end=s(t).dateOnly(),this):this.end},u.prototype.fromDate=function(t){return null===t?(this.from=null,this):t?(this.from=s(t).dateOnly(),this):this.from},u.prototype.save=function(){var t={};this.start&&s(this.start).isValid()&&(t.start=this.start.format("YYYY-MM-DD")),this.end&&s(this.end).isValid()&&(t.end=this.end.format("YYYY-MM-DD")),t.exceptions=[];for(var e=0,r=this.exceptions.length;e<r;e++)t.exceptions.push(this.exceptions[e].format("YYYY-MM-DD"));return t.rules=this.rules,t},u.prototype.repeats=function(){return this.rules.length>0},u.prototype.every=function(t,e){return null!=t&&(this.units=function(t){var e={};if("[object Array]"==Object.prototype.toString.call(t))t.forEach((function(t){e[t]=!0}));else if(t===Object(t))e=t;else{if("[object Number]"!=Object.prototype.toString.call(t)&&"[object String]"!=Object.prototype.toString.call(t))throw Error("Provide an array, object, string or number when passing units!");e[t]=!0}return e}(t)),null!=e&&(this.measure=o(e)),r.call(this)},u.prototype.except=function(t){return t=s(t).dateOnly(),this.exceptions.push(t),this},u.prototype.forget=function(t){var e,r,n=s(t);if(n.isValid()){for(n=n.dateOnly(),e=0,r=this.exceptions.length;e<r;e++)if(n.isSame(this.exceptions[e]))return this.exceptions.splice(e,1),this;return this}for(e=0,r=this.rules.length;e<r;e++)this.rules[e].measure===o(t)&&this.rules.splice(e,1)},u.prototype.hasRule=function(t){var e,r;for(e=0,r=this.rules.length;e<r;e++)if(this.rules[e].measure===o(t))return!0;return!1},u.prototype.matches=function(e,r){var n=s(e).dateOnly();if(!n.isValid())throw Error("Invalid date supplied to match method: "+e);return!(!r&&!function(t,e,r){return(!t||!r.isBefore(t))&&(!e||!r.isAfter(e))}(this.start,this.end,n))&&(!function(t,e){for(var r=0,n=t.length;r<n;r++)if(s(t[r]).isSame(e))return!0;return!1}(this.exceptions,n)&&!!function(e,r,n){var s,o,h,u;for(s=0,o=e.length;s<o;s++)if(h=e[s],"interval"===(u=t[h.measure])){if(!a.match(h.measure,h.units,n,r))return!1}else{if("calendar"!==u)return!1;if(!i.match(h.measure,h.units,r))return!1}return!0}(this.rules,n,this.start))},u.prototype.next=function(t,e){return n.call(this,t,e,"next")},u.prototype.previous=function(t,e){return n.call(this,t,e,"previous")},u.prototype.all=function(t){return n.call(this,null,t,"all")},e)t.hasOwnProperty(f)&&(u.prototype[f]=u.prototype[e[f]]=h(f));return u}();s.recur=function(t,e){return t!==Object(t)||s.isDayjs(t)?new o({start:t,end:e}):new o(t)},n.prototype.recur=function(t,e){return t!==Object(t)||s.isDayjs(t)?(e||(e=t,t=void 0),t||(t=this),new o({start:t,end:e,moment:this})):(void 0===t.start&&(t.start=this),new o(t))},n.prototype.monthWeek=function(){var t=this.clone().startOf("month").startOf("week");return this.clone().startOf("week").diff(t,"weeks")},n.prototype.monthWeekByDay=function(){return Math.floor((this.date()-1)/7)},n.prototype.dateOnly=function(){return this.startOf("day").add(this.utcOffset(),"minute").utc()}}}));

/***/ }),

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p=function(t){return t instanceof b},S=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new b(n)},O=v;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var b=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,f=O.p(t),l=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=O.p(f),y=function(t){var e=w(l);return O.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return O.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return O.s(e.$y,4,"0");case"M":return a+1;case"MM":return O.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return O.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return O.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return O.s(u,2,"0");case"s":return String(e.$s);case"ss":return O.s(e.$s,2,"0");case"SSS":return O.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=O.p(d),m=w(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return O.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g}return l?$:O.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),_=b.prototype;return w.prototype=_,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){_[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,b,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[g],w.Ls=D,w.p={},w}));

/***/ }),

/***/ "./node_modules/dayjs/plugin/isBetween.js":
/*!************************************************!*\
  !*** ./node_modules/dayjs/plugin/isBetween.js ***!
  \************************************************/
/***/ (function(module) {

!function(e,i){ true?module.exports=i():0}(this,(function(){"use strict";return function(e,i,t){i.prototype.isBetween=function(e,i,s,f){var n=t(e),o=t(i),r="("===(f=f||"()")[0],u=")"===f[1];return(r?this.isAfter(n,s):!this.isBefore(n,s))&&(u?this.isBefore(o,s):!this.isAfter(o,s))||(r?this.isBefore(n,s):!this.isAfter(n,s))&&(u?this.isAfter(o,s):!this.isBefore(o,s))}}}));

/***/ }),

/***/ "./node_modules/dayjs/plugin/utc.js":
/*!******************************************!*\
  !*** ./node_modules/dayjs/plugin/utc.js ***!
  \******************************************/
/***/ (function(module) {

!function(t,i){ true?module.exports=i():0}(this,(function(){"use strict";var t="minute",i=/[+-]\d\d(?::?\d\d)?/g,e=/([+-]|\d\d)/g;return function(s,f,n){var u=f.prototype;n.utc=function(t){var i={date:t,utc:!0,args:arguments};return new f(i)},u.utc=function(i){var e=n(this.toDate(),{locale:this.$L,utc:!0});return i?e.add(this.utcOffset(),t):e},u.local=function(){return n(this.toDate(),{locale:this.$L,utc:!1})};var o=u.parse;u.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t)};var r=u.init;u.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else r.call(this)};var a=u.utcOffset;u.utcOffset=function(s,f){var n=this.$utils().u;if(n(s))return this.$u?0:n(this.$offset)?a.call(this):this.$offset;if("string"==typeof s&&(s=function(t){void 0===t&&(t="");var s=t.match(i);if(!s)return null;var f=(""+s[0]).match(e)||["-",0,0],n=f[0],u=60*+f[1]+ +f[2];return 0===u?0:"+"===n?u:-u}(s),null===s))return this;var u=Math.abs(s)<=16?60*s:s,o=this;if(f)return o.$offset=u,o.$u=0===s,o;if(0!==s){var r=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(u+r,t)).$offset=u,o.$x.$localOffset=r}else o=this.utc();return o};var h=u.format;u.format=function(t){var i=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return h.call(this,i)},u.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},u.isUTC=function(){return!!this.$u},u.toISOString=function(){return this.toDate().toISOString()},u.toString=function(){return this.toDate().toUTCString()};var l=u.toDate;u.toDate=function(t){return"s"===t&&this.$offset?n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var c=u.diff;u.diff=function(t,i,e){if(t&&this.$u===t.$u)return c.call(this,t,i,e);var s=this.local(),f=n(t).local();return c.call(s,f,i,e)}}}));

/***/ }),

/***/ "./node_modules/dayjs/plugin/weekOfYear.js":
/*!*************************************************!*\
  !*** ./node_modules/dayjs/plugin/weekOfYear.js ***!
  \*************************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";var e="week",t="year";return function(i,n,r){var f=n.prototype;f.week=function(i){if(void 0===i&&(i=null),null!==i)return this.add(7*(i-this.week()),"day");var n=this.$locale().yearStart||1;if(11===this.month()&&this.date()>25){var f=r(this).startOf(t).add(1,t).date(n),s=r(this).endOf(e);if(f.isBefore(s))return 1}var a=r(this).startOf(t).date(n).startOf(e).subtract(1,"millisecond"),o=this.diff(a,e,!0);return o<0?r(this).startOf("week").week():Math.ceil(o)},f.weeks=function(e){return void 0===e&&(e=null),this.week(e)}}}));

/***/ }),

/***/ "./node_modules/density-clustering/lib/DBSCAN.js":
/*!*******************************************************!*\
  !*** ./node_modules/density-clustering/lib/DBSCAN.js ***!
  \*******************************************************/
/***/ ((module) => {

/**
 * DBSCAN - Density based clustering
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * DBSCAN class construcotr
 * @constructor
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction
 * @returns {DBSCAN}
 */
function DBSCAN(dataset, epsilon, minPts, distanceFunction) {
  /** @type {Array} */
  this.dataset = [];
  /** @type {number} */
  this.epsilon = 1;
  /** @type {number} */
  this.minPts = 2;
  /** @type {function} */
  this.distance = this._euclideanDistance;
  /** @type {Array} */
  this.clusters = [];
  /** @type {Array} */
  this.noise = [];

  // temporary variables used during computation

  /** @type {Array} */
  this._visited = [];
  /** @type {Array} */
  this._assigned = [];
  /** @type {number} */
  this._datasetLength = 0;

  this._init(dataset, epsilon, minPts, distanceFunction);
};

/******************************************************************************/
// public functions

/**
 * Start clustering
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction
 * @returns {undefined}
 * @access public
 */
DBSCAN.prototype.run = function(dataset, epsilon, minPts, distanceFunction) {
  this._init(dataset, epsilon, minPts, distanceFunction);

  for (var pointId = 0; pointId < this._datasetLength; pointId++) {
    // if point is not visited, check if it forms a cluster
    if (this._visited[pointId] !== 1) {
      this._visited[pointId] = 1;

      // if closest neighborhood is too small to form a cluster, mark as noise
      var neighbors = this._regionQuery(pointId);

      if (neighbors.length < this.minPts) {
        this.noise.push(pointId);
      } else {
        // create new cluster and add point
        var clusterId = this.clusters.length;
        this.clusters.push([]);
        this._addToCluster(pointId, clusterId);

        this._expandCluster(clusterId, neighbors);
      }
    }
  }

  return this.clusters;
};

/******************************************************************************/
// protected functions

/**
 * Set object properties
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distance
 * @returns {undefined}
 * @access protected
 */
DBSCAN.prototype._init = function(dataset, epsilon, minPts, distance) {

  if (dataset) {

    if (!(dataset instanceof Array)) {
      throw Error('Dataset must be of type array, ' +
        typeof dataset + ' given');
    }

    this.dataset = dataset;
    this.clusters = [];
    this.noise = [];

    this._datasetLength = dataset.length;
    this._visited = new Array(this._datasetLength);
    this._assigned = new Array(this._datasetLength);
  }

  if (epsilon) {
    this.epsilon = epsilon;
  }

  if (minPts) {
    this.minPts = minPts;
  }

  if (distance) {
    this.distance = distance;
  }
};

/**
 * Expand cluster to closest points of given neighborhood
 *
 * @param {number} clusterId
 * @param {Array} neighbors
 * @returns {undefined}
 * @access protected
 */
DBSCAN.prototype._expandCluster = function(clusterId, neighbors) {

  /**
   * It's very important to calculate length of neighbors array each time,
   * as the number of elements changes over time
   */
  for (var i = 0; i < neighbors.length; i++) {
    var pointId2 = neighbors[i];

    if (this._visited[pointId2] !== 1) {
      this._visited[pointId2] = 1;
      var neighbors2 = this._regionQuery(pointId2);

      if (neighbors2.length >= this.minPts) {
        neighbors = this._mergeArrays(neighbors, neighbors2);
      }
    }

    // add to cluster
    if (this._assigned[pointId2] !== 1) {
      this._addToCluster(pointId2, clusterId);
    }
  }
};

/**
 * Add new point to cluster
 *
 * @param {number} pointId
 * @param {number} clusterId
 */
DBSCAN.prototype._addToCluster = function(pointId, clusterId) {
  this.clusters[clusterId].push(pointId);
  this._assigned[pointId] = 1;
};

/**
 * Find all neighbors around given point
 *
 * @param {number} pointId,
 * @param {number} epsilon
 * @returns {Array}
 * @access protected
 */
DBSCAN.prototype._regionQuery = function(pointId) {
  var neighbors = [];

  for (var id = 0; id < this._datasetLength; id++) {
    var dist = this.distance(this.dataset[pointId], this.dataset[id]);
    if (dist < this.epsilon) {
      neighbors.push(id);
    }
  }

  return neighbors;
};

/******************************************************************************/
// helpers

/**
 * @param {Array} a
 * @param {Array} b
 * @returns {Array}
 * @access protected
 */
DBSCAN.prototype._mergeArrays = function(a, b) {
  var len = b.length;

  for (var i = 0; i < len; i++) {
    var P = b[i];
    if (a.indexOf(P) < 0) {
      a.push(P);
    }
  }

  return a;
};

/**
 * Calculate euclidean distance in multidimensional space
 *
 * @param {Array} p
 * @param {Array} q
 * @returns {number}
 * @access protected
 */
DBSCAN.prototype._euclideanDistance = function(p, q) {
  var sum = 0;
  var i = Math.min(p.length, q.length);

  while (i--) {
    sum += (p[i] - q[i]) * (p[i] - q[i]);
  }

  return Math.sqrt(sum);
};

if ( true && module.exports) {
  module.exports = DBSCAN;
}


/***/ }),

/***/ "./node_modules/density-clustering/lib/KMEANS.js":
/*!*******************************************************!*\
  !*** ./node_modules/density-clustering/lib/KMEANS.js ***!
  \*******************************************************/
/***/ ((module) => {

﻿/**
 * KMEANS clustering
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * KMEANS class constructor
 * @constructor
 *
 * @param {Array} dataset
 * @param {number} k - number of clusters
 * @param {function} distance - distance function
 * @returns {KMEANS}
 */
 function KMEANS(dataset, k, distance) {
  this.k = 3; // number of clusters
  this.dataset = []; // set of feature vectors
  this.assignments = []; // set of associated clusters for each feature vector
  this.centroids = []; // vectors for our clusters

  this.init(dataset, k, distance);
}

/**
 * @returns {undefined}
 */
KMEANS.prototype.init = function(dataset, k, distance) {
  this.assignments = [];
  this.centroids = [];

  if (typeof dataset !== 'undefined') {
    this.dataset = dataset;
  }

  if (typeof k !== 'undefined') {
    this.k = k;
  }

  if (typeof distance !== 'undefined') {
    this.distance = distance;
  }
};

/**
 * @returns {undefined}
 */
KMEANS.prototype.run = function(dataset, k) {
  this.init(dataset, k);

  var len = this.dataset.length;

  // initialize centroids
  for (var i = 0; i < this.k; i++) {
    this.centroids[i] = this.randomCentroid();
	}

  var change = true;
  while(change) {

    // assign feature vectors to clusters
    change = this.assign();

    // adjust location of centroids
    for (var centroidId = 0; centroidId < this.k; centroidId++) {
      var mean = new Array(maxDim);
      var count = 0;

      // init mean vector
      for (var dim = 0; dim < maxDim; dim++) {
        mean[dim] = 0;
      }

      for (var j = 0; j < len; j++) {
        var maxDim = this.dataset[j].length;

        // if current cluster id is assigned to point
        if (centroidId === this.assignments[j]) {
          for (var dim = 0; dim < maxDim; dim++) {
            mean[dim] += this.dataset[j][dim];
          }
          count++;
        }
      }

      if (count > 0) {
        // if cluster contain points, adjust centroid position
        for (var dim = 0; dim < maxDim; dim++) {
          mean[dim] /= count;
        }
        this.centroids[centroidId] = mean;
      } else {
        // if cluster is empty, generate new random centroid
        this.centroids[centroidId] = this.randomCentroid();
        change = true;
      }
    }
  }

  return this.getClusters();
};

/**
 * Generate random centroid
 *
 * @returns {Array}
 */
KMEANS.prototype.randomCentroid = function() {
  var maxId = this.dataset.length -1;
  var centroid;
  var id;

  do {
    id = Math.round(Math.random() * maxId);
    centroid = this.dataset[id];
  } while (this.centroids.indexOf(centroid) >= 0);

  return centroid;
}

/**
 * Assign points to clusters
 *
 * @returns {boolean}
 */
KMEANS.prototype.assign = function() {
  var change = false;
  var len = this.dataset.length;
  var closestCentroid;

  for (var i = 0; i < len; i++) {
    closestCentroid = this.argmin(this.dataset[i], this.centroids, this.distance);

    if (closestCentroid != this.assignments[i]) {
      this.assignments[i] = closestCentroid;
      change = true;
    }
  }

  return change;
}

/**
 * Extract information about clusters
 *
 * @returns {undefined}
 */
KMEANS.prototype.getClusters = function() {
  var clusters = new Array(this.k);
  var centroidId;

  for (var pointId = 0; pointId < this.assignments.length; pointId++) {
    centroidId = this.assignments[pointId];

    // init empty cluster
    if (typeof clusters[centroidId] === 'undefined') {
      clusters[centroidId] = [];
    }

    clusters[centroidId].push(pointId);
  }

  return clusters;
};

// utils

/**
 * @params {Array} point
 * @params {Array.<Array>} set
 * @params {Function} f
 * @returns {number}
 */
KMEANS.prototype.argmin = function(point, set, f) {
  var min = Number.MAX_VALUE;
  var arg = 0;
  var len = set.length;
  var d;

  for (var i = 0; i < len; i++) {
    d = f(point, set[i]);
    if (d < min) {
      min = d;
      arg = i;
    }
  }

  return arg;
};

/**
 * Euclidean distance
 *
 * @params {number} p
 * @params {number} q
 * @returns {number}
 */
KMEANS.prototype.distance = function(p, q) {
  var sum = 0;
  var i = Math.min(p.length, q.length);

  while (i--) {
    var diff = p[i] - q[i];
    sum += diff * diff;
  }

  return Math.sqrt(sum);
};

if ( true && module.exports) {
  module.exports = KMEANS;
}


/***/ }),

/***/ "./node_modules/density-clustering/lib/OPTICS.js":
/*!*******************************************************!*\
  !*** ./node_modules/density-clustering/lib/OPTICS.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * @requires ./PriorityQueue.js
 */

if ( true && module.exports) {
      var PriorityQueue = __webpack_require__(/*! ./PriorityQueue.js */ "./node_modules/density-clustering/lib/PriorityQueue.js");
}

/**
 * OPTICS - Ordering points to identify the clustering structure
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * OPTICS class constructor
 * @constructor
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction
 * @returns {OPTICS}
 */
function OPTICS(dataset, epsilon, minPts, distanceFunction) {
  /** @type {number} */
  this.epsilon = 1;
  /** @type {number} */
  this.minPts = 1;
  /** @type {function} */
  this.distance = this._euclideanDistance;

  // temporary variables used during computation

  /** @type {Array} */
  this._reachability = [];
  /** @type {Array} */
  this._processed = [];
  /** @type {number} */
  this._coreDistance = 0;
  /** @type {Array} */
  this._orderedList = [];

  this._init(dataset, epsilon, minPts, distanceFunction);
}

/******************************************************************************/
// pulic functions

/**
 * Start clustering
 *
 * @param {Array} dataset
 * @returns {undefined}
 * @access public
 */
OPTICS.prototype.run = function(dataset, epsilon, minPts, distanceFunction) {
  this._init(dataset, epsilon, minPts, distanceFunction);

  for (var pointId = 0, l = this.dataset.length; pointId < l; pointId++) {
    if (this._processed[pointId] !== 1) {
      this._processed[pointId] = 1;
      this.clusters.push([pointId]);
      var clusterId = this.clusters.length - 1;

      this._orderedList.push(pointId);
      var priorityQueue = new PriorityQueue(null, null, 'asc');
      var neighbors = this._regionQuery(pointId);

      // using priority queue assign elements to new cluster
      if (this._distanceToCore(pointId) !== undefined) {
        this._updateQueue(pointId, neighbors, priorityQueue);
        this._expandCluster(clusterId, priorityQueue);
      }
    }
  }

  return this.clusters;
};

/**
 * Generate reachability plot for all points
 *
 * @returns {array}
 * @access public
 */
OPTICS.prototype.getReachabilityPlot = function() {
  var reachabilityPlot = [];

  for (var i = 0, l = this._orderedList.length; i < l; i++) {
    var pointId = this._orderedList[i];
    var distance = this._reachability[pointId];

    reachabilityPlot.push([pointId, distance]);
  }

  return reachabilityPlot;
};

/******************************************************************************/
// protected functions

/**
 * Set object properties
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distance
 * @returns {undefined}
 * @access protected
 */
OPTICS.prototype._init = function(dataset, epsilon, minPts, distance) {

  if (dataset) {

    if (!(dataset instanceof Array)) {
      throw Error('Dataset must be of type array, ' +
        typeof dataset + ' given');
    }

    this.dataset = dataset;
    this.clusters = [];
    this._reachability = new Array(this.dataset.length);
    this._processed = new Array(this.dataset.length);
    this._coreDistance = 0;
    this._orderedList = [];
  }

  if (epsilon) {
    this.epsilon = epsilon;
  }

  if (minPts) {
    this.minPts = minPts;
  }

  if (distance) {
    this.distance = distance;
  }
};

/**
 * Update information in queue
 *
 * @param {number} pointId
 * @param {Array} neighbors
 * @param {PriorityQueue} queue
 * @returns {undefined}
 * @access protected
 */
OPTICS.prototype._updateQueue = function(pointId, neighbors, queue) {
  var self = this;

  this._coreDistance = this._distanceToCore(pointId);
  neighbors.forEach(function(pointId2) {
    if (self._processed[pointId2] === undefined) {
      var dist = self.distance(self.dataset[pointId], self.dataset[pointId2]);
      var newReachableDistance = Math.max(self._coreDistance, dist);

      if (self._reachability[pointId2] === undefined) {
        self._reachability[pointId2] = newReachableDistance;
        queue.insert(pointId2, newReachableDistance);
      } else {
        if (newReachableDistance < self._reachability[pointId2]) {
          self._reachability[pointId2] = newReachableDistance;
          queue.remove(pointId2);
          queue.insert(pointId2, newReachableDistance);
        }
      }
    }
  });
};

/**
 * Expand cluster
 *
 * @param {number} clusterId
 * @param {PriorityQueue} queue
 * @returns {undefined}
 * @access protected
 */
OPTICS.prototype._expandCluster = function(clusterId, queue) {
  var queueElements = queue.getElements();

  for (var p = 0, l = queueElements.length; p < l; p++) {
    var pointId = queueElements[p];
    if (this._processed[pointId] === undefined) {
      var neighbors = this._regionQuery(pointId);
      this._processed[pointId] = 1;

      this.clusters[clusterId].push(pointId);
      this._orderedList.push(pointId);

      if (this._distanceToCore(pointId) !== undefined) {
        this._updateQueue(pointId, neighbors, queue);
        this._expandCluster(clusterId, queue);
      }
    }
  }
};

/**
 * Calculating distance to cluster core
 *
 * @param {number} pointId
 * @returns {number}
 * @access protected
 */
OPTICS.prototype._distanceToCore = function(pointId) {
  var l = this.epsilon;
  for (var coreDistCand = 0; coreDistCand < l; coreDistCand++) {
    var neighbors = this._regionQuery(pointId, coreDistCand);
    if (neighbors.length >= this.minPts) {
      return coreDistCand;
    }
  }

  return;
};

/**
 * Find all neighbors around given point
 *
 * @param {number} pointId
 * @param {number} epsilon
 * @returns {Array}
 * @access protected
 */
OPTICS.prototype._regionQuery = function(pointId, epsilon) {
  epsilon = epsilon || this.epsilon;
  var neighbors = [];

  for (var id = 0, l = this.dataset.length; id < l; id++) {
    if (this.distance(this.dataset[pointId], this.dataset[id]) < epsilon) {
      neighbors.push(id);
    }
  }

  return neighbors;
};

/******************************************************************************/
// helpers

/**
 * Calculate euclidean distance in multidimensional space
 *
 * @param {Array} p
 * @param {Array} q
 * @returns {number}
 * @access protected
 */
OPTICS.prototype._euclideanDistance = function(p, q) {
  var sum = 0;
  var i = Math.min(p.length, q.length);

  while (i--) {
    sum += (p[i] - q[i]) * (p[i] - q[i]);
  }

  return Math.sqrt(sum);
};

if ( true && module.exports) {
  module.exports = OPTICS;
}


/***/ }),

/***/ "./node_modules/density-clustering/lib/PriorityQueue.js":
/*!**************************************************************!*\
  !*** ./node_modules/density-clustering/lib/PriorityQueue.js ***!
  \**************************************************************/
/***/ ((module) => {

/**
 * PriorityQueue
 * Elements in this queue are sorted according to their value
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * PriorityQueue class construcotr
 * @constructor
 *
 * @example
 * queue: [1,2,3,4]
 * priorities: [4,1,2,3]
 * > result = [1,4,2,3]
 *
 * @param {Array} elements
 * @param {Array} priorities
 * @param {string} sorting - asc / desc
 * @returns {PriorityQueue}
 */
function PriorityQueue(elements, priorities, sorting) {
  /** @type {Array} */
  this._queue = [];
  /** @type {Array} */
  this._priorities = [];
  /** @type {string} */
  this._sorting = 'desc';

  this._init(elements, priorities, sorting);
};

/**
 * Insert element
 *
 * @param {Object} ele
 * @param {Object} priority
 * @returns {undefined}
 * @access public
 */
PriorityQueue.prototype.insert = function(ele, priority) {
  var indexToInsert = this._queue.length;
  var index = indexToInsert;

  while (index--) {
    var priority2 = this._priorities[index];
    if (this._sorting === 'desc') {
      if (priority > priority2) {
        indexToInsert = index;
      }
    } else {
      if (priority < priority2) {
        indexToInsert = index;
      }
    }
  }

  this._insertAt(ele, priority, indexToInsert);
};

/**
 * Remove element
 *
 * @param {Object} ele
 * @returns {undefined}
 * @access public
 */
PriorityQueue.prototype.remove = function(ele) {
  var index = this._queue.length;

  while (index--) {
    var ele2 = this._queue[index];
    if (ele === ele2) {
      this._queue.splice(index, 1);
      this._priorities.splice(index, 1);
      break;
    }
  }
};

/**
 * For each loop wrapper
 *
 * @param {function} func
 * @returs {undefined}
 * @access public
 */
PriorityQueue.prototype.forEach = function(func) {
  this._queue.forEach(func);
};

/**
 * @returns {Array}
 * @access public
 */
PriorityQueue.prototype.getElements = function() {
  return this._queue;
};

/**
 * @param {number} index
 * @returns {Object}
 * @access public
 */
PriorityQueue.prototype.getElementPriority = function(index) {
  return this._priorities[index];
};

/**
 * @returns {Array}
 * @access public
 */
PriorityQueue.prototype.getPriorities = function() {
  return this._priorities;
};

/**
 * @returns {Array}
 * @access public
 */
PriorityQueue.prototype.getElementsWithPriorities = function() {
  var result = [];

  for (var i = 0, l = this._queue.length; i < l; i++) {
    result.push([this._queue[i], this._priorities[i]]);
  }

  return result;
};

/**
 * Set object properties
 *
 * @param {Array} elements
 * @param {Array} priorities
 * @returns {undefined}
 * @access protected
 */
PriorityQueue.prototype._init = function(elements, priorities, sorting) {

  if (elements && priorities) {
    this._queue = [];
    this._priorities = [];

    if (elements.length !== priorities.length) {
      throw new Error('Arrays must have the same length');
    }

    for (var i = 0; i < elements.length; i++) {
      this.insert(elements[i], priorities[i]);
    }
  }

  if (sorting) {
    this._sorting = sorting;
  }
};

/**
 * Insert element at given position
 *
 * @param {Object} ele
 * @param {number} index
 * @returns {undefined}
 * @access protected
 */
PriorityQueue.prototype._insertAt = function(ele, priority, index) {
  if (this._queue.length === index) {
    this._queue.push(ele);
    this._priorities.push(priority);
  } else {
    this._queue.splice(index, 0, ele);
    this._priorities.splice(index, 0, priority);
  }
};

if ( true && module.exports) {
  module.exports = PriorityQueue;
}


/***/ }),

/***/ "./node_modules/density-clustering/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/density-clustering/lib/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


if ( true && module.exports) {
    module.exports = {
      DBSCAN: __webpack_require__(/*! ./DBSCAN.js */ "./node_modules/density-clustering/lib/DBSCAN.js"),
      KMEANS: __webpack_require__(/*! ./KMEANS.js */ "./node_modules/density-clustering/lib/KMEANS.js"),
      OPTICS: __webpack_require__(/*! ./OPTICS.js */ "./node_modules/density-clustering/lib/OPTICS.js"),
      PriorityQueue: __webpack_require__(/*! ./PriorityQueue.js */ "./node_modules/density-clustering/lib/PriorityQueue.js")
    };
}


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

/***/ "./node_modules/is-retry-allowed/index.js":
/*!************************************************!*\
  !*** ./node_modules/is-retry-allowed/index.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


const denyList = new Set([
	'ENOTFOUND',
	'ENETUNREACH',

	// SSL errors from https://github.com/nodejs/node/blob/fc8e3e2cdc521978351de257030db0076d79e0ab/src/crypto/crypto_common.cc#L301-L328
	'UNABLE_TO_GET_ISSUER_CERT',
	'UNABLE_TO_GET_CRL',
	'UNABLE_TO_DECRYPT_CERT_SIGNATURE',
	'UNABLE_TO_DECRYPT_CRL_SIGNATURE',
	'UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY',
	'CERT_SIGNATURE_FAILURE',
	'CRL_SIGNATURE_FAILURE',
	'CERT_NOT_YET_VALID',
	'CERT_HAS_EXPIRED',
	'CRL_NOT_YET_VALID',
	'CRL_HAS_EXPIRED',
	'ERROR_IN_CERT_NOT_BEFORE_FIELD',
	'ERROR_IN_CERT_NOT_AFTER_FIELD',
	'ERROR_IN_CRL_LAST_UPDATE_FIELD',
	'ERROR_IN_CRL_NEXT_UPDATE_FIELD',
	'OUT_OF_MEM',
	'DEPTH_ZERO_SELF_SIGNED_CERT',
	'SELF_SIGNED_CERT_IN_CHAIN',
	'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
	'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
	'CERT_CHAIN_TOO_LONG',
	'CERT_REVOKED',
	'INVALID_CA',
	'PATH_LENGTH_EXCEEDED',
	'INVALID_PURPOSE',
	'CERT_UNTRUSTED',
	'CERT_REJECTED',
	'HOSTNAME_MISMATCH'
]);

// TODO: Use `error?.code` when targeting Node.js 14
module.exports = error => !denyList.has(error && error.code);


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

/***/ "./node_modules/querystring/decode.js":
/*!********************************************!*\
  !*** ./node_modules/querystring/decode.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};


/***/ }),

/***/ "./node_modules/querystring/encode.js":
/*!********************************************!*\
  !*** ./node_modules/querystring/encode.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).filter(Boolean).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};


/***/ }),

/***/ "./node_modules/querystring/index.js":
/*!*******************************************!*\
  !*** ./node_modules/querystring/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring/encode.js");


/***/ }),

/***/ "./node_modules/truncate/truncate.js":
/*!*******************************************!*\
  !*** ./node_modules/truncate/truncate.js ***!
  \*******************************************/
/***/ ((module) => {

/*global module:true*/
/*jslint nomen:true*/
/**
 * @module Utility
 */
(function (context, undefined) {
    'use strict';

    var DEFAULT_TRUNCATE_SYMBOL = '…',
        // Limit emails to no more than about 600 chars, well over the max of ~300.
        // cf. RFC: https://www.rfc-editor.org/errata_search.php?eid=1690
        URL_REGEX = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]{1,300}@(.{1,300}\.)[a-zA-Z]{2,3})/g;

    function __appendEllipsis(string, options, content) {
        if (content.length === string.length || !options.ellipsis) {
            return content;
        }
        content += options.ellipsis;
        return content;
    }
    /**
     * Truncate HTML string and keep tag safe.
     *
     * @method truncate
     * @param {String} string string needs to be truncated
     * @param {Number} maxLength length of truncated string
     * @param {Object} options (optional)
     * @param {Boolean|String} [options.ellipsis] omission symbol for truncated string, '...' by default
     * @return {String} truncated string
     */
    function truncate(string, maxLength, options) {
        var content = '', // truncated text storage
            matches = true,
            remainingLength = maxLength,
            result,
            index;

        options = options || {};
        options.ellipsis = (typeof options.ellipsis === "undefined") ? DEFAULT_TRUNCATE_SYMBOL : options.ellipsis;

        if (!string || string.length === 0) {
            return '';
        }

        matches = true;
        while (matches) {
            URL_REGEX.lastIndex = content.length;
            matches = URL_REGEX.exec(string);

            if (!matches || (matches.index - content.length) >= remainingLength) {
                content += string.substring(content.length, maxLength);
                return __appendEllipsis(string, options, content, maxLength);
            }

            result = matches[0];
            index = matches.index;
            content += string.substring(content.length, index + result.length);
            remainingLength -= index + result.length;

            if (remainingLength <= 0) {
                break;
            }
        }

        return __appendEllipsis(string, options, content, maxLength);
    }

    if ( true && module.exports) {
        module.exports = truncate;
    } else {
        context.truncate = truncate;
    }
}(String));


/***/ }),

/***/ "./node_modules/vibemap-constants/dist/constants.js":
/*!**********************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/constants.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:!0}));const SET_ACTIVE_OPTION="SET_ACTIVE_OPTION",APP_STORE_URL="https://apps.apple.com/us/app/vibemap/id1496385897#?platform=iphone",GOOGLE_PLAY_URL="https://play.google.com/store/apps/details?id=com.vibemap.hotspots",GOOGLE_ANALYTICS_ID="UA-144205697-1",MAPBOX_STYLE="mapbox://styles/stevepepple/cka8kdq0i1dvv1it9nj0l70xn/draft?optimize=true",MAPBOX_STYLE_LIGHT="mapbox://styles/stevepepple/ck8unzpvf0z5j1itdntgz3lxp",DATABASE="mongodb://stevepepple:Hotspot1@ds019101.mlab.com:19101/hotspots",TIMEOUT=8e3,METERS_PER_MILE=1609.34,PURPLE="#811897",TRUCATE_LENGTH=18,HEATMAP_INTENSITY=.1,ZOOM_ON_DETAILS=2,RECOMMENDATION_REASONS={events:"This place is happening",rating:"People like this spot",vibe:"Totally your vibe",distance:"Good bet near you"},zoom_levels={0:"World ~ 1:500 M",1:"Continent ~ 1:250 M",2:"Subcontinental ~ 1:150 M",3:"Largest country ~ 1:70 M",4:"Large country ~ 1:35 M",5:"African country ~ 1:15 M",6:"Large European country ~ 1:10 M",7:"Large US state ~ 1:4 M",8:"Small US state ~ 1:2 M",9:"Large metro ~ 1:1 M",10:"Small metro ~ 1:500 K",11:"City ~ 1:250 K",12:"Town ~ 1:150 K",13:"Village ~ 1:70 K",14:"Neighborhood ~ 1:35 K",15:"Small road ~ 1:15 K",16:"Street ~ 1:8 K",17:"Block ~ 1:4 K",18:"Buildings & trees ~ 1:2 K",19:"Street detail ~ 1:1 K",20:"Rooftop ~ 1:1 K"},days=[{key:0,abbr:"Mo",name:"Monday"},{key:1,abbr:"Tu",name:"Tuesday"},{key:2,abbr:"We",name:"Wednesday"},{key:3,abbr:"Th",name:"Thursday"},{key:4,abbr:"Fr",name:"Friday"},{key:5,abbr:"Sa",name:"Saturday"},{key:6,abbr:"Su",name:"Sunday"},{key:7,name:"Public"},{key:8,name:"Non Specific"}],place_sub_categories=[{name:"Art Gallery",main_category:"art",vibes:["dreamy"]},{name:"Bakery",main_category:"food",vibes:["together"]},{name:"Bar",main_category:"drinking",vibes:["buzzing"]},{name:"Bookstore",main_category:"shopping",vibes:["solidarity"]},{name:"Beach",main_category:"outdoors",vibes:["chill"]},{name:"Coffee Shop",main_category:"cafe",vibes:["buzzing"]},{name:"Café",main_category:"community",vibes:["solidarity"]},{name:"Café",main_category:"cafe",vibes:["chill"]},{name:"Diner",main_category:"food",vibes:["oldschool"]},{name:"Farmer's Market",main_category:"shopping",vibes:["together"]},{name:"Garden",main_category:"outdoors",vibes:["dreamy"]},{name:"Gift Shop",main_category:"shopping",vibes:["dreamy"]},{name:"Ice Cream",main_category:"food",vibes:["together"]},{name:"Landmark",main_category:"visit",vibes:["oldschool"]},{main_category:"museum",name:"Museum",vibes:["together"]},{main_category:"music",name:"Music Venue",vibes:["together","solidarity"]},{main_category:"art",name:"Public Art",vibes:["together"]},{main_category:"outdoors",name:"Park",vibes:["together"]},{main_category:"games",name:"Playground",vibes:["playful"]},{main_category:"outdoors",name:"Plaza",vibes:["together","solidarity"]},{main_category:"art",name:"Street Art",vibes:["solidarity"]},{main_category:"health",name:"Studio",vibes:["together"]},{main_category:"cafe",name:"Tea Room",vibes:["chill"]}];exports.APP_STORE_URL=APP_STORE_URL,exports.DATABASE=DATABASE,exports.GOOGLE_ANALYTICS_ID=GOOGLE_ANALYTICS_ID,exports.GOOGLE_PLAY_URL=GOOGLE_PLAY_URL,exports.HEATMAP_INTENSITY=HEATMAP_INTENSITY,exports.MAPBOX_STYLE=MAPBOX_STYLE,exports.MAPBOX_STYLE_LIGHT=MAPBOX_STYLE_LIGHT,exports.METERS_PER_MILE=METERS_PER_MILE,exports.PURPLE=PURPLE,exports.RECOMMENDATION_REASONS=RECOMMENDATION_REASONS,exports.SET_ACTIVE_OPTION=SET_ACTIVE_OPTION,exports.TIMEOUT=TIMEOUT,exports.TRUCATE_LENGTH=TRUCATE_LENGTH,exports.ZOOM_ON_DETAILS=ZOOM_ON_DETAILS,exports.days=days,exports.place_sub_categories=place_sub_categories,exports.zoom_levels=zoom_levels;
//# sourceMappingURL=constants.js.map


/***/ }),

/***/ "./node_modules/vibemap-constants/dist/helpers.js":
/*!********************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/helpers.js ***!
  \********************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:!0}));var Axios=__webpack_require__(/*! axios */ "./node_modules/axios/index.js"),axiosRetry=__webpack_require__(/*! axios-retry */ "./node_modules/axios-retry/index.js"),querystring=__webpack_require__(/*! querystring */ "./node_modules/querystring/index.js"),dayjs=__webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js"),dayjsRecur=__webpack_require__(/*! dayjs-recur */ "./node_modules/dayjs-recur/index.min.js"),isBetween=__webpack_require__(/*! dayjs/plugin/isBetween */ "./node_modules/dayjs/plugin/isBetween.js"),LinearScale=__webpack_require__(/*! linear-scale */ "./node_modules/linear-scale/linear-scale.js"),truncate=__webpack_require__(/*! truncate */ "./node_modules/truncate/truncate.js"),turf=__webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js"),turf_distance=__webpack_require__(/*! @turf/distance */ "./node_modules/@turf/distance/dist/js/index.js"),turf_boolean=__webpack_require__(/*! @turf/boolean-point-in-polygon */ "./node_modules/@turf/boolean-point-in-polygon/dist/js/index.js"),constants=__webpack_require__(/*! ./constants.js */ "./node_modules/vibemap-constants/dist/constants.js"),map=__webpack_require__(/*! ./map.js */ "./node_modules/vibemap-constants/dist/map.js"),vibes=__webpack_require__(/*! ./vibes.js */ "./node_modules/vibemap-constants/dist/vibes.js"),wordpress=__webpack_require__(/*! ./wordpress.js */ "./node_modules/vibemap-constants/dist/wordpress.js");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function _interopNamespace(t){if(t&&t.__esModule)return t;var o=Object.create(null);return t&&Object.keys(t).forEach(function(e){var a;"default"!==e&&(a=Object.getOwnPropertyDescriptor(t,e),Object.defineProperty(o,e,a.get?a:{enumerable:!0,get:function(){return t[e]}}))}),o.default=t,Object.freeze(o)}__webpack_require__(/*! @mapbox/geo-viewport */ "./node_modules/@mapbox/geo-viewport/index.js"),__webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/js/index.js"),__webpack_require__(/*! @turf/clusters */ "./node_modules/@turf/clusters/dist/js/index.js"),__webpack_require__(/*! @turf/bbox-polygon */ "./node_modules/@turf/bbox-polygon/dist/js/index.js"),__webpack_require__(/*! @turf/center */ "./node_modules/@turf/center/dist/js/index.js"),__webpack_require__(/*! @turf/truncate */ "./node_modules/@turf/truncate/dist/js/index.js"),__webpack_require__(/*! @turf/clusters-dbscan */ "./node_modules/@turf/clusters-dbscan/dist/js/index.js"),__webpack_require__(/*! @turf/points-within-polygon */ "./node_modules/@turf/points-within-polygon/dist/js/index.js"),__webpack_require__(/*! @turf/rhumb-bearing */ "./node_modules/@turf/rhumb-bearing/dist/js/index.js"),__webpack_require__(/*! @turf/rhumb-distance */ "./node_modules/@turf/rhumb-distance/dist/js/index.js"),__webpack_require__(/*! @turf/rhumb-destination */ "./node_modules/@turf/rhumb-destination/dist/js/index.js"),__webpack_require__(/*! fuse.js */ "./node_modules/fuse.js/dist/fuse.esm.js");var Axios__default=_interopDefaultLegacy(Axios),axiosRetry__default=_interopDefaultLegacy(axiosRetry),querystring__default=_interopDefaultLegacy(querystring),dayjs__default=_interopDefaultLegacy(dayjs),dayjsRecur__default=_interopDefaultLegacy(dayjsRecur),isBetween__default=_interopDefaultLegacy(isBetween),LinearScale__default=_interopDefaultLegacy(LinearScale),truncate__default=_interopDefaultLegacy(truncate),turf__namespace=_interopNamespace(turf),turf_distance__default=_interopDefaultLegacy(turf_distance),turf_boolean__default=_interopDefaultLegacy(turf_boolean),cities=[{id:57206,slug:"tampa",type:"early",location:{latitude:27.950575,longitude:-82.4571776},centerpoint:[-82.4571776,27.950575],mailchimp_id:"",radius:10,name:"Tampa"},{id:56490,slug:"berkeley",type:"official",location:{latitude:37.8715226,longitude:-122.273042},centerpoint:[-122.273042,37.8715226],mailchimp_id:"",radius:12,name:"Berkeley"},{id:56488,slug:"alameda",type:"early",location:{latitude:37.7798721,longitude:-122.2821855},centerpoint:[-122.2821855,37.7798721],mailchimp_id:"",radius:12,name:"Alameda"},{id:55524,slug:"san-jose",type:"early",location:{latitude:37.33874,longitude:-121.8852525},centerpoint:[-121.8852525,37.33874],mailchimp_id:"ef90288b3c",radius:15,name:"San Jose"},{id:55522,slug:"dallas",type:"early",location:{latitude:32.7766642,longitude:-96.79698789999999},centerpoint:[-96.79698789999999,32.7766642],mailchimp_id:"f0de27e219",radius:10,name:"Dallas"},{id:55517,slug:"norfolk",type:"early",location:{latitude:36.8507689,longitude:-76.28587259999999},centerpoint:[-76.28587259999999,36.8507689],mailchimp_id:"",radius:10,name:"Norfolk"},{id:53994,slug:"ciudad-de-mexico",type:"early",location:{latitude:19.4326077,longitude:-99.133208},centerpoint:[-99.133208,19.4326077],mailchimp_id:"518242369a",radius:15,name:"Mexico City"},{id:52306,slug:"peoria",type:"early",location:{latitude:40.6936488,longitude:-89.5889864},centerpoint:[-89.5889864,40.6936488],mailchimp_id:"58578fcae6",radius:10,name:"Peoria"},{id:51835,slug:"toronto",type:"official",location:{latitude:43.653226,longitude:-79.3831843},centerpoint:[-79.3831843,43.653226],mailchimp_id:"95135b1969",radius:20,name:"Toronto"},{id:45678,slug:"houston",type:"official",location:{latitude:29.760314934412516,longitude:-95.36962040978698},centerpoint:[-95.36962040978698,29.760314934412516],mailchimp_id:"ea2fe099f2",radius:30,name:"Houston"},{id:44901,slug:"puerto-vallarta",type:"early",location:{latitude:20.615046993637947,longitude:-105.231817181398},centerpoint:[-105.231817181398,20.615046993637947],mailchimp_id:"57c905a1df",radius:4,name:"Puerto Vallarta"},{id:38387,slug:"austin",type:"early",location:{latitude:30.267153,longitude:-97.7430608},centerpoint:[-97.7430608,30.267153],mailchimp_id:"1d933c234f",radius:20,name:"Austin"},{id:38380,slug:"denver",type:"official",location:{latitude:39.7392358,longitude:-104.990251},centerpoint:[-104.990251,39.7392358],mailchimp_id:"b576abf895",radius:20,name:"Denver"},{id:38148,slug:"chicago",type:"official",location:{latitude:41.8781136,longitude:-87.6297982},centerpoint:[-87.6297982,41.8781136],mailchimp_id:"b865b3ef72",radius:20,name:"Chicago"},{id:38143,slug:"new-york",type:"official",location:{latitude:40.7127610684055,longitude:-74.0060103509262},centerpoint:[-74.0060103509262,40.7127610684055],mailchimp_id:"56ebd9923f",radius:20,name:"New York"},{id:38137,slug:"san-diego",type:"official",location:{latitude:32.715738,longitude:-117.1610838},centerpoint:[-117.1610838,32.715738],mailchimp_id:"7fb6e2a465",radius:20,name:"San Diego"},{id:38119,slug:"los-angeles",type:"official",location:{latitude:34.04734503476973,longitude:-118.25308336038819},centerpoint:[-118.25308336038819,34.04734503476973],mailchimp_id:"7fb6e2a465",radius:30,name:"Los Angeles"},{id:1450,slug:"guadalajara",type:"official",location:{latitude:20.65969879999999,longitude:-103.3496092},centerpoint:[-103.3496092,20.65969879999999],mailchimp_id:"0154de5655",radius:10,name:"Guadalajara"},{id:1447,slug:"oakland",type:"official",location:{latitude:37.79831556913852,longitude:-122.25940509567872},centerpoint:[-122.25940509567872,37.79831556913852],mailchimp_id:"da0894a0e6",radius:20,name:"Oakland"},{id:1444,slug:"san-francisco",type:"official",location:{latitude:37.7749295,longitude:-122.4194155},centerpoint:[-122.4194155,37.7749295],mailchimp_id:"f30df08e52",radius:5,name:"San Francisco"},{id:1441,slug:"portland",type:"official",location:{latitude:45.52342768785231,longitude:-122.67428398132324},centerpoint:[-122.67428398132324,45.52342768785231],mailchimp_id:"27c0467a17",radius:9,name:"Portland"},{id:1438,slug:"seattle",type:"official",location:{latitude:47.6062095,longitude:-122.3320708},centerpoint:[-122.3320708,47.6062095],mailchimp_id:"baadb78d87",radius:8,name:"Seattle"},{id:1435,slug:"vancouver",type:"official",location:{latitude:49.2827291,longitude:-123.1207375},centerpoint:[-123.1207375,49.2827291],mailchimp_id:"da30e0d7dc",radius:7,name:"Vancouver"}],neighborhoods=[{slug:"soma-west",vibe:[3021,7046,7657],map:{lat:37.776239666109525,lng:-122.4115724588135,zoom:15},radius:"0.3",name:"SOMA West",location:{latitude:37.776239666109525,longitude:-122.4115724588135,zoom:15}},{slug:"downtown-tampa",vibe:[],map:{lat:27.949447,lng:-82.4563199,zoom:14},radius:"0.3",name:"Downtown Tampa",location:{latitude:27.949447,longitude:-82.4563199,zoom:14}},{slug:"ybor-city",vibe:[],map:{lat:27.9645757,lng:-82.42595179999999,zoom:14},radius:"0.3",name:"Ybor City",location:{latitude:27.9645757,longitude:-82.42595179999999,zoom:14}},{slug:"westshore-tampa",vibe:[],map:{lat:27.970516796167992,lng:-82.51457542115496,zoom:14},radius:"2",name:"Westshore Tampa",location:{latitude:27.970516796167992,longitude:-82.51457542115496,zoom:14}},{slug:"downtown-evanston",vibe:[],map:{lat:42.04848216814751,lng:-87.68181749783933,zoom:15},radius:"0.5",name:"Downtown Evanston",location:{latitude:42.04848216814751,longitude:-87.68181749783933,zoom:15}},{slug:"east-village",vibe:[13115,3673,1073],map:{lat:40.7264773,lng:-73.98153370000001,zoom:14},radius:"0.3",name:"East Village",location:{latitude:40.7264773,longitude:-73.98153370000001,zoom:14}},{slug:"union-square",vibe:[],map:{lat:40.7358633,lng:-73.9910835,zoom:16},radius:"0.5",name:"Union Square",location:{latitude:40.7358633,longitude:-73.9910835,zoom:16}},{slug:"uptown",vibe:[1073,5690,5553],map:{lat:41.9665404,lng:-87.6533404,zoom:14},radius:"0.4",name:"Uptown",location:{latitude:41.9665404,longitude:-87.6533404,zoom:14}},{slug:"hyde-park",vibe:[2034,5553,5678],map:{lat:41.80546409999999,lng:-87.60876379999999,zoom:14},radius:"0.3",name:"Hyde Park",location:{latitude:41.80546409999999,longitude:-87.60876379999999,zoom:14}},{slug:"west-main-street",vibe:[4566,3021,2230],map:{lat:40.699765,lng:-89.61042189999999,zoom:14},radius:"0.8",name:"West Main Street",location:{latitude:40.699765,longitude:-89.61042189999999,zoom:14}},{slug:"peoria-riverfront",vibe:[6158,4111,3027],map:{lat:40.690670560304085,lng:-89.5862125132446,zoom:15},radius:"0.2",name:"Peoria RiverFront",location:{latitude:40.690670560304085,longitude:-89.5862125132446,zoom:15}},{slug:"warehouse-district",vibe:[6783,1073,2467],map:{lat:40.6848751,lng:-89.59690839999999,zoom:18},radius:"0.2",name:"Warehouse District",location:{latitude:40.6848751,longitude:-89.59690839999999,zoom:18}},{slug:"downtown-peoria",vibe:[1100,1073,1687,7744],map:{lat:40.6923123,lng:-89.59009139999999,zoom:14},radius:"0.6",name:"Downtown Peoria",location:{latitude:40.6923123,longitude:-89.59009139999999,zoom:14}},{slug:"the-loop",vibe:[1100,7424,8617],map:{lat:41.8786351,lng:-87.6250549,zoom:14},radius:"0.8",name:"The Loop",location:{latitude:41.8786351,longitude:-87.6250549,zoom:14}},{slug:"liberty-village",vibe:[6962,6549,6795],map:{lat:43.6373781,lng:-79.4211567,zoom:14},radius:"0.3",name:"Liberty Village",location:{latitude:43.6373781,longitude:-79.4211567,zoom:14}},{slug:"the-village",vibe:[5684,1064,6555],map:{lat:43.75808380000001,lng:-79.5707383,zoom:14},radius:"0.3",name:"The Village",location:{latitude:43.75808380000001,longitude:-79.5707383,zoom:14}},{slug:"high-park",vibe:[3024,1106,5514],map:{lat:43.64654789999999,lng:-79.4636903,zoom:14},radius:"0.3",name:"High Park",location:{latitude:43.64654789999999,longitude:-79.4636903,zoom:14}},{slug:"little-italy",vibe:[3005,7016,1414],map:{lat:43.6552194,lng:-79.41386039999999,zoom:14},radius:"0.3",name:"Little Italy",location:{latitude:43.6552194,longitude:-79.41386039999999,zoom:14}},{slug:"the-danforth",vibe:[6756,1060,6950],map:{lat:43.6837565,lng:-79.3212058,zoom:14},radius:"0.3",name:"The Danforth",location:{latitude:43.6837565,longitude:-79.3212058,zoom:14}},{slug:"st-lawrence-market",vibe:[3021,5567,1956],map:{lat:43.64868790000001,lng:-79.3715454,zoom:14},radius:"0.3",name:"St. Lawrence Market",location:{latitude:43.64868790000001,longitude:-79.3715454,zoom:14}},{slug:"the-junction",vibe:[4535,1782,2230],map:{lat:43.6655088,lng:-79.4721328,zoom:14},radius:"0.3",name:"The Junction",location:{latitude:43.6655088,longitude:-79.4721328,zoom:14}},{slug:"parkdale",vibe:[1701,6741,5638],map:{lat:43.643832,lng:-79.442534,zoom:14},radius:"0.3",name:"Parkdale",location:{latitude:43.643832,longitude:-79.442534,zoom:14}},{slug:"don-mills",vibe:[6801,1103,1109],map:{lat:43.7448473,lng:-79.34092299999999,zoom:14},radius:"0.3",name:"Don Mills",location:{latitude:43.7448473,longitude:-79.34092299999999,zoom:14}},{slug:"the-beaches",vibe:[4111,1903,5687],map:{lat:43.6673479,lng:-79.29669299999999,zoom:14},radius:"0.3",name:"The Beaches",location:{latitude:43.6673479,longitude:-79.29669299999999,zoom:14}},{slug:"riverdale",vibe:[7094,7115,6555],map:{lat:43.678985,lng:-79.34491009999999,zoom:14},radius:"0.3",name:"Riverdale",location:{latitude:43.678985,longitude:-79.34491009999999,zoom:14}},{slug:"cabbagetown",vibe:[5039,5690,2159],map:{lat:43.6658668,lng:-79.3686331,zoom:14},radius:"0.3",name:"Cabbagetown",location:{latitude:43.6658668,longitude:-79.3686331,zoom:14}},{slug:"summerhill",vibe:[6753,2464,1782],map:{lat:43.6822899,lng:-79.3907744,zoom:14},radius:"0.3",name:"Summerhill",location:{latitude:43.6822899,longitude:-79.3907744,zoom:14}},{slug:"rosedale",vibe:[1109,1067,1687],map:{lat:43.683375,lng:-79.377172,zoom:14},radius:"0.3",name:"Rosedale",location:{latitude:43.683375,longitude:-79.377172,zoom:14}},{slug:"toronto-chinatown",vibe:[2464,3005,7028],map:{lat:43.650883,lng:-79.397226,zoom:14},radius:"0.3",name:"Chinatown",location:{latitude:43.650883,longitude:-79.397226,zoom:14}},{slug:"yorkville",vibe:[6894,7478,7187],map:{lat:43.670749,lng:-79.39304,zoom:14},radius:"0.3",name:"Yorkville",location:{latitude:43.670749,longitude:-79.39304,zoom:14}},{slug:"kensington-market",vibe:[2034,4071,2119],map:{lat:43.6545236,lng:-79.4014566,zoom:14},radius:"0.3",name:"Kensington Market",location:{latitude:43.6545236,longitude:-79.4014566,zoom:14}},{slug:"harbourfront",vibe:[4111,1106,7001],map:{lat:43.6405521,lng:-79.3789371,zoom:14},radius:"0.3",name:"Harbourfront",location:{latitude:43.6405521,longitude:-79.3789371,zoom:14}},{slug:"the-east-cut",vibe:[3021,2037,3027,1687,6552],map:{lat:37.789218,lng:-122.3951488,zoom:17},radius:"0.3",name:"The East Cut",location:{latitude:37.789218,longitude:-122.3951488,zoom:17}},{slug:"49785",vibe:[2464,1073,5690,2230,7343,6552],map:{lat:34.0900091,lng:-118.3617443,zoom:14},radius:"0.4",name:"West Hollywood",location:{latitude:34.0900091,longitude:-118.3617443,zoom:14}},{slug:"chinatown-oakland",vibe:[1073,2230,1067,1906],map:{lat:37.797883489755385,lng:-122.26782583942565,zoom:16},radius:"0.1",name:"Chinatown",location:{latitude:37.797883489755385,longitude:-122.26782583942565,zoom:16}},{slug:"city-park",vibe:[],map:{lat:39.7437803,lng:-104.9500844,zoom:14},radius:"0.3",name:"City Park",location:{latitude:39.7437803,longitude:-104.9500844,zoom:14}},{slug:"lodo",vibe:[1064,1076,1906],map:{lat:39.7526509,lng:-105.001685,zoom:14},radius:"0.3",name:"LoDo",location:{latitude:39.7526509,longitude:-105.001685,zoom:14}},{slug:"nuevo-vallarta",vibe:[],map:{lat:20.6986205,lng:-105.2964898,zoom:14},radius:"0.3",name:"Nuevo Vallarta",location:{latitude:20.6986205,longitude:-105.2964898,zoom:14}},{slug:"5-de-diciembre",vibe:[1103,2230,1067,1785],map:{lat:20.6167287,lng:-105.2297199,zoom:14},radius:"0.2",name:"5 de Diciembre",location:{latitude:20.6167287,longitude:-105.2297199,zoom:14}},{slug:"versalles-la-vena",vibe:[3024,1060,2162],map:{lat:20.6350676,lng:-105.2275257,zoom:17},radius:"0.4",name:"Versalles &#038; La Vena",location:{latitude:20.6350676,longitude:-105.2275257,zoom:17}},{slug:"centro",vibe:[1100,1073,1067],map:{lat:20.6098697,lng:-105.2333768,zoom:16},radius:"0.4",name:"Centro",location:{latitude:20.6098697,longitude:-105.2333768,zoom:16}},{slug:"zona-romantica",vibe:[1073,1903,1701,6549,1956],map:{lat:20.6027765,lng:-105.2337149,zoom:14},radius:"0.3",name:"Zona Romantica",location:{latitude:20.6027765,longitude:-105.2337149,zoom:14}},{slug:"soma",vibe:[3021,1100,2034,6558],map:{lat:37.7785189,lng:-122.4056395,zoom:17},radius:"0.4",name:"SoMa",location:{latitude:37.7785189,longitude:-122.4056395,zoom:17}},{slug:"downtown-oakland",vibe:[1100,1903,1906],map:{lat:37.8032973,lng:-122.2710602,zoom:15},radius:"0.3",name:"Downtown Oakland",location:{latitude:37.8032973,longitude:-122.2710602,zoom:15}},{slug:"castro-san-francisco",vibe:[1103,1106,1070,6549,2119],map:{lat:37.7609082,lng:-122.4350043,zoom:16},radius:"0.3",name:"Castro",location:{latitude:37.7609082,longitude:-122.4350043,zoom:16}},{slug:"lafayette-obrera-guadalajara",vibe:[1100,1076,1701],map:{lat:20.669874401713777,lng:-103.37240438465577,zoom:16},radius:"0.3",name:"Lafayette / Obrera",location:{latitude:20.669874401713777,longitude:-103.37240438465577,zoom:16}},{slug:"fillmore-san-francisco",vibe:[5039,1073,2119],map:{lat:37.786566,lng:-122.4333927,zoom:15},radius:"0.3",name:"Fillmore District",location:{latitude:37.786566,longitude:-122.4333927,zoom:15}},{slug:"downtown-vancouver",vibe:[1100,2116,1956,2119],map:{lat:49.281954,lng:-123.1170744,zoom:11},radius:"0.2",name:"Downtown Vancouver",location:{latitude:49.281954,longitude:-123.1170744,zoom:11}},{slug:"jack-london-oakland",vibe:[1060,1109,1073,1687],map:{lat:37.79506910000001,lng:-122.2777955,zoom:14},radius:"0.3",name:"Jack London",location:{latitude:37.79506910000001,longitude:-122.2777955,zoom:14}},{slug:"monraz-guadalajara",vibe:[1106,2162,2119],map:{lat:20.6838829,lng:-103.3948334,zoom:15},radius:"0.3",name:"Monráz",location:{latitude:20.6838829,longitude:-103.3948334,zoom:15}},{slug:"tlaquepaque-guadalajara",vibe:[3021,2230,6561,4828],map:{lat:20.628807203160175,lng:-103.31384336079101,zoom:14},radius:"0.3",name:"Tlaquepaque",location:{latitude:20.628807203160175,longitude:-103.31384336079101,zoom:14}},{slug:"moderna-guadalajara",vibe:[1070,1067],map:{lat:20.663603891205657,lng:-103.3612885989502,zoom:15},radius:"0.3",name:"Moderna",location:{latitude:20.663603891205657,longitude:-103.3612885989502,zoom:15}},{slug:"chapalita-guadalajara",vibe:[1100,1106],map:{lat:20.663216991873846,lng:-103.39528387829588,zoom:17},radius:"0.3",name:"Chapalita",location:{latitude:20.663216991873846,longitude:-103.39528387829588,zoom:17}},{slug:"providencia-guadalajara",vibe:[1106,1076],map:{lat:20.7019816,lng:-103.378224,zoom:14},radius:"0.3",name:"Providencia",location:{latitude:20.7019816,longitude:-103.378224,zoom:14}},{slug:"zapopan-centro-guadalajara",vibe:[1100,1067,1076],map:{lat:20.6719563,lng:-103.416501,zoom:14},radius:"0.3",name:"Zapopan Centro",location:{latitude:20.6719563,longitude:-103.416501,zoom:14}},{slug:"centro-guadalajara",vibe:[1100,1067],map:{lat:20.6866131,lng:-103.3507872,zoom:14},radius:"0.3",name:"Centro",location:{latitude:20.6866131,longitude:-103.3507872,zoom:14}},{slug:"mexicaltzingo-guadalajara",vibe:[1100,2230,1067],map:{lat:20.6676254,lng:-103.3505188,zoom:14},radius:"0.3",name:"Mexicaltzingo",location:{latitude:20.6676254,longitude:-103.3505188,zoom:14}},{slug:"santa-tere-guadalajara",vibe:[1100,2230,2119],map:{lat:20.683636195948008,lng:-103.36814401852416,zoom:15},name:"Santa Tere",location:{latitude:20.683636195948008,longitude:-103.36814401852416,zoom:15}},{slug:"americana-guadalajara",vibe:[1701],map:{lat:20.6717775,lng:-103.3630608,zoom:15},radius:"0.3",name:"Americana",location:{latitude:20.6717775,longitude:-103.3630608,zoom:15}},{slug:"yaletown-vancouver",vibe:[],map:{lat:49.27570189999999,lng:-123.1199065,zoom:14},radius:"0.3",name:"Yaletown",location:{latitude:49.27570189999999,longitude:-123.1199065,zoom:14}},{slug:"west-end-vancouver",vibe:[1106,1067],map:{lat:49.2900541,lng:-123.1376044,zoom:14},radius:"0.3",name:"West End",location:{latitude:49.2900541,longitude:-123.1376044,zoom:14}},{slug:"north-vancouver",vibe:[1100,1106],map:{lat:49.3199816,lng:-123.0724139,zoom:14},radius:"0.3",name:"North Vancouver",location:{latitude:49.3199816,longitude:-123.0724139,zoom:14}},{slug:"gastown-vancouver",vibe:[1100,5039,1067,1687,2119],map:{lat:49.2828082,lng:-123.1066875,zoom:14},radius:"0.3",name:"Gastown",location:{latitude:49.2828082,longitude:-123.1066875,zoom:14}},{slug:"east-vancouver-vancouver",vibe:[1100,3005,1824,1073,1067],map:{lat:49.2530487,lng:-123.0663828,zoom:14},radius:"0.3",name:"East Vancouver",location:{latitude:49.2530487,longitude:-123.0663828,zoom:14}},{slug:"davie-village-vancouver",vibe:[1100,1106],map:{lat:49.2804157,lng:-123.1311982,zoom:14},radius:"0.3",name:"Davie Village",location:{latitude:49.2804157,longitude:-123.1311982,zoom:14}},{slug:"mississippi-avenue",vibe:[2464,3018,2119,2467],map:{lat:45.5467446,lng:-122.6755671,zoom:14},radius:"0.3",name:"Mississippi Avenue",location:{latitude:45.5467446,longitude:-122.6755671,zoom:14}},{slug:"st-johns-portland",vibe:[],map:{lat:45.5901167,lng:-122.7545431,zoom:14},radius:"0.3",name:"St Johns",location:{latitude:45.5901167,longitude:-122.7545431,zoom:14}},{slug:"jade-district",vibe:[1100,2119],map:{lat:45.50243139999999,lng:-122.5785098,zoom:12},radius:"0.3",name:"Jade District",location:{latitude:45.50243139999999,longitude:-122.5785098,zoom:12}},{slug:"hawthorne-portland",vibe:[3021,1100,2034,1067,2159],map:{lat:45.51206579999999,lng:-122.6305462,zoom:14},radius:"0.3",name:"Hawthorne",location:{latitude:45.51206579999999,longitude:-122.6305462,zoom:14}},{slug:"division-clinton-portland",vibe:[1100,2034,1166,5581,2119],map:{lat:45.5032867,lng:-122.6399541,zoom:17},radius:"0.3",name:"Division/Clinton",location:{latitude:45.5032867,longitude:-122.6399541,zoom:17}},{slug:"central-eastside-portland",vibe:[1073,1067,2119],map:{lat:45.523777,lng:-122.6598737,zoom:15},radius:"0.3",name:"Central Eastside",location:{latitude:45.523777,longitude:-122.6598737,zoom:15}},{slug:"chinatown-old-town-portland",vibe:[1106,1073,2119,1906],map:{lat:45.5246175,lng:-122.6740295,zoom:14},radius:"0.3",name:"Old Town / Chinatown",location:{latitude:45.5246175,longitude:-122.6740295,zoom:14}},{slug:"pioneer-square-seattle",vibe:[1073,1070,1067],map:{lat:47.6015184,lng:-122.3342975,zoom:14},radius:"0.3",name:"Pioneer Square",location:{latitude:47.6015184,longitude:-122.3342975,zoom:14}},{slug:"ballard-seattle",vibe:[1106,2162],map:{lat:47.6792172,lng:-122.3860312,zoom:15},radius:"0.3",name:"Ballard",location:{latitude:47.6792172,longitude:-122.3860312,zoom:15}},{slug:"mission-sanfrancisco",vibe:[1100,1103,1067,2119],map:{lat:37.7598648,lng:-122.4147977,zoom:15},radius:"0.3",name:"Mission District",location:{latitude:37.7598648,longitude:-122.4147977,zoom:15}},{slug:"green-lake-seattle",vibe:[1106,1076],map:{lat:47.6798338,lng:-122.3257826,zoom:15},radius:"0.3",name:"Green Lake",location:{latitude:47.6798338,longitude:-122.3257826,zoom:15}},{slug:"georgetown-seattle",vibe:[1106,1067],map:{lat:47.5475104,lng:-122.3214521,zoom:15},radius:"0.3",name:"Georgetown",location:{latitude:47.5475104,longitude:-122.3214521,zoom:15}},{slug:"queen-anne-seattle",vibe:[],map:{lat:47.6323268,lng:-122.3568641,zoom:15},radius:"0.3",name:"Queen Anne",location:{latitude:47.6323268,longitude:-122.3568641,zoom:15}},{slug:"capitol-hill-seattle",vibe:[1100,1073,6549,2119,5559],map:{lat:47.625305,lng:-122.3221835,zoom:15},radius:"0.3",name:"Capitol Hill",location:{latitude:47.625305,longitude:-122.3221835,zoom:15}},{slug:"chinatown-seattle",vibe:[],map:{lat:47.5987122,lng:-122.3239762,zoom:15},radius:"0.3",name:"Chinatown-International District",location:{latitude:47.5987122,longitude:-122.3239762,zoom:15}},{slug:"fruitvale-oakland",vibe:[1070,1903,1906],map:{lat:37.7776559,lng:-122.2258763,zoom:15},radius:"0.3",name:"Fruitvale",location:{latitude:37.7776559,longitude:-122.2258763,zoom:15}},{slug:"west-oakland-oakland",vibe:[2464,1067],map:{lat:37.8155761,lng:-122.2839963,zoom:14},radius:"0.3",name:"West Oakland",location:{latitude:37.8155761,longitude:-122.2839963,zoom:14}},{slug:"temescal-oakland",vibe:[1067,2119],map:{lat:37.8333513,lng:-122.260109,zoom:15},radius:"0.3",name:"Temescal",location:{latitude:37.8333513,longitude:-122.260109,zoom:15}},{slug:"inner-sunset-san-francisco",vibe:[1106,2119],map:{lat:37.764133875773645,lng:-122.46626644229737,zoom:15},name:"Inner Sunset",location:{latitude:37.764133875773645,longitude:-122.46626644229737,zoom:15}},{slug:"hayes-valley-san-francisco",vibe:[1106,2119],map:{lat:37.7759073,lng:-122.4245247,zoom:15},radius:"0.3",name:"Hayes Valley",location:{latitude:37.7759073,longitude:-122.4245247,zoom:15}},{slug:"marina-san-francisco",vibe:[1782,1701,1687],map:{lat:37.8036667,lng:-122.4368151,zoom:15},radius:"0.3",name:"Marina",location:{latitude:37.8036667,longitude:-122.4368151,zoom:15}},{slug:"bay-view",vibe:[1070,1067,1076],map:{lat:37.73465859016705,lng:-122.3908183862915,zoom:15},radius:"0.3",name:"Bayview",location:{latitude:37.73465859016705,longitude:-122.3908183862915,zoom:15}},{slug:"japantown",vibe:[1060,1103,1106,1109,1064],map:{lat:37.7854135,lng:-122.429383,zoom:14},radius:"0.3",name:"Japantown",location:{latitude:37.7854135,longitude:-122.429383,zoom:14}},{slug:"north-beach",vibe:[],map:{lat:37.80035660509935,lng:-122.41009506560668,zoom:15},radius:"0.3",name:"North Beach",location:{latitude:37.80035660509935,longitude:-122.41009506560668,zoom:15}},{slug:"haight-ashbury-san-francisco",vibe:[1103,1106],map:{lat:37.7692204,lng:-122.4481393,zoom:15},radius:"0.3",name:"Haight-Ashbury",location:{latitude:37.7692204,longitude:-122.4481393,zoom:15}},{slug:"chinatown-vancouver",vibe:[1073,1070,1067],map:{lat:49.2801149,lng:-123.1058197,zoom:13},radius:"0.3",name:"Chinatown",location:{latitude:49.2801149,longitude:-123.1058197,zoom:13}},{slug:"chinatown",vibe:[1100,2116,1067],map:{lat:37.7941378,lng:-122.4077914,zoom:16},radius:"0.3",name:"Chinatown",location:{latitude:37.7941378,longitude:-122.4077914,zoom:16}},{slug:"koreatown-northgate",vibe:[3008,1064,5690,3018,1906],map:{lat:37.809589965684175,lng:-122.26953311691895,zoom:16},radius:"0.4",name:"Koreatown Northgate",location:{latitude:37.809589965684175,longitude:-122.26953311691895,zoom:16}}],badges=[{slug:"downtown-portland-summer-challenge",status:"publish",vibe:[],badge_family:[],key:"downtown-portland-summer-challenge",description:"<p>Unlock prizes and embrace local adventures while you explore Downtown Portland this summer.</p>\n",has_location:!0,map:{address:"Downtown Portland, Portland, OR, USA",lat:45.5173454,lng:-122.6835562,city:"Portland",name:"Portland Downtown",zoom:14},icon:{url:"https://vibemap.wpengine.com/wp-content/uploads/2020/06/Vibemap_City_Portland-17.jpg",icon:"https://vibemap.wpengine.com/wp-includes/images/media/default.png"},name:"Downtown Portland Summer Challenge",location:{ID:1441,post_title:"Portland",post_name:"portland"}},{slug:"downtown-oakland-summer-challenge",status:"publish",vibe:[],badge_family:[],key:"downtown-oakland-summer-challenge",description:"<p>Unlock prizes and embrace local adventures while you explore Downtown Oakland this summer. This challenge runs now through August 21st, 2023!</p>\n",has_location:!0,map:{address:"Oakland, CA, USA",lat:37.8043514,lng:-122.2711639,city:"Oakland",name:"Oakland",zoom:14},icon:{url:"https://vibemap.wpengine.com/wp-content/uploads/2023/05/Downtown-Oakland-Challenge_Badge-01-3.jpg",icon:"https://vibemap.wpengine.com/wp-includes/images/media/default.png"},name:"Downtown Oakland Summer Challenge",location:{ID:1447,post_title:"Oakland",post_name:"oakland"}},{slug:"art-about-town-treasure-hunt-general",status:"publish",vibe:[],badge_family:[],key:"art-about-town-treasure-hunt-general",description:"<p>Grab your map, don your artistic spirit, and let the exploration begin!</p>\n",has_location:!0,icon:{url:"https://vibemap.wpengine.com/wp-content/uploads/2023/05/Art-About-Town-Treasure-Hunt-Badge-Vibemap-Small.jpg",icon:"https://vibemap.wpengine.com/wp-includes/images/media/default.png"},name:"Art About Town Treasure Hunt ",location:{ID:1447,post_title:"Oakland",post_name:"oakland"}},{slug:"art-about-town-treasure-hunt-2",status:"publish",vibe:[],badge_family:[],key:"art-about-town-treasure-hunt-2",description:"<p>Grab your map, don your artistic spirit, and let the exploration begin!</p>\n",has_location:!0,icon:{url:"https://vibemap.wpengine.com/wp-content/uploads/2023/05/Art-About-Town-Treasure-Hunt-Badge-East-Bay-Small.jpg",icon:"https://vibemap.wpengine.com/wp-includes/images/media/default.png"},name:"Art About Town Treasure Hunt East Bay",location:{ID:1447,post_title:"Oakland",post_name:"oakland"}},{slug:"art-about-town-treasure-hunt-berkeley",status:"publish",vibe:[],badge_family:[],key:"art-about-town-treasure-hunt-berkeley",description:"<p>Grab your map, don your artistic spirit, and let the exploration begin!</p>\n",has_location:!0,icon:{url:"https://vibemap.wpengine.com/wp-content/uploads/2023/05/Art-About-Town-Treasure-Hunt-Badge-Berkeley-Small.jpg",icon:"https://vibemap.wpengine.com/wp-includes/images/media/default.png"},name:"Art About Town Treasure Hunt Berkeley",location:{ID:1447,post_title:"Oakland",post_name:"oakland"}},{slug:"art-about-town-treasure-hunt",status:"publish",vibe:[],badge_family:[],key:"art-about-town-treasure-hunt",description:"<p>Grab your map, don your artistic spirit, and let the exploration begin!</p>\n",has_location:!0,icon:{url:"https://vibemap.wpengine.com/wp-content/uploads/2023/05/Art-About-Town-Treasure-Hunt-Badge-Oakland-Small.jpg",icon:"https://vibemap.wpengine.com/wp-includes/images/media/default.png"},name:"Art About Town Treasure Hunt Oakland",location:{ID:1447,post_title:"Oakland",post_name:"oakland"}},{slug:"56132",status:"publish",vibe:[],badge_family:[],key:"56132",description:"<p>Explore Downtown San Jose and Win Prizes.</p>\n",has_location:!0,icon:{url:"https://vibemap.wpengine.com/wp-content/uploads/2023/03/50932693_10161385073470364_2256098350099070976_n.jpg",icon:"https://vibemap.wpengine.com/wp-includes/images/media/default.png"},name:"San Jose Downtown Challenge",location:{ID:55524,post_title:"San Jose",post_name:"san-jose"}},{slug:"open-peoria",status:"publish",vibe:[],badge_family:[],key:"open-peoria",description:"<p>Check in with Vibemap once to enter the Open Peoria Challenge and earn a FREE Vibemap mug.</p>\n<p>&nbsp;</p>\n<p>Check in five times to be entered into a raffle to win a special Discover Peoria Vibemap prize!</p>\n<p>&nbsp;</p>\n<p>Pick up your free mug from Noah on Tuesday at the Peoria Civic Center.</p>\n",has_location:!0,icon:{url:"https://vibemap.wpengine.com/wp-content/uploads/2023/01/Discover-Peoria.jpg",icon:"https://vibemap.wpengine.com/wp-includes/images/media/default.png"},name:"Open Peoria",location:{ID:52306,post_title:"Peoria",post_name:"peoria"}},{slug:"dvbia",status:"publish",vibe:[],badge_family:[],key:"dvbia",description:"<p>Unlock specials and win prizes by joining the downtown Vancouver Neighborhood Challenge</p>\n",has_location:!0,icon:{url:"https://vibemap.wpengine.com/wp-content/uploads/2023/03/Vancouver-01.jpg",icon:"https://vibemap.wpengine.com/wp-includes/images/media/default.png"},name:"downtown Vancouver Neighbourhood Challenge",location:{ID:1435,post_title:"Vancouver",post_name:"vancouver"}},{slug:"52322",status:"publish",vibe:[],badge_family:[],key:"52322",description:"",has_location:!1,icon:{url:"https://vibemap.wpengine.com/wp-content/uploads/2022/07/knowledge.jpg",icon:"https://vibemap.wpengine.com/wp-includes/images/media/default.png"},name:"Know it All"}],badges$1={badges:badges};axiosRetry__default.default(Axios__default.default,{retries:3,retryDelay:axiosRetry__default.default.exponentialDelay,onRetry:(e,a,t)=>{console.log("Axios retrying: ",e,a,t)}});const axios=Axios__default.default,jsonpack=(dayjs__default.default.extend(isBetween__default.default),dayjs__default.default.extend(dayjsRecur__default.default),__webpack_require__(/*! jsonpack */ "./node_modules/jsonpack/main.js"));let activityCategories={},categories_flat=[];const getAPIDomain=(e=null)=>{var a=process.env.API_ENV,e=e||a||"production";return"production"===e?"https://api.vibemap.com":"staging"===e?"https://staging.api.vibemap.com":"http://localhost:9000"},api_domain=getAPIDomain(),api_version="v0.3",ApiUrl=`${api_domain}/${api_version}/`,filterList=(e=[{test:"test",value:"foo"},{test:"test",value:"bar"}],a="food",t="value")=>{const o=new RegExp(a.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g,"\\$&"),"i");return e.filter(e=>(e=>o.test(e[t]))(e))},getRandomItem=e=>{return e[Math.floor(Math.random()*e.length)]},encodeCardIndex=(e,a)=>{return e+a/10},matchLists=(e,a)=>{let t=0;return t=0<e.length&&0<a.length?e.filter(e=>a.includes(e)).length:t},rankVibes=(e,t)=>{let a=[];return(a=e.map(e=>{let a=0;return a=t.includes(e)?t.length-t.indexOf(e):a})).reduce((e,a)=>e+a,0)/t.length},sortByKey=(e,a)=>(console.log("sortByKey (a, b)",e,a),e),sortByPopularity=(e,a)=>{e=parseInt(e.details.msv||2);return parseInt(a.details.msv||2)-e};try{const V=__webpack_require__(/*! ../dist/activityCategories.zip.json */ "./node_modules/vibemap-constants/dist/activityCategories.zip.json");activityCategories={activityCategories:jsonpack.unpack(V)},categories_flat=activityCategories.activityCategories.sort(sortByPopularity).map(e=>e.name.toLowerCase())}catch(e){console.log("Error with packed activityCategories ",e)}const sortByArray=(e,t)=>e.sort((e,a)=>t.indexOf(e)-t.indexOf(a)),isClosedToday=e=>"00:00:00"===e.opens&&"00:00:00"===e.closes,displayHours=(t,o="dd")=>{var a=isOpen(t),i=t.find(({day_of_week:e})=>8===e);if(a.openEveryday){let e=[];a=dayjs__default.default(a.opens).format("ha")+"-"+dayjs__default.default(a.closes).format("ha"),a=(e.push(a),t.find(e=>"POPULAR"==e.name));return console.log("Popular at: ",a),e}let n=0,r=[];for(;n<7;){let e=t.find(e=>e.day_of_week==n),a=(t.find(e=>e.day_of_week==n&&"POPULAR"==e.name),!1);if(void 0!==e&&(a=isClosedToday(e)),void 0===e||a)if(a||void 0===i)r.push({day_of_week:n,closed:!0});else{let e=Object.assign({},i);e.day_of_week=n,r.push(e)}else e.closed=!1,r.push(e);n++}return r.map(e=>{var a,t=(e.day_of_week+1)%7;return!0===e.closed?dayjs__default.default().day(t).format(o)+": Closed":(a=e.opens.split(":"),e=e.closes.split(":"),dayjs__default.default().day(t).format(o)+": "+dayjs__default.default().hour(a[0]).minute(a[1]).format("ha")+"-"+dayjs__default.default().hour(e[0]).minute(e[1]).format("ha"))})},isOpen=(e,a=dayjs__default.default())=>{const t=a.day();var o=a.format("YYYY-MM-DD");if(a.hour(),!e)return{openNow:!1,openToday:!1,isPopular:!1};let i=e.find(({day_of_week:e})=>e===t);var n=e.find(({day_of_week:e})=>8===e),e=e.filter(e=>isClosedToday(e)),e=void 0!==n&&0==e.length;if(i=void 0===i?n:i){const r=dayjs__default.default(o+" "+i.opens),l=dayjs__default.default(o+" "+i.closes);n=a.isBetween(r,l),o=n&&"POPULAR"===i.name;return r.format("ha"),l.format("ha"),{openNow:n,openToday:!0,openEveryday:e,opens:r,closes:l,isPopular:o}}return{openNow:!1,openToday:!1,openEveryday:!1,isPopular:!1}},parseDateTime=e=>{return e?dayjs__default.default(e):null},formatDateTime=(e,a=0,t=!1)=>{var o,i,n;return e?(o=(e="string"==typeof e?parseDateTime(e):e).format("MMM"),i=e.format("D"),n=e.format("ddd"),`${t?n:null} ${o} ${i} `+e.format("ha")):null},getCardOptions=a=>{let{categoryQuery:e,distanceQuery:t,geoQuery:o,searchQuery:i,vibeQuery:n}=a.singCards.posts[0];a.overrideQuery&&a.overrideQuery.vibe&&(n=a.overrideQuery.vibe),a.overrideQuery&&a.overrideQuery.cities&&0<a.overrideQuery.cities.length&&(r=cities.filter(e=>e.slug===a.overrideQuery.cities[0]),o=o||r[0].location,t=t||7),a.overrideQuery&&a.overrideQuery.location&&(o=a.overrideQuery.location,t=a.overrideQuery.distance||t),o||(r=cities.filter(e=>"oakland"===e.slug),o=r[0].location);var r=(n="string"==typeof n?n.replace(/\s/g,"").split(","):n)?n.map(e=>"string"==typeof e?e:e.slug):[];return{category:e,distance:t,point:o.longitude+","+o.latitude,ordering:"vibe",search:i,vibes:r}},getAPIParams=(e,a=150,t=!1)=>{let{activity:o,distance:i,point:n,vibes:r}=e,l=Object.assign({},e),s=1;0<i&&(s=Math.round(i*constants.METERS_PER_MILE)),l.ordering=e.ordering||"-aggregate_rating",l.per_page=a;var a=n.split(","),u=a[1],a=a[0];return l.activity&&(l.categories=o),l.tags&&(l["tags.raw__in"]=tags,delete l.tags),l.vibes&&(l[":vibes.raw__in"]=r,delete l.vibes),l.category&&(l.categories="string"==typeof l.category?l.category.toLowerCase().split():l.category),l.distance&&(l.location__geo_distance=s+`m__${u}__`+a,delete l.distance),l.search&&0<l.search.length&&("east bay open studios".includes(l.search)&&(l.editorial_category="EastBayOpenStudios"),delete l.ordering,delete l[":vibes.raw__in"]),l.editorial_category&&(u=l.editorial_category,l["editorial_categories.raw__wildcard"]=`*${u}*`,delete l.editorial_category),l.is_chain=e.is_chain||!1,l.is_closed=e.is_closed||!1,l.is_destination=e.is_destination||!1,l.city&&(l["city.raw__contains"]=l.city,delete l.city),l.per_page&&(l.page_size=l.per_page,delete l.per_page),"all"!==o&&null!==o&&(l.category=o),l.dist=s,delete l.activity,delete l.distance,delete l.bounds,null==l.city&&delete l.city,null!=l.category&&"all"!=l.category&&0!=l.category.length||delete l.category,null==l.editorial_category&&delete l.editorial_category,null==l.search&&delete l.search,null!=l.vibes&&0!=l.vibes.length||delete l.vibes,0==t&&delete l.relatedVibes,l},getCategoryMatch=(e=["all"])=>{const a=activityCategories.activityCategories.map(e=>e.slug);let t=[];return e.map(e=>(a.includes(e)&&t.push(e),!0)),t},getFullLink=(e,a="instagram")=>{if(null===e||""===e)return null;const t=o.parse(e);let o=new URL(e);e=t.path.replace("/","");return{instagram:"https://instagram.com/",twitter:"https://twitter.com/",facebook:"https://facebook.com/"}[a]+e},geLocationFromCity=e=>{return e.cityDetails?e.cityDetails.placemarker:e.location||null},getMax=(e,a)=>{let t=0;return e.forEach(e=>{e=e.properties[a];e>t&&(t=e)}),t},getMin=(e,a)=>{let t=100;return e.forEach(e=>{e=e.properties[a];e<t&&(t=e)}),t},getTimeOfDay=e=>{if(e&&e.isValid())return e=parseFloat(e.format("HH")),12<=e&&e<=17?"afternoon":17<=e?"evening":"morning"},getTopLocations=(e,t="city",a=!1)=>{let o={};e.map(e=>{const a=e.properties[t];return null!=a&&"null"!=a&&(e=a.split(",")[0],o.hasOwnProperty(a)?o[e]+=1:o[e]=1),null});var i,n=[];for(i in o)n.push([i,o[i]]);let r=n.sort(function(e,a){return a[1]-e[1]});return a?r.map(e=>e[0]):r},getTopTags=(e,a=!1)=>{let t={};e.map(e=>(e.properties.tags.map(e=>(t.hasOwnProperty(e)?t[e]+=1:t[e]=1,null)),null));var o,i=[];for(o in t)i.push([o,t[o]]);let n=i.sort(function(e,a){return a[1]-e[1]});return a?n.map(e=>e[0]):n},getTopVibes=(e,a=!1)=>{let t={};e.map(e=>(e.properties.vibes.map(e=>(t.hasOwnProperty(e)?t[e]+=1:t[e]=1,null)),null));var o,i=[];for(o in t)i.push([o,t[o]]);let n=i.sort(function(e,a){return a[1]-e[1]});return a?n.map(e=>e[0]):n},getTopCategories=(e,a="categories")=>{let t={};e.map(e=>(e.properties[a].map(e=>(t.hasOwnProperty(e)?t[e]+=1:t[e]=1,null)),null));var o,i=[];for(o in t)i.push([o,t[o]]);return i.sort(function(e,a){return a[1]-e[1]})},getWaveFromVibe=e=>"buzzing"!==e?"medium":"high",graphToEvents=(e=[])=>{return e.map(e=>{e=e.node;const a=e.groupDetails;var t=a.name,o=a.link,e=e.slug,i=a.description,n=a.image?a.image.url:null,n=[{url:n,original:n}],r=a.map,l=a.price||"free",s=a.vibes?a.vibes.map(e=>e.slug):[],u=(a.recurring,a.recurrence),c=a.which,d=a.day.value,g=a.startTime||"00:00",p=a.startTime?a.endTime:"00:00";const m=nextDateFromRecurring(u,d,c);u=dayjs__default.default(m.next(1).toLocaleString().replace("00:00:00",g)),d=dayjs__default.default(m.next(1).toLocaleString().replace("00:00:00",p));return{id:e,title:t,geometry:{type:"Point",coordinates:[-122.26747099999956,37.81396520000001]},dateTime:u,image:n,card_type:"event",properties:{name:t,title:t,url:o,address:r&&r.streetAddress,categories:[],city:a.cities&&a.cities[0].slug,description:i,is_online:!1,images:[],hotspots_place:r,location:r,start_date:u,end_date:d,vibemap_images:n,likes:10,price:l,recurs:!0,vibes:s}}})},groupsToEvents=(e=[])=>{return e.map(e=>{const a=e.acf;var t=a.name,o=a.link,e=e.slug,i=a.description,n=a.image&&a.image.url,n=n?[{url:n,original:n}]:[],r=a.map,l=a.price||"free",s=a.vibes?a.vibes.map(e=>e.slug):[],u=(a.recurring,a.recurrence),c=a.which,d=a.day&&a.day.label?a.day.label:"sunday",g=a.start_time||"00:00",p=a.end_time||"00:00";const m=nextDateFromRecurring(u,d,c),_=dayjs__default.default(m.next(1).toLocaleString().replace("00:00:00",g)),b=dayjs__default.default(m.next(1).toLocaleString().replace("00:00:00",p));return{id:e,title:t,geometry:{type:"Point",coordinates:[-122.26747099999956,37.81396520000001]},dateTime:_.toISOString(),image:n,card_type:"event",properties:{name:t,title:t,url:o,address:r&&r.streetAddress,categories:[],city:a.cities&&a.cities[0].slug,description:i,is_online:!1,images:n,hotspots_place:r,location:r,start_date:_.toISOString(),end_date:b.toISOString(),vibemap_images:n,likes:10,price:l,recurs:!0,vibes:s}}})},normalize=(e,a,t)=>(e-a)/(t-a)*10,normalize_all=(e=500,a=1,t=100,o=1,i=10)=>{const n=LinearScale__default.default().domain([a,t]).range([o,i]);return n(e)},scaleIconSize=(e=5,a=1,t=100)=>{const o=LinearScale__default.default().domain([a,t]).range([1,5]);return o(e)},scaleMarker=(e=50,a,t=100,o=14)=>{isNaN(e)&&(e=3.5);const i=LinearScale__default.default().domain([8,20]).range([10,30]);var o=i(o),n=3*o;let r=LinearScale__default.default().domain([0,t]).range([o,n]);return Math.round(r(e))},scaleDensityArea=(e=10,a)=>{let t=LinearScale__default.default().domain([1,60,1e3]).range([0,.8,1]);return t(e)},scaleDensityBonus=e=>{let a=LinearScale__default.default().domain([0,1]).range([2*constants.HEATMAP_INTENSITY,constants.HEATMAP_INTENSITY]);return a(e)},scaleScore=(e=2)=>{let a=LinearScale__default.default().domain([0,5]).range([60,100]);return Math.round(a(e))},scaleSelectedMarker=e=>{let a=LinearScale__default.default().domain([8,12,20]).range([.1,1.2,4]);return Math.round(a(e))},getEventOptions=(a="oakland",e="quarter",t=10,o=null,i=[],n)=>{const r=cities.concat(neighborhoods);var l=r.filter(e=>e.slug===a),l=l?l[0].location:cities[0];const s=dayjs__default.default();var u=s.day()+1;s.startOf("day");let c=0,d=0;switch(e){case"day":d=1;break;case"weekend":d=7-u;break;case"next_week":c=8-u,d=7;break;case"month":const _=s.endOf("month");d=_.diff(s,"day");break;case"quarter":d=90}let g=s.add(c,"day").startOf("day"),p=s.add(d,"day").endOf("day"),m={activity:o,category:o,distance:t,point:l.longitude+","+l.latitude,ordering:"-score_combined",start_date_after:g.format("YYYY-MM-DD HH:MM"),end_date_before:p.format("YYYY-MM-DD HH:MM"),search:n,vibes:i};return null!=m.category&&"all"!=m.category&&0!=m.category.length||delete m.category,null==m.search&&delete m.search,null!=m.vibes&&0!=m.vibes.length||delete m.vibes,m},fetchEvents=async(e={distance:20,point:"-122.269994,37.806507"},a=!1,t=!1)=>{let{category:o,days:i,point:n,search:r}=e;var l=n.split(",").map(e=>parseFloat(e)),l=map.getLocationFromPoint(l),a=(dayjs__default.default().startOf("day").format("YYYY-MM-DD HH:MM"),dayjs__default.default().add(i,"days").format("YYYY-MM-DD HH:MM"),a&&o&&(e.search=`${o||""} `+(r||"")),map.sortLocations(cities,l)),l=a&&0<a.length?a[0].name:null,a=module.exports.getAPIParams(e),e=querystring__default.default.stringify(a),a=ApiUrl+"search/events",s=(console.log("DEBUG Search Events API endpoint: ",a,e),axios.CancelToken.source());let u=await axios.get(a+"?"+e,{cancelToken:s.token}).catch(function(e){return console.log("Axios error ",e.response&&e.response.statusText),{data:[],count:0,top_vibes:null,loading:!1,timedOut:!1}});if(t){a=await wordpress.getGroups({city:l||""});const c=groupsToEvents(a.data);u.data.results.features=c.concat(u.data.results.features)}return u},nextDateFromRecurring=(...[e,a,t])=>{const o=dayjs__default.default();t=["first","second","third","fourth","fifth"].indexOf(t),t=0<t?t:0;return"monthly"==e?o.recur().every(a).daysOfWeek().every([t]).weeksOfMonthByDay():o.recur().every(a).daysOfWeek()},fetchPlacesDetails=async(e,a="place")=>{var t=axios.CancelToken.source();let o;if("event"==a&&(o=ApiUrl+"events/"),o="place"==a?ApiUrl+"places/":o)return await axios.get(""+o+e,{cancelToken:t.token}).catch(function(e){return console.log("axios error ",e&&e.statusText),null})},fetchPlacePicks=async(a={distance:5,point:"-123.1058197,49.2801149",ordering:"-score_combined",tags:[],vibes:["chill"],preferredVibes:[],relatedVibes:[]})=>{let{activity:e,ordering:t,per_page:o,point:i,vibes:n,preferredVibes:r,relatedVibes:l,useNearest:s=!1}=a;const u=o||100;var c=n&&0<n.length,d=i.split(",").map(e=>parseFloat(e)),g=map.getLocationFromPoint(d),p=map.sortLocations(cities,g),g=map.distanceBetweenLocations(p[0].location,g);if(s&&g<20){const v=p[0];a.point=v.centerpoint.join(",")}const m=ApiUrl+"search/places",_=axios.CancelToken.source();let b={};g=async e=>{e=getAPIParams(e,u);let a=querystring__default.default.stringify(e);return console.log("Places search query is ",m+"?"+a),b=await axios.get(m+"?"+a,{cancelToken:_.token}).catch(function(e){return console.log("axios error ",e.response&&e.response.statusText),{data:[],count:0,query:"?"+a,top_vibes:null,loading:!1,timedOut:!1}}),console.log("Got response ",b),b},p=(b=await g(a)).data.count;if(0==p&&c){let e=Object.assign({},a);e.search=n[0],e.vibes=[],b=await g(e)}c=b.data&&b.data.results&&b.data.results.features?b.data.results.features:[],g=formatPlaces(c);const f=n||[];var c=f.concat(r||[]),h={...a,relatedVibes:l},d=scorePlaces(g,d,c,["aggregate_rating","vibes","distance","offers","hours"],t,!(!a||!a.shouldShuffle)&&a.shouldShuffle,h),c=getTopCategories(g),a=getTopTags(g),h=getTopVibes(g);return{data:d,count:p,top_categories:c,top_locations:getTopLocations(g),top_tags:a,top_vibes:h,loading:!1,timedOut:!1}},fetchPlacesFromSearch=async e=>{const a=new URLSearchParams([["query",""],["latitude",e.latitude],["longitude",e.longitude]]);return await axios.get("https://dev.vibemap.com/search_places?"+a.toString()).catch(function(e){return console.log("axios error ",e.response&&e.response.statusText),{data:[],count:0,query:"?",top_vibes:null,loading:!1,timedOut:!1}})},fetchPlacesFromIds=async(e=["740b43a4-3925-4413-9414-fff9d8d16932","c8262c66-1a83-4d4b-a3e6-8710864ffd1f"])=>{var a=ApiUrl+"/search/places",e=(params=new URLSearchParams([["ids",e.join("__")]]),await axios.get(a+"?"+params.toString()).catch(function(e){return console.log("axios error ",e.response&&e.response.statusText),{data:[],error:e,count:0,query:"?"+params,top_vibes:null,loading:!1,timedOut:!1}})),a=e.data.count;return{data:e.data&&e.data.results&&e.data.results.features?e.data.results.features:[],count:a,loading:!1,timedOut:!1}},decodePlaces=e=>{return e.map(e=>(e.properties.vibes=JSON.parse(e.properties.vibes),e.properties.subcategories=JSON.parse(e.properties.subcategories),e.properties.categories=JSON.parse(e.properties.categories),e.properties.vibemap_images=[],e.properties.images=[e.properties.thumbnail_url],null!=e.properties.opening_hours&&(e.properties.opening_hours=JSON.parse(e.properties.opening_hours)),delete e.properties.tips,delete e.properties.facebook,delete e.properties.telephone,delete e.properties.website,e))},formatPlaces=(e=[])=>{const i=categories_flat,n=vibes.getCategoriesByLevel(2).map(e=>e.slug);return e.map(e=>{if(!e)return null;let a=e.properties;a.place_type="places",a.short_name=truncate__default.default(a.name,constants.TRUCATE_LENGTH),a.aggregate_rating=parseFloat(a.aggregate_rating),null==a.aggregate_rating_count&&(a.aggregate_rating_count=1),a.num_vibes=a.vibes.length,a.sub_categories=a.sub_categories,a.top_vibe=null;var t=a.categories.map(e=>(e="Drink"==e?"Drinking":e).toLowerCase()).filter(e=>n.includes(e.toLowerCase())),t=sortByArray(t,i),o=(void 0!==a.categories&&0!==a.categories.length||(a.categories=["place"]),t[0]||"dot");return a.icon=t[0]?`icon_${o}_light`:o,a.cluster=null,e.properties=a,e}).filter(Boolean)},vibesFromPlaces=e=>{return[]},getRecommendedVibes=e=>{return[]},scorePlaces=(e,u,c=[],d=["vibes","aggregate_rating","distance"],a,t=!0,o=12,g={})=>{let p={};let m={};d.map(e=>p[e]=1e-5),d.map(e=>m[e]=1/0);o=o<=10?10:o,o=normalize_all(o,10,20,0,10);let n={category:0,vibe:10,distance:8/(1+7*Math.exp(1)**(-.7*o)),rating:4,hours:0,offers:0};"relevance"!==a&&(n[a]+=3);const i=e.map(e=>{let t=e.properties;if(t.stats={},d.includes("vibes")){let[e,a]=[0,0];void(t.vibes_score=0)===t.vibes&&(t.vibes=["chill"]);var i=0<t.vibes.length?2*Math.log10(t.vibes.length):0;0<t.vibes.length&&(t.vibes_score=i),t.images&&0<t.images.length&&(a+=0<t.images.length?2*Math.log10(t.images.length):0),c&&0<c.length&&t.vibes&&(i=10*(e=matchLists(c,t.vibes))+2*(g.relatedVibes?matchLists(g.relatedVibes,t.vibes):0),o=+rankVibes(c,t.vibes),a+=i+o,t.vibes_score+=a,t.stats.num_vibes=t.vibes.length,t.stats.num_matching_vibes=e,t.stats.vibe_match_score=i,t.stats.vibe_order_score=o),t.vibes_score>p.vibes&&(p.vibes=t.vibes_score),t.vibes_score<m.vibes&&(m.vibes=t.vibes_score),t.stats.total_vibe_score=t.vibes_score}if(d.includes("categories")){i=[0][0];t.categories_score=0;const l=t.categories.concat(t.subcategories),s=l.filter((e,a)=>l.indexOf(e)==a);if(0<t.categories.length&&(t.categories_score=t.categories.length),0<c.length){let o=[];s.forEach(a=>{var e=constants.place_sub_categories.filter(e=>e.main_category.includes(a)),t=constants.place_sub_categories.filter(e=>e.name.includes(a));0<e.length&&(o=o.concat(e[0].vibes)),0<t.length&&(o=o.concat(t[0].vibes))});i=matchLists(c,o);t.categories_score+=10*i}t.categories_score>p.categories&&(p.categories=t.categories_score),t.categories_score<m.categories&&(m.categories=t.categories_score)}var o,a,n,r;return d.includes("likes")&&(t.likes>p.likes&&(p.likes=t.likes),t.likes<m.likes&&(m.likes=t.likes)),d.includes("distance")&&(o=turf__namespace.point(e.geometry?e.geometry.coordinates:[0,0]),t.distance=turf_distance__default.default(u,o),t.distance>p.distance&&(p.distance=t.distance),t.distance<m.distance&&(m.distance=t.distance)),d.includes("aggregate_rating")&&(t.aggregate_rating>p.aggregate_rating&&(p.aggregate_rating=t.aggregate_rating),t.aggregate_rating<m.aggregate_rating&&(m.aggregate_rating=t.aggregate_rating),null==m.aggregate_rating_count&&(m.aggregate_rating_count=1,p.aggregate_rating_count=1),t.aggregate_rating_count>p.aggregate_rating_count&&(p.aggregate_rating_count=t.aggregate_rating_count),t.aggregate_rating_count<m.aggregate_rating_count&&(m.aggregate_rating_count=t.aggregate_rating_count)),t.offers_score=0,t.hours_score=0,d.includes("offers")&&(t.offers&&0<t.offers.length&&(t.offers_score=2),{openNow:i,openToday:o,opens:a,closes:n,isPopular:r}=isOpen(t.opening_hours),t.open_now=i,t.popular_now=r,t.opens=a,t.closes=n,o&&(t.hours_score+=.5),i&&(t.hours_score+=.5),r&&(t.hours_score+=5)),t.stats.hours_bonus=t.hours_score,e.properties=t,e});let r=0,l=1/0,s=i.map(e=>{let a=e.properties;d.includes("vibes")&&(a.vibes_score=normalize_all(a.vibes_score,m.vibes,p.vibes,0,1),a.vibes_score=a.vibes_score*n.vibe),d.includes("categories")&&(a.categories_score=normalize_all(a.categories_score,m.categories,p.categories,0,1),a.categories_score=a.categories_score*n.category),d.includes("likes")&&(a.likes_score=normalize_all(a.likes,m.likes,p.likes,0,1)),d.includes("venue")&&(a.venue_score=normalize_all(a.place_vibe_count,m.likplace_vibe_countes,p.place_vibe_count,0,1)),d.includes("aggregate_rating")&&(i=normalize_all(a.aggregate_rating,m.aggregate_rating,p.aggregate_rating,0,1),t=normalize_all(a.aggregate_rating_count,m.aggregate_rating_count,p.aggregate_rating_count,0,1),a.aggregate_rating_score=(i+t)/2,a.aggregate_rating_score*=n.rating,a.stats.aggregate_rating_score=a.aggregate_rating_score),d.includes("distance")&&(i=p.distance,a.distance_score=1-normalize_all(a.distance,m.distance,i,0,.95),a.distance_score*=n.distance,a.stats.distance_score=a.distance_score),d.includes("hours")&&(a.hours_score*=n.hours);var t=d;const o=d.map(e=>a[e+"_score"]);var i=o.indexOf(Math.max.apply(null,o));return o.indexOf(Math.min.apply(null,o)),a.average_score=o.reduce((e,a)=>e+a,0)/o.length,a.average_score>r&&(r=a.average_score),a.average_score<l&&(l=a.average_score),a.reason=t[i],e.properties=a,e});const _=s.sort((e,a)=>a.properties.average_score-e.properties.average_score);o=_.map(e=>{let a=e.properties;return a.average_score=normalize_all(a.average_score,l,r,.65,1),a.icon_size=scaleIconSize(a.average_score,.65,1),a.stats.final_score_normalized=a.average_score,e}),a=o.length;return t&&100<a?module.exports.shuffleTopPicks(o):o},reducePlaceProperties=(e,t=["name","url","address","categories","subcategories","neighborhood","price","short_description","vibemap_images","vibes"])=>{return e.map(a=>(a.properties=Object.fromEntries(t.map(e=>[e,a.properties[e]])),a))},shuffleTopPicks=(e,a=20)=>{const t=e.slice(0,a).map(e=>({value:e,sort:Math.random()})).sort((e,a)=>e.sort-a.sort).map(({value:e})=>e);e=e.slice(a);return t.concat(e)},toTitleCase=e=>{if("string"!=typeof e)return e;e=e.toLowerCase().split(" ");for(var a=0;a<e.length;a++)e[a]=e[a].charAt(0).toUpperCase()+e[a].slice(1);return e.join(" ")},nearest_places=(e,o,i=5)=>{var n=[],e=(e.map(e=>{let a=e.properties;var t=turf__namespace.point(e.geometry.coordinates);a.distance=turf_distance__default.default(o,t),a.distance<i&&n.push(e)}),n.slice(0));return e.sort(function(e,a){return e.properties.distance-a.properties.distance}),e},validate_check_in=(e,a,t=.5)=>{e=turf__namespace.point(e.geometry.coordinates);return turf_distance__default.default(a,e)<t},in_jls=e=>{var a=turf__namespace.polygon([[[-122.282617,37.802862],[-122.2643,37.795721],[-122.265502,37.787005],[-122.288139,37.796077],[-122.282617,37.802862]]]);return turf_boolean__default.default(e,a)},in_neighborhood=t=>{const o=[],i=[],n=turf__namespace.point(t.geometry.coordinates);return neighborhoods.map(e=>{var a=turf_distance__default.default([e.map.lng,e.map.lat],n);(a<5&&in_bbox_helper(t.geometry.coordinates,e.boundary)||1e-5<e.radius&&a<e.radius||a<.8)&&(o.push(e.id),i.push(e.slug))}),o},in_bbox_helper=(e,a)=>{return""!==a&&void 0!==a&&(a=JSON.parse(a),a=turf__namespace.polygon([a]),turf_boolean__default.default(e,a))},nearest_neighborhood=a=>{const e=neighborhoods.map(e=>({name:e.name,neigh_dist:turf_distance__default.default([e.map.lng,e.map.lat],a)}));return e.sort(function(e,a){return e.neigh_dist-a.neigh_dist}),e.slice(0,10)},challenge_badges_lookup=()=>{const a=[];return badges$1.badges.map(e=>{"neighborhood"==e.type&&a.push(e)}),a},associate_badge=t=>{const e=challenge_badges_lookup(),o=[];return e.map(a=>{console.log(a);for(let e=0;e<t.length;e++)a.location.ID==t[e]&&o.push(a)}),o},searchCities=async(e="")=>{e="https://dev.vibemap.com/search_locations/?city="+e;const a=await axios.get(e).catch(e=>(console.log("error ",e),{error:!0,data:e}));return a.data.map(a=>{var e=cities.find(e=>e.name.includes(a.name));if(e&&map.distanceBetweenLocations(a.location,e.location)<10)return e;return neighborhoods.find(e=>e.name.toLowerCase().includes(a.name.toLowerCase())),a})},searchTags=async(e="art")=>{e=ApiUrl+"/tags/?"+e,e=await axios.get(e).catch(e=>(console.log("error ",e),{error:!0,data:e}));return console.log("tags response ",e.data),e.data},getAllBoundaries=async()=>{return(await axios.get("https://api.vibemap.com/v0.3/boundaries/?admin_level=both").catch(e=>{console.log("error ",e)})).data},getBoundary=async(e="chicago")=>{e="https://api.vibemap.com/v0.3/boundaries/?admin_level=both&slug="+e,e=await axios.get(e).catch(e=>{console.log("error ",e)});if(!e||!e.data)return null;try{return e.data.results[0]||null}catch(e){return console.log("Problem with boundary data ",e),null}},searchPlacesByName=async(e,a)=>{var t=e.point?e.point.split(",").map(parseFloat):"",t={ordering:"name",category:e.category||"",per_page:e.perPage||50,dist:0<e.distance?e.distance*constants.METERS_PER_MILE:"",point:t,search:e.search||"",vibes:e.vibes||"",zoom:e.zoom||""},e=new URLSearchParams(t).toString(),t=await axios.get(a+"/search/places/?"+e).catch(function(e){return console.log("axios error ",e.response&&e.response.statusText),[]});return t.data?t.data.results.features:[]},suggestPlacesByName=async(e,a,t=!1,o=null,i=null,n=null)=>{let r=null!==o&null!==i&t?o.toString()+"__"+i.toString():null;r=n&t?r+`__${n.toString()}km`:r;o=t?a+`/places/suggest/?name_suggest_context=${e}&name_suggest_loc=`+r:a+"/places/suggest/?name_suggest__completion="+e;let l;return(l=await axios.get(o).catch(function(e){return console.log("axios error ",e.response&&e.response.statusText),[]})).data?t?l.data.name_suggest_context[0].options.map(e=>e._source):l.data.name_suggest__completion[0].options.map(e=>e._source):[]},sortNeighborhoodsByVibes=(e,a)=>{if(0===a.length)return e;var t=vibes.getRelatedVibes(a);const i=[...new Set([...a,...t])],o=e.map(e=>{const a=e.vibes||e.acf.vibes,t=a.map(({slug:e})=>e);var o=i.filter(e=>t.includes(e)).length;return{...e,vibeIntersection:o}}),n=o.sort((e,a)=>a.vibeIntersection-e.vibeIntersection);return n.map(e=>{const{vibeIntersection:a,...t}=e;return t})};exports.associate_badge=associate_badge,exports.challenge_badges_lookup=challenge_badges_lookup,exports.decodePlaces=decodePlaces,exports.displayHours=displayHours,exports.encodeCardIndex=encodeCardIndex,exports.fetchEvents=fetchEvents,exports.fetchPlacePicks=fetchPlacePicks,exports.fetchPlacesDetails=fetchPlacesDetails,exports.fetchPlacesFromIds=fetchPlacesFromIds,exports.fetchPlacesFromSearch=fetchPlacesFromSearch,exports.filterList=filterList,exports.formatDateTime=formatDateTime,exports.formatPlaces=formatPlaces,exports.geLocationFromCity=geLocationFromCity,exports.getAPIDomain=getAPIDomain,exports.getAPIParams=getAPIParams,exports.getAllBoundaries=getAllBoundaries,exports.getBoundary=getBoundary,exports.getCardOptions=getCardOptions,exports.getCategoryMatch=getCategoryMatch,exports.getEventOptions=getEventOptions,exports.getFullLink=getFullLink,exports.getMax=getMax,exports.getMin=getMin,exports.getRandomItem=getRandomItem,exports.getRecommendedVibes=getRecommendedVibes,exports.getTimeOfDay=getTimeOfDay,exports.getTopCategories=getTopCategories,exports.getTopTags=getTopTags,exports.getTopVibes=getTopVibes,exports.getWaveFromVibe=getWaveFromVibe,exports.graphToEvents=graphToEvents,exports.groupsToEvents=groupsToEvents,exports.in_bbox_helper=in_bbox_helper,exports.in_jls=in_jls,exports.in_neighborhood=in_neighborhood,exports.isClosedToday=isClosedToday,exports.isOpen=isOpen,exports.matchLists=matchLists,exports.nearest_neighborhood=nearest_neighborhood,exports.nearest_places=nearest_places,exports.normalize=normalize,exports.normalize_all=normalize_all,exports.parseDateTime=parseDateTime,exports.rankVibes=rankVibes,exports.reducePlaceProperties=reducePlaceProperties,exports.scaleDensityArea=scaleDensityArea,exports.scaleDensityBonus=scaleDensityBonus,exports.scaleIconSize=scaleIconSize,exports.scaleMarker=scaleMarker,exports.scaleScore=scaleScore,exports.scaleSelectedMarker=scaleSelectedMarker,exports.scorePlaces=scorePlaces,exports.searchCities=searchCities,exports.searchPlacesByName=searchPlacesByName,exports.searchTags=searchTags,exports.shuffleTopPicks=shuffleTopPicks,exports.sortByArray=sortByArray,exports.sortByKey=sortByKey,exports.sortByPopularity=sortByPopularity,exports.sortNeighborhoodsByVibes=sortNeighborhoodsByVibes,exports.suggestPlacesByName=suggestPlacesByName,exports.toTitleCase=toTitleCase,exports.validate_check_in=validate_check_in,exports.vibesFromPlaces=vibesFromPlaces;
//# sourceMappingURL=helpers.js.map


/***/ }),

/***/ "./node_modules/vibemap-constants/dist/map.js":
/*!****************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/map.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:!0}));var geoViewport=__webpack_require__(/*! @mapbox/geo-viewport */ "./node_modules/@mapbox/geo-viewport/index.js"),Axios=__webpack_require__(/*! axios */ "./node_modules/axios/index.js"),turf=__webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js"),meta=__webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/js/index.js"),clusters=__webpack_require__(/*! @turf/clusters */ "./node_modules/@turf/clusters/dist/js/index.js"),bboxPolygon=__webpack_require__(/*! @turf/bbox-polygon */ "./node_modules/@turf/bbox-polygon/dist/js/index.js"),turf_boolean=__webpack_require__(/*! @turf/boolean-point-in-polygon */ "./node_modules/@turf/boolean-point-in-polygon/dist/js/index.js"),turf_center=__webpack_require__(/*! @turf/center */ "./node_modules/@turf/center/dist/js/index.js"),turf_distance=__webpack_require__(/*! @turf/distance */ "./node_modules/@turf/distance/dist/js/index.js"),turf_truncate=__webpack_require__(/*! @turf/truncate */ "./node_modules/@turf/truncate/dist/js/index.js"),clustersDbscan=__webpack_require__(/*! @turf/clusters-dbscan */ "./node_modules/@turf/clusters-dbscan/dist/js/index.js"),pointsWithinPolygon=__webpack_require__(/*! @turf/points-within-polygon */ "./node_modules/@turf/points-within-polygon/dist/js/index.js"),rhumbBearing=__webpack_require__(/*! @turf/rhumb-bearing */ "./node_modules/@turf/rhumb-bearing/dist/js/index.js"),rhumbDistance=__webpack_require__(/*! @turf/rhumb-distance */ "./node_modules/@turf/rhumb-distance/dist/js/index.js"),rhumbDestination=__webpack_require__(/*! @turf/rhumb-destination */ "./node_modules/@turf/rhumb-destination/dist/js/index.js"),querystring=__webpack_require__(/*! querystring */ "./node_modules/querystring/index.js");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function _interopNamespace(o){if(o&&o.__esModule)return o;var r=Object.create(null);return o&&Object.keys(o).forEach(function(e){var t;"default"!==e&&(t=Object.getOwnPropertyDescriptor(o,e),Object.defineProperty(r,e,t.get?t:{enumerable:!0,get:function(){return o[e]}}))}),r.default=o,Object.freeze(r)}var geoViewport__default=_interopDefaultLegacy(geoViewport),Axios__default=_interopDefaultLegacy(Axios),turf__namespace=_interopNamespace(turf),bboxPolygon__default=_interopDefaultLegacy(bboxPolygon),turf_boolean__default=_interopDefaultLegacy(turf_boolean),turf_center__default=_interopDefaultLegacy(turf_center),turf_distance__default=_interopDefaultLegacy(turf_distance),turf_truncate__default=_interopDefaultLegacy(turf_truncate),clustersDbscan__default=_interopDefaultLegacy(clustersDbscan),pointsWithinPolygon__default=_interopDefaultLegacy(pointsWithinPolygon),rhumbBearing__default=_interopDefaultLegacy(rhumbBearing),rhumbDistance__default=_interopDefaultLegacy(rhumbDistance),rhumbDestination__default=_interopDefaultLegacy(rhumbDestination),querystring__default=_interopDefaultLegacy(querystring);const getMax=(e,t)=>{let o=0;return e.forEach(e=>{e=e.properties[t];e>o&&(o=e)}),o},geocodeAddress=async(e="AIzaSyAJfpSSx6pudnbjILmdUPBG7O4Diu2RHgE",t="Red Bay Coffee Roasers",o=null)=>{const r=new URLSearchParams({address:t,key:e});if(null==e)return{error:!0,data:null,message:"No API key provided."};t="https://vibemap.com/googleGeocoder?"+r.toString()+(o?"&components=locality="+o:""),o=await Axios__default.default.get(t).catch(e=>(console.log("error ",e),{error:!0,data:e})),t=o&&o.data&&o.data.results?o.data.results:null;if(t&&0<t.length&&t[0].place_id){var a=t[0].place_id,e=await getPlaceDetails(e,a);const i=e.data;return!0!==e.error&&(i.id=a,i.source="google",a=i.geometry.location,i.geometry.coordinates=[a.lng,a.lat],i.properties={name:i.name,aggregate_rating:i.rating,address:i.address,telephone:i.formatted_phone_number,tips:i.reviews?i.reviews.map(e=>e.text):[],url:i.url}),{error:!1,data:{place:e.data,results:t}}}return{error:!1,data:{place:null,results:o.data}}},getPlaceDetails=async(e=null,t="ChIJAQDsXLeAj4ARx-92_aeMjX4")=>{if(null==e)return{error:!0,data:null,message:"No API key provided."};const o=new URLSearchParams({key:e,place_id:t});e="https://vibemap.com/googlePlaces?"+o.toString(),t=await Axios__default.default.get(e).catch(e=>(console.log("error ",e),{error:!0,data:null}));if(t.error||null==t.data||!t.data.result)return{error:!0,data:t.data};e=t.data.result;return{error:!1,data:{...e,address:e.formatted_address,url:e.website}}},getPlaceSocial=async(e,t="Vibemap",o="08cefff08b1db59b1")=>{if(null==e)return{error:!0,data:null,message:"No API key provided."};const r=new URLSearchParams({key:e,q:t,cx:o});console.log("Params to strng ",r.toString());e=`GET https://customsearch.googleapis.com/customsearch/v1
        ?${r.toString()} HTTP/1.1`,t=await Axios__default.default.get(e).catch(e=>(console.log("error ",e),{error:!0,data:e}));console.log("Response ",t)},getArea=e=>{return turf_distance__default.default([e[0],e[1]],[e[0],e[3]],{units:"miles"})*turf_distance__default.default([e[0],e[1]],[e[2],e[1]],{units:"miles"})},getBounds=(e,t,o)=>{return geoViewport__default.default.bounds([e.longitude,e.latitude],t,[o.width,o.height],512)},isPointInBounds=(e,t)=>{e=turf__namespace.point(e),t=getPolygon(t);return turf_boolean__default.default(e,t)},getPolygon=e=>{return bboxPolygon__default.default(e)},getClusters=(e,t)=>{e=turf.featureCollection(e);let s=[];e=clustersDbscan__default.default(e,t/1e3,{mutate:!0,minPoints:2});return clusters.clusterEach(e,"cluster",function(e,t){if("null"!==t){let i=turf_center__default.default(e),n=getMax(e.features,"average_score"),l=e.features.length;meta.featureEach(e,function(e,t){let o=e.properties;o.vibes_score;var r=rhumbDistance__default.default(i,e),a=rhumbBearing__default.default(i,e),r=rhumbDestination__default.default(i,2*r,a);o.offset=r.geometry,o.cluster_size=l,o.in_cluster=!0,o.top_in_cluster=!1,o.average_score>=n?o.top_in_cluster=!0:o.icon_size=o.icon_size/2,e.properties=o,s.push(e)})}else meta.featureEach(e,function(e,t){e.properties.in_cluster=!1,e.properties.top_in_cluster=!0,s.push(e)})}),s=s.sort((e,t)=>t.properties.average_score-e.properties.average_score)},getDistance=(e,t)=>{return turf_distance__default.default([e[0],e[1]],[t[0],t[1]],{units:"miles"})},getDistanceToPixels=(e,t)=>{var o=e[0],r=e[1],e=e[2];return turf_distance__default.default([o,r],[e,r],{unit:"miles"})/t.width},getFeaturesInBounds=(t,o)=>{var e=turf.featureCollection(t.map(e=>(e.type="Feature",e))),r=o&&o.flat?o.flat():o;try{var a=bboxPolygon__default.default(r);return pointsWithinPolygon__default.default(e,a).features}catch(e){return console.log("Problem with bounds ",o,e),console.error("Problem with bounds ",o,e),t}},getFeaturesFromSource=(e,t,o=0)=>{var r=!!e&&e.isSourceLoaded,e=e?e.sourceId:null;if(mapRef.current){const i=mapRef.current.getMap();var a=i.getBounds().toArray();return t||r&&"public.places_vt"===e||r&&"places_data"===e||r&&"composite"===e?(t=i.querySourceFeatures("public.places_vt",{sourceLayer:"public.places_vt"}),r=[viewport.longitude,viewport.latitude],placesFromTile(t,"places",a,r,viewport.zoom)):null}},getDirections=async(n,l,s="walking")=>new Promise(function(t,e){var o=`https://api.mapbox.com/directions/v5/mapbox/${s}/`,r=querystring__default.default.stringify({access_token:l,geometries:"geojson",steps:!0,waypoints:[]}),a=n[0],i=n[n.length-1],a=(String(a),String(i),n.join(";"));fetch(o+a+"?"+r).then(e=>e.json()).then(e=>{t({data:e,loading:!1,timedOut:!1})},e=>{console.log(e)})}),getWaypoints=e=>{return e.map(e=>e.geometry.coordinates)},getBestRoute=e=>{e=e.data.routes[0];return{type:"Feature",properties:{distance:e.distance},geometry:{type:"LineString",coordinates:e.geometry.coordinates}}},getLocationFromPoint=(e=[-122.269994,37.806507])=>{return{centerpoint:e,longitude:e[0],latitude:e[1]}},getPointFromLocation=(e={latitude:37.806507,longitude:-122.269994})=>{return[e.longitude,e.latitude]},getMapStyles=()=>({categories:{going_out:"#e31a1c"},lens:{"fill-color":"#007AFF","fill-opacity":.4,"fill-outline-color":"#007AFF"},geolocateStyle:{position:"absolute",right:3,top:100,width:30},navigateStyle:{top:3,right:3},top_marker:{"icon-size":["interpolate",["linear"],["zoom"],8,.4,16,1,22,32]},marker_layout:{"icon-image":["to-string",["get","icon"]],"icon-allow-overlap":!1,"icon-ignore-placement":!1,"icon-size":["interpolate",["linear"],["zoom"],10,["+",["*",["get","average_score"],.4],.2],20,["+",["*",["get","average_score"],.8],.2]],"symbol-sort-key":["get","vibe_score"],"text-size":["interpolate",["linear"],["zoom"],8,4,14,8,20,12],"text-field":["to-string",["get","short_name"]],"text-anchor":"top","text-allow-overlap":!1,"text-ignore-placement":!1,"text-line-height":1,"text-justify":"auto","text-variable-anchor":["top","bottom","right"],"text-font":["Public Sans Regular","Arial Unicode MS Regular"],"text-max-width":10,"text-radial-offset":1.4,visibility:"visible"},marker_paint:{"text-color":"#7D7C84","icon-color":"#3475BA","text-halo-color":"#FFFFFF","text-halo-width":1.2},route_layout:{"line-join":"round","line-cap":"round"},route_paint:{"line-color":"#3887be","line-width":5,"line-opacity":.75},top_pick_layout:{"icon-image":["to-string",["get","icon"]],"icon-size":["interpolate",["linear"],["zoom"],8,.4,22,1.6],"symbol-sort-key":["get","vibe_score"],"text-field":["match",["get","top_in_cluster"],["false"],"",["to-string",["get","short_name"]]],"text-allow-overlap":!1,"icon-allow-overlap":!1,"icon-ignore-placement":!1,"text-ignore-placement":!1,"text-radial-offset":["interpolate",["linear"],["zoom"],8,.6,12,["-",["get","icon_size"],0],14,["+",["get","icon_size"],0],20,["+",["get","icon_size"],.2]],"text-font":["Public Sans Bold","Arial Unicode MS Regular"],"text-line-height":1,"text-letter-spacing":0,"text-anchor":"top","text-variable-anchor":["top","bottom","right"],"text-justify":"auto","text-size":["interpolate",["linear"],["zoom"],8,8,22,14],"text-max-width":10,visibility:"visible"},neighborhood_layout:{"text-size":{base:1,stops:[[10,8],[18,12]]},"text-transform":"uppercase","text-padding":1,"text-field":["to-string",["get","neighborhood"]],"text-font":["Public Sans Bold"],"text-letter-spacing":.1,"text-allow-overlap":!0,"text-ignore-placement":!0,"text-max-width":8,visibility:"visible"},neighborhood_paint:{"text-halo-color":"hsla(295, 100%, 100%, 0.8)","text-halo-width":1,"text-color":"hsl(253, 50%, 47%)"},top_pick_paint:{"text-color":"#666666","text-halo-color":"#FFFFFF","text-halo-width":1.4},top_vibe_layout:{"text-field":["to-string",["get","top_vibe"]],"text-font":["Roboto Condensed Italic"],"text-justify":"auto","text-anchor":"top","text-allow-overlap":!1,"icon-allow-overlap":!1,"icon-ignore-placement":!0,"text-ignore-placement":!0,"symbol-sort-key":["get","vibe_score"],"text-size":["interpolate",["linear"],["zoom"],8,6,22,20],"text-radial-offset":["interpolate",["linear"],["zoom"],8,.4,12,["-",["get","icon_size"],1.3],15,["-",["get","icon_size"],1],18,["-",["get","icon_size"],1.6]],"text-max-width":12},places_heatmap:{"heatmap-radius":["interpolate",["linear"],["zoom"],8,1,10,16,12,32,13,40,14,60,20,200],"heatmap-opacity":["interpolate",["linear"],["zoom"],8,.4,11,.2,20,.3],"heatmap-intensity":.2,"heatmap-weight":["interpolate",["linear"],["get","vibes_score"],1,.1,2,.6,10,2],"heatmap-color":["interpolate",["linear"],["heatmap-density"],.1,"hsla(240, 80%, 94%, 0.2)",.2,"hsla(125, 63%, 88%, 0.4)",.4,"hsla(192, 84%, 80%, 0.4)",.6,"hsla(274, 100%, 65%, 0.5)",.95,"hsla(300, 100%, 50%, 0.6)",1.1,"hsla(42, 100%, 64%, 0.6)"]},places_cluster:{"circle-color":["step",["get","point_count"],"#51bbd6",100,"#f1f075",750,"#f28cb1"],"circle-opacity":.2,"circle-stroke-color":"#FFFFFF","circle-stroke-width":2.4,"circle-radius":{property:"point_count",type:"interval",stops:[[0,60],[100,80],[750,160]]}},events_circle:{"circle-radius":{base:8,stops:[[8,4],[18,20]]},"circle-color":"#C650CC","circle-stroke-color":"#CC9423","circle-stroke-width":.4,"circle-opacity":{stops:[[8,.01],[20,.6]]},"circle-translate":[-2,-2]},hidden_circles:{"circle-opacity":0},places_circle:{"circle-radius":["interpolate",["linear"],["get","aggregate_rating"],1,.1,2,2,10,4],"circle-color":"#765382","circle-stroke-color":"#FFFFFF","circle-stroke-width":.4,"circle-stroke-opacity":.8,"circle-opacity":{stops:[[8,.4],[20,.6]]}}}),getPosition=e=>new Promise(function(t,o){navigator.geolocation&&navigator.geolocation.getCurrentPosition||t(!1),navigator.geolocation.getCurrentPosition(function(e){t(e)},function(e){o(!1),console.warn(`ERROR(${e.code}): `+e.message)},{enableHighAccuracy:!0,timeout:4e3})}),getRadius=e=>{return turf_distance__default.default([e[0],e[1]],[e[2],e[3]],{units:"miles"})/2},getFeatureCollection=e=>turf.featureCollection(e),getTruncatedFeatures=e=>turf_truncate__default.default(e,{precision:6,coordinates:2}),sortLocations=(e,t)=>{let a=turf__namespace.point([t.longitude,t.latitude]);return e.sort((e,t)=>{var o=e.centerpoint?turf__namespace.point(e.centerpoint):turf__namespace.point([e.location.longitude,e.location.latitude]),r=t.centerpoint?turf__namespace.point(t.centerpoint):turf__namespace.point([t.location.longitude,t.location.latitude]);return e.distance=turf_distance__default.default(a,o),t.distance=turf_distance__default.default(a,r),e.distance>t.distance?1:-1})},distanceBetweenLocations=(e,t,o=0)=>{e=turf__namespace.point([e.longitude,e.latitude]),t=turf__namespace.point([t.longitude,t.latitude]);return turf_distance__default.default(e,t)},zoomToRadius=e=>{let t=scalePow(1).domain([8,12,13,14,16,18]).range([40,7,3,3.5,1.5,.8]);return t(e)};exports.distanceBetweenLocations=distanceBetweenLocations,exports.geocodeAddress=geocodeAddress,exports.getArea=getArea,exports.getBestRoute=getBestRoute,exports.getBounds=getBounds,exports.getClusters=getClusters,exports.getDirections=getDirections,exports.getDistance=getDistance,exports.getDistanceToPixels=getDistanceToPixels,exports.getFeatureCollection=getFeatureCollection,exports.getFeaturesFromSource=getFeaturesFromSource,exports.getFeaturesInBounds=getFeaturesInBounds,exports.getLocationFromPoint=getLocationFromPoint,exports.getMapStyles=getMapStyles,exports.getPlaceDetails=getPlaceDetails,exports.getPlaceSocial=getPlaceSocial,exports.getPointFromLocation=getPointFromLocation,exports.getPolygon=getPolygon,exports.getPosition=getPosition,exports.getRadius=getRadius,exports.getTruncatedFeatures=getTruncatedFeatures,exports.getWaypoints=getWaypoints,exports.isPointInBounds=isPointInBounds,exports.sortLocations=sortLocations,exports.zoomToRadius=zoomToRadius;
//# sourceMappingURL=map.js.map


/***/ }),

/***/ "./node_modules/vibemap-constants/dist/vibes.js":
/*!******************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/vibes.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:!0}));var Fuse=__webpack_require__(/*! fuse.js */ "./node_modules/fuse.js/dist/fuse.esm.js"),LinearScale=__webpack_require__(/*! linear-scale */ "./node_modules/linear-scale/linear-scale.js");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var Fuse__default=_interopDefaultLegacy(Fuse),LinearScale__default=_interopDefaultLegacy(LinearScale),activityCategories$1=[{id:9881,description:"",name:"Acupuncture",slug:"acupuncture",parent:9878,details:{noun:"",sub_categories:[],vibes:[],msv:"1300",icon:"",feature_in_app_:!1},parent_slug:"health",level:3},{id:15061,description:"",name:"Adult Entertainment",slug:"adult_entertainment",parent:6334,details:{noun:"",vibes:[],msv:"80",icon:"",feature_in_app_:!1,parent_categories:!1,sub_categories:[],sections:!1}},{id:9830,description:"",name:"Afghan",slug:"afghan",parent:6331,details:{noun:"",sub_categories:[],vibes:[],msv:"1",icon:"",feature_in_app_:!1},parent_slug:"food",level:3},{id:9833,description:"",name:"African",slug:"african",parent:6331,details:{noun:"",sub_categories:[],vibes:[],msv:"10",icon:"",feature_in_app_:!1},parent_slug:"food",level:3},{id:9836,description:"",name:"Albanian",slug:"albanian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:6295,description:"Discover the best things to do in %city%, based on your vibe. Guides, events, activities, and more to help you plan a visit or weekend. Whether you’re a first time visitor or long-time local, we'll recommend something fun and interesting.",name:"All",slug:"all",parent:0,details:{noun:"Things to do",sub_categories:[{slug:"food",id:6331},{slug:"visit",id:6298},{slug:"drink",id:6328},{slug:"outdoors",id:6340},{slug:"community",id:6293},{slug:"events",id:6323},{slug:"learning",id:6573},{id:6334,slug:"entertainment"},{id:6304,slug:"shop"},{id:6337,slug:"games"},{id:6294,slug:"stay"},{id:9878,slug:"health"}],msv:"100000",icon:"allLogo",vibes:["dreamy","creative","fun","local","new","amazing","family","trending","classic","adventurous"],parent_categories:!1,feature_in_app_:!1},level:1},{id:9839,description:"",name:"American / New American",slug:"american",parent:6331,details:{noun:"",vibes:[],msv:"200",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10262,description:"",name:"Amusement Park",slug:"amusement_park",parent:6298,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"visit",level:3},{id:10379,description:"",name:"Antique Store",slug:"antique",parent:6304,details:{noun:"",vibes:[],msv:"400",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10436,description:"",name:"Aquarium",slug:"aquarium",parent:6291,details:{noun:"Aquarium",sub_categories:[],vibes:[],msv:"2000",icon:"",feature_in_app_:!1},parent_slug:"visit",level:3},{id:9917,description:"",name:"Arboretum",slug:"arboretum",parent:6340,details:{noun:"",vibes:[],msv:"600",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10406,description:"",name:"Arcade",slug:"arcade",parent:6291,details:{noun:"",sub_categories:[],vibes:[],msv:"3000",icon:"",feature_in_app_:!1},parent_slug:"entertainment",level:3},{id:9842,description:"",name:"Argentinian",slug:"argentinian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:6291,description:"",name:"Art",slug:"art",parent:6334,details:{noun:"Art",msv:"2400",sub_categories:[{id:10418,slug:"art_museum"},{id:10433,slug:"arts_organization"},{id:6307,slug:"gallery"},{id:10424,slug:"photography"},{id:10430,slug:"print_shop"},{id:10427,slug:"studio"}],vibes:["artsy","creative","inspired"],icon:"art",feature_in_app_:!0},parent_slug:"entertainment",level:3},{id:10418,description:"",name:"Art Museum",slug:"art_museum",parent:6291,details:{noun:"",sub_categories:[],vibes:[],msv:"8000",icon:"",feature_in_app_:!1},parent_slug:"art",level:3},{id:6334,description:"",name:"Arts &amp; Entertainment",slug:"entertainment",parent:6295,details:{noun:"Entertainment",vibes:["fun","interesting","popular","lively","musical"],msv:"500",icon:"entertainment",sub_categories:[{id:10406,slug:"arcade"},{id:6291,slug:"art"},{id:10403,slug:"casino"},{id:6292,slug:"comedy"},{id:10412,slug:"festival"},{id:10394,slug:"film"},{id:6307,slug:"gallery"},{id:10421,slug:"interactive"},{id:10277,slug:"museum"},{id:6343,slug:"music"},{id:10668,slug:"nightclub"},{id:6570,slug:"nightlife"},{id:10400,slug:"performance"},{id:10397,slug:"theater"}]},parent_slug:"all",level:2},{id:10433,description:"",name:"Arts Organization",slug:"arts_organization",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"art",level:3},{id:9845,description:"",name:"Asian Fusion",slug:"asianfusion",parent:6331,details:{noun:"",vibes:[],msv:"170",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:13940,description:"",name:"Attractions",slug:"attractions",parent:6323,details:{noun:"",vibes:[],msv:"100",icon:"",feature_in_app_:!1,sub_categories:[]},parent_slug:"events",level:3},{id:9848,description:"",name:"Austrailian",slug:"austrailian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:12600,description:"Cars, automobiles, and motorcycles",name:"Automobiles",slug:"automobiles",parent:6304,details:{noun:"automobiles",vibes:[],msv:"20",icon:"",feature_in_app_:!1,sub_categories:[]},parent_slug:"shop",level:3},{id:9851,description:"",name:"Bagels",slug:"bagels",parent:6331,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9854,description:"",name:"Bakery",slug:"bakery",parent:6331,details:{noun:"",vibes:[],msv:"8000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9857,description:"",name:"Bangladeshi",slug:"bangladeshi",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10656,description:"",name:"Bar",slug:"bar",parent:6328,details:{noun:"Bar",sub_categories:[],vibes:["drinking","boozy"],msv:"18000",icon:"",feature_in_app_:!0},parent_slug:"drink",level:3},{id:9860,description:"",name:"Barbeque",slug:"barbeque",parent:6331,details:{noun:"",vibes:[],msv:"1900",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10560,description:"",name:"Barber Shop",slug:"barber",parent:9884,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"beauty",level:3},{id:9932,description:"",name:"Beach",slug:"beach",parent:6340,details:{noun:"",sub_categories:[],vibes:[],msv:"22000",icon:"",feature_in_app_:!1},parent_slug:"outdoors",level:3},{id:9884,description:"",name:"Beauty",slug:"beauty",parent:9878,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[{id:10560,slug:"barber"},{id:10557,slug:"hair"},{id:10554,slug:"nails"},{id:10563,slug:"tattoo_parlor"}]},parent_slug:"health",level:3},{id:10181,description:"",name:"Bed &amp; Breakfast",slug:"bed_breakfast",parent:6294,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10301,description:"",name:"Beer Garden",slug:"beer_garden",parent:6328,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:9863,description:"",name:"Bistro",slug:"bistro",parent:6331,details:{noun:"",vibes:[],msv:"170",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:15064,description:"",name:"Boats",slug:"boats",parent:6340,details:{noun:"",vibes:[],msv:"40",icon:"",feature_in_app_:!1,parent_categories:!1,sub_categories:[],sections:!1}},{id:10334,description:"",name:"Books",slug:"books",parent:6304,details:{noun:"",sub_categories:[],vibes:[],msv:"720",icon:"",feature_in_app_:!0},parent_slug:"shop",level:3},{id:9929,description:"",name:"Botanical Garden",slug:"botanicalgarden",parent:6340,details:{noun:"",vibes:[],msv:"320",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10235,description:"",name:"Bowling",slug:"bowling",parent:6337,details:{noun:"",vibes:[],msv:"4000",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:9866,description:"",name:"Bowls",slug:"bowls",parent:6331,details:{noun:"",vibes:[],msv:"100",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10187,description:"",name:"Boxing",slug:"boxing",parent:6337,details:{noun:"",vibes:[],msv:"700",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:9872,description:"",name:"Brazilian",slug:"brazilian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10674,description:"",name:"Breakfast",slug:"breakfast",parent:6331,details:{noun:"Breakfast",vibes:[],msv:"12000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10304,description:"",name:"Brewery",slug:"brewery",parent:6328,details:{noun:"",vibes:[],msv:"12000",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10662,description:"",name:"Brewpub",slug:"brewpub",parent:6328,details:{noun:"Brewpub",vibes:[],msv:"320",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10496,description:"",name:"Broadway",slug:"broadway",parent:10397,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"theater",level:3},{id:9869,description:"",name:"Brunch",slug:"brunch",parent:6331,details:{noun:"",sub_categories:[],vibes:[],msv:"15000",icon:"",feature_in_app_:!0},parent_slug:"food",level:3},{id:11247,description:"",name:"Buffet",slug:"buffet",parent:6331,details:{noun:"",vibes:[],msv:"400",icon:"",parent_categories:!1,sub_categories:[]}},{id:9875,description:"",name:"Burger",slug:"burger",parent:6331,details:{noun:"",vibes:[],msv:"2000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10469,description:"",name:"Burlesque",slug:"burlesque",parent:10400,details:{noun:"",vibes:[],msv:"300",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:10472,description:"",name:"Caberet",slug:"caberet",parent:10400,details:{noun:"",vibes:[],msv:"170",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:10638,description:"",name:"Cabin",slug:"cabin",parent:6294,details:{noun:"Cabin",vibes:["outdoorsy","natural","cottagecore","cottage"],msv:"320",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:9944,description:"",name:"Cafe",slug:"cafe",parent:6331,details:{noun:"Cafe",vibes:[],msv:"3000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9950,description:"",name:"Cambodian",slug:"cambodian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10172,description:"",name:"Campground",slug:"campground",parent:6294,details:{noun:"",vibes:[],msv:"1000",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:9953,description:"",name:"Candy",slug:"candy",parent:6331,details:{noun:"",vibes:[],msv:"250",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10566,description:"",name:"Cannabis",slug:"cannabis",parent:9878,details:{noun:"",sub_categories:[],vibes:[],msv:"1",icon:"",feature_in_app_:!0},parent_slug:"health",level:3},{id:9956,description:"",name:"Caribbean",slug:"caribbean",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10403,description:"",name:"Casino",slug:"casino",parent:6291,details:{noun:"",vibes:[],msv:"3000",icon:"",sub_categories:[]},parent_slug:"entertainment",level:3},{id:9941,description:"",name:"Cemetery",slug:"cemetery",parent:6340,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10364,description:"",name:"Children's Clothing Store",slug:"childrens_clothing",parent:10361,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"kids",level:3},{id:10439,description:"",name:"Children's Museum",slug:"children_museum",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:9959,description:"",name:"Chinese",slug:"chinese",parent:6331,details:{noun:"",vibes:[],msv:"3000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10283,description:"",name:"Church",slug:"church",parent:6293,details:{noun:"",sub_categories:[],vibes:[],msv:"1",icon:"",feature_in_app_:!1},parent_slug:"community",level:3},{id:10475,description:"",name:"Circus",slug:"circus",parent:10400,details:{noun:"",vibes:[],msv:"250",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:10295,description:"",name:"City Hall",slug:"city_hall",parent:6293,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"community",level:3},{id:6573,description:"",name:"Classes / Learning",slug:"learning",parent:6295,details:{vibes:["interesting","interactive","family","fun"],icon:"learning",noun:"Learning",msv:"1",sub_categories:[{id:6291,slug:"art"},{id:10680,slug:"cooking"},{id:10502,slug:"dj"},{id:6312,slug:"improv"},{id:6343,slug:"music"},{id:10424,slug:"photography"},{id:9893,slug:"yoga"}]},parent_slug:"all",level:2},{id:10499,description:"",name:"Classical",slug:"classical",parent:6343,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10190,description:"",name:"Climbing",slug:"climbing",parent:6337,details:{noun:"",vibes:[],msv:"170",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10340,description:"",name:"Clothes",slug:"clothes",parent:6304,details:{noun:"",vibes:[],msv:"400",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10391,description:"",name:"Club / Dance",slug:"club",parent:6570,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10184,description:"",name:"Co-Working Space",slug:"co_working",parent:6294,details:{noun:"",vibes:[],msv:"300",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10307,description:"",name:"Cocktails / Spirits",slug:"cocktails_spirits",parent:6328,details:{noun:"",vibes:[],msv:"900",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:9947,description:"",name:"Coffee Shop",slug:"coffeeshop",parent:6331,details:{noun:"",vibes:[],msv:"4500",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9962,description:"",name:"Colombian",slug:"colombian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:6292,description:"",name:"Comedy",slug:"comedy",parent:6295,details:{noun:"Comedy",vibes:["funny","raunchy","spontaneous"],msv:"2000",icon:"comedy",sub_categories:[{id:6317,slug:"stand-up"}]},parent_slug:"entertainment",level:3},{id:6293,description:"Explore ways to get involved in your local community. Support local businesses, volunteer, give back, or pay it forward with these community groups and hubs of local culture. ",name:"Community",slug:"community",parent:6295,details:{noun:"Community",sub_categories:[{id:10283,slug:"church"},{id:10295,slug:"city_hall"},{id:10268,slug:"community_center"},{id:10298,slug:"courthouse"},{id:10274,slug:"library"},{id:10289,slug:"mosque"},{id:10277,slug:"museum"},{id:10271,slug:"non_profit"}],msv:"2",icon:"community",vibes:["community","local","cultural","multicultural","social"],feature_in_app_:!1},parent_slug:"all",level:2},{id:10268,description:"",name:"Community Center",slug:"community_center",parent:6293,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"community",level:3},{id:9920,description:"",name:"Community Garden",slug:"communitygarden",parent:6340,details:{noun:"",vibes:[],msv:"30",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10595,description:"",name:"Concert",slug:"concert",parent:10400,details:{noun:"Concert",sub_categories:[],vibes:["musical","lively","together"],msv:"33000",icon:"",feature_in_app_:!1},parent_slug:"performance",level:3},{id:10466,description:"",name:"Conservatory",slug:"conservatory",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:10370,description:"",name:"Convenience Store / Bodega",slug:"convenience_store",parent:6304,details:{noun:"",vibes:[],msv:"100",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:13987,description:"",name:"Cookies",slug:"cookies",parent:6331,details:{noun:"",vibes:[],msv:"200",icon:"",feature_in_app_:!1,sub_categories:[]},parent_slug:"food",level:3},{id:10680,description:"",name:"Cooking",slug:"cooking",parent:6573,details:{noun:"Cooking",vibes:["interesting","interactive"],msv:"2400",icon:"",sub_categories:[]},parent_slug:"learning",level:3},{id:10644,description:"",name:"Cottage",slug:"cottage",parent:6294,details:{noun:"Cottage",vibes:["cottage","cottagecore"],msv:"110",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10298,description:"",name:"Courthouse",slug:"courthouse",parent:6293,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"community",level:3},{id:10310,description:"",name:"Craft Beer",slug:"craft_beer",parent:6328,details:{noun:"",vibes:[],msv:"250",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10193,description:"",name:"CrossFit",slug:"crossfit",parent:6337,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:9965,description:"",name:"Cuban",slug:"cuban",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10442,description:"",name:"Cultural Museum",slug:"cultural_museum",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:9968,description:"",name:"Cupcakes",slug:"cupcakes",parent:6331,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10196,description:"",name:"Dance",slug:"dance",parent:6337,details:{noun:"",vibes:[],msv:"600",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10592,description:"",name:"Dance",slug:"dance-performance",parent:10400,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:9971,description:"",name:"Deli",slug:"deli",parent:6331,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10445,description:"",name:"Design Museum",slug:"design_museum",parent:6291,details:{noun:"",vibes:[],msv:"10",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:10343,description:"",name:"Design/Furniture",slug:"design_furniture",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:9974,description:"",name:"Dessert",slug:"dessert",parent:6331,details:{noun:"",vibes:[],msv:"2000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9977,description:"",name:"Diner",slug:"diner",parent:6331,details:{noun:"",vibes:[],msv:"6000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10659,description:"",name:"Distillery",slug:"distillery",parent:6328,details:{noun:"Distillery",vibes:[],msv:"400",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10313,description:"",name:"Dive Bar",slug:"dive_bar",parent:6328,details:{noun:"",vibes:[],msv:"80",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10502,description:"",name:"DJ",slug:"dj",parent:6343,details:{noun:"DJ",vibes:[],msv:"30",icon:"",sub_categories:[]},parent_slug:"learning",level:3},{id:9980,description:"",name:"Dominican",slug:"dominican",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9983,description:"",name:"Donuts",slug:"donuts",parent:6331,details:{noun:"",vibes:[],msv:"2000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:6328,description:"Where to drink and enjoy beer, wine, cocktails and sober-friendly options including coffee, tea, and more. Discover drinking styles like tiki, bubbly, and sober-friendly. Beyond watering holes, check out outdoor spots, events, and tours.",name:"Drink",slug:"drink",parent:6295,details:{noun:"Drinking",sub_categories:[{slug:"all",id:6295},{id:10656,slug:"bar"},{id:10301,slug:"beer_garden"},{id:10304,slug:"brewery"},{id:10662,slug:"brewpub"},{id:9944,slug:"cafe"},{id:10391,slug:"club"},{id:10307,slug:"cocktails_spirits"},{id:9947,slug:"coffeeshop"},{id:10310,slug:"craft_beer"},{id:10659,slug:"distillery"},{id:10313,slug:"dive_bar"},{id:10013,slug:"gastropub"},{id:10319,slug:"juice_smoothie"},{id:10665,slug:"lounge"},{id:10322,slug:"mocktails"},{id:10668,slug:"nightclub"},{id:10082,slug:"pub"},{id:10671,slug:"saloon"},{id:10325,slug:"speakeasy"},{id:10145,slug:"tea"},{id:13943,slug:"tiki"},{id:10331,slug:"wine_bar"},{id:10328,slug:"winery"}],vibes:["fun","boozy","happy","cheap","friendly"],msv:"9000",icon:"drink",feature_in_app_:!1},parent_slug:"all",level:2},{id:9986,description:"",name:"Eastern European",slug:"eastern_european",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9989,description:"",name:"Egyptian",slug:"egyptian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10505,description:"",name:"Electronic / Dance",slug:"electronic_dance",parent:6343,details:{noun:"",vibes:[],msv:"80",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:9992,description:"",name:"English",slug:"english",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9995,description:"",name:"Ethiopian",slug:"ethiopian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:6323,description:"Explore what's happening in %city%. Make a plan for tonight or this weekend with your events calendar. Explore art, music, nightlife based on your vibe.",name:"Events",slug:"events",parent:0,details:{noun:"Events",sub_categories:[{slug:"concert",id:10595},{slug:"music",id:6343},{slug:"comedy",id:6292},{slug:"art",id:6291},{id:13940,slug:"attractions"},{id:10334,slug:"books"},{id:6293,slug:"community"},{id:6328,slug:"drink"},{id:11658,slug:"family"},{id:10412,slug:"festival"},{id:10394,slug:"film"},{id:6331,slug:"food"},{id:6340,slug:"outdoors"},{id:9878,slug:"health"}],vibes:["local","chill","fun","unique"],msv:"4000",icon:"events",feature_in_app_:!0,sections:!1},parent_slug:"all",level:2},{id:10448,description:"",name:"Experiential",slug:"experiential",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:10478,description:"",name:"Experimental",slug:"experimental",parent:10400,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:11658,description:"Ways to get out and have fun with your entire family",name:"Family",slug:"family",parent:0,details:{noun:"",vibes:["family","kidcore","children"],msv:"800",icon:"",sub_categories:[],feature_in_app_:!1},parent_slug:"events",level:3},{id:9926,description:"",name:"Farm",slug:"farm",parent:6340,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:9998,description:"",name:"Farm to Table",slug:"farm_table",parent:6331,details:{noun:"",vibes:[],msv:"170",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10346,description:"",name:"Farmers Market",slug:"farmers_market",parent:6304,details:{noun:"",vibes:[],msv:"10000",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:15058,description:"",name:"Fast Casual",slug:"fast_casual",parent:6331,details:{noun:"",vibes:[],msv:"40",icon:"",feature_in_app_:!1,parent_categories:!1,sub_categories:[],sections:!1}},{id:10412,description:"",name:"Festival",slug:"festival",parent:6291,details:{noun:"",sub_categories:[],vibes:[],msv:"1200",icon:"",feature_in_app_:!1},parent_slug:"events",level:3},{id:10001,description:"",name:"Filipino",slug:"filipino",parent:6331,details:{noun:"",vibes:[],msv:"1000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10394,description:"",name:"Film",slug:"film",parent:6291,details:{noun:"",vibes:[],msv:"50",icon:"",sub_categories:[{id:10535,slug:"movie_theater"}]},parent_slug:"entertainment",level:3},{id:10451,description:"",name:"Film Museum",slug:"film_museum",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:10677,description:"",name:"Fine Dining",slug:"fine-dining",parent:6331,details:{noun:"Fine Dining",vibes:["elegant","luxury","fancy"],msv:"3000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:15067,description:"",name:"Fishing",slug:"fishing",parent:0,details:{noun:"",vibes:[],msv:"40",icon:"",feature_in_app_:!1,parent_categories:!1,sub_categories:[],sections:!1}},{id:10349,description:"",name:"Flea Market",slug:"flea_market",parent:6304,details:{noun:"",vibes:[],msv:"2400",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:15079,description:"",name:"Florist",slug:"florist",parent:6304,details:{noun:"",vibes:[],msv:"80",icon:"",feature_in_app_:!1,parent_categories:!1,sub_categories:[],sections:!1}},{id:10508,description:"",name:"Folk / Country",slug:"folk_country",parent:6343,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:6331,description:"Eat and explore culinary culture. Whether your vibe is a lively brunch, a friendly lunch, a chill breakfast, or an intimate dinner, we've got you covered with the best restaurants and other places to eat, including outdoor patios, rooftop bars, and markets. You can also discover by taste, like savory, sweet, and spicy.",name:"Food",slug:"food",parent:6295,details:{noun:"Food",sub_categories:[{id:9830,slug:"afghan"},{id:9833,slug:"african"},{id:9836,slug:"albanian"},{id:9839,slug:"american"},{id:9842,slug:"argentinian"},{id:9845,slug:"asianfusion"},{id:9848,slug:"austrailian"},{id:9851,slug:"bagels"},{id:9854,slug:"bakery"},{id:9857,slug:"bangladeshi"},{id:9860,slug:"barbeque"},{id:9863,slug:"bistro"},{id:9866,slug:"bowls"},{id:9872,slug:"brazilian"},{id:10674,slug:"breakfast"},{id:9869,slug:"brunch"},{id:9875,slug:"burger"},{id:9944,slug:"cafe"},{id:9950,slug:"cambodian"},{id:9953,slug:"candy"},{id:9956,slug:"caribbean"},{id:9959,slug:"chinese"},{id:9947,slug:"coffeeshop"},{id:9962,slug:"colombian"},{id:13987,slug:"cookies"},{id:9965,slug:"cuban"},{id:9968,slug:"cupcakes"},{id:9971,slug:"deli"},{id:9974,slug:"dessert"},{id:9977,slug:"diner"},{id:9980,slug:"dominican"},{id:9983,slug:"donuts"},{id:9986,slug:"eastern_european"},{id:9989,slug:"egyptian"},{id:9992,slug:"english"},{id:9995,slug:"ethiopian"},{id:9998,slug:"farm_table"},{id:10001,slug:"filipino"},{id:10677,slug:"fine-dining"},{id:10004,slug:"food_hall"},{id:10007,slug:"food_truck"},{id:10010,slug:"french"},{id:10013,slug:"gastropub"},{id:10016,slug:"german"},{id:10019,slug:"greek"},{id:10022,slug:"hawaiian"},{id:10025,slug:"himalayan_nepalese_tibetan"},{id:10028,slug:"hungarian"},{id:10031,slug:"ice_cream"},{id:10034,slug:"indian"},{id:10037,slug:"italian"},{id:10040,slug:"jamaican"},{id:10043,slug:"japanese"},{id:10046,slug:"korean"},{id:10049,slug:"latin_american"},{id:10052,slug:"mediterranean"},{id:10055,slug:"mexican"},{id:10058,slug:"middle_eastern"},{id:10061,slug:"modern_european"},{id:10064,slug:"moroccan"},{id:10067,slug:"new_zealand"},{id:10070,slug:"pakastani"},{id:10073,slug:"persian"},{id:10076,slug:"peruvian"},{id:10079,slug:"pizza"},{id:10082,slug:"pub"},{id:10085,slug:"ramen"},{id:13934,slug:"restaurant"},{id:10088,slug:"romanian"},{id:10091,slug:"russian"},{id:13937,slug:"salad"},{id:10094,slug:"sandwiches"},{id:10097,slug:"scandinavian"},{id:10100,slug:"seafood"},{id:10103,slug:"senegalese"},{id:10106,slug:"singaporean"},{id:10109,slug:"small_plates"},{id:10112,slug:"soul_southern"},{id:10115,slug:"soup"},{id:10118,slug:"south_african"},{id:10121,slug:"south_american"},{id:10124,slug:"southeast_asian"},{id:10127,slug:"spanish"},{id:10130,slug:"steakhouse"},{id:10133,slug:"sushi"},{id:10136,slug:"tacos"},{id:10142,slug:"tapas"},{id:10145,slug:"tea"},{id:10148,slug:"thai"},{id:10139,slug:"tiawanese"},{id:10151,slug:"turkish"},{id:10154,slug:"uzbek"},{id:10157,slug:"vegan"},{id:10160,slug:"vegetarian"},{id:10163,slug:"vietnamese"},{id:15052,slug:"wings"}],vibes:["local","foodie","authentic","new","spicy","sweet","popup"],msv:"15000",icon:"food",feature_in_app_:!1},parent_slug:"all",level:2},{id:10004,description:"",name:"Food Hall",slug:"food_hall",parent:6331,details:{noun:"",vibes:[],msv:"170",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:15087,description:"",name:"Food Market",slug:"food_market",parent:6304,details:{noun:"",vibes:[],msv:"80",icon:"",feature_in_app_:!1,parent_categories:!1,sub_categories:[],sections:!1}},{id:10007,description:"",name:"Food Truck / Cart",slug:"food_truck",parent:6331,details:{noun:"",vibes:[],msv:"3600",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10352,description:"",name:"Fragrance",slug:"fragrance",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10010,description:"",name:"French",slug:"french",parent:6331,details:{noun:"",vibes:[],msv:"300",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:15055,description:"",name:"Fries",slug:"fries",parent:6331,details:{noun:"",vibes:[],msv:"100",icon:"",feature_in_app_:!1,parent_categories:!1,sub_categories:[],sections:!1}},{id:6307,description:"",name:"Gallery",slug:"gallery",parent:6291,details:{vibes:["small","local","community"],noun:"",sub_categories:[],msv:"600",icon:"",feature_in_app_:!0},parent_slug:"art",level:3},{id:9905,description:"",name:"Garden",slug:"garden",parent:6340,details:{noun:"",sub_categories:[],vibes:[],msv:"2400",icon:"",feature_in_app_:!0},parent_slug:"outdoors",level:3},{id:10013,description:"",name:"Gastropub",slug:"gastropub",parent:6331,details:{noun:"",vibes:[],msv:"260",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10016,description:"",name:"German",slug:"german",parent:6331,details:{noun:"",vibes:[],msv:"50",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10598,description:"",name:"Gift",slug:"gift",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:15070,description:"",name:"Golf",slug:"golf",parent:6337,details:{noun:"",vibes:[],msv:"80",icon:"",feature_in_app_:!1,parent_categories:!1,sub_categories:[],sections:!1}},{id:10019,description:"",name:"Greek",slug:"greek",parent:6331,details:{noun:"",vibes:[],msv:"200",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10337,description:"",name:"Groceries",slug:"groceries",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10647,description:"",name:"Guest house",slug:"guest-house",parent:6294,details:{noun:"Guest house",vibes:[],msv:"110",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10199,description:"",name:"Gym",slug:"gym",parent:6337,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10211,description:"",name:"Gymnastics",slug:"gymnastics",parent:6337,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10557,description:"",name:"Hair Salon",slug:"hair",parent:9884,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"beauty",level:3},{id:10022,description:"",name:"Hawaiian",slug:"hawaiian",parent:6331,details:{noun:"",vibes:[],msv:"100",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10376,description:"",name:"Health Food Store",slug:"health_food",parent:6304,details:{noun:"",vibes:[],msv:"20",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10202,description:"",name:"Hike",slug:"hike-games",parent:6337,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:9935,description:"",name:"Hiking",slug:"hike",parent:6340,details:{noun:"Hiking",sub_categories:[],vibes:["hiking"],msv:"8000",icon:"",feature_in_app_:!0},parent_slug:"outdoors",level:3},{id:10025,description:"",name:"Himalayan/Nepalese/Tibetan",slug:"himalayan_nepalese_tibetan",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10511,description:"",name:"Hip Hop / Rap",slug:"hiphop_rap",parent:6343,details:{noun:"",vibes:[],msv:"100",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10454,description:"",name:"History Museum",slug:"history_museum",parent:6291,details:{noun:"",vibes:[],msv:"500",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:10355,description:"",name:"Home &amp; Garden",slug:"home_garden",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10175,description:"",name:"Home share (AirBNB, VRBO, etc.)",slug:"home_share",parent:6294,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10169,description:"",name:"Hostel",slug:"hostel",parent:6294,details:{noun:"",vibes:[],msv:"4000",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10166,description:"",name:"Hotel",slug:"hotels",parent:6294,details:{noun:"",sub_categories:[],vibes:[],msv:"1400",icon:"",feature_in_app_:!0},parent_slug:"stay",level:3},{id:10028,description:"",name:"Hungarian",slug:"hungarian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10031,description:"",name:"Ice Cream",slug:"ice_cream",parent:6331,details:{noun:"",vibes:[],msv:"3600",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10214,description:"",name:"Ice Skating",slug:"ice_skating",parent:6337,details:{noun:"",vibes:[],msv:"80",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:6312,description:"",name:"Improv",slug:"improv",parent:6292,details:{msv:"480",noun:"",vibes:[],icon:"",sub_categories:[]},parent_slug:"learning",level:3},{id:10481,description:"",name:"Improv",slug:"improv-performance",parent:10400,details:{noun:"",vibes:[],msv:"480",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:10034,description:"",name:"Indian",slug:"indian",parent:6331,details:{noun:"",vibes:[],msv:"300",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10635,description:"",name:"Inn",slug:"inn",parent:6294,details:{noun:"Inn",vibes:[],msv:"2000",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10514,description:"",name:"Instrumental",slug:"instrumental",parent:6343,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10421,description:"",name:"Interactive",slug:"interactive",parent:6291,details:{noun:"",sub_categories:[],vibes:[],msv:"10",icon:"",feature_in_app_:!1},parent_slug:"entertainment",level:3},{id:10037,description:"",name:"Italian",slug:"italian",parent:6331,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9899,description:"",name:"IV Therapy",slug:"ivtherapy",parent:9878,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"health",level:3},{id:10040,description:"",name:"Jamaican",slug:"jamaican",parent:6331,details:{noun:"",vibes:[],msv:"260",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10043,description:"",name:"Japanese",slug:"japanese",parent:6331,details:{noun:"",vibes:[],msv:"900",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10517,description:"",name:"Jazz",slug:"jazz",parent:6343,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10358,description:"",name:"Jewelry",slug:"jewelry",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10319,description:"",name:"Juice / Smoothie",slug:"juice_smoothie",parent:6328,details:{noun:"",vibes:[],msv:"140",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10520,description:"",name:"Karaoke",slug:"karaoke",parent:6343,details:{noun:"",vibes:[],msv:"3000",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10361,description:"",name:"Kids",slug:"kids",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[{id:10364,slug:"childrens_clothing"},{id:10367,slug:"toy_store"}]},parent_slug:"shop",level:3},{id:10586,description:"",name:"Kids",slug:"kids-music",parent:6343,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10589,description:"",name:"Kids",slug:"kids-performance",parent:10400,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:10046,description:"",name:"Korean",slug:"korean",parent:6331,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10250,description:"",name:"Landmark",slug:"landmark",parent:6298,details:{noun:"",vibes:[],msv:"2900",icon:"",sub_categories:[]},parent_slug:"visit",level:3},{id:10217,description:"",name:"Laser Tag",slug:"laser_tag",parent:6337,details:{noun:"",vibes:[],msv:"700",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10049,description:"",name:"Latin American",slug:"latin_american",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10274,description:"",name:"Library",slug:"library",parent:6293,details:{noun:"",vibes:[],msv:"14000",icon:"",sub_categories:[]},parent_slug:"community",level:3},{id:10653,description:"",name:"Lodge",slug:"lodge",parent:0,details:{noun:"Lodge",vibes:["rustic","cozy"],msv:"20",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10665,description:"",name:"Lounge",slug:"lounge",parent:6328,details:{noun:"Lounge",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10484,description:"",name:"Magic",slug:"magic",parent:10400,details:{noun:"",vibes:[],msv:"200",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:11244,description:"",name:"Mall",slug:"mall",parent:6304,details:{noun:"",vibes:[],msv:"1000",icon:"",parent_categories:!1,sub_categories:[]}},{id:9887,description:"",name:"Massage",slug:"massage",parent:9878,details:{noun:"",vibes:[],msv:"8000",icon:"",sub_categories:[]},parent_slug:"health",level:3},{id:9890,description:"",name:"Meditation",slug:"meditation",parent:9878,details:{noun:"",vibes:[],msv:"390",icon:"",sub_categories:[]},parent_slug:"health",level:3},{id:10052,description:"",name:"Mediterranean",slug:"mediterranean",parent:6331,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10055,description:"",name:"Mexican",slug:"mexican",parent:6331,details:{noun:"",vibes:[],msv:"2400",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10058,description:"",name:"Middle Eastern",slug:"middle_eastern",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10220,description:"",name:"Miniature Golf",slug:"minature_golf",parent:6337,details:{noun:"",vibes:[],msv:"700",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10322,description:"",name:"Mocktails",slug:"mocktails",parent:6328,details:{noun:"",vibes:[],msv:"40",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10061,description:"",name:"Modern European",slug:"modern_european",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10064,description:"",name:"Moroccan",slug:"moroccan",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10289,description:"",name:"Mosque",slug:"mosque",parent:6293,details:{noun:"",sub_categories:[],vibes:[],msv:"1",icon:"",feature_in_app_:!1},parent_slug:"community",level:3},{id:10632,description:"",name:"Motel",slug:"motel",parent:6294,details:{noun:"Motel",sub_categories:[],vibes:[],msv:"18000",icon:"",feature_in_app_:!1},parent_slug:"stay",level:3},{id:10535,description:"",name:"Movie Theater",slug:"movie_theater",parent:10394,details:{noun:"",vibes:[],msv:"10000",icon:"",sub_categories:[]},parent_slug:"film",level:3},{id:10256,description:"",name:"Mural",slug:"mural",parent:6298,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"visit",level:3},{id:10277,description:"",name:"Museum",slug:"museum",parent:6293,details:{noun:"",sub_categories:[{id:10436,slug:"aquarium"},{id:10439,slug:"children_museum"},{id:10466,slug:"conservatory"},{id:10442,slug:"cultural_museum"},{id:10445,slug:"design_museum"},{id:10448,slug:"experiential"},{id:10451,slug:"film_museum"},{id:10454,slug:"history_museum"},{id:10463,slug:"planetarium"},{id:10457,slug:"visitor_center"},{id:10460,slug:"zoo"}],vibes:[],msv:"800",icon:"",feature_in_app_:!0},parent_slug:"community",level:3},{id:6343,description:"",name:"Music",slug:"music",parent:6295,details:{vibes:["local","popular","jazzy","lit","shimmy"],noun:"Music",sub_categories:[{id:10499,slug:"classical"},{id:10502,slug:"dj"},{id:10505,slug:"electronic_dance"},{id:10508,slug:"folk_country"},{id:10511,slug:"hiphop_rap"},{id:10514,slug:"instrumental"},{id:10517,slug:"jazz"},{id:10520,slug:"karaoke"},{id:10586,slug:"kids-music"},{id:10523,slug:"r_b"},{id:10526,slug:"rock_indie"},{id:10529,slug:"soul_funk"},{id:10532,slug:"world_international"}],msv:"1300",icon:"music",feature_in_app_:!1},parent_slug:"entertainment",level:3},{id:10580,description:"",name:"Music Shop",slug:"music-store",parent:6304,details:{noun:"",sub_categories:[{id:10583,slug:"record-store"}],vibes:[],msv:"1",icon:"",feature_in_app_:!1},parent_slug:"shop",level:3},{id:10487,description:"",name:"Musical",slug:"musical",parent:10400,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:10554,description:"",name:"Nail Salon",slug:"nails",parent:9884,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"beauty",level:3},{id:9938,description:"",name:"Natural Area",slug:"natural_area",parent:6340,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10067,description:"",name:"New Zealand",slug:"new_zealand",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10388,description:"",name:"Night Market",slug:"night_market",parent:6304,details:{noun:"",vibes:[],msv:"400",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10668,description:"",name:"Nightclub",slug:"nightclub",parent:6328,details:{noun:"Nightclub",vibes:["latenight","after-party","party"],msv:"12000",icon:"",sub_categories:[]},parent_slug:"nightlife",level:3},{id:6570,description:"",name:"Nightlife",slug:"nightlife",parent:6295,details:{vibes:["latenight","lit","musical","buzzing","boozy"],noun:"Nightlife",sub_categories:[{id:10391,slug:"club"},{id:10668,slug:"nightclub"},{id:10325,slug:"speakeasy"}],msv:"12000",icon:"nightlife",feature_in_app_:!1},parent_slug:"entertainment",level:3},{id:10271,description:"",name:"Non-Profit Organization",slug:"non_profit",parent:6293,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"community",level:3},{id:15073,description:"",name:"Nursery",slug:"nursery",parent:10355,details:{noun:"",vibes:[],msv:"10",icon:"",feature_in_app_:!1,parent_categories:!1,sub_categories:[],sections:!1}},{id:10490,description:"",name:"Opera",slug:"opera",parent:10400,details:{noun:"",vibes:[],msv:"2000",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:15076,description:"",name:"Orchard",slug:"orchard",parent:6298,details:{noun:"",vibes:[],msv:"20",icon:"",feature_in_app_:!1,parent_categories:!1,sub_categories:[],sections:!1}},{id:6340,description:"",name:"Outdoors",slug:"outdoors",parent:6295,details:{noun:"Outdoors",sub_categories:[{id:9917,slug:"arboretum"},{id:9932,slug:"beach"},{id:9929,slug:"botanicalgarden"},{id:10638,slug:"cabin"},{id:9941,slug:"cemetery"},{id:9920,slug:"communitygarden"},{id:9926,slug:"farm"},{id:9905,slug:"garden"},{id:9935,slug:"hike"},{id:9938,slug:"natural_area"},{id:9908,slug:"park"},{id:9911,slug:"playground"},{id:9914,slug:"plaza"},{id:9923,slug:"urbanfarm"}],vibes:["fun","mindful","sunny","adventurous","relaxing"],msv:"110",icon:"outdoors",feature_in_app_:!1},parent_slug:"all",level:2},{id:15082,description:"",name:"Outlet",slug:"outlet",parent:6304,details:{noun:"",vibes:[],msv:"40",icon:"",feature_in_app_:!1,parent_categories:!1,sub_categories:[],sections:!1}},{id:10238,description:"",name:"Paint Ball",slug:"paint_ball",parent:6337,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10070,description:"",name:"Pakastani",slug:"pakastani",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9908,description:"",name:"Park",slug:"park",parent:6340,details:{noun:"",vibes:[],msv:"12000",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10400,description:"",name:"Performance",slug:"performance",parent:6291,details:{noun:"Performing Arts",sub_categories:[{id:10469,slug:"burlesque"},{id:10472,slug:"caberet"},{id:10475,slug:"circus"},{id:6292,slug:"comedy"},{id:10595,slug:"concert"},{id:10592,slug:"dance-performance"},{id:10478,slug:"experimental"},{id:10481,slug:"improv-performance"},{id:10589,slug:"kids-performance"},{id:10484,slug:"magic"},{id:10487,slug:"musical"},{id:10490,slug:"opera"},{id:10493,slug:"reading_lecture"},{id:10397,slug:"theater"}],vibes:[],msv:"40",icon:"",feature_in_app_:!0},parent_slug:"entertainment",level:3},{id:10073,description:"",name:"Persian",slug:"persian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10076,description:"",name:"Peruvian",slug:"peruvian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10424,description:"",name:"Photography",slug:"photography",parent:6291,details:{noun:"Photography",vibes:[],msv:"260",icon:"",sub_categories:[]},parent_slug:"learning",level:3},{id:10205,description:"",name:"Pilates",slug:"pilates",parent:6337,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10079,description:"",name:"Pizza",slug:"pizza",parent:6331,details:{noun:"",vibes:[],msv:"8000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10463,description:"",name:"Planetarium",slug:"planetarium",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:9911,description:"",name:"Playground",slug:"playground",parent:6340,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:9914,description:"",name:"Plaza",slug:"plaza",parent:6340,details:{noun:"",vibes:[],msv:"140",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10223,description:"",name:"Pool",slug:"pool",parent:6337,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10430,description:"",name:"Print Shop",slug:"print_shop",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"art",level:3},{id:10082,description:"",name:"Pub",slug:"pub",parent:6331,details:{noun:"",vibes:[],msv:"480",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10259,description:"",name:"Public Art",slug:"public_art",parent:6298,details:{noun:"",vibes:[],msv:"90",icon:"",sub_categories:[]},parent_slug:"visit",level:3},{id:10523,description:"",name:"R&amp;B",slug:"r_b",parent:6343,details:{noun:"",vibes:[],msv:"10",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10085,description:"",name:"Ramen",slug:"ramen",parent:6331,details:{noun:"",vibes:[],msv:"6000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10493,description:"",name:"Reading / Lecture",slug:"reading_lecture",parent:10400,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"performance",level:3},{id:10583,description:"",name:"Record Store",slug:"record-store",parent:10580,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"music-store",level:3},{id:10244,description:"",name:"Recreation Center",slug:"recreation_center",parent:6337,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10178,description:"",name:"Resort",slug:"resort",parent:6294,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:13934,description:"",name:"Restaurant",slug:"restaurant",parent:6331,details:{noun:"Restaurant",vibes:[],msv:"2000",icon:"",feature_in_app_:!1,sub_categories:[]},parent_slug:"food",level:3},{id:9902,description:"",name:"Retreat",slug:"retreat",parent:9878,details:{noun:"",vibes:[],msv:"140",icon:"",sub_categories:[]},parent_slug:"health",level:3},{id:10526,description:"",name:"Rock / Indie",slug:"rock_indie",parent:6343,details:{noun:"",vibes:[],msv:"50",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10226,description:"",name:"Rock Climbing",slug:"rock_climbing",parent:6337,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10088,description:"",name:"Romanian",slug:"romanian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10091,description:"",name:"Russian",slug:"russian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:13937,description:"",name:"Salad",slug:"salad",parent:6331,details:{noun:"Salad",vibes:["vegan","vegetarian","healthy"],msv:"200",icon:"",feature_in_app_:!1,sub_categories:[]},parent_slug:"food",level:3},{id:10671,description:"",name:"Saloon",slug:"saloon",parent:6328,details:{noun:"Saloon",vibes:["oldschool","boozy","wild"],msv:"1600",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10094,description:"",name:"Sandwiches",slug:"sandwiches",parent:6331,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10097,description:"",name:"Scandinavian",slug:"scandinavian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10100,description:"",name:"Seafood",slug:"seafood",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10103,description:"",name:"Senegalese",slug:"senegalese",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:6304,description:"",name:"Shopping",slug:"shop",parent:6295,details:{noun:"Shopping",sub_categories:[{slug:"all",id:6295},{id:10379,slug:"antique"},{id:12600,slug:"automobiles"},{id:10334,slug:"books"},{id:10566,slug:"cannabis"},{id:10340,slug:"clothes"},{id:10370,slug:"convenience_store"},{id:10343,slug:"design_furniture"},{id:10346,slug:"farmers_market"},{id:10349,slug:"flea_market"},{id:10352,slug:"fragrance"},{id:10598,slug:"gift"},{id:10337,slug:"groceries"},{id:10376,slug:"health_food"},{id:10355,slug:"home_garden"},{id:10358,slug:"jewelry"},{id:10361,slug:"kids"},{id:10580,slug:"music-store"},{id:10388,slug:"night_market"},{id:10373,slug:"specialty_foods"},{id:10241,slug:"sporting_rental"},{id:10382,slug:"thrift_store"},{id:10385,slug:"vintage"}],vibes:["local","popup","vintage","thrift"],msv:"4400",icon:"shopping",feature_in_app_:!1,sections:!1},parent_slug:"all",level:2},{id:10292,description:"",name:"Shrine",slug:"shrine",parent:6293,details:{noun:"",vibes:[],msv:"1",icon:"",parent_categories:[],sub_categories:[]}},{id:10106,description:"",name:"Singaporean",slug:"singaporean",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10232,description:"",name:"Skating",slug:"skating",parent:6337,details:{noun:"",vibes:[],msv:"400",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10109,description:"",name:"Small Plates",slug:"small_plates",parent:6331,details:{noun:"",sub_categories:[],vibes:[],msv:"40",icon:"",feature_in_app_:!0},parent_slug:"food",level:3},{id:10529,description:"",name:"Soul / Funk",slug:"soul_funk",parent:6343,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:10112,description:"",name:"Soul / Southern",slug:"soul_southern",parent:6331,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10115,description:"",name:"Soup",slug:"soup",parent:6331,details:{noun:"",vibes:[],msv:"400",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10118,description:"",name:"South African",slug:"south_african",parent:6331,details:{noun:"",sub_categories:[],vibes:[],msv:"1",icon:"",feature_in_app_:!1},parent_slug:"food",level:3},{id:10121,description:"",name:"South American",slug:"south_american",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10124,description:"",name:"Southeast Asian",slug:"southeast_asian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9896,description:"",name:"Spa",slug:"spa",parent:9878,details:{noun:"",vibes:[],msv:"600",icon:"",sub_categories:[]},parent_slug:"health",level:3},{id:10127,description:"",name:"Spanish",slug:"spanish",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10325,description:"",name:"Speakeasy",slug:"speakeasy",parent:6328,details:{noun:"",vibes:[],msv:"5400",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10373,description:"",name:"Specialty Food Store",slug:"specialty_foods",parent:6304,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10208,description:"",name:"Spin / Cycle",slug:"spin_cycle",parent:6337,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10241,description:"",name:"Sporting Goods",slug:"sporting_rental",parent:6337,details:{noun:"",sub_categories:[],vibes:[],msv:"100",icon:"",feature_in_app_:!1},parent_slug:"games",level:3},{id:6337,description:"",name:"Sports &amp; Fitness",slug:"games",parent:6295,details:{noun:"Sports & Fitness",sub_categories:[{slug:"all",id:6295},{id:10235,slug:"bowling"},{id:10187,slug:"boxing"},{id:10190,slug:"climbing"},{id:10193,slug:"crossfit"},{id:10196,slug:"dance"},{id:10199,slug:"gym"},{id:10211,slug:"gymnastics"},{id:10202,slug:"hike-games"},{id:10214,slug:"ice_skating"},{id:10217,slug:"laser_tag"},{id:10220,slug:"minature_golf"},{id:10238,slug:"paint_ball"},{id:10205,slug:"pilates"},{id:10223,slug:"pool"},{id:10244,slug:"recreation_center"},{id:10226,slug:"rock_climbing"},{id:10232,slug:"skating"},{id:10208,slug:"spin_cycle"},{id:10241,slug:"sporting_rental"},{id:10229,slug:"tennis"},{id:9893,slug:"yoga"}],vibes:["healthy","adventurous","social","fun","local","playtime","inclusive","alternative"],msv:"2000",icon:"health",feature_in_app_:!0,sections:!1},parent_slug:"all",level:2},{id:6317,description:"",name:"Stand up",slug:"stand-up",parent:6292,details:{msv:"170",sub_categories:[],vibes:[]},parent_slug:"comedy",level:3},{id:10253,description:"",name:"Statue",slug:"statue",parent:6298,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"visit",level:3},{id:6294,description:"Explore the best places to stay in %city%. From hotels to guest houses, bed and breakfasts there are great places to stay downtown or in nearby neighborhoods. There's a cozy, adventurous, fun, modern, luxury place to stay that will match your vibe. Plan your visit and book discounted stays with your partner sites.",name:"Stay",slug:"stay",parent:6295,details:{noun:"Hotels",sub_categories:[{id:10181,slug:"bed_breakfast"},{id:10638,slug:"cabin"},{id:10172,slug:"campground"},{id:10184,slug:"co_working"},{id:10644,slug:"cottage"},{id:10647,slug:"guest-house"},{id:10175,slug:"home_share"},{id:10169,slug:"hostel"},{id:10166,slug:"hotels"},{id:10635,slug:"inn"},{id:10653,slug:"lodge"},{id:10632,slug:"motel"},{id:10178,slug:"resort"},{id:10650,slug:"vacation-rental"},{id:10641,slug:"villa"}],msv:"5000",icon:"hotel",vibes:["boutique","local","luxury","design","cheap","minimalist"],feature_in_app_:!1,sections:!1},parent_slug:"all",level:2},{id:10130,description:"",name:"Steakhouse",slug:"steakhouse",parent:6331,details:{noun:"",vibes:[],msv:"9000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10427,description:"",name:"Studio",slug:"studio",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"art",level:3},{id:10133,description:"",name:"Sushi",slug:"sushi",parent:6331,details:{noun:"",vibes:[],msv:"12000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10136,description:"",name:"Tacos",slug:"tacos",parent:6331,details:{noun:"",vibes:[],msv:"2400",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10142,description:"",name:"Tapas",slug:"tapas",parent:6331,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10563,description:"",name:"Tattoo Parlor",slug:"tattoo_parlor",parent:9884,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"beauty",level:3},{id:10145,description:"",name:"Tea",slug:"tea",parent:6328,details:{noun:"Tea",vibes:[],msv:"1000",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10286,description:"",name:"Temple",slug:"temple",parent:6293,details:{noun:"",vibes:[],msv:"1",icon:"",parent_categories:[],sub_categories:[]}},{id:10229,description:"",name:"Tennis",slug:"tennis",parent:6337,details:{noun:"",vibes:[],msv:"700",icon:"",sub_categories:[]},parent_slug:"games",level:3},{id:10148,description:"",name:"Thai",slug:"thai",parent:6331,details:{noun:"",vibes:[],msv:"2900",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10397,description:"",name:"Theater",slug:"theater",parent:6291,details:{noun:"",sub_categories:[{id:10496,slug:"broadway"}],vibes:[],msv:"6600",icon:"",feature_in_app_:!0},parent_slug:"performance",level:3},{id:10382,description:"",name:"Thrift Store",slug:"thrift_store",parent:6304,details:{noun:"",vibes:[],msv:"6600",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:10139,description:"",name:"Tiawanese",slug:"tiawanese",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:13943,description:"",name:"Tiki Bar",slug:"tiki",parent:6328,details:{noun:"",vibes:[],msv:"1",icon:"",feature_in_app_:!1,sub_categories:[]},parent_slug:"drink",level:3},{id:10247,description:"",name:"Tour",slug:"tour",parent:6298,details:{noun:"",vibes:[],msv:"9900",icon:"",sub_categories:[]},parent_slug:"visit",level:3},{id:10265,description:"",name:"Tourist Destination",slug:"tourist_destination",parent:6298,details:{noun:"",sub_categories:[{slug:"visit",id:6298}],vibes:[],msv:"1",icon:"",feature_in_app_:!1},parent_slug:"visit",level:3},{id:10367,description:"",name:"Toy Store",slug:"toy_store",parent:10361,details:{noun:"",vibes:[],msv:"1300",icon:"",sub_categories:[]},parent_slug:"kids",level:3},{id:10151,description:"",name:"Turkish",slug:"turkish",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:9923,description:"",name:"Urban Farm",slug:"urbanfarm",parent:6340,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"outdoors",level:3},{id:10154,description:"",name:"Uzbek",slug:"uzbek",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10650,description:"",name:"Vacation Rental",slug:"vacation-rental",parent:6294,details:{noun:"Vacation Rental",vibes:[],msv:"900",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10157,description:"",name:"Vegan",slug:"vegan",parent:6331,details:{noun:"",vibes:[],msv:"2400",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10160,description:"",name:"Vegetarian",slug:"vegetarian",parent:6331,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10163,description:"",name:"Vietnamese",slug:"vietnamese",parent:6331,details:{noun:"",vibes:[],msv:"390",icon:"",sub_categories:[]},parent_slug:"food",level:3},{id:10641,description:"",name:"Villa",slug:"villa",parent:6294,details:{noun:"Villa",vibes:["luxury","relaxing"],msv:"210",icon:"",sub_categories:[]},parent_slug:"stay",level:3},{id:10385,description:"",name:"Vintage Store",slug:"vintage",parent:6304,details:{noun:"",vibes:[],msv:"390",icon:"",sub_categories:[]},parent_slug:"shop",level:3},{id:6298,description:"Visitors guide to the best of %city%. Discover culture, history, and landmarks while having a fun, memorable time sightseeing and exploring. We've collected must see spots and favorite for tourist and locals alike. Plan your trip or weekend getaway and book these attractions for free or at a discount.",name:"Visit",slug:"visit",parent:6295,details:{noun:"Attractions",sub_categories:[{id:10262,slug:"amusement_park"},{id:10436,slug:"aquarium"},{id:10250,slug:"landmark"},{id:10256,slug:"mural"},{id:10277,slug:"museum"},{id:10259,slug:"public_art"},{id:10253,slug:"statue"},{id:10247,slug:"tour"},{id:10265,slug:"tourist_destination"},{id:10460,slug:"zoo"}],vibes:["popular","scenic","family","artsy","historic","upscale","weekend","aquatic","botanical","cheap","cultural","dreamy","healthy","lgbtq","local","relaxing","sunny","tropical","urban","fun","tourist","cool"],msv:"5500",icon:"visitLogo",feature_in_app_:!1,sections:!1},parent_slug:"all",level:2},{id:10457,description:"",name:"Visitor Center",slug:"visitor_center",parent:6291,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"museum",level:3},{id:9878,description:"",name:"Wellness",slug:"health",parent:6295,details:{noun:"Health & Wellness",sub_categories:[{id:9881,slug:"acupuncture"},{id:9884,slug:"beauty"},{id:10566,slug:"cannabis"},{id:9899,slug:"ivtherapy"},{id:9887,slug:"massage"},{id:9890,slug:"meditation"},{id:9902,slug:"retreat"},{id:9896,slug:"spa"},{id:9893,slug:"yoga"}],vibes:[],msv:"4000",icon:"",feature_in_app_:!1,sections:!1},parent_slug:"all",level:2},{id:10331,description:"",name:"Wine Bar",slug:"wine_bar",parent:6328,details:{noun:"",vibes:[],msv:"2000",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:10328,description:"",name:"Winery",slug:"winery",parent:6328,details:{noun:"",vibes:[],msv:"3000",icon:"",sub_categories:[]},parent_slug:"drink",level:3},{id:15052,description:"",name:"Wings",slug:"wings",parent:6331,details:{noun:"",vibes:[],msv:"400",icon:"",feature_in_app_:!1,sub_categories:[],sections:!1},parent_slug:"food",level:3},{id:10532,description:"",name:"World / International",slug:"world_international",parent:6343,details:{noun:"",vibes:[],msv:"1",icon:"",sub_categories:[]},parent_slug:"music",level:3},{id:9893,description:"",name:"Yoga",slug:"yoga",parent:9878,details:{noun:"",vibes:[],msv:"1600",icon:"",sub_categories:[]},parent_slug:"health",level:3},{id:10460,description:"",name:"Zoo",slug:"zoo",parent:6291,details:{noun:"",sub_categories:[],vibes:[],msv:"20000",icon:""},parent_slug:"visit",level:3}],allActivities={activityCategories:activityCategories$1},asset={font:{icon:{name:"Nantes",woff:"https://etldev.blob.core.windows.net/fonts/Nantes-Regular.woff"}}},color={base:{white:"#ffffff",black:"#000000",gray:{50:"#f9f7fc",100:"#efeff4",200:"#e2e2ed",300:"#e4e4ea",400:"#d1d0d8",500:"#b2b1bc",600:"#9999a3",700:"#7d7c84",800:"#535156",900:"#3c3b3f",1e3:"#242326"},yellow:{bright:"#fdff00",deep:"#ef9b0d",light:"#fef483",pastel:"#f1ffcf",primary:"#fded35"},lime:{bright:"#64ff00",deep:"#58e86b",light:"#a8f36a",pastel:"#d4ffdc",primary:"#78ec6c"},green:{bright:"#54ff95",deep:"#006e59",light:"#61ecb2",pastel:"#b4ffd9",primary:"#00b459"},teal:{bright:"#00ffe4",deep:"#205273",light:"#00cec8",pastel:"#c4f7f4",primary:"#57b5b1"},blue:{bright:"#0000ff",deep:"#000045",light:"#3cd8ff",pastel:"#a0e5f7",primary:"#2d76cc"},violet:{bright:"#6b00d7",deep:"#190087",light:"#5172bf",pastel:"#cad8f9",primary:"#1d54d7"},purple:{bright:"#9100ff",deep:"#4e0089",light:"#d391fa",pastel:"#e5d0ff",primary:"#b34eff"},magenta:{bright:"#ff00ff",deep:"#7e1a65",light:"#e779b8",pastel:"#ffc4ff",primary:"#c400c4"},red:{bright:"#ff0000",deep:"#a30000",light:"#ff6434",pastel:"#ffccbc",primary:"#dd2c00"},orange:{bright:"#ef7200",deep:"#e55929",light:"#d99566",pastel:"#fff3e0",primary:"#ff5722"},golden:{bright:"#f7941d",deep:"#c66900",light:"#ffc947",pastel:"#ffffe4",primary:"#ff9800"}},heatmap:{first:"rgba(255, 200, 71, 0.8)",second:"rgba(255, 0, 255, 0.8)",third:"rgba(178, 77, 255, 0.8)",fourth:"rgba(161, 230, 247, 0.6)",fifth:"rgba(205, 244, 208, 0.4)",sixth:"#f9f7fc"},vibes:{absurd:{primary:"#a8f36a",secondary:"#00ffe4"},active:{primary:"#64ff00",secondary:"#c4f7f4"},activist:{primary:"#e779b8",secondary:"#ef9b0d"},adventurous:{primary:"#64ff00",secondary:"#00cec8",tertiary:"#c4f7f4"},alternative:{primary:"#f7941d",secondary:"#ffc947"},airy:{primary:"#fff3e0",secondary:"#f1ffcf"},analog:{primary:"#205273",secondary:"#ef7200"},antique:{primary:"#d99566",secondary:"#57b5b1"},artisanal:{primary:"#ffccbc",secondary:"#b4ffd9"},architectural:{primary:"#c400c4",secondary:"#fff3e0"},artsy:{primary:"#d391fa",secondary:"#006e59"},aquatic:{primary:"#0000ff",secondary:"#00ffe4"},art:{primary:"#d391fa",secondary:"#00cec8"},authentic:{primary:"#f7941d",secondary:"#b34eff"},aware:{primary:"#9100ff",secondary:"#00ffe4",tertiary:"#fff3e0"},beautiful:{primary:"#e5d0ff",secondary:"#e779b8"},belonging:{primary:"#f7941d",secondary:"#fdff00"},blissful:{primary:"#e779b8",secondary:"#f1ffcf"},boho:{primary:"#fff3e0",secondary:"#c66900"},bold:{primary:"#ef7200",secondary:"#ffc4ff"},boozy:{primary:"#ff5722",secondary:"#dd2c00"},botanical:{primary:"#b4ffd9",secondary:"#006e59"},bright:{primary:"#fdff00",secondary:"#d4ffdc"},brunch:{primary:"#fded35",secondary:"#ff00ff"},busy:{primary:"#e55929",secondary:"#ff9800"},buzzing:{primary:"#c66900",secondary:"#fded35",tertiary:"#ffc947"},calm:{primary:"#ffffe4",secondary:"#d4ffdc",tertiary:"#3cd8ff"},celebration:{primary:"#ff9800",secondary:"#f1ffcf"},celebratory:{primary:"#ff9800",secondary:"#d391fa"},charming:{primary:"#cad8f9",secondary:"#e5d0ff"},cheerful:{primary:"#ffc4ff",secondary:"#fff3e0"},chill:{primary:"#a0e5f7",secondary:"#ffccbc",tertiary:"#f1ffcf"},cinematic:{primary:"#205273",secondary:"#d391fa"},civic:{primary:"#00cec8",secondary:"#205273"},classic:{primary:"#e55929",secondary:"#c400c4"},colorful:{primary:"#ff00ff",secondary:"#00cec8"},community:{primary:"#ffccbc",secondary:"#c400c4"},contemplative:{primary:"#a0e5f7",secondary:"#c4f7f4"},cool:{primary:"#57b5b1",secondary:"#3cd8ff"},courageous:{primary:"#d391fa",secondary:"#fff3e0"},collective:{primary:"#f1ffcf",secondary:"#000045"},collectable:{primary:"#d391fa",secondary:"#f1ffcf"},cozy:{primary:"#ffffe4",secondary:"#cad8f9"},cultural:{primary:"#b34eff",secondary:"#ff00ff"},curious:{primary:"#00cec8",secondary:"#ef9b0d"},cute:{primary:"#e779b8",secondary:"#fded35"},creative:{primary:"#a0e5f7",secondary:"#9100ff"},crowded:{primary:"#000045",secondary:"#ffccbc"},datespot:{primary:"#ff00ff",secondary:"#ff0000"},drip:{primary:"#e55929",secondary:"#4e0089"},diverse:{primary:"#e5d0ff",secondary:"#00ffe4"},diy:{primary:"#5172bf",secondary:"#d391fa"},dreamy:{primary:"#d391fa",secondary:"#a0e5f7",tertiary:"#f1ffcf"},drinking:{primary:"#ff5722",secondary:"#dd2c00"},dynamic:{primary:"#9100ff",secondary:"#78ec6c"},eclectic:{primary:"#ffffe4",secondary:"#64ff00"},edgy:{primary:"#1d54d7",secondary:"#fff3e0"},energetic:{primary:"#ffc947",secondary:"#fded35",tertiary:"#c66900"},energy:{primary:"#ff5722",secondary:"#ff9800"},exciting:{primary:"#fded35",secondary:"#ff00ff"},family:{primary:"#f1ffcf",secondary:"#9100ff"},festive:{primary:"#ffc947",secondary:"#ff00ff"},fierce:{primary:"#a30000",secondary:"#ffccbc"},folk:{primary:"#a30000",secondary:"#fded35"},fragrant:{primary:"#b4ffd9",secondary:"#d4ffdc"},friendly:{primary:"#3cd8ff",secondary:"#d391fa"},fun:{primary:"#ffffe4",secondary:"#00ffe4"},funny:{primary:"#00cec8",secondary:"#fded35"},generous:{primary:"#2d76cc",secondary:"#a8f36a"},happy:{primary:"#ef9b0d",secondary:"#d4ffdc"},healthy:{primary:"#c4f7f4",secondary:"#58e86b"},hippie:{primary:"#ffc4ff",secondary:"#ff9800"},historic:{primary:"#c66900",secondary:"#fff3e0"},hopeful:{primary:"#f7941d",secondary:"#d4ffdc"},inclusive:{primary:"#6b00d7",secondary:"#61ecb2"},iconic:{primary:"#7e1a65",secondary:"#ffc4ff"},inspired:{primary:"#b4ffd9",secondary:"#58e86b"},intimate:{primary:"#dd2c00",secondary:"#ffccbc"},joyful:{primary:"#3cd8ff",secondary:"#ffc4ff"},kitschy:{primary:"#ffccbc",secondary:"#006e59"},legacy:{primary:"#d391fa",secondary:"#e5d0ff"},lit:{primary:"#fded35",secondary:"#ff0000"},lively:{primary:"#ff5722",secondary:"#61ecb2"},local:{primary:"#ff00ff",secondary:"#a8f36a"},loud:{primary:"#ff5722",secondary:"#64ff00"},love:{primary:"#c400c4",secondary:"#b34eff"},magical:{primary:"#ef9b0d",secondary:"#c400c4"},mindful:{primary:"#fef483",secondary:"#d99566"},minimalist:{primary:"#e2e2ed",secondary:"#c4f7f4"},moody:{primary:"#ffccbc",secondary:"#190087"},musical:{primary:"#00ffe4",secondary:"#9100ff"},mystic:{primary:"#f1ffcf",secondary:"#c400c4"},natural:{primary:"#61ecb2",secondary:"#ffccbc"},neon:{primary:"#fdff00",secondary:"#64ff00"},new:{primary:"#64ff00",secondary:"#e5d0ff"},nostalgic:{primary:"#fff3e0",secondary:"#190087",tertiary:"#d99566"},old:{primary:"#57b5b1",secondary:"#ffccbc"},"old-school":{primary:"#190087",secondary:"#d99566",tertiary:"#fff3e0"},outdoors:{primary:"#78ec6c",secondary:"#3cd8ff"},party:{primary:"#9100ff",secondary:"#ffccbc"},patio:{primary:"#fded35",secondary:"#a8f36a"},passionate:{primary:"#ff6434",secondary:"#ffc947"},peaceful:{primary:"#3cd8ff",secondary:"#fff3e0"},playful:{primary:"#00cec8",secondary:"#a8f36a",tertiary:"#00cec8"},playtime:{primary:"#00cec8",secondary:"#a8f36a",tertiary:"#00cec8"},popular:{primary:"#e779b8",secondary:"#ffc947"},proud:{primary:"#0000ff",secondary:"#3cd8ff"},positive:{primary:"#ffc4ff",secondary:"#fded35"},quiet:{primary:"#cad8f9",secondary:"#57b5b1"},"quiet-energy":{primary:"#3cd8ff",secondary:"#b4ffd9",tertiary:"#ffffe4"},radical:{primary:"#c400c4",secondary:"#00ffe4"},rebel:{primary:"#205273",secondary:"#ffccbc"},relaxing:{primary:"#2d76cc",secondary:"#c4f7f4"},retro:{primary:"#2d76cc",secondary:"#ef9b0d"},romantic:{primary:"#ff0000",secondary:"#e5d0ff"},rousing:{primary:"#c4f7f4",secondary:"#f1ffcf"},scenic:{primary:"#58e86b",secondary:"#c4f7f4"},sensual:{primary:"#7e1a65",secondary:"#ffccbc"},serene:{primary:"#d4ffdc",secondary:"#fded35"},shimmy:{primary:"#d391fa",secondary:"#2d76cc"},sleepy:{primary:"#57b5b1",secondary:"#cad8f9"},social:{primary:"#ff0000",secondary:"#ffccbc",tertiary:"#f1ffcf"},solidarity:{primary:"#9100ff",secondary:"#00ffe4",tertiary:"#fff3e0"},spiritual:{primary:"#4e0089",secondary:"#ffc4ff"},spontaneous:{primary:"#e5d0ff",secondary:"#ffc4ff"},throwback:{primary:"#7e1a65",secondary:"#9100ff"},together:{primary:"#ff0000",secondary:"#ffccbc",tertiary:"#f1ffcf"},trendy:{primary:"#fef483",secondary:"#ff00ff"},trending:{primary:"#ffc947",secondary:"#d391fa"},tropical:{primary:"#54ff95",secondary:"#ff00ff"},trust:{primary:"#ffc947",secondary:"#e779b8"},underground:{primary:"#1d54d7",secondary:"#d391fa"},unique:{primary:"#0000ff",secondary:"#e5d0ff"},vibrant:{primary:"#9100ff",secondary:"#ffccbc"},views:{primary:"#3cd8ff",secondary:"#a0e5f7"},vintage:{primary:"#d99566",secondary:"#dd2c00"},volunteer:{primary:"#ff9800",secondary:"#a8f36a"},whimsical:{primary:"#3cd8ff",secondary:"#54ff95"},wild:{primary:"#00b459",secondary:"#006e59"},wistful:{primary:"#ffc947",secondary:"#ffc4ff"},witchy:{primary:"#e779b8",secondary:"#a30000"},witty:{primary:"#205273",secondary:"#a0e5f7"},zen:{primary:"#57b5b1",secondary:"#2d76cc"}},gradients:{quiet_energy:"#57b5b1 #d391fa"},text:{dark:"#3c3b3f",muted:"#535156",light:"#d1d0d8"},ui:{button:{active:"#3c3b3f",disabled:"#9999a3"},tab:{active:"#3c3b3f",disabled:"#b2b1bc"}}},column={gap:{desktop:"1.5rem",mobile:"0.5rem",list:"1.75rem"}},margin={center:"0 auto"},padding={item:"2.5rem",section:"3.5rem"},post={text:{block:{heading:30,subheading:18},card:{title:20,description:14,category:16},caption:16,category:18,cite:16,heading:{title:36,subheading:30,heading1:36,heading2:34,heading3:30,heading4:26,heading5:20,heading6:18},list:18,info:16,paragraph:18,pullquote:32}},transitions={base:{default:"0.35s ease !default"}},font={family:{sans:"Public Sans",serif:"Nantes"},height:{base:1.2,large:1.6,small:1,tall:1.8,none:0},size:{base:16,normal:16,small:14,tiny:12,micro:10,large:18},weight:{base:300,light:200,normal:300,link:400,medium:500,bold:700}},units={base:{base:4,huge:12,large:8,nano:.4,small:2,tiny:1}},variables={asset:asset,color:color,column:column,"line-height":{tall:1.8,large:1.6,base:1.2,small:1,none:0},margin:margin,padding:padding,post:post,transitions:transitions,font:font,units:units};const jsonpack=__webpack_require__(/*! jsonpack */ "./node_modules/jsonpack/main.js");let activityCategories={},allVibes=[],vibeRelations=[];try{const b=__webpack_require__(/*! ../dist/vibesFromCMSTaxonomy.zip.json */ "./node_modules/vibemap-constants/dist/vibesFromCMSTaxonomy.zip.json"),c=(allVibes=jsonpack.unpack(b),__webpack_require__(/*! ../dist/vibeRelations.zip.json */ "./node_modules/vibemap-constants/dist/vibeRelations.zip.json"));vibeRelations=jsonpack.unpack(c),activityCategories=allActivities.activityCategories}catch(e){console.log("Error upacking vibes ",e)}const getVibeInfo=(i="chill")=>{var e=allVibes.find(e=>e.slug===i);return e||null},getVibesFromSlugs=e=>{const s=[];return e.forEach(i=>{var e=allVibes.find(e=>e.slug===i);e&&s.push(e)}),s},getVibeGradient=(i="chill")=>{let e="#DDDDDD",s="#AAAAAA";var a=variables.color.vibes,n=(allVibes.filter(e=>i===e.key),a[i]),a=(a[i]&&(e=n.primary,s=n.secondary),{color1:e,color2:s,gradient:`linear-gradient(44deg, ${e} 20%, ${s} 100% )`});return a},getCategory=(i="food")=>{var e=activityCategories.find(e=>e.slug===i);return e||null},getCategoriesByLevel=(i=2)=>{return activityCategories.filter(e=>{return parseInt(e.level)==i})},flattenCategories=(e,a=1)=>{let n=[];return e.forEach(e=>{const{subcategories:i,...s}=e;n.push(s),1<a&&i&&0<i.length&&(n=[...n,...flattenCategories(i,a-1)])}),n},activityCategoryToOptions=e=>{return e.map(e=>{var i=e.seo&&e.seo.focuskw&&0<e.seo.focuskw.length?e.seo.focuskw:e&&e.title?e.title:e.name;return{key:e.slug,label:i,seo:e.seo,title:e.name,value:e.slug,level:e.level}})},getSubCategories=(i="all",e="all")=>{const s=activityCategories;const a=s.find(e=>e.slug===i).details.sub_categories;let n=[];switch(e){case"keys":n=a.map(e=>e.slug);break;case"all":n=a.map(e=>getCategory(e.slug));break;default:n=a}return n},getVibes=(e="keys")=>{let i=[];return i="keys"===e?allVibes.map(e=>e.slug):allVibes},searchCategories=(e="ing",i=.2,s=["name","definition","title"])=>{s={includeScore:!0,keys:s,threshold:i};const a=new Fuse__default.default(activityCategories,s);return a.search(e)},searchVibes=(e="ing",i=.2,s=["name","definition"])=>{s={includeScore:!0,keys:s,threshold:i};const a=new Fuse__default.default(allVibes,s);return a.search(e)},getVibePreferences=(e="matrix",i=null,s=0,a=!0)=>{if(!i||!i.extra_data)throw new Error("getVibePreferences: the data parameter must have a `extra_data` property");const n=getVibes("keys");let t=n.map(e=>0);const r={favorites:1,myvibes:1,vibepoints:{search:.1,vibecheck:.4,save:.5},upvotedvibes:{vibenames:.4,meta:.2},vibecheckhistory:.7},o=i.extra_data,l=(o.favorites&&Object.values(o.favorites).forEach(e=>{e&&e.properties&&e.properties.vibes&&e.properties.vibes.forEach(e=>{n.includes(e)&&(e=n.indexOf(e),t[e]=t[e]+r.favorites)})}),o.myVibes&&o.myVibes.map(function(e){n.includes(e)&&(e=n.indexOf(e),t[e]=t[e]+r.myvibes)}),o.vibePoints&&o.vibePoints.forEach(e=>{switch(e.reason){case"search vibes":e.searchVibes.forEach(e=>{e=n.indexOf(e);t[e]=t[e]+r.vibepoints.search});break;case"vibe check":if(!e.vibeCheckVibe[0])return;e.vibeCheckVibe[0].forEach(e=>{e=n.indexOf(e);t[e]=t[e]+r.vibepoints.vibecheck})}}),o.upvotedVibes&&Object.values(o.upvotedVibes).forEach(e=>{if(e&&e.place&&e.place.properties&&e.place.properties.vibes){const i=e.place.properties.vibes;i.forEach(e=>{n.includes(e)&&(e=n.indexOf(e),t[e]=t[e]+r.upvotedvibes.meta)}),e&&e.vibeNames&&e.vibeNames.forEach(e=>{n.includes(e)&&(e=n.indexOf(e),t[e]=t[e]+r.upvotedvibes.vibenames)})}}),o.vibeCheckHistory&&o.vibeCheckHistory.forEach(e=>{e&&e.vibes&&e.vibes.forEach(e=>{e.forEach(e=>{n.includes(e)&&(e=n.indexOf(e),t[e]=t[e]+r.vibecheckhistory)})})}),t.reduce((e,i)=>e<i?i:e,0));if("matrix"===e)return a&&0!==l?t.map(e=>e/l):t;const u=t.map((e,i)=>{return{key:n[i],score:a&&0!==l?e/l:e}}),d=u.sort((e,i)=>i.score-e.score),c=d.filter(e=>e.score>s);return c.map(({key:e})=>e)},getVibesFromVibeTimes=e=>{var i=e&&0<e.length?e.sort((e,i)=>i.score-e.score).map(e=>e.name):[];return console.log("Handle these vibe times: ",e,i),i},getRelatedVibes=(e=["chill"],t=.4)=>{let r=e;e=e.flatMap(e=>{var i=getVibeInfo(e);let s=[];i&&i.details&&i.details.vibes&&(r=r.concat(i.details.vibes)),i&&i.alias&&(s=r.concat([i.alias]));var a=vibeRelations[e];const n=[];for(e in a)a[e]>=t&&n.push(e);return s=r.concat(n)});return[...new Set(e)]},yourvibe_scale_v1=e=>{let i=1.061645*e**.289052;return 1<i?i=1:i<0&&(i=0),i},normalize_all=(e=500,i=1,s=100,a=1,n=10)=>{return LinearScale__default.default().domain([i,s]).range([a,n])(e)},percent_yourvibe=(e,s)=>{let a=1/e.length,n=0;var t=[];let r=0;e.map(i=>{s.includes(i)&&(n+=a,r+=1),i in vibeRelations&&s.map(e=>{e in vibeRelations[i]&&t.push(vibeRelations[i][e])})});var i=s.length-r,i=(i=1<=t.length&&1<i?Math.log10(10)/Math.log10(20):1<=t.length&&1==i?t[0]:0,normalize_all(i,0,1,0,a*(e.length-r)));n+=i;let o=yourvibe_scale_v1(n);return o<=0&&(o=.5),Math.round(100*o)};exports.activityCategoryToOptions=activityCategoryToOptions,exports.flattenCategories=flattenCategories,exports.getCategoriesByLevel=getCategoriesByLevel,exports.getCategory=getCategory,exports.getRelatedVibes=getRelatedVibes,exports.getSubCategories=getSubCategories,exports.getVibeGradient=getVibeGradient,exports.getVibeInfo=getVibeInfo,exports.getVibePreferences=getVibePreferences,exports.getVibes=getVibes,exports.getVibesFromSlugs=getVibesFromSlugs,exports.getVibesFromVibeTimes=getVibesFromVibeTimes,exports.normalize_all=normalize_all,exports.percent_yourvibe=percent_yourvibe,exports.searchCategories=searchCategories,exports.searchVibes=searchVibes,exports.yourvibe_scale_v1=yourvibe_scale_v1;
//# sourceMappingURL=vibes.js.map


/***/ }),

/***/ "./node_modules/vibemap-constants/dist/wordpress.js":
/*!**********************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/wordpress.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:!0}));var Axios=__webpack_require__(/*! axios */ "./node_modules/axios/index.js"),axiosRetry=__webpack_require__(/*! axios-retry */ "./node_modules/axios-retry/index.js");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var Axios__default=_interopDefaultLegacy(Axios),axiosRetry__default=_interopDefaultLegacy(axiosRetry),cities=[{id:57206,slug:"tampa",type:"early",location:{latitude:27.950575,longitude:-82.4571776},centerpoint:[-82.4571776,27.950575],mailchimp_id:"",radius:10,name:"Tampa"},{id:56490,slug:"berkeley",type:"official",location:{latitude:37.8715226,longitude:-122.273042},centerpoint:[-122.273042,37.8715226],mailchimp_id:"",radius:12,name:"Berkeley"},{id:56488,slug:"alameda",type:"early",location:{latitude:37.7798721,longitude:-122.2821855},centerpoint:[-122.2821855,37.7798721],mailchimp_id:"",radius:12,name:"Alameda"},{id:55524,slug:"san-jose",type:"early",location:{latitude:37.33874,longitude:-121.8852525},centerpoint:[-121.8852525,37.33874],mailchimp_id:"ef90288b3c",radius:15,name:"San Jose"},{id:55522,slug:"dallas",type:"early",location:{latitude:32.7766642,longitude:-96.79698789999999},centerpoint:[-96.79698789999999,32.7766642],mailchimp_id:"f0de27e219",radius:10,name:"Dallas"},{id:55517,slug:"norfolk",type:"early",location:{latitude:36.8507689,longitude:-76.28587259999999},centerpoint:[-76.28587259999999,36.8507689],mailchimp_id:"",radius:10,name:"Norfolk"},{id:53994,slug:"ciudad-de-mexico",type:"early",location:{latitude:19.4326077,longitude:-99.133208},centerpoint:[-99.133208,19.4326077],mailchimp_id:"518242369a",radius:15,name:"Mexico City"},{id:52306,slug:"peoria",type:"early",location:{latitude:40.6936488,longitude:-89.5889864},centerpoint:[-89.5889864,40.6936488],mailchimp_id:"58578fcae6",radius:10,name:"Peoria"},{id:51835,slug:"toronto",type:"official",location:{latitude:43.653226,longitude:-79.3831843},centerpoint:[-79.3831843,43.653226],mailchimp_id:"95135b1969",radius:20,name:"Toronto"},{id:45678,slug:"houston",type:"official",location:{latitude:29.760314934412516,longitude:-95.36962040978698},centerpoint:[-95.36962040978698,29.760314934412516],mailchimp_id:"ea2fe099f2",radius:30,name:"Houston"},{id:44901,slug:"puerto-vallarta",type:"early",location:{latitude:20.615046993637947,longitude:-105.231817181398},centerpoint:[-105.231817181398,20.615046993637947],mailchimp_id:"57c905a1df",radius:4,name:"Puerto Vallarta"},{id:38387,slug:"austin",type:"early",location:{latitude:30.267153,longitude:-97.7430608},centerpoint:[-97.7430608,30.267153],mailchimp_id:"1d933c234f",radius:20,name:"Austin"},{id:38380,slug:"denver",type:"official",location:{latitude:39.7392358,longitude:-104.990251},centerpoint:[-104.990251,39.7392358],mailchimp_id:"b576abf895",radius:20,name:"Denver"},{id:38148,slug:"chicago",type:"official",location:{latitude:41.8781136,longitude:-87.6297982},centerpoint:[-87.6297982,41.8781136],mailchimp_id:"b865b3ef72",radius:20,name:"Chicago"},{id:38143,slug:"new-york",type:"official",location:{latitude:40.7127610684055,longitude:-74.0060103509262},centerpoint:[-74.0060103509262,40.7127610684055],mailchimp_id:"56ebd9923f",radius:20,name:"New York"},{id:38137,slug:"san-diego",type:"official",location:{latitude:32.715738,longitude:-117.1610838},centerpoint:[-117.1610838,32.715738],mailchimp_id:"7fb6e2a465",radius:20,name:"San Diego"},{id:38119,slug:"los-angeles",type:"official",location:{latitude:34.04734503476973,longitude:-118.25308336038819},centerpoint:[-118.25308336038819,34.04734503476973],mailchimp_id:"7fb6e2a465",radius:30,name:"Los Angeles"},{id:1450,slug:"guadalajara",type:"official",location:{latitude:20.65969879999999,longitude:-103.3496092},centerpoint:[-103.3496092,20.65969879999999],mailchimp_id:"0154de5655",radius:10,name:"Guadalajara"},{id:1447,slug:"oakland",type:"official",location:{latitude:37.79831556913852,longitude:-122.25940509567872},centerpoint:[-122.25940509567872,37.79831556913852],mailchimp_id:"da0894a0e6",radius:20,name:"Oakland"},{id:1444,slug:"san-francisco",type:"official",location:{latitude:37.7749295,longitude:-122.4194155},centerpoint:[-122.4194155,37.7749295],mailchimp_id:"f30df08e52",radius:5,name:"San Francisco"},{id:1441,slug:"portland",type:"official",location:{latitude:45.52342768785231,longitude:-122.67428398132324},centerpoint:[-122.67428398132324,45.52342768785231],mailchimp_id:"27c0467a17",radius:9,name:"Portland"},{id:1438,slug:"seattle",type:"official",location:{latitude:47.6062095,longitude:-122.3320708},centerpoint:[-122.3320708,47.6062095],mailchimp_id:"baadb78d87",radius:8,name:"Seattle"},{id:1435,slug:"vancouver",type:"official",location:{latitude:49.2827291,longitude:-123.1207375},centerpoint:[-123.1207375,49.2827291],mailchimp_id:"da30e0d7dc",radius:7,name:"Vancouver"}];axiosRetry__default.default(Axios__default.default,{retries:3,retryDelay:axiosRetry__default.default.exponentialDelay});const jsonpack=__webpack_require__(/*! jsonpack */ "./node_modules/jsonpack/main.js"),GATSBY_WP_BASEURL="https://cms.vibemap.com",REST_PATH="/wp-json/wp/v2/",helpers=__webpack_require__(/*! ./helpers.js */ "./node_modules/vibemap-constants/dist/helpers.js"),postCategories=__webpack_require__(/*! ../dist/postCategories */ "./node_modules/vibemap-constants/dist/postCategories.json");let vibeTaxonomy=[],activityCategories=[];try{const b=__webpack_require__(/*! ../dist/vibesFromCMSTaxonomy.zip.json */ "./node_modules/vibemap-constants/dist/vibesFromCMSTaxonomy.zip.json");vibeTaxonomy=jsonpack.unpack(b)}catch(e){console.log("Error with packed vibes ",e)}try{const d=__webpack_require__(/*! ../dist/activityCategories.zip.json */ "./node_modules/vibemap-constants/dist/activityCategories.zip.json");activityCategories=jsonpack.unpack(d)}catch(e){console.log("Error with packed activityCategories ",e)}const defaultFilters={categories:[],cities:[],vibesets:[],vibes:[]},getTaxonomyIds=(e,t=["chill"])=>{switch(e){case"category":return t.map(e=>{const t=helpers.filterList(activityCategories,e,"slug");return 0<t.length?t.map(e=>e.id):[]});case"vibe":return t.map(e=>{const t=helpers.filterList(vibeTaxonomy,e,"slug");return 0<t.length?t.map(e=>e.id):[]});case"cities":return t.map(e=>{const t=helpers.filterList(cities,e,"slug");return 0<t.length?t.map(e=>e.id):[]})}return[]},fetchBadges=async()=>{var e=GATSBY_WP_BASEURL+REST_PATH+"badges";return await Axios__default.default.get(e).catch(e=>console.error(e))},fetchCities=async(e=50)=>{e=`?_fields=id, link, name, radius, slug, title, acf, type
    &per_page=`+e,e=GATSBY_WP_BASEURL+REST_PATH+"city"+e;return await Axios__default.default.get(e).catch(e=>console.error(e))},fetchNeighborhoods=async(e=defaultFilters,t=1,a=100)=>{var i=Axios__default.default.CancelToken.source(),o=GATSBY_WP_BASEURL+"/wp-json/wp/v2/neighborhoods?_fields=id, slug, type, link, _links, title, categories, vibe, acf, content, featured_media, featured_media_src_url";console.log("Wordpress URL ",o);let r=await Axios__default.default.get(o,{cancelToken:i.token,params:{_embed:!0,per_page:a,page:1<=t?t:1,categories:e.category,vibesets:e.vibesets.toString()}}).catch(e=>{console.error(e)});return r.numPages=parseInt(r.headers["x-wp-totalpages"]),r},fetchActivityCategories=async(e=defaultFilters,t=1,a=100,i)=>{var o=async(e=1,t=100)=>{var a=Axios__default.default.CancelToken.source(),i="activity-category",o=Math.random(),t=GATSBY_WP_BASEURL+`/wp-json/wp/v2/${i}?per_page=${t}&page=${e}&refresh=`+o,e=(console.log(`Fetching ${i} from `+t),await Axios__default.default.get(t,{cancelToken:a.token}).catch(e=>{console.error(e)}));return e.data};let r=await o(t,a),l=!0;var s;let n=t;for(console.log("Has more?  ",r.length,n*a);l;)r.length>=n*a?(s=await o(n+=1).catch(e=>console.error(e)),r=r.concat(s)):l=!1;return console.log("Got this many activities: ",r.length),r},fetchCategories=async(e=defaultFilters,t,a)=>{var i=Axios__default.default.CancelToken.source();let o=await Axios__default.default.get(GATSBY_WP_BASEURL+"/wp-json/wp/v2/categories/",{cancelToken:i.token}).catch(e=>{console.error(e)});return o.numPages=parseInt(o.headers["x-wp-totalpages"]),o},getCityInfo=(t="San Francisco",a=null)=>{let e=null;a&&(a=a.toString(),i=cities.filter(e=>e.slug===a.toString()),e=0<i.length?i[0]:null);var i=cities.filter(e=>e.name===t);return e=0<i.length?i[0]:null},filterNeighborhoods=(e,t="San Francisco",a=null)=>{var i;a&&(a=a.toString(),i=cities.filter(e=>e.slug===a.toString()),t=0<i.length?i[0].title.rendered:null);return t||a?filter(e,e=>e.city===t||e.title.includes(t)):e},fetchVibeTaxonomy=async(e=1,t=100,i=["acf","id","link","name","slug","description"],o=!0)=>{var a=async(e=1,t=100)=>{const a=new Date;t=`?_fields=${i.join(",")}&per_page=${t}&page=`+e,e=GATSBY_WP_BASEURL+REST_PATH+"vibe"+t+(o?"&"+a.toISOString():"");return(await Axios__default.default.get(e).catch(e=>console.error(e))).data};let r=await a(e,t),l=!0;var s;let n=e;for(;l;)r.length>=n*t?(s=await a(n+=1).catch(e=>console.error(e)),r=r.concat(s)):l=!1;return r},getGroups=async({city:t=null,per_page:e=100}={})=>{e="?_fields=id,date,slug,title,acf&per_page="+e,e=GATSBY_WP_BASEURL+REST_PATH+"group"+e;const a=(await Axios__default.default.get(e).catch(e=>(console.error(e.response.statusText),{error:!0,data:{data:[]},message:e}))).data;e=a&&"object"==typeof a?a.filter(e=>{return e.acf.map&&t?t==e.acf.map.city:(e.title=e.title.rendered,!0)}):[];return e?{error:!1,data:e,message:`Got ${e.length} groups`}:{error:!0,data:[],message:"No data for groups"}},getPosts=async(e=defaultFilters,t=!1,a=20,i=["id","date","slug","status","type","link","title","content","excerpt","author","categories","vibe","blocks","acf","featured_media","featured_media_src_url"],o=!1,r=!1)=>{o=o?"&_embed":"",i="?_fields="+i.join(",");const l=new Date;i=""+GATSBY_WP_BASEURL+REST_PATH+"posts"+i+o+(r?"&"+l.toISOString():"");const s={per_page:a,cities:getTaxonomyIds("cities",e.cities).toString(),sticky:!0};e.category&&0<e.category.length&&(s.category=getTaxonomyIds("category",e.category).toString()),e.vibes&&0<e.vibes.length&&(s.search=e.vibes.join(", "));let n=await Axios__default.default.get(i,{params:s}).catch(e=>{console.error("Wordpress error",e)}),c=(s.sticky=!1,await Axios__default.default.get(i,{params:s}).catch(e=>console.error(e)));o=c.data.filter(e=>!0!==e.acf.hide_post).map(t=>{var e=postCategories.filter(e=>e.id===t.categories[0]);return t.category=e?e[0].name:"Guide",t});return!0===t?n:(c.data=c?n.data.concat(o):n,c)},getPost=async e=>{Axios__default.default({url:"https://cms.vibemap.com/graphql",method:"post",data:{operationName:"PostDetails",query:`query PostDetails($id: String!) {
      posts {
        nodes {
          id
          slug
        }
      }
    }
    `,variables:{id:e}}}).then(e=>{console.log(e.data)})};exports.fetchActivityCategories=fetchActivityCategories,exports.fetchBadges=fetchBadges,exports.fetchCategories=fetchCategories,exports.fetchCities=fetchCities,exports.fetchNeighborhoods=fetchNeighborhoods,exports.fetchVibeTaxonomy=fetchVibeTaxonomy,exports.filterNeighborhoods=filterNeighborhoods,exports.getCityInfo=getCityInfo,exports.getGroups=getGroups,exports.getPost=getPost,exports.getPosts=getPosts,exports.getTaxonomyIds=getTaxonomyIds;
//# sourceMappingURL=wordpress.js.map


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*************************************!*\
  !*** external "regeneratorRuntime" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["regeneratorRuntime"];

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

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/***/ ((module) => {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/toPropertyKey.js");
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toPrimitive.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toPropertyKey.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/toPrimitive.js");
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/axios-retry/lib/cjs/index.js":
/*!***************************************************!*\
  !*** ./node_modules/axios-retry/lib/cjs/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isNetworkError = isNetworkError;
exports.isRetryableError = isRetryableError;
exports.isSafeRequestError = isSafeRequestError;
exports.isIdempotentRequestError = isIdempotentRequestError;
exports.isNetworkOrIdempotentRequestError = isNetworkOrIdempotentRequestError;
exports.exponentialDelay = exponentialDelay;
exports["default"] = axiosRetry;
exports.namespace = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _isRetryAllowed = _interopRequireDefault(__webpack_require__(/*! is-retry-allowed */ "./node_modules/is-retry-allowed/index.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var namespace = 'axios-retry';
/**
 * @param  {Error}  error
 * @return {boolean}
 */

exports.namespace = namespace;

function isNetworkError(error) {
  return !error.response && Boolean(error.code) && // Prevents retrying cancelled requests
  error.code !== 'ECONNABORTED' && // Prevents retrying timed out requests
  (0, _isRetryAllowed.default)(error); // Prevents retrying unsafe errors
}

var SAFE_HTTP_METHODS = ['get', 'head', 'options'];
var IDEMPOTENT_HTTP_METHODS = SAFE_HTTP_METHODS.concat(['put', 'delete']);
/**
 * @param  {Error}  error
 * @return {boolean}
 */

function isRetryableError(error) {
  return error.code !== 'ECONNABORTED' && (!error.response || error.response.status >= 500 && error.response.status <= 599);
}
/**
 * @param  {Error}  error
 * @return {boolean}
 */


function isSafeRequestError(error) {
  if (!error.config) {
    // Cannot determine if the request can be retried
    return false;
  }

  return isRetryableError(error) && SAFE_HTTP_METHODS.indexOf(error.config.method) !== -1;
}
/**
 * @param  {Error}  error
 * @return {boolean}
 */


function isIdempotentRequestError(error) {
  if (!error.config) {
    // Cannot determine if the request can be retried
    return false;
  }

  return isRetryableError(error) && IDEMPOTENT_HTTP_METHODS.indexOf(error.config.method) !== -1;
}
/**
 * @param  {Error}  error
 * @return {boolean}
 */


function isNetworkOrIdempotentRequestError(error) {
  return isNetworkError(error) || isIdempotentRequestError(error);
}
/**
 * @return {number} - delay in milliseconds, always 0
 */


function noDelay() {
  return 0;
}
/**
 * Set delayFactor 1000 for an exponential delay to occur on the order
 * of seconds
 * @param  {number} [retryNumber=0]
 * @param  {Error}  error - unused; for existing API of retryDelay callback
 * @param  {number} [delayFactor=100] milliseconds
 * @return {number} - delay in milliseconds
 */


function exponentialDelay() {
  var retryNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var error = arguments.length > 1 ? arguments[1] : undefined;
  var delayFactor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  var delay = Math.pow(2, retryNumber) * delayFactor;
  var randomSum = delay * 0.2 * Math.random(); // 0-20% of the delay

  return delay + randomSum;
}
/**
 * Initializes and returns the retry state for the given request/config
 * @param  {AxiosRequestConfig} config
 * @return {Object}
 */


function getCurrentState(config) {
  var currentState = config[namespace] || {};
  currentState.retryCount = currentState.retryCount || 0;
  config[namespace] = currentState;
  return currentState;
}
/**
 * Returns the axios-retry options for the current request
 * @param  {AxiosRequestConfig} config
 * @param  {AxiosRetryConfig} defaultOptions
 * @return {AxiosRetryConfig}
 */


function getRequestOptions(config, defaultOptions) {
  return _objectSpread(_objectSpread({}, defaultOptions), config[namespace]);
}
/**
 * @param  {Axios} axios
 * @param  {AxiosRequestConfig} config
 */


function fixConfig(axios, config) {
  if (axios.defaults.agent === config.agent) {
    delete config.agent;
  }

  if (axios.defaults.httpAgent === config.httpAgent) {
    delete config.httpAgent;
  }

  if (axios.defaults.httpsAgent === config.httpsAgent) {
    delete config.httpsAgent;
  }
}
/**
 * Checks retryCondition if request can be retried. Handles it's retruning value or Promise.
 * @param  {number} retries
 * @param  {Function} retryCondition
 * @param  {Object} currentState
 * @param  {Error} error
 * @return {boolean}
 */


function shouldRetry(_x, _x2, _x3, _x4) {
  return _shouldRetry.apply(this, arguments);
}
/**
 * Adds response interceptors to an axios instance to retry requests failed due to network issues
 *
 * @example
 *
 * import axios from 'axios';
 *
 * axiosRetry(axios, { retries: 3 });
 *
 * axios.get('http://example.com/test') // The first request fails and the second returns 'ok'
 *   .then(result => {
 *     result.data; // 'ok'
 *   });
 *
 * // Exponential back-off retry delay between requests
 * axiosRetry(axios, { retryDelay : axiosRetry.exponentialDelay});
 *
 * // Custom retry delay
 * axiosRetry(axios, { retryDelay : (retryCount) => {
 *   return retryCount * 1000;
 * }});
 *
 * // Also works with custom axios instances
 * const client = axios.create({ baseURL: 'http://example.com' });
 * axiosRetry(client, { retries: 3 });
 *
 * client.get('/test') // The first request fails and the second returns 'ok'
 *   .then(result => {
 *     result.data; // 'ok'
 *   });
 *
 * // Allows request-specific configuration
 * client
 *   .get('/test', {
 *     'axios-retry': {
 *       retries: 0
 *     }
 *   })
 *   .catch(error => { // The first request fails
 *     error !== undefined
 *   });
 *
 * @param {Axios} axios An axios instance (the axios object or one created from axios.create)
 * @param {Object} [defaultOptions]
 * @param {number} [defaultOptions.retries=3] Number of retries
 * @param {boolean} [defaultOptions.shouldResetTimeout=false]
 *        Defines if the timeout should be reset between retries
 * @param {Function} [defaultOptions.retryCondition=isNetworkOrIdempotentRequestError]
 *        A function to determine if the error can be retried
 * @param {Function} [defaultOptions.retryDelay=noDelay]
 *        A function to determine the delay between retry requests
 * @param {Function} [defaultOptions.onRetry=()=>{}]
 *        A function to get notified when a retry occurs
 */


function _shouldRetry() {
  _shouldRetry = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(retries, retryCondition, currentState, error) {
    var shouldRetryOrPromise, shouldRetryPromiseResult;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            shouldRetryOrPromise = currentState.retryCount < retries && retryCondition(error); // This could be a promise

            if (!((0, _typeof2.default)(shouldRetryOrPromise) === 'object')) {
              _context2.next = 12;
              break;
            }

            _context2.prev = 2;
            _context2.next = 5;
            return shouldRetryOrPromise;

          case 5:
            shouldRetryPromiseResult = _context2.sent;
            return _context2.abrupt("return", shouldRetryPromiseResult !== false);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", false);

          case 12:
            return _context2.abrupt("return", shouldRetryOrPromise);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 9]]);
  }));
  return _shouldRetry.apply(this, arguments);
}

function axiosRetry(axios, defaultOptions) {
  axios.interceptors.request.use(function (config) {
    var currentState = getCurrentState(config);
    currentState.lastRequestTime = Date.now();
    return config;
  });
  axios.interceptors.response.use(null, /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(error) {
      var config, _getRequestOptions, _getRequestOptions$re, retries, _getRequestOptions$re2, retryCondition, _getRequestOptions$re3, retryDelay, _getRequestOptions$sh, shouldResetTimeout, _getRequestOptions$on, onRetry, currentState, delay, lastRequestDuration, timeout;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              config = error.config; // If we have no information to retry the request

              if (config) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", Promise.reject(error));

            case 3:
              _getRequestOptions = getRequestOptions(config, defaultOptions), _getRequestOptions$re = _getRequestOptions.retries, retries = _getRequestOptions$re === void 0 ? 3 : _getRequestOptions$re, _getRequestOptions$re2 = _getRequestOptions.retryCondition, retryCondition = _getRequestOptions$re2 === void 0 ? isNetworkOrIdempotentRequestError : _getRequestOptions$re2, _getRequestOptions$re3 = _getRequestOptions.retryDelay, retryDelay = _getRequestOptions$re3 === void 0 ? noDelay : _getRequestOptions$re3, _getRequestOptions$sh = _getRequestOptions.shouldResetTimeout, shouldResetTimeout = _getRequestOptions$sh === void 0 ? false : _getRequestOptions$sh, _getRequestOptions$on = _getRequestOptions.onRetry, onRetry = _getRequestOptions$on === void 0 ? function () {} : _getRequestOptions$on;
              currentState = getCurrentState(config);
              _context.next = 7;
              return shouldRetry(retries, retryCondition, currentState, error);

            case 7:
              if (!_context.sent) {
                _context.next = 20;
                break;
              }

              currentState.retryCount += 1;
              delay = retryDelay(currentState.retryCount, error); // Axios fails merging this configuration to the default configuration because it has an issue
              // with circular structures: https://github.com/mzabriskie/axios/issues/370

              fixConfig(axios, config);

              if (!(!shouldResetTimeout && config.timeout && currentState.lastRequestTime)) {
                _context.next = 17;
                break;
              }

              lastRequestDuration = Date.now() - currentState.lastRequestTime;
              timeout = config.timeout - lastRequestDuration - delay;

              if (!(timeout <= 0)) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", Promise.reject(error));

            case 16:
              config.timeout = timeout;

            case 17:
              config.transformRequest = [function (data) {
                return data;
              }];
              onRetry(currentState.retryCount, error, config);
              return _context.abrupt("return", new Promise(function (resolve) {
                return setTimeout(function () {
                  return resolve(axios(config));
                }, delay);
              }));

            case 20:
              return _context.abrupt("return", Promise.reject(error));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x5) {
      return _ref.apply(this, arguments);
    };
  }());
} // Compatibility with CommonJS


axiosRetry.isNetworkError = isNetworkError;
axiosRetry.isSafeRequestError = isSafeRequestError;
axiosRetry.isIdempotentRequestError = isIdempotentRequestError;
axiosRetry.isNetworkOrIdempotentRequestError = isNetworkOrIdempotentRequestError;
axiosRetry.exponentialDelay = exponentialDelay;
axiosRetry.isRetryableError = isRetryableError;
//# sourceMappingURL=index.js.map

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

/***/ "./node_modules/axios/package.json":
/*!*****************************************!*\
  !*** ./node_modules/axios/package.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}');

/***/ }),

/***/ "./node_modules/vibemap-constants/dist/activityCategories.json":
/*!*********************************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/activityCategories.json ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"activityCategories":[{"id":9881,"description":"","name":"Acupuncture","slug":"acupuncture","parent":9878,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1300","icon":"","feature_in_app_":false},"parent_slug":"health","level":3},{"id":15061,"description":"","name":"Adult Entertainment","slug":"adult_entertainment","parent":6334,"details":{"noun":"","vibes":[],"msv":"80","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":9830,"description":"","name":"Afghan","slug":"afghan","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"food","level":3},{"id":9833,"description":"","name":"African","slug":"african","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"10","icon":"","feature_in_app_":false},"parent_slug":"food","level":3},{"id":9836,"description":"","name":"Albanian","slug":"albanian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6295,"description":"Discover the best things to do in %city%, based on your vibe. Guides, events, activities, and more to help you plan a visit or weekend. Whether you’re a first time visitor or long-time local, we\'ll recommend something fun and interesting.","name":"All","slug":"all","parent":0,"details":{"noun":"Things to do","sub_categories":[{"slug":"food","id":6331},{"slug":"visit","id":6298},{"slug":"drink","id":6328},{"slug":"outdoors","id":6340},{"slug":"community","id":6293},{"slug":"events","id":6323},{"slug":"learning","id":6573},{"id":6334,"slug":"entertainment"},{"id":6304,"slug":"shop"},{"id":6337,"slug":"games"},{"id":6294,"slug":"stay"},{"id":9878,"slug":"health"}],"msv":"100000","icon":"allLogo","vibes":["dreamy","creative","fun","local","new","amazing","family","trending","classic","adventurous"],"parent_categories":false,"feature_in_app_":false},"level":1},{"id":9839,"description":"","name":"American / New American","slug":"american","parent":6331,"details":{"noun":"","vibes":[],"msv":"200","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10262,"description":"","name":"Amusement Park","slug":"amusement_park","parent":6298,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":10379,"description":"","name":"Antique Store","slug":"antique","parent":6304,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10436,"description":"","name":"Aquarium","slug":"aquarium","parent":6291,"details":{"noun":"Aquarium","sub_categories":[],"vibes":[],"msv":"2000","icon":"","feature_in_app_":false},"parent_slug":"visit","level":3},{"id":9917,"description":"","name":"Arboretum","slug":"arboretum","parent":6340,"details":{"noun":"","vibes":[],"msv":"600","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10406,"description":"","name":"Arcade","slug":"arcade","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"3000","icon":"","feature_in_app_":false},"parent_slug":"entertainment","level":3},{"id":9842,"description":"","name":"Argentinian","slug":"argentinian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6291,"description":"","name":"Art","slug":"art","parent":6334,"details":{"noun":"Art","msv":"2400","sub_categories":[{"id":10418,"slug":"art_museum"},{"id":10433,"slug":"arts_organization"},{"id":6307,"slug":"gallery"},{"id":10424,"slug":"photography"},{"id":10430,"slug":"print_shop"},{"id":10427,"slug":"studio"}],"vibes":["artsy","creative","inspired"],"icon":"art","feature_in_app_":true},"parent_slug":"entertainment","level":3},{"id":10418,"description":"","name":"Art Museum","slug":"art_museum","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"8000","icon":"","feature_in_app_":false},"parent_slug":"art","level":3},{"id":6334,"description":"","name":"Arts &amp; Entertainment","slug":"entertainment","parent":6295,"details":{"noun":"Entertainment","vibes":["fun","interesting","popular","lively","musical"],"msv":"500","icon":"entertainment","sub_categories":[{"id":10406,"slug":"arcade"},{"id":6291,"slug":"art"},{"id":10403,"slug":"casino"},{"id":6292,"slug":"comedy"},{"id":10412,"slug":"festival"},{"id":10394,"slug":"film"},{"id":6307,"slug":"gallery"},{"id":10421,"slug":"interactive"},{"id":10277,"slug":"museum"},{"id":6343,"slug":"music"},{"id":10668,"slug":"nightclub"},{"id":6570,"slug":"nightlife"},{"id":10400,"slug":"performance"},{"id":10397,"slug":"theater"}]},"parent_slug":"all","level":2},{"id":10433,"description":"","name":"Arts Organization","slug":"arts_organization","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"art","level":3},{"id":9845,"description":"","name":"Asian Fusion","slug":"asianfusion","parent":6331,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":13940,"description":"","name":"Attractions","slug":"attractions","parent":6323,"details":{"noun":"","vibes":[],"msv":"100","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"events","level":3},{"id":9848,"description":"","name":"Austrailian","slug":"austrailian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":12600,"description":"Cars, automobiles, and motorcycles","name":"Automobiles","slug":"automobiles","parent":6304,"details":{"noun":"automobiles","vibes":[],"msv":"20","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"shop","level":3},{"id":9851,"description":"","name":"Bagels","slug":"bagels","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9854,"description":"","name":"Bakery","slug":"bakery","parent":6331,"details":{"noun":"","vibes":[],"msv":"8000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9857,"description":"","name":"Bangladeshi","slug":"bangladeshi","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10656,"description":"","name":"Bar","slug":"bar","parent":6328,"details":{"noun":"Bar","sub_categories":[],"vibes":["drinking","boozy"],"msv":"18000","icon":"","feature_in_app_":true},"parent_slug":"drink","level":3},{"id":9860,"description":"","name":"Barbeque","slug":"barbeque","parent":6331,"details":{"noun":"","vibes":[],"msv":"1900","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10560,"description":"","name":"Barber Shop","slug":"barber","parent":9884,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"beauty","level":3},{"id":9932,"description":"","name":"Beach","slug":"beach","parent":6340,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"22000","icon":"","feature_in_app_":false},"parent_slug":"outdoors","level":3},{"id":9884,"description":"","name":"Beauty","slug":"beauty","parent":9878,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[{"id":10560,"slug":"barber"},{"id":10557,"slug":"hair"},{"id":10554,"slug":"nails"},{"id":10563,"slug":"tattoo_parlor"}]},"parent_slug":"health","level":3},{"id":10181,"description":"","name":"Bed &amp; Breakfast","slug":"bed_breakfast","parent":6294,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10301,"description":"","name":"Beer Garden","slug":"beer_garden","parent":6328,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":9863,"description":"","name":"Bistro","slug":"bistro","parent":6331,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":15064,"description":"","name":"Boats","slug":"boats","parent":6340,"details":{"noun":"","vibes":[],"msv":"40","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":10334,"description":"","name":"Books","slug":"books","parent":6304,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"720","icon":"","feature_in_app_":true},"parent_slug":"shop","level":3},{"id":9929,"description":"","name":"Botanical Garden","slug":"botanicalgarden","parent":6340,"details":{"noun":"","vibes":[],"msv":"320","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10235,"description":"","name":"Bowling","slug":"bowling","parent":6337,"details":{"noun":"","vibes":[],"msv":"4000","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":9866,"description":"","name":"Bowls","slug":"bowls","parent":6331,"details":{"noun":"","vibes":[],"msv":"100","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10187,"description":"","name":"Boxing","slug":"boxing","parent":6337,"details":{"noun":"","vibes":[],"msv":"700","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":9872,"description":"","name":"Brazilian","slug":"brazilian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10674,"description":"","name":"Breakfast","slug":"breakfast","parent":6331,"details":{"noun":"Breakfast","vibes":[],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10304,"description":"","name":"Brewery","slug":"brewery","parent":6328,"details":{"noun":"","vibes":[],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10662,"description":"","name":"Brewpub","slug":"brewpub","parent":6328,"details":{"noun":"Brewpub","vibes":[],"msv":"320","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10496,"description":"","name":"Broadway","slug":"broadway","parent":10397,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"theater","level":3},{"id":9869,"description":"","name":"Brunch","slug":"brunch","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"15000","icon":"","feature_in_app_":true},"parent_slug":"food","level":3},{"id":11247,"description":"","name":"Buffet","slug":"buffet","parent":6331,"details":{"noun":"","vibes":[],"msv":"400","icon":"","parent_categories":false,"sub_categories":[]}},{"id":9875,"description":"","name":"Burger","slug":"burger","parent":6331,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10469,"description":"","name":"Burlesque","slug":"burlesque","parent":10400,"details":{"noun":"","vibes":[],"msv":"300","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10472,"description":"","name":"Caberet","slug":"caberet","parent":10400,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10638,"description":"","name":"Cabin","slug":"cabin","parent":6294,"details":{"noun":"Cabin","vibes":["outdoorsy","natural","cottagecore","cottage"],"msv":"320","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":9944,"description":"","name":"Cafe","slug":"cafe","parent":6331,"details":{"noun":"Cafe","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9950,"description":"","name":"Cambodian","slug":"cambodian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10172,"description":"","name":"Campground","slug":"campground","parent":6294,"details":{"noun":"","vibes":[],"msv":"1000","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":9953,"description":"","name":"Candy","slug":"candy","parent":6331,"details":{"noun":"","vibes":[],"msv":"250","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10566,"description":"","name":"Cannabis","slug":"cannabis","parent":9878,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":true},"parent_slug":"health","level":3},{"id":9956,"description":"","name":"Caribbean","slug":"caribbean","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10403,"description":"","name":"Casino","slug":"casino","parent":6291,"details":{"noun":"","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"entertainment","level":3},{"id":9941,"description":"","name":"Cemetery","slug":"cemetery","parent":6340,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10364,"description":"","name":"Children\'s Clothing Store","slug":"childrens_clothing","parent":10361,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"kids","level":3},{"id":10439,"description":"","name":"Children\'s Museum","slug":"children_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":9959,"description":"","name":"Chinese","slug":"chinese","parent":6331,"details":{"noun":"","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10283,"description":"","name":"Church","slug":"church","parent":6293,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"community","level":3},{"id":10475,"description":"","name":"Circus","slug":"circus","parent":10400,"details":{"noun":"","vibes":[],"msv":"250","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10295,"description":"","name":"City Hall","slug":"city_hall","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"community","level":3},{"id":6573,"description":"","name":"Classes / Learning","slug":"learning","parent":6295,"details":{"vibes":["interesting","interactive","family","fun"],"icon":"learning","noun":"Learning","msv":"1","sub_categories":[{"id":6291,"slug":"art"},{"id":10680,"slug":"cooking"},{"id":10502,"slug":"dj"},{"id":6312,"slug":"improv"},{"id":6343,"slug":"music"},{"id":10424,"slug":"photography"},{"id":9893,"slug":"yoga"}]},"parent_slug":"all","level":2},{"id":10499,"description":"","name":"Classical","slug":"classical","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10190,"description":"","name":"Climbing","slug":"climbing","parent":6337,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10340,"description":"","name":"Clothes","slug":"clothes","parent":6304,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10391,"description":"","name":"Club / Dance","slug":"club","parent":6570,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10184,"description":"","name":"Co-Working Space","slug":"co_working","parent":6294,"details":{"noun":"","vibes":[],"msv":"300","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10307,"description":"","name":"Cocktails / Spirits","slug":"cocktails_spirits","parent":6328,"details":{"noun":"","vibes":[],"msv":"900","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":9947,"description":"","name":"Coffee Shop","slug":"coffeeshop","parent":6331,"details":{"noun":"","vibes":[],"msv":"4500","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9962,"description":"","name":"Colombian","slug":"colombian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6292,"description":"","name":"Comedy","slug":"comedy","parent":6295,"details":{"noun":"Comedy","vibes":["funny","raunchy","spontaneous"],"msv":"2000","icon":"comedy","sub_categories":[{"id":6317,"slug":"stand-up"}]},"parent_slug":"entertainment","level":3},{"id":6293,"description":"Explore ways to get involved in your local community. Support local businesses, volunteer, give back, or pay it forward with these community groups and hubs of local culture. ","name":"Community","slug":"community","parent":6295,"details":{"noun":"Community","sub_categories":[{"id":10283,"slug":"church"},{"id":10295,"slug":"city_hall"},{"id":10268,"slug":"community_center"},{"id":10298,"slug":"courthouse"},{"id":10274,"slug":"library"},{"id":10289,"slug":"mosque"},{"id":10277,"slug":"museum"},{"id":10271,"slug":"non_profit"}],"msv":"2","icon":"community","vibes":["community","local","cultural","multicultural","social"],"feature_in_app_":false},"parent_slug":"all","level":2},{"id":10268,"description":"","name":"Community Center","slug":"community_center","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"community","level":3},{"id":9920,"description":"","name":"Community Garden","slug":"communitygarden","parent":6340,"details":{"noun":"","vibes":[],"msv":"30","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10595,"description":"","name":"Concert","slug":"concert","parent":10400,"details":{"noun":"Concert","sub_categories":[],"vibes":["musical","lively","together"],"msv":"33000","icon":"","feature_in_app_":false},"parent_slug":"performance","level":3},{"id":10466,"description":"","name":"Conservatory","slug":"conservatory","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":10370,"description":"","name":"Convenience Store / Bodega","slug":"convenience_store","parent":6304,"details":{"noun":"","vibes":[],"msv":"100","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":13987,"description":"","name":"Cookies","slug":"cookies","parent":6331,"details":{"noun":"","vibes":[],"msv":"200","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"food","level":3},{"id":10680,"description":"","name":"Cooking","slug":"cooking","parent":6573,"details":{"noun":"Cooking","vibes":["interesting","interactive"],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"learning","level":3},{"id":10644,"description":"","name":"Cottage","slug":"cottage","parent":6294,"details":{"noun":"Cottage","vibes":["cottage","cottagecore"],"msv":"110","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10298,"description":"","name":"Courthouse","slug":"courthouse","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"community","level":3},{"id":10310,"description":"","name":"Craft Beer","slug":"craft_beer","parent":6328,"details":{"noun":"","vibes":[],"msv":"250","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10193,"description":"","name":"CrossFit","slug":"crossfit","parent":6337,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":9965,"description":"","name":"Cuban","slug":"cuban","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10442,"description":"","name":"Cultural Museum","slug":"cultural_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":9968,"description":"","name":"Cupcakes","slug":"cupcakes","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10196,"description":"","name":"Dance","slug":"dance","parent":6337,"details":{"noun":"","vibes":[],"msv":"600","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10592,"description":"","name":"Dance","slug":"dance-performance","parent":10400,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":9971,"description":"","name":"Deli","slug":"deli","parent":6331,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10445,"description":"","name":"Design Museum","slug":"design_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"10","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":10343,"description":"","name":"Design/Furniture","slug":"design_furniture","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":9974,"description":"","name":"Dessert","slug":"dessert","parent":6331,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9977,"description":"","name":"Diner","slug":"diner","parent":6331,"details":{"noun":"","vibes":[],"msv":"6000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10659,"description":"","name":"Distillery","slug":"distillery","parent":6328,"details":{"noun":"Distillery","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10313,"description":"","name":"Dive Bar","slug":"dive_bar","parent":6328,"details":{"noun":"","vibes":[],"msv":"80","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10502,"description":"","name":"DJ","slug":"dj","parent":6343,"details":{"noun":"DJ","vibes":[],"msv":"30","icon":"","sub_categories":[]},"parent_slug":"learning","level":3},{"id":9980,"description":"","name":"Dominican","slug":"dominican","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9983,"description":"","name":"Donuts","slug":"donuts","parent":6331,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6328,"description":"Where to drink and enjoy beer, wine, cocktails and sober-friendly options including coffee, tea, and more. Discover drinking styles like tiki, bubbly, and sober-friendly. Beyond watering holes, check out outdoor spots, events, and tours.","name":"Drink","slug":"drink","parent":6295,"details":{"noun":"Drinking","sub_categories":[{"slug":"all","id":6295},{"id":10656,"slug":"bar"},{"id":10301,"slug":"beer_garden"},{"id":10304,"slug":"brewery"},{"id":10662,"slug":"brewpub"},{"id":9944,"slug":"cafe"},{"id":10391,"slug":"club"},{"id":10307,"slug":"cocktails_spirits"},{"id":9947,"slug":"coffeeshop"},{"id":10310,"slug":"craft_beer"},{"id":10659,"slug":"distillery"},{"id":10313,"slug":"dive_bar"},{"id":10013,"slug":"gastropub"},{"id":10319,"slug":"juice_smoothie"},{"id":10665,"slug":"lounge"},{"id":10322,"slug":"mocktails"},{"id":10668,"slug":"nightclub"},{"id":10082,"slug":"pub"},{"id":10671,"slug":"saloon"},{"id":10325,"slug":"speakeasy"},{"id":10145,"slug":"tea"},{"id":13943,"slug":"tiki"},{"id":10331,"slug":"wine_bar"},{"id":10328,"slug":"winery"}],"vibes":["fun","boozy","happy","cheap","friendly"],"msv":"9000","icon":"drink","feature_in_app_":false},"parent_slug":"all","level":2},{"id":9986,"description":"","name":"Eastern European","slug":"eastern_european","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9989,"description":"","name":"Egyptian","slug":"egyptian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10505,"description":"","name":"Electronic / Dance","slug":"electronic_dance","parent":6343,"details":{"noun":"","vibes":[],"msv":"80","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":9992,"description":"","name":"English","slug":"english","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9995,"description":"","name":"Ethiopian","slug":"ethiopian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6323,"description":"Explore what\'s happening in %city%. Make a plan for tonight or this weekend with your events calendar. Explore art, music, nightlife based on your vibe.","name":"Events","slug":"events","parent":0,"details":{"noun":"Events","sub_categories":[{"slug":"concert","id":10595},{"slug":"music","id":6343},{"slug":"comedy","id":6292},{"slug":"art","id":6291},{"id":13940,"slug":"attractions"},{"id":10334,"slug":"books"},{"id":6293,"slug":"community"},{"id":6328,"slug":"drink"},{"id":11658,"slug":"family"},{"id":10412,"slug":"festival"},{"id":10394,"slug":"film"},{"id":6331,"slug":"food"},{"id":6340,"slug":"outdoors"},{"id":9878,"slug":"health"}],"vibes":["local","chill","fun","unique"],"msv":"4000","icon":"events","feature_in_app_":true,"sections":false},"parent_slug":"all","level":2},{"id":10448,"description":"","name":"Experiential","slug":"experiential","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":10478,"description":"","name":"Experimental","slug":"experimental","parent":10400,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":11658,"description":"Ways to get out and have fun with your entire family","name":"Family","slug":"family","parent":0,"details":{"noun":"","vibes":["family","kidcore","children"],"msv":"800","icon":"","sub_categories":[],"feature_in_app_":false},"parent_slug":"events","level":3},{"id":9926,"description":"","name":"Farm","slug":"farm","parent":6340,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":9998,"description":"","name":"Farm to Table","slug":"farm_table","parent":6331,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10346,"description":"","name":"Farmers Market","slug":"farmers_market","parent":6304,"details":{"noun":"","vibes":[],"msv":"10000","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":15058,"description":"","name":"Fast Casual","slug":"fast_casual","parent":6331,"details":{"noun":"","vibes":[],"msv":"40","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":10412,"description":"","name":"Festival","slug":"festival","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1200","icon":"","feature_in_app_":false},"parent_slug":"events","level":3},{"id":10001,"description":"","name":"Filipino","slug":"filipino","parent":6331,"details":{"noun":"","vibes":[],"msv":"1000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10394,"description":"","name":"Film","slug":"film","parent":6291,"details":{"noun":"","vibes":[],"msv":"50","icon":"","sub_categories":[{"id":10535,"slug":"movie_theater"}]},"parent_slug":"entertainment","level":3},{"id":10451,"description":"","name":"Film Museum","slug":"film_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":10677,"description":"","name":"Fine Dining","slug":"fine-dining","parent":6331,"details":{"noun":"Fine Dining","vibes":["elegant","luxury","fancy"],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":15067,"description":"","name":"Fishing","slug":"fishing","parent":0,"details":{"noun":"","vibes":[],"msv":"40","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":10349,"description":"","name":"Flea Market","slug":"flea_market","parent":6304,"details":{"noun":"","vibes":[],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":15079,"description":"","name":"Florist","slug":"florist","parent":6304,"details":{"noun":"","vibes":[],"msv":"80","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":10508,"description":"","name":"Folk / Country","slug":"folk_country","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":6331,"description":"Eat and explore culinary culture. Whether your vibe is a lively brunch, a friendly lunch, a chill breakfast, or an intimate dinner, we\'ve got you covered with the best restaurants and other places to eat, including outdoor patios, rooftop bars, and markets. You can also discover by taste, like savory, sweet, and spicy.","name":"Food","slug":"food","parent":6295,"details":{"noun":"Food","sub_categories":[{"id":9830,"slug":"afghan"},{"id":9833,"slug":"african"},{"id":9836,"slug":"albanian"},{"id":9839,"slug":"american"},{"id":9842,"slug":"argentinian"},{"id":9845,"slug":"asianfusion"},{"id":9848,"slug":"austrailian"},{"id":9851,"slug":"bagels"},{"id":9854,"slug":"bakery"},{"id":9857,"slug":"bangladeshi"},{"id":9860,"slug":"barbeque"},{"id":9863,"slug":"bistro"},{"id":9866,"slug":"bowls"},{"id":9872,"slug":"brazilian"},{"id":10674,"slug":"breakfast"},{"id":9869,"slug":"brunch"},{"id":9875,"slug":"burger"},{"id":9944,"slug":"cafe"},{"id":9950,"slug":"cambodian"},{"id":9953,"slug":"candy"},{"id":9956,"slug":"caribbean"},{"id":9959,"slug":"chinese"},{"id":9947,"slug":"coffeeshop"},{"id":9962,"slug":"colombian"},{"id":13987,"slug":"cookies"},{"id":9965,"slug":"cuban"},{"id":9968,"slug":"cupcakes"},{"id":9971,"slug":"deli"},{"id":9974,"slug":"dessert"},{"id":9977,"slug":"diner"},{"id":9980,"slug":"dominican"},{"id":9983,"slug":"donuts"},{"id":9986,"slug":"eastern_european"},{"id":9989,"slug":"egyptian"},{"id":9992,"slug":"english"},{"id":9995,"slug":"ethiopian"},{"id":9998,"slug":"farm_table"},{"id":10001,"slug":"filipino"},{"id":10677,"slug":"fine-dining"},{"id":10004,"slug":"food_hall"},{"id":10007,"slug":"food_truck"},{"id":10010,"slug":"french"},{"id":10013,"slug":"gastropub"},{"id":10016,"slug":"german"},{"id":10019,"slug":"greek"},{"id":10022,"slug":"hawaiian"},{"id":10025,"slug":"himalayan_nepalese_tibetan"},{"id":10028,"slug":"hungarian"},{"id":10031,"slug":"ice_cream"},{"id":10034,"slug":"indian"},{"id":10037,"slug":"italian"},{"id":10040,"slug":"jamaican"},{"id":10043,"slug":"japanese"},{"id":10046,"slug":"korean"},{"id":10049,"slug":"latin_american"},{"id":10052,"slug":"mediterranean"},{"id":10055,"slug":"mexican"},{"id":10058,"slug":"middle_eastern"},{"id":10061,"slug":"modern_european"},{"id":10064,"slug":"moroccan"},{"id":10067,"slug":"new_zealand"},{"id":10070,"slug":"pakastani"},{"id":10073,"slug":"persian"},{"id":10076,"slug":"peruvian"},{"id":10079,"slug":"pizza"},{"id":10082,"slug":"pub"},{"id":10085,"slug":"ramen"},{"id":13934,"slug":"restaurant"},{"id":10088,"slug":"romanian"},{"id":10091,"slug":"russian"},{"id":13937,"slug":"salad"},{"id":10094,"slug":"sandwiches"},{"id":10097,"slug":"scandinavian"},{"id":10100,"slug":"seafood"},{"id":10103,"slug":"senegalese"},{"id":10106,"slug":"singaporean"},{"id":10109,"slug":"small_plates"},{"id":10112,"slug":"soul_southern"},{"id":10115,"slug":"soup"},{"id":10118,"slug":"south_african"},{"id":10121,"slug":"south_american"},{"id":10124,"slug":"southeast_asian"},{"id":10127,"slug":"spanish"},{"id":10130,"slug":"steakhouse"},{"id":10133,"slug":"sushi"},{"id":10136,"slug":"tacos"},{"id":10142,"slug":"tapas"},{"id":10145,"slug":"tea"},{"id":10148,"slug":"thai"},{"id":10139,"slug":"tiawanese"},{"id":10151,"slug":"turkish"},{"id":10154,"slug":"uzbek"},{"id":10157,"slug":"vegan"},{"id":10160,"slug":"vegetarian"},{"id":10163,"slug":"vietnamese"},{"id":15052,"slug":"wings"}],"vibes":["local","foodie","authentic","new","spicy","sweet","popup"],"msv":"15000","icon":"food","feature_in_app_":false},"parent_slug":"all","level":2},{"id":10004,"description":"","name":"Food Hall","slug":"food_hall","parent":6331,"details":{"noun":"","vibes":[],"msv":"170","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":15087,"description":"","name":"Food Market","slug":"food_market","parent":6304,"details":{"noun":"","vibes":[],"msv":"80","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":10007,"description":"","name":"Food Truck / Cart","slug":"food_truck","parent":6331,"details":{"noun":"","vibes":[],"msv":"3600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10352,"description":"","name":"Fragrance","slug":"fragrance","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10010,"description":"","name":"French","slug":"french","parent":6331,"details":{"noun":"","vibes":[],"msv":"300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":15055,"description":"","name":"Fries","slug":"fries","parent":6331,"details":{"noun":"","vibes":[],"msv":"100","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":6307,"description":"","name":"Gallery","slug":"gallery","parent":6291,"details":{"vibes":["small","local","community"],"noun":"","sub_categories":[],"msv":"600","icon":"","feature_in_app_":true},"parent_slug":"art","level":3},{"id":9905,"description":"","name":"Garden","slug":"garden","parent":6340,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"2400","icon":"","feature_in_app_":true},"parent_slug":"outdoors","level":3},{"id":10013,"description":"","name":"Gastropub","slug":"gastropub","parent":6331,"details":{"noun":"","vibes":[],"msv":"260","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10016,"description":"","name":"German","slug":"german","parent":6331,"details":{"noun":"","vibes":[],"msv":"50","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10598,"description":"","name":"Gift","slug":"gift","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":15070,"description":"","name":"Golf","slug":"golf","parent":6337,"details":{"noun":"","vibes":[],"msv":"80","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":10019,"description":"","name":"Greek","slug":"greek","parent":6331,"details":{"noun":"","vibes":[],"msv":"200","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10337,"description":"","name":"Groceries","slug":"groceries","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10647,"description":"","name":"Guest house","slug":"guest-house","parent":6294,"details":{"noun":"Guest house","vibes":[],"msv":"110","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10199,"description":"","name":"Gym","slug":"gym","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10211,"description":"","name":"Gymnastics","slug":"gymnastics","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10557,"description":"","name":"Hair Salon","slug":"hair","parent":9884,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"beauty","level":3},{"id":10022,"description":"","name":"Hawaiian","slug":"hawaiian","parent":6331,"details":{"noun":"","vibes":[],"msv":"100","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10376,"description":"","name":"Health Food Store","slug":"health_food","parent":6304,"details":{"noun":"","vibes":[],"msv":"20","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10202,"description":"","name":"Hike","slug":"hike-games","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":9935,"description":"","name":"Hiking","slug":"hike","parent":6340,"details":{"noun":"Hiking","sub_categories":[],"vibes":["hiking"],"msv":"8000","icon":"","feature_in_app_":true},"parent_slug":"outdoors","level":3},{"id":10025,"description":"","name":"Himalayan/Nepalese/Tibetan","slug":"himalayan_nepalese_tibetan","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10511,"description":"","name":"Hip Hop / Rap","slug":"hiphop_rap","parent":6343,"details":{"noun":"","vibes":[],"msv":"100","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10454,"description":"","name":"History Museum","slug":"history_museum","parent":6291,"details":{"noun":"","vibes":[],"msv":"500","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":10355,"description":"","name":"Home &amp; Garden","slug":"home_garden","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10175,"description":"","name":"Home share (AirBNB, VRBO, etc.)","slug":"home_share","parent":6294,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10169,"description":"","name":"Hostel","slug":"hostel","parent":6294,"details":{"noun":"","vibes":[],"msv":"4000","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10166,"description":"","name":"Hotel","slug":"hotels","parent":6294,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1400","icon":"","feature_in_app_":true},"parent_slug":"stay","level":3},{"id":10028,"description":"","name":"Hungarian","slug":"hungarian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10031,"description":"","name":"Ice Cream","slug":"ice_cream","parent":6331,"details":{"noun":"","vibes":[],"msv":"3600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10214,"description":"","name":"Ice Skating","slug":"ice_skating","parent":6337,"details":{"noun":"","vibes":[],"msv":"80","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":6312,"description":"","name":"Improv","slug":"improv","parent":6292,"details":{"msv":"480","noun":"","vibes":[],"icon":"","sub_categories":[]},"parent_slug":"learning","level":3},{"id":10481,"description":"","name":"Improv","slug":"improv-performance","parent":10400,"details":{"noun":"","vibes":[],"msv":"480","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10034,"description":"","name":"Indian","slug":"indian","parent":6331,"details":{"noun":"","vibes":[],"msv":"300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10635,"description":"","name":"Inn","slug":"inn","parent":6294,"details":{"noun":"Inn","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10514,"description":"","name":"Instrumental","slug":"instrumental","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10421,"description":"","name":"Interactive","slug":"interactive","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"10","icon":"","feature_in_app_":false},"parent_slug":"entertainment","level":3},{"id":10037,"description":"","name":"Italian","slug":"italian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9899,"description":"","name":"IV Therapy","slug":"ivtherapy","parent":9878,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10040,"description":"","name":"Jamaican","slug":"jamaican","parent":6331,"details":{"noun":"","vibes":[],"msv":"260","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10043,"description":"","name":"Japanese","slug":"japanese","parent":6331,"details":{"noun":"","vibes":[],"msv":"900","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10517,"description":"","name":"Jazz","slug":"jazz","parent":6343,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10358,"description":"","name":"Jewelry","slug":"jewelry","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10319,"description":"","name":"Juice / Smoothie","slug":"juice_smoothie","parent":6328,"details":{"noun":"","vibes":[],"msv":"140","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10520,"description":"","name":"Karaoke","slug":"karaoke","parent":6343,"details":{"noun":"","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10361,"description":"","name":"Kids","slug":"kids","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[{"id":10364,"slug":"childrens_clothing"},{"id":10367,"slug":"toy_store"}]},"parent_slug":"shop","level":3},{"id":10586,"description":"","name":"Kids","slug":"kids-music","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10589,"description":"","name":"Kids","slug":"kids-performance","parent":10400,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10046,"description":"","name":"Korean","slug":"korean","parent":6331,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10250,"description":"","name":"Landmark","slug":"landmark","parent":6298,"details":{"noun":"","vibes":[],"msv":"2900","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":10217,"description":"","name":"Laser Tag","slug":"laser_tag","parent":6337,"details":{"noun":"","vibes":[],"msv":"700","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10049,"description":"","name":"Latin American","slug":"latin_american","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10274,"description":"","name":"Library","slug":"library","parent":6293,"details":{"noun":"","vibes":[],"msv":"14000","icon":"","sub_categories":[]},"parent_slug":"community","level":3},{"id":10653,"description":"","name":"Lodge","slug":"lodge","parent":0,"details":{"noun":"Lodge","vibes":["rustic","cozy"],"msv":"20","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10665,"description":"","name":"Lounge","slug":"lounge","parent":6328,"details":{"noun":"Lounge","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10484,"description":"","name":"Magic","slug":"magic","parent":10400,"details":{"noun":"","vibes":[],"msv":"200","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":11244,"description":"","name":"Mall","slug":"mall","parent":6304,"details":{"noun":"","vibes":[],"msv":"1000","icon":"","parent_categories":false,"sub_categories":[]}},{"id":9887,"description":"","name":"Massage","slug":"massage","parent":9878,"details":{"noun":"","vibes":[],"msv":"8000","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":9890,"description":"","name":"Meditation","slug":"meditation","parent":9878,"details":{"noun":"","vibes":[],"msv":"390","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10052,"description":"","name":"Mediterranean","slug":"mediterranean","parent":6331,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10055,"description":"","name":"Mexican","slug":"mexican","parent":6331,"details":{"noun":"","vibes":[],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10058,"description":"","name":"Middle Eastern","slug":"middle_eastern","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10220,"description":"","name":"Miniature Golf","slug":"minature_golf","parent":6337,"details":{"noun":"","vibes":[],"msv":"700","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10322,"description":"","name":"Mocktails","slug":"mocktails","parent":6328,"details":{"noun":"","vibes":[],"msv":"40","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10061,"description":"","name":"Modern European","slug":"modern_european","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10064,"description":"","name":"Moroccan","slug":"moroccan","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10289,"description":"","name":"Mosque","slug":"mosque","parent":6293,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"community","level":3},{"id":10632,"description":"","name":"Motel","slug":"motel","parent":6294,"details":{"noun":"Motel","sub_categories":[],"vibes":[],"msv":"18000","icon":"","feature_in_app_":false},"parent_slug":"stay","level":3},{"id":10535,"description":"","name":"Movie Theater","slug":"movie_theater","parent":10394,"details":{"noun":"","vibes":[],"msv":"10000","icon":"","sub_categories":[]},"parent_slug":"film","level":3},{"id":10256,"description":"","name":"Mural","slug":"mural","parent":6298,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":10277,"description":"","name":"Museum","slug":"museum","parent":6293,"details":{"noun":"","sub_categories":[{"id":10436,"slug":"aquarium"},{"id":10439,"slug":"children_museum"},{"id":10466,"slug":"conservatory"},{"id":10442,"slug":"cultural_museum"},{"id":10445,"slug":"design_museum"},{"id":10448,"slug":"experiential"},{"id":10451,"slug":"film_museum"},{"id":10454,"slug":"history_museum"},{"id":10463,"slug":"planetarium"},{"id":10457,"slug":"visitor_center"},{"id":10460,"slug":"zoo"}],"vibes":[],"msv":"800","icon":"","feature_in_app_":true},"parent_slug":"community","level":3},{"id":6343,"description":"","name":"Music","slug":"music","parent":6295,"details":{"vibes":["local","popular","jazzy","lit","shimmy"],"noun":"Music","sub_categories":[{"id":10499,"slug":"classical"},{"id":10502,"slug":"dj"},{"id":10505,"slug":"electronic_dance"},{"id":10508,"slug":"folk_country"},{"id":10511,"slug":"hiphop_rap"},{"id":10514,"slug":"instrumental"},{"id":10517,"slug":"jazz"},{"id":10520,"slug":"karaoke"},{"id":10586,"slug":"kids-music"},{"id":10523,"slug":"r_b"},{"id":10526,"slug":"rock_indie"},{"id":10529,"slug":"soul_funk"},{"id":10532,"slug":"world_international"}],"msv":"1300","icon":"music","feature_in_app_":false},"parent_slug":"entertainment","level":3},{"id":10580,"description":"","name":"Music Shop","slug":"music-store","parent":6304,"details":{"noun":"","sub_categories":[{"id":10583,"slug":"record-store"}],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"shop","level":3},{"id":10487,"description":"","name":"Musical","slug":"musical","parent":10400,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10554,"description":"","name":"Nail Salon","slug":"nails","parent":9884,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"beauty","level":3},{"id":9938,"description":"","name":"Natural Area","slug":"natural_area","parent":6340,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10067,"description":"","name":"New Zealand","slug":"new_zealand","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10388,"description":"","name":"Night Market","slug":"night_market","parent":6304,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10668,"description":"","name":"Nightclub","slug":"nightclub","parent":6328,"details":{"noun":"Nightclub","vibes":["latenight","after-party","party"],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"nightlife","level":3},{"id":6570,"description":"","name":"Nightlife","slug":"nightlife","parent":6295,"details":{"vibes":["latenight","lit","musical","buzzing","boozy"],"noun":"Nightlife","sub_categories":[{"id":10391,"slug":"club"},{"id":10668,"slug":"nightclub"},{"id":10325,"slug":"speakeasy"}],"msv":"12000","icon":"nightlife","feature_in_app_":false},"parent_slug":"entertainment","level":3},{"id":10271,"description":"","name":"Non-Profit Organization","slug":"non_profit","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"community","level":3},{"id":15073,"description":"","name":"Nursery","slug":"nursery","parent":10355,"details":{"noun":"","vibes":[],"msv":"10","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":10490,"description":"","name":"Opera","slug":"opera","parent":10400,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":15076,"description":"","name":"Orchard","slug":"orchard","parent":6298,"details":{"noun":"","vibes":[],"msv":"20","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":6340,"description":"","name":"Outdoors","slug":"outdoors","parent":6295,"details":{"noun":"Outdoors","sub_categories":[{"id":9917,"slug":"arboretum"},{"id":9932,"slug":"beach"},{"id":9929,"slug":"botanicalgarden"},{"id":10638,"slug":"cabin"},{"id":9941,"slug":"cemetery"},{"id":9920,"slug":"communitygarden"},{"id":9926,"slug":"farm"},{"id":9905,"slug":"garden"},{"id":9935,"slug":"hike"},{"id":9938,"slug":"natural_area"},{"id":9908,"slug":"park"},{"id":9911,"slug":"playground"},{"id":9914,"slug":"plaza"},{"id":9923,"slug":"urbanfarm"}],"vibes":["fun","mindful","sunny","adventurous","relaxing"],"msv":"110","icon":"outdoors","feature_in_app_":false},"parent_slug":"all","level":2},{"id":15082,"description":"","name":"Outlet","slug":"outlet","parent":6304,"details":{"noun":"","vibes":[],"msv":"40","icon":"","feature_in_app_":false,"parent_categories":false,"sub_categories":[],"sections":false}},{"id":10238,"description":"","name":"Paint Ball","slug":"paint_ball","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10070,"description":"","name":"Pakastani","slug":"pakastani","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9908,"description":"","name":"Park","slug":"park","parent":6340,"details":{"noun":"","vibes":[],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10400,"description":"","name":"Performance","slug":"performance","parent":6291,"details":{"noun":"Performing Arts","sub_categories":[{"id":10469,"slug":"burlesque"},{"id":10472,"slug":"caberet"},{"id":10475,"slug":"circus"},{"id":6292,"slug":"comedy"},{"id":10595,"slug":"concert"},{"id":10592,"slug":"dance-performance"},{"id":10478,"slug":"experimental"},{"id":10481,"slug":"improv-performance"},{"id":10589,"slug":"kids-performance"},{"id":10484,"slug":"magic"},{"id":10487,"slug":"musical"},{"id":10490,"slug":"opera"},{"id":10493,"slug":"reading_lecture"},{"id":10397,"slug":"theater"}],"vibes":[],"msv":"40","icon":"","feature_in_app_":true},"parent_slug":"entertainment","level":3},{"id":10073,"description":"","name":"Persian","slug":"persian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10076,"description":"","name":"Peruvian","slug":"peruvian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10424,"description":"","name":"Photography","slug":"photography","parent":6291,"details":{"noun":"Photography","vibes":[],"msv":"260","icon":"","sub_categories":[]},"parent_slug":"learning","level":3},{"id":10205,"description":"","name":"Pilates","slug":"pilates","parent":6337,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10079,"description":"","name":"Pizza","slug":"pizza","parent":6331,"details":{"noun":"","vibes":[],"msv":"8000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10463,"description":"","name":"Planetarium","slug":"planetarium","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":9911,"description":"","name":"Playground","slug":"playground","parent":6340,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":9914,"description":"","name":"Plaza","slug":"plaza","parent":6340,"details":{"noun":"","vibes":[],"msv":"140","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10223,"description":"","name":"Pool","slug":"pool","parent":6337,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10430,"description":"","name":"Print Shop","slug":"print_shop","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"art","level":3},{"id":10082,"description":"","name":"Pub","slug":"pub","parent":6331,"details":{"noun":"","vibes":[],"msv":"480","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10259,"description":"","name":"Public Art","slug":"public_art","parent":6298,"details":{"noun":"","vibes":[],"msv":"90","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":10523,"description":"","name":"R&amp;B","slug":"r_b","parent":6343,"details":{"noun":"","vibes":[],"msv":"10","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10085,"description":"","name":"Ramen","slug":"ramen","parent":6331,"details":{"noun":"","vibes":[],"msv":"6000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10493,"description":"","name":"Reading / Lecture","slug":"reading_lecture","parent":10400,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"performance","level":3},{"id":10583,"description":"","name":"Record Store","slug":"record-store","parent":10580,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music-store","level":3},{"id":10244,"description":"","name":"Recreation Center","slug":"recreation_center","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10178,"description":"","name":"Resort","slug":"resort","parent":6294,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":13934,"description":"","name":"Restaurant","slug":"restaurant","parent":6331,"details":{"noun":"Restaurant","vibes":[],"msv":"2000","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"food","level":3},{"id":9902,"description":"","name":"Retreat","slug":"retreat","parent":9878,"details":{"noun":"","vibes":[],"msv":"140","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10526,"description":"","name":"Rock / Indie","slug":"rock_indie","parent":6343,"details":{"noun":"","vibes":[],"msv":"50","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10226,"description":"","name":"Rock Climbing","slug":"rock_climbing","parent":6337,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10088,"description":"","name":"Romanian","slug":"romanian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10091,"description":"","name":"Russian","slug":"russian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":13937,"description":"","name":"Salad","slug":"salad","parent":6331,"details":{"noun":"Salad","vibes":["vegan","vegetarian","healthy"],"msv":"200","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"food","level":3},{"id":10671,"description":"","name":"Saloon","slug":"saloon","parent":6328,"details":{"noun":"Saloon","vibes":["oldschool","boozy","wild"],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10094,"description":"","name":"Sandwiches","slug":"sandwiches","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10097,"description":"","name":"Scandinavian","slug":"scandinavian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10100,"description":"","name":"Seafood","slug":"seafood","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10103,"description":"","name":"Senegalese","slug":"senegalese","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":6304,"description":"","name":"Shopping","slug":"shop","parent":6295,"details":{"noun":"Shopping","sub_categories":[{"slug":"all","id":6295},{"id":10379,"slug":"antique"},{"id":12600,"slug":"automobiles"},{"id":10334,"slug":"books"},{"id":10566,"slug":"cannabis"},{"id":10340,"slug":"clothes"},{"id":10370,"slug":"convenience_store"},{"id":10343,"slug":"design_furniture"},{"id":10346,"slug":"farmers_market"},{"id":10349,"slug":"flea_market"},{"id":10352,"slug":"fragrance"},{"id":10598,"slug":"gift"},{"id":10337,"slug":"groceries"},{"id":10376,"slug":"health_food"},{"id":10355,"slug":"home_garden"},{"id":10358,"slug":"jewelry"},{"id":10361,"slug":"kids"},{"id":10580,"slug":"music-store"},{"id":10388,"slug":"night_market"},{"id":10373,"slug":"specialty_foods"},{"id":10241,"slug":"sporting_rental"},{"id":10382,"slug":"thrift_store"},{"id":10385,"slug":"vintage"}],"vibes":["local","popup","vintage","thrift"],"msv":"4400","icon":"shopping","feature_in_app_":false,"sections":false},"parent_slug":"all","level":2},{"id":10292,"description":"","name":"Shrine","slug":"shrine","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","parent_categories":[],"sub_categories":[]}},{"id":10106,"description":"","name":"Singaporean","slug":"singaporean","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10232,"description":"","name":"Skating","slug":"skating","parent":6337,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10109,"description":"","name":"Small Plates","slug":"small_plates","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"40","icon":"","feature_in_app_":true},"parent_slug":"food","level":3},{"id":10529,"description":"","name":"Soul / Funk","slug":"soul_funk","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":10112,"description":"","name":"Soul / Southern","slug":"soul_southern","parent":6331,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10115,"description":"","name":"Soup","slug":"soup","parent":6331,"details":{"noun":"","vibes":[],"msv":"400","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10118,"description":"","name":"South African","slug":"south_african","parent":6331,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"food","level":3},{"id":10121,"description":"","name":"South American","slug":"south_american","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10124,"description":"","name":"Southeast Asian","slug":"southeast_asian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9896,"description":"","name":"Spa","slug":"spa","parent":9878,"details":{"noun":"","vibes":[],"msv":"600","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10127,"description":"","name":"Spanish","slug":"spanish","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10325,"description":"","name":"Speakeasy","slug":"speakeasy","parent":6328,"details":{"noun":"","vibes":[],"msv":"5400","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10373,"description":"","name":"Specialty Food Store","slug":"specialty_foods","parent":6304,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10208,"description":"","name":"Spin / Cycle","slug":"spin_cycle","parent":6337,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10241,"description":"","name":"Sporting Goods","slug":"sporting_rental","parent":6337,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"100","icon":"","feature_in_app_":false},"parent_slug":"games","level":3},{"id":6337,"description":"","name":"Sports &amp; Fitness","slug":"games","parent":6295,"details":{"noun":"Sports & Fitness","sub_categories":[{"slug":"all","id":6295},{"id":10235,"slug":"bowling"},{"id":10187,"slug":"boxing"},{"id":10190,"slug":"climbing"},{"id":10193,"slug":"crossfit"},{"id":10196,"slug":"dance"},{"id":10199,"slug":"gym"},{"id":10211,"slug":"gymnastics"},{"id":10202,"slug":"hike-games"},{"id":10214,"slug":"ice_skating"},{"id":10217,"slug":"laser_tag"},{"id":10220,"slug":"minature_golf"},{"id":10238,"slug":"paint_ball"},{"id":10205,"slug":"pilates"},{"id":10223,"slug":"pool"},{"id":10244,"slug":"recreation_center"},{"id":10226,"slug":"rock_climbing"},{"id":10232,"slug":"skating"},{"id":10208,"slug":"spin_cycle"},{"id":10241,"slug":"sporting_rental"},{"id":10229,"slug":"tennis"},{"id":9893,"slug":"yoga"}],"vibes":["healthy","adventurous","social","fun","local","playtime","inclusive","alternative"],"msv":"2000","icon":"health","feature_in_app_":true,"sections":false},"parent_slug":"all","level":2},{"id":6317,"description":"","name":"Stand up","slug":"stand-up","parent":6292,"details":{"msv":"170","sub_categories":[],"vibes":[]},"parent_slug":"comedy","level":3},{"id":10253,"description":"","name":"Statue","slug":"statue","parent":6298,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":6294,"description":"Explore the best places to stay in %city%. From hotels to guest houses, bed and breakfasts there are great places to stay downtown or in nearby neighborhoods. There\'s a cozy, adventurous, fun, modern, luxury place to stay that will match your vibe. Plan your visit and book discounted stays with your partner sites.","name":"Stay","slug":"stay","parent":6295,"details":{"noun":"Hotels","sub_categories":[{"id":10181,"slug":"bed_breakfast"},{"id":10638,"slug":"cabin"},{"id":10172,"slug":"campground"},{"id":10184,"slug":"co_working"},{"id":10644,"slug":"cottage"},{"id":10647,"slug":"guest-house"},{"id":10175,"slug":"home_share"},{"id":10169,"slug":"hostel"},{"id":10166,"slug":"hotels"},{"id":10635,"slug":"inn"},{"id":10653,"slug":"lodge"},{"id":10632,"slug":"motel"},{"id":10178,"slug":"resort"},{"id":10650,"slug":"vacation-rental"},{"id":10641,"slug":"villa"}],"msv":"5000","icon":"hotel","vibes":["boutique","local","luxury","design","cheap","minimalist"],"feature_in_app_":false,"sections":false},"parent_slug":"all","level":2},{"id":10130,"description":"","name":"Steakhouse","slug":"steakhouse","parent":6331,"details":{"noun":"","vibes":[],"msv":"9000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10427,"description":"","name":"Studio","slug":"studio","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"art","level":3},{"id":10133,"description":"","name":"Sushi","slug":"sushi","parent":6331,"details":{"noun":"","vibes":[],"msv":"12000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10136,"description":"","name":"Tacos","slug":"tacos","parent":6331,"details":{"noun":"","vibes":[],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10142,"description":"","name":"Tapas","slug":"tapas","parent":6331,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10563,"description":"","name":"Tattoo Parlor","slug":"tattoo_parlor","parent":9884,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"beauty","level":3},{"id":10145,"description":"","name":"Tea","slug":"tea","parent":6328,"details":{"noun":"Tea","vibes":[],"msv":"1000","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10286,"description":"","name":"Temple","slug":"temple","parent":6293,"details":{"noun":"","vibes":[],"msv":"1","icon":"","parent_categories":[],"sub_categories":[]}},{"id":10229,"description":"","name":"Tennis","slug":"tennis","parent":6337,"details":{"noun":"","vibes":[],"msv":"700","icon":"","sub_categories":[]},"parent_slug":"games","level":3},{"id":10148,"description":"","name":"Thai","slug":"thai","parent":6331,"details":{"noun":"","vibes":[],"msv":"2900","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10397,"description":"","name":"Theater","slug":"theater","parent":6291,"details":{"noun":"","sub_categories":[{"id":10496,"slug":"broadway"}],"vibes":[],"msv":"6600","icon":"","feature_in_app_":true},"parent_slug":"performance","level":3},{"id":10382,"description":"","name":"Thrift Store","slug":"thrift_store","parent":6304,"details":{"noun":"","vibes":[],"msv":"6600","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":10139,"description":"","name":"Tiawanese","slug":"tiawanese","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":13943,"description":"","name":"Tiki Bar","slug":"tiki","parent":6328,"details":{"noun":"","vibes":[],"msv":"1","icon":"","feature_in_app_":false,"sub_categories":[]},"parent_slug":"drink","level":3},{"id":10247,"description":"","name":"Tour","slug":"tour","parent":6298,"details":{"noun":"","vibes":[],"msv":"9900","icon":"","sub_categories":[]},"parent_slug":"visit","level":3},{"id":10265,"description":"","name":"Tourist Destination","slug":"tourist_destination","parent":6298,"details":{"noun":"","sub_categories":[{"slug":"visit","id":6298}],"vibes":[],"msv":"1","icon":"","feature_in_app_":false},"parent_slug":"visit","level":3},{"id":10367,"description":"","name":"Toy Store","slug":"toy_store","parent":10361,"details":{"noun":"","vibes":[],"msv":"1300","icon":"","sub_categories":[]},"parent_slug":"kids","level":3},{"id":10151,"description":"","name":"Turkish","slug":"turkish","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":9923,"description":"","name":"Urban Farm","slug":"urbanfarm","parent":6340,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"outdoors","level":3},{"id":10154,"description":"","name":"Uzbek","slug":"uzbek","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10650,"description":"","name":"Vacation Rental","slug":"vacation-rental","parent":6294,"details":{"noun":"Vacation Rental","vibes":[],"msv":"900","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10157,"description":"","name":"Vegan","slug":"vegan","parent":6331,"details":{"noun":"","vibes":[],"msv":"2400","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10160,"description":"","name":"Vegetarian","slug":"vegetarian","parent":6331,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10163,"description":"","name":"Vietnamese","slug":"vietnamese","parent":6331,"details":{"noun":"","vibes":[],"msv":"390","icon":"","sub_categories":[]},"parent_slug":"food","level":3},{"id":10641,"description":"","name":"Villa","slug":"villa","parent":6294,"details":{"noun":"Villa","vibes":["luxury","relaxing"],"msv":"210","icon":"","sub_categories":[]},"parent_slug":"stay","level":3},{"id":10385,"description":"","name":"Vintage Store","slug":"vintage","parent":6304,"details":{"noun":"","vibes":[],"msv":"390","icon":"","sub_categories":[]},"parent_slug":"shop","level":3},{"id":6298,"description":"Visitors guide to the best of %city%. Discover culture, history, and landmarks while having a fun, memorable time sightseeing and exploring. We\'ve collected must see spots and favorite for tourist and locals alike. Plan your trip or weekend getaway and book these attractions for free or at a discount.","name":"Visit","slug":"visit","parent":6295,"details":{"noun":"Attractions","sub_categories":[{"id":10262,"slug":"amusement_park"},{"id":10436,"slug":"aquarium"},{"id":10250,"slug":"landmark"},{"id":10256,"slug":"mural"},{"id":10277,"slug":"museum"},{"id":10259,"slug":"public_art"},{"id":10253,"slug":"statue"},{"id":10247,"slug":"tour"},{"id":10265,"slug":"tourist_destination"},{"id":10460,"slug":"zoo"}],"vibes":["popular","scenic","family","artsy","historic","upscale","weekend","aquatic","botanical","cheap","cultural","dreamy","healthy","lgbtq","local","relaxing","sunny","tropical","urban","fun","tourist","cool"],"msv":"5500","icon":"visitLogo","feature_in_app_":false,"sections":false},"parent_slug":"all","level":2},{"id":10457,"description":"","name":"Visitor Center","slug":"visitor_center","parent":6291,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"museum","level":3},{"id":9878,"description":"","name":"Wellness","slug":"health","parent":6295,"details":{"noun":"Health & Wellness","sub_categories":[{"id":9881,"slug":"acupuncture"},{"id":9884,"slug":"beauty"},{"id":10566,"slug":"cannabis"},{"id":9899,"slug":"ivtherapy"},{"id":9887,"slug":"massage"},{"id":9890,"slug":"meditation"},{"id":9902,"slug":"retreat"},{"id":9896,"slug":"spa"},{"id":9893,"slug":"yoga"}],"vibes":[],"msv":"4000","icon":"","feature_in_app_":false,"sections":false},"parent_slug":"all","level":2},{"id":10331,"description":"","name":"Wine Bar","slug":"wine_bar","parent":6328,"details":{"noun":"","vibes":[],"msv":"2000","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":10328,"description":"","name":"Winery","slug":"winery","parent":6328,"details":{"noun":"","vibes":[],"msv":"3000","icon":"","sub_categories":[]},"parent_slug":"drink","level":3},{"id":15052,"description":"","name":"Wings","slug":"wings","parent":6331,"details":{"noun":"","vibes":[],"msv":"400","icon":"","feature_in_app_":false,"sub_categories":[],"sections":false},"parent_slug":"food","level":3},{"id":10532,"description":"","name":"World / International","slug":"world_international","parent":6343,"details":{"noun":"","vibes":[],"msv":"1","icon":"","sub_categories":[]},"parent_slug":"music","level":3},{"id":9893,"description":"","name":"Yoga","slug":"yoga","parent":9878,"details":{"noun":"","vibes":[],"msv":"1600","icon":"","sub_categories":[]},"parent_slug":"health","level":3},{"id":10460,"description":"","name":"Zoo","slug":"zoo","parent":6291,"details":{"noun":"","sub_categories":[],"vibes":[],"msv":"20000","icon":""},"parent_slug":"visit","level":3}]}');

/***/ }),

/***/ "./node_modules/vibemap-constants/dist/activityCategories.zip.json":
/*!*************************************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/activityCategories.zip.json ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "id|description|name|Acupuncture|slug|acupuncture|parent|details|noun|sub_categories|vibes|msv|1300|icon|feature_in_app_|parent_slug|health|level|Adult+Entertainment|adult_entertainment|80|parent_categories|sections|Afghan|afghan|1|food|African|african|10|Albanian|albanian|Discover+the+best+things+to+do+in+%25city%25,+based+on+your+vibe.+Guides,+events,+activities,+and+more+to+help+you+plan+a+visit+or+weekend.+Whether+you’re+a+first+time+visitor+or+long-time+local,+we'll+recommend+something+fun+and+interesting.|All|all|Things+to+do|visit|drink|outdoors|community|events|learning|entertainment|shop|games|stay|100000|allLogo|dreamy|creative|fun|local|new|amazing|family|trending|classic|adventurous|American+/+New+American|american|200|Amusement+Park|amusement_park|Antique+Store|antique|400|Aquarium|aquarium|2000|Arboretum|arboretum|600|Arcade|arcade|3000|Argentinian|argentinian|Art|art|2400|art_museum|arts_organization|gallery|photography|print_shop|studio|artsy|inspired|Art+Museum|8000|Arts+&amp;+Entertainment|Entertainment|interesting|popular|lively|musical|500|casino|comedy|festival|film|interactive|museum|music|nightclub|nightlife|performance|theater|Arts+Organization|Asian+Fusion|asianfusion|170|Attractions|attractions|100|Austrailian|austrailian|Cars,+automobiles,+and+motorcycles|Automobiles|automobiles|20|Bagels|bagels|Bakery|bakery|Bangladeshi|bangladeshi|Bar|bar|drinking|boozy|18000|Barbeque|barbeque|1900|Barber+Shop|barber|beauty|Beach|beach|22000|Beauty|hair|nails|tattoo_parlor|Bed+&amp;+Breakfast|bed_breakfast|1600|Beer+Garden|beer_garden|Bistro|bistro|Boats|boats|40|Books|books|720|Botanical+Garden|botanicalgarden|320|Bowling|bowling|4000|Bowls|bowls|Boxing|boxing|700|Brazilian|brazilian|Breakfast|breakfast|12000|Brewery|brewery|Brewpub|brewpub|Broadway|broadway|Brunch|brunch|15000|Buffet|buffet|Burger|burger|Burlesque|burlesque|300|Caberet|caberet|Cabin|cabin|outdoorsy|natural|cottagecore|cottage|Cafe|cafe|Cambodian|cambodian|Campground|campground|1000|Candy|candy|250|Cannabis|cannabis|Caribbean|caribbean|Casino|Cemetery|cemetery|Children's+Clothing+Store|childrens_clothing|kids|Children's+Museum|children_museum|Chinese|chinese|Church|church|Circus|circus|City+Hall|city_hall|Classes+/+Learning|Learning|cooking|dj|improv|yoga|Classical|classical|Climbing|climbing|Clothes|clothes|Club+/+Dance|club|Co-Working+Space|co_working|Cocktails+/+Spirits|cocktails_spirits|900|Coffee+Shop|coffeeshop|4500|Colombian|colombian|Comedy|funny|raunchy|spontaneous|stand-up|Explore+ways+to+get+involved+in+your+local+community.+Support+local+businesses,+volunteer,+give+back,+or+pay+it+forward+with+these+community+groups+and+hubs+of+local+culture.+|Community|community_center|courthouse|library|mosque|non_profit|2|cultural|multicultural|social|Community+Center|Community+Garden|communitygarden|30|Concert|concert|together|33000|Conservatory|conservatory|Convenience+Store+/+Bodega|convenience_store|Cookies|cookies|Cooking|Cottage|110|Courthouse|Craft+Beer|craft_beer|CrossFit|crossfit|Cuban|cuban|Cultural+Museum|cultural_museum|Cupcakes|cupcakes|Dance|dance|dance-performance|Deli|deli|Design+Museum|design_museum|Design/Furniture|design_furniture|Dessert|dessert|Diner|diner|6000|Distillery|distillery|Dive+Bar|dive_bar|DJ|Dominican|dominican|Donuts|donuts|Where+to+drink+and+enjoy+beer,+wine,+cocktails+and+sober-friendly+options+including+coffee,+tea,+and+more.+Discover+drinking+styles+like+tiki,+bubbly,+and+sober-friendly.+Beyond+watering+holes,+check+out+outdoor+spots,+events,+and+tours.|Drink|Drinking|gastropub|juice_smoothie|lounge|mocktails|pub|saloon|speakeasy|tea|tiki|wine_bar|winery|happy|cheap|friendly|9000|Eastern+European|eastern_european|Egyptian|egyptian|Electronic+/+Dance|electronic_dance|English|english|Ethiopian|ethiopian|Explore+what's+happening+in+%25city%25.+Make+a+plan+for+tonight+or+this+weekend+with+your+events+calendar.+Explore+art,+music,+nightlife+based+on+your+vibe.|Events|chill|unique|Experiential|experiential|Experimental|experimental|Ways+to+get+out+and+have+fun+with+your+entire+family|Family|kidcore|children|800|Farm|farm|Farm+to+Table|farm_table|Farmers+Market|farmers_market|10000|Fast+Casual|fast_casual|Festival|1200|Filipino|filipino|Film|50|movie_theater|Film+Museum|film_museum|Fine+Dining|fine-dining|Fine+Dining|elegant|luxury|fancy|Fishing|fishing|Flea+Market|flea_market|Florist|florist|Folk+/+Country|folk_country|Eat+and+explore+culinary+culture.+Whether+your+vibe+is+a+lively+brunch,+a+friendly+lunch,+a+chill+breakfast,+or+an+intimate+dinner,+we've+got+you+covered+with+the+best+restaurants+and+other+places+to+eat,+including+outdoor+patios,+rooftop+bars,+and+markets.+You+can+also+discover+by+taste,+like+savory,+sweet,+and+spicy.|Food|food_hall|food_truck|french|german|greek|hawaiian|himalayan_nepalese_tibetan|hungarian|ice_cream|indian|italian|jamaican|japanese|korean|latin_american|mediterranean|mexican|middle_eastern|modern_european|moroccan|new_zealand|pakastani|persian|peruvian|pizza|ramen|restaurant|romanian|russian|salad|sandwiches|scandinavian|seafood|senegalese|singaporean|small_plates|soul_southern|soup|south_african|south_american|southeast_asian|spanish|steakhouse|sushi|tacos|tapas|thai|tiawanese|turkish|uzbek|vegan|vegetarian|vietnamese|wings|foodie|authentic|spicy|sweet|popup|Food+Hall|Food+Market|food_market|Food+Truck+/+Cart|3600|Fragrance|fragrance|French|Fries|fries|Gallery|small|Garden|garden|Gastropub|260|German|Gift|gift|Golf|golf|Greek|Groceries|groceries|Guest+house|guest-house|Guest+house|Gym|gym|Gymnastics|gymnastics|Hair+Salon|Hawaiian|Health+Food+Store|health_food|Hike|hike-games|Hiking|hike|hiking|Himalayan/Nepalese/Tibetan|Hip+Hop+/+Rap|hiphop_rap|History+Museum|history_museum|Home+&amp;+Garden|home_garden|Home+share+(AirBNB,+VRBO,+etc.)|home_share|Hostel|hostel|Hotel|hotels|1400|Hungarian|Ice+Cream|Ice+Skating|ice_skating|Improv|480|improv-performance|Indian|Inn|inn|Instrumental|instrumental|Interactive|Italian|IV+Therapy|ivtherapy|Jamaican|Japanese|Jazz|jazz|Jewelry|jewelry|Juice+/+Smoothie|140|Karaoke|karaoke|Kids|toy_store|kids-music|kids-performance|Korean|Landmark|landmark|2900|Laser+Tag|laser_tag|Latin+American|Library|14000|Lodge|lodge|rustic|cozy|Lounge|Magic|magic|Mall|mall|Massage|massage|Meditation|meditation|390|Mediterranean|Mexican|Middle+Eastern|Miniature+Golf|minature_golf|Mocktails|Modern+European|Moroccan|Mosque|Motel|motel|Movie+Theater|Mural|mural|Museum|planetarium|visitor_center|zoo|Music|jazzy|lit|shimmy|r_b|rock_indie|soul_funk|world_international|Music+Shop|music-store|record-store|Musical|Nail+Salon|Natural+Area|natural_area|New+Zealand|Night+Market|night_market|Nightclub|latenight|after-party|party|Nightlife|buzzing|Non-Profit+Organization|Nursery|nursery|Opera|opera|Orchard|orchard|Outdoors|park|playground|plaza|urbanfarm|mindful|sunny|relaxing|Outlet|outlet|Paint+Ball|paint_ball|Pakastani|Park|Performance|Performing+Arts|reading_lecture|Persian|Peruvian|Photography|Pilates|pilates|Pizza|Planetarium|Playground|Plaza|Pool|pool|Print+Shop|Pub|Public+Art|public_art|90|R&amp;B|Ramen|Reading+/+Lecture|Record+Store|Recreation+Center|recreation_center|Resort|resort|Restaurant|Retreat|retreat|Rock+/+Indie|Rock+Climbing|rock_climbing|Romanian|Russian|Salad|healthy|Saloon|oldschool|wild|Sandwiches|Scandinavian|Seafood|Senegalese|Shopping|specialty_foods|sporting_rental|thrift_store|vintage|thrift|4400|shopping|Shrine|shrine|Singaporean|Skating|skating|Small+Plates|Soul+/+Funk|Soul+/+Southern|Soup|South+African|South+American|Southeast+Asian|Spa|spa|Spanish|Speakeasy|5400|Specialty+Food+Store|Spin+/+Cycle|spin_cycle|Sporting+Goods|Sports+&amp;+Fitness|Sports+&+Fitness|tennis|playtime|inclusive|alternative|Stand+up|Statue|statue|Explore+the+best+places+to+stay+in+%25city%25.+From+hotels+to+guest+houses,+bed+and+breakfasts+there+are+great+places+to+stay+downtown+or+in+nearby+neighborhoods.+There's+a+cozy,+adventurous,+fun,+modern,+luxury+place+to+stay+that+will+match+your+vibe.+Plan+your+visit+and+book+discounted+stays+with+your+partner+sites.|Stay|Hotels|vacation-rental|villa|5000|hotel|boutique|design|minimalist|Steakhouse|Studio|Sushi|Tacos|Tapas|Tattoo+Parlor|Tea|Temple|temple|Tennis|Thai|Theater|6600|Thrift+Store|Tiawanese|Tiki+Bar|Tour|tour|9900|Tourist+Destination|tourist_destination|Toy+Store|Turkish|Urban+Farm|Uzbek|Vacation+Rental|Vacation+Rental|Vegan|Vegetarian|Vietnamese|Villa|210|Vintage+Store|Visitors+guide+to+the+best+of+%25city%25.+Discover+culture,+history,+and+landmarks+while+having+a+fun,+memorable+time+sightseeing+and+exploring.+We've+collected+must+see+spots+and+favorite+for+tourist+and+locals+alike.+Plan+your+trip+or+weekend+getaway+and+book+these+attractions+for+free+or+at+a+discount.|Visit|scenic|historic|upscale|weekend|aquatic|botanical|lgbtq|tropical|urban|tourist|cool|5500|visitLogo|Visitor+Center|Wellness|Health+&+Wellness|Wine+Bar|Winery|Wings|World+/+International|Yoga|Zoo|20000^7MH|7ME|3|BMD|4VY|7L2|4VV|3|7L5|4VV|3|7L8|4VV|3|4UV|0|4VV|4UY|4VS|4W4|4UT|4VN|52L|4VY|4V4|4W1|4UU|7ME|1|7LB|4VV|3|7X2|4UY|3|80B|4V4|3|81W|4UR|3|7NH|4W4|3|812|4UR|3|7LE|4VV|3|4UR|4VY|81E|81T|4V7|81K|81Q|81N|3|81E|4UR|3|4VY|4UV|812|4UR|80Z|4US|818|80Q|4V7|81H|7XH|4W7|88C|52I|80W|80T|2|81T|4UR|3|7LH|4VV|3|AR8|4VN|3|7LK|4VV|3|9Q0|4V4|3|7LN|4VV|3|7LQ|4VV|3|7LT|4VV|3|880|4VS|3|7LW|4VV|3|85C|7MK|3|7NW|4W4|3|7MK|7ME|85C|859|856|85F|3|7UT|4UU|3|7Y5|4VS|3|7LZ|4VV|3|BMG|4W4|7Z2|4V4|3|7NT|4W4|3|7WB|4W1|3|7M2|4VV|3|7UZ|4W1|3|7M8|4VV|3|88I|4VV|3|7Y8|4VS|3|886|4VS|3|83K|80T|3|7M5|4VV|3|8OF|4VV|7MB|4VV|3|82T|80W|3|82W|80W|3|87I|4UU|3|7O8|4VV|3|7OE|4VV|3|7UK|4UU|3|7OH|4VV|3|85I|7ME|3|7OK|4VV|3|80Z|4UR|3|7O5|4W4|3|7ZW|7ZT|3|81Z|4UR|3|7ON|4VV|3|7XN|4UT|3|82Z|80W|3|7XZ|4UT|3|52L|4UV|4UR|88O|83Q|4VC|4W7|81K|7MT|2|83N|4W7|3|7V2|4W1|3|7Z8|4V4|3|80N|52I|3|7UW|4UU|3|7YB|4VS|3|7OB|4VV|3|7OQ|4VV|3|4US|4UV|4VH|3|4UT|4UV|7XN|7XZ|7X8|7Y2|7XE|7XT|7XH|7XB|2|7X8|4UT|3|7NK|4W4|3|86B|80W|3|82Q|4UR|3|802|4V4|3|ASJ|4VV|3|88O|52L|3|87O|4UU|3|7Y2|4UT|3|7YE|4VS|3|7V5|4W1|3|7OT|4VV|3|822|4UR|3|7OW|4VV|3|7V8|4W1|3|868|80W|3|7OZ|4VV|3|825|4UR|3|7ZB|4V4|3|7P2|4VV|3|7P5|4VV|3|883|4VS|3|7YH|4VS|3|83Q|4W7|3|7P8|4VV|3|7PB|4VV|3|4VS|4UV|4UV|880|7Y5|7Y8|886|7O8|80N|7YB|7OB|7YE|883|7YH|7Q5|7YN|889|7YQ|88C|7S2|88F|7YT|7TT|ARB|7YZ|7YW|2|7PE|4VV|3|7PH|4VV|3|83T|4W7|3|7PK|4VV|3|7PN|4VV|3|4VN|0|86B|4W7|4US|4UR|AR8|7Z2|4UT|4VS|8ZU|818|80Q|4VV|4W4|7ME|2|828|4UR|3|832|80W|3|8ZU|0|3|7NQ|4W4|3|7PQ|4VV|3|7ZE|4V4|3|BMA|4VV|818|4UR|3|7PT|4VV|3|80Q|4UR|84N|3|82B|4UR|3|88L|4VV|3|BMJ|0|7ZH|4V4|3|BMV|4V4|83W|4W7|3|4VV|4UV|7L2|7L5|7L8|7LB|7LE|7LH|7LK|7LN|7LQ|7LT|7LW|7LZ|7M2|7M8|88I|7M5|7MB|7O8|7OE|7OH|7OK|7ON|7OB|7OQ|ASJ|7OT|7OW|7OZ|7P2|7P5|7P8|7PB|7PE|7PH|7PK|7PN|7PQ|7PT|88L|7PW|7PZ|7Q2|7Q5|7Q8|7QB|7QE|7QH|7QK|7QN|7QQ|7QT|7QW|7QZ|7R2|7R5|7R8|7RB|7RE|7RH|7RK|7RN|7RQ|7RT|7RW|7RZ|7S2|7S5|AR2|7S8|7SB|AR5|7SE|7SH|7SK|7SN|7SQ|7ST|7SW|7SZ|7T2|7T5|7T8|7TB|7TE|7TH|7TK|7TQ|7TT|7TW|7TN|7TZ|7U2|7U5|7U8|7UB|BM4|2|7PW|4VV|3|BN3|4V4|7PZ|4VV|3|7ZK|4V4|3|7Q2|4VV|3|BM7|4VV|4V7|4UR|3|7N5|4W4|3|7Q5|4VV|3|7Q8|4VV|3|86E|4V4|3|BMM|4W1|7QB|4VV|3|7Z5|4V4|3|87R|4UU|3|7VB|4W1|3|7VN|4W1|3|859|7MK|3|7QE|4VV|3|808|4V4|3|7VE|4W1|3|7NZ|4W4|3|7QH|4VV|3|83Z|4W7|3|82E|4UR|3|7ZN|4V4|3|7UN|4UU|3|7UH|4UU|3|7UE|4UU|3|7QK|4VV|3|7QN|4VV|3|7VQ|4W1|3|4VC|4US|3|835|80W|3|7QQ|4VV|3|87F|4UU|3|842|4W7|3|81H|4UR|3|7QT|4VV|3|7MZ|7ME|3|7QW|4VV|3|7QZ|4VV|3|845|4W7|3|7ZQ|4V4|3|7YN|4VS|3|848|4W7|3|7ZT|4V4|7ZW|7ZZ|3|862|4W7|3|865|80W|3|7R2|4VV|3|7WQ|4UY|3|7VT|4W1|3|7R5|4VV|3|7XE|4UT|3|87X|0|3|889|4VS|3|838|80W|3|8OC|4V4|7MN|7ME|3|7MQ|7ME|3|7R8|4VV|3|7RB|4VV|3|7RE|4VV|3|7VW|4W1|3|7YQ|4VS|3|7RH|4VV|3|7RK|4VV|3|7XT|4UT|3|87C|4UU|3|84N|80Q|3|7WW|4UY|3|7XH|4UT|81W|81Z|82Q|822|825|828|82B|82E|82N|82H|82K|3|4W7|4UV|83N|83Q|83T|83W|83Z|842|845|848|862|84B|84E|84H|84K|3|85W|4V4|85Z|3|83B|80W|3|856|7MK|3|7O2|4W4|3|7RN|4VV|3|80K|4V4|3|88C|4VS|3|52I|4UV|80N|88C|7YT|3|7XB|4UT|3|BMP|7ZN|83E|80W|3|BMS|4UY|4W4|4UV|7NH|7NW|7NT|87I|7O5|7NK|7NQ|7N5|7NZ|7O2|7N8|7NB|7NE|7NN|2|BMY|4V4|7WE|4W1|3|7RQ|4VV|3|7N8|4W4|3|80W|4UR|82T|82W|82Z|4US|86B|868|832|835|865|838|83B|83E|83H|80T|3|7RT|4VV|3|7RW|4VV|3|81K|4UR|3|7VH|4W1|3|7RZ|4VV|3|82N|4UR|3|7NB|4W4|3|7NE|4W4|3|7VZ|4W1|3|81Q|4UR|3|7S2|4VV|3|7WZ|4UY|3|84B|4W7|3|7S5|4VV|3|83H|80W|3|85Z|85W|3|7WK|4W1|3|7UQ|4UU|3|AR2|4VV|3|7N2|7ME|3|84E|4W7|3|7W2|4W1|3|7S8|4VV|3|7SB|4VV|3|AR5|4VV|3|88F|4VS|3|7SE|4VV|3|7SH|4VV|3|7SK|4VV|3|7SN|4VV|3|4V4|4UV|4UV|80B|9Q0|7Z2|85I|7Z8|802|7ZB|7ZE|7ZH|7ZK|86E|7Z5|808|7ZN|7ZQ|7ZT|85W|80K|805|7WH|80E|80H|2|7XW|4UT|7SQ|4VV|3|7W8|4W1|3|7ST|4VV|3|84H|4W7|3|7SW|4VV|3|7SZ|4VV|3|7T2|4VV|3|7T5|4VV|3|7T8|4VV|3|7MW|7ME|3|7TB|4VV|3|7YT|4VS|3|805|4V4|3|7VK|4W1|3|7WH|4W1|3|4W1|4UV|4UV|7WB|7UZ|7V2|7V5|7V8|7VB|7VN|7VE|7VQ|7VT|7VW|7WE|7VH|7VZ|7WK|7W2|7W8|7VK|7WH|7W5|7MT|2|4VH|4US|3|7WT|4UY|3|4UU|4UV|7UT|87I|7UK|7UW|87O|87R|7UN|7UH|7UE|87F|87X|87C|7UQ|87U|87L|2|7TE|4VV|3|81N|4UR|3|7TH|4VV|3|7TK|4VV|3|7TQ|4VV|3|85F|7MK|3|7TT|4VS|3|7XQ|4UT|7W5|4W1|3|7TW|4VV|3|80T|4UR|83K|3|80E|4V4|3|7TN|4VV|3|ARB|4VS|3|7WN|4UY|3|7X5|4UY|4UY|3|7ZZ|7ZT|3|7TZ|4VV|3|7NN|4W4|3|7U2|4VV|3|87U|4UU|3|7U5|4VV|3|7U8|4VV|3|7UB|4VV|3|87L|4UU|3|80H|4V4|3|4UY|4UV|7X2|81W|7WQ|7WW|7XH|7WZ|7WT|7WN|7X5|82K|2|82H|4UR|3|7ME|4UV|7MH|7MK|85I|7MZ|7MN|7MQ|7N2|7MW|7MT|2|7YZ|4VS|3|7YW|4VS|3|BM4|4VV|3|84K|4W7|3|7MT|7ME|3|82K|4UR|3^^@$0|LH|1|-4|2|3|4|5|6|LI|7|$8|-4|9|@]|A|@]|B|C|D|-4|E|-2]|F|G|H|LJ]|$0|LK|1|-4|2|I|4|J|6|LL|7|$8|-4|A|@]|B|K|D|-4|E|-2|L|-2|9|@]|M|-2]]|$0|LM|1|-4|2|N|4|O|6|LN|7|$8|-4|9|@]|A|@]|B|P|D|-4|E|-2]|F|Q|H|LO]|$0|LP|1|-4|2|R|4|S|6|LQ|7|$8|-4|9|@]|A|@]|B|T|D|-4|E|-2]|F|Q|H|LR]|$0|LS|1|-4|2|U|4|V|6|LT|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|LU]|$0|LV|1|W|2|X|4|Y|6|LW|7|$8|Z|9|@$4|Q|0|LX]|$4|10|0|LY]|$4|11|0|LZ]|$4|12|0|M0]|$4|13|0|M1]|$4|14|0|M2]|$4|15|0|M3]|$0|M4|4|16]|$0|M5|4|17]|$0|M6|4|18]|$0|M7|4|19]|$0|M8|4|G]]|B|1A|D|1B|A|@1C|1D|1E|1F|1G|1H|1I|1J|1K|1L]|L|-2|E|-2]|H|M9]|$0|MA|1|-4|2|1M|4|1N|6|MB|7|$8|-4|A|@]|B|1O|D|-4|9|@]]|F|Q|H|MC]|$0|MD|1|-4|2|1P|4|1Q|6|ME|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|10|H|MF]|$0|MG|1|-4|2|1R|4|1S|6|MH|7|$8|-4|A|@]|B|1T|D|-4|9|@]]|F|17|H|MI]|$0|MJ|1|-4|2|1U|4|1V|6|MK|7|$8|1U|9|@]|A|@]|B|1W|D|-4|E|-2]|F|10|H|ML]|$0|MM|1|-4|2|1X|4|1Y|6|MN|7|$8|-4|A|@]|B|1Z|D|-4|9|@]]|F|12|H|MO]|$0|MP|1|-4|2|20|4|21|6|MQ|7|$8|-4|9|@]|A|@]|B|22|D|-4|E|-2]|F|16|H|MR]|$0|MS|1|-4|2|23|4|24|6|MT|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|MU]|$0|MV|1|-4|2|25|4|26|6|MW|7|$8|25|B|27|9|@$0|MX|4|28]|$0|MY|4|29]|$0|MZ|4|2A]|$0|N0|4|2B]|$0|N1|4|2C]|$0|N2|4|2D]]|A|@2E|1D|2F]|D|26|E|-1]|F|16|H|N3]|$0|N4|1|-4|2|2G|4|28|6|N5|7|$8|-4|9|@]|A|@]|B|2H|D|-4|E|-2]|F|26|H|N6]|$0|N7|1|-4|2|2I|4|16|6|N8|7|$8|2J|A|@1E|2K|2L|2M|2N]|B|2O|D|16|9|@$0|N9|4|21]|$0|NA|4|26]|$0|NB|4|2P]|$0|NC|4|2Q]|$0|ND|4|2R]|$0|NE|4|2S]|$0|NF|4|2A]|$0|NG|4|2T]|$0|NH|4|2U]|$0|NI|4|2V]|$0|NJ|4|2W]|$0|NK|4|2X]|$0|NL|4|2Y]|$0|NM|4|2Z]]]|F|Y|H|NN]|$0|NO|1|-4|2|30|4|29|6|NP|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|26|H|NQ]|$0|NR|1|-4|2|31|4|32|6|NS|7|$8|-4|A|@]|B|33|D|-4|9|@]]|F|Q|H|NT]|$0|NU|1|-4|2|34|4|35|6|NV|7|$8|-4|A|@]|B|36|D|-4|E|-2|9|@]]|F|14|H|NW]|$0|NX|1|-4|2|37|4|38|6|NY|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|NZ]|$0|O0|1|39|2|3A|4|3B|6|O1|7|$8|3B|A|@]|B|3C|D|-4|E|-2|9|@]]|F|17|H|O2]|$0|O3|1|-4|2|3D|4|3E|6|O4|7|$8|-4|A|@]|B|C|D|-4|9|@]]|F|Q|H|O5]|$0|O6|1|-4|2|3F|4|3G|6|O7|7|$8|-4|A|@]|B|2H|D|-4|9|@]]|F|Q|H|O8]|$0|O9|1|-4|2|3H|4|3I|6|OA|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|OB]|$0|OC|1|-4|2|3J|4|3K|6|OD|7|$8|3J|9|@]|A|@3L|3M]|B|3N|D|-4|E|-1]|F|11|H|OE]|$0|OF|1|-4|2|3O|4|3P|6|OG|7|$8|-4|A|@]|B|3Q|D|-4|9|@]]|F|Q|H|OH]|$0|OI|1|-4|2|3R|4|3S|6|OJ|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|3T|H|OK]|$0|OL|1|-4|2|3U|4|3V|6|OM|7|$8|-4|9|@]|A|@]|B|3W|D|-4|E|-2]|F|12|H|ON]|$0|OO|1|-4|2|3X|4|3T|6|OP|7|$8|-4|A|@]|B|P|D|-4|9|@$0|OQ|4|3S]|$0|OR|4|3Y]|$0|OS|4|3Z]|$0|OT|4|40]]]|F|G|H|OU]|$0|OV|1|-4|2|41|4|42|6|OW|7|$8|-4|A|@]|B|43|D|-4|9|@]]|F|19|H|OX]|$0|OY|1|-4|2|44|4|45|6|OZ|7|$8|-4|A|@]|B|43|D|-4|9|@]]|F|11|H|P0]|$0|P1|1|-4|2|46|4|47|6|P2|7|$8|-4|A|@]|B|33|D|-4|9|@]]|F|Q|H|P3]|$0|P4|1|-4|2|48|4|49|6|P5|7|$8|-4|A|@]|B|4A|D|-4|E|-2|L|-2|9|@]|M|-2]]|$0|P6|1|-4|2|4B|4|4C|6|P7|7|$8|-4|9|@]|A|@]|B|4D|D|-4|E|-1]|F|17|H|P8]|$0|P9|1|-4|2|4E|4|4F|6|PA|7|$8|-4|A|@]|B|4G|D|-4|9|@]]|F|12|H|PB]|$0|PC|1|-4|2|4H|4|4I|6|PD|7|$8|-4|A|@]|B|4J|D|-4|9|@]]|F|18|H|PE]|$0|PF|1|-4|2|4K|4|4L|6|PG|7|$8|-4|A|@]|B|36|D|-4|9|@]]|F|Q|H|PH]|$0|PI|1|-4|2|4M|4|4N|6|PJ|7|$8|-4|A|@]|B|4O|D|-4|9|@]]|F|18|H|PK]|$0|PL|1|-4|2|4P|4|4Q|6|PM|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|PN]|$0|PO|1|-4|2|4R|4|4S|6|PP|7|$8|4R|A|@]|B|4T|D|-4|9|@]]|F|Q|H|PQ]|$0|PR|1|-4|2|4U|4|4V|6|PS|7|$8|-4|A|@]|B|4T|D|-4|9|@]]|F|11|H|PT]|$0|PU|1|-4|2|4W|4|4X|6|PV|7|$8|4W|A|@]|B|4G|D|-4|9|@]]|F|11|H|PW]|$0|PX|1|-4|2|4Y|4|4Z|6|PY|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2Z|H|PZ]|$0|Q0|1|-4|2|50|4|51|6|Q1|7|$8|-4|9|@]|A|@]|B|52|D|-4|E|-1]|F|Q|H|Q2]|$0|Q3|1|-4|2|53|4|54|6|Q4|7|$8|-4|A|@]|B|1T|D|-4|L|-2|9|@]]]|$0|Q5|1|-4|2|55|4|56|6|Q6|7|$8|-4|A|@]|B|1W|D|-4|9|@]]|F|Q|H|Q7]|$0|Q8|1|-4|2|57|4|58|6|Q9|7|$8|-4|A|@]|B|59|D|-4|9|@]]|F|2Y|H|QA]|$0|QB|1|-4|2|5A|4|5B|6|QC|7|$8|-4|A|@]|B|33|D|-4|9|@]]|F|2Y|H|QD]|$0|QE|1|-4|2|5C|4|5D|6|QF|7|$8|5C|A|@5E|5F|5G|5H]|B|4G|D|-4|9|@]]|F|19|H|QG]|$0|QH|1|-4|2|5I|4|5J|6|QI|7|$8|5I|A|@]|B|22|D|-4|9|@]]|F|Q|H|QJ]|$0|QK|1|-4|2|5K|4|5L|6|QL|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|QM]|$0|QN|1|-4|2|5M|4|5N|6|QO|7|$8|-4|A|@]|B|5O|D|-4|9|@]]|F|19|H|QP]|$0|QQ|1|-4|2|5P|4|5Q|6|QR|7|$8|-4|A|@]|B|5R|D|-4|9|@]]|F|Q|H|QS]|$0|QT|1|-4|2|5S|4|5T|6|QU|7|$8|-4|9|@]|A|@]|B|P|D|-4|E|-1]|F|G|H|QV]|$0|QW|1|-4|2|5U|4|5V|6|QX|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|QY]|$0|QZ|1|-4|2|5W|4|2P|6|R0|7|$8|-4|A|@]|B|22|D|-4|9|@]]|F|16|H|R1]|$0|R2|1|-4|2|5X|4|5Y|6|R3|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|12|H|R4]|$0|R5|1|-4|2|5Z|4|60|6|R6|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|61|H|R7]|$0|R8|1|-4|2|62|4|63|6|R9|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2U|H|RA]|$0|RB|1|-4|2|64|4|65|6|RC|7|$8|-4|A|@]|B|22|D|-4|9|@]]|F|Q|H|RD]|$0|RE|1|-4|2|66|4|67|6|RF|7|$8|-4|9|@]|A|@]|B|P|D|-4|E|-2]|F|13|H|RG]|$0|RH|1|-4|2|68|4|69|6|RI|7|$8|-4|A|@]|B|5R|D|-4|9|@]]|F|2Y|H|RJ]|$0|RK|1|-4|2|6A|4|6B|6|RL|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|13|H|RM]|$0|RN|1|-4|2|6C|4|15|6|RO|7|$A|@2K|2T|1I|1E]|D|15|8|6D|B|P|9|@$0|RP|4|26]|$0|RQ|4|6E]|$0|RR|4|6F]|$0|RS|4|6G]|$0|RT|4|2V]|$0|RU|4|2B]|$0|RV|4|6H]]]|F|Y|H|RW]|$0|RX|1|-4|2|6I|4|6J|6|RY|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2V|H|RZ]|$0|S0|1|-4|2|6K|4|6L|6|S1|7|$8|-4|A|@]|B|33|D|-4|9|@]]|F|18|H|S2]|$0|S3|1|-4|2|6M|4|6N|6|S4|7|$8|-4|A|@]|B|1T|D|-4|9|@]]|F|17|H|S5]|$0|S6|1|-4|2|6O|4|6P|6|S7|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|11|H|S8]|$0|S9|1|-4|2|6Q|4|6R|6|SA|7|$8|-4|A|@]|B|59|D|-4|9|@]]|F|19|H|SB]|$0|SC|1|-4|2|6S|4|6T|6|SD|7|$8|-4|A|@]|B|6U|D|-4|9|@]]|F|11|H|SE]|$0|SF|1|-4|2|6V|4|6W|6|SG|7|$8|-4|A|@]|B|6X|D|-4|9|@]]|F|Q|H|SH]|$0|SI|1|-4|2|6Y|4|6Z|6|SJ|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|SK]|$0|SL|1|-4|2|70|4|2Q|6|SM|7|$8|70|A|@71|72|73]|B|1W|D|2Q|9|@$0|SN|4|74]]]|F|16|H|SO]|$0|SP|1|75|2|76|4|13|6|SQ|7|$8|76|9|@$0|SR|4|67]|$0|SS|4|6B]|$0|ST|4|77]|$0|SU|4|78]|$0|SV|4|79]|$0|SW|4|7A]|$0|SX|4|2U]|$0|SY|4|7B]]|B|7C|D|13|A|@13|1F|7D|7E|7F]|E|-2]|F|Y|H|SZ]|$0|T0|1|-4|2|7G|4|77|6|T1|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|13|H|T2]|$0|T3|1|-4|2|7H|4|7I|6|T4|7|$8|-4|A|@]|B|7J|D|-4|9|@]]|F|12|H|T5]|$0|T6|1|-4|2|7K|4|7L|6|T7|7|$8|7K|9|@]|A|@2N|2M|7M]|B|7N|D|-4|E|-2]|F|2Y|H|T8]|$0|T9|1|-4|2|7O|4|7P|6|TA|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2U|H|TB]|$0|TC|1|-4|2|7Q|4|7R|6|TD|7|$8|-4|A|@]|B|36|D|-4|9|@]]|F|17|H|TE]|$0|TF|1|-4|2|7S|4|7T|6|TG|7|$8|-4|A|@]|B|1O|D|-4|E|-2|9|@]]|F|Q|H|TH]|$0|TI|1|-4|2|7U|4|6E|6|TJ|7|$8|7U|A|@2K|2T]|B|27|D|-4|9|@]]|F|15|H|TK]|$0|TL|1|-4|2|7V|4|5H|6|TM|7|$8|7V|A|@5H|5G]|B|7W|D|-4|9|@]]|F|19|H|TN]|$0|TO|1|-4|2|7X|4|78|6|TP|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|13|H|TQ]|$0|TR|1|-4|2|7Y|4|7Z|6|TS|7|$8|-4|A|@]|B|5R|D|-4|9|@]]|F|11|H|TT]|$0|TU|1|-4|2|80|4|81|6|TV|7|$8|-4|A|@]|B|C|D|-4|9|@]]|F|18|H|TW]|$0|TX|1|-4|2|82|4|83|6|TY|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|TZ]|$0|U0|1|-4|2|84|4|85|6|U1|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2U|H|U2]|$0|U3|1|-4|2|86|4|87|6|U4|7|$8|-4|A|@]|B|C|D|-4|9|@]]|F|Q|H|U5]|$0|U6|1|-4|2|88|4|89|6|U7|7|$8|-4|A|@]|B|1Z|D|-4|9|@]]|F|18|H|U8]|$0|U9|1|-4|2|88|4|8A|6|UA|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2Y|H|UB]|$0|UC|1|-4|2|8B|4|8C|6|UD|7|$8|-4|A|@]|B|43|D|-4|9|@]]|F|Q|H|UE]|$0|UF|1|-4|2|8D|4|8E|6|UG|7|$8|-4|A|@]|B|T|D|-4|9|@]]|F|2U|H|UH]|$0|UI|1|-4|2|8F|4|8G|6|UJ|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|17|H|UK]|$0|UL|1|-4|2|8H|4|8I|6|UM|7|$8|-4|A|@]|B|1W|D|-4|9|@]]|F|Q|H|UN]|$0|UO|1|-4|2|8J|4|8K|6|UP|7|$8|-4|A|@]|B|8L|D|-4|9|@]]|F|Q|H|UQ]|$0|UR|1|-4|2|8M|4|8N|6|US|7|$8|8M|A|@]|B|1T|D|-4|9|@]]|F|11|H|UT]|$0|UU|1|-4|2|8O|4|8P|6|UV|7|$8|-4|A|@]|B|K|D|-4|9|@]]|F|11|H|UW]|$0|UX|1|-4|2|8Q|4|6F|6|UY|7|$8|8Q|A|@]|B|7J|D|-4|9|@]]|F|15|H|UZ]|$0|V0|1|-4|2|8R|4|8S|6|V1|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|V2]|$0|V3|1|-4|2|8T|4|8U|6|V4|7|$8|-4|A|@]|B|1W|D|-4|9|@]]|F|Q|H|V5]|$0|V6|1|8V|2|8W|4|11|6|V7|7|$8|8X|9|@$4|Y|0|V8]|$0|V9|4|3K]|$0|VA|4|45]|$0|VB|4|4V]|$0|VC|4|4X]|$0|VD|4|5J]|$0|VE|4|6P]|$0|VF|4|6T]|$0|VG|4|6W]|$0|VH|4|7Z]|$0|VI|4|8N]|$0|VJ|4|8P]|$0|VK|4|8Y]|$0|VL|4|8Z]|$0|VM|4|90]|$0|VN|4|91]|$0|VO|4|2W]|$0|VP|4|92]|$0|VQ|4|93]|$0|VR|4|94]|$0|VS|4|95]|$0|VT|4|96]|$0|VU|4|97]|$0|VV|4|98]]|A|@1E|3M|99|9A|9B]|B|9C|D|11|E|-2]|F|Y|H|VW]|$0|VX|1|-4|2|9D|4|9E|6|VY|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|VZ]|$0|W0|1|-4|2|9F|4|9G|6|W1|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|W2]|$0|W3|1|-4|2|9H|4|9I|6|W4|7|$8|-4|A|@]|B|K|D|-4|9|@]]|F|2V|H|W5]|$0|W6|1|-4|2|9J|4|9K|6|W7|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|W8]|$0|W9|1|-4|2|9L|4|9M|6|WA|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|WB]|$0|WC|1|9N|2|9O|4|14|6|WD|7|$8|9O|9|@$4|7L|0|WE]|$4|2V|0|WF]|$4|2Q|0|WG]|$4|26|0|WH]|$0|WI|4|35]|$0|WJ|4|4C]|$0|WK|4|13]|$0|WL|4|11]|$0|WM|4|1I]|$0|WN|4|2R]|$0|WO|4|2S]|$0|WP|4|Q]|$0|WQ|4|12]|$0|WR|4|G]]|A|@1F|9P|1E|9Q]|B|4J|D|14|E|-1|M|-2]|F|Y|H|WS]|$0|WT|1|-4|2|9R|4|9S|6|WU|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2U|H|WV]|$0|WW|1|-4|2|9T|4|9U|6|WX|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2Y|H|WY]|$0|WZ|1|9V|2|9W|4|1I|6|X0|7|$8|-4|A|@1I|9X|9Y]|B|9Z|D|-4|9|@]|E|-2]|F|14|H|X1]|$0|X2|1|-4|2|A0|4|A1|6|X3|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|12|H|X4]|$0|X5|1|-4|2|A2|4|A3|6|X6|7|$8|-4|A|@]|B|33|D|-4|9|@]]|F|Q|H|X7]|$0|X8|1|-4|2|A4|4|A5|6|X9|7|$8|-4|A|@]|B|A6|D|-4|9|@]]|F|17|H|XA]|$0|XB|1|-4|2|A7|4|A8|6|XC|7|$8|-4|A|@]|B|4A|D|-4|E|-2|L|-2|9|@]|M|-2]]|$0|XD|1|-4|2|A9|4|2R|6|XE|7|$8|-4|9|@]|A|@]|B|AA|D|-4|E|-2]|F|14|H|XF]|$0|XG|1|-4|2|AB|4|AC|6|XH|7|$8|-4|A|@]|B|5O|D|-4|9|@]]|F|Q|H|XI]|$0|XJ|1|-4|2|AD|4|2S|6|XK|7|$8|-4|A|@]|B|AE|D|-4|9|@$0|XL|4|AF]]]|F|16|H|XM]|$0|XN|1|-4|2|AG|4|AH|6|XO|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2U|H|XP]|$0|XQ|1|-4|2|AI|4|AJ|6|XR|7|$8|AK|A|@AL|AM|AN]|B|22|D|-4|9|@]]|F|Q|H|XS]|$0|XT|1|-4|2|AO|4|AP|6|XU|7|$8|-4|A|@]|B|4A|D|-4|E|-2|L|-2|9|@]|M|-2]]|$0|XV|1|-4|2|AQ|4|AR|6|XW|7|$8|-4|A|@]|B|27|D|-4|9|@]]|F|17|H|XX]|$0|XY|1|-4|2|AS|4|AT|6|XZ|7|$8|-4|A|@]|B|K|D|-4|E|-2|L|-2|9|@]|M|-2]]|$0|Y0|1|-4|2|AU|4|AV|6|Y1|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2V|H|Y2]|$0|Y3|1|AW|2|AX|4|Q|6|Y4|7|$8|AX|9|@$0|Y5|4|O]|$0|Y6|4|S]|$0|Y7|4|V]|$0|Y8|4|1N]|$0|Y9|4|24]|$0|YA|4|32]|$0|YB|4|38]|$0|YC|4|3E]|$0|YD|4|3G]|$0|YE|4|3I]|$0|YF|4|3P]|$0|YG|4|47]|$0|YH|4|4L]|$0|YI|4|4Q]|$0|YJ|4|4S]|$0|YK|4|51]|$0|YL|4|56]|$0|YM|4|5J]|$0|YN|4|5L]|$0|YO|4|5Q]|$0|YP|4|5V]|$0|YQ|4|65]|$0|YR|4|6W]|$0|YS|4|6Z]|$0|YT|4|7T]|$0|YU|4|83]|$0|YV|4|87]|$0|YW|4|8C]|$0|YX|4|8I]|$0|YY|4|8K]|$0|YZ|4|8S]|$0|Z0|4|8U]|$0|Z1|4|9E]|$0|Z2|4|9G]|$0|Z3|4|9K]|$0|Z4|4|9M]|$0|Z5|4|A3]|$0|Z6|4|AC]|$0|Z7|4|AJ]|$0|Z8|4|AY]|$0|Z9|4|AZ]|$0|ZA|4|B0]|$0|ZB|4|8Y]|$0|ZC|4|B1]|$0|ZD|4|B2]|$0|ZE|4|B3]|$0|ZF|4|B4]|$0|ZG|4|B5]|$0|ZH|4|B6]|$0|ZI|4|B7]|$0|ZJ|4|B8]|$0|ZK|4|B9]|$0|ZL|4|BA]|$0|ZM|4|BB]|$0|ZN|4|BC]|$0|ZO|4|BD]|$0|ZP|4|BE]|$0|ZQ|4|BF]|$0|ZR|4|BG]|$0|ZS|4|BH]|$0|ZT|4|BI]|$0|ZU|4|BJ]|$0|ZV|4|BK]|$0|ZW|4|BL]|$0|ZX|4|BM]|$0|ZY|4|92]|$0|ZZ|4|BN]|$0|100|4|BO]|$0|101|4|BP]|$0|102|4|BQ]|$0|103|4|BR]|$0|104|4|BS]|$0|105|4|BT]|$0|106|4|BU]|$0|107|4|BV]|$0|108|4|BW]|$0|109|4|BX]|$0|10A|4|BY]|$0|10B|4|BZ]|$0|10C|4|C0]|$0|10D|4|C1]|$0|10E|4|C2]|$0|10F|4|C3]|$0|10G|4|C4]|$0|10H|4|C5]|$0|10I|4|C6]|$0|10J|4|C7]|$0|10K|4|95]|$0|10L|4|C8]|$0|10M|4|C9]|$0|10N|4|CA]|$0|10O|4|CB]|$0|10P|4|CC]|$0|10Q|4|CD]|$0|10R|4|CE]|$0|10S|4|CF]]|A|@1F|CG|CH|1G|CI|CJ|CK]|B|52|D|Q|E|-2]|F|Y|H|10T]|$0|10U|1|-4|2|CL|4|AY|6|10V|7|$8|-4|A|@]|B|33|D|-4|9|@]]|F|Q|H|10W]|$0|10X|1|-4|2|CM|4|CN|6|10Y|7|$8|-4|A|@]|B|K|D|-4|E|-2|L|-2|9|@]|M|-2]]|$0|10Z|1|-4|2|CO|4|AZ|6|110|7|$8|-4|A|@]|B|CP|D|-4|9|@]]|F|Q|H|111]|$0|112|1|-4|2|CQ|4|CR|6|113|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|17|H|114]|$0|115|1|-4|2|CS|4|B0|6|116|7|$8|-4|A|@]|B|59|D|-4|9|@]]|F|Q|H|117]|$0|118|1|-4|2|CT|4|CU|6|119|7|$8|-4|A|@]|B|36|D|-4|E|-2|L|-2|9|@]|M|-2]]|$0|11A|1|-4|2|CV|4|2A|6|11B|7|$A|@CW|1F|13]|8|-4|9|@]|B|1Z|D|-4|E|-1]|F|26|H|11C]|$0|11D|1|-4|2|CX|4|CY|6|11E|7|$8|-4|9|@]|A|@]|B|27|D|-4|E|-1]|F|12|H|11F]|$0|11G|1|-4|2|CZ|4|8Y|6|11H|7|$8|-4|A|@]|B|D0|D|-4|9|@]]|F|Q|H|11I]|$0|11J|1|-4|2|D1|4|B1|6|11K|7|$8|-4|A|@]|B|AE|D|-4|9|@]]|F|Q|H|11L]|$0|11M|1|-4|2|D2|4|D3|6|11N|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|17|H|11O]|$0|11P|1|-4|2|D4|4|D5|6|11Q|7|$8|-4|A|@]|B|K|D|-4|E|-2|L|-2|9|@]|M|-2]]|$0|11R|1|-4|2|D6|4|B2|6|11S|7|$8|-4|A|@]|B|1O|D|-4|9|@]]|F|Q|H|11T]|$0|11U|1|-4|2|D7|4|D8|6|11V|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|17|H|11W]|$0|11X|1|-4|2|D9|4|DA|6|11Y|7|$8|DB|A|@]|B|7W|D|-4|9|@]]|F|19|H|11Z]|$0|120|1|-4|2|DC|4|DD|6|121|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|18|H|122]|$0|123|1|-4|2|DE|4|DF|6|124|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|18|H|125]|$0|126|1|-4|2|DG|4|3Y|6|127|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|3T|H|128]|$0|129|1|-4|2|DH|4|B3|6|12A|7|$8|-4|A|@]|B|36|D|-4|9|@]]|F|Q|H|12B]|$0|12C|1|-4|2|DI|4|DJ|6|12D|7|$8|-4|A|@]|B|3C|D|-4|9|@]]|F|17|H|12E]|$0|12F|1|-4|2|DK|4|DL|6|12G|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|18|H|12H]|$0|12I|1|-4|2|DM|4|DN|6|12J|7|$8|DM|9|@]|A|@DO]|B|2H|D|-4|E|-1]|F|12|H|12K]|$0|12L|1|-4|2|DP|4|B4|6|12M|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|12N]|$0|12O|1|-4|2|DQ|4|DR|6|12P|7|$8|-4|A|@]|B|36|D|-4|9|@]]|F|2V|H|12Q]|$0|12R|1|-4|2|DS|4|DT|6|12S|7|$8|-4|A|@]|B|2O|D|-4|9|@]]|F|2U|H|12T]|$0|12U|1|-4|2|DU|4|DV|6|12V|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|17|H|12W]|$0|12X|1|-4|2|DW|4|DX|6|12Y|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|19|H|12Z]|$0|130|1|-4|2|DY|4|DZ|6|131|7|$8|-4|A|@]|B|4J|D|-4|9|@]]|F|19|H|132]|$0|133|1|-4|2|E0|4|E1|6|134|7|$8|-4|9|@]|A|@]|B|E2|D|-4|E|-1]|F|19|H|135]|$0|136|1|-4|2|E3|4|B5|6|137|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|138]|$0|139|1|-4|2|E4|4|B6|6|13A|7|$8|-4|A|@]|B|CP|D|-4|9|@]]|F|Q|H|13B]|$0|13C|1|-4|2|E5|4|E6|6|13D|7|$8|-4|A|@]|B|K|D|-4|9|@]]|F|18|H|13E]|$0|13F|1|-4|2|E7|4|6G|6|13G|7|$B|E8|8|-4|A|@]|D|-4|9|@]]|F|15|H|13H]|$0|13I|1|-4|2|E7|4|E9|6|13J|7|$8|-4|A|@]|B|E8|D|-4|9|@]]|F|2Y|H|13K]|$0|13L|1|-4|2|EA|4|B7|6|13M|7|$8|-4|A|@]|B|59|D|-4|9|@]]|F|Q|H|13N]|$0|13O|1|-4|2|EB|4|EC|6|13P|7|$8|EB|A|@]|B|1W|D|-4|9|@]]|F|19|H|13Q]|$0|13R|1|-4|2|ED|4|EE|6|13S|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2V|H|13T]|$0|13U|1|-4|2|EF|4|2T|6|13V|7|$8|-4|9|@]|A|@]|B|T|D|-4|E|-2]|F|16|H|13W]|$0|13X|1|-4|2|EG|4|B8|6|13Y|7|$8|-4|A|@]|B|C|D|-4|9|@]]|F|Q|H|13Z]|$0|140|1|-4|2|EH|4|EI|6|141|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|G|H|142]|$0|143|1|-4|2|EJ|4|B9|6|144|7|$8|-4|A|@]|B|D0|D|-4|9|@]]|F|Q|H|145]|$0|146|1|-4|2|EK|4|BA|6|147|7|$8|-4|A|@]|B|6U|D|-4|9|@]]|F|Q|H|148]|$0|149|1|-4|2|EL|4|EM|6|14A|7|$8|-4|A|@]|B|C|D|-4|9|@]]|F|2V|H|14B]|$0|14C|1|-4|2|EN|4|EO|6|14D|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|17|H|14E]|$0|14F|1|-4|2|EP|4|8Z|6|14G|7|$8|-4|A|@]|B|EQ|D|-4|9|@]]|F|11|H|14H]|$0|14I|1|-4|2|ER|4|ES|6|14J|7|$8|-4|A|@]|B|22|D|-4|9|@]]|F|2V|H|14K]|$0|14L|1|-4|2|ET|4|61|6|14M|7|$8|-4|A|@]|B|P|D|-4|9|@$0|14N|4|60]|$0|14O|4|EU]]]|F|17|H|14P]|$0|14Q|1|-4|2|ET|4|EV|6|14R|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2V|H|14S]|$0|14T|1|-4|2|ET|4|EW|6|14U|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2Y|H|14V]|$0|14W|1|-4|2|EX|4|BB|6|14X|7|$8|-4|A|@]|B|43|D|-4|9|@]]|F|Q|H|14Y]|$0|14Z|1|-4|2|EY|4|EZ|6|150|7|$8|-4|A|@]|B|F0|D|-4|9|@]]|F|10|H|151]|$0|152|1|-4|2|F1|4|F2|6|153|7|$8|-4|A|@]|B|4O|D|-4|9|@]]|F|18|H|154]|$0|155|1|-4|2|F3|4|BC|6|156|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|157]|$0|158|1|-4|2|F4|4|79|6|159|7|$8|-4|A|@]|B|F5|D|-4|9|@]]|F|13|H|15A]|$0|15B|1|-4|2|F6|4|F7|6|15C|7|$8|F6|A|@F8|F9]|B|3C|D|-4|9|@]]|F|19|H|15D]|$0|15E|1|-4|2|FA|4|90|6|15F|7|$8|FA|A|@]|B|C|D|-4|9|@]]|F|11|H|15G]|$0|15H|1|-4|2|FB|4|FC|6|15I|7|$8|-4|A|@]|B|1O|D|-4|9|@]]|F|2Y|H|15J]|$0|15K|1|-4|2|FD|4|FE|6|15L|7|$8|-4|A|@]|B|5O|D|-4|L|-2|9|@]]]|$0|15M|1|-4|2|FF|4|FG|6|15N|7|$8|-4|A|@]|B|2H|D|-4|9|@]]|F|G|H|15O]|$0|15P|1|-4|2|FH|4|FI|6|15Q|7|$8|-4|A|@]|B|FJ|D|-4|9|@]]|F|G|H|15R]|$0|15S|1|-4|2|FK|4|BD|6|15T|7|$8|-4|A|@]|B|43|D|-4|9|@]]|F|Q|H|15U]|$0|15V|1|-4|2|FL|4|BE|6|15W|7|$8|-4|A|@]|B|27|D|-4|9|@]]|F|Q|H|15X]|$0|15Y|1|-4|2|FM|4|BF|6|15Z|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|160]|$0|161|1|-4|2|FN|4|FO|6|162|7|$8|-4|A|@]|B|4O|D|-4|9|@]]|F|18|H|163]|$0|164|1|-4|2|FP|4|91|6|165|7|$8|-4|A|@]|B|4A|D|-4|9|@]]|F|11|H|166]|$0|167|1|-4|2|FQ|4|BG|6|168|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|169]|$0|16A|1|-4|2|FR|4|BH|6|16B|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|16C]|$0|16D|1|-4|2|FS|4|7A|6|16E|7|$8|-4|9|@]|A|@]|B|P|D|-4|E|-2]|F|13|H|16F]|$0|16G|1|-4|2|FT|4|FU|6|16H|7|$8|FT|9|@]|A|@]|B|3N|D|-4|E|-2]|F|19|H|16I]|$0|16J|1|-4|2|FV|4|AF|6|16K|7|$8|-4|A|@]|B|A6|D|-4|9|@]]|F|2S|H|16L]|$0|16M|1|-4|2|FW|4|FX|6|16N|7|$8|-4|A|@]|B|C|D|-4|9|@]]|F|10|H|16O]|$0|16P|1|-4|2|FY|4|2U|6|16Q|7|$8|-4|9|@$0|16R|4|1V]|$0|16S|4|63]|$0|16T|4|7P]|$0|16U|4|85]|$0|16V|4|8E]|$0|16W|4|9S]|$0|16X|4|AH]|$0|16Y|4|DT]|$0|16Z|4|FZ]|$0|170|4|G0]|$0|171|4|G1]]|A|@]|B|9Z|D|-4|E|-1]|F|13|H|172]|$0|173|1|-4|2|G2|4|2V|6|174|7|$A|@1F|2L|G3|G4|G5]|8|G2|9|@$0|175|4|6J]|$0|176|4|6F]|$0|177|4|9I]|$0|178|4|AV]|$0|179|4|DR]|$0|17A|4|EE]|$0|17B|4|EM]|$0|17C|4|ES]|$0|17D|4|EV]|$0|17E|4|G6]|$0|17F|4|G7]|$0|17G|4|G8]|$0|17H|4|G9]]|B|C|D|2V|E|-2]|F|16|H|17I]|$0|17J|1|-4|2|GA|4|GB|6|17K|7|$8|-4|9|@$0|17L|4|GC]]|A|@]|B|P|D|-4|E|-2]|F|17|H|17M]|$0|17N|1|-4|2|GD|4|2N|6|17O|7|$8|-4|A|@]|B|43|D|-4|9|@]]|F|2Y|H|17P]|$0|17Q|1|-4|2|GE|4|3Z|6|17R|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|3T|H|17S]|$0|17T|1|-4|2|GF|4|GG|6|17U|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|12|H|17V]|$0|17W|1|-4|2|GH|4|BI|6|17X|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|17Y]|$0|17Z|1|-4|2|GI|4|GJ|6|180|7|$8|-4|A|@]|B|1T|D|-4|9|@]]|F|17|H|181]|$0|182|1|-4|2|GK|4|2W|6|183|7|$8|GK|A|@GL|GM|GN]|B|4T|D|-4|9|@]]|F|2X|H|184]|$0|185|1|-4|2|GO|4|2X|6|186|7|$A|@GL|G4|2N|GP|3M]|8|GO|9|@$0|187|4|6P]|$0|188|4|2W]|$0|189|4|94]]|B|4T|D|2X|E|-2]|F|16|H|18A]|$0|18B|1|-4|2|GQ|4|7B|6|18C|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|13|H|18D]|$0|18E|1|-4|2|GR|4|GS|6|18F|7|$8|-4|A|@]|B|T|D|-4|E|-2|L|-2|9|@]|M|-2]]|$0|18G|1|-4|2|GT|4|GU|6|18H|7|$8|-4|A|@]|B|1W|D|-4|9|@]]|F|2Y|H|18I]|$0|18J|1|-4|2|GV|4|GW|6|18K|7|$8|-4|A|@]|B|3C|D|-4|E|-2|L|-2|9|@]|M|-2]]|$0|18L|1|-4|2|GX|4|12|6|18M|7|$8|GX|9|@$0|18N|4|1Y]|$0|18O|4|3V]|$0|18P|4|4F]|$0|18Q|4|5D]|$0|18R|4|5Y]|$0|18S|4|7I]|$0|18T|4|A1]|$0|18U|4|CY]|$0|18V|4|DN]|$0|18W|4|GG]|$0|18X|4|GY]|$0|18Y|4|GZ]|$0|18Z|4|H0]|$0|190|4|H1]]|A|@1E|H2|H3|1L|H4]|B|7W|D|12|E|-2]|F|Y|H|191]|$0|192|1|-4|2|H5|4|H6|6|193|7|$8|-4|A|@]|B|4A|D|-4|E|-2|L|-2|9|@]|M|-2]]|$0|194|1|-4|2|H7|4|H8|6|195|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|18|H|196]|$0|197|1|-4|2|H9|4|BJ|6|198|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|199]|$0|19A|1|-4|2|HA|4|GY|6|19B|7|$8|-4|A|@]|B|4T|D|-4|9|@]]|F|12|H|19C]|$0|19D|1|-4|2|HB|4|2Y|6|19E|7|$8|HC|9|@$0|19F|4|58]|$0|19G|4|5B]|$0|19H|4|69]|$0|19I|4|2Q]|$0|19J|4|7L]|$0|19K|4|8A]|$0|19L|4|9U]|$0|19M|4|E9]|$0|19N|4|EW]|$0|19O|4|FC]|$0|19P|4|2N]|$0|19Q|4|GU]|$0|19R|4|HD]|$0|19S|4|2Z]]|A|@]|B|4A|D|-4|E|-1]|F|16|H|19T]|$0|19U|1|-4|2|HE|4|BK|6|19V|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|19W]|$0|19X|1|-4|2|HF|4|BL|6|19Y|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|19Z]|$0|1A0|1|-4|2|HG|4|2B|6|1A1|7|$8|HG|A|@]|B|D0|D|-4|9|@]]|F|15|H|1A2]|$0|1A3|1|-4|2|HH|4|HI|6|1A4|7|$8|-4|A|@]|B|C|D|-4|9|@]]|F|18|H|1A5]|$0|1A6|1|-4|2|HJ|4|BM|6|1A7|7|$8|-4|A|@]|B|2H|D|-4|9|@]]|F|Q|H|1A8]|$0|1A9|1|-4|2|HK|4|FZ|6|1AA|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2U|H|1AB]|$0|1AC|1|-4|2|HL|4|GZ|6|1AD|7|$8|-4|A|@]|B|43|D|-4|9|@]]|F|12|H|1AE]|$0|1AF|1|-4|2|HM|4|H0|6|1AG|7|$8|-4|A|@]|B|EQ|D|-4|9|@]]|F|12|H|1AH]|$0|1AI|1|-4|2|HN|4|HO|6|1AJ|7|$8|-4|A|@]|B|C|D|-4|9|@]]|F|18|H|1AK]|$0|1AL|1|-4|2|HP|4|2C|6|1AM|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|26|H|1AN]|$0|1AO|1|-4|2|HQ|4|92|6|1AP|7|$8|-4|A|@]|B|E8|D|-4|9|@]]|F|Q|H|1AQ]|$0|1AR|1|-4|2|HR|4|HS|6|1AS|7|$8|-4|A|@]|B|HT|D|-4|9|@]]|F|10|H|1AT]|$0|1AU|1|-4|2|HU|4|G6|6|1AV|7|$8|-4|A|@]|B|T|D|-4|9|@]]|F|2V|H|1AW]|$0|1AX|1|-4|2|HV|4|BN|6|1AY|7|$8|-4|A|@]|B|8L|D|-4|9|@]]|F|Q|H|1AZ]|$0|1B0|1|-4|2|HW|4|HD|6|1B1|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2Y|H|1B2]|$0|1B3|1|-4|2|HX|4|GC|6|1B4|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|GB|H|1B5]|$0|1B6|1|-4|2|HY|4|HZ|6|1B7|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|18|H|1B8]|$0|1B9|1|-4|2|I0|4|I1|6|1BA|7|$8|-4|A|@]|B|43|D|-4|9|@]]|F|19|H|1BB]|$0|1BC|1|-4|2|I2|4|BO|6|1BD|7|$8|I2|A|@]|B|1W|D|-4|E|-2|9|@]]|F|Q|H|1BE]|$0|1BF|1|-4|2|I3|4|I4|6|1BG|7|$8|-4|A|@]|B|EQ|D|-4|9|@]]|F|G|H|1BH]|$0|1BI|1|-4|2|I5|4|G7|6|1BJ|7|$8|-4|A|@]|B|AE|D|-4|9|@]]|F|2V|H|1BK]|$0|1BL|1|-4|2|I6|4|I7|6|1BM|7|$8|-4|A|@]|B|C|D|-4|9|@]]|F|18|H|1BN]|$0|1BO|1|-4|2|I8|4|BP|6|1BP|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|1BQ]|$0|1BR|1|-4|2|I9|4|BQ|6|1BS|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|1BT]|$0|1BU|1|-4|2|IA|4|BR|6|1BV|7|$8|IA|A|@CC|CD|IB]|B|1O|D|-4|E|-2|9|@]]|F|Q|H|1BW]|$0|1BX|1|-4|2|IC|4|93|6|1BY|7|$8|IC|A|@ID|3M|IE]|B|43|D|-4|9|@]]|F|11|H|1BZ]|$0|1C0|1|-4|2|IF|4|BS|6|1C1|7|$8|-4|A|@]|B|C|D|-4|9|@]]|F|Q|H|1C2]|$0|1C3|1|-4|2|IG|4|BT|6|1C4|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|1C5]|$0|1C6|1|-4|2|IH|4|BU|6|1C7|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|1C8]|$0|1C9|1|-4|2|II|4|BV|6|1CA|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|1CB]|$0|1CC|1|-4|2|IJ|4|17|6|1CD|7|$8|IJ|9|@$4|Y|0|1CE]|$0|1CF|4|1S]|$0|1CG|4|3B]|$0|1CH|4|4C]|$0|1CI|4|5T]|$0|1CJ|4|6N]|$0|1CK|4|7R]|$0|1CL|4|8G]|$0|1CM|4|A5]|$0|1CN|4|AR]|$0|1CO|4|CR]|$0|1CP|4|D3]|$0|1CQ|4|D8]|$0|1CR|4|DJ]|$0|1CS|4|DV]|$0|1CT|4|EO]|$0|1CU|4|61]|$0|1CV|4|GB]|$0|1CW|4|GJ]|$0|1CX|4|IK]|$0|1CY|4|IL]|$0|1CZ|4|IM]|$0|1D0|4|IN]]|A|@1F|CK|IN|IO]|B|IP|D|IQ|E|-2|M|-2]|F|Y|H|1D1]|$0|1D2|1|-4|2|IR|4|IS|6|1D3|7|$8|-4|A|@]|B|P|D|-4|L|@]|9|@]]]|$0|1D4|1|-4|2|IT|4|BW|6|1D5|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|1D6]|$0|1D7|1|-4|2|IU|4|IV|6|1D8|7|$8|-4|A|@]|B|1T|D|-4|9|@]]|F|18|H|1D9]|$0|1DA|1|-4|2|IW|4|BX|6|1DB|7|$8|-4|9|@]|A|@]|B|4A|D|-4|E|-1]|F|Q|H|1DC]|$0|1DD|1|-4|2|IX|4|G8|6|1DE|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2V|H|1DF]|$0|1DG|1|-4|2|IY|4|BY|6|1DH|7|$8|-4|A|@]|B|C|D|-4|9|@]]|F|Q|H|1DI]|$0|1DJ|1|-4|2|IZ|4|BZ|6|1DK|7|$8|-4|A|@]|B|1T|D|-4|9|@]]|F|Q|H|1DL]|$0|1DM|1|-4|2|J0|4|C0|6|1DN|7|$8|-4|9|@]|A|@]|B|P|D|-4|E|-2]|F|Q|H|1DO]|$0|1DP|1|-4|2|J1|4|C1|6|1DQ|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|1DR]|$0|1DS|1|-4|2|J2|4|C2|6|1DT|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|1DU]|$0|1DV|1|-4|2|J3|4|J4|6|1DW|7|$8|-4|A|@]|B|1Z|D|-4|9|@]]|F|G|H|1DX]|$0|1DY|1|-4|2|J5|4|C3|6|1DZ|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|1E0]|$0|1E1|1|-4|2|J6|4|94|6|1E2|7|$8|-4|A|@]|B|J7|D|-4|9|@]]|F|11|H|1E3]|$0|1E4|1|-4|2|J8|4|IK|6|1E5|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|17|H|1E6]|$0|1E7|1|-4|2|J9|4|JA|6|1E8|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|18|H|1E9]|$0|1EA|1|-4|2|JB|4|IL|6|1EB|7|$8|-4|9|@]|A|@]|B|36|D|-4|E|-2]|F|18|H|1EC]|$0|1ED|1|-4|2|JC|4|18|6|1EE|7|$8|JD|9|@$4|Y|0|1EF]|$0|1EG|4|4I]|$0|1EH|4|4N]|$0|1EI|4|6L]|$0|1EJ|4|81]|$0|1EK|4|89]|$0|1EL|4|DD]|$0|1EM|4|DF]|$0|1EN|4|DL]|$0|1EO|4|E6]|$0|1EP|4|F2]|$0|1EQ|4|FO]|$0|1ER|4|H8]|$0|1ES|4|HI]|$0|1ET|4|HO]|$0|1EU|4|HZ]|$0|1EV|4|I7]|$0|1EW|4|IV]|$0|1EX|4|JA]|$0|1EY|4|IL]|$0|1EZ|4|JE]|$0|1F0|4|6H]]|A|@IB|1L|7F|1E|1F|JF|JG|JH]|B|1W|D|G|E|-1|M|-2]|F|Y|H|1F1]|$0|1F2|1|-4|2|JI|4|74|6|1F3|7|$B|33|9|@]|A|@]]|F|2Q|H|1F4]|$0|1F5|1|-4|2|JJ|4|JK|6|1F6|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|10|H|1F7]|$0|1F8|1|JL|2|JM|4|19|6|1F9|7|$8|JN|9|@$0|1FA|4|42]|$0|1FB|4|5D]|$0|1FC|4|5N]|$0|1FD|4|6R]|$0|1FE|4|5H]|$0|1FF|4|DA]|$0|1FG|4|DX]|$0|1FH|4|DZ]|$0|1FI|4|E1]|$0|1FJ|4|EC]|$0|1FK|4|F7]|$0|1FL|4|FU]|$0|1FM|4|I1]|$0|1FN|4|JO]|$0|1FO|4|JP]]|B|JQ|D|JR|A|@JS|1F|AM|JT|9A|JU]|E|-2|M|-2]|F|Y|H|1FP]|$0|1FQ|1|-4|2|JV|4|C4|6|1FR|7|$8|-4|A|@]|B|9C|D|-4|9|@]]|F|Q|H|1FS]|$0|1FT|1|-4|2|JW|4|2D|6|1FU|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|26|H|1FV]|$0|1FW|1|-4|2|JX|4|C5|6|1FX|7|$8|-4|A|@]|B|4T|D|-4|9|@]]|F|Q|H|1FY]|$0|1FZ|1|-4|2|JY|4|C6|6|1G0|7|$8|-4|A|@]|B|27|D|-4|9|@]]|F|Q|H|1G1]|$0|1G2|1|-4|2|JZ|4|C7|6|1G3|7|$8|-4|A|@]|B|43|D|-4|9|@]]|F|Q|H|1G4]|$0|1G5|1|-4|2|K0|4|40|6|1G6|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|3T|H|1G7]|$0|1G8|1|-4|2|K1|4|95|6|1G9|7|$8|K1|A|@]|B|5O|D|-4|9|@]]|F|Q|H|1GA]|$0|1GB|1|-4|2|K2|4|K3|6|1GC|7|$8|-4|A|@]|B|P|D|-4|L|@]|9|@]]]|$0|1GD|1|-4|2|K4|4|JE|6|1GE|7|$8|-4|A|@]|B|4O|D|-4|9|@]]|F|18|H|1GF]|$0|1GG|1|-4|2|K5|4|C8|6|1GH|7|$8|-4|A|@]|B|F0|D|-4|9|@]]|F|Q|H|1GI]|$0|1GJ|1|-4|2|K6|4|2Z|6|1GK|7|$8|-4|9|@$0|1GL|4|4Z]]|A|@]|B|K7|D|-4|E|-1]|F|2Y|H|1GM]|$0|1GN|1|-4|2|K8|4|IM|6|1GO|7|$8|-4|A|@]|B|K7|D|-4|9|@]]|F|17|H|1GP]|$0|1GQ|1|-4|2|K9|4|C9|6|1GR|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|1GS]|$0|1GT|1|-4|2|KA|4|96|6|1GU|7|$8|-4|A|@]|B|P|D|-4|E|-2|9|@]]|F|11|H|1GV]|$0|1GW|1|-4|2|KB|4|KC|6|1GX|7|$8|-4|A|@]|B|KD|D|-4|9|@]]|F|10|H|1GY]|$0|1GZ|1|-4|2|KE|4|KF|6|1H0|7|$8|-4|9|@$4|10|0|1H1]]|A|@]|B|P|D|-4|E|-2]|F|10|H|1H2]|$0|1H3|1|-4|2|KG|4|EU|6|1H4|7|$8|-4|A|@]|B|C|D|-4|9|@]]|F|61|H|1H5]|$0|1H6|1|-4|2|KH|4|CA|6|1H7|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|1H8]|$0|1H9|1|-4|2|KI|4|H1|6|1HA|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|12|H|1HB]|$0|1HC|1|-4|2|KJ|4|CB|6|1HD|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|1HE]|$0|1HF|1|-4|2|KK|4|JO|6|1HG|7|$8|KL|A|@]|B|6U|D|-4|9|@]]|F|19|H|1HH]|$0|1HI|1|-4|2|KM|4|CC|6|1HJ|7|$8|-4|A|@]|B|27|D|-4|9|@]]|F|Q|H|1HK]|$0|1HL|1|-4|2|KN|4|CD|6|1HM|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|Q|H|1HN]|$0|1HO|1|-4|2|KO|4|CE|6|1HP|7|$8|-4|A|@]|B|FJ|D|-4|9|@]]|F|Q|H|1HQ]|$0|1HR|1|-4|2|KP|4|JP|6|1HS|7|$8|KP|A|@AM|H4]|B|KQ|D|-4|9|@]]|F|19|H|1HT]|$0|1HU|1|-4|2|KR|4|IN|6|1HV|7|$8|-4|A|@]|B|FJ|D|-4|9|@]]|F|17|H|1HW]|$0|1HX|1|KS|2|KT|4|10|6|1HY|7|$8|34|9|@$0|1HZ|4|1Q]|$0|1I0|4|1V]|$0|1I1|4|EZ]|$0|1I2|4|FX]|$0|1I3|4|2U]|$0|1I4|4|HS]|$0|1I5|4|JK]|$0|1I6|4|KC]|$0|1I7|4|KF]|$0|1I8|4|G1]]|A|@2L|KU|1I|2E|KV|KW|KX|KY|KZ|9A|7D|1C|IB|L0|1F|H4|H3|L1|L2|1E|L3|L4]|B|L5|D|L6|E|-2|M|-2]|F|Y|H|1I9]|$0|1IA|1|-4|2|L7|4|G0|6|1IB|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2U|H|1IC]|$0|1ID|1|-4|2|L8|4|G|6|1IE|7|$8|L9|9|@$0|1IF|4|5]|$0|1IG|4|3T]|$0|1IH|4|5T]|$0|1II|4|EI]|$0|1IJ|4|FG]|$0|1IK|4|FI]|$0|1IL|4|I4]|$0|1IM|4|J4]|$0|1IN|4|6H]]|A|@]|B|4J|D|-4|E|-2|M|-2]|F|Y|H|1IO]|$0|1IP|1|-4|2|LA|4|97|6|1IQ|7|$8|-4|A|@]|B|1W|D|-4|9|@]]|F|11|H|1IR]|$0|1IS|1|-4|2|LB|4|98|6|1IT|7|$8|-4|A|@]|B|22|D|-4|9|@]]|F|11|H|1IU]|$0|1IV|1|-4|2|LC|4|CF|6|1IW|7|$8|-4|A|@]|B|1T|D|-4|E|-2|9|@]|M|-2]|F|Q|H|1IX]|$0|1IY|1|-4|2|LD|4|G9|6|1IZ|7|$8|-4|A|@]|B|P|D|-4|9|@]]|F|2V|H|1J0]|$0|1J1|1|-4|2|LE|4|6H|6|1J2|7|$8|-4|A|@]|B|43|D|-4|9|@]]|F|G|H|1J3]|$0|1J4|1|-4|2|LF|4|G1|6|1J5|7|$8|-4|9|@]|A|@]|B|LG|D|-4]|F|10|H|1J6]]";

/***/ }),

/***/ "./node_modules/vibemap-constants/dist/cities.json":
/*!*********************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/cities.json ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"id":57206,"slug":"tampa","type":"early","location":{"latitude":27.950575,"longitude":-82.4571776},"centerpoint":[-82.4571776,27.950575],"mailchimp_id":"","radius":10,"name":"Tampa"},{"id":56490,"slug":"berkeley","type":"official","location":{"latitude":37.8715226,"longitude":-122.273042},"centerpoint":[-122.273042,37.8715226],"mailchimp_id":"","radius":12,"name":"Berkeley"},{"id":56488,"slug":"alameda","type":"early","location":{"latitude":37.7798721,"longitude":-122.2821855},"centerpoint":[-122.2821855,37.7798721],"mailchimp_id":"","radius":12,"name":"Alameda"},{"id":55524,"slug":"san-jose","type":"early","location":{"latitude":37.33874,"longitude":-121.8852525},"centerpoint":[-121.8852525,37.33874],"mailchimp_id":"ef90288b3c","radius":15,"name":"San Jose"},{"id":55522,"slug":"dallas","type":"early","location":{"latitude":32.7766642,"longitude":-96.79698789999999},"centerpoint":[-96.79698789999999,32.7766642],"mailchimp_id":"f0de27e219","radius":10,"name":"Dallas"},{"id":55517,"slug":"norfolk","type":"early","location":{"latitude":36.8507689,"longitude":-76.28587259999999},"centerpoint":[-76.28587259999999,36.8507689],"mailchimp_id":"","radius":10,"name":"Norfolk"},{"id":53994,"slug":"ciudad-de-mexico","type":"early","location":{"latitude":19.4326077,"longitude":-99.133208},"centerpoint":[-99.133208,19.4326077],"mailchimp_id":"518242369a","radius":15,"name":"Mexico City"},{"id":52306,"slug":"peoria","type":"early","location":{"latitude":40.6936488,"longitude":-89.5889864},"centerpoint":[-89.5889864,40.6936488],"mailchimp_id":"58578fcae6","radius":10,"name":"Peoria"},{"id":51835,"slug":"toronto","type":"official","location":{"latitude":43.653226,"longitude":-79.3831843},"centerpoint":[-79.3831843,43.653226],"mailchimp_id":"95135b1969","radius":20,"name":"Toronto"},{"id":45678,"slug":"houston","type":"official","location":{"latitude":29.760314934412516,"longitude":-95.36962040978698},"centerpoint":[-95.36962040978698,29.760314934412516],"mailchimp_id":"ea2fe099f2","radius":30,"name":"Houston"},{"id":44901,"slug":"puerto-vallarta","type":"early","location":{"latitude":20.615046993637947,"longitude":-105.231817181398},"centerpoint":[-105.231817181398,20.615046993637947],"mailchimp_id":"57c905a1df","radius":4,"name":"Puerto Vallarta"},{"id":38387,"slug":"austin","type":"early","location":{"latitude":30.267153,"longitude":-97.7430608},"centerpoint":[-97.7430608,30.267153],"mailchimp_id":"1d933c234f","radius":20,"name":"Austin"},{"id":38380,"slug":"denver","type":"official","location":{"latitude":39.7392358,"longitude":-104.990251},"centerpoint":[-104.990251,39.7392358],"mailchimp_id":"b576abf895","radius":20,"name":"Denver"},{"id":38148,"slug":"chicago","type":"official","location":{"latitude":41.8781136,"longitude":-87.6297982},"centerpoint":[-87.6297982,41.8781136],"mailchimp_id":"b865b3ef72","radius":20,"name":"Chicago"},{"id":38143,"slug":"new-york","type":"official","location":{"latitude":40.7127610684055,"longitude":-74.0060103509262},"centerpoint":[-74.0060103509262,40.7127610684055],"mailchimp_id":"56ebd9923f","radius":20,"name":"New York"},{"id":38137,"slug":"san-diego","type":"official","location":{"latitude":32.715738,"longitude":-117.1610838},"centerpoint":[-117.1610838,32.715738],"mailchimp_id":"7fb6e2a465","radius":20,"name":"San Diego"},{"id":38119,"slug":"los-angeles","type":"official","location":{"latitude":34.04734503476973,"longitude":-118.25308336038819},"centerpoint":[-118.25308336038819,34.04734503476973],"mailchimp_id":"7fb6e2a465","radius":30,"name":"Los Angeles"},{"id":1450,"slug":"guadalajara","type":"official","location":{"latitude":20.65969879999999,"longitude":-103.3496092},"centerpoint":[-103.3496092,20.65969879999999],"mailchimp_id":"0154de5655","radius":10,"name":"Guadalajara"},{"id":1447,"slug":"oakland","type":"official","location":{"latitude":37.79831556913852,"longitude":-122.25940509567872},"centerpoint":[-122.25940509567872,37.79831556913852],"mailchimp_id":"da0894a0e6","radius":20,"name":"Oakland"},{"id":1444,"slug":"san-francisco","type":"official","location":{"latitude":37.7749295,"longitude":-122.4194155},"centerpoint":[-122.4194155,37.7749295],"mailchimp_id":"f30df08e52","radius":5,"name":"San Francisco"},{"id":1441,"slug":"portland","type":"official","location":{"latitude":45.52342768785231,"longitude":-122.67428398132324},"centerpoint":[-122.67428398132324,45.52342768785231],"mailchimp_id":"27c0467a17","radius":9,"name":"Portland"},{"id":1438,"slug":"seattle","type":"official","location":{"latitude":47.6062095,"longitude":-122.3320708},"centerpoint":[-122.3320708,47.6062095],"mailchimp_id":"baadb78d87","radius":8,"name":"Seattle"},{"id":1435,"slug":"vancouver","type":"official","location":{"latitude":49.2827291,"longitude":-123.1207375},"centerpoint":[-123.1207375,49.2827291],"mailchimp_id":"da30e0d7dc","radius":7,"name":"Vancouver"}]');

/***/ }),

/***/ "./node_modules/vibemap-constants/dist/postCategories.json":
/*!*****************************************************************!*\
  !*** ./node_modules/vibemap-constants/dist/postCategories.json ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"id":15095,"count":1,"description":"","link":"https://vibemap.com/features/category/company-blog/","name":"Company Blog","slug":"company-blog","parent":0,"acf":[]},{"id":5,"count":370,"description":"","link":"https://vibemap.com/features/category/guides/","name":"Guides","slug":"guides","parent":0,"acf":[]},{"id":985,"count":76,"description":"","link":"https://vibemap.com/features/category/neighborhood/","name":"Neighborhood","slug":"neighborhood","parent":0,"acf":[]},{"id":6,"count":10,"description":"","link":"https://vibemap.com/features/category/profiles/","name":"Profiles","slug":"profiles","parent":0,"acf":[]},{"id":21,"count":32,"description":"","link":"https://vibemap.com/features/category/recommendations/","name":"Recommendations","slug":"recommendations","parent":0,"acf":[]},{"id":9,"count":13,"description":"","link":"https://vibemap.com/features/category/stories/","name":"Stories","slug":"stories","parent":0,"acf":[]},{"id":1,"count":0,"description":"","link":"https://vibemap.com/features/category/uncategorized/","name":"Uncategorized","slug":"uncategorized","parent":0,"acf":[]},{"id":6831,"count":60,"description":"","link":"https://vibemap.com/features/category/list/","name":"Vibe Guide","slug":"list","parent":0,"acf":[]}]');

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
module.exports = "description|Arousing+amusement+in+the+silly+and+illogical|name|Absurd|slug|absurd|details|categories|vibeset|vibes|crazy|unexpected|outrageous|silly|weird|strange|funny|eccentric|whimsical|search_term|msv|affirmations|Not+everything+has+to+make+sense|Embrace+the+unknown|Academic|academic|bookish|nerdy|literary|educational|cultural|civic|Accessible|accessible|inclusive|affordable|open|participatory|helpful|Action|action|adventurous|wild|extreme|adrenaline|healthy|supportive|energetic|enthusiastic|busy|Engaging+and+energetic+pursuits|Active|active|outdoors|fitness|exercise|workout|wellness|Take+a+step+forward|A+simple+is+positive+movement|Bringing+about+positive+change|Activist|activist|term_id|Community|community|term_group|term_taxonomy_id|taxonomy|activity|Explore+ways+to+get+involved+in+your+local+community.+Support+local+businesses,+volunteer,+give+back,+or+pay+it+forward+with+these+community+groups+and+hubs+of+local+culture.+|parent|count|filter|raw|solidarity|vegan|radical|hippie|feminist|volunteer|justice|Fairness+and+justice+are+a+jam|Challenging+the+status+quo|Showing+up+for+a+fair,+kind,+joyous+world|+What+new+solutions+can+you+bring+about?|Adorable|adorable|cute|sweet|Adrenaline|Willingness+to+try+new+things|Adventurous|scenic|eclectic|aquatic|sporty|lively|rebel|hiking|bold|carefree|courageous|inventive|outdoorsy|playful|passionate|wanderlust|imaginative|recess|Everyday+can+be+full+of+excitement|Picture+new+possibilities|Always+keep+those+tricks+up+your+sleeves|Aesthetic|aesthetic|artsy|chic|cinematic|decorative|design|elegant|luxe|minimalist|fancy|stylish|bright|fashion|Affordable|cheap|After+Party|after-party|dark|party|buzzing|After+Work|after-work|fun|boozy|chill|Afternoon|afternoon|sunny|relaxing|lazy|weekend|summer|lunch|Spacious,+light-filled+bliss|Airy|airy|patio|fresh|dreamy|earthy|breezy|serene|lush|pastel|crisp|mellow|soothing|beautiful|seductive|oasis|tranquil|wistful|angelic|Take+a+deep+breath+of+light+air|Aloha|aloha|happy|welcoming|kindness|namaste|tiki|love|surf|ocean|tropical|floral|paradise|beach|Open+to+other+possibilities|Alternative|alternative|indie|boho|revolutionary|There+are+few+deadends|Unexpected+wonder\n|Amazing|amazing|cool|fantastic|exciting|interesting|magical|delightful|memorable|sublime|inspired|Americana|americana|traditional|classic|kitschy|retro|nostalgic|Throw+it+back+to+the+old+school+ways|Analog|analog|oldschool|handmade|throwback|deepcut|hifi|legacy|Take+it+back+to+another+time|Angelic|soulful|blissful|joyful|sensual|sparkly|blessed|enchanted|gentle|sexy|empath|Animals|animals|Outdoors|0|Cute|vibe|Endearing+and+youthful|2|Cats|cats|3|Children|children|Young+and+innocent|4|Wild|Natural+and+uninhibited|Anime|anime|dress-up|sci-fi|cosplay|geeky|Nostalgic+collectables|Antique|antique|Shopping|shop|vintage|collectable|cottage|art|historic|homemade|heritage|Add+to+your+collection|Under+the+sea|Aquatic|colorful|nautical|mermaid|scuba|waterfront|coastal|+Be+at+peace+amongst+the+water|Architecture|architecture|creative|iconic|popularity_in_django|Arctic|arctic|cold|snowy|frosty|wintry|Human+creativity|Art|street-art|interactive|dance|experiential|Imagine+the+world+around+you+as+a+painting|Art-Deco|art-deco|Handmade+and+traditional+crafts|Artisanal|artisanal|foodie|organic|craft|rustic|gourmet|nosh|Appreciate+the+care+put+into+things|Surrounded+and+made+from+art|Artsy|hipster|funky|trendy|groovy|edgy|quirky|highbrow|deluxe|glam|beatnik|fashionista|Imagine+the+world+around+you+as+a+painting|Listening+to+that+creative+energy|The+art+of+living+with+others|Listen+to+your+creative+energy+today|Atmosphere|atmosphere|fairytale|harmonious|Original,+genuine,+and+true|Authentic|authentic|family|unique|wholesome|Being+yourself+is+attractive|Looking+at+the+world+through+through+fresh+eyes|Make+a+new+ritual+that+speaks+to+your+truest+self|An+open+understanding|Aware|aware|mindful|curious|grateful|optimistic|proud|Elevate+your+knowledge|Badass|badass|punk|dope|Bagel|bagel|kosher|coffee|granola|Balanced|balanced|zen|calm|Beach|warm|vacation|picnic|tourist|sunset|getaway|staycation|Beatnik|rock|jazzy|laidback|trippy|grunge|psychedelic|disco|Pleasing+to+the+senses|Beautiful|classy|vibrant|Beauty+is+everywhere|A+place+that+invites+and+feels+right|Belonging|belonging|friendly|trust|+Find+a+home+away+from+home|You+belong+here|Tune+into+the+vibration+around+you|Of+great+size+or+intensity|Big|big|vast|There+is+always+more|Human-powered+movement|Biking|biking|urban|park|Experience+the+freedom+of+cruising|Bizarre|bizarre|Blessed|generous|comforting|Complete+joy|Blissful|Bliss+is+near|Complete+joy|Lacking+the+need+to+confirm+to+society|Boho|You+do+you|Strong+and+vivid|Bold|visionary|dramatic|Build+in+confidence|Boogie|boogie|Enjoyment+of+stories+and+learning|Bookish|moody|+A+good+book+can+take+you+anywhere|Intoxicating+experiences|Boozy|social|hangover|drinks|tipsy|rowdy|drinking|raunchy|Let+loose+and+celebrate+anything|Natural+green+and+goodness|Botanical|botanical|mystic|garden|natural|plant|restorative|jungle|Sprout+roots+and+grow|Boujee|boujee|upscale|Boutique|boutique|luxury|pampering|posh|opulent|Breezy|Bright|lit|glitter|neon|Bubbly+late+breakfast+with+friends|Brunch|brunch|tasty|savory|snacky|hearty|delicious|diner|Bubblegum|bubblegum|pretty|Bussin|bussin|Full+of+activity|Busy|crowded|festive|Let+loose+and+celebrate+anything|Humming+feelings+or+sounds|Buzzing|popular|trending|popping|red-hot|loud|Gotta+have+the+funk|Feel+the+good+vibrations|Caffeine|caffeine|California|california|seasonal|Undisturbed+and+unshakable|Calm|peaceful|quiet|quiet-energy|Embrace+stillness|Into+the+wild|Camp|camp|rugged|ranch|Exaggerated+and+amusing+humor|Campy|campy|original|sassy|Take+it+over+the+top|Candlelit|candlelit|romantic|datespot|intimate|Cannabis|cannabis|smokey|No+worries|Carefree|casual|Let+it+all+go|Caribbean|caribbean|Relaxed+and+easy|Casual|comfy|+Go+with+the+flow|Enjoying+something+special|Celebratory|celebratory|special|Applaud+the+people+growing+alongside+you|There+are+many+causes+to+celebrate|Express+love+to+your+road+dogs|Celebrity|celebrity|exclusive|hollywood|shopaholic|Centered|centered|Charming|charming|Almost+free|Cheap|free|simple|Free+as+in+freedom|Cheerful|cheerful|Chic|Young+and+innocent|kidcore|young|playtime|intergenerational|Remember+a+happy+place|Relaxed+in+a+way+you+want+to+be+around|Chill|Refused+to+be+rushed|Super+calm+vibes+are+in+your+future|Living+in+the+moment+is+part+of+being+chill|Christmas|christmas|yuletide|holiday|Dramatic+and+moving|Cinematic|musical|film|Imagine+the+score+to+your+adventure|City+Life|city-life|Being+a+part+of+the+city|Civic|local|positive|public|neighborhood|Community+=+a+force+far+greater+than+money|Show+up+in+every+way+you+can|Collectively-minded+is+a+cool+way+to+be|Outstanding+over+time|Classic|Rituals+bring+perspective|Timeless+outlasts+trends|Embrace+one+retro+activity+today|Classy|Clean|clean|Club|club|music|Clubhouse|clubhouse|Coastal|Coffee|Cold|Collaborative|collaborative|together|innovative|Lively,+expressive,+and+bright|Colorful|rainbow|Imagine+yourself+as+a+mural|Comforting|refreshing|Comfy|cozy|Your+people|multicultural|Support+those+around+you|Contemporary|contemporary|modern|Conversational|conversational|Cool|Cosplay|costume|futuristic|halloween|Costume|Cottage|cottagecore|Calm,+collected,+and+always+in+style|Cottagecore|country|Country|roadhouse|western|cowboy|rodeo|cowgirl|honky-tonk|Country+Club|country-club|country+club|Couple|couple|couples|Courageous|spirited|fierce|Cowboy|woodsy|lumberjack|Cowgirl|Warm,+snug,+and+loved|Cozy|+Wrap+yourself+in+something+fluffy|Made+with+care+and+skill|Craft|diy|folk|Crazy|laugh|Creative|entrepreneurial|dynamic|The+world+needs+your+creativity|Creative+energy+exists+in+all+aspects+of+your+life|Crisp|Crowded|Crunchy|crunchy|flavorful|Ideas+and+identities|Cultural|diverse|spiritual|Find+inspiration+in+a+group|Roam+through+new+teachings+today|Connect+to+a+place+and+its+story+today|Take+an+artsy+path+today|Eager+to+learn+and+explore|Curious|entertaining|mysterious|+Free+to+grow+and+roam|Learning+about+yourself+is+the+same+as+learning+about+the+world|Make+space+for+a+new+lesson+today|Endearing+and+youthful|Picture+your+favorite+animal+playing|Cutty|cutty|hidden-gem|hip-hop|Shakin'+&amp;+swayin|Dance|shimmy|singing|Move+with+the+beat+of+the+music|Dark|spooky|Date+Spot|Seek+out+your+person|Dating|dating|kinky|Seek+out+your+person|Decorative|If+you+know,+you+know|Deep+Cut|Appreciate+what+your+childhood+taught+you|Delicious|spicy|juicy|slurpy|sugary|Delightful|Deluxe|Desert|desert|Design|Diner|Disco|Discover|discover|explore|wander|Dive|dive|old|A+variety+of+it+all|Diverse|We+are+in+this+together|Do-It-Yourself|DIY|eco|recyled|Make+use+of+what+you+have+in+abundance|Dogs|dogs|Anything+good|Dope|Dramatic|Magical+or+otherworldly|Dreamy|Picture+yourself+anywhere+you+like|Each+moment+is+new|Dress-up|Tasty+beverages+with+friends|Drinking|nightlife|latenight|+Give+a+toast+to+absent+friends|Take+some+downtime+today|Keep+a+full+bottle+of+water+with+you+today|Drinks|All+the+swagger|Drip|drip|Always+be+yourself|Constantly+changing+and+evolving|Dynamic|transformative|Try+shifting+your+mindset+today|Stay+open+to+new+ideas+today|Earthy|sustainable|green|Eccentric|Diverse+styles+and+tastes|Eclectic|Living+life+in+full|Discover+your+next+favorite+thing|Picture+new+possibilities|From+earth+and+good+for+earth|Eco|thrift|Edgy|Educational|Eerie|eerie|gothic|supernatural|haunted|Refined+style+and+taste|Elegant|elevated|You+deserve+a+slide+of+goodness|Positivity+and+respect|Elevated|refined|Emo|emo|emotional|All+the+feelings|Emotional|intense|Empath|Enchanted|Full+of+vitality+and+possibility|Energetic|A+positive+attitude+boosts+your+energy|The+world+needs+your+energy+today|Entertaining|Enthusiastic|Entrepreneurial|Epic|epic|legendary|Euro|euro|french|parisian|Evergreen|evergreen|forest|Beyond+stoked|Exciting|It’s+time+for+one+new+daily+ritual!|Stay+open+to+deeper+connections+today.|The+world+needs+your+enthusiasm.+Get+out+there.|Exclusive|vip|Exercise|selfcare|Experiential|Experimental|experimental|fusion|Take+a+new+path|Explore|Extreme|Fairytale|utopian|Together+with+those+you+love|Family|Taking+time+to+show+the+genes+some+love|Pouring+good+love+into+my+people|Take+time+to+enjoy+your+people|family+friendly|family-friendly|Famous|famous|favorite|Fancy|Fantastic|Fantasy|fantasy|Farout|farout|Fashion|All+about+the+glam|Fashionista|treatyourself|Fast|fast|Favorite|Feminist|queer|subversive|Femme|femme|Cheerful+and+colorful+gathering|Festive|Be+the+life+of+the+party|Fierce|Film|novel|Fitness|Flapper|flapper|prohibition|speakeasy|Flavorful|Flex|flex|Flirty|flirty|Floral|Focused|forcused|work|productive|hardworking|study|Traditions+of+everyday+people|Folk|Music|Make+time+to+look+at+the+Moon|Honor+the+wisdom+traditions|Food+is+life|Foodie|vegetarian|Forest|At+no+cost|Free|French|Nice,+new,+and+refreshing|Fresh|new|Savor+something+crisp,+sweet+and+made+from+light|Kind+and+inviting|Friendly|Open+the+door+to+friendship|Frosty|Fruity|fruity|Enjoyment+and+laughter|Fun|Plan+a+playdate|Funky|Comedic+relief|Funny|spontaneous|Remember+to+laugh|Laughter+is+essential+to+survival|Truth+comes+through+laughter|Fusion|Futuristic|Games|games|Growth+of+fruits+and+flowers|Garden|Admire+new+growth+in+something+old|Gay|gay|lgbtq|Profound+Enthusiasm|Geeky|Belonging+is+a+club+for+us+all|Abundance+of+giving|Generous|Pay+something+forward|Gentle|Getaway|Beautiful+beyond+compare|Glam|Your+light+is+strong|Glitter|Global|global|international|Goofy|goofy|Gothic|Gourmet|Granola|Grateful|Greek|greek|Green|Grimy|grimy|underground|Groovy|Grunge|Halloween|paranormal|pumpkin|Handmade|Hangover|Hanukkah|hanukkah|Happy|Happy+Hour|happy-hour|Hardworking|Positive+balance|Harmonious|Haunted|witchy|Healing|healing|rejuvenating|All+about+what+is+good+for+you|Healthy|Make+your+self+care+a+priority|Take+care+of+yourself|Hearty|Helpful|Heritage|old-world|All+about+that+high+quality|Hi+Fi|You+deserve+the+best|Amazing+but+not+widely+known|Hidden+Gem|secret|Highbrow|Walking+around+in+nature|Hiking|walk|Hip|hip|Hip+Hop|Chill+out|Hippie|Dance+to+the+beat+of+your+own+drum|Hipster|Places+of+importance|Historic|Cross+paths+with+so+many+who+came+before|Holiday|Holistic|holistic|perspective|Hollywood|Homemade|Honky-tonk|Hot|hot|Hustle|hustle|+Cozy+&amp;+Comfortable|Hygge|hygge|Hyphy|hyphy|Iconic|landmark|Imaginative|Immaculate|immaculate|impeccable|Impeccable|In+Solidarity|in-solidarity|Common+good|In-solidarity|+Goodness+in+groups+multiplies|Envision+a+new+way+of+being|Collectively-minded+is+a+cool+way+to+be|Open+to+everyone|Inclusive|Who’s+missing?+Work+on+acknowledgement+and+awareness+today|Finding+common+ground+takes+a+good+heart|Be+especially+open+to+the+beauty+of+others+today|Independent+and+original|Indie|Industrial|industrial|Influencial|influencial|Innovative|Brilliant+and+life+affirming|Inspired|Higher+places+are+calling|Your+inner+beauty+is+shining|Smiling+makes+the+brain+think+happy+thoughts|Intense|Interactive|Arousing+curiosity+and+feeling|Interesting|Intergenerational|International|Warmth+of+closeness|Intimate|small|Intimacy+flourishes+in+safe+spaces|Inventive|Inviting|inviting|Eye+catching+style|Jazzy|Feeling+great+pleasure+and+happiness|Joyful|Be+happy+with+yourself|Looking+for+joy+is+a+pleasure+itself|Juicy|Jungle|Justice|Kidcore|Kindness|Kinky|Kitschy|The+oddest+things+can+bring+the+greatest+joys|Kosher|Laid-back|Landmark|Late+Night|Laugh|Lax|lax|Lazy|Legacy|Legendary|Legit|legit|LGBTQ|Liberating|liberating|It's+happening|Lit|Find+yourself+amongst+the+crowds|Literary|Full+of+energy+and+activity|Lively|+Enjoy+the+sound+of+indistinct+chatter|Stay+open+to+having+a+wild+experience+today|Belonging+to+a+nearby+area+and+community|Local|Actively+supporting+my+network|Making+time+for+mutual+growth|Spread+that+local+love+today|See+some+local+history+today|It's+turned+up|Loud|Let+your+voice+be+heard|Profound+affection+for+yourself+and+others|Love|The+magnificent+opportunities+of+an+open+heart|Valuing+the+unions+in+our+life|A+healthy+dose+of+acceptance+helps|Lovely|lovely|Low-Key|low-key|Lumberjack|Lunch|Food|food|Eat+and+explore+culinary+culture.+Whether+your+vibe+is+a+lively+brunch,+a+friendly+lunch,+a+chill+breakfast,+or+an+intimate+dinner,+we've+got+you+covered+with+the+best+restaurants+and+other+places+to+eat,+including+outdoor+patios,+rooftop+bars,+and+markets.+You+can+also+discover+by+taste,+like+savory,+sweet,+and+spicy.|Lush|Oh+so+fancy|Luxe|You+define+your+beauty|So+glamourous|Luxury|You+define+your+beauty|Beyond+the+ordinary|Magical|Life+bringing+surprises+&+triumphs|There+is+magic+in+showing+up|Find+inspiration+is+somewhere+unexpected|Mellow|Memorable|From+the+land+to+the+sea|Mermaid|Be+authentically+yourself|Messy|messy|Mid-century|mid-century|Aware+of+the+present|Mindful|Dig.+Deep.+Down.|Envision+a+new+way+of+being|Turning+your+gaze+toward+yourself|Mingle|mingle|Simple+and+good+use+of+effort|Minimalist|Freeing+up+mental+space+for+new+opportunities|Modern|sophisticated|A+sudden+burst+of+a+mood|Moody|Be+flexible+as+your+personality+evolves|Stay+tuned+in+with+your+feelings|Morning|morning|Mountain|mountain|Multicultural|Sounds+of+feeling+and+harmony|Musical|Curating+a+joyful+playfist|Music+is+like+mother’s+medicine|Slow+down+with+a+slow+jam+today|Must-See|must-see|Mysterious|Holding+onto+that+spiritual+magic|Mystic|Your+hold+your+own+power|Namaste|yoga|Of+the+earth|Natural|Be+one+with+the+land|Be+part+of+the+natural+world|Of+the+sea|Nautical|Neighborhood|All+the+bright+lights|Neon|Shine+your+brightest|Nerdy|New|New+Wave|new-wave|Nightlife|Snack+on|Nosh|Remembrance+of+the+past|Nostalgic|Recreate+some+aspect+of+local+history|A+nostalgic+experience+is+in+your+future|Novel|Like+finding+water+in+the+desert|Oasis|Ocean|Old|Respect+for+the+coolness+of+earlier+eras|Old+School|Remember+to+keep+it+evergreen|Recreate+some+aspect+of+local+history|Old+World|Open|Optimistic|Opulent|Oregon|oregon|Organic|Eat+and+explore+culinary+culture.+Whether+your+vibe+is+a+lively+brunch,+a+friendly+lunch,+a+chill+breakfast,+or+an+intimate+dinner,+we've+got+you+covered+with+the+best+restaurants+and+other+places+to+eat,+including+outdoor+patios,+rooftop+bars,+and+markets.+You+can+also+discover+by+taste,+like+savory,+sweet,+and+spicy.|Original|Outside+in+open+air|Nurturing+the+soul+through+nature|Being+one+with+the+sun,+the+stars,+the+elements|Beinging+one+with+the+land|Outdoorsy|views|Nurturing+the+soul+through+nature|Explore+the+sun,+the+stars,+the+elements+and+yourself|Being+one+with+the+sun,+the+stars,+the+elements|Outgoing|outgoing|Outrageous|Pampering|A+wide+beautiful+view|Panoramic|panoramic|photo|skyline|Paradise|Paranormal|Everyday,+effortless+chic|Parisian|The+outdoor+spaces+we+all+share|Park|+Enjoy+a+break+and+people+watch|Participatory|Party|Deeply+caring+for+something|Passionate|Lean+in+to+what+you+care+about|+Dreamy+and+calm|Pastel|Relaxation+shared+outdoors|Patio|+Enjoy+a+break+and+people+watch|Patriotic|patriotic|Tranquil+and+undisturbed|Peaceful|Finding+room+to+breathe|A+slice+of+something+soothing+and+lush|Pools+of+peace+can+be+found+within|Perspective|Photo|Photogenic|photogenic|picturesque|Afternoon+in+the+park|Picnic|Seeing+an+old+view+a+new+way|Picturesque|Plant|Fun+and+games|Playful|Make+an+errand+a+game|Take+time+to+enjoy+pets+&+animals|Breathe+deeper|Playtime|It's+on+fire|Poppin'|It's+happening|Popular|Joy+multiplies+when+shared+widely|Do+one+activity+beloved+by+many|Ephemeral+experiences|Popup|popup|Posh|Good+vibes+only|Positive|Pass+along+good+vibes|Pretty|Priceless|priceless|Productive|Progressive|progressive|Prohibition|Deserved+power+and+pleasure|Proud|Speaking+truth+without+hesitation|Reclaiming+our+stories|Find+a+new+way+to+engage+in+civic+pride|Psychedelic|Public|Pumpkin|Punk|Queer|A+space+with+little+distraction|Quiet|safe|Being+comfortable+in+silence|Listen+for+that+divine+intelligence|Establish+a+calm+environment+today|Quiet+Energy|Quirky|On+the+edge+of+the+common|Radical|Bravely+go+out+into+the+world|Move+beyond+your+wildest+dreams|Rainbow|Ranch|Raunchy|Original+and+outside+the+box|Rebel|Learn+the+rules+and+bend+them|Recess|Recyled|reuse|Red-Hot|Refined|Refreshing|Rejuvenating|A+release+of+tension|Relaxing|+Doing+nothing+is+fine|Let+go|Renowned|renowned|Restorative|Styles+of+the+past|Retro|Honor+the+things+that+came+before|Give+respect+to+the+coolness+of+earlier+eras|Vintage+is+built+to+last+-+go+explore+why|Reuse|Revolutionary|Roadhouse|Rock|Rodeo|Grand+feelings,+especially+love|Romantic|+Nothing+nourishes+like+a+warm+embrace|There+is+more+love+awaiting|Love+is+there+even+when+not+easy+to+see|Rooftop|rooftop|Rowdy|Wild+&amp;+rough|Rugged|Rustic|Safe|Salty|salty|san+francisco+museums|san-francisco-museums|san+francisco+top+10+museums|san-francisco-top-10-museums|Sassy|Savory|Scary|scary|Impressive+and+beautiful+views|Scenic|Seeing+an+old+view+a+new+way|Sci-fi|Scuba|Seasonal|Secret|Seductive|Take+care+of+yourself|Self+Care|Invoking+the+senses|Sensual|A+warm+embrace+is+so+nourishing|There+is+more+love+ahead+|Serene|Sexy|Shakin'+&amp;+swayin'|Shimmy|turnedup|+Move+with+the+beat+of+the+music|Shop|Shop+till+you+drop|Shopaholic|Silly|Simple|Singing|Skate|skate|Skyline|Slurpy|Smackin'|smackin|yummy|Small|Smokey|Snacky|Snowy|Sober|sober|Get+together+with+good+energy|Social|Get+together+with+good+energy|Soothing|Sophisticated|Soulful|Sparkly|Speakeasy|Special|Spicy|Spirited|Spiritual|Go+with+the+flow|Spontaneous|Spooky|Sporty|Spring|spring|Staycation|Strange|Street+Art|Study|Stylish|Sublime|Subversive|Sugary|Summer|Full+of+warmth+and+light|Sunny|Sunshine+unites+all+life|Amazing+end+to+the+day|Sunset|Sunshine+unites+all+life|Supernatural|Supportive|Surf|Good+for+the+long+term|Sustainable|Sweet|Taco|taco|Tasty|Good+for+a+second+time|Thrift|Of+another+time|Throwback|Hold+your+memories+close|Tiki|Timeless|timeless|Tipsy|Closeness+and+shared+experiences|Togetherness|Belonging+is+a+club+for+us+all|Tokyo|tokyo|Top+vibes+on+Vibemap|Top|top|Tourist|Visit|visit|Visitors+guide+to+the+best+of+%25city%25.+Discover+culture,+history,+and+landmarks+while+having+a+fun,+memorable+time+sightseeing+and+exploring.+We've+collected+must+see+spots+and+favorite+for+tourist+and+locals+alike.+Plan+your+trip+or+weekend+getaway+and+book+these+attractions+for+free+or+at+a+discount.|Traditional|Tranquil|Transformative|Transit|transit|You+deserve+it|Treat+Yourself|Trending|Drop+into+something+new|Currents+of+taste|Trendy|Drop+into+something+new|Unexpectedly+different|Trippy|Look+for+the+unexpected|Warm+and+lush|Tropical|Find+your+life's+adventure|Trust|Volume+to+11|Turned+Up|You+are+the+life+of+the+party|Turnt|turnt|Ugly|ugly|If+you+know,+you+know|Underground|You+find+what+you+need+where+you+least+expect+it|Unexpected|Unique|Upbeat|upbeat|Upscale|Urban|Utopian|Vacation|Be+mine+&lt;3|Valentine|valentine|Vast|Conscious+eating+and+good+greens|Vegan|Eat+and+explore+culinary+culture.+Whether+your+vibe+is+a+lively+brunch,+a+friendly+lunch,+a+chill+breakfast,+or+an+intimate+dinner,+we've+got+you+covered+with+the+best+restaurants+and+other+places+to+eat,+including+outdoor+patios,+rooftop+bars,+and+markets.+You+can+also+discover+by+taste,+like+savory,+sweet,+and+spicy.|Vegetarian|Full+of+energy+and+life|Vibrant|Your+presence+helps+make+vibrancy|Feel+the+pulse+of+life|Pleasing+landscapes+or+environments|Views|Be+present+and+look+beyond|In+and+of+the+past|Vintage|Honor+things+that+came+before|VIP|Visionary|Vivacious|vivacious|Helping+other+and+giving+back|Volunteer|Explore+ways+to+get+involved+in+your+local+community.+Support+local+businesses,+volunteer,+give+back,+or+pay+it+forward+with+these+community+groups+and+hubs+of+local+culture.+|Joining+forces+creates+abundance|Service+gives+perspective|Small+acts+can+be+mighty|Walk|Wander|Wanderlust|Warm|Waterfront|Weekend|Weird|Welcoming|Wellness|Wes+Anderson|wes-anderson|Western|Carefree+and+playful+amusement|Whimsical|Have+fun+for+fun's+sake|Welcome+free+expression|Wholesome|Natural+and+uninhibited|Nature+shows+us+ways+of+being|Wintry|Wistful|In+possession+of+the+supernatural|Witchy|wizard|Your+magic+is+strong|Wizard|Woodsy|Work|Workout|Yoga|Young|Yuletide|Yummy|Zen^A|A|A|A|78|4UT|0|4UT|4UV|D|A|A|A|1JK|AU|1O|A|A|A|A|A|2S|B4|A|14|4W4|0|4W4|4UV|E|573|0|573|0|0|6NP|0|6NP|0|0|5A0|0|5A0|0|3|57F|0|57F|0|7|14|A|4V4|0|4V4|4UV|C|AU|4W4|0|4W4|4UV|E|14|5K|4UR|0|4UR|4VY|7|2S|K|4UR|0|4UR|4VY|7|B4|A|5K|K|A|A|A|B4|A|A|JG|A|A|2I|2I|A|A|A|32|5K|A|668|A|A|A|K|A|4Q|4W4|0|4W4|4UV|E|8C|A|A|A|A|5K|A|A|A|A|U|1JK|A|78|A|GO|14|A|14|3UW|U|A|A|A|5K|A|2I|A|A|2S|A|14|3C|A|A|A|2I|A|A|8C|1E|A|A|5K|8W|1O|5K|K|2I|A|5U|GO|A|8C|A|A|A|A|32|A|A|28|4G|2S|A|U|5K|K|A|K|A|A|1O|A|K|B4|A|2S|14|B4|A|5K|A|A|RS|A|A|A|A|K|14|14|A|A|A|A|A|5K|4UR|0|4UR|4VY|7|4W7|0|4W7|4UV|6|334|A|1JK|A|5K|1O|A|4MO|1JK|RS|2I|1O|A|A|A|A|A|A|U|A|A|A|1E|14|78|A|A|A|A|5K|1Y|50|18G|5K|2I|K|M8|K|A|28|K|A|K|A|A|A|K|3W|1Y|K|14|B4|14|A|A|1O|A|U|28|A|U|1O|A|28|K|5K|4MO|A|14|A|A|5K|4VV|0|4VV|4UV|T|A|A|28|1O|A|K|U|A|A|14|A|A|1E|2S|A|1O|A|3M|1Y|A|5K|5K|52I|0|52I|4UV|7|K|28|50|28|50|4VV|0|4VV|4UV|T|2S|8W|A|A|5K|A|A|4Q|A|DC|A|32|A|U|A|B4|A|78|14|K|AU|A|A|A|A|14|A|U|A|K|A|14|A|A|A|A|4Q|6O|K|A|B4|A|U|A|A|K|AK|A|A|B4|A|A|A|A|A|3W|1Y|A|A|K|A|A|A|14|A|A|2I|28|A|M8|3W|A|A|14|A|14|5K|28|1E0|A|28|2I|K|A|A|A|A|14|A|B4|4UY|0|4UY|4UV|F|U|A|3W|A|K|A|K|A|B4|A|B4|A|14|3W|A|B3|JG|4VV|0|4VV|4UV|T|5K|A|12W|104|8W|A|B4|4UT|0|4UT|4UV|D|A|A|78|8C|DC|1O|A|A|A|K|64|A|A|3W|A|A|A|78|A|A|2I^NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN^@$0|1|2|3|4|5|6|$7|-2|8|-2|9|@A|B|C|D|E|F|G|H|I]|J|-4|K|17A|L|@M|N]]]|$0|-4|2|O|4|P|6|$7|-2|8|-2|9|@Q|R|S|T|U|V]|J|-4|K|17B]]|$0|-4|2|W|4|X|6|$7|-2|8|-2|9|@Y|Z|10|11|12]|J|-4|K|17C]]|$0|-4|2|13|4|14|6|$9|@15|16|17|18|19|1A|1B|1C|1D]|7|-2|J|-4|L|-2|K|17D|8|-2]]|$0|1E|2|1F|4|1G|6|$7|-2|8|-2|9|@19|1H|15|1D|1B|1A|1C|1I|1J|1K|1L]|J|-4|K|17E|L|@1M|1N]]]|$0|1O|2|1P|4|1Q|6|$7|@$1R|17F|2|1S|4|1T|1U|17G|1V|17H|1W|1X|0|1Y|1Z|17I|20|17J|21|22]]|8|-2|9|@23|24|Y|1T|V|25|26|27|28|29]|J|-4|K|17K|L|@2A|2B|2C|2D]]]|$0|-4|2|2E|4|2F|6|$9|@2G|2H]|7|-2|J|-4|L|-2|K|17L|8|-2]]|$0|-4|2|2I|4|18|6|$9|@15|16|17|14]|7|-2|J|-4|L|-2|K|17M|8|-2]]|$0|2J|2|2K|4|15|6|$7|-2|8|-2|9|@2L|2M|2N|2O|2P|2Q|2R|16|2S|2T|2U|1B|2V|2W|2X|2Y|2Z|30|31]|J|-4|K|17N|L|@32|33|34]]]|$0|-4|2|35|4|36|6|$7|-2|8|-2|9|@37|38|39|3A|3B|3C|3D|3E|3F|I|3G|3H|3I]|J|-4|K|17O]]|$0|-4|2|3J|4|Z|6|$7|-2|8|-2|9|@3K|X|Y]|J|-4|K|17P]]|$0|-4|2|3L|4|3M|6|$9|@3N|16|3O|3P]|7|-2|J|3O|K|17Q|8|-2]]|$0|-4|2|3Q|4|3R|6|$9|@3O|3S|3T|3U]|7|-2|J|-4|L|-2|K|17R|8|-2]]|$0|-4|2|3V|4|3W|6|$7|-2|8|-2|9|@3X|3Y|3Z|40|41|42]|J|-4|K|17S]]|$0|43|2|44|4|45|6|$7|-2|8|-2|9|@46|47|3H|48|3C|3E|49|4A|4B|4C|4D|I|4E|4F|38|4G|3G|4H|3D|4I|4J|4K|4L|4M]|J|-4|K|17T|L|@4N]]]|$0|-4|2|4O|4|4P|6|$9|@4Q|4R|4S|4T|4U|4V|4W|23|4X|4Y|4Z|50|51]|K|17U]]|$0|52|2|53|4|54|6|$7|-2|8|-2|9|@55|2Q|56|30|25|57]|J|-4|K|17V|L|@58]]]|$0|59|2|5A|4|5B|6|$7|-2|8|-2|9|@5C|5D|5E|4H|5F|5G|A|5H|5I|5J|5K]|J|-4|K|17W]]|$0|-4|2|5L|4|5M|6|$9|@5N|5O|5P|5Q|5R]|7|-2|J|-4|K|17X|8|-2]]|$0|5S|2|5T|4|5U|6|$7|-2|8|-2|9|@3U|5V|5W|5Q|5X|5Y|5Z|5N|60|5R]|J|-4|K|17Y|L|@61]]]|$0|-4|2|62|4|4M|6|$9|@48|4H|63|2H|2G|45|64|65|4B|66|67|68|69|6A|6B|6C|4L|4I|4G]|K|1KO]]|$0|-4|2|6D|4|6E|6|$7|@$1R|17Z|2|6F|4|1H|1U|180|1V|181|1W|1X|0|-4|1Z|182|20|183|21|22]]|8|-2|9|$6G|$1R|184|2|6H|4|2G|1U|185|1V|186|1W|6I|0|6J|1Z|187|20|188|21|22]|6K|$1R|189|2|6L|4|6M|1U|18A|1V|18B|1W|6I|0|-4|1Z|18C|20|18D|21|22]|6N|$1R|18E|2|6O|4|6P|1U|18F|1V|18G|1W|6I|0|6Q|1Z|18H|20|18I|21|22]|6R|$1R|18J|2|6S|4|16|1U|18K|1V|18L|1W|6I|0|6T|1Z|18M|20|18N|21|22]]|J|-4|K|18O]]|$0|-4|2|6U|4|6V|6|$9|@R|6W|6X|6Y|6Z]|7|-2|J|-4|L|-2|K|18P|8|-2]]|$0|70|2|71|4|72|6|$7|@$1R|18Q|2|73|4|74|1U|18R|1V|18S|1W|1X|0|-4|1Z|18T|20|18U|21|22]]|8|-2|9|@5V|75|76|77|5R|5W|3A|78|2M|5P|5O|5Q|I|79|7A|7B]|J|-4|K|18V|L|@7C]]]|$0|7D|2|7E|4|2N|6|$7|@$1R|18W|2|6F|4|1H|1U|18X|1V|18Y|1W|1X|0|-4|1Z|18Z|20|190|21|22]]|8|-2|9|@7F|15|7G|7H|4X|4Y|7I|7J|7K|51|4W]|J|-4|K|191|L|@7L]]]|$0|-4|2|7M|4|7N|6|$9|@V|78|7O|7P]|7|-2|J|-4|L|-2|7Q|-4|K|192|8|-2]]|$0|-4|2|7R|4|7S|6|$9|@7T|7U|7V|7W|4X]|K|1KP]]|$0|7X|2|7Y|4|78|6|$7|@$1R|193|2|7Y|4|78|1U|194|1V|195|1W|1X|0|-4|1Z|196|20|197|21|22]]|8|-2|9|@7O|37|7Z|80|36|2M|81|3E|3A|I|3B|39|82]|J|-4|K|198|L|@83]]]|$0|-4|2|84|4|85|6|$9|@5Q|36]|K|1KQ]]|$0|86|2|87|4|88|6|$7|-2|8|-2|9|@5W|37|89|8A|8B|8C|8D|8E]|J|-4|K|199|L|@8F]]]|$0|8G|2|8H|4|37|6|$7|@$1R|19A|2|7Y|4|78|1U|19B|1V|19C|1W|1X|0|-4|1Z|19D|20|19E|21|22]]|8|-2|9|@7O|80|36|8I|8J|38|5P|2M|55|8K|8L|8M|8N|I|3E|8O|8P|78|85|8Q|8R|3G|39|88|30|3I|8S]|J|-4|K|19F|L|@8T|8U|8V|8W]]]|$0|-4|2|8X|4|8Y|6|$9|@36|4J|4B|4K|45|8Z|65|4F|90]|7|-2|J|8Y|K|19G|8|-2]]|$0|91|2|92|4|93|6|$7|-2|8|-2|9|@94|5W|2M|37|5N|95|5R|5Q|96|7B|75|5O|7A]|J|-4|K|19H|L|@97|98|99]]]|$0|9A|2|9B|4|9C|6|$7|-2|8|-2|9|@10|9D|9E|9F|4Q|1A|9G|9H|X]|J|-4|K|19I|L|@9I]]]|$0|-4|2|9J|4|9K|6|$9|@3S|15|16|6B|8L|9L|9M]|K|1KR]]|$0|-4|2|9N|4|9O|6|$9|@9P|9Q|9R|8E|8D]|K|1KS]]|$0|-4|2|9S|4|9T|6|$9|@3U|9U|9V|9D]|7|-2|J|-4|L|-2|K|19J|8|-2]]|$0|-4|2|9W|4|51|6|$9|@3U|2N|4Y|3Y|9X|7G|2T|7H|7K|4W|4X|7J|9Y|9Z|A0|A1|A2|50|7I|A3]|7|-2|J|-4|K|19K|8|-2]]|$0|-4|2|A4|4|8R|6|$9|@3U|48|5Q|37|Q|8J|A5|9L|56|2T|38|26|8I|A6|A7|A8|H|A9|8M|AA|AB|8L|55]|7|-2|J|8R|K|19L|8|-2]]|$0|AC|2|AD|4|4H|6|$K|19M|9|@48|78|AE|8Q|3H|5H|4C|3C|4B|5B|5D|2L|4K|4V|66|AF|3G|69|5J]|7|-2|J|-4|8|-2|L|@AG]]]|$0|AH|2|AI|4|AJ|6|$7|-2|8|-2|9|@AK|Y|1T|AL]|J|-4|K|19N|L|@AM|AN|AO]]]|$0|AP|2|AQ|4|AR|6|$7|-2|8|-2|9|@AS]|J|-4|K|19O|L|@AT]]]|$0|AU|2|AV|4|AW|6|$7|-2|8|-2|9|@3S|2L|19|1H|AX|1G|2W|AY|A3|1K|1J]|J|-4|K|19P|L|@AZ]]]|$0|-4|2|B0|4|B1|6|$9|@95|H|2M]|7|-2|J|-4|L|-2|K|19Q|8|-2]]|$0|-4|2|B2|4|68|6|$9|@9F|9H|4H|4Q|65|5B|5D|B3|4M|64|4S|B4]|K|1KT]]|$0|B5|2|B6|4|64|6|$7|-2|8|-2|9|@48|4H|5G|4Q|9U|3Y|2T|5H|90|65|4V|4F|4B|4G|5J|4K|4M|69|B4|4L|8Z]|J|-4|K|19R|L|@B7|B8]]]|$0|B9|2|BA|4|56|6|$7|-2|8|-2|9|@2M|5Q|37|55|54|8J|8K|5C|2T|38|49|8Q|26|8I|A6|A7|3D|3E|8M|8R|8L]|J|-4|K|19S|L|@BB]]]|$0|BC|2|BD|4|2S|6|$7|-2|8|-2|9|@AF|2U|25|BE|BF|30|8M|2V|15|7F|I]|J|-4|K|19T|L|@BG]]]|$0|-4|2|BH|4|BI|6|$9|@AB|8L|81|A6|A5]|7|-2|J|-4|L|-2|K|19U|8|-2]]|$0|BJ|2|BK|4|Q|6|$9|@P|R|S|H|8R|37|6C|A7|8N|8I|BL|56]|7|-2|J|-4|L|@BM]|K|19V|8|-2]]|$0|BN|2|BO|4|3T|6|$9|@3P|BP|BQ|3O|BR|3M|BS|BT|BU|BV|8R]|7|-2|J|-4|L|@BW]|K|19W|8|-2]]|$0|BX|2|BY|4|BZ|6|$K|19X|9|@4H|1H|4Z|2N|C0|4Y|47|C1|C2|C3|C4|36|4C|C5|48]|7|-2|J|-4|8|-2|L|@C6]]]|$0|-4|2|C7|4|C8|6|$9|@3F|C9]|K|1KU]]|$0|-4|2|CA|4|CB|6|$K|19Y|9|@37|4H|8K|C9|38|3D|8D|3I|8S|4Z|56|2M|CC|8Q|CD|3G|88|CE|CF|3C]]]|$0|-4|2|CG|4|4A|6|$9|@45|3X|4E|7W|A7|4F|2T|4B|4L]|K|1KV]]|$0|-4|2|CH|4|3H|6|$9|@7F|AF|4H|CI|3X|4E|67|CJ|CK]|7|-2|J|-4|K|19Z|8|-2]]|$0|CL|2|CM|4|CN|6|$K|1A0|9|@3S|CO|3T|3X|3W|42|CP|CQ|BR|CR|8E|CD|8D|CS|9Q|CT]|7|-2|J|-4|8|-2]]|$0|-4|2|CU|4|CV|6|$9|@7F|4D|CW|I]|7|-2|J|-4|L|-2|K|1A1|8|-2]]|$0|-4|2|CX|4|CY|6|$9|@CO|5D|8E|CS|89]|7|-2|J|-4|L|-2|K|1A2|8|-2]]|$0|CZ|2|D0|4|1D|6|$7|-2|8|-2|9|@3P|D1|D2|2P]|J|-4|K|1A3|L|@D3]]]|$0|D4|2|D5|4|3P|6|$9|@D6|D7|CI|2P|16|1B|3O|D8|D9|3M|DA|1C]|7|-2|J|-4|K|1A4|8|-2|L|@DB|DC]]]|$0|-4|2|DD|4|DE|6|$9|@3P|CI|16|D8|BR|BU|9Q|1B|BQ]|7|-2|J|-4|K|1A5|8|-2]]|$0|-4|2|DF|4|DG|6|$9|@4W|51|2W|26|DH]|K|1KW]]|$0|DI|2|DJ|4|9V|6|$7|-2|8|-2|9|@3U|DK|9U|4B|4K|DL|DM]|J|-4|K|1A6|L|@DN]]]|$0|DO|2|DP|4|DQ|6|$7|@$1R|1A7|2|6F|4|1H|1U|1A8|1V|1A9|1W|1X|0|-4|1Z|1AA|20|1AB|21|22]]|8|-2|9|@3U|15|2W|DR|41|9Z|DS|C5|AY|2R|50|8C|9Y|40]|J|-4|K|1AC]]|$0|DT|2|DU|4|DV|6|$7|-2|8|-2|9|@3S|G|E|DW|5P|5Q|DX|8M|BV|I|2X|8L|37]|J|-4|K|1AD|L|@DY]]]|$0|-4|2|DZ|4|E0|6|$7|-2|8|-2|9|@E1|3N|E2|E3|BL|4B|A1|3C|64]|J|-4|K|1AE]]|$0|-4|2|E4|4|E5|6|$7|-2|8|-2|9|@3U|19|E6|9M|AA|BZ|26]|J|-4|K|1AF]]|$0|E7|2|E8|4|2T|6|$7|-2|8|-2|9|@3U|3Y|9V|E9|2X|64|A7|65|48|4B|4L|4K]|J|-4|K|1AG|L|@EA]]]|$0|-4|2|EB|4|EC|6|$9|@4Y|3U]|K|1KX]]|$0|ED|2|EE|4|E9|6|$7|-2|8|-2|9|@3U|3Y|2T|EF|A7]|J|-4|K|1AH|L|@EG]]]|$0|-4|2|6L|4|6M|6|$9|@6E|2G]|7|-2|J|-4|L|-2|K|1AI|8|-2]]|$0|EH|2|EI|4|EJ|6|$9|@3S|94|AK|D2|2P|EK|65|5I|2X|4R]|7|-2|J|-4|K|1AJ|8|-2|L|@EL|EM|EN]]]|$0|-4|2|EO|4|EP|6|$9|@D6|C9|8K|EQ|3F|3I|8S|ER|3D|ES|CE|8O|CC]|7|-2|J|-4|K|1AK|8|-2]]|$0|-4|2|ET|4|EU|6|$9|@9T|DK]|7|-2|J|-4|L|-2|K|1AL|8|-2]]|$0|-4|2|EV|4|EW|6|$9|@2G|4V]|7|-2|J|-4|L|-2|K|1AM|8|-2]]|$0|EX|2|EY|4|3K|6|$K|1AN|9|@Y|EZ|Z|2T|E9|F0]|7|-2|J|-4|8|-2|L|@F1]]]|$0|-4|2|F2|4|F3|6|$9|@4Q|3X|9G]|7|-2|J|-4|L|-2|K|1AO|8|-2]]|$0|-4|2|F4|4|38|6|$7|-2|8|-2|9|@Y|5Q|37|C9|CB|8K|56|3C|8S|8Q|3D|CE|3I|3G|6B|8P|36|4H|CC]|J|-4|K|1AP]]|$0|F5|2|6O|4|6P|6|$7|-2|8|-2|9|@94|F6|F7|6E|F8|F9]|J|-4|K|1AQ|L|@FA]]]|$0|FB|2|FC|4|3U|6|$K|1AR|9|@3Y|64|E9|EF|A7|4G|4F|8Y|9V|45]|7|-2|J|-4|8|-2|L|@FD|FE|FF]]]|$0|-4|2|FG|4|FH|6|$7|-2|8|-2|9|@D2|EJ|7U|7V|7W|FI|FJ|9Y]|J|-4|K|1AS]]|$0|FK|2|FL|4|39|6|$9|@48|G|ER|FM|BF|3G|FN|A8|DV|55]|7|-2|J|-4|L|@FO]|K|1AT|8|-2]]|$0|-4|2|FP|4|FQ|6|@1KY]]|$0|FR|2|FS|4|V|6|$7|-2|8|-2|9|@23|AF|FT|1T|U|FU|1Q|28|BP|FV|FW]|J|-4|K|1AU|L|@FX|FY|FZ]]]|$0|G0|2|G1|4|5O|6|$K|1AV|9|@5V|D6|5Q|5N|5B|75|5X|5R]|7|-2|J|-4|8|-2|L|@G2|G3|G4]]]|$0|-4|2|G5|4|AE|6|$K|1AW|9|@C9|5H|8S|3F|3I|3G|3C|4H|38|8Q|3D|CF]]]|$0|-4|2|G6|4|G7|6|$9|@47|F0]|7|-2|J|-4|L|-2|7Q|-4|K|1AX|8|-2]]|$0|-4|2|G8|4|G9|6|$9|@81|DA|GA|D8|16]|7|-2|J|-4|L|-2|K|1AY|8|-2]]|$0|-4|2|GB|4|GC|6|$9|@3S|EQ]|7|-2|J|G9|K|1AZ|8|-2]]|$0|-4|2|GD|4|7K|6|$K|1B0|9|@2N|7G|4A|51|4X|7J|4Y|2L|A0|4W]|J|7K]]|$0|-4|2|GE|4|9Q|6|$9|@3P|2P|DE|BR]|7|-2|J|-4|K|1B1|8|-2]]|$0|-4|2|GF|4|7T|6|$K|1B2|9|@7U|7S|7V|7W|3U|4A]]]|$0|-4|2|GG|4|GH|6|$9|@7O|GI|80|11|GJ|82]|7|-2|J|-4|K|1B3|8|-2]]|$0|-4|2|76|4|76|6|$9|@2M|72|5R|75|5W|5Q|I|5P]|7|-2|J|-4|K|1B4|8|-2]]|$0|GK|2|GL|4|7F|6|$K|1B5|9|@AF|4H|4Z|CK|16|2S|7H|4D|2X|67|CJ|I|3H|30|GM]|7|-2|J|-4|L|@GN]|8|-2]]|$0|-4|2|GO|4|B4|6|$9|@DK|3Y|4G|12|GP|4B|4R|4K]|7|-2|J|-4|K|1B6|8|-2]]|$0|-4|2|GQ|4|EF|6|$K|1B7|9|@GR|B4|3G|38|3Y|A7|4F]|7|-2|J|-4|8|-2]]|$0|GS|2|1S|4|1T|6|$K|1B8|9|@23|94|AK|FT|U|V|BP|1Q|FW|28|GT|4S|11|1A|4R]|7|-2|J|-4|8|-2|L|@GU]]]|$0|-4|2|GV|4|GW|6|$9|@GX|3G|3C]|7|-2|J|-4|L|-2|K|1B9|8|-2]]|$0|-4|2|GY|4|GZ|6|$9|@3Y|2X|E9|A7]|K|1KZ]]|$0|-4|2|H0|4|5C|6|$9|@3U|D6|4F|GP]|K|1L0]]|$0|-4|2|H1|4|6Y|6|$9|@R|H2|6W|3I|H3|H4|30|6X|6Z]|7|-2|J|-4|L|-2|K|1BA|8|-2]]|$0|-4|2|H5|4|H2|6|$9|@ER|6W|H4|DV]|K|1L1]]|$0|-4|2|H6|4|77|6|$9|@H7|EF|8C|C1|DS|9Y]|7|-2|J|-4|K|1BB|8|-2]]|$0|H8|2|H9|4|H7|6|$K|1BC|9|@5V|5N|5R|C2|F0|HA]]]|$0|-4|2|HB|4|HA|6|$9|@E9|HC|HD|HE|HF|DS|HG|HH]|7|-2|J|-4|K|1BD|8|-2]]|$0|-4|2|HI|4|HJ|6|$9|@C9|3F|EQ|5N|5O|5V]|7|-2|J|HK|K|1BE|8|-2]]|$0|-4|2|HL|4|HM|6|$9|@E1|GI|E2|E3|4V|94]|7|-2|J|HN|K|1BF|8|-2]]|$0|-4|2|HO|4|2U|6|$K|1BG|9|@9H|2S|BE|HP|2Y|HQ]]]|$0|-4|2|HR|4|HE|6|$9|@8C|HS|HF|DS|HA|HC|HT|2W]|7|-2|J|-4|K|1BH|8|-2]]|$0|-4|2|HU|4|HG|6|$9|@E9|HE|HF|DS|HA|DX|HC]|7|-2|J|-4|K|1BI|8|-2]]|$0|HV|2|HW|4|GR|6|$K|1BJ|9|@9X|EF|E3|B4|77|H7]|7|-2|J|-4|L|@HX]|8|-2]]|$0|HY|2|HZ|4|8B|6|$K|1BK|9|@5W|37|88|3B|7A|72|I0|I1]]]|$0|-4|2|I2|4|A|6|$K|1BL|9|@G|E|16|5|D|F|C|5D|I3]]]|$0|-4|2|I4|4|7O|6|$K|1BM|9|@78|37|2Q|9C|3B|5K|DW|30|2V|82|GJ|I5|I6|15|5E]|7|-2|J|-4|8|-2|L|@I7|I8]]]|$0|-4|2|I9|4|4E|6|$K|1BN|9|@47|7V|4A|45|48]]]|$0|-4|2|IA|4|D1|6|$9|@3P|1D|BT|2P]|K|1L2]]|$0|-4|2|IB|4|IC|6|$9|@ID|8E|89]|K|1L3]]|$0|IE|2|IF|4|U|6|$K|1BO|9|@IG|FT|1T|9H|93|GT|7B|T|S|V|IH|F9]|7|-2|J|-4|8|-2|L|@II|IJ|IK|IL]]]|$0|IM|2|IN|4|9E|6|$9|@2M|9C|5F|2X|IO|F|E|IP|8N|69]|7|-2|J|-4|K|1BP|8|-2|L|@IQ|IR|IS]]]|$0|IT|2|6H|4|2G|6|$K|1BQ|9|@2X|F7|G|6B|D|DX|2H|I]|7|-2|J|-4|L|@IU]|8|-2]]|$0|-4|2|IV|4|IW|6|$9|@IX|7Z|IY|5Y|5X]|K|1L4]]|$0|IZ|2|J0|4|81|6|$K|1BR|9|@CI|A6|FM|D8|J1|GA|J2|63|66]|7|-2|J|-4|8|-2|L|@J3]]]|$0|-4|2|J4|4|3N|6|$9|@E0|BL|J5|IP|E6|CK]|K|1L5]]|$0|-4|2|J6|4|E2|6|$9|@3S|E1|GI|E3|E0]|7|-2|J|-4|L|@J7]|K|1BS|8|-2]]|$0|-4|2|J8|4|J9|6|$K|1BT|9|@E1|GI|E2|JA|6B|E3|4V]|7|-2|J|-4|L|@JB]|8|-2]]|$0|-4|2|JC|4|3A|6|$9|@5W|4Z|I|72|7F|36|C1|4D|5P]|K|1L6]]|$0|JD|2|JE|4|5Y|6|$9|@IX|5Q|5R|5U|5X|54|FT|5V]|7|-2|J|-4|K|1BU|8|-2|L|@JF]]]|$0|-4|2|JG|4|CS|6|$9|@CO|89|5H|8E|ID|CP|JH|CQ|8D|2H|IC|CR|JI|CN|JJ|JK]|7|-2|J|-4|K|1BV|8|-2]]|$0|-4|2|JL|4|5H|6|$9|@CS|5J|2P|4H|CO|IO|I|3C|5I|GP|2H|2X|48|5D]|K|1L7]]|$0|-4|2|JM|4|8P|6|$9|@C9|3F|3D|CC|CD|CF|3G|8D|38|CE|3C]|7|-2|J|-4|K|1BW|8|-2]]|$0|-4|2|JN|4|JO|6|$9|-2|7|-2|J|-4|L|-2|K|1BX|8|-2]]|$0|-4|2|JP|4|3B|6|$K|1BY|9|@7O|78|37|3B|36|3E|GJ|3G|3C|H3|3A]]]|$0|-4|2|JQ|4|CT|6|$9|@5V|CN|5O|5N]|7|-2|J|-4|L|-2|K|1BZ|8|-2]]|$0|-4|2|JR|4|AB|6|$9|@7F|81|A5|9L|26|A6|AA|8L|5Q|8J|8Q|56|8R|GA|FM|A9|A8]|7|-2|J|-4|K|1C0|8|-2]]|$0|-4|2|JS|4|JT|6|$9|@JU|IP|69|9E|JV|15]|K|1L8]]|$0|-4|2|JW|4|JX|6|$K|1C1|9|@3T|JY|DR|2O]]]|$0|JZ|2|K0|4|IG|6|$K|1C2|9|@Y|FT|1T|GT|95|AF|U|1A]|7|-2|J|-4|8|-2|L|@K1]]]|$0|K2|2|K3|4|I0|6|$K|1C3|9|@7O|37|8B|7A|K4|K5|3A|5V|5Q]|7|-2|J|-4|8|-2|L|@K6]]]|$0|-4|2|K7|4|K8|6|$9|@6E]|7|-2|J|-4|L|-2|K|1C4|8|-2]]|$0|K9|2|KA|4|9M|6|$9|@3T|5C|E5|E6|25|5B]|K|1L9]]|$0|-4|2|KB|4|BF|6|$9|@39|C]|K|1LA]]|$0|KC|2|KD|4|48|6|$9|@7F|7O|37|9E|5K|BL|A8|4L|4C|66|4I|45|E1|I|A6|63|4F|4B|64|2T]|7|-2|J|-4|K|1C5|8|-2|L|@KE|KF]]]|$0|-4|2|KG|4|6W|6|$9|@3S|5O|H2|ER|3F|H4|3G|6Y]|K|1LB]]|$0|KH|2|KI|4|BU|6|$K|1C6|9|@3S|3T|BP|2P|3O|DE|9Q|BQ|KJ|KK|BT]|7|-2|J|-4|8|-2|L|@KL|KM|KN]]]|$0|-4|2|KO|4|BR|6|$K|1C7|9|@3T|BU|DE|9Q]]]|$0|KP|2|KQ|4|KR|6|$9|@D6|CI|8K|16|8Q|3D|38|6B]|7|-2|J|-4|K|1C8|8|-2|L|@KS]]]|$0|KT|2|KU|4|I6|6|$K|1C9|9|@D6|95|5C|B|AF|IG|2P|7O|2V|KV]|7|-2|J|-4|8|-2|L|@KW|KX]]]|$0|-4|2|KY|4|49|6|$9|@KZ|8A|L0|8C|63|26]|7|-2|J|-4|K|1CA|8|-2]]|$0|-4|2|L1|4|H|6|$9|@8N|2M|Q|E|6Z|I|R|15|30|2V|BL|8R|2X|37|49]|K|1LC]]|$0|L2|2|L3|4|2M|6|$9|@8N|9E|55|8J|E|5H|5F|I|IG|37|H|15|2V|A7|7F|56|A6|FM]|7|-2|J|-4|K|1CB|8|-2|L|@L4|L5|L6]]]|$0|L7|2|L8|4|K4|6|$K|1CC|9|@KZ|49|K5|L9|L0|I0|8A|AX]|7|-2|J|-4|8|-2]]|$0|-4|2|LA|4|8M|6|$9|@8K|2Q|8J|8N|37|DV|2M|BV|6B|BL|2X|DX|15|2V|56|38|3G]|7|-2|J|-4|K|1CD|8|-2]]|$0|-4|2|LB|4|T|6|$9|@P|U|V|S|R|6Z]|K|1LD]]|$0|-4|2|LC|4|LD|6|$9|@48|5G|IP|C0|J5|E|3N|BL|F|A8|LE|LF|LG]|K|1LE]]|$0|LH|2|LI|4|3C|6|$K|1CE|9|@4H|5O|LJ|8Q|EQ|3G|AE|38|45|5H|49|8J|48|36]|7|-2|J|-4|8|-2|L|@LK]]]|$0|LL|2|LM|4|LJ|6|$K|1CF|9|@C9|FU|LN]]]|$0|-4|2|LO|4|LP|6|$9|@55|9L|LQ|A9|A5|37|AA|R|A8|56|BL|63]|K|1LF]]|$0|LR|2|LS|4|LQ|6|$9|@IH|LT|65|2Y|63|B4|49]|K|1LG]]|$0|-4|2|LU|4|6C|6|$9|@DM|9V|LQ|LP|66|63]|7|-2|J|-4|K|1CG|8|-2]]|$0|-4|2|LV|4|69|6|$9|@5G|5H|8Q|48|4H|C0|I|LD|64|9E|30|5K|4V|4I]|K|1LH]]|$0|LW|2|LX|4|1B|6|$K|1CH|9|@AF|2P|16|HP|I6|2Y|2X|65|2V|15]|7|-2|J|-4|8|-2|L|@LY|LZ]]]|$0|-4|2|M0|4|IO|6|$9|@2P|5I|5H|2V|AE|15]|K|1LI]]|$0|-4|2|M1|4|1C|6|$9|@2Y|1B|9G|1A|4R|9E|9H|2P]|K|1LJ]]|$0|-4|2|M2|4|I5|6|$9|@GJ|2V|7O|BE|15|KV|AF|GH]|K|1LK]]|$0|-4|2|M3|4|M4|6|$9|@5B|15|AR|M5]|7|-2|J|-4|L|-2|K|1CI|8|-2]]|$0|-4|2|M6|4|M7|6|$9|@M8|M9]|K|1LL]]|$0|-4|2|MA|4|MB|6|$9|@1H|5O|MC|H3]|K|1LM]]|$0|MD|2|ME|4|5E|6|$K|1CJ|9|@3S|3P|2P|15|5B|5I|GP|95|9H|2V]|7|-2|J|-4|8|-2|L|@MF|MG|MH]]]|$0|-4|2|MI|4|EQ|6|$9|@C9|EP|HJ|95|EK|8P|MJ|CC|CE]|K|1LN]]|$0|-4|2|MK|4|1J|6|$9|@19|2O|1G|ML|1L|1K|1J|1I]|7|-2|J|-4|L|-2|K|1CK|8|-2]]|$0|-4|2|MM|4|82|6|$9|@80|7O|T|95|1L|KV|11|I5]|K|1LO]]|$0|-4|2|MN|4|MO|6|$9|@GJ|AA|MP|2M|37|H|15|8M|7O]|K|1LP]]|$0|MQ|2|MR|4|JU|6|$K|1CL|9|@JT|15|9E|JV|2Z|30]]]|$0|-4|2|MS|4|17|6|$9|@F8|15|16|18|14]|7|-2|J|-4|L|-2|K|1CM|8|-2]]|$0|-4|2|MT|4|8Z|6|$9|@48|5G|5D|69|5H|LE|I|64|MU|7H]|7|-2|J|-4|K|1CN|8|-2]]|$0|MV|2|MW|4|94|6|$K|1CO|9|@GI|BP|4V|1T|6P|FW|7B|U|96]|7|-2|J|-4|8|-2|L|@MX|MY|MZ]|7Q|-4]]|$0|-4|2|N0|4|N1|6|$9|-2|7|-2|J|-4|L|-2|7Q|-4|K|1CP|8|-2]]|$0|-4|2|N2|4|N3|6|$9|@D6|N4|ER]|7|-2|J|-4|L|-2|7Q|-4|K|1CQ|8|-2]]|$0|-4|2|N5|4|3F|6|$9|@C9|EQ|AE|8P|3D|CE|3G|CF|CC]|K|1LQ]]|$0|-4|2|N6|4|5D|6|$9|@5B|5E|4H|5H|4Q|5G]|K|1LR]]|$0|-4|2|N7|4|N8|6|$9|@R|5G|15|5D|LF|30|6X|8Z|48|I|MU|39|C0]|7|-2|J|-4|K|1CR|8|-2]]|$0|-4|2|N9|4|NA|6|$9|@16|26|AA|5B]|K|1LS]]|$0|-4|2|NB|4|3I|6|$9|@8S|3G|38|8K|56|3D|CB|AE]|K|1LT]]|$0|NC|2|ND|4|8S|6|$9|@ES|NE|3I|3G|38|56|8Q|8I|8K|3D|DX|CB]|7|-2|J|-4|K|1CS|8|-2]]|$0|-4|2|NF|4|NG|6|$9|@E9|1B]|7|-2|J|-4|L|-2|K|1CT|8|-2]]|$0|-4|2|NH|4|N4|6|$9|@D6|FT|4V|5I|5O|5K]|K|1LU]]|$0|-4|2|NI|4|27|6|$K|1CU|9|@23|S|NJ|56|1Q|25|DX|MU|NK]]]|$0|-4|2|NL|4|NM|6|$9|@DX|6B|27]|K|1LV]]|$0|NN|2|NO|4|D2|6|$9|@3S|2P|EJ|16|65|7F|DH|5R]|7|-2|J|-4|K|1CV|8|-2|L|@NP]]]|$0|-4|2|NQ|4|HQ|6|$9|@2S|HP|2P|2Y|2U|DR|BT|9H]|K|1LW]]|$0|-4|2|NR|4|FN|6|$9|@39|NS|DV|FM|GA|S|37]|K|1LX]]|$0|-4|2|NT|4|1I|6|$9|@19|2O|1G|ML|1L|1K|1J|1I]|7|-2|J|-4|L|-2|K|1CW|8|-2]]|$0|-4|2|NU|4|NV|6|$9|@NW|3O|NX]|7|-2|J|-4|L|-2|K|1CX|8|-2]]|$0|-4|2|NY|4|ID|6|$9|@CO|JH|89|JI|D9]|K|1LY]]|$0|-4|2|NZ|4|O0|6|$9|@I6]|7|-2|J|-4|K|1CY|8|-2]]|$0|-4|2|O1|4|O2|6|$9|@6B|DX|4I|66]|7|-2|J|-4|L|-2|K|1CZ|8|-2]]|$0|-4|2|O3|4|4Z|6|$9|@BZ|4H|47|C2|3A|4D|C1|7F|I|CB|3I]|J|4Z|K|1LZ]]|$0|-4|2|O4|4|O5|6|$9|@O6|O7|O8|O9]|7|-2|J|-4|L|-2|K|1D0|8|-2]]|$0|OA|2|OB|4|I1|6|$K|1D1|9|@5V|5N|5O|5R|5X|GA|9L|63|A6]|7|@$1R|1D2|2|7Y|4|78|1U|1D3|1V|1D4|1W|1X|0|-4|1Z|1D5|20|1D6|21|22]|$1R|1D7|2|OC|4|GA|1U|1D8|1V|1D9|1W|1X|0|-4|1Z|1DA|20|1DB|21|22]]|J|-4|8|-2|L|@OD|OE]]]|$0|OF|2|OG|4|89|6|$K|1DC|9|@CO|LJ|5Z|8E|8D|CS|24|OH|CQ|88|CP|JH|9P]]]|$0|-4|2|OI|4|MC|6|$9|@1H|16|2W|DR|HS|C5|BZ|4C|AY|2L|MB|HT|C2|2R]|7|-2|J|-4|K|1DD|8|-2]]|$0|OJ|2|OK|4|EZ|6|$K|1DE|9|@Y|3K|10|Z|X]]]|$0|-4|2|OL|4|M8|6|$9|@C9|AE|M9|3F|38]|7|-2|J|-4|K|1DF|8|-2]]|$0|OM|2|ON|4|47|6|$K|1DG|9|@19|GP|OO|CO|4E|CQ]|7|-2|J|-4|L|@OP]|8|-2]]|$0|OQ|2|OR|4|AK|6|$K|1DH|9|@GI|GR|BP|4R|2P|9X|A7|1A|96]|7|-2|J|-4|L|@OS]|8|-2]]|$0|-4|2|OT|4|7V|6|$9|@FH|7T|7U|7W|7S|GR]|K|1M0]]|$0|-4|2|OU|4|OV|6|$9|@CO]|7|-2|J|-4|L|-2|K|1DI|8|-2]]|$0|OW|2|OX|4|3S|6|$K|1DJ|9|@4Q|5E|65|IO|I3|A|5D|D|E|2G|2X|5H]|7|-2|J|-4|L|@OY]|8|-2]]|$0|-4|2|OZ|4|8J|6|$9|@8N|A6|5Q|37|A8|38|63|56|2M|8M|5P|AA|3G|8K]|K|1M1]]|$0|P0|2|P1|4|G|6|$K|1DK|9|@3S|BP|16|2X|BV|E|2G|D|I3|IO|8N|A|P2]|7|-2|J|-4|8|-2|L|@P3|P4|P5]|7Q|-4]]|$0|-4|2|P6|4|MP|6|$9|@CO|89|8E|MO|8J]|K|1M2]]|$0|-4|2|P7|4|H3|6|$9|@GJ|I5|GX|MU|6X|57]|K|1M3]]|$0|-4|2|P8|4|P9|6|$9|@N8|3S|F8|IO]|K|1M4]]|$0|PA|2|PB|4|C1|6|$K|1DL|9|@BZ|4Z|L0|46|3A|9Z|1H|AY|HS|MB|4K|4H]|7|-2|J|-4|L|@PC]|8|-2]]|$0|-4|2|PD|4|PE|6|$K|1DM|9|@PF|NJ|27|NM|1Q|U]]]|$0|PG|2|PH|4|6Z|6|$9|@R|5F|2Y|Q|P|S|6X]|7|-2|J|-4|K|1DN|8|-2|L|@PI]]]|$0|PJ|2|PK|4|B3|6|$9|@CR|96|1A|1C|68|4S|AK]|7|-2|J|-4|L|@PL]|K|1DO|8|-2]]|$0|-4|2|PM|4|6A|6|$9|@2H|9V|2X|4F|4G|4B|DL|4K|49|63|66|A7]|7|-2|J|-4|K|1DP|8|-2]]|$0|-4|2|PN|4|A2|6|$9|@15|9Y|A3|2L|50|CD|A0]|7|-2|J|-4|K|1DQ|8|-2]]|$0|PO|2|PP|4|8Q|6|$9|@4H|KR|EQ|3F|3I|38|56|3D|8S|6B|67|8K|3G]|7|-2|J|-4|K|1DR|8|-2|L|@PQ]]]|$0|-4|2|PR|4|CJ|6|$9|@7F|67|8Q|CK|AB|GM|3A|5P|4D|38|7H|3H]|K|1M5]]|$0|-4|2|PS|4|PT|6|$9|@PU|IG]|7|-2|J|-4|L|-2|7Q|-4|K|1DS|8|-2]]|$0|-4|2|PV|4|PW|6|$9|@G|H]|7|-2|J|-4|L|-2|K|1DT|8|-2]]|$0|-4|2|PX|4|LE|6|$K|1DU|9|@J5|BL|LD|LP|9L]]]|$0|-4|2|PY|4|8D|6|$9|@CO|89|8E|CS|88|CP|8P|3D|C9]|7|-2|J|-4|K|1DV|8|-2]]|$0|-4|2|PZ|4|9R|6|$9|@24|IC|OH|CQ|26|49|56]|K|1M6]]|$0|-4|2|Q0|4|9F|6|$9|@9H|68|B3|2U|9C|5B|B4]|K|1M7]]|$0|-4|2|Q1|4|Q2|6|$9|@M7]|7|-2|J|-4|L|-2|K|1DW|8|-2]]|$0|-4|2|Q3|4|L0|6|$9|@K4|3H|KZ|K5|8A|C1]|K|1M8]]|$0|-4|2|Q4|4|Q5|6|$9|@8J|BL|3N|Q6|9L|A8|5Q]|K|1M9]]|$0|-4|2|Q7|4|8L|6|$9|@3U|5Q|5C|38|8S|26|A6|3I|3G|8J|A8|8I|AA|56|4F|37|AB|8R]|7|-2|J|-4|K|1DX|8|-2]]|$0|-4|2|Q8|4|A9|6|$9|@55|A5|9L|93|26|LP|56|8R|AB]|K|1MA]]|$0|-4|2|Q9|4|H4|6|$K|1DY|9|@J5|QA|6W|LF|H2|QB|D2]]]|$0|-4|2|QC|4|5W|6|$K|1DZ|9|@7A|3A|72|I|K5|75]]]|$0|-4|2|QD|4|BQ|6|$9|@3U|DM|3T|DL|BU]|K|1MB]]|$0|-4|2|QE|4|QF|6|$9|@D2|EJ|94]|K|1MC]]|$0|-4|2|QG|4|4Q|6|$K|1E0|9|@9H|9F|9G|5D|68|1C|1A|65|9E|4R|5B]]]|$0|-4|2|QH|4|QI|6|$9|@3S|3U|3T|3P|GI]|7|-2|J|-4|L|-2|K|1E1|8|-2]]|$0|-4|2|QJ|4|O8|6|$9|@O6|O5|O7|O9]|7|-2|J|-4|L|-2|K|1E2|8|-2]]|$0|QK|2|QL|4|90|6|$9|@4B|DK|4K|65|4F|AF|64|4H|96]|K|1MD]]|$0|-4|2|QM|4|LG|6|$9|@QA|QN|5G|C0|IP|LF|J5|H4]|7|-2|J|-4|L|-2|K|1E3|8|-2]]|$0|-4|2|QO|4|QP|6|$9|@19|ML|1L|C4|QQ|IH|4G|C0|B4|KV]|7|-2|J|-4|K|1E4|8|-2]]|$0|QR|2|QS|4|19|6|$K|1E5|9|@8A|FU|C2|ML|96|QP|1L|1G|1B|4Q|90|47|1K|1J|1I]|7|-2|J|-4|8|-2|L|@QT|QU]]]|$0|-4|2|QV|4|CR|6|$9|@B3|CO|CS|ID|CP|JH|8E|JJ|9X]|K|1ME]]|$0|-4|2|QW|4|12|6|$9|@B3|1A|B4|AK|9F|FU]|K|1MF]]|$0|-4|2|QX|4|7B|6|$9|@5V|5N|5R|QY|U|60|GT|93|I1|8C|1T|9H]|K|1MG]]|$0|QZ|2|R0|4|5Z|6|$K|1E6|9|@C9|93|LJ|3D|3F|GA|5U]|7|-2|J|-4|8|-2|L|@R1]]]|$0|R2|2|R3|4|IX|6|$K|1E7|9|@95|R4|5O|5Y]|7|-2|J|-4|8|-2]]|$0|-4|2|R5|4|8O|6|$9|@C9|EQ|3F|S|37|38|CE]|K|1MH]]|$0|R6|2|R7|4|2R|6|$K|1E8|9|@2L|19|1H|9Z|3Y|15|AW|2W|HS|R8|1J]|7|-2|J|-4|8|-2]]|$0|-4|2|R9|4|RA|6|$9|@8K|5Q|38|3G|56|36]|K|1MI]]|$0|-4|2|RB|4|IY|6|$K|1E9|9|@GA|IW|DW]]]|$0|RC|2|RD|4|26|6|$K|1EA|9|@3U|9L|2Q|56|25|E5|8I|C2|8R|AA|37|LP|MU|4F|I1|2T|A8]|7|-2|J|-4|8|-2|L|@RE]]]|$0|-4|2|RF|4|8I|6|$K|1EB|9|@5Q|37|26|LP|LQ|A9|8R|56|3E|8K]]]|$0|RG|2|RH|4|79|6|$K|1EC|9|@5F|JY|EK|7B|U|2L|5R|60]|7|-2|J|-4|L|@RI]|8|-2|7Q|-4]]|$0|-4|2|RJ|4|FJ|6|$9|@D2|EJ|9Y|DH|A3|A2|A0|3Y]|K|1MJ]]|$0|-4|2|RK|4|RL|6|$9|@19|1L|82|KZ|11|IH|C4|QQ|RM]|K|1MK]]|$0|-4|2|RN|4|ER|6|$K|1ED|9|@EP|DG|8Q|FN]]]|$0|-4|2|RO|4|7A|6|$9|@5W|CO|CS|93|5P]|K|1ML]]|$0|-4|2|RP|4|HH|6|$9|@HC|GA|2P|BT|5V|HD|HA|HG|HE|DR|DS|HF]|7|-2|J|-4|L|-2|K|1EE|8|-2]]|$0|-4|2|RQ|4|RR|6|$K|1EF|9|@JH|D9|9X]]]|$0|-4|2|RS|4|RT|6|$9|@I5|GJ|JU]|K|1MM]]|$0|RU|2|RV|4|RW|6|$K|1EG|9|@GR|EF|9X|66|4K|KV]]]|$0|-4|2|RX|4|RY|6|$9|@IY|81|8R|8M|5C|5Y]|7|-2|J|-4|L|-2|K|1EH|8|-2]]|$0|-4|2|RZ|4|7P|6|$9|@S0|D6|5O]|7|-2|J|-4|L|-2|K|1EI|8|-2]]|$0|-4|2|S1|4|30|6|$9|@7O|37|15|2V|I|2X|IO|5H|8N|H|1B|BE|7F|2M|82|48|5G|2S|I6]|7|-2|J|-4|K|1EJ|8|-2]]|$0|-4|2|S2|4|S3|6|$9|@S4]|7|-2|J|-4|L|-2|K|1EK|8|-2]]|$0|-4|2|S5|4|S4|6|$9|@S3]|7|-2|J|-4|L|-2|K|1EL|8|-2]]|$0|-4|2|S6|4|S7|6|@1MN]]|$0|S8|2|S9|4|23|6|$K|1EM|9|@Y|1T|9H|FU|2U|90|1Q|9F|29]|7|-2|J|-4|8|-2|L|@SA|SB|SC]]]|$0|SD|2|SE|4|Y|6|$K|1EN|9|@23|AK|IG|1T|9H|11|X|90|RL|GT|AF|93|1A|4R]|7|-2|J|-4|8|-2|L|@SF|SG|SH]]]|$0|SI|2|SJ|4|55|6|$K|1EO|9|@2M|FT|54|9L|LP|8I|37|A9|FN|39|56|GA|A5|A8|26]]]|$0|-4|2|SK|4|SL|6|$9|@AX|3E|GX|H3]|K|1MO]]|$0|-4|2|SM|4|SN|6|$9|@D6|1G|DA|D7]|K|1MP]]|$0|-4|2|SO|4|GJ|6|$K|1EP|9|@2V|I5|30|95|7O|5E|GH|57|BE]]]|$0|SP|2|SQ|4|5K|6|$K|1EQ|9|@7O|FU|LJ|65|GP|5O|69|5B|30|I|4V|2V]|7|-2|J|-4|8|-2|L|@SR|SS|ST]]]|$0|-4|2|SU|4|LT|6|@1MQ]]|$0|-4|2|SV|4|80|6|$9|@11|82|GJ|T|IO|30|7O|GH]|K|1MR]]|$0|SW|2|SX|4|5F|6|$K|1ER|9|@5E|9E|5B|IO|E|F|G|GP|5I|5H]]]|$0|-4|2|SY|4|F9|6|$9|@BP|U|GT|LQ|1T]|K|1MS]]|$0|-4|2|SZ|4|PU|6|$9|@FT|U|GT|1T]|K|1MT]]|$0|T0|2|T1|4|E3|6|$K|1ES|9|@E2|4V|DL|66|T2|GR|E0|49|82]|7|-2|J|-4|8|-2|L|@T3]]]|$0|-4|2|T4|4|2V|6|$9|@GJ|I5|30|7O|15|IO|H|2M]|K|1MU]]|$0|-4|2|T5|4|T6|6|$9|@4R|AK|GR|E3]|7|-2|J|-4|K|1ET|8|-2]]|$0|T7|2|T8|4|A6|6|$9|@J1|81|FM|3G|2P]|7|-2|J|-4|K|1EU|8|-2]]|$0|T9|2|TA|4|65|6|$K|1EV|9|@3S|4Q|FU|2T|EJ|64|5H|1B|B4|48|68|90]|7|-2|J|-4|L|@TB|TC]|8|-2]]|$0|-4|2|TD|4|JI|6|$9|@CO|ID|JH|47|6B|4C|D9|CS|IC|5H|4E]|K|1MV]]|$0|-4|2|TE|4|C5|6|$9|@BZ|4Y|4J|4C|MC|69]|7|-2|J|-4|K|1EW|8|-2]]|$0|-4|2|TF|4|29|6|$9|@23|1Q|QP|V|1T|27|Y|BP|4S|DK|IH|KZ|MU]|K|1MW]]|$0|-4|2|TG|4|F6|6|$9|@F7|6P|3S|5R]|K|1MX]]|$0|-4|2|TH|4|4S|6|$K|1EX|9|@23|4P|B3|9F|2U|6A|28|68|65|1T|94|B4|AK]]]|$0|-4|2|TI|4|JA|6|$K|1EY|9|@6B]]]|$0|-4|2|TJ|4|5P|6|$9|@D|DV|5Q|I|37|8J|8L|2G]|7|-2|J|-4|L|@TK]|K|1EZ|8|-2]]|$0|-4|2|TL|4|9P|6|$K|1F0|9|@ID|8E|89]]]|$0|-4|2|TM|4|A7|6|$9|@3U|DM|9V|2T|4A|E9|48|49|26|37|8R|56]|K|1MY]]|$0|-4|2|TN|4|S0|6|$9|@79|2L|A0]|K|1MZ]]|$0|-4|2|TO|4|KK|6|$K|1F1|9|@3T|IO|BQ|3P|2P]]]|$0|-4|2|TP|4|I3|6|$9|@G]|K|1N0]]|$0|-4|2|TQ|4|TR|6|$9|@3U|3Y]|K|1N1]]|$0|-4|2|TS|4|3Z|6|$9|@A7|2T]|K|1N2]]|$0|-4|2|TT|4|60|6|$9|@7B|94|79|U]|K|1N3]]|$0|-4|2|TU|4|M5|6|$9|@M4|5B]|7|-2|J|-4|L|-2|K|1F2|8|-2]]|$0|-4|2|TV|4|TW|6|$9|@5C|93|9K|2S|5V]|K|1N4]]|$0|-4|2|TX|4|PF|6|$K|1F3|9|@NJ|1Q|NM|23|4R]]]|$0|-4|2|TY|4|TZ|6|$9|@KV|65|DK|QQ|B4|2U]|K|1N5]]|$0|U0|2|U1|4|CI|6|$K|1F4|9|@AF|2P|16|DA|3H|3P|EJ|D1]|7|-2|J|-4|8|-2|L|@U2]]]|$0|-4|2|U3|4|S|6|$9|@Q|P|R|8O|39|27|U|3M|55|37|8R|56]|K|1N6]]|$0|U4|2|U5|4|2P|6|$K|1F5|9|@3P|AF|DA|FM|HP|5H|IO|1B|7F|2X]|7|-2|J|-4|8|-2|L|@U6|U7]]]|$0|U8|2|U9|4|FT|6|$K|1F6|9|@1T|U|Y|9H|FW|V]|7|-2|J|-4|8|-2|L|@UA|UB|UC|UD]|7Q|-4]]|$0|UE|2|UF|4|DA|6|$9|@CI|2P|C|BT|3P|1B|D1|EJ]|7|-2|J|-4|K|1F7|8|-2|L|@UG]]]|$0|UH|2|UI|4|4V|6|$K|1F8|9|@94|E1|FU|E3|4H|2Y|69|GI|E2]|7|-2|J|-4|8|-2|L|@UJ|UK|UL]]]|$0|-4|2|UM|4|UN|6|$9|@EW|E1|4B]|7|-2|J|-4|L|-2|K|1F9|8|-2]]|$0|-4|2|UO|4|UP|6|$9|@3U|9V|A7]|7|-2|J|UP|K|1FA|8|-2]]|$0|-4|2|UQ|4|HT|6|$9|@2W|DR|HS|HE|HG|HF|MC]|K|1N7]]|$0|-4|2|UR|4|42|6|$K|1FB|9|@E9|8E|CQ|CO]|7|@$1R|1FC|2|US|4|UT|1U|1FD|1V|1FE|1W|1X|0|UU|1Z|1FF|20|1FG|21|22]]|J|-4|8|-2]]|$0|-4|2|UV|4|4C|6|$9|@AF|BZ|C5|4H|48|4B|49|45|CF|A6|3C]|7|-2|J|-4|K|1FH|8|-2]]|$0|UW|2|UX|4|3D|6|$9|@4H|CC|8Q|CW|EQ|3F|38|56|3C|3I|8S]|7|-2|J|-4|K|1FI|8|-2|L|@UY]]]|$0|UZ|2|V0|4|CC|6|$K|1FJ|9|@C9|LJ|3D|8D|8P|CB|3F|3C|AE]|7|-2|J|-4|L|@V1]|8|-2]]|$0|V2|2|V3|4|5G|6|$K|1FK|9|@C0|5B|5H|B|I|69|8Z|LD|4H|48|64|5D|30]|7|-2|J|-4|8|-2|L|@V4|V5|V6]]]|$0|-4|2|V7|4|4F|6|$9|@3U|3Y|9V|A7|63|8L|49|48|6A|4A|2T|45]|7|-2|J|-4|K|1FL|8|-2]]|$0|-4|2|V8|4|5I|6|$9|@5R|IO|5H|5G|5F]|K|1N8]]|$0|V9|2|VA|4|7H|6|$K|1FM|9|@7F|2N|7G|6B|67|2G|5P|69|4M|51|CJ|8Z|4H]|7|-2|J|-4|8|-2|L|@VB]]]|$0|-4|2|VC|4|VD|6|@1N9]]|$0|-4|2|VE|4|VF|6|@1NA]]|$0|VG|2|VH|4|9D|6|$K|1FN|9|@DK|9U|3Y|9C|9V|5K|9F|9G|1A|68]|7|-2|J|-4|8|-2|L|@VI|VJ|VK]]]|$0|-4|2|VL|4|VM|6|$9|@D1|BP]|K|1NB]]|$0|VN|2|VO|4|3E|6|$9|@45|3B|3D|GX|10|3C|36|3G|48|38]|7|-2|J|-4|K|1FO|8|-2|L|@VP]]]|$0|-4|2|VQ|4|GX|6|$9|@5O|36|3C|3E|VR|3I|H3|3G|GW]|K|1NC]]|$0|VS|2|VT|4|BL|6|$9|@2M|E0|3N|LT|KK|48|4F|A8|LP|LQ]|7|-2|J|-4|K|1FP|8|-2|L|@VU|VV]]]|$0|-4|2|VW|4|VX|6|$K|1FQ|9|@3X|47|9C|3H|4A]|7|-2|J|-4|8|-2]]|$0|-4|2|VY|4|VZ|6|$9|-2|7|-2|J|-4|L|-2|K|1FR|8|-2]]|$0|-4|2|W0|4|GT|6|$9|@IG|U|NJ|AF|7B|2M|82|Y|F9]|K|1ND]]|$0|-4|2|OC|4|GA|6|$9|@I1|81|J2|55|A6|AB|2M|3M|8L|5Z]|K|1NE]]|$0|W1|2|W2|4|FM|6|$9|@81|8J|3Y|2P|A6|J1|GA|J2|63|39|I1]|7|-2|J|-4|K|1FS|8|-2|L|@W3|W4|W5]]]|$0|-4|2|W6|4|W7|6|$9|@2L|D6|5B]|7|-2|J|-4|L|-2|K|1FT|8|-2]]|$0|-4|2|W8|4|IP|6|$K|1FU|9|@C0|F|LD|5G|9E|3N|H|69|J5]]]|$0|W9|2|WA|4|C0|6|$9|@5G|16|25|QN|IH|IP|6C|69|4M|I1|48|49|QA|H]|7|-2|J|-4|K|1FV|8|-2|L|@WB]]]|$0|-4|2|WC|4|4T|6|$9|@3U|DM|9U|9V|WD|6A]|K|1NF]]|$0|WE|2|WF|4|C2|6|$K|1FW|9|@BZ|1H|8A|2R|47|49|L0|4H|19|4C|MC|QP|90]|7|-2|J|-4|8|-2|L|@WG|WH]]]|$0|WI|2|WJ|4|7G|6|$9|@79|2N|7H|QY|4U|4X|7I|7J|7K]|7|-2|J|-4|K|1FX|8|-2]]|$0|-4|2|WK|4|FW|6|$K|1FY|9|@AK|FT|1T|V]|7|-2|J|-4|8|-2]]|$0|WL|2|WM|4|CK|6|$K|1FZ|9|@7F|5Q|KJ|CJ|67|5P|8L|Q5|AA|8J|3H|3N|H3|AB|CI]|7|-2|J|-4|L|@WN]|8|-2]]|$0|-4|2|WO|4|R|6|$9|@P|9E|6Z|5F|6X|Q]|7|-2|J|-4|K|1G0|8|-2]]|$0|-4|2|WP|4|OO|6|$K|1G1|9|@47|GJ|GX|H3|DW]]]|$0|-4|2|WQ|4|WR|6|$9|@8K|D7|37]|K|1NG]]|$0|-4|2|WS|4|KJ|6|$K|1G2|9|@3P|2P|KK|FM|8K|56|8I|37|38]|7|@$1R|1G3|2|WS|4|KJ|1U|1G4|1V|1G5|1W|1X|0|-4|1Z|1G6|20|1G7|21|22]]|J|-4|8|-2]]|$0|WT|2|WU|4|8E|6|$9|@CO|89|CQ|CN|CS|8D|42|CR|ID]|K|1NH]]|$0|WV|2|WW|4|5R|6|$9|@79|5I|5O|75|5X|5Y|4L|5P|8L|48]|7|-2|J|-4|K|1G8|8|-2|L|@WX|WY]]]|$0|-4|2|WZ|4|NS|6|$9|@S|MO|30|2V]|K|1NI]]|$0|X0|2|X1|4|4J|6|$K|1G9|9|@IX|R4|4Y|QQ|4K|4C|45|8Y|64|37|38|4H|69]|7|-2|J|-4|8|-2|L|@]]]|$0|-4|2|X2|4|4X|6|$9|@51|7K|4Y|2N|7G|7H|4P|EC|C2]|K|1NJ]]|$0|-4|2|X3|4|JY|6|$9|@5V|5N|72|75|QY]|7|-2|J|-4|K|1GA|8|-2]]|$0|X4|2|X5|4|5V|6|$K|1GB|9|@5Q|5N|5O|75|5U|5X|5Y]|7|-2|J|-4|8|-2|L|@X6|X7]]]|$0|-4|2|X8|4|QY|6|$9|@JY|5V|5N|5O]|K|1NK]]|$0|-4|2|X9|4|10|6|$9|@4R|X|EZ|T6]|K|1NL]]|$0|-4|2|XA|4|9G|6|$9|@1C|4Q|1A|9F]|K|1NM]]|$0|-4|2|XB|4|CF|6|$9|@3C|3D|CC|C9|4C|38|45|4H]|K|1NN]]|$0|-4|2|XC|4|XD|6|@1NO]]|$0|-4|2|XE|4|8A|6|$K|1GC|9|@KZ|19|K4|24|88|9R|C2]|7|@$1R|1GD|2|US|4|UT|1U|1GE|1V|1GF|1W|1X|0|XF|1Z|1GG|20|1GH|21|22]]|J|-4|8|-2]]|$0|-4|2|XG|4|DW|6|$9|@OO|5O]|K|1NP]]|$0|XH|2|6F|4|1H|6|$K|1GI|9|@3Y|C1|C2|DR|AW|2R|15]|7|-2|J|-4|8|-2|L|@XI|XJ]]]|$0|XK|2|XL|4|2W|6|$K|1GJ|9|@3Y|15|2R|DQ|C2|DR|82|XM|8C|1H]|7|-2|J|-4|8|-2|L|@XN|XO|XP]]]|$0|-4|2|XQ|4|XR|6|$9|@15|BP|2X]|7|-2|J|-4|L|-2|K|1GK|8|-2]]|$0|-4|2|XS|4|C|6|$9|@5|D|A|5B|G]|K|1NQ]]|$0|-4|2|XT|4|CD|6|$9|@ML|NE|1L|8P|3D|CC|8D|RL]|7|-2|J|-4|K|1GL|8|-2]]|$0|XU|2|XV|4|XW|6|$K|1GM|9|@2L|4H|XX|XM|XY]|7|-2|J|-4|8|-2]]|$0|-4|2|XZ|4|50|6|$9|@3U|4Y|3Y|9X|2T|4J|64|A7|A2|48|5G]|K|1NR]]|$0|-4|2|Y0|4|QA|6|$9|@5G|IP|C0|J5|5D|QN|6C|LF|LG]|7|-2|J|-4|L|-2|K|1GN|8|-2]]|$0|Y1|2|Y2|4|M9|6|$9|@AE|3E|GX|3G|M8|56|38|8I|E1|8O|E0]|7|-2|J|-4|K|1GO|8|-2]]|$0|Y3|2|Y4|4|AY|6|$K|1GP|9|@3X|FU|45|EF|2W|C1]|7|-2|J|-4|8|-2|L|@Y5]]]|$0|-4|2|Y6|4|11|6|$9|@1T|80|Y|GH|BP|82|RL|X]|K|1NS]]|$0|-4|2|Y7|4|3O|6|$9|@3P|AF|16|3H|3M|EJ|D1|BT|3T|KK]|K|1NT]]|$0|Y8|2|Y9|4|2Y|6|$9|@5F|4V|1C|1B|IO|1A|2U|E2|5E|9F|4Q]|7|-2|J|-4|L|@YA]|K|1GQ|8|-2]]|$0|YB|2|YC|4|4D|6|$9|@4Z|I|48|45|7F]|K|1NU]]|$0|YD|2|YE|4|46|6|$K|1GR|9|@1H|GR|45|C1|10]|7|-2|J|-4|L|@YF]|8|-2]]|$0|-4|2|YG|4|YH|6|$9|@D2|57]|7|-2|J|-4|L|-2|K|1GS|8|-2]]|$0|YI|2|YJ|4|DK|6|$K|1GT|9|@3U|9V|65|4B|6A|4K|90|4F|2T|23|Y|64|A7|8Y|TZ|QP]|7|-2|J|-4|8|-2|L|@YK|YL|YM]]]|$0|-4|2|YN|4|RM|6|$9|@XM|5F|RL|I6]|K|1NV]]|$0|-4|2|YO|4|XX|6|$9|@XW]|K|1NW]]|$0|-4|2|YP|4|YQ|6|$9|@4H|CW|2L|XM|YR]|7|-2|J|-4|L|-2|K|1GU|8|-2]]|$0|YS|2|YT|4|9Z|6|$9|@3U|3X|FV|2W|XM|42|C1|AY|51|8E]|7|-2|J|-4|K|1GV|8|-2|L|@YU]]]|$0|-4|2|YV|4|YR|6|$9|@YQ|4H|CW|2L]|7|-2|J|-4|L|-2|K|1GW|8|-2]]|$0|-4|2|YW|4|C3|6|$K|1GX|9|@BZ|C5|C1|AY|MC]]]|$0|YX|2|YY|4|2X|6|$9|@3S|F8|I|2G|6A|A6|65|G|30|2T|5H|48|2P|P2]|7|-2|J|-4|L|@YZ|Z0|Z1]|K|1GY|8|-2|7Q|-4]]|$0|-4|2|Z2|4|F8|6|$9|@3S|1H|2G|64|2T|6P|2X|31]|K|1NX]]|$0|Z3|2|Z4|4|D8|6|$9|@3P|CI|D1|BT|KR|5Z|TW|DA|1D]|K|1NY]]|$0|Z5|2|Z6|4|D6|6|$K|1GZ|9|@3P|AF|D7|2P|8K|N4|5I]|7|-2|J|-4|8|-2|L|@Z7|Z8]]]|$0|Z9|2|ZA|4|ZB|6|$K|1H0]]|$0|-4|2|ZC|4|CE|6|$9|@C9|3B|3I|CF|8P|3D|CC|3F|8Q|3C]|7|-2|J|-4|K|1H1|8|-2]]|$0|ZD|2|ZE|4|FU|6|$K|1H2|9|@3S|4Q|10|9G|19|1C|12]|7|-2|J|-4|8|-2|L|@ZF]]]|$0|-4|2|ZG|4|CW|6|$9|@4H|5B|2G]|K|1NZ]]|$0|-4|2|ZH|4|ZI|6|$9|@3K|IX|5B]|7|-2|J|-4|L|-2|K|1H3|8|-2]]|$0|-4|2|ZJ|4|O7|6|$9|@O6|O5|O9|O8]|7|-2|J|-4|L|-2|K|1H4|8|-2]]|$0|-4|2|ZK|4|ZL|6|$9|@GJ|29]|7|-2|J|-4|L|-2|K|1H5|8|-2]]|$0|-4|2|ZM|4|NW|6|$9|@NX|NV|3T|5V]|7|-2|J|-4|L|-2|K|1H6|8|-2]]|$0|ZN|2|ZO|4|9H|6|$K|1H7|9|@23|1T|V|25|5K|9F|4Q|68|5D|2Y|1A|4R|2U|9G]|7|-2|J|-4|8|-2|L|@ZP|ZQ|ZR]]]|$0|-4|2|ZS|4|AA|6|$9|@7F|I1|A5|CK|16|E5|26|LP|A9|3H|8R|A8|8L|8J|A6|48|LE|4F|AB]|7|-2|J|-4|K|1H8|8|-2]]|$0|-4|2|ZT|4|FV|6|$9|@V|FT|1T|BP|T|10|X]|K|1O0]]|$0|-4|2|ZU|4|QB|6|$9|@H4|C1]|K|1O1]]|$0|-4|2|ZV|4|9L|6|$9|@2Q|A9|LP|8I|55|AA|26|8L|8J|8Q|56|8R|AB]|K|1O2]]|$0|-4|2|ZW|4|NJ|6|$9|@PE|27|8I|GT|37|NM]|K|1O3]]|$0|ZX|2|ZY|4|DL|6|$K|1H9|9|@3U|DK|9V|ZZ|4K|4F|6A|A7|2T|64|EF|GR|90|B4|65]|7|-2|J|-4|8|-2|L|@100|101|102]]]|$0|-4|2|103|4|DM|6|$9|@3U|DK|9V|DL|4B|4K|4F|4G|6A|ZZ]|7|-2|J|-4|L|-2|K|1HA|8|-2]]|$0|-4|2|104|4|8N|6|$9|@2M|E|H|I|8J|5P|2X|8M|G|37|2G|7F|2V|30|6Z|48]|K|1O4]]|$0|105|2|106|4|25|6|$9|@23|1T|9H|2Q|26|57|2S|BF|27|14|1Q|8R|H3|TZ|AA|2U]|7|-2|J|-4|K|1HB|8|-2|L|@107|108]]]|$0|-4|2|109|4|GM|6|$9|@7F|IG|9H|7H|CJ|CK|4D|5G|8Z|67]|K|1O5]]|$0|-4|2|10A|4|DS|6|$9|@HS|HE|HF|HG|HA]|7|-2|J|-4|K|1HC|8|-2]]|$0|-4|2|10B|4|BV|6|$9|@JA|6B|DV|8M|DX|2X]|K|1O6]]|$0|10C|2|10D|4|2Q|6|$K|1HD|9|@23|55|54|9H|16|1Q|57|B|HP|D9|25|27|NK]|7|-2|J|-4|8|-2|L|@10E]]]|$0|-4|2|10F|4|31|6|$9|@14|15|3S|2X|F8|2T|18|17]|7|-2|J|-4|L|-2|K|1HE|8|-2]]|$0|-4|2|10G|4|K5|6|$9|@KZ|10H|K4|I0|L0|8A|7A]|7|-2|J|-4|K|1HF|8|-2]]|$0|-4|2|10I|4|D9|6|$9|@8K|2Q|16|2S|HP|JH]|7|-2|J|-4|K|1HG|8|-2]]|$0|-4|2|10J|4|LN|6|$9|@C9|3F|3C|36|3D|38|CF]|K|1O7]]|$0|-4|2|10K|4|GP|6|$9|@47|5H|5F|B4|QQ]|K|1O8]]|$0|-4|2|10L|4|QQ|6|$9|@C4|B4|QP|4G|TZ|47|RL|5G|5R|4J]|7|-2|J|-4|K|1HH|8|-2]]|$0|10M|2|10N|4|3Y|6|$K|1HI|9|@3U|QQ|4G|3S|A7|CD|EF|64|GR|4F|2T|B4]|7|-2|J|-4|8|-2|L|@10O|10P]]]|$0|-4|2|10Q|4|10R|6|$9|@GJ|D6|H|5K|SN]|K|1O9]]|$0|-4|2|10S|4|C4|6|$9|@3U|4B|B4|QP|QQ|RL|36|C2|CD|3Y]|K|1OA]]|$0|10T|2|10U|4|5Q|6|$K|1HJ|9|@2M|5N|5O|8J|5R|5U|5Y|8L|5P|DV|AB|5V]|7|-2|J|-4|8|-2|L|@10V|10W|10X]]]|$0|-4|2|10Y|4|10H|6|$9|@KZ|K5|K4|I0|GJ|SL]|K|1OB]]|$0|-4|2|10Z|4|57|6|$9|@2Q|93|2U|25|GJ|H3|TZ|5K]|K|1OC]]|$0|-4|2|110|4|HC|6|$9|@5V|GR|2P|2Q|HD|HE|HA|HG|HH|8R|DS|I1|5P]|7|-2|J|-4|K|1HK|8|-2]]|$0|-4|2|111|4|A5|6|$9|@GA|55|I1|9L|FM|AA|A9|LP|AB|8L|A8|8J]|K|1OD]]|$0|-4|2|112|4|HF|6|$9|@8C|HS|HD|HE|DS|HA|HG|HT]|7|-2|J|-4|K|1HL|8|-2]]|$0|113|2|114|4|E1|6|$K|1HM|9|@GI|E0|E3|4V|66|48|JA|4H|64]|7|-2|J|-4|8|-2|L|@115|116|117]]]|$0|-4|2|118|4|119|6|$9|@2L|XM|XW]|7|-2|J|-4|K|1HN|8|-2]]|$0|-4|2|11A|4|BT|6|$K|1HO|9|@3P|16|3O|DA|3T|BV|2P|IO|1B|KJ]]]|$0|11B|2|11C|4|DR|6|$9|@16|DQ|HT|2W|DR|HS|15|49]|7|-2|J|-4|K|1HP|8|-2]]|$0|-4|2|11D|4|8C|6|$9|@5V|5R|HT|JY|QY|HS|49|HC|H7]|K|1OE]]|$0|-4|2|11E|4|ZZ|6|$9|@B4|19|9V|DL|Z|DK|AK|X]|K|1OF]]|$0|-4|2|11F|4|11G|6|$9|@DX|CO|ID|JH]|7|-2|J|-4|L|-2|K|1HQ|8|-2]]|$0|-4|2|11H|4|11I|6|@1OG]]|$0|-4|2|11J|4|11K|6|@1OH]]|$0|-4|2|11L|4|DX|6|$9|@JH|11G|2G|2X|8J|DV|NM|56|A6]|K|1OI]]|$0|-4|2|11M|4|CP|6|$9|@CO|ID|JH|8E|CS|IC|8D|JI|5H|49|CR|89]|K|1OJ]]|$0|-4|2|11N|4|11O|6|$9|@IP|J5|LD|3N]|7|-2|J|-4|L|-2|K|1HR|8|-2]]|$0|11P|2|11Q|4|2L|6|$K|1HS|9|@4H|1H|2R|2W|XW|XX|8C|4K|XM|4C|XY]|7|-2|J|-4|8|-2|L|@11R]]]|$0|-4|2|11S|4|6X|6|$9|@R|6Z|MU|H3|P9|30|N8|6V|6Y]|7|-2|J|-4|K|1HT|8|-2]]|$0|-4|2|11T|4|7I|6|$9|@2N|7G|51|A2|4X]|K|1OK]]|$0|-4|2|11U|4|DH|6|$9|@D2|FJ]|K|1OL]]|$0|-4|2|11V|4|R4|6|$9|@IX|IP|3N|EQ]|K|1OM]]|$0|-4|2|11W|4|4I|6|$9|@E1|3N|E2|J9|E3|4V|BL|48|49|4M|JA|69]|7|-2|J|-4|K|1HU|8|-2]]|$0|11X|2|11Y|4|ML|6|$K|1HV|9|@19|3Y|FU|QQ|QP|C4]|7|-2|J|-4|8|-2]]|$0|11Z|2|120|4|66|6|$9|@E1|63|E3|4V|4I|DX|6B|48|BL]|7|-2|J|-4|K|1HW|8|-2|L|@121|122]]]|$0|-4|2|123|4|4B|6|$9|@3U|DM|DK|9V|DL|4K|48|64|2T]|7|-2|J|-4|K|1HX|8|-2]]|$0|-4|2|124|4|6B|6|$9|@4H|2G|JI|JA|DX|66|9K|4C|D9|4I|O2]|7|-2|J|-4|K|1HY|8|-2]]|$0|125|2|126|4|J1|6|$9|@CI|81|A6|127|IW|8J|AB|8L]|7|-2|J|-4|K|1HZ|8|-2|L|@128]]]|$0|-4|2|129|4|74|6|$9|-2|7|-2|J|-4|L|-2|7Q|-4|K|1I0|8|-2]]|$0|12A|2|12B|4|ES|6|$9|@8Q|NE|3G|3I|8S|CD|CB]|K|1ON]]|$0|-4|2|12C|4|D|6|$K|1I1|9|@3S|G|5|A|C|I3]]]|$0|-4|2|12D|4|F0|6|$K|1I2|9|@3C|3E|3K|2V]]]|$0|-4|2|12E|4|J2|6|$9|@FM|81|GA|I1|A6|65|4M]|K|1OO]]|$0|-4|2|12F|4|12G|6|$9|@JX|81|AW|9L|2Q]|K|1OP]]|$0|-4|2|12H|4|XY|6|$9|@2L|XM|XW]|7|-2|J|-4|L|-2|K|1I3|8|-2]]|$0|-4|2|12I|4|JJ|6|$9|@9X|JI|IW|ID]|K|1OQ]]|$0|-4|2|12J|4|12K|6|$9|@89|8E|CO|12L|CS]|7|-2|J|-4|L|-2|K|1I4|8|-2]]|$0|-4|2|12M|4|T2|6|$K|1I5]]|$0|-4|2|12N|4|E6|6|$9|@5V|5R|48|8J|3N|LD|IW|J5|E5]|K|1OR]]|$0|-4|2|12O|4|CQ|6|$9|@CO|E9|8E|CS|ID|JJ]|K|1OS]]|$0|-4|2|12P|4|7U|6|$9|@7T|7S|7V|7W|3U|4A]|7|-2|J|-4|K|1I6|8|-2]]|$0|-4|2|12Q|4|12R|6|@1OT]]|$0|12S|2|12T|4|BP|6|$9|@AK|GI|U|F9|11|V|T|1T|GT]|7|-2|J|-4|L|@12U]|K|1I7|8|-2]]|$0|-4|2|12V|4|4G|6|$9|@3Y|DL|QQ|B4|4B|4F|4K|48|64|4C]|7|-2|J|-4|K|1I8|8|-2]]|$0|-4|2|12W|4|VR|6|$9|@GX|LN|2V|3C]|K|1OU]]|$0|-4|2|12X|4|63|6|$K|1I9|9|@BL|A6|4F|49|66|8J|48|DX|8L|J2|4L|FM|4I]]]|$0|-4|2|12Y|4|67|6|$9|@7F|CJ|8Q|6B|2G|38|8L|CK|4D|DX|56|3H]|7|-2|J|-4|K|1IA|8|-2]]|$0|-4|2|12Z|4|NX|6|$9|@5V|3T|75|NV|NW]|7|-2|J|-4|L|-2|K|1IB|8|-2]]|$0|-4|2|130|4|EK|6|$K|1IC|9|@95|EQ|5G|5D|8P]]]|$0|-4|2|131|4|JH|6|$K|1ID|9|@93|6B|D9|CP|ID|8E]]]|$0|-4|2|132|4|HP|6|$9|@15|16|2S|2P|1B|HQ|2U|2X|BT|2Y]|7|-2|J|-4|K|1IE|8|-2]]|$0|-4|2|133|4|IH|6|$9|@LF|C0|LQ|U|QP|WD|C4|RL|66|BP]|K|1OV]]|$0|134|2|135|4|P2|6|$K|1IF|9|@5E|JU|B|65|2X|EJ]]]|$0|-4|2|136|4|J5|6|$K|1IG|9|@8N|5G|IP|QA|LD|LE|H4|QN|LF|LG]]]|$0|-4|2|137|4|2O|6|$9|@19|1H|15|1G|38|1I|1K|1J]|K|1OW]]|$0|-4|2|138|4|139|6|$9|@47|45|OO|41]|7|-2|J|-4|L|-2|K|1IH|8|-2]]|$0|-4|2|13A|4|A3|6|$9|@FT|A2|FJ]|7|-2|J|-4|K|1II|8|-2]]|$0|-4|2|13B|4|F|6|$K|1IJ|9|@95|9E|E|IP|LD|J5]]]|$0|-4|2|13C|4|7Z|6|$9|@37|AX|FT]|K|1OX]]|$0|-4|2|13D|4|O9|6|$9|@O8|O6|O5|O7]|7|-2|J|-4|L|-2|K|1IK|8|-2]]|$0|-4|2|13E|4|3G|6|$9|@8K|8S|3I|38|3C|AE|2O|8P|6B]|K|1OY]]|$0|-4|2|13F|4|5J|6|$K|1IL|9|@5D|5H|48|5G|4H|5B|66|39]]]|$0|-4|2|13G|4|NK|6|$9|@2Q|57|25|30|2V]|K|1OZ]]|$0|-4|2|13H|4|JK|6|$9|@2H|CQ|ID]|K|1P0]]|$0|-4|2|13I|4|41|6|$K|1IM|9|@3U|3S|3X|EZ|4Q|4Y|9X|40|3W|FJ|DH]|7|-2|J|-4|8|-2]]|$0|13J|2|13K|4|3X|6|$9|@9X|FU|9C|A1|4A|4B]|7|-2|J|-4|K|1IN|8|-2|L|@13L]]]|$0|13M|2|13N|4|A1|6|$K|1IO|9|@2L|3X|9C|51]|7|-2|J|-4|L|@13O]|8|-2]]|$0|-4|2|13P|4|LF|6|$9|@5G|J5|QA|QN|C0|IP|6C|IH|LD|39]|7|-2|J|-4|K|1IP|8|-2]]|$0|-4|2|13Q|4|1A|6|$9|@B4|1C|9F|FU|12|4R|4Q|9G]|K|1P1]]|$0|-4|2|13R|4|4W|6|$9|@3U|2N|51|4X|7I|7K|7G]|K|1P2]]|$0|13S|2|13T|4|KZ|6|$K|1IQ|9|@23|19|49|K4|MB|L0|RL|8A]|7|-2|J|-4|8|-2]]|$0|-4|2|13U|4|2H|6|$9|@CO|2H|NE|CS|5H|JK|JJ]|K|1P3]]|$0|-4|2|13V|4|13W|6|$9|@JH|5D|IC|ID|CS]|K|1P4]]|$0|-4|2|13X|4|CO|6|$9|@89|8E|8D|CS|ID|CP|JH|2H|CQ|CR]|K|1P5]]|$0|13Y|2|13Z|4|L9|6|$K|1IR|9|@3K|I5|ES|A3]]]|$0|140|2|141|4|5X|6|$9|@5Q|5O|5R|5U|3O|EQ|8J|5V]|7|-2|J|-4|K|1IS|8|-2|L|@142]]]|$0|-4|2|143|4|4U|6|$9|@3S|5Q|2N|3T|4Y|8L|7G]|7|-2|J|-4|K|1IT|8|-2]]|$0|-4|2|144|4|145|6|$9|@5O|69|93|66|36|63|5R|E1]|7|-2|J|-4|L|-2|K|1IU|8|-2]]|$0|-4|2|146|4|BS|6|$9|@3T]|7|-2|J|-4|L|-2|K|1IV|8|-2]]|$0|147|2|148|4|GI|6|$9|@94|AK|E1|1T|V|BP|4V|90|GH|IG]|7|-2|J|-4|K|1IW|8|-2|L|@149]]]|$0|-4|2|14A|4|14B|6|$K|1IX]]|$0|14C|2|14D|4|14E|6|$9|@15|CN|9V|3U|EZ|94|3S|7F|IX|2X|FT|P2|24|BZ|5Q|9D|CK|2L|63|4Y|QN|2Q|JH]|7|-2|J|-4|L|-2|K|1IY|8|-2]]|$0|-4|2|14F|4|A0|6|$K|1IZ|9|@3S|3P|2L|D6|AX|9Y|A3|A2|FJ]|7|@$1R|1J0|2|14G|4|14H|1U|1J1|1V|1J2|1W|1X|0|14I|1Z|1J3|20|1J4|21|22]]|J|-4|8|-2]]|$0|-4|2|14J|4|5N|6|$K|1J5|9|@5V|5O|QY|I1|93|8C|U]]]|$0|-4|2|14K|4|4K|6|$9|@3U|DM|DK|9U|9V|DL|4B|4H|4G|4J|3Y|64|4F|2T|ML|48]|K|1P6]]|$0|-4|2|14L|4|KV|6|$9|@TZ|57|5G|82|5E|GJ|I6|30|7O|C4|BF|25]|K|1P7]]|$0|-4|2|14M|4|14N|6|$9|@AW|2R]|K|1P8]]|$0|14O|2|14P|4|NE|6|$9|@2H|3F|ML]|7|-2|J|-4|K|1J6|8|-2]]|$0|-4|2|14Q|4|D7|6|$K|1J7|9|@D6|OO|8K]|7|-2|J|-4|8|-2|L|@14R]]]|$0|14S|2|14T|4|8K|6|$9|@C9|8S|3F|3I|3G|38|56|RA|8P|3D|CC|37|CB|8Q]|7|-2|J|-4|L|@14U]|K|1J8|8|-2]]|$0|14V|2|14W|4|A8|6|$9|@7F|16|25|B|NA|AA|8L|48|8J|A6|BL|39|E5|J5]|7|-2|J|-4|K|1J9|8|-2|L|@14X]]]|$0|14Y|2|14Z|4|4Y|6|$9|@7F|2N|9X|C2|2W|4U|4X|C5|4C|F]|7|-2|J|-4|K|1JA|8|-2|L|@150]]]|$0|-4|2|151|4|AL|6|$9|@4S|4V|AJ|23|1A]|K|1P9]]|$0|152|2|153|4|127|6|$9|@2P|CI|KR|81|16|5Z|DA]|7|-2|J|-4|K|1JB|8|-2|L|@154]]]|$0|-4|2|155|4|156|6|$9|@16|3M|3O|CK|CI|D8]|7|-2|J|-4|L|-2|K|1JC|8|-2]]|$0|-4|2|157|4|158|6|$9|@VD]|K|1PA]]|$0|159|2|15A|4|Q6|6|$K|1JD|9|@IX|R4|9L|5C|5Y|A5|Q5|55|NK|8I|9M]|7|-2|J|-4|8|-2|L|@15B]]]|$0|-4|2|15C|4|B|6|$9|@BF|F|IP|5B|LQ|P2]|7|-2|J|-4|L|@]|K|1JE|8|-2]]|$0|-4|2|15D|4|95|6|$K|1JF|9|@B|GJ|IG|I6]|7|-2|J|-4|8|-2]]|$0|-4|2|15E|4|15F|6|$9|@3S|3P|9G]|7|-2|J|-4|L|-2|K|1JG|8|-2]]|$0|-4|2|15G|4|C9|6|$9|@3F|CE|8P|3D|CC|CF|8K|38|CB|3C|3G]|K|1PB]]|$0|-4|2|15H|4|AX|6|$K|1JH|9|@FW|SL|8I]]]|$0|-4|2|15I|4|MU|6|$9|@H3|26|48|25|57|64|27|8Z|90]|K|1PC]]|$0|-4|2|15J|4|9Y|6|$K|1JI|9|@3S|94|3Y|9X|A0|A2|FJ|A3|51|41]|7|-2|J|-4|8|-2]]|$0|15K|2|15L|4|15M|6|$9|@E1|E2|E3|4V|5W]|7|-2|J|-4|K|1JJ|8|@1JK]]]|$0|-4|2|15N|4|AS|6|$9|@XW|AR]|K|1PD]]|$0|15O|2|15P|4|24|6|$K|1JL|9|@23|19|8A|OH|89|9R|9P|26|8I]|7|@$1R|1JM|2|US|4|UT|1U|1JN|1V|1JO|1W|1X|0|15Q|1Z|1JP|20|1JQ|21|22]]|J|-4|8|-2]]|$0|-4|2|15R|4|OH|6|$K|1JR|9|@19|24|8A|89]|7|-2|J|-4|8|-2]]|$0|15S|2|15T|4|AF|6|$9|@7F|2S|3H|2P|I6|4H|IG|1B|GT]|7|-2|J|-4|L|@15U|15V]|K|1JS|8|-2]]|$0|15W|2|15X|4|XM|6|$K|1JT|9|@2L|4H|36|XW|RM|A0|XY]|7|-2|J|-4|8|-2|L|@15Y]]]|$0|15Z|2|160|4|75|6|$K|1JU|9|@5V|5Q|5N|5R|5U|93|5X|L9|72|5O|8L|5W]|7|-2|J|-4|8|-2|L|@161]]]|$0|-4|2|162|4|MJ|6|$K|1JV|9|@C9|EQ|3F|EP|CD]]]|$0|-4|2|163|4|BE|6|$9|@GJ|KV|I5|30|2U|7O|2S|57|2Y|2V|10R]|K|1PE]]|$0|-4|2|164|4|165|6|$9|@2P|18|95|5E]|7|-2|J|-4|L|-2|K|1JW|8|-2]]|$0|166|2|167|4|28|6|$K|1JX|9|@23|1T|V|9H|FT|4S]|7|@$1R|1JY|2|1S|4|1T|1U|1JZ|1V|1K0|1W|1X|0|168|1Z|1K1|20|1K2|21|22]]|J|-4|8|-2|L|@169|16A|16B]]]|$0|-4|2|16C|4|R8|6|$9|@19|AX|2R|1G|AW|2W|1J]|7|-2|J|-4|K|1K3|8|-2]]|$0|-4|2|16D|4|JV|6|$9|@15|5E|R8|VM|4K|2Z|JU|JT]|K|1PF]]|$0|-4|2|16E|4|2Z|6|$9|@15|16|5E|JV|2T|2W|48]|7|-2|J|-4|K|1K4|8|-2]]|$0|-4|2|16F|4|9X|6|$K|1K5|9|@4Y|CR|47|AK|LQ]]]|$0|-4|2|16G|4|7J|6|$K|1K6|9|@2L|2N|7G|45|51|7K|4X]|7|-2|J|-4|8|-2]]|$0|-4|2|16H|4|40|6|$K|1K7|9|@3U|3S|BP|41|D2]|7|-2|J|-4|8|-2]]|$0|-4|2|16I|4|E|6|$K|1K8|9|@8N|2V|H|I|F|A|G|D|2G|5|A8|9E]]]|$0|-4|2|16J|4|4R|6|$7|-2|J|-4|K|1K9|8|-2|9|@AK|10|T6|1A|1C|9H|B4]]]|$0|-4|2|16K|4|1L|6|$9|@19|ML|QP|RL|82|CD|C4|IH]|7|-2|J|-4|K|1KA|8|-2]]|$0|-4|2|16L|4|16M|6|$9|@4D|C9]|7|-2|J|-4|K|1KB|8|-2]]|$0|-4|2|16N|4|HD|6|$9|@5V|2W|DR|HE|HF|DS|HA|HG|HC|HH]|K|1PG]]|$0|16O|2|16P|4|I|6|$K|1KC|9|@2X|8N|30|5P|7F|48|8J|A8|5H|H|2V|2G|37|3A|2M|4D]|7|-2|J|-4|L|@16Q|16R]|8|-2]]|$0|-4|2|16S|4|96|6|$9|@19|CO|4V|CR|2T]|K|1PH]]|$0|16T|2|6S|4|16|6|$K|1KD|9|@2X|F8|48|2M|8N]|7|-2|J|-4|8|-2|L|@16U]]]|$0|-4|2|16V|4|7W|6|$9|@7T|7U|7V|7S|4A|4E]|7|-2|J|-4|K|1KE|8|-2]]|$0|-4|2|16W|4|4L|6|$9|@DM|DK|45|9V|5R|48|63|2T|65|BL|64|A6]|7|-2|J|-4|K|1KF|8|-2]]|$0|16X|2|16Y|4|QN|6|$K|1KG|9|@BZ|8N|2M|5G|IP|C0|16|25|IH|LF|16Z|J5|4I|6C]|7|-2|J|-4|8|-2|L|@170]]]|$0|-4|2|171|4|16Z|6|$9|@5G|IP|C0|QA|QN|LF|6Z|69|R|Q|8Z]|7|-2|J|-4|K|1KH|8|-2]]|$0|-4|2|172|4|HS|6|$9|@HT|2W|DR|MC|8C]|K|1PI]]|$0|-4|2|173|4|O6|6|$9|@O5|O7]|7|-2|J|-4|L|-2|K|1KI|8|-2]]|$0|-4|2|174|4|1K|6|$9|@19|1G|1I|1J|2O|1L]|7|-2|J|-4|L|-2|K|1KJ|8|-2]]|$0|-4|2|175|4|WD|6|$K|1KK|9|@9D|19|DK|9U|1L|4T|IH|24|RL|QP]]]|$0|-4|2|176|4|F7|6|$9|@6P|1B]|K|1PJ]]|$0|-4|2|177|4|FI|6|$9|@D2|FJ|7U|FH|7V]|7|-2|J|-4|K|1KL|8|-2]]|$0|-4|2|178|4|12L|6|$9|@CO|89|8E|CS]|7|-2|J|-4|L|-2|K|1KM|8|-2]]|$0|-4|2|179|4|9U|6|$K|1KN|9|@3U|9D|DM|DK|DL|4B|4K|WD|8L|64|A7|4F|3E|4T|48|C0|4G]]]]";

/***/ }),

/***/ "./src/blocks/05-vibemap-embed-events/block.json":
/*!*******************************************************!*\
  !*** ./src/blocks/05-vibemap-embed-events/block.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"blocks/vibemap-embed-events","title":"Vibemap Events Embed Blocks","textdomain":"gutenberg-examples","icon":"location-alt","category":"layout","keywords":["map","listings","events"],"example":{"attributes":{"content":"Hello world","embed":"events","cities":["peoria"],"categories":[],"vibes":[],"align":"center","class":"vibemap-embed iframe","frameborder":"0","height":500,"width":"100%","scrolling":"yes"}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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