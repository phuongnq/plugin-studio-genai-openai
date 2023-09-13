const React = craftercms.libs.React;
const { useState } = craftercms.libs.React;
const { useSelector, useDispatch } = craftercms.libs.ReactRedux;
const { Tooltip, DialogContent, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, DialogActions, Button: Button$1, Box, Card, CardHeader, CardMedia, DialogContentText, IconButton: IconButton$1 } = craftercms.libs.MaterialUI;
const IconButton = craftercms.libs.MaterialUI.IconButton && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.IconButton, 'default') ? craftercms.libs.MaterialUI.IconButton['default'] : craftercms.libs.MaterialUI.IconButton;
const Button = craftercms.libs.MaterialUI.Button && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Button, 'default') ? craftercms.libs.MaterialUI.Button['default'] : craftercms.libs.MaterialUI.Button;
const SystemIcon = craftercms.components.SystemIcon && Object.prototype.hasOwnProperty.call(craftercms.components.SystemIcon, 'default') ? craftercms.components.SystemIcon['default'] : craftercms.components.SystemIcon;
const { createAction } = craftercms.libs.ReduxToolkit;
const Menu = craftercms.libs.MaterialUI.Menu && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Menu, 'default') ? craftercms.libs.MaterialUI.Menu['default'] : craftercms.libs.MaterialUI.Menu;
const MenuItem = craftercms.libs.MaterialUI.MenuItem && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.MenuItem, 'default') ? craftercms.libs.MaterialUI.MenuItem['default'] : craftercms.libs.MaterialUI.MenuItem;
const { get, post } = craftercms.utils.ajax;
const ToolsPanelListItemButton = craftercms.components.ToolsPanelListItemButton && Object.prototype.hasOwnProperty.call(craftercms.components.ToolsPanelListItemButton, 'default') ? craftercms.components.ToolsPanelListItemButton['default'] : craftercms.components.ToolsPanelListItemButton;
const Skeleton = craftercms.libs.MaterialUI.Skeleton && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Skeleton, 'default') ? craftercms.libs.MaterialUI.Skeleton['default'] : craftercms.libs.MaterialUI.Skeleton;
const ContentCopyRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ContentCopyRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ContentCopyRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ContentCopyRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ContentCopyRounded');
const { copyToClipboard } = craftercms.utils.system;
const ListItem = craftercms.libs.MaterialUI.ListItem && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.ListItem, 'default') ? craftercms.libs.MaterialUI.ListItem['default'] : craftercms.libs.MaterialUI.ListItem;
const List = craftercms.libs.MaterialUI.List && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.List, 'default') ? craftercms.libs.MaterialUI.List['default'] : craftercms.libs.MaterialUI.List;
const FormControl = craftercms.libs.MaterialUI.FormControl && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.FormControl, 'default') ? craftercms.libs.MaterialUI.FormControl['default'] : craftercms.libs.MaterialUI.FormControl;

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
function useActiveSiteId() {
  return useSelector((state) => state.sites.active);
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
function useEnv() {
  return useSelector((state) => state.env);
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
// endregion
// region Legacy Form
const showEditDialog = /*#__PURE__*/ createAction('SHOW_EDIT_DIALOG');
const newContentCreationComplete = /*#__PURE__*/ createAction('NEW_CONTENT_CREATION_COMPLETE');
// endregion
// region Widget Dialog
const showWidgetDialog = /*#__PURE__*/ createAction('SHOW_WIDGET_DIALOG');
// endregion

function GenerateContent(props) {
    // Note: All toolbar child components receive the current preview item as a prop automatically. If this component will be used elsewhere, use useCurrentPreviewItem() hook.
    var item = props.item, useIcon = props.useIcon;
    var dispatch = useDispatch();
    useActiveSiteId();
    useEnv();
    var label = 'Generate Content'; //readonly ? 'View' : 'Edit';
    var iconId = item
        ? '@mui/icons-material/PsychologyRounded'
        : '@mui/icons-material/HourglassEmptyOutlined';
    var handleClick = function (event) {
        dispatch(showWidgetDialog({
            title: 'AI Generated Content Assistant',
            extraProps: props,
            widget: {
                id: 'org.rd.plugin.openai.dialog'
            }
        }));
    };
    return useIcon ? (React.createElement(Tooltip, { title: item ? "".concat(label) : '' },
        React.createElement(IconButton, { size: "small", onClick: handleClick, disabled: !item },
            React.createElement(SystemIcon, { icon: { id: iconId } })))) : (React.createElement(Button, { size: "small", variant: "text", onClick: handleClick, disabled: !item }, label));
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const palette = {
  white: '#fff',
  black: '#000',
  blue: {
    tint: '#409CFF',
    main: '#007AFF',
    shade: '#0040DD',
    highlight: 'rgba(0, 122, 255, .1)',
    highlightHex: '#E6F2FF'
  },
  green: { tint: '#30DB5B', main: '#34C759', shade: '#248A3D', highlight: '#EBFAEF' },
  indigo: { tint: '#7D7AFF', main: '#5856D6', shade: '#3634A3' },
  orange: { tint: '#FFB340', main: '#FF9500', shade: '#C93400' },
  pink: { tint: '#FF6482', main: '#FF2D55', shade: '#D30F45' },
  purple: { tint: '#DA8FFF', main: '#AF52DE', shade: '#8944AB' },
  red: { tint: '#FF6961', main: '#FF3B30', shade: '#D70015', highlight: '#FFEBEA' },
  teal: { tint: '#70D7FF', main: '#5AC8FA', shade: '#0071A4' },
  yellow: { tint: '#FFD426', main: '#FFCC00', shade: '#A05A00', highlight: '#FFFAE6' },
  gray: {
    light0: '#FAFAFA',
    light1: '#F3F3F3',
    light2: '#F2F2F7',
    light3: '#EBEBF0',
    light4: '#E5E5EA',
    light5: '#D8D8DC',
    light6: '#D1D1D6',
    light7: '#C7C7CC',
    medium1: '#BCBCC0',
    medium2: '#AEAEB2',
    medium3: '#8E8E93',
    medium4: '#7C7C80',
    medium5: '#6C6C70',
    medium6: '#636366',
    medium7: '#545456',
    dark1: '#48484A',
    dark2: '#444446',
    dark3: '#3A3A3C',
    dark4: '#363638',
    dark5: '#2C2C2E',
    dark6: '#242426',
    dark7: '#1C1C1E'
  }
};

/*
 * Copyright (C) 2007-2023 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var HttpUtils = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            get(url).subscribe({
                next: function (response) {
                    resolve(response);
                },
                error: function (e) {
                    reject(e);
                }
            });
        });
    },
    post: function (url, body, headers) {
        return new Promise(function (resolve, reject) {
            post(url, body, headers).subscribe({
                next: function (response) {
                    resolve(response);
                },
                error: function (e) {
                    reject(e);
                }
            });
        });
    }
};

/*
 * Copyright (C) 2007-2023 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var API_LIST_QUICK_CREATE_CONTENT = '/api/2/content/list_quick_create_content.json';
var fetchQuickCreateList = function (authoringBase, siteId) { return __awaiter(void 0, void 0, void 0, function () {
    var url, res;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                url = "".concat(authoringBase).concat(API_LIST_QUICK_CREATE_CONTENT, "?siteId=").concat(siteId);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, HttpUtils.get(url)];
            case 2:
                res = _b.sent();
                if (res.status === 200 && ((_a = res.response) === null || _a === void 0 ? void 0 : _a.items)) {
                    return [2 /*return*/, res.response.items];
                }
                return [2 /*return*/, []];
            case 3:
                _b.sent();
                return [2 /*return*/, []];
            case 4: return [2 /*return*/];
        }
    });
}); };

