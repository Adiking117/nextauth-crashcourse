import {connect} from '@/dbconfig/dbConfig'
import User from '@/models/user.models'
import { NextRequest,NextResponse} from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken'

connect()

export async function GET(request:NextRequest) {
    const userId = await getDataFromToken(request)
    const user = await User.findById(userId).select("-password")
    if(!user){
        return NextResponse.json({error: "User doesnt exists"},{status:400})
    }

    return NextResponse.json({
        message:"User found",
        data:user
    })
}