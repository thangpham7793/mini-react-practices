import React from "react";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import Hotels, { Alert, HotelItemsWrapper } from "./Hotels";
import HotelItem, { Title } from "./HotelItem";

let useContextMock;

beforeEach(() => {
  useContextMock = React.useContext = jest.fn();
});

afterEach(() => {
  useContextMock.mockReset();
});

describe("Hotels", () => {
  it("should handle the first mount", () => {
    const mockContext = {
      loading: true,
      error: "",
      hotels: [],
      getHotelsRequest: jest.fn(),
    };

    useContextMock.mockReturnValue(mockContext);
    const wrapper = mount(<Hotels />);

    expect(mockContext.getHotelsRequest).toHaveBeenCalled();
    expect(wrapper.find(Alert).exists()).toBe(true);
    expect(wrapper.find(Alert).text()).toEqual("Loading...");
  });

  it("should render the list of hotels mount", () => {
    const mockContext = {
      loading: false,
      error: "",
      hotels: [
        {
          id: 123,
          title: "Test Hotel",
          thumbnail: "test.jpg",
        },
      ],
      getHotelsRequest: jest.fn(),
    };

    useContextMock.mockReturnValue(mockContext);
    const wrapper = mount(
      <Router>
        <Hotels />
      </Router>
    );

    expect(mockContext.getHotelsRequest).toHaveBeenCalled();
    expect(wrapper.find(HotelItemsWrapper).exists()).toBe(true);
    expect(wrapper.find(HotelItem).exists()).toBe(true);
    expect(wrapper.find(HotelItem).at(0).find(Title).text()).toBe(
      mockContext.hotels[0].title
    );
  });
});
