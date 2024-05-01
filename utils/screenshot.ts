export async function screenshot(page, test: any) {
  await page.screenshot({
    path: `${process.env.PROJECT_PATH!}/screenshots/${
      test.info()._steps[test.info()._steps.length - 1].title
    }.png`,
    fullPage: true,
  });
}
