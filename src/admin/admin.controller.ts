import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { validateAdminOtp } from './dto/verify-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.Login(createAdminDto);
  }
  @Post('validate')
  validateOtp(@Body() otp:validateAdminOtp) {
    return this.adminService.valideAdmin(otp);
  }

  
}
