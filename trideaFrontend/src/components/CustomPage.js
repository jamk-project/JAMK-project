import React from 'react';

import { urls } from '../config/urls'

const CustomPage = ({ pageName, company }) => {
  const { firstName, lastName, name, jobTitle } = company;

  const iFrameWidth = '100%';
  const iFrameHeigth = window.innerHeight;

  const renderPage = (pageName, name = 'Unnown', jobTitle = 'User') => {
    const text = {
      'Apple': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque ultricies odio, vel mattis nisl consequat semper. Suspendisse sagittis arcu odio, sed malesuada tellus hendrerit vitae. Integer eleifend, tellus sit amet commodo luctus, nunc mi commodo elit, sed lacinia dolor risus vel metus. In hac habitasse platea dictumst. Aenean mollis orci mi, sit amet imperdiet orci vestibulum id. Integer malesuada auctor semper. Etiam rutrum vulputate mi fermentum imperdiet. Curabitur eu erat nec mi pretium sagittis. Vivamus pulvinar justo at viverra mattis.',
      'Microsoft': 'Aliquam massa nunc, pharetra quis nibh vitae, tincidunt feugiat turpis. Nam non consequat purus. Duis tempor non ex vitae facilisis. Etiam sed imperdiet libero, sit amet sodales libero. Vestibulum ac est et sem euismod finibus. Donec sit amet vestibulum augue. In aliquam lobortis gravida. Vestibulum tristique justo quam, et maximus ex feugiat eu. Suspendisse potenti. Quisque auctor, odio in sodales sollicitudin, urna ipsum elementum dolor, nec elementum augue velit ac turpis. In hac habitasse platea dictumst. Fusce sed ornare elit.',
      'Unnown': 'Sorry, we do not know who you are :('
    }

    if (pageName === 'home') {
      return (
        <>
          <h1>This is the {pageName} page!</h1>
          <h2>Hello, {firstName}  {lastName} from {name}.</h2>
          <h3>Some text for mr. {firstName}:</h3>
          <p>{text[name]}</p>
          <br />
        </>
      );
    }
    return <iframe title='data' height={iFrameHeigth} width={iFrameWidth} src={urls[name][jobTitle][pageName]} />
  }

  return renderPage(pageName, name, jobTitle)
}

export default CustomPage;
