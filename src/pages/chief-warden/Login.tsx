import { Link } from "react-router-dom";
import LoginForm from "../../components/Form/LoginForm";
import { login } from "../../apiRoutes/chiefWarden";
import { useDispatch } from "react-redux";
import { saveToken } from "../../helpers/localStorage";
import { currentUserActions } from "../../store/currentUser";

// Login Page - Chief warden
function Login() {
  const dispatch = useDispatch();
  const loginHandler = (token: string, data: any): void => {
    dispatch(currentUserActions.login(data));
    saveToken(token);
  };

  return (
    <div className="parent-container lg:max-w-md">
      <h2 className="mb-6">Chief Warden login</h2>
      <LoginForm
        onSubmit={login}
        loginHandler={loginHandler}
        navigateTo="/chief-wardens/notices"
      />
      <div className="lg:ml-auto text-sm pt-1 px-2 ">
        <Link to="/staffs/login">Staff Login →</Link>
      </div>
    </div>
  );
}

export default Login;