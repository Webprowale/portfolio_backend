import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { adminOtp } from './dto/verify-admin.dto';
import { OtpGenerator } from './generateOtp';
import { SendMailService } from './mail/sendmail.service';



@Injectable()
export class AdminService {
  constructor(private prisma:PrismaService, private sendmail:SendMailService){}
  async Login(createAdminDto: Prisma.AdminCreateInput ) {
    const admin = await this.prisma.admin.findUnique({
      where:{
        email: createAdminDto.email
      }
    })
    if(!admin) throw new HttpException("Admin does not exist", HttpStatus.FORBIDDEN)
      if(admin.username === createAdminDto.username){
        const genOTP = OtpGenerator(4);
        console.log(genOTP);
        await this.prisma.admin.update({
          where: {
            id: admin.id
          },
          data: {
            otp: genOTP
          }
        })
        await this.sendmail.sendMail(admin.email, genOTP);
        return {
          message: "Logged in successfully",
          id: admin.id,
        }

      }else{
        throw new HttpException("Username is incorrect", HttpStatus.FORBIDDEN)
      }
  }

  async valideAdmin(otp:adminOtp){
       const adminId = await this.prisma.admin.findFirst({
        where:{
          id: otp.id
        }
       })
       if(!adminId) throw new HttpException('id cant be found', HttpStatus.BAD_REQUEST)
        if(adminId.otp === otp.otp){
          return {
            message: "Admin verified successfully",
            token: new Date().getHours
          }
        }else{
          throw new HttpException('Invalid OTP', HttpStatus.FORBIDDEN)
        }
  }
}
