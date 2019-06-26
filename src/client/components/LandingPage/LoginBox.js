import React from 'react';
import copy from './copy';
import '../../assets/images/logo.jpg';

const LoginBox = () => (
  <div className="loginBox">
    <div className="irp-loginbox_contents">
      <img src="/logo.jpg" width="90px" height="90px" alt="logo" />
      <p>{copy.introductory_text}</p>
      <div style={{ marginTop: '10px' }}>&copy;Suman Kumari</div>

      <div>
        <form>
          <label htmlFor="email">
            {copy.email_header}
            <input className="irp-login_field" type="text" name="name" placeholder={copy.loginFields_placeholder.email} />
            <input className="irp-login_field" type="password" name="name" placeholder={copy.loginFields_placeholder.password} />
          </label>
          <input type="submit" value="Continue" />
        </form>
      </div>
    </div>

  </div>
);

export default LoginBox;
