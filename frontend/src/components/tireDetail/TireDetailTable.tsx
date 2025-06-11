import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

interface TireDetailTableRow {
  label: string;
  value: string | number | null | undefined;
}

interface TireDetailTableProps {
  rows: TireDetailTableRow[];
}

const TireDetailTable = ({ rows }: TireDetailTableProps) => (
  <TableContainer>
    <Table size="small">
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell
              component="th"
              scope="row"
              sx={{ fontWeight: "medium", color: "text.secondary" }}
            >
              {row.label}
            </TableCell>
            <TableCell align="right">{row.value ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TireDetailTable; 