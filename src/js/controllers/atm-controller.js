import Atm from "../components/atm/atm";
import {render, RenderPosition} from "../utils/render";

const MIN_NOMINAL = 100;

export default class AtmController {

  constructor(container) {
    this._container = container;
    this._atm = new Atm();
    this._onDataChange = this._onDataChange.bind(this);
  }

  render() {
    render(this._container, this._atm, RenderPosition.AFTERBEGIN);
    this._addEventListenerToSubmitButton();
  }

  _addEventListenerToSubmitButton() {
    this._atm.onSubmit = (evt) => {
      evt.preventDefault();
      this._onDataChange(this._atm.dataFromForm, this._atm.sum);
    }
  }

  _countMoney(cassettesData, sum) {
    if (sum % MIN_NOMINAL !== 0) {
      return `У банкомата нет возможности выдать вам такую сумму. Минимальная купюра: ${MIN_NOMINAL}.`;
    } else if (sum > this._atm.totalSum) {
      return `Слишком большая сумма. Доступно всего: ${this._atm.totalSum}.`;
    } else {
      const faceValues = Object.keys(cassettesData).sort((a, b) => a - b).reverse();
      let left = sum;
      let quantityOfMoney = 0;
      let result = ``;

      for (let i = 0; i < faceValues.length; i++) {
        if (faceValues[i] <= left && cassettesData[faceValues[i]] > 0) {
          quantityOfMoney = Math.floor(left / faceValues[i]);

          left -= (left % faceValues[i]);
          cassettesData[faceValues[i]] -= quantityOfMoney;
          result += `${faceValues[i]}x${quantityOfMoney} `;
        }
      }

      return result;
    }
  }

  _onDataChange(cassettesData, sum) {
    const timeStart = performance.now();
    this._atm.result =  this._countMoney(cassettesData, sum);
    const timeEnd = performance.now();

    this._atm.time = timeEnd - timeStart;
  }
}
