const { test, expect, request } = require("@playwright/test");

const userPayload = {
  postId: 1,
  id: 1,
  name: "MOses",
  email: "gmail@gardner.biz",
  body: "Jesus Is Great❤️😇🏆🙏🏻😘",
};

test("Google homepage has title", async ({ page }) => {
  await page.goto("https://google.com");
  await expect(page).toHaveTitle(/Google/);
});

test("GET REQUEST", async () => {
  const apiRequest = await request.newContext();

  const apiResponse = await apiRequest.get(
    "https://jsonplaceholder.typicode.com/comments"
  );

  expect(apiResponse.ok()).toBeTruthy();
  const json = await apiResponse.json();
  console.log(json);
});

test("POST REQUEST", async () => {
  const apiRequest = await request.newContext();

  const apiResponse = await apiRequest.post(
    "https://jsonplaceholder.typicode.com/comments",
    {
      data: userPayload,
    }
  );

  expect(apiResponse.ok()).toBeTruthy();
  const json = await apiResponse.json();
  console.log(json);
});

test("Broken Links", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  const anchors = await page.locator("#broken-links a").all();
  const hrefs = [];

  for (let link of anchors) {
    const href = await link.getAttribute("href");
    if (href && href.startsWith("http")) {
      hrefs.push(href);
    }
  }

  for (let url of hrefs) {
    const response = await page.request.get(url);
    const status = response.status();
    if (status >= 400) {
      console.log(`❌ Broken link: ${url} - Status: ${status}`);
    } else {
      console.log(`✅ Valid link: ${url} - Status: ${status}`);
    }
  }
});
