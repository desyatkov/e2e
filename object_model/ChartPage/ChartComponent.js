import SELECTORS from '../../infra/selector';

const {
  CHART_SELECTOR,
  FILTER_SELECTOR
} = SELECTORS;

export  class ChartComponent {
  constructor(page) {
    this.page = page;
  }

  async getChart() {
    return await this.page.$(CHART_SELECTOR);
  }
}


export class FilterComponent {
  constructor(page) {
    this.page = page;
  }

  async getFilter() {
    return await this.page.$(FILTER_SELECTOR);
  }
}
