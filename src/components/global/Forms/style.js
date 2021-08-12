import styled from 'styled-components'
export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: #f3f2f2;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  height: auto;
  margin: auto auto;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 2px 6px -1px rgba(0, 0, 0, 0.12);
`;
export const Image = styled.div`
  width: 220px;
  height: 500px;
  background-image: url("https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;
export const FormWrapper = styled.div`
  background: red;
  width: 300px;
  padding: 40px 30px;
  background: #fefefe;
  
`;
export const Text = styled.div`
  letter-spacing: 2px;
`;
export const Input = styled.input`
  width: 90%;
  border: none;
  border-bottom: solid 1px rgba(0,0,0,.1);
  margin-top: 10px;
  padding: 5px 5px 5px 10px;
  &:focus {
    border: none;
    outline: 0;
    border-bottom: 1px solid rgb(182,157,230);
    font-size: 17px;
  }
`;
export const Submit = styled.button`
  float: right;
  background:rgb(182,157,230);
  width:  auto;
  min-width:  100px;
  border-radius:  24px; 
  text-align:  center; 
  padding:  15px 40px;
  margin-top:  5px; 
  color:  #fff; 
  font-size:  14px;
  margin-left:  auto; 
  font-weight:  500; 
  box-shadow:  0px 2px 6px -1px rgba(0,0,0,.13); 
  border:  none;
  transition:  all .3s ease; 
  outline: 0; 
  &:hover {
    transform:  translateY(-3px);
    box-shadow:  0 2px 6px -1px rgba($primary, .65);
  }
`;
export const ErrorMessage = styled.p`
  color: tomato;
`;