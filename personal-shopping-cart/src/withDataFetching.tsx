import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Item, List } from "./types";

export interface WithDataFetchingProps {
  dataSource: string;
}

export interface DataFetchingState {
  data: List[] | Item[];
  loading: boolean;
  error: string;
}

export const withDataFetching = ({ dataSource }: WithDataFetchingProps) => (
  WrappedComponent: FC<DataFetchingState & any>
) => {
  return (props: any) => {
    const [state, setState] = React.useState<DataFetchingState>({
      data: [],
      loading: false,
      error: "",
    });

    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const data: any[] = await (await fetch(dataSource)).json();
          if (data) {
            setState({ data, loading: false, error: "" });
          }
        } catch (error) {
          setState({ data: [], loading: false, error: error.message });
        }
      };
      fetchData();
    }, []);
    return <WrappedComponent {...state} {...props} />;
  };
};
