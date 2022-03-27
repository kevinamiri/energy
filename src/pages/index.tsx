import * as React from "react";
import Container from "@mui/material/Container";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { graphql } from "gatsby";
import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";

interface nodeShape {
  node: {
    Area: string;
    Building: string;
    BuildingType: string;
    BuildingYear: string;
    Customer: string;
    Electricity2019: string;
    Electricity2020: string;
    Energy2019: string;
    Energy2020: string;
    EnergyperArea2019: string;
    Heating2019: string;
    Heating2020: string;
    field1: string;
  };
}

interface Data {
  Area: string;
  Building: string;
  BuildingType: string;
  BuildingYear: string;
  Customer: string;
  Electricity2019: string;
  Electricity2020: string;
  Energy2019: string;
  Energy2020: string;
  EnergyperArea2019: string;
  Heating2019: string;
  Heating2020: string;
  field1: string;
}

// function that takes an array of numbers and returns the sum of the numbers
function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b);
}
// function that takes an array of numbers and returns the average of the numbers
const average = (array: number[]): number => {
  return sum(array) / array.length;
};

// function that takes an array of numbers and returns the median of the numbers
const median = (array: number[]): number => {
  const sortedArray = array.sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedArray.length / 2);
  if (sortedArray.length % 2 === 0) {
    return average([sortedArray[middleIndex - 1], sortedArray[middleIndex]]);
  } else {
    return sortedArray[middleIndex];
  }
};

export default function Index(props) {
  const CustomerName = props.data.allTestData1Csv.edges.map(
    (edge: nodeShape) => edge.node.Customer
  );
  const Heating2019 = props.data.allTestData1Csv.edges.map((edge: nodeShape) =>
    parseFloat(edge.node.Heating2019)
  );
  const Heating2020 = props.data.allTestData1Csv.edges.map((edge: nodeShape) =>
    parseFloat(edge.node.Heating2020)
  );

  const theme = useTheme();
  const chartOptions: ApexOptions = {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    colors: ["#13affe", "#fbab49"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      borderColor: theme.palette.divider,
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      labels: {
        colors: theme.palette.text.secondary,
      },
      show: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        show: true,
        color: theme.palette.divider,
      },
      axisTicks: {
        show: true,
        color: theme.palette.divider,
      },
      categories: CustomerName,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      min: 0,
      forceNiceScale: true,
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
  const chartSeries = [
    {
      data: Heating2019,
      name: "2019",
    },
    {
      data: Heating2020,
      name: "2020",
    },
  ];

  const colors = [];

  for (let i = 0; i < 470; i++) {
    colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }

  // const chartContenet = (CustomerName, ) =>{
  const chartOptions2: ApexOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [
      theme.palette.primary.light,
      theme.palette.warning.light,
      theme.palette.success.light,
      theme.palette.info.light,
      "#455a64",
    ],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    labels: CustomerName,
    legend: {
      show: false,
    },
    stroke: {
      colors: [theme.palette.background.paper],
      width: 1,
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  type Order = "asc" | "desc";

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  interface HeadCell {
    disablePadding: boolean;
    field1: keyof Data;
    Customer: string;
    Heating2019: string;
  }

  interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof Data
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  function EnhancedTableHead(props: EnhancedTableProps) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  }

  return (
    <>
      <Container>
        <Box mb={2}>
          <Card>
            <CardHeader title='Heating 2019 vs 2020' />
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant='body1'>
                    Heating 2019: {sum(Heating2019)} kWh
                  </Typography>
                  <Typography variant='body1'>
                    Heating 2020: {sum(Heating2020)} kWh
                  </Typography>
                  <Typography variant='body1'>
                    Difference: {sum(Heating2019) - sum(Heating2020)} kWh
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body1'>
                    Average Heating 2019: {average(Heating2019)} kWh
                  </Typography>
                  <Typography variant='body1'>
                    Average Heating 2020: {average(Heating2020)} kWh
                  </Typography>
                  <Typography variant='body1'>
                    Difference: {average(Heating2019) - average(Heating2020)}{" "}
                    kWh
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body1'>
                    Median Heating 2019: {median(Heating2019)} kWh
                  </Typography>
                  <Typography variant='body1'>
                    Median Heating 2020: {median(Heating2020)} kWh
                  </Typography>
                  <Typography variant='body1'>
                    Difference: {median(Heating2019) - median(Heating2020)} kWh
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box mb={2}>
          <Card
            sx={{
              overflow: "auto",
              height: "400px",
              width: "100%",
              mt: 10,
            }}
          >
            <CardHeader title='Heating 2019 vs 2020' />
            <CardContent>
              <Chart
                options={chartOptions}
                series={chartSeries}
                type='bar'
                height='4000px'
              />
            </CardContent>
          </Card>
        </Box>

        <Box mb={2} sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            mb={2}
            sx={{
              width: "50%",
            }}
          >
            <Card>
              <CardHeader title='Heating 2020' />
              <CardContent>
                <Chart
                  options={chartOptions2}
                  series={Heating2020}
                  type='donut'
                  height='350'
                />
              </CardContent>
            </Card>
          </Box>
          <Box
            mb={2}
            sx={{
              width: "50%",
            }}
          >
            <Card>
              <CardHeader title='Heating 2019' />
              <CardContent>
                <Chart
                  options={chartOptions2}
                  series={Heating2019}
                  type='donut'
                  height='350'
                />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export const pageQuery = graphql`
  query MyQuery {
    allTestData1Csv {
      sum(field: Electricity2019)
      edges {
        node {
          Area
          Building
          BuildingType
          BuildingYear
          Customer
          Electricity2019
          Electricity2020
          Energy2019
          Energy2020
          EnergyperArea2019
          Heating2019
          Heating2020
          field1
        }
      }
      max(field: Electricity2019)
      min(field: Electricity2019)
    }
  }
`;
