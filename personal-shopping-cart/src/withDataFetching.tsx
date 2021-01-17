import React, { FC } from "react";

interface WithDataFetchingProps {
  dataSource: string;
}

interface DataFetchingState {
  data: any[];
  loading: boolean;
  error: string;
}

export const withDataFetching = ({ dataSource }: WithDataFetchingProps) => (
  WrappedComponent: FC<DataFetchingState>
) => {
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

  return <WrappedComponent {...state} />;
};
