import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  credit: number;
  category: string;
  teacher: string;
};

function AddPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (values: FormData) => {
    try {
      await axios.post("http://localhost:3000/courses", values);
      alert("Thêm khóa học thành công!");
      navigate("/");
    } catch {
      alert("Thêm thất bại!");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Thêm khóa học</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label>Tên khóa học</label>
          <input
            {...register("name", {
              required: "Không được để trống",
              minLength: {
                value: 3,
                message: "Ít nhất 3 ký tự",
              },
            })}
            className="w-full border px-3 py-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        {/* Credit */}
        <div>
          <label>Số tín chỉ</label>
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
            className="w-full border px-3 py-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.credit?.message}</p>
        </div>

        {/* Category */}
        <div>
          <label>Danh mục</label>
          <select
            {...register("category", {
              required: "Vui lòng chọn danh mục",
            })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Chọn danh mục --</option>
            <option value="Cơ sở">Cơ sở</option>
            <option value="Chuyên ngành">Chuyên ngành</option>
            <option value="Tự chọn">Tự chọn</option>
          </select>
          <p className="text-red-500 text-sm">{errors.category?.message}</p>
        </div>

        {/* Teacher */}
        <div>
          <label>Giảng viên</label>
          <input
            {...register("teacher", {
              required: "Không được để trống",
              minLength: {
                value: 3,
                message: "Ít nhất 3 ký tự",
              },
            })}
            className="w-full border px-3 py-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.teacher?.message}</p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-2 rounded">
          Thêm mới
        </button>
      </form>
    </div>
  );
}

export default AddPage;