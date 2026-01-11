function JobDescriptionInput({ value, onChange }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Job Description
      </h2>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
      />
      
      <p className="mt-2 text-sm text-gray-500">
        {value.length} characters
      </p>
    </div>
  );
}

export default JobDescriptionInput;