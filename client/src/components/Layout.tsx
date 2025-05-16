import { useNavigate } from "react-router-dom";
import { LayoutProps } from "../types/dashboard";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Expense Tracker</h1>
        <nav className="flex flex-col space-y-4">
          <button
            className="text-left px-4 py-2 rounded hover:bg-gray-800 transition"
            onClick={() => navigate("/")}
          >
            Dashboard
          </button>
          <button
            className="text-left px-4 py-2 rounded hover:bg-gray-800 transition"
            onClick={() => navigate("/transactions")}
          >
            Transactions
          </button>
          <button
            className="text-left px-4 py-2 rounded hover:bg-gray-800 transition"
            onClick={() => navigate("/categories")}
          >
            Categories
          </button>
          <button
            className="text-left px-4 py-2 mt-20 rounded text-red-400 hover:text-red-500 transition"
            onClick={() => navigate("/login")}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
          <div className="cursor-pointer" onClick={() => navigate("/profile")}>
            <img
              src="/user-icon.png"
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto flex gap-6">
          <div className="flex-1">
            {children}
          </div>
          <div className="w-1/4 bg-white border border-gray-300 rounded p-4 flex flex-col items-center">
            <div className='w-[250px] h-[200px] border border-gray-400 rounded-md bg-white'>
              <div className='flex flex-col gap-2 py-5 px-5'>
                <h3 className='text-md text-gray-800'>Monthly Income</h3>
                <h1 className='text-4xl font-bold'>$2000</h1>
                <hr className="mt-3" />
                <button
                  className="bg-gray-900 text-white px-4 py-2 mt-4 rounded-md hover:bg-gray-800 transition cursor-pointer"
                >
                  Add new transaction
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
