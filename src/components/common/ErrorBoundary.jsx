import { useNavigate } from "react-router-dom";

const ErrorBoundary = ({ 
  error, 
  isLoading, 
  children, 
  errorMessage = "오류가 발생했습니다",
  notFoundMessage = "데이터를 찾을 수 없습니다"
}) => {
  const navigate = useNavigate();
  
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-screen flex justify-center items-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">{errorMessage}</h2>
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }
  
  if (!children) {
    return (
      <div className="h-screen flex justify-center items-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">{notFoundMessage}</h2>
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }
  
  return children;
};

export default ErrorBoundary;
