/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #ffffff70;
  color: #000;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px; 
  img {
    width: 58px;
    margin-right: 23px;
  }
  a {
    color: #000;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: 1;
    }
    span {
      text-decoration: underline;
    }
  }
`;

export default function Footer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FooterWrapper {...props}>
      <a href="https://www.alura.com.br/">
        <img src="https://seeklogo.com/images/S/supernatural-logo-B075CA33F3-seeklogo.com.png" alt="Logo Alura" />
      </a>
      <p>
        Orgulhosamente criado durante
        {' '}
        a
        {' '}
        <a href="https://www.alura.com.br/">
          <span>Imersão React da Alura</span>
        </a>
      </p>
    </FooterWrapper>
  );
}
