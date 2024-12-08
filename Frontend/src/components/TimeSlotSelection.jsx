const timeSlots = [
  "9:00am - 9:30am",
  "9:30am - 10:00am",
  "10:00am - 10:30am",
  "10:30am - 11:00am",
  "11:00am - 11:30am",
  "11:30am - 12:00pm",
  "12:00pm - 12:30pm",
  "12:30pm - 1:00pm",
  "1:00pm - 1:30pm",
  "1:30pm - 2:00pm",
  "2:00pm - 2:30pm",
  "2:30pm - 3:00pm",
  "3:00pm - 3:30pm",
  "3:30pm - 4:00pm",
  "4:00pm - 4:30pm",
  "4:30pm - 5:00pm",
];

const TimeSlotSelection = () => {
  return (
    <>
      <h3 className="text-xl font-semibold">Thursday, October 5</h3>
      <div className="mt-6 h-[50%] overflow-auto">
        <div className="space-y-2 mt-4">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              className="w-full p-3 text-left bg-gray-200 hover:bg-blue-500 hover:text-white rounded-lg"
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TimeSlotSelection;
