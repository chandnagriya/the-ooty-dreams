import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  return (
    <>
      <Row>
        <Heading as="h1">Cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row type="vertical">
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
