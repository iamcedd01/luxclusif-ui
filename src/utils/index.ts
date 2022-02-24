export const toLocaleString =
    (locale = 'en', currency?: 'USD') =>
    (value: string | number = '') => {
        let stringValue: string;

        if (typeof value === 'number') {
            stringValue = `${value}`;
        } else {
            stringValue = value;
        }

        const n = stringValue.replace(/,/g, '');

        if (Number.isNaN(Number(n))) {
            return stringValue;
        }

        try {
            if (currency) {
                return Number(n).toLocaleString(locale, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                });
            }

            return Number(n).toLocaleString(locale, {
                maximumFractionDigits: 20,
            });
        } catch (e) {
            return stringValue;
        }
    };
