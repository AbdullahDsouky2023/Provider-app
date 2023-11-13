import { jwtDecode } from "jwt-decode";

export function decode (token){

const decodedToken = jwtDecode(token, { header: true });



}