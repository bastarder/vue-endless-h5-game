import axios from 'axios'

const login = function(){
  return axios.post('login/signin',{
    username: 'aaa',
    password: 'aaa'
  });
}

export {
  login
};