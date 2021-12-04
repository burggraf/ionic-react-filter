import * as moment from 'moment';

export class UtilsService {

    constructor() {}

    public uuidv4 = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8
			return v.toString(16)
		})
	}
	public randomKey = () => {
		return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
	}

	public formatCurrency(value: number | undefined) {
		if (typeof value === 'undefined') {
			return '';
		} else {
			return value.toLocaleString('en-US', {style: 'currency',currency: 'USD'});
			// return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
		}
	  }
	
	  public formatNumber(num: number, digits: number = 0): string {
		if (!num && num !== 0) {
		  return '';
		}
		if (num > 999) {
		  return num.toFixed(digits).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
		} else {
		  return num.toFixed(digits).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1');
		}
	  }
	
	
	  public formatDate(date: string) {
		if (!date) { return ''; }
		if (date.indexOf('T') > -1) {
		  // date time
		  // Remove 'Z' so the function doesn't think the dates are GMT
		  return moment.default(date.replace('Z', '')).format('L') + ' ' + moment.default(date.replace('Z', '')).format('LT');
		} else {
		  return moment.default(date).format('L');
		}
	  }
	

}