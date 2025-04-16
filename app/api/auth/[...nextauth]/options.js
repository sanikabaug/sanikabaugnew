import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';
import Swal from 'sweetalert2';
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

console.log("Base Url: ", BASE_URL)

export const options = {
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({

      name: 'Credentials',
      async authorize(credentials, req) {

        console.log("Credentials: ", credentials)

        if (credentials.userID !== " " && credentials.password !== " " && credentials.user_role !== " ") {

          if (credentials.user_role === "admin") {

            const res = await fetch(BASE_URL + "api/userApi/findUser", {
              method: 'POST',
              body: JSON.stringify({ "userID": credentials.userID, "user_role": "admin" }),
              headers: { "Content-Type": "application/json" }
            })
            const use = await res.json()
            let user = use.result;

            console.log("User: ", user);

            if (res.ok && user) {
              if (user) {

                const dbuserID = user.user_id;
                const dbpassword = user.hashPassword;

                const match = await bcrypt.compare(credentials.password, dbpassword);

                console.log("Match::::", match);

                if (match) {
                  console.log("Good Pass: ", user);
                  if (Object.keys(user).length > 0) {
                    user = { ...user, password: credentials.password };
                    return user
                  } else {
                    return null;
                  }

                } else {
                  return null;
                }
              };
            }

          }



        } 


        // if(credentials.number) {
        //   console.log("Return True")


        //   const res = await fetch(BASE_URL + "api/userApi/findUser", {
        //     method: 'POST',
        //     body: JSON.stringify({ "mobile_number": credentials.number }),
        //     headers: { "Content-Type": "application/json" }
        //   })

        // }


      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, session, trigger }) => {
      //console.log("jwt callback" ,{token, user, session, trigger})

      if (user) {
        token.user = user;
      }

      if (trigger === "update" && session?.favourites) {
        token.user.favourites = session.favourites
      }
      //console.log("jwt callback After" ,{token});
      return token;
    },
    session: async ({ session, token, user }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    }
  },
  pages: {
    signIn: "/adminlogin",
  },
  secret: '42dfd79ba11db84510c34d938d32987171bb48a4e8b1c533928286a8f497fda6',

}

export default NextAuth(options)