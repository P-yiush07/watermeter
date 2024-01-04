import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore";
import { db } from './appwrite/firebase';
import { useAuth } from './appwrite/utils/AuthContext';

const MyStatisticsComponent = () => {

  const { user } = useAuth(); // AUTH CONTEXT
  const [dailyIntakes, setDailyIntakes] = useState([]);
  const [filteredIntakes, setFilteredIntakes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedButton, setSelectedButton] = useState('');

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
        setDailyIntakes(intakesData);
        setFilteredIntakes(intakesData);
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
  };;

  const resetFilters = () => {
    setSelectedDate(null); // Reset date to null
    setSelectedButton('');
    setFilteredIntakes(dailyIntakes); // Reset to show all data
  };

  const handleBeforeClick = () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    setSelectedButton('before');
    setSelectedDate(null);
    filterIntakesByDate(twoDaysAgo);
  };

  const handleTodayClick = () => {
    setSelectedButton('today');
    setSelectedDate(null);
    filterIntakesByDate(new Date());
  };

  const handleYesterdayClick = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setSelectedButton('yesterday');
    setSelectedDate(null);
    filterIntakesByDate(yesterday);
  };

  let displayContent;

  if (selectedButton === 'today') {
    displayContent = (
      <>
        <h3 className="font-semibold">Today's Intake :</h3>
      </>
    )
  } else if (selectedButton === 'yesterday') {
    displayContent = (
      <>
      <h3 className="font-semibold">Yesterday's Total Intake :</h3>
      </>
    )
  }

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">My Statistics</h2>
      <div className="mt-4">
        <div>
          <input type="date" value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ""} onChange={handleDateChange} />
          <button className="ml-6" onClick={resetFilters}>Reset</button>
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
                  <td style={{ textAlign: "center" }}>{intake.dailyIntake}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="mt-4">
            <p>No daily intake data available</p>
          </div>
        )}
        <div className="mt-10 flex justify-center">
          <hr />
          <div className="flex justify-between items-center mt-4 w-[50%]">
            <button onClick={() => { handleBeforeClick(); setSelectedButton('before'); }} className={`px-4 py-2 rounded-md ${selectedButton === 'before' ? 'bg-orange-500 text-white' : 'bg-white text-black'}`}>Before</button>
            <button onClick={() => { handleTodayClick(); setSelectedButton('today'); }} className={`px-4 py-2 rounded-md ${selectedButton === 'today' ? 'bg-orange-500 text-white' : 'bg-white text-black'}`}>Today</button>
            <button onClick={() => { handleYesterdayClick(); setSelectedButton('yesterday'); }} className={`px-4 py-2 rounded-md ${selectedButton === 'yesterday' ? 'bg-orange-500 text-white' : 'bg-white text-black'}`}>Yesterday</button>
          </div>
          <hr />
        </div>
        <div className="mt-20">
          {displayContent}
        </div>
      </div>
    </div>
  );
};

export default MyStatisticsComponent