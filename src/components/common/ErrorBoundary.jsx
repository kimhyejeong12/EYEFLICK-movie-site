import { useNavigate } from "react-router-dom";

const BackButton = ({ onClick, children = "뒤로 가기" }) => (
  <button 
    onClick={onClick}
    className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
  >
    {children}
  </button>
);

const ErrorState = ({ message, onBackClick }) => (
  <div className="h-screen flex justify-center items-center bg-black text-white">
    <div className="text-center">
      <h2 className="text-2xl mb-4">{message}</h2>
      <BackButton onClick={onBackClick} />
    </div>
  </div>
);

const ErrorBoundary = ({ 
  error, 
  isLoading, 
  children, 
  errorMessage = "오류가 발생했습니다", 
  notFoundMessage = "데이터를 찾을 수 없습니다" 
}) => {
  const navigate = useNavigate();
  
  const handleBackClick = () => navigate(-1);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return <ErrorState message={errorMessage} onBackClick={handleBackClick} />;
  }

  // 데이터 없음 시
  if (!children) {
    return <ErrorState message={notFoundMessage} onBackClick={handleBackClick} />;
  }

  // 정상 시
  return children;
};

export default ErrorBoundary;
