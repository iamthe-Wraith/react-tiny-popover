"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover = exports.usePopover = exports.ArrowContainer = exports.useArrowContainer = void 0;
var react_1 = __importStar(require("react"));
var PopoverPortal_1 = require("./PopoverPortal");
var util_1 = require("./util");
var usePopover_1 = require("./usePopover");
Object.defineProperty(exports, "usePopover", { enumerable: true, get: function () { return usePopover_1.usePopover; } });
var useMemoizedArray_1 = require("./useMemoizedArray");
var useArrowContainer_1 = require("./useArrowContainer");
Object.defineProperty(exports, "useArrowContainer", { enumerable: true, get: function () { return useArrowContainer_1.useArrowContainer; } });
var ArrowContainer_1 = require("./ArrowContainer");
Object.defineProperty(exports, "ArrowContainer", { enumerable: true, get: function () { return ArrowContainer_1.ArrowContainer; } });
exports.Popover = react_1.forwardRef(function (_a, externalRef) {
    var isOpen = _a.isOpen, children = _a.children, content = _a.content, _b = _a.reposition, reposition = _b === void 0 ? true : _b, containerStyle = _a.containerStyle, _c = _a.containerParent, containerParent = _c === void 0 ? window.document.body : _c, _d = _a.containerClassName, containerClassName = _d === void 0 ? 'react-tiny-popover-container' : _d, contentLocation = _a.contentLocation, _e = _a.positions, externalPositions = _e === void 0 ? util_1.Constants.DEFAULT_POSITIONS : _e, _f = _a.padding, padding = _f === void 0 ? 0 : _f, _g = _a.align, align = _g === void 0 ? util_1.Constants.DEFAULT_ALIGN : _g, _h = _a.boundaryInset, boundaryInset = _h === void 0 ? 0 : _h, _j = _a.boundaryTolerance, boundaryTolerance = _j === void 0 ? 0 : _j, onClickOutside = _a.onClickOutside;
    var positions = useMemoizedArray_1.useMemoizedArray(externalPositions);
    var childRef = react_1.useRef();
    var _k = react_1.useState({
        isPositioned: false,
        align: align,
        nudgedLeft: 0,
        nudgedTop: 0,
        position: positions[0],
        padding: padding,
        childRect: util_1.Constants.EMPTY_CLIENT_RECT,
        popoverRect: util_1.Constants.EMPTY_CLIENT_RECT,
        parentRect: util_1.Constants.EMPTY_CLIENT_RECT,
        boundaryInset: boundaryInset,
        boundaryTolerance: boundaryTolerance,
    }), popoverState = _k[0], setPopoverState = _k[1];
    var onPositionPopover = react_1.useCallback(function (popoverState) { return setPopoverState(popoverState); }, []);
    var _l = usePopover_1.usePopover({
        childRef: childRef,
        containerClassName: containerClassName,
        containerParent: containerParent,
        contentLocation: contentLocation,
        positions: positions,
        align: align,
        padding: padding,
        boundaryTolerance: boundaryTolerance,
        boundaryInset: boundaryInset,
        reposition: reposition,
        onPositionPopover: onPositionPopover,
    }), positionPopover = _l[0], popoverRef = _l[1];
    react_1.useLayoutEffect(function () {
        var shouldUpdatePopover = true;
        var updatePopover = function () {
            if (isOpen) {
                if (childRef.current) {
                    var childRect = childRef.current.getBoundingClientRect();
                    var popoverRect = popoverRef.current.getBoundingClientRect();
                    if (!util_1.rectsAreEqual(childRect, {
                        top: popoverState.childRect.top,
                        left: popoverState.childRect.left,
                        width: popoverState.childRect.width,
                        height: popoverState.childRect.height,
                        bottom: popoverState.childRect.top + popoverState.childRect.height,
                        right: popoverState.childRect.left + popoverState.childRect.width,
                    }) ||
                        popoverRect.width !== popoverState.popoverRect.width ||
                        popoverRect.height !== popoverState.popoverRect.height) {
                        positionPopover();
                    }
                }
                if (shouldUpdatePopover) {
                    window.requestAnimationFrame(updatePopover);
                }
            }
            else {
                setPopoverState(function (prev) { return (__assign(__assign({}, prev), { isPositioned: false })); });
            }
        };
        window.requestAnimationFrame(updatePopover);
        return function () {
            shouldUpdatePopover = false;
        };
    }, [
        isOpen,
        popoverRef,
        popoverState.childRect.width,
        popoverState.childRect.height,
        popoverState.childRect.top,
        popoverState.childRect.left,
        popoverState.popoverRect.width,
        popoverState.popoverRect.height,
        positionPopover,
        align,
        padding,
        positions,
        reposition,
        boundaryInset,
    ]);
    react_1.useEffect(function () {
        var popoverElement = popoverRef.current;
        var style = __assign(__assign({}, util_1.Constants.DEFAULT_CONTAINER_STYLE), containerStyle);
        if (popoverState.isPositioned) {
            Object.assign(popoverElement.style, style);
        }
        return function () {
            Object.keys(style).forEach(function (key) { return (popoverElement.style[key] = null); });
        };
    }, [popoverState.isPositioned, containerStyle, popoverRef]);
    var handleOnClickOutside = react_1.useCallback(function (e) {
        if (isOpen &&
            !popoverRef.current.contains(e.target) &&
            !childRef.current.contains(e.target)) {
            onClickOutside === null || onClickOutside === void 0 ? void 0 : onClickOutside(e);
        }
    }, [isOpen, onClickOutside, popoverRef]);
    var handleWindowResize = react_1.useCallback(function () {
        window.requestAnimationFrame(positionPopover);
    }, [positionPopover]);
    react_1.useEffect(function () {
        window.addEventListener('click', handleOnClickOutside);
        window.addEventListener('resize', handleWindowResize);
        return function () {
            window.removeEventListener('click', handleOnClickOutside);
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleOnClickOutside, handleWindowResize]);
    var handleRef = react_1.useCallback(function (node) {
        childRef.current = node;
        if (externalRef != null) {
            if (typeof externalRef === 'object') {
                externalRef.current = node;
            }
            else if (typeof externalRef === 'function') {
                externalRef(node);
            }
        }
    }, [externalRef]);
    var renderChild = function () {
        return react_1.default.cloneElement(children, {
            ref: handleRef,
        });
    };
    var renderPopover = function () {
        if (!isOpen)
            return null;
        return (react_1.default.createElement(PopoverPortal_1.PopoverPortal, { element: popoverRef.current, container: containerParent }, typeof content === 'function' ? content(popoverState) : content));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        renderChild(),
        renderPopover()));
});
//# sourceMappingURL=Popover.js.map