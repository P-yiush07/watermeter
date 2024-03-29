import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore";
import { db } from './appwrite/firebase';
import { useAuth } from './appwrite/utils/AuthContext';
import MyChartComponent from "./MyChartComponent";

const MyStatisticsComponent = () => {

  const { user } = useAuth(); // AUTH CONTEXT
  const [dailyIntakes, setDailyIntakes] = useState([]);
  const [filteredIntakes, setFilteredIntakes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedButton, setSelectedButton] = useState('today');
  const [todayIntake, setTodayIntake] = useState('0')
  const [yesterdayIntake, setYesterdayIntake] = useState('0')
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users_intake", user.uid, "intakes"));
        const intakesData = [];
        querySnapshot.forEach((doc) => {

          const dailyIntake = doc.data().dailyIntake;
          const timeStamp = doc.data().timeStamp?.toDate();

          if (dailyIntake !== undefined && timeStamp) {
            intakesData.push({ dailyIntake, timeStamp });
          }
        });

        const today = new Date();
        const todayIntakes = dailyIntakes.filter(
          (intake) => new Date(intake.timeStamp).toDateString() === today.toDateString()
        );

        setDailyIntakes(intakesData);
        setFilteredIntakes(todayIntakes);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetch();
  }, [user.uid])

  const filterIntakesByDate = (date) => {
    const filteredIntakes = dailyIntakes.filter((intake) => {
      const intakeDate = new Date(intake.timeStamp);
      return intakeDate.toDateString() === date.toDateString();
    });
    setFilteredIntakes(filteredIntakes);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value ? new Date(e.target.value) : null; // Set to null if empty
    setSelectedDate(newDate);
    setSelectedButton('');
    filterIntakesByDate(newDate || new Date()); // Show all data if date is null, otherwise apply filter
    setShowChart(true);
    setSelectedSortOption("");
  };;

  const resetFilters = () => {
    setSelectedDate(null); // Reset date to null
    setSelectedButton('');
    setSelectedSortOption('');
    setFilteredIntakes(dailyIntakes); // Reset to show all data
    setShowChart(false);
  };

  const handleBeforeClick = () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    setSelectedButton('before');
    setSelectedDate(null);
    filterIntakesByDate(twoDaysAgo);
    setSelectedSortOption('');
    setShowChart(true);
  };

  let todayTotalIntake = 0; // Declare outside the function to make it accessible

  const calculateTodayTotalIntake = (intakes) => {
    const today = new Date(); // Get today's date
    const todayIntakes = intakes.filter(
      (intake) => {
        const intakeDate = new Date(intake.timeStamp);
        return intakeDate.toDateString() === today.toDateString();
      }
    );

    todayTotalIntake = todayIntakes.reduce(
      (total, intake) => total + parseInt(intake.dailyIntake),
      0
    );
  };

  useEffect(() => {
    const today = new Date();
    const todayIntakes = dailyIntakes.filter(
      (intake) => new Date(intake.timeStamp).toDateString() === today.toDateString()
    );

    setFilteredIntakes(todayIntakes);
    calculateTodayTotalIntake(dailyIntakes);
    setTodayIntake(todayTotalIntake);
    setShowChart(true);
  }, [dailyIntakes]);

  const handleTodayClick = () => {
    setSelectedButton('today');
    setSelectedDate(null);
    setSelectedSortOption('');
    setShowChart(true);

    const today = new Date();
    const todayIntakes = dailyIntakes.filter(
      (intake) => new Date(intake.timeStamp).toDateString() === today.toDateString()
    );

    setFilteredIntakes(todayIntakes);

    calculateTodayTotalIntake(todayIntakes); // Calculate today's total intake

    setTodayIntake(todayTotalIntake);

    console.log("Today's total intake:", todayTotalIntake);
    // Do whatever you want with today's total intake value
  };

  const handleYesterdayClick = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setSelectedButton('yesterday');
    setSelectedDate(null);
    setSelectedSortOption('');
    setShowChart(true);

    const yesterdayIntakes = dailyIntakes.filter(
      (intake) => new Date(intake.timeStamp).toDateString() === yesterday.toDateString()
    );

    const yesterdayTotalIntake = yesterdayIntakes.reduce(
      (total, intake) => total + parseInt(intake.dailyIntake),
      0
    );

    setYesterdayIntake(yesterdayTotalIntake);
    setFilteredIntakes(yesterdayIntakes);

    console.log("Yesterday's total intake:", yesterdayTotalIntake);


  };

  let displayContent = (
    <>
      <h3 className="font-semibold">Your Today's Total Intake is <span className="font-bold text-orange-500">{todayIntake}L</span></h3>
    </>
  );

  if (selectedButton === 'today') {
    displayContent = (
      <>
        <h3 className="font-semibold">Today's Intake : <span className="font-bold text-orange-500">{todayIntake}L</span></h3>
      </>
    )
  } else if (selectedButton === 'yesterday') {
    displayContent = (
      <>
        <h3 className="font-semibold">Yesterday's Total Intake was <span className="font-bold text-orange-500">{yesterdayIntake}L</span></h3>
      </>
    )
  }

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedSortOption(selectedOption);

    switch (selectedOption) {
      case 'ascendingTimestamp':
        const sortedByAscendingTimestamp = [...filteredIntakes].sort((a, b) =>
          a.timeStamp - b.timeStamp
        );
        setFilteredIntakes(sortedByAscendingTimestamp);
        break;
      case 'descendingTimestamp':
        const sortedByDescendingTimestamp = [...filteredIntakes].sort((a, b) =>
          b.timeStamp - a.timeStamp
        );
        setFilteredIntakes(sortedByDescendingTimestamp);
        break;
      case 'ascendingIntake':
        const sortedByAscendingIntake = [...filteredIntakes].sort((a, b) =>
          parseInt(a.dailyIntake) - parseInt(b.dailyIntake)
        );
        setFilteredIntakes(sortedByAscendingIntake);
        break;
      case 'descendingIntake':
        const sortedByDescendingIntake = [...filteredIntakes].sort((a, b) =>
          parseInt(b.dailyIntake) - parseInt(a.dailyIntake)
        );
        setFilteredIntakes(sortedByDescendingIntake);
        break;
      default:
        break;
    }
  }

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">My Statistics</h2>
      <div className="mt-4">
        <div>
          <input type="date" value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ""} onChange={handleDateChange} />
          <button className="ml-6" onClick={resetFilters}>Reset</button>
          <select value={selectedSortOption} onChange={handleSelectChange} className="ml-4">
            <option value="">Select an option</option>
            <option value="ascendingTimestamp">Sort Ascending by Timestamp</option>
            <option value="descendingTimestamp">Sort Descending by Timestamp</option>
            <option value="ascendingIntake">Sort Ascending by Intake</option>
            <option value="descendingIntake">Sort Descending by Intake</option>
          </select>
        </div>
        <div className="mt-10 flex justify-center mb-8">
          <hr />
          <div className="flex justify-between items-center mt-4 w-[50%]">
            <button onClick={() => { handleBeforeClick(); setSelectedButton('before'); }} className={`px-4 py-2 rounded-md ${selectedButton === 'before' ? 'bg-orange-500 text-white' : 'bg-white text-black'}`}>Before</button>
            <button onClick={() => { handleTodayClick(); setSelectedButton('today'); }} className={`px-4 py-2 rounded-md ${selectedButton === 'today' ? 'bg-orange-500 text-white' : 'bg-white text-black'}`}>Today</button>
            <button onClick={() => { handleYesterdayClick(); setSelectedButton('yesterday'); }} className={`px-4 py-2 rounded-md ${selectedButton === 'yesterday' ? 'bg-orange-500 text-white' : 'bg-white text-black'}`}>Yesterday</button>
          </div>
          <hr />
        </div>
        {filteredIntakes.length > 0 ? (
          <table style={{ borderCollapse: "collapse", width: "80%", margin: "auto" }}>
            <thead>
              <tr>
                <th style={{ borderRight: "1px solid #ccc", paddingRight: "5px", width: "50%", textAlign: "center", paddingBottom: "25px" }}>Timestamp</th>
                <th style={{ textAlign: "center", paddingBottom: "25px" }}>Daily Intake</th>
              </tr>
            </thead>
            <tbody>
              {filteredIntakes.map((intake, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{intake.timeStamp.toLocaleString()}</td>
                  <td style={{ textAlign: "center" }}>{intake.dailyIntake}L</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="mt-4">
            <p>No intake data available</p>
          </div>
        )}
        <div className="mt-14">
          {displayContent}
        </div>
      </div>
      {showChart && filteredIntakes.length > 0 && (
        <MyChartComponent intakeData={filteredIntakes} interval={2} />
      )}
    </div>
  );
};

export default MyStatisticsComponent