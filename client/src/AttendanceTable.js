import React, { useState, useEffect } from 'react';

const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/attendance');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);

        // Define dummy classes with status "Absent"
        const dummyClasses = {
          "amey": "Absent",
          "roshani": "Absent",
          "sam": "Absent",
          "max": "Absent"
        };

        // Preprocess data to ensure each document has all dummy classes with an "Absent" status
        const processedData = data.map((entry, index) => {
          const classPresence = entry.class_presence || {}; // Handle case where class_presence is undefined

          // Merge dummy classes with existing class_presence
          const mergedClasses = { ...dummyClasses, ...classPresence };

          return {
            ...entry,
            class_presence: mergedClasses,
            srno: index  // Assigning sequential IDs
          };
        });

        setAttendanceData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Attendance Management Table</h2>
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry) => (
            <>
              {Object.entries(entry.class_presence).map(([name, status], index) => (
                <tr key={`${entry._id}_${name}`}>
                  <td>{index + 1}</td> {/* Increment index to generate unique sequential IDs */}
                  <td>{name}</td>
                  <td>{status}</td>
                  <td>{entry.timestamp}</td>
                </tr>
              ))}
              <tr key={`spacer_${entry._id}`}><td colSpan="4">&nbsp;</td></tr> {/* Insert empty row for space */}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
