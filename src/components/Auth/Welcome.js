import React from 'react';

function Welcome() {
  const create = React.createElement
  return (
    create('section', null, 
      create('div', null, 
        create('h1', null, "Welcome"),
        create('p', null, "You have successfully logged in!"),
        create('p', null, "We've sent you an email. Please click on the confirmation link to verify your account.")
      )
    )
  )
}
export default Welcome
