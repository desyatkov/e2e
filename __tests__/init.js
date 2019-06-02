import emulateDevice from '../lib/emulationDevise';
import { userAgent } from "../infra/config";
import { config } from "../infra/config";

import * as testsFuncToRun from '../testFunc/exampleFunctions';
import { DB } from '../infra/DB';

global.__PAGE__ = null;


afterAll(async () => {
  await global.__PAGE__.close()
});

beforeAll(async () => {
  global.__PAGE__ = await global.__BROWSER__.newPage();
  await emulateDevice(__PAGE__, userAgent.USER_AGENT_IPHONE);
  await global.__PAGE__.setViewport({
    width: config.viewportWidth,
    height: config.viewportHeight
  });
});

DB.forEach(({url, testList})=>{
  describe('test URL test ' + url, () => {
    testList.forEach(test=>{
      testsFuncToRun[test](url);
    });
  })
});
