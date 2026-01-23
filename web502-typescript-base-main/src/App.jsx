import { Toaster } from "react-hot-toast";
import { Link, Route, Routes } from "react-router-dom";
import ListPage from "./pages/List";
import AddPage from "./pages/Add";
import EditPage from "./pages/Edit";

function App() {
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="#" className="text-xl font-semibold">
            <strong>WEB502 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="#" className="hover:text-gray-200">
              Đăng nhập
            </Link>
            <Link to="#" className="hover:text-gray-200">
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với web Lê Nam Phi</h1>
        <Routes>
          <Route path="/" element={
            // <div className="flex justify-center mt-16">
            //   <div className="flex items-center gap-16">
            //     {/* Đội 1 */}
            //     <div className="flex flex-col items-center">
            //       <img
            //         src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Doi-tuyen-Viet-Nam.png"
            //         alt="U23 Việt Nam"
            //         className="w-40"
            //       />
            //       <h2 className="mt-3 text-xl font-semibold">
            //         U23 Việt Nam
            //       </h2>
            //     </div>

            //     {/* Tỷ số */}
            //     <div className="text-4xl font-bold text-gray-800">
            //       0 - 3
            //     </div>

            //     {/* Đội 2 */}
            //     <div className="flex flex-col items-center">
            //       <img
            //         src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1280px-Flag_of_the_People%27s_Republic_of_China.svg.png"
            //         alt="U23 Trung Quốc"
            //         className="w-40"
            //       />
            //       <h2 className="mt-3 text-xl font-semibold">
            //         U23 Trung Quốc
            //       </h2>
            //     </div>
            //   </div>
            // </div>
            <div><h1>PH62039</h1></div>
  }
/>

          <Route path="/list" element={<ListPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;
