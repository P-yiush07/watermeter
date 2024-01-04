import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore";
import { db } from './appwrite/firebase';
import { useAuth } from './appwrite/utils/AuthContext';

const MyStatisticsComponent = () => {

  const { user } = useAuth(); // AUTH CONTEXT
  const [dailyIntakes, setDailyIntakes] = useState([]);

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
      } catch (error) {
        console.log(error.message);
      }
    };

    fetch();
  }, [user.uid])



  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">My Statistics</h2>
      <div className="mt-4">
        {dailyIntakes.length > 0 ? (
      <table style={{ borderCollapse: "collapse", width: "80%", margin: "auto" }}>
      <thead>
        <tr>
          <th style={{ borderRight: "1px solid #ccc", paddingRight: "5px", width: "50%", textAlign: "center", paddingBottom: "25px" }}>Timestamp</th>
          <th style={{ textAlign: "center", paddingBottom: "25px" }}>Daily Intake</th>
        </tr>
      </thead>
      <tbody>
        {dailyIntakes.map((intake, index) => (
          <tr key={index}>
            <td style={{ textAlign: "center" }}>{intake.timeStamp.toLocaleString()}</td>
            <td style={{ textAlign: "center" }}>{intake.dailyIntake}</td>
          </tr>
        ))}
      </tbody>
    </table>
        ) : (
          <p>No daily intake data available</p>
        )}
      </div>
    </div>
  );
};

export default MyStatisticsComponent