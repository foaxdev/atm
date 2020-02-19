import AbstractComponent from "../abstract-component";
import {createItems} from "../../utils/render";

const getCassetteBlockHtml = (cassetteNumber) => {
  return (`
    <div class="form__cassette-wrap">
      <input class="form__cassette" name="cassette-${cassetteNumber}" type="checkbox" aria-label="Касета ${cassetteNumber}" checked>
      <select class="form__select cassette-${cassetteNumber}" name="cassette-${cassetteNumber}-face-value">
        <option value="100" selected>100</option>
        <option value="200">200</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
        <option value="2000">2000</option>
        <option value="5000">5000</option>
      </select>
      <input class="form__quantity cassette-${cassetteNumber}" name="cassette-${cassetteNumber}-quantity" type="number" aria-label="Касета ${cassetteNumber}" value="10" min="0" max="100">
    </div>
  `);
};

const createCassettesTemplate = (cassettesQuantity) => {
  return (`
    <div class="atm">
      <form class="form" action="#" method="post">
        ${createItems(cassettesQuantity, getCassetteBlockHtml)}

        <input class="form__sum" name="sum" type="number" aria-label="Сумма для снятия" value="" min="0" max="1000000000">
        <button class="form__submit" type="submit">Посчитать</button>
      </form>
      <p class="atm__result"></p>
      <p class="atm__time"></p>
    </div>
  `);
};

export default class Atm extends AbstractComponent {

  constructor() {
    super();
    this._cassettesQuantity = [1, 2, 3, 4, 5, 6, 7, 8];
    this._totalSum = 8 * 100 * 10;
    this._cassettesData = {
      100: 0,
      200: 0,
      500: 0,
      1000: 0,
      2000: 0,
      5000: 0
    };

    this._resultText = this.element.querySelector(`.atm__result`);
    this._timeText = this.element.querySelector(`.atm__time`);
    this._sum = this.element.querySelector(`.form__sum`);
  }

  getTemplate() {
    return createCassettesTemplate(this._cassettesQuantity);
  }

  get dataFromForm() {
    const activeCassettes = this.element.querySelectorAll(`.form__cassette:checked`);
    this._changeCassettesDataToDefault();
    activeCassettes.forEach((activeCassette) => {
      const activeFaceValue = activeCassette.nextElementSibling.value;
      this._cassettesData[activeFaceValue] += parseInt(activeCassette.nextElementSibling.nextElementSibling.value, 10);
    });

    this._countSum();

    return this._cassettesData;
  }

  get sum() {
    return this._sum.value;
  }

  get totalSum() {
    return this._totalSum;
  }

  set onSubmit(handler) {
    this.element.addEventListener(`submit`, handler);
  }

  set result(result) {
    this._resultText.textContent = result;
  }

  set time(time) {
    this._timeText.textContent = time;
  }

  _countSum() {
    this._totalSum = 0;
    for (let nominal in this._cassettesData) {
      this._totalSum += nominal * this._cassettesData[nominal];
    }
  }

  _changeCassettesDataToDefault() {
    this._cassettesData = {
      100: 0,
      200: 0,
      500: 0,
      1000: 0,
      2000: 0,
      5000: 0
    };
  }
}
