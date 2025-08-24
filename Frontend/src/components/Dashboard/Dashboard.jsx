import { Search } from "lucide-react";
import Profile from "../Profile/Profile.jsx";
import User_Media from "../User_Media/User_Media.jsx";
import Lastbar from "../LastBar/Lastbar.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router";
const Dashboard = () => {
  const location = useLocation();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const {username} = useParams()
const navigate = useNavigate()
  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${username}`,
          { withCredentials: true }
        );

        console.log(response.data.data);
        setUserData(response?.data.data);
      } catch (error) {
        setErrors(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [location.pathname]);
  const letters = "Loading...".split("");
  
  const sendToSearchComp = () => {
    navigate('/search')
  }
  return (
    <>
      {loading ? (
        <div className="w-[80%] h-[90vh] flex justify-center items-center">
 
        <div className="relative flex items-center justify-center w-[180px] h-[180px] text-white font-inter text-[1.5em] font-light rounded-full select-none">
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block opacity-40 z-[1] rounded-full animate-[letterAnim_2s_infinite]"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {letter}
        </span>
      ))}

      <div
        className="absolute top-0 left-0 w-full aspect-square rounded-full z-0"
        style={{
          animation: "rotateAnim 2s linear infinite",
        }}
      ></div>

      <style>
        {`
          @keyframes rotateAnim {
            0% {
              transform: rotate(90deg);
              box-shadow:
                inset 0 10px 20px 0 #fff,
                inset 0 20px 30px 0 #ad5fff,
                inset 0 60px 60px 0 #471eec;
            }
            50% {
              transform: rotate(270deg);
              box-shadow:
                inset 0 10px 20px 0 #fff,
                inset 0 20px 10px 0 #d60a47,
                inset 0 40px 60px 0 #311e80;
            }
            100% {
              transform: rotate(450deg);
              box-shadow:
                inset 0 10px 20px 0 #fff,
                inset 0 20px 30px 0 #ad5fff,
                inset 0 60px 60px 0 #471eec;
            }
          }

          @keyframes letterAnim {
            0%, 100% {
              opacity: 0.4;
              transform: translateY(0);
            }
            20% {
              opacity: 1;
              transform: scale(1.15);
            }
            40% {
              opacity: 0.7;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
        </div>
      ) : (
        <div className="flex min-h-[100vh] w-[100vw] sm:w-[100%]">
          <div className="min-h-[99.9vh] border h-full w-full md:w-[99%] lg:w-[90%] mx-auto">
            <header className="h-15 backdrop-blur-lg bg-[#08080845] flex top-0 sticky justify-between items-center px-4 z-50">
              <div className="flex h-full gap-3 items-center ">
                <h1 className=" text-slate-300 text-[14px]  lg:text-2xl md:text-xl">
                  {userData && userData.fullName}
                </h1>

                <p className="text-lg text-slate-500 text-[14px]  lg:text-2xl md:text-xl">
                  Post <span>{userData.postCount}</span>
                </p>
              </div>

              <div className="search h-12 border w-12  rounded-4xl overflow-hidden flex justify-center items-center px-3 hover:bg-[#252842] transition-all duration-400 cursor-pointer" onClick={sendToSearchComp}>
                <Search className="text-slate-600 " />
              </div>
            </header>
            {userData && (
              <Profile
                className={" bg-[#08080a] text-slate-400"}
                user={userData}
              />
            )}
            {userData && <User_Media userData={userData} />}
          </div>
          <Lastbar />
        </div>
      )}

      {errors && (
        <>
          <div className="h-full w-full flex justify-center items-center">
            <h1 className="text-[#8d0303] text-3xl">{errors}</h1>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
