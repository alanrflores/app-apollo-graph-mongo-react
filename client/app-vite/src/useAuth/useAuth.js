import { useApolloClient, useMutation } from "@apollo/client";
import { getTypenameFromResult } from "@apollo/client/utilities";
import { LOGIN_USER } from "../graphql/mutation";


export function useAuth() {
const client = useApolloClient();
const [loginUser, { data, loading, error}] = useMutation(LOGIN_USER);

const authToken = localStorage.getItem('token');


function isAuthenticated() {
    return authToken;
};
async function login(email, password) {
    const { data }= await loginUser({ variables: { loginInput: { email, password }}})
    const { token } = data.loginUser;
    // if (typeof window !== 'undefined') {
    //     // Set the JWT token in the local storage when the user logs in
    //     window.localStorage.setItem('token', token);
    //   }
    localStorage.setItem('token', token);
    client.resetStore();
};

function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('data')
    client.resetStore();

}


return {
    loading: loading,
    authToken,
    error: error,
    isAuthenticated,
    login,
    logout,

};
}