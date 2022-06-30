import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

   .user_form {
        width: 400px;
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background: #242424;
   }

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 150px;
        }
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;

    input {
        width: 350px;
        border-radius: 5px;
        padding: 10px;
    }
    a {
        color: #fff;
    }
`;

export const Button = styled.button.attrs({
    type: 'submit',
})`
    width: 90px;
    height: 40px;
    border: 0;
    margin-bottom: 10px;
    border-radius: 5px;
    font-size: 1.5em;
    font-weight: bold;
    background: #ff9f12;
`;