function QuickCreateContent(props) {
    var _this = this;
    var authoringBase = useEnv().authoringBase;
    var siteId = useActiveSiteId();
    var item = props.item;
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var _b = React.useState([]), quickCreateItems = _b[0], setQuickCreateItems = _b[1];
    React.useEffect(function () {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchQuickCreateList(authoringBase, siteId)];
                    case 1:
                        items = _a.sent();
                        console.log(items);
                        setQuickCreateItems(items);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    var open = Boolean(anchorEl);
    var dispatch = useDispatch();
    var label = 'Quick Create with AI Assistant';
    var iconId = '@mui/icons-material/PostAddRounded';
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var onMenuClose = function () { return setAnchorEl(null); };
    var onQuickCreateItemSelected = function (props) {
        onMenuClose();
        dispatch(showEditDialog(__assign(__assign({}, props), { inProgress: false, onSaveSuccess: newContentCreationComplete() })));
    };
    var onItemSelected = function (_a) {
        var contentTypeId = _a.contentTypeId, path = _a.path;
        var today = new Date();
        var formatPath = path
            .replace('{year}', "".concat(today.getFullYear()))
            .replace('{month}', ('0' + (today.getMonth() + 1)).slice(-2));
        onQuickCreateItemSelected === null || onQuickCreateItemSelected === void 0 ? void 0 : onQuickCreateItemSelected({
            path: formatPath,
            contentTypeId: contentTypeId,
            isNewContent: true,
            authoringBase: authoringBase
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: item ? "".concat(label) : '' },
            React.createElement(IconButton, { size: "small", onClick: handleClick, disabled: !item, sx: {
                    color: palette.purple.main
                } },
                React.createElement(SystemIcon, { icon: { id: iconId } }))),
        React.createElement(Menu, { anchorEl: anchorEl, open: open, onClose: onMenuClose, sx: {
                paddingTop: 0,
                minWidth: '140px'
            } }, quickCreateItems.map(function (item) { return (React.createElement(MenuItem, { key: item.path, onClick: function () { return onItemSelected(item); }, sx: { fontSize: '14px' } },
            item.label,
            " with AI assistant")); }))));
}

