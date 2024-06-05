import { DASHBOARD_TIME_FILTER } from "./DASHBOARD_CONFIG";

import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField={DASHBOARD_TIME_FILTER.filterField}
      options={DASHBOARD_TIME_FILTER.options}
      defaultValue={DASHBOARD_TIME_FILTER.defaultValue}
    />
  );
}

export default DashboardFilter;
