import {ChartComponent, FilterComponent} from './ChartComponent';


export default class ChartPage {

  constructor(page) {
    this.page = page;
  }

  async getChartComponent() {
    const chartComponent = new ChartComponent(this.page);
    return chartComponent.getChart();
  }

  async getFilterComponent() {
    const filterComponent = new FilterComponent(this.page)
    return filterComponent.getFilter();
  }
}
