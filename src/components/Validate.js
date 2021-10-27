import React from "react";
import NoData from "./NoData";

const Validate = ({
  toSearchValue,
  vaccineData,
  districtCode,
  VaccineDataMain,
  pin,
  pinCodeSearch,
}) => {
  console.log(pinCodeSearch);
  if (
    toSearchValue === "Find By District" ||
    toSearchValue === "Find By District & Date(Slots for next 7 days)"
  ) {
    if (districtCode === "PLEASE SELECT A STATE FIRST") {
      return <div></div>;
    } else if (vaccineData.length > 0) {
      return (
        <div>
          <VaccineDataMain />
        </div>
      );
    } else if (pinCodeSearch) {
      return (
        <div>
          <NoData />
        </div>
      );
    } else {
      return <div></div>;
    }
  } else if (
    toSearchValue === "Find By PinCode & Date" ||
    toSearchValue === "Find By Pincode & Date(Slots for next 7 days)"
  ) {
    if (vaccineData.length > 0) {
      return (
        <div>
          <VaccineDataMain />
        </div>
      );
    } else if (pin.length <= 6 && !pinCodeSearch && vaccineData.length === 0) {
      return <div></div>;
    } else {
      return (
        <div>
          <NoData />
        </div>
      );
    }
  } else {
    return <div></div>;
  }
};

export default Validate;