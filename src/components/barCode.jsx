import Barcode from "react-barcode";

const BarCodeComponent = ({ value, margin }) => {
  return (
    <Barcode marginTop={5} textAlign="center" height={"30px"} value={value} />
  );
};

export default BarCodeComponent;
