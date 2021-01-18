import React from "react";
import { shallow } from "enzyme";
import SubHeader, { Title, SubHeaderButton } from "./SubHeader";

describe("Subheader", () => {
  it("should render", () => {
    const component = shallow(<SubHeader />);
    expect(component).toMatchSnapshot();
  });

  it("should render with a dynamic title", () => {
    const title = "Title";
    const component = shallow(<SubHeader title={title} />);
    expect(component.find(Title).text()).toEqual(title);
  });

  it("should render a goBack & openForm button that handle click events", () => {
    const mockGoBack = jest.fn();
    const mockOpenForm = jest.fn();
    const component = shallow(
      <SubHeader goBack={mockGoBack} openForm={mockOpenForm} />
    );
    const goBackButton = component.find(SubHeaderButton).at(0);
    const openFormButton = component.find(SubHeaderButton).at(1);

    expect(openFormButton.exists()).toBe(true);
    expect(goBackButton.exists()).toBe(true);

    goBackButton.simulate("click");
    expect(mockGoBack).toHaveBeenCalled();

    openFormButton.simulate("click");
    expect(mockOpenForm).toHaveBeenCalled();
  });
});
