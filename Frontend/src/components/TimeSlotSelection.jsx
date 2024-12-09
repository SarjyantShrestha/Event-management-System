const timeSlots = [
  "10:15am - 11:00am",
  "11:00am - 11:45am",
  "11:45am - 12:30pm",
  "12:30pm - 1:15pm",
  "1:15pm - 2:00pm",
  "2:00pm - 2:45pm",
  "2:45pm - 3:30pm",
  "3:30pm - 4:15pm",
  "4:15pm - 5:00pm",
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
