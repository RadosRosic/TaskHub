import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import HorizontalStack from "../../layout/HorizontalStack";

const sortOptions = [
  { value: "assignee", label: "Assignee" },
  { value: "dueDate", label: "Due Date" },
];

const TaskFilters = ({
  sortBy,
  handleSortChange,
  checkBoxHandler,
  handleColors,
}) => {
  return (
    <HorizontalStack>
      <FormControl>
        <InputLabel id="sort-by">Sort By</InputLabel>
        <Select
          size="small"
          label="Sort by"
          labelId="sort-by"
          value={sortBy}
          onChange={handleSortChange}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={<Checkbox size="small" onChange={(e) => checkBoxHandler(e)} />}
        label="Hide completed"
      />
      <FormControlLabel
        control={<Checkbox size="small" onChange={(e) => handleColors(e)} />}
        label="Disable colors"
      />
    </HorizontalStack>
  );
};

export default TaskFilters;
