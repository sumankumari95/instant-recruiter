import React from 'react';
import copy from './copy';

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
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Continue" />
        </form>
      </div>
    </div>

  </div>
);

export default LoginBox;
