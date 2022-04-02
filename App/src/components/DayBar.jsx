import { Pie } from "react-chartjs-2";
import { PieDayOpenContext } from "./providers/PieDayOpenProvider";
import { useContext, useEffect } from "react";

export default function DayBar(props) {
  const { dayData } = props;
  const { pieDayOpen, setPieDayOpen } = useContext(PieDayOpenContext);
  const pieData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)"
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)"
        ],
        borderWidth: 1
      }
    ]
  };
  useEffect(() => {
    const isData = !Object.keys(dayData).length;
    isData ? setPieDayOpen(true) : setPieDayOpen(false);
  }, [dayData, setPieDayOpen]);

  dayData.map((dayData) => {
    pieData.labels.push(dayData.lang);
    const selectedTime = dayData.time;
    const timeValue = selectedTime / 60;
    pieData.datasets[0].data.push(timeValue);
    return true;
  });
  return (
    <div style={{ maxWidth: "100%", width: "600px", margin: "0 auto" }}>
      {pieDayOpen ? (
        <></>
      ) : (
        <div>
          <p>学習成果（日）</p>
          <Pie data={pieData} />
          <p>単位：（時）</p>
        </div>
      )}
    </div>
  );
}
