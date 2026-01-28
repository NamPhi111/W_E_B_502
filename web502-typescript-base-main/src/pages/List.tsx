import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

type Course = {
  id: string;
  name: string;
  credit: number;
  category: string;
  teacher: string;
};

function ListPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [keyword, setKeyword] = useState("");
  const [teacher, setTeacher] = useState("");

  // ===== PAGINATION =====
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ===== GET DATA =====
  useEffect(() => {
    const getAll = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/courses");
        setCourses(data);
        setAllCourses(data);
      } catch {
        toast.error("Lỗi server");
      }
    };
    getAll();
  }, []);

  // ===== DELETE =====
  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      try {
        await axios.delete(`http://localhost:3000/courses/${id}`);
        toast.success("Xóa thành công");

        const newData = allCourses.filter((item) => item.id !== id);
        setAllCourses(newData);
        setCourses(newData);
        setCurrentPage(1);
      } catch {
        toast.error("Không thể xóa");
      }
    }
  };

  // ===== SEARCH =====
  const handleSearch = () => {
    const result = allCourses.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setCourses(result);
    setCurrentPage(1);
  };

  // ===== FILTER TEACHER =====
  const handleFilterTeacher = (value: string) => {
    setTeacher(value);
    if (!value) {
      setCourses(allCourses);
    } else {
      const result = allCourses.filter(
        (item) => item.teacher === value
      );
      setCourses(result);
    }
    setCurrentPage(1);
  };

  // ===== RESET =====
  const handleReset = () => {
    setCourses(allCourses);
    setKeyword("");
    setTeacher("");
    setCurrentPage(1);
  };

  // ===== PAGINATION LOGIC =====
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

  // ===== GET UNIQUE TEACHERS =====
  const teachers = Array.from(
    new Set(allCourses.map((item) => item.teacher))
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* HEADER */}
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Danh sách khóa học
          </h1>
        </div>


        {/* SEARCH + FILTER */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder=" Tìm theo tên khóa học..."
            className="border rounded-lg px-4 py-2 w-72"
          />

          <select
            value={teacher}
            onChange={(e) => handleFilterTeacher(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">-- Lọc theo giảng viên --</option>
            {teachers.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Tìm kiếm
          </button>

          <button
            onClick={handleReset}
            className="bg-gray-400 text-white px-5 py-2 rounded-lg"
          >
            Reset
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Tên khóa học</th>
                <th className="px-4 py-3 text-center">Tín chỉ</th>
                <th className="px-4 py-3 text-left">Danh mục</th>
                <th className="px-4 py-3 text-left">Giảng viên</th>
                <th className="px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {currentCourses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                currentCourses.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50`}
                  >
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-center">{item.credit}</td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">{item.teacher}</td>
                    <td className="px-4 py-3 text-center space-x-3">
                      <Link
                        to={`/edit/${item.id}`}
                        className="text-blue-600 hover:underline">
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:underline">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
