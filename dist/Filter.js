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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IonButton, IonCheckbox, IonItem, IonLabel, IonRadio, IonRange, IonSegment, IonSegmentButton } from '@ionic/react';
import { useEffect, useState } from 'react';
import { UtilsService } from './services/utils.service';
import './Filter.css';
var initialized = false;
var utils = new UtilsService();
export var Filter = function (_a) {
    var filterData = _a.filterData, callback = _a.callback /*, closeFunction */;
    var _b = useState(filterData), data = _b[0], setData = _b[1];
    var rawData = __assign({}, filterData);
    // const closeMe = () => {
    // 	closeFunction()
    // }
    useEffect(function () {
        // console.log('(((((((((((((((((((((((((((((((');
        // console.log('DATA CHANGED', data);
        // console.log(')))))))))))))))))))))))))))))))');
        if (initialized) {
            callback(data);
        }
    }, [data]);
    useEffect(function () {
        // console.log('========filterData is', filterData);
        // SET DEFAULT VALUES
        var newData = __assign({}, data);
        {
            Object.keys(data).map(function (key /*, index: number*/) {
                var item = data[key];
                switch (item.type) {
                    case 'checkbox':
                        newData[key].checked = newData[key].value;
                        break;
                    case 'radio':
                        break;
                    case 'range':
                        newData[key].value = {
                            lower: filterData[key].value.lower,
                            upper: filterData[key].value.upper,
                        };
                        break;
                    case 'statebutton':
                        newData[key].value = newData[key].value;
                        break;
                    default:
                        break;
                }
            });
        }
        // console.log('init data with', newData);
        // newData.listprice.value = { lower: newData.listprice.value.lower, upper: newData.listprice.value.upper };
        setTimeout(function () {
            // console.log('set data with', newData);
            setData(newData);
            initialized = true;
        }, 1000);
    }, []);
    var handleChange = function (e) {
        var _a;
        var name = /*e.target.attributes.name?.value ||*/ e.target.id;
        var type = e.target.tagName;
        var value;
        var checked;
        if ((_a = e.detail) === null || _a === void 0 ? void 0 : _a.value) {
            value = e.detail.value;
        }
        if (e.detail && typeof e.detail.checked !== 'undefined') {
            checked = e.detail.checked;
        }
        switch (type) {
            case 'ION-RADIO-BUTTON':
                break;
            case 'ION-CHECKBOX':
                if (checked != rawData[name].checked) {
                    ;
                    rawData[name].value = checked // includes: {upper: value, lower: value}
                    ;
                    rawData[name].checked = checked; // includes: {upper: value, lower: value}
                    setData(rawData);
                }
                break;
            case 'ION-RANGE':
                if (value.lower !== rawData[name].value.lower ||
                    value.upper !== rawData[name].value.upper) {
                    ;
                    rawData[name].value = value;
                    setData(rawData);
                }
                break;
            case 'ION-BUTTON':
                var opts = rawData[name].options;
                var val_1 = rawData[name].value;
                var idx = opts.findIndex(function (item) { return item.value === val_1; });
                idx++;
                if (idx >= opts.length)
                    idx = 0;
                rawData[name].value = opts[idx].value;
                setData(rawData);
                break;
            default:
                break;
        }
        // console.log('data is', data);
        return false;
    };
    // const closeFilter = () => {}
    return (_jsx(_Fragment, { children: _jsx("div", __assign({ className: 'filter-container' }, { children: Object.keys(data).map(function (key, index) {
                // const item = (data as any)[key];
                var item = rawData[key];
                switch (item.type) {
                    case 'header':
                        return (_jsxs("div", __assign({ style: { width: '100%' } }, { children: [_jsx("div", __assign({ style: { width: '100%' } }, { children: "\u00A0" }), void 0), _jsx("div", __assign({ style: {
                                        backgroundColor: 'var(--ion-color-light)',
                                        borderTop: '1px solid',
                                        borderBottom: '1px solid',
                                        width: '100%',
                                    } }, { children: _jsx(IonLabel, __assign({ style: { paddingLeft: '10px' } }, { children: _jsx("b", { children: item.title }, void 0) }), void 0) }), void 0), _jsx("div", __assign({ style: { width: '100%' } }, { children: "\u00A0" }), void 0)] }), 'header' + index));
                    case 'checkbox':
                        return (_jsxs("div", __assign({ style: item.style || {} }, { children: [_jsx(IonLabel, { children: item.title }, void 0), "\u00A0\u00A0", _jsx(IonCheckbox, { mode: 'ios', slot: 'end', name: item.name, id: item.name, value: item.value, checked: item.value, onIonChange: handleChange }, void 0), "\u00A0\u00A0"] }), 'checkbox' + index));
                    case 'radio':
                        return (_jsxs(IonItem, { children: [_jsx(IonLabel, { children: item.title }, void 0), _jsx(IonRadio, { slot: 'end', name: item.name, id: item.name, value: item.value }, void 0)] }, item.name));
                    case 'range':
                        return (_jsxs("div", __assign({ style: { width: '100%' } }, { children: [_jsxs(IonLabel, __assign({ position: 'floating' }, { children: [item.title, ":\u00A0\u00A0", utils.formatNumber(data[key].value.lower), " -", ' ', utils.formatNumber(data[key].value.upper)] }), void 0), _jsx(IonRange, { mode: 'ios', color: 'primary', debounce: 5, pin: false, name: item.name, id: item.name, step: item.step, dualKnobs: true, 
                                    // value={{lower: 0, upper: 0}}
                                    value: item.value, min: item.min, max: item.max, onIonChange: handleChange }, void 0)] }), item.name));
                    case 'statebutton':
                        return (_jsxs("div", __assign({ style: item.style || {} }, { children: [_jsx(IonLabel, { children: item.title }, void 0), "\u00A0\u00A0", _jsx(IonButton, __assign({ strong: true, id: item.name, color: 'medium', onClick: handleChange }, { children: item.options.find(function (i) { return i && i.value === item.value; })
                                        .label }), void 0), "\u00A0\u00A0"] }), item.name));
                    case 'segment':
                        return (_jsxs("div", __assign({ className: "ion-padding" }, { children: [_jsx(IonLabel, { children: item.title }, void 0), "\u00A0\u00A0", _jsx(IonSegment, __assign({ mode: 'ios', style: item.style || {}, scrollable: true, value: item.value }, { children: item.options.map(function (i) {
                                        return (_jsx(IonSegmentButton, __assign({ style: i.style || {}, value: i.value }, { children: i.label }), "segment".concat(item.name, "-").concat(i.value)));
                                    }) }), "segment".concat(item.name))] }), item.name));
                    default:
                        return null;
                }
            }) }), void 0) }, void 0));
};
