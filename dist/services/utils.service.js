import * as moment from 'moment';
var UtilsService = /** @class */ (function () {
    function UtilsService() {
        this.uuidv4 = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        };
        this.randomKey = function () {
            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };
    }
    UtilsService.prototype.formatCurrency = function (value) {
        if (typeof value === 'undefined') {
            return '';
        }
        else {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            // return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
    };
    UtilsService.prototype.formatNumber = function (num, digits) {
        if (digits === void 0) { digits = 0; }
        if (!num && num !== 0) {
            return '';
        }
        if (num > 999) {
            return num.toFixed(digits).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
        }
        else {
            return num.toFixed(digits).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1');
        }
    };
    UtilsService.prototype.formatDate = function (date) {
        if (!date) {
            return '';
        }
        if (date.indexOf('T') > -1) {
            // date time
            // Remove 'Z' so the function doesn't think the dates are GMT
            return moment.default(date.replace('Z', '')).format('L') + ' ' + moment.default(date.replace('Z', '')).format('LT');
        }
        else {
            return moment.default(date).format('L');
        }
    };
    return UtilsService;
}());
export { UtilsService };
