import db from "@/config/mongodbConfig";
import { User } from "@/_lib/model/user/user";
import { NextResponse } from "next/server";

export async function POST(request){
    const credentials = await request.json();
    console.log("Payload::::::::>",credentials);
    db.connect();
    
    if(credentials.userID && credentials.user_role === "admin") {

      const result = await User.findOne({ user_id : credentials.userID, delete_flag : 0, user_role: "admin"});

      return NextResponse.json({result,success:true})

    } 

    if(credentials.mobile_number) {
      const result = await User.findOne({ mobile_number: credentials.mobile_number });

      console.log("results:::::::>", result)

      if(result === null) {

        function generateUniqueId() {

          const timestamp = Date.now();
        
          const randomNum = Math.floor(Math.random() * 100000);
        
          const uniqueNumber = timestamp + randomNum;
        
          const paddedNumber = String(uniqueNumber).slice(-5).padStart(5, '0');
        
          return `USR${paddedNumber}`;
        }
        
        const payload = {
          user_id: generateUniqueId(),
          firstname: '',
          lastname: '',
          email: '',
          mobile_number: credentials.mobile_number,
          hashPassword: '',
          created_date: '',
          delete_flag: 0,
          user_role: 'user',
        }

        const create = await User.create(payload);
      }

      return NextResponse.json({result,success:true})
    }

    return NextResponse.json({success:false}, { status: 500 })

  }