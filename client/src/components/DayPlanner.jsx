function DayPlanner({ campsites = [] }) {
  return (
    <div className="bg-white rounded-xl border border-green-200 p-6 mt-4">
      <h2 className="text-green-900 font-bold text-xl mb-4">Planned Days</h2>
      <div className="flex flex-col gap-4">
        {campsites.map((campsite, i) => (
          <div key={i} className="border border-green-100 rounded-lg p-4">
            <p className="text-green-900 text-sm">Day {i + 1}</p>
            <p className="text-green-700 font-semibold">
              {campsite.displayName.text}
            </p>
            <a
              href={campsite.websiteUri}
              className="text-green-600 text-sm underline hover:text-green-800"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              Visit website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DayPlanner;
