import * as React from "react";
import Container from "@mui/material/Container";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { graphql } from "gatsby";
import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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
    ID: string;
  };
}

export default function Index(props) {
  const CustomerName = props.data.allTestDataCsv.edges.map(
    (edge: nodeShape) => edge.node.Customer
  );
  const Heating2019 = props.data.allTestDataCsv.edges.map((edge: nodeShape) =>
    parseFloat(edge.node.Heating2019)
  );
  const Heating2020 = props.data.allTestDataCsv.edges.map((edge: nodeShape) =>
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

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 70 },
    { field: "Heating2020", headerName: "Heating 2020", width: 150 },
    { field: "Heating2019", headerName: "Heating 2019", width: 150 },
    { field: "Energy2020", headerName: "Energy 2020", width: 150 },
    { field: "Energy2019", headerName: "Energy 2019", width: 150 },
    { field: "Electricity2020", headerName: "Electricity 2020", width: 150 },
    { field: "Electricity2019", headerName: "Electricity 2019", width: 150 },
    { field: "Area", headerName: "Area", width: 150 },
    { field: "Building", headerName: "Building", width: 150 },
    { field: "BuildingType", headerName: "BuildingType", width: 150 },
    { field: "BuildingYear", headerName: "BuildingYear", width: 150 },
    { field: "Customer", headerName: "Customer", width: 150 },
  ];

  const rows = props.data.allTestDataCsv.edges.map(
    (edge: nodeShape) => edge.node
  );

  return (
    <>
      <Container>
        <Box my={4}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              getRowId={(row) => row.ID}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
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

        <Box
          mb={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            mb={2}
            sx={{
              width: "50%",
              minWidth: "380px",
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
              minWidth: "380px",
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
    allTestDataCsv {
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
          ID
        }
      }
      max(field: Electricity2019)
      min(field: Electricity2019)
    }
  }
`;
