import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const { setUser, signInWithGoogle, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleBtn = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      const loggedInUser = result.user;

      setUser(loggedInUser);
      toast.success("Login successful!", {
        style: {
          background: "#00C951",
          color: "#FFFFFF",
        },
      });

      // Send user data to backend to store in MongoDB (only if it's their first login)
      await axios.post("http://localhost:5000/users", {
        uid: loggedInUser.uid,
        email: loggedInUser.email,
        displayName: loggedInUser.displayName,
      });

      navigate("/");
    } catch (error) {
      toast.error("There is an error. Please try again!", {
        style: {
          background: "#00C951",
          color: "#FFFFFF",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:px-7">
      <div className="border-2 rounded-none md:rounded-md px-12 py-12 md:py-24 flex flex-col items-center gap-16">
        <h1 className="font-bold text-3xl text-center">
          To continue to DropTask you have to login with Google first
        </h1>
        <button
          onClick={handleGoogleBtn}
          className="w-full md:w-2/4 lg:w-1/3 justify-center cursor-pointer flex items-center gap-2 border px-6 py-3 hover:bg-green-500 hover:text-white"
        >
          Login with Google <FcGoogle size={24} />
        </button>
      </div>
    </div>
  );
};

export default Login;
