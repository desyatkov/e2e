import SELECTORS from '../../infra/selector';

const {
  CHART_SELECTOR,
  FILTER_SELECTOR
} = SELECTORS;

export class Component {
  constructor(page) {
    this.page = page;
  }
}

export  class ChartComponent extends Component{
  constructor(page) {
    super(page)
  }

  async getChart() {
    return await this.page.$(CHART_SELECTOR);
  }
}


export class FilterComponent extends Component {
  constructor(page) {
    super(page)
  }

  async getFilter() {
    return await this.page.$(FILTER_SELECTOR);
  }
}
