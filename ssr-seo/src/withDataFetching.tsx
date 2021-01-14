import React from "react";
import { MyWrappedComponent } from "./types";

type Props = {
  loadingMessage: string;
  dataSource: string;
  page?: number;
  [key: string]: any;
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

    private async fetchApi() {
      try {
        console.log(`Fetch data from ${this.props.dataSource}`);
        const data = await fetch(this.props.dataSource);
        const dataJSON = await data.json();

        if (dataJSON && !dataJSON.error_id) {
          this.setState({
            data: dataJSON,
            loading: false,
          });
          return;
        }
        this.setState({
          loading: false,
          error: `Failed to Fetch: ${dataJSON.error_name}`,
        });
      } catch (error) {
        this.setState({
          loading: false,
          error: error.message,
        });
      }
    }

    async componentDidMount() {
      this.fetchApi();
    }

    async componentDidUpdate(prevProps: Props) {
      if (prevProps.page !== this.props.page)
        this.setState({}, () => this.fetchApi());
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          loadingMessage={this.props.loadingMessage}
        />
      );
    }
  }

  WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;

  return WithDataFetching;
}
