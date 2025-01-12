export default function CourseCard({ course, onClick }) {
  return (
    <div
      className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={onClick} // Add onClick handler to make the card clickable
    >
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{course.name}</h2>
        <p className="text-sm text-gray-600">Code: {course.code}</p>
        <p className="text-sm text-gray-600">Credits: {course.credit}</p>
        <p className="mt-2 text-gray-700">{course.description}</p>
      </div>
    </div>
  );
}
