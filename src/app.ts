export class App {
  //public text: string = 'Hello World People!';
  private calc: string = '';
  private last_calc: string = '';
  private result: string = '';
  private last_result: string = '';

  constructor() {
    this.calc = '';
    this.result = '0';
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }

  push(key: string) {
    if (this.calc === "0")
      this.calc = "";

    if (!this.isOperation(key) && !this.firstOperation(this.calc)) {
      this.calc = this.calc + "" + key;
      this.operate(this.calc, key);
      return;
    }

    if (this.isOperation(key) && !this.firstOperation(this.calc))
      this.calc = this.result;

    this.calc = this.calc + "" + key;
    this.result = '0';
  }

  clear() {
    if (this.result === "0" && this.calc === "") {
      this.result = this.last_result;
      this.calc = this.last_calc;
      return;
    }

    this.last_result = this.result;
    this.last_calc = this.calc;
    this.calc = "";
    this.result = "0";
  }


  remove() {
    this.calc = this.calc.substring(0, this.calc.length - 1);
    if (this.calc.length > 0) {
      var last_char = this.calc.slice(-1);
      this.calc = this.calc.substring(0, this.calc.length - 1);
      this.push(last_char);
    }
  }

  isOperation(key) {
    if (key === '+')
      return true;
    if (key === '-')
      return true;
    if (key === '×')
      return true;
    if (key === '÷')
      return true;
    if (key === '%')
      return true;
    if (key === '=')
      return true;

    return false;
  }

  operate(calc: string, key) {
    calc.replace(/ /g, '');
    console.log('Operating... calc = ' + calc);
    let operation = this.getOperation(calc);
    var a: number;
    var b: number;

    try {
      a = parseInt(calc.substring(0, calc.indexOf(operation)));
      b = parseInt(calc.substring(calc.indexOf(operation) + 1, calc.length));

      console.log('a = ' + a + ", b = " + b);
      console.log('calc.indexOf(operation) = ' + calc.indexOf(operation));
      console.log('a = ' + a + ", b = " + b);
    } catch (error) {
      console.log("Unfinished...");
      return;
    }

    if (operation === '+')
      this.result = (a + b) + "";
    if (operation === '-')
      this.result = (a - b) + "";
    if (operation === '×')
      this.result = (a * b) + "";
    if (operation === '÷')
      this.result = (Math.round((a / b) * 1000000) / 1000000)
        + "";
    if (operation === '%')
      this.result = (Math.round((a / 100 * b) * 1000000) / 1000000)
        + "";
  }

  firstOperation(calc) {
    let count: number = (calc.indexOf('+')
      + calc.indexOf('-')
      + calc.indexOf('×')
      + calc.indexOf('÷')
      + calc.indexOf('%'));
    console.log(count);
    console.log("" + !(count > -5) + "");
    return !(count > -5);
  }

  getOperation(calc) {
    if (calc.indexOf('+') > -1)
      return '+';
    if (calc.indexOf('-') > -1)
      return '-';
    if (calc.indexOf('×') > -1)
      return '×';
    if (calc.indexOf('÷') > -1)
      return '÷';
    if (calc.indexOf('%') > -1)
      return '%';
  }

  onKeyPressed(event) {
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key))
      this.push(event.key);
    if (['*', '/', '-', '+', 'x', '%', '÷'].includes(event.key))
      if (event.key === '*' || event.key === 'x')
        this.push('×');
      else if (event.key === '/' || event.key === '÷')
        this.push('÷');
      else
        this.push(event.key);
    if (['c', 'C'].includes(event.key))
      this.clear();
    if (event.keyCode == 127 || event.keyCode == 46)
      this.remove();

    console.log(event.keyCode);
    return false;
  }

  activate() {
    window.addEventListener('keypress', this.onKeyPressed, false);
  }

  deactivate() {
    window.removeEventListener('keypress', this.onKeyPressed);
  }
}
