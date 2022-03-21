import { mount } from "@vue/test-utils";
import PublicPageOne from "@/components/PublicPageOne.vue";
import { getUser } from "@/api/auth";

jest.mock("@/api/auth", () => ({
  getUser: jest.fn(),
}));

const createComponent = () => mount(PublicPageOne);

const findTitle = (wrapper) => wrapper.find("h1");
const findGetSecretDataButton = (wrapper) => wrapper.find("button");
const findErrorMessage = (wrapper) => wrapper.find("[data-spec='error']");
const findSecretData = (wrapper) => wrapper.find("[data-spec='secret-data']");

describe("PublicPageOne.vue", () => {
  it("renders welcome header", () => {
    const wrapper = createComponent();
    expect(findTitle(wrapper).text()).toMatch("Hello there!");
  });

  it("has button to load secret data", () => {
    const wrapper = createComponent();
    expect(findGetSecretDataButton(wrapper)).toBeDefined();
  });

  describe("when user is not logged in", () => {
    it("shows error message when button is clicked", async () => {
      getUser.mockImplementationOnce(() => Promise.reject());
      const wrapper = createComponent();
      const button = findGetSecretDataButton(wrapper);
      await button.trigger("click");
      expect(findErrorMessage(wrapper).text()).toMatch("Unauthorized");
    });
  });

  describe("when user is logged in", () => {
    it("shows secret data when button is clicked", async () => {
      getUser.mockImplementationOnce(() =>
        Promise.resolve({ data: "secret message" })
      );
      const wrapper = createComponent();
      const button = findGetSecretDataButton(wrapper);
      await button.trigger("click");
      expect(findSecretData(wrapper).text()).toMatch("secret message");
    });
  });
});