/*
 * Copyright (C) 2007-2023 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
function GenerateContentPanelButton(props) {
    var dispatch = useDispatch();
    var _a = props.title, title = _a === void 0 ? 'Generate Content' : _a, _b = props.icon, icon = _b === void 0 ? { id: '@mui/icons-material/PsychologyRounded' } : _b;
    var handleClick = function (event) {
        dispatch(showWidgetDialog({
            title: 'AI Generated Content Assistant',
            extraProps: props,
            widget: {
                id: 'org.rd.plugin.openai.dialog'
            }
        }));
    };
    return (React.createElement(ToolsPanelListItemButton, { icon: icon, title: title, onClick: handleClick }));
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const showSystemNotification = /*#__PURE__*/ createAction('SHOW_SYSTEM_NOTIFICATION');

function AnswerSkeletonItem() {
    return (React.createElement(ListItem, { style: { height: '25px' } },
        React.createElement(Skeleton, { variant: "rectangular", width: "20px" }),
        React.createElement(Skeleton, { variant: "text", style: { margin: '0 10px', width: "".concat(rand(40, 70), "%") } })));
}
function AnswerSkeletonList(props) {
    var _a = props.numOfItems, numOfItems = _a === void 0 ? 5 : _a;
    var items = new Array(numOfItems).fill(null);
    return (React.createElement(List, { component: "nav", disablePadding: true }, items.map(function (value, i) { return (React.createElement(AnswerSkeletonItem, { key: i })); })));
}
var AnswerSkeleton = React.memo(function (_a) {
    var _b = _a.numOfItems, numOfItems = _b === void 0 ? 5 : _b, _c = _a.renderBody, renderBody = _c === void 0 ? false : _c;
    return (React.createElement("div", null, renderBody && React.createElement(AnswerSkeletonList, { numOfItems: numOfItems })));
});
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function GenerateContentDialog(props) {
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var _a = useState(); _a[0]; var setError = _a[1];
    var _b = useState(false), fetching = _b[0], setFetching = _b[1];
    var _c = useState([]), generatedContent = _c[0], setGeneratedContent = _c[1];
    var _d = React.useState('Write a story'), ask = _d[0], setAsk = _d[1];
    var _e = React.useState('complete'), mode = _e[0], setMode = _e[1];
    var PLUGIN_SERVICE_BASE = '/studio/api/2/plugin/script/plugins/org/rd/plugin/openai/openai';
    var handleAskChange = function (event) {
        setAsk(event.target.value);
    };
    var handleCopyResult = function (index) {
        copyToClipboard(generatedContent[index]);
        dispatch(showSystemNotification({
            message: 'Copied',
            options: { variant: 'success', autoHideDuration: 1500 }
        }));
    };
    var handleGenerate = function () {
        var serviceUrl = "".concat(PLUGIN_SERVICE_BASE, "/gentext.json?siteId=").concat(siteId, "&ask=").concat(ask, "&mode=").concat(mode);
        setFetching(true);
        get(serviceUrl).subscribe({
            next: function (response) {
                console.log(response);
                setFetching(false);
                setGeneratedContent(__spreadArray([], response.response.result, true));
            },
            error: function (e) {
                var _a, _b;
                console.error(e);
                setFetching(false);
                setError((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.response) !== null && _b !== void 0 ? _b : { code: '?', message: 'Unknown Error. Check browser console.' });
            }
        });
    };
    function handleModeChange(event, value) {
        setMode(value);
        setGeneratedContent([]);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(DialogContent, null,
            React.createElement(FormControl, null,
                React.createElement(FormLabel, { id: "demo-row-radio-buttons-group-label" }, "Generate"),
                React.createElement(RadioGroup, { row: true, "aria-labelledby": "demo-row-radio-buttons-group-label", name: "row-radio-buttons-group", value: mode, onChange: handleModeChange },
                    React.createElement(FormControlLabel, { value: "complete", control: React.createElement(Radio, null), label: "Text" }),
                    React.createElement(FormControlLabel, { value: "image", control: React.createElement(Radio, null), label: "Image" }))),
            React.createElement(FormControl, { margin: "normal", fullWidth: true },
                React.createElement(TextField, { defaultValue: "", id: "outlined-basic", label: "How can I help?", variant: "outlined", onChange: handleAskChange })),
            React.createElement(DialogActions, null,
                React.createElement(Button$1, { onClick: handleGenerate, variant: "outlined", sx: { mr: 1 } }, "Generate")),
            mode === 'image' ? (React.createElement(Box, { display: "flex" },
                React.createElement("section", null,
                    React.createElement("div", null, fetching === false ? (generatedContent.map(function (item) { return [
                        React.createElement(Card, null,
                            React.createElement(CardHeader, null),
                            React.createElement(CardMedia, { image: item, sx: { width: '500px', height: '500px', margin: '30px', m: '15px', border: '1px solid' } }),
                            React.createElement("a", { download: item, href: item, target: "_blank", style: { paddingBottom: '10px', paddingTop: '20px' } }, "Download this image"))
                    ]; })) : (React.createElement(React.Fragment, null)))))) : (React.createElement(DialogContentText, null,
                React.createElement("ol", null, generatedContent &&
                    Object.values(generatedContent).map(function (content, contentIndex) {
                        return (React.createElement("li", null,
                            React.createElement(TextField, { sx: {
                                    color: 'rgb(0, 122, 255)',
                                    width: '90%',
                                    'padding-bottom': '10px',
                                    'padding-right': '20px',
                                    mb: 2
                                }, value: content, multiline: true }),
                            React.createElement(IconButton$1, { onClick: function () { return handleCopyResult(contentIndex); }, color: "primary", "aria-label": "Copy to Clipboard", component: "label" },
                                React.createElement(ContentCopyRoundedIcon, null))));
                    })))),
            React.createElement(AnswerSkeleton, { numOfItems: 5, renderBody: fetching }))));
}

var plugin = {
    locales: undefined,
    scripts: undefined,
    stylesheets: undefined,
    id: 'org.rd.plugin.openai',
    widgets: {
        'org.rd.plugin.openai.QuickCreateContent': QuickCreateContent,
        'org.rd.plugin.openai.GenerateContent': GenerateContent,
        'org.rd.plugin.openai.GenerateContentPanelButton': GenerateContentPanelButton,
        'org.rd.plugin.openai.dialog': GenerateContentDialog
    }
};

export { GenerateContent, GenerateContentDialog, plugin as default };
