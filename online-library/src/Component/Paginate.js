import { useState } from "react";
import { Grid, Box } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const Paginate = ({ items, Component }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 4;
  const pagesVisited = (pageNumber - 1) * itemsPerPage;
  const displayItems = items.slice(pagesVisited, pagesVisited + itemsPerPage);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Code to change pageNumber
  const changePage = (event, val) => {
    setPageNumber(val);
  };

  return (
    <div>
      <Box
        sx={{
          marginLeft: "30px",
          marginRight: "30px",
        }}
      >
        <Grid container spacing={5} alignItems="center">
          {displayItems.map((item, i) => (
            <Grid item key={i} xs={6} md={6} lg={6}>
              <Component book={item} key={i} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <div style={{ marginTop: 40 }}></div>
      <Box
        sx={{
          marginLeft: "675px",
        }}
      >
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          count={pageCount}
          page={pageNumber}
          onChange={changePage}
        />
      </Box>
      <div style={{ marginBottom: 50 }}></div>
    </div>
  );
};

export default Paginate;
