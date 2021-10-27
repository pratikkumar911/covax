import { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  TextField,
  Container,
  CircularProgress
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { Search } from "@material-ui/icons";


import "./Home.css";
import Validate from "../Validate";
import VaccineDataMain from "../VaccineData/VaccineDataMain";


const Home = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stateCode, setStateCode] = useState("States");
  const [districts, setDistricts] = useState([]);
  const [districtCode, setDistrictCode] = useState(
    "PLEASE SELECT A STATE FIRST"
  );
  const [pin, setPin] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [vaccineData, setVaccineData] = useState([]);
  const [pinCodeSearch, setPinCodeSearch] = useState(false);
  const [toSearchValue, setToSearchValue] = useState("");
  const [toSearch] = useState([
    "Find By District",
    "Find By PinCode & Date",
  ]);

  const GetFormattedDate = () => {
    var month = selectedDate.getMonth() + 1;
    var day = selectedDate.getDate();
    var year = selectedDate.getFullYear();

    var finalDate = day + "-" + month + "-" + year;

    setFormattedDate(finalDate);
  };

  useEffect(() => {
    fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then((res) => res.json())
      .then((data) => {
        setState(data.states);
      });
    GetFormattedDate();
  }, [selectedDate, formattedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setVaccineData([]);
    setDistrictCode("");
  };

  const onStateChange = async (e) => {
    const stateCode = e.target.value;
    setDistricts([]);
    setVaccineData([]);
    setPinCodeSearch(false);

    const url =
      stateCode === "States"
        ? null
        : `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateCode}`;
    setLoading(true);
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setStateCode(stateCode);
        setDistricts(data.districts);
      });
  };

  const findByDistrict = async (e) => {
    const districtCode = e.target.value;

    const url =
      districtCode === "PLEASE SELECT A STATE FIRST"
        ? null
        : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtCode}&date=${formattedDate}`;
    setLoading(true);
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setDistrictCode(districtCode);
        setVaccineData(data.sessions);
        setPinCodeSearch(true);
      });
  };

  const fetchDataUsingByPin = async () => {
    if (pin.length !== 6) {
      alert("A Pincode must be of 6 digits");
    } else {
      setLoading(true);
      await fetch(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${formattedDate}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          console.log(data);
          setVaccineData(data.sessions);
          setPinCodeSearch(true);
        });
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <div className="home">
          <div className="home__intro">
            <h2 id="back-to-top-anchor">Vaccine Availablity</h2>
            <hr />
          </div>
          <div className="home_selectionHeader">
            <h4>Select a method to search for slots</h4>
            <FormControl>
              <InputLabel id="select-outlined-label">
                Search Criteria
              </InputLabel>
              <Select
                variant="filled"
                value={toSearchValue}
                onChange={(e) => {
                  setToSearchValue(e.target.value);
                  setVaccineData([]);
                  setPinCodeSearch(false);
                  setLoading(false);
                }}
              >
                {toSearch.map((functionName, index) => {
                  return (
                    <MenuItem
                      className="search__values"
                      key={index}
                      value={functionName}
                    >
                      {functionName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          {toSearchValue === "" && (
            <h3 className="empty_error">Selct an option to search</h3>
          )}

          {toSearchValue === "Find By District" ? (
            <div className="home_selectedHeaders">
              <FormControl className="form-control">
                <Select
                  variant="outlined"
                  value={stateCode}
                  onChange={onStateChange}
                >
                  <MenuItem value="States">Select a State</MenuItem>
                  {state?.map((stateData) => (
                    <MenuItem value={stateData?.state_id}>
                      {stateData?.state_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className="form-control">
                {districts?.length !== 0 ? (
                  <>
                    <Select
                      variant="outlined"
                      value={districtCode}
                      onChange={findByDistrict}
                    >
                      {districts?.map((districtData) => (
                        <MenuItem value={districtData?.district_id}>
                          {districtData?.district_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                ) : (
                  <>
                    <Select
                      variant="outlined"
                      value={districtCode}
                      onChange={findByDistrict}
                    >
                      <MenuItem disabled={true}>Select a State First</MenuItem>
                    </Select>
                  </>
                )}
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  format="dd-MM-yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="districtDateInput"
                />
              </MuiPickersUtilsProvider>
            </div>
          ) : null}
          {toSearchValue === "Find By PinCode & Date" ? (
            <div className="home_selectedPin">
              <div className="home_selectedpincontainer">
                <TextField
                  id="outlined-number"
                  margin="normal"
                  label="Pin Code"
                  type="number"
                  variant="outlined"
                  className="textField"
                  value={pin}
                  onChange={(e) => {
                    setPinCodeSearch(false);
                    setPin(e.target.value);
                  }}
                />
                <Search
                  onClick={fetchDataUsingByPin}
                  data-testId="home-fetch-by-pin"
                  style={{
                    background: "#3f51b5",
                    color: "#fff",
                    padding: 5,
                    cursor: "pointer",
                    width: 30,
                    height: 45,
                    marginTop: 16,
                    borderRadius: "0 5px 5px 0",
                  }}
                  fontSize="medium"
                />
              </div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  format="dd-MM-yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="input"
                />
              </MuiPickersUtilsProvider>
            </div>
          ) : null}

          {loading === true ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "2rem 0",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <VaccineDataMain vaccineData={vaccineData} />
          )}
          <Validate
            toSearchValue={toSearchValue}
            vaccineData={vaccineData}
            districtCode={districtCode}
            VaccineDataMain={VaccineDataMain}
            pin={pin}
            pinCodeSearch={pinCodeSearch}
          />
        </div>
      </Container>
    </>
  );
};

export default Home;
