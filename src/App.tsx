import data from "./data/data.json"
import './App.css';
import Table from "./components/Table"

// Function to calculate the Gamma property for each data point
const calculateGamma = (dataPoint) => {
  const { Ash, Hue, Magnesium } = dataPoint;
  return (Ash * Hue) / Magnesium;
};

// Utility function to calculate the mean of an array
const calculateMean = (arr) =>
  arr.reduce((sum, value) => sum + value, 0) / arr.length;

// Utility function to calculate the median of an array
const calculateMedian = (arr) => {
  const sortedArr = arr.slice().sort((a, b) => a - b);
  const mid = Math.floor(sortedArr.length / 2);
  return sortedArr.length % 2 !== 0
    ? sortedArr[mid]
    : (sortedArr[mid - 1] + sortedArr[mid]) / 2;
};

// Utility function to calculate the mode of an array
const calculateMode = (arr) => {
  const frequencyMap = {};
  arr.forEach((value) => {
    frequencyMap[value] = (frequencyMap[value] || 0) + 1;
  });

  let mode;
  let maxFrequency = 0;

  Object.entries(frequencyMap).forEach(([value, frequency]: [any, number]) => {
    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      mode = value;
    }
  });

  return mode;
};

function App() {
  console.log("Dataset", data)
  // Extracting unique classes of alcohol from the dataset
  const dataset = data.map((dataPoint) => ({
    ...dataPoint,
    "Gamma": calculateGamma(dataPoint)
  }));

  const uniqueClasses = [...new Set(dataset.map((data) => data.Alcohol))];

  // Object to store the statistics for each class
  const flavanoidStatisticsByClass = {};

  // Calculate statistics for each class
  uniqueClasses.forEach((alcoholClass) => {
    // Filter the data points for the current alcohol class
    const classData = dataset.filter((data) => data.Alcohol === alcoholClass);
    // Extract the "Flavanoids" values for the current class
    const flavanoidsValues = classData.map((data) =>typeof data.Flavanoids ==="string" ? parseFloat(data.Flavanoids) : data.Flavanoids);
    // Calculate the mean, median, and mode for the current class
    const mean = calculateMean(flavanoidsValues);
    const median = calculateMedian(flavanoidsValues);
    const mode = calculateMode(flavanoidsValues);

    // Store the statistics in the object
    flavanoidStatisticsByClass[alcoholClass] = { mean, median, mode };
  });

  // Object to store the statistics for each class
  const gammaStatisticsByClass = {};

  // Calculate statistics for each class
  uniqueClasses.forEach((alcoholClass) => {
    // Filter the data points for the current alcohol class
    const classData = dataset.filter((data) => data.Alcohol === alcoholClass);
    // Extract the "Gamma" values for the current class
    const gammaValues = classData.map((data) => data.Gamma);

    // Calculate the mean, median, and mode for the current class
    const mean = calculateMean(gammaValues);
    const median = calculateMedian(gammaValues);
    const mode = calculateMode(gammaValues);

    // Store the statistics in the object
    gammaStatisticsByClass[alcoholClass] = { mean, median, mode };
  });

  return (
    <>
      <h2>Flavanoids Measurements</h2>
      <Table {...{uniqueClasses,statsByClass: flavanoidStatisticsByClass,label:"Flavanoids"}} />
      <h2>Gamma measurements</h2>
      <Table {...{uniqueClasses,statsByClass: gammaStatisticsByClass,label:"Gamma"}} />
    </>

  );
}

export default App;
