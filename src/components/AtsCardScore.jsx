import React from "react";

const AtsScoreCard = ({ score, suggestions = [] }) => {
  // Decide message
  let message = "";
  if (score > 85) {
    message = "🎉 Hurray! Your resume is very strong!";
  } else if (score > 65) {
    message = "👍 Do better! Your resume is good but can improve.";
  } else if (score > 20) {
    message = "⚠️ Try harder! Consider making key improvements.";
  } else {
    message = "❗ Get professional advice! Your resume needs serious work.";
  }

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto my-10" data-aos="fade-up">
        <h1 className="text-lg md:text-3xl font-bold text-blue-500 mb-4">Resume ATS Score </h1>
      <div className="relative flex items-center justify-center mb-6">
        <div
          className="rounded-full border-blue-500"
          style={{
            width: 160,
            height: 160,
            borderWidth: "10px",
            borderStyle: "solid",
            borderColor: "#3B82F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            fontWeight: "bold",
            color: "#3B82F6",
          }}
        >
          {score}%
        </div>
      </div>

      <p className="text-sm md:text-lg text-blue-600 text-center font-semibold mb-4">{message}</p>

      <div className="w-full bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500 pl-4">
        <h3 className="text-blue-700 font-semibold mb-2">Suggestions:</h3>
        {suggestions.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {suggestions.map((sugg, idx) => (
              <li className="text-xs md:text-sm" key={idx}>{sugg}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No suggestions needed. Great job!</p>
        )}
      </div>
    </div>
  );
};

export default AtsScoreCard;
