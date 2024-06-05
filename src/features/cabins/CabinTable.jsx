import { useSearchParams } from "react-router-dom";

import useGetCabins from "./useGetCabins";

import { getSortByDetails } from "../../utils/helpers";

import { CABIN_FILTER_VALUES, CABIN_FILTERS } from "./CABIN_FILTERS_AND_SORT";
import { CABIN_SORT } from "./CABIN_FILTERS_AND_SORT";

import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { gettingCabins, cabins } = useGetCabins();
  const [searchParams] = useSearchParams();

  if (gettingCabins) return <Spinner />;

  if (!cabins.length)
    return <Empty message="No cabins exist for the selected filter" />;

  const filteredValue =
    searchParams.get(CABIN_FILTERS.filterField) || CABIN_FILTERS.defaultValue;

  let filteredCabins = cabins;

  if (filteredValue === CABIN_FILTER_VALUES.WITH_DISCOUNT) {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  } else if (filteredValue === CABIN_FILTER_VALUES.NO_DISCOUNT) {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  const sortBy = searchParams.get("sortBy") || CABIN_SORT.defaultValue;
  let [sortField, sortDirection] = getSortByDetails(sortBy);

  const sortModifier = sortDirection === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) =>
    typeof a[sortField] === "string"
      ? a[sortField].localeCompare(b[sortField]) * sortModifier
      : (a[sortField] - b[sortField]) * sortModifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 1.8fr 1fr 1fr 0.8fr">
        <Table.Header>
          <Table.Row>
            <Table.CellHeader></Table.CellHeader>
            <Table.CellHeader>Cabin</Table.CellHeader>
            <Table.CellHeader>Capacity</Table.CellHeader>
            <Table.CellHeader>Price</Table.CellHeader>
            <Table.CellHeader>Discount</Table.CellHeader>
            <Table.CellHeader></Table.CellHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
