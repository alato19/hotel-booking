import { Link, NavLink, Outlet } from "react-router-dom";

export default function MainLayout () {
  return (
    <div>
      <header className="border-bottom">
        <div class="header-top">
                <div class="header-top-left">
                    <span><i class="ion-android-cloud-outline"></i>28 °C</span>
                    <span><i class="ion-ios-location-outline"></i> Durrës, Albania</span>
                    <span><i class="fa fa-phone" aria-hidden="true"></i> +355-68-000-0000</span>
                </div>
                <div class="header-top-right">
                    <ul>
                        <li class="dropdown"><a href="login.html" title="LOGIN" class="dropdown-toggle">LOGIN</a></li>
                        <li class="dropdown"><a href="register.html" title="REGISTER" class="dropdown-toggle">REGISTER</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">USD <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li class="active"><a href="#">USD</a></li>
                                <li><a href="#">EUR</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">ENG <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li class="active"><a href="#">ENG</a></li>
                                <li><a href="#">SQ</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
      </header>

      <main className="container py-4">
        <Outlet />
      </main>

      <footer className="border-top">
        <div className="container py-4 small text-muted">
          © {new Date().getFullYear()} Hotel Paradise
        </div>
      </footer>
    </div>
  );
}