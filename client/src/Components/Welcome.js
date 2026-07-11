import logo from "../images/chat-app-icon.png";

function Welcome() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="welcome-container">
      <img src={logo} alt="Logo" className="welcome-logo" />
      <b>Hi , {userData.data.currentUser['fullName']}  👋</b>
      <p>Mulailah berkomunikasi dengan teman teman anda tanpa khawatir terkait keamanan data</p>
    </div>
  );
}

export default Welcome;