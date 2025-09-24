import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";


const Profile = () => {
  const user = useSelector((store) => store?.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
