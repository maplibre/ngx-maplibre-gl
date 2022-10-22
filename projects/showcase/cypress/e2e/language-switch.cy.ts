import { E2eDriver } from '../support/e2e-driver';

describe('Language switch', () => {
  let driver = new E2eDriver();

  beforeEach(() => {
    driver.when
      .visit('/demo/language-switch')
      .when.wait(2000)
      .when.clickLanguageButton('French')
      .when.waitForLanguageToChange()
      .when.clickLanguageButton('French')
      .when.waitForLanguageToChange()
      .when.takeImageSnapshot()
      .when.clickLanguageButton('Russian')
      .when.waitForLanguageToChange();
  });

  it('should change language', () => {
    expect(driver.get.isCurrentImageEqualToSnapshot());

    driver.when.clickLanguageButton('French').when.waitForLanguageToChange();
    expect(driver.get.isCurrentImageEqualToSnapshot());
  });
});
