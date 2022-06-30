import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px 0;

    label:first-child {
        width: 300px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        input {
            display: none;
        }

        img {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            object-fit: cover;
        }

        span {
            position: absolute;
            z-index: 99;
            opacity: 0.5;
            transition: all 2s;
        }
        span:hover {
            transform: scale(1.2);
            opacity: 1;
            
        }
    }
    label:not(:first-child) {
        align-self: start;
    }
    input {
        width: 300px;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    input[type=email]{
        cursor: not-allowed;
    }
    .buttons {
        display: flex;
        gap: 100px;
    }
    button {
        width: 100px;
        border-radius: 5px;
        padding: 10px;
        color: #fff;
        background: #ff9f12;
        transition: ease-in-out 0.2s;
        cursor: pointer;
    }
    button:hover {
        background: #000;
    }
`;
