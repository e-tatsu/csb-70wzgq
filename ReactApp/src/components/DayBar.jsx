import { Bar } from "react-chartjs-2";

export default function DayBar(props) {
  const { dayData, isEditModalOpen } = props;
  const pieData = {
    labels: [],
    datasets: [
      {
        label: "DataSet",
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
  const graphOption = {
    scales: {
      xAxes: [
        // x軸設定
        {
          scaleLabel: {
            // 軸ラベル設定
            display: true,
            labelString: "言語"
          }
        }
      ],
      yAxes: [
        // y軸設定
        {
          scaleLabel: {
            display: true,
            labelString: "勉強時間"
          },
          ticks: {
            // 軸目盛設定
            beginAtZero: true,
            callback: function (value, index, values) {
              return `${value}(分)`;
            }
          }
        }
      ]
    }
  };
  dayData.map((dayData) => {
    pieData.labels.push(dayData.lang);
    pieData.datasets[0].data.push(dayData.time);
  });
  return (
    <div style={{ maxWidth: "100%", width: "600px", margin: "0 auto" }}>
      {isEditModalOpen ? (
        <div>
          <p>学習成果（日）</p>
          <Bar data={pieData} options={graphOption} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
