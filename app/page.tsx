"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CourseCard from "../components/CourseCard";
import Modal from "../components/Modal";
import { setAuthToken, getCourses } from "../api/api"; // Import API functions
import { addCourse, updateCourse, deleteCourse } from "../api/api";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  // State for courses
  const [courses, setCourses] = useState([
    {
      name: 'Machine Learning',
      code: 'CS771',
      credit: 9,
      description: 'An advanced course on machine learning algorithms.',
      image: '/ml.png', // Replace with your image path
    },
    {
      name: 'Data Structures and Algorithms',
      code: 'ESO207',
      credit: 11,
      description: 'Learn about arrays, linked lists, trees, and more.',
      image: '/dsa.png', // Replace with your image path
    },
    {
      name: 'Fluid Mechanics',
      code: 'ME302',
      credit: 9,
      description: 'Fundamentals of fluid mechanics and applications.',
      image: '/fluid.png', // Replace with your image path
    },
    {
      name: 'Introduction to Electronics',
      code: 'ESO201',
      credit: 11,
      description: 'Basics of electrical circuits and applications.',
      image: '/electronics.png', // Replace with your image path
    },
  ]);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effect to check authentication on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token); // Set auth token for API requests
      setIsAuthenticated(true); // Set user as authenticated
    }
  }, []);

  // Fetch courses when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCourses(); // Load courses from the backend
    }
  }, [isAuthenticated]);

  // Fetch courses from API
  const fetchCourses = async () => {
    try {
      const response = await getCourses(); // API call to get courses
      setCourses(response.data); // Update courses state
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Handle login
  const handleLogin = () => {
    router.push("/register"); // Redirect to login page
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from storage
    setAuthToken(null); // Clear token from API headers
    setIsAuthenticated(false); // Reset authentication state
    setCourses([]); // Clear courses
  };

  // Handle course card click
  const handleCardClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleAddCourse = async (newCourse) => {
    try {
      const response = await addCourse(newCourse); // API call to add course
      if (response && response.data) {
        await fetchCourses(); // Refresh course list
        setIsModalOpen(false); // Close modal
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  
  // Update an existing course
const handleUpdateCourse = async (updatedCourse) => {
  try {
    const response = await updateCourse(updatedCourse.id, updatedCourse); // Call API
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === updatedCourse.id ? response.data : course
      )
    );
    setIsModalOpen(false); 
    refreshCourses();// Close modal
  } catch (error) {
    console.error("Error updating course:", error);
  }
};

// Delete a course
const handleDeleteCourse = async (id) => {
  try {
    await deleteCourse(id); // Call API
    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id)); // Update state
  } catch (error) {
    console.error("Error deleting course:", error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-md">
        <h1 className="text-lg font-bold">Course Helper</h1>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-blue-500 rounded-md shadow hover:bg-gray-200"
          >
            LOGOUT
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-white text-blue-500 rounded-md shadow hover:bg-gray-200"
          >
            LOGIN
          </button>
        )}
      </header>

      <main className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            onClick={() => handleCardClick(course)}
          />
        ))}
      </main>

      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
          onClick={() => {
            setSelectedCourse(null);
            setIsModalOpen(true);
          }}
        >
          ADD COURSE
        </button>
      </div>

      <Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSubmit={selectedCourse ? handleUpdateCourse : handleAddCourse}
  course={selectedCourse}
  onDelete={handleDeleteCourse} // Pass the delete handler
  refreshCourses={fetchCourses} // Pass the fetchCourses function
/>
    </div>
  );
}
