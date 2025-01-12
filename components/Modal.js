import { useState, useEffect } from "react";
import { addCourse, updateCourse, deleteCourse } from "../api/api";

export default function Modal({ isOpen, onClose, onSubmit, course,onDelete, refreshCourses }) {
  const [formData, setFormData] = useState(
    course || { name: "", code: "", credit: "", description: "", image: "" }
  );

  // Reset the form when the modal opens
  useEffect(() => {
    setFormData(course || { name: "", code: "", credit: "", description: "", image: "" });
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (course) {
        // Update course
        await updateCourse(course.id, formData);
      } else {
        // Add new course
        await addCourse(formData);
      }
      refreshCourses(); // Refresh the course list after the operation
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error submitting the course:", error);
      alert("Failed to submit the course. Please try again.");
    }
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">
          {course ? `Edit Course: ${course.name}` : "Add New Course"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Course Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            name="code"
            placeholder="Course Code"
            value={formData.code}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="number"
            name="credit"
            placeholder="Credits"
            value={formData.credit}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              // onClick={() => {
              //   if (course?.id) onSubmit(course.id);
              //   onClose();
              //   refreshCourses(); // Close the modal after deletion
              // }}
            >
              {course ? "UPDATE" : "SUBMIT"}
            </button>
            {course && (
              <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
              onClick={() => {
                if (course?.id) onDelete(course.id);
                onClose();
                refreshCourses(); // Close the modal after deletion
              }}
            >
              DELETE
            </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
