const Map = {
    'Year': 0,
    'Month': 1,
    'Day': 2,
    'Hour': 3,
    'HalfHour': 4,
    'Mintue': 5,
    'Second': 6,
    'other': 7,
};

class DateFomatter {
    constructor(pattern) {
        this.state = undefined;
        this.num = 1;
        this.char = undefined;
        this.formatter = [];
        for(let char of  pattern) {
            switch (char) {
                case 'y':
                    this.save(Map.Year, char);
                    break;
                case 'M':
                    this.save(Map.Month, char);
                    break;
                case 'd':
                    this.save(Map.Day, char);
                    break;
                case 'H':
                    this.save(Map.Hour, char);
                    break;
                case 'h':
                    this.save(Map.HalfHour, char);
                    break;
                case 'm':
                    this.save(Map.Mintue, char);
                    break;
                case 's':
                    this.save(Map.Second, char);
                    break;
                default:
                    this.save(Map.other, char);
                    break;
            };
        }
        this.save(undefined, undefined);
    }

    isState(state) {
        return this.state === state;
    }

    save(state, char) {
        if (this.isState(state)) {
            this.num += 1;
        } else {
            if (this.state !== undefined) {
                this.formatter.push({
                    state: this.state,
                    num: this.num,
                    char: this.char,
                });
            }
            this.state = state;
            this.num = 1;
            this.char = char;
        }
    }

    fixStr(str, length) {
        let result = str.toString();
        if (result.length > length) {
            result = result.substr(result.length - length);
        } else if (result.length < length) {
            result = result.padStart(length, '0');
        }
        return result;
    }

    format(dateData) {
        const result = this.formatter.map((item) => {
            let str = '';
            switch(item.state) {
                case Map.Year:
                    if (item.num === 4 || item.num === 2) {
                        str = this.fixStr(dateData.Year, item.num);
                    } else {
                        throw Error('invalid format');
                    }
                    break;
                case Map.Month:
                    if (item.num === 2 || item.num === 1) {
                        str = this.fixStr(dateData.Month, item.num);
                    } else {
                        throw Error('invalid format');
                    }
                    break;
                case Map.Day:
                    if (item.num === 2 || item.num === 1) {
                        str = this.fixStr(dateData.Day, item.num);
                    } else {
                        throw Error('invalid format');
                    }
                    break;
                case Map.Hour:
                    if (item.num === 2 || item.num === 1) {
                        str = this.fixStr(dateData.Hour, item.num);
                    } else {
                        throw Error('invalid format');
                    }
                    break;
                case Map.HalfHour:
                    if (item.num === 2 || item.num === 1) {
                        str = this.fixStr(dateData.Hour % 12, item.num);
                    } else {
                        throw Error('invalid format');
                    }
                    break;
                case Map.Mintue:
                    if (item.num === 2 || item.num === 1) {
                        str = this.fixStr(dateData.Mintue, item.num);
                    } else {
                        throw Error('invalid format');
                    }
                    break;
                case Map.Second:
                    if (item.num === 2 || item.num === 1) {
                        str = this.fixStr(dateData.Second, item.num);
                    } else {
                        throw Error('invalid format');
                    }
                    break;
                case Map.other:
                    str = ''.padStart(item.num, item.char);
                    break;
            };
            return str;
        });
        return result.join('');
    }
}

const data = {
    Year: 2001,
    Month: 11,
    Day: 21,
    Hour: 13,
    Mintue: 58,
    Second: 8,
};

const fomatter = new DateFomatter('yy-yyyy-m-M-s');
const result = fomatter.format(data);

console.log(result);
