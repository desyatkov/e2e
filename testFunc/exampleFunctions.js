import * as je from 'jest-extended';
import ChartPage from "../object_model/ChartPage";



export function A(url) {
  it('should load without error ' + url, async () => {
    await global.__PAGE__.goto(url);
    const chartPage = new ChartPage(global.__PAGE__);
    const chartComponent = await chartPage.getChartComponent();
    expect(chartComponent).toBeTruthy();
  });
};

export function B(url) {
  it('should load with error ' + url, async () => {
    await global.__PAGE__.goto(url);
    const chartPage = new ChartPage(global.__PAGE__);
    const chartComponent = await chartPage.getChartComponent();
    await global.__PAGE__.screenshot({ path: './screenshots/bp_hart_' + Date.now() + '.png', fullPage: true });
    expect(chartComponent).toBeTruthy();
  });
};
