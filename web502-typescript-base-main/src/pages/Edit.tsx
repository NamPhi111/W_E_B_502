import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

type FormData = {
  name: string;
  credit: number;
  category: string;
  teacher: string;
};

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // ===== GET COURSE DETAIL =====
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/courses/${id}`
        );
        reset(data);
      } catch {
        toast.error("Không lấy được dữ liệu");
      }
    })();
  }, [id, reset]);

  // ===== SUBMIT =====
  const onSubmit = async (values: FormData) => {
    try {
      await axios.put(`http://localhost:3000/courses/${id}`, values);
      toast.success("Cập nhật thành công");
      navigate("/list");
    } catch {
      toast.error("Cập nhật thất bại");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Sửa khóa học
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="block font-medium mb-1">
              Tên khóa học
            </label>
            <input
              {...register("name", {
                required: "Không được để trống",
                minLength: {
                  value: 3,
                  message: "Ít nhất 3 ký tự",
                },
              })}
              className="w-full border rounded-lg px-4 py-2"
            />
            <p className="text-red-500 text-sm">
              {errors.name?.message}
            </p>
          </div>

          {/* CREDIT */}
          <div>
            <label className="block font-medium mb-1">
              Số tín chỉ
            </label>
            <input
              type="number"
              {...register("credit", {
                required: "Không được để trống",
                min: {
                  value: 1,
                  message: "Số tín chỉ phải > 0",
                },
                valueAsNumber: true,
              })}
              className="w-full border rounded-lg px-4 py-2"
            />
            <p className="text-red-500 text-sm">
              {errors.credit?.message}
            </p>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block font-medium mb-1">
              Danh mục
            </label>
            <select
              {...register("category", {
                required: "Vui lòng chọn danh mục",
              })}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">-- Chọn danh mục --</option>
              <option value="Cơ sở">Cơ sở</option>
              <option value="Chuyên ngành">Chuyên ngành</option>
              <option value="Tự chọn">Tự chọn</option>
            </select>
            <p className="text-red-500 text-sm">
              {errors.category?.message}
            </p>
          </div>

          {/* TEACHER */}
          <div>
            <label className="block font-medium mb-1">
              Giảng viên
            </label>
            <input
              {...register("teacher", {
                required: "Không được để trống",
                minLength: {
                  value: 3,
                  message: "Ít nhất 3 ký tự",
                },
              })}
              className="w-full border rounded-lg px-4 py-2"
            />
            <p className="text-red-500 text-sm">
              {errors.teacher?.message}
            </p>
          </div>

          {/* BUTTON */}
          <div className="flex justify-center gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Lưu thay đổi
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Hủy
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditPage;
