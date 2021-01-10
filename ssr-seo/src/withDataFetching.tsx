import React from "react";
import { MyWrappedComponent } from "./types";

type Props = {
  loadingMessage: string;
  dataSource: string;
};

type State = {
  data: any;
  loading: string | boolean;
  error: string;
};

export default function withDataFetching(WrappedComponent: MyWrappedComponent) {
  class WithDataFetching extends React.Component<Props, State> {
    static displayName: string;
    constructor(props: Props) {
      super(props);
      this.state = {
        data: [],
        loading: true,
        error: "",
      };
    }

    async componentDidMount() {
      try {
        const data = await fetch(this.props.dataSource);
        const dataJSON = await data.json();

        if (dataJSON) {
          this.setState({
            data: dataJSON,
            loading: false,
          });
        }
      } catch (error) {
        this.setState({
          loading: false,
          error: error.message,
        });
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          loadingMessage={this.props.loadingMessage}
        />
      );
    }
  }

  WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;

  return WithDataFetching;
}
