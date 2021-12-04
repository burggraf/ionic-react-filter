export declare class UtilsService {
    constructor();
    uuidv4: () => string;
    randomKey: () => string;
    formatCurrency(value: number | undefined): string;
    formatNumber(num: number, digits?: number): string;
    formatDate(date: string): string;
}